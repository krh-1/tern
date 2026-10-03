// Tern portrait engine: turns whatever answers exist so far into the "who you are" panel.
// Pure logic, no DOM. Works in the browser (window.TernPortrait) and in node (module.exports).
(function (root) {
  // The unlock ladder (docs/PLAN-progression.md §5). Unlocks key off how many questions are answered.
  const LADDER = [
    { at: 1, key: 'notes', name: 'Your first answer note' },
    { at: 2, key: 'compass', name: 'Your compass' },
    { at: 4, key: 'headline', name: 'Your one-line summary' },
    { at: 6, key: 'protect', name: 'What you protect' },
    { at: 8, key: 'tension', name: 'Where you’re torn' },
    { at: 10, key: 'allBars', name: 'Your whole compass' },
    { at: 12, key: 'code', name: 'Your code' },
  ];

  const stepWeight = (step, key) => (step && step.weight) || (key === 'trunk' ? 1 : 1.5);

  function answerIndex(content) {
    const idx = {};
    content.questions.forEach(q => Object.entries(q.steps).forEach(([key, s]) =>
      s.answers.forEach(a => { idx[a.id] = { a, q, key, step: s }; })));
    return idx;
  }

  // The most signal a question can carry for one axis (trunk plus its strongest follow-up).
  function possible(q, axis) {
    let trunk = 0, fu = 0;
    Object.entries(q.steps).forEach(([key, s]) => {
      const m = Math.max(0, ...s.answers.map(a => Math.abs((a.nudges || {})[axis] || 0))) * stepWeight(s, key);
      if (key === 'trunk') trunk = m; else fu = Math.max(fu, m);
    });
    return trunk + fu;
  }

  // Score the five axes over a set of questions: lean, confidence, and which answers pulled each way.
  function scoreAxes(content, idx, qs, answers) {
    const fact = id => { const e = idx[id]; return { id, title: e.q.title, did: e.a.did || e.a.text }; };
    return content.axes.map(ax => {
      let score = 0, got = 0, total = 0, touched = 0;
      const pulls = []; // every picked answer that moved this axis, with its weighted push
      qs.forEach(q => {
        const p = possible(q, ax.id);
        total += p;
        if (!answers[q.id] || !p) return;
        got += p; touched++;
        Object.entries(answers[q.id].picks).forEach(([key, id]) => {
          const e = idx[id]; if (!e) return;
          const push = ((e.a.nudges || {})[ax.id] || 0) * stepWeight(e.step, key);
          score += push;
          if (push) pulls.push(Object.assign(fact(id), { push }));
        });
      });
      const lean = got ? Math.max(-1, Math.min(1, score / got * 1.6)) : 0; // -1 … 1 toward neg … pos
      return Object.assign({}, ax, {
        score, lean, touched, confidence: total ? got / total : 0,
        letter: score >= 0 ? ax.pos : ax.neg,
        known: touched >= 2,
        // the answers that pulled you toward your side (strongest first), and the ones that pulled the other way
        toward: pulls.filter(x => (x.push > 0) === (score >= 0)).sort((x, y) => Math.abs(y.push) - Math.abs(x.push)),
        away: pulls.filter(x => (x.push > 0) !== (score >= 0)).sort((x, y) => Math.abs(y.push) - Math.abs(x.push)),
      });
    });
  }

  // answers: { [questionId]: { picks: { trunk: 'Q1-A', fuA: … }, order: n } }
  // opts.opened: ids of worlds that have opened before (they stay open even if a park answer is being redone).
  function compute(content, answers, opts) {
    opts = opts || {};
    const idx = answerIndex(content);
    const worldList = content.worlds || [{ id: 'park' }];
    const home = worldList[0].id;
    const worldOf = q => q.world || home;
    const core = content.questions.filter(q => worldOf(q) === home);
    const done = content.questions.filter(q => answers[q.id]);
    const count = core.filter(q => answers[q.id]).length; // the park's ladder counts park answers
    const picked = new Set();
    done.forEach(q => Object.values(answers[q.id].picks).forEach(id => picked.add(id)));

    // One answer, as a plain fact: what you chose, and in which question.
    const fact = id => { const e = idx[id]; return { id, title: e.q.title, did: e.a.did || e.a.text }; };

    const axes = scoreAxes(content, idx, content.questions, answers); // the compass learns from every answer
    const coreAxes = scoreAxes(content, idx, core, answers); // the code comes from the shared park questions only

    const tendencies = content.tendencies.map((t, i) => {
      const sup = (t.support || []).filter(id => picked.has(id));
      const ag = (t.against || []).filter(id => picked.has(id)).length;
      const qs = new Set(sup.map(id => idx[id] && idx[id].q.id));
      const counter = (t.against || []).filter(id => picked.has(id));
      return Object.assign({}, t, { strength: sup.length - ag, questions: qs.size, evidence: sup.map(fact), counter: counter.map(fact), order: i });
    }).filter(t => t.strength >= (t.min || 2) && t.questions >= 2)
      .sort((a, b) => b.strength - a.strength || (a.priority || 99) - (b.priority || 99) || a.order - b.order);

    const uniq = arr => [...new Set(arr)];
    const protect = uniq(tendencies.flatMap(t => t.protect || [])).slice(0, 4);
    const trade = uniq(tendencies.flatMap(t => t.trade || [])).filter(x => !protect.includes(x)).slice(0, 4);
    const tensions = (content.tensions || []).filter(t => t.when.every(id => picked.has(id)));

    const notes = done.slice().sort((a, b) => answers[a.id].order - answers[b.id].order).map(q => ({
      id: q.id, title: q.title,
      lines: Object.values(answers[q.id].picks).map(id => idx[id]).filter(Boolean).map(e => ({ answer: e.a.text, note: e.a.note })),
    }));

    // Worlds: which are open, how far into each you are, and the chapter each later world adds to your portrait.
    const opened = new Set(opts.opened || []);
    const worlds = [];
    worldList.forEach((w, i) => {
      const qs = content.questions.filter(q => worldOf(q) === w.id);
      const answered = qs.filter(q => answers[q.id]).length;
      let open = i === 0;
      if (i > 0) {
        const prev = worlds[i - 1], need = w.opens === 'all' ? prev.total : Math.ceil(prev.total * 2 / 3);
        open = (!w.soon && qs.length > 0) && ((prev.open && prev.total > 0 && prev.answered >= need) || opened.has(w.id));
        w = Object.assign({}, w, { ready: prev.total > 0 && prev.answered >= need }); // a "soon" world is ready but can't open yet
      }
      const unlocked = (w.ladder || []).filter(u => answered >= u.at).map(u => w.id + ':' + u.key);
      const ch = { id: w.id, name: w.name, chapter: w.chapter, soon: !!w.soon, ready: i === 0 || !!w.ready, open, total: qs.length, answered, unlocked, ladder: w.ladder || [] };
      if (i > 0 && answered) {
        const mine = new Set(qs.map(q => q.id));
        // how you change here: the value pair where this world's answers lean most differently from all your others
        const here = scoreAxes(content, idx, qs, answers), there = scoreAxes(content, idx, content.questions.filter(q => !mine.has(q.id)), answers);
        let best = null;
        here.forEach((a, k) => {
          if (a.touched < 2 || there[k].touched < 2) return;
          const d = a.lean - there[k].lean;
          if (!best || Math.abs(d) > Math.abs(best.d)) best = { axis: a, d };
        });
        if (best) {
          const toward = best.d > 0 ? best.axis.posLabel : best.axis.negLabel;
          ch.shift = Math.abs(best.d) >= 0.3
            ? { text: `${cap(w.closeTo || 'here')}, you lean more toward ${toward.toLowerCase()} than in your other answers.`, axis: best.axis.id, toward,
                facts: (best.d > 0 === best.axis.score >= 0 ? best.axis.toward : best.axis.away).slice(0, 3) }
            : { text: `${cap(w.closeTo || 'here')}, you lean the same way as in your other answers.`, axis: null };
        }
        ch.tendencies = tendencies.filter(t => t.evidence.filter(x => mine.has(idx[x.id].q.id)).length >= 2);
        ch.headline = ch.tendencies[0] ? ch.tendencies[0].text : null;
      }
      worlds.push(ch);
    });
    const openIds = worlds.filter(w => w.open).map(w => w.id);

    // The stop that most wants answering: the least-certain axis, and the open question that probes it hardest.
    let calling = null;
    const reachable = content.questions.filter(q => openIds.includes(worldOf(q)));
    const open = reachable.filter(q => !answers[q.id]);
    if (done.length && open.length) {
      const weakest = scoreAxes(content, idx, reachable, answers).sort((a, b) => a.confidence - b.confidence)[0];
      calling = open.slice().sort((a, b) => possible(b, weakest.id) - possible(a, weakest.id))[0].id;
    }

    const headline = tendencies[0] ? tendencies[0].text : null;
    const description = tendencies.slice(1, 3).map(t => t.text).join(' ');
    const unlocked = LADDER.filter(u => count >= u.at).map(u => u.key).concat(...worlds.map(w => w.unlocked));
    // what's next: the park's ladder first, then the next step in an open world, then the next world
    let next = null;
    const step = LADDER.find(u => count < u.at);
    if (step) {
      const prevAt = (LADDER.filter(u => u.at < step.at).pop() || { at: 0 }).at;
      next = { name: step.name, key: step.key, filled: count - prevAt, dots: step.at - prevAt };
    } else {
      for (const w of worlds.slice(1)) {
        if (!w.open) { next = { name: w.name, key: 'world:' + w.id, world: w.id, soon: w.soon, ready: w.ready }; break; }
        const u = w.ladder.find(x => w.answered < x.at);
        if (u) {
          const prevAt = (w.ladder.filter(x => x.at < u.at).pop() || { at: 0 }).at;
          next = { name: u.name, key: w.id + ':' + u.key, world: w.id, filled: w.answered - prevAt, dots: u.at - prevAt };
          break;
        }
      }
    }

    return {
      count, answered: done.length, complete: count >= core.length, axes, tendencies, headline, description, protect, trade, tensions, notes, calling,
      worlds, openWorlds: openIds, unlocked, has: k => unlocked.includes(k), next,
      code: coreAxes.map(a => a.letter).join(''), codeAxes: coreAxes,
    };
  }
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  const api = { compute, LADDER, possible, scoreAxes };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TernPortrait = api;
})(typeof window !== 'undefined' ? window : globalThis);
