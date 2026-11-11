// Run many random players through the real scoring (game/portrait.js) and report how the portrait behaves.
// Usage: npm run simulate [-- 3000]
// Random answering is not how people play, but it shows structural problems one play-through hides:
// letters the code leans toward, summaries that swap on ties, unlocks that arrive empty, lines that never appear.
const path = require('path');
const G = path.join(__dirname, '..', 'game') + path.sep;
global.window = global;
require(G + 'content.js');
['neighborhood', 'city', 'coast', 'observatory'].forEach(w => require(G + 'content-' + w + '.js'));
const T = require(G + 'portrait.js');
const C = window.TERN_CONTENT;

const N = +process.argv[2] || 3000;
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const pick = arr => arr[Math.floor(rnd() * arr.length)];
const shuffle = arr => arr.map(x => [rnd(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
function answerQ(q) {
  const picks = {}; let step = 'trunk';
  while (step) { picks[step] = pick(q.steps[step].answers).id; step = q.next ? q.next(step, picks) : null; if (step && !q.steps[step]) step = null; }
  return picks;
}
const pct = (k, n = N) => (k / n * 100).toFixed(1) + '%';
const park = C.questions.filter(q => !q.world), later = C.questions.filter(q => q.world);

const codes = {}, letters = {}, ties = {}, middle = {}, seenLine = {};
let changesPark = 0, changesAll = 0, noSummaryAt4 = 0, noTensionAt8 = 0;
for (let r = 0; r < N; r++) {
  const answers = {}; let n = 0, head = null;
  for (const q of shuffle(park).concat(shuffle(later))) {
    answers[q.id] = { picks: answerQ(q), order: ++n };
    const P = T.compute(C, answers, { keep: head }); // as the game does: the current summary holds on ties
    if (n === 4 && !P.headline) noSummaryAt4++;
    if (n === 8 && !P.tensions.length) noTensionAt8++;
    if (n >= 4 && P.headline) { if (head && P.headline !== head) { changesAll++; if (n <= park.length) changesPark++; } head = P.headline; }
    if (n === park.length) {
      codes[P.code] = (codes[P.code] || 0) + 1;
      P.codeAxes.forEach(a => { letters[a.letter] = (letters[a.letter] || 0) + 1; if (a.score === 0) ties[a.id] = (ties[a.id] || 0) + 1; if (Math.abs(a.lean) < 0.15) middle[a.id] = (middle[a.id] || 0) + 1; });
    }
  }
  T.compute(C, answers, { keep: head }).tendencies.forEach(t => { seenLine[t.id] = (seenLine[t.id] || 0) + 1; });
}

console.log(`${N} random players, all ${C.questions.length} questions\n`);
console.log('THE CODE (from the park only)');
console.log(`  distinct codes: ${Object.keys(codes).length} of 32 · most common: ${Object.entries(codes).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([c, k]) => `${c} ${pct(k)}`).join(', ')}`);
C.axes.forEach(a => console.log(`  ${a.pos} ${pct(letters[a.pos] || 0).padStart(6)}  vs  ${a.neg} ${pct(letters[a.neg] || 0).padStart(6)}   exact ties (settled by the most recent answer): ${pct(ties[a.id] || 0)} · near the middle: ${pct(middle[a.id] || 0)}`));
console.log('\nTHE SUMMARY');
console.log(`  no summary yet at 4 park answers: ${pct(noSummaryAt4)} · no tension yet at 8: ${pct(noTensionAt8)}`);
console.log(`  summary changes per player: ${(changesPark / N).toFixed(2)} in the park, ${(changesAll / N).toFixed(2)} across all worlds`);
console.log('\nPORTRAIT LINES (share of players who end with each)');
const never = C.tendencies.filter(t => !seenLine[t.id]).map(t => t.id);
const ranked = Object.entries(seenLine).sort((a, b) => a[1] - b[1]);
console.log(`  never earned: ${never.join(', ') || 'none'}`);
console.log(`  rarest: ${ranked.slice(0, 5).map(([k, v]) => `${k} ${pct(v)}`).join(', ')}`);
console.log(`  commonest: ${ranked.slice(-5).reverse().map(([k, v]) => `${k} ${pct(v)}`).join(', ')}`);
