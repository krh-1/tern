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
> **Still binding (2026-09):** applies unchanged to the code-drawn scenes inside the question card — the scene changes first, then the text.
**Context:** Designing the follow-up transition animation.
**Discovery:** The follow-up illustration swap is the most important interaction in the app. The image must change *before* the question text changes — this is what makes the follow-up feel like a real contextual shift. Getting this order wrong flattens the emotional impact entirely.
**Action:** Always sequence: illustration fade out → illustration fade in → question text update. Never update text and image simultaneously. See `docs/DESIGN.md` section 8.

### 2026-02 — No Progress Numbers, Ever [AMENDED 2026-09 — unlock closeness shown as dots (●●○○); still no question counts or percentages]
**Context:** Designing the progress indicator.
**Discovery:** Showing "Question 4 of 11" turns the experience into a test. Users start rushing rather than sitting with questions. The quiet progress bar with no numbers is a deliberate product decision.
**Action:** Do not add question numbers, step counts, or percentage text anywhere in the UI. Non-negotiable.

### 2026-02 — Conflict Avoidance Is a Pattern, Not an Axis [AMENDED 2026-09 — now the portrait line "You avoid open conflict" (tendency `avoid-conflict`), per Ken's 2026-09-27 ruling; still not an axis]
**Context:** Mapping Q5 (The Inheritance) to axes.
**Discovery:** Conflict avoidance is a detectable behavioral pattern, not an axis. It shows when a user gives a passive trunk answer on Q5 but an active answer on the follow-up when permission is explicitly granted. This gap is revealing data.
**Action:** Do not add a Conflict Avoidance axis. Detect via the logic in `docs/SCORING.md` and incorporate into the distinction paragraph for affected users.

### 2026-02 — questions.js Is the Assessment Instrument, Not UI Copy
**Context:** Designing the data architecture.
**Discovery:** Question wording, answer phrasing, and follow-up triggers directly affect scoring validity. Small wording changes can shift which axis a question measures or make one answer obviously correct, invalidating the question.
**Action:** Never hardcode question content in components. Never change question wording without reviewing axis nudge validity and updating `docs/QUESTIONS.md`.

### 2026-02 — Two-Phase Assessment Model Is Architectural [SUPERSEDED 2026-09-27 — replaced by the Progression Model (worlds + unlock ladder), docs/PLAN-progression.md]
**Context:** Designing the adaptive assessment experience.
**Discovery:** The assessment runs in two distinct phases: a fixed core set (same for all users) producing the code, followed by an adaptive depth graph (personalized per axis confidence) producing the distinction. Collapsing these loses both social value and analytical precision.
**Action:** Do not merge the two phases. Do not make the core set adaptive. See `docs/ARCHITECTURE.md`, `docs/SCORING.md`, `docs/VISION.md`.

### 2026-02 — Core Set Must Stay Fixed for Social Reasons [AMENDED 2026-09 — same 12 for everyone, but any order (free roam)]
**Context:** Considering whether to personalize question order or selection.
**Discovery:** The core set's social value depends entirely on every user having seen the same questions. If users get different questions, they can't compare notes or recognize shared experiences. This shared reference layer is a core product value.
**Action:** Never randomize, personalize, or adapt the core question set. Personalization only happens in the depth graph.

### 2026-02 — Inconsistency Is Always Meaningful by Question Design [AMENDED 2026-10 — answers that pull against each other now show as "Where you're torn" tensions; clarifying stops are not built]
**Context:** Designing inconsistency handling.
**Discovery:** The question library is designed so any combination of answers has a coherent axis-model explanation. Apparent inconsistency is almost always meaningful — two framings of the same axis producing different answers under different emotional conditions. True noise should be impossible if questions are designed correctly.
**Action:** Do not implement re-asking in the core set. In the depth graph, queue a clarifying question with *"Something came up that we want to explore."* Never make the user feel corrected. See `docs/SCORING.md`.

### 2026-02 — Seven Axes Reduced to Five
**Context:** Designing the code notation system.
**Discovery:** Seven axes produce 128 letter combinations — too many to be memorable or socially useful. Five axes produce 32 combinations: enough variety to feel specific, few enough to be memorable. The reduction collapsed A+F into O/R (both measuring consequentialist vs. deontological reasoning) and absorbed E (Proximity) into L/P (closeness to people is a form of loyalty). The five-axis model retains all meaningful philosophical dimensions.
**Action:** The Ethics domain has exactly five axes: O/R, C/I, H/T, L/P, S/D. Do not add axes. Do not re-expand to seven. Any new domain should also aim for 4–6 axes maximum. See `docs/SCORING.md`.

### 2026-02 — No Named Archetypes [AMENDED 2026-09 — plain "You…" headline phrases now allowed; see "Progression Model Rulings"]
**Context:** Simplifying the result model.
**Discovery:** Named foundation archetypes ("The Pragmatic Rebel") add an interpretive layer that pre-digests the result for the user rather than letting them engage with it. The five-letter code becomes meaningful through use and conversation — like MBTI, the letters carry the identity. A pre-interpreted name is slightly paternalistic and adds a taxonomy that has to be maintained and that drifts toward kitsch.
**Action:** Do not introduce named archetypes, an `archetypes.js` file, or foundation profile types. The result is the code + radar chart + distinction paragraph. If future agents suggest adding named archetypes, refer them to this entry.

### 2026-02 — Code Letter Reveal Is a Designed Moment
**Context:** Designing the code reveal animation.
**Discovery:** Revealing all five letters simultaneously wastes the most important moment in the experience. Letters materializing one at a time — with brief pauses, like the system is arriving at each conclusion — turns the code reveal into an event. This is the payoff of the whole core experience and must be treated as such.
**Action:** Always reveal letters sequentially, left to right, ~300ms per letter with ~200ms pauses. Never reveal all simultaneously. See `docs/DESIGN.md` section 8 — Code Letter Reveal. This animation is non-negotiable.

### 2026-02 — Distinction Is Radar Chart Plus Generated Paragraph [SUPERSEDED 2026-09 — the portrait (headline, tendencies from the authored library, compass, tensions, chapters) replaced the paid distinction; the radar shows only on the code reveal. See docs/SCORING.md]
**Context:** Designing the paid tier result.
**Discovery:** The distinction needed to do two things: show magnitude (which the code alone doesn't convey) and surface what's specific and interesting about this particular profile. A radar chart handles magnitude visually. A generated paragraph handles specificity in language. Together they're stronger than either alone. The paragraph must feel like something a perceptive person observed — not a template, not a summary, not flattering.
**Action:** The distinction always has both components. Do not ship a distinction with only a radar chart or only a paragraph. The paragraph is generated from axis scores + depth path, and must follow the result copy principles in `docs/DESIGN.md` Section 3.

### 2026-02 — Game-Feel Is a Design Principle, Not a Feature [AMENDED 2026-09 — unlocks allowed; still no points/badges/streaks]
**Context:** Articulating what makes Tern engaging beyond its content.
**Discovery:** Tern should feel like a game — not gamified (no points, badges, streaks) but genuinely engaging through intrinsic design: pacing, anticipation, satisfying reveals, the sense of building toward something. This quality is structural — it comes from question design, transition timing, and reveal choreography — and can be destroyed by adding friction, clinical language, loading states, or treating result screens as information pages rather than moments.
**Action:** Evaluate every implementation decision against game-feel: does this make the experience feel more like something you're moving through, or does it flatten that quality? Protect the letter reveal animation, the illustration swap sequencing, the phase transition pacing, and the absence of progress numbers. See `docs/DESIGN.md` Section 1 and `docs/VISION.md` — Game Feel.

### 2026-02 — Phase Transitions Are Arrival Moments [AMENDED 2026-10 — the arrival moments are now the headline reveal, the code reveal, each world's chapter screen and the look-over; there is no convergence offer or distinction reveal. The slower arrival timing still applies]
**Context:** Designing convergence offer, code reveal, and distinction reveal screens.
**Discovery:** Phase transition screens — convergence offer, code reveal, distinction reveal — are fundamentally different from question screens. They are destinations, not steps. They require slower, more deliberate animation (800ms out, 1000ms in vs. 400ms/800ms for questions) and staggered text elements that feel like arriving somewhere rather than navigating to a page.
**Action:** Always use the phase transition animation timings for non-question screens. Never use the question transition timings for arrival screens. See `docs/DESIGN.md` section 8 — Phase Transitions.

### 2026-02 — Depth Illustration Preloading Timing [SUPERSEDED]
> **Superseded 2026-09:** scenes are now drawn in code (`docs/DESIGN.md` §0), so there are no illustration files to preload. Kept for history.
**Context:** Designing illustration loading for the two-phase model.
**Discovery:** Core illustrations can be preloaded on init. Depth illustrations cannot all be preloaded on init — we don't know which axes will be lowest-confidence until the core set runs. Preloading all depth illustrations regardless would be a large unnecessary payload.
**Action:** Preload core illustrations on init. After the code is determined, preload depth illustrations for nodes whose probesAxes include the lowest-confidence axes. See `docs/ARCHITECTURE.md` — Illustration Loading.

---

*Append new entries below this line. Date and topic are required.*

### 2026-03 — Canonical UX Simulation Script Added [SUPERSEDED 2026-10 — docs/SIMULATIONS.md is history; the game in game/ is canonical]
**Context:** User requested a comprehensive walkthrough of three full assessment runs (questions, answers, follow-ups, scoring, and results) to experience Tern end-to-end from docs alone.
**Discovery:** The workspace is currently documentation-only (no `src/` tree), so core question text and scoring are fully canonical from docs, while depth-node wording must be represented as explicit examples rather than verbatim nodes.
**Action:** Use `docs/SIMULATIONS.md` as the canonical walkthrough artifact for demos and stakeholder onboarding. Keep core flows exact to `docs/QUESTIONS.md` + `docs/SCORING.md`, and label depth paths as representative until `src/data/depthGraph.js` is available in-repo.

### 2026-03 — Assumptions Block Standard for Question Clarity
**Context:** Content review identified that underspecified scenarios let users project their own missing details, reducing comparability and introducing interpretation noise.
**Discovery:** Adding explicit assumptions per question (time pressure, available alternatives, who is involved) preserves nuance while keeping prompts identity-neutral and consistent with the no-noise guarantee. This improves answer quality without requiring adaptive core questions.
**Action:** In `docs/QUESTIONS.md`, require `assumptions` for core and depth schemas and include global + follow-up assumptions for every core question. Keep identity-neutral specificity by default, and only add demographic cues when the cue itself is the variable being probed.

### 2026-03 — H/T Rebalance via Thought-Oriented Core Nudges [SUPERSEDED 2026-09 — the ids it cites belong to the old core set; nudges now live in game/content*.js]
**Context:** After rewriting question copy for explicit assumptions and identity-neutral specificity, a second pass was requested to rebalance scoring nudges and update downstream scoring documentation.
**Discovery:** The H/T axis was overly Heart-skewed in core prompts. Adding modest `H-` nudges to clearly analytic/procedural options improved expressiveness without changing branching structure or expected golden test codes.
**Action:** Keep Thought-direction signal in core options where users are explicitly choosing process/analysis over relational intuition (Q4-B, Q5-A, Q6-A, Q6-FU-A, Q7-A, Q9-B, Q10-B, Q11-C). After any nudge change, recompute normalization ranges and update golden test math in `docs/SCORING.md` and any simulation artifacts that include numeric traces.

### 2026-03 — Final Report Must Be Scan-Readable Before Deep Reading [SUPERSEDED 2026-09 — the final report became the running portrait; scan-first still holds, see "Portrait Copy Must Say What It Means"]
**Context:** After tone and specificity updates, focus shifted to improving the final report user experience (distinction screen readability).
**Discovery:** Users need a fast orientation layer before reading the 3–4 sentence distinction paragraph. A fixed content hierarchy improves comprehension: code first, quick summary, chart, short axis rows, then paragraph.
**Action:** Keep final report order fixed and lightweight: `code -> one-line summary -> radar -> 5-row axis breakdown -> paragraph`. Avoid method jargon in user copy. Keep paragraph concise and readable on mobile (`max-width` constraint, generous line height).

### 2026-03 — Distinction Copy Baseline: Plain, Short, High-Signal [SUPERSEDED 2026-09 — no distinction paragraph exists; plain-copy rules continue in "Portrait Copy Must Say What It Means"]
**Context:** Follow-up pass focused on improving final report readability and tone consistency after question rewrites and nudge rebalancing.
**Discovery:** Distinction sentence templates were semantically strong but too long/abstract in places. Shorter sentence patterns with one explicit tension line maximum improve comprehension and preserve voice.
**Action:** In `docs/SCORING.md`, keep distinction templates in plain language, second person, and concise structure (target ~22 words average sentence length). Avoid scoring-jargon in user-facing output and keep paragraph assembly constrained for scan-readability.

### 2026-03 — Distinction Report Terminology Alignment [SUPERSEDED 2026-09 — there is no distinction report]
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

### 2026-03 — Gemini API Illustration Generation in Build Flow [SUPERSEDED]
> **Superseded 2026-09:** Ken chose code-drawn, ink-on-paper scenes (`docs/DESIGN.md` §0). The Gemini/Imagen pipeline is on hold; don't extend it or add manifest entries. Kept for history.
**Context:** User asked for a fully agentic workflow using an API to create all images as part of the build flow.
**Discovery:** The Gemini API (Imagen) offers text-to-image with configurable aspect ratio. DESIGN.md already defines a single prompt template (editorial, ink sketch, sepia) plus per-scene description; QUESTIONS.md has an "Illustration:" line for every core (and follow-up) scene. A manifest + Node script can drive generation without new dependencies; the agent can maintain the manifest and run `--dry-run`; only the user or CI runs the script with GEMINI_API_KEY to produce files.
**Action:** Illustrations are generated by `scripts/illustrations/generate.js` reading `scripts/illustrations/manifest.json`. Add new questions/follow-ups to the manifest when adding content. Prefer running generation as an explicit step (`npm run generate:illustrations`) rather than every build, to avoid unnecessary API cost. See `docs/ILLUSTRATION-GENERATION.md`.

### 2026-09 — Avatars Must Not Prime Answers
**Context:** Prototyping a character-select screen for an explorable-park version of Tern (`prototypes/trolley-walk.html`).
**Discovery:** Character blurbs ("Goes one way, then the other", "Knows a little about everything") and symbolic props give the user an identity to perform. Someone who picks a character described as principled may answer the dilemmas the way that character "would", which contaminates axis scoring the same way leading question wording does.
**Action:** Avatars carry a name and a look only — no descriptions, traits, stats, or "carries" lines. Keep designs and names abstract (no objects or words that suggest a value or temperament). Treat anything shown before or during the core set as part of the assessment instrument.

### 2026-09 — Question Bank Expansion and the Escape-Answer Pattern
**Context:** Massive expansion of the Ethics question set: 62 drafts, two independent judge-agent passes, plus balance gap-fillers → 57 candidates in `docs/QUESTION-BANK.md` (draft, not canonical). Verdict trail in `docs/question-bank-wip/`.
**Discovery:** The most common quality failure is the *escape answer* — a compromise option ("split it", "defer to experts", "only if they ask", "I can't share the details") that lets people step around the dilemma and would win most votes. Both judges found it repeatedly, including in the existing Q/D set. Second most common: follow-ups that fire for people who can't change their answer, so the follow-up reveals nothing.
**Action:** Before adding any question, remove escape answers or attach a real cost to them, and fire each follow-up only for answers that could plausibly flip. Use a separate skeptic judge agent for content passes — the second judge caught escapes the first judge let through. Bank questions have no nudges yet; they move into `QUESTIONS.md` only after Ken ratifies them.

### 2026-09 — No Escape Answers; Questions Must Be Hard (Ken's Ruling)
**Context:** Ken reviewed the question-bank expansion and ruled on the escape-answer pattern.
**Discovery:** Ken: "definitely no escape answers — I want the questions to be challenging to answer," and they must be "interesting, thought provoking, and revealing to the reader." A third judge pass under this bar fixed 49 of 79 questions — including many that two earlier judges had passed — so each judge pass tends to be too lenient.
**Action:** Binding rule, now in the `docs/QUESTIONS.md` validation checklist: no compromise / "do both" / "handle it later" / defer-to-others options; a middle option survives only with its own real cost. A thoughtful person must hesitate; if ~80% would answer the same way in seconds, sharpen or cut. Give follow-ups to *both* sides where possible so every answer faces pressure. The existing Q1–Q11 and D1–D12 were revised to this bar on 2026-09-27; scoring ranges and `docs/SIMULATIONS.md` traces are stale until recomputed.

### 2026-09 — Progression Model Rulings (Map, Portrait, Unlocks)
**Context:** Ken redirected the experience from "test, then result" to a running portrait on a map with unlockable worlds. Plan: `docs/PLAN-progression.md`.
**Discovery:** Ken's rulings (2026-09-27): (1) **Identity phrasing:** no cheesy archetypes ("The Pragmatic Rebel") and no MBTI-style type labels, but the user must get short, plain, shareable statements about who they are, drawn directly from their choices (e.g. "You avoid conflict", "You're an observer"). Several phrases are fine. (2) **Unlocks are in:** more answers reveal more information, and that must be communicated; "if it comes off like a game, so be it." (3) **First world = 12 core questions, free roam.** Finishing them opens another world or region with more questions.
**Action:** Portrait text is plain second-person statements that pass the "would a real person say this about a friend?" test. Unlocks reward with information and places, not points. Unlocks trigger on answer count, so the core 12 must be balanced in any subset. Don't update VISION/ARCHITECTURE/DESIGN to the new model until Ken approves the plan.

### 2026-09 — Visual Direction: the Ink-on-Paper Park
**Context:** A long UX session with Ken built `prototypes/trolley-walk.html`: an explorable park where each question is a stop.
**Discovery:** Ken ratified a new look and feel: pure black-and-white, code-drawn, isometric 2.5D national park; free roam, tap to walk; the question card rises over the map carrying its own animated scene. This replaces the dark background, the orange accent, the full-bleed sepia illustrations and the Gemini image pipeline.
**Action:** Treat `docs/DESIGN.md` §0 as the authoritative visual spec and the prototype as its reference implementation. Don't reintroduce colour accents, dark mode, raster illustrations or AI image generation without Ken's ruling. New worlds are drawn in the same style.

### 2026-09 — Calm Is a Rule (Low-Intensity Cozy Game)
**Context:** Ken reacted several times to motion in the prototype: "too windy", disliked wind lines, spinning trees, intense stop ripples, and trails that looked like they slid.
**Discovery:** Ken: "having an overall vibe of less intensity, calming, cozy game vibe is critical." Every added effect raised intensity until the park felt busy.
**Action:** Default to less motion. Wind shows only through trees and leaves. Trees sway but never churn. Water and paths never move. One slow ripple per stop. The "?" bubble fades up; no bursts. Respect reduced motion. Before adding any ambient effect, ask whether it makes the park calmer or busier. See `docs/DESIGN.md` §0.3.

### 2026-09 — No Wayfinding
**Context:** The prototype had arrows at the screen edge pointing toward off-screen stops.
**Discovery:** Ken removed them: "I want the user to explore." But once a stop is on screen it must be obvious.
**Action:** No arrows, compasses or pointers toward unseen stops. A stop announces itself only once it's on screen (pennant, ground disc and one ripple, "?" bubble). The progression model's ◆ "calling" glow must follow the same rule: a glow on the stop, never an arrow.

### 2026-09 — The Puff Character Family (Main Character Direction)
**Context:** Ken explored about 30 character designs across many rounds (instruction-manual people, 16 different drawing styles, weather clouds, prop-heavy puffs) before settling.
**Discovery:** Ken chose **Puff**: small, puffy, abstract folk. His rulings along the way: abstract, not symbolic ("too many of these are trying to mean something"); decorations only if abstract, never known objects ("bows, ties, bowties"); every character its own silhouette ("they are all exact same shapes — don't do that"); not "strange for the sake of strange"; exactly one personality-less character (Puff); everyone else has personality through expression and idle habits; name and look only. Accidental look-alikes happen easily (onigiri, the poop emoji), and anything centred under the eyes reads as a mouth.
**Action:** Follow the rules in `docs/DESIGN.md` §0.6 for any new character. Characters inside question scenes are plain puffs that never share the player's shape. Current roster: Puff, Nib, Sumi, Ro, Zig, Zo, Tri, Duo. Check every new design at portrait size for accidental objects, faces and mouths before showing Ken.


### 2026-09 — Progression Plan Decisions (All Ruled)
**Context:** Ken walked through the nine open decisions in `docs/PLAN-progression.md` §10 on 2026-09-27.
**Discovery:** Rulings: the Neighborhood opens after all 12 core questions, and each later world after about two-thirds of the previous one. Portrait text comes from an authored tendency library with rules (a statement needs 2+ supporting answers). Unlock closeness is shown as dots, never numbers. V1 saves on the device; the magic link comes in Phase 4. The judge's core 12 is approved (Q1, B09, B02, B13, B18, B29, B37, D8 with "father", B40, Q6, B21, B01). The headline can change and announces it. Worlds: Park → Neighborhood → City → Coast → Observatory. **No crowd statistics ("how others answered") in V1.** Conflict avoidance becomes the tendency "You avoid open conflict."
**Action:** Treat `docs/PLAN-progression.md` as approved. Next is the rest of Roadmap Phase 1: answer notes for the core 12, the tendency library, and rewriting ARCHITECTURE / DESIGN / QUESTIONS / SCORING to the new model. Don't add crowd statistics without Ken's say-so.

### 2026-09 — V1 First Playable Lives in `game/`
**Context:** Ken asked for the first playable game and told the agent to decide any open questions itself (2026-09-27).
**Discovery:** The game is four static files with no build step: `game/index.html` is the engine, forked from the park prototype. `game/content.js` is the instrument: the core 12, nudges, answer notes, tendencies and tensions. `game/portrait.js` is pure scoring and portrait logic that also runs in node. `game/scenes.js` holds the code-drawn scenes. The decisions made for V1 are listed in `game/plan.md`: a tendency needs 2+ net supporting answers from 2+ questions; the compass shows an axis once 2 questions touch it; ◆ calling marks the open stop that probes the least-certain axis; answers can be redone from a done stop ([AMENDED] see next entry); the Neighborhood is a fogged sketch east of the park, "opening soon"; sharing copies text only; saves stay on the device.
**Action:** Change question wording, nudges, notes and tendencies only in `content.js`, and only as instrument changes (see "questions.js Is the Assessment Instrument"). The nudges on the bank questions were authored by an agent and still need Ken's ratification. Keep portrait logic in `portrait.js` so it stays testable in node. Run it with `python3 -m http.server 8123 --directory game`.

### 2026-09 — Answers Can Be Redone; Character Can Change (Ken's Ruling)
**Context:** Ken asked for a way to change your character mid-game, and said that people who want to reset a choice "can always revisit a question."
**Discovery:** This reverses PLAN-progression §3 ("You can't change answers"). Revisiting a done stop now offers "Answer again", which clears that one answer and asks the question fresh. Changing character (from the sidebar link, or by tapping your own figure) never touches answers. Unlocks you've already seen stay seen, so there are no repeat reveal moments.
**Action:** Treat answers as editable, one question at a time. Never make a character change reset or alter answers.

### 2026-09 — The Neutral Character Is Now "Mof" (Ken's Ruling)
**Context:** Ken renamed the neutral main character on 2026-09-27.
**Discovery:** The character once called "Puff" is now **Mof**. "The Puff family" remains the name of the character style: puffy abstract folk, which covers all eight characters.
**Action:** Current roster: Mof, Nib, Sumi, Ro, Zig, Zo, Tri, Duo. Earlier entries that say "Puff" for the neutral character mean Mof. Mof is the app icon.

### 2026-09 — Portrait Copy Must Say What It Means (Ken's Ruling)
**Context:** Ken found portrait lines he couldn't parse: "You count the numbers." and "You back yourself when the harm feels far away." (2026-09-29).
**Discovery:** Short, clever, metaphor-driven lines read as profound to the writer and as nonsense to the player. They are worse once shared, because the reader has none of the answers behind them. The same problem was in answer notes ("your family exception", "the fight has to have a face"), "You protect / You'll trade away" phrases ("guardrails", "people over procedure"), and interface labels ("Tendencies", "Still listening.", "Your headline").
**Action:** Every portrait line must make sense to a stranger who sees it on its own, with no context. Say the plain behavior, not a metaphor for it, in as few words as stay clear (aim for 3 to 8). Ken's bar: "You aim for the greater good," not "You go with whatever does the most good overall." The explanation lives in "Read more about you", not in the line. No em dashes, no "math"/"ceiling"/"floor" metaphors, no internal terms in the UI. Protect/trade phrases must read correctly after "You protect:" and "You'll trade away:". Question, answer and setup wording is instrument text: propose changes to Ken, don't apply them in a copy sweep.

### 2026-09 — Phone Feel: Sheets Must Drag, Cards Must Not Jump
**Context:** Ken reported on 2026-09-29 that follow-ups on a phone "stall" with "a weird jitter and lag", and that the portrait sheet, once pulled up, could not be pulled back down.
**Discovery:** The jitter was the question card snapping to a new height, in a single frame, when the shorter follow-up text arrived (about 120px). The stall was a 1.4s hold after the scene changed, on top of the scene fade. The sheet closed only by tapping its thin header; swiping down, the natural phone gesture, did nothing. Browser-pane checks can't catch any of this, because animations pause while the pane is hidden. A headless Chrome driven over the DevTools protocol, with touch and 4× CPU slowdown, measured it reliably.
**Action:** Any bottom sheet must follow the finger when dragged, close on a pull-down or a tap outside it, and show a chevron. When card text changes, lay out the new text while it's hidden and glide the card to its new height; never let it snap. The scene still changes before the words (the hold is now 0.9s). While a card covers a phone screen, the park behind it redraws at half rate.

### 2026-09 — "Read More About You": Facts Behind Every Line
**Context:** Ken asked for an optional, deeper description after the summary: "non judgmental, just facts," plain language, no vagueness (2026-09-29).
**Discovery:** The facts a player trusts are their own choices. So the detail view explains each portrait line in plain words, then lists the specific answers that produced it, including answers that point the other way. It does the same for each compass pair. Nothing in it is new judgment; it shows the scoring's reasoning.
**Action:** A "Read more about you" button sits under the summary and opens the section in the portrait panel. Content lives in `game/content.js`: every answer has `did` (one plain sentence restating the choice, second person), every tendency has `detail` (what it means, 2 sentences), every axis has `posDetail`/`negDetail`. `portrait.js` attaches `evidence`/`counter` to tendencies and `toward`/`away` to axes. Any new answer or tendency must get its `did` or `detail` in the same change. The new text awaits Ken's ratification.

### 2026-09 — Clarity-Only Question Wording Changes (Ken Ratified)
**Context:** Plain-language sweep of the game (2026-09-29). Ken approved these instrument edits.
**Discovery:** Changes: dashes in Q1, D8 and Q6 answers became periods (same words). B18's question now names "the drowning child" and "$800 to charity", and its follow-up says "as if a faraway child counts the same" instead of "as if that's true". D8's setup is now "It's legal and no one would find out. He's in pain every day, but his life isn't at risk." Q6's credit-taking setup is now "You know for sure they took credit." None change what an answer means, so nudges stay as they are.
**Action:** `game/content.js`, `docs/QUESTIONS.md` and `docs/QUESTION-BANK.md` match. Older wording in `docs/question-bank-wip/`, `docs/SCORING.md` and `docs/SIMULATIONS.md` is history or already-stale traces; leave it.

### 2026-09 — Answer Summaries Must Stand Alone
**Context:** Brevity sweep of "Read more about you" (2026-09-29).
**Discovery:** Answer summaries (`did` in `game/content.js`) show in mixed lists, away from their question. Follow-up summaries written as "You'd turn it down…", "if the one were your mother" or "that year" made no sense there.
**Action:** Every `did` line names its subject in full ("the $1 million", "the person on the side track", "your colleague"). Never use "it", "that" or "the one" to point back at the question. Labels in the section stay short: "Your answers", "Pointing the other way", "Toward outcomes" / "Toward rules".

### 2026-10 — Map Zoom (Pinch, Trackpad, Keys)
**Context:** Ken asked for pinch to zoom in and out on the park map (2026-10-03).
**Discovery:** The map draws every object at fixed pixel sizes from `toScreen()`, so zoom is done with a canvas scale, not by changing tile size. `W`/`H` in `game/index.html` are now the view size in map pixels (screen size ÷ zoom `Z`), which keeps all the existing on-screen checks correct. Anything that compares screen pixels (pointer `clientX/Y`, the card's camera shift, the desktop panel width) must be divided by `Z` or use `innerWidth`/`innerHeight`.
**Action:** Zoom runs from 0.6× to 1.8×, always centred on the player, eases in (no snapping), and is saved with the game. A second finger cancels the first finger's walk. Pointer coordinates into `toWorld`/`nodeAtScreen` must be divided by `Z` first.

### 2026-10 — World 2: the Neighborhood (Ken's Rulings)
**Context:** Ken asked to start building the next world (2026-10-03). Plan: `game/plan-neighborhood.md`.
**Discovery:** Ken ruled: (1) one continuous map, so the Neighborhood sits east of the park through a gate past the cabin, and the park stays reachable; (2) the five-letter code comes only from the park's 12 questions, because it's what friends compare, while the compass, tendencies, headline and tensions keep learning from every answer; (3) all 14 questions in one pass. Each later world has its own short unlock ladder (3 / 6 / 10 answers in the Neighborhood) that builds a chapter in the portrait; at 10 the City appears in fog, "opening soon".
**Action:** Each world gets its own files: `game/content-<world>.js` (appends questions with `world: '<id>'`, new tendencies, extra support ids, tensions) and `game/scenes-<world>.js` (pushes onto `window.TERN_SCENE_PACKS`). Worlds and their ladders are declared in `content.js` → `worlds`. `portrait.js` keeps the code on the first world only (`codeAxes`); never let a later world change it. A world stays open once it has opened (`world:<id>` in the save's `seen`), so "Answer again" on a park stop never re-fogs it. Neighborhood scenery uses its own random sequence (`hr()`) so the park's layout never shifts. The Neighborhood's scoring, notes and tendencies were written by an agent and await Ken's ratification; open questions are in `game/neighborhood-proposals.md`.
**Testing gotcha:** two browser tabs on `localhost:8123` share one save, and the page saves on unload, so parallel testers overwrite each other. Test on `127.0.0.1:8123` for a separate save, and use `window.__tern.go(x, y)` to move the character.

### 2026-10 — Sharing Is Written for the Friend Who Receives It
**Context:** Ken found the shared message confusing and uncomfortable (2026-10-03): a picture plus "Your family comes before strangers." The person receiving it doesn't know who "you" is or what Tern is, and some lines ("You judge people by their reasons") make the sender look bad.
**Discovery:** Portrait lines are written *to* the player, in second person, and include unflattering ones. Sent as they are, they read as a confusing accusation. A shared message has two readers: a sender who must be glad to put their name to it, and a friend who has seen none of the questions.
**Action:** Only a tendency's `share` line (first person, something you'd be glad to say about yourself) can be sent. Tendencies that read badly out of context have no `share` (currently `own-gain`, `needs-watching`, `slow-trust`), so they are never sent. The message always says what Tern is ("a game of 12 hard choices about right and wrong"), lists the lines, gives the code with an invitation ("Play and tell me yours"), and ends with the link. The card image says the same, so it still makes sense if it's forwarded without the text. The sender always sees the picture and message first, and picks up to 3 lines, before anything is sent. Once all 12 park questions are answered, sharing is the main button on the code reveal and a box near the top of the portrait. Before that, it's a quiet link. Message copy lives in `content.js` → `shareCopy`. Any new tendency needs a `share` line, or a deliberate decision to leave it out. The share lines were written by an agent and await Ken's ratification.

### 2026-10 — Neighborhood Content Ratified; Buildings Are Solid (Ken's Rulings)
**Context:** Ken reviewed the Neighborhood build (2026-10-03).
**Discovery:** Ken: "im good with the questions and scoring." The Neighborhood's 14 questions, nudges, notes, `did` lines, 6 new tendencies and 12 tensions in `game/content-neighborhood.js` are ratified as written, and the 11 items in `game/neighborhood-proposals.md` stay unapplied (the content is kept as it is). Ken also ruled: "dont let the character walk straight through houses."
**Action:** Treat `content-neighborhood.js` as the canonical instrument for world 2; wording or nudge changes now need Ken's say-so like the park's. Every building has a footprint (`FOOT` for building-type stops, plus the Neighborhood's houses) that the player can't enter. Taps route around buildings (`walkTo`: a straight line if clear, else a half-unit grid route smoothed to its corners); arrow keys slide along walls. Any new building-type stop or house must get a footprint, and its `stand` must sit outside it. A headless-Chrome walk test lives in the session scratchpad (`walk.mjs`); rerun something like it after moving buildings.

### 2026-10 — The Look-Over: How a Newly Opened World Shows Itself (Ken's Ruling)
**Context:** Ken found no way to know where the Neighborhood was after the park's results (2026-10-03). The fog lifted at the gate while the camera stayed on the player, usually far away.
**Discovery:** Ken approved a one-time "look-over" instead of any arrow. When a world opens, the map fades to paper, comes back framed on the new world's entrance (a gate or a street sign) with a known landmark in view (the cabin, for the Neighborhood), and the fog lifts while that world's "?" bubbles rise one by one. One line of directions in words ("past the cabin and through the gate") shows, then the view fades back to the player. A tap or key skips it. Until the player answers a stop in that world, the portrait panel's bottom line reads "<World> is open · Show me", which replays the look-over. It never walks the character there. This is consistent with "No Wayfinding": the place is shown once, not pointed at.
**Action:** Every new world gets an entry in `LOOKS` in `game/index.html` (`at` = the map point to frame, `line` = plain directions from a landmark the player already knows). `lookOver(region)` runs from `afterAnswer` after the reveal screens. Keep it calm: slow paper fades, no camera slides across the map, no bursts. Ken ratified the City line, "The City is open, where the main street leaves the Neighborhood." (2026-10-03).

### 2026-10 — World 3: the City, and Worlds as Regions
**Context:** Ken: "go ahead and build the next one" (2026-10-03). Plan: `game/plan-city.md`. The Neighborhood rulings carried over (one map, code from the park only, all questions in one pass, content ratified by Ken afterwards, solid buildings).
**Discovery:** With a second later world, the Neighborhood-only engine code had to become a list. `REGIONS` in `game/index.html` (one entry per world past the park, west to east) now drives each world's fog, how far east you can walk (`eastLimit()`), which stops are awake (`isOpen`), and the "opening soon" sketch of the next unbuilt world (`SOON_AT`, shown once a world's `ready` is true). The City's 19 questions (`game/content-city.js`) open at 10 Neighborhood answers; its ladder is 4 / 8 / 13; the Coast is declared `soon` in `content.worlds`. City buildings come from `drawTower()` (flat roof, window grid, optional glass, awning, columns, dome, saw-tooth roof, balconies, water tank, chimney stack).
**Action:** To add a world: a `content-<world>.js` and `scenes-<world>.js`, an entry in `content.worlds` (with `chapter`, `closeTo`, `ladder`), a region in `REGIONS` (bounds, fog label, hint), its streets joined to the previous world's at exactly the same end points, its own random sequence for scenery, `PLACES` with a `FOOT` for every building stop, and a `LOOKS` framing for the look-over. Never change an earlier world's street control points or its random sequence; filter afterwards instead, so its layout never shifts. City content awaits Ken's ratification; open questions are in `game/city-proposals.md`.

### 2026-10 — City Ratified with Its Proposals; World 4: the Coast
**Context:** Ken asked to "implement it" and chose both: apply the City proposals and build the Coast (2026-10-03). Plan: `game/plan-coast.md`.
**Discovery:** Ken's rulings: the City's content is ratified, and its recommended changes are applied: new follow-ups on D11 and D6 (both sides) and the missing side for B41 and B03 (`game/city-proposals.md` records which). Everything the file said to keep is kept; Q10 and B34's one-sided follow-ups wait. B41's and B03's single `fu` became `fuA`/`fuB`, renaming their answer ids (old saves lose that one pick; the portrait skips unknown ids). The Coast (12 questions, `game/content-coast.js`) opens at 13 City answers; its ladder is 3 / 6 / 8; the Observatory is now the `soon` world, sketched south of the Coast. The Coast has a still sea (`drawSea`: shoreline, sand stipple, fixed wave marks), a boardwalk and pier, a lighthouse, moored boats; the railway now ends at a buffer stop there.
**Action:** "Implement the recommendations" means apply exactly the items a proposals file recommends now, not the ones it defers. Coast content awaits Ken's ratification; its open questions are in `game/coast-proposals.md`. Each region may set `soonAt` for where the next world's sketch stands; never move an earlier region's clearing (the City keeps `CITY_SOON`).

### 2026-10 — The Map Is Finished: Coast Ratified, Every Follow-up Gap Closed, World 5 the Observatory
**Context:** Ken: "approved all - lets implement and finish this" (2026-10-04). Plan: `game/plan-observatory.md`.
**Discovery:** Ken ratified the Coast's content and approved every recommendation in the Coast and City proposals, including the ones marked "later", and the scenes as drawn. All are applied: follow-ups added on both sides where the files suggested, missing sides added (including City Q10 and B34), B23's double answer split. Follow-up keys now follow the trunk answer, including a new `fuC` (after a third trunk answer). The Observatory (18 questions, `game/content-observatory.js`) is the last world: south of the Coast, up a trail, opening at 8 Coast answers, ladder 4 / 8 / 12. Its chapter screen says you've walked every world. Regions can now be any rectangle: `REGIONS[].walk` and `fogArea`, with `walkAreas()` / `clampPt()` limiting walking to the union of open areas and the route-finder treating everything outside them as walls.
**Action:** The Observatory's content awaits Ken's ratification; its 15 open items are in `game/observatory-proposals.md` (nothing applied). A world placed off the east strip needs `walk` and `fogArea`. Constants that scenery generation reads (like `shoreX`) must be defined above the generation code, or the page fails to load.

### 2026-10 — Observatory Ratified; the Five-World Map Is Complete
**Context:** Ken reviewed the finished map (2026-10-04): "all approved, i will commit."
**Discovery:** The Observatory's content (`game/content-observatory.js`) and all five worlds' scenes are ratified as written, including the scenes flagged as possible priming. The Observatory's proposals file is not applied: "approved" ratified what exists; applying proposals has always needed an explicit "implement".
**Action:** All 75 questions (park 12, Neighborhood 14, City 19, Coast 12, Observatory 18) are canonical instrument text; change wording or nudges only with Ken's say-so. Open follow-ups: `game/observatory-proposals.md`. A skeptic judge pass over the City, Coast and Observatory wording has not been run yet.

### 2026-10 — Skeptic Judge Round on the City, Coast and Observatory
**Context:** Ken asked for the skeptic judge pass he requires on content, then approved my recommendation for applying it (2026-10-04). Verdicts: `docs/question-bank-wip/judge-city.md`, `judge-coast.md`, `judge-observatory.md` (49 questions: keep 7 / sharpen 42 / cut 0). Scope: `game/plan-judge-fixes.md`.
**Discovery:** The author's own pass was again too lenient. The trunks held; the failures were in follow-ups, details and portrait wiring: answers feeding tendencies they don't show, giveaway phrases ("does more good overall", "Only luck differs"), answers that can't happen as written (D11's "leave it out" was really a lie under oath), copy claiming what the player didn't choose, and near-unanimous questions. Applied: every one of those fixes, plus six follow-ups (Observatory B06, B26, B27, B47; City B41, B04). Deferred: about 25 more "missing side" follow-ups, listed in each proposals file. Two Observatory tendencies ("machines-matter", "remembers") are defined but can't trigger until a second question supports them.
**Action:** When a follow-up's situation is replaced, keep its key and give its answers new ids with a "2" (e.g. `Q11-FUA2-A`), so an old save never shows a note for a question the player wasn't asked. Run a separate skeptic judge on every content pass before Ken ratifies it, not after. When testing in a reused headless-Chrome profile, disable the cache (`Network.setCacheDisabled`): the local server lets Chrome cache scripts, so a reused profile can test stale code. Answer animations should keep the answer-to-follow-up time near 3.5 s (D4's "Stop" was cut from 5.2 s to 4.2 s).

### 2026-10 — Repo Review: Docs Match the Build; NEXT-STEPS Is the Front Page for Work
**Context:** Ken asked to "review the repo, update our docs, be clear on next steps" (2026-10-05).
**Discovery:** The spec docs, `cursor.md` and `.cursor/rules/` still described the old model (two-phase, convergence, distinction, an `src/` folder that never existed), so Cursor agents were being pointed at things that don't exist. `docs/QUESTIONS.md` drifted every time content changed. The new README briefly claimed there was no deploy config, though `.github/workflows/deploy-storychart.yml` redeploys storych.art on every push to `main`.
**Action:** `docs/NEXT-STEPS.md` holds where things stand, the recommended order of work, and decisions waiting on Ken; update it at the end of every session. `docs/QUESTIONS.md` is generated by `npm run export:questions` from the game files: never hand-edit it. The docs (README, VISION, ARCHITECTURE, DESIGN, SCORING, WORKFLOW), `cursor.md` and `.cursor/rules/` now describe the built game; prototypes, the Gemini pipeline, SIMULATIONS and BUILD-READINESS are marked as history. A push to `main` is a release. The `career-first` tendency also has no `share` line (decision pending, see NEXT-STEPS).
