# Architecture — Tern

## Overview

Tern is a fully client-side React PWA. No backend, no database, no API calls in V1. All state is ephemeral — the assessment resets on page reload.

Three conceptual layers:

```
Data Layer          →    Engine Layer         →    UI Layer
(questions.js,           (scoring.js,              (components,
 depthGraph.js)           branching.js,             hooks,
                          useAssessment.js)          App.jsx)
```

The assessment runs in two phases — core set and depth graph — handled by the same engine with different data sources and routing logic. The result is a five-letter code plus, for paid users, a one-line summary, radar chart, axis breakdown, and distinction paragraph. See `docs/SCORING.md` and `docs/VISION.md` for the full rationale.

---

## Data Layer

### `src/data/questions.js`

The core question set. Fixed and universal — every user answers these in the same order. Single source of truth for core question content: text, answers, axis nudges, follow-up triggers, and illustration filenames.

**Schema:**
```js
{
  id: 'Q1',
  title: 'The Trolley Problem',
  illustration: 'Q1.jpg',
  setup: 'A runaway trolley...',          // optional italic scene-setting text
  assumptions: [                          // required scenario constraints
    'No hidden information beyond what is stated.',
    'You must choose now; waiting is not possible.'
  ],
  question: 'Do you pull the lever?',
  phase: 'core',
  answers: [
    {
      id: 'Q1-A',
      text: 'Yes — pull it',
      nudges: {
        O: +2,   // Outcomes vs. Rules → toward Outcomes
        L: +1,   // Loyalty vs. Principle → toward Loyalty
      }
    },
  ],
  followUp: {                             // optional
    trigger: ['Q1-B'],
    illustration: 'Q1-followup-a.jpg',
    setup: 'What if the one person was your mother?',
    assumptions: ['...'],
    question: 'Do you still pull it?',
    answers: [ /* same shape */ ],
    weight: 1.5,
  }
}
```

Axis keys: `O/R` = Outcomes/Rules, `C/I` = Collective/Individual, `H/T` = Heart/Thought, `L/P` = Loyalty/Principle, `S/D` = System/Disruption. Nudges use the axis key with sign: `O+2` pushes toward Outcomes, `O-2` pushes toward Rules.

### `src/data/depthGraph.js`

The depth question graph. A network of nodes tagged with which axes they probe and which tensions they surface. Not a linear sequence — the engine selects the next node based on axis confidence.

**Node schema:**
```js
{
  id: 'D1',
  title: 'The Promise Under Pressure',
  illustration: 'depth/D1.jpg',
  setup: '...',
  assumptions: ['...'],                   // required scenario constraints
  question: '...',
  phase: 'depth',
  probesAxes: ['L', 'H'],                  // primary axes this question moves
  probeTension: 'loyalty_vs_consistency',  // named tension being probed
  isClarifying: false,                     // true = surfaced by inconsistency detection
  answers: [
    {
      id: 'D1-A',
      text: '...',
      nudges: { L: -2, H: +1 }
    }
  ],
  followUp: null | { /* same shape as core follow-up */ },
  weight: 1.0,
}
```

### ~~`src/data/archetypes.js`~~

**This file does not exist in the Tern model.** There are no named foundation archetypes. The result is the five-letter code plus the distinction report (summary, radar, axis breakdown, paragraph). Do not introduce an archetypes file.

---

## Engine Layer

### `src/engine/scoring.js`

Runs in both phases. Accepts answer history and returns axis scores, the code, confidence levels, and distinction outputs.

**Phase 1 output:**
```js
scoringEngine(answers, 'core') → {
  axisScores: { O: 7.2, C: 3.1, H: 8.4, L: 5.0, S: 6.3 },
  axisConfidence: { O: 0.9, C: 0.6, H: 0.85, L: 0.7, S: 0.65 },
  code: 'OCHLS',                          // one letter per axis
  isConverged: false,
  specialPatterns: { conflictAvoidant: false },
}
```

**Phase 2 output:**
```js
scoringEngine(answers, 'depth') → {
  axisScores: { O: 7.4, C: 2.9, H: 8.6, L: 4.8, S: 6.5 },
  axisConfidence: { O: 0.95, C: 0.85, H: 0.92, L: 0.88, S: 0.9 },
  code: 'OCHLS',                          // unchanged from Phase 1
  isDistinctionReady: true,
  distinction: {
    radarData: [ /* per-axis score for chart */ ],
    paragraph: '...',                     // generated from scores + depth path
    tensionsFound: ['L-near-midpoint', 'H-O-correlation'],
    conflictAvoidant: false,
  },
}
```

### `src/engine/branching.js`

Handles question sequencing for both phases.

**Core phase:**
```js
getNextCore(currentQuestion, answerId, allCoreQuestions) → Question | null
// check follow-up trigger → advance → null when core set complete
```

**Depth phase:**
```js
getNextDepth(axisConfidence, code, answeredIds, depthGraph, pendingClarifying) → Question | null
// surface pending clarifying question first if queued
// otherwise find lowest-confidence axis → find unasked candidate → null when depth complete
```

**Inconsistency detection:**
```js
detectInconsistency(recentAnswers, depthGraph) → Question | null
// returns a clarifying depth node if meaningful inconsistency detected, else null
```

---

## State Layer

### `src/hooks/useAssessment.js`

All assessment state lives here. Components are thin — they call this hook.

**State:**
```js
{
  // Phase management
  phase: 'core' | 'convergence-offer' | 'code-reveal' | 'depth' | 'distinction-reveal' | 'exploration' | 'share',

  // Current question
  currentQuestion: Question | null,

  // Full answer history across both phases
  answerHistory: AnswerRecord[],          // { questionId, answerId, nudges, weight, phase }

  // Scoring outputs — updated after every answer
  axisScores: AxisScores | null,          // { O, C, H, L, S } normalized 0–10
  axisConfidence: AxisConfidence | null,  // { O, C, H, L, S } 0–1
  code: string | null,                   // e.g. 'OCHLS' — set when phase 1 converges

  // Phase 2 result
  distinction: {
    radarData: RadarPoint[],
    paragraph: string,
    tensionsFound: string[],
  } | null,

  // Special patterns
  specialPatterns: { conflictAvoidant: boolean },

  // Inconsistency
  pendingClarifyingQuestion: Question | null,

  // Progress
  coreProgress: number,                  // 0–1, core set question completion
  depthProgress: number,                 // 0–1, axis confidence across all axes
}
```

**Actions:**
- `submitAnswer(answerId)` — records answer, recomputes scores, advances question or phase
- `acceptCodeOffer()` — user accepts early convergence offer, transitions to code-reveal
- `continueToDepth()` — user declines early offer or completes core set, transitions to depth
- `continueExploring()` — user continues after distinction reveal
- `restart()` — resets all state
- `goToShare()` — transitions to share phase

---

## UI Layer

### `App.jsx`

Renders one screen based on `phase`. No routing.

```jsx
if (['core', 'depth', 'exploration'].includes(phase)) return <QuestionCard />
if (phase === 'convergence-offer') return <ConvergenceOffer />
if (phase === 'code-reveal') return <CodeReveal />
if (phase === 'distinction-reveal') return <DistinctionReveal />
if (phase === 'share') return <ShareCard />
```

### Components

| Component | Role |
|---|---|
| `QuestionCard.jsx` | Full-bleed illustration + setup + question + answers + progress. All question phases. |
| `AnswerButton.jsx` | Single answer option, manages visual selected state |
| `ProgressBar.jsx` | Fixed bottom bar, no labels. Core: question progress. Depth: axis confidence. |
| `ConvergenceOffer.jsx` | Mid-assessment invitation screen — *"We have a pretty clear picture of you."* |
| `CodeReveal.jsx` | Five-letter code reveal — the primary result screen. Free tier endpoint. |
| `DistinctionReveal.jsx` | Code + one-line summary + radar chart + axis breakdown + distinction paragraph. Paid tier endpoint. |
| `RadarChart.jsx` | Recharts spider chart, five axes, accent color fill |
| `ShareCard.jsx` | Off-screen rendered PNG via html-to-image. Free: code only. Paid: code + chart + paragraph excerpt. |

---

## Animation Critical Path

```
User taps answer
  → AnswerButton selected state (180ms)
  → 300ms pause
  → Illustration fades out (400ms)
  → New illustration fades in (800ms)
  → Question text cross-fades (500ms, offset 300ms into illustration fade)
  → Answer buttons stagger in (100ms apart, from 900ms total)
```

Phase transitions (convergence offer, code reveal, distinction reveal) use a longer, more deliberate fade — 600ms out, 1000ms in, staggered text elements. These are arrival moments, not navigation events. Full animation spec: `docs/DESIGN.md` section 8.

---

## Illustration Loading

Core illustrations preloaded on init. Depth illustrations preloaded after code is determined — we then know which depth nodes are candidates.

```js
// On init — core set
coreQuestions.forEach(q => {
  new Image().src = `/illustrations/${q.illustration}`
  if (q.followUp) new Image().src = `/illustrations/${q.followUp.illustration}`
})

// After code determined — depth graph candidates
const candidates = depthGraph.filter(q =>
  q.probesAxes.some(axis => axisConfidence[axis] < 0.75)
)
candidates.forEach(q => {
  new Image().src = `/illustrations/${q.illustration}`
})
```

---

## PWA Configuration

Handled by `vite-plugin-pwa` in `vite.config.js`.

- Display: `standalone`
- Theme color: `#1C1C1E`
- Cache strategy: `CacheFirst` for illustrations, `NetworkFirst` for app shell
- Offline: fully functional after first load

---

## Adding a New Domain

1. Create `src/data/{domain}-questions.js` — core question set, same schema, new axis keys
2. Create `src/data/{domain}-depthGraph.js` — depth graph nodes, same schema
3. Add domain config to `useAssessment` initialization — axis definitions, letter assignments
4. Add illustrations to `/public/illustrations/{domain}/`

No engine changes needed. The scoring and branching engines are domain-agnostic by design.

---

## Known V1 Constraints

- No persistence — resets on reload, intentional
- No accounts — V2 feature
- Illustrations are static pre-generated assets
- Share card (html-to-image) has inconsistent behavior on iOS Safari — test carefully
- Distinction paragraph generation in V1 is rule-based (pattern matching on axis scores + depth path). V2 may use a language model for more naturalistic output.
- The depth graph in V1 is small (10–15 nodes). V2 question pipeline will grow it significantly.
