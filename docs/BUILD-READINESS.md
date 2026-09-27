# Build Readiness — Tern V1

> **Status (2026-09-27): RE-PLANNING — not ready to build.** The experience model changed from "test, then result" to a map with a growing portrait and unlockable worlds (`docs/PLAN-progression.md`). The spec docs describe the old model until Phase 1 of the roadmap (`docs/VISION.md` → Roadmap) is done. The checklist directly below is the current gate. The older items further down were completed against the old model and are kept for history.

## Current Gate — Phase 1: Decide and Design

### Ken's rulings (`docs/PLAN-progression.md` §10): all made 2026-09-27
- [x] World unlock rule: all 12 core → Neighborhood; about two-thirds of each world → the next
- [x] Portrait text: authored tendency library with rules
- [x] Unlock meter: dots, no numbers
- [x] Save: on-device autosave in V1; magic link in Phase 4
- [x] Core 12 approved (the judge's 12)
- [x] Headline can change, and says so
- [x] Worlds: Park → Neighborhood → City → Coast → Observatory
- [x] How others answered: not in V1
- [x] Conflict avoidance becomes the tendency "You avoid open conflict"

### Content
- [x] Question library expanded and judged (`docs/QUESTION-BANK.md`, `docs/question-bank-wip/`)
- [x] Existing Q1–Q11 and D1–D12 revised to the no-escape-answer bar
- [x] Core 12 proposed and judge-checked
- [x] D8 wording changed to "father" (moving it into the core happens when QUESTIONS.md is rewritten)
- [ ] A note for every answer option in the core 12
- [ ] Tendency library (about 20 statements with the rule for when each appears) and protect / trade-away rules, tested on sample paths
- [ ] Assign every remaining question to a world

### Visual direction (ratified 2026-09)
- [x] Ink-on-paper park, code-drawn scenes, calm pacing, no wayfinding, Puff characters, character select modal: `docs/DESIGN.md` §0, reference `prototypes/trolley-walk.html`
- [x] Gemini illustration pipeline put on hold (old user action item 12, the Gemini API key, is no longer needed)
- [ ] Prototype's question content re-synced to the current `QUESTIONS.md` and the core 12 (Roadmap Phase 2)

### Spec docs (after the rulings)
- [ ] `VISION.md`: rewrite the two-phase section as the Progression Model
- [ ] `ARCHITECTURE.md`: state becomes worlds, unlocks, portrait and map markers; drop the convergence offer
- [ ] `DESIGN.md`: map, portrait panel, unlock moments, share card at milestones
- [ ] `QUESTIONS.md`: the core 12, and a home world for every question
- [ ] `SCORING.md`: scoring from partial answers, confidence per axis, tendency rules, recomputed ranges
- [ ] `SIMULATIONS.md`: refresh the walkthroughs

---

## Previous Gate (old model) — completed, kept for history

Gaps identified during documentation review, tracked to completion. All agent tasks are done. One user action item remains.

---

## Agent Tasks — All Complete

### 1. Spec exploration mode
**Status:** [x] Done
**File(s):** `docs/ARCHITECTURE.md`, `docs/DESIGN.md`

Added exploration mode spec: behavior, navigation ("See your results" link), exit conditions (user choice or question exhaustion), state transitions, live distinction regeneration. Phase transition diagram added to ARCHITECTURE.md.

### 2. Document convergence fallback
**Status:** [x] Done
**File(s):** `docs/SCORING.md`, `docs/ARCHITECTURE.md`

If all 11 core questions complete without convergence, proceed directly to code reveal. Convergence is an optimization for early exit, not a quality gate.

### 3. Define one-line summary generation rules
**Status:** [x] Done
**File(s):** `docs/SCORING.md`

Algorithm: pick top 3 strongest-signal axes by distance from 5.0, name poles, identify single strongest. Template, examples, and near-midpoint edge case defined.

### 4. Define axis breakdown gloss rules
**Status:** [x] Done
**File(s):** `docs/SCORING.md`

10 templated strings (one per pole letter), not score-dependent. Magnitude communicated by radar chart.

### 5. Spec share card mechanics
**Status:** [x] Done
**File(s):** `docs/DESIGN.md`

Web Share API (primary, mobile) with PNG download fallback (desktop). Hidden off-screen component for html-to-image. iOS Safari mitigation documented. Image-only in V1.

### 6. Write depth graph nodes
**Status:** [x] Done
**File(s):** `docs/QUESTIONS.md`, `scripts/illustrations/manifest.json`

12 nodes (D1–D12). All 5 axes covered (2+ nodes each). 10 cross-axis tensions. 2 clarifying nodes (D11, D12). Manifest updated with depth illustration entries.

### 7. Defer freemium to V2
**Status:** [x] Done
**File(s):** `docs/VISION.md`, `docs/DESIGN.md`, `docs/ARCHITECTURE.md`, `README.md`

V1 ships fully unlocked. Updated VISION.md freemium section to "Monetization (V2)". Removed "free tier"/"paid tier" language from DESIGN.md, ARCHITECTURE.md, and README.md component descriptions.

### 8. Clean up package.json
**Status:** [x] Done
**File(s):** `package.json`

Stripped to metadata + `generate:illustrations` only. Removed broken `build` and `prebuild` scripts.

### 9. Replace NanoBanana with Gemini API
**Status:** [x] Done
**File(s):** `docs/ILLUSTRATION-GENERATION.md`, `docs/ARCHITECTURE.md`, `AGENTS.md`, `.env.example`, `scripts/illustrations/README.md`, `scripts/illustrations/manifest.json`

All references updated: NanoBanana → Gemini API (Imagen). Env var: `GEMINI_API_KEY`. Model: `imagen-3.0-generate-002`. API endpoint: `generativelanguage.googleapis.com`.

### 10. Create generate.js
**Status:** [x] Done
**File(s):** `scripts/illustrations/generate.js`

Rewrote for Gemini Imagen API: base64 response decoding (not URL download), API key as query param, proper error/quota handling. Supports `--dry-run` and `--core-only`. Exits 0 gracefully on missing key or quota errors.

### 11. Update branching strategy
**Status:** [x] Done
**File(s):** `docs/WORKFLOW.md`

Simplified to main-only for V1. Feature branches merge directly to main. V2 note for potential `dev` branch.

---

## User Action Items

### 12. Get Gemini API key
**Status:** [ ] Waiting on user

Obtain a Gemini API key from https://aistudio.google.com/apikey and add to `.env` at repo root:
```
GEMINI_API_KEY=your_key
```

Then test: `node scripts/illustrations/generate.js --dry-run`

---

## Build Readiness: GO (old model — superseded 2026-09-27; see Current Gate above)

All documentation gaps are closed. The project is ready to begin implementation following the order in `docs/WORKFLOW.md`:

1. **Bootstrap project** — `npm create vite@latest . -- --template react`, install deps, configure Vite + Tailwind + PWA
2. **Data layer** — `src/data/questions.js` (from QUESTIONS.md), `src/data/depthGraph.js` (from QUESTIONS.md depth nodes)
3. **Engine layer** — `src/engine/scoring.js` (validate with golden test cases), `src/engine/branching.js`
4. **State layer** — `src/hooks/useAssessment.js`
5. **UI layer** — components per DESIGN.md, `App.jsx` per ARCHITECTURE.md
6. **Illustrations** — `npm run generate:illustrations` (requires GEMINI_API_KEY)
