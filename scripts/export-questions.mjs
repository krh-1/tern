#!/usr/bin/env node
// Writes docs/QUESTIONS.md from the game's content files.
//
// Why: the questions live in game/content*.js (the assessment instrument the game actually runs).
// A hand-kept copy in docs drifted every time content changed, so the doc is now generated.
// Run: npm run export:questions. No dependencies; node 18+.
//
// Where the doc describes behavior (when a follow-up shows, when a world opens, whether a tendency
// can ever show), it asks the game's own code rather than re-implementing it: it calls each
// question's next() and portrait.js's compute(), so the doc can't disagree with the game.

import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs', 'QUESTIONS.md');

// content.js must load first: it creates globalThis.TERN_CONTENT, and each world file appends to it.
const CONTENT_FILES = ['content.js', 'content-neighborhood.js', 'content-city.js', 'content-coast.js', 'content-observatory.js'];
CONTENT_FILES.forEach(f => require(join(ROOT, 'game', f)));
const C = globalThis.TERN_CONTENT;
const Portrait = require(join(ROOT, 'game', 'portrait.js'));

const HOME = C.worlds[0].id;
const worldOf = q => q.world || HOME;
const axisById = Object.fromEntries(C.axes.map(a => [a.id, a]));
const problems = []; // data checks, listed at the end of the doc

// Every answer id → its answer, question and step, for lookups and checks.
const idx = {};
C.questions.forEach(q => Object.entries(q.steps).forEach(([key, step]) => step.answers.forEach(a => {
  if (idx[a.id]) problems.push(`Answer id ${a.id} is used twice (${idx[a.id].q.id} and ${q.id}).`);
  idx[a.id] = { a, q, key, step };
  if (!a.note) problems.push(`${a.id} has no note.`);
  if (!a.did) problems.push(`${a.id} has no "did" line.`);
})));

// Same rule as portrait.js stepWeight(): trunk 1, follow-ups 1.5 unless the step sets its own.
const stepWeight = (step, key) => step.weight || (key === 'trunk' ? 1 : 1.5);
const num = n => String(Math.round(n * 100) / 100);

// ---------- follow-up paths, found by calling next() ----------

// Walks every answer combination through q.next(). Returns, per step, the pick sequences that lead
// to it, and the full paths (every pick a player could make in one run through the question).
function walk(q) {
  const reachedBy = { trunk: [[]] }, fullPaths = [];
  const visit = (key, picks, trail) => {
    if (trail.length > 8) { problems.push(`${q.id}: next() never ends (more than 8 steps).`); return; }
    q.steps[key].answers.forEach(a => {
      const p = Object.assign({}, picks, { [key]: a.id }), t = trail.concat(a.id);
      const nx = q.next(key, p);
      if (!nx) { fullPaths.push(t); return; }
      if (!q.steps[nx]) { problems.push(`${q.id}: after ${a.id}, next() returns "${nx}", which isn't a step.`); fullPaths.push(t); return; }
      (reachedBy[nx] = reachedBy[nx] || []).push(t);
      visit(nx, p, t);
    });
  };
  visit('trunk', {}, []);
  Object.keys(q.steps).forEach(k => { if (!reachedBy[k]) problems.push(`${q.id}: step ${k} is never shown (no answer leads to it).`); });
  return { reachedBy, fullPaths };
}
const paths = Object.fromEntries(C.questions.map(q => [q.id, walk(q)]));

const answerRef = id => `${id} (${idx[id].a.text.replace(/[.]$/, '')})`;
function whenShown(q, key) {
  if (key === 'trunk') return 'Everyone who stops here answers this.';
  const trails = paths[q.id].reachedBy[key];
  if (!trails) return 'Never shown: no answer leads here.';
  const trunkIds = q.steps.trunk.answers.map(a => a.id);
  if (trails.length === trunkIds.length && trails.every((t, i) => t.length === 1 && t[0] === trunkIds[i])) return 'Shown after any first answer.';
  return 'Shown after ' + trails.map(t => t.map(answerRef).join(', then ')).join('; or after ') + '.';
}

// ---------- formatting helpers ----------

const fmtNudges = nudges => {
  const e = Object.entries(nudges || {});
  if (!e.length) return 'none';
  return e.map(([ax, v]) => {
    const a = axisById[ax];
    if (!a) { problems.push(`Nudge on unknown axis ${ax}.`); return `${ax} ${v}`; }
    return `${ax} ${v > 0 ? '+' : ''}${v} (${v > 0 ? a.posLabel : a.negLabel})`;
  }).join(', ');
};
const possibleLine = q => C.axes.map(a => [a.id, Portrait.possible(q, a.id)]).filter(([, p]) => p).map(([id, p]) => `${id} ${num(p)}`).join(' · ') || 'none';
const stepTitle = key => key === 'trunk' ? 'First question' : `Follow-up \`${key}\``;

// ---------- worlds: when each opens, asked of portrait.js ----------

// A complete set of picks for a question: the first answer on every step along one path.
const firstPath = q => {
  const picks = {};
  let key = 'trunk';
  while (key && q.steps[key]) { picks[key] = q.steps[key].answers[0].id; key = q.next(key, picks); }
  return { picks, order: 0 };
};
// How many of the previous world's questions open world i: answer earlier worlds in full, then the
// previous world one question at a time, and ask compute() when world i opens.
function opensAfter(i) {
  const w = C.worlds[i], prev = C.worlds[i - 1];
  if (w.soon) return null;
  const answers = {};
  C.questions.filter(q => C.worlds.findIndex(x => x.id === worldOf(q)) < i - 1).forEach(q => { answers[q.id] = firstPath(q); });
  const prevQs = C.questions.filter(q => worldOf(q) === prev.id);
  for (let n = 0; n <= prevQs.length; n++) {
    if (Portrait.compute(C, answers).worlds[i].open) return n;
    if (n < prevQs.length) answers[prevQs[n].id] = firstPath(prevQs[n]);
  }
  return undefined;
}

// ---------- tendencies and tensions: can they ever show? ----------

// The most of `ids` one player can pick in a question: the best single path through it.
const bestOnOnePath = (qid, ids) => Math.max(0, ...paths[qid].fullPaths.map(p => p.filter(id => ids.has(id)).length));
function tendencyReach(t) {
  const sup = new Set(t.support || []);
  [...(t.support || []), ...(t.against || [])].forEach(id => { if (!idx[id]) problems.push(`Tendency ${t.id} lists ${id}, which isn't an answer.`); });
  const qids = [...new Set([...sup].filter(id => idx[id]).map(id => idx[id].q.id))];
  const best = qids.reduce((s, qid) => s + bestOnOnePath(qid, sup), 0);
  const need = t.min || 2;
  if (qids.length < 2) return `Can't show yet: its supporting answers all come from ${qids.length ? qids[0] : 'no question'}, and a line needs answers from 2 or more questions.`;
  if (best < need) return `Can't show yet: one player can pick at most ${best} of its supporting answers, and it needs ${need}.`;
  return null;
}
function tensionReach(t) {
  const missing = t.when.filter(id => !idx[id]);
  if (missing.length) { problems.push(`A tension lists ${missing.join(', ')}, which isn't an answer.`); return 'Can\'t show: it lists an answer that doesn\'t exist.'; }
  const byQ = {};
  t.when.forEach(id => (byQ[idx[id].q.id] = byQ[idx[id].q.id] || new Set()).add(id));
  const blocked = Object.entries(byQ).find(([qid, ids]) => bestOnOnePath(qid, ids) < ids.size);
  return blocked ? `Can't show: no one can pick all of ${[...blocked[1]].join(' and ')} in ${blocked[0]}.` : null;
}

// ---------- the document ----------

const L = [];
const out = (...lines) => L.push(...lines);
const totalAnswers = C.questions.reduce((s, q) => s + Object.values(q.steps).reduce((t, st) => t + st.answers.length, 0), 0);

out(
  '# Questions: Tern (Ethics)',
  '',
  '> **Generated file. Do not edit by hand.** `scripts/export-questions.mjs` writes it from the game\'s content files. To change a question, change it in `game/content*.js`, then run `npm run export:questions`. Question wording, nudges and follow-up rules are the assessment instrument: change them only with Ken\'s say-so (AGENTS.md, "questions.js Is the Assessment Instrument").',
  '',
  `This is every question in the game: ${C.questions.length} questions across ${C.worlds.length} worlds, ${totalAnswers} answers, ${C.tendencies.length} portrait lines (tendencies) and ${C.tensions.length} tensions. How the answers are scored is in \`docs/SCORING.md\`. Candidate questions that aren't in the game are in \`docs/QUESTION-BANK.md\`.`,
  '',
  'Sources, in load order: ' + CONTENT_FILES.map(f => `\`game/${f}\``).join(', ') + '. Scoring and unlock rules: `game/portrait.js`.',
  '',
  '## How to read this file',
  '',
  '- **Nudges** move the five value pairs (axes). A positive number pushes toward the first side of the pair, a negative number toward the second. `OR +3 (Outcomes)` means three points toward Outcomes; `LP -2 (Principle)` means two points toward Principle.',
  '- **Step weight** multiplies every nudge in that step. The first question weighs 1; follow-ups weigh 1.5 unless the step sets its own.',
  '- **Most signal** is the most a question can move each axis: the strongest first answer plus the strongest follow-up, each times its step weight (`possible()` in `portrait.js`).',
  '- **Note** is what the player reads right after answering. **Did** is the one-line restatement shown in "Read more about you", away from the question, so it names everything in full.',
  '- **When shown** for a follow-up comes from running the question\'s own `next()` rule on every answer combination.',
  '- **Scene** is the id of the code-drawn scene in `game/scenes*.js`. **Heavy**, **medium** or **light** is how emotionally heavy the scene is; it guides where stops sit on the map and isn\'t used in scoring.',
  '',
  '## Rules every question must meet',
  '',
  'Check these before adding or changing a question. They come from Ken\'s rulings in AGENTS.md.',
  '',
  '- No obviously correct answer: a thoughtful person could defend every option.',
  '- **No escape answers:** no compromise that lets the player step around the dilemma ("split it", "do both", "defer to experts", "only if they ask", "try the official route first"). A middle option survives only with its own real cost.',
  '- **Hard:** a thoughtful person hesitates. If about 80% would pick the same answer in seconds, sharpen it or cut it.',
  '- A follow-up fires only for answers that could plausibly change under the new fact, and changes the situation rather than restating it. Give follow-ups to both sides where possible.',
  '- The answers move at least two axes.',
  '- Any combination with other answers has a coherent explanation in the axis model. Apparent inconsistency is information, never an error.',
  '- The setup line states the facts that close off imagined variants (time pressure, other options, who is involved), so everyone answers the same situation. (This replaced the old "assumptions" block.)',
  '- Identity-neutral by default: no gender or race cues unless the cue is what the question tests.',
  '- Answerable honestly from anywhere on the political spectrum. The tone is curious, never accusing.',
  '- Every answer has a `note` and a `did` line. A `did` line names its subject in full and never says "it", "that" or "the one" to point back at the question.',
  '- Portrait lines (tendencies) make sense to a stranger who sees them on their own, in plain words. Each needs a `share` line, or a deliberate decision to leave it out.',
  '',
  '## The five axes',
  '',
  'The code is one letter per axis, in this order. A tie goes to the first letter.',
  '',
  '| Axis | Letters | Positive side | Negative side |',
  '|---|---|---|---|',
  ...C.axes.map(a => `| \`${a.id}\` | ${a.pos} / ${a.neg} | **${a.posLabel}.** ${a.posDetail} | **${a.negLabel}.** ${a.negDetail} |`),
  '',
  '### How much each world can move each axis',
  '',
  'Each cell: how many questions can move the axis, and in brackets the total of their most signal.',
  '',
  '| Axis | ' + C.worlds.map(w => w.name).join(' | ') + ' | All worlds |',
  '|---|' + C.worlds.map(() => '---|').join('') + '---|',
  ...C.axes.map(a => {
    const cell = qs => { const ps = qs.map(q => Portrait.possible(q, a.id)).filter(Boolean); return `${ps.length} (${num(ps.reduce((s, p) => s + p, 0))})`; };
    return `| ${a.posLabel} / ${a.negLabel} | ` + C.worlds.map(w => cell(C.questions.filter(q => worldOf(q) === w.id))).join(' | ') + ` | ${cell(C.questions)} |`;
  }),
  '',
);

C.worlds.forEach((w, i) => {
  const qs = C.questions.filter(q => worldOf(q) === w.id);
  out(`## World ${i + 1}: ${w.name}`, '');
  if (i === 0) {
    out(`${qs.length} questions. Open from the start. Everyone answers the same ${qs.length}, in any order, and only these set the five-letter code.`, '',
      'Unlock ladder (park answers, from `LADDER` in `portrait.js`):', '',
      ...Portrait.LADDER.map(u => `- ${u.at} answered: ${u.name}`), '');
  } else {
    const prev = C.worlds[i - 1], prevN = C.questions.filter(q => worldOf(q) === prev.id).length, n = opensAfter(i);
    const opens = n === null ? 'Not built yet: it shows in fog as "opening soon".'
      : n === undefined ? `Never opens with the current rules (check \`opens\` in \`content.js\`).`
      : `Opens after ${n} of ${prev.name}'s ${prevN} questions${n === prevN ? ' (all of them)' : ' (about two-thirds)'}, and stays open after that.`;
    out(`${qs.length} questions. Chapter: "${w.chapter}". ${opens}`, '',
      `Unlock ladder (answers in ${w.name}):`, '',
      ...(w.ladder || []).map(u => `- ${u.at} answered: ${u.name}`), '');
  }

  qs.forEach(q => {
    out(`### ${q.id}: ${q.title}`, '',
      `Scene \`${q.scene}\` · ${q.weight}${q.quick ? ' · quick read (one move, several options, no follow-up)' : ''} · Most signal: ${possibleLine(q)}`, '');
    Object.entries(q.steps).forEach(([key, s]) => {
      out(`**${stepTitle(key)}** (step weight ${num(stepWeight(s, key))}). ${whenShown(q, key)}`, '');
      if (s.setup) out(`*Setup:* ${s.setup}`, '');
      out(`*Question:* ${s.q}`, '');
      s.answers.forEach(a => out(
        `- **${a.id}:** ${a.text}`,
        `  - Nudges: ${fmtNudges(a.nudges)}`,
        `  - Note: ${a.note || '(none)'}`,
        `  - Did: ${a.did || '(none)'}`,
      ));
      out('');
    });
  });
});

out('## Portrait lines (the tendency library)', '',
  'A line shows when the player\'s supporting picks minus their picks against reach its minimum, from at least 2 different questions. The strongest line is the headline; ties go to the lower priority number. Lines with no share line are never sent to a friend. Full rules: `docs/SCORING.md`.', '');
C.tendencies.forEach(t => {
  const sup = t.support || [], ag = t.against || [];
  const supQs = new Set(sup.filter(id => idx[id]).map(id => idx[id].q.id)).size;
  const reach = tendencyReach(t);
  out(`### \`${t.id}\`: ${t.text}`, '',
    `- Detail: ${t.detail}`,
    `- Share line: ${t.share ? t.share : 'none (never sent to a friend)'}`,
    `- Shows at strength ${t.min || 2} or more; priority ${t.priority || 99}`,
    `- Supported by ${sup.length} answers from ${supQs} questions: ${sup.join(', ') || 'none'}`,
    `- Counts against: ${ag.join(', ') || 'none'}`,
    `- You protect: ${(t.protect || []).join('; ') || 'none'} · You'll trade away: ${(t.trade || []).join('; ') || 'none'}`);
  if (reach) out(`- **${reach}**`);
  out('');
});

out('## Tensions (where you\'re torn)', '',
  'A tension shows when the player has picked every answer listed. The portrait shows at most 3.', '');
C.tensions.forEach((t, i) => {
  const reach = tensionReach(t);
  out(`${i + 1}. ${t.when.join(' + ')}: ${t.text}${reach ? ` **${reach}**` : ''}`);
});
out('');

out('## Data checks', '',
  'Problems the export found in the content files (unknown ids, steps no answer leads to, missing notes). Tendencies that can\'t show yet are flagged in their own entries above.', '');
if (problems.length) problems.forEach(p => out(`- ${p}`));
else out('No problems found.');
out('');

writeFileSync(OUT, L.join('\n'));
const perWorld = C.worlds.map(w => `${w.id} ${C.questions.filter(q => worldOf(q) === w.id).length}`).join(', ');
console.log(`Wrote docs/QUESTIONS.md: ${C.questions.length} questions (${perWorld}), ${totalAnswers} answers, ${problems.length} data problems.`);
