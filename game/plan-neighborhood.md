# Plan: World 2, the Neighborhood

Goal (Ken, 2026-10-03): start building the next world. Source: `docs/PLAN-progression.md` §3–§5 (approved).

## Ken's rulings for this build (2026-10-03)
1. **One map.** The Neighborhood is a walkable area east of the park on the same map. When it opens, the fog lifts. The park stays reachable.
2. **The code only uses the park's 12 questions.** It is what friends compare. Compass bars, tendencies, the headline, "where you're torn" and the answer notes keep learning from every answer.
3. **All 14 questions in this pass**, with code-drawn scenes. The scoring and notes written for them wait for Ken's sign-off, like the park's.

## The 14 questions (from PLAN-progression §3)
| Stop | Question | Scene id | Map prop | Where |
|---|---|---|---|---|
| B56 | The Quiet Loan | `loan` | mailbox at a front gate | near the gate (light) |
| B55 | The Bent Rule | `boardgame` | porch table with a game board | near the gate (light) |
| B24 | The Dog or the Stranger | `dog` | doghouse in a yard | near the gate |
| B43 | The Apology They Want | `apology` | fence between two yards | middle |
| B42 | The Rumor | `rumor` | backyard table under string lights | middle |
| B44 | The Unlocked Phone | `phone` | house with one lit window | middle |
| B46 | The Nightly Call | `nightcall` | porch bench under a streetlamp | lower street |
| Q3 | The Confession | `confession` | corner café with two stools | lower street |
| B45 | The Friend's Big Break | `bigbreak` | front stoop with steps | lower street |
| B36 | What Forgiveness Is Owed | `forgive` | two chairs in a small garden | north |
| D7 | The Uncomfortable Truth | `fiance` | garden arch in a little square | north |
| B10 | What We Owe Our Parents | `parents` | parents' house with a porch swing | north, across the tracks (heavy) |
| Q5 | The Inheritance | `inheritance` | old family house, one upstairs light | north, across the tracks (heavy) |
| D1 | The Promise About the Home | `carehome` | care home with an armchair by the window | north, across the tracks (heavy) |

Heavy family questions sit deeper, across the railway, so a first walk doesn't open with three hard scenes.

## Contracts (extend `game/plan.md`)
- Every question has `world: 'park' | 'hood'`. Park questions default to `park`.
- Step keys: `trunk`; one follow-up → `fu`; a follow-up per trunk answer → `fuA` (after answer A), `fuB` (after answer B).
- Answer ids: `B56-A`, `B56-FU-A`, `Q3-FUA-A`, `Q3-FUB-B`, …
- `game/content-neighborhood.js` appends to `window.TERN_CONTENT`: questions, new tendencies, extra support/against ids for existing tendencies, new tensions, the world's chapter text.
- `game/scenes-neighborhood.js` pushes a scene pack onto `window.TERN_SCENE_PACKS` (same helper object as `TERN_SCENES`).
- `content.worlds`: `[{ id: 'park', … }, { id: 'hood', name: 'The Neighborhood', chapter: 'With the people closest to you', ladder: […] }]`.

## Scoring (`game/portrait.js`)
- The park's unlock ladder counts park answers only. `complete` = all 12 park questions answered.
- `code` and the code-reveal radar come from park answers only. Compass bars use every answer.
- A world opens when its rule is met (park: all 12 → Neighborhood) or once it has ever opened (kept in the save, so "Answer again" on a park stop doesn't re-fog it).
- ◆ calling picks only from stops in open worlds.

## The Neighborhood's own unlocks (my call; flag to Ken)
Dots stay short, as in the park. Each step adds to a new "With the people closest to you" chapter in the portrait.
| Neighborhood answers | Unlock | What it shows |
|---|---|---|
| 3 | How you change close to home | The value pair where your Neighborhood answers lean differently from your other answers, in one plain line. |
| 6 | Close to home, you… | Tendencies backed by 2+ Neighborhood answers. |
| 10 (about two-thirds) | Your Neighborhood chapter | The chapter's own one-line summary, an arrival moment, and the City appears in fog beyond, "opening soon". |

## Map (`game/index.html`)
- Region x 45–78, y 1–43. A trail from the cabin leads to a gate at the park's east edge. The park road continues as the lower street; the railway continues through; a north–south street crosses it.
- Houses, fences, hedges, street trees, lamp posts, mailboxes: drawn in code, same ink-on-paper style, calm (no new motion beyond trees and one chimney wisp).
- Before opening: everything sketched in dashed graphite under soft fog, label "The Neighborhood / answer every stop in the park", and you can't walk past the gate. On opening: the fog lifts slowly, lines ink in.

## Delegation (told to Ken)
- `content-neighborhood.js` → Opus subagent. Done-check: node loads it; every answer has `nudges`, `note`, `did`; every follow-up route resolves; tendency ids exist.
- `scenes-neighborhood.js` → Opus subagent. Done-check: every scene id above exists with `base/shift/act/draw`; no console errors when each is opened.
- Engine, map, props, portrait, unlocks, integration, testing → me.

## Done-check
In the browser pane: a save with the park complete shows the open Neighborhood; walk in; answer all 14; each Neighborhood unlock fires once at 3/6/10; the code doesn't change; reload keeps state; no console errors; phone and desktop layouts.

## Status
- 2026-10-03: plan written; Ken ruled 1–3 above.
- 2026-10-03: built. Map, gate, houses, 14 stops, fog lift, scoring by world, Neighborhood ladder (3/6/10), chapter section and arrival, City in fog. Verified in the browser: unlocks fire once in order, code unchanged by Neighborhood answers, no console errors, phone and desktop. Content by subagent (awaits Ken). Scenes by subagent (see final report).
- 2026-10-03: Ken ratified the Neighborhood questions and scoring as written. Buildings made solid: taps route around them, keys slide along walls (435 of 436 random headless walks arrived; none entered a wall).
