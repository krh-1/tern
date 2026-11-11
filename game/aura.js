// Tern aura: a soft watercolour glow behind the player's character, blended from their five compass letters.
// It is the player's fingerprint. Each of the ten letters has its own muted pigment; the player's five sit
// around them as one continuous blend (like the sheen on an opal, not a striped rainbow). The stronger the
// lean on a pair, the more room and colour its letter gets. A colour joins when its pair appears on the
// compass; each later world adds a wider, fainter wash. A hidden per-save seed turns the blend and shapes
// its edge, so two people with the same answers still differ. The only colour in the game (DESIGN §0.8).
// Works in the browser (window.TernAura) and in node.
(function (root) {
  const clamp01 = v => Math.max(0, Math.min(1, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  function rng(seed) { let a = (seed >>> 0) || 1; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  // One muted pigment per letter, paired so the two ends of each compass pair clearly differ. Deliberately not
  // in spectrum order (that would read as a rainbow flag). No yellow-green (a cartoon smell cloud), no true red (anger).
  const LETTER_PIGMENT = {
    O: [204, 154, 70], R: [58, 76, 140], // ochre · indigo
    C: [182, 96, 64], I: [82, 134, 170], // rust · sky
    H: [192, 106, 124], T: [40, 124, 118], // rose · teal
    L: [128, 66, 114], P: [108, 144, 112], // plum · sage
    S: [98, 104, 128], D: [120, 96, 176], // slate · violet
  };
  const PAIR_LETTERS = [['R', 'O'], ['I', 'C'], ['T', 'H'], ['P', 'L'], ['D', 'S']]; // [negative, positive] per axis, in AXES order

  const PARK_STEPS = [2, 4, 6, 8, 10, 12]; // the park unlocks the aura grows with (the first answer note doesn't count)
  const AXES = ['OR', 'CI', 'HT', 'LP', 'SD'];

  // What the aura should look like for a portrait (from portrait.js compute()). Saved, and only replaced at unlock moments.
  function target(P) {
    const byId = {}, known = {}; (P.axes || []).forEach(a => {
      // an exact tie has lean 0; a hair toward the side its letter went keeps the colour matching the letter
      byId[a.id] = a.lean || (a.letter && a.letter === a.neg ? -0.001 : 0); known[a.id] = a.known ? 1 : 0;
    });
    const prog = [PARK_STEPS.filter(a => P.count >= a).length / PARK_STEPS.length]
      .concat((P.worlds || []).slice(1).map(w => w.ladder.length ? w.unlocked.length / w.ladder.length : 0));
    while (prog.length < 5) prog.push(0);
    const later = prog.slice(1, 5).reduce((s, v) => s + v, 0) / 4;
    return { lean: AXES.map(id => +(byId[id] || 0).toFixed(3)), known: AXES.map(id => known[id] || 0), level: +(prog[0] * 0.5 + later * 0.5).toFixed(3), prog: prog.slice(0, 5).map(v => +v.toFixed(3)) };
  }
  // Ease shown values toward the target. k: 0..1 this frame.
  function ease(shown, goal, k) {
    if (!shown) return JSON.parse(JSON.stringify(goal));
    return { lean: shown.lean.map((v, i) => lerp(v, goal.lean[i], k)), known: (shown.known || [1, 1, 1, 1, 1]).map((v, i) => lerp(v, (goal.known || [1, 1, 1, 1, 1])[i], k)), level: lerp(shown.level, goal.level, k), prog: shown.prog.map((v, i) => lerp(v, goal.prog[i], k)) };
  }
  const settled = (a, b) => !a || !b || (Math.abs(a.level - b.level) < 0.002 && a.lean.every((v, i) => Math.abs(v - b.lean[i]) < 0.002) && (a.known || []).every((v, i) => Math.abs(v - (b.known || [])[i]) < 0.002) && a.prog.every((v, i) => Math.abs(v - b.prog[i]) < 0.002));

  // Draw the aura centred on a figure standing at (x, y). s: the figure's scale. top: how tall the figure is, in figure units.
  function draw(g, x, y, s, top, A, seed) {
    if (!A || A.level < 0.001) return;
    const settle = 0.3 + 0.7 * clamp01(A.level * 1.9); // early on it's generic; it becomes yours as the evidence builds
    const known = A.known || [1, 1, 1, 1, 1];
    const parts = A.lean.map((v0, i) => {
      const v = v0 * settle, letter = PAIR_LETTERS[i][v >= 0 ? 1 : 0], strength = clamp01(Math.abs(v) * 2.2);
      // a pair near the middle still shows real colour, just softer (a grey glow reads as dust or smoke)
      const c = LETTER_PIGMENT[letter].map((ch, n) => Math.round(lerp(ch, [190, 178, 164][n], (1 - strength) * 0.4)));
      return { c, w: known[i] * (0.35 + 0.65 * strength) };
    }).filter(p => p.w > 0.01);
    if (!parts.length) return;
    const r = rng(seed * 13 + 1), turn = r() * Math.PI * 2, ph = [r() * 6.28, r() * 6.28];
    const cx = x, cy = y - top * 0.5 * s, R = (19.5 + 3 * Math.pow(A.level, 0.7)) * s;
    // your colours around the circle, each taking room by how strongly you lean, blending into the next
    let fill = `rgb(${parts[0].c})`;
    if (parts.length > 1 && g.createConicGradient) {
      const total = parts.reduce((t, p) => t + p.w, 0), grad = g.createConicGradient(turn, cx, cy);
      let at = 0;
      parts.forEach(p => { grad.addColorStop((at + p.w / 2) / total, `rgb(${p.c})`); at += p.w; });
      const a0 = parts[0].c, a1 = parts[parts.length - 1].c, wrap = a0.map((v, n) => Math.round((v + a1[n]) / 2));
      grad.addColorStop(0, `rgb(${wrap})`); grad.addColorStop(1, `rgb(${wrap})`);
      fill = grad;
    }
    const blob = (rad, k) => {
      g.beginPath();
      for (let i = 0; i <= 64; i++) {
        const a = i / 64 * Math.PI * 2, wob = 1 + 0.06 * Math.sin(a * 3 + ph[0] + k) + 0.05 * Math.sin(a * 5 + ph[1] - k * 0.7);
        const qx = cx + Math.cos(a) * rad * wob, qy = cy + Math.sin(a) * rad * 1.15 * wob;
        i ? g.lineTo(qx, qy) : g.moveTo(qx, qy);
      }
      g.closePath();
    };
    const worlds = 1 + [1, 2, 3, 4].filter(w => A.prog[w] > 0.001).length, layers = 5;
    g.save(); g.fillStyle = fill;
    // each later world adds a wider, fainter wash
    for (let w = worlds - 1; w >= 0; w--) {
      const pw = w ? A.prog[w] : clamp01(A.prog[0] * 1.2), outer = 1 + w * 0.08;
      if (pw <= 0) continue;
      g.globalAlpha = 0.26 * lerp(0.6, 1, pw) * (w ? 0.45 : 1);
      for (let k = 0; k < layers; k++) { blob(R * outer * lerp(1, 0.55, k / layers) * lerp(0.85, 1, pw), k + w * 3); g.fill(); }
    }
    g.restore();
  }

  const api = { target, ease, settled, draw, LETTER_PIGMENT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.TernAura = api;
})(typeof window !== 'undefined' ? window : this);
