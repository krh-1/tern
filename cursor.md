# cursor.md — Tern Agent Instructions

This file is read automatically by the Cursor agent at the start of every session. Follow these instructions without exception.

---

## Read This First, Every Time

Before writing any code, read these docs in order:

1. `docs/ARCHITECTURE.md` — system structure, two-phase model, data schemas
2. `docs/SCORING.md` — five axes, letter assignment, code generation, distinction logic
3. `docs/DESIGN.md` — visual system, all six screen states, animation specs
4. `AGENTS.md` — known patterns and gotchas from prior sessions

If modifying questions, the depth graph, or follow-up logic: also read `docs/QUESTIONS.md`.

Before any visual, UI, map, character or animation work: read `docs/DESIGN.md` §0 (the ratified visual direction) and `prototypes/PLAN.md`. The direction for the experience itself (map, portrait, unlocks, worlds) is `docs/PLAN-progression.md`.

Do not skip this step.

---

## Core Rules

### There are no named archetypes
Tern does not use named foundation archetypes ("The Pragmatic Rebel," etc.). The result is a five-letter code, a radar chart, and a distinction paragraph. Do not introduce an `archetypes.js` file. Do not add named profile types. Do not suggest archetype names in any context.

### The five-axis model is fixed
The Ethics domain uses five axes: O/R, C/I, H/T, L/P, S/D. These are fixed. The code is five letters, one per axis, in that order. Do not add axes. Do not remove axes. Do not reorder them. Any change to the axis model requires rewriting the question nudges, the scoring normalization ranges, and this document.

### The code is determined by simple majority
A normalized axis score ≥ 5.0 earns the high-pole letter. Below 5.0 earns the low-pole letter. 51/49 gets the high-pole letter. Do not add weighted thresholds, confidence-adjusted assignments, or fuzzy letter logic. The threshold is 5.0, full stop.

### The core question set is fixed and universal
Every user answers the same core questions in the same order. Do not make the core set adaptive. Do not randomize question order. Do not add personalization logic to core question selection. This is a product decision — the shared question set is what makes Tern social.

### The two-phase model is the architecture
Phase 1 (core set) produces the code. Phase 2 (depth graph) produces the distinction. These are distinct phases with different data sources and routing logic. Do not merge them. Do not treat depth questions as more core questions.

### The phase transition is invisible
No UI element announces the shift from core to depth. The experience is continuous. Do not add headers, labels, progress resets, or explanatory text at the phase boundary.

### questions.js is the single source of truth for core questions
All core question content, nudges, follow-up triggers, and illustration filenames live here. Nothing is hardcoded in components.

### depthGraph.js is the single source of truth for depth questions
All depth graph nodes — content, nudges, axis probe tags, follow-up triggers — live here. Nothing is hardcoded in the engine or components.

### Never change scoring logic without updating SCORING.md
Axis definitions, letter assignments, normalization ranges, convergence thresholds, distinction generation logic — any change must be reflected in `docs/SCORING.md` before the code change merges.

### Never change question content without updating QUESTIONS.md
Questions are the assessment instrument, not UI copy. Wording changes affect scoring validity. Document every change in `docs/QUESTIONS.md`.

### The look is the ink-on-paper park
Pure black and white on paper, code-drawn, isometric park, calm and cozy, no wayfinding, Puff characters with name and look only. No accent colours, dark mode or raster illustrations. Full rules in `docs/DESIGN.md` §0.

### Protect game-feel in every decision
Tern should feel like a game — not gamified, but genuinely engaging, with pacing and anticipation and satisfying reveals. Every implementation decision should be evaluated against this: does it make the experience feel more like something you're moving through, or does it flatten that quality? Specifically:
- Never add loading states — scenes are code-drawn, so transitions can be instant
- Never add progress numbers — the bar communicates progress without making it feel like a test
- The code letter reveal must materialize one letter at a time — do not show all five simultaneously
- Phase transitions are arrival moments, not navigation events — use the slower animation timings
- Do not add any UI chrome that makes the experience feel like an app rather than a journey

### No routing
State-driven rendering only. `App.jsx` conditionally renders based on phase. Do not introduce React Router.

### No backend in V1
Everything is client-side. No API calls, no database, no authentication. Flag backend-requiring features as V2.

### The engine is domain-agnostic
`scoring.js` and `branching.js` do not know which domain is active. Domain specifics live in the data layer. Keep it that way.

---

## Axis Reference (Ethics Domain)

Use these keys in all nudge definitions:

| Key | Axis | High pole | Low pole |
|---|---|---|---|
| `O` | Outcomes vs. Rules | Outcomes (O) | Rules (R) |
| `C` | Collective vs. Individual | Collective (C) | Individual (I) |
| `H` | Heart vs. Thought | Heart (H) | Thought (T) |
| `L` | Loyalty vs. Principle | Loyalty (L) | Principle (P) |
| `S` | System vs. Disruption | System (S) | Disruption (D) |

Nudge format: `O+2` pushes toward Outcomes, `O-2` pushes toward Rules. Positive = high pole, negative = low pole.

---

## Workflow

### For any feature work
```
/workflows:plan     → plan before writing code
/workflows:work     → execute
/workflows:review   → review before done
/workflows:compound → document in AGENTS.md
```

Install:
```
/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

### For content generation (questions, depth nodes, distinction copy)
```bash
./scripts/ralph/ralph.sh --tool claude [max_iterations]
```

Ralph is suited to: generating depth graph candidates, validating axis coverage and no-noise guarantee, generating distinction paragraph variants, building out new domains.

When using Ralph for distinction paragraph generation, include the result copy principles from `docs/DESIGN.md` Section 3 in the PRD. Ralph will otherwise default to generic, flattering, or fantasy-inflected language.

---

## File Responsibilities

| File | Purpose |
|---|---|
| `src/data/questions.js` | Core question set — single source of truth |
| `src/data/depthGraph.js` | Depth graph nodes — single source of truth |
| `src/engine/scoring.js` | Axis math, code generation, convergence, distinction — domain-agnostic |
| `src/engine/branching.js` | Core sequencing + depth graph routing — domain-agnostic |
| `src/hooks/useAssessment.js` | All assessment state across both phases |
| `src/components/*` | Display only — logic belongs in engine and hooks |
| `docs/DESIGN.md` | Visual system — update before changing any visual |
| `docs/SCORING.md` | Axes, code logic, distinction generation — sync with scoring.js |
| `docs/QUESTIONS.md` | Question library documentation |
| `AGENTS.md` | Living pattern library — append after every session |

---

## After Every Session

Append what you learned to `AGENTS.md`:
- Patterns discovered
- Gotchas hit
- Decisions made and why
- Anything a future agent should know before starting

This is not optional.
