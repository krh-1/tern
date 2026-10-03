// Tern — code-drawn scenes for the Neighborhood (world 2). Same contract and style as scenes.js.
// Ink on paper, calm motion, harm never shown. Relationships are a thin thread and relative size.
// Contract: see game/plan.md and game/plan-neighborhood.md. Variants are step keys ('trunk', 'fu', 'fuA', 'fuB').
(window.TERN_SCENE_PACKS = window.TERN_SCENE_PACKS || []).push(function (h) {
  const { sc, V, sset, sto, hopY, sleep, lerp, clamp01, reduce, INK, PAPER, GRAPH, HAIR, ellipse, line, txt, bubble, heart, paper, steam, marks, hourglass, scribble, parkBack, indoor, drawPerson, npcLook, ridgeY } = h;

  const SERIF = size => `italic 500 ${size}px "Cormorant Garamond", Georgia, serif`;
  const SANS = size => `700 ${size}px "Quattrocento Sans", sans-serif`;
  const SHADOW = 'rgba(20,20,20,0.10)';
  const ease = u => u * u * (3 - 2 * u);

  // Every scene plays its answer the same calm way: look up the targets, ease towards them, wait.
  function actor(acts, rate, extra) {
    return async function (a) {
      const m = a && acts[a.id];
      if (!m) { await sleep(900); return; }
      if (extra) await extra(a.id, m);
      else sto(m, rate || 1.8);
      await sleep(1300);
    };
  }

  // ---------- small shared drawers (the first few are copied from scenes.js, where they're private) ----------
  function thread(g, x1, y1, x2, y2, lift, a, dash, w) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = w || 1.1; g.lineCap = 'round';
    if (dash) g.setLineDash([3, 4]);
    g.beginPath(); g.moveTo(x1, y1); g.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - lift, x2, y2); g.stroke();
    g.restore();
  }
  // a thread with a gap in the middle that can close
  function brokenThread(g, x1, y1, x2, y2, lift, gap, a, dash) {
    if (a <= 0.01) return;
    const cx = (x1 + x2) / 2, cy = Math.min(y1, y2) - lift;
    const P = u => [(1 - u) * (1 - u) * x1 + 2 * (1 - u) * u * cx + u * u * x2, (1 - u) * (1 - u) * y1 + 2 * (1 - u) * u * cy + u * u * y2];
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.1; g.lineCap = 'round'; if (dash) g.setLineDash([3, 4]);
    for (const [u0, u1] of [[0, 0.5 - gap], [0.5 + gap, 1]]) {
      if (u1 <= u0) continue;
      g.beginPath(); for (let i = 0; i <= 16; i++) { const [x, y] = P(u0 + (u1 - u0) * i / 16); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
    }
    g.restore();
  }
  function moon(g, x, y, r, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = INK; ellipse(g, x, y, r, r); g.fill();
    g.fillStyle = PAPER; ellipse(g, x + r * 0.45, y - r * 0.2, r * 0.85, r * 0.85); g.fill(); g.restore();
  }
  function stars(g, pts, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = GRAPH; g.lineWidth = 1;
    for (const [x, y] of pts) { line(g, x - 2, y, x + 2, y); line(g, x, y - 2, x, y + 2); }
    g.restore();
  }
  function table(g, x1, x2, y, floor) {
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
    g.beginPath(); g.rect(x1, y, x2 - x1, 5); g.fill(); g.stroke();
    line(g, x1 + 6, y + 5, x1 + 6, floor || 210); line(g, x2 - 6, y + 5, x2 - 6, floor || 210);
  }
  function handset(g, x, y, rot, a) { // a phone held upright
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.translate(x, y); g.rotate(rot || 0);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(-3.5, -6, 7, 12, 1.6); g.fill(); g.stroke();
    g.fillStyle = INK; g.fillRect(-2, -4, 4, 6.5); g.restore();
  }
  function frame(g, x, y, r, a, dash) { // a round window onto somewhere else
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
    if (dash) g.setLineDash([4, 4]);
    ellipse(g, x, y, r, r); g.fill(); g.stroke(); g.restore();
  }
  function clipCircle(g, x, y, r) { g.save(); g.beginPath(); g.arc(x, y, r - 1, 0, Math.PI * 2); g.clip(); }
  // Draw something see-through without its overlapping strokes darkening: paint it on a spare sheet, then lay that down faintly.
  let spare = null;
  function faded(g, a, fn) {
    if (a >= 0.99) { fn(g); return; }
    if (a <= 0.01) return;
    const W = g.canvas.width, H = g.canvas.height;
    if (!spare) spare = document.createElement('canvas');
    if (spare.width !== W || spare.height !== H) { spare.width = W; spare.height = H; }
    const o = spare.getContext('2d'); o.setTransform(1, 0, 0, 1, 0, 0); o.clearRect(0, 0, W, H); o.setTransform(g.getTransform());
    fn(o);
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = a; g.drawImage(spare, 0, 0); g.restore();
  }
  // someone a little see-through, without the overlaps darkening
  const ghost = (g, a, x, y, o) => faded(g, a, c => drawPerson(c, x, y, o));
  const asleep = phase => Object.assign({}, npcLook(phase), { eyes: 'sleepy' });

  // ---------- the neighborhood's furniture ----------
  function street(g) { // a sidewalk: the kerb line and a few paving joints
    g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 214, 400, 214);
    g.strokeStyle = HAIR; g.lineWidth = 1; line(g, 0, 238, 400, 238);
    for (let x = 30; x < 430; x += 58) line(g, x, 214, x - 10, 238);
  }
  function fence(g, x1, x2, y, hh, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.lineJoin = 'round';
    g.strokeStyle = GRAPH; g.lineWidth = 1.2; line(g, x1, y - hh * 0.3, x2, y - hh * 0.3); line(g, x1, y - hh * 0.72, x2, y - hh * 0.72);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2;
    for (let x = x1; x <= x2 - 6; x += 12) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y - hh + 3); g.lineTo(x + 3, y - hh); g.lineTo(x + 6, y - hh + 3); g.lineTo(x + 6, y); g.closePath(); g.fill(); g.stroke(); }
    g.restore();
  }
  function hedge(g, x1, x2, y, hh) {
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x1, y); g.lineTo(x1, y - hh + 8);
    for (let x = x1; x < x2; x += 18) g.arc(x + 9, y - hh + 8, 9, Math.PI, 0);
    g.lineTo(x2, y); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1;
    for (let x = x1 + 8; x < x2 - 4; x += 23) { g.beginPath(); g.arc(x, y - hh * 0.45 + (x % 3) * 2, 3, 0.2, 2.4); g.stroke(); }
  }
  function tree(g, x, y, s, t, ph) { // a round street tree; only its crown sways, and only a little
    const sw = reduce ? 0 : Math.sin(t * 0.7 + (ph || 0)) * 1.1 * s;
    g.strokeStyle = INK; g.lineWidth = 1.6; g.lineCap = 'round';
    line(g, x, y, x, y - 28 * s); line(g, x, y - 18 * s, x + 6 * s, y - 24 * s);
    const C = [[0, -42, 13], [-10, -34, 10], [10, -35, 10], [-4, -51, 9], [7, -49, 8]];
    g.fillStyle = INK; for (const [cx, cy, r] of C) { ellipse(g, x + cx * s + sw, y + cy * s, (r + 1.4) * s, (r + 1.4) * s); g.fill(); }
    g.fillStyle = PAPER; for (const [cx, cy, r] of C) { ellipse(g, x + cx * s + sw, y + cy * s, r * s, r * s); g.fill(); }
    g.strokeStyle = GRAPH; g.lineWidth = 1;
    for (const [cx, cy] of [[-6, -38], [5, -45], [8, -32]]) { g.beginPath(); g.arc(x + cx * s + sw, y + cy * s, 3 * s, 0.2, 2.2); g.stroke(); }
  }
  function houseSide(g, x, w, ground, hh, o) { // part of a house, cut off by the edge of the picture
    o = o || {};
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
    g.beginPath(); g.rect(x, ground - hh, w, hh); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(x - 8, ground - hh); g.lineTo(x + w + 8, ground - hh); g.lineTo(x + w / 2, ground - hh - w * 0.42); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = HAIR; g.lineWidth = 1; for (let y = ground - hh + 9; y < ground - 1; y += 9) line(g, x + 1, y, x + w - 1, y);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4;
    if (o.door != null) { g.fillRect(o.door, ground - 50, 24, 50); g.strokeRect(o.door, ground - 50, 24, 50); ellipse(g, o.door + 19, ground - 25, 1.6, 1.6); g.stroke(); }
    (o.win || []).forEach(([wx, wy]) => {
      g.fillRect(wx, wy, 20, 18); g.strokeRect(wx, wy, 20, 18); g.lineWidth = 1; line(g, wx + 10, wy, wx + 10, wy + 18); line(g, wx, wy + 9, wx + 20, wy + 9);
      g.lineWidth = 1.8; line(g, wx - 3, wy + 19, wx + 23, wy + 19); g.lineWidth = 1.4;
    });
  }
  function mailbox(g, x, ground) {
    g.strokeStyle = INK; g.lineWidth = 2; line(g, x, ground, x, ground - 30);
    g.fillStyle = PAPER; g.lineWidth = 1.4; g.beginPath(); g.roundRect(x - 12, ground - 44, 24, 14, [7, 7, 1, 1]); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, x - 8, ground - 33, x + 8, ground - 33);
  }
  function lamp(g, x, ground, top) { // a streetlamp, lit
    g.strokeStyle = INK; g.lineWidth = 2; g.lineCap = 'round'; line(g, x, ground, x, top);
    g.lineWidth = 1.6; g.beginPath(); g.moveTo(x, top); g.quadraticCurveTo(x, top - 10, x - 12, top - 8); g.stroke();
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(x - 19, top + 2); g.lineTo(x - 5, top + 2); g.lineTo(x - 9, top - 7); g.lineTo(x - 15, top - 7); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1;
    for (const an of [0.35, 0.6, 0.85]) { const a2 = an * Math.PI; line(g, x - 12 + Math.cos(a2) * 6, top + 4 + Math.sin(a2) * 6, x - 12 + Math.cos(a2) * 11, top + 4 + Math.sin(a2) * 11); }
    g.fillStyle = SHADOW; ellipse(g, x - 12, ground + 2, 26, 4); g.fill();
  }
  function chair(g, x, y, face, floor, a, dash) { // a plain side-on chair; seat top at y
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.7; g.lineCap = 'round';
    if (dash) g.setLineDash([3, 3]);
    const bx = x - face * 17;
    line(g, x - 15, y, x + 15, y); line(g, bx, y, bx, y - 36);
    line(g, x - 12, y, x - 14, floor); line(g, x + 12, y, x + 14, floor);
    g.restore();
  }
  function bill(g, x, y, a, dash, rot, s) {
    if (a <= 0.01) return;
    s = s || 1;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.rotate(rot || 0); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; if (dash) g.setLineDash([2.5, 2.5]);
    g.fillRect(-11, -6, 22, 12); g.strokeRect(-11, -6, 22, 12); g.setLineDash([]);
    g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(-8.5, -3.5, 17, 7);
    g.fillStyle = PAPER; g.strokeStyle = INK; ellipse(g, 0, 0, 2.8, 2.8); g.fill(); g.stroke();
    g.restore();
  }
  function smoke(g, x, y, t, a, k0) { // a few slow, curling wisps
    if (a <= 0.01) return;
    g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1.2; g.lineCap = 'round';
    for (let k = 0; k < 3; k++) {
      const u = reduce ? (k + 0.5) / 3 : (t * 0.09 + k / 3 + (k0 || 0)) % 1;
      g.globalAlpha = Math.min(1, a) * Math.sin(u * Math.PI) * 0.85;
      g.beginPath();
      for (let i = 0; i <= 9; i++) { const yy = y - u * 30 - i * 3.2, xx = x + Math.sin(i * 0.6 + u * 3 + k * 2) * (2 + i * 0.35) + i * 0.7; i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); }
      g.stroke();
    }
    g.restore();
  }
  function talk(g, x1, y1, x2, y2, a, t, lift) { // words travelling from one person to another, as dots
    if (a <= 0.02) return;
    g.save(); g.fillStyle = INK;
    for (let k = 0; k < 4; k++) {
      const u = reduce ? (k + 0.5) / 4 : (t * 0.55 + k / 4) % 1;
      g.globalAlpha = Math.min(1, a) * Math.sin(u * Math.PI);
      ellipse(g, lerp(x1, x2, u), lerp(y1, y2, u) - Math.sin(u * Math.PI) * (lift == null ? 14 : lift), 1.8, 1.8); g.fill();
    }
    g.restore();
  }
  function whisper(g, x, y, dir, a, t) {
    if (a <= 0.02) return;
    g.save(); g.strokeStyle = INK; g.lineWidth = 1.2;
    for (let k = 0; k < 3; k++) {
      const ph = reduce ? (k + 0.5) / 3 : (t * 0.9 + k / 3) % 1;
      g.globalAlpha = Math.min(1, a) * (1 - ph); const cx = x + dir * ph * 20, r = 4 + ph * 5;
      g.beginPath(); if (dir > 0) g.arc(cx, y, r, -0.6, 0.6); else g.arc(cx, y, r, Math.PI - 0.6, Math.PI + 0.6); g.stroke();
    }
    g.restore();
  }
  function say(g, x, y, w, tx, ty, a, word) { // a speech bubble with a word, or with a plain line for "speaking"
    if (a <= 0.01) return;
    bubble(g, x, y, w, 22, tx, ty, a);
    if (word) txt(g, word, x, y + 0.5, 14, a, SERIF(15));
    else { g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.6; line(g, x - w / 2 + 9, y, x + w / 2 - 9, y); g.restore(); }
  }
  function query(g, x, y, tx, ty, a) { bubble(g, x, y, 22, 20, tx, ty, a); if (a > 0.01) txt(g, '?', x, y + 0.5, 13, a, SANS(13)); }
  function yearMarks(g, x, y, a) { // a year: twelve small marks, as in the park
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = GRAPH; g.lineWidth = 1; for (let k = 0; k < 12; k++) g.strokeRect(x + k * 9, y, 6, 6); g.restore();
  }
  function star(g, x, y, r, a, fill) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.beginPath();
    for (let k = 0; k < 10; k++) { const an = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; k ? g.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : g.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); }
    g.closePath(); g.fillStyle = fill ? INK : PAPER; g.fill(); g.strokeStyle = INK; g.lineWidth = 1.3; g.lineJoin = 'round'; g.stroke(); g.restore();
  }
  function sparkle(g, x, y, r, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.2; g.lineCap = 'round';
    line(g, x - r, y, x + r, y); line(g, x, y - r, x, y + r); g.restore();
  }
  function die(g, x, y, rot, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.rotate(rot);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.roundRect(-7, -7, 14, 14, 3); g.fill(); g.stroke();
    g.fillStyle = INK; for (const [dx, dy] of [[-3.5, -3.5], [0, 0], [3.5, 3.5]]) { ellipse(g, dx, dy, 1.3, 1.3); g.fill(); }
    g.restore();
  }
  // a loved dog: soft body, one floppy ear, a collar. lie: 0 standing … 1 lying down
  function dog(g, x, y, o) {
    const s = o.s || 1, d = o.dir || 1, lie = o.lie || 0, t = o.t || 0;
    const wag = reduce ? 0 : Math.sin(t * (o.happy ? 4 : 1.4)) * (o.happy ? 0.45 : 0.15);
    const Y = y - (o.hop || 0);
    g.save(); g.fillStyle = SHADOW; ellipse(g, x, y, 19 * s, 3.6 * s); g.fill();
    g.translate(x, Y); g.scale(d * s, s); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = INK; g.fillStyle = PAPER;
    const by = lerp(-15, -8, lie);
    g.lineWidth = 1.8;
    if (lie < 0.5) for (const lx of [-10, -5, 6, 11]) line(g, lx, by + 4, lx, 0);
    else { line(g, 8, -2, 21, -1.5); line(g, 6, -1, 19, 0); }
    g.save(); g.translate(-14, by - 2); g.rotate(-0.9 + wag); g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(-4, -6, 0, -11); g.stroke(); g.restore();
    g.lineWidth = 1.6; ellipse(g, 0, by, 15, lerp(8, 7, lie)); g.fill(); g.stroke();
    const hx = lerp(14, 18, lie), hy = by - lerp(9, 4, lie);
    g.strokeStyle = INK; g.lineWidth = 2.2; g.beginPath(); g.arc(hx - 2, hy + 1, 7.4, 0.55 * Math.PI, 1.0 * Math.PI); g.stroke();
    g.lineWidth = 1.6; ellipse(g, hx, hy, 7, 6.5); g.fill(); g.stroke();
    ellipse(g, hx + 6.5, hy + 2.2, 4.2, 3.1); g.fill(); g.stroke();
    g.fillStyle = INK; ellipse(g, hx + 10.4, hy + 1.2, 1.5, 1.3); g.fill();
    ellipse(g, hx + 2.6, hy - 1.4, 1.1, 1.3); g.fill();
    g.save(); g.translate(hx - 3, hy - 4.5); g.rotate(0.35); ellipse(g, 0, 4.5, 2.8, 5.6); g.fill(); g.restore();
    g.restore();
  }
  // someone lying on the floor, asleep: a plain puff stretched out sideways, head to the right. awake: 0 … 1
  function sleeper(g, x, floor, s, awake, t) {
    const br = reduce ? 0 : Math.sin(t * 0.9) * 0.6;
    const C = [[-17, -7, 6.5], [-8, -8, 8], [3, -8.5, 8.5], [13, -10, 9.5 + br * 0.2], [5, -14, 6], [-6, -13, 5.5]];
    g.save(); g.translate(x, floor); g.scale(s, s); g.lineCap = 'round';
    g.fillStyle = SHADOW; ellipse(g, 0, 0, 28, 3.4); g.fill();
    g.strokeStyle = INK; g.lineWidth = 1.8; line(g, -22, -6, -29, -4); line(g, -21, -3, -28, -1);
    g.fillStyle = INK; for (const [cx, cy, r] of C) { ellipse(g, cx, cy, r + 1.6, r + 1.6); g.fill(); }
    g.fillStyle = PAPER; for (const [cx, cy, r] of C) { ellipse(g, cx, cy, r, r); g.fill(); }
    g.strokeStyle = INK; g.fillStyle = INK; g.lineWidth = 1.3;
    if (awake < 0.5) for (const ex of [11, 18]) { g.beginPath(); g.arc(ex, -12, 1.8, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke(); }
    else for (const ex of [11, 18]) { ellipse(g, ex, -11.5, 1.2, 1.5); g.fill(); }
    const hy = lerp(-3, -22, awake), hx = lerp(2, 8, awake);
    ellipse(g, hx, hy, 2.8, 2.6); g.fillStyle = PAPER; g.fill(); g.stroke();
    g.restore();
  }

  return {
    // ---------------------------------------------------------------- B56 The Quiet Loan
    loan: {
      base(v) {
        sset({ photo: 1, ask: 0, letgo: 0, old: 1, near: 0, ask2: 0, say: 0, lend: 0 });
        if (v === 'fu') sset({ photo: 0, letgo: 1, old: 0.4 });
      },
      shift(v) { if (v === 'fu') { sto({ near: 1 }, 1.1); sto({ ask2: 1 }, 0.9); } },
      acts: {
        'B56-A': { ask: 1, photo: 0 }, 'B56-B': { letgo: 1, photo: 0, old: 0 },
        'B56-FU-A': { say: 1, ask2: 0.2, old: 0.9 }, 'B56-FU-B': { lend: 1, ask2: 0 },
      },
      async act(a) { await actor(this.acts, 1.3)(a); },
      draw(g, t) {
        const photo = V('photo'), ask = V('ask'), letgo = V('letgo'), old = V('old'), near = V('near'), ask2 = V('ask2'), say_ = V('say'), lend = V('lend');
        street(g);
        houseSide(g, -34, 104, 214, 100, { door: 22, win: [[52, 134]] });
        fence(g, 112, 400, 208, 22, 1);
        mailbox(g, 126, 214);
        tree(g, 370, 210, 1.05, t, 1);
        const yx = lerp(166, 214, ask), fx = lerp(300, 262, near);
        // the friend; their own vacation photo pops out of your phone
        drawPerson(g, fx, 214, { scale: 0.9, t, phase: 80, dir: lerp(-0.25, -0.8, clamp01(ask + near + say_)), lArm: [lerp(-3, -10, Math.max(ask2, lend)), lerp(5, -1, Math.max(ask2, lend))] });
        const rArm = photo > 0.5 ? [5, -8] : [lerp(3, 12, lend), lerp(5, -1, lend)];
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: 0.6, rArm });
        handset(g, yx + 18, 186, 0.1, photo);
        if (photo > 0.01) {
          g.save(); g.globalAlpha = photo; g.fillStyle = INK;
          [[yx + 24, 172, 1.6], [yx + 30, 158, 2.2], [yx + 34, 142, 2.8]].forEach(([x, y, r]) => { ellipse(g, x, y, r, r); g.fill(); });
          const px = 178, py = 38, pw = 100, ph = 62;
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(px, py, pw, ph); g.strokeRect(px, py, pw, ph);
          g.lineWidth = 1; g.strokeRect(px + 5, py + 5, pw - 10, ph - 10);
          g.beginPath(); g.rect(px + 5, py + 5, pw - 10, ph - 10); g.clip();
          g.strokeStyle = GRAPH; line(g, px, py + 40, px + pw, py + 40);
          for (const [x, y] of [[px + 52, py + 47], [px + 76, py + 50], [px + 36, py + 52]]) { g.beginPath(); g.moveTo(x - 5, y); g.quadraticCurveTo(x - 2.5, y - 2.5, x, y); g.quadraticCurveTo(x + 2.5, y + 2.5, x + 5, y); g.stroke(); }
          g.strokeStyle = INK; g.lineWidth = 1.2; ellipse(g, px + 74, py + 19, 6, 6); g.stroke();
          g.strokeStyle = GRAPH; for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2; line(g, px + 74 + Math.cos(an) * 8.5, py + 19 + Math.sin(an) * 8.5, px + 74 + Math.cos(an) * 11, py + 19 + Math.sin(an) * 11); }
          drawPerson(g, px + 28, py + 52, { scale: 0.34, t, phase: 80, dir: 0.3, lArm: [-6, -12], rArm: [6, -12] });
          g.restore();
        }
        // the first $200: a faint, dashed bill near the friend
        const ob = old * (1 - ask);
        bill(g, fx + 2, lerp(124, 92, near), ob, true);
        txt(g, '$200', fx + 2, lerp(108, 76, near), 10, ob, SANS(10));
        // A: you ask for it
        bubble(g, yx - 4, 132, 46, 26, yx + 2, 156, ask);
        bill(g, yx - 4, 132, ask, false);
        // B: you let it go, and the friendship stays tied
        thread(g, yx + 8, 176, fx - 8, 176, 26, letgo * (1 - ask2 * 0.3));
        // fu: they ask for another $200
        bubble(g, fx - 2, 138, 58, 26, fx - 6, 160, ask2);
        bill(g, fx - 10, 138, ask2, false, 0, 0.85);
        if (ask2 > 0.01) txt(g, '?', fx + 15, 138.5, 13, ask2, SANS(13));
        // FU-A: you bring up the first loan
        bubble(g, yx - 4, 132, 46, 26, yx + 2, 156, say_);
        bill(g, yx - 4, 132, say_, true);
        // FU-B: you lend it again
        if (lend > 0.01) {
          const u = ease(clamp01(lend)), bx = lerp(yx + 20, fx - 20, u), by = lerp(194, 194, u) - Math.sin(u * Math.PI) * 30;
          bill(g, bx, by, 1, false, -0.1 + u * 0.2, 0.8);
        }
      },
    },

    // ---------------------------------------------------------------- B55 The Bent Rule
    boardgame: {
      base() { sset({ speak: 0, back: 0, keep: 0 }); },
      acts: { 'B55-A': { speak: 1 }, 'B55-B': { keep: 1 } },
      async act(a) {
        await actor(this.acts, 1.4, async (id, m) => { sto(m, 1.6); if (m.speak) { await sleep(800); sto({ back: 1 }, 1.0); } })(a);
      },
      draw(g, t) {
        const speak = V('speak'), back = V('back'), keep = V('keep');
        indoor(g);
        // the porch: two posts, a beam, a rail
        g.strokeStyle = INK; g.lineWidth = 1.8; line(g, 14, 26, 14, 210); line(g, 386, 26, 386, 210); line(g, 4, 26, 396, 26);
        g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, 14, 148, 386, 148); g.strokeStyle = HAIR; for (let x = 36; x < 386; x += 22) line(g, x, 148, x, 202);
        // the kids behind the table: yours on the left, two friends on the right
        const cyc = (k) => { if (reduce) return 0; const u = ((t + k) % 2.8) / 2.8; return u < 0.16 ? Math.sin(u / 0.16 * Math.PI) * 4 : 0; };
        const kx = 150;
        drawPerson(g, kx, 208, { scale: 0.8, t, phase: 140, dir: lerp(0.5, -0.8, speak), hop: cyc(0) * (1 - back) });
        drawPerson(g, 250, 208, { scale: 0.8, t, phase: 141, dir: lerp(-0.3, 0.3, back), hop: cyc(1.3) * back });
        drawPerson(g, 288, 208, { scale: 0.8, t, phase: 142, dir: -0.5 });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.rect(114, 196, 194, 5); g.fill(); g.stroke(); line(g, 122, 201, 122, 210); line(g, 300, 201, 300, 210);
        g.beginPath(); g.rect(178, 192, 64, 4); g.fill(); g.stroke();
        g.fillStyle = INK; for (const x of [190, 206, 226]) { ellipse(g, x, 189.5, 2, 2.4); g.fill(); }
        // the board, seen from above: a path of squares. Your child's piece jumped ahead.
        const bx = 140, by = 42, bw = 136, bh = 58;
        g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1; g.setLineDash([2, 3]); line(g, 210, by + bh, 210, 188); g.restore();
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.roundRect(bx, by, bw, bh, 6); g.fill(); g.stroke();
        const sq = i => [152 + i * 16, 74 + Math.sin(i * 1.2) * 8];
        const at = f => { const i = Math.min(6, Math.floor(f)), u = f - i, a0 = sq(i), a1 = sq(i + 1); return [lerp(a0[0], a1[0], u), lerp(a0[1], a1[1], u) - Math.sin(u * Math.PI) * 8]; };
        g.lineWidth = 1.1;
        for (let i = 0; i < 8; i++) { const [x, y] = sq(i); g.strokeStyle = i === 7 ? INK : GRAPH; g.strokeRect(x - 5.5, y - 5.5, 11, 11); }
        star(g, sq(7)[0], sq(7)[1], 4.5, 1, false);
        // the bent rule: a dotted hop over two squares
        { const a0 = sq(4), a1 = sq(7), al = (1 - back) * (1 - keep * 0.7);
          g.save(); g.globalAlpha = al; g.strokeStyle = INK; g.lineWidth = 1; g.setLineDash([2, 3]);
          g.beginPath(); g.moveTo(a0[0], a0[1] - 6); g.quadraticCurveTo((a0[0] + a1[0]) / 2, Math.min(a0[1], a1[1]) - 20, a1[0], a1[1] - 8); g.stroke(); g.restore(); }
        const token = (f, fill, dot) => { const [x, y] = at(f); ellipse(g, x, y - 1, 3.6, 3.6); g.fillStyle = fill ? INK : PAPER; g.fill(); g.strokeStyle = INK; g.lineWidth = 1.2; g.stroke(); if (dot) { g.fillStyle = INK; ellipse(g, x, y - 1, 1, 1); g.fill(); } };
        token(5, false, true); token(lerp(6, 7, back), false, false); token(lerp(7, 4, back), true, false);
        // whoever has the win is glad
        sparkle(g, kx - 18, 150, 3.5, (1 - back) * 0.9); sparkle(g, kx + 19, 144, 2.6, (1 - back) * 0.9);
        sparkle(g, 232, 150, 3.5, back * 0.9); sparkle(g, 268, 144, 2.6, back * 0.9);
        // you, watching from the porch, tied to your child
        const yx = 70;
        drawPerson(g, yx, 212, { me: true, scale: 0.9, t, dir: lerp(0.6, 0.9, speak), rArm: [lerp(3, 8, speak), lerp(5, -4, speak)] });
        thread(g, yx + 10, 172, kx - 8, 172, 18, 0.9);
        say(g, yx + 22, 124, 40, yx + 12, 148, speak * (1 - back * 0.6));
        heart(g, (yx + kx) / 2 + 2, 132, 11, Math.max(back, keep), false);
      },
    },

    // ---------------------------------------------------------------- B24 The Dog or the Stranger
    dog: {
      base() { sset({ goL: 0, goR: 0, wakeD: 0, wakeS: 0, cause: 0 }); },
      shift(v) { if (v === 'fu') sto({ cause: 1 }, 1.0); },
      acts: { 'B24-A': { goR: 1 }, 'B24-B': { goL: 1 }, 'B24-FU-A': { goR: 1 }, 'B24-FU-B': { goL: 1 } },
      async act(a) {
        await actor(this.acts, 1.3, async (id, m) => { sto(m, 1.3); await sleep(900); sto(m.goR ? { wakeS: 1 } : { wakeD: 1 }, 1.4); })(a);
      },
      draw(g, t) {
        const goL = V('goL'), goR = V('goR'), wakeD = V('wakeD'), wakeS = V('wakeS'), cause = V('cause');
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 210, 400, 210);
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = -40; x < 460; x += 52) line(g, x, 210, x - 22, 250);
        // the house, opened up like a doll's house: two rooms and a hallway between
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.8; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(46, 98); g.lineTo(200, 42); g.lineTo(354, 98); g.closePath(); g.fill(); g.stroke();
        g.beginPath(); g.rect(60, 98, 280, 112); g.fill(); g.stroke();
        g.lineWidth = 1.4; for (const wx of [150, 250]) { g.beginPath(); g.rect(wx - 2.5, 98, 5, 112); g.fill(); g.stroke(); }
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = 72; x < 340; x += 22) line(g, x, 203, x + 8, 203);
        // the fire, kept calm: a haze under the ceiling and a few slow wisps over the roof
        g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1; g.globalAlpha = 0.7;
        for (const yy of [106, 113]) { g.beginPath(); for (let x = 62; x <= 338; x += 4) { const y = yy + Math.sin(x * 0.07 + yy) * 1.6; x > 62 ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
        g.restore();
        smoke(g, 150, 68, t, 1, 0); smoke(g, 248, 66, t, 1, 0.5);
        // a warm round window in the gable
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; ellipse(g, 200, 76, 8, 8); g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, 192, 76, 208, 76); line(g, 200, 68, 200, 84);
        // left room: your dog on its cushion
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; ellipse(g, 100, 205, 30, 5); g.fill(); g.stroke();
        const dx = lerp(98, 102, wakeD);
        dog(g, dx, 205, { s: 0.95, dir: 1, lie: 1 - wakeD, happy: wakeD > 0.5, t, hop: wakeD > 0.5 ? hopY() + (reduce ? 0 : Math.max(0, Math.sin(t * 3)) * 2 * wakeD) : 0 });
        // right room: a stranger, asleep on the floor
        g.fillStyle = PAPER; g.strokeStyle = GRAPH; g.lineWidth = 1; ellipse(g, 302, 206, 34, 5); g.stroke();
        sleeper(g, 308, 206, 0.95, wakeS, t);
        // fu: a spent match by their hand, tied back to the haze
        if (cause > 0.01) {
          g.save(); g.globalAlpha = cause; g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 264, 207, 274, 204);
          g.fillStyle = INK; ellipse(g, 275, 203.6, 2.2, 1.8); g.fill();
          g.strokeStyle = GRAPH; g.lineWidth = 1; g.setLineDash([2, 3]);
          g.beginPath(); g.moveTo(275, 199); g.quadraticCurveTo(286, 150, 272, 118); g.stroke(); g.restore();
        }
        // you, in the hallway
        const yx = 200 - goL * 60 + goR * 64;
        drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: goR * 0.8 - goL * 0.8, lArm: [lerp(-3, -11, goL), lerp(5, 0, goL)], rArm: [lerp(3, 11, goR), lerp(5, 0, goR)] });
        thread(g, yx - 8, 176, dx + 14, 188, 16, 0.5 * (1 - goR));
      },
    },

    // ---------------------------------------------------------------- B43 The Apology They Want
    apology: {
      base(v) {
        sset({ want: 1, sorry: 0, peace: 0, firm: 0, others: 0, gossip: 0, letgo: 0, straight: 0 });
        if (v === 'fu') sset({ want: 0, peace: 1 });
        sc.x.v = v;
      },
      shift(v) { if (v === 'fu') { sto({ others: 1 }, 1.0); sto({ gossip: 1 }, 0.8); } },
      acts: {
        'B43-A': { sorry: 1, peace: 1, want: 0 }, 'B43-B': { firm: 1, want: 0 },
        'B43-FU-A': { letgo: 1, gossip: 0 }, 'B43-FU-B': { straight: 1, gossip: 0 },
      },
      async act(a) { await actor(this.acts, 1.2)(a); },
      draw(g, t) {
        const want = V('want'), sorry = V('sorry'), peace = V('peace'), firm = V('firm'), others = V('others'), gossip = V('gossip'), letgo = V('letgo'), straight = V('straight');
        const fu = sc.x.v === 'fu';
        street(g);
        houseSide(g, -40, 96, 214, 104, { door: 14, win: [[-18 + 40, 128]] });
        houseSide(g, 346, 96, 214, 104, { door: 362 });
        // fu: two more neighbors, over the hedge
        ghost(g, others, 300, 206, { scale: 0.74, t, phase: 92, dir: lerp(-0.5, -0.9, straight) });
        ghost(g, others, 332, 206, { scale: 0.74, t, phase: 80, dir: lerp(-0.6, -0.9, straight) });
        hedge(g, 56, 180, 214, 22); hedge(g, 222, 346, 214, 22);
        fence(g, 184, 218, 214, 44, 1);
        // the dispute: a tangle over the fence. It smooths out if you make peace, and shrinks if you hold your ground.
        const knot = (1 - peace) * (1 - firm * 0.45);
        if (knot > 0.01) {
          g.save(); g.globalAlpha = Math.min(1, 1 - peace); g.strokeStyle = INK; g.lineWidth = 1.2; g.beginPath();
          for (let i = 0; i <= 60; i++) { const an = i * 0.85, r = (7 + Math.sin(i * 1.7) * 3.5) * knot, cx = 201 + Math.sin(i * 0.31) * 13 * knot, cy = 124 + Math.cos(i * 0.47) * 5 * knot; const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r * 0.7; i ? g.lineTo(x, y) : g.moveTo(x, y); }
          g.stroke(); g.restore();
        }
        if (peace > 0.01) { g.save(); g.globalAlpha = peace; g.strokeStyle = INK; g.lineWidth = 1.2; g.beginPath(); for (let x = 178; x <= 224; x += 2) { const y = 124 + Math.sin((x - 178) / 46 * Math.PI * 2) * 3; x > 178 ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore(); }
        // the neighbor, and (fu) the other neighbors they talk to
        const nx = fu ? 258 : 284;

        drawPerson(g, nx, 214, { scale: 0.9, t, phase: 91, dir: fu ? lerp(0.8, -0.6, Math.max(letgo, straight)) : lerp(lerp(-0.7, 0.7, firm), -0.8, peace), lArm: [lerp(-3, -9, want), lerp(5, -2, want)] });
        talk(g, nx + 14, 168, 292, 166, gossip * others, t, 10);
        talk(g, nx + 14, 168, 324, 166, gossip * others, t + 0.4, 18);
        say(g, nx + 12, 126, 58, nx + 2, 150, want, 'sorry?');
        // you
        const yx = lerp(124, 156, straight);
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: fu ? lerp(0.7, -0.7, letgo) : lerp(0.7, -0.6, firm), hop: hopY() });
        say(g, yx - 8, 126, 50, yx, 150, sorry * (fu ? 0 : 1), 'sorry');
        say(g, yx + 8, 126, 40, yx + 4, 150, straight);
        talk(g, yx + 28, 136, 300, 162, straight, t, 30);
      },
    },

    // ---------------------------------------------------------------- B42 The Rumor
    rumor: {
      base(v) {
        sset({ rum: 1, stand: 0, away: 0, place: 0, stay: 0, step: 0 });
        if (v === 'fu') sset({ stand: 1 });
      },
      shift(v) { if (v === 'fu') sto({ place: 1 }, 1.0); },
      acts: {
        'B42-A': { stand: 1 }, 'B42-B': { away: 1 },
        'B42-FU-A': { stay: 1 }, 'B42-FU-B': { step: 1 },
      },
      async act(a) { await actor(this.acts, 1.2)(a); },
      draw(g, t) {
        const rum = V('rum'), stand = V('stand'), away = V('away'), place = V('place'), stay = V('stay'), step = V('step');
        // string lights across the yard
        g.strokeStyle = INK; g.lineWidth = 1; g.beginPath();
        const ly = x => 56 + 22 * (1 - Math.pow((x - 200) / 200, 2));
        for (let x = 0; x <= 400; x += 8) x ? g.lineTo(x, ly(x)) : g.moveTo(x, ly(x)); g.stroke();
        for (let x = 18; x < 400; x += 32) { g.strokeStyle = INK; line(g, x, ly(x), x, ly(x) + 4); ellipse(g, x, ly(x) + 7.5, 3.2, 3.6); g.fillStyle = PAPER; g.fill(); g.stroke(); }
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 214, 400, 214);
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let x = 10; x < 400; x += 17) line(g, x, 218 + (x % 3) * 4, x - 3, 224 + (x % 3) * 4);
        // the group at the table, turned away; the trip-fund jar between them
        const glance = place * (1 - stay) * 0.9;
        [[70, 100], [126, 101], [182, 200]].forEach(([x, ph]) => drawPerson(g, x, 179, { scale: 0.82, t, phase: ph, dir: -0.45 + glance * 1.3 }));
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.rect(38, 174, 178, 18); g.fill(); g.stroke(); line(g, 50, 192, 50, 212); line(g, 204, 192, 204, 212);
        g.lineWidth = 1.3; g.beginPath(); g.roundRect(146, 156, 18, 18, 3); g.fill(); g.stroke(); g.fillRect(148, 152, 14, 4); g.strokeRect(148, 152, 14, 4);
        g.fillStyle = GRAPH; for (const [x, y] of [[151, 170], [157, 170], [154, 166], [160, 166]]) { ellipse(g, x, y, 2, 1.2); g.fill(); }
        talk(g, 84, 132, 114, 132, rum, t, 6); talk(g, 140, 132, 170, 132, rum, t + 0.5, 6);
        // fu: the group's circle, with your empty place in it
        const ring = place * (1 - stay * 0.0), rx2 = lerp(252, 222, stay);
        if (ring > 0.01) {
          g.save(); g.globalAlpha = ring; g.strokeStyle = INK; g.lineWidth = 1.1; g.setLineDash([3, 4]);
          g.beginPath(); g.roundRect(26, 110, rx2 - 26, 110, 24); g.stroke(); g.restore();
          chair(g, 234, 194, -1, 214, place * (1 - stay), true);
        }
        // the friend the rumor is about
        const fx = 354;
        drawPerson(g, fx, 214, { scale: 0.9, t, phase: 103, dir: lerp(-0.25, -0.8, stand) });
        // you
        const yx = lerp(lerp(lerp(274, 300, stand), 232, away), 270, step);
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: lerp(lerp(0, 0.8, stand), -0.7, Math.max(away, step * 0.6)) });
        thread(g, yx + 8, 174, fx - 8, 174, 16, stand * (1 - away), step > 0.5);
      },
    },

    // ---------------------------------------------------------------- B44 The Unlocked Phone
    phone: {
      base(v) {
        sset({ glow: 1, doubt: 1, turn: 0, pick: 0, report: 0, rest: 0 });
        if (v === 'fu') sset({ glow: 0.15, doubt: 0, turn: 1 });
      },
      shift(v) { if (v === 'fu') { sto({ report: 1 }, 1.0); sto({ doubt: 1 }, 0.8); } },
      acts: {
        'B44-A': { turn: 1, glow: 0.15, doubt: 0 }, 'B44-B': { pick: 1, glow: 1, doubt: 0 },
        'B44-FU-A': { pick: 1, turn: 0, glow: 1, doubt: 0 }, 'B44-FU-B': { rest: 1, glow: 0, doubt: 0 },
      },
      async act(a) { await actor(this.acts, 1.3)(a); },
      draw(g, t) {
        const glow = V('glow'), doubt = V('doubt'), turn = V('turn'), pick = V('pick'), report = V('report'), rest = V('rest');
        indoor(g);
        const partner = npcLook(150);
        // a photo of the two of you on the wall
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(52, 64, 54, 42); g.strokeRect(52, 64, 54, 42);
        g.lineWidth = 1; g.strokeRect(56, 68, 46, 34);
        g.save(); g.beginPath(); g.rect(57, 69, 44, 32); g.clip();
        drawPerson(g, 70, 102, { me: true, scale: 0.34, t: 0, dir: 0.5 }); drawPerson(g, 88, 102, { look: partner, scale: 0.34, t: 0, dir: -0.5 });
        g.restore();
        // the table, and the phone lying face up on it
        table(g, 120, 238, 180);
        const lift = ease(clamp01(pick));
        if (lift < 0.98) {
          g.save(); g.globalAlpha = 1 - lift; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
          g.beginPath(); g.moveTo(168, 179); g.lineTo(188, 179); g.lineTo(193, 173); g.lineTo(173, 173); g.closePath(); g.fill(); g.stroke();
          g.fillStyle = glow > 0.5 ? PAPER : INK; g.beginPath(); g.moveTo(172, 177.5); g.lineTo(186, 177.5); g.lineTo(189.5, 174.5); g.lineTo(175.5, 174.5); g.closePath(); g.fill();
          g.strokeStyle = GRAPH; g.lineWidth = 1; g.globalAlpha = (1 - lift) * glow;
          for (const r of [7, 12]) { g.beginPath(); g.arc(181, 172, r, 1.15 * Math.PI, 1.85 * Math.PI); g.stroke(); }
          g.restore();
        }
        // the bathroom door, closed, with steam slipping out over it
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(304, 100, 50, 110); g.strokeRect(304, 100, 50, 110);
        g.lineWidth = 1.3; ellipse(g, 312, 158, 2, 2); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(312, 110, 34, 30);
        steam(g, 318, 96, t); steam(g, 340, 96, t + 0.7);
        // you
        const yx = lerp(lerp(262, 278, turn), 244, pick);
        drawPerson(g, yx, 212, { me: true, scale: 0.9, t, dir: lerp(lerp(-0.6, 0.8, turn), -0.3, pick), rArm: [lerp(3, 4, lift), lerp(5, -8, lift)] });
        if (lift > 0.02) {
          const px = lerp(181, yx + 18, lift), py = lerp(176, 186, lift) - Math.sin(lift * Math.PI) * 14;
          handset(g, px, py, lerp(1.4, 0.1, lift), 1);
          if (glow > 0.5 && lift > 0.9) { g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1; g.globalAlpha = (lift - 0.9) * 10; g.beginPath(); g.arc(px - 2, py - 2, 9, 1.1 * Math.PI, 1.5 * Math.PI); g.stroke(); g.restore(); }
        }
        if (doubt > 0.02) txt(g, '?', yx + 2, 150, 20, doubt * (0.55 + (reduce ? 0.45 : 0.45 * Math.sin(t * 1.6))), SANS(20));
        // fu: what your friend says they saw. Dashed, because it only looked like a date.
        const rp = report * (1 - rest);
        if (rp > 0.01) {
          const cx = 190, cy = 62, r = 34;
          frame(g, cx, cy, r, rp, true);
          clipCircle(g, cx, cy, r); g.globalAlpha = rp;
          g.strokeStyle = HAIR; g.lineWidth = 1; line(g, cx - r, cy + 22, cx + r, cy + 22);
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; g.fillRect(cx - 9, cy + 6, 18, 3); g.strokeRect(cx - 9, cy + 6, 18, 3); line(g, cx, cy + 9, cx, cy + 22);
          g.fillRect(cx - 1.5, cy, 3, 6); g.strokeRect(cx - 1.5, cy, 3, 6);
          g.restore();
          faded(g, rp, o => { clipCircle(o, cx, cy, r); drawPerson(o, cx - 16, cy + 22, { look: partner, scale: 0.5, t, dir: 0.7 }); drawPerson(o, cx + 16, cy + 22, { scale: 0.5, t, phase: 151, dir: -0.7 }); o.restore(); });
          thread(g, yx - 4, 168, cx + 26, cy + 26, 4, rp * 0.6, true);
        }
      },
    },

    // ---------------------------------------------------------------- B46 The Nightly Call
    nightcall: {
      base(v) {
        sset({ more: 0, talkB: 0, down: 0, others: 0, only: 0 });
        if (v === 'fu') sset({ others: 0.8 });
      },
      shift(v) { if (v === 'fu') { sto({ others: 0 }, 1.6); sto({ only: 1 }, 1.4); } },
      acts: {
        'B46-A': { more: 1 }, 'B46-B': { talkB: 1 },
        'B46-FU-A': { more: 1 }, 'B46-FU-B': { talkB: 1 },
      },
      async act(a) {
        await actor(this.acts, 1.2, async (id, m) => { sto(m, 1.2); if (m.talkB) { await sleep(800); sto({ down: 1 }, 1.2); } })(a);
      },
      draw(g, t) {
        const more = V('more'), talkB = V('talkB'), down = V('down'), others = V('others'), only = V('only');
        moon(g, 132, 40, 9, 1); stars(g, [[40, 30], [176, 22], [240, 44], [212, 18]], 1);
        // one small moon for every night of calls
        const nights = 6 + more * 2;
        for (let k = 0; k < 8; k++) { const a = clamp01(nights - k); if (a > 0.01) moon(g, 156 + k * 16, 76, 5, a * 0.85); }
        street(g);
        houseSide(g, -34, 96, 214, 120, { door: 12 });
        // the letters piling up by your door while the calls go on
        const pile = 4 + more * 2 - down * 3;
        for (let k = 0; k < 6; k++) { const a = clamp01(pile - k); if (a > 0.01) paper(g, 76 + (k % 2) * 4, 210 - k * 4, 20, 5, ((k % 3) - 1) * 0.08, a); }
        // the porch bench
        g.strokeStyle = INK; g.lineWidth = 1.6; g.fillStyle = PAPER;
        line(g, 124, 166, 244, 166); line(g, 124, 176, 244, 176); line(g, 128, 160, 128, 192); line(g, 240, 160, 240, 192);
        g.beginPath(); g.rect(118, 192, 132, 5); g.fill(); g.stroke(); line(g, 126, 197, 126, 214); line(g, 242, 197, 242, 214);
        lamp(g, 290, 214, 70);
        // you, on the phone
        const yx = 184;
        drawPerson(g, yx, 192, { me: true, scale: 0.9, t, sit: true, dir: 0.6, rArm: [lerp(2, 4, down), lerp(-10, 5, down)] });
        const phy = lerp(164, 186, down);
        handset(g, yx + 17, phy, lerp(0.2, 0, down), 1);
        marks(g, 'waves', yx + 17, 160, 1 - Math.max(down, talkB), t);
        say(g, yx + 34, 128, 40, yx + 22, 150, talkB * (1 - down * 0.6));
        // your friend, at their window
        const cx = 350, cy = 108, r = 36;
        frame(g, cx, cy, r, 1);
        clipCircle(g, cx, cy, r);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.strokeRect(cx - 4, cy - 26, 30, 26); line(g, cx + 11, cy - 26, cx + 11, cy);
        moon(g, cx + 18, cy - 18, 3.5, 1);
        g.strokeStyle = HAIR; line(g, cx - r, cy + 24, cx + r, cy + 24);
        drawPerson(g, cx - 8, cy + 24, { scale: 0.58, t: reduce ? 0 : t * 0.6, phase: 200, dir: -0.6, lArm: [-2, -10] });
        g.save(); g.translate(cx - 19, cy + 5); g.scale(0.75, 0.75); handset(g, 0, 0, -0.2, 1); g.restore();
        g.restore();
        // the call: a thread from you to them (fu: the others they used to talk to fade away)
        thread(g, yx + 20, 158, cx - r + 2, cy + 6, 22, 1 - down * 0.5, down > 0.5, 1.1 + only * 0.8);
        if (others > 0.01) {
          g.save(); g.globalAlpha = others; g.strokeStyle = INK; g.lineWidth = 1; g.setLineDash([2, 3]);
          for (const [ox, oy] of [[388, 42], [306, 40], [392, 178]]) {
            line(g, cx + (ox - cx) * 0.55, cy + (oy - cy) * 0.55, ox, oy);
            g.fillStyle = PAPER; ellipse(g, ox, oy, 6, 6); g.fill(); g.stroke();
          }
          g.restore();
        }
      },
    },

    // ---------------------------------------------------------------- Q3 The Confession
    confession: {
      base(v) {
        sset({ whisper: 1, lean: 1, tell: 0, out: 0, toward: 0, plea: 0, nod: 0, gone: 0, arrive: 0, months: 0, q: 0, shrug: 0 });
        if (v === 'fuA') sset({ whisper: 0, toward: 0.5 });
        if (v === 'fuB') sset({ whisper: 0, lean: 0, out: 1 });
        sc.x.v = v;
      },
      shift(v) {
        if (v === 'fuA') { sto({ plea: 1, lean: 1.6 }, 1.0); }
        if (v === 'fuB') { sto({ gone: 1 }, 2.4); sto({ months: 1 }, 1.1); sto({ arrive: 1 }, 1.7); sto({ q: 1 }, 1.0); }
      },
      acts: {
        'Q3-A': { tell: 1, whisper: 0 }, 'Q3-B': { out: 1, whisper: 0 },
        'Q3-FUA-A': { tell: 1, plea: 0.4 }, 'Q3-FUA-B': { nod: 1, plea: 0, toward: 0 },
        'Q3-FUB-A': { tell: 1, q: 0.3 }, 'Q3-FUB-B': { shrug: 1, q: 0.3 },
      },
      async act(a) { await actor(this.acts, 1.2)(a); if (a && a.id === 'Q3-FUA-B') sc.x.hop = 1; },
      draw(g, t) {
        const whisper_ = V('whisper'), lean = V('lean'), tell = V('tell'), out = V('out'), toward = V('toward'), plea = V('plea'), nod = V('nod'), gone = V('gone'), arrive = V('arrive'), months = V('months'), q = V('q'), shrug = V('shrug');
        indoor(g);
        const partner = npcLook(171);
        // the café window, and the partner outside it
        const wx = 238, wy = 38, ww = 136, wh = 88;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(wx, wy, ww, wh); g.strokeRect(wx, wy, ww, wh);
        g.save(); g.beginPath(); g.rect(wx + 1, wy + 1, ww - 2, wh - 2); g.clip();
        g.strokeStyle = HAIR; g.lineWidth = 1; line(g, wx, wy + 76, wx + ww, wy + 76);
        tree(g, wx + 112, wy + 80, 0.7, t, 2);
        faded(g, 1 - clamp01(arrive / 0.4), o => drawPerson(o, wx + 72, wy + 80, { look: partner, scale: 0.55, t, dir: lerp(0.3, -0.8, tell * (1 - gone)) }));
        if (months > 0.01) for (let k = 0; k < 4; k++) { // a few leaves drifting down: months have passed
          const u = reduce ? (k + 0.5) / 4 : (t * 0.16 + k / 4) % 1, lx = wx + 16 + k * 30 + (reduce ? 0 : Math.sin(t * 0.9 + k) * 5), lyy = wy + 6 + u * 70;
          g.save(); g.globalAlpha = months * Math.sin(u * Math.PI); g.translate(lx, lyy); g.rotate(reduce ? k : Math.sin(t * 1.1 + k) * 0.8 + k);
          g.beginPath(); g.moveTo(-3.5, 0); g.quadraticCurveTo(0, -2.6, 3.5, 0); g.quadraticCurveTo(0, 2.6, -3.5, 0); g.fillStyle = PAPER; g.fill(); g.strokeStyle = INK; g.lineWidth = 1; g.stroke(); g.restore();
        }
        g.restore();
        g.strokeStyle = INK; g.lineWidth = 1.3; line(g, wx + ww / 2, wy, wx + ww / 2, wy + wh);
        // a hanging lamp
        g.lineWidth = 1.2; line(g, 150, 0, 150, 30); g.fillStyle = PAPER; g.lineWidth = 1.4;
        g.beginPath(); g.moveTo(140, 42); g.lineTo(160, 42); g.lineTo(155, 30); g.lineTo(145, 30); g.closePath(); g.fill(); g.stroke();
        // the counter, two cups, two stools
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.rect(40, 158, 220, 7); g.fill(); g.stroke();
        g.beginPath(); g.rect(46, 165, 208, 45); g.fill(); g.stroke();
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = 66; x < 254; x += 20) line(g, x, 167, x, 208);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
        for (const cx of [120, 200]) { g.beginPath(); g.moveTo(cx - 7, 146); g.lineTo(cx - 6, 158); g.lineTo(cx + 6, 158); g.lineTo(cx + 7, 146); g.closePath(); g.fill(); g.stroke(); steam(g, cx, 144, t + cx); }
        for (const sx of [128, 196]) { g.strokeStyle = INK; g.lineWidth = 1.8; g.fillStyle = PAPER; g.beginPath(); g.roundRect(sx - 13, 186, 26, 5, 2); g.fill(); g.stroke(); line(g, sx, 191, sx, 208); line(g, sx - 9, 209, sx + 9, 209); }
        // your friend, leaning in to tell you (fuB: gone, and later the partner sits there instead)
        const fx = 128 + lean * 5;
        ghost(g, 1 - gone, fx, 186, { scale: 0.9, t, phase: 161, sit: true, dir: 0.8, mood: plea > 0.4 ? 'worried' : null, lArm: [lerp(-3, 6, plea), lerp(5, -8, plea)], rArm: [lerp(3, 2, plea), lerp(5, -9, plea)] });
        ghost(g, clamp01((arrive - 0.45) / 0.55), 128, 186, { look: partner, scale: 0.9, t, sit: true, dir: 0.8 });
        whisper(g, fx + 14, 156, 1, whisper_ * (1 - gone), t);
        say(g, fx - 6, 112, 56, fx + 4, 132, plea * (1 - gone), 'please');
        query(g, 116, 116, 124, 138, q * clamp01((arrive - 0.45) / 0.55));
        // you
        const yx = 196, ydir = shrug > 0.01 ? -0.7 : lerp(lerp(lerp(-0.8, 0.9, Math.max(toward, tell * (1 - arrive))), 0, out * (1 - arrive)), -0.8, Math.max(nod, arrive));
        drawPerson(g, yx, 186, { me: true, scale: 0.9, t, sit: true, dir: ydir, hop: hopY(), lArm: [lerp(-3, -10, shrug), lerp(5, -6, shrug)], rArm: [lerp(3, 10, shrug), lerp(5, -6, shrug)] });
        thread(g, yx - 10, 150, fx + 10, 150, 14, (1 - gone) * 0.9);
        thread(g, yx + 8, 148, wx + 66, wy + 56, 18, 0.55 * (1 - arrive), true);
        thread(g, yx - 10, 150, 138, 150, 14, arrive * 0.9);
        const tx = arrive > 0.5 ? 140 : wx + 64, ty = arrive > 0.5 ? 150 : wy + 52;
        talk(g, yx + (arrive > 0.5 ? -14 : 14), 146, tx, ty, tell, t, arrive > 0.5 ? 10 : 20);
      },
    },

    // ---------------------------------------------------------------- B45 The Friend's Big Break
    bigbreak: {
      base() { sset({ call: 1, glad: 0, sting: 0, luck: 0, ease: 0, hard: 0 }); },
      shift(v) { if (v === 'fu') sto({ luck: 1 }, 0.9); },
      acts: {
        'B45-A': { glad: 1, call: 0.4 }, 'B45-B': { sting: 1, call: 0.4 },
        'B45-FU-A': { ease: 1, call: 0.4 }, 'B45-FU-B': { hard: 1, call: 0.4 },
      },
      async act(a) { await actor(this.acts, 1.2)(a); if (a && /-(A|FU-A)$/.test(a.id)) sc.x.hop = 1; },
      draw(g, t) {
        const call = V('call'), glad = V('glad'), sting = V('sting'), luck = V('luck'), easy = V('ease'), hard = V('hard');
        street(g);
        // your front stoop: a door and three steps
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.rect(84, 60, 172, 118); g.fill(); g.stroke();
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let y = 69; y < 178; y += 9) line(g, 85, y, 255, y);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(146, 100, 46, 78); g.strokeRect(146, 100, 46, 78);
        g.lineWidth = 1.2; g.strokeRect(152, 108, 34, 26); ellipse(g, 185, 142, 1.8, 1.8); g.stroke();
        g.lineWidth = 1.6; line(g, 140, 98, 198, 98);
        for (const [x1, x2, y] of [[124, 214, 178], [112, 226, 190], [100, 238, 202]]) { g.fillStyle = PAPER; g.beginPath(); g.rect(x1, y, x2 - x1, 12); g.fill(); g.stroke(); }
        // the friend's news, in a round window
        const cx = 322, cy = 92, r = 44;
        frame(g, cx, cy, r, 1);
        clipCircle(g, cx, cy, r);
        g.strokeStyle = HAIR; g.lineWidth = 1; line(g, cx - r, cy + 30, cx + r, cy + 30);
        drawPerson(g, cx - 4, cy + 32, { scale: 0.72, t, phase: 210, dir: -0.3, lArm: [-6, -14], rArm: [6, -14] });
        star(g, cx + 22, cy - 18, 8, 1, false);
        sparkle(g, cx - 26, cy - 14, 3, 0.9); sparkle(g, cx + 30, cy + 8, 2.4, 0.9);
        if (luck > 0.01) { const u = ease(clamp01(luck)); die(g, lerp(cx + 4, cx + 22, u), lerp(cy - 50, cy + 22, u), (1 - u) * 2.6, 1); }
        g.restore();
        // you, sitting on the step with the phone
        const yx = 166, dn = Math.max(sting, hard);
        drawPerson(g, yx, 202, { me: true, scale: 0.9, t, sit: true, dir: lerp(0.6, 0.05, dn), hop: hopY(), rArm: [lerp(2, 4, 1 - call), lerp(-10, 5, 1 - call)] });
        handset(g, yx + 17, lerp(186, 172, call), 0.2, 1);
        marks(g, 'waves', yx + 17, 168, Math.max(0, call - 0.5) * 2, t);
        thread(g, yx + 20, 166, cx - r + 2, cy + 10, 22, 0.9);
        // what you've wanted for years: the same star, in a thought above you
        const want = 1 - easy * 0.6;
        g.save(); g.globalAlpha = want; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2;
        [[yx - 22, 150, 2.2], [yx - 46, 134, 2.8], [yx - 72, 118, 3.4]].forEach(([x, y, rr]) => { ellipse(g, x, y, rr, rr); g.fill(); g.stroke(); });
        g.lineWidth = 1.4; g.beginPath(); g.roundRect(18, 64, 60, 42, 21); g.fill(); g.stroke(); g.restore();
        star(g, 48, 85, 10, want, hard > 0.5);
        if (dn > 0.01) { g.save(); g.globalAlpha = dn; g.strokeStyle = GRAPH; g.lineWidth = 1.2; g.beginPath(); for (let k = 0; k <= 14; k++) { const x = yx + 8 + k * 1.6, y = 140 - Math.sin(k * 1.3) * 2.4; k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore(); }
        heart(g, yx + 26, 132, 12, Math.max(glad, easy), false);
      },
    },

    // ---------------------------------------------------------------- B36 What Forgiveness Is Owed
    forgive: {
      base() { sset({ mend: 0, hold: 0, ask: 0, close: 0, far: 0 }); },
      shift(v) { if (v === 'fu') sto({ ask: 1 }, 1.0); },
      acts: {
        'B36-A': { mend: 1 }, 'B36-B': { hold: 1 },
        'B36-FU-A': { close: 1, mend: 1 }, 'B36-FU-B': { far: 1, mend: 1 },
      },
      async act(a) { await actor(this.acts, 1.1)(a); },
      draw(g, t) {
        const mend = V('mend'), hold = V('hold'), ask = V('ask'), close = V('close'), far = V('far');
        fence(g, 0, 400, 178, 24, 0.25);
        tree(g, 372, 214, 1.1, t, 6);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 214, 400, 214);
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let x = 10; x < 400; x += 19) line(g, x, 218 + (x % 3) * 4, x - 3, 224 + (x % 3) * 4);
        // a year has gone by: twelve marks, and a plant that has grown
        yearMarks(g, 146, 30, 1);
        const pxl = 50;
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, pxl, 214, pxl, 158);
        for (const [y, s] of [[196, -1], [184, 1], [172, -1], [162, 1]]) { g.save(); g.translate(pxl, y); g.rotate(s * 0.6); g.fillStyle = PAPER; ellipse(g, s * 7, 0, 7, 3); g.fill(); g.stroke(); g.restore(); }
        ellipse(g, pxl, 154, 3.2, 4); g.fillStyle = PAPER; g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (const x of [22, 76, 196, 214, 336]) { line(g, x, 214, x, 204); ellipse(g, x, 202, 2.4, 2.4); g.stroke(); }
        // two chairs: yours, and theirs (fu: they ask to bring it close again)
        const cx2 = lerp(lerp(300, 158, ask), 266, far);
        chair(g, 112, 192, 1, 214, 1);
        chair(g, cx2, 192, -1, 214, 1, ask > 0.05 && close < 0.5 && far < 0.5);
        const seated = Math.max(close, far), ox = lerp(266, cx2, seated);
        drawPerson(g, ox, seated > 0.6 ? 192 : 214, { scale: 0.9, t, phase: 220, sit: seated > 0.6, dir: lerp(-0.5, -0.8, Math.max(mend, ask)), lArm: ask > 0.05 && seated < 0.6 ? [lerp(3, -12, ask), lerp(3, -2, ask)] : [3, 3], rArm: [-3, 3], hop: hopY() });
        query(g, ox + 8, 118, ox, 140, ask * (1 - seated));
        const standing = hold > 0.5;
        drawPerson(g, standing ? 118 : 112, standing ? 214 : 192, { me: true, scale: 0.9, t, sit: !standing, dir: 0.6, rArm: standing ? [8, -2] : [3, 5] });
        brokenThread(g, standing ? 132 : 126, standing ? 172 : 160, ox - 10, seated > 0.6 ? 160 : 170, 24, 0.12 * (1 - mend), 1, far > 0.5);
      },
    },

    // ---------------------------------------------------------------- D7 The Uncomfortable Truth
    fiance: {
      base(v) {
        sset({ past: 0.6, tell: 0, quiet: 0, come: 0, ask: 0, no: 0 });
        if (v === 'fu') sset({ past: 0.3 });
      },
      shift(v) { if (v === 'fu') { sto({ come: 1 }, 1.0); sto({ ask: 1, past: 0.6 }, 0.8); } },
      acts: {
        'D7-A': { tell: 1 }, 'D7-B': { quiet: 1, past: 0.15 },
        'D7-FU-A': { tell: 1, ask: 0 }, 'D7-FU-B': { no: 1, ask: 0, past: 0.1 },
      },
      async act(a) { await actor(this.acts, 1.2)(a); },
      draw(g, t) {
        const past = V('past'), tell = V('tell'), quiet = V('quiet'), come = V('come'), ask = V('ask'), no = V('no');
        street(g);
        tree(g, 30, 214, 0.95, t, 3);
        // the garden arch
        const ax = 300;
        g.strokeStyle = INK; g.lineWidth = 2; line(g, ax - 38, 214, ax - 38, 116); line(g, ax + 38, 214, ax + 38, 116);
        g.beginPath(); g.arc(ax, 116, 38, Math.PI, 0); g.stroke();
        g.fillStyle = PAPER; g.lineWidth = 1.1;
        for (let k = 0; k < 22; k++) {
          const u = k / 21, an = Math.PI + u * Math.PI, onArc = k % 3 !== 2;
          const x = onArc ? ax + Math.cos(an) * 38 : (k % 2 ? ax - 38 : ax + 38), y = onArc ? 116 + Math.sin(an) * 38 : 130 + (k * 7) % 70;
          g.save(); g.translate(x + Math.sin(k * 2.1) * 3, y); g.rotate(k * 1.3); ellipse(g, 0, 0, 4, 2.2); g.fill(); g.stroke(); g.restore();
        }
        // the couple under it, tied together
        const fiance = npcLook(231);
        const fx = lerp(282, 168, come);
        drawPerson(g, ax + 18, 214, { look: fiance, scale: 0.9, t, dir: lerp(-0.6, -0.8, come) });
        drawPerson(g, fx, 214, { scale: 0.9, t, phase: 230, dir: come > 0.5 ? -0.7 : lerp(0.6, -0.8, tell) });
        thread(g, fx + 8, 176, ax + 10, 176, 12, 1 - come * 0.4);
        query(g, fx - 6, 122, fx - 2, 146, ask);
        // what you know: long ago, behind bars. A faint memory.
        const mx = 138, my = 62, mr = 30;
        if (past > 0.01) {
          frame(g, mx, my, mr, past);
          clipCircle(g, mx, my, mr); g.globalAlpha = past;
          g.strokeStyle = HAIR; g.lineWidth = 1; line(g, mx - mr, my + 20, mx + mr, my + 20);
          g.globalAlpha = 1; faded(g, past, o => drawPerson(o, mx, my + 22, { look: fiance, scale: 0.55, t: 0, dir: 0.2 }));
          g.globalAlpha = past; g.strokeStyle = INK; g.lineWidth = 1.8; for (let x = mx - 21; x <= mx + 21; x += 8.4) line(g, x, my - mr, x, my + mr);
          g.restore();
          thread(g, mx + mr - 2, my + 10, ax + 10, 168, -10, past * 0.5, true);
        }
        // you
        const yx = lerp(96, 214, tell * (1 - come));
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: 0.6, lArm: quiet > 0.5 ? [4, 3] : [-3, 5], rArm: quiet > 0.5 ? [-4, 3] : [3, 5] });
        thread(g, yx + 8, 178, fx - 8, 178, 22, 0.8 * (1 - come));
        talk(g, yx + 14, 150, fx - 12, 150, tell, t, 12);
        say(g, yx + 18, 124, 40, yx + 8, 148, no);
      },
    },

    // ---------------------------------------------------------------- B10 What We Owe Our Parents
    parents: {
      base() { sset({ toP: 0, toM: 0 }); },
      acts: { 'B10-A': { toP: 1 }, 'B10-B': { toM: 1 } },
      async act(a) { await actor(this.acts, 1.0)(a); },
      draw(g, t) {
        const toP = V('toP'), toM = V('toM');
        street(g);
        // your parents' house: a porch with a swing
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.rect(-4, 64, 150, 132); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(-14, 64); g.lineTo(70, 22); g.lineTo(156, 64); g.closePath(); g.fill(); g.stroke();
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let y = 73; y < 196; y += 9) line(g, -3, y, 145, y);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(102, 136, 26, 60); g.strokeRect(102, 136, 26, 60);
        g.lineWidth = 1.8; line(g, -4, 100, 168, 100); line(g, 162, 100, 162, 196);
        g.fillStyle = PAPER; g.lineWidth = 1.6; g.beginPath(); g.rect(-4, 196, 170, 6); g.fill(); g.stroke();
        g.beginPath(); g.rect(166, 204, 16, 10); g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let x = 6; x < 166; x += 10) line(g, x, 202, x + 5, 214);
        { const sw = reduce ? 0 : Math.sin(t * 0.6) * 1.4; // the swing, barely moving
          g.strokeStyle = INK; g.lineWidth = 1; line(g, 22, 100, 22 + sw, 166); line(g, 70, 100, 70 + sw, 166);
          g.fillStyle = PAPER; g.lineWidth = 1.5; g.beginPath(); g.rect(16 + sw, 166, 60, 5); g.fill(); g.stroke(); line(g, 18 + sw, 166, 18 + sw, 150); line(g, 18 + sw, 150, 74 + sw, 150); }
        // your parents, on the porch
        const pd = lerp(0.6, -0.6, toM);
        faded(g, 1 - toM * 0.25, o => { drawPerson(o, 100, 196, { scale: 0.92, t, phase: 170, dir: pd }); drawPerson(o, 134, 196, { scale: 0.92, t, phase: 171, dir: pd }); });
        // what they gave: years ago, the three of you
        const mx = 210, my = 58, mr = 30;
        frame(g, mx, my, mr, 1);
        clipCircle(g, mx, my, mr);
        g.strokeStyle = HAIR; g.lineWidth = 1; line(g, mx - mr, my + 22, mx + mr, my + 22);
        drawPerson(g, mx - 15, my + 26, { scale: 0.6, t, phase: 170, dir: 0.4, rArm: [6, 2] });
        drawPerson(g, mx + 15, my + 26, { scale: 0.6, t, phase: 171, dir: -0.4, lArm: [-6, 2] });
        drawPerson(g, mx, my + 26, { me: true, scale: 0.36, t, dir: 0 });
        g.restore();
        // the person you want to marry
        const px = 336;
        tree(g, 384, 214, 0.9, t, 4);
        faded(g, 1 - toP * 0.25, o => drawPerson(o, px, 214, { scale: 0.9, t, phase: 172, dir: lerp(-0.6, 0.5, toP) }));
        // you, tied to both
        const yx = lerp(lerp(232, 196, toP), 296, toM);
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: lerp(lerp(0, -0.8, toP), 0.8, toM) });
        thread(g, yx - 8, 176, 120, 160, 22, 1 - toM * 0.55, toM > 0.5);
        thread(g, yx + 8, 176, px - 8, 176, 18, 1 - toP * 0.55, toP > 0.5);
      },
    },

    // ---------------------------------------------------------------- Q5 The Inheritance
    inheritance: {
      base(v) {
        sset({ whisper: 1, hold: 0, split: 0, keep: 0, chair: 0, far: 0, bills: 0 });
        if (v === 'fuA') sset({ whisper: 0 });
        if (v === 'fuB') sset({ whisper: 0, hold: 1 });
      },
      shift(v) {
        if (v === 'fuA') { sto({ chair: 1 }, 1.0); sto({ far: 1 }, 0.8); }
        if (v === 'fuB') sto({ bills: 1 }, 1.0);
      },
      acts: {
        'Q5-A': { split: 1, whisper: 0 }, 'Q5-B': { hold: 1, whisper: 0 },
        'Q5-FUA-A': { hold: 1 }, 'Q5-FUA-B': { split: 1 },
        'Q5-FUB-A': { keep: 1 }, 'Q5-FUB-B': { split: 1 },
      },
      async act(a) { await actor(this.acts, 1.0)(a); },
      draw(g, t) {
        const whisper_ = V('whisper'), hold = V('hold'), split = V('split'), keep = V('keep'), chairA = V('chair'), far = V('far'), bills = V('bills');
        indoor(g);
        // window with a low sun
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(170, 40, 62, 52); g.strokeRect(170, 40, 62, 52);
        g.save(); g.beginPath(); g.rect(170, 40, 62, 52); g.clip(); g.strokeStyle = GRAPH; g.lineWidth = 1.2; g.beginPath(); g.arc(201, 88, 10, Math.PI, 0); g.stroke(); line(g, 170, 88, 232, 88); g.restore();
        g.strokeStyle = INK; g.lineWidth = 1.2; line(g, 201, 40, 201, 92); g.lineWidth = 2; line(g, 166, 94, 236, 94);
        // bed with your parent sitting up, and the bedside table with the will
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.roundRect(350, 132, 10, 78, 3); g.fill(); g.stroke();
        g.beginPath(); g.roundRect(314, 160, 34, 16, 7); g.fill(); g.stroke();
        drawPerson(g, 304, 186, { look: asleep(240), scale: 0.95, t: reduce ? 0 : t * 0.5, sit: true, dir: -0.6, lArm: [-12, 4] });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.roundRect(222, 180, 132, 18, 5); g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let x = 238; x < 346; x += 16) line(g, x, 184, x + 6, 194);
        g.strokeStyle = INK; g.lineWidth = 1.6; line(g, 230, 198, 230, 210); line(g, 346, 198, 346, 210);
        table(g, 364, 398, 172);
        whisper(g, 280, 150, -1, whisper_, t);
        // fuA: the chair you sat in for years, worn; a cup still warm
        if (chairA > 0.01) {
          g.save(); g.globalAlpha = chairA;
          chair(g, 142, 190, 1, 210, 1);
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(128, 182, 30, 8, 4); g.fill(); g.stroke();
          g.strokeStyle = GRAPH; g.lineWidth = 1; for (let k = 0; k < 4; k++) line(g, 128 + k * 2, 168 - k * 6, 128 + k * 2, 174 - k * 6);
          g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.moveTo(370, 162); g.lineTo(371, 172); g.lineTo(379, 172); g.lineTo(380, 162); g.closePath(); g.fillStyle = PAPER; g.fill(); g.stroke();
          g.restore();
          if (chairA > 0.5) { g.save(); g.globalAlpha = chairA; steam(g, 375, 160, t); g.restore(); }
        }
        // you
        const yx = 196;
        drawPerson(g, yx, 212, { me: true, scale: 0.9, t, dir: lerp(0.6, -0.3, Math.max(split, keep) * 0.6), rArm: [lerp(3, 6, hold), lerp(5, -2, hold)] });
        // your sibling, in a round window (fuA: estranged for years; fuB: struggling with bills)
        const sx = 64, sy = 74, sr = lerp(34, 44, bills), sa = 1 - far * 0.55;
        frame(g, sx, sy, sr, sa);
        clipCircle(g, sx, sy, sr); g.globalAlpha = sa;
        g.strokeStyle = HAIR; g.lineWidth = 1; line(g, sx - sr, sy + 22, sx + sr, sy + 22);
        g.restore();
        faded(g, sa * (1 - bills), o => { clipCircle(o, sx, sy, sr); drawPerson(o, sx, sy + 24, { scale: 0.6, t, phase: 241, dir: 0.4 }); o.restore(); });
        if (bills > 0.01) {
          faded(g, bills, o => {
            clipCircle(o, sx, sy, sr);
            drawPerson(o, sx - 14, sy + 22, { scale: 0.56, t, phase: 241, sit: true, dir: 0.6, mood: 'worried', lArm: [4, 2], rArm: [9, 0] });
            o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3; o.beginPath(); o.rect(sx - 2, sy + 4, 38, 4); o.fill(); o.stroke(); line(o, sx + 4, sy + 8, sx + 4, sy + 30); line(o, sx + 32, sy + 8, sx + 32, sy + 30);
            for (let k = 0; k < 4; k++) paper(o, sx + 6 + k * 8, sy - 1 + (k % 2) * 2, 9, 11, (k - 1.5) * 0.25, 1);
            o.restore();
          });
        }
        hourglass(g, sx + sr - 4, sy - sr + 8, far, t);
        thread(g, yx - 10, 176, sx + sr * 0.7, sy + sr * 0.7, 12, sa * 0.9, far > 0.5);
        // the will: whole, or split down the middle
        const tblX = 381, tblY = 158, handX = yx + 20, handY = 186;
        const wx = lerp(tblX, handX, ease(clamp01(hold))), wy = lerp(tblY, handY, ease(clamp01(hold))) - Math.sin(clamp01(hold) * Math.PI) * 24;
        const ks = 1 - keep * 0.3;
        if (split < 0.3) {
          paper(g, wx + keep * -8, wy - keep * 6, 18 * ks, 24 * ks, 0, 1);
          g.save(); g.strokeStyle = INK; g.lineWidth = 1; g.setLineDash([2, 2]); line(g, wx + keep * -8, wy - keep * 6 - 12 * ks, wx + keep * -8, wy - keep * 6 + 12 * ks); g.restore();
        } else {
          const u = ease(clamp01((split - 0.3) / 0.7));
          const ax2 = lerp(wx - 6, sx + sr * 0.5, u), ay2 = lerp(wy, sy + sr * 0.55, u) - Math.sin(u * Math.PI) * 30;
          const bx2 = lerp(wx + 6, handX, u), by2 = lerp(wy, handY, u) - Math.sin(u * Math.PI) * 14;
          paper(g, ax2, ay2, 9, 24, -0.05, 1); paper(g, bx2, by2, 9, 24, 0.05, 1);
        }
      },
    },

    // ---------------------------------------------------------------- D1 The Promise About the Home
    carehome: {
      base(v) {
        sset({ stayHome: 0, go: 0, kind: 0, lost: 0, hand: 0, reach: 0, back: 0, stay: 0 });
        if (v === 'fuA') sset({ stayHome: 1 });
        sc.x.v = v;
      },
      shift(v) {
        if (v === 'fuA') { sto({ kind: 1 }, 1.0); sto({ lost: 1 }, 0.8); }
        if (v === 'fuB') sto({ reach: 1 }, 1.0);
      },
      acts: {
        'D1-A': { stayHome: 1 }, 'D1-B': { go: 1 },
        'D1-FUA-A': { go: 1, stayHome: 0 }, 'D1-FUA-B': { hand: 1, lost: 0.3 },
        'D1-FUB-A': { back: 1, reach: 0 }, 'D1-FUB-B': { stay: 1, reach: 0 },
      },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const v = sc.x.v;
        indoor(g);
        const parent = npcLook(250), kindLook = npcLook(252);
        if (v !== 'fuB') {
          const stayHome = V('stayHome'), go = V('go'), kind = V('kind'), lost = V('lost'), hand = V('hand');
          // home: a window (a care home stands far off down the street), an armchair, a door to the right
          const wx = 26, wy = 52, ww = 78, wh = 62;
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(wx, wy, ww, wh); g.strokeRect(wx, wy, ww, wh);
          g.save(); g.beginPath(); g.rect(wx + 1, wy + 1, ww - 2, wh - 2); g.clip();
          g.strokeStyle = HAIR; g.lineWidth = 1; line(g, wx, wy + 48, wx + ww, wy + 48);
          g.fillStyle = PAPER; g.strokeStyle = GRAPH; g.lineWidth = 1.1; g.fillRect(wx + 30, wy + 30, 38, 18); g.strokeRect(wx + 30, wy + 30, 38, 18);
          g.beginPath(); g.moveTo(wx + 28, wy + 30); g.lineTo(wx + 49, wy + 21); g.lineTo(wx + 70, wy + 30); g.stroke();
          for (let k = 0; k < 4; k++) g.strokeRect(wx + 33 + k * 9, wy + 35, 5, 5);
          ellipse(g, wx + 16, wy + 36, 7, 8); g.stroke(); line(g, wx + 16, wy + 44, wx + 16, wy + 48);
          g.restore();
          g.strokeStyle = INK; g.lineWidth = 2; line(g, wx - 4, wy + wh + 2, wx + ww + 4, wy + wh + 2);
          const dop = go;
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.strokeRect(350, 104, 42, 106);
          g.beginPath(); g.rect(350, 104, 42 * (1 - dop * 0.75), 106); g.fill(); g.stroke();
          ellipse(g, 350 + 42 * (1 - dop * 0.75) - 6, 158, 2, 2); g.stroke();
          // the promise, long ago: the two of you, hand in hand
          const mx = 196, my = 58, mr = 30, ma = 1 - go * 0.5;
          frame(g, mx, my, mr, ma);
          clipCircle(g, mx, my, mr); g.globalAlpha = ma;
          g.strokeStyle = HAIR; g.lineWidth = 1; line(g, mx - mr, my + 22, mx + mr, my + 22);
          g.restore();
          faded(g, ma, o => {
            clipCircle(o, mx, my, mr);
            drawPerson(o, mx - 12, my + 26, { look: parent, scale: 0.58, t: 0, dir: 0.4, rArm: [2, 4] });
            drawPerson(o, mx + 12, my + 26, { me: true, scale: 0.58, t: 0, dir: -0.4, lArm: [-2, 4] });
            o.strokeStyle = INK; o.lineWidth = 1.1; o.beginPath(); o.arc(mx, my + 12, 3, 0, Math.PI * 2); o.stroke();
            o.restore();
          });
          // your own family, waiting for you: a thread from the right
          const fx = 300, fy = 62, fr = 28;
          frame(g, fx, fy, fr, 1);
          clipCircle(g, fx, fy, fr);
          g.strokeStyle = HAIR; g.lineWidth = 1; line(g, fx - fr, fy + 20, fx + fr, fy + 20);
          drawPerson(g, fx - 8, fy + 22, { scale: 0.5, t, phase: 92, dir: -0.4 }); drawPerson(g, fx + 12, fy + 22, { scale: 0.32, t, phase: 255, dir: -0.4 });
          g.restore();
          // the armchair (back first, then whoever sits in it, then its arms)
          const ax = 132;
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
          g.beginPath(); g.roundRect(ax - 24, 136, 48, 60, 14); g.fill(); g.stroke();
          g.beginPath(); g.roundRect(ax - 26, 188, 52, 12, 4); g.fill(); g.stroke(); line(g, ax - 20, 200, ax - 22, 210); line(g, ax + 20, 200, ax + 22, 210);
          // the kind carer (fuA), hand on your parent's shoulder
          ghost(g, kind, ax - 40, 210, { look: kindLook, scale: 0.9, t, dir: 0.6, rArm: [12, -2] });
          // your parent: in the chair, or walking with you to the door
          const walking = go > 0.08, px = walking ? lerp(ax, 296, go) : ax;
          drawPerson(g, px, walking ? 210 : 190, { look: parent, scale: 0.9, t: reduce ? 0 : t * 0.6, sit: !walking, dir: lost > 0.5 && hand < 0.5 ? -0.6 : 0.6, rArm: walking ? [8, 2] : [lerp(3, 9, hand), lerp(5, 1, hand)] });
          if (!walking) { g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; for (const s of [-1, 1]) { g.beginPath(); g.roundRect(ax + s * 26 - 6, 170, 12, 26, 5); g.fill(); g.stroke(); } }
          query(g, ax + 6, 118, ax + 2, 138, lost * (1 - hand) * (1 - go));
          // you: standing, or sat beside them on a stool (A)
          const sitting = stayHome > 0.5 && !walking;
          const yx = walking ? lerp(212, 326, go) : lerp(214, 184, stayHome);
          if (sitting) { g.strokeStyle = INK; g.lineWidth = 1.7; g.fillStyle = PAPER; g.beginPath(); g.roundRect(yx - 12, 194, 24, 5, 2); g.fill(); g.stroke(); line(g, yx - 9, 199, yx - 11, 210); line(g, yx + 9, 199, yx + 11, 210); }
          drawPerson(g, yx, sitting ? 194 : 210, { me: true, scale: 0.9, t, sit: sitting, dir: walking ? 0.7 : -0.6, lArm: walking ? [-8, 2] : [lerp(-3, -10, Math.max(stayHome, hand)), lerp(5, 2, Math.max(stayHome, hand))] });
          hourglass(g, 240, 132, stayHome * (1 - kind) * (1 - go), t);
          thread(g, yx - 8, sitting ? 160 : 174, px + 10, walking ? 174 : 160, 12, 1, lost > 0.5 && hand < 0.5);
          thread(g, yx + 8, sitting ? 158 : 170, fx - fr * 0.6, fy + fr * 0.8, 14, 0.8);
        } else {
          const reach = V('reach'), back = V('back'), stay = V('stay');
          // the care home: a wide window with a tree, a handrail, a doorway on the right
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(96, 44, 140, 72); g.strokeRect(96, 44, 140, 72);
          g.save(); g.beginPath(); g.rect(97, 45, 138, 70); g.clip();
          g.strokeStyle = HAIR; g.lineWidth = 1; line(g, 96, 104, 236, 104); tree(g, 190, 110, 0.8, t, 5);
          g.restore();
          g.strokeStyle = INK; g.lineWidth = 1.3; line(g, 142, 44, 142, 116); line(g, 190, 44, 190, 116); g.lineWidth = 2; line(g, 92, 118, 240, 118);
          g.strokeStyle = GRAPH; g.lineWidth = 1.2; line(g, 0, 150, 300, 150); line(g, 0, 155, 300, 155);
          g.strokeStyle = INK; g.lineWidth = 1.6; g.strokeRect(320, 96, 50, 114); g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, 324, 100, 324, 210);
          // the armchair with your parent, a kind carer nearby
          const ax = 132;
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
          g.beginPath(); g.roundRect(ax - 24, 136, 48, 60, 14); g.fill(); g.stroke();
          g.beginPath(); g.roundRect(ax - 26, 188, 52, 12, 4); g.fill(); g.stroke(); line(g, ax - 20, 200, ax - 22, 210); line(g, ax + 20, 200, ax + 22, 210);
          const cx = lerp(214, 176, stay);
          drawPerson(g, cx, 210, { look: kindLook, scale: 0.9, t, dir: -0.6, lArm: [lerp(-3, -14, stay), lerp(5, -4, stay)] });
          const r = reach * (1 - Math.max(back, stay));
          drawPerson(g, ax, 190, { look: parent, scale: 0.9, t: reduce ? 0 : t * 0.6, sit: true, dir: lerp(0.3, 0.8, Math.max(reach, back)), mood: r > 0.4 ? 'sad' : null, rArm: [lerp(3, 14, Math.max(r, back)), lerp(5, -6, r)] });
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; for (const s of [-1, 1]) { g.beginPath(); g.roundRect(ax + s * 26 - 6, 170, 12, 26, 5); g.fill(); g.stroke(); }
          marks(g, 'tears', ax + 4, 156, r * 0.9, t);
          // "take me home": a bubble with a small house in it
          bubble(g, ax - 8, 112, 30, 24, ax, 132, r);
          if (r > 0.01) { g.save(); g.globalAlpha = r; g.strokeStyle = INK; g.lineWidth = 1.2; g.fillStyle = PAPER; g.strokeRect(ax - 14, 112, 12, 7); g.beginPath(); g.moveTo(ax - 16, 112); g.lineTo(ax - 8, 105); g.lineTo(ax, 112); g.stroke(); g.restore(); }
          // you: leaving through the door, turned back (A: you come back to them)
          const yx = lerp(338, 176, back);
          drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: lerp(lerp(0.6, -0.6, reach), -0.8, back), lArm: back > 0.5 ? [-12, 2] : [lerp(-3, -6, stay), lerp(5, -14, stay)] });
          thread(g, yx - 8, 172, ax + 12, 158, 18, 1);
          heart(g, (ax + yx) / 2, 120, 11, back, false);
          heart(g, (ax + cx) / 2 + 4, 130, 10, stay, false);
        }
      },
    },
  };
});
