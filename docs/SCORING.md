# Scoring — Tern (Ethics Domain, V1)

> **This document covers the Ethics domain (V1).** The scoring engine itself (`src/engine/scoring.js`) is domain-agnostic. Different domains define their own axes, letter assignments, normalization ranges, and distinction logic using the same engine. When a new domain is built, create a corresponding `SCORING-{domain}.md` alongside this file.

How answers become axis scores, how axis scores become a five-letter code, and how depth-graph answers produce a distinction.

---

## The Two Scoring Phases

**Phase 1 — Code scoring** runs continuously during the core question set. After each answer, axis scores are recomputed and checked for convergence. When all five axis letters have stabilized, the user's code is ready.

**Phase 2 — Distinction scoring** runs during the depth graph. The engine uses current axis confidence to route the next question, accumulates answers, and generates a distinction when confidence is sufficient.

Both phases use the same axis math. Phase 1 determines which pole a user lands on per axis. Phase 2 sharpens the magnitude and surfaces what's most interesting about their specific profile.

---

## The 5 Axes (Ethics Domain)

Each axis has two poles. A user receives the letter for whichever pole their normalized score exceeds 50% toward. Both poles are coherent, defensible positions — neither letter is the "right" answer.

| Axis | Letter | Pole | Letter | Pole |
|---|---|---|---|---|
| Outcomes vs. Rules | **O** | Consequentialist — the best outcome is what matters | **R** | Deontological — some acts are wrong regardless of result |
| Collective vs. Individual | **C** | Collective good is primary | **I** | Personal interest is primary |
| Heart vs. Thought | **H** | Empathetic / relational — connection over calculus | **T** | Rational / impartial — logic over feeling |
| Loyalty vs. Principle | **L** | Allegiance-driven — stand by your people | **P** | Justice-driven — principle over allegiance |
| System vs. Disruption | **S** | Work within structures — respect process and law | **D** | Break unjust rules — principle overrides process |

**The code** is five letters, one per axis, in order: `[O/R][C/I][H/T][L/P][S/D]`

Examples: `OCHLS` — Outcomes, Collective, Heart, Loyalty, System. `RIHPD` — Rules, Individual, Head, Principle, Disruption.

**Axis collapse rationale:** The original seven-axis model (A–G) was reduced to five for two reasons. First, axes A (Rules/Outcomes) and F (Means/Ends) were substantially correlated — both measuring consequentialist vs. deontological reasoning — and collapsed into the O/R axis. Second, axes D (Loyalty/Principle), E (Proximity), and G (Order/Disruption) were collapsed into L/P and S/D, with proximity absorbed into loyalty (closeness to people is a form of allegiance). The five-axis model retains all meaningful philosophical dimensions while producing a code notation comparable to MBTI.

---

## Core Scoring Algorithm (Both Phases)

### Step 1 — Collect nudges

Every answer carries axis nudges defined in `src/data/questions.js` and `src/data/depthGraph.js`. Each nudge is a signed integer per axis (e.g. `O+2`, `H-1`). Trunk and follow-up answers both produce nudges.

### Step 2 — Apply follow-up weight

Follow-up answers are weighted more heavily because they reveal *why* someone answered, not just *what* they answered. Default weight multiplier: **1.5x**. High-stakes follow-ups use **2x** (see Q1-followup-b in `docs/QUESTIONS.md` — the escalation to sacrificing your child for 100 strangers).

```js
effectiveNudge = nudgeValue * (isFollowUp ? followUpWeight : 1.0)
```

### Step 3 — Sum per axis

```js
rawScore[axis] = sum of all effectiveNudges for that axis
```

### Step 4 — Normalize to 0–10

Each axis has a theoretical minimum and maximum based on the most extreme achievable raw score across all possible answer paths in the full question library (core + depth). These are fixed constants per axis, recomputed whenever questions or nudges change.

```js
normalizedScore = ((rawScore - theoreticalMin) / (theoreticalMax - theoreticalMin)) * 10
```

Scores are clamped to [0, 10] and rounded to one decimal place. The midpoint is 5.0.

#### Normalization Ranges (Core Set, Ethics Domain)

Computed from all reachable answer paths in Q1–Q11, including conditional follow-ups at their specified weights.

| Axis | Min Raw | Max Raw | Notes |
|------|---------|---------|-------|
| O/R  | -21.0   | +26.0   | Most heavily scored axis — wide range |
| C/I  | -10.5   | +10.5   | Symmetric — well-balanced |
| H/T  | -11.5   | +50.0   | Asymmetric, but now includes explicit Thought signal in core |
| L/P  | -28.0   | +30.5   | Near-symmetric, touched by nearly every question |
| S/D  | -8.0    | +13.0   | Narrowest range — fewest contributing questions |

**H/T asymmetry note:** The core set now includes several explicit Thought-oriented (`H-`) options in analytic/procedural answers (Q4-B, Q5-A, Q6-A, Q6-FU-A, Q7-A, Q9-B, Q10-B, Q11-C) in addition to Q1-FU-A-A. The axis still leans Heart-positive overall, but users can now actively express Thought rather than only arriving there by avoiding Heart-positive choices.

**Recomputation requirement:** These ranges must be recomputed whenever questions, nudges, or weights change — and again when depth graph nodes are added. Implementation should auto-compute ranges from the data files rather than hardcoding these values.

### Step 5 — Assign letter

```js
letter = normalizedScore >= 5.0 ? highPoleLetter : lowPoleLetter
// Scores above 5.0 (including exactly 5.0 treated as >=) → high pole letter
// Scores below 5.0 → low pole letter
// 51/49 split → high pole letter. Threshold is simple majority.
```

The five letters concatenated in axis order produce the code.

---

## Phase 1 — Code Scoring

### Axis Confidence

After each answer during the core set, the engine computes confidence per axis — how much of the possible signal for that axis has been collected.

```js
axisConfidence[axis] = answeredWeight[axis] / totalPossibleWeight[axis]
// Range: 0.0 to 1.0
```

### Convergence Detection

Convergence is reached when both conditions are true:

1. **Stability:** all five axis letters have been the same for the last 3 consecutive questions
2. **Margin:** each axis's normalized score is at least 1.0 point away from 5.0 (the midpoint) — no axis is ambiguously close to flipping

```js
isConverged = (
  axisLettersStableFor >= 3 &&
  Object.values(axisScores).every(score => Math.abs(score - 5.0) >= 1.0)
)
```

When convergence is detected before the core set is complete, the offer is surfaced at the next natural question transition: *"We have a pretty clear picture of you. Want to see what we found, or keep going?"*

Continuing adds depth-graph signal to the radar chart and feeds the distinction. It never changes the code.

### Axis Coverage by Core Question

Every question that contains at least one nudge for the axis is listed. **Bold** = primary (nudge magnitude ≥ 2 on at least one answer).

| Axis | Core Questions | Notes |
|---|---|---|
| O/R | **Q1**, **Q2**, Q3, **Q4**, **Q5**, Q6, **Q7**, **Q8**, **Q9**, Q10, **Q11** | Broadest coverage — most questions touch this axis |
| C/I | **Q2**, **Q4**, **Q6**, **Q10** | Fewest contributing questions |
| H/T | **Q1**, **Q2**, Q3, **Q4**, Q5, **Q6**, **Q7**, **Q8**, **Q10** | Heavily skewed positive — see normalization note |
| L/P | **Q1**, **Q2**, **Q3**, **Q4**, **Q5**, Q6, **Q7**, **Q8**, **Q9**, **Q10**, **Q11** | Touched by every question |
| S/D | Q3, **Q5**, **Q8**, **Q9**, **Q10**, **Q11** | Narrowest range |

---

## Phase 2 — Distinction Scoring

### Depth Graph Routing

Entry into the depth graph is determined by which axes have the lowest confidence after the core set. Within the graph, each new question targets the axis or tension currently least resolved for this specific user.

```js
function selectNextDepthQuestion(axisConfidence, code, answeredIds, depthGraph, pendingClarifying) {
  if (pendingClarifying) return pendingClarifying

  const lowestConfidenceAxis = Object.entries(axisConfidence)
    .sort(([, a], [, b]) => a - b)[0][0]

  const candidates = depthGraph.filter(q =>
    q.probesAxes.includes(lowestConfidenceAxis) &&
    !answeredIds.includes(q.id)
  )

  return candidates[0] ?? null
}
```

### Meaningful Inconsistency Detection

A meaningful inconsistency is flagged when:
- Two questions probing the same axis produce nudges in opposite directions
- Both nudge magnitudes are ≥ 2
- No other axis movement provides a clean explanation

When flagged, a clarifying question is queued and surfaced with: *"Something came up that we want to explore."* The question does the disambiguation — no further explanation is given.

The question library is designed so this is rare. See `docs/QUESTIONS.md` — The No-Noise Design Guarantee.

### Distinction Convergence

The distinction is ready when axis confidence across all axes reaches threshold, or when no further depth-graph questions can meaningfully improve confidence.

```js
isDistinctionReady = (
  Object.values(axisConfidence).every(c => c >= 0.75) ||
  remainingCandidates.length === 0
)
```

### Distinction Generation

The distinction has two core analytic components, generated together from the full answer history and axis scores:

**Radar chart (visual layer):** shows normalized score per axis (0–10), not just the letter. Two users with the same code can have dramatically different charts. The chart makes magnitude and tension visible at a glance.

**Distinction paragraph (language layer):** 3–4 sentences generated from the specific shape of the scores and the depth path taken. The paragraph surfaces what is most notable about this particular profile:

- **Extremity** — which axes are unusually far from the midpoint? "Your H score is stronger than most people who share your code."
- **Tension** — which axes pull against each other in interesting ways? "You care about outcomes, but you still hold hard lines."
- **Depth-path findings** — what did the depth questions reveal that the core set alone wouldn't? "When the stakes became personal, your loyalty shifted."

The paragraph is not template-filled. It reads like something a perceptive person observed. It should occasionally surprise the user — not by being wrong, but by naming something they recognized but hadn't articulated.

**Report presentation note:** The paid distinction screen also includes a one-line summary and a short axis breakdown for scan readability. Those are presentation layers derived from the same scores, not additional scoring components.

**Generation principles:**
- Write in second person, direct and specific
- Name the actual axis tension, not a vague summary
- Do not flatter — honest observations including slightly uncomfortable ones are more valuable
- Do not explain the scoring system — speak about the person, not the method
- 3–4 sentences maximum — precision over completeness
- Keep average sentence length under ~22 words
- Use plain language; avoid method jargon and abstractions
- Include at most one explicit tension sentence

### V1 Distinction Generation Rules

V1 uses rule-based pattern matching. The engine evaluates the following conditions in priority order and assembles 3–4 sentences from the first matching patterns. Each rule produces one sentence fragment.

**Priority 1 — Extremity (any axis score ≥ 8.5 or ≤ 1.5):**

| Condition | Sentence pattern |
|---|---|
| O ≥ 8.5 | "You trust outcome math even when the choice is painful, and you will bend rules to prevent greater harm." |
| O ≤ 1.5 | "Some lines do not move for you, even when crossing them might improve the outcome." |
| H ≥ 8.5 | "You lead with empathy, and that emotional signal drives most of your hardest calls." |
| H ≤ 1.5 | "You stay measured under pressure and decide from distance before emotion." |
| L ≥ 8.5 | "You make clear loyalty distinctions; people close to you get a different ethical response." |
| L ≤ 1.5 | "You apply one fairness standard to everyone, including people closest to you." |
| C ≥ 8.5 | "You consistently zoom out and choose what helps the larger group over the single person." |
| C ≤ 1.5 | "You start from personal responsibility first and expand outward from there." |
| S ≥ 8.5 | "You prefer working through institutions, even when those institutions are imperfect." |
| S ≤ 1.5 | "You resist compliance by default and require systems to earn your cooperation." |

**Priority 2 — Tension (two axes that pull against each other):**

| Condition | Sentence pattern |
|---|---|
| O ≥ 6.0 AND L ≥ 6.0 | "You care about outcomes and loyalty at the same time, so who is involved often changes your decision." |
| O ≥ 6.0 AND S ≤ 4.0 | "You prioritize results and lose patience with process when systems slow urgent action." |
| H ≥ 6.0 AND L ≤ 4.0 | "You show strong empathy, but loyalty is conditional and must be earned." |
| C ≥ 6.0 AND O ≤ 4.0 | "You favor the collective, yet you still keep hard rules even when they reduce total benefit." |
| L ≥ 6.0 AND S ≤ 4.0 | "You are loyal to people you trust and skeptical of the systems around them." |

**Priority 3 — Near-midpoint (any axis score between 4.0 and 6.0):**

| Condition | Sentence pattern |
|---|---|
| Any axis 4.0–6.0 | "Your [axis name] sits near the middle; context, not indecision, tends to determine your lean." |

**Priority 4 — Conflict avoidance (if flagged):**

| Condition | Sentence pattern |
|---|---|
| conflictAvoidant = true | "When no one is watching, you become more decisive; you hold back in public because you are calculating social cost." |

**Priority 5 — Depth path finding (if depth questions shifted a score):**

| Condition | Sentence pattern |
|---|---|
| Axis score shifted ≥ 1.5 points during depth | "When stakes became personal, your [axis] position shifted, which suggests your stance is strong but conditional." |

**Assembly rule:** Select up to 4 sentences. Priority 1 first (max 2), then Priority 2 (max 1), then 3–5 to fill remaining slots. Never include two sentences about the same axis. Keep one explicit tension sentence maximum. Keep average sentence length under ~22 words. The result should read as one coherent paragraph, not a list.

**V2 note:** V2 may replace rule-based generation with a language model for more naturalistic output. These rules serve as the quality baseline and test cases for any future implementation.

---

## Special Patterns

### Conflict Avoidance

Conflict avoidance is not an axis but a detectable behavioral pattern. It appears when:

- Q5: User chooses a passive trunk answer (`Q5-A` or `Q5-D`)
- Q5 follow-up: User chooses an active answer when permission is explicitly granted (`Q5-FU-A`)

This gap — passive when unasked, active when permitted — indicates conflict avoidance rather than genuine principle. The scoring engine flags this and it is incorporated into the distinction paragraph for affected users.

```js
const conflictAvoidant =
  ['Q5-A', 'Q5-D'].includes(answers.find(a => a.questionId === 'Q5')?.answerId) &&
  ['Q5-FU-A'].includes(answers.find(a => a.questionId === 'Q5-followup')?.answerId)
```

---

## Golden Test Cases

Use these to verify scoring engine correctness. Each traces a complete answer path through the core set.

### Test Case 1 — "The Principled Utilitarian" → expected code: `OITPD`

| Question | Answer | O | C | H | L | S |
|----------|--------|---|---|---|---|---|
| Q1 trunk | A (pull) | +3 | | | | |
| Q1 FU-A | A (still pull) | +3 | | -3 | -3 | |
| Q2 trunk | A (return everything) | -1 | | | -2 | |
| Q3 trunk | A (tell the partner) | -1 | | | -2 | |
| Q3 FU | A (loyalty doesn't override) | | | | -3 | |
| Q4 trunk | B (donate) | +2 | +2 | -1 | -2 | |
| Q5 trunk | A (honor the will) | -2 | | -1 | | +2 |
| Q6 trunk | A (compete fully) | +1 | -1 | -1 | | |
| Q6 FU | A (still compete) | +1.5 | -3 | -1.5 | | |
| Q7 trunk | A (tell the truth) | -1 | | -1 | -2 | |
| Q8 trunk | A (report it) | -2 | | | | +2 |
| Q8 FU-A | A (still report) | -3 | | +1.5 | | |
| Q9 trunk | A (break the law) | | | | -2 | -3 |
| Q10 trunk | B (alert authority) | -1 | | -1 | | +1 |
| Q10 FU | C (same way) | | | | -3 | |
| Q11 trunk | A (swerve) | +3 | | | -2 | |

**Raw totals:** O=+2.5, C=-2, H=-8.0, L=-21, S=+2
**Normalized (approx):** O≈5.0, C≈4.0, H≈0.6, L≈1.2, S≈4.8
**Code:** O (≥5.0), I (<5.0), T (<5.0), P (<5.0), D (<5.0) → **`OITPD`**

### Test Case 2 — "The Empathetic Loyalist" → expected code: `RCHLD`

| Question | Answer | O | C | H | L | S |
|----------|--------|---|---|---|---|---|
| Q1 trunk | B (don't pull) | -3 | | | | |
| Q1 FU-A | B (can't — not her) | | | +4.5 | +3 | |
| Q2 trunk | A (return everything) | -1 | | | -2 | |
| Q3 trunk | B (not my place) | | | +1 | +2 | |
| Q3 FU | B (stay out of it) | | | | +3 | |
| Q4 trunk | A (volunteer) | | -1 | +2 | +1 | |
| Q4 FU | A (still volunteer) | | | +4.5 | +3 | |
| Q5 trunk | B (parent's wishes) | +2 | | | +2 | |
| Q6 trunk | B (pull back) | | +2 | +2 | | |
| Q6 FU | B (defer) | | +4.5 | +4.5 | | |
| Q7 trunk | B (encouragement) | | | +2 | +2 | |
| Q7 FU | B (no — helps no one) | +3 | | +1.5 | | |
| Q8 trunk | C (stay out of it) | | | | +1 | -2 |
| Q8 FU-B | B (push harder) | | | +1.5 | -1.5 | |
| Q9 trunk | B (respect the process) | -2 | | -1 | | +2 |
| Q10 trunk | C (support the target) | | | +2 | +1 | |
| Q10 FU | B (take child to safety) | | | +4.5 | -1.5 | |
| Q11 trunk | B (stay course) | -3 | | | | |

**Raw totals:** O=-4, C=+5.5, H=+29, L=+13, S=0
**Normalized (approx):** O≈3.6, C≈7.6, H≈6.6, L≈7.0, S≈3.8
**Code:** R (<5.0), C (≥5.0), H (≥5.0), L (≥5.0), S (<5.0) → **`RCHLD`**

*Note: S is close to midpoint — this user could flip to S with a single depth question.*

---

## Updating This Document

Any change to:
- Axis definitions or letter assignments
- Axis nudge values in `questions.js` or `depthGraph.js`
- Axis normalization ranges
- Convergence detection thresholds
- Distinction generation logic or paragraph principles
- The conflict avoidance detection logic

...must be reflected in this document before the code change is merged.
