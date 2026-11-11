// Run an estimated real crowd through the park's 12 questions and the real scoring (game/portrait.js).
// Usage: npm run simulate:crowd
// The answer rates below are GUESSES (the game collects no data). They test whether each letter still tells
// friends apart when people answer the way most people do, not at random. Rerun after any park nudge change.
const path = require('path');
const G = path.join(__dirname, '..', 'game') + path.sep;
global.window = global;
require(G + 'content.js');
const C = window.TERN_CONTENT;
const T = require(G + 'portrait.js');
const park = C.questions.filter(q => !q.world);

// Estimated share of a real crowd picking each answer, by question and step key, in answer order.
const R = {
  Q1: { trunk: [.8, .2], fuA: [.3, .7], fuAA: [.25, .75], fuB: [.5, .5] },
  B09: { trunk: [.35, .65], fuA: [.6, .4], fuB: [.3, .7] }, B02: { trunk: [.4, .6], fu: [.4, .6] }, B13: { trunk: [.6, .4], fu: [.4, .6] },
  B18: { trunk: [.75, .25], fu: [.2, .5, .3] }, B29: { trunk: [.45, .55], fuA: [.4, .6], fuB: [.6, .4] }, B37: { trunk: [.45, .55] }, D8: { trunk: [.6, .4] },
  B40: { trunk: [.35, .45, .2], fu: [.6, .4] }, Q6: { trunk: [.75, .25], fuA: [.5, .5], fuB: [.5, .5] }, B21: { trunk: [.45, .55], fuA: [.4, .6], fuB: [.4, .6] },
  B01: { trunk: [.65, .35], fu: [.25, .75] },
};
let seed = 5; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const N = 4000, L = {}, ties = {}, codes = {};
for (let r = 0; r < N; r++) {
  const answers = {}; let n = 0;
  for (const q of park.map(q => [rnd(), q]).sort((a, b) => a[0] - b[0]).map(x => x[1])) { // free roam: any order, which settles ties
    const picks = {}; let st = 'trunk';
    while (st) {
      const w = R[q.id] && R[q.id][st];
      if (!w) throw new Error(`no estimated rates for ${q.id} ${st}: add them to R`);
      const as = q.steps[st].answers; let x = rnd(), i = 0;
      while (i < as.length - 1 && (x -= w[i]) > 0) i++;
      picks[st] = as[i].id; st = q.next ? q.next(st, picks) : null; if (st && !q.steps[st]) st = null;
    }
    answers[q.id] = { picks, order: ++n };
  }
  const P = T.compute(C, answers, {});
  codes[P.code] = (codes[P.code] || 0) + 1;
  P.codeAxes.forEach(a => { L[a.letter] = (L[a.letter] || 0) + 1; if (a.score === 0) ties[a.id] = (ties[a.id] || 0) + 1; });
}
const pct = k => (100 * (k || 0) / N).toFixed(0) + '%';
console.log(`${N} simulated players answering at estimated real rates (guesses)\n`);
C.axes.forEach(a => console.log(`  ${a.pos} ${pct(L[a.pos]).padStart(4)}  vs  ${a.neg} ${pct(L[a.neg]).padStart(4)}   exact ties (settled by the most recent answer): ${(100 * (ties[a.id] || 0) / N).toFixed(1)}%`));
console.log(`\n  most common codes: ${Object.entries(codes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([c, k]) => `${c} ${pct(k)}`).join(', ')} · codes seen: ${Object.keys(codes).length} of 32`);
