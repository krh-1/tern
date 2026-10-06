// Tern: code-drawn scenes for the Coast (world 4). Same contract and style as scenes.js.
// Ink on paper, calm motion, harm never shown. The sea is always still: a horizon and a few static wave marks.
// A barn, a gate and a plate stand for meat; a door with one small window stands for the hidden child; a clinic and a calendar stand for the kidney.
// Contract: see game/plan.md and game/plan-coast.md. Variants are step keys ('trunk', 'fu', 'fuA', 'fuB').
(window.TERN_SCENE_PACKS = window.TERN_SCENE_PACKS || []).push(function (h) {
  const { sc, V, sset, sto, sleep, lerp, clamp01, reduce, INK, PAPER, GRAPH, HAIR, ellipse, line, txt, bubble, paper, steam, marks, hourglass, scribble, indoor, drawPerson, npcLook } = h;

  const SANS = size => `700 ${size}px "Quattrocento Sans", sans-serif`;
  const SERIF = size => `italic 500 ${size}px "Cormorant Garamond", Georgia, serif`;
  const SHADOW = 'rgba(20,20,20,0.10)';
  const ease = u => u * u * (3 - 2 * u);
  const seg = (k, a, b) => ease(clamp01((k - a) / (b - a))); // 0 → 1 while a local value runs from a to b

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

  // ---------- small shared drawers (copied from the other packs, where they're private) ----------
  function thread(g, x1, y1, x2, y2, lift, a, dash, w) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = w || 1.1; g.lineCap = 'round';
    if (dash) g.setLineDash([3, 4]);
    g.beginPath(); g.moveTo(x1, y1); g.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - lift, x2, y2); g.stroke();
    g.restore();
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
  const ghost = (g, a, x, y, o) => faded(g, a, c => drawPerson(c, x, y, o));
  function inFrame(g, x, y, r, a, fn, dash) { // a round window with something drawn inside it, faded as one piece
    if (a <= 0.01) return;
    frame(g, x, y, r, a, dash);
    faded(g, a, o => { clipCircle(o, x, y, r); fn(o); o.restore(); });
  }
  function say(g, x, y, w, tx, ty, a, word) { // a speech bubble with a word, or with a plain line for "speaking"
    if (a <= 0.01) return;
    bubble(g, x, y, w, 22, tx, ty, a);
    if (word) txt(g, word, x, y + 0.5, 14, a, SERIF(15));
    else { g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.6; line(g, x - w / 2 + 9, y, x + w / 2 - 9, y); g.restore(); }
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
  function slots(g, x, y, n, filled, a, size, perRow) { // squares in a row (or rows): days, years, shares
    if (a <= 0.01) return;
    const z = size || 6, pr = perRow || n;
    g.save(); g.globalAlpha = Math.min(1, a); g.lineWidth = 1;
    for (let k = 0; k < n; k++) {
      const sx = x + (k % pr) * (z + 3), sy = y + Math.floor(k / pr) * (z + 3);
      g.strokeStyle = GRAPH; g.strokeRect(sx, sy, z, z);
      const f = clamp01(filled - k); if (f > 0.01) { g.globalAlpha = Math.min(1, a) * f; g.fillStyle = INK; g.fillRect(sx, sy, z, z); g.globalAlpha = Math.min(1, a); }
    }
    g.restore();
  }
  function bill(g, x, y, a, rot, s, dash) {
    if (a <= 0.01) return;
    s = s || 1;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.rotate(rot || 0); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; if (dash) g.setLineDash([2.5, 2.5]);
    g.fillRect(-11, -6, 22, 12); g.strokeRect(-11, -6, 22, 12); g.setLineDash([]);
    g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(-8.5, -3.5, 17, 7);
    g.fillStyle = PAPER; g.strokeStyle = INK; ellipse(g, 0, 0, 2.8, 2.8); g.fill(); g.stroke();
    g.restore();
  }
  function coin(g, x, y, a, r) {
    if (a <= 0.01) return;
    r = r || 4.5;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
    ellipse(g, x, y, r, r); g.fill(); g.stroke(); g.strokeStyle = GRAPH; g.lineWidth = 1; ellipse(g, x, y, r * 0.55, r * 0.55); g.stroke(); g.restore();
  }
  function envelope(g, x, y, a, s, thick) { // thick: 0 flat … 1 stuffed full
    if (a <= 0.01) return;
    s = s || 1; const th = thick || 0;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
    const hh = 8 + th * 5;
    g.beginPath(); g.roundRect(-13, -hh, 26, 2 * hh, th * 4); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(-13, -hh); g.lineTo(0, -hh + 9 + th * 2); g.lineTo(13, -hh); g.stroke();
    if (th > 0.2) { g.strokeStyle = GRAPH; g.lineWidth = 1; g.globalAlpha *= clamp01((th - 0.2) * 2); for (const yy of [hh - 3, hh - 6]) line(g, -10, yy, 10, yy); }
    g.restore();
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
  function desk(g, x1, x2, y, floor) {
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
    g.beginPath(); g.rect(x1, y, x2 - x1, 6); g.fill(); g.stroke();
    line(g, x1 + 6, y + 6, x1 + 6, floor || 210); line(g, x2 - 6, y + 6, x2 - 6, floor || 210);
  }
  function moon(g, x, y, r, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = INK; ellipse(g, x, y, r, r); g.fill();
    g.fillStyle = PAPER; ellipse(g, x + r * 0.45, y - r * 0.2, r * 0.85, r * 0.85); g.fill(); g.restore();
  }
  function sparkle(g, x, y, r, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.2; g.lineCap = 'round';
    line(g, x - r, y, x + r, y); line(g, x, y - r, x, y + r); g.restore();
  }
  function handset(g, x, y, rot, a) { // a phone held upright
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.translate(x, y); g.rotate(rot || 0);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(-3.5, -6, 7, 12, 1.6); g.fill(); g.stroke();
    g.fillStyle = INK; g.fillRect(-2, -4, 4, 6.5); g.restore();
  }
  function door(g, x, top, w, ground, open, o) { // a door that swings open towards you
    o = o || {};
    g.fillStyle = o.dark ? INK : PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(x, top, w, ground - top); g.strokeRect(x, top, w, ground - top);
    const pw = w * (1 - (open || 0) * 0.75);
    g.fillStyle = PAPER; g.beginPath(); g.rect(x, top, pw, ground - top); g.fill(); g.stroke();
    if (o.bars) { g.lineWidth = 1.2; g.strokeRect(x + pw * 0.2, top + 10, pw * 0.6, 18); for (let k = 1; k < 4; k++) line(g, x + pw * 0.2 + pw * 0.15 * k, top + 10, x + pw * 0.2 + pw * 0.15 * k, top + 28); }
    else if (o.pane) { g.lineWidth = 1.1; ellipse(g, x + pw / 2, top + 20, 6, 6); g.stroke(); }
    g.lineWidth = 1.3; ellipse(g, x + pw - 5, (top + ground) / 2 + 4, 1.8, 1.8); g.stroke();
  }
  function tick(g, x, y, s, a) { // a plain check mark
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.8; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x - 4 * s, y); g.lineTo(x - 1 * s, y + 3 * s); g.lineTo(x + 5 * s, y - 4 * s); g.stroke(); g.restore();
  }
  function cross(g, x, y, s, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.8; g.lineCap = 'round';
    line(g, x - 4 * s, y - 4 * s, x + 4 * s, y + 4 * s); line(g, x + 4 * s, y - 4 * s, x - 4 * s, y + 4 * s); g.restore();
  }

  // ---------- the coast's furniture ----------
  // the sea: a still horizon and a few static wave marks; it never moves
  function sea(g, y, x0, x1, a) {
    x0 = x0 == null ? 0 : x0; x1 = x1 == null ? 400 : x1;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a);
    g.strokeStyle = GRAPH; g.lineWidth = 1.1; line(g, x0, y, x1, y);
    g.strokeStyle = HAIR; g.lineWidth = 1;
    const M = [[0.08, 8], [0.27, 14], [0.46, 6], [0.62, 19], [0.83, 10], [0.17, 26], [0.55, 30], [0.93, 24], [0.38, 21], [0.74, 34]];
    for (const [fx, dy] of M) { const x = x0 + (x1 - x0) * fx, yy = y + dy; if (yy > 250) continue; wave(g, x, yy, 5); }
    g.restore();
  }
  function wave(g, x, y, w) { // one small static wave mark
    g.beginPath(); g.moveTo(x - w, y); g.quadraticCurveTo(x - w / 2, y - 2.4, x, y); g.quadraticCurveTo(x + w / 2, y - 2.4, x + w, y); g.stroke();
  }
  function lighthouse(g, x, base, s, a) { // far off, in hairline
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.translate(x, base); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = GRAPH; g.lineWidth = 1.1; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(-14, 0); g.quadraticCurveTo(0, -8, 14, 0); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(-5, -3); g.lineTo(-3.5, -30); g.lineTo(3.5, -30); g.lineTo(5, -3); g.closePath(); g.fill(); g.stroke();
    line(g, -4.6, -12, 4.6, -12); line(g, -4.1, -21, 4.1, -21);
    g.strokeRect(-3, -36, 6, 6); g.beginPath(); g.moveTo(-4.5, -36); g.lineTo(0, -40); g.lineTo(4.5, -36); g.closePath(); g.fill(); g.stroke();
    g.restore();
  }
  function gull(g, x, y, s) { // a far bird, holding still on the wind
    g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1.1; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x - 5 * s, y); g.quadraticCurveTo(x - 2.5 * s, y - 3 * s, x, y); g.quadraticCurveTo(x + 2.5 * s, y - 3 * s, x + 5 * s, y); g.stroke(); g.restore();
  }
  function railing(g, y, x0, x1) { // the promenade rail
    g.strokeStyle = INK; g.lineWidth = 1.5; line(g, x0, y, x1, y); g.lineWidth = 1.1; line(g, x0, y + 12, x1, y + 12);
    g.lineWidth = 1.6; for (let x = x0 + 8; x < x1; x += 44) line(g, x, y - 2, x, y + 34);
  }
  function planks(g, y, y2) { // boardwalk boards running away from you
    g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, y, 400, y);
    g.strokeStyle = HAIR; g.lineWidth = 1;
    for (let yy = y + 8; yy < (y2 || 250); yy += 9) line(g, 0, yy, 400, yy);
    for (let x = 30; x < 430; x += 70) line(g, x, y, x - 4, y + 8);
  }
  function sand(g, y) { // a shore line and a little stipple
    g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, y, 400, y);
    g.fillStyle = GRAPH;
    for (let k = 0; k < 46; k++) { const x = (k * 89.3) % 400, yy = y + 6 + ((k * 37.7) % 34); if (yy < 248) g.fillRect(x, yy, 1.2, 1.2); }
  }
  function dune(g, x0, x1, base, hh) { // a soft dune with a little grass
    g.fillStyle = PAPER; g.strokeStyle = GRAPH; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(x0, base); g.quadraticCurveTo((x0 + x1) / 2, base - hh * 2, x1, base); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1;
    const mx = (x0 + x1) / 2;
    for (const dx of [-14, -6, 4, 12]) { const bx = mx + dx, by = base - hh + Math.abs(dx) * 0.35 + 1; line(g, bx, by, bx - 2, by - 7); line(g, bx, by, bx + 2.5, by - 6); }
  }
  function house(g, x, ground, w, hh, o) { // a cottage: walls, a pitched roof, a door and windows
    o = o || {};
    g.save(); if (o.a != null) g.globalAlpha = Math.min(1, o.a);
    g.fillStyle = PAPER; g.strokeStyle = o.faint ? GRAPH : INK; g.lineWidth = o.lw || 1.5; g.lineJoin = 'round';
    g.beginPath(); g.rect(x, ground - hh, w, hh); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(x - 5, ground - hh); g.lineTo(x + w / 2, ground - hh - w * 0.38); g.lineTo(x + w + 5, ground - hh); g.closePath(); g.fill(); g.stroke();
    g.lineWidth = 1; const dw = Math.min(12, w * 0.22);
    g.strokeRect(x + w * 0.62, ground - dw * 1.8, dw, dw * 1.8);
    g.strokeRect(x + w * 0.16, ground - hh * 0.72, w * 0.24, hh * 0.3);
    if (o.lit) { g.fillStyle = INK; g.fillRect(x + w * 0.16, ground - hh * 0.72, w * 0.24, hh * 0.3); }
    g.restore();
  }
  function postbox(g, x, ground, slotOpen) { // a round-topped pillar box
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x - 13, ground); g.lineTo(x - 13, ground - 50); g.quadraticCurveTo(x, ground - 64, x + 13, ground - 50); g.lineTo(x + 13, ground); g.closePath(); g.fill(); g.stroke();
    g.lineWidth = 1.2; line(g, x - 15, ground - 50, x + 15, ground - 50);
    g.fillStyle = INK; g.fillRect(x - 7, ground - 42, 14, 2.6 + (slotOpen || 0) * 2);
    g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(x - 6, ground - 30, 12, 9); line(g, x - 13, ground - 6, x + 13, ground - 6);
  }
  function wallet(g, x, y, rot, cash, s) { // a wallet, with bills peeking out while there's cash in it
    g.save(); g.translate(x, y); g.rotate(rot || 0); g.scale(s || 1, s || 1);
    if (cash > 0.01) { g.save(); g.globalAlpha = Math.min(1, cash); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.1; for (const [dx, r] of [[-6, -0.12], [1, 0.05], [7, 0.16]]) { g.save(); g.translate(dx, -7); g.rotate(r); g.fillRect(-6, -5, 12, 10); g.strokeRect(-6, -5, 12, 10); g.restore(); } g.restore(); }
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.roundRect(-14, -7, 28, 14, 3); g.fill(); g.stroke();
    line(g, -14, -1, 14, -1); g.fillStyle = INK; ellipse(g, 10, 3, 1.4, 1.4); g.fill();
    g.restore();
  }
  // a small side-on car, with you at the wheel. o.dir: 1 faces right
  function car(g, x, ground, o) {
    o = o || {};
    const d = o.dir || 1, s = o.s || 1;
    g.save(); g.translate(x, ground); g.scale(d * s, s); g.lineJoin = 'round';
    if (o.a != null) g.globalAlpha = Math.min(1, o.a);
    g.fillStyle = SHADOW; ellipse(g, 0, 0, 42, 4); g.fill();
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.7;
    g.beginPath(); g.moveTo(-24, -24); g.lineTo(-15, -38); g.lineTo(13, -38); g.lineTo(25, -24); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(-40, -25, 80, 18, 7); g.fill(); g.stroke();
    g.lineWidth = 1.2;
    const win = [[-20, -25, -14, -35, -2, -35, -2, -25], [2, -25, 2, -35, 12, -35, 20, -25]];
    for (const p of win) { g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(p[2], p[3]); g.lineTo(p[4], p[5]); g.lineTo(p[6], p[7]); g.closePath(); g.stroke(); }
    if (o.driver) {
      g.save(); g.beginPath(); const p = win[1]; g.moveTo(p[0], p[1]); g.lineTo(p[2], p[3]); g.lineTo(p[4], p[5]); g.lineTo(p[6], p[7]); g.closePath(); g.clip();
      drawPerson(g, 10, -15, { me: true, scale: 0.42, t: o.t || 0, dir: 0.5 }); g.restore();
    }
    if (o.passenger && o.passenger.a > 0.01) { // someone riding in the back
      g.save(); g.beginPath(); const p = win[0]; g.moveTo(p[0], p[1]); g.lineTo(p[2], p[3]); g.lineTo(p[4], p[5]); g.lineTo(p[6], p[7]); g.closePath(); g.clip();
      g.globalAlpha *= Math.min(1, o.passenger.a); drawPerson(g, -10, -15, Object.assign({ scale: 0.4, t: o.t || 0, dir: 0.5 }, o.passenger.o)); g.restore();
    }
    g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, -2, -22, -2, -10);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(34, -21, 6, 5, 1.5); g.fill(); g.stroke();
    for (const wx of [-23, 23]) { g.fillStyle = INK; ellipse(g, wx, -6, 7, 7); g.fill(); g.fillStyle = PAPER; ellipse(g, wx, -6, 2.6, 2.6); g.fill(); }
    if (o.lights) { g.strokeStyle = GRAPH; g.lineWidth = 1; g.globalAlpha *= Math.min(1, o.lights); for (const an of [-0.2, 0, 0.2]) line(g, 44 + Math.cos(an) * 2, -18 + Math.sin(an) * 2, 44 + Math.cos(an) * 14, -18 + Math.sin(an) * 14); }
    g.restore();
  }
  function plane(g, x, y, s, a, rot) { // a small airliner, side-on
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.rotate(rot || 0); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(-20, -2); g.lineTo(-22, -10); g.lineTo(-17, -10); g.lineTo(-12, -3); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(-22, -3, 42, 7, 3.5); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(-4, 1); g.lineTo(6, 1); g.lineTo(-2, 9); g.lineTo(-7, 9); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = INK; for (let k = 0; k < 5; k++) { ellipse(g, -10 + k * 5, -0.5, 0.9, 0.9); g.fill(); }
    g.restore();
  }
  function clock(g, x, y, r, an, a) {
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
    ellipse(g, x, y, r, r); g.fill(); g.stroke(); g.lineWidth = 1.4; g.lineCap = 'round';
    line(g, x, y, x + Math.cos(an) * r * 0.75, y + Math.sin(an) * r * 0.75); line(g, x, y, x, y - r * 0.5);
    g.restore();
  }
  // rain that falls slowly past everything except the given shelter rectangle
  function rain(g, t, a, hole) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = GRAPH; g.lineWidth = 1; g.lineCap = 'round';
    if (hole) { g.beginPath(); g.rect(0, 0, 400, 250); g.rect(hole[0], hole[1], hole[2], hole[3]); g.clip('evenodd'); }
    for (let k = 0; k < 44; k++) {
      const x0 = (k * 97.1) % 420, sp = 26 + (k % 5) * 3, y = reduce ? (k * 53.3) % 250 : ((k * 53.3) + t * sp) % 270 - 10, x = x0 - y * 0.18;
      line(g, x, y, x - 2.2, y + 10);
    }
    g.restore();
  }
  function bed(g, x, y, w, a, dash) { // a low cot, side-on; top at y
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; if (dash) g.setLineDash([3, 3]);
    g.beginPath(); g.roundRect(x, y, w, 7, 2); g.fill(); g.stroke();
    line(g, x + 3, y + 7, x + 3, y + 18); line(g, x + w - 3, y + 7, x + w - 3, y + 18);
    g.beginPath(); g.roundRect(x + 2, y - 5, 14, 6, 3); g.fill(); g.stroke();
    g.restore();
  }
  function pot(g, x, y, t) { // a soup pot, steaming
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
    g.beginPath(); g.roundRect(x - 15, y - 18, 30, 18, [2, 2, 6, 6]); g.fill(); g.stroke();
    line(g, x - 18, y - 18, x + 18, y - 18); line(g, x - 19, y - 13, x - 15, y - 13); line(g, x + 15, y - 13, x + 19, y - 13);
    steam(g, x, y - 22, t);
  }
  function bowl(g, x, y, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
    g.beginPath(); g.moveTo(x - 7, y - 5); g.quadraticCurveTo(x, y + 4, x + 7, y - 5); g.closePath(); g.fill(); g.stroke(); g.restore();
  }
  function crowd(g, cx, cy, cols, rows, gap, a, faint) { // many tiny heads and shoulders: people you'll never meet
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.lineWidth = 1;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = cx + (c - (cols - 1) / 2) * gap + (r % 2) * gap / 2, y = cy + r * gap * 1.1;
      g.fillStyle = PAPER; g.strokeStyle = faint || r < rows / 2 ? GRAPH : INK;
      g.beginPath(); g.arc(x, y + 5, 3.4, Math.PI, 0); g.fill(); g.stroke(); ellipse(g, x, y, 2.2, 2.2); g.fill(); g.stroke();
    }
    g.restore();
  }
  function cow(g, x, ground, s, graze, dir) { // a calm cow, side-on, facing right before flipping; graze 0 head up … 1 head down to the grass
    g.save(); g.translate(x, ground); g.scale((dir || 1) * s, s); g.lineCap = 'round'; g.lineJoin = 'round';
    g.fillStyle = SHADOW; ellipse(g, 0, 0, 30, 3.5); g.fill();
    g.strokeStyle = INK; g.lineWidth = 2.2; for (const lx of [-18, -11, 12, 19]) line(g, lx, -12, lx, 0);
    g.lineWidth = 1.3; g.beginPath(); g.moveTo(-24, -28); g.quadraticCurveTo(-30, -20, -28, -10); g.stroke();
    g.fillStyle = PAPER; g.lineWidth = 1.6; g.beginPath(); g.roundRect(-25, -34, 50, 24, 11); g.fill(); g.stroke();
    g.fillStyle = INK; g.beginPath(); g.moveTo(-6, -34); g.quadraticCurveTo(2, -26, -4, -18); g.quadraticCurveTo(-14, -20, -14, -30); g.quadraticCurveTo(-12, -34, -6, -34); g.fill();
    ellipse(g, 13, -27, 4, 3); g.fill();
    // neck and head: the head swings down to graze
    const an = lerp(-0.15, 1.05, graze || 0);
    g.save(); g.translate(22, -28); g.rotate(an);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
    g.beginPath(); g.roundRect(-2, -7, 14, 13, 5); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(9, -9, 13, 17, 6); g.fill(); g.stroke();
    g.beginPath(); g.ellipse(10, -10, 4.5, 2.2, -0.6, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = INK; ellipse(g, 15, -3, 1.2, 1.4); g.fill();
    g.strokeStyle = GRAPH; g.lineWidth = 1; ellipse(g, 17, 4, 4, 2.4); g.stroke();
    g.restore();
    g.restore();
  }
  function pig(g, x, ground, s, up, dir) { // a calm pig, side-on, facing right before flipping; up 0 head low … 1 head raised, looking at you
    g.save(); g.translate(x, ground); g.scale((dir || 1) * s, s); g.lineCap = 'round'; g.lineJoin = 'round';
    g.fillStyle = SHADOW; ellipse(g, 0, 0, 28, 3.5); g.fill();
    g.strokeStyle = INK; g.lineWidth = 2.4; for (const lx of [-16, -9, 10, 17]) line(g, lx, -10, lx, 0);
    g.lineWidth = 1.3; g.beginPath(); g.moveTo(-24, -24); g.bezierCurveTo(-32, -26, -31, -33, -27, -31); g.stroke();
    g.fillStyle = PAPER; g.lineWidth = 1.6; g.beginPath(); g.ellipse(0, -21, 25, 13, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.save(); g.translate(22, -24); g.rotate(lerp(0.4, -0.12, up || 0));
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.ellipse(4, 0, 10, 9, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.beginPath(); g.ellipse(13.5, 1.5, 3, 4.2, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = INK; ellipse(g, 13.6, 0.2, 0.7, 0.9); g.fill(); ellipse(g, 13.6, 3, 0.7, 0.9); g.fill();
    g.fillStyle = PAPER; g.beginPath(); g.moveTo(-1, -6); g.lineTo(3, -15); g.lineTo(7, -6); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = INK; ellipse(g, 7, -2, 1.2, 1.4); g.fill();
    g.restore(); g.restore();
  }
  function gate(g, x, ground, w, open) { // a field gate on two posts; it swings open towards you
    g.strokeStyle = INK; g.lineWidth = 2.2; g.lineCap = 'round'; line(g, x, ground, x, ground - 40); line(g, x + w, ground, x + w, ground - 40);
    const gw = w * (1 - (open || 0) * 0.7);
    g.lineWidth = 1.5; for (const yy of [-34, -24, -14]) line(g, x, ground + yy, x + gw, ground + yy);
    line(g, x + gw, ground - 36, x + gw, ground - 10); line(g, x, ground - 12, x + gw, ground - 34);
  }
  function fence(g, x1, x2, ground) { // a post-and-rail field fence
    g.strokeStyle = GRAPH; g.lineWidth = 1.3; line(g, x1, ground - 30, x2, ground - 30); line(g, x1, ground - 16, x2, ground - 16);
    g.strokeStyle = INK; g.lineWidth = 1.8; for (let x = x1; x <= x2; x += 26) line(g, x, ground, x, ground - 36);
  }
  function plate(g, x, y, meat, greens, a) { // a plate seen from the side and a little above
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; ellipse(g, x, y, 22, 6); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; ellipse(g, x, y, 14, 3.6); g.stroke();
    if (meat > 0.01) { g.globalAlpha *= Math.min(1, meat); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.ellipse(x - 2, y - 4, 11, 5.5, -0.15, 0, Math.PI * 2); g.fill(); g.stroke(); g.strokeStyle = GRAPH; g.lineWidth = 1; for (const dx of [-7, -2, 3]) line(g, x + dx, y - 7, x + dx + 3, y - 1.5); g.globalAlpha /= Math.min(1, meat); }
    if (greens > 0.01) {
      g.globalAlpha *= Math.min(1, greens); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2;
      for (const [dx, r] of [[-8, -0.6], [-1, 0.1], [7, 0.7]]) { g.save(); g.translate(x + dx, y - 5); g.rotate(r); g.beginPath(); g.ellipse(0, 0, 3.4, 6.5, 0, 0, Math.PI * 2); g.fill(); g.stroke(); line(g, 0, -5, 0, 5); g.restore(); }
      ellipse(g, x + 12, y - 3, 3, 3); g.fill(); g.stroke();
    }
    g.restore();
  }
  function rowboat(g, cx, wl, w, bob) { // the hull, drawn over whoever sits in it; wl is the waterline
    const y = wl + bob;
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.8; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(cx - w / 2 - 10, y - 26); g.lineTo(cx + w / 2 + 12, y - 28);
    g.quadraticCurveTo(cx + w / 2, y + 2, cx + w / 2 - 22, y + 4); g.lineTo(cx - w / 2 + 18, y + 4);
    g.quadraticCurveTo(cx - w / 2 - 2, y + 2, cx - w / 2 - 10, y - 26); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; g.beginPath(); g.moveTo(cx - w / 2 - 6, y - 19); g.lineTo(cx + w / 2 + 7, y - 21); g.stroke();
    g.beginPath(); g.moveTo(cx - w / 2 + 2, y - 9); g.lineTo(cx + w / 2 - 2, y - 10); g.stroke();
  }

  const SCENES = {
    // ---------------------------------------------------------------- Q2 The Wallet
    seawallet: {
      base(v) {
        sc.x.v = v;
        sset({ lift: 0, post: 0, keep: 0, back: 0, all: 0, poor: 0, notice: 0 });
        if (v === 'fuA') sset({ lift: 1 }); // you were going to return it: the wallet is in your hand, the cash still in it
        if (v === 'fuB') sset({ lift: 1, keep: 1 }); // you kept the cash; the wallet is in your hand
      },
      shift(v) {
        if (v === 'fuA') sto({ notice: 1 }, 0.8); // a second notice goes up on your door: one more late payment and you're out
        if (v === 'fuB') sto({ poor: 1 }, 0.9);
      },
      acts: {
        'Q2-A': { all: 1 }, 'Q2-B': { keep: 1 },
        'Q2-FUA-A': { all: 1 }, 'Q2-FUA-B': { keep: 1 },
        'Q2-FUB-A': { back: 1, all: 1 }, 'Q2-FUB-B': { post: 1 },
      },
      async act(a) {
        await actor(this.acts, 1.2, async (id, m) => {
          if (V('lift') < 0.5) { sto({ lift: 1 }, 2.2); await sleep(700); }
          if (m.keep) { sto({ keep: 1 }, 1.4); await sleep(900); }
          if (m.back) { sto({ back: 1 }, 1.4); await sleep(900); }
          sto({ post: 1 }, 1.3);
          if (m.all) sto({ all: 1 }, 1.3);
        })(a);
      },
      draw(g, t) {
        const lift = V('lift'), post = V('post'), keep = V('keep'), back = V('back'), all = V('all'), poor = V('poor'), notice = V('notice'), held = clamp01(keep - back);
        // the promenade: the still sea behind a rail, the paving underfoot
        sea(g, 100); lighthouse(g, 372, 100, 0.8); gull(g, 128, 40, 1); gull(g, 146, 52, 0.8);
        railing(g, 150, 0, 400);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 196, 400, 196);
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = 20; x < 430; x += 52) line(g, x, 196, x - 14, 250);
        // the bench
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(22, 182, 92, 5); g.fill(); g.stroke();
        line(g, 28, 187, 28, 204); line(g, 108, 187, 108, 204); line(g, 26, 164, 110, 164); line(g, 28, 164, 28, 182); line(g, 108, 164, 108, 182);
        // the post box by the rail
        postbox(g, 352, 212, post);
        // your rent: $400 short, four bills you don't have (filled if you keep the cash)
        inFrame(g, 66, 58, 36, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 30, 84, 102, 84);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.fillRect(36, 36, 26, 48); o.strokeRect(36, 36, 26, 48);
          o.lineWidth = 1.1; ellipse(o, 57, 62, 1.6, 1.6); o.stroke();
          paper(o, 49, 48, 14, 12, 0.06, 1); o.fillStyle = INK; o.fillRect(44, 43, 10, 2.4);
          for (let k = 0; k < 4; k++) bill(o, 80, 40 + k * 10, 1, 0, 0.62, held < 0.98);
          // fuA: a final notice, pinned below the first, with a heavier mark (it drops into place)
          if (notice > 0.01) {
            const q = ease(clamp01(notice));
            paper(o, 49, lerp(60, 68, q), 18, 14, 0.08, q);
            o.save(); o.globalAlpha = q; o.fillStyle = INK; o.fillRect(42, lerp(60, 68, q) - 4, 14, 3); o.fillRect(42, lerp(60, 68, q) + 1, 8, 2); o.restore();
          }
        });
        txt(g, '$400', 66, 106, 10, 1, SANS(10));
        // whose wallet it is: the address on the ID. A big house on the hill, or (fu) a walk-up over the laundromat
        const ox = 304, oy = 56, orr = 38;
        inFrame(g, ox, oy, orr, 1 - poor, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; o.beginPath(); o.moveTo(ox - orr, oy + 30); o.quadraticCurveTo(ox, oy + 14, ox + orr, oy + 28); o.stroke();
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.fillRect(ox - 28, oy - 12, 56, 36); o.strokeRect(ox - 28, oy - 12, 56, 36);
          o.beginPath(); o.moveTo(ox - 32, oy - 12); o.lineTo(ox, oy - 28); o.lineTo(ox + 32, oy - 12); o.closePath(); o.fill(); o.stroke();
          o.lineWidth = 1; for (const dx of [-22, -12, 7, 17]) { o.strokeRect(ox + dx, oy - 7, 5, 7); o.strokeRect(ox + dx, oy + 6, 5, 8); }
          o.beginPath(); o.moveTo(ox - 10, oy + 2); o.lineTo(ox, oy - 4); o.lineTo(ox + 10, oy + 2); o.closePath(); o.fill(); o.stroke();
          for (const dx of [-8, -3, 3, 8]) line(o, ox + dx, oy + 2, ox + dx, oy + 24);
          o.strokeStyle = GRAPH; for (const dx of [-38, 38]) { ellipse(o, ox + dx, oy + 14, 6, 9); o.stroke(); line(o, ox + dx, oy + 22, ox + dx, oy + 26); }
        });
        inFrame(g, ox, oy, orr, poor, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, ox - orr, oy + 28, ox + orr, oy + 28);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.fillRect(ox - 24, oy - 22, 48, 50); o.strokeRect(ox - 24, oy - 22, 48, 50);
          o.lineWidth = 1; for (const yy of [-16, -4]) for (const dx of [-18, -4, 10]) o.strokeRect(ox + dx, oy + yy, 8, 7);
          o.strokeRect(ox - 20, oy + 10, 40, 18); for (let k = 0; k < 3; k++) { ellipse(o, ox - 12 + k * 12, oy + 20, 4, 4); o.stroke(); }
        });
        // you and the wallet
        const yx = 196;
        drawPerson(g, yx, 222, { me: true, scale: 0.92, t, dir: lerp(0.5, 0.75, post), rArm: [lerp(8, 9, lift), lerp(12, -4, lift)] });
        const u = ease(clamp01(post)), hx = yx + 22, hy = 186;
        const wx = lerp(lerp(246, hx, ease(lift)), 352, u), wy = lerp(lerp(214, hy, ease(lift)), 168, u) - Math.sin(ease(lift) * Math.PI) * 10 * (1 - u) - Math.sin(u * Math.PI) * 26;
        const ws = lerp(1, 0.55, u), wa = 1 - clamp01((post - 0.85) * 7);
        if (wa > 0.01) { g.save(); g.globalAlpha = wa; wallet(g, wx, wy, lerp(-0.14, 0, lift) + u * 0.3, 1 - held, ws); g.restore(); }
        // B: the four bills come out and go towards your rent
        for (let k = 0; k < 4; k++) {
          const q = ease(clamp01((back > 0.01 ? 1 - back : keep) * 1.5 - k * 0.15)); if (q <= 0.01 || q >= 0.99) continue;
          bill(g, lerp(hx, 80, q), lerp(hy - 8, 40 + k * 10, q) - Math.sin(q * Math.PI) * 24, Math.sin(q * Math.PI), q * 0.3, 0.62);
        }
        // a thread to the owner once it's on its way back to them
        thread(g, 352, 146, ox - 10, oy + orr - 4, 10, Math.max(all, post * 0.6) * 0.7, held > 0.5);
      },
    },

    // ---------------------------------------------------------------- D4 The Stranded Stranger
    busstop: {
      base(v) {
        sc.x.v = v;
        sset({ roll: 0, stop: 0, ride: 0, go: 0, fare: 0, young: 0 });
        if (v === 'fuA') sset({ roll: 1, stop: 1 }); // you've pulled in at the stop, still at the wheel
        else if (v === 'fuB') sset({ roll: 1, go: 0.69 }); // you've just driven past; the shelter is behind you
        else sto({ roll: 1 }, 0.4); // the car comes along the coast road while you read, then slows
      },
      shift(v) {
        if (v === 'fuA') sto({ fare: 1 }, 0.8); // the cost of stopping: a new ticket, $1,200
        if (v === 'fuB') sto({ young: 1 }, 1.3); // the mirror: the stranger is about 15
      },
      acts: {
        'D4-A': { ride: 1 }, 'D4-B': { go: 1 },
        'D4-FUA2-A': { ride: 1 }, 'D4-FUA2-B': { go: 1 },
        'D4-FUB-A': { back: 1 }, 'D4-FUB-B': { go: 1 },
      },
      async act(a) {
        await actor(this.acts, 1.0, async (id, m) => {
          if (m.back) { sto({ go: 0.25 }, 1.8); await sleep(1000); sto({ ride: 1 }, 1.8); await sleep(200); return; } // you back up to the stop, and they get in
          if (m.ride) { if (V('stop') < 0.5) { sto({ stop: 1 }, 1.8); await sleep(400); } sto({ ride: 1 }, 1.8); await sleep(200); } // they walk over and get in; you'll drive them home
          else sto({ go: 1 }, 0.7);
        })(a);
      },
      draw(g, t) {
        const roll = V('roll'), stop = V('stop'), ride = V('ride'), go = V('go'), fare = V('fare'), young = V('young');
        // night on the coast road
        moon(g, 196, 30, 6, 1);
        sea(g, 108, 0, 400, 0.8);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 146, 400, 146); line(g, 0, 214, 400, 214);
        g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1; g.setLineDash([10, 10]); line(g, 0, 180, 400, 180); g.restore();
        // the bus shelter on the far side of the road, and the stranger in it
        const sx = 262, sw = 116;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(sx - 6, 70); g.lineTo(sx + sw + 6, 70); g.lineTo(sx + sw + 2, 78); g.lineTo(sx - 2, 78); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = PAPER; g.strokeStyle = HAIR; g.lineWidth = 1; g.fillRect(sx, 78, sw, 68); g.strokeRect(sx, 78, sw, 68);
        g.strokeStyle = INK; g.lineWidth = 1.6; line(g, sx, 78, sx, 146); line(g, sx + sw, 78, sx + sw, 146);
        g.strokeStyle = HAIR; g.lineWidth = 1; g.strokeRect(sx + sw - 30, 86, 24, 34);
        g.strokeStyle = INK; g.lineWidth = 1.5; g.fillStyle = PAPER; g.beginPath(); g.rect(sx + 14, 124, 70, 5); g.fill(); g.stroke(); line(g, sx + 20, 129, sx + 20, 146); line(g, sx + 78, 129, sx + 78, 146);
        // the bus stop sign: a pole and a round plate
        g.strokeStyle = INK; g.lineWidth = 2; line(g, sx - 18, 146, sx - 18, 84); g.lineWidth = 1.4; ellipse(g, sx - 18, 80, 8, 8); g.fillStyle = PAPER; g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(sx - 24, 96, 12, 14); for (const yy of [100, 104]) line(g, sx - 22, yy, sx - 14, yy);
        const who = npcLook(901), size = lerp(0.86, 0.66, seg(young, 0.4, 0.8));
        const sOpts = sc_ => ({ look: who, scale: sc_, t, sit: true, dir: lerp(-0.2, -0.7, stop), mood: 'sad', lArm: [2, -6], rArm: [-2, -6] });
        // fuB: seen again in the mirror, the stranger is a teenager (the grown-up figure gives way to a younger one)
        const seated = 1 - seg(ride, 0, 0.12);
        ghost(g, (1 - seg(young, 0, 0.4)) * seated, sx + 46, 124, sOpts(0.86));
        ghost(g, seg(young, 0.4, 0.8) * seated, sx + 46, 124, sOpts(0.66));
        // stopping: they get up, cross the road to the car and get in; you'll drive them home
        const cx = lerp(-40, 120, roll) + stop * 90 + go * 360, cy = 206;
        if (ride > 0.02 && ride < 0.97) {
          const w = seg(ride, 0.08, 0.7);
          ghost(g, seg(ride, 0, 0.12) * (1 - seg(ride, 0.6, 0.82)), lerp(sx + 46, cx + 6, w), lerp(146, 184, w), { look: who, scale: size, t, dir: -0.6, moving: w > 0.01 && w < 0.99, walk: t * 3 });
        }
        // the rain, everywhere but under the shelter roof
        rain(g, t, 0.7, [sx - 2, 78, sw + 4, 68]);
        // your flight: a plane at the gate, and the clock. If you stop, it leaves without you
        const fx = 62, fy = 54, fr = 34;
        inFrame(g, fx, fy, fr, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, fx - fr, fy + 14, fx + fr, fy + 14);
          o.save(); o.setLineDash([5, 5]); line(o, fx - fr, fy + 22, fx + fr, fy + 22); o.restore();
          const up = ease(clamp01(seg(ride, 0.5, 1) * 1.2));
          plane(o, lerp(fx - 4, fx + 30, up), lerp(fy + 8, fy - 22, up), 0.9, 1, -0.3 * up);
        });
        clock(g, fx + fr + 6, fy - fr + 10, 8, -0.4 + roll * 0.5 + stop * 0.9 + go * 0.2 + ride * 0.4);
        // fuA: the cost of stopping: a new ticket, at $1,200
        if (fare > 0.01) {
          const wx = 148, wy = 64, wr = 26;
          thread(g, fx + fr - 2, fy + 6, wx - wr + 2, wy, 12, fare * 0.6, true);
          inFrame(g, wx, wy, wr, fare, o => {
            o.save(); o.translate(wx, wy); o.rotate(-0.08);
            o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3; o.beginPath(); o.roundRect(-17, -10, 34, 20, 2.5); o.fill(); o.stroke();
            o.strokeStyle = GRAPH; o.lineWidth = 1; o.setLineDash([2, 2]); line(o, 6, -10, 6, 10); o.setLineDash([]);
            line(o, -13, 3, 1, 3); line(o, -13, 6.5, -3, 6.5);
            o.restore();
            plane(o, wx - 6, wy - 5, 0.32, 1, -0.08);
          });
          txt(g, '$1,200', wx, wy + wr + 10, 10, fare, SANS(10));
        }
        // fuB: the rear-view mirror, holding the shelter and the young stranger in it
        if (young > 0.01) {
          const mx = 196, my = 74, mw = 40, mh = 20;
          g.save(); g.globalAlpha = Math.min(1, young) * (1 - seg(ride, 0, 0.3)); g.strokeStyle = INK; g.lineWidth = 1.6; line(g, mx, my - mh - 8, mx, my - mh); g.restore();
          faded(g, young * (1 - seg(ride, 0, 0.3)), o => {
            o.save(); o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.6; o.beginPath(); o.roundRect(mx - mw, my - mh, mw * 2, mh * 2, mh); o.fill(); o.stroke(); o.clip();
            o.strokeStyle = GRAPH; o.lineWidth = 1.1; line(o, mx - mw, my - 10, mx + mw, my - 10); line(o, mx - 22, my - 10, mx - 22, my + mh); line(o, mx + 22, my - 10, mx + 22, my + mh);
            o.lineWidth = 1; line(o, mx - 14, my + 9, mx + 14, my + 9);
            drawPerson(o, mx, my + 9, { look: who, scale: 0.42, t, sit: true, dir: -0.2, mood: 'sad' });
            o.restore();
          });
        }
        // the car on the coast road; once they're in, they ride in the back
        car(g, cx, cy, { s: 1.05, driver: true, t, passenger: { a: seg(ride, 0.7, 0.95), o: { look: who, scale: lerp(0.4, 0.32, seg(young, 0.4, 0.8)) } } });
      },
    },

    // ---------------------------------------------------------------- B25 The Slaughterhouse Test
    meat: {
      base(v) {
        sc.x.v = v;
        sset({ walk: 0, stopEat: 0, already: 0, worker: 0, pay: 0, pig: 0, lean: 0, lab: 0, took: 0, pass: 0 });
        if (v === 'fuA') sset({ walk: 1 }); // you said yes: you're at the gate
        if (v === 'fuB') sset({ stopEat: 1 });
        if (v === 'fuC') sset({ already: 1 }); // greens on your plate
      },
      shift(v) {
        if (v === 'fuA') sto({ pig: 1 }, 1.3); // the animal is a pig, head up, watching you
        if (v === 'fuB') sto({ worker: 1 }, 0.9); // in real life, someone else does the killing for you
        if (v === 'fuC') sto({ lab: 1 }, 0.9); // meat grown in a lab: a dish under a flask, while the cow grazes on
      },
      acts: {
        'B25-A': { walk: 1 }, 'B25-B': { stopEat: 1 }, 'B25-C': { already: 1 },
        'B25-FUA-A': { lean: 1 }, 'B25-FUA-B': { walk: 0, stopEat: 1 },
        'B25-FUB2-A': { stopEat: 0, pay: 1 }, 'B25-FUB2-B': { already: 1 },
        'B25-FUC2-A': { took: 1 }, 'B25-FUC2-B': { pass: 1 },
      },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const walk = V('walk'), stopEat = V('stopEat'), already = V('already'), worker = V('worker'), pay = V('pay');
        const pigA = V('pig'), lean = V('lean'), lab = V('lab'), took = V('took'), pass = V('pass');
        // the dunes and the sea far off; the barn and its field behind a fence
        sea(g, 92, 250, 400, 0.6);
        dune(g, 220, 330, 132, 18); dune(g, 310, 430, 136, 13);
        g.strokeStyle = GRAPH; g.lineWidth = 1.1; line(g, 0, 174, 400, 174);
        const bx = 22;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.rect(bx, 92, 96, 82); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(bx - 8, 94); g.lineTo(bx + 20, 58); g.lineTo(bx + 76, 58); g.lineTo(bx + 104, 94); g.closePath(); g.fill(); g.stroke();
        g.lineWidth = 1.3; g.strokeRect(bx + 30, 120, 36, 54); line(g, bx + 30, 120, bx + 66, 174); line(g, bx + 66, 120, bx + 30, 174);
        g.strokeRect(bx + 40, 70, 16, 12);
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = bx + 8; x < bx + 96; x += 10) { if (x > bx + 26 && x < bx + 70) continue; line(g, x, 98, x, 172); }
        // the cow in the field, grazing, behind the fence and its gate
        const graze = reduce ? 0.6 : lerp(0.55 + Math.sin(t * 0.3) * 0.4, 0.05, walk);
        faded(g, 1 - seg(pigA, 0, 0.4), c => cow(c, 184, 141, 0.72, graze, 1));
        faded(g, seg(pigA, 0.4, 0.8), c => pig(c, 182, 141, 0.72, seg(pigA, 0.5, 1), 1)); // fuA: still, head up, looking your way
        fence(g, 128, 232, 176);
        const gx = 154, gw = 52;
        gate(g, gx, 176, gw, walk * 0.5 + lean * 0.25);
        // foreground: the yard, the table, the plate, and you
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 214, 400, 214);
        g.fillStyle = GRAPH; for (let k = 0; k < 24; k++) { const x = (k * 71.3) % 400, y = 220 + ((k * 29.1) % 26); g.fillRect(x, y, 1.2, 1.2); }
        // the worker who does it for a living (fu), standing by the gate
        if (worker > 0.01) ghost(g, worker, 236, 212, { scale: 0.86, t, phase: 911, dir: lerp(0.4, 0.75, pay) });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(270, 172, 76, 6); g.fill(); g.stroke(); line(g, 276, 178, 276, 214); line(g, 340, 178, 340, 214);
        const yx = lerp(354, 196, ease(walk)), sitting = walk < 0.05;
        chair(g, 360, 190, -1, 214, 1 - walk * 0.7);
        drawPerson(g, sitting ? 360 : yx, sitting ? 190 : 214, { me: true, scale: 0.9, t, sit: sitting, dir: !sitting ? -0.8 : lerp(-0.6, -0.85, Math.max(worker * 0.6, lab * 0.5)), moving: !sitting && walk < 0.95, walk: t * 3,
          lArm: sitting ? [lerp(-6, -16, Math.max(stopEat * (1 - already), pass)), lerp(2, -2, Math.max(stopEat, pass))] : walk > 0.9 ? [-10, lerp(-6, -12, lean)] : [-3, 5] });
        // the plate: meat, pushed aside (B), or greens (C). fuB: the meat comes back if you keep eating it, greens if you stop. fuC: lab-grown meat joins the greens
        const px = lerp(318, 292, stopEat * (1 - already));
        plate(g, px, 168, Math.max(1 - Math.max(stopEat, already) * 0.92, seg(took, 0.85, 1)), already, 1);
        // what links them
        thread(g, px - 16, 160, gx + gw / 2, 134, 26, (1 - Math.max(stopEat, already)) * 0.6, true);
        // fuB: a coin on the table, what you pay; it goes to the worker if you keep eating meat
        if (worker > 0.01) {
          const q = ease(clamp01(pay)), cxp = lerp(326, 250, q), cyp = lerp(166, 170, q) - Math.sin(q * Math.PI) * 30;
          coin(g, cxp, cyp, worker * (1 - clamp01((pay - 0.92) * 12)));
          thread(g, 318, 160, 248, 160, 12, worker * 0.45 * (1 - pay) * (1 - already), true);
        }
        // fuC: meat grown in a lab, a dish under a flask; no animal comes into it. If you'd eat it, a piece comes to your plate
        if (lab > 0.01) {
          const lx = 300, ly = 44, lr = 26, la = lab * (1 - pass * 0.7);
          thread(g, lx - 6, ly + lr - 2, px - 4, 160, 10, la * 0.5 * (1 - took), true);
          inFrame(g, lx, ly, lr, la, o => {
            o.strokeStyle = HAIR; o.lineWidth = 1; line(o, lx - lr, ly + 14, lx + lr, ly + 14);
            o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3; o.lineJoin = 'round';
            o.beginPath(); o.moveTo(lx + 6, ly + 14); o.lineTo(lx + 10, ly + 2); o.lineTo(lx + 10, ly - 8); o.lineTo(lx + 15, ly - 8); o.lineTo(lx + 15, ly + 2); o.lineTo(lx + 19, ly + 14); o.closePath(); o.fill(); o.stroke();
            o.strokeStyle = GRAPH; o.lineWidth = 1; line(o, lx + 8, ly + 9, lx + 17, ly + 9);
            o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3; o.beginPath(); o.ellipse(lx - 8, ly + 11, 13, 3.4, 0, 0, Math.PI * 2); o.fill(); o.stroke();
            if (took < 0.05) { o.beginPath(); o.ellipse(lx - 8, ly + 7, 7, 3.4, -0.1, 0, Math.PI * 2); o.fill(); o.stroke(); o.strokeStyle = GRAPH; o.lineWidth = 1; for (const dx of [-12, -8, -4]) line(o, lx + dx, ly + 5, lx + dx + 2, ly + 9); }
          });
          if (took > 0.05 && took < 0.88) { // the piece on its way down to your plate
            const q = seg(took, 0.05, 0.85), mx = lerp(lx - 8, px - 2, q), my = lerp(ly + 7, 164, q) - Math.sin(q * Math.PI) * 16;
            g.save(); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.ellipse(mx, my, 7, 3.4, -0.1, 0, Math.PI * 2); g.fill(); g.stroke(); g.restore();
          }
        }
      },
    },

    // ---------------------------------------------------------------- D2 The Neighbor's Rent
    donor: {
      base(v) { sc.x.v = v; sset({ far: 0, near: 0, stamp: 0, knock: 0, many: 0 }); },
      shift(v) {
        if (v === 'fuA') sto({ knock: 1 }, 0.7); // your neighbor comes in and asks you, face to face
        if (v === 'fuB') sto({ many: 1 }, 1.2); // not 200 children far away, but 2,000
      },
      acts: {
        'D2-A': { far: 1 }, 'D2-B': { near: 1 },
        'D2-FUA-A': { far: 1 }, 'D2-FUA-B': { near: 1 },
        'D2-FUB-A': { near: 1 }, 'D2-FUB-B': { far: 1 },
      },
      async act(a) {
        await actor(this.acts, 1.0, async (id, m) => {
          if (m.far) { sto({ stamp: 1 }, 2.2); await sleep(800); sto({ far: 1 }, 0.9); }
          else sto({ near: 1 }, 0.9);
        })(a);
      },
      draw(g, t) {
        const far = V('far'), near = V('near'), stamp = V('stamp'), knock = V('knock'), many = V('many');
        indoor(g);
        // the post office: a window onto the harbor behind the counter, the clerk
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(292, 32, 92, 62); g.strokeRect(292, 32, 92, 62);
        g.save(); g.beginPath(); g.rect(293, 33, 90, 60); g.clip(); sea(g, 64, 292, 384, 0.9); lighthouse(g, 364, 64, 0.5); g.restore();
        g.strokeStyle = INK; g.lineWidth = 1.3; line(g, 338, 32, 338, 94);
        const clerk = npcLook(921), dn = Math.sin(clamp01(stamp) * Math.PI);
        drawPerson(g, 336, 176, { look: clerk, scale: 0.9, t, dir: -0.4, lArm: [lerp(-8, -14, dn), lerp(-6, -12, dn)] });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(262, 162, 126, 7); g.fill(); g.stroke(); g.beginPath(); g.rect(268, 169, 114, 41); g.fill(); g.stroke();
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = 280; x < 378; x += 14) line(g, x, 172, x, 207);
        // the neighbor: a single parent and their child, a rent notice on their door
        const nx = 66, ny = 66, nr = 44;
        inFrame(g, nx, ny, nr, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, nx - nr, ny + 30, nx + nr, ny + 30);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.fillRect(nx + 4, ny - 26, 28, 56); o.strokeRect(nx + 4, ny - 26, 28, 56);
          o.lineWidth = 1.1; ellipse(o, nx + 27, ny + 4, 1.6, 1.6); o.stroke();
          const na = 1 - clamp01((near - 0.7) * 3.3) * 0.9;
          paper(o, nx + 18, ny - 10, 14, 16, -0.05, na); o.save(); o.globalAlpha = na; o.fillStyle = INK; o.fillRect(nx + 13, ny - 16, 10, 2.4); o.restore();
          drawPerson(o, nx - 12, ny + 32, { scale: 0.62, t, phase: 922, dir: lerp(0.3, 0.6, near), mood: near > 0.8 ? null : 'worried' });
          drawPerson(o, nx - 30, ny + 32, { scale: 0.38, t, phase: 923, dir: 0.4 });
        });
        // far away: about 200 children, each sleeping under a net (fuB: ten times as many, packed in small)
        const cx = 196, cy = 60, cr = 40;
        const nets = (o, rows, cols, gx, gy, x0, y0, sz, a) => {
          if (a <= 0.01) return;
          o.save(); o.globalAlpha = Math.min(1, a);
          for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
            const x = x0 + c * gx + (r % 2) * gx / 2, y = y0 + r * gy;
            o.strokeStyle = r < rows / 2 ? GRAPH : INK; o.lineWidth = 1; o.fillStyle = PAPER;
            // a small sleeping head under a net (the net is dashed until it's paid for)
            ellipse(o, x, y + 1.5 * sz, 3 * sz, 3 * sz); o.fill(); o.stroke(); line(o, x - 7 * sz, y + 5 * sz, x + 7 * sz, y + 5 * sz);
            const done = far > 0.6 ? clamp01((far - 0.6) * 2.5 * rows * cols - (r * cols + c)) : 0;
            o.save(); o.setLineDash(done > 0.5 ? [] : [2 * sz, 2 * sz]); o.beginPath(); o.moveTo(x - 6 * sz, y + 5 * sz); o.quadraticCurveTo(x, y - 9 * sz, x + 6 * sz, y + 5 * sz); o.stroke(); o.restore();
          }
          o.restore();
        };
        inFrame(g, cx, cy, cr, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, cx - cr, cy + 28, cx + cr, cy + 28);
          nets(o, 4, 6, 14, 13, cx - 36, cy - 22, 1, 1 - seg(many, 0, 0.4));
          nets(o, 8, 11, 7.4, 6.8, cx - 38, cy - 28, 0.5, seg(many, 0.4, 0.8));
        });
        // fuA: your neighbor comes in through the street door and asks you, face to face
        const kx = lerp(-24, 58, ease(clamp01(knock)));
        if (knock > 0.01) {
          drawPerson(g, kx, 210, { scale: 0.9, t, phase: 922, dir: knock < 0.9 ? 0.8 : 0.5, moving: knock > 0.02 && knock < 0.9, walk: t * 3, mood: near > 0.8 ? null : 'worried', lArm: near > 0.6 ? [10, -8] : [-3, 5] });
          say(g, kx - 4, 134, 36, kx + 2, 150, clamp01((knock - 0.85) * 7) * (1 - near) * (1 - far));
        }
        // you, with $1,000 in an envelope
        const yx = lerp(lerp(150, 224, clamp01(stamp * 2)), knock > 0.5 ? 92 : 112, near);
        drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: near > 0.05 || (knock > 0.6 && stamp < 0.05) ? -0.75 : 0.6, moving: (near > 0.05 && near < 0.95) || (stamp > 0.05 && stamp < 0.6), walk: t * 3,
          rArm: [lerp(10, 12, stamp), lerp(-8, -14, stamp)], lArm: near > 0.1 ? [-12, -12] : [-3, 5] });
        // the envelope: stamped at the counter and off to the charity (A), or carried to the neighbor's door (B)
        let ex = yx + 22, ey = 178, es = 0.8, ea = 1;
        if (stamp > 0.01 || far > 0.01) {
          const s1 = ease(clamp01(stamp * 1.4)), q = ease(clamp01(far));
          ex = lerp(lerp(yx + 22, 298, s1), cx, q); ey = lerp(lerp(178, 156, s1), cy + 10, q) - Math.sin(q * Math.PI) * 24; es = lerp(0.8, 0.5, q); ea = 1 - clamp01((far - 0.88) * 9);
        } else if (near > 0.01 && knock > 0.5) { // handed over in person
          const q = ease(clamp01((near - 0.25) / 0.75));
          ex = lerp(yx - 16, kx + 14, q); ey = lerp(160, 172, q) - Math.sin(q * Math.PI) * 8; es = 0.8;
        } else if (near > 0.01) {
          const q = ease(clamp01((near - 0.25) / 0.75));
          ex = lerp(yx - 16, nx + 18, q); ey = lerp(160, ny + 22, q) - Math.sin(q * Math.PI) * 20; es = lerp(0.8, 0.5, q); ea = 1 - clamp01((near - 0.9) * 10);
        }
        envelope(g, ex, ey, ea, es);
        txt(g, '$1,000', ex, ey - 18 * es, 10, ea * clamp01(1 - (far + near) * 1.6), SANS(10));
        if (stamp > 0.6) { g.save(); g.globalAlpha = ea * (stamp - 0.6) * 2.5; g.strokeStyle = INK; g.lineWidth = 1.2; ellipse(g, ex + 7 * es, ey - 2 * es, 3.6 * es, 3.6 * es); g.stroke(); g.restore(); }
      },
    },

    // ---------------------------------------------------------------- Q4 The Saturday
    shelter: {
      base(v) {
        sc.x.v = v;
        sset({ serve: 0, work: 0, give: 0, full: 0, fold: 0, call: 0, dusk: 0, here: 0, there: 0 });
        if (v === 'fuA') sset({ here: 1 });
        if (v === 'fuB') sset({ there: 1 });
      },
      shift(v) {
        if (v === 'fuA') sto({ full: 1 }, 0.7); // more volunteers than the shelter needs; the work left is sorting clothes in a back room
        if (v === 'fuB') { sto({ dusk: 1 }, 1.0); sto({ call: 1 }, 0.9); }
      },
      acts: {
        'Q4-A': { serve: 1 }, 'Q4-B': { work: 1 },
        'Q4-FUA2-A': { fold: 1 }, 'Q4-FUA2-B': { work: 1 },
        'Q4-FUB-A': { serve: 1 }, 'Q4-FUB-B': { work: 1 },
      },
      async act(a) {
        await actor(this.acts, 1.0, async (id, m) => {
          sto({ call: 0 }, 2);
          if (m.fold) { sto({ fold: 1 }, 0.6); return; }
          if (m.serve) { sto({ serve: 1, there: 0, here: 1 }, 0.9); }
          else { sto({ work: 1, here: 0, there: 1 }, 0.9); await sleep(1100); sto({ give: 1 }, 0.8); }
        })(a);
      },
      draw(g, t) {
        const serve = V('serve'), work = V('work'), give = V('give'), full = V('full'), fold = V('fold'), call = V('call'), dusk = V('dusk'), here = V('here'), there = V('there');
        // left: the shelter. right: the extra shift, and where its pay would go
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 212, 400, 212);
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = -20; x < 430; x += 44) line(g, x, 212, x - 16, 250);
        g.save(); g.strokeStyle = HAIR; g.setLineDash([3, 5]); line(g, 200, 20, 200, 244); g.restore();
        // the shelter's window; in fuB it's dusk, and a bed for tonight still has no one to staff it
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(118, 34, 56, 44); g.strokeRect(118, 34, 56, 44); line(g, 146, 34, 146, 78);
        moon(g, 162, 48, 5, dusk);
        inFrame(g, 58, 60, 36, dusk, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 22, 82, 94, 82);
          bed(o, 30, 64, 52, 1, serve < 0.5);
          if (serve > 0.01) { o.save(); o.globalAlpha *= Math.min(1, serve); drawPerson(o, 58, 64, { scale: 0.5, t, phase: 935, sit: true, dir: 0.2 }); o.restore(); }
        });
        // fuA: the back room, where the work left over is sorting donated clothes (you, small, folding, if you stay)
        inFrame(g, 58, 60, 36, full * (1 - dusk), o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 22, 82, 94, 82);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3; o.beginPath(); o.rect(30, 64, 34, 4); o.fill(); o.stroke(); line(o, 34, 68, 34, 82); line(o, 60, 68, 60, 82);
          const piles = [[39, 2 + fold * 2], [54, 1 + fold * 3]];
          for (const [x, n] of piles) for (let k = 0; k < Math.floor(n); k++) { o.beginPath(); o.roundRect(x - 6, 60 - k * 3.6, 12, 3.4, 1); o.fill(); o.stroke(); }
          if (fold > 0.01) { o.save(); o.globalAlpha *= Math.min(1, fold); drawPerson(o, 76, 82, { me: true, scale: 0.36, t, dir: -0.5, lArm: [-6, -3] }); o.restore(); }
        });
        // you, serving from behind the counter, or at the shift desk (fuA: you leave the counter for the back room)
        const yx = lerp(lerp(216, 84, here), 300, there), behind = here > 0.3 && there < 0.5;
        const yy = behind ? lerp(212, 176, clamp01((here - 0.3) / 0.7)) : 212;
        const moving = [here, there].some(k => k > 0.05 && k < 0.95);
        const meOpts = { me: true, scale: 0.9, t, dir: there > 0.5 ? 0.6 : here > 0.5 ? 0.6 : 0, moving, walk: t * 3,
          rArm: here > 0.5 ? [lerp(3, 14, serve), lerp(5, -8, serve)] : there > 0.5 ? [lerp(3, 12, work), lerp(5, -6, work)] : [3, 5] };
        const me = () => { if (fold > 0.01) ghost(g, 1 - fold, yx, yy, meOpts); else drawPerson(g, yx, yy, meOpts); };
        // fuA: the shelter is fully staffed: three more volunteers behind the counter
        if (full > 0.01) for (const [x, ph] of [[26, 936], [56, 937], [110, 938]]) ghost(g, full, x, 176, { scale: 0.82, t, phase: ph, dir: 0.5 });
        if (behind) me();
        // the counter and the pot
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(10, 170, 112, 6); g.fill(); g.stroke(); g.beginPath(); g.rect(16, 176, 100, 36); g.fill(); g.stroke();
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = 28; x < 112; x += 14) line(g, x, 179, x, 209);
        pot(g, 38, 170, t);
        // two people waiting for a meal
        drawPerson(g, 140, 212, { scale: 0.86, t, phase: 932, dir: -0.6, lArm: [lerp(-4, -12, serve), lerp(6, -6, serve)] });
        drawPerson(g, 168, 212, { scale: 0.76, t, phase: 934, dir: -0.5 });
        const bu = ease(clamp01(serve));
        bowl(g, lerp(84, 126, bu), lerp(164, 176, bu) - Math.sin(bu * Math.PI) * 10, serve);
        // right: the shift desk with its register and clock, and the charity far away
        desk(g, 296, 384, 166, 212);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.roundRect(320, 144, 34, 22, 3); g.fill(); g.stroke(); g.strokeStyle = GRAPH; g.lineWidth = 1; for (let k = 0; k < 3; k++) for (let c = 0; c < 3; c++) g.strokeRect(325 + c * 9, 148 + k * 6, 5, 3);
        clock(g, 366, 128, 9, -0.6 + work * 2.4);
        // fuB: the shelter calls you
        marks(g, 'waves', 372, 158, call, t); handset(g, 372, 158, 0, call);
        thread(g, 362, 150, 92, 92, 40, call * 0.5, true);
        const fx = 300, fy = 62, fr = 46;
        inFrame(g, fx, fy, fr, 1, o => {
          const n = 12, cols = 4, gap = 14;
          for (let i = 0; i < n; i++) {
            const c = i % cols, r = Math.floor(i / cols), x = fx - (cols - 1) * gap / 2 + c * gap, y = fy - 22 + r * 14;
            o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1; ellipse(o, x, y, 2.4, 2.4); o.stroke();
            if (clamp01(give * n * 1.1 - i) > 0.5) { o.fillStyle = INK; o.fill(); }
          }
        });
        // the day's pay: an envelope, off to the charity
        if (give > 0.01) {
          const q = ease(clamp01(give));
          envelope(g, lerp(330, fx, q), lerp(140, fy + 8, q) - Math.sin(q * Math.PI) * 18, 1 - clamp01((give - 0.9) * 10), lerp(0.7, 0.4, q), 0.6);
        }
        if (!behind) me();
      },
    },

    // ---------------------------------------------------------------- B22 The 200-Year Deal
    sapling: {
      base(v) {
        sc.x.v = v;
        sset({ press: 0, leave: 0, vote: 0, cut: 0, yes: 0, no: 0, kin: 0 });
        if (v === 'fuA') sset({ press: 1 }); // you pressed: your own tenth is already gone
        if (v === 'fuB') sset({ leave: 0.45 }); // you'd begun to walk away from the button
      },
      shift(v) {
        if (v === 'fuA') { sto({ vote: 1 }, 0.8); sto({ cut: 1 }, 0.4); } // everyone alive votes, and everyone loses a tenth, the poorest too
        if (v === 'fuB') sto({ kin: 1 }, 0.7); // a line of your own family runs down to one of the million
      },
      acts: {
        'B22-A': { press: 1 }, 'B22-B': { leave: 1 },
        'B22-FUA-A': { yes: 1 }, 'B22-FUA-B': { no: 1 },
        'B22-FUB-A': { leave: 0, press: 1 }, 'B22-FUB-B': { leave: 1 },
      },
      async act(a) { await actor(this.acts, 1.0)(a); },
      draw(g, t) {
        const press = V('press'), leave = V('leave'), vote = V('vote'), cut = V('cut'), yes = V('yes'), no = V('no'), kin = V('kin');
        sea(g, 132, 0, 400, 0.7);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 212, 400, 212);
        g.fillStyle = GRAPH; for (let k = 0; k < 30; k++) { const x = (k * 71.3) % 400, y = 218 + ((k * 29.1) % 28); g.fillRect(x, y, 1.2, 1.2); }
        // the sapling with its stake, in a ring of stones
        const tx = 150, sw = reduce ? 0 : Math.sin(t * 0.6) * 1.2;
        g.strokeStyle = INK; g.lineWidth = 1.8; g.lineCap = 'round'; line(g, tx + 7, 212, tx + 7, 158);
        g.lineWidth = 1.5; g.beginPath(); g.moveTo(tx, 212); g.quadraticCurveTo(tx - 1, 186, tx + sw, 160); g.stroke();
        g.lineWidth = 1; line(g, tx, 186, tx + 7, 186);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2;
        for (const [dx, an, r] of [[-8, -0.7, 6], [6, 0.6, 5.5], [-3, -0.2, 5], [3, 0.9, 4.5], [-6, -1.2, 4]]) { g.save(); g.translate(tx + sw + dx * 0.6, 162 + Math.abs(dx) * 0.8); g.rotate(an); g.beginPath(); g.ellipse(0, -r, r * 0.55, r, 0, 0, Math.PI * 2); g.fill(); g.stroke(); g.restore(); }
        for (let k = 0; k < 9; k++) { const an = k / 9 * Math.PI * 2, x = tx + 2 + Math.cos(an) * 24, y = 212 + Math.sin(an) * 5; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; g.beginPath(); g.ellipse(x, y, 5, 3.4, 0, 0, Math.PI * 2); g.fill(); g.stroke(); }
        // your life: home, and ten parts of your money and comfort. Pressing takes one away for good
        const hx = 64, hy = 60, hr = 38;
        inFrame(g, hx, hy, hr, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, hx - hr, hy + 22, hx + hr, hy + 22);
          desk(o, hx - 26, hx + 14, hy + 4, hy + 22); chair(o, hx + 22, hy + 8, -1, hy + 22, 1);
          o.strokeStyle = INK; o.lineWidth = 1.3; line(o, hx - 14, hy + 4, hx - 14, hy - 14); o.fillStyle = PAPER; o.beginPath(); o.moveTo(hx - 22, hy - 12); o.lineTo(hx - 6, hy - 12); o.lineTo(hx - 10, hy - 22); o.lineTo(hx - 18, hy - 22); o.closePath(); o.fill(); o.stroke();
          bowl(o, hx + 2, hy + 2, 1); steam(o, hx + 2, hy - 6, t);
        });
        const lost = Math.max(press, yes);
        slots(g, hx - 44, hy + hr + 8, 10, 10 - lost, 1, 6);
        // 200 years from now: people you'll never meet, under a grown tree
        const fx = 314, fy = 62, fr = 46;
        inFrame(g, fx, fy, fr, 0.55 + Math.max(press, yes) * 0.45, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, fx - fr, fy + 28, fx + fr, fy + 28);
          o.strokeStyle = GRAPH; o.lineWidth = 1.4; line(o, fx + 22, fy + 28, fx + 22, fy - 4);
          o.fillStyle = PAPER; o.lineWidth = 1.2; for (const [dx, dy, r] of [[22, -14, 13], [10, -8, 9], [33, -6, 9], [18, -26, 8], [30, -22, 8]]) { ellipse(o, fx + dx, fy + dy, r, r); o.fill(); o.stroke(); }
          crowd(o, fx - 14, fy - 2, 7, 3, 8.5, 1, Math.max(press, yes) < 0.5);
          if (kin > 0.01) { o.save(); o.globalAlpha *= Math.min(1, kin); o.fillStyle = INK; ellipse(o, fx - 31, fy + 16.7, 2.4, 2.4); o.fill(); o.restore(); } // fuB: your great-great-grandchild, among them
        }, Math.max(press, yes) < 0.5);
        sparkle(g, fx - 34, fy - 36, 3, Math.max(press, yes)); sparkle(g, fx + 40, fy - 28, 2.5, Math.max(press, yes));
        txt(g, '200 years', fx, fy + fr + 12, 10, 1, SANS(10));
        // fuA: everyone alive gets the same cut: others line up to vote, each with their own share (the one in the middle already has little)
        for (const [x, ph, k, n] of [[318, 941, 0, 10], [350, 942, 1, 3], [382, 943, 2, 10]]) {
          const va = vote * clamp01(vote * 2 - k * 0.3);
          ghost(g, va, x, 212, { scale: 0.64, t, phase: ph, dir: -0.6 });
          slots(g, x - 13.5, 148, n, n - seg(cut, 0.5, 1), va, 2.5, 5);
        }
        // the button on its post (trunk), or the ballot box (fu)
        const bx = 236;
        g.save(); g.globalAlpha = 1 - vote;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.moveTo(bx - 9, 212); g.lineTo(bx - 7, 182); g.lineTo(bx + 7, 182); g.lineTo(bx + 9, 212); g.closePath(); g.fill(); g.stroke();
        g.beginPath(); g.roundRect(bx - 11, 177, 22, 6, 2); g.fill(); g.stroke();
        g.fillStyle = INK; g.beginPath(); g.ellipse(bx, 177 + press * 2, 6.5, 4.5, 0, Math.PI, 0); g.fill();
        g.restore();
        if (vote > 0.01) {
          g.save(); g.globalAlpha = vote; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(bx - 16, 180, 32, 32); g.strokeRect(bx - 16, 180, 32, 32); g.lineWidth = 2; line(g, bx - 8, 186, bx + 8, 186); g.restore();
        }
        // you
        const yx = lerp(266, 300, leave), reach = Math.max(press, yes, no) * (1 - leave);
        // fuB: your family line, generation by generation, from you to one of the million
        if (kin > 0.01) {
          const k0x = yx - 4, k0y = 150, k1x = fx - 31, k1y = fy + 22, lift = 6;
          thread(g, k0x, k0y, k1x, k1y, lift, kin * 0.6, true);
          g.save(); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.1;
          const cxk = (k0x + k1x) / 2, cyk = Math.min(k0y, k1y) - lift; // dots sit on the thread's curve
          for (let i = 1; i <= 3; i++) { const u = i / 4, a = clamp01(kin * 4 - i); if (a <= 0.01) continue; g.globalAlpha = a; const x = (1 - u) * (1 - u) * k0x + 2 * u * (1 - u) * cxk + u * u * k1x, y = (1 - u) * (1 - u) * k0y + 2 * u * (1 - u) * cyk + u * u * k1y; ellipse(g, x, y, 2.6, 2.6); g.fill(); g.stroke(); }
          g.restore();
        }
        drawPerson(g, yx, 212, { me: true, scale: 0.9, t, dir: leave > 0.5 ? 0.6 : -0.5, moving: leave > 0.05 && leave < 0.95, walk: t * 3, lArm: [lerp(-3, -16, reach), lerp(5, -8, reach)] });
        // fuA: your ballot, marked yes or no, into the box
        if (vote > 0.01) {
          const pick = Math.max(yes, no), q = ease(clamp01((pick - 0.3) / 0.7));
          const px = lerp(yx - 20, bx, q), py = lerp(160, 184, q) - Math.sin(q * Math.PI) * 14, pa = vote * (1 - clamp01((pick - 0.92) * 12));
          paper(g, px, py, 14, 16, 0, pa);
          tick(g, px, py, 0.8, pa * yes); cross(g, px, py, 0.7, pa * no);
        }
      },
    },

    // ---------------------------------------------------------------- D12 The Bonus Pool
    bonus: {
      base(v) {
        sc.x.v = v;
        sset({ most: 0, even: 0, door: 0, back: 0, stay: 0, go: 0, luck: 0, settle: 0 });
        if (v === 'fuA') sset({ most: 1 }); // you gave most of it to the best performer
        if (v === 'fuB') sset({ even: 1 });
      },
      shift(v) {
        if (v === 'fuA') sto({ luck: 1 }, 0.7); // their biggest clients came to them by chance: a die, tied to their stack
        if (v === 'fuB') sto({ door: 1 }, 0.9);
      },
      acts: {
        'D12-A': { most: 1 }, 'D12-B': { even: 1 },
        'D12-FUA-A': { settle: 1 }, 'D12-FUA-B': { most: 0, even: 1, settle: 1 },
        'D12-FUB-A': { most: 1, even: 0, back: 1 }, 'D12-FUB-B': { go: 1 },
      },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const most = V('most'), even = V('even'), door_ = V('door'), back = V('back'), go = V('go'), luck = V('luck'), settle = V('settle');
        indoor(g);
        // the harbor office: a window onto moored boats
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(150, 26, 110, 64); g.strokeRect(150, 26, 110, 64);
        g.save(); g.beginPath(); g.rect(151, 27, 108, 62); g.clip(); sea(g, 56, 150, 260, 0.9);
        for (const bx of [178, 226]) { g.strokeStyle = GRAPH; g.lineWidth = 1.1; g.beginPath(); g.moveTo(bx - 14, 66); g.lineTo(bx + 14, 66); g.lineTo(bx + 9, 73); g.lineTo(bx - 9, 73); g.closePath(); g.stroke(); line(g, bx, 66, bx, 44); }
        g.restore();
        door(g, 352, 96, 38, 210, go * 0.8, { pane: true });
        // the team on the floor, and above each, what they produced: the best performer more than the other four together
        const team = [[20, 951], [46, 952], [72, 953], [98, 954]], best = [318, 955];
        team.forEach(([x, ph], i) => { slots(g, x - 7, 128, 4, 4, 1, 5, 2); drawPerson(g, x, 210, { scale: 0.68, t, phase: ph, dir: 0.4 }); });
        const bxp = lerp(lerp(best[0], 336, door_), 420, go);
        slots(g, best[0] - 7, 104, 10, 10, 1, 5, 2);
        // fuA: a die in a small window, tied to the best performer's stack: the big clients came by chance
        const la = luck * (1 - settle * 0.6);
        if (la > 0.01) {
          thread(g, 336, 74, best[0] + 3, 102, 6, la * 0.7, true);
          inFrame(g, 336, 54, 22, la, o => {
            o.save(); o.translate(336, 54); o.rotate(0.18); o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.beginPath(); o.roundRect(-9, -9, 18, 18, 3.5); o.fill(); o.stroke();
            o.fillStyle = INK; for (const [px, py] of [[-4.5, -4.5], [4.5, -4.5], [0, 0], [-4.5, 4.5], [4.5, 4.5]]) { ellipse(o, px, py, 1.6, 1.6); o.fill(); }
            o.restore();
          });
        }
        drawPerson(g, bxp, 210, { scale: 0.72, t, phase: best[1], dir: go > 0.05 ? 0.8 : -0.5, moving: (door_ > 0.05 && door_ < 0.95) || (go > 0.05 && go < 0.95), walk: t * 3 });
        say(g, bxp - 16, 150, 40, bxp - 6, 168, door_ * (1 - go) * (1 - back));
        // your desk with five envelopes: one stuffed full, or five the same; you beside it
        desk(g, 164, 290, 176);
        drawPerson(g, 144, 210, { me: true, scale: 0.9, t, dir: lerp(0.5, 0.7, door_), lArm: [-3, 5], rArm: [lerp(3, 14, Math.max(most, even)), lerp(5, -10, Math.max(most, even))] });
        const ex = [178, 203, 228, 253, 278];
        ex.forEach((x, i) => {
          const th = i === 4 ? lerp(lerp(0.15, 1, most), 0.35, even * (1 - most)) : lerp(lerp(0.15, 0.05, most), 0.35, even * (1 - most));
          envelope(g, x, 166 - th * 4, 1, 0.75, th);
        });
      },
    },

    // ---------------------------------------------------------------- D9 The Two Programs
    programs: {
      base(v) {
        sc.x.v = v; sset({ shutL: 0, shutR: 0, alone: 0, other: 0 });
        if (v === 'fuA') sset({ shutL: 0.4 }); // mentoring's shutter is on its way down, not final yet
        if (v === 'fuB') sset({ shutR: 0.4 }); // tutoring's shutter is on its way down, not final yet
      },
      shift(v) {
        if (v === 'fuA') sto({ alone: 1 }, 0.8); // one of the five has no one else at home
        if (v === 'fuB') sto({ other: 1 }, 0.7); // someone else built mentoring; your threads to the five were never there
      },
      acts: {
        'D9-A': { shutL: 1 }, 'D9-B': { shutR: 1 },
        'D9-FUA2-A': { shutL: 1 }, 'D9-FUA2-B': { shutL: 0, shutR: 1 },
        'D9-FUB2-A': { shutR: 1 }, 'D9-FUB2-B': { shutR: 0, shutL: 1 },
      },
      async act(a) { await actor(this.acts, 0.7)(a); },
      draw(g, t) {
        const L = V('shutL'), R = V('shutR'), alone = V('alone'), other = V('other');
        // the community center: one roof over two rooms
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(10, 40); g.lineTo(200, 14); g.lineTo(390, 40); g.closePath(); g.fill(); g.stroke();
        g.beginPath(); g.rect(16, 40, 368, 140); g.fill(); g.stroke();
        line(g, 200, 40, 200, 180);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 214, 400, 214);
        // left: mentoring. five kids round a table; you know each of them
        const lk = [[40, 961], [66, 962], [130, 963], [156, 964], [180, 965]];
        g.strokeStyle = INK; g.lineWidth = 1.2; line(g, 98, 40, 98, 74); g.fillStyle = PAPER; g.lineWidth = 1.4;
        g.beginPath(); g.moveTo(86, 84); g.lineTo(110, 84); g.lineTo(104, 74); g.lineTo(92, 74); g.closePath(); g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (const an of [0.35, 0.5, 0.65]) line(g, 98 + Math.cos(an * Math.PI) * 10, 86 + Math.sin(an * Math.PI) * 6, 98 + Math.cos(an * Math.PI) * 16, 86 + Math.sin(an * Math.PI) * 12);
        [[34, 0.06], [58, -0.05], [140, 0.04], [164, -0.06], [188, 0.05]].forEach(([x, r]) => paper(g, x - 4, 64, 16, 18, r, 1));
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.rect(84, 150, 30, 5); g.fill(); g.stroke(); line(g, 99, 155, 99, 178);
        lk.forEach(([x, ph]) => drawPerson(g, x, 178, { scale: 0.52, t, phase: ph, dir: x < 102 ? 0.5 : -0.5 }));
        // fuA: one of the five has no one else: a soft ring round them, and their home, an empty chair at an empty table
        if (alone > 0.01) {
          g.save(); g.globalAlpha = alone * 0.8; g.strokeStyle = INK; g.lineWidth = 1.1; g.setLineDash([3, 3]); ellipse(g, 130, 160, 14, 22); g.stroke(); g.restore();
          thread(g, 130, 136, 150, 128, 4, alone * 0.6, true);
          inFrame(g, 160, 112, 18, alone, o => {
            o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 142, 124, 178, 124);
            o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.2; o.beginPath(); o.rect(146, 110, 18, 3); o.fill(); o.stroke(); line(o, 149, 113, 149, 124); line(o, 161, 113, 161, 124);
            o.lineWidth = 1.3; line(o, 166, 114, 176, 114); line(o, 174, 114, 174, 102); line(o, 167, 114, 166, 124); line(o, 175, 114, 176, 124);
          });
        }
        // right: tutoring. rows and rows of kids, about 200
        crowd(g, 292, 86, 13, 6, 12, 1);
        // the shutters: one comes down
        const shutter = (x0, k) => {
          if (k <= 0.01) return;
          const hgt = 138 * ease(clamp01(k));
          g.save(); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(x0, 41, 182, hgt); g.strokeRect(x0, 41, 182, hgt);
          g.strokeStyle = GRAPH; g.lineWidth = 1; for (let y = 47; y < 41 + hgt; y += 6) line(g, x0 + 1, y, x0 + 181, y); g.restore();
        };
        shutter(17, L); shutter(201, R);
        // the steps up to the doors, and you in front
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.rect(160, 180, 80, 8); g.fill(); g.stroke();
        const yx = 200;
        // fuB: the person who built mentoring instead of you, at its door; you've never met the five
        if (other > 0.01) ghost(g, other, 136, 214, { scale: 0.86, t, phase: 966, dir: 0.5 });
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: lerp(lerp(0, -0.6, L), 0.6, R) });
        // threads from you to each of the five you know (fuB: there are none)
        thread(g, yx - 6, 170, 104, 132, 16, 0.75 * (1 - L * 0.5) * (1 - other), L > 0.5);
        if (other > 0.01) thread(g, 142, 170, 104, 132, 12, 0.75 * other * (1 - L * 0.5), L > 0.5);
      },
    },

    // ---------------------------------------------------------------- B20 The Weapons Job
    crane: {
      base(v) {
        sc.x.v = v; sset({ sign: 0, decline: 0, news: 0, home: 0, stay: 0, quit: 0, hold: 0 });
        if (v === 'fuA') sset({ sign: 1 }); // you took the job: the contract is signed, the debts are gone
        if (v === 'fuB') sset({ decline: 1 }); // you said no: the other candidate has the drafting table
      },
      shift(v) {
        if (v === 'fuA') sto({ news: 1 }, 0.7); // the news lands on your desk: your first design was used in a strike
        if (v === 'fuB') sto({ home: 1 }, 0.6); // without the pay, the family home is at risk
      },
      acts: {
        'B20-A': { sign: 1 }, 'B20-B': { decline: 1 },
        'B20-FUA-A': { stay: 1 }, 'B20-FUA-B': { quit: 1 },
        'B20-FUB-A': { hold: 1 }, 'B20-FUB-B': { sign: 1, decline: 0 },
      },
      async act(a) { await actor(this.acts, 0.8)(a); },
      draw(g, t) {
        const sign = V('sign'), dec = V('decline'), news = V('news'), home = V('home'), stay = V('stay'), quit = V('quit'), hold = V('hold');
        indoor(g);
        // the dockyard through the window: a crane over still water
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(132, 22, 140, 80); g.strokeRect(132, 22, 140, 80);
        g.save(); g.beginPath(); g.rect(133, 23, 138, 78); g.clip();
        sea(g, 80, 132, 272, 0.9);
        g.strokeStyle = GRAPH; g.lineWidth = 1.3; g.lineJoin = 'round';
        line(g, 176, 80, 176, 38); line(g, 186, 80, 186, 38); for (let y = 76; y > 40; y -= 8) line(g, 176, y, 186, y - 8);
        line(g, 150, 38, 250, 38); line(g, 150, 44, 250, 44); line(g, 181, 30, 150, 38); line(g, 181, 30, 250, 38);
        g.lineWidth = 1; line(g, 236, 44, 236, 62); g.strokeRect(229, 62, 14, 9);
        g.restore();
        g.strokeStyle = INK; g.lineWidth = 1.2; line(g, 202, 22, 202, 102);
        // the drafting table: a tilted board with a sheet of plain grid
        g.strokeStyle = INK; g.lineWidth = 1.8; g.lineCap = 'round'; line(g, 300, 210, 314, 150); line(g, 360, 210, 346, 150);
        g.fillStyle = PAPER; g.lineWidth = 1.6; g.save(); g.translate(330, 140); g.rotate(-0.3); g.beginPath(); g.rect(-44, -6, 88, 12); g.fill(); g.stroke(); g.restore();
        g.save(); g.translate(330, 128); g.rotate(-0.3); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.fillRect(-34, -16, 68, 22); g.strokeRect(-34, -16, 68, 22);
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = -28; x < 34; x += 8) line(g, x, -16, x, 6); for (let y = -10; y < 6; y += 6) line(g, -34, y, 34, y); g.restore();
        // your family at home, and the stack of debts
        const hx = 62, hy = 54, hr = 40;
        const lose = seg(home, 0.35, 1) * (1 - sign); // fuB: the walls of home go dashed, a notice on the door
        inFrame(g, hx, hy, hr, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, hx - hr, hy + 30, hx + hr, hy + 30);
          if (home > 0.01) {
            const walls = dash => { o.beginPath(); o.moveTo(hx - 32, hy + 30); o.lineTo(hx - 32, hy - 2); o.lineTo(hx - 10, hy - 18); o.lineTo(hx + 12, hy - 2); o.lineTo(hx + 12, hy + 30); o.stroke(); };
            o.save(); o.strokeStyle = GRAPH; o.lineWidth = 1.3; o.lineJoin = 'round';
            o.globalAlpha = Math.min(1, home) * (1 - lose); walls(); o.globalAlpha = Math.min(1, home) * lose; o.setLineDash([3, 3]); walls(); o.restore();
            paper(o, hx - 22, hy + 6, 10, 12, -0.08, seg(home, 0.1, 0.6) * (1 - sign));
          }
          drawPerson(o, hx - 16, hy + 32, { scale: 0.58, t, phase: 971, dir: 0.3 }); drawPerson(o, hx + 2, hy + 32, { scale: 0.38, t, phase: 972, dir: 0.2 });
          desk(o, hx + 10, hx + 36, hy + 12, hy + 30);
          for (let k = 0; k < 5; k++) envelope(o, hx + 23, hy + 8 - k * 5, 1 - clamp01(sign * 6 - (4 - k)), 0.5);
        });
        // the other candidate, waiting outside, who gets it if you say no
        door(g, 14, 104, 40, 210, Math.max(sign * 0.7, quit * 0.8), { pane: true });
        const other = npcLook(973), ox = lerp(lerp(88, 30, sign), 300, dec), sitting = sign < 0.05 && dec < 0.05;
        chair(g, 88, 190, 1, 210, 1 - Math.max(sign, dec) * 0.5);
        ghost(g, 1 - clamp01((sign - (sc.x.v === 'fuB' ? 0.15 : 0.8)) * 5), sitting ? 88 : ox, sitting ? 190 : 210, { look: other, scale: 0.86, t, sit: sitting, dir: dec > 0.05 ? 0.7 : sign > 0.05 ? -0.8 : 0.4, moving: (sign > 0.05 && sign < 0.95) || (dec > 0.05 && dec < 0.95), walk: t * 3 });
        // the contract on the desk, and you
        desk(g, 150, 262, 172);
        paper(g, 210, 166, 30, 10, 0, 1);
        if (sign > 0.01) { g.save(); g.globalAlpha = sign; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); for (let k = 0; k <= 10; k++) { const x = 198 + k * 2.2 * sign, y = 166 + Math.sin(k * 1.4) * 1.6; k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore(); }
        // fuA: a newspaper lands on the desk, its headline a heavy black bar
        if (news > 0.01) {
          const q = ease(clamp01(news)), ny = lerp(150, 164, q);
          g.save(); g.globalAlpha = q; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.fillRect(162, ny - 6, 30, 12); g.strokeRect(162, ny - 6, 30, 12);
          g.fillStyle = INK; g.fillRect(165, ny - 4, 24, 3.2); g.strokeStyle = GRAPH; g.lineWidth = 0.9; for (const yy of [ny + 1.5, ny + 4]) line(g, 165, yy, 189, yy); g.restore();
        }
        let yx = lerp(lerp(206, 220, sign), 120, dec);
        yx = lerp(lerp(yx, 300, ease(stay)), 26, ease(quit));
        const going = [dec, stay, quit].some(k => k > 0.05 && k < 0.95);
        const ydir = quit > 0.05 ? -0.8 : stay > 0.5 ? 0.6 : hold > 0.3 ? -0.5 : news > 0.5 && stay < 0.05 ? -0.3 : dec > 0.5 ? -0.7 : 0.4;
        ghost(g, 1 - clamp01((quit - 0.85) * 7), yx, 210, { me: true, scale: 0.9, t, dir: ydir, moving: going, walk: t * 3, rArm: stay > 0.5 ? [10, -10] : [lerp(6, 2, sign), lerp(-6, 0, sign)] });
        // fuB, still no: you turn towards home
        thread(g, yx - 8, 172, hx + 24, hy + hr - 4, 18, hold * 0.75);
        // the pen: in your hand, or put down on the desk
        g.save(); g.strokeStyle = INK; g.lineWidth = 2; g.lineCap = 'round';
        const down = Math.max(dec, quit);
        const pxp = down > 0.01 ? lerp(yx + 18, 236, ease(down)) : yx + 18, pyp = down > 0.01 ? lerp(166, 168, down) : lerp(166, 162, sign);
        line(g, pxp - 4, pyp + 5, pxp + 4, pyp - 5); g.restore();
      },
    },

    // ---------------------------------------------------------------- B19 The Kidney
    kidney: {
      base(v) {
        sc.x.v = v; sset({ give: 0, back: 0, past: 0, young: 0 });
        if (v === 'fuB') sset({ back: 1 }); // you'd said no and turned for the door
      },
      shift(v) {
        if (v === 'fuA') sto({ past: 1 }, 0.9);
        if (v === 'fuB') sto({ young: 1 }, 1.3); // the stranger is 8 years old
      },
      acts: {
        'B19-A': { give: 1 }, 'B19-B': { back: 1 },
        'B19-FUA-A': { give: 1 }, 'B19-FUA-B': { back: 1 },
        'B19-FUB-A': { give: 1, back: 0 }, 'B19-FUB-B': { back: 1 },
      },
      async act(a) { await actor(this.acts, 0.8)(a); },
      draw(g, t) {
        const give = V('give'), back = V('back'), past = V('past'), young = V('young');
        indoor(g);
        // the clinic: a curtain rail, a bed, the stranger waiting
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 220, 30, 392, 30);
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let x = 226; x < 260; x += 6) { g.beginPath(); g.moveTo(x, 30); g.quadraticCurveTo(x + 3, 90, x, 160); g.stroke(); }
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.roundRect(266, 160, 120, 10, 3); g.fill(); g.stroke();
        line(g, 272, 170, 272, 210); line(g, 380, 170, 380, 210); line(g, 386, 160, 386, 132);
        const who = npcLook(981);
        const pOpts = s_ => ({ look: who, scale: s_, t: reduce ? 0 : t * 0.6, sit: true, dir: -0.5, mood: give > 0.6 ? null : 'worried' });
        // fuB: the one waiting is a child (the grown-up gives way to a small figure, and a crayon drawing is pinned by the bed)
        ghost(g, 1 - seg(young, 0, 0.4), 318, 160, pOpts(0.88));
        ghost(g, seg(young, 0.4, 0.8), 318, 149, pOpts(0.52)); scribble(g, 330, 98, 30, 24, seg(young, 0.5, 0.9));
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(300, 154, 66, 10, 3); g.fill(); g.stroke();
        hourglass(g, 372, 120, 1 - give, t);
        // the calendar: six weeks of recovery, filled in if you give
        const cx = 120, cy = 44;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(cx - 4, cy - 14, 72, 74); g.strokeRect(cx - 4, cy - 14, 72, 74);
        g.fillRect(cx - 4, cy - 14, 72, 9); g.strokeRect(cx - 4, cy - 14, 72, 9); g.fillStyle = INK; ellipse(g, cx + 12, cy - 15, 1.8, 1.8); g.fill(); ellipse(g, cx + 52, cy - 15, 1.8, 1.8); g.fill();
        slots(g, cx, cy, 42, give * 42, 1, 6, 7);
        // and a small mark that lasts: a thin line running on past the six weeks
        g.save(); g.strokeStyle = INK; g.lineWidth = 1; g.globalAlpha = give; g.setLineDash([2, 3]); line(g, cx, cy + 66, cx + 64 + give * 30, cy + 66); g.restore();
        // the door out, and you
        door(g, 20, 96, 42, 210, back * 0.6, { pane: true });
        const yx = lerp(lerp(180, 236, give), 90, back);
        drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: back > 0.5 ? -0.7 : 0.6, moving: (give > 0.05 && give < 0.95) || (back > 0.05 && back < 0.95), walk: t * 3 });
        thread(g, yx + 10, 172, 306, 150, 16, give * 0.85);
        // fu: twenty years served for murder, released last year
        inFrame(g, 312, 62, 30, past, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 282, 84, 342, 84);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.fillRect(299, 46, 24, 38); o.strokeRect(299, 46, 24, 38);
          o.fillRect(304, 52, 14, 10); o.strokeRect(304, 52, 14, 10); o.lineWidth = 1.5; for (let k = 1; k < 4; k++) line(o, 304 + k * 3.5, 52, 304 + k * 3.5, 62);
        });
        slots(g, 276, 98, 20, 20, past, 4, 10);
      },
    },

    // ---------------------------------------------------------------- B23 The Happy City
    happycity: {
      base(v) {
        sc.x.v = v;
        sset({ stay: 0, leave: 0, free: 0, many: 0, kids: 0, door: 0, sick: 0 });
        if (v === 'fuA') sset({ stay: 1 }); // you stayed: on the bench
        if (v === 'fuB') sset({ leave: 0.3 }); // you'd begun to walk away along the boardwalk
        if (v === 'fuC') sset({ door: 1 }); // you're at the basement door, hand on it
      },
      shift(v) {
        if (v === 'fuA') sto({ many: 1 }, 0.6); // a hundred basement windows
        if (v === 'fuB') sto({ kids: 1 }, 0.7); // your own children with you, and the poorer, sicker life outside
        if (v === 'fuC') sto({ sick: 1 }, 0.6); // freeing the child brings sickness back: the sparkle goes, cots fill a ward
      },
      acts: {
        'B23-A': { stay: 1 }, 'B23-B': { leave: 1 }, 'B23-C': { free: 1 },
        'B23-FUA-A': { stay: 1 }, 'B23-FUA-B': { leave: 1 }, 'B23-FUA-C': { free: 1 },
        'B23-FUB-A': { leave: 1 }, 'B23-FUB-B': { leave: 0, stay: 1 },
        'B23-FUC-A': { free: 1 }, 'B23-FUC-B': { door: 0 },
      },
      async act(a) { await actor(this.acts, 0.8)(a); },
      draw(g, t) {
        const stay = V('stay'), leave = V('leave'), free = V('free'), many = V('many'), kids = V('kids'), door_ = V('door'), sick = V('sick');
        const fortune = (1 - free * 0.8) * (1 - sick * 0.8);
        sea(g, 96, 0, 400, 0.6);
        // the town behind the boardwalk: bright windows, a low row of basement windows (fu: a hundred)
        const houses = [[20, 44, 64], [70, 40, 80], [116, 48, 58], [262, 46, 70], [314, 40, 60], [360, 44, 76]];
        houses.forEach(([x, w, hh], i) => house(g, x, 150, w, hh, { lw: 1.4, lit: false }));
        sparkle(g, 60, 52, 3, fortune * 0.9); sparkle(g, 300, 58, 2.5, fortune * 0.9); sparkle(g, 352, 40, 3, fortune * 0.9);
        if (many > 0.01) {
          g.save(); g.globalAlpha = many; g.fillStyle = INK;
          houses.forEach(([x, w]) => { for (let k = 0; k < Math.floor(w / 10); k++) g.fillRect(x + 3 + k * 10, 143, 5, 4); });
          g.restore();
        }
        // fuC: a ward of cots, in a window over the town: the sickness that would come back
        inFrame(g, 128, 42, 26, sick, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 102, 58, 154, 58);
          bed(o, 106, 42, 20, 1); bed(o, 130, 42, 20, 1); bed(o, 118, 28, 20, 1, true);
        });
        // fuB: outside the city: a bare hut on bare ground, where your children would grow up
        inFrame(g, 46, 50, 30, kids, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 16, 66, 76, 66);
          house(o, 32, 66, 26, 18, { faint: true, lw: 1.2 });
          o.strokeStyle = GRAPH; for (const x of [22, 68]) { line(o, x, 66, x - 2, 59); line(o, x, 66, x + 2, 60); }
        });
        // the carousel, still (or turning slowly while life is good)
        const cx = 200, cTop = 70, cBase = 150, spin = reduce ? 0 : t * 0.25 * stay * fortune;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(cx - 52, cTop + 18); g.lineTo(cx, cTop - 6); g.lineTo(cx + 52, cTop + 18); g.closePath(); g.fill(); g.stroke();
        g.lineWidth = 1.2; for (let x = cx - 52; x < cx + 52; x += 13) { g.beginPath(); g.arc(x + 6.5, cTop + 18, 6.5, 0, Math.PI); g.stroke(); }
        line(g, cx, cTop + 18, cx, cBase); g.beginPath(); g.ellipse(cx, cBase, 54, 6, 0, 0, Math.PI * 2); g.fill(); g.stroke();
        for (let k = 0; k < 6; k++) {
          const an = spin + k * Math.PI / 3, px = cx + Math.cos(an) * 44, depth = Math.sin(an);
          if (depth < -0.2) continue;
          const bob = Math.sin(an * 2) * 3;
          g.strokeStyle = depth > 0.3 ? INK : GRAPH; g.lineWidth = 1.2; line(g, px, cTop + 24, px, cBase - 2);
          g.fillStyle = PAPER; g.beginPath(); g.roundRect(px - 7, 118 + bob, 14, 9, 4); g.fill(); g.stroke();
        }
        // the boardwalk
        planks(g, 196);
        // people strolling, at ease
        drawPerson(g, 72, 196, { scale: 0.7, t, phase: 991, dir: 0.4 }); drawPerson(g, 96, 196, { scale: 0.5, t, phase: 992, dir: 0.3 });
        drawPerson(g, 268, 196, { scale: 0.72, t, phase: 993, dir: -0.3, mood: Math.max(free, sick) > 0.6 ? 'worried' : null });
        // steps down below the boardwalk to a closed basement door with one small window
        const sx0 = 318, sx1 = 384, st0 = 202, st1 = 248;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(sx0, st0, sx1 - sx0, st1 - st0); g.strokeRect(sx0, st0, sx1 - sx0, st1 - st0);
        g.strokeStyle = GRAPH; g.lineWidth = 1.2; for (let k = 0; k < 5; k++) { const y = st0 + 6 + k * 8, x = sx0 + 4 + k * 6; line(g, x, y, x + 18, y); line(g, x + 18, y, x + 18, y + 8); }
        const dx = 352;
        door(g, dx, 212, 26, st1, free * 0.85, { dark: true });
        if (free < 0.5) { g.fillStyle = INK; g.fillRect(dx + 8, 218, 10, 8); }
        g.strokeStyle = INK; g.lineWidth = 1.6; line(g, sx0, st0, sx0, 184); line(g, sx1, st0, sx1, 184); line(g, sx0, 184, sx1, 184);
        g.lineWidth = 1.1; for (let x = sx0 + 11; x < sx1; x += 11) line(g, x, 184, x, st0);
        if (free > 0.6) { // the light in the doorway, and someone small stepping out into it (a hundred: a few, one behind another)
          const k = (free - 0.6) * 2.5;
          g.save(); g.globalAlpha = k; g.fillStyle = PAPER; g.fillRect(dx + 1, 213, 24, st1 - 214); g.restore();
          if (many > 0.5) for (const [ox, ph] of [[8, 996], [18, 997]]) ghost(g, k * 0.6, dx + ox, st1 - 6, { scale: 0.32, t, phase: ph, dir: -0.3 });
          ghost(g, k, dx + 13, st1 - 2, { scale: 0.4, t, phase: 995, dir: -0.3 });
        }
        // the bench, and you
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.rect(130, 216, 66, 5); g.fill(); g.stroke(); line(g, 136, 221, 136, 236); line(g, 190, 221, 190, 236);
        // where you are: each choice pulls you somewhere, in turn
        let yx = 230, yy = 236;
        const to = (k, x, y) => { const u = ease(clamp01(k)); yx = lerp(yx, x, u); yy = lerp(yy, y, u); };
        to(stay, 164, 236); to(leave, -20, 236); to(door_, 300, 222); to(clamp01(free * 1.4), 300, 222);
        const sat = stay > 0.85 && leave < 0.05 && free < 0.05 && door_ < 0.05;
        const vx = yx - (sc.x.lastX == null ? yx : sc.x.lastX); sc.x.lastX = yx;
        const moving = Math.abs(vx) > 0.15 || (stay > 0.05 && stay < 0.85 && leave < 0.05);
        const ydir = sat ? 0.2 : moving ? (vx < 0 ? -0.8 : 0.7) : (door_ > 0.5 || free > 0.05) ? 0.7 : leave > 0.05 ? -0.8 : 0.3;
        drawPerson(g, sat ? 164 : yx, sat ? 216 : yy, { me: true, scale: 0.86, t, sit: sat, dir: ydir, moving, walk: t * 3, lArm: free > 0.5 || door_ > 0.5 ? [lerp(-3, 10, Math.max(free, door_)), -6] : [-3, 5] });
        // fuB: your own two children, walking with you (or beside the bench)
        if (kids > 0.01) {
          const kx = sat ? 196 : yx + 22;
          ghost(g, kids, kx, 236, { scale: 0.46, t, phase: 998, dir: ydir * 0.6, moving, walk: t * 3 });
          ghost(g, kids, kx + 14, 236, { scale: 0.38, t, phase: 999, dir: ydir * 0.6, moving, walk: t * 3 });
        }
      },
    },

    // ---------------------------------------------------------------- B15 The Lifeboat
    lifeboat: {
      base(v) {
        sc.x.v = v;
        sset({ lots: 0, short: 0, home: 0, weak: 0, me: 0, deal: 0, argue: 0, doc: 0, oars: 0, land: 0, row: 0 });
        if (v === 'fuA') sset({ lots: 1 });
        if (v === 'fuB') sset({ weak: 1 }); // all eyes on the one least likely to make it
        if (v === 'fuC') sset({ me: 1 }); // you've stood up to go
      },
      shift(v) {
        if (v === 'fuA') { sto({ short: 1 }, 0.8); sto({ home: 1 }, 0.5); } // the short stick is yours; at home, two small children wait
        if (v === 'fuB') sto({ doc: 1 }, 1.2); // the doctor on board speaks, and the ring moves to you
        if (v === 'fuC') sto({ oars: 1, land: 1 }, 1.2); // the oars, and land far off: the boat needs your strength to get there
      },
      acts: {
        'B15-A': { lots: 1 }, 'B15-B': { weak: 1 }, 'B15-C': { me: 1 },
        'B15-FUA2-A': { deal: 1 }, 'B15-FUA2-B': { argue: 1, short: 0 },
        'B15-FUB-A': { me: 1 }, 'B15-FUB-B': { lots: 1, argue: 1 },
        'B15-FUC-A': { oars: 0 }, 'B15-FUC-B': { me: 0, row: 1 },
      },
      async act(a) { await actor(this.acts, 0.8)(a); },
      draw(g, t) {
        const lots = V('lots'), short = V('short'), home = V('home'), weak = V('weak'), me = V('me'), deal = V('deal'), argue = V('argue'), doc = V('doc'), oars = V('oars'), land = V('land'), row = V('row');
        const bob = reduce ? 0 : Math.sin(t * 0.7) * 0.8;
        // the still sea and an empty horizon
        g.strokeStyle = GRAPH; g.lineWidth = 1.1; line(g, 0, 92, 400, 92);
        gull(g, 300, 48, 1);
        // fuC: land, far off on the horizon
        if (land > 0.01) { g.save(); g.globalAlpha = Math.min(1, land); g.fillStyle = PAPER; g.strokeStyle = GRAPH; g.lineWidth = 1.1; g.beginPath(); g.moveTo(26, 92); g.quadraticCurveTo(52, 78, 78, 84); g.quadraticCurveTo(100, 76, 132, 92); g.fill(); g.stroke(); g.restore(); }
        // fuA: home, far away: a cottage, and your two small children waiting by it
        if (home > 0.01) {
          const hx = 66, hy = 44, hr = 28;
          inFrame(g, hx, hy, hr, home, o => {
            o.strokeStyle = HAIR; o.lineWidth = 1; line(o, hx - hr, hy + 16, hx + hr, hy + 16);
            house(o, hx - 20, hy + 16, 24, 15, { lw: 1.2 });
            drawPerson(o, hx + 11, hy + 16, { scale: 0.32, t, phase: 1011, dir: 0.4 }); drawPerson(o, hx + 21, hy + 16, { scale: 0.26, t, phase: 1012, dir: 0.3 });
          });
        }
        // nine people in a boat for eight; you're one of them. The back row first.
        const cx = 200, wl = 176;
        const back = [[118, 1001], [160, 1002], [242, 1004], [284, 1005]];
        const front = [[100, 1006], [140, 1007], [180, 'me'], [222, 1008], [262, 1009], [300, 1003]];
        const look = x => clamp01(lots * 0.8) * (x < cx ? 0.4 : -0.4);
        const toMe = Math.max(me, short, deal, argue, doc, oars, row), toWeak = weak * (1 - doc);
        back.forEach(([x, ph]) => drawPerson(g, x, wl - 36 + bob, { scale: 0.6, t, phase: ph, sit: true, dir: toMe > 0.3 ? (x < 180 ? 0.6 : -0.6) : toWeak > 0.3 ? 0.7 : look(x) }));
        const stand = Math.max(me, deal);
        front.forEach(([x, ph]) => {
          if (ph === 'me') return;
          const isWeak = ph === 1003;
          const o = { scale: 0.66, t: isWeak && !reduce ? t * 0.5 : t, phase: ph, sit: true, look: isWeak ? Object.assign({}, npcLook(ph), { eyes: 'sleepy' }) : undefined,
            dir: isWeak ? lerp(-0.2, -0.5, weak) : toMe > 0.3 ? (x < 180 ? 0.6 : -0.6) : toWeak > 0.3 ? 0.7 : look(x) };
          if (isWeak) { g.save(); g.translate(x + 6, wl - 26 + bob); g.rotate(0.3); drawPerson(g, 0, 0, o); g.restore(); } // weak, leaning on the side
          else drawPerson(g, x, wl - 26 + bob, o);
        });
        // you
        const myY = lerp(wl - 26, wl - 38, stand) + bob, myX = lerp(180, 168, stand);
        drawPerson(g, myX, myY, { me: true, scale: 0.68, t, sit: stand < 0.5, dir: argue > 0.3 ? 0.4 : stand > 0.5 ? -0.3 : 0.2, rArm: short > 0.3 ? [8, -10] : [3, 5] });
        rowboat(g, cx, wl, 250, bob);
        // fuC: a pair of oars resting on the side by your seat; in your hands once you sit and row (the blades sit in the water)
        const oa = Math.max(oars, row);
        if (oa > 0.01) {
          g.save(); g.globalAlpha = Math.min(1, oa); g.strokeStyle = INK; g.lineCap = 'round';
          const hx = lerp(myX + 2, myX + 8, row), hy = lerp(wl - 24 + bob, myY - 14, row);
          g.lineWidth = 2.2; line(g, hx + 2, hy, hx + 58, wl + 14 + bob); line(g, hx - 2, hy, hx - 52, wl + 14 + bob);
          g.fillStyle = PAPER; g.lineWidth = 1.4; for (const ex of [hx + 60, hx - 54]) { g.beginPath(); g.ellipse(ex, wl + 15 + bob, 7, 2.6, 0, 0, Math.PI * 2); g.fill(); g.stroke(); }
          g.restore();
        }
        // the water sits high on the hull: one too many aboard
        const sea_ = wl - 9;
        g.save(); g.fillStyle = PAPER; g.globalAlpha = 0.88; g.fillRect(0, sea_ + bob * 0.3, 400, 250); g.restore();
        g.strokeStyle = GRAPH; g.lineWidth = 1.1; line(g, 0, sea_, 400, sea_);
        g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1; for (const x of [52, 72, 330, 352]) wave(g, x, sea_ - 1, 6); g.restore();
        g.strokeStyle = HAIR; g.lineWidth = 1; for (const [x, y] of [[40, 120], [90, 108], [330, 114], [370, 130], [60, 210], [140, 228], [260, 222], [350, 206]]) wave(g, x, y, 5);
        // A: lots, nine sticks, one short, held up in the middle
        if (lots > 0.01) {
          g.save(); g.globalAlpha = Math.min(1, lots) * (1 - short * 0.7) * (1 - deal * 0.7); g.strokeStyle = INK; g.lineWidth = 2; g.lineCap = 'round';
          for (let k = 0; k < 9; k++) { const x = 232 + k * 3.2, top = k === 6 ? 86 : 74; line(g, x, top, x, 98); }
          g.lineWidth = 1.4; g.fillStyle = PAPER; g.beginPath(); g.roundRect(228, 94, 33, 10, 4); g.fill(); g.stroke(); g.restore();
        }
        // fu: the short stick is in your hand
        if (short > 0.01) { g.save(); g.globalAlpha = short; g.strokeStyle = INK; g.lineWidth = 2.2; g.lineCap = 'round'; const sx = myX + 17, sy = myY - 30; line(g, sx, sy, sx, sy - 12); g.restore(); }
        // B: everyone looks to the one least likely to make it; a soft ring around them (fuB: the doctor says it's you, and the ring moves to you)
        const ringA = Math.max(weak, doc) * (1 - lots);
        if (ringA > 0.01) { const q = ease(clamp01(doc)); g.save(); g.globalAlpha = ringA * 0.8; g.strokeStyle = INK; g.lineWidth = 1.1; g.setLineDash([3, 3]); ellipse(g, lerp(304, myX + 2, q), lerp(wl - 46, myY - 26, q), lerp(22, 20, q), lerp(28, 26, q)); g.stroke(); g.restore(); }
        // fuB: the doctor, in the back row, speaking
        say(g, 160, wl - 104 + bob, 40, 162, wl - 86 + bob, clamp01(doc * 1.6) * (1 - Math.max(me, lots)));
        // fuA "I won't go", fuB "draw lots": you speak up (in fuA, the short stick goes back to the bundle)
        say(g, myX + 4, myY - 72, 44, myX + 2, myY - 54, argue);
      },
    },
  };
  return SCENES;
});
