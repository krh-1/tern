// Tern: code-drawn scenes for the City (world 3). Same contract and style as scenes.js.
// Ink on paper, calm motion, harm never shown: a car stops short, a fight is never drawn, prison is a door and a window.
// Contract: see game/plan.md and game/plan-city.md. Variants are step keys ('trunk', 'fu', 'fuA', 'fuB').
(window.TERN_SCENE_PACKS = window.TERN_SCENE_PACKS || []).push(function (h) {
  const { sc, V, sset, sto, hopY, sleep, lerp, clamp01, reduce, INK, PAPER, GRAPH, HAIR, ellipse, line, txt, bubble, heart, paper, steam, marks, hourglass, scribble, indoor, drawPerson, npcLook } = h;

  const SANS = size => `700 ${size}px "Quattrocento Sans", sans-serif`;
  const SERIF = size => `italic 500 ${size}px "Cormorant Garamond", Georgia, serif`;
  const SHADOW = 'rgba(20,20,20,0.10)';
  const ease = u => u * u * (3 - 2 * u);
  const seg = (k, a, b) => ease(clamp01((k - a) / (b - a))); // 0 → 1 while a local clock runs from a to b

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
  // a local clock for scenes that play a short sequence while you read (reset with each step)
  function tick(dt) { sc.x.k = reduce ? 99 : (sc.x.k || 0) + dt; }

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
  // a round window with something drawn inside it, faded as one piece
  function inFrame(g, x, y, r, a, fn, dash) {
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
  function query(g, x, y, tx, ty, a) { bubble(g, x, y, 22, 20, tx, ty, a); if (a > 0.01) txt(g, '?', x, y + 0.5, 13, a, SANS(13)); }
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
  function slots(g, x, y, n, filled, a, size) { // a row of small squares: time, a sentence, months
    if (a <= 0.01) return;
    const z = size || 6;
    g.save(); g.globalAlpha = Math.min(1, a); g.lineWidth = 1;
    for (let k = 0; k < n; k++) {
      g.strokeStyle = GRAPH; g.strokeRect(x + k * (z + 3), y, z, z);
      const f = clamp01(filled - k); if (f > 0.01) { g.globalAlpha = Math.min(1, a) * f; g.fillStyle = INK; g.fillRect(x + k * (z + 3), y, z, z); g.globalAlpha = Math.min(1, a); }
    }
    g.restore();
  }
  function bill(g, x, y, a, rot, s) {
    if (a <= 0.01) return;
    s = s || 1;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.rotate(rot || 0); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; g.fillRect(-11, -6, 22, 12); g.strokeRect(-11, -6, 22, 12);
    g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(-8.5, -3.5, 17, 7);
    g.fillStyle = PAPER; g.strokeStyle = INK; ellipse(g, 0, 0, 2.8, 2.8); g.fill(); g.stroke();
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
  function stars(g, pts, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = GRAPH; g.lineWidth = 1;
    for (const [x, y] of pts) { line(g, x - 2, y, x + 2, y); line(g, x, y - 2, x, y + 2); }
    g.restore();
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
  function handset(g, x, y, rot, a) { // a phone held upright
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.translate(x, y); g.rotate(rot || 0);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(-3.5, -6, 7, 12, 1.6); g.fill(); g.stroke();
    g.fillStyle = INK; g.fillRect(-2, -4, 4, 6.5); g.restore();
  }
  // someone lying down asleep: a plain puff stretched out sideways, head to the right
  function sleeper(g, x, floor, s, t) {
    const br = reduce ? 0 : Math.sin(t * 0.9) * 0.6;
    const C = [[-17, -7, 6.5], [-8, -8, 8], [3, -8.5, 8.5], [13, -10, 9.5 + br * 0.2], [5, -14, 6], [-6, -13, 5.5]];
    g.save(); g.translate(x, floor); g.scale(s, s); g.lineCap = 'round';
    g.fillStyle = INK; for (const [cx, cy, r] of C) { ellipse(g, cx, cy, r + 1.6, r + 1.6); g.fill(); }
    g.fillStyle = PAPER; for (const [cx, cy, r] of C) { ellipse(g, cx, cy, r, r); g.fill(); }
    g.strokeStyle = INK; g.lineWidth = 1.3;
    for (const ex of [11, 18]) { g.beginPath(); g.arc(ex, -12, 1.8, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke(); }
    g.restore();
  }

  // ---------- the city's furniture ----------
  function pavement(g, y) { // a kerb line and paving joints
    y = y || 214;
    g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, y, 400, y);
    g.strokeStyle = HAIR; g.lineWidth = 1; line(g, 0, y + 24, 400, y + 24);
    for (let x = 22; x < 430; x += 46) line(g, x, y, x - 8, y + 24);
  }
  function skyline(g, base, a) { // far towers, in hairline
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = HAIR; g.lineWidth = 1;
    const T = [[-6, 34, 58], [24, 26, 88], [46, 40, 50], [92, 22, 104], [110, 38, 66], [156, 30, 92], [184, 46, 54], [236, 26, 98], [258, 40, 62], [304, 30, 84], [330, 44, 56], [372, 34, 76]];
    for (const [x, w, hh] of T) {
      g.fillRect(x, base - hh, w, hh); g.strokeRect(x, base - hh, w, hh);
      for (let yy = base - hh + 8; yy < base - 6; yy += 10) for (let xx = x + 5; xx < x + w - 5; xx += 8) line(g, xx, yy, xx + 3, yy);
    }
    g.restore();
  }
  function building(g, x, top, w, ground, o) { // a flat-roofed block with a grid of windows
    o = o || {};
    g.save(); if (o.a != null) g.globalAlpha = Math.min(1, o.a);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
    g.beginPath(); g.rect(x, top, w, ground - top); g.fill(); g.stroke();
    g.beginPath(); g.rect(x - 3, top - 4, w + 6, 4); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1;
    const cols = Math.max(1, Math.floor((w - 8) / 18)), gap = (w - cols * 9) / (cols + 1), bottom = ground - (o.door ? 46 : 14);
    for (let yy = top + 10; yy + 12 < bottom; yy += 22) for (let c = 0; c < cols; c++) {
      const wx = x + gap + c * (9 + gap); g.strokeRect(wx, yy, 9, 12); line(g, wx, yy + 6, wx + 9, yy + 6);
    }
    if (o.door) { g.strokeStyle = INK; g.lineWidth = 1.4; g.strokeRect(x + w / 2 - 10, ground - 34, 20, 34); line(g, x + w / 2, ground - 34, x + w / 2, ground); }
    g.restore();
  }
  function door(g, x, top, w, ground, open, o) { // a door that swings open towards you
    o = o || {};
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.strokeRect(x, top, w, ground - top);
    const pw = w * (1 - (open || 0) * 0.75);
    g.beginPath(); g.rect(x, top, pw, ground - top); g.fill(); g.stroke();
    if (o.bars) { g.lineWidth = 1.2; g.strokeRect(x + pw * 0.2, top + 10, pw * 0.6, 18); for (let k = 1; k < 4; k++) line(g, x + pw * 0.2 + pw * 0.15 * k, top + 10, x + pw * 0.2 + pw * 0.15 * k, top + 28); }
    else if (o.pane) { g.lineWidth = 1.1; ellipse(g, x + pw / 2, top + 20, 6, 6); g.stroke(); }
    g.lineWidth = 1.3; ellipse(g, x + pw - 5, (top + ground) / 2 + 4, 1.8, 1.8); g.stroke();
  }
  function barred(g, x, y, w, hh, a) { // a small window with bars
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(x, y, w, hh); g.strokeRect(x, y, w, hh);
    g.lineWidth = 1.6; for (let k = 1; k < 4; k++) line(g, x + w * k / 4, y, x + w * k / 4, y + hh);
    g.restore();
  }
  // a small side-on car. o.dir: 1 faces right. o.who: a passenger seen through the window. o.dash: just an outline
  function car(g, x, ground, o) {
    o = o || {};
    const d = o.dir || 1, s = o.s || 1;
    g.save(); g.translate(x, ground); g.rotate(o.rot || 0); g.scale(d * s, s); g.lineJoin = 'round';
    if (o.a != null) g.globalAlpha = Math.min(1, o.a);
    g.fillStyle = SHADOW; ellipse(g, 0, 0, 42, 4); g.fill();
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.7; if (o.dash) g.setLineDash([3, 3]);
    g.beginPath(); g.moveTo(-24, -24); g.lineTo(-15, -38); g.lineTo(13, -38); g.lineTo(25, -24); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(-40, -25, 80, 18, 7); g.fill(); g.stroke();
    g.lineWidth = 1.2;
    const win = [[-20, -25, -14, -35, -2, -35, -2, -25], [2, -25, 2, -35, 12, -35, 20, -25]];
    for (const p of win) { g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(p[2], p[3]); g.lineTo(p[4], p[5]); g.lineTo(p[6], p[7]); g.closePath(); g.stroke(); }
    if (o.who) {
      g.save(); g.beginPath(); const p = win[1]; g.moveTo(p[0], p[1]); g.lineTo(p[2], p[3]); g.lineTo(p[4], p[5]); g.lineTo(p[6], p[7]); g.closePath(); g.clip();
      drawPerson(g, 10, -15, { look: o.who, scale: 0.42, t: o.t || 0, dir: 0.5 }); g.restore();
    }
    if (o.kids > 0.01) { // two children in the back seat
      g.save(); g.beginPath(); const p = win[0]; g.moveTo(p[0], p[1]); g.lineTo(p[2], p[3]); g.lineTo(p[4], p[5]); g.lineTo(p[6], p[7]); g.closePath(); g.clip();
      faded(g, o.kids, c => { drawPerson(c, -13, -19, { scale: 0.3, t: o.t || 0, phase: 421, dir: 0.5 }); drawPerson(c, -5, -19, { scale: 0.27, t: o.t || 0, phase: 422, dir: 0.5 }); });
      g.restore();
    }
    if (o.belt) { g.save(); g.globalAlpha *= Math.min(1, o.belt); g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 4, -34, lerp(4, 14, o.belt), lerp(-34, -26, o.belt)); g.restore(); }
    g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, -2, -22, -2, -10);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(34, -21, 6, 5, 1.5); g.fill(); g.stroke();
    g.setLineDash([]);
    for (const wx of [-23, 23]) { g.fillStyle = INK; ellipse(g, wx, -6, 7, 7); g.fill(); g.fillStyle = PAPER; ellipse(g, wx, -6, 2.6, 2.6); g.fill(); }
    if (o.lights) { g.strokeStyle = GRAPH; g.lineWidth = 1; g.globalAlpha *= Math.min(1, o.lights); for (const an of [-0.25, 0, 0.25]) line(g, 44 + Math.cos(an) * 2, -18 + Math.sin(an) * 2, 44 + Math.cos(an) * 12, -18 + Math.sin(an) * 12); }
    g.restore();
  }
  // a card with the car's rule on it: a fork of two arrows, the swerve curving up, the straight one ahead
  function ruleCard(g, x, y, sw, st, a, flipX) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.scale(flipX == null ? 1 : flipX, 1);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.roundRect(-17, -13, 34, 26, 3); g.fill(); g.stroke();
    const arrow = (bend, al, dash) => {
      if (al <= 0.01) return;
      g.save(); g.globalAlpha *= al; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineCap = 'round'; if (dash) g.setLineDash([2, 2.5]);
      g.beginPath(); g.moveTo(-11, 6);
      const ex = bend ? 6 : 11, ey = bend ? -8 : 6;
      if (bend) g.quadraticCurveTo(2, 6, ex, ey); else g.lineTo(ex, ey);
      g.stroke(); g.setLineDash([]);
      const an = bend ? -1.2 : 0;
      line(g, ex, ey, ex - Math.cos(an - 0.6) * 4.5, ey - Math.sin(an - 0.6) * 4.5); line(g, ex, ey, ex - Math.cos(an + 0.6) * 4.5, ey - Math.sin(an + 0.6) * 4.5);
      g.restore();
    };
    const open = 1 - Math.max(sw, st);
    arrow(true, sw + open * 0.45, open > 0.5); arrow(false, st + open * 0.45, open > 0.5);
    g.restore();
  }
  function glass(g, x, y) { // a small drinking glass
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.1;
    g.beginPath(); g.moveTo(x - 3.5, y - 9); g.lineTo(x - 2.6, y); g.lineTo(x + 2.6, y); g.lineTo(x + 3.5, y - 9); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; line(g, x - 3, y - 5, x + 3, y - 5);
  }
  function folder(g, x, y, open, a) { // a case file: closed, or open with its pages showing
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x - 13, y - 9); g.lineTo(x - 5, y - 9); g.lineTo(x - 3, y - 12); g.lineTo(x + 4, y - 12); g.lineTo(x + 6, y - 9); g.lineTo(x + 13, y - 9); g.lineTo(x + 13, y + 9); g.lineTo(x - 13, y + 9); g.closePath(); g.fill(); g.stroke();
    if (open > 0.01) { paper(g, x + 2, y - 2 - open * 8, 18, 16, 0.08, open); paper(g, x - 3, y - open * 6, 18, 16, -0.1, open); }
    else { g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, x - 9, y - 3, x + 9, y - 3); line(g, x - 9, y + 2, x + 5, y + 2); }
    g.restore();
  }
  function suitcase(g, x, y, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4;
    g.beginPath(); g.roundRect(x - 10, y, 20, 15, 2.5); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(x - 4, y - 4, 8, 5, 2); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, x - 10, y + 6, x + 10, y + 6);
    g.restore();
  }
  function placard(g, x, y, a) { // a blank sign on a stick
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.3; line(g, x, y, x, y - 14);
    g.fillStyle = PAPER; g.fillRect(x - 10, y - 26, 20, 12); g.strokeRect(x - 10, y - 26, 20, 12); g.restore();
  }
  function badge(g, x, y, a) { // a work badge on a lanyard
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1; g.beginPath(); g.moveTo(x - 6, y - 14); g.lineTo(x, y - 6); g.lineTo(x + 6, y - 14); g.stroke();
    g.fillStyle = PAPER; g.lineWidth = 1.3; g.beginPath(); g.roundRect(x - 7, y - 6, 14, 18, 2); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; ellipse(g, x, y + 1, 3, 3); g.stroke(); line(g, x - 4, y + 7, x + 4, y + 7);
    g.restore();
  }
  function lunchbox(g, x, y, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4;
    g.beginPath(); g.roundRect(x - 12, y - 12, 24, 12, 3); g.fill(); g.stroke();
    g.beginPath(); g.arc(x, y - 12, 5, Math.PI, 0); g.stroke(); g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, x - 12, y - 7, x + 12, y - 7);
    g.restore();
  }
  function envelope(g, x, y, a, s) {
    if (a <= 0.01) return;
    s = s || 1;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.fillRect(-13, -8, 26, 16); g.strokeRect(-13, -8, 26, 16);
    g.beginPath(); g.moveTo(-13, -8); g.lineTo(0, 1); g.lineTo(13, -8); g.stroke(); g.restore();
  }
  function seal(g, x, y, r, a) { // a round ink stamp
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.4; ellipse(g, x, y, r, r); g.stroke();
    g.fillStyle = INK; ellipse(g, x, y, r * 0.45, r * 0.45); g.fill(); g.restore();
  }
  function form(g, x, y, stamped, a, rot) { // a filled-in form, optionally stamped
    if (a <= 0.01) return;
    paper(g, x, y, 16, 20, rot || 0, a);
    seal(g, x + 3, y + 4, 3.6, a * stamped);
  }
  function wobbleArrow(g, x1, y1, x2, y2, a, dash) { // a dashed arrow on a map
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.2; g.lineCap = 'round';
    if (dash !== false) g.setLineDash([3, 3]);
    line(g, x1, y1, x2, y2); g.setLineDash([]);
    const an = Math.atan2(y2 - y1, x2 - x1);
    line(g, x2, y2, x2 - Math.cos(an - 0.5) * 5, y2 - Math.sin(an - 0.5) * 5); line(g, x2, y2, x2 - Math.cos(an + 0.5) * 5, y2 - Math.sin(an + 0.5) * 5);
    g.restore();
  }
  function lamp(g, x, ground, top) { // a streetlamp, lit
    g.strokeStyle = INK; g.lineWidth = 2; g.lineCap = 'round'; line(g, x, ground, x, top);
    g.lineWidth = 1.6; g.beginPath(); g.moveTo(x, top); g.quadraticCurveTo(x, top - 10, x - 12, top - 8); g.stroke();
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4;
    g.beginPath(); g.moveTo(x - 19, top + 2); g.lineTo(x - 5, top + 2); g.lineTo(x - 9, top - 7); g.lineTo(x - 15, top - 7); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1;
    for (const an of [0.35, 0.6, 0.85]) { const a2 = an * Math.PI; line(g, x - 12 + Math.cos(a2) * 6, top + 4 + Math.sin(a2) * 6, x - 12 + Math.cos(a2) * 11, top + 4 + Math.sin(a2) * 11); }
  }

  const SCENES = {
    // ---------------------------------------------------------------- Q11 The Autonomous Car
    selfdrive: {
      base(v) {
        sc.x.v = v;
        sset({ roll: 0, sw: 0, st: 0, go: 0, kids: 0, belt: 0, walk: 0, flip: 0, place: 0 });
        if (v === 'fuB') sset({ st: 1 });
        if (v === 'trunk') sto({ roll: 1 }, 0.35); // the car eases up the road while you read, then holds
      },
      shift(v) {
        if (v === 'fuA') sto({ kids: 1 }, 1.0); // your children walk to the car and get in
        if (v === 'fuB') { sto({ belt: 1 }, 0.9); sto({ walk: 1 }, 0.22); }
      },
      acts: {
        'Q11-A': { sw: 1 }, 'Q11-B': { st: 1 },
        'Q11-FUA2-A': { place: 1 }, 'Q11-FUA2-B': { flip: 1 },
        'Q11-FUB-A': { flip: 1 }, 'Q11-FUB-B': { place: 1 },
      },
      async act(a) {
        await actor(this.acts, 1.2, async (id, m) => {
          if (id === 'Q11-A' || id === 'Q11-B') { sto(m, 2.2); await sleep(600); sto({ go: 1 }, 0.9); }
          else if (m.flip) { sto({ flip: 1 }, 1.4); await sleep(900); sto({ place: 1 }, 1.2); }
          else sto(m, 1.1);
        })(a);
      },
      draw(g, t) {
        const v = sc.x.v, sw = V('sw'), st = V('st');
        if (v === 'fuA') {
          // your own children get into one of these cars. The swerve rule you set goes with it, or you change it.
          const kids = V('kids'), flip = V('flip'), place = V('place');
          skyline(g, 150, 0.9);
          g.strokeStyle = HAIR; g.lineWidth = 1; line(g, 0, 150, 400, 150);
          g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 196, 400, 196);
          g.strokeStyle = GRAPH; g.lineWidth = 1; g.save(); g.setLineDash([10, 10]); line(g, 0, 226, 400, 226); g.restore();
          car(g, 236, 242, { s: 1.15, t, kids: clamp01((kids - 0.7) / 0.3) });
          const k = ease(clamp01(kids)), gone = clamp01((kids - 0.7) / 0.3);
          [[100, 421, 0.5], [122, 422, 0.45]].forEach(([x0, ph, sc2], i) => ghost(g, 1 - gone, lerp(x0, 212 + i * 12, k), lerp(186, 222, k), { scale: sc2, t, phase: ph, dir: kids > 0.02 ? 0.6 : -0.4, moving: kids > 0.05 && kids < 0.8, walk: t * 3 + i }));
          const yx = 48;
          drawPerson(g, yx, 186, { me: true, scale: 0.85, t, dir: 0.6, rArm: [lerp(6, 12, place), lerp(-14, -4, place)] });
          thread(g, yx + 10, 160, lerp(100, 190, k) - 6, lerp(166, 206, k), 8, 0.7 * (1 - gone));
          // the rule card: kept as it is, or turned over to protect the passenger, then laid on the car
          const fl = Math.cos(clamp01(flip) * Math.PI), u = ease(clamp01(place)), cx = lerp(yx + 26, 244, u), cy = lerp(120, 200, u) - Math.sin(clamp01(place) * Math.PI) * 30;
          ruleCard(g, cx, cy, flip > 0.5 ? 0 : 1, flip > 0.5 ? 1 : 0, 1, Math.abs(fl) < 0.08 ? 0.08 : Math.abs(fl));
          return;
        }
        if (v === 'fuB') {
          // the passenger buckles in; five people walk along the pavement, not looking
          const belt = V('belt'), walk = V('walk'), flip = V('flip'), place = V('place');
          skyline(g, 150, 0.9);
          g.strokeStyle = HAIR; g.lineWidth = 1; line(g, 0, 150, 400, 150);
          g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 196, 400, 196);
          g.strokeStyle = GRAPH; g.lineWidth = 1; g.save(); g.setLineDash([10, 10]); line(g, 0, 226, 400, 226); g.restore();
          [[224, 403], [258, 404], [290, 405], [326, 406], [360, 407]].forEach(([x, ph], i) => drawPerson(g, x + walk * 16 + (reduce ? 0 : Math.sin(t * 0.5 + i) * 0.8), 186, { scale: 0.62, t, phase: ph, dir: 0.75, moving: walk > 0.05 && walk < 0.95, walk: t * 3 + i }));
          const who = npcLook(400);
          car(g, 150, 242, { s: 1.15, who, t, belt });
          // you, with the rule you set: protect the passenger
          const yx = 48;
          drawPerson(g, yx, 186, { me: true, scale: 0.85, t, dir: 0.6, rArm: [lerp(6, 12, place), lerp(-14, -4, place)] });
          const fl = Math.cos(clamp01(flip) * Math.PI), cx = lerp(yx + 26, 158, ease(clamp01(place))), cy = lerp(120, 200, ease(clamp01(place))) - Math.sin(clamp01(place) * Math.PI) * 30;
          ruleCard(g, cx, cy, flip > 0.5 ? 1 : 0, flip > 0.5 ? 0 : 1, 1, Math.abs(fl) < 0.08 ? 0.08 : Math.abs(fl));
          return;
        }
        // trunk: a crosswalk with five people on it, a wall across the road, and a car whose brakes have gone
        const roll = V('roll'), go = V('go');
        skyline(g, 140, 0.9);
        g.strokeStyle = HAIR; g.lineWidth = 1; line(g, 0, 146, 400, 146);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 156, 400, 156); line(g, 0, 224, 400, 224);
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = 22; x < 430; x += 46) line(g, x, 224, x - 8, 250);
        g.save(); g.strokeStyle = GRAPH; g.setLineDash([10, 10]); line(g, 0, 190, 400, 190); g.restore();
        // the wall on the far side
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(184, 112, 70, 40); g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1;
        for (let r = 0; r < 4; r++) { const yy = 112 + r * 10; line(g, 184, yy, 254, yy); for (let x = 184 + (r % 2) * 9; x < 254; x += 18) line(g, x, yy, x, yy + 10); }
        // the crosswalk and the five on it
        g.fillStyle = PAPER; g.strokeStyle = HAIR; g.lineWidth = 1;
        for (let y = 160; y < 222; y += 8) { g.fillRect(292, y, 64, 4); g.strokeRect(292, y, 64, 4); }
        [[300, 172, 411], [338, 180, 412], [310, 196, 413], [344, 206, 414], [318, 220, 415]].forEach(([x, y, ph], i) => drawPerson(g, x, y, { scale: 0.52, t, phase: ph, dir: i % 2 ? -0.5 : 0.5 }));
        // the two ways the car could go: dashed until a rule is set
        const bx = lerp(70, 100, roll), front = bx + 44;
        const sA = clamp01(0.5 + sw * 0.5 - st * 0.45), tA = clamp01(0.5 + st * 0.5 - sw * 0.45);
        g.save(); g.lineCap = 'round'; g.strokeStyle = INK;
        g.globalAlpha = sA; g.lineWidth = sw > 0.5 ? 1.6 : 1.1; g.setLineDash(sw > 0.5 ? [6, 4] : [3, 4]);
        g.beginPath(); g.moveTo(front, 196); g.quadraticCurveTo(200, 196, 218, 160); g.stroke();
        g.globalAlpha = tA; g.lineWidth = st > 0.5 ? 1.6 : 1.1; g.setLineDash(st > 0.5 ? [6, 4] : [3, 4]);
        line(g, front, 200, 284, 200); g.restore();
        // the car: it eases a little way along the chosen path, then the picture fades
        const cx = bx + go * (st * 42 + sw * 36), cy = 212 - go * sw * 14, rot = -go * sw * 0.22;
        g.save(); g.globalAlpha = 1 - roll * 0.4 - go; g.strokeStyle = GRAPH; g.lineWidth = 1; for (const [dy, len] of [[-22, 14], [-14, 20], [-6, 12]]) line(g, cx - 48 - len, cy + dy, cx - 48, cy + dy); g.restore();
        car(g, cx, cy, { who: npcLook(410), t, rot });
        // you set the rule for every car
        const yx = 40;
        drawPerson(g, yx, 152, { me: true, scale: 0.82, t, dir: 0.6, rArm: [8, -14] });
        ruleCard(g, yx + 30, 94, sw, st, 1);
        thread(g, yx + 46, 98, cx, cy - 40, 12, 0.5, true);
      },
    },

    // ---------------------------------------------------------------- B12 Two Drivers
    twodrivers: {
      base(v) {
        sc.x.v = v;
        sset({ eq: 0, worse: 0, sent: 0, pt: 0, pb: 0 });
        if (v === 'fu') sset({ eq: 1 });
      },
      shift(v) { if (v === 'fu') sto({ sent: 1 }, 0.9); },
      acts: {
        'B12-A': { eq: 1 }, 'B12-B': { worse: 1 },
        'B12-FU-A': { pt: 3, pb: 3 }, 'B12-FU-B': { pt: 3, pb: 1 },
      },
      async act(a) { await actor(this.acts, 1.0)(a); },
      draw(g, t) {
        const eq = V('eq'), worse = V('worse'), sent = V('sent'), pt = V('pt'), pb = V('pb');
        const panel = (y0, y1, fn) => {
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.roundRect(12, y0, 236, y1 - y0, 10); g.fill(); g.stroke();
          g.save(); g.beginPath(); g.roundRect(13, y0 + 1, 234, y1 - y0 - 2, 9); g.clip(); fn(); g.restore();
        };
        const dA = npcLook(421), dB = npcLook(426);
        // the same night, the same three drinks, the same careful drive
        panel(12, 118, () => {
          moon(g, 120, 32, 7, 1);
          g.strokeStyle = INK; g.lineWidth = 1.3; line(g, 12, 100, 248, 100);
          for (let k = 0; k < 3; k++) glass(g, 30 + k * 11, 36);
          car(g, 84, 100, { s: 0.75 });
          // the car stopped, a ball still in the road, the driver out and still
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; ellipse(g, 176, 95, 5, 5); g.fill(); g.stroke();
          g.strokeStyle = GRAPH; g.beginPath(); g.arc(176, 95, 5, -0.6, 0.9); g.stroke();
          drawPerson(g, 142, 100, { look: dA, scale: 0.66, t, dir: 0.6, mood: 'sad' });
          slots(g, 186, 24, 4, pt, sent, 7);
        });
        panel(126, 232, () => {
          moon(g, 120, 146, 7, 1);
          g.strokeStyle = INK; g.lineWidth = 1.3; line(g, 12, 214, 248, 214);
          for (let k = 0; k < 3; k++) glass(g, 30 + k * 11, 150);
          // home, a lit window, the driver walking up to the door
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.rect(174, 178, 62, 36); g.fill(); g.stroke();
          g.beginPath(); g.moveTo(168, 178); g.lineTo(205, 160); g.lineTo(242, 178); g.closePath(); g.fill(); g.stroke();
          g.lineWidth = 1.2; g.strokeRect(218, 188, 12, 10); g.strokeRect(184, 190, 14, 24);
          g.strokeStyle = GRAPH; g.lineWidth = 1; for (const an of [-0.4, 0, 0.4]) line(g, 224 + Math.cos(an) * 8, 193 + Math.sin(an) * 8, 224 + Math.cos(an) * 12, 193 + Math.sin(an) * 12);
          car(g, 84, 214, { s: 0.75 });
          drawPerson(g, 150, 214, { look: dB, scale: 0.66, t, dir: 0.7 });
          slots(g, 186, 138, 4, pb, sent, 7);
        });
        // the scales: are they the same?
        const bx = 314, top = 98, L = 40;
        const settle = Math.max(eq, worse), wob = reduce ? 0 : Math.sin(t * 0.8) * 0.05 * (1 - settle);
        const th = wob - 0.2 * worse;
        g.strokeStyle = INK; g.lineWidth = 2; g.lineCap = 'round'; line(g, bx, 214, bx, top);
        g.fillStyle = PAPER; g.lineWidth = 1.5; g.beginPath(); g.moveTo(bx - 16, 214); g.lineTo(bx + 16, 214); g.lineTo(bx + 8, 206); g.lineTo(bx - 8, 206); g.closePath(); g.fill(); g.stroke();
        ellipse(g, bx, top, 3, 3); g.fill(); g.stroke();
        const ends = [-1, 1].map(k => [bx + k * L * Math.cos(th), top + k * L * Math.sin(th)]);
        g.lineWidth = 1.8; line(g, ends[0][0], ends[0][1], ends[1][0], ends[1][1]);
        ends.forEach(([ex, ey], i) => {
          g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, ex, ey, ex - 12, ey + 32); line(g, ex, ey, ex + 12, ey + 32);
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.moveTo(ex - 15, ey + 32); g.quadraticCurveTo(ex, ey + 42, ex + 15, ey + 32); g.closePath(); g.fill(); g.stroke();
          car(g, ex, ey + 31, { s: 0.22 });
          thread(g, 248, i ? 180 : 64, ex + (i ? 0 : -10), ey + 30, 4, 0.4, true);
        });
        drawPerson(g, 368, 214, { me: true, scale: 0.9, t, dir: -0.6, lArm: [lerp(-3, -10, settle), lerp(5, -4, settle)] });
      },
    },

    // ---------------------------------------------------------------- B03 The Reference Call
    reference: {
      base(v) {
        sc.x.v = v;
        sset({ send: 0, rough: 1, care: 0, back: 0, hang: 0, decide: 0, held: 0 });
        if (v === 'fuA') sset({ send: 1, rough: 1 });
        if (v === 'fuB') sset({ send: 1, rough: 0 });
      },
      shift(v) {
        if (v === 'fuA') sto({ decide: 1 }, 0.9);
        if (v === 'fuB') sto({ care: 1 }, 0.9);
      },
      acts: {
        'B03-A': { send: 1 }, 'B03-B': { rough: 0, send: 1 },
        'B03-FUA-A': { held: 1, decide: 0.5 }, 'B03-FUA-B': { rough: 0, held: 1, decide: 0.5 },
        'B03-FUB2-A': { back: 1 }, 'B03-FUB2-B': { hang: 1 },
      },
      async act(a) {
        await actor(this.acts, 1.2, async (id, m) => {
          if (id === 'B03-B') { sto({ rough: 0 }, 1.6); await sleep(900); sto({ send: 1 }, 1.0); }
          else sto(m, 1.1);
        })(a);
      },
      draw(g, t) {
        const send = V('send'), rough = V('rough'), care = V('care'), back = V('back'), hang = V('hang'), decide = V('decide'), held = V('held');
        pavement(g);
        // the phone booth, and you in it
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.7; g.lineJoin = 'round';
        g.beginPath(); g.roundRect(26, 60, 82, 10, 3); g.fill(); g.stroke();
        g.strokeRect(30, 70, 74, 144);
        const yx = 67;
        drawPerson(g, yx, 210, { me: true, scale: 0.85, t, dir: 0.5, rArm: [lerp(-2, 4, hang), lerp(-11, 5, hang)] });
        handset(g, yx + 15, lerp(166, 186, hang), 0.2, 1);
        g.strokeStyle = INK; g.lineWidth = 1.2; line(g, 30, 104, 104, 104);
        g.strokeStyle = HAIR; g.lineWidth = 1; for (const x of [36, 98]) line(g, x, 108, x, 210);
        // the former employee and their two kids, eight months out of work
        const ex = 196, ey = 66, er = 36;
        inFrame(g, ex, ey, er, 1 - care, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, ex - er, ey + 24, ex + er, ey + 24);
          drawPerson(o, ex - 10, ey + 26, { scale: 0.55, t, phase: 431, dir: -0.4 });
          drawPerson(o, ex + 10, ey + 26, { scale: 0.32, t, phase: 432, dir: -0.3 }); drawPerson(o, ex + 22, ey + 26, { scale: 0.28, t, phase: 433, dir: -0.5 });
        });
        slots(g, ex - 36, ey + er + 8, 8, 0, 1 - care, 6);
        // fuB: the job itself. A daycare whose door stays shut when a worker doesn't show; a parent and child turned away
        inFrame(g, ex, ey, er, care, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, ex - er, ey + 22, ex + er, ey + 22);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3; o.lineJoin = 'round';
          o.fillRect(ex - 30, ey - 6, 30, 28); o.strokeRect(ex - 30, ey - 6, 30, 28);
          o.beginPath(); o.moveTo(ex - 34, ey - 6); o.lineTo(ex - 15, ey - 20); o.lineTo(ex + 4, ey - 6); o.closePath(); o.fill(); o.stroke();
          o.strokeRect(ex - 20, ey + 6, 10, 16); o.strokeRect(ex - 27, ey - 1, 6, 5);
          o.strokeStyle = GRAPH; o.lineWidth = 1; ellipse(o, ex - 15, ey - 11, 2.4, 2.4); o.stroke();
          drawPerson(o, ex + 12, ey + 22, { scale: 0.42, t, phase: 436, dir: -0.4, mood: 'worried', lArm: [-6, 2] });
          drawPerson(o, ex + 2, ey + 22, { scale: 0.26, t, phase: 437, dir: -0.3 });
        });
        // the hiring manager on the other end
        const mx = 324, my = 92, mr = 44;
        inFrame(g, mx, my, mr, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, mx - mr, my + 34, mx + mr, my + 34);
          drawPerson(o, mx + 6, my + 28, { scale: 0.7, t, phase: 435, dir: -0.6, lArm: [-6, -14] });
          handset(o, mx - 12, my - 4, -0.2, 1);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3; o.fillRect(mx - mr, my + 24, 2 * mr, 4); o.strokeRect(mx - mr, my + 24, 2 * mr, 4);
        });
        thread(g, yx + 18, 156, mx - mr + 2, my + 6, 26, 0.7);
        // what you tell them: a sheet of plain lines, two of them rough
        const u = ease(clamp01(send)), sx = lerp(168, mx - 4, u), sy = lerp(170, my + 6, u) - Math.sin(u * Math.PI) * 26, s = lerp(1, 0.75, u);
        g.save(); g.translate(sx, sy); g.scale(s, s);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(-16, -20, 32, 40); g.strokeRect(-16, -20, 32, 40);
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (const yy of [-12, -2, 8]) line(g, -11, yy, 11, yy);
        const ra = clamp01(rough + back);
        if (ra > 0.01) {
          g.globalAlpha = ra; g.strokeStyle = INK; g.lineWidth = 1.5;
          for (const yy of [3, 13]) { g.beginPath(); for (let k = 0; k <= 11; k++) { const x = -11 + k * 2, y = yy + (k % 2 ? -1.6 : 1.6); k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
        }
        g.restore();
        talk(g, yx + 20, 150, mx - mr, my - 4, Math.max(send * (sc.x.v === 'trunk' ? 1 : 0), back, held) * (1 - hang), t, 24);
        // fuA: it comes down to you. A thread from the hiring manager's choice to the family
        thread(g, mx - mr + 4, my + 18, ex + er - 2, ey + 14, -18, decide * 0.8, true);
        if (decide > 0.01) { bubble(g, mx + 30, my - mr - 6, 22, 20, mx + 20, my - mr + 6, decide * (1 - held)); txt(g, '?', mx + 30, my - mr - 5.5, 13, decide * (1 - held), SANS(13)); }
      },
    },

    // ---------------------------------------------------------------- B04 The Company Line
    companyline: {
      base(v) {
        sc.x.v = v;
        sset({ ask: 1, line_: 0, truth: 0, bake: 0, alt: 0, saved: 0, warn: 0 });
        if (v === 'fuA' || v === 'fuB') sset({ ask: 0 });
      },
      shift(v) {
        if (v === 'fuA') { sto({ bake: 1 }, 0.9); sto({ alt: 1 }, 0.6); sto({ ask: 1 }, 0.8); } // the bakery, and another supplier it could still order from
        if (v === 'fuB') { sto({ warn: 1 }, 0.9); sto({ ask: 1 }, 0.8); } // your manager's warning: your job
      },
      acts: {
        'B04-A': { line_: 1, ask: 0 }, 'B04-B': { truth: 1, ask: 0 },
        'B04-FUA-A': { line_: 1, ask: 0 }, 'B04-FUA-B': { truth: 1, ask: 0, saved: 1 },
        'B04-FUB-A': { truth: 1, ask: 0 }, 'B04-FUB-B': { line_: 1, ask: 0 },
      },
      async act(a) { await actor(this.acts, 1.2)(a); },
      draw(g, t) {
        const ask = V('ask'), ln = V('line_'), truth = V('truth'), bake = V('bake'), alt = V('alt'), saved = V('saved'), warn = V('warn');
        indoor(g);
        // the roller door, and the big orders stacked in front of it, first in line
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(232, 54, 150, 148); g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let y = 62; y < 202; y += 7) line(g, 233, y, 381, y);
        const crate = (x, y, w, hh) => {
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(x, y, w, hh); g.strokeRect(x, y, w, hh);
          g.lineWidth = 1; line(g, x, y, x + w, y + hh); line(g, x + w, y, x, y + hh); g.strokeRect(x + 3, y + 3, w - 6, hh - 6);
          star(g, x + w / 2, y + hh / 2, 5, 1, true);
        };
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(286, 200, 96, 8); g.strokeRect(286, 200, 96, 8);
        crate(290, 156, 44, 44); crate(336, 156, 44, 44); crate(312, 112, 44, 44);
        // the small order, still waiting on the floor behind the counter
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(28, 186, 22, 20); g.strokeRect(28, 186, 22, 20);
        g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, 28, 192, 50, 192);
        hourglass(g, 39, 168, 0.8, t);
        // you behind the counter, your manager right beside you
        const mgr = npcLook(445);
        drawPerson(g, 82, 210, { look: mgr, scale: 0.92, t, dir: lerp(0.5, 0.9, truth), lArm: [-6, 2], rArm: [6, 2] });
        const yx = 124;
        drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: 0.6, lArm: [lerp(-3, -14, ln), lerp(5, -10, ln)], rArm: [lerp(3, 14, truth), lerp(5, -12, truth)] });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(146, 160, 78, 7); g.fill(); g.stroke();
        g.beginPath(); g.rect(152, 167, 66, 43); g.fill(); g.stroke();
        g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = 164; x < 218; x += 12) line(g, x, 169, x, 208);
        // the customer
        const cx = 256;
        drawPerson(g, cx, 210, { scale: 0.9, t, phase: 524, dir: -0.7, mood: bake > 0.5 ? 'worried' : null });
        query(g, cx - 4, 128, cx - 8, 150, ask);
        // A: "it's the supplier", with a gesture off somewhere else
        say(g, yx - 6, 120, 40, yx, 144, ln);
        if (ln > 0.01) { g.save(); g.globalAlpha = ln; g.strokeStyle = GRAPH; g.lineWidth = 1.2; g.setLineDash([3, 4]); g.beginPath(); g.moveTo(yx - 22, 170); g.quadraticCurveTo(40, 120, 4, 132); g.stroke(); g.restore(); }
        // B: you point at the big orders
        if (truth > 0.01) { g.save(); g.globalAlpha = truth; g.strokeStyle = GRAPH; g.lineWidth = 1.2; g.setLineDash([3, 4]); g.beginPath(); g.moveTo(yx + 26, 168); g.quadraticCurveTo(220, 90, 304, 116); g.stroke(); g.restore(); }
        talk(g, yx + 18, 152, cx - 14, 150, Math.max(ln, truth), t, 10);
        // fuB: the manager's warning. Your work badge, held up between you; it goes faint if you tell the truth anyway
        thread(g, 86, 140, 66, 98, 6, warn * 0.6, true);
        inFrame(g, 64, 72, 26, warn * (1 - truth * 0.45), o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 38, 92, 90, 92);
          badge(o, 64, 70, 1);
        }, truth > 0.5);
        // fuA: another shop the bakery could order from today, if it knew; a dashed path there, solid once you tell
        inFrame(g, 232, 38, 20, alt, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 212, 52, 252, 52);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.2; o.fillRect(222, 34, 20, 18); o.strokeRect(222, 34, 20, 18);
          o.beginPath(); for (let k = 0; k <= 10; k++) o.lineTo(220 + k * 2.4, 32 + (k % 2 ? 3 : 0)); o.stroke(); line(o, 220, 32, 244, 32);
          o.strokeRect(228, 42, 8, 10);
        });
        if (alt > 0.01) {
          g.save(); g.globalAlpha = alt * (0.55 + saved * 0.45); g.strokeStyle = INK; g.lineWidth = 1.2; g.lineCap = 'round'; if (saved < 0.5) g.setLineDash([3, 4]);
          g.beginPath(); g.moveTo(252, 42); g.quadraticCurveTo(262, 30, 272, 44); g.stroke(); g.restore();
        }
        // fuA: a small bakery and its wedding cake, waiting on the order
        inFrame(g, 306, 52, 36, bake, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 270, 74, 342, 74);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3;
          o.beginPath(); o.moveTo(286, 70); o.lineTo(316, 70); o.stroke(); line(o, 301, 70, 301, 74); line(o, 295, 74, 307, 74);
          [[290, 58, 22, 12], [294, 48, 14, 10], [297, 40, 8, 8]].forEach(([x, y, w, hh]) => {
            o.beginPath(); o.roundRect(x, y, w, hh, 2); o.fill(); o.stroke();
            o.beginPath(); for (let k = 0; k <= w; k += 2) o.lineTo(x + k, y + 3 + (k % 4 ? 1.4 : 0)); o.stroke();
          });
          o.fillStyle = INK; ellipse(o, 301, 37, 1.6, 1.6); o.fill();
          if (saved < 0.5) { o.setLineDash([2, 2]); o.strokeRect(320, 56, 16, 14); }
          else { o.lineWidth = 1.3; o.strokeRect(320, 56, 16, 14); line(o, 320, 61, 336, 61); }
        });
      },
    },

    // ---------------------------------------------------------------- B05 The Mistake No One Saw
    mistake: {
      base(v) {
        sc.x.v = v;
        sset({ go: 0, sorry: 0, keep: 0, doubt: 0 });
      },
      shift(v) { if (v === 'fu') sto({ doubt: 1 }, 0.9); },
      acts: {
        'B05-A': { go: 1, sorry: 1 }, 'B05-B': { keep: 1 },
        'B05-FU-A': { go: 1, sorry: 1 }, 'B05-FU-B': { keep: 1 },
      },
      async act(a) {
        await actor(this.acts, 1.2, async (id, m) => { if (m.go) { sto({ go: 1 }, 1.3); await sleep(900); sto({ sorry: 1 }, 1.4); } else sto(m, 1.0); })(a);
      },
      draw(g, t) {
        const go = V('go'), sorry = V('sorry'), keep = V('keep'), doubt = V('doubt');
        indoor(g);
        const co = npcLook(451);
        // years ago: the shared project, your mistake, their name on it
        const mx = 200, my = 62, mr = 38, ma = 1 - keep * 0.55 - go * 0.3;
        inFrame(g, mx, my, mr, ma, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, mx - mr, my + 26, mx + mr, my + 26);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.2; o.fillRect(mx - 22, my + 6, 44, 4); o.strokeRect(mx - 22, my + 6, 44, 4);
          drawPerson(o, mx - 18, my + 28, { me: true, scale: 0.42, t: 0, dir: 0.4 });
          drawPerson(o, mx + 18, my + 28, { look: co, scale: 0.42, t: 0, dir: -0.4, mood: 'worried' });
          paper(o, mx, my - 4, 14, 16, 0, 1); o.fillStyle = INK; ellipse(o, mx + 2, my - 3, 3, 2.4); o.fill();
          o.save(); o.strokeStyle = INK; o.lineWidth = 1; o.setLineDash([2, 2]); o.beginPath(); o.moveTo(mx + 7, my - 8); o.quadraticCurveTo(mx + 16, my - 20, mx + 18, my - 4); o.stroke(); o.restore();
        }, keep > 0.5);
        hourglass(g, mx + mr + 6, my - mr + 10, ma * 0.9, t);
        // your desk, and theirs, with a plant: they're doing fine
        desk(g, 28, 136, 170); desk(g, 262, 376, 170);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
        g.beginPath(); g.moveTo(344, 170); g.lineTo(346, 158); g.lineTo(358, 158); g.lineTo(360, 170); g.closePath(); g.fill(); g.stroke();
        for (const [dx, an] of [[-5, -0.7], [0, -0.1], [5, 0.6]]) { g.save(); g.translate(352 + dx, 152); g.rotate(an); ellipse(g, 0, 0, 3, 6.5); g.fill(); g.stroke(); g.restore(); }
        g.beginPath(); g.moveTo(276, 160); g.lineTo(277, 170); g.lineTo(285, 170); g.lineTo(286, 160); g.closePath(); g.fill(); g.stroke(); steam(g, 281, 158, t);
        paper(g, 90, 166, 20, 7, 0, 1);
        chair(g, 300, 188, -1, 210, 1); chair(g, 98, 188, 1, 210, 1);
        drawPerson(g, 300, 188, { look: co, scale: 0.88, t, sit: true, dir: lerp(lerp(0.3, -0.2, doubt), -0.8, go), mood: doubt > 0.5 && go < 0.5 ? 'worried' : null });
        // fu: a thought they let slip: the step they missed, still a question
        if (doubt > 0.01) {
          bubble(g, 330, 112, 40, 30, 312, 136, doubt * (1 - sorry));
          g.save(); g.globalAlpha = doubt * (1 - sorry); g.strokeStyle = INK; g.lineWidth = 1.2; line(g, 318, 124, 318, 100); line(g, 328, 124, 328, 100);
          for (const y of [118, 110, 102]) line(g, 318, y, 328, y);
          g.restore(); txt(g, '?', 340, 111, 12, doubt * (1 - sorry), SANS(12));
        }
        // you: stay at your desk, or go over and tell them
        const yx = lerp(98, 240, go), sit = go < 0.05;
        drawPerson(g, yx, sit ? 188 : 210, { me: true, scale: 0.9, t, sit, dir: lerp(lerp(0.5, -0.5, keep), 0.7, go), hop: hopY() });
        say(g, yx + 10, 124, 50, yx + 4, 148, sorry, 'sorry');
      },
    },

    // ---------------------------------------------------------------- B30 The Permit Fee
    permit: {
      base(v) {
        sc.x.v = v; sc.x.k = 0;
        sset({ pay: 0, slide: 0, stamp: 0, ret: 0, wait: 0, bench: 0, job: 0 });
        if (v === 'fu') { sc.x.k = 99; sset({ wait: 1 }); }
      },
      shift(v) { if (v === 'fu') sto({ job: 1 }, 0.9); },
      update: tick,
      acts: {
        'B30-A': { pay: 1 }, 'B30-B': { pay: 0 },
        'B30-FU-A': { pay: 1 }, 'B30-FU-B': { bench: 1 },
      },
      async act(a) {
        await actor(this.acts, 1.2, async (id, m) => {
          for (let i = 0; i < 50 && (sc.x.k || 0) < 4.5; i++) await sleep(100); // the person ahead finishes first
          if (m.bench) { sto({ bench: 1 }, 1.0); return; }
          sto({ pay: m.pay, slide: 1 }, 1.6); await sleep(900);
          if (m.pay) { sto({ stamp: 1 }, 3); await sleep(500); }
          sto({ ret: 1 }, 1.4); await sleep(500);
          if (!m.pay) sto({ wait: 1 }, 1.0);
        })(a);
      },
      draw(g, t) {
        const k = sc.x.k || 0, pay = V('pay'), slide = V('slide'), stamp = V('stamp'), ret = V('ret'), wait = V('wait'), bench = V('bench'), job = V('job');
        indoor(g);
        // the service window, the official behind the glass
        const wx = 236, wy = 70, ww = 104, wh = 82;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(wx - 12, 40, ww + 24, 170); g.strokeRect(wx - 12, 40, ww + 24, 170);
        g.strokeRect(wx, wy, ww, wh);
        const off = npcLook(461);
        // the stamp comes down twice while you read: once for the person ahead of you
        const stampLocal = reduce ? 0 : seg(k, 1.0, 1.25) * (1 - seg(k, 1.35, 1.7));
        const stampDown = Math.max(stampLocal, Math.sin(clamp01(stamp) * Math.PI));
        g.save(); g.beginPath(); g.rect(wx + 1, wy + 1, ww - 2, wh - 2); g.clip();
        drawPerson(g, wx + 50, wy + 92, { look: off, scale: 0.85, t, dir: 0.2, rArm: [lerp(8, 2, stampDown), lerp(-14, 4, stampDown)] });
        g.restore();
        g.strokeStyle = HAIR; g.lineWidth = 1; for (const d of [18, 34]) line(g, wx + d, wy + 4, wx + d - 12, wy + 18);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(wx - 6, wy + wh, ww + 12, 7); g.fill(); g.stroke();
        // queue posts
        g.strokeStyle = INK; g.lineWidth = 2; for (const x of [44, 116, 188]) { line(g, x, 210, x, 172); ellipse(g, x, 170, 3, 3); g.fillStyle = INK; g.fill(); }
        g.lineWidth = 1.3; g.beginPath(); g.moveTo(44, 176); g.quadraticCurveTo(80, 190, 116, 176); g.quadraticCurveTo(152, 190, 188, 176); g.stroke();
        // the person ahead: form and a folded bill under the glass, a stamp, and off they go
        if (k < 4.2) {
          const lx = lerp(268, 430, seg(k, 2.1, 4.0)), ldir = k > 2.0 ? 0.8 : -0.1;
          const fIn = seg(k, 0.2, 0.8) * (1 - seg(k, 1.5, 2.0));
          drawPerson(g, lx, 212, { scale: 0.9, t, phase: 462, dir: ldir, moving: k > 2.1 && k < 4.0, walk: t * 4, rArm: [lerp(3, -2, fIn), lerp(5, -10, fIn)] });
          const fx = lerp(lx - 14, wx + 52, fIn), fy = lerp(176, wy + wh - 6, fIn);
          form(g, fx, fy, seg(k, 1.2, 1.3), k < 2.1 ? 1 : 0, 0.05);
          bill(g, fx + 8, fy + 5, seg(k, 0.1, 0.3) * (1 - seg(k, 0.8, 1.1)), 0.2, 0.6);
          if (k >= 2.1) form(g, lx + 16, 186, 1, 1, 0.1);
        }
        // you, in the queue, then at the window
        const step = seg(k, 3.4, 4.5), yx = lerp(lerp(150, 236, step), 72, bench);
        if (bench > 0.5) { g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(38, 190, 68, 5); g.fill(); g.stroke(); line(g, 44, 195, 44, 210); line(g, 100, 195, 100, 210); }
        const sitting = bench > 0.5;
        drawPerson(g, yx, sitting ? 190 : 212, { me: true, scale: 0.9, t, sit: sitting, dir: sitting ? 0.6 : lerp(0.3, 0.7, step), moving: step > 0.05 && step < 0.95, walk: t * 4, rArm: [lerp(3, 10, slide * (1 - ret)), lerp(5, -10, slide * (1 - ret))] });
        const yf = ease(clamp01(slide)) * (1 - ease(clamp01(ret)));
        const fx = lerp(yx + 18, wx + 52, yf), fy = lerp(sitting ? 166 : 182, wy + wh - 6, yf);
        form(g, fx, fy, stamp > 0.5 ? 1 : 0, 1, -0.05);
        bill(g, lerp(yx + 26, wx + 60, ease(clamp01(slide))), lerp(188, wy + wh - 2, ease(clamp01(slide))), pay * (1 - clamp01(ret * 2)), 0.2, 0.6);
        // waiting: months go by
        hourglass(g, sitting ? 72 : yx - 44, sitting ? 118 : 140, wait, t);
        slots(g, sitting ? 46 : yx - 70, sitting ? 96 : 118, 6, wait * (2 + bench * 4), wait, 6);
        // fu: the job you moved for, its desk not yet yours
        inFrame(g, 110, 66, 38, job, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 72, 92, 148, 92);
          desk(o, 92, 136, 74, 92); chair(o, 116, 80, -1, 92, 1, true);
          o.strokeStyle = INK; o.lineWidth = 1.3; o.strokeRect(78, 46, 14, 46);
          paper(o, 114, 70, 12, 5, 0, 1);
        }, true);
      },
    },

    // ---------------------------------------------------------------- B32 The Call-Up
    callup: {
      base(v) {
        sc.x.v = v;
        sset({ serve: 0, refuse: 0, leave: 0, out: 1, in_: 0, fight: 0, sit: 0, lead: 0 });
        if (v === 'fuB') sset({ out: 0 });
      },
      shift(v) { if (v === 'fuB') { sto({ in_: 1 }, 0.8); sto({ lead: 1 }, 0.7); } },
      acts: {
        'B32-A': { serve: 1 }, 'B32-B': { refuse: 1 }, 'B32-C': { leave: 1 },
        'B32-FUB-A': { serve: 1 }, 'B32-FUB-B': { sit: 1 },
      },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const serve = V('serve'), refuse = V('refuse'), leave = V('leave'), out = V('out'), inw = V('in_'), sit = V('sit'), lead = V('lead');
        indoor(g);
        // the front door
        door(g, 18, 98, 44, 210, Math.max(leave, serve) * 0.8, { pane: true });
        // the map on the wall: your country, your home, and where the war is
        const mx = 150, my = 30, mw = 112, mh = 82;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(mx, my, mw, mh); g.strokeRect(mx, my, mw, mh);
        g.fillStyle = INK; ellipse(g, mx + mw / 2, my - 1, 2, 2); g.fill();
        const cx = mx + 46, cy = my + 44;
        g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath();
        for (let i = 0; i <= 40; i++) { const an = i / 40 * Math.PI * 2, r = 22 + Math.sin(an * 3 + 1) * 4 + Math.sin(an * 5) * 2; const x = cx + Math.cos(an) * r * 1.15, y = cy + Math.sin(an) * r * 0.8; i ? g.lineTo(x, y) : g.moveTo(x, y); }
        g.closePath(); g.stroke();
        g.fillStyle = INK; ellipse(g, cx - 4, cy + 2, 2.6, 2.6); g.fill();
        wobbleArrow(g, cx + 22, cy - 8, mx + mw - 8, my + 14, out * (1 - leave * 0.5));
        wobbleArrow(g, cx + 22, cy + 10, mx + mw - 8, my + mh - 16, out * (1 - leave * 0.5));
        wobbleArrow(g, mx + mw - 6, my + 16, cx + 4, cy - 2, inw, true);
        wobbleArrow(g, mx + mw - 6, my + mh - 12, cx + 4, cy + 6, inw, true);
        if (leave > 0.01) { g.save(); g.globalAlpha = leave; g.strokeStyle = INK; g.lineWidth = 1.2; g.setLineDash([2, 3]); g.beginPath(); g.moveTo(cx - 4, cy + 2); g.quadraticCurveTo(cx - 30, cy + 6, mx + 4, cy + 26); g.stroke(); g.restore(); }
        // a uniform on its hook
        const hx = 346, hy = 64;
        g.strokeStyle = INK; g.lineWidth = 1.6; line(g, hx - 6, hy - 6, hx + 6, hy - 6); g.beginPath(); g.arc(hx, hy - 1, 4, Math.PI, 2.4 * Math.PI); g.stroke();
        const yx = sit > 0.01 ? lerp(170, 186, sit) : lerp(lerp(170, 324, serve), 100, leave);
        const held = ease(clamp01(serve));
        const ux = lerp(hx, yx + 22, held), uy = lerp(hy + 4, 172, held), us = lerp(1, 0.55, held);
        g.save(); g.translate(ux, uy); g.scale(us, us);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(0, 0); g.lineTo(-18, 10); g.lineTo(-24, 58); g.lineTo(-16, 60); g.lineTo(-13, 26); g.lineTo(-13, 76); g.lineTo(13, 76); g.lineTo(13, 26); g.lineTo(16, 60); g.lineTo(24, 58); g.lineTo(18, 10); g.closePath(); g.fill(); g.stroke();
        g.lineWidth = 1.2; line(g, 0, 4, 0, 76); line(g, -13, 50, 13, 50);
        g.fillStyle = INK; g.save(); g.translate(-11, 9); g.rotate(0.5); g.fillRect(-4, -1.6, 8, 3.2); g.restore(); g.save(); g.translate(11, 9); g.rotate(-0.5); g.fillRect(-4, -1.6, 8, 3.2); g.restore();
        g.fillStyle = INK; for (const y of [18, 30, 42, 62]) { ellipse(g, 3.5, y, 1.3, 1.3); g.fill(); }
        g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(-11, 30, 7, 5); g.strokeRect(4, 30, 7, 5);
        g.restore();
        // the table with the letter on it
        desk(g, 214, 290, 176);
        if (sit > 0.01) chair(g, 186, 190, 1, 210, sit);
        // you
        const sitting = sit > 0.6;
        drawPerson(g, yx, sitting ? 190 : 210, { me: true, scale: 0.9, t, sit: sitting, dir: sitting ? 0.5 : leave > 0.5 ? -0.8 : serve > 0.5 ? 0.6 : 0.3,
          moving: (serve > 0.05 && serve < 0.95) || (leave > 0.05 && leave < 0.95), walk: t * 3,
          lArm: sitting ? [6, 4] : leave > 0.3 ? [-6, 6] : [-3, 5], rArm: sitting ? [2, 4] : [lerp(lerp(6, 3, refuse), 6, serve), lerp(lerp(-6, 5, refuse), 2, serve)] });
        // the letter: in your hand, then down on the table
        const lu = ease(clamp01(Math.max(refuse, sit)));
        envelope(g, lerp(yx + 24, 254, lu), lerp(172, 168, lu), 1 - serve - leave, 0.8);
        suitcase(g, yx - 22, 182, leave);
        // fuB: the same leaders, still at their podium
        inFrame(g, 96, 52, 30, lead, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 66, 76, 126, 76);
          drawPerson(o, 90, 78, { look: npcLook(478), scale: 0.72, t: reduce ? 0 : t * 0.6, dir: 0.2 });
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3; o.fillRect(83, 64, 18, 12); o.strokeRect(83, 64, 18, 12);
          o.lineWidth = 2; line(o, 79, 64, 105, 60); o.lineWidth = 1.3;
          line(o, 114, 76, 114, 36); o.fillRect(114, 36, 11, 8); o.strokeRect(114, 36, 11, 8);
        });
        // B: the cost you accept, a door with a barred window
        inFrame(g, 96, 52, 30, refuse, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 66, 74, 126, 74);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.fillRect(84, 36, 24, 38); o.strokeRect(84, 36, 24, 38);
          barred(o, 89, 42, 14, 10, 1);
        });
      },
    },

    // ---------------------------------------------------------------- B33 The Man Who Changed
    changed: {
      base(v) {
        sc.x.v = v;
        sset({ pros: 0, drop: 0, hurt: 0 });
      },
      shift(v) { if (v === 'fu') sto({ hurt: 1 }, 0.9); },
      acts: {
        'B33-A': { pros: 1 }, 'B33-B': { drop: 1 },
        'B33-FU-A': { pros: 1 }, 'B33-FU-B': { drop: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.9)(a);
      },
      draw(g, t) {
        const pros = V('pros'), drop = V('drop'), hurt = V('hurt');
        pavement(g);
        // the school, its little bell tower
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.rect(80, 34, 30, 34); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(74, 34); g.lineTo(95, 18); g.lineTo(116, 34); g.closePath(); g.fill(); g.stroke();
        g.save(); g.translate(95, 40);
        g.beginPath(); g.moveTo(-8, 18); g.quadraticCurveTo(-8, 2, 0, 2); g.quadraticCurveTo(8, 2, 8, 18); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = INK; ellipse(g, 0, 20, 2.2, 2.2); g.fill(); g.restore();
        g.fillStyle = PAPER; g.beginPath(); g.rect(8, 68, 174, 146); g.fill(); g.stroke();
        g.beginPath(); g.rect(4, 64, 182, 5); g.fill(); g.stroke();
        // the class, at the windows
        for (const [wx, ph] of [[22, 471], [130, 473]]) {
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(wx, 86, 40, 34); g.strokeRect(wx, 86, 40, 34);
          g.save(); g.beginPath(); g.rect(wx + 1, 87, 38, 32); g.clip();
          drawPerson(g, wx + 12, 125, { scale: 0.42, t, phase: ph, dir: 0.5 }); drawPerson(g, wx + 29, 126, { scale: 0.42, t, phase: ph + 1, dir: 0.5 });
          g.restore();
          g.lineWidth = 2; line(g, wx - 3, 121, wx + 43, 121);
        }
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(80, 156, 32, 58); g.strokeRect(80, 156, 32, 58); line(g, 96, 156, 96, 214);
        // the man: a teacher now. A: he walks to a door with a barred window. B: he turns back to his class.
        const man = npcLook(470), mxp = lerp(140, 330, pros);
        drawPerson(g, mxp, 214, { look: man, scale: 0.9, t, dir: pros > 0.05 ? lerp(-0.2, 0.7, clamp01(pros * 3)) : lerp(0.4, -0.7, drop), moving: pros > 0.05 && pros < 0.95, walk: t * 3 });
        if (pros > 0.01) {
          g.save(); g.globalAlpha = pros; door(g, 344, 120, 40, 214, 0, { bars: true });
          g.strokeStyle = INK; g.lineWidth = 1.6; g.strokeRect(338, 114, 52, 100); g.restore();
        }
        // twenty-six years ago, in faint dashes: a dropped bag under a streetlamp
        const ma = 0.75 - pros * 0.3 - drop * 0.45;
        inFrame(g, 330, 54, 32, ma, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 298, 74, 362, 74);
          o.save(); o.setLineDash([2, 2]); lamp(o, 344, 74, 42); o.restore();
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.2; o.beginPath(); o.roundRect(318, 66, 14, 9, 2); o.fill(); o.stroke(); o.beginPath(); o.arc(325, 66, 4, Math.PI, 0); o.stroke();
        }, true);
        slots(g, 290, 96, 6, 6, ma, 5);
        // fu: the person he hurt, still in pain, asking for a trial
        inFrame(g, 236, 52, 34, hurt, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 202, 76, 270, 76);
          chair(o, 230, 64, 1, 76, 1);
          drawPerson(o, 230, 64, { scale: 0.55, t, phase: 475, sit: true, dir: 0.4, mood: 'worried' });
          o.strokeStyle = INK; o.lineWidth = 1.6; line(o, 252, 76, 248, 50); o.beginPath(); o.arc(251, 50, 3, Math.PI, 0); o.stroke();
          folder(o, 254, 32, 0, 1);
        });
        // you, with the new evidence
        const yx = lerp(270, 250, pros);
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: lerp(-0.6, -0.3, drop), rArm: [lerp(6, 3, drop), lerp(-6, 5, drop)] });
        folder(g, lerp(yx + 22, yx + 26, drop), lerp(184, 206, drop), pros, 1);
      },
    },

    // ---------------------------------------------------------------- B34 The Remorse Pill
    remorse: {
      base(v) {
        sc.x.v = v;
        sset({ inn: 0, outt: 0, gate: 0, crowd: 0, plea: 0 });
        if (v === 'fuB') sset({ gate: 1 });
      },
      shift(v) {
        if (v === 'fuA') sto({ plea: 1 }, 1.2); // the person they hurt comes to the gate and asks for them to go free
        if (v === 'fuB') sto({ crowd: 1 }, 0.8);
      },
      acts: {
        'B34-A': { inn: 1, gate: 0 }, 'B34-B': { gate: 1, outt: 1 },
        'B34-FUA-A': { inn: 1, gate: 0 }, 'B34-FUA-B': { gate: 1, outt: 1 },
        'B34-FUB-A': { inn: 1, gate: 0 }, 'B34-FUB-B': { outt: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.9, async (id, m) => {
          if (m.outt && V('gate') < 0.5) { sto({ gate: 1 }, 1.4); await sleep(700); }
          if (m.inn) { sto({ inn: 1 }, 0.9); await sleep(1200); sto({ gate: 0 }, 1.2); }
          else sto({ outt: 1 }, 0.9);
        })(a);
      },
      draw(g, t) {
        const inn = V('inn'), outt = V('outt'), gate = V('gate'), crowd = V('crowd'), plea = V('plea');
        const fu = sc.x.v === 'fuB';
        // the prison: a wall with barred windows, one door
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(150, 58, 190, 112); g.fill(); g.stroke();
        g.beginPath(); g.rect(146, 54, 198, 5); g.fill(); g.stroke();
        for (const x of [166, 206, 284, 316]) barred(g, x, 76, 16, 20);
        door(g, 232, 116, 30, 170, inn > 0.95 ? 0 : clamp01(inn * 3) * 0.7);
        // the sentence still to serve
        slots(g, 214, 64, 6, 4, 1 - outt * 0.8, 6);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 170, 400, 170);
        // the path out, past the gate
        g.strokeStyle = HAIR; g.lineWidth = 1; g.beginPath(); g.moveTo(232, 170); g.quadraticCurveTo(250, 220, 400, 236); g.stroke(); g.beginPath(); g.moveTo(262, 170); g.quadraticCurveTo(286, 204, 400, 214); g.stroke();
        // the person who took the pill: deeply sorry
        const who = npcLook(481);
        let px, py, pdir;
        if (inn > 0.01) { const u = ease(clamp01(inn)); px = lerp(fu ? 244 : 246, 247, u); py = lerp(fu ? 204 : 196, 170, u); pdir = 0; }
        else { const u = ease(clamp01(outt)); px = lerp(fu ? 244 : 246, 306, u); py = lerp(fu ? 204 : 196, 226, u); pdir = outt > 0.05 ? 0.6 : 0; }
        ghost(g, 1 - clamp01((inn - 0.75) * 4), px, py, { look: who, scale: 0.85, t, dir: pdir, mood: 'sad', moving: (inn > 0.05 && inn < 0.9) || (outt > 0.05 && outt < 0.95), walk: t * 3 });
        // the fence, and its gate
        g.strokeStyle = GRAPH; g.lineWidth = 1.2; line(g, 0, 156, 216, 156); line(g, 276, 156, 400, 156);
        g.lineWidth = 1.3; for (let x = 8; x < 400; x += 22) { if (x > 210 && x < 280) continue; line(g, x, 150, x, 198); }
        g.strokeStyle = INK; g.lineWidth = 1.6; line(g, 214, 146, 214, 200); line(g, 278, 146, 278, 200);
        const gw = 31 * (1 - gate * 0.85);
        g.strokeStyle = INK; g.lineWidth = 1.3; g.strokeRect(215, 152, gw, 44); g.strokeRect(277 - gw, 152, gw, 44);
        if (gw > 8) { g.strokeStyle = GRAPH; for (let k = 1; k < 3; k++) { line(g, 215 + gw * k / 3, 152, 215 + gw * k / 3, 196); line(g, 277 - gw * k / 3, 152, 277 - gw * k / 3, 196); } }
        // the pill they took
        inFrame(g, 70, 64, 30, 1, o => {
          o.save(); o.translate(70, 64); o.rotate(-0.5); o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.beginPath(); o.roundRect(-12, -5, 24, 10, 5); o.fill(); o.stroke();
          o.fillStyle = INK; o.beginPath(); o.roundRect(0, -5, 12, 10, [0, 5, 5, 0]); o.fill(); o.restore();
          sparkle(o, 54, 52, 3, 0.8); sparkle(o, 86, 78, 2.5, 0.8);
        });
        // fuB: others watching from the street, who may think they can get away with crime
        for (const [x, ph] of [[346, 483], [368, 484], [390, 485]]) {
          if (crowd > 0.01) { g.save(); g.globalAlpha = crowd * 0.5; g.strokeStyle = GRAPH; g.lineWidth = 1; g.setLineDash([2, 4]); line(g, x - 8, 214, 262, 190); g.restore(); }
          ghost(g, crowd * 0.9, x, 240, { scale: 0.62, t, phase: ph, dir: -0.7 });
        }
        // fuA: the person they assaulted walks up to the gate, a letter for the court in hand, and speaks for them
        if (plea > 0.01) {
          const q = ease(clamp01(plea)), vx = lerp(130, 184, q), vy = 232;
          ghost(g, Math.min(1, plea * 2), vx, vy, { look: npcLook(489), scale: 0.84, t, dir: 0.6, moving: plea > 0.05 && plea < 0.9, walk: t * 3, rArm: [10, -6] });
          paper(g, vx + 16, vy - 34, 10, 13, 0.1, q);
          say(g, vx + 24, vy - 74, 38, vx + 12, vy - 56, clamp01((plea - 0.8) * 5) * (1 - Math.max(inn, outt)));
        }
        // you, outside the fence
        drawPerson(g, 96, 238, { me: true, scale: 0.88, t, dir: 0.6 });
      },
    },

    // ---------------------------------------------------------------- B35 The True Story
    truestory: {
      base(v) { sc.x.v = v; sset({ post: 0, keep: 0, kids: 0 }); },
      shift(v) { if (v === 'fu') sto({ kids: 1 }, 0.9); },
      acts: {
        'B35-A': { post: 1 }, 'B35-B': { keep: 1 },
        'B35-FU-A': { post: 1 }, 'B35-FU-B': { keep: 1 },
      },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const post = V('post'), keep = V('keep'), kids = V('kids');
        moon(g, 48, 34, 9, 1); stars(g, [[90, 22], [130, 44], [22, 70]], 1);
        pavement(g);
        // the newsstand
        const kx = 248;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.rect(kx, 92, 136, 122); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(kx - 8, 92); g.lineTo(kx + 144, 92); g.lineTo(kx + 136, 74); g.lineTo(kx, 74); g.closePath(); g.fill(); g.stroke();
        g.lineWidth = 1.2; for (let x = kx; x < kx + 144; x += 16) { g.beginPath(); g.arc(x + 8, 92, 8, 0, Math.PI); g.stroke(); }
        g.fillStyle = PAPER; g.lineWidth = 1.5; g.beginPath(); g.rect(kx - 4, 160, 144, 7); g.fill(); g.stroke();
        // the papers on the rack. A: tomorrow's front page carries what you posted
        for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
          const x = kx + 12 + c * 31, y = 108 + r * 24;
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; g.fillRect(x, y, 24, 20); g.strokeRect(x, y, 24, 20);
          g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, x + 3, y + 4, x + 21, y + 4);
          const p = clamp01(post * 2 - (r * 4 + c) * 0.1);
          if (p > 0.01) { g.save(); g.globalAlpha = p; g.fillStyle = INK; g.fillRect(x + 3, y + 8, 18, 4); g.strokeStyle = INK; g.strokeRect(x + 3, y + 14, 8, 4); g.restore(); }
        }
        // the person who did it, in a round window (fu: and their two teenage kids)
        const who = npcLook(491);
        inFrame(g, 186, 56, 36, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 150, 82, 222, 82);
          drawPerson(o, lerp(186, 172, kids), 84, { look: who, scale: 0.6, t, dir: 0.2 });
          faded(o, kids, c => { drawPerson(c, 194, 84, { scale: 0.46, t, phase: 492, dir: -0.3 }); drawPerson(c, 210, 84, { scale: 0.44, t, phase: 493, dir: -0.4 }); });
        });
        // the bench: the one you love, and you with your phone
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(58, 192, 130, 5); g.fill(); g.stroke();
        line(g, 66, 197, 66, 214); line(g, 180, 197, 180, 214); line(g, 62, 176, 184, 176); line(g, 66, 176, 66, 192); line(g, 180, 176, 180, 192);
        drawPerson(g, 92, 192, { scale: 0.9, t, phase: 494, sit: true, dir: lerp(0.4, 0.8, keep), mood: 'sad' });
        const yx = 152;
        drawPerson(g, yx, 192, { me: true, scale: 0.9, t, sit: true, dir: lerp(0.5, -0.7, keep), rArm: [lerp(2, 3, keep), lerp(-10, 5, keep)] });
        handset(g, yx + 16, lerp(160, 182, keep), 0.2, 1);
        thread(g, yx - 10, 156, 104, 156, 12, 0.8);
        // your proof of what they did: a page with a photo on it. Posted, or put away
        const u = ease(clamp01(post)), sx = lerp(yx + 18, kx + 50, u), sy = lerp(126, 104, u) - Math.sin(u * Math.PI) * 30, pa = 1 - keep;
        if (pa > 0.01 && post < 0.98) {
          g.save(); g.globalAlpha = pa; g.translate(sx, sy); g.scale(lerp(1, 0.6, u), lerp(1, 0.6, u));
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.fillRect(-12, -15, 24, 30); g.strokeRect(-12, -15, 24, 30);
          g.strokeStyle = INK; g.lineWidth = 1.1; g.strokeRect(-8, -11, 16, 11); g.beginPath(); g.moveTo(-7, -1); g.lineTo(-2, -7); g.lineTo(2, -3); g.lineTo(4, -5); g.lineTo(7, -1); g.stroke();
          g.strokeStyle = GRAPH; g.lineWidth = 1; for (const y of [4, 9]) line(g, -8, y, 8, y);
          g.restore();
          if (post < 0.05) { g.save(); g.globalAlpha = pa; g.fillStyle = INK; for (const [x, y, r] of [[yx + 18, 148, 1.4], [yx + 18, 142, 1.8]]) { ellipse(g, x, y, r, r); g.fill(); } g.restore(); }
        }
      },
    },

    // ---------------------------------------------------------------- B41 The Borrowed Credit
    credit: {
      base(v) {
        sc.x.v = v;
        sset({ give: 0, let_: 0, pay: 1, cut: 0, mine: 0, one: 0, cw: 0, own: 0, cover: 0 });
        if (v === 'fuB') sset({ let_: 1 });
      },
      shift(v) {
        if (v === 'fuA') sto({ one: 1 }, 0.9); // the one raise rises between you and your coworker's empty chair
        if (v === 'fuB') sto({ cw: 1 }, 0.8);
      },
      acts: {
        'B41-A': { give: 1 }, 'B41-B': { let_: 1 },
        'B41-FUA2-A': { give: 1, cut: 1 }, 'B41-FUA2-B': { let_: 1, mine: 1 },
        'B41-FUB-A': { own: 1 }, 'B41-FUB-B': { cover: 1 },
      },
      async act(a) { await actor(this.acts, 1.0)(a); },
      draw(g, t) {
        const give = V('give'), let_ = V('let_'), pay = V('pay'), cut = V('cut'), mine = V('mine'), one = V('one'), cw = V('cw'), own = V('own'), cover = V('cover');
        indoor(g);
        // a glass wall, the city beyond it
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(16, 20, 368, 130); g.strokeRect(16, 20, 368, 130);
        g.save(); g.beginPath(); g.rect(17, 21, 366, 128); g.clip(); skyline(g, 150, 1); g.restore();
        g.strokeStyle = INK; g.lineWidth = 1.3; for (const x of [108, 200, 292]) line(g, x, 20, x, 150);
        // next week's pay review
        if (pay > 0.01) {
          g.save(); g.globalAlpha = pay; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.fillRect(316, 30, 58, 34); g.strokeRect(316, 30, 58, 34);
          g.fillRect(316, 30, 58, 8); g.strokeRect(316, 30, 58, 8); g.lineWidth = 1;
          for (let k = 0; k < 7; k++) { g.strokeStyle = GRAPH; g.strokeRect(320 + k * 7.6, 44, 5, 5); g.strokeRect(320 + k * 7.6, 53, 5, 5); }
          g.strokeStyle = INK; ellipse(g, 322.5 + 4 * 7.6, 55.5, 5, 5); g.stroke(); g.restore();
        }
        // the boss, pleased, praising the idea
        const boss = npcLook(501), co = npcLook(506);
        const clap = reduce ? 0.5 : (Math.sin(t * 1.5) * 0.5 + 0.5);
        drawPerson(g, 56, 210, { look: boss, scale: 0.95, t, dir: lerp(0.6, 0.9, give), lArm: [lerp(2, 6, clap * (1 - give)), -10], rArm: [lerp(-2, -6, clap * (1 - give)), -10] });
        sparkle(g, 78, 142, 3, 0.8 * (1 - give)); sparkle(g, 36, 138, 2.5, 0.8 * (1 - give));
        // the meeting: you, another colleague, and your coworker's empty chair
        const yx = 168, ex = 296;
        const said = Math.max(own, cover);
        drawPerson(g, yx, 182, { me: true, scale: 0.9, t, sit: true, dir: lerp(lerp(lerp(-0.6, 0.8, give), 0.1, let_), lerp(0.8, 0.3, cover), said), rArm: [lerp(3, 16, give), lerp(5, -6, give)] });
        drawPerson(g, 232, 182, { scale: 0.88, t, phase: 502, sit: true, dir: -0.6 });
        g.save(); g.strokeStyle = INK; g.lineWidth = 1.5; g.setLineDash([3, 3]); g.beginPath(); g.roundRect(ex - 12, 134, 26, 38, [8, 8, 0, 0]); g.stroke(); g.restore();
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(96, 172, 240, 6); g.fill(); g.stroke(); line(g, 106, 178, 106, 210); line(g, 326, 178, 326, 210);
        // your pay envelope on the table. fuA: there's only one, and it hangs between you and your coworker's chair
        const ox = yx + 12, oy = 166, mx2 = (yx + ex) / 2 + 2, my2 = 120, ou = ease(clamp01(one));
        let px = lerp(ox, mx2, ou), py = lerp(oy, my2, ou) - Math.sin(clamp01(one) * Math.PI) * 10;
        if (cut > 0.01) { const u = ease(clamp01(cut)); px = lerp(px, ex + 1, u); py = lerp(py, 126, u); }
        if (mine > 0.01) { const u = ease(clamp01(mine)); px = lerp(px, ox, u); py = lerp(py, oy, u); }
        const rival = one * (1 - Math.max(cut, mine));
        thread(g, px - 10, py + 6, yx + 4, 144, -6, rival * 0.6, true); thread(g, px + 10, py + 6, ex + 1, 132, -6, rival * 0.6, true);
        envelope(g, px, py, pay, 0.75);
        // the idea: praised above you, but it was theirs
        const u = ease(clamp01(give)), ix = lerp(yx, ex + 1, u), iy = lerp(108, 112, u) - Math.sin(u * Math.PI) * 18;
        star(g, ix, iy, 9, 1, false); sparkle(g, ix - 15, iy - 6, 2.5, 0.8); sparkle(g, ix + 14, iy + 4, 2, 0.8);
        thread(g, ix + 6, iy + 6, ex + 1, 134, -12, 0.6 * (1 - u), true);
        // fuB: your coworker comes in and asks if you said anything
        if (cw > 0.01) {
          const cx2 = lerp(430, 362, ease(cw));
          drawPerson(g, cx2, 210, { look: co, scale: 0.9, t, dir: -0.7, moving: cw < 0.95, walk: t * 3, mood: own > 0.5 ? 'worried' : null });
          bubble(g, cx2 - 6, 126, 22, 20, cx2 - 8, 146, cw * (1 - said)); txt(g, '?', cx2 - 6, 126.5, 13, cw * (1 - said), SANS(13));
          say(g, yx + 44, 116, 40, yx + 16, 142, said);
          talk(g, yx + 20, 150, cx2 - 14, 160, said, t, 10);
        }
      },
    },

    // ---------------------------------------------------------------- Q8 The Coworker
    theft: {
      base(v) {
        sc.x.v = v;
        sset({ rep: 0, stay: 0, kid: 0, hours: 0, fold: 0 });
      },
      shift(v) { if (v === 'fuA') sto({ kid: 1 }, 1.0); if (v === 'fuB') sto({ hours: 1 }, 0.8); },
      acts: {
        'Q8-A': { rep: 1 }, 'Q8-B': { stay: 1 },
        'Q8-FUA-A': { rep: 1 }, 'Q8-FUA-B': { fold: 1 },
        'Q8-FUB2-A': { rep: 1 }, 'Q8-FUB2-B': { stay: 1 },
      },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const v = sc.x.v, rep = V('rep'), stay = V('stay'), kid = V('kid'), hours = V('hours'), fold = V('fold');
        indoor(g);
        // the manager's door, the filing cabinet by it
        door(g, 16, 92, 42, 210, 0, { pane: true });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(66, 112, 40, 98); g.fill(); g.stroke();
        for (const y of [144, 176]) line(g, 66, y, 106, y); g.lineWidth = 1.3; for (const y of [126, 158, 190]) line(g, 80, y, 92, y);
        // a window (fuB: the shift board, where two coworkers' hours have just been cut)
        const wx = 140, wy = 40, ww = 110, wh = 78;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(wx, wy, ww, wh); g.strokeRect(wx, wy, ww, wh);
        if (hours > 0.01) {
          const cutU = ease(clamp01((hours - 0.45) / 0.55)); // the board comes up first, then half of each week empties
          faded(g, hours, o => {
            o.save(); o.beginPath(); o.rect(wx + 1, wy + 1, ww - 2, wh - 2); o.clip();
            o.fillStyle = PAPER; o.fillRect(wx + 1, wy + 1, ww - 2, wh - 2);
            [[0, 513], [1, 514]].forEach(([r, ph]) => {
              const ry = wy + 10 + r * 34;
              drawPerson(o, wx + 15, ry + 26, { scale: 0.3, t, phase: ph, dir: 0.4, mood: cutU > 0.5 ? 'worried' : null });
              slots(o, wx + 30, ry + 10, 6, 6 - 3 * cutU, 1, 9);
            });
            o.restore();
          });
        }
        g.strokeStyle = HAIR; g.lineWidth = 1; g.globalAlpha = 1 - hours; line(g, wx + ww / 2, wy, wx + ww / 2, wy + wh); line(g, wx, wy + wh / 2, wx + ww, wy + wh / 2); g.globalAlpha = 1;
        // your colleague at the petty-cash box. A bill slips into a pocket now and then.
        desk(g, 300, 388, 172);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(312, 158, 26, 14); g.strokeRect(312, 158, 26, 14); line(g, 312, 163, 338, 163);
        scribble(g, 318, 88, 44, 34, kid);
        if (kid > 0.01) { paper(g, 356, 166, 18, 10, -0.08, kid); paper(g, 374, 166, 18, 10, 0.06, kid); txt(g, '+', 356, 166, 9, kid, SANS(9)); txt(g, '+', 374, 166, 9, kid, SANS(9)); }
        const col = npcLook(511), cx = 276;
        drawPerson(g, cx, 212, { look: col, scale: 0.9, t, dir: lerp(0.7, -0.7, Math.max(kid, rep)), mood: kid > 0.5 ? 'sad' : null, rArm: [10, -4] });
        if (!reduce && v === 'trunk' && rep < 0.05 && stay < 0.05) {
          const u = (t * 0.35) % 1;
          if (u < 0.5) { const w = u / 0.5; bill(g, lerp(322, cx + 14, w), lerp(152, 190, w) - Math.sin(w * Math.PI) * 14, Math.sin(w * Math.PI), w * 0.6, 0.55); }
        }
        // you, with the proof
        const yx = v === 'fuA' ? lerp(128, 72, rep) : lerp(lerp(190, 72, rep), 176, stay);
        const dir = rep > 0.5 ? -0.7 : stay > 0.5 ? -0.4 : fold > 0.5 ? 0.7 : v === 'fuA' ? 0.6 : 0.6;
        drawPerson(g, yx, 212, { me: true, scale: 0.9, t, dir, moving: rep > 0.05 && rep < 0.95, walk: t * 3, rArm: [lerp(8, 3, Math.max(stay, fold)), lerp(-10, 5, Math.max(stay, fold))] });
        const pu = ease(clamp01((rep - 0.7) / 0.3));
        const px = lerp(yx + 22, 38, pu), py = lerp(176, 206, pu), pa = (1 - Math.max(stay, fold)) * (1 - clamp01((rep - 0.92) * 12));
        if (pa > 0.01) { paper(g, px, py, 14, 18, 0, pa); g.save(); g.globalAlpha = pa; g.strokeStyle = INK; g.lineWidth = 1; g.strokeRect(px - 4, py - 6, 8, 6); g.restore(); }
      },
    },

    // ---------------------------------------------------------------- Q9 The Protest
    unjustlaw: {
      base(v) {
        sc.x.v = v;
        sset({ join: 0, vote: 0, home: 0, badgeDown: 0, lunch: 0, face: 0 });
      },
      shift(v) { if (v === 'fuA') sto({ home: 1 }, 1.0); if (v === 'fuB') sto({ face: 1 }, 0.9); },
      acts: {
        'Q9-A': { join: 1 }, 'Q9-B': { vote: 1 },
        'Q9-FUA-A': { badgeDown: 1 }, 'Q9-FUA-B': { lunch: 1 },
        'Q9-FUB-A': { join: 1 }, 'Q9-FUB-B': { vote: 1 },
      },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const v = sc.x.v;
        if (v === 'fuA') {
          // home: the kitchen table, your work badge and the lunchbox. Far off through the window, the dome.
          const home = V('home'), down = V('badgeDown'), lunch = V('lunch');
          indoor(g);
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(178, 40, 100, 66); g.strokeRect(178, 40, 100, 66);
          g.save(); g.beginPath(); g.rect(179, 41, 98, 64); g.clip(); g.strokeStyle = GRAPH; g.lineWidth = 1.1; g.beginPath(); g.arc(240, 96, 12, Math.PI, 0); g.stroke(); g.strokeRect(226, 96, 28, 10); moon(g, 200, 58, 5, 1); g.restore();
          g.strokeStyle = INK; g.lineWidth = 2; line(g, 174, 108, 282, 108);
          door(g, 16, 96, 42, 210, down * 0.8, { pane: true });
          desk(g, 150, 330, 176);
          lunchbox(g, lerp(250, 212, ease(clamp01(lunch))), 176, 1);
          const fam = 1;
          chair(g, 304, 188, -1, 210, fam); chair(g, 264, 192, -1, 210, fam);
          drawPerson(g, 300, 188, { scale: 0.9, t, phase: 523, sit: true, dir: -0.6 }); drawPerson(g, 262, 192, { scale: 0.55, t, phase: 522, sit: true, dir: -0.5 });
          const yx = lerp(lerp(118, 52, down), 186, lunch);
          const sitting = lunch > 0.85;
          if (lunch > 0.01) chair(g, 186, 190, 1, 210, lunch);
          drawPerson(g, sitting ? 186 : yx, sitting ? 190 : 212, { me: true, scale: 0.9, t, sit: sitting, dir: down > 0.5 ? -0.8 : 0.6, rArm: sitting ? [8, 2] : [lerp(8, 4, down), lerp(-6, 5, down)] });
          // the badge: in your hand, then left on the table
          const bu = ease(clamp01(down));
          badge(g, lerp(yx + 22, 236, bu), lerp(168, 164, bu) - lunch * 8, home);
          thread(g, (sitting ? 186 : yx) + 10, 170, 290, 160, 12, home * 0.8); thread(g, (sitting ? 186 : yx) + 10, 172, 262, 172, 6, home * 0.8);
          return;
        }
        const join = V('join'), vote = V('vote'), face = V('face');
        moon(g, 352, 34, 9, 1); stars(g, [[30, 24], [70, 50], [300, 18], [384, 70]], 1);
        // the government building: dome, columns, steps
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.arc(200, 70, 34, Math.PI, 0); g.fill(); g.stroke();
        line(g, 200, 36, 200, 26); g.beginPath(); g.rect(160, 70, 80, 14); g.fill(); g.stroke();
        g.beginPath(); g.moveTo(96, 96); g.lineTo(200, 84); g.lineTo(304, 96); g.closePath(); g.fill(); g.stroke();
        g.beginPath(); g.rect(100, 96, 200, 62); g.fill(); g.stroke();
        for (let i = 0; i < 6; i++) g.strokeRect(112 + i * 34, 100, 10, 58);
        [[92, 158, 216], [82, 168, 236], [72, 178, 256]].forEach(([x, y, w]) => { g.beginPath(); g.rect(x, y, w, 10); g.fill(); g.stroke(); });
        // people sitting on the steps, blank signs, calm
        const seats = [[110, 168, 531], [140, 168, 532], [258, 168, 534], [290, 168, 535], [96, 178, 536], [164, 178, 537], [234, 178, 538], [306, 178, 539]];
        seats.forEach(([x, y, ph], i) => { drawPerson(g, x, y, { scale: 0.5, t, phase: ph, sit: true, dir: (i % 3 - 1) * 0.3 }); if (i % 3 === 0) placard(g, x + 10, y - 16, 1); });
        // fuB: someone you love, among them
        const fx = 200, fy = 178;
        drawPerson(g, fx, fy, { scale: 0.56, t, phase: 540, sit: true, dir: lerp(0.2, 0.8, face) });
        // the rope line, and you on the pavement
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 214, 400, 214);
        g.lineWidth = 2; for (const x of [40, 200, 360]) { line(g, x, 214, x, 194); ellipse(g, x, 192, 2.5, 2.5); g.fillStyle = INK; g.fill(); }
        g.lineWidth = 1.3; g.beginPath(); g.moveTo(40, 197); g.quadraticCurveTo(120, 206, 200, 197); g.quadraticCurveTo(280, 206, 360, 197); g.stroke();
        const u = ease(clamp01(join));
        const yx = lerp(250, 226, u), yy = lerp(238, 178, u);
        const sitting = join > 0.85;
        drawPerson(g, yx, yy, { me: true, scale: lerp(0.8, 0.56, u), t, sit: sitting, dir: lerp(-0.2, -0.6, face), rArm: [lerp(3, 12, vote), lerp(5, -2, vote)] });
        if (sitting) placard(g, yx + 11, yy - 18, clamp01((join - 0.85) * 7));
        thread(g, yx - 8, yy - 30, fx + 8, fy - 22, 14, face * (1 - u * 0.3) * 0.9);
        // B: a ballot box beside you; your vote goes in
        if (vote > 0.01) {
          g.save(); g.globalAlpha = Math.min(1, vote * 2); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(286, 220, 30, 24); g.strokeRect(286, 220, 30, 24); line(g, 294, 226, 308, 226); g.restore();
          paper(g, 301, lerp(208, 226, ease(clamp01((vote - 0.4) / 0.6))), 10, 12, 0, clamp01(vote * 2) * (1 - clamp01((vote - 0.9) * 10)));
        }
      },
    },

    // ---------------------------------------------------------------- Q10 The Bystander
    platform: {
      base(v) {
        sc.x.v = v;
        sset({ conf: 0, beside: 0, stay: 0, down: 0, between: 0, hold: 0, turn: 0, ground: 0, away: 0 });
        if (v === 'fuA') sset({ conf: 1 }); // you've confronted them, close by
        if (v === 'fuB') sset({ down: 1 });
      },
      shift(v) { if (v === 'fuA') sto({ turn: 1 }, 0.7); }, // the harasser turns on you: much bigger, stepping in close
      acts: {
        'Q10-A': { conf: 1 }, 'Q10-B': { beside: 1 }, 'Q10-C': { stay: 1 },
        'Q10-FUA-A': { ground: 1 }, 'Q10-FUA-B': { away: 1 },
        'Q10-FUB-A': { between: 1 }, 'Q10-FUB-B': { hold: 1 },
      },
      async act(a) { await actor(this.acts, 1.0)(a); },
      draw(g, t) {
        const fu = sc.x.v === 'fuB', conf = V('conf'), beside = V('beside'), stay = V('stay'), down = V('down'), between = V('between'), hold = V('hold');
        const turn = V('turn'), ground = V('ground'), away = V('away');
        // the platform: a tiled wall, the tunnel mouth, the edge and the track
        g.strokeStyle = HAIR; g.lineWidth = 1;
        for (let y = 24; y < 166; y += 12) { line(g, 0, y, 400, y); for (let x = ((y / 12) % 2) * 12; x < 400; x += 24) line(g, x, y, x, y + 12); }
        g.fillStyle = INK; g.beginPath(); g.moveTo(340, 166); g.lineTo(340, 104); g.arc(380, 104, 40, Math.PI, 0); g.lineTo(420, 166); g.closePath(); g.fill();
        g.strokeStyle = INK; g.lineWidth = 1.6; line(g, 0, 166, 400, 166);
        g.fillStyle = PAPER; g.lineWidth = 1.4; g.fillRect(150, 40, 70, 20); g.strokeRect(150, 40, 70, 20); line(g, 166, 30, 166, 40); line(g, 204, 30, 204, 40);
        ellipse(g, 162, 50, 5, 5); g.stroke(); g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, 172, 50, 212, 50);
        g.strokeStyle = INK; g.lineWidth = 1.6; line(g, 0, 222, 400, 222);
        g.fillStyle = GRAPH; for (let x = 4; x < 400; x += 8) g.fillRect(x, 216, 2, 2);
        g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, 0, 236, 400, 236); line(g, 0, 246, 400, 246);
        for (let x = 6; x < 400; x += 20) line(g, x, 233, x - 4, 249);
        // two bystanders, frozen, looking away
        drawPerson(g, 34, 194, { scale: 0.82, t, phase: 541, dir: -0.6 }); drawPerson(g, 64, 196, { scale: 0.82, t, phase: 547, dir: -0.8 });
        // the one shouting, and the one being shouted at (fu: knocked to the ground, sitting there)
        const har = npcLook(543), tgt = npcLook(545);
        const back = between;
        // fuA: the harasser turns and steps in close to you, much bigger than you
        const close = ease(clamp01(turn));
        const hx = lerp(lerp(fu ? 246 : 232, 214, back), lerp(240, 250, away), close), wag = reduce ? 0 : Math.sin(t * 2.2) * 3;
        const hs = lerp(0.9, 1.12, ease(clamp01(turn)));
        const calm = Math.max(conf, between) * 0.6 * (1 - turn);
        drawPerson(g, hx, lerp(196, 206, ease(clamp01(turn))), { look: har, scale: hs, t, dir: lerp(0.8, -0.8, Math.max(conf, between)), mood: 'angry', rArm: [lerp(8, 4, calm), lerp(-8 + wag * (1 - turn), 4, calm)], lArm: [-6, lerp(-2, 4, calm)] });
        marks(g, 'anger', hx + 6, lerp(146, 138, turn), (0.65 + (reduce ? 0 : 0.25 * Math.sin(t * 1.6))) * (1 - calm), t);
        const tx = 300;
        if (down > 0.5) {
          drawPerson(g, tx + 4, 212, { look: tgt, scale: 0.9, t, sit: true, dir: -0.6, mood: 'worried', lArm: [-8, 8], rArm: [6, 8] });
          g.save(); g.translate(338, 210); g.rotate(1.3); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(-8, -6, 16, 12, 2); g.fill(); g.stroke(); g.beginPath(); g.arc(0, -6, 4, Math.PI, 0); g.stroke(); g.restore();
        }
        else drawPerson(g, tx + beside * 6, 196, { look: tgt, scale: 0.9, t, dir: lerp(-0.6, 0.6, beside), mood: 'worried', lArm: [-2, -4], rArm: [6, -4] });
        // you, on the front edge of the platform, with a phone that has no signal
        let yx = fu ? 170 : 128;
        yx = lerp(lerp(yx, 196, conf), 330, beside);
        yx = lerp(yx, 272, between);
        yx = lerp(yx, 134, ease(away)); // fuA: you back away along the platform
        const ydir = stay > 0.5 ? 0.4 : hold > 0.5 ? 0.3 : (beside > 0.5 ? -0.7 : 0.7);
        drawPerson(g, yx, 212, { me: true, scale: 0.9, t, dir: away > 0.05 ? (away < 0.9 ? -0.6 : 0.5) : ydir, moving: [conf, beside, between, away].some(k => k > 0.05 && k < 0.95), walk: t * 3,
          lArm: between > 0.3 ? [-14, -2] : [lerp(-3, -6, beside), lerp(5, -2, beside)], rArm: between > 0.3 ? [14, -2] : conf > 0.3 ? [12, -14] : [lerp(4, 3, stay + hold), lerp(-10, 5, stay + hold)] });
        const ph = (1 - Math.max(conf, beside, between)) * (1 - (stay + hold) * 0.6);
        if (ph > 0.01) {
          handset(g, yx + 18, 170 + (stay + hold) * 14, 0.15, ph);
          g.save(); g.globalAlpha = ph; g.strokeStyle = GRAPH; g.lineWidth = 1; for (let k = 0; k < 3; k++) g.strokeRect(yx + 26 + k * 4, 160 - k * 3, 2.5, 4 + k * 3);
          g.strokeStyle = INK; line(g, yx + 25, 149, yx + 38, 163); g.restore();
        }
        say(g, yx + 6, 122, 40, yx + 2, 146, conf * (1 - turn * (1 - ground)) * (1 - away));
        thread(g, yx + 10, 174, tx - 10, 166, 10, beside * 0.9);
      },
    },

    // ---------------------------------------------------------------- D3 The Informant
    shifts: {
      base(v) { sc.x.v = v; sset({ rep: 0, let_: 0 }); },
      acts: { 'D3-A': { rep: 1 }, 'D3-B': { let_: 1 } },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const rep = V('rep'), let_ = V('let_');
        indoor(g);
        // a saw-tooth factory roof
        g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.moveTo(0, 34);
        for (let x = 0; x < 400; x += 50) { g.lineTo(x + 40, 14); g.lineTo(x + 40, 34); g.lineTo(x + 50, 34); }
        g.stroke(); g.strokeStyle = HAIR; g.lineWidth = 1; for (let x = 0; x < 400; x += 50) for (let k = 1; k < 4; k++) line(g, x + 40 - k * 9, 34 - k * 4.5, x + 40 - k * 9, 34);
        // a machine on the floor
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(318, 130, 66, 80); g.strokeRect(318, 130, 66, 80);
        g.lineWidth = 1.3; ellipse(g, 351, 160, 14, 14); g.stroke(); line(g, 351, 160, 359, 152);
        g.strokeRect(326, 186, 50, 10);
        // the shift board: who works days, who works nights. One row is all nights.
        const bx = 140, by = 52, rows = 3, cols = 6, cw = 18, rh = 20;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(bx - 22, by - 8, cols * cw + 30, rows * rh + 14); g.strokeRect(bx - 22, by - 8, cols * cw + 30, rows * rh + 14);
        const night = [[0, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1], [0, 1, 0, 0, 1, 0]];
        for (let r = 0; r < rows; r++) {
          const y = by + r * rh + rh / 2 - 2;
          g.strokeStyle = INK; g.lineWidth = 1.1; ellipse(g, bx - 11, y, 4, 4); g.stroke();
          for (let c = 0; c < cols; c++) {
            const x = bx + c * cw + cw / 2;
            g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(x - 7, y - 7, 14, 14);
            if (night[r][c]) moon(g, x, y, 4, 1);
            else { g.strokeStyle = INK; ellipse(g, x, y, 2.6, 2.6); g.stroke(); }
          }
        }
        // the HR door
        door(g, 16, 96, 42, 210, 0, { pane: true });
        // your colleague, who helped build your career, pinning up the week
        const men = npcLook(551), mate = Object.assign({}, npcLook(553), { eyes: 'sleepy' });
        drawPerson(g, 214, 210, { look: men, scale: 0.92, t, dir: lerp(-0.4, -0.8, rep), lArm: [-6, -16] });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; g.fillRect(186, 150, 12, 12); g.strokeRect(186, 150, 12, 12); moon(g, 192, 156, 3.5, 1);
        drawPerson(g, 288, 210, { look: mate, scale: 0.86, t: reduce ? 0 : t * 0.7, dir: -0.3 });
        g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1; g.setLineDash([1.5, 3.5]); line(g, 284, 162, bx - 6, by + rh * 1.5); g.restore();
        // you: to the HR door with a note, or staying put
        const yx = lerp(128, 76, rep);
        drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: rep > 0.5 ? -0.7 : lerp(0.6, 0.1, let_), moving: rep > 0.05 && rep < 0.95, walk: t * 3, rArm: [lerp(6, 3, let_), lerp(-6, 5, let_)] });
        const pu = ease(clamp01((rep - 0.6) / 0.4));
        paper(g, lerp(yx + 20, 38, pu), lerp(170, 204, pu), 12, 15, 0, (1 - let_ * 0.9) * (1 - clamp01((rep - 0.92) * 12)));
        thread(g, yx + 12, 172, 202, 172, 16, 0.9, rep > 0.5);
      },
    },

    // ---------------------------------------------------------------- D5 The Unearned Advantage
    hiring: {
      base(v) { sc.x.v = v; sset({ pickA: 0, pickB: 0 }); },
      acts: { 'D5-A': { pickA: 1 }, 'D5-B': { pickB: 1 } },
      async act(a) { await actor(this.acts, 0.8)(a); },
      draw(g, t) {
        const pa = V('pickA'), pb = V('pickB'), any = Math.max(pa, pb);
        indoor(g);
        // your office, and the hallway through the open door
        g.strokeStyle = INK; g.lineWidth = 1.6; line(g, 236, 20, 236, 96); line(g, 236, 96, 276, 96); line(g, 276, 20, 276, 96);
        g.fillStyle = PAPER; g.beginPath(); g.moveTo(276, 96); g.lineTo(290, 104); g.lineTo(290, 214); g.lineTo(276, 210); g.closePath(); g.fill(); g.stroke();
        g.strokeStyle = HAIR; g.lineWidth = 1; line(g, 236, 96, 236, 210);
        desk(g, 70, 196, 172);
        const shown = [[112, 0.08], [150, -0.06]];
        shown.forEach(([x, r], i) => { paper(g, x, 164, 22, 13, r, 1); if (i === 0) star(g, x + 8, 160, 3.2, 1, true); });
        drawPerson(g, 134, 184, { me: true, scale: 0.9, t, sit: any < 0.6, dir: lerp(0.6, 0.8, any) });
        // the mentor who shaped your career, asking a favour
        const men = npcLook(561), kid = npcLook(563), other = npcLook(565);
        inFrame(g, 66, 58, 34, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 32, 82, 100, 82);
          drawPerson(o, 66, 84, { look: men, scale: 0.6, t, dir: 0.4, rArm: [6, -12] });
        });
        // two chairs in the hall, two candidates
        chair(g, 316, 190, 1, 214, 1); chair(g, 364, 190, 1, 214, 1);
        const walkIn = (u, x0) => [lerp(x0, 222, ease(clamp01(u))), u > 0.05 ? 212 : 190];
        const [ax, ay] = walkIn(pa, 316), [bx2, by2] = walkIn(pb, 364);
        drawPerson(g, ax, ay, { look: other, scale: 0.88, t, sit: pa < 0.05, dir: pa > 0.05 ? -0.8 : lerp(-0.5, 0.2, pb), moving: pa > 0.05 && pa < 0.95, walk: t * 3 });
        drawPerson(g, bx2, by2, { look: kid, scale: 0.88, t, sit: pb < 0.05, dir: pb > 0.05 ? -0.8 : lerp(-0.5, 0.2, pa), moving: pb > 0.05 && pb < 0.95, walk: t * 3 });
        star(g, ax + 2, ay - 52, 4, 1, true);
        thread(g, 94, 72, bx2 + 4, by2 - 40, 30, 0.75, pa > 0.5);
      },
    },

    // ---------------------------------------------------------------- D6 The Pension Cut
    pensions: {
      base(v) {
        sc.x.v = v;
        sset({ pub: 0, box: 0, shut: 0, home: 0, ment: 0, still: 0 });
        if (v === 'fuB') sset({ shut: 1 });
      },
      shift(v) {
        if (v === 'fuA') sto({ home: 1 }, 0.9);
        if (v === 'fuB') sto({ ment: 1 }, 0.9);
      },
      acts: {
        'D6-A': { pub: 1 }, 'D6-B': { shut: 1 },
        'D6-FUA-A': { pub: 1 }, 'D6-FUA-B': { shut: 1 },
        'D6-FUB2-A': { pub: 1 }, 'D6-FUB2-B': { still: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.9, async (id, m) => {
          if (m.pub) { if (V('shut') > 0.5) { sto({ shut: 0 }, 1.6); await sleep(900); } sto({ pub: 1 }, 0.8); await sleep(1100); sto({ box: 1 }, 1.4); }
          else sto(m, 1.1);
        })(a);
      },
      draw(g, t) {
        const pub = V('pub'), box = V('box'), shut = V('shut'), home = V('home'), ment = V('ment'), still = V('still');
        indoor(g);
        // night through a tall window; the retirees whose pensions will be cut
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(20, 24, 210, 126); g.strokeRect(20, 24, 210, 126);
        g.save(); g.beginPath(); g.rect(21, 25, 208, 124); g.clip(); skyline(g, 150, 1); moon(g, 206, 44, 7, 1); g.restore();
        g.strokeStyle = INK; g.lineWidth = 1.3; line(g, 125, 24, 125, 150);
        const rx = 94, ry = 74, rr = 42;
        inFrame(g, rx, ry, rr, 1, o => {
          for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) { // rows and rows of people
            const x = rx - 40 + c * 10 + (r % 2) * 5, y = ry - 28 + r * 13;
            o.fillStyle = PAPER; o.strokeStyle = r < 2 ? GRAPH : INK; o.lineWidth = 1;
            o.beginPath(); o.arc(x, y + 9, 5, Math.PI, 0); o.fill(); o.stroke(); ellipse(o, x, y + 1, 3.4, 3.4); o.fill(); o.stroke();
          }
          drawPerson(o, rx - 12, ry + 44, { scale: 0.5, t: reduce ? 0 : t * 0.6, phase: 571, dir: 0.3 });
          drawPerson(o, rx + 12, ry + 44, { scale: 0.48, t: reduce ? 0 : t * 0.6, phase: 572, dir: -0.3 });
        });
        hourglass(g, rx + rr + 4, ry - rr + 8, sc.x.v === 'fuB' ? still : shut, t);
        // fuA: your home and your savings, which the lawsuit would take
        inFrame(g, 290, 58, 30, home * (1 - box * 0.55), o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 260, 78, 320, 78);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.3; o.fillRect(272, 56, 28, 22); o.strokeRect(272, 56, 28, 22);
          o.beginPath(); o.moveTo(268, 56); o.lineTo(286, 42); o.lineTo(304, 56); o.closePath(); o.fill(); o.stroke(); o.strokeRect(282, 66, 8, 12);
          for (let k = 0; k < 4; k++) { o.beginPath(); o.ellipse(310, 75 - k * 3.4, 6, 2, 0, 0, Math.PI * 2); o.fill(); o.stroke(); }
        }, box > 0.5);
        // the agreement you signed, pinned to the wall
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.fillRect(338, 46, 40, 52); g.strokeRect(338, 46, 40, 52);
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let y = 54; y < 80; y += 5) line(g, 343, y, 373, y);
        g.strokeStyle = INK; g.beginPath(); for (let k = 0; k <= 12; k++) { const x = 344 + k * 2.2, y = 88 + Math.sin(k * 1.4) * 2.4; k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
        g.fillStyle = INK; ellipse(g, 358, 44, 2, 2); g.fill();
        // the desk, the laptop with the draft on it
        desk(g, 210, 376, 176);
        const lx = 262, lift = 1 - shut;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(lx - 24, 170, 48, 6); g.strokeRect(lx - 24, 170, 48, 6);
        g.save(); g.translate(lx - 22, 170); g.rotate(-lift * 1.45);
        g.fillStyle = PAPER; g.beginPath(); g.rect(0, -2, 44, 4); g.fill(); g.stroke();
        if (lift > 0.3) { g.beginPath(); g.rect(-0.1, -2, 44, -1); g.stroke(); }
        g.restore();
        if (lift > 0.05) {
          const hh = 32 * lift;
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(lx - 22, 170 - hh, 44, hh); g.strokeRect(lx - 22, 170 - hh, 44, hh);
          if (lift > 0.6) {
            g.save(); g.globalAlpha = (lift - 0.6) * 2.5; g.strokeStyle = GRAPH; g.lineWidth = 1; for (let y = 146; y < 166; y += 4) line(g, lx - 14, y, lx + 4, y);
            g.strokeStyle = INK; g.setLineDash([2, 2]); g.strokeRect(lx + 6, 144, 12, 8); g.restore();
            g.save(); g.globalAlpha = (lift - 0.6) * 1.8; g.strokeStyle = GRAPH; g.lineWidth = 1; for (const an of [-2.4, -2.0, -1.6]) line(g, lx + Math.cos(an) * 26, 152 + Math.sin(an) * 22, lx + Math.cos(an) * 32, 152 + Math.sin(an) * 28); g.restore();
          }
        }
        // A: copies go out to the people it affects, and you pack your desk
        for (let k = 0; k < 3; k++) {
          const u = ease(clamp01(pub * 1.4 - k * 0.2)); if (u <= 0.01 || u >= 0.99) continue;
          paper(g, lerp(lx, rx + 26 - k * 18, u), lerp(150, ry + 6 + k * 6, u) - Math.sin(u * Math.PI) * 34, 12, 15, (k - 1) * 0.3 * u, Math.sin(u * Math.PI) * 1.6);
        }
        if (box > 0.01) {
          g.save(); g.globalAlpha = Math.min(1, box); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
          g.beginPath(); g.moveTo(312, 150); g.lineTo(346, 150); g.lineTo(344, 176); g.lineTo(314, 176); g.closePath(); g.fill(); g.stroke();
          g.lineWidth = 1.2; line(g, 330, 150, 330, 140); for (const [dx, an] of [[-4, -0.6], [4, 0.6]]) { g.save(); g.translate(330 + dx, 140); g.rotate(an); ellipse(g, 0, 0, 2.6, 5.5); g.fill(); g.stroke(); g.restore(); }
          paper(g, 320, 146, 10, 12, -0.2, 1);
          g.restore();
        }
        // you
        const stand = box > 0.5;
        if (!stand) chair(g, 300, 190, 1, 210, 1);
        // fuB: one of them is your grandmother
        thread(g, 260, 62, rx + rr - 2, ry - 6, 8, ment * 0.6, true);
        inFrame(g, 290, 58, 30, ment, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 260, 78, 320, 78);
          chair(o, 292, 66, 1, 78, 1);
          drawPerson(o, 292, 66, { look: Object.assign({}, npcLook(573), { eyes: 'sleepy' }), scale: 0.6, t: reduce ? 0 : t * 0.6, sit: true, dir: lerp(-0.4, 0.3, still) });
        });
        heart(g, 318, 34, 8, ment * (1 - still * 0.5));
        thread(g, 296, 156, 290, 90, 10, ment * (1 - still * 0.5) * 0.8);
        drawPerson(g, stand ? 302 : 300, stand ? 210 : 190, { me: true, scale: 0.9, t, sit: !stand, dir: lerp(-0.6, -0.2, shut), rArm: [lerp(-4, 3, shut), lerp(-2, 5, shut)], lArm: [lerp(-10, -3, shut), lerp(-2, 5, shut)] });
      },
    },

    // ---------------------------------------------------------------- D10 The Housing List
    favor: {
      base(v) { sc.x.v = v; sset({ up: 0, no: 0 }); },
      acts: { 'D10-A': { up: 1 }, 'D10-B': { no: 1 } },
      async act(a) { await actor(this.acts, 0.8)(a); },
      draw(g, t) {
        const up = V('up'), no = V('no');
        indoor(g);
        // the waiting list on the wall: families, in order. Her grandson is last.
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(18, 30, 92, 170); g.strokeRect(18, 30, 92, 170);
        const row = i => 42 + i * 21, u = ease(clamp01(up));
        const card = (y, n, mine) => {
          g.fillStyle = PAPER; g.strokeStyle = mine ? INK : GRAPH; g.lineWidth = mine ? 1.5 : 1.1; g.fillRect(26, y, 76, 15); g.strokeRect(26, y, 76, 15);
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1; for (let k = 0; k < n; k++) { ellipse(g, 36 + k * 9, y + 7.5, k < 2 ? 3 : 2.2, k < 2 ? 3 : 2.2); g.fill(); g.stroke(); }
          g.strokeStyle = HAIR; line(g, 66, y + 7.5, 96, y + 7.5);
        };
        [3, 4, 2, 3, 4, 3, 2].forEach((n, i) => card(lerp(row(i), row(i + 1), u), n, false));
        card(lerp(row(7), row(0), u), 1, true);
        // the apartments everyone is waiting for
        g.save(); g.beginPath(); g.rect(248, 24, 136, 92); g.fillStyle = PAPER; g.fill(); g.strokeStyle = INK; g.lineWidth = 1.5; g.stroke(); g.clip();
        building(g, 280, 40, 70, 116, {});
        g.strokeStyle = INK; g.lineWidth = 1.2; for (const y of [60, 82]) for (const x of [286, 318]) { g.strokeRect(x, y, 22, 4); line(g, x, y + 4, x, y + 10); line(g, x + 22, y + 4, x + 22, y + 10); }
        g.restore();
        // the woman who took you in when you had nowhere to go, and her grandson
        const her = Object.assign({}, npcLook(581), { eyes: 'sleepy' }), son = npcLook(586);
        inFrame(g, 178, 60, 40, 1, o => { // years ago: her open door, and you on the step
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 138, 90, 218, 90);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.fillRect(184, 32, 28, 58); o.strokeRect(184, 32, 28, 58);
          drawPerson(o, 198, 90, { look: her, scale: 0.62, t: 0, dir: -0.5, lArm: [-10, -2] });
          drawPerson(o, 164, 90, { me: true, scale: 0.5, t: 0, dir: 0.5 });
          o.strokeStyle = GRAPH; for (let k = 0; k < 6; k++) line(o, 146 + k * 6, 36 + (k % 3) * 10, 144 + k * 6, 42 + (k % 3) * 10);
        });
        // the counter between you
        const yx = 164;
        drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: lerp(0.6, 0.3, no), lArm: [lerp(-3, -14, up), lerp(5, -12, up)] });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(186, 160, 64, 7); g.fill(); g.stroke(); g.beginPath(); g.rect(192, 167, 52, 43); g.fill(); g.stroke();
        drawPerson(g, 282, 210, { look: her, scale: 0.86, t: reduce ? 0 : t * 0.6, dir: lerp(-0.6, -0.1, no) });
        drawPerson(g, 326, 210, { look: son, scale: 0.9, t, phase: 586, dir: -0.5 });
        thread(g, yx + 10, 172, 270, 172, 18, 0.85, no > 0.5);
        say(g, yx + 8, 124, 40, yx + 4, 146, no);
      },
    },

    // ---------------------------------------------------------------- D11 The Silent Witness
    witness: {
      base(v) {
        sc.x.v = v;
        sset({ ask: 1, whole: 0, part: 0, refuse: 0, jail: 0, held: 0, jury: 0, blame: 0 });
        if (v === 'fuA') sset({ ask: 0, whole: 1 });
        if (v === 'fuB') sset({ ask: 0 });
      },
      shift(v) {
        if (v === 'fuA') sto({ jail: 1 }, 0.9);
        if (v === 'fuB') sto({ jury: 1 }, 0.9);
      },
      acts: {
        'D11-A': { whole: 1, ask: 0 }, 'D11-B': { part: 1, ask: 0 }, 'D11-C': { refuse: 1, ask: 0 },
        'D11-FUA-A': { held: 1 }, 'D11-FUA-B': { whole: 0, part: 1, jail: 0.35 },
        'D11-FUB2-A': { whole: 1 }, 'D11-FUB2-B': { blame: 1 },
      },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const ask = V('ask'), whole = V('whole'), part = V('part'), refuse = V('refuse'), jail = V('jail'), held = V('held'), jury = V('jury'), blame = V('blame');
        indoor(g);
        // the courtroom: columns, the bench, the witness stand
        g.strokeStyle = HAIR; g.lineWidth = 1; for (const x of [40, 120, 280, 360]) { g.strokeRect(x - 8, 20, 16, 182); line(g, x - 12, 20, x + 12, 20); }
        const judge = npcLook(591), bro = npcLook(593), other = npcLook(597);
        drawPerson(g, 200, 104, { look: judge, scale: 0.85, t, sit: true, dir: lerp(0.3, 0.6, refuse) });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.7; g.beginPath(); g.rect(140, 112, 120, 98); g.fill(); g.stroke();
        g.beginPath(); g.rect(134, 106, 132, 7); g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(152, 126, 96, 70);
        query(g, 220, 64, 210, 84, ask);
        // what goes on the record
        const rec = Math.max(whole, part);
        if (rec > 0.01) {
          paper(g, 112, 86, 26, 30, -0.05, rec);
          g.save(); g.globalAlpha = rec; g.translate(112, 86); g.rotate(-0.05); g.strokeStyle = INK; g.lineWidth = 1.2;
          line(g, -8, -6, 8, -6); line(g, -8, 6, 8, 6);
          if (whole > 0.5) line(g, -8, 0, 8, 0); else { g.setLineDash([1.5, 3]); line(g, -8, 0, 8, 0); }
          g.restore();
        }
        // your brother at the defence table
        drawPerson(g, 70, 190, { look: bro, scale: 0.88, t, sit: true, dir: lerp(lerp(0.6, 0.8, refuse), 0.2, held * jail) });
        desk(g, 26, 114, 176);
        // fuA: where your answer would likely send him, a door with a barred window
        inFrame(g, 52, 62, 30, jail, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 22, 84, 82, 84);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.fillRect(40, 46, 24, 38); o.strokeRect(40, 46, 24, 38);
          barred(o, 45, 52, 14, 10, 1);
        }, held < 0.5);
        thread(g, 62, 150, 52, 92, 6, jail * 0.6, true);
        // fuB: the other man, hurt and unable to work, who the court may decide started it
        inFrame(g, 340, 62, 30, jury, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 310, 84, 370, 84);
          chair(o, 332, 72, 1, 84, 1);
          drawPerson(o, 332, 72, { look: other, scale: 0.55, t, sit: true, dir: -0.3, mood: whole > 0.5 ? null : 'worried' });
          o.strokeStyle = INK; o.lineWidth = 1.6; line(o, 356, 84, 352, 56); o.beginPath(); o.arc(355, 56, 3, Math.PI, 0); o.stroke();
        });
        // what he'd get for his injuries: nothing, unless you say it
        envelope(g, 378, 104, jury * whole, 0.6);
        // the court's eye: towards the other man, or (if you say it) towards your brother
        if (jury > 0.01) {
          g.save(); g.strokeStyle = INK; g.lineWidth = 1.2; g.lineCap = 'round';
          g.globalAlpha = jury * (1 - whole) * (0.45 + blame * 0.5); g.setLineDash(blame > 0.5 ? [] : [3, 4]);
          g.beginPath(); g.moveTo(226, 86); g.quadraticCurveTo(272, 40, 308, 58); g.stroke();
          g.globalAlpha = jury * whole * 0.85; g.setLineDash([]);
          g.beginPath(); g.moveTo(170, 96); g.quadraticCurveTo(120, 110, 90, 146); g.stroke();
          g.restore();
        }
        // you, in the witness stand (C: you step down and accept the charge)
        const yx = lerp(320, 378, refuse), stand = refuse < 0.2, yy = lerp(184, 208, clamp01(refuse * 3));
        drawPerson(g, yx, yy, { me: true, scale: 0.9, t, dir: lerp(-0.7, -0.4, refuse), moving: refuse > 0.05 && refuse < 0.95, walk: t * 3 });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(290, 180, 62, 30); g.fill(); g.stroke(); g.beginPath(); g.rect(286, 175, 70, 6); g.fill(); g.stroke();
        thread(g, (stand ? 310 : yx - 10), stand ? 150 : 170, 82, 156, 40, 0.85, whole > 0.5);
        talk(g, yx - 14, 140, 262, 112, Math.max(whole, part), t, 12);
        // B: "I didn't see", a closed eye
        if (part > 0.01) {
          bubble(g, yx - 22, 108, 30, 22, yx - 12, 124, part);
          g.save(); g.globalAlpha = Math.min(1, part); g.strokeStyle = INK; g.lineWidth = 1.4; g.lineCap = 'round';
          g.beginPath(); g.arc(yx - 22, 104, 7, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
          for (const an of [0.3, 0.5, 0.7]) { const a2 = an * Math.PI; line(g, yx - 22 + Math.cos(a2) * 7, 104 + Math.sin(a2) * 7, yx - 22 + Math.cos(a2) * 10, 104 + Math.sin(a2) * 10); }
          g.restore();
        }
        inFrame(g, 340, 62, 30, refuse, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 310, 84, 370, 84);
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.4; o.fillRect(328, 46, 24, 38); o.strokeRect(328, 46, 24, 38);
          barred(o, 333, 52, 14, 10, 1);
        });
      },
    },
  };
  return SCENES;
});
