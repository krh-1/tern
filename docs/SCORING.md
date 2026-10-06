# Scoring: Tern (Ethics)

How the game turns answers into the portrait: the compass, the portrait lines, the five-letter code, and which worlds and unlocks open. This describes what `game/portrait.js` does today. The questions, nudges and portrait lines it reads are listed in `docs/QUESTIONS.md` (generated from `game/content*.js`).

**The big why:** Tern says something true about you from your first answer and sharpens it with every answer after. So scoring works on partial answers in any order, every number is computed fresh from whatever you've answered so far, and nothing is a running total that could go stale. The code is the one exception that stays fixed: it comes only from the 12 park questions everyone shares, because it's what friends compare.

`portrait.js` is pure logic with no page code, so it runs in node as well as the browser. `compute(content, answers, { opened })` returns the whole portrait.

---

## 1. Axes and nudges

There are five axes (value pairs). Each has a positive side and a negative side, and one letter for each.

| Axis id | Positive (+) | Negative (-) |
|---|---|---|
| `OR` | O, Outcomes | R, Rules |
| `CI` | C, Collective | I, Individual |
| `HT` | H, Heart | T, Thought |
| `LP` | L, Loyalty | P, Principle |
| `SD` | S, System | D, Disruption |

Every answer carries **nudges**: small signed numbers per axis, usually 1 to 3. `{ OR: 3 }` pushes three points toward Outcomes; `{ LP: -2 }` pushes two points toward Principle. Neither side is the right answer.

Why five axes: the original seven were reduced to five so the code has 32 combinations, enough to feel specific and few enough to remember. Rules/Outcomes and Means/Ends measured the same thing and became `OR`; Proximity folded into Loyalty, because closeness to people is a form of loyalty. Don't add axes (AGENTS.md, "Seven Axes Reduced to Five").

## 2. Step weights

A question is a first question (the trunk) plus follow-ups. Each step's nudges are multiplied by its weight:

- Trunk: **1**.
- Follow-ups: **1.5**, unless the step sets its own `weight`. Today only Q1's last follow-up (your child against 100 strangers) sets **2**.

Why follow-ups weigh more: two people can pick the same first answer for opposite reasons. The follow-up changes one fact and shows which reason it was, so it carries more information about the person.

## 3. Possible signal per question

`possible(q, axis)` is the most one question can move one axis: the largest nudge (ignoring sign) among the trunk's answers times the trunk weight, plus the largest among any one follow-up's answers times that follow-up's weight. Only one follow-up counts, because a player sees one path through the question.

Example: B02 can move `OR` by 2 on the trunk (B02-B) and 3 on its follow-up (B02-FU-A), so `possible(B02, OR) = 2 × 1 + 3 × 1.5 = 6.5`.

Per-question and per-world totals are in `docs/QUESTIONS.md` ("Most signal" and "How much each world can move each axis").

## 4. Score, lean, confidence, letter

For each axis, over a set of questions:

- **score:** the sum of every picked answer's nudge on that axis times its step weight.
- **got:** the sum of `possible()` over the answered questions that can move this axis.
- **total:** the sum of `possible()` over all questions in the set.
- **lean** = score ÷ got × 1.6, clamped to -1 … 1. It's how far the compass bar fills toward one side. The 1.6 factor stretches the bar, so a player who answers consistently reaches its end without picking the strongest option every time.
- **confidence** = got ÷ total: how much of the possible evidence for this axis is in.
- **letter:** the positive letter if score ≥ 0, else the negative letter. A tie goes to the positive letter.
- **touched:** how many answered questions can move this axis (their `possible()` is above zero), whether or not the picked answer moved it.

The compass is scored over every question in the game, so it learns from all worlds.

## 5. The compass

An axis appears in the compass once **2 questions touch it** (`known`). At 10 park answers, all five bars show. Each bar shows its lean. "Read more about you" lists, per axis, the answers that pulled toward your side (`toward`, strongest first) and the ones that pulled the other way (`away`), using each answer's `did` line.

## 6. Portrait lines (tendencies)

The portrait's sentences come from an authored library (`tendencies` in the content files). Nothing is written freely.

For each tendency:

- **strength** = how many of its `support` answers you picked, minus how many of its `against` answers you picked.
- It shows when strength reaches its `min` (2 for every line today) **and** the supporting picks come from **2 or more different questions**. One question can never produce a line alone.
- Lines are ordered by strength, then by `priority` (lower first), then by their order in the library.

Two lines can't show yet, because all their support comes from one question: `remembers` (B48) and `machines-matter` (B26). `docs/QUESTIONS.md` flags any such line automatically.

Each shown line carries its evidence (the supporting answers you picked) and its counter-evidence (the against answers you picked), so "Read more about you" can list the actual choices behind it.

## 7. Headline, description, protect and trade

- **Headline:** the text of the top line. It shows at 4 park answers. When it changes later, the panel marks it as changed.
- **Description:** lines 2 and 3, joined.
- **More about you:** up to 5 more lines after the headline (so lines 2 and 3 appear both in the description and here).
- **You protect:** the `protect` phrases of the shown lines, in order, without repeats, up to 4.
- **You'll trade away:** their `trade` phrases, without repeats and without anything already in "You protect", up to 4.

## 8. Tensions ("where you're torn")

A tension is an authored sentence with a list of answer ids. It shows when you've picked **every** id in its list. The panel shows at most 3, in library order. This is where apparent inconsistency surfaces: two answers that pull against each other are information about you, never an error (AGENTS.md, "Inconsistency Is Always Meaningful").

## 9. The code

The code is five letters, one per axis in the order `OR CI HT LP SD`, for example `OIHLD`. It is scored **over the first world's questions only** (`codeAxes`), and shown once all 12 park questions are answered.

Answers in later worlds never change the code. They do change the compass, lines, headline and tensions. This keeps the code comparable between friends: everyone's code comes from the same 12 questions (Ken's ruling, 2026-10).

## 10. Unlocks

Unlocks trigger on how many questions you've answered, never on which ones. Closeness is shown as dots, never numbers.

**The park ladder** (`LADDER` in `portrait.js`, counting park answers only):

| Park answers | Unlock |
|---|---|
| 1 | Your first answer note |
| 2 | Your compass |
| 4 | Your one-line summary (the headline) |
| 6 | What you protect |
| 8 | Where you're torn (only marked as seen once a tension actually exists) |
| 10 | Your whole compass |
| 12 | Your code |

**Worlds** open in the order listed in `content.worlds`:

- The first world (the Park) is open from the start.
- A world with `opens: 'all'` opens when every question in the previous world is answered. The Neighborhood works this way (12 of 12).
- Any other world opens at about two-thirds of the previous world, rounded up: the City at 10 of 14, the Coast at 13 of 19, the Observatory at 8 of 12.
- The previous world must itself be open, and a world marked `soon` never opens (it shows in fog as "opening soon").
- **Open forever:** once a world has opened, the game records `world:<id>` in the save's `seen` list and passes it to `compute()` as `opened`. Redoing an answer in an earlier world never closes it again.

**Each later world has its own ladder**, counting answers in that world only, and builds a chapter in the portrait:

| World | Shift | Tendencies | Chapter |
|---|---|---|---|
| The Neighborhood | 3 | 6 | 10 |
| The City | 4 | 8 | 13 |
| The Coast | 3 | 6 | 8 |
| The Observatory | 4 | 8 | 12 |

- **Shift line:** the axis where your answers in this world lean most differently from all your other answers. Both sides must have 2 or more questions touching the axis. If the difference in lean is 0.3 or more: "With the people closest to you, you lean more toward heart than in your other answers." Otherwise: "…you lean the same way as in your other answers." The opening words come from the world's `closeTo`.
- **Chapter lines:** the shown portrait lines with at least 2 evidence answers from this world.
- **Chapter headline:** the first of those.

**What's next** (the dots at the bottom of the panel): the next step on the park ladder. Once that ladder is done, it walks the later worlds in order and stops at the first one that either hasn't opened yet (it shows that world) or still has a ladder step left (it shows that step).

## 11. The ◆ calling stop

After your first answer, one unanswered stop glows. To pick it: score the axes over the questions in open worlds, take the axis with the **lowest confidence**, and choose the unanswered open question with the highest `possible()` for that axis (ties go to the earlier question in the content files). It's a suggestion on the stop itself, never an arrow (AGENTS.md, "No Wayfinding").

## 12. Worked example

A player answers four park questions:

| Question | Picks |
|---|---|
| Q1 The Trolley | Q1-A (pull), Q1-FUA-B (not if it's my mother), Q1-FUB-B (not my child, even for 100) |
| B09 The 2 A.M. Call | B09-A (cover for my sibling), B09-FUA-B (stay quiet even when an innocent person is arrested) |
| D8 The Waiting List | D8-A (make the call) |
| B02 The Deathbed Question | B02-B ("Yes, it's doing well"), B02-FU-B (his peace matters more than the promise) |

**`OR` axis.** Picks: Q1-A `+3 × 1`, B02-B `+2 × 1`, B02-FU-B `+2 × 1.5`. Score = 3 + 2 + 3 = **8**. Answered questions that can move `OR`: Q1 (`possible` 9) and B02 (6.5), so got = 15.5 and touched = 2. Lean = 8 ÷ 15.5 × 1.6 = **0.83** toward Outcomes. Confidence = 15.5 ÷ 190.5 (all 75 questions) = 0.08.

**All axes:** O (lean 0.83), I (-1.00), H (1.00), L (1.00), D (-1.00). Every axis is touched by 2 or more questions, so all five bars show. The code would read `OIHLD`, but it stays hidden until all 12 park questions are answered.

**Lines.** `bend-for-love` has 5 supporting picks (B09-A, B09-FUA-B, D8-A, Q1-FUA-B, Q1-FUB-B) from 3 questions, none against: strength 5. `own-first` also reaches 5, but has priority 4 against `bend-for-love`'s 2, so it comes second. Then `soften-truth` and `comfort-at-end` (strength 3 each).

- Headline: "You'd break rules for people you love."
- Description: "Your family comes before strangers. You soften the truth to spare feelings."
- You protect: family, family and friends, people's feelings, people's peace of mind. You'll trade away: rules, fairness to strangers, the full truth, the full facts. (These unlock at 6 park answers.)
- Tensions picked: Q1-A + Q1-FUA-B, and Q1-A + D8-A. (These unlock at 8.)
- Unlocked now: notes, compass, headline. Next: "What you protect", 2 dots, 0 filled.
- Calling: **B13 Two Worlds**, because Collective/Individual has the lowest confidence and B13 can move it most.

To rerun this: load the five content files and `portrait.js` in node and call `compute(TERN_CONTENT, answers)`.

## 13. Changing scoring

- Nudges, step weights, tendencies and tensions live in `game/content*.js`. They are instrument changes: get Ken's say-so, then run `npm run export:questions` so `docs/QUESTIONS.md` matches.
- Any new answer needs a `did` line; any new tendency needs a `detail` and a `share` line (or a deliberate decision to leave `share` out).
- A rule change in `portrait.js` (thresholds, ladders, ordering) must be reflected here in the same change.

---

## Retired

These parts of the old model are not in the game. They are kept so older entries in AGENTS.md and `docs/question-bank-wip/` still make sense. Don't build on them.

- **Two-phase model** (a fixed core set, then an adaptive depth graph). Replaced by worlds you walk in any order, and the ◆ calling stop.
- **Convergence offer** ("We have a pretty clear picture of you. Want to see what we found?"), triggered when all letters stayed stable for 3 questions with a margin of 1.0. Replaced by the unlock ladder: you see something from the first answer.
- **Depth graph routing, distinction convergence and clarifying depth nodes.** The D questions now live in worlds as ordinary stops. Apparent inconsistency is shown as a tension instead of a queued clarifying question.
- **Normalization to 0 to 10** with fixed min/max ranges per axis, and the 5.0 midpoint. Replaced by lean (score ÷ possible signal of answered questions) and the score ≥ 0 letter rule, which need no ranges to recompute.
- **Golden test codes** (`OITPD`, `RCHLD`) and the numeric traces in `docs/SIMULATIONS.md`. They were computed on the old Q1 to Q11 and are stale.
- **The distinction** (radar chart plus a generated 3 to 4 sentence paragraph, with one-line summary and axis-breakdown templates). Replaced by the portrait: the headline, description and lines from the tendency library, plus "Read more about you". The radar chart survives on the code reveal screen.
- **Conflict-avoidance detection from Q5** (passive trunk, active follow-up). Replaced by the `avoid-conflict` line, "You avoid open conflict," supported across B40, B43, B56, Q3, B37, B09, B16, D3 and Q8 (Ken's ruling, 2026-09-27).
- **Old question ids.** Q7 (The White Lie) is no longer in the game. Axis coverage tables keyed to Q1 to Q11 are replaced by the generated tables in `docs/QUESTIONS.md`.
