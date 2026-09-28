// Tern V1 — code-drawn scenes for the ten new core questions.
// Ink on paper, calm motion, harm never shown. Relationships are a thin thread and relative size.
// Contract: see game/plan.md. Variants are step keys ('trunk', 'fu', 'fuA', 'fuB'); unknown ones fall back to the trunk look.
window.TERN_SCENES = function (h) {
  const { sc, V, sset, sto, hopY, sleep, lerp, clamp01, reduce, INK, PAPER, GRAPH, HAIR, ellipse, line, txt, bubble, heart, paper, steam, marks, hourglass, scribble, parkBack, indoor, drawPerson, npcLook, ridgeY } = h;

  const SERIF = size => `italic 500 ${size}px "Cormorant Garamond", Georgia, serif`;
  const SANS = size => `700 ${size}px "Quattrocento Sans", sans-serif`;
  const bob = (t, k) => (reduce ? 0 : Math.sin(t * 1.2 + (k || 0)) * 2);

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

  // ---------- small shared drawers ----------
  function thread(g, x1, y1, x2, y2, lift, a, dash) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.lineWidth = 1.1; g.lineCap = 'round';
    if (dash) g.setLineDash([3, 4]);
    g.beginPath(); g.moveTo(x1, y1); g.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - lift, x2, y2); g.stroke();
    g.restore();
  }
  function windowFrame(g, x, y, w, hh) {
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; g.fillRect(x, y, w, hh); g.strokeRect(x, y, w, hh);
    g.lineWidth = 1.2; line(g, x + w / 2, y, x + w / 2, y + hh); line(g, x, y + hh / 2, x + w, y + hh / 2);
    g.lineWidth = 2; line(g, x - 4, y + hh + 2, x + w + 4, y + hh + 2);
  }
  function moon(g, x, y, r, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = a; g.fillStyle = INK; ellipse(g, x, y, r, r); g.fill();
    g.fillStyle = PAPER; ellipse(g, x + r * 0.45, y - r * 0.2, r * 0.85, r * 0.85); g.fill(); g.restore();
  }
  function sun(g, x, y, r, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = a; g.strokeStyle = INK; g.lineWidth = 1.3; ellipse(g, x, y, r, r); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1;
    for (let k = 0; k < 8; k++) { const an = k / 8 * Math.PI * 2; line(g, x + Math.cos(an) * (r + 3), y + Math.sin(an) * (r + 3), x + Math.cos(an) * (r + 6), y + Math.sin(an) * (r + 6)); }
    g.restore();
  }
  function stars(g, pts, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = a; g.strokeStyle = GRAPH; g.lineWidth = 1;
    for (const [x, y] of pts) { line(g, x - 2, y, x + 2, y); line(g, x, y - 2, x, y + 2); }
    g.restore();
  }
  function table(g, x1, x2, y) {
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
    g.beginPath(); g.rect(x1, y, x2 - x1, 5); g.fill(); g.stroke();
    line(g, x1 + 6, y + 5, x1 + 6, 210); line(g, x2 - 6, y + 5, x2 - 6, 210);
  }
  function phone(g, x, y, rot, a) {
    if (a != null && a <= 0.01) return;
    g.save(); g.globalAlpha = a == null ? 1 : Math.min(1, a); g.translate(x, y); g.rotate(rot || 0);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(-3.5, -6, 7, 12, 1.6); g.fill(); g.stroke();
    g.fillStyle = INK; g.fillRect(-2, -4, 4, 6.5); g.restore();
  }
  function frame(g, x, y, r, a) { // a round window onto somewhere else
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
    ellipse(g, x, y, r, r); g.fill(); g.stroke(); g.restore();
  }
  function clipCircle(g, x, y, r) { g.save(); g.beginPath(); g.arc(x, y, r - 1, 0, Math.PI * 2); g.clip(); }
  function coin(g, x, y, r, a) {
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2;
    ellipse(g, x, y, r, r * 0.45); g.fill(); g.stroke(); g.restore();
  }
  function card(g, x, y, rot, a) { // the bank card: a plain rectangle with a stripe
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.translate(x, y); g.rotate(rot || 0);
    g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath(); g.roundRect(-10, -6.5, 20, 13, 2); g.fill(); g.stroke();
    g.fillStyle = INK; g.fillRect(-10, -3.5, 20, 3); g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, -7, 3, -1, 3);
    g.restore();
  }
  function house(g, x, y, w, hh, a, opts) {
    if (a <= 0.01) return;
    const o = opts || {};
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; g.lineJoin = 'round';
    g.beginPath(); g.rect(x - w / 2, y - hh, w, hh); g.fill(); g.stroke();
    const tilt = o.crooked ? 2 : 0;
    g.beginPath(); g.moveTo(x - w / 2 - 2, y - hh + tilt); g.lineTo(x + (o.crooked ? 2 : 0), y - hh - w * 0.5); g.lineTo(x + w / 2 + 2, y - hh); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = GRAPH; g.lineWidth = 1;
    if (o.crooked) { line(g, x - w / 2 + 2, y - hh + 3, x + w / 2 - 2, y - hh + 1); g.strokeRect(x - 2, y - 5, 4, 5); }
    else {
      g.strokeRect(x - 1.8, y - Math.min(7, hh * 0.5), 3.6, Math.min(7, hh * 0.5));
      if (hh > 14) { g.strokeRect(x - w / 2 + 3, y - hh + 3, 4, 4); g.strokeRect(x + w / 2 - 7, y - hh + 3, 4, 4); }
    }
    g.restore();
  }
  function crowd(g, x0, y0, cols, rows, dx, dy, a, t) { // tiny round heads, like the trolley scene's crowd
    if (a <= 0.01) return;
    g.save(); g.globalAlpha = Math.min(1, a); g.strokeStyle = INK; g.fillStyle = PAPER; g.lineWidth = 1;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = x0 + c * dx + (r % 2) * dx / 2, y = y0 + r * dy + (reduce ? 0 : Math.sin(t * 1.5 + c + r) * 0.4);
      ellipse(g, x - 1.6, y + 2.2, 1.9, 1.9); g.fill(); g.stroke(); ellipse(g, x + 1.6, y + 2.2, 1.9, 1.9); g.fill(); g.stroke();
      ellipse(g, x, y, 2.5, 2.5); g.fill(); g.stroke();
    }
    g.restore();
  }
  function verdict(g, x, y, word, a) { // a raised slip of paper with one word on it
    if (a <= 0.01 || !word) return;
    const w = word.length * 5.6 + 14;
    g.save(); g.globalAlpha = Math.min(1, a); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
    g.fillRect(x - w / 2, y - 9, w, 18); g.strokeRect(x - w / 2, y - 9, w, 18); line(g, x, y + 9, x, y + 22); g.restore();
    txt(g, word, x, y + 0.5, 10, a, SANS(10));
  }
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
  function floorDots(g, a) { g.save(); g.globalAlpha = a; g.fillStyle = GRAPH; for (let x = 12; x < 400; x += 26) { ellipse(g, x, 226 + (x % 3) * 5, 0.8, 0.8); g.fill(); } g.restore(); }

  return {
    // ---------------------------------------------------------------- B09 The 2 A.M. Call
    call: {
      base(v) {
        sset({ ring: 1, nod: 0, away: 0, day: 0, cell: 0, free: 0, speak: 0, hush: 0, door: 0, go: 0, wait: 0 });
        if (v === 'fuA' || v === 'fuB') sset({ ring: 0, nod: v === 'fuA' ? 1 : 0, away: v === 'fuB' ? 0.6 : 0 });
        sc.x.v = v;
      },
      shift(v) {
        if (v === 'fuA') { sto({ day: 1 }, 1.2); sto({ cell: 1 }, 0.9); }
        if (v === 'fuB') { sto({ day: 1 }, 1.2); sto({ door: 1 }, 0.9); }
      },
      acts: {
        'B09-A': { nod: 1, ring: 0 }, 'B09-B': { away: 1, ring: 0 },
        'B09-FUA-A': { free: 1, speak: 1 }, 'B09-FUA-B': { hush: 1 },
        'B09-FUB-A': { go: 1 }, 'B09-FUB-B': { wait: 1 },
      },
      async act(a) { await actor(this.acts, 1.4)(a); if (a && /FUA-A/.test(a.id)) sc.x.hop = 1; },
      draw(g, t) {
        const day = V('day'), nod = V('nod'), away = V('away'), cell = V('cell'), free = V('free'), speak = V('speak'), hush = V('hush'), door = V('door'), go = V('go'), wait = V('wait');
        indoor(g);
        windowFrame(g, 34, 56, 70, 64);
        moon(g, 56, 76, 8, 1 - day); stars(g, [[84, 70], [90, 96], [48, 104]], 1 - day); sun(g, 80, 80, 7, day);
        // bed
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.roundRect(128, 150, 10, 60, 3); g.fill(); g.stroke();
        g.beginPath(); g.rect(132, 186, 112, 10); g.fill(); g.stroke(); line(g, 240, 196, 240, 210);
        g.beginPath(); g.roundRect(140, 176, 26, 10, 5); g.fill(); g.stroke();
        // bedside clock (night only)
        if (day < 0.99) {
          g.save(); g.globalAlpha = 1 - day; table(g, 256, 292, 182);
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3; g.fillRect(262, 166, 24, 16); g.strokeRect(262, 166, 24, 16); g.restore();
          txt(g, '2:00', 274, 174.5, 9, 1 - day, SANS(9));
        }
        // the door to the outside world (fuB)
        if (door > 0.01) {
          g.save(); g.globalAlpha = door; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
          g.strokeRect(300, 108, 44, 102);
          const open = go; g.beginPath(); g.rect(300, 108, 44 * (1 - open * 0.75), 102); g.fill(); g.stroke();
          ellipse(g, 300 + 44 * (1 - open * 0.75) - 6, 162, 2, 2); g.stroke(); g.restore();
        }
        // you: on the bed, phone up (or walking to the door)
        const standing = go > 0.5, px = lerp(200, 270, go), py = standing ? 214 : 186;
        const dir = lerp(0.6, -0.8, away) * (1 - go) + go * 0.8;
        drawPerson(g, px, py, { me: true, scale: 0.9, t, sit: !standing, dir, hop: hopY(), lArm: [-6, lerp(-6, 6, Math.max(away, go))] });
        phone(g, px - 13, lerp(163, 178, Math.max(away, go)) - (standing ? 28 : 0) * (1 - Math.max(away, go)), -0.3, 1 - go);
        marks(g, 'waves', px - 13, 156, V('ring'), t);
        // the caller: your sibling, in a round window, tied to you by a thread
        const cx = 322, cy = 62, sibA = lerp(1, 0.45, away);
        thread(g, px, py - 44, cx - 30, cy + 8, 20, sibA * 0.9, away > 0.5);
        frame(g, cx, cy, 30, sibA);
        g.save(); g.globalAlpha = sibA; clipCircle(g, cx, cy, 30);
        g.strokeStyle = HAIR; g.lineWidth = 1; line(g, cx - 30, cy + 20, cx + 30, cy + 20);
        g.globalAlpha = 1; faded(g, sibA, o => drawPerson(o, cx, cy + 22, { scale: 0.55, t, phase: 3, dir: -0.6 }));
        g.restore();
        marks(g, 'sweat', cx + 10, cy - 12, sibA * (1 - nod * 0.8), t);
        heart(g, cx - 34, cy - 24, 11, nod * (sc.x.v === 'trunk' || !sc.x.v ? 1 : 0.5), false);
        // the stranger who was arrested (fuA): a second window, with bars
        if (cell > 0.01) {
          const bx = 344, by = 158;
          frame(g, bx, by, 32, cell);
          g.save(); g.globalAlpha = cell; clipCircle(g, bx, by, 32);
          g.strokeStyle = HAIR; line(g, bx - 32, by + 22, bx + 32, by + 22);
          drawPerson(g, bx, by + 24, { scale: 0.6, t, phase: 6, dir: lerp(0.2, -0.8, free), hop: hopY() });
          g.strokeStyle = INK; g.lineWidth = 2; const lift = free * 70;
          for (let x = bx - 24; x <= bx + 24; x += 9.6) line(g, x, by - 34 - lift, x, by + 34 - lift);
          g.restore();
          if (speak > 0.02) {
            g.save(); g.fillStyle = INK;
            for (let k = 0; k < 4; k++) { const u = reduce ? k / 4 : (t * 0.6 + k / 4) % 1; g.globalAlpha = speak * Math.sin(u * Math.PI); ellipse(g, lerp(px + 14, bx - 34, u), lerp(160, by, u) - Math.sin(u * Math.PI) * 14, 1.8, 1.8); g.fill(); }
            g.restore();
          }
          if (hush > 0.05) txt(g, 'shh', px - 30, 140, 17, hush, SERIF(17));
          hourglass(g, 244, 150, hush, t);
        }
        hourglass(g, 250, 150, wait, t);
      },
    },

    // ---------------------------------------------------------------- B02 The Deathbed Question
    deathbed: {
      base(v) { sset({ ask: 1, truth: 0, yes: 0, memory: 0, fade: 0, rest: 0 }); if (v === 'fu') sset({ ask: 0.5, yes: 0 }); },
      shift(v) { if (v === 'fu') { sto({ memory: 1 }, 1.1); sto({ ask: 1 }, 1); } },
      acts: {
        'B02-A': { truth: 1, ask: 0 }, 'B02-B': { yes: 1, ask: 0 },
        'B02-FU-A': { truth: 1, ask: 0 }, 'B02-FU-B': { yes: 1, ask: 0, fade: 1, rest: 1 },
      },
      async act(a) { await actor(this.acts, 1.3)(a); },
      draw(g, t) {
        const ask = V('ask'), truth = V('truth'), yes = V('yes'), memory = V('memory'), fade = V('fade'), rest = V('rest');
        indoor(g);
        // window with a low sun
        windowFrame(g, 300, 44, 64, 56);
        g.save(); g.beginPath(); g.rect(300, 44, 64, 56); g.clip(); g.strokeStyle = GRAPH; g.lineWidth = 1.2;
        g.beginPath(); g.arc(332, 96, 10, Math.PI, 0); g.stroke(); line(g, 300, 96, 364, 96); g.restore();
        // bed, grandfather sitting up against the pillows
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.roundRect(372, 132, 10, 78, 3); g.fill(); g.stroke();
        g.beginPath(); g.roundRect(334, 160, 36, 16, 7); g.fill(); g.stroke();
        const gx = 322;
        const look = Object.assign({}, npcLook(5), { eyes: 'sleepy' });
        drawPerson(g, gx, 186, { look, scale: 0.95, t: reduce ? 0 : t * 0.5, sit: true, dir: -0.6, lArm: [-12, 4] });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.roundRect(230, 180, 146, 18, 5); g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let x = 246; x < 370; x += 16) line(g, x, 184, x + 6, 194);
        g.strokeStyle = INK; g.lineWidth = 1.6; line(g, 238, 198, 238, 210); line(g, 368, 198, 368, 210);
        // you, holding his hand
        const yx = 214;
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: 0.7, rArm: [14, 2] });
        thread(g, yx + 14, 176, gx - 10, 164, 10, 1);
        bubble(g, gx - 30, 110, 22, 20, gx - 14, 128, ask);
        txt(g, '?', gx - 30, 110.5, 13, ask, SANS(13));
        // what you know: the business, closed (it fades to "doing well" if you say yes)
        const sx = lerp(176, 262, truth), sy = lerp(74, 92, truth), sa = 1 - fade * 0.4;
        g.save(); g.globalAlpha = sa; g.fillStyle = GRAPH;
        [[yx - 4, 158, 2], [yx - 12, 142, 3], [sx - 22, sy + 30, 4]].forEach(([x, y, r], i) => { if (truth < 0.5 || i === 2) { ellipse(g, lerp(x, sx - 10, truth), lerp(y, sy + 34, truth), r, r); g.fill(); } });
        g.restore();
        g.save(); g.globalAlpha = sa; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.4;
        g.beginPath(); g.roundRect(sx - 44, sy - 32, 88, 64, 26); g.fill(); g.stroke();
        g.lineWidth = 1.3; g.strokeRect(sx - 22, sy - 10, 44, 30);
        g.beginPath(); g.moveTo(sx - 26, sy - 10); g.lineTo(sx + 26, sy - 10); g.lineTo(sx + 22, sy - 20); g.lineTo(sx - 22, sy - 20); g.closePath(); g.stroke();
        g.strokeStyle = GRAPH; for (let x = -18; x <= 18; x += 6) line(g, sx + x, sy - 20, sx + x - 1, sy - 10);
        g.strokeStyle = INK; g.strokeRect(sx - 16, sy - 4, 14, 12); g.strokeRect(sx + 4, sy - 2, 10, 22);
        const planks = 1 - yes;
        if (planks > 0.01) { g.globalAlpha = sa * planks; g.lineWidth = 2; line(g, sx - 17, sy - 3, sx - 3, sy + 7); line(g, sx - 17, sy + 7, sx - 3, sy - 3); line(g, sx + 3, sy + 2, sx + 15, sy + 16); }
        g.restore();
        if (yes > 0.3) stars(g, [[sx - 30, sy - 22], [sx + 32, sy - 18]], yes * sa);
        heart(g, (yx + gx) / 2, 138, 12, Math.max(truth, yes) * (1 - rest * 0.3), false);
        // the memory (fu): years ago, the same two of you, and what he asked
        if (memory > 0.01) {
          const mx = 60, my = 66;
          frame(g, mx, my, 40, memory * (1 - fade * 0.6));
          g.save(); g.globalAlpha = memory * (1 - fade * 0.6); clipCircle(g, mx, my, 40);
          g.strokeStyle = HAIR; line(g, mx - 40, my + 26, mx + 40, my + 26);
          g.globalAlpha = 1; faded(g, memory * (1 - fade * 0.6), o => {
            drawPerson(o, mx + 12, my + 28, { look, scale: 0.62, t, dir: -0.6, lArm: [-9, 4] });
            drawPerson(o, mx - 16, my + 28, { me: true, scale: 0.42, t, dir: 0.6, rArm: [8, 0] });
          });
          g.restore();
          txt(g, '“never lie to me”', mx + 4, my + 54, 14, memory * (1 - fade * 0.6), SERIF(14));
        }
      },
    },

    // ---------------------------------------------------------------- B13 Two Worlds
    worlds: {
      base(v) { sset({ go: 0, top: 0 }); sc.x.v = v; },
      shift(v) { if (v === 'fu') { sto({ top: 1 }, 1.2); } },
      acts: { 'B13-A': { go: -1 }, 'B13-B': { go: 1 }, 'B13-FU-A': { go: 1 }, 'B13-FU-B': { go: -1 } },
      async act(a) { await actor(this.acts, 1.1)(a); },
      draw(g, t) {
        const go = V('go'), top = V('top');
        g.strokeStyle = HAIR; g.lineWidth = 1;
        for (const [x, y, w] of [[60, 40, 40], [330, 30, 50], [250, 58, 30]]) { g.beginPath(); g.moveTo(x - w / 2, y); g.quadraticCurveTo(x, y - 8, x + w / 2, y); g.stroke(); }
        const island = (x, y, w) => {
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
          g.beginPath(); g.moveTo(x - w, y); g.quadraticCurveTo(x - w * 0.5, y + 34, x, y + 52); g.quadraticCurveTo(x + w * 0.5, y + 34, x + w, y); g.closePath(); g.fill(); g.stroke();
          ellipse(g, x, y, w, 16); g.fill(); g.stroke();
          g.strokeStyle = GRAPH; g.lineWidth = 1; for (let k = 1; k < 4; k++) line(g, x - w * (0.6 - k * 0.1), y + 12 + k * 8, x + w * (0.6 - k * 0.1), y + 12 + k * 8);
        };
        const ay = 170 + bob(t, 0) * 0.5, by = 170 + bob(t, 2) * 0.5;
        island(100, ay, 76); island(300, by, 84);
        // World A: everyone the same, modest house
        for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) house(g, 64 + c * 24 + (r ? 12 : 0), ay - 2 + r * 12, 12, 10, 1);
        // World B: most houses bigger, one in ten small and crooked
        const bx = [258, 284, 310, 336, 271, 297, 323, 349, 245, 360];
        for (let i = 0; i < 9; i++) { const r = i < 4 ? 0 : 1; house(g, bx[i] - (r ? 13 : 0), by - 4 + r * 13, 17, r ? 12 : 16, 1); }
        house(g, 300, by + 14, 8, 6, 1, { crooked: true });
        txt(g, 'A', 100, 236, 16, 1, SERIF(20)); txt(g, 'B', 300, 236, 16, 1, SERIF(20));
        // fu: you'd land in the top half of B
        if (top > 0.01) {
          g.save(); g.globalAlpha = top; g.strokeStyle = INK; g.lineWidth = 1.2; g.setLineDash([3, 4]);
          g.beginPath(); g.roundRect(236, by - 32, 128, 34, 12); g.stroke(); g.restore();
        }
        // you, not yet born, floating above both
        const hx = 200 + go * lerp(100, 104, top), hy = 74 + Math.abs(go) * lerp(34, 18, top) + bob(t, 1);
        g.strokeStyle = GRAPH; g.lineWidth = 1; g.fillStyle = PAPER;
        g.beginPath(); for (let k = -2; k <= 2; k++) g.arc(hx + k * 7, hy + 2 - (k === 0 ? 3 : 0), 5.5, Math.PI, 0); g.stroke();
        drawPerson(g, hx, hy, { me: true, scale: 0.6, t, dir: go * 0.8 });
        const q = 1 - Math.min(1, Math.abs(go));
        if (q > 0.01) txt(g, '?', hx + 20, hy - 34, 14, q, SANS(14));
        if (top > 0.01 && Math.abs(go) < 0.5) thread(g, hx + 10, hy + 4, 300, by - 32, -10, top * q, true);
      },
    },

    // ---------------------------------------------------------------- B18 The Pond and the Faraway Child
    pond: {
      base(v) { sset({ life: 0, tilt: 0, even: 0, give: 0, worried: 0, peace: 0 }); sc.x.v = v; },
      shift(v) { if (v === 'fu') { sto({ life: 1 }, 1.7); } },
      acts: {
        'B18-A': { tilt: -1 }, 'B18-B': { even: 1 },
        'B18-FU-A': { give: 1 }, 'B18-FU-B': { worried: 1 }, 'B18-FU-C': { peace: 1 },
      },
      async act(a) { await actor(this.acts, 1.3)(a); },
      draw(g, t) {
        const life = V('life'), tilt = V('tilt'), even = V('even'), give = V('give'), worried = V('worried'), peace = V('peace');
        parkBack(g, t, [[30, 150, 0.6]]);
        // far away: a small child on the far ridge (more of them in fu)
        const far = [[334, 104]];
        if (life > 0.01) for (let k = 0; k < 6; k++) far.push([250 + k * 22, 100 + (k % 2) * 4]);
        far.forEach(([x, y], i) => { g.save(); g.globalAlpha = i ? life : 1; drawPerson(g, x, y, { scale: 0.32, t, phase: 4 + i }); g.restore(); });
        thread(g, 214, 180, 334, 94, 30, 0.5 * (1 - life), true);
        txt(g, '$800', 334, 72, 10, 1 - life, SANS(10));
        // the pond, with the child close to the bank
        const pa = 1 - life;
        if (pa > 0.01) {
          g.save(); g.globalAlpha = pa;
          g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6; ellipse(g, 96, 206, 78, 20); g.fill(); g.stroke();
          g.save(); ellipse(g, 96, 206, 78, 20); g.clip();
          drawPerson(g, 110, 214, { scale: 0.5, t, phase: 1, dir: 0.6, lArm: [-5, -10], rArm: [5, -10] });
          g.fillStyle = PAPER; g.fillRect(10, 206, 180, 30);
          g.strokeStyle = GRAPH; g.lineWidth = 1;
          for (const [x, y] of [[60, 212], [140, 214], [90, 220], [124, 207]]) { g.beginPath(); g.moveTo(x - 5, y); g.quadraticCurveTo(x - 2.5, y - 2.5, x, y); g.quadraticCurveTo(x + 2.5, y + 2.5, x + 5, y); g.stroke(); }
          g.restore();
          g.strokeStyle = INK; g.lineWidth = 1.6; ellipse(g, 96, 206, 78, 20); g.stroke();
          g.restore();
          marks(g, 'waves', 110, 196, pa * 0.5, t);
        }
        // fu: your ordinary life on the left instead — a shelf with a cup and a plant
        if (life > 0.01) {
          g.save(); g.globalAlpha = life; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
          table(g, 50, 140, 186);
          g.beginPath(); g.moveTo(64, 172); g.lineTo(66, 186); g.lineTo(76, 186); g.lineTo(78, 172); g.closePath(); g.fill(); g.stroke();
          g.beginPath(); g.moveTo(118, 186); g.lineTo(114, 170); g.lineTo(132, 170); g.lineTo(128, 186); g.closePath(); g.fill(); g.stroke();
          g.lineWidth = 1.3; line(g, 123, 170, 123, 156); ellipse(g, 118, 158, 5, 2.5); g.stroke(); ellipse(g, 128, 152, 5, 2.5); g.stroke();
          g.restore();
          if (life > 0.5 && give < 0.5) { g.save(); g.globalAlpha = life; steam(g, 71, 170, t); g.restore(); }
          phone(g, 96, 181, 0, life * (1 - give));
          if (give > 0.02) {
            g.save();
            for (let k = 0; k < 4; k++) { const u = reduce ? k / 4 : (t * 0.35 + k / 4) % 1; coin(g, lerp(100, 300, u), lerp(170, 100, u) - Math.sin(u * Math.PI) * 30, 4, give * Math.sin(u * Math.PI)); }
            g.restore();
          }
        }
        // you
        const yx = 214;
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: lerp(-0.5, 0.5, life) + tilt * 0.3, rArm: [6, 4], sit: false });
        phone(g, yx + 16, 196, 0.2, 1 - life);
        marks(g, 'sweat', yx + 12, 160, worried, t);
        heart(g, yx + 22, 150, 11, peace, false);
        // the scale: which one weighs more?
        const cx = 200, cy = 40, ang = tilt * 0.28 * (1 - even);
        g.save(); g.strokeStyle = INK; g.fillStyle = PAPER; g.lineWidth = 1.5;
        line(g, cx, cy - 6, cx, cy + 28); line(g, cx - 10, cy + 28, cx + 10, cy + 28);
        g.translate(cx, cy); g.rotate(ang); line(g, -50, 0, 50, 0);
        for (const s of [-1, 1]) {
          const px = s * 50; g.save(); g.translate(px, 0); g.rotate(-ang);
          g.lineWidth = 1; line(g, 0, 0, -9, 16); line(g, 0, 0, 9, 16);
          g.lineWidth = 1.4; g.beginPath(); g.moveTo(-12, 16); g.quadraticCurveTo(0, 24, 12, 16); g.closePath(); g.fill(); g.stroke();
          g.restore();
        }
        g.restore();
        ellipse(g, cx, cy - 7, 2.5, 2.5); g.fillStyle = INK; g.fill();
        txt(g, 'near', cx - 50 * Math.cos(ang), cy - 50 * Math.sin(ang) + 30, 9, 1, SANS(9));
        txt(g, 'far', cx + 50 * Math.cos(ang), cy + 50 * Math.sin(ang) + 30, 9, 1, SANS(9));
      },
    },

    // ---------------------------------------------------------------- B29 The Jury
    jury: {
      base(v) { sset({ vote: 0, kid: 0, apart: 0, close: 0, debt: 0 }); sc.x.word = null; sc.x.v = v; },
      shift(v) { if (v === 'fuA') sto({ kid: 1 }, 1.1); if (v === 'fuB') sto({ debt: 1 }, 1.1); },
      acts: {
        'B29-A': { vote: 1 }, 'B29-B': { vote: 1 },
        'B29-FUA-A': { vote: 1, apart: 1 }, 'B29-FUA-B': { vote: 1, close: 1 },
        'B29-FUB-A': { vote: 1 }, 'B29-FUB-B': { vote: 1 },
      },
      async act(a) {
        if (!a || !this.acts[a.id]) { await sleep(900); return; }
        sc.x.word = /-(A|FUA-A|FUB-A)$/.test(a.id) ? 'guilty' : 'not guilty';
        sto(this.acts[a.id], 1.4); if (/FUA-B/.test(a.id)) sc.x.hop = 1;
        await sleep(1400);
      },
      draw(g, t) {
        const vote = V('vote'), kid = V('kid'), apart = V('apart'), close = V('close'), debt = V('debt');
        indoor(g);
        // the bench, with the judge behind it
        drawPerson(g, 200, 112, { scale: 0.62, t, phase: 7, dir: 0 });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.rect(152, 112, 96, 60); g.fill(); g.stroke(); line(g, 146, 112, 254, 112);
        g.strokeStyle = GRAPH; g.lineWidth = 1; line(g, 160, 124, 240, 124); line(g, 160, 160, 240, 160);
        // the jury box: the other jurors behind the rail
        [34, 62, 90].forEach((x, i) => drawPerson(g, x, 168, { scale: 0.55, t, phase: 10 + i, dir: 0.5 }));
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.rect(14, 160, 110, 50); g.fill(); g.stroke();
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (let x = 26; x < 124; x += 12) line(g, x, 166, x, 204);
        // the evidence table: a tin of formula (or, in fuB, a stack of chips)
        table(g, 250, 296, 186);
        const tin = 1 - debt;
        if (tin > 0.01) {
          g.save(); g.globalAlpha = tin; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
          g.fillRect(265, 168, 16, 18); g.strokeRect(265, 168, 16, 18); ellipse(g, 273, 168, 8, 2.4); g.fill(); g.stroke();
          g.strokeStyle = GRAPH; g.lineWidth = 1; g.strokeRect(268, 174, 10, 6); g.restore();
        }
        if (debt > 0.01) for (let k = 0; k < 4; k++) { coin(g, 266, 184 - k * 3.4, 6, debt); coin(g, 282, 184 - (k % 2) * 3.4, 6, debt * (k < 2 ? 1 : 0)); }
        // the defendant, and (fuA) their baby, tied by a thread
        const dx = 326;
        drawPerson(g, dx, 214, { scale: 0.9, t, phase: 2, dir: -0.5, lArm: [-4, 6] });
        marks(g, 'sweat', dx + 12, 172, 0.8, t);
        if (kid > 0.01) {
          const kx = lerp(364, 390, apart) - close * 12;
          g.save(); g.globalAlpha = kid; drawPerson(g, kx, 214, { scale: 0.5, t, phase: 8, dir: -0.6, hop: hopY() }); g.restore();
          thread(g, dx + 8, 190, kx, 196, 12, kid * (1 - apart * 0.55), apart > 0.5);
          heart(g, (dx + kx) / 2 + 2, 160, 11, close, false);
        }
        // you, in front of the jury box, holding up your verdict
        const yx = 136;
        drawPerson(g, yx, 222, { me: true, scale: 0.9, t, dir: 0.3, lArm: [lerp(-4, -8, vote), lerp(8, -12, vote)] });
        verdict(g, yx - 26, lerp(150, 122, vote), sc.x.word, vote);
      },
    },

    // ---------------------------------------------------------------- B37 The Bank Card
    bankcard: {
      base() { sset({ give: 0, keep: 0, gone: 0 }); },
      acts: { 'B37-A': { give: 1 }, 'B37-B': { keep: 1 } },
      async act(a) {
        const m = a && this.acts[a.id];
        if (!m) { await sleep(900); return; }
        sto(m, 1.3); await sleep(700);
        if (m.keep) sto({ gone: 1 }, 1.0);
        await sleep(900);
      },
      draw(g, t) {
        const give = V('give'), keep = V('keep'), gone = V('gone');
        indoor(g);
        windowFrame(g, 170, 50, 60, 54); moon(g, 186, 66, 7, 1); stars(g, [[216, 64], [208, 90]], 1);
        table(g, 164, 236, 180);
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
        g.beginPath(); g.moveTo(206, 168); g.lineTo(207, 180); g.lineTo(217, 180); g.lineTo(218, 168); g.closePath(); g.fill(); g.stroke();
        steam(g, 212, 166, t);
        const yx = 128, fx = 272;
        drawPerson(g, fx + gone * 10, 214, { scale: 0.9, t, phase: 3, dir: lerp(-0.6, 0.9, gone), lArm: [lerp(-12, -4, Math.max(give, gone)), lerp(0, 8, Math.max(give, gone))] });
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: 0.6, rArm: [lerp(8, 3, keep), lerp(4, 9, keep)] });
        thread(g, yx + 4, 166, fx - 4, 166, 44, 1 - gone * 0.9);
        const cx = lerp(lerp(152, 244, give), 142, keep), cy = lerp(lerp(196, 198, give), 204, keep);
        card(g, cx, cy, lerp(-0.1, 0.1, give), 1 - keep * 0.35);
      },
    },

    // ---------------------------------------------------------------- D8 The Waiting List
    waitlist: {
      base() { sset({ call: 0, walk: 0, wait: 0 }); },
      acts: { 'D8-A': { call: 1 }, 'D8-B': { wait: 1 } },
      async act(a) {
        const m = a && this.acts[a.id];
        if (!m) { await sleep(900); return; }
        sto(m, 1.6);
        if (m.call) { await sleep(600); sto({ walk: 1 }, 0.9); await sleep(1100); } else await sleep(1300);
      },
      draw(g, t) {
        const call = V('call'), walk = V('walk'), wait = V('wait');
        parkBack(g, t, [[24, 128, 0.5]]);
        // the hospital: a plain building with a plus
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.rect(300, 70, 96, 142); g.fill(); g.stroke(); line(g, 296, 70, 400, 70);
        g.lineWidth = 1.2;
        for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) g.strokeRect(310 + c * 28, 108 + r * 24, 14, 12);
        g.lineWidth = 3; line(g, 348, 80, 348, 98); line(g, 339, 89, 357, 89);
        g.lineWidth = 1.6; g.strokeRect(318, 166, 24, 46);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 214, 300, 214);
        // the line of people waiting
        const qx = [282, 254, 226, 198, 170, 142];
        const glance = walk * (1 - Math.abs(walk - 0.5) * 2) * 0.9;
        qx.forEach((x, i) => drawPerson(g, x, 212, { scale: 0.62, t, phase: 20 + i, dir: 0.7 - glance * 1.4 }));
        // your father at the back, in pain; you beside him with the phone
        const fx = lerp(108, 330, walk), fy = lerp(212, 216, walk), fs = 0.72;
        const pathUp = Math.sin(walk * Math.PI) * 14;
        g.save(); g.globalAlpha = 1 - clamp01((walk - 0.85) * 6); drawPerson(g, fx, fy + pathUp * 0.7, { scale: fs, t: reduce ? 0 : t * 0.6, phase: 30, dir: lerp(0.4, 0.8, walk) }); g.restore();
        marks(g, 'sweat', fx + 10, 170, 1 - walk, t);
        const yx = 58;
        drawPerson(g, yx, 228, { me: true, scale: 0.9, t, dir: 0.6, rArm: call > 0.02 && wait < 0.5 ? [2, -8] : [4, 8] });
        phone(g, yx + 12, lerp(210, 182, call), 0.2, 1 - wait);
        marks(g, 'waves', yx + 12, 180, call * (1 - walk), t);
        thread(g, yx + 6, 188, fx - 4, fy - 30, 18, 1 - clamp01((walk - 0.7) * 3));
        hourglass(g, 206, 130, 1 - walk * 0.9, t);
        txt(g, 'eight months', 206, 154, 10, 1 - walk * 0.9, SANS(10));
        heart(g, (yx + fx) / 2 + 4, 150, 11, wait, false);
      },
    },

    // ---------------------------------------------------------------- B40 The Dinner Joke
    dinner: {
      base(v) { sset({ joke: 1, laugh: 1, speak: 0, quiet: 0, smile: 0, friend: 0, slack: 0 }); if (v === 'fu') sset({ laugh: 0.6 }); },
      shift(v) { if (v === 'fu') sto({ friend: 1 }, 1.1); },
      acts: {
        'B40-A': { speak: 1, laugh: 0 }, 'B40-B': { quiet: 1 }, 'B40-C': { smile: 1 },
        'B40-FU-A': { speak: 1, laugh: 0 }, 'B40-FU-B': { quiet: 1, slack: 1 },
      },
      async act(a) { await actor(this.acts, 1.4)(a); if (a && /-(A|FU-A)$/.test(a.id)) sc.x.hop = 1; },
      draw(g, t) {
        const joke = V('joke'), laugh = V('laugh'), speak = V('speak'), quiet = V('quiet'), smile = V('smile'), friend = V('friend'), slack = V('slack');
        indoor(g);
        // back wall window (fu: your friend is out there, tied to you)
        windowFrame(g, 300, 40, 64, 58);
        if (friend > 0.01) {
          g.save(); g.globalAlpha = friend; g.beginPath(); g.rect(301, 41, 62, 56); g.clip();
          g.strokeStyle = HAIR; line(g, 300, 90, 364, 90);
          drawPerson(g, 332, 92, { scale: 0.5, t, phase: 40, dir: -0.4 }); g.restore();
          g.strokeStyle = INK; g.lineWidth = 1.2; line(g, 332, 40, 332, 98); line(g, 300, 69, 364, 69);
        }
        // around the table
        const seats = [[92, 3], [150, 12], [206, 13], [322, 15]];
        seats.forEach(([x, ph], i) => drawPerson(g, x, 180, { scale: 0.85, t, phase: ph, dir: i === 0 ? 0.6 : (speak > 0.5 ? 0.9 : 0.1), hop: 0 }));
        const yx = 264;
        drawPerson(g, yx, 180 - speak * 6, { me: true, scale: 0.85, t, dir: lerp(-0.6, 0, quiet), hop: hopY() });
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.rect(60, 172, 290, 22); g.fill(); g.stroke();
        line(g, 72, 194, 72, 210); line(g, 338, 194, 338, 210);
        g.strokeStyle = GRAPH; g.lineWidth = 1; for (const x of [92, 150, 206, 264, 322]) { ellipse(g, x, 176, 12, 2.6); g.stroke(); }
        // the joke: a scrawl, not words
        bubble(g, 70, 118, 70, 26, 88, 140, joke * (1 - speak * 0.5));
        if (joke > 0.01) {
          g.save(); g.globalAlpha = joke * (1 - speak * 0.5); g.strokeStyle = INK; g.lineWidth = 1.3; g.beginPath();
          for (let k = 0; k <= 12; k++) { const x = 46 + k * 4, y = 118 + (k % 2 ? -4 : 4); k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
        }
        // the laughter around the table
        const ha = (x, y, a, k) => txt(g, 'ha', x, y + (reduce ? 0 : Math.sin(t * 2 + k) * 1.5), 11, a, SERIF(15));
        ha(150, 128, laugh * 0.8, 0); ha(206, 124, laugh * 0.8, 1); ha(322, 126, laugh * 0.8, 2);
        ha(yx + 14, 124, smile * 0.8, 3);
        // you speak up
        bubble(g, yx - 6, 112, 34, 20, yx - 2, 128, speak);
        if (speak > 0.01) { g.save(); g.globalAlpha = speak; g.strokeStyle = INK; g.lineWidth = 1.6; line(g, yx - 16, 112, yx + 4, 112); g.restore(); }
        if (friend > 0.01) thread(g, yx + 6, 144, 316, 92, 10, friend * (1 - slack * 0.6), slack > 0.5);
      },
    },

    // ---------------------------------------------------------------- B21 The Million-Dollar Button
    button: {
      base(v) { sset({ press: 0, back: 0, money: 0, lose: 0, many: 0, rich: 0 }); },
      shift(v) { if (v === 'fuA') sto({ many: 1 }, 1.1); if (v === 'fuB') sto({ rich: 1 }, 1.1); },
      acts: {
        'B21-A': { press: 1 }, 'B21-B': { back: 1 },
        'B21-FUA-A': { press: 1 }, 'B21-FUA-B': { back: 1 },
        'B21-FUB-A': { press: 1 }, 'B21-FUB-B': { back: 1 },
      },
      async act(a) {
        const m = a && this.acts[a.id];
        if (!m) { await sleep(900); return; }
        sto(m, 2);
        if (m.press) { await sleep(500); sto({ money: 1, lose: 1, press: 0 }, 1.2); await sleep(1000); } else await sleep(1300);
      },
      draw(g, t) {
        const press = V('press'), back = V('back'), money = V('money'), lose = V('lose'), many = V('many'), rich = V('rich');
        parkBack(g, t, []);
        g.strokeStyle = INK; g.lineWidth = 1.4; line(g, 0, 214, 400, 214);
        // the button on its pedestal
        g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.6;
        g.beginPath(); g.rect(172, 160, 36, 54); g.fill(); g.stroke(); line(g, 166, 160, 214, 160);
        const dip = press * 3;
        g.beginPath(); g.moveTo(178, 160); g.bezierCurveTo(178, 146 + dip, 202, 146 + dip, 202, 160); g.closePath(); g.fillStyle = INK; g.fill();
        // your million, appearing beside you
        if (money > 0.01) { for (let k = 0; k < 4; k++) paper(g, 108, 208 - k * 5 - (1 - money) * 6, 26, 7, 0, money); txt(g, '$1,000,000', 108, 176, 10, money, SANS(10)); }
        // you
        const yx = 146 - back * 22;
        drawPerson(g, yx, 214, { me: true, scale: 0.9, t, dir: lerp(0.6, 0.2, back), rArm: [lerp(8, 10, press) - back * 6, lerp(6, -6, press) + back * 3] });
        // the stranger far off, with their thousand
        const one = 1 - many;
        if (one > 0.01) {
          g.save(); g.globalAlpha = one;
          if (rich > 0.01) { // a billionaire on a mountain of coins
            g.save(); g.globalAlpha = one * rich; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.3;
            g.beginPath(); g.moveTo(290, 212); g.quadraticCurveTo(330, 150, 370, 212); g.closePath(); g.fill(); g.stroke();
            for (let r = 0; r < 5; r++) for (let c = 0; c < 6 - r; c++) coin(g, 306 + c * 10 + r * 5, 206 - r * 11, 4.5, one * rich);
            g.restore();
          }
          const sy = lerp(212, 162, rich);
          drawPerson(g, 330, sy, { scale: 0.55, t, phase: 50, dir: -0.4 });
          g.restore();
          if (rich < 0.99) for (let k = 0; k < 3; k++) coin(g, 348 + k * 2, 210 - k * 3.4, 5, one * (1 - rich) * (k === 2 ? 1 - lose : 1));
          txt(g, '$1,000', 330, lerp(166, 120, rich), 10, one * (1 - rich * 0.0), SANS(10));
        }
        // fuA: a thousand strangers
        if (many > 0.01) { crowd(g, 262, 150, 14, 6, 9.4, 9, many, t); txt(g, '× 1,000', 326, 136, 10, many, SANS(10)); }
        // a thin dotted line from the button out to whoever pays
        thread(g, 208, 176, many > 0.5 ? 262 : 320, many > 0.5 ? 160 : lerp(190, 148, rich), 16, 0.5, true);
      },
    },

    // ---------------------------------------------------------------- B01 The Invisible Year
    invisible: {
      base(v) { sset({ ghost: 0.4, same: 0, sneak: 0, all: 0, better: 0, worse: 0 });  },
      shift(v) { if (v === 'fu') sto({ all: 1 }, 1.0); },
      acts: {
        'B01-A': { same: 1 }, 'B01-B': { sneak: 1 },
        'B01-FU-A': { better: 1 }, 'B01-FU-B': { worse: 1 },
      },
      async act(a) { await actor(this.acts, 1.1)(a); },
      draw(g, t) {
        const ghost = V('ghost'), same = V('same'), sneak = V('sneak'), all = V('all'), better = V('better'), worse = V('worse');
        parkBack(g, t, [[30, 150, 0.6], [376, 146, 0.55]]);
        g.strokeStyle = HAIR; g.lineWidth = 8; g.lineCap = 'round';
        g.beginPath(); g.moveTo(0, 222); g.quadraticCurveTo(200, 196, 400, 216); g.stroke();
        // no one is watching: a single closed eye above the park
        g.save(); g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.arc(200, 40, 16, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke();
        g.lineWidth = 1; for (const k of [-0.9, -0.3, 0.3, 0.9]) { const an = Math.PI / 2 + k * 0.5; line(g, 200 + Math.cos(an) * 16, 40 + Math.sin(an) * 16, 200 + Math.cos(an) * 20, 40 + Math.sin(an) * 20); }
        g.restore();
        // a year: twelve small marks, all the same
        g.save(); g.strokeStyle = GRAPH; g.lineWidth = 1; for (let k = 0; k < 12; k++) g.strokeRect(146 + k * 9, 72, 6, 6); g.restore();
        // an unattended crate by the path
        const tip = worse * 0.35;
        g.save(); g.translate(318, 208); g.rotate(tip); g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.5;
        g.fillRect(-18, -16, 36, 16); g.strokeRect(-18, -16, 36, 16); g.strokeStyle = GRAPH; line(g, -18, -8, 18, -8);
        g.strokeStyle = INK; g.lineWidth = 1.2;
        for (let k = 0; k < 4; k++) { if (k === 3 && sneak > 0.5) continue; ellipse(g, -12 + k * 8, -19, 4, 4); g.fill(); g.stroke(); }
        g.restore();
        // other people, going about their day, looking elsewhere
        const others = [[222, 204, 60, 0.9], [360, 210, 61, 0.7], [90, 212, 62, -0.8]];
        if (all > 0.01) others.push([254, 198, 63, -0.6], [124, 204, 64, 0.8]);
        others.forEach(([x, y, ph, d], i) => {
          faded(g, i < 3 ? lerp(1, ghost, all) : all * ghost, o => drawPerson(o, x, y, { scale: 0.62, t, phase: ph, dir: d }));
        });
        // you: see-through for the year
        const yx = lerp(lerp(170, 204, same), 290, sneak), yy = lerp(216, 206, sneak);
        faded(g, ghost, o => drawPerson(o, yx, yy, { me: true, scale: 0.9, t, dir: lerp(0.4, 0.8, sneak), rArm: sneak > 0.5 ? [9, -2] : [3, 8] }));
        if (sneak > 0.4) { g.save(); g.globalAlpha = ghost + 0.3; g.fillStyle = PAPER; g.strokeStyle = INK; g.lineWidth = 1.2; ellipse(g, yx + 16, yy - 22, 4, 4); g.fill(); g.stroke(); g.restore(); }
        g.save(); g.globalAlpha = ghost; g.strokeStyle = INK; g.setLineDash([2, 3]); g.lineWidth = 1; ellipse(g, yx, yy + 2, 16, 4); g.stroke(); g.restore();
        // fu: how the world ends up
        if (better > 0.01) for (let k = 0; k < 4; k++) { const u = reduce ? 0.5 : (t * 0.25 + k / 4) % 1; heart(g, 110 + k * 64, 170 - u * 40, 9, better * Math.sin(u * Math.PI) * 0.9, false); }
        if (worse > 0.01) for (let k = 0; k < 5; k++) { const u = reduce ? 0.8 : Math.min(1, (t * 0.2 + k / 5) % 1.2); paper(g, 70 + k * 64, lerp(120, 222, u), 10, 7, k * 0.7 + u, worse * 0.8); }
      },
    },
  };
};
