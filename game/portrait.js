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

  // answers: { [questionId]: { picks: { trunk: 'Q1-A', fuA: … }, order: n } }
  function compute(content, answers) {
    const idx = answerIndex(content);
    const done = content.questions.filter(q => answers[q.id]);
    const count = done.length;
    const picked = new Set();
    done.forEach(q => Object.values(answers[q.id].picks).forEach(id => picked.add(id)));

    // One answer, as a plain fact: what you chose, and in which question.
    const fact = id => { const e = idx[id]; return { id, title: e.q.title, did: e.a.did || e.a.text }; };

    const axes = content.axes.map(ax => {
      let score = 0, got = 0, total = 0, touched = 0;
      const pulls = []; // every picked answer that moved this axis, with its weighted push
      content.questions.forEach(q => {
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

    // The stop that most wants answering: the least-certain axis, and the open question that probes it hardest.
    let calling = null;
    const open = content.questions.filter(q => !answers[q.id]);
    if (count && open.length) {
      const weakest = axes.slice().sort((a, b) => a.confidence - b.confidence)[0];
      calling = open.slice().sort((a, b) => possible(b, weakest.id) - possible(a, weakest.id))[0].id;
    }

    const headline = tendencies[0] ? tendencies[0].text : null;
    const description = tendencies.slice(1, 3).map(t => t.text).join(' ');
    const unlocked = LADDER.filter(u => count >= u.at).map(u => u.key);
    const next = LADDER.find(u => count < u.at) || null;
    const prevAt = next ? (LADDER.filter(u => u.at < next.at).pop() || { at: 0 }).at : 0;
    const total = content.questions.length;

    return {
      count, complete: count >= total, axes, tendencies, headline, description, protect, trade, tensions, notes, calling,
      unlocked, has: k => unlocked.includes(k),
      next: next && { name: next.name, key: next.key, filled: count - prevAt, dots: next.at - prevAt },
      code: axes.map(a => a.letter).join(''),
    };
  }

  const api = { compute, LADDER, possible };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TernPortrait = api;
})(typeof window !== 'undefined' ? window : globalThis);
