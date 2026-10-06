// Tern: code-drawn scenes for the Observatory (world 5, the last). Same contract and style as scenes.js.
// The questions here are about the self, so the scenes are quiet: rooms at night, windows, a still sky, round memory frames,
// threads between people. Harm is never shown: the war is a closed box of letters and a medal, the friend who died is a photo
// and an empty chair, the robot is a small gentle machine whose plea is a speech bubble.
// The three quick reads (B50, B51, B52) share one look: you at a telescope, and each option is a different star that brightens.
// Contract: see game/plan.md and game/plan-observatory.md. Variants are step keys ('trunk', 'fu', 'fuA', 'fuB').
(window.TERN_SCENE_PACKS = window.TERN_SCENE_PACKS || []).push(function (h) {
  const { sc, V, sset, sto, sleep, lerp, clamp01, reduce, INK, PAPER, GRAPH, HAIR, ellipse, line, txt, bubble, heart, paper, indoor, drawPerson, npcLook, ridgeY } = h;

  const SANS = size => `700 ${size}px "Quattrocento Sans", sans-serif`;
  const SHADOW = 'rgba(20,20,20,0.10)';
  const TRAIL = '#EDEDE8';
  const ease = u => u * u * (3 - 2 * u);
  const seg = (k, a, b) => ease(clamp01((k - a) / (b - a))); // 0 → 1 while a local value runs from a to b

  // Every scene plays its answer the same calm way: look up the targets, ease towards them, wait.
  // Answer ids come from content-observatory.js; if a follow-up was renamed (fu ↔ fuA/fuB), the same move still plays.
  function lookup(acts, id) {
    if (!id) return null;
    if (acts[id]) return acts[id];
    const alt = [id.replace(/-FU[AB]-/, '-FU-'), id.replace(/-FU-/, '-FUA-'), id.replace(/-FU-/, '-FUB-')].find(k => acts[k]);
    return alt ? acts[alt] : null;
  }
  function actor(acts, rate, extra) {
    return async function (a) {
      const m = a && lookup(acts, a.id);
      if (!m) { await sleep(900); return; }
      if (extra) await extra(a.id, m);
      else sto(m, rate || 1.8);
      await sleep(1300);
    };
  }
  const isFu = v => v === 'fu' || v === 'fuA' || v === 'fuB';
  const sway = (t, k, amp) => reduce ? 0 : Math.sin(t * k) * amp;

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
  function say(g, x, y, w, tx, ty, a) { // a speech bubble with a plain line: someone speaking
    if (a <= 0.01) return;
    bubble(g, x, y, w, 22, tx, ty, a);
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.6; line(g, x - w / 2 + 9, y, x + w / 2 - 9, y); g.restore();
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
  function slots(g, x, y, n, filled, a, size, perRow) { // squares in a row (or rows): years, shares of the work
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
  function bill(g, x, y, a, rot, s) {
    if (a <= 0.01) return;
    s = s || 1;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.rotate(rot || 0); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; g.fillRect(-11, -6, 22, 12); g.strokeRect(-11, -6, 22, 12);
    g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(-8.5, -3.5, 17, 7);
    g.fillStyle = PAPER; g.strokeStyle = INK; ellipse(g, 0, 0, 2.8, 2.8); g.fill(); g.stroke();
    g.restore();
  }
  function cash(g, x, base, n, a) { // a stack of bills seen side-on: one thin layer per bill
    if (a <= 0.01 || n <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.1;
    const whole = Math.ceil(n - 0.05);
    for (let k = 0; k < whole; k++) { const f = clamp01(n - k); g.globalAlpha = Math.min(1, a) * f; g.fillRect(x - 11, base - 3 * (k + 1), 22, 3); g.strokeRect(x - 11, base - 3 * (k + 1), 22, 3); }
    g.restore();
  }
  function envelope(g, x, y, a, s, thick) {
    if (a <= 0.01) return;
    s = s || 1; const th = thick || 0;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
    const hh = 8 + th * 5;
    g.beginPath(); g.roundRect(-13, -hh, 26, 2 * hh, th * 4); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(-13, -hh); g.lineTo(0, -hh + 9 + th * 2); g.lineTo(13, -hh); g.stroke();
    g.restore();
  }
  function chair(g, x, y, face, floor, a) { // a plain side-on chair; seat top at y
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.7; g.lineCap = 'round';
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
  function stars(g, pts, a, col) { // small fixed crosses
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = col || GRAPH; g.lineWidth = 1;
    for (const [x, y, r] of pts) { const k = r || 2; line(g, x - k, y, x + k, y); line(g, x, y - k, x, y + k); }
    g.restore();
  }
  function sparkle(g, x, y, r, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.2; g.lineCap = 'round';
    line(g, x - r, y, x + r, y); line(g, x, y - r, x, y + r); g.restore();
  }
  function door(g, x, top, w, ground, open, o) { // a door that swings open towards you
    o = o || {};
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.strokeRect(x, top, w, ground - top);
    const pw = w * (1 - (open || 0) * 0.75);
    g.beginPath(); g.rect(x, top, pw, ground - top); g.fill(); g.stroke();
    if (o.pane) { g.lineWidth = 1.1; ellipse(g, x + pw / 2, top + 20, 6, 6); g.stroke(); }
    g.lineWidth = 1.3; ellipse(g, x + pw - 5, (top + ground) / 2 + 4, 1.8, 1.8); g.stroke();
  }
  function tick(g, x, y, s, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.8; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(x - 4 * s, y); g.lineTo(x - 1 * s, y + 3 * s); g.lineTo(x + 5 * s, y - 4 * s); g.stroke(); g.restore();
  }
  function suitcase(g, x, y, a) { // y is the case's top edge
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4;
    g.beginPath(); g.roundRect(x - 10, y, 20, 15, 2.5); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(x - 4, y - 4, 8, 5, 2); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, x - 10, y + 6, x + 10, y + 6);
    g.restore();
  }
  function badge(g, x, y, a) { // a work badge on a short clip
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
    g.beginPath(); g.roundRect(x - 6, y - 8, 12, 16, 2); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; ellipse(g, x, y - 2, 2.6, 2.6); g.stroke(); line(g, x - 3.5, y + 4, x + 3.5, y + 4);
    g.strokeStyle = INK; line(g, x - 2, y - 10, x + 2, y - 10);
    g.restore();
  }
  function house(g, x, ground, w, hh, o) { // a cottage: walls, a pitched roof, a door and a window
    o = o || {};
    g.save(); g.fillStyle = PAPER; g.strokeStyle = o.faint ? GRAPH : INK; g.lineWidth = o.lw || 1.4; g.lineJoin = 'round';
    g.beginPath(); g.rect(x, ground - hh, w, hh); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(x - 4, ground - hh); g.lineTo(x + w / 2, ground - hh - w * 0.4); g.lineTo(x + w + 4, ground - hh); g.closePath(); g.fill(); g.stroke();
    g.lineWidth = 1; const dw = Math.min(10, w * 0.24);
    g.strokeRect(x + w * 0.6, ground - dw * 1.7, dw, dw * 1.7);
    g.strokeRect(x + w * 0.16, ground - hh * 0.72, w * 0.26, hh * 0.32);
    if (o.lit) { g.fillStyle = INK; g.fillRect(x + w * 0.16, ground - hh * 0.72, w * 0.26, hh * 0.32); }
    g.restore();
  }
  function roundTree(g, x, ground, s, t, faint) { // a round tree that sways a little
    const sw = sway(t, 0.5, 1.2) * s;
    g.save(); g.strokeStyle = faint ? GRAPH : INK; g.fillStyle = PAPER; g.lineWidth = 1.4; g.lineCap = 'round';
    line(g, x, ground, x + sw * 0.3, ground - 22 * s);
    for (const [dx, dy, r] of [[0, -34, 12], [-9, -27, 9], [9, -27, 9], [0, -44, 8]]) { ellipse(g, x + dx * s + sw, ground + dy * s, r * s, r * s); g.fill(); g.stroke(); }
    g.restore();
  }
  function sun(g, x, y, r, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; ellipse(g, x, y, r, r); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; g.lineCap = 'round';
    for (let k = 0; k < 8; k++) { const an = k * Math.PI / 4; line(g, x + Math.cos(an) * (r + 2.5), y + Math.sin(an) * (r + 2.5), x + Math.cos(an) * (r + 5.5), y + Math.sin(an) * (r + 5.5)); }
    g.restore();
  }
  function cloud(g, x, y, a) { // a small grey cloud: a hard week, carried quietly
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = GRAPH; g.lineWidth = 1.1;
    g.beginPath(); g.arc(x - 5, y, 4, Math.PI * 0.5, Math.PI * 1.5); g.arc(x, y - 3, 5, Math.PI, Math.PI * 2); g.arc(x + 6, y, 4, Math.PI * 1.5, Math.PI * 0.5); g.closePath(); g.fill(); g.stroke();
    g.restore();
  }

  // ---------- the Observatory's furniture ----------
  // the night sky over the plateau: fixed stars, never twinkling
  const SKY = [[16, 22], [44, 52, 1.5], [72, 14], [104, 40, 1.5], [136, 18], [168, 48, 1.5], [196, 12], [228, 34], [262, 54, 1.5], [288, 16], [322, 42, 1.5], [352, 20], [384, 46, 1.5], [58, 84, 1.5], [150, 78, 1.5], [246, 86, 1.5], [340, 80, 1.5]];
  function ridge(g, base, a) { // the plateau's far edge, in hairline, with contour lines below it
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.strokeStyle = HAIR; g.lineWidth = 1;
    g.beginPath(); for (let x = 0; x <= 400; x += 8) { const y = ridgeY(x, base, 10, 0.022, 1.3); x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
    g.beginPath(); for (let x = 0; x <= 400; x += 8) { const y = ridgeY(x, base + 14, 6, 0.03, 4.1); x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
    g.restore();
  }
  function plateau(g, y, n) { // the ground: a line, a few rocks and tufts of dry grass
    g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, y, 400, y);
    g.strokeStyle = GRAPH; g.lineWidth = 1;
    for (let k = 0; k < (n || 9); k++) { const x = (k * 97.3 + 21) % 400, yy = y + 8 + ((k * 31.7) % 28); if (yy > 246) continue; line(g, x, yy, x - 2, yy - 6); line(g, x, yy, x + 2.5, yy - 5); }
    g.fillStyle = PAPER; g.strokeStyle = GRAPH;
    for (const [x, dy, r] of [[34, 20, 5], [262, 30, 4], [372, 16, 6]]) { if (y + dy > 246) continue; g.beginPath(); g.ellipse(x, y + dy, r * 1.4, r, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); }
  }
  function dome(g, x, base, s, a) { // the observatory far off, in hairline
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.translate(x, base); g.scale(s, s);
    g.fillStyle = PAPER; g.strokeStyle = GRAPH; g.lineWidth = 1.1;
    g.beginPath(); g.rect(-14, -14, 28, 14); g.fill(); g.stroke();
    g.beginPath(); g.arc(0, -14, 15, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    line(g, -3, -28.5, -3, -14); line(g, 3, -28.5, 3, -14);
    g.restore();
  }
  function nightWindow(g, x, y, w, hh, o) { // a window onto the night: stars, a crescent, a far ridge
    o = o || {};
    g.save(); if (o.a != null) g.globalAlpha = Math.min(1, o.a);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(x, y, w, hh); g.strokeRect(x, y, w, hh);
    g.save(); g.beginPath(); g.rect(x + 1, y + 1, w - 2, hh - 2); g.clip();
    g.strokeStyle = HAIR; g.lineWidth = 1; g.beginPath();
    for (let k = 0; k <= w; k += 6) { const yy = y + hh - 12 - Math.sin((k + x) * 0.07) * 4 - Math.sin((k + x) * 0.19) * 1.5; k ? g.lineTo(x + k, yy) : g.moveTo(x + k, yy); } g.stroke();
    stars(g, [[x + w * 0.18, y + hh * 0.22], [x + w * 0.44, y + hh * 0.42, 1.5], [x + w * 0.7, y + hh * 0.16], [x + w * 0.84, y + hh * 0.5, 1.5], [x + w * 0.3, y + hh * 0.58, 1.5]], 1);
    if (o.moon !== false) moon(g, x + w * 0.62, y + hh * 0.3, 5, 1);
    g.restore();
    g.strokeStyle = INK; g.lineWidth = 1.2; line(g, x + w / 2, y, x + w / 2, y + hh);
    g.restore();
  }
  function lamp(g, x, y, a) { // a small desk lamp; y is the table top
    g.save(); if (a != null) g.globalAlpha = Math.min(1, a);
    g.strokeStyle = INK; g.lineWidth = 1.4; g.lineCap = 'round'; line(g, x - 6, y, x + 6, y); line(g, x, y, x - 4, y - 16); line(g, x - 4, y - 16, x + 4, y - 24);
    g.fillStyle = PAPER; g.beginPath(); g.moveTo(x + 1, y - 27); g.lineTo(x + 11, y - 21); g.lineTo(x + 7, y - 16); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; for (const an of [0.25, 0.45]) line(g, x + 9 + Math.cos(an * Math.PI) * 3, y - 17 + Math.sin(an * Math.PI) * 3, x + 9 + Math.cos(an * Math.PI) * 9, y - 17 + Math.sin(an * Math.PI) * 9);
    g.restore();
  }
  function portrait(g, x, y, r, a, look) { // a framed photo on the wall: head and shoulders of someone
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a);
    g.strokeStyle = INK; g.lineWidth = 1; line(g, x, y - r - 9, x - 8, y - r + 1); line(g, x, y - r - 9, x + 8, y - r + 1);
    g.fillStyle = INK; ellipse(g, x, y - r - 9, 1.6, 1.6); g.fill();
    g.restore();
    inFrame(g, x, y, r, a, o => { o.strokeStyle = HAIR; o.lineWidth = 1; line(o, x - r, y + r * 0.62, x + r, y + r * 0.62); drawPerson(o, x, y + r * 0.62, { look: Object.assign({}, look, { eyes: 'dots' }), scale: r / 30, t: 2, dir: 0.15 }); });
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 2.4; ellipse(g, x, y, r + 2.5, r + 2.5); g.stroke(); g.restore();
  }
  function shelf(g, x1, x2, y) {
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.rect(x1, y, x2 - x1, 4); g.fill(); g.stroke();
    g.lineWidth = 1.2; line(g, x1 + 8, y + 4, x1 + 14, y + 12); line(g, x2 - 8, y + 4, x2 - 14, y + 12);
  }
  function keepbox(g, x, y, open, a, medal) { // a plain wooden box; y is its bottom; open 0..1 lifts the lid back
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.lineJoin = 'round';
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
    g.beginPath(); g.rect(x - 18, y - 16, 36, 16); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, x - 18, y - 8, x + 18, y - 8);
    g.save(); g.translate(x - 19, y - 16); g.rotate(-open * 1.9);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.rect(0, -5, 38, 5); g.fill(); g.stroke();
    g.restore();
    g.restore();
    if (medal > 0.01 && open < 0.2) medalAt(g, x + 6, y - 26, medal * (a == null ? 1 : a)); // the medal, resting on the closed lid
  }
  function medalAt(g, x, y, a) { // the medal on its own: a ribbon and a disc
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.2; g.fillStyle = PAPER;
    g.beginPath(); g.moveTo(x - 4, y - 12); g.lineTo(x + 4, y - 12); g.lineTo(x + 2, y - 4); g.lineTo(x - 2, y - 4); g.closePath(); g.fill(); g.stroke();
    ellipse(g, x, y, 4.2, 4.2); g.fill(); g.stroke(); g.restore();
  }
  function laptop(g, x, y, lid, lines, a) { // side-on-ish laptop on a desk; y is the desk top. lid 1 open … 0 shut. lines 0..1 of text left
    g.save(); if (a != null) g.globalAlpha = Math.min(1, a);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.lineJoin = 'round';
    g.beginPath(); g.rect(x - 26, y - 4, 52, 4); g.fill(); g.stroke();
    const hh = 34 * lid;
    if (hh > 1.5) {
      g.beginPath(); g.rect(x - 24, y - 4 - hh, 48, hh); g.fill(); g.stroke();
      const n = 6;
      g.strokeStyle = GRAPH; g.lineWidth = 1;
      for (let k = 0; k < n; k++) {
        const yy = y - 4 - hh + 6 + k * 4.4 * lid, f = clamp01(lines * n - k);
        if (f <= 0.01 || yy > y - 7) continue;
        const w = (k === n - 1 ? 22 : 38) * f; line(g, x - 19, yy, x - 19 + w, yy);
      }
    }
    g.restore();
  }
  function telescope(g, x, ground, an, s) { // a small telescope on a tripod; an is the tube's angle (0 = level, pointing right)
    s = s || 1;
    g.save(); g.translate(x, ground); g.scale(s, s); g.lineCap = 'round'; g.lineJoin = 'round';
    g.fillStyle = SHADOW; ellipse(g, 0, 0, 22, 3); g.fill();
    g.strokeStyle = INK; g.lineWidth = 1.7; line(g, 0, -38, -16, 0); line(g, 0, -38, 16, 0); line(g, 0, -38, 2, 0);
    g.save(); g.translate(0, -40); g.rotate(an);
    g.fillStyle = PAPER; g.lineWidth = 1.6;
    g.beginPath(); g.roundRect(-20, -5, 46, 10, 2); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(26, -6.5, 8, 13, 2); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(-27, -3, 8, 6, 1.5); g.fill(); g.stroke();
    g.restore();
    g.fillStyle = INK; ellipse(g, 0, -40, 2.4, 2.4); g.fill();
    g.restore();
  }
  function bench(g, x, ground, w) { // a plain bench, side-on; seat at ground - 22
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.rect(x, ground - 24, w, 5); g.fill(); g.stroke();
    line(g, x + 6, ground - 19, x + 6, ground); line(g, x + w - 6, ground - 19, x + w - 6, ground);
    line(g, x + 4, ground - 42, x + w - 4, ground - 42); line(g, x + 6, ground - 42, x + 6, ground - 24); line(g, x + w - 6, ground - 42, x + w - 6, ground - 24);
  }
  function armchair(g, x, seat, floor, face) { // a soft armchair, side-on; face 1 looks right
    g.save(); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
    const bx = x - face * 20;
    g.beginPath(); g.roundRect(bx - 6, seat - 40, 12, 46, 5); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(x - 20, seat, 40, 10, 4); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(x + face * 14 - 4, seat - 12, 8, 22, 3); g.fill(); g.stroke();
    line(g, x - 16, seat + 10, x - 16, floor); line(g, x + 16, seat + 10, x + 16, floor);
    g.restore();
  }
  function tablet(g, x, y, rot, a, heartFill, heartA) { // a tablet with a small speech bubble and a heart on its screen
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.rotate(rot || 0);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.roundRect(-9, -12, 18, 24, 2.5); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(-6.5, -9, 13, 17);
    g.restore();
    if (heartA > 0.01) heart(g, x, y - 6, 9, Math.min(1, a) * heartA, heartFill);
  }
  function helix(g, x, y, a, flip) { // a small card with a twisted ladder on it: the edit. flip 1 turns it face down
    if (a <= 0.01) return;
    const sx = Math.max(0.06, Math.abs(Math.cos(flip * Math.PI)));
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.scale(sx, 1);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.roundRect(-13, -17, 26, 34, 3); g.fill(); g.stroke();
    if (flip < 0.5) {
      g.lineWidth = 1.2;
      for (const ph of [0, Math.PI]) { g.beginPath(); for (let k = 0; k <= 12; k++) { const yy = -12 + k * 2, xx = Math.sin(k * 0.55 + ph) * 6; k ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); }
      g.strokeStyle = GRAPH; g.lineWidth = 1; for (let k = 1; k < 12; k += 2) { const yy = -12 + k * 2; line(g, Math.sin(k * 0.55) * 6, yy, Math.sin(k * 0.55 + Math.PI) * 6, yy); }
    } else { g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(-8, -12, 16, 24); }
    g.restore();
  }
  function robot(g, x, ground, o) { // a small, old, gentle machine: a rounded box on two short feet, two round lenses
    o = o || {};
    const shut = clamp01(o.shut || 0), lk = o.look || 0;
    g.save(); g.translate(x, ground); g.lineJoin = 'round'; g.lineCap = 'round';
    g.fillStyle = SHADOW; ellipse(g, 0, 0, 24, 3); g.fill();
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
    for (const fx of [-13, 5]) { g.beginPath(); g.roundRect(fx, -6, 8, 6, 2); g.fill(); g.stroke(); }
    g.lineWidth = 1.4; line(g, -21, -24, -25, -14); line(g, 21, -24, 25, -14);
    g.lineWidth = 1.7; g.beginPath(); g.roundRect(-21, -42, 42, 36, 9); g.fill(); g.stroke();
    g.lineWidth = 1.3; line(g, 0, -42, 0, -49); g.fillStyle = shut > 0.5 ? PAPER : INK; ellipse(g, 0, -51, 2.4, 2.4); g.fill(); g.stroke();
    for (const ex of [-8.5, 8.5]) {
      g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; ellipse(g, ex, -28, 6.2, 6.2); g.fill(); g.stroke();
      g.fillStyle = INK;
      if (shut < 0.92) { ellipse(g, ex + lk * 2, -28, 2.6, 2.6 * (1 - shut)); g.fill(); }
      else { g.lineWidth = 1.2; line(g, ex - 3, -28, ex + 3, -28); }
    }
    g.strokeStyle = GRAPH; g.lineWidth = 1; for (const dy of [-18, -13]) line(g, 8, dy, 16, dy); g.strokeRect(-16, -16, 5, 5);
    g.restore();
  }
  function stones(g, x, ground, n, a) { // a small stack of flat stones, built up by hand
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
    const S = [[0, -6, 17, 6], [-1, -17, 14, 5.5], [1, -27, 11, 5], [0, -36, 8.5, 4.5], [0.5, -43.5, 6, 3.6]];
    S.slice(0, n || 5).forEach(([dx, dy, rx, ry]) => { g.beginPath(); g.ellipse(x + dx, ground + dy, rx, ry, 0, 0, Math.PI * 2); g.fill(); g.stroke(); });
    g.restore();
  }
  function pennant(g, x, base, hgt, a, t, flat) { // a tall thin flag; flat 1 lays it on the ground
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, base); g.rotate(-flat * Math.PI / 2 * 0.98);
    g.strokeStyle = INK; g.lineWidth = 1.6; g.lineCap = 'round'; line(g, 0, 0, 0, -hgt);
    const w = sway(t, 0.9, 1.5) * (1 - flat);
    g.fillStyle = INK; g.beginPath(); g.moveTo(0, -hgt); g.quadraticCurveTo(10, -hgt + 3 + w, 20, -hgt + 6 + w); g.lineTo(0, -hgt + 12); g.closePath(); g.fill();
    g.restore();
  }
  function firepit(g, x, y) { // a cold fire pit: a ring of stones and two crossed logs, no flame
    g.save(); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2;
    g.lineWidth = 2; g.strokeStyle = GRAPH; line(g, x - 12, y - 6, x + 10, y + 1); line(g, x + 12, y - 6, x - 10, y + 1);
    g.lineWidth = 1.2; g.strokeStyle = INK;
    for (let k = 0; k < 10; k++) { const an = k / 10 * Math.PI * 2, sx = x + Math.cos(an) * 22, sy = y + Math.sin(an) * 6; g.beginPath(); g.ellipse(sx, sy, 4.5, 3, 0, 0, Math.PI * 2); g.fill(); g.stroke(); }
    g.restore();
  }
  function log(g, x, y, w) { // a log seat, end-on to the right
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4;
    g.beginPath(); g.roundRect(x - w / 2, y - 7, w, 7, 3.5); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; ellipse(g, x + w / 2 - 2, y - 3.5, 2, 3); g.stroke();
  }
  function signpost(g, x, ground, la, ra) { // a post with two blank arms, one up to the left, one up to the right
    g.save(); g.strokeStyle = INK; g.fillStyle = PAPER; g.lineWidth = 2.2; g.lineCap = 'round'; line(g, x, ground, x, ground - 64);
    g.lineWidth = 1.4; g.lineJoin = 'round';
    const arm = (dir, y, a) => {
      g.save(); g.translate(x, y); g.rotate(dir * -0.16); g.scale(dir, 1);
      g.beginPath(); g.moveTo(2, -6); g.lineTo(34, -6); g.lineTo(41, 0); g.lineTo(34, 6); g.lineTo(2, 6); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, 8, 0, 8 + 22 * a, 0);
      g.restore();
    };
    arm(-1, ground - 52, la); arm(1, ground - 38, ra);
    g.restore();
  }
  function milestone(g, x, ground) { // a short wooden trail post with two bands
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
    g.beginPath(); g.rect(x - 4, ground - 30, 8, 30); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(x - 4, ground - 30); g.lineTo(x, ground - 34); g.lineTo(x + 4, ground - 30); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, x - 4, ground - 24, x + 4, ground - 24); line(g, x - 4, ground - 20, x + 4, ground - 20);
  }
  function tower(g, x, top, w, ground, a, faint) { // a plain city block, for the places you'd leave or go to
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = faint ? GRAPH : INK; g.lineWidth = faint ? 1.1 : 1.4;
    g.beginPath(); g.rect(x, top, w, ground - top); g.fill(); g.stroke();
    g.strokeStyle = faint ? HAIR : GRAPH; g.lineWidth = 1;
    for (let yy = top + 6; yy < ground - 8; yy += 10) for (let xx = x + 4; xx < x + w - 5; xx += 8) g.strokeRect(xx, yy, 3.5, 5);
    g.restore();
  }
  function starRow(g, x, y, filled, a, s) { // a one-to-five star rating
    if (a <= 0.01) return;
    s = s || 1;
    g.save(); g.globalAlpha = Math.min(1, a); g.lineJoin = 'round';
    for (let k = 0; k < 5; k++) {
      const cx = x + k * 11 * s; g.beginPath();
      for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, rr = (i % 2 ? 2 : 4.6) * s; i ? g.lineTo(cx + Math.cos(an) * rr, y + Math.sin(an) * rr) : g.moveTo(cx + Math.cos(an) * rr, y + Math.sin(an) * rr); }
      g.closePath(); g.fillStyle = k < filled ? INK : PAPER; g.fill(); g.strokeStyle = INK; g.lineWidth = 1; g.stroke();
    }
    g.restore();
  }
  // the machine: a deck chair under a soft canopy on one pole; a cable runs from the pole to a small box
  function canopyChair(g, x, ground, a) {
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.lineJoin = 'round'; g.lineCap = 'round';
    g.strokeStyle = INK; g.fillStyle = PAPER; g.lineWidth = 1.7;
    line(g, x - 32, ground - 24, x + 14, ground - 24); line(g, x + 14, ground - 24, x + 32, ground - 64);
    line(g, x - 28, ground - 24, x - 32, ground); line(g, x + 10, ground - 24, x + 14, ground);
    line(g, x + 46, ground, x + 46, ground - 96);
    g.lineWidth = 1.5; g.beginPath(); g.moveTo(x - 40, ground - 88); g.quadraticCurveTo(x + 4, ground - 118, x + 52, ground - 98);
    for (let k = 0; k < 6; k++) { const x1 = lerp(x + 52, x - 40, (k + 1) / 6), y1 = lerp(ground - 98, ground - 88, (k + 1) / 6); g.quadraticCurveTo(lerp(x + 52, x - 40, (k + 0.5) / 6), lerp(ground - 98, ground - 88, (k + 0.5) / 6) + 5, x1, y1); }
    g.closePath(); g.fill(); g.stroke();
    g.restore();
  }
  function plugBox(g, x, ground, out, a) { // the box the cable runs to; out 0 plugged in … 1 pulled out
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
    g.beginPath(); g.roundRect(x - 12, ground - 30, 24, 30, 3); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1; ellipse(g, x, ground - 20, 4.5, 4.5); g.stroke(); line(g, x, ground - 20, x + 3, ground - 23);
    g.fillStyle = out > 0.5 ? PAPER : INK; g.strokeStyle = INK; ellipse(g, x - 6, ground - 8, 1.8, 1.8); g.fill(); g.stroke();
    g.restore();
  }

  // ---------- the quick reads: one telescope, a still sky, one star per option ----------
  // Every quick read has the same look; only the sky's arrangement changes from stop to stop.
  // The option stars are spread evenly and drawn the same, so none looks like the right one.
  function quick(qid, seed, moonAt) {
    const letters = ['A', 'B', 'C', 'D'];
    const opts = [[176, 74], [234, 42], [292, 70], [350, 40]].map(([x, y], k) => [x, y + ((seed * 7 + k * 13) % 3) * 6 - 6]);
    const far = []; for (let k = 0; k < 16; k++) far.push([(k * 71 + seed * 37) % 390 + 6, 12 + ((k * 53 + seed * 29) % 110), 1.4]);
    const acts = {}; letters.forEach((L, k) => { acts[`${qid}-${L}`] = { pick: k + 1 }; });
    return {
      base(v) { sc.x.v = v; sset({ aim: 0, glow: 0, pick: 0 }); sc.x.pick = 0; },
      acts,
      async act(a) {
        const m = a && acts[a.id];
        if (!m) { await sleep(900); return; }
        sc.x.pick = m.pick; sto({ aim: 1 }, 1.4); await sleep(900); sto({ glow: 1 }, 1.0); await sleep(1500);
      },
      draw(g, t) {
        const aim = V('aim'), glow = V('glow'), k = sc.x.pick;
        ridge(g, 150, 0.9); dome(g, 352, 170, 0.9, 0.7);
        stars(g, far.filter(([x, y]) => !opts.some(([ox, oy]) => Math.hypot(ox - x, oy - y) < 18)), 0.75);
        if (moonAt) moon(g, moonAt[0], moonAt[1], 6, 1);
        plateau(g, 196, 6);
        // the option stars, all alike until one brightens
        opts.forEach(([x, y], i) => {
          const on = k === i + 1 ? glow : 0;
          g.save(); g.strokeStyle = INK; g.lineWidth = 1.3; g.lineCap = 'round';
          const r = 4 + on * 4; line(g, x - r, y, x + r, y); line(g, x, y - r, x, y + r);
          g.lineWidth = 1; const d = 2 + on * 2.2; line(g, x - d, y - d, x + d, y + d); line(g, x + d, y - d, x - d, y + d);
          g.restore();
          if (on > 0.01) { g.save(); g.globalAlpha = on * 0.8; g.strokeStyle = GRAPH; g.lineWidth = 1; ellipse(g, x, y, 13 + on * 3, 13 + on * 3); g.stroke(); g.restore(); }
        });
        // the telescope turns to the chosen star; you at the eyepiece
        const tx = 108, ground = 210, py = ground - 40;
        const rest = -0.5, target = k ? Math.atan2(opts[k - 1][1] - py, opts[k - 1][0] - tx) : rest;
        const an = lerp(rest, target, ease(clamp01(aim)));
        telescope(g, tx, ground, an, 1);
        drawPerson(g, tx - 40, ground, { me: true, scale: 0.9, t, dir: 0.5, rArm: [lerp(6, 12, aim), lerp(-2, -10, aim)] });
      },
    };
  }

  // ---------- the memory frames: a string of small round photos ----------
  function garland(g, x0, x1, y, n, dark, gone, t, a) {
    a = a == null ? 1 : a;
    const sag = 14, at = u => [lerp(x0, x1, u), y + 4 * sag * u * (1 - u)];
    g.save(); g.globalAlpha = a; g.strokeStyle = GRAPH; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y); g.quadraticCurveTo((x0 + x1) / 2, y + 2 * sag, x1, y); g.stroke(); g.restore();
    const pos = [];
    for (let k = 0; k < n; k++) {
      const [px, py] = at((k + 0.5) / n), r = 11, cy = py + 15 + r, sw = sway(t, 0.6 + k * 0.07, 0.6);
      pos.push([px + sw, cy]);
      g.save(); g.globalAlpha = a; g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, px, py, px + sw, cy - r); g.restore();
      if (k === dark) {
        const gn = clamp01(gone);
        faded(g, a * (1 - gn), o => { o.fillStyle = INK; o.strokeStyle = INK; o.lineWidth = 1.5; ellipse(o, px + sw, cy, r, r); o.fill(); o.stroke(); o.strokeStyle = PAPER; o.lineWidth = 1; ellipse(o, px + sw, cy, r - 3.5, r - 3.5); o.stroke(); });
        if (gn > 0.01) frame(g, px + sw, cy, r, a * gn, true);
        continue;
      }
      inFrame(g, px + sw, cy, r, a, o => {
        const cx = px + sw; o.strokeStyle = GRAPH; o.fillStyle = PAPER; o.lineWidth = 1;
        const kind = k % 4;
        if (kind === 0) { line(o, cx - 10, cy + 6, cx + 10, cy + 6); line(o, cx + 3, cy + 6, cx + 3, cy); ellipse(o, cx + 3, cy - 3, 4, 4); o.fill(); o.stroke(); line(o, cx - 7, cy + 6, cx - 7, cy + 2); ellipse(o, cx - 7, cy, 2.4, 2.4); o.fill(); o.stroke(); }
        if (kind === 1) { o.beginPath(); o.moveTo(cx - 11, cy + 7); o.quadraticCurveTo(cx - 3, cy - 2, cx + 4, cy + 3); o.quadraticCurveTo(cx + 8, cy, cx + 11, cy + 4); o.stroke(); line(o, cx - 8, cy - 5, cx - 4, cy - 5); line(o, cx - 6, cy - 7, cx - 6, cy - 3); }
        if (kind === 2) { o.strokeRect(cx - 4, cy - 1, 8, 7); o.beginPath(); o.moveTo(cx - 6, cy - 1); o.lineTo(cx, cy - 6); o.lineTo(cx + 6, cy - 1); o.stroke(); }
        if (kind === 3) { line(o, cx - 9, cy + 4, cx + 9, cy + 4); for (const dx of [-5, 0, 5]) { line(o, cx + dx, cy + 4, cx + dx, cy - 3); ellipse(o, cx + dx, cy - 5, 2, 2); o.stroke(); } }
      });
    }
    return pos;
  }

  const SCENES = {
    // ---------------------------------------------------------------- B47 The Perfect Life Machine
    lifemachine: {
      base(v) {
        sc.x.v = v;
        sset({ walk: 0, plug: 0, away: 0, wire: 0, unplug: 0, stay: 0, love: 0, gone: 0, stayout: 0 });
      },
      // fuA (after Yes): the person you love most comes to the room and won't go in. fuB (after No): this life is already the machine's.
      shift(v) { if (v === 'fuA') sto({ love: 1 }, 0.8); else if (isFu(v)) sto({ wire: 1 }, 0.8); },
      acts: {
        'B47-A': { plug: 1 }, 'B47-B': { away: 1 },
        'B47-FUA-A': { plug: 1, gone: 1 }, 'B47-FUA-B': { stayout: 1 },
        'B47-FUB-A': { unplug: 1 }, 'B47-FUB-B': { stay: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.8, async (id, m) => {
          if (m.plug) { sto({ walk: 1 }, 1.2); await sleep(1300); sto({ plug: 1, gone: m.gone || 0 }, 0.9); }
          else sto(m, 0.8);
        })(a);
      },
      draw(g, t) {
        if (sc.x.v === 'fu' || sc.x.v === 'fuB') {
          // you learn this life is already the machine's: a cable runs from it to a box.
          // Outside it, faint: the real world, a steeper and rockier slope under a plain sky.
          const wire = V('wire'), unplug = V('unplug'), stay = V('stay');
          const real = clamp01(0.4 + unplug * 0.6 - stay * 0.25);
          faded(g, real, o => {
            stars(o, SKY.filter(([x, y]) => x < 70 || x > 300 || y > 70), 1);
            o.strokeStyle = INK; o.lineWidth = 1.4; o.beginPath(); o.moveTo(0, 226); o.quadraticCurveTo(200, 214, 400, 168); o.stroke();
            o.strokeStyle = HAIR; o.lineWidth = 1; o.beginPath(); o.moveTo(0, 150); o.quadraticCurveTo(140, 120, 260, 100); o.quadraticCurveTo(340, 86, 400, 70); o.stroke();
            o.fillStyle = PAPER; o.strokeStyle = GRAPH;
            for (const [x, y, r] of [[40, 230, 7], [96, 228, 5], [262, 206, 8], [318, 196, 6], [372, 180, 9], [150, 238, 6]]) { o.beginPath(); o.ellipse(x, y, r * 1.5, r, 0, Math.PI, 0); o.closePath(); o.fill(); o.stroke(); }
            o.save(); o.strokeStyle = GRAPH; o.setLineDash([2, 4]); o.beginPath(); o.moveTo(206, 220); o.lineTo(300, 196); o.lineTo(250, 180); o.lineTo(352, 152); o.stroke(); o.restore();
          });
          // the life you have: a frame you are standing in
          const fx = 176, fy = 112, fr = 98, inside = 1 - unplug;
          inFrame(g, fx, fy, fr, inside, o => {
            o.strokeStyle = HAIR; o.lineWidth = 1; o.beginPath(); o.moveTo(fx - fr, fy + 40); o.quadraticCurveTo(fx - 20, fy + 10, fx + fr, fy + 34); o.stroke();
            sun(o, fx + 46, fy - 50, 8, 1);
            house(o, fx - 76, fy + 70, 40, 30);
            roundTree(o, fx + 58, fy + 70, 1, t);
            drawPerson(o, fx + 22, fy + 70, { scale: 0.8, t, phase: 4701, dir: -0.5 });
            o.strokeStyle = INK; o.lineWidth = 1.4; line(o, fx - fr, fy + 70, fx + fr, fy + 70);
          });
          sparkle(g, fx - 70, fy - 62, 3, stay * 0.9); sparkle(g, fx + 82, fy - 30, 2.5, stay * 0.9);
          thread(g, 172, 140, 190, 142, 8, inside * 0.7);
          // the cable from the edge of the frame to the box
          const bx = 362, bg = 222, ex = lerp(bx - 12, bx - 30, unplug), ey = lerp(bg - 8, bg - 2, unplug);
          if (wire > 0.01) {
            g.save(); g.globalAlpha = wire * (1 - unplug * 0.6); g.strokeStyle = INK; g.lineWidth = 1.5; g.lineCap = 'round';
            g.beginPath(); g.moveTo(fx + fr * 0.82, fy + fr * 0.56); g.quadraticCurveTo(310, lerp(236, 244, unplug), ex, ey); g.stroke();
            g.fillStyle = PAPER; g.beginPath(); g.roundRect(ex - 6, ey - 4, 8, 8, 2); g.fill(); g.stroke();
            g.restore();
            plugBox(g, bx, bg, unplug, wire);
          }
          // you: inside the frame, or (unplugged) out on the real slope
          const yx = lerp(156, 214, unplug), yy = lerp(182, 204, unplug);
          drawPerson(g, yx, yy, { me: true, scale: 0.9, t, dir: unplug > 0.5 ? 0.7 : 0.4, moving: unplug > 0.05 && unplug < 0.95, walk: t * 3 });
          return;
        }
        // trunk: your room at night, and beside it the machine with the life it would give you
        const walk = V('walk'), plug = V('plug'), away = V('away'), love = V('love'), gone = V('gone'), stayout = V('stayout');
        indoor(g);
        nightWindow(g, 28, 40, 80, 72, { a: 1 - plug * 0.6 });
        // the people who rely on you, looked after: a small round photo of two of them at home, a heart over them
        inFrame(g, 130, 52, 17, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 113, 62, 147, 62);
          drawPerson(o, 124, 62, { scale: 0.28, t, phase: 4704, dir: 0.4 });
          drawPerson(o, 136, 62, { scale: 0.24, t, phase: 4705, dir: -0.4 });
        });
        heart(g, 130, 26, 7, 0.8);
        const mx = 282;
        canopyChair(g, mx, 210, 1);
        g.save(); g.strokeStyle = INK; g.lineWidth = 1.4; g.lineCap = 'round'; g.beginPath(); g.moveTo(mx + 46, 176); g.quadraticCurveTo(360, 186, 372, 182); g.stroke(); g.restore();
        plugBox(g, 378, 210, 0, 1);
        // the life it gives: deep, happy, full; it would feel completely real
        const lx = 198, ly = 62, lr = 46, la = lerp(0.85, 1, plug) * (1 - away * 0.6) * (1 - stayout * 0.6);
        inFrame(g, lx, ly, lr, la, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; o.beginPath(); o.moveTo(lx - lr, ly + 30); o.quadraticCurveTo(lx, ly + 10, lx + lr, ly + 26); o.stroke();
          sun(o, lx + 22, ly - 22, 6, 1);
          house(o, lx - 34, ly + 26, 24, 18);
          drawPerson(o, lx + 2, ly + 38, { me: true, scale: 0.42, t, dir: 0.4 });
          drawPerson(o, lx + 20, ly + 38, { scale: 0.42, t, phase: 4702, dir: -0.4 });
          o.strokeStyle = INK; o.lineWidth = 1.2; line(o, lx - lr, ly + 38, lx + lr, ly + 38);
        });
        thread(g, mx - 20, 112, lx + 20, ly + lr - 4, 4, la * 0.55, true);
        sparkle(g, lx - 52, ly - 30, 3, plug); sparkle(g, lx + 54, ly - 18, 2.5, plug); sparkle(g, lx + 40, ly + 50, 2, plug);
        // follow-up (after Yes): the person you love most, by the window; they won't go in. Plug in and they fade from your life
        const lvx = 56;
        if (love > 0.01) ghost(g, love * (1 - gone * 0.7), lvx, 210, { scale: 0.86, t, phase: 4703, dir: stayout > 0.5 ? 0.6 : 0.3 });
        // you: you walk over and lie back under the hood, or you turn to the window, or you go to the one you love
        let yx = mx - 8;
        if (plug > 0.5) drawPerson(g, mx - 8, 186, { me: true, scale: 0.9, t, sit: true, dir: -0.3 });
        else {
          yx = lerp(lerp(lerp(166, mx - 40, ease(walk)), 70, ease(away)), lvx + 30, ease(stayout));
          const moving = [walk, away, stayout].some(k => k > 0.05 && k < 0.95);
          drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: away > 0.05 || stayout > 0.05 ? -0.5 : 0.5, moving, walk: t * 3 });
        }
        if (love > 0.01) thread(g, lvx + 10, 176, plug > 0.5 ? mx - 18 : yx - 10, plug > 0.5 ? 160 : 176, 12, love * 0.7 * (1 - gone));
      },
    },

    // ---------------------------------------------------------------- B48 The Erased Memory
    memory: {
      base(v) {
        sc.x.v = v;
        sset({ erase: 0, keep: 0, them: 0, support: 0, ask: 0 });
        if (isFu(v)) sset({ them: 0 });
      },
      shift(v) { if (isFu(v)) sto({ them: 1 }, 0.8); },
      acts: {
        'B48-A': { erase: 1 }, 'B48-B': { keep: 1 },
        'B48-FU-A': { support: 1 }, 'B48-FU-B': { ask: 1 },
      },
      async act(a) { await actor(this.acts, 1.3)(a); },
      draw(g, t) {
        const erase = V('erase'), keep = V('keep');
        indoor(g);
        if (isFu(sc.x.v)) {
          // someone you love, across the table, with their own string of memories. One of them is also one of yours.
          const them = V('them'), sup = V('support'), ask = V('ask');
          nightWindow(g, 168, 92, 64, 54, { moon: true });
          const mine = garland(g, 12, 190, 14, 5, 3, 0, t);
          const theirs = garland(g, 210, 388, 14, 5, 1, sup, t, them);
          desk(g, 150, 250, 170);
          chair(g, 112, 186, 1, 210, 1); chair(g, 288, 186, -1, 210, them);
          drawPerson(g, 112, 186, { me: true, scale: 0.9, t, sit: true, dir: 0.5, rArm: [lerp(3, 14, sup), lerp(7, -2, sup)] });
          ghost(g, them, 288, 186, { scale: 0.9, t, phase: 4801, sit: true, dir: -0.5 });
          thread(g, 126, 156, 274, 156, 16, them * 0.7);
          // the shared one: a dashed link between the two dark frames
          const [dx1, dy1] = mine[3], [dx2, dy2] = theirs[1];
          thread(g, dx1 + 10, dy1 + 6, dx2 - 10, dy2 + 6, -14, them * (1 - sup) * 0.7, true);
          say(g, 148, 120, 40, 132, 136, ask);
          return;
        }
        // trunk: you, at a table, at night; above you a string of memories, and the most painful one among them
        nightWindow(g, 300, 96, 70, 58);
        garland(g, 14, 386, 12, 8, 5, erase, t);
        desk(g, 168, 270, 172);
        chair(g, 136, 186, 1, 210, 1);
        drawPerson(g, 136, 186, { me: true, scale: 0.9, t, sit: true, dir: lerp(0.4, 0.8, keep), lArm: [-3, 7], rArm: [lerp(3, 10, keep), lerp(7, -14, keep)] });
        lamp(g, 246, 172, 1);
      },
    },

    // ---------------------------------------------------------------- B49 Two Lives
    twolives: {
      base(v) { sc.x.v = v; sset({ left: 0, right: 0 }); },
      acts: { 'B49-A': { left: 1 }, 'B49-B': { right: 1 } },
      async act(a) { await actor(this.acts, 1.0)(a); },
      draw(g, t) {
        const L = V('left'), R = V('right');
        stars(g, SKY.filter(([x, y]) => y < 24 || (x > 140 && x < 260)), 0.8);
        ridge(g, 132, 1);
        // the fork in the trail, and the signpost where it splits
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 152, 400, 152);
        const legs = [[[190, 250], [192, 226], [200, 206]], [[200, 206], [168, 176], [104, 154]], [[200, 206], [232, 176], [296, 154]]];
        g.save(); g.lineCap = 'round'; g.strokeStyle = TRAIL;
        legs.forEach(([a, c, b], k) => { g.lineWidth = k ? 16 : 22; g.beginPath(); g.moveTo(a[0], a[1]); g.quadraticCurveTo(c[0], c[1], b[0], b[1]); g.stroke(); });
        g.strokeStyle = GRAPH; g.lineWidth = 1; g.setLineDash([2, 5]);
        legs.forEach(([a, c, b]) => { g.beginPath(); g.moveTo(a[0], a[1]); g.quadraticCurveTo(c[0], c[1], b[0], b[1]); g.stroke(); });
        g.restore();
        signpost(g, 200, 208, L, R);
        // left: a happy, ordinary life
        const lx = 84, ly = 74, lr = 50, la = clamp01(1 - R * 0.6);
        inFrame(g, lx, ly, lr, la, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, lx - lr, ly + 30, lx + lr, ly + 30);
          sun(o, lx - 26, ly - 26, 6, 1);
          house(o, lx - 4, ly + 30, 34, 24);
          roundTree(o, lx - 24, ly + 30, 0.55, t);
          drawPerson(o, lx + 2, ly + 46, { me: true, scale: 0.44, t, dir: 0.3 });
          drawPerson(o, lx + 22, ly + 46, { scale: 0.44, t, phase: 4901, dir: -0.3 });
          o.strokeStyle = INK; o.lineWidth = 1.2; line(o, lx - lr, ly + 46, lx + lr, ly + 46);
        });
        // right: a harder life, often unhappy, that makes something people use long after you're gone
        const rx = 316, ry = 74, rr = 50, ra = clamp01(1 - L * 0.6);
        inFrame(g, rx, ry, rr, ra, o => {
          o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1.2; o.fillRect(rx + 10, ry - 34, 24, 22); o.strokeRect(rx + 10, ry - 34, 24, 22);
          moon(o, rx + 24, ry - 26, 3.5, 1);
          desk(o, rx - 30, rx + 14, ry + 14, ry + 46);
          lamp(o, rx - 22, ry + 14, 1);
          for (const [dx, r] of [[-6, -0.1], [2, 0.08]]) paper(o, rx + dx, ry + 10, 10, 6, r, 1);
          drawPerson(o, rx + 26, ry + 46, { me: true, scale: 0.46, t, dir: -0.5, mood: 'worried', lArm: [-8, -2] });
          o.strokeStyle = INK; o.lineWidth = 1.2; line(o, rx - rr, ry + 46, rx + rr, ry + 46);
        });
        // what it leaves: many people, later, under a dashed line of time
        const fa = clamp01(0.45 + R * 0.55 - L * 0.25);
        g.save(); g.globalAlpha = fa; g.strokeStyle = GRAPH; g.lineWidth = 1; g.setLineDash([2, 3]); line(g, rx + rr - 4, ry + 22, 384, 142); g.restore();
        faded(g, fa, o => {
          for (let k = 0; k < 9; k++) {
            const x = 300 + (k % 5) * 18 + (k > 4 ? 9 : 0), y = k > 4 ? 152 : 144;
            o.fillStyle = PAPER; o.strokeStyle = R > 0.5 ? INK : GRAPH; o.lineWidth = 1;
            o.beginPath(); o.arc(x, y + 5, 3.4, Math.PI, 0); o.fill(); o.stroke(); ellipse(o, x, y, 2.2, 2.2); o.fill(); o.stroke();
          }
        });
        // you, at the fork: you take one of the paths
        const qL = ease(L), qR = ease(R);
        const yx = lerp(lerp(176, 126, qL), 276, qR), yy = lerp(244, 170, Math.max(qL, qR));
        const s = lerp(0.9, 0.66, Math.max(qL, qR));
        drawPerson(g, yx, yy, { me: true, scale: s, t, dir: L > 0.05 ? -0.6 : R > 0.05 ? 0.6 : 0, moving: [L, R].some(k => k > 0.05 && k < 0.95), walk: t * 3 });
      },
    },

    // ---------------------------------------------------------------- B14 The Proud Thing
    proud: {
      base(v) {
        sc.x.v = v;
        sset({ me: 0, help: 0, plant: 0, down: 0, hold: 0 });
        if (isFu(v)) sset({ help: 1 }); // the follow-up comes after "mostly luck and help"
      },
      shift(v) { if (isFu(v)) sto({ hold: 1 }, 1); },
      acts: {
        'B14-A': { me: 1 }, 'B14-B': { help: 1 },
        'B14-FU-A': { plant: 1 }, 'B14-FU-B': { down: 1 },
      },
      async act(a) { await actor(this.acts, 1.1)(a); },
      draw(g, t) {
        const me = V('me'), help = V('help'), plant = V('plant'), down = V('down'), fu = isFu(sc.x.v);
        stars(g, SKY, 0.8);
        ridge(g, 120, 1);
        plateau(g, 206);
        bench(g, 18, 206, 70);
        // the thing you're proud of: something built up, stone by stone; no one can tell what it is
        const sx = 214, sg = 206;
        stones(g, sx, sg, 5, 1);
        // the luck: one star overhead
        const lux = 176, luy = 30;
        g.save(); g.strokeStyle = INK; g.lineWidth = 1.3; g.lineCap = 'round'; const lr = 4 + help * 1.5;
        line(g, lux - lr, luy, lux + lr, luy); line(g, lux, luy - lr, lux, luy + lr); g.lineWidth = 1; line(g, lux - 2, luy - 2, lux + 2, luy + 2); line(g, lux + 2, luy - 2, lux - 2, luy + 2); g.restore();
        // the help: people who were there
        const helpers = [[290, 4141], [324, 4142], [358, 4143]];
        const ha = clamp01(0.5 + help * 0.5 - me * 0.25);
        helpers.forEach(([x, ph]) => ghost(g, ha, x, sg, { scale: 0.78, t, phase: ph, dir: -0.5 }));
        // the threads: from the stones to you, to the people who helped, to the star
        const mineA = clamp01(0.5 + me * 0.5 - help * 0.2), othersA = clamp01(0.4 + help * 0.6 - me * 0.25);
        const yx = 160;
        thread(g, sx - 8, sg - 30, yx + 8, sg - 30, 10, mineA * 0.85, me < 0.5 && help < 0.5, 1.1 + me * 0.6);
        helpers.forEach(([x]) => thread(g, sx + 10, sg - 34, x - 6, sg - 36, 12, othersA * 0.7, help < 0.5, 1.1 + help * 0.4));
        thread(g, sx, sg - 50, lux, luy + 6, -6, othersA * 0.6, help < 0.5);
        // follow-up: you hold a pennant for it, then plant it on top, or lay it down at the foot
        const hold = V('hold');
        const px = lerp(lerp(yx + 14, sx + 1, ease(plant)), sx - 28, ease(down)), pb = lerp(lerp(sg - 18, sg - 47, ease(plant)), sg, ease(down)) - Math.sin(ease(Math.max(plant, down)) * Math.PI) * 10;
        if (fu) pennant(g, px, pb, lerp(40, 30, ease(down)), hold, t, 0);
        drawPerson(g, yx, sg, { me: true, scale: 0.9, t, dir: 0.5, rArm: fu && plant < 0.5 && down < 0.5 ? [6, 0] : [lerp(3, 12, Math.max(plant, down)), lerp(7, -10, Math.max(plant, down))] });
      },
    },

    // ---------------------------------------------------------------- B26 The Pleading Robot
    robot: {
      base(v) { sc.x.v = v; sset({ wipe: 0, spare: 0, plea: 1, odds: 0, boss: 0, said: 0 }); },
      // fuA (after Wipe it): the makers' note, a 1 in 10 chance it feels. fuB (after No): your boss at the door, and tomorrow's worker
      shift(v) { if (v === 'fuA') sto({ odds: 1 }, 0.8); if (v === 'fuB') sto({ boss: 1, said: 1 }, 0.8); },
      acts: {
        'B26-A': { wipe: 1 }, 'B26-B': { spare: 1 },
        'B26-FUA-A': { wipe: 1 }, 'B26-FUA-B': { spare: 1 },
        'B26-FUB-A': { spare: 1 }, 'B26-FUB-B': { wipe: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.8, async (id, m) => {
          sto({ plea: 0, said: 0 }, 1.6);
          sto(m, 1.0);
        })(a);
      },
      draw(g, t) {
        const wipe = V('wipe'), spare_ = V('spare'), plea = V('plea'), odds = V('odds'), boss = V('boss'), said = V('said');
        indoor(g);
        nightWindow(g, 150, 30, 70, 56);
        // the workshop door, and the bench where the old machine sits
        door(g, 16, 96, 42, 210, Math.max(spare_, boss) * 0.7, { pane: true });
        desk(g, 250, 388, 166, 210);
        robot(g, 318, 166, { shut: wipe, look: lerp(-0.6, -1, spare_) });
        say(g, 300, 96, 44, 312, 112, plea);
        // no one can tell whether it feels: a dashed heart with a question in it, beside the machine
        g.save(); g.setLineDash([2.5, 2.5]); heart(g, 362, 106, 22, 0.75 * (1 - wipe * 0.6)); g.restore();
        txt(g, '?', 362, 118, 12, 0.85 * (1 - wipe * 0.6), SANS(12));
        // follow-up (after Wipe it): a note from its makers, one square in ten filled
        if (odds > 0.01) {
          g.save(); g.globalAlpha = odds; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; g.fillRect(72, 40, 72, 30); g.strokeRect(72, 40, 72, 30); g.restore();
          txt(g, '1 in 10', 108, 50, 9, odds, SANS(9));
          slots(g, 76, 58, 10, 1, odds, 4);
        }
        // follow-up (after No): your boss in the doorway, and faint, the one who'll wipe it tomorrow
        if (boss > 0.01) {
          ghost(g, boss, 38, 210, { look: npcLook(2602), scale: 0.86, t, dir: 0.4 });
          say(g, 70, 112, 40, 48, 132, said);
          ghost(g, boss * 0.3 * (1 - wipe), 128, 210, { scale: 0.84, t, phase: 2603, dir: 0.5 });
        }
        // the console with its switch and a row of lights that runs as the wipe goes
        const cx = 214, cy = 112;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.roundRect(cx - 24, cy, 48, 54, 3); g.fill(); g.stroke();
        line(g, cx, cy + 54, cx, 210); line(g, cx - 12, 210, cx + 12, 210);
        g.strokeStyle = HAIR; g.lineWidth = 1; g.beginPath(); g.moveTo(cx + 24, cy + 24); g.quadraticCurveTo(270, cy + 36, 300, 148); g.stroke();
        g.save(); g.translate(cx, cy + 18); g.strokeStyle = INK; g.lineWidth = 1.4; g.strokeRect(-9, -8, 18, 16);
        g.lineWidth = 2.2; g.lineCap = 'round'; const sw = lerp(-0.6, 0.6, ease(wipe)); line(g, 0, 0, Math.sin(sw) * 8, -Math.cos(sw) * 8); g.restore();
        slots(g, cx - 18, cy + 38, 5, wipe * 5, 1, 5);
        // you, with your work badge; refusing could cost you the job
        const yx = lerp(lerp(178, 190, wipe), 94, ease(spare_));
        drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: spare_ > 0.5 ? 0.2 : 0.5, moving: spare_ > 0.05 && spare_ < 0.95, walk: t * 3,
          rArm: wipe > 0.05 ? [lerp(3, 12, wipe), lerp(7, -16, wipe)] : [3, 7] });
        const bq = ease(clamp01(spare_ * 1.6));
        badge(g, lerp(yx + 19, cx, bq), lerp(194, cy - 9, bq) - Math.sin(bq * Math.PI) * 18, 1);
      },
    },

    // ---------------------------------------------------------------- B27 The AI Companion
    companion: {
      base(v) {
        sc.x.v = v;
        sset({ tell: 0, quiet: 0, ask: 0, truth: 0, yes: 0, doc: 0, docSay: 0 });
        if (v === 'fu' || v === 'fuB') sset({ quiet: 1 });
      },
      // fuA (after Tell them): their doctor comes in and speaks to you first. fuB (after No): your parent asks you directly
      shift(v) { if (v === 'fuA') sto({ doc: 1, docSay: 1 }, 0.8); else if (isFu(v)) sto({ ask: 1 }, 1); },
      acts: {
        'B27-A': { tell: 1 }, 'B27-B': { quiet: 1 },
        'B27-FUA-A': { tell: 1 }, 'B27-FUA-B': { quiet: 1 },
        'B27-FUB-A': { truth: 1 }, 'B27-FUB-B': { yes: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.8, async (id, m) => {
          sto({ ask: 0, docSay: 0 }, 2);
          if (m.tell || m.truth || m.yes) { sto({ speak: 1 }, 1.6); await sleep(1100); sto({ speak: 0 }, 1.6); }
          sto(m, 0.8);
        })(a);
      },
      draw(g, t) {
        const tell = V('tell'), quiet = V('quiet'), ask = V('ask'), truth = V('truth'), yes = V('yes'), speak = V('speak'), doc = V('doc'), docSay = V('docSay');
        indoor(g);
        nightWindow(g, 22, 34, 84, 68);
        // follow-up (after Tell them): their doctor, with a clipboard, beside you; their medicine bottle on the side table
        if (doc > 0.01) {
          ghost(g, doc, 352, 210, { look: npcLook(2702), scale: 0.86, t, dir: -0.4 });
          paper(g, 338, 178, 10, 13, -0.1, doc);
          say(g, 336, 100, 40, 346, 120, docSay);
          g.save(); g.globalAlpha = doc; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2;
          g.fillRect(56, 166, 9, 14); g.strokeRect(56, 166, 9, 14); g.fillStyle = INK; g.fillRect(55, 162, 11, 4); g.restore();
        }
        // your parent in their armchair, with the companion on a tablet. It says it loves them
        const px = 150, seat = 180;
        armchair(g, px, seat, 210, 1);
        const parent = npcLook(2701);
        const honest = Math.max(tell, truth), setDown = honest;
        drawPerson(g, px, seat, { look: parent, scale: 0.88, t, sit: true, dir: lerp(0.2, 0.6, Math.max(setDown, ask)), rArm: [lerp(9, 4, setDown), lerp(3, 7, setDown)] });
        // a side table; the tablet moves there once they know what it is
        desk(g, 52, 96, 180, 210);
        const tq = ease(clamp01(setDown));
        tablet(g, lerp(px + 22, 76, tq), lerp(176, 166, tq) - Math.sin(tq * Math.PI) * 14, lerp(0.35, 0, tq), 1, honest < 0.5, 1 - honest * 0.35);
        // you: standing near them, or sitting down beside them
        const sx = 262, sitting = quiet > 0.5;
        chair(g, sx, 188, -1, 210, 1);
        const yx = sitting ? sx : lerp(300, sx, quiet);
        drawPerson(g, yx, sitting ? 188 : 210, { me: true, scale: 0.9, t, sit: sitting, dir: -0.5, moving: quiet > 0.05 && quiet < 0.5, walk: t * 3 });
        thread(g, yx - 10, sitting ? 160 : 176, px + 10, 150, 14, 0.75);
        // they ask you; you answer
        query(g, px + 22, 98, px + 10, 116, ask);
        say(g, yx - 24, sitting ? 108 : 92, 40, yx - 10, sitting ? 124 : 110, speak);
        talk(g, yx - 14, sitting ? 150 : 140, px + 14, 136, speak, t);
        sparkle(g, px + 36, 154, 2.5, yes * 0.8);
      },
    },

    // ---------------------------------------------------------------- B39 The Edited Child
    edited: {
      base(v) {
        sc.x.v = v;
        sset({ edit: 0, no: 0, ahead: 0, join: 0, beside: 0 });
      },
      shift(v) { if (isFu(v)) sto({ ahead: 1 }, 0.35); },
      acts: {
        'B39-A': { edit: 1 }, 'B39-B': { no: 1 },
        'B39-FU-A': { join: 1 }, 'B39-FU-B': { beside: 1 },
      },
      async act(a) { await actor(this.acts, 1.1)(a); },
      draw(g, t) {
        if (isFu(sc.x.v)) {
          // most children around you were edited; they're walking ahead up the hill. Yours walks at their own pace.
          const ahead = V('ahead'), join = V('join'), beside = V('beside');
          stars(g, SKY.filter(([x, y]) => y < 40), 0.7);
          g.save(); g.fillStyle = TRAIL; g.strokeStyle = HAIR; g.lineWidth = 1;
          g.beginPath(); g.moveTo(0, 236); g.quadraticCurveTo(200, 210, 400, 104); g.lineTo(400, 130); g.quadraticCurveTo(210, 232, 0, 250); g.closePath(); g.fill(); g.stroke(); g.restore();
          const yAt = x => lerp(244, 116, x / 400) + Math.sin(x / 400 * Math.PI) * 12;
          const kids = [[230, 3901], [262, 3902], [292, 3903], [322, 3904]];
          kids.forEach(([x0, ph], i) => {
            const x = x0 + ahead * 40 + i * 2, y = yAt(x);
            drawPerson(g, x, y, { scale: 0.48, t, phase: ph, dir: 0.6, moving: ahead > 0.05 && ahead < 0.95, walk: t * 3 + i });
            sparkle(g, x + 9, y - 30, 2, 0.7);
          });
          const kx = lerp(110, 280, ease(join)) + ease(beside) * 44, ky = yAt(kx);
          drawPerson(g, kx, ky, { scale: 0.5, t, phase: 3905, dir: 0.6, moving: (join > 0.05 && join < 0.95) || (beside > 0.05 && beside < 0.95), walk: t * 3 });
          sparkle(g, kx + 9, ky - 30, 2, join * 0.7);
          const yx = join > 0.01 ? lerp(66, 90, join) : lerp(66, kx - 30, ease(beside)), yy = yAt(yx);
          drawPerson(g, yx, yy, { me: true, scale: 0.9, t, dir: 0.6, moving: beside > 0.05 && beside < 0.95, walk: t * 3 });
          thread(g, yx + 10, yy - 30, kx - 4, ky - 18, 8, 0.7);
          return;
        }
        // trunk: the swing on the tree where a child might play; the child you might have, in a dashed frame; the edit on a card
        const edit = V('edit'), no = V('no');
        stars(g, SKY.filter(([x, y]) => x > 160 && y < 50), 0.7);
        plateau(g, 212, 5);
        const tx = 64;
        g.save(); g.strokeStyle = INK; g.fillStyle = PAPER; g.lineWidth = 2; line(g, tx, 212, tx, 90); g.lineWidth = 1.7; line(g, tx, 120, tx + 66, 104);
        for (const [dx, dy, r] of [[-6, -128, 22], [22, -140, 20], [48, -130, 22], [8, -150, 18], [-24, -116, 14]]) { g.lineWidth = 1.4; ellipse(g, tx + dx, 212 + dy, r, r); g.fill(); g.stroke(); }
        const sw = sway(t, 0.7, 0.04);
        g.translate(tx + 50, 108); g.rotate(sw); g.lineWidth = 1.2; line(g, -8, 0, -8, 72); line(g, 8, 0, 8, 72); g.lineWidth = 1.6; g.fillRect(-12, 72, 24, 4); g.strokeRect(-12, 72, 24, 4);
        g.restore();
        const fx = 210, fy = 70, fr = 40;
        inFrame(g, fx, fy, fr, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, fx - fr, fy + 24, fx + fr, fy + 24);
          drawPerson(o, fx, fy + 24, { scale: 0.42, t, phase: 3906, dir: 0.2 });
        }, true);
        sparkle(g, fx - 26, fy - 22, 2.5, edit); sparkle(g, fx + 28, fy - 14, 2, edit);
        // you, and the card with the edit
        const yx = 226;
        drawPerson(g, yx, 212, { me: true, scale: 0.9, t, dir: lerp(0.5, -0.3, no), rArm: [lerp(5, 12, edit), lerp(5, -6, edit)] });
        thread(g, yx - 4, 168, fx + 8, fy + fr, 10, 0.6);
        desk(g, 284, 372, 176, 212);
        helix(g, 328, 156, 1, no);
        // the edit goes in: a small mark travels from the card into the frame
        if (edit > 0.01 && edit < 0.98) { const q = ease(edit); sparkle(g, lerp(328, fx + 10, q), lerp(140, fy + 6, q) - Math.sin(q * Math.PI) * 24, 3, Math.sin(q * Math.PI)); }
        tick(g, 340, 132, 0.9, edit);
      },
    },

    // ---------------------------------------------------------------- B06 The Unread Manuscript
    manuscript: {
      base(v) { sc.x.v = v; sset({ del: 0, share: 0, shut: 0, fam: 0, famSay: 0, give: 0 }); },
      // both follow-ups: your friend's family comes to the room and speaks to you
      shift(v) { if (isFu(v)) sto({ fam: 1, famSay: 1 }, 0.8); },
      acts: {
        'B06-A': { del: 1 }, 'B06-B': { share: 1 },
        'B06-FUA-A': { del: 1 }, 'B06-FUA-B': { give: 1 },
        'B06-FUB-A': { share: 1 }, 'B06-FUB-B': { del: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.7, async (id, m) => {
          sto({ famSay: 0 }, 1.6);
          if (m.del) { sto({ del: 1 }, 0.7); await sleep(1500); sto({ shut: 1 }, 1.2); }
          else if (m.give) sto({ give: 1 }, 0.7);
          else sto({ share: 1 }, 0.8);
        })(a);
      },
      draw(g, t) {
        const del = V('del'), share = V('share'), shut = V('shut'), fam = V('fam'), famSay = V('famSay'), give = V('give');
        indoor(g);
        nightWindow(g, 300, 28, 80, 64);
        // your friend's photo on the wall, and their empty chair across the desk
        portrait(g, 70, 64, 22, 1, npcLook(601));
        chair(g, 92, 184, 1, 210, 1);
        desk(g, 118, 262, 168);
        // the promise: a dashed thread from their photo to the laptop
        thread(g, 86, 82, 168, 126, 6, 0.6 * (1 - Math.max(share, give) * 0.85), true);
        // follow-ups: their family, by the empty chair, asking you
        if (fam > 0.01) {
          ghost(g, fam, 22, 210, { look: npcLook(602), scale: 0.84, t, dir: 0.5 });
          ghost(g, fam, 50, 210, { look: npcLook(603), scale: 0.72, t, dir: 0.4 });
          say(g, 48, 122, 40, 32, 142, famSay);
        }
        // given to the family: the pages go to them, and stay with them
        for (let k = 0; k < 3; k++) {
          const q = ease(clamp01(give * 1.6 - k * 0.25)); if (q <= 0.01) continue;
          paper(g, lerp(190, 36 + k * 6, q), lerp(130, 176 - k * 2, q) - Math.sin(q * Math.PI) * 30, 12, 15, q * 0.3, 1);
        }
        // the laptop: the file you opened by accident, extraordinary
        laptop(g, 186, 168, 1 - shut, 1 - del, 1);
        sparkle(g, 216, 116, 2.5, (1 - del) * (1 - share) * (1 - give) * 0.8);
        // shared: the pages go out to people you'll never meet
        const rx = 340, ry = 140, rr = 30;
        inFrame(g, rx, ry, rr, share, o => {
          for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
            const x = rx - 18 + c * 12 + (r % 2) * 6, y = ry - 10 + r * 11;
            o.fillStyle = PAPER; o.strokeStyle = INK; o.lineWidth = 1; o.beginPath(); o.arc(x, y + 5, 3.4, Math.PI, 0); o.fill(); o.stroke(); ellipse(o, x, y, 2.2, 2.2); o.fill(); o.stroke();
          }
        });
        for (let k = 0; k < 3; k++) {
          const q = ease(clamp01(share * 1.6 - k * 0.25)); if (q <= 0.01 || q >= 0.99) continue;
          paper(g, lerp(190, rx, q), lerp(130, ry, q) - Math.sin(q * Math.PI) * 30, 12, 15, q * 0.6, Math.sin(q * Math.PI));
        }
        // you at the desk
        chair(g, 270, 184, -1, 210, 1);
        drawPerson(g, 270, 184, { me: true, scale: 0.9, t, sit: true, dir: -0.5, lArm: [lerp(-6, -12, Math.max(del, share, give)), lerp(2, -4, Math.max(del, share, give))] });
      },
    },

    // ---------------------------------------------------------------- B08 The Family Secret
    secret: {
      base(v) {
        sc.x.v = v;
        sset({ tell: 0, keep: 0, gran: 0, carry: 0 });
        if (isFu(v)) sset({ carry: 1 });
      },
      shift(v) { if (isFu(v)) sto({ gran: 1 }, 0.8); },
      acts: {
        'B08-A': { tell: 1 }, 'B08-B': { keep: 1 },
        'B08-FU-A': { tell: 1 }, 'B08-FU-B': { keep: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.8, async (id, m) => {
          if (V('carry') < 0.5) { sto({ carry: 1 }, 1.6); await sleep(900); }
          sto(m, 1.5); await sleep(500);
        })(a);
      },
      draw(g, t) {
        const tell = V('tell'), keep = V('keep'), gran = V('gran'), carry = V('carry');
        indoor(g);
        // your grandfather's photo, a high shelf, and the family at the table talking
        const gp = npcLook(801);
        portrait(g, 196, 56, 20, 1, gp);
        shelf(g, 20, 98, 72);
        const fam = [[268, 802], [312, 803], [356, 804]];
        const turn = ease(tell);
        fam.forEach(([x, ph], i) => drawPerson(g, x, 210, { scale: 0.84, t, phase: ph, dir: lerp(i === 0 ? 0.5 : -0.4, i === 2 ? -0.6 : 0.2, turn) }));
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(246, 182, 140, 6); g.fill(); g.stroke(); line(g, 254, 188, 254, 210); line(g, 378, 188, 378, 210);
        talk(g, 270, 150, 350, 150, (1 - tell) * 0.8, t, 8);
        // follow-up: your grandmother, whose whole life was built around him
        if (gran > 0.01) {
          armchair(g, 196, 186, 210, -1);
          ghost(g, gran, 196, 186, { scale: 0.86, t, phase: 805, sit: true, dir: lerp(-0.1, 0.5, turn) });
          thread(g, 190, 140, 184, 84, 18, gran * 0.6);
        }
        // the box of letters, his medal on its lid: on the small table, then in your hands; opened on the family's table, or put up on the high shelf
        desk(g, 24, 88, 180, 210);
        const q = ease(carry), u = ease(tell), up = ease(keep);
        const yx = lerp(lerp(lerp(104, 126, q), 226, u), 94, up);
        const hx = yx + 22, hy = 186;
        let bx = lerp(56, hx, q), by = lerp(180, hy, q) - Math.sin(q * Math.PI) * 10;
        if (tell > 0.01) { const k = seg(tell, 0.55, 1); bx = lerp(hx, 318, k); by = lerp(hy, 182, k) - Math.sin(k * Math.PI) * 14; }
        if (keep > 0.01) { const k = seg(keep, 0.5, 1); bx = lerp(hx, 60, k); by = lerp(hy, 72, k); }
        keepbox(g, bx, by, seg(tell, 0.75, 1) * 0.85, 1, 1 - seg(tell, 0.75, 1));
        if (tell > 0.8) {
          const k = clamp01((tell - 0.8) / 0.2);
          paper(g, 286, 176, 16, 10, -0.2, k); paper(g, 350, 177, 16, 10, 0.15, k); medalAt(g, 298, 174, k);
        }
        // you, carrying it
        const lifting = keep > 0.4 && keep < 0.97;
        drawPerson(g, yx, 210, { me: true, scale: 0.9, t, dir: tell > 0.05 ? 0.6 : keep > 0.05 ? -0.6 : 0.4, moving: [tell, keep].some(k => k > 0.05 && k < 0.6) || (carry > 0.05 && carry < 0.95), walk: t * 3,
          rArm: lifting ? [8, -22] : carry > 0.3 && tell < 0.6 ? [10, -2] : [3, 7] });
      },
    },

    // ---------------------------------------------------------------- B11 The Bully's Son
    bullyson: {
      base(v) { sc.x.v = v; sset({ other: 0, son: 0 }); },
      acts: { 'B11-A': { other: 1 }, 'B11-B': { son: 1 } },
      async act(a) { await actor(this.acts, 0.9)(a); },
      draw(g, t) {
        const other = V('other'), son = V('son');
        indoor(g);
        nightWindow(g, 150, 30, 64, 52);
        door(g, 10, 96, 40, 210, Math.max(other, son) * 0.7, { pane: true });
        // long ago: a bigger kid over a smaller you. Nothing more is shown
        const mx = 330, my = 64, mr = 42;
        inFrame(g, mx, my, mr, 1, o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, mx - mr, my + 30, mx + mr, my + 30);
          drawPerson(o, mx - 10, my + 30, { scale: 0.7, t: 2, phase: 1101, dir: 0.6 });
          drawPerson(o, mx + 16, my + 30, { me: true, scale: 0.44, t: 2, dir: -0.3, mood: 'worried' });
        }, true);
        // the two candidates, equally strong (the same row of marks over each), and your desk
        const C = [[74, 1102, true], [126, 1103, false]];
        C.forEach(([x, ph, isSon]) => {
          const leaves = isSon ? other : son, gets = isSon ? son : other;
          const sitting = leaves < 0.05;
          chair(g, x, 186, 1, 210, 1 - leaves * 0.4);
          slots(g, x - 18, 108, 5, 5, 1 - leaves * 0.7, 5);
          const lx = lerp(x, 4, ease(leaves));
          ghost(g, 1 - clamp01((leaves - 0.85) * 7), sitting ? x : lx, sitting ? 186 : 210, { scale: 0.84, t, phase: ph, sit: sitting, dir: leaves > 0.05 ? -0.7 : 0.5, moving: leaves > 0.05 && leaves < 0.95, walk: t * 3 });
          if (gets > 0.01) badge(g, lerp(250, x + 14, ease(gets)), lerp(160, 156, ease(gets)) - Math.sin(ease(gets) * Math.PI) * 16, 1);
        });
        // a dashed thread from the memory to the son
        thread(g, mx - 28, my + 26, 82, 140, 10, 0.6 * (1 - other * 0.7), true);
        desk(g, 200, 300, 170);
        chair(g, 318, 186, -1, 210, 1);
        drawPerson(g, 318, 186, { me: true, scale: 0.9, t, sit: true, dir: -0.5, lArm: [lerp(-4, -14, Math.max(other, son)), lerp(4, -6, Math.max(other, son))] });
        if (other < 0.01 && son < 0.01) badge(g, 250, 160, 1);
        for (const [x, r] of [[222, -0.06], [276, 0.06]]) paper(g, x, 164, 20, 7, r, 1);
      },
    },

    // ---------------------------------------------------------------- B16 The Shared Bonus
    sharedbonus: {
      base(v) {
        sc.x.v = v;
        sset({ equal: 0, work: 0, lay: 0, ask: 0, letgo: 0 });
      },
      shift(v) { if (isFu(v)) sto({ lay: 1 }, 0.9); }, // the others lay out four equal piles
      acts: {
        'B16-A': { equal: 1 }, 'B16-B': { work: 1 },
        'B16-FU-A': { ask: 1 }, 'B16-FU-B': { letgo: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.8, async (id, m) => {
          if (m.ask) { sto({ speak: 1 }, 1.6); await sleep(1100); sto({ speak: 0 }, 1.4); }
          sto(m, 0.8);
        })(a);
      },
      draw(g, t) {
        const equal = V('equal'), work = V('work'), lay = V('lay'), ask = V('ask'), letgo = V('letgo'), speak = V('speak');
        const fu = isFu(sc.x.v);
        stars(g, SKY.filter(([x, y]) => y < 40), 0.7);
        ridge(g, 112, 1);
        plateau(g, 212, 5);
        // the four of you behind the picnic table; over each of you, how much of the work you did
        const P = [[110, 'me', 6], [172, 1601, 2], [234, 1602, 2], [296, 1603, 2]];
        P.forEach(([x, ph, n]) => slots(g, x - (n > 2 ? 12 : 3), 110, n, n, 1, 6, n > 2 ? 3 : 1));
        const reach = Math.max(V('letgo'), V('ask'));
        P.forEach(([x, ph]) => drawPerson(g, x, 204, ph === 'me' ? { me: true, scale: 0.86, t, dir: 0.4, rArm: [lerp(3, 9, reach), lerp(7, -2, reach)] } : { scale: 0.84, t, phase: ph, dir: -0.3, lArm: [lerp(-3, -8, V('letgo')), lerp(7, -2, V('letgo'))] }));
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.rect(78, 196, 252, 7); g.fill(); g.stroke();
        line(g, 94, 203, 86, 214); line(g, 314, 203, 322, 214);
        // the prize: one envelope, then the split
        const spread = Math.max(equal, work, lay);
        envelope(g, 141, 186, 1 - clamp01(spread * 3), 0.7, 0.8);
        txt(g, '$20,000', 141, 166, 10, 1 - clamp01(spread * 3), SANS(10));
        const toMe = Math.max(work * (1 - equal), ask);
        P.forEach(([x], i) => {
          const eq = Math.max(equal, lay) * (1 - toMe);
          const n = i === 0 ? lerp(eq * 3, 6, toMe) : lerp(eq * 3, 2, toMe);
          const take = ease(letgo);
          cash(g, x, 196 - take * 4, n, spread);
        });
        // follow-up: the others assume an equal split; to get your half you'd have to say so
        if (fu) talk(g, 180, 130, 292, 130, lay * (1 - Math.max(ask, letgo)) * 0.8, t, 8);
        say(g, 140, 128, 40, 120, 142, speak);
      },
    },

    // ---------------------------------------------------------------- B17 The Late Paper
    latepaper: {
      base(v) {
        sc.x.v = v;
        sset({ yes: 0, no: 0, others: 0, all: 0, one: 0 });
        if (v === 'fuA' || v === 'fu') sset({ yes: 1 });
        if (v === 'fuB') sset({ no: 1 });
      },
      shift(v) { if (isFu(v)) sto({ others: 1 }, 0.8); },
      acts: {
        'B17-A': { yes: 1 }, 'B17-B': { no: 1 },
        'B17-FU-A': { all: 1 }, 'B17-FU-B': { one: 1 },
      },
      async act(a) { await actor(this.acts, 1.0)(a); },
      draw(g, t) {
        const yes = V('yes'), no = V('no'), others = V('others'), all = V('all'), one = V('one');
        indoor(g);
        // the schoolroom: a board, a calendar with the deadline ringed, a window
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(24, 30, 150, 60); g.strokeRect(24, 30, 150, 60);
        g.strokeStyle = HAIR; g.lineWidth = 1; line(g, 36, 50, 120, 50); line(g, 36, 64, 150, 64);
        const cx = 214, cy = 30;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.fillRect(cx, cy, 58, 50); g.strokeRect(cx, cy, 58, 50); g.fillStyle = INK; g.fillRect(cx, cy, 58, 6);
        slots(g, cx + 5, cy + 11, 15, 0, 1, 7, 5);
        const ring = (k, a) => { if (a <= 0.01) return; const x = cx + 5 + (k % 5) * 10 + 3.5, y = cy + 11 + Math.floor(k / 5) * 10 + 3.5; g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.4; ellipse(g, x, y, 6, 6); g.stroke(); g.restore(); };
        ring(6, 1); ring(9, yes); ring(10, all * 0.9); ring(11, all * 0.9);
        // follow-up: next term's page, faint under this one; offer it to all and next term's deadline already has later dates ringed
        if (isFu(sc.x.v) && others > 0.01) {
          const nx = cx + 6, ny = cy + 58;
          g.save(); g.globalAlpha = others * 0.85; g.fillStyle = PAPER; g.strokeStyle = GRAPH; g.lineWidth = 1.1; g.setLineDash([3, 3]);
          g.fillRect(nx, ny, 52, 30); g.strokeRect(nx, ny, 52, 30); g.restore();
          slots(g, nx + 4, ny + 5, 10, 0, others * 0.85, 6, 5);
          for (const k of [7, 8]) { const a2 = all * 0.85; if (a2 <= 0.01) continue; const x = nx + 4 + (k % 5) * 9 + 3, y = ny + 5 + Math.floor(k / 5) * 9 + 3; g.save(); g.globalAlpha = a2; g.strokeStyle = INK; g.lineWidth = 1.2; ellipse(g, x, y, 4.4, 4.4); g.stroke(); g.restore(); }
        }
        nightWindow(g, 300, 30, 70, 56);
        // the class at their desks; some carried a hard week too (more of them in the follow-up)
        const K = [[44, 1701, 0.35], [92, 1702, 0], [140, 1703, 0]];
        K.forEach(([x, ph, c0], i) => {
          drawPerson(g, x, 186, { scale: 0.74, t, phase: ph, sit: true, dir: 0.5 });
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.rect(x + 6, 176, 26, 4); g.fill(); g.stroke(); line(g, x + 26, 180, x + 26, 210);
          cloud(g, x + 2, 120, clamp01(c0 + others * 0.75) * (1 - all * 0.75));
        });
        // your desk, the stack of papers handed in on time, and you
        drawPerson(g, 326, 210, { me: true, scale: 0.9, t, dir: lerp(-0.5, -0.7, all), lArm: [lerp(-3, -10, yes * (1 - one)), lerp(7, -12, yes * (1 - one))] });
        desk(g, 272, 384, 172);
        for (let k = 0; k < 4; k++) paper(g, 362, 166 - k * 2.5, 22, 8, (k % 2 ? 0.04 : -0.03), 1);
        // the student who asked, at your desk, after a hard week
        const back = isFu(sc.x.v) ? 1 : ease(Math.max(yes, no));
        const sx = lerp(232, 186, back);
        drawPerson(g, sx, 210, { scale: 0.76, t, phase: 1704, dir: back > 0.5 ? -0.3 : 0.5, moving: back > 0.05 && back < 0.95, walk: t * 3 });
        cloud(g, sx - 2, 142, (1 - yes * 0.75));
        // a no: their paper goes on the stack as it is
        if (no > 0.01 && !isFu(sc.x.v)) { const q = ease(no); paper(g, lerp(sx + 14, 362, q), lerp(176, 156, q) - Math.sin(q * Math.PI) * 16, 22, 8, 0.05, 1); }
        // follow-up: a note with the new date goes to the one who asked, or to everyone who had a hard week
        if (isFu(sc.x.v)) {
          const to = [[sx, 1], ...K.map(([x]) => [x + 18, 0])];
          to.forEach(([x, first]) => {
            const k = first ? Math.max(one, all) : all; if (k <= 0.01) return;
            const q = ease(k); paper(g, lerp(310, x, q), lerp(150, first ? 168 : 170, q) - Math.sin(q * Math.PI) * 26, 10, 12, 0.1, 1);
          });
        }
      },
    },

    // ---------------------------------------------------------------- B38 The Group
    group: {
      base(v) {
        sc.x.v = v;
        sset({ respect: 0, out: 0, give: 0, step: 0, still: 0 });
        if (v === 'fuA' || v === 'fu') sset({ respect: 1 });
        if (v === 'fuB') sset({ out: 1 });
      },
      shift(v) { if (v === 'fuA' || v === 'fu') sto({ give: 0.45 }, 0.25); },
      acts: {
        'B38-A': { respect: 1 }, 'B38-B': { out: 1 },
        'B38-FU-A': { step: 1 }, 'B38-FU-B': { still: 1, give: 1 },
      },
      async act(a) { await actor(this.acts, 0.85)(a); },
      draw(g, t) {
        const respect = V('respect'), out = V('out'), give = V('give'), step = V('step'), still = V('still');
        stars(g, SKY, 0.8); moon(g, 330, 36, 7, 1);
        ridge(g, 118, 1);
        plateau(g, 214, 5);
        // the camp circle around a cold fire pit; the group held together by one soft ring. Your sibling sits nearest you
        const fx = 246, fy = 196;
        g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1; g.setLineDash([4, 4]); g.globalAlpha = 0.8; ellipse(g, fx, 186, 98, 40); g.stroke(); g.restore();
        log(g, 246, 176, 112);
        [[206, 2401], [246, 2402], [286, 2403]].forEach(([x, ph]) => drawPerson(g, x, 170, { scale: 0.62, t, phase: ph, sit: true, dir: 0.1 }));
        firepit(g, fx, fy);
        log(g, 312, 214, 46);
        drawPerson(g, 312, 200, { scale: 0.72, t, phase: 2404, sit: true, dir: -0.4 });
        // the box at the middle, where the money goes (follow-up)
        const fuGive = isFu(sc.x.v);
        if (fuGive) { g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.fillRect(fx - 9, fy - 30, 18, 14); g.strokeRect(fx - 9, fy - 30, 18, 14); g.fillStyle = INK; g.fillRect(fx - 5, fy - 30, 10, 2); }
        // your sibling: on the log, at ease; or walking out with you, looking back once
        const go1 = seg(out, 0, 0.45), go2 = seg(out, 0.45, 1);
        const sibX = lerp(184, 92, go2);
        log(g, 184, 214, 46);
        if (go2 < 0.02) drawPerson(g, 184, 200, { scale: 0.74, t, phase: 2405, sit: true, dir: lerp(0.4, -0.5, go1) });
        else drawPerson(g, sibX, 214, { scale: 0.74, t, phase: 2405, dir: go2 > 0.92 ? 0.5 : -0.6, moving: go2 < 0.95, walk: t * 3 });
        sparkle(g, 168, 150, 2.5, 1 - out);
        if (fuGive) {
          slots(g, 172, 128, 6, 6 - give * 6, 1, 5, 3);
          const flowing = give < 0.97 && step < 0.2;
          for (let k = 0; k < 2 && flowing; k++) { const u = reduce ? 0.5 : (t * 0.35 + k * 0.5) % 1; bill(g, lerp(196, fx, u), lerp(170, fy - 30, u) - Math.sin(u * Math.PI) * 16, Math.sin(u * Math.PI) * 0.9, 0, 0.6); }
        }
        // you: at the edge, with a family thread to them. Respect: you sit on a rock. Get them out: you fetch them and walk away together. Step in: you go to them.
        const sit = respect > 0.5 && step < 0.05;
        if (respect > 0.05) { g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.ellipse(46, 214, 16, 10, 0, Math.PI, 0); g.closePath(); g.fill(); g.stroke(); }
        let yx = lerp(66, 46, respect);
        if (out > 0.01) yx = lerp(lerp(66, 148, go1), 52, go2);
        if (step > 0.01) yx = lerp(46, 148, ease(step));
        const walking = (out > 0.02 && out < 0.98) || (step > 0.05 && step < 0.95) || (respect > 0.05 && respect < 0.5);
        drawPerson(g, sit ? 46 : yx, sit ? 200 : 214, { me: true, scale: 0.9, t, sit, dir: go2 > 0.05 && go2 < 0.92 ? -0.6 : 0.5, moving: walking, walk: t * 3,
          rArm: step > 0.6 || (go1 > 0.9 && go2 < 0.1) ? [10, -4] : [3, 7] });
        const sx = go2 > 0.02 ? sibX : 184, sy = go2 > 0.02 ? 182 : 172;
        thread(g, (sit ? 46 : yx) + 9, sit ? 164 : 178, sx - 9, sy, 18, 0.75);
      },
    },

    // ---------------------------------------------------------------- B57 The Dream Job
    dreamjob: {
      base(v) {
        sc.x.v = v;
        sset({ go: 0, stay: 0, right: 0, back: 0, speak: 0, bags: 0 });
      },
      shift(v) { if (isFu(v)) sto({ settle: 1 }, 0.8); },
      acts: {
        'B57-A': { go: 1 }, 'B57-B': { stay: 1 },
        'B57-FUA-A': { right: 1 }, 'B57-FUA-B': { back: 1 },
        'B57-FUB-A': { right: 1 }, 'B57-FUB-B': { back: 1 },
      },
      async act(a) {
        await actor(this.acts, 0.8, async (id, m) => {
          if (m.back) { sto({ speak: 1 }, 1.6); await sleep(1100); sto({ speak: 0, back: 1 }, 0.9); await sleep(400); sto({ bags: 1 }, 1); }
          else sto(m, 0.7);
        })(a);
      },
      draw(g, t) {
        const v = sc.x.v, settle = V('settle'), right = V('right'), back = V('back'), speak = V('speak'), bags = V('bags');
        const partner = npcLook(5701);
        if (v === 'fuA') {
          // a year in, the new city: they're thriving at their work; you're by the window, far from your friends
          indoor(g);
          nightWindow(g, 24, 34, 84, 66);
          inFrame(g, 66, 150, 26, settle * 0.9, o => { for (const [dx, ph] of [[-10, 5702], [10, 5703]]) drawPerson(o, 66 + dx, 172, { scale: 0.42, t, phase: ph, dir: 0 }); }, true);
          desk(g, 262, 370, 168);
          g.save(); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.fillRect(300, 146, 32, 22); g.strokeRect(300, 146, 32, 22); g.restore();
          drawPerson(g, 286, 210, { look: partner, scale: 0.9, t, dir: lerp(0.4, -0.5, Math.max(right, speak, back)) });
          sparkle(g, 346, 126, 3, settle * (1 - back * 0.6)); sparkle(g, 270, 120, 2.5, settle * (1 - back * 0.6));
          const yx = lerp(lerp(140, 230, ease(right)), 200, ease(back));
          chair(g, 140, 186, -1, 210, 1 - Math.max(right, back) * 0.6);
          const sit = right < 0.05 && back < 0.05;
          drawPerson(g, sit ? 140 : yx, sit ? 186 : 210, { me: true, scale: 0.9, t, sit, dir: sit ? -0.5 : 0.6, moving: (right > 0.05 && right < 0.95) || (back > 0.05 && back < 0.95), walk: t * 3 });
          thread(g, (sit ? 140 : yx) + 10, 160, 276, 168, 16, 0.7);
          say(g, 176, 110, 40, 188, 126, speak);
          suitcase(g, 222, 196, bags); suitcase(g, 246, 196, bags);
          return;
        }
        if (v === 'fuB') {
          // a year later, still here: they look out at the work they turned down
          indoor(g);
          nightWindow(g, 290, 30, 90, 70);
          inFrame(g, 335, 132, 24, settle * (0.9 - right * 0.5 + back * 0.1), o => { o.strokeStyle = INK; o.lineWidth = 1.1; for (const [x, w, hh] of [[318, 12, 26], [332, 14, 34], [348, 10, 20]]) o.strokeRect(x, 156 - hh, w, hh); }, true);
          sparkle(g, 358, 112, 2.5, back);
          drawPerson(g, 300, 210, { look: partner, scale: 0.9, t, dir: lerp(0.6, -0.6, Math.max(speak, back)), mood: back > 0.6 ? null : settle > 0.5 ? 'worried' : null });
          desk(g, 40, 160, 168); slots(g, 56, 150, 11, 11, 1, 5);
          const sit = back < 0.05;
          chair(g, 182, 186, -1, 210, 1);
          const yx = sit ? 182 : lerp(182, 240, ease(back));
          drawPerson(g, yx, sit ? 186 : 210, { me: true, scale: 0.9, t, sit, dir: lerp(-0.3, 0.6, Math.max(settle * 0.5, speak, back)), moving: back > 0.05 && back < 0.95, walk: t * 3 });
          thread(g, yx + 10, 160, 290, 168, 14, 0.7);
          say(g, 214, 110, 40, 200, 126, speak);
          suitcase(g, 250, 196, bags); suitcase(g, 274, 196, bags);
          return;
        }
        // trunk: a milestone where the trail leaves the city you love; far off, their dream job
        const go = V('go'), stay = V('stay');
        stars(g, SKY.filter(([x, y]) => y < 40), 0.7);
        g.save(); g.fillStyle = TRAIL; g.strokeStyle = HAIR; g.lineWidth = 1;
        g.beginPath(); g.moveTo(120, 250); g.lineTo(328, 124); g.lineTo(340, 124); g.lineTo(290, 250); g.closePath(); g.fill(); g.stroke(); g.restore();
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 124, 400, 124);
        // your city: your work of ten years, your friends
        for (const [x, top, w] of [[8, 58, 28], [38, 40, 30], [70, 66, 24]]) tower(g, x, top, w, 124, 1, false);
        slots(g, 104, 104, 10, 10, 1 - go * 0.6, 4.5, 5);
        drawPerson(g, 38, 200, { scale: 0.74, t, phase: 5704, dir: 0.5 }); drawPerson(g, 66, 204, { scale: 0.7, t, phase: 5705, dir: 0.6 });
        thread(g, 50, 170, 190, 168, 22, 0.5 * (1 - go * 0.5), true);
        // their dream job, across the country
        inFrame(g, 336, 62, 38, clamp01(0.8 + go * 0.2 - stay * 0.5), o => {
          o.strokeStyle = HAIR; o.lineWidth = 1; line(o, 298, 86, 374, 86);
          tower(o, 316, 42, 22, 86, 1, false); tower(o, 342, 54, 18, 86, 1, false);
        });
        sparkle(g, 364, 30, 3, 1 - stay * 0.7);
        milestone(g, 152, 214);
        // you and your partner; their suitcase, ready if you say yes
        const q = ease(go), s = lerp(0.9, 0.42, q);
        const px = lerp(222, 322, q), py = lerp(214, 132, q), yx = lerp(188, 306, q), yy = lerp(214, 134, q);
        const walking = go > 0.05 && go < 0.95;
        drawPerson(g, yx, yy, { me: true, scale: s, t, dir: go > 0.05 ? 0.6 : 0.5, moving: walking, walk: t * 3 });
        drawPerson(g, px, py, { look: partner, scale: s, t, dir: go > 0.05 ? 0.6 : -0.5, moving: walking, walk: t * 3 });
        suitcase(g, lerp(244, 334, q), lerp(198, 128, q), 1 - clamp01((go - 0.6) * 3));
        thread(g, yx + 8 * s / 0.9, yy - 34 * s / 0.9, px - 8 * s / 0.9, py - 34 * s / 0.9, 10, 0.75);
      },
    },

    // ---------------------------------------------------------------- B54 The One-Star Review
    review: {
      base(v) { sc.x.v = v; sset({ keep: 0, down: 0, walk: 0 }); },
      acts: { 'B54-A': { keep: 1 }, 'B54-B': { down: 1 } },
      async act(a) {
        await actor(this.acts, 0.8, async (id, m) => {
          sto(m, 1.0); await sleep(900); sto({ walk: 1 }, 0.45);
        })(a);
      },
      draw(g, t) {
        const keep = V('keep'), down = V('down'), walk = V('walk');
        stars(g, SKY.filter(([x, y]) => x < 250 && y < 30), 0.7);
        ridge(g, 110, 1);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 214, 400, 214);
        g.save(); g.strokeStyle = HAIR; g.setLineDash([10, 10]); line(g, 0, 236, 400, 236); g.restore();
        // the small family diner by the road, lit; the owner in the doorway
        const dx = 26, top = 110;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.lineJoin = 'round';
        g.beginPath(); g.roundRect(dx, top, 170, 104, [14, 14, 0, 0]); g.fill(); g.stroke();
        g.lineWidth = 1.3; g.strokeRect(dx + 12, top + 26, 96, 40); for (let x = dx + 36; x < dx + 108; x += 24) line(g, x, top + 26, x, top + 66);
        g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, dx + 4, top + 12, dx + 166, top + 12);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4; g.beginPath(); g.roundRect(dx + 40, top - 26, 90, 20, 10); g.fill(); g.stroke(); line(g, dx + 60, top - 6, dx + 60, top); line(g, dx + 110, top - 6, dx + 110, top);
        g.fillStyle = INK; for (const x of [dx + 72, dx + 85, dx + 98]) { ellipse(g, x, top - 16, 2, 2); g.fill(); }
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5; g.fillRect(dx + 124, top + 30, 30, 74); g.strokeRect(dx + 124, top + 30, 30, 74);
        drawPerson(g, dx + 139, 214, { scale: 0.82, t, phase: 5401, dir: 0.5, mood: 'worried' });
        // your phone, large: your one-star review on top, and the owner's public reply under it
        const fx = 300, fy = 16, fw = 86, fh = 132;
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.beginPath(); g.roundRect(fx, fy, fw, fh, 9); g.fill(); g.stroke();
        g.strokeStyle = HAIR; g.lineWidth = 1; g.strokeRect(fx + 6, fy + 10, fw - 12, fh - 22);
        const ra = 1 - down, rs = lerp(0, -38, ease(down));
        g.save(); g.beginPath(); g.rect(fx + 7, fy + 11, fw - 14, fh - 24); g.clip();
        starRow(g, fx + 16, fy + 24, 1, ra, 0.95);
        g.save(); g.globalAlpha = ra; g.strokeStyle = GRAPH; g.lineWidth = 1; for (let k = 0; k < 3; k++) line(g, fx + 12, fy + 38 + k * 7, fx + fw - (k === 2 ? 34 : 14), fy + 38 + k * 7); g.restore();
        g.translate(0, rs);
        g.strokeStyle = INK; g.lineWidth = 1.2; line(g, fx + 14, fy + 68, fx + 14, fy + 104);
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let k = 0; k < 5; k++) line(g, fx + 20, fy + 70 + k * 7, fx + fw - (k === 4 ? 30 : 14), fy + 70 + k * 7);
        g.restore();
        thread(g, dx + 152, 150, fx + 6, fy + 96, 12, 0.5, true);
        // you: you put the phone away either way
        drawPerson(g, 344, 214, { me: true, scale: 0.9, t, dir: -0.5, rArm: [lerp(-2, 3, Math.max(keep, down)), lerp(-6, 7, Math.max(keep, down))] });
        // a stranger along the road, reading reviews: they walk on past, or turn in at the door
        const w = ease(walk), sx = keep > 0.5 ? lerp(264, -20, w) : down > 0.5 ? lerp(264, dx + 139, w) : 264;
        const sa = down > 0.5 ? 1 - clamp01((walk - 0.85) * 7) : 1;
        ghost(g, sa, sx, 232, { scale: 0.78, t, phase: 5402, dir: -0.7, moving: w > 0.02 && w < 0.98, walk: t * 3 });
        if (walk < 0.05) { g.save(); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; g.beginPath(); g.roundRect(sx - 18, 196, 7, 11, 1.5); g.fill(); g.stroke(); g.restore(); }
      },
    },

    // ---------------------------------------------------------------- B50, B51, B52 quick reads
    quickword: quick('B50', 1, [40, 34]),
    quickrule: quick('B51', 2, null),
    quickbelief: quick('B52', 3, [372, 104]),
  };
  return SCENES;
});
