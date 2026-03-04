# AGENTS.md — Tern Pattern Library

This is the institutional memory of the codebase across agent sessions and context windows. It is append-only. Every agent that works on Tern adds to it. Never delete an entry — mark it `[SUPERSEDED]` with a note if it's no longer accurate.

**Read this before starting work. Append to this before ending your session.**

---

## Entry Format

```
### [YYYY-MM] — [Topic]
**Context:** What were you doing when you discovered this?
**Discovery:** What did you learn?
**Action:** What should a future agent do differently because of this?
```

---

## Entries

### 2026-02 — Project Initialization
**Context:** Initial repo setup and documentation pass.
**Discovery:** The framework (scenario branching + axis scoring + code generation) is intentionally domain-agnostic. The engine and folder structure support future domains without code changes — only new data files. Ethics domain is V1. Parenting is planned for V2.
**Action:** When adding any feature, ask: "does this work for any domain, or only ethics?" Always prefer domain-agnostic implementations. Never hardcode domain-specific values into engine files.

### 2026-02 — Follow-up Answer Weighting
**Context:** Designing the axis scoring system.
**Discovery:** A single trunk answer is often ambiguous — two people can choose the same option for completely different reasons. Follow-up answers reveal the *why*. Follow-up answers carry more scoring weight (1.5x default, 2x for high-stakes follow-ups like Q1-FU-B).
**Action:** When adjusting scoring, bias follow-up answers more heavily. See `docs/SCORING.md` for weights and rationale.

### 2026-02 — Illustration Swap Must Precede Text Update
**Context:** Designing the follow-up transition animation.
**Discovery:** The follow-up illustration swap is the most important interaction in the app. The image must change *before* the question text changes — this is what makes the follow-up feel like a real contextual shift. Getting this order wrong flattens the emotional impact entirely.
**Action:** Always sequence: illustration fade out → illustration fade in → question text update. Never update text and image simultaneously. See `docs/DESIGN.md` section 8.

### 2026-02 — No Progress Numbers, Ever
**Context:** Designing the progress indicator.
**Discovery:** Showing "Question 4 of 11" turns the experience into a test. Users start rushing rather than sitting with questions. The quiet progress bar with no numbers is a deliberate product decision.
**Action:** Do not add question numbers, step counts, or percentage text anywhere in the UI. Non-negotiable.

### 2026-02 — Conflict Avoidance Is a Pattern, Not an Axis
**Context:** Mapping Q5 (The Inheritance) to axes.
**Discovery:** Conflict avoidance is a detectable behavioral pattern, not an axis. It shows when a user gives a passive trunk answer on Q5 but an active answer on the follow-up when permission is explicitly granted. This gap is revealing data.
**Action:** Do not add a Conflict Avoidance axis. Detect via the logic in `docs/SCORING.md` and incorporate into the distinction paragraph for affected users.

### 2026-02 — questions.js Is the Assessment Instrument, Not UI Copy
**Context:** Designing the data architecture.
**Discovery:** Question wording, answer phrasing, and follow-up triggers directly affect scoring validity. Small wording changes can shift which axis a question measures or make one answer obviously correct, invalidating the question.
**Action:** Never hardcode question content in components. Never change question wording without reviewing axis nudge validity and updating `docs/QUESTIONS.md`.

### 2026-02 — Two-Phase Assessment Model Is Architectural
**Context:** Designing the adaptive assessment experience.
**Discovery:** The assessment runs in two distinct phases: a fixed core set (same for all users) producing the code, followed by an adaptive depth graph (personalized per axis confidence) producing the distinction. Collapsing these loses both social value and analytical precision.
**Action:** Do not merge the two phases. Do not make the core set adaptive. See `docs/ARCHITECTURE.md`, `docs/SCORING.md`, `docs/VISION.md`.

### 2026-02 — Core Set Must Stay Fixed for Social Reasons
**Context:** Considering whether to personalize question order or selection.
**Discovery:** The core set's social value depends entirely on every user having seen the same questions. If users get different questions, they can't compare notes or recognize shared experiences. This shared reference layer is a core product value.
**Action:** Never randomize, personalize, or adapt the core question set. Personalization only happens in the depth graph.

### 2026-02 — Inconsistency Is Always Meaningful by Question Design
**Context:** Designing inconsistency handling.
**Discovery:** The question library is designed so any combination of answers has a coherent axis-model explanation. Apparent inconsistency is almost always meaningful — two framings of the same axis producing different answers under different emotional conditions. True noise should be impossible if questions are designed correctly.
**Action:** Do not implement re-asking in the core set. In the depth graph, queue a clarifying question with *"Something came up that we want to explore."* Never make the user feel corrected. See `docs/SCORING.md`.

### 2026-02 — Seven Axes Reduced to Five
**Context:** Designing the code notation system.
**Discovery:** Seven axes produce 128 letter combinations — too many to be memorable or socially useful. Five axes produce 32 combinations: enough variety to feel specific, few enough to be memorable. The reduction collapsed A+F into O/R (both measuring consequentialist vs. deontological reasoning) and absorbed E (Proximity) into L/P (closeness to people is a form of loyalty). The five-axis model retains all meaningful philosophical dimensions.
**Action:** The Ethics domain has exactly five axes: O/R, C/I, H/T, L/P, S/D. Do not add axes. Do not re-expand to seven. Any new domain should also aim for 4–6 axes maximum. See `docs/SCORING.md`.

### 2026-02 — No Named Archetypes
**Context:** Simplifying the result model.
**Discovery:** Named foundation archetypes ("The Pragmatic Rebel") add an interpretive layer that pre-digests the result for the user rather than letting them engage with it. The five-letter code becomes meaningful through use and conversation — like MBTI, the letters carry the identity. A pre-interpreted name is slightly paternalistic and adds a taxonomy that has to be maintained and that drifts toward kitsch.
**Action:** Do not introduce named archetypes, an `archetypes.js` file, or foundation profile types. The result is the code + radar chart + distinction paragraph. If future agents suggest adding named archetypes, refer them to this entry.

### 2026-02 — Code Letter Reveal Is a Designed Moment
**Context:** Designing the code reveal animation.
**Discovery:** Revealing all five letters simultaneously wastes the most important moment in the experience. Letters materializing one at a time — with brief pauses, like the system is arriving at each conclusion — turns the code reveal into an event. This is the payoff of the whole core experience and must be treated as such.
**Action:** Always reveal letters sequentially, left to right, ~300ms per letter with ~200ms pauses. Never reveal all simultaneously. See `docs/DESIGN.md` section 8 — Code Letter Reveal. This animation is non-negotiable.

### 2026-02 — Distinction Is Radar Chart Plus Generated Paragraph
**Context:** Designing the paid tier result.
**Discovery:** The distinction needed to do two things: show magnitude (which the code alone doesn't convey) and surface what's specific and interesting about this particular profile. A radar chart handles magnitude visually. A generated paragraph handles specificity in language. Together they're stronger than either alone. The paragraph must feel like something a perceptive person observed — not a template, not a summary, not flattering.
**Action:** The distinction always has both components. Do not ship a distinction with only a radar chart or only a paragraph. The paragraph is generated from axis scores + depth path, and must follow the result copy principles in `docs/DESIGN.md` Section 3.

### 2026-02 — Game-Feel Is a Design Principle, Not a Feature
**Context:** Articulating what makes Tern engaging beyond its content.
**Discovery:** Tern should feel like a game — not gamified (no points, badges, streaks) but genuinely engaging through intrinsic design: pacing, anticipation, satisfying reveals, the sense of building toward something. This quality is structural — it comes from question design, transition timing, and reveal choreography — and can be destroyed by adding friction, clinical language, loading states, or treating result screens as information pages rather than moments.
**Action:** Evaluate every implementation decision against game-feel: does this make the experience feel more like something you're moving through, or does it flatten that quality? Protect the letter reveal animation, the illustration swap sequencing, the phase transition pacing, and the absence of progress numbers. See `docs/DESIGN.md` Section 1 and `docs/VISION.md` — Game Feel.

### 2026-02 — Phase Transitions Are Arrival Moments
**Context:** Designing convergence offer, code reveal, and distinction reveal screens.
**Discovery:** Phase transition screens — convergence offer, code reveal, distinction reveal — are fundamentally different from question screens. They are destinations, not steps. They require slower, more deliberate animation (800ms out, 1000ms in vs. 400ms/800ms for questions) and staggered text elements that feel like arriving somewhere rather than navigating to a page.
**Action:** Always use the phase transition animation timings for non-question screens. Never use the question transition timings for arrival screens. See `docs/DESIGN.md` section 8 — Phase Transitions.

### 2026-02 — Depth Illustration Preloading Timing
**Context:** Designing illustration loading for the two-phase model.
**Discovery:** Core illustrations can be preloaded on init. Depth illustrations cannot all be preloaded on init — we don't know which axes will be lowest-confidence until the core set runs. Preloading all depth illustrations regardless would be a large unnecessary payload.
**Action:** Preload core illustrations on init. After the code is determined, preload depth illustrations for nodes whose probesAxes include the lowest-confidence axes. See `docs/ARCHITECTURE.md` — Illustration Loading.

---

*Append new entries below this line. Date and topic are required.*

### 2026-03 — Canonical UX Simulation Script Added
**Context:** User requested a comprehensive walkthrough of three full assessment runs (questions, answers, follow-ups, scoring, and results) to experience Tern end-to-end from docs alone.
**Discovery:** The workspace is currently documentation-only (no `src/` tree), so core question text and scoring are fully canonical from docs, while depth-node wording must be represented as explicit examples rather than verbatim nodes.
**Action:** Use `docs/SIMULATIONS.md` as the canonical walkthrough artifact for demos and stakeholder onboarding. Keep core flows exact to `docs/QUESTIONS.md` + `docs/SCORING.md`, and label depth paths as representative until `src/data/depthGraph.js` is available in-repo.

### 2026-03 — Assumptions Block Standard for Question Clarity
**Context:** Content review identified that underspecified scenarios let users project their own missing details, reducing comparability and introducing interpretation noise.
**Discovery:** Adding explicit assumptions per question (time pressure, available alternatives, who is involved) preserves nuance while keeping prompts identity-neutral and consistent with the no-noise guarantee. This improves answer quality without requiring adaptive core questions.
**Action:** In `docs/QUESTIONS.md`, require `assumptions` for core and depth schemas and include global + follow-up assumptions for every core question. Keep identity-neutral specificity by default, and only add demographic cues when the cue itself is the variable being probed.

### 2026-03 — H/T Rebalance via Thought-Oriented Core Nudges
**Context:** After rewriting question copy for explicit assumptions and identity-neutral specificity, a second pass was requested to rebalance scoring nudges and update downstream scoring documentation.
**Discovery:** The H/T axis was overly Heart-skewed in core prompts. Adding modest `H-` nudges to clearly analytic/procedural options improved expressiveness without changing branching structure or expected golden test codes.
**Action:** Keep Thought-direction signal in core options where users are explicitly choosing process/analysis over relational intuition (Q4-B, Q5-A, Q6-A, Q6-FU-A, Q7-A, Q9-B, Q10-B, Q11-C). After any nudge change, recompute normalization ranges and update golden test math in `docs/SCORING.md` and any simulation artifacts that include numeric traces.

### 2026-03 — Final Report Must Be Scan-Readable Before Deep Reading
**Context:** After tone and specificity updates, focus shifted to improving the final report user experience (distinction screen readability).
**Discovery:** Users need a fast orientation layer before reading the 3–4 sentence distinction paragraph. A fixed content hierarchy improves comprehension: code first, quick summary, chart, short axis rows, then paragraph.
**Action:** Keep final report order fixed and lightweight: `code -> one-line summary -> radar -> 5-row axis breakdown -> paragraph`. Avoid method jargon in user copy. Keep paragraph concise and readable on mobile (`max-width` constraint, generous line height).

### 2026-03 — Distinction Copy Baseline: Plain, Short, High-Signal
**Context:** Follow-up pass focused on improving final report readability and tone consistency after question rewrites and nudge rebalancing.
**Discovery:** Distinction sentence templates were semantically strong but too long/abstract in places. Shorter sentence patterns with one explicit tension line maximum improve comprehension and preserve voice.
**Action:** In `docs/SCORING.md`, keep distinction templates in plain language, second person, and concise structure (target ~22 words average sentence length). Avoid scoring-jargon in user-facing output and keep paragraph assembly constrained for scan-readability.

### 2026-03 — Distinction Report Terminology Alignment
**Context:** Documentation drift emerged after adding final-report readability requirements (summary + axis breakdown) while older docs still described distinction as only radar + paragraph.
**Discovery:** Treating radar+paragraph as core analytic components and summary+axis rows as presentation layers keeps conceptual consistency across Vision, Architecture, Design, README, and Scoring docs.
**Action:** Use "distinction report" for the user-facing artifact and "core analytic components" for scoring outputs. Keep both terms synchronized when updating docs.

### 2026-03 — Documentation Consistency Audit and Drift Fixes
**Context:** Requested full-documentation audit after multiple content, scoring, and UX-spec passes.
**Discovery:** Most drift came from cross-doc terminology lag (distinction components vs distinction report UI) and one critical stale logic snippet (`conflictAvoidant` IDs) in `docs/SCORING.md`.
**Action:** When any spec changes result presentation or scoring semantics, propagate updates across `README.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/VISION.md`, `docs/SCORING.md`, and `docs/SIMULATIONS.md` in the same session; re-run grep checks for stale IDs/constants immediately.

### 2026-03 — Cursor Rules Derived from cursor.md and Docs
**Context:** User requested deep repo read, feedback, and Cursor rules based on conventions.
**Discovery:** The repo is documentation-only (no `src/` in this snapshot). All product and technical constraints live in cursor.md, ARCHITECTURE, SCORING, DESIGN, QUESTIONS, AGENTS. Rules can be split into: read-docs-first + model (always apply), data layer, engine, game-feel/UI, and docs propagation (file-scoped).
**Action:** Use `.cursor/rules/` for Tern-specific guidance: `tern-read-docs-first.mdc` and `tern-model-and-result.mdc` are alwaysApply; `tern-data-layer.mdc`, `tern-engine.mdc`, `tern-game-feel-and-ui.mdc`, `tern-docs-propagation.mdc` use globs. When adding new constraints, consider adding or updating a rule so Cursor applies them in the right context.
