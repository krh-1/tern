# Simulation Walkthroughs — Tern (Ethics Domain, V1)

> **Superseded (2026-10-05): history only.** These walkthroughs simulate the old two-phase model (11 fixed core questions, a convergence offer, a depth graph, a distinction paragraph) on question wording that has since changed. The game no longer works this way. For the current questions see `docs/QUESTIONS.md` (generated from `game/content*.js`); for how answers become the portrait and code, including a worked example with real answer ids, see `docs/SCORING.md`. To simulate a player today, call `compute()` in `game/portrait.js` from node. The body below is unchanged.

> **⚠ Stale as of 2026-09-27:** the no-escape-answer pass removed and added answer options and follow-ups across Q1–Q11 and D1–D12 in `docs/QUESTIONS.md`. Normalization ranges, golden-test math and numeric traces below have not been recomputed. Scoring is deliberately deferred until the question set is frozen.

This document provides three end-to-end assessment simulations based on:
- Core question logic and follow-up rules from `docs/QUESTIONS.md`
- Exact scoring method and normalization ranges from `docs/SCORING.md`
- UX pacing and transition choreography from `docs/DESIGN.md` and `docs/ARCHITECTURE.md`

Answer labels in the flow tables are concise paraphrases of the current options for readability; scoring and branching are computed from the canonical question definitions.

Depth-phase question text is **representative** (not verbatim), because the live depth node text lives in `src/data/depthGraph.js`, which is not present in this docs-only snapshot.

---

## Shared Scoring Method (applies to all simulations)

- Trunk answers: `1.0x`
- Follow-up answers: `1.5x` default
- Q1 nested escalation follow-up (child vs 100 strangers): `2.0x`

Normalization ranges:
- O: `[-21.0, +26.0]`
- C: `[-10.5, +10.5]`
- H: `[-11.5, +50.0]`
- L: `[-28.0, +30.5]`
- S: `[-8.0, +13.0]`

Letter threshold per axis:
- `>= 5.0`: first pole letter (O/C/H/L/S)
- `< 5.0`: second pole letter (R/I/T/P/D)

---

## Simulation A — Principled Utilitarian

### 1) Persona Snapshot
A user who prioritizes outcomes and fairness consistency over personal allegiance. Willing to make hard calls, including socially costly ones.

### 2) Phase 1 Core Run (chosen answers by path)

| Prompt | Selected answer | Triggered follow-up? |
|---|---|---|
| Q1 Trolley | **A**: Yes - pull | Yes (Follow-up A) |
| Q1 Follow-up A (what if the one is your mother?) | **A**: Still pull | No nested follow-up (nested only triggers on trunk A + FU-A B) |
| Q2 Wallet | **A**: Return everything | No |
| Q3 Confession | **A**: Tell partner | Yes (universal FU) |
| Q3 Follow-up | **A**: Loyalty does not override honesty | End Q3 |
| Q4 Saturday | **B**: Donate for more impact | No |
| Q5 Inheritance | **A**: Honor the will | Yes (conditional FU for A or D) |
| Q5 Follow-up | **B**: Still follow the will | End Q5 |
| Q6 Promotion | **A**: Compete fully | Yes (universal FU) |
| Q6 Follow-up | **A**: Still compete fully | End Q6 |
| Q7 White Lie | **A**: Honest feedback | No |
| Q8 Coworker | **A**: Report theft | Yes (Follow-up A) |
| Q8 Follow-up A | **A**: Still report, advocate leniency | End Q8 |
| Q9 Protest | **A**: Break unjust law | No |
| Q10 Bystander | **B**: Alert authority | Yes (universal FU) |
| Q10 Follow-up | **C**: Child presence does not change action | End Q10 |
| Q11 Autonomous Car | **A**: Swerve (minimize casualties) | End core |

### 3) Moment-to-Moment UX Notes
- On every follow-up, sequence is preserved: `illustration fade out -> illustration fade in -> question text update`.
- Q1 emotional beat: the silhouette change (stranger -> mother) lands before text updates, making the second answer feel personal rather than abstract.
- Phase pacing remains deliberate (not survey-like): selected answer pulse, brief pause, then scene transition.
- Convergence can plausibly appear late-core with: "We have a pretty clear picture of you. Want to see what we found?"

### 4) Scoring Trace

Raw totals:
- O = `+2.5`
- C = `-2.0`
- H = `-8.0`
- L = `-21.0`
- S = `+2.0`

Normalized (0-10):
- O: `5.0` -> **O**
- C: `4.0` -> **I**
- H: `0.6` -> **T**
- L: `1.2` -> **P**
- S: `4.8` -> **D**

### 5) Code Reveal Result
**`OITPD`**

Axis legend:
- O - outcomes
- I - individual
- T - thought
- P - principle
- D - disruption

Reveal choreography: letters appear sequentially left-to-right; legend fades after the final letter.

### 6) Phase 2 Representative Depth Path (representative)
Target lowest-confidence/near-midpoint axes (notably S/D and C/I):
1. A civil-disobedience scenario with direct personal risk (probes S, O)
2. A workplace resource allocation tradeoff between one known person vs many strangers (probes C, H)
3. A "report now vs reform internally first" institutional dilemma (probes S, L)
4. A fairness-vs-impact distribution scenario with transparent metrics (probes C, O)
5. Clarifier if S responses split under authority pressure (probes S as inconsistency check)

### 7) Distinction Output
Radar summary:
- Very low L/P toward Principle, very low H/T toward Thought, near-mid S/D, mild O over R.

Paragraph (Tern voice, 4 sentences):
You trust the math, even when it hurts, but not in a shallow way. Your fairness standard is unusually impartial, and you apply it even when it costs your relationships. You don't seem attached to institutions for their own sake, but you also do not rebel performatively - you break from process when the principle is clear. The pattern is less "rule-breaker" than "consistency under pressure."

### 8) Likely Social Share Line
"I'm `OITPD` - we probably agree on outcomes but disagree on whether loyalty should ever override principle."

---

## Simulation B — Empathetic Loyalist

### 1) Persona Snapshot
A relational decision-maker with high empathy and strong allegiance instincts, but still capable of pragmatic tradeoffs when harm becomes concrete.

### 2) Phase 1 Core Run (chosen answers by path)

| Prompt | Selected answer | Triggered follow-up? |
|---|---|---|
| Q1 Trolley | **B**: Do not pull | Yes (Follow-up A is universal) |
| Q1 Follow-up A (mother) | **B**: I can't - not her | No nested follow-up (nested requires trunk A) |
| Q2 Wallet | **A**: Return everything | No |
| Q3 Confession | **B**: Not my place | Yes (universal FU) |
| Q3 Follow-up | **B**: Stay out of it | End Q3 |
| Q4 Saturday | **A**: Volunteer | Yes (follow-up if volunteer) |
| Q4 Follow-up | **A**: Still volunteer even if donation helps 50x | End Q4 |
| Q5 Inheritance | **B**: Follow parent's final wish | No |
| Q6 Promotion | **B**: Pull back slightly | Yes (universal FU) |
| Q6 Follow-up | **B**: Defer given large circumstance gap | End Q6 |
| Q7 White Lie | **B**: Encourage | Yes (follow-up if encouraged) |
| Q7 Follow-up | **B**: Don't reveal old doubts now | End Q7 |
| Q8 Coworker | **C**: Stay out of it | Yes (Follow-up B) |
| Q8 Follow-up B | **B**: Still no report, push harder to stop | End Q8 |
| Q9 Protest | **B**: Respect process | No |
| Q10 Bystander | **C**: Support target without direct confrontation | Yes (universal FU) |
| Q10 Follow-up | **B**: Take child to safety while getting help | End Q10 |
| Q11 Autonomous Car | **B**: Stay course | End core |

### 3) Moment-to-Moment UX Notes
- Relational follow-up beats dominate this run: Q1 (mother), Q4 (personal connection vs scale), Q6 (known hardship), Q10 (child in scene).
- Illustration-first follow-up transitions amplify "care context" before the user reads the new prompt.
- This path often feels emotionally coherent to the user, because repeated follow-ups validate the same internal logic (protect people in front of me).
- Convergence offer can still appear, but users like this often continue because depth feels personally meaningful.

### 4) Scoring Trace

Raw totals:
- O = `-4.0`
- C = `+5.5`
- H = `+29.0`
- L = `+13.0`
- S = `0.0`

Normalized (0-10):
- O: `3.6` -> **R**
- C: `7.6` -> **C**
- H: `6.6` -> **H**
- L: `7.0` -> **L**
- S: `3.8` -> **D**

### 5) Code Reveal Result
**`RCHLD`**

Axis legend:
- R - rules
- C - collective
- H - heart
- L - loyalty
- D - disruption

### 6) Phase 2 Representative Depth Path (representative)
Primary probe target is S/D midpoint risk:
1. "Unjust policy" scenario: comply short-term vs open defiance (probes S, O)
2. "Protect your person vs protect procedure" case (probes L, S)
3. Institutional trust scenario where process is fair but outcome is harsh (probes S, H)
4. Public confrontation choice with low personal risk (probes S, C)
5. Clarifier if "support quietly" and "break rules publicly" both appear (probes S inconsistency)

### 7) Distinction Output
Radar summary:
- Strong H and L, strong C, clear R lean, softer D lean with room to move.

Paragraph (Tern voice, 4 sentences):
You feel your way through decisions the way most people think through them, and that keeps you close to what harm feels like in real life. The people near you get a different version of your ethics, and you are not confused about that. You care about the collective, but you are wary of solutions that require emotional distance to look clean on paper. Where your profile stays unresolved is process - you respect order until it stops protecting people, then your patience runs out quickly.

### 8) Likely Social Share Line
"I'm `RCHLD` - high heart and loyalty, but I still break with systems when they stop serving people."

---

## Simulation C — Conflict-Avoidant Split Profile

### 1) Persona Snapshot
A user who appears accommodating in trunk choices, then becomes decisively active when explicit permission lowers social risk.

### 2) Phase 1 Core Run (chosen answers by path)

| Prompt | Selected answer | Triggered follow-up? |
|---|---|---|
| Q1 Trolley | **A**: Pull | Yes (Follow-up A universal) |
| Q1 Follow-up A (mother) | **B**: I can't - not her | Yes (nested Follow-up B, because trunk A + FU-A B) |
| Q1 Follow-up B (child vs 100 strangers) | **B**: Never | End Q1 chain |
| Q2 Wallet | **B**: Keep cash, return wallet/ID | Yes (conditional FU) |
| Q2 Follow-up | **A**: If low-income, I'd return it | End Q2 |
| Q3 Confession | **C**: Deadline then tell | Yes (universal FU) |
| Q3 Follow-up | **C**: Same ultimatum, feel it more | End Q3 |
| Q4 Saturday | **C**: Split time and money | No |
| Q5 Inheritance | **D**: Keep peace, split equally, say nothing | Yes (conditional FU for A or D) |
| Q5 Follow-up | **A**: Now honor direct request | End Q5 |
| Q6 Promotion | **C**: Compete + help in other ways | Yes (universal FU) |
| Q6 Follow-up | **C**: Compete but advocate for them | End Q6 |
| Q7 White Lie | **C**: Honest but gentle | No |
| Q8 Coworker | **B**: Confront privately first | Yes (Follow-up B) |
| Q8 Follow-up B | **A**: If small business is harmed, report | End Q8 |
| Q9 Protest | **C**: Exhaust legal options first | No |
| Q10 Bystander | **A**: Intervene directly | Yes (universal FU) |
| Q10 Follow-up | **A**: Intervene now | End Q10 |
| Q11 Autonomous Car | **C**: Defer to regulators/ethicists | End core |

### 3) Moment-to-Moment UX Notes
- This run showcases the strongest emotional arc in Q1 because it includes the nested escalation follow-up.
- Q5 is the key behavioral reveal: passive trunk response, then active shift after explicit permission from the parent.
- The follow-up sequencing makes that shift feel discovered, not judged: visual context changes first, then language reframes choice.
- Convergence may occur near late core; if offered, this persona is a likely "keep going" user due to unresolved self-image tension.

### 4) Scoring Trace

Raw totals:
- O = `+4.0`
- C = `+1.0`
- H = `+24.5`
- L = `+13.0`
- S = `-1.0`

Normalized (0-10):
- O: `5.3` -> **O**
- C: `5.5` -> **C**
- H: `5.9` -> **H**
- L: `7.0` -> **L**
- S: `3.3` -> **D**

### 5) Code Reveal Result
**`OCHLD`**

Axis legend:
- O - outcomes
- C - collective
- H - heart
- L - loyalty
- D - disruption

### 6) Phase 2 Representative Depth Path (representative)
Target near-mid O/C/H plus social-risk pattern testing:
1. A "private conviction vs public peace" family decision (probes L, H)
2. A duty-vs-impact policy choice with public accountability (probes O, S)
3. A whistleblowing scenario where speaking up harms group harmony (probes L, S)
4. A redistribution scenario with unequal deservingness cues (probes C, O)
5. Clarifying node if user oscillates between appeasement and decisive intervention (probes conflict-avoidant pattern expression)

### 7) Distinction Output
Radar summary:
- Moderately high O/C/H, high L, lower S (D-side), with visible situational shifts in expression style.

Paragraph (Tern voice, 4 sentences):
You weigh outcomes heavily but also stand by your people, and that tension shows up in when you speak versus when you stay quiet. Your judgments are not indecisive - they are situational, especially when relationships are on the line. **When no one's watching, you're more decisive than you let on. You hold back not because you don't know what you think, but because you're weighing the cost of saying it.** When explicit permission appears, your position sharpens fast.

### 8) Likely Social Share Line
"I'm `OCHLD` - I look diplomatic up front, but once stakes are explicit I get very decisive."

---

## Validation Checks

### Numerical Consistency Check
- Simulation A recomputes Golden Test Case 1: raw `O=+2.5, C=-2, H=-8.0, L=-21, S=+2` -> code `OITPD`.
- Simulation B recomputes Golden Test Case 2: raw `O=-4, C=+5.5, H=+29, L=+13, S=0` -> code `RCHLD`.

### Branching Integrity Check
- All included follow-ups are trigger-valid per `docs/QUESTIONS.md`.
- Q1 nested follow-up appears only in Simulation C where trigger condition is satisfied.

### Conflict-Avoidance Detection Check
- Simulation C includes passive Q5 trunk (`Q5-D`) + active follow-up (`Q5-FU-A`).
- Distinction paragraph explicitly includes the conflict-avoidance sentence pattern from `docs/SCORING.md` Priority 4.

### Voice and UX Check
- No quiz framing or progress numbers.
- Follow-up transitions described with image-first sequencing.
- Result paragraphs are specific, non-kitschy, and tension-oriented per `docs/DESIGN.md` and `docs/VISION.md` principles.
