# Plan: finish the map (Coast proposals, deferred follow-ups, World 5: the Observatory)

Goal (Ken, 2026-10-04): "approved all - lets implement and finish this."

## Rulings recorded
- The Coast's content is ratified, and all its recommendations are approved, including the ones the proposals file put off for later. The scene priming notes were approved as drawn.
- "Finish this" = build the last world, the Observatory, and close every open follow-up gap the proposals listed.

## Part A: follow-ups and fixes (content + scenes)
- **Coast** (`game/coast-proposals.md`, apply every recommendation):
  - Q2's garbled follow-up answer becomes "My rent is due either way."
  - Add follow-ups on both sides to D2, D4, D9 and B20.
  - Add the missing side to Q2, B19, B23, B15, B25 and D12.
  - Split B23's "Then I'd leave, or act" into "Then I'd leave." / "Then I'd free them."
  - Fix B25's "I already don't" so it faces pressure.
- **City** (deferred in `game/city-proposals.md`): add the missing side to Q10 and B34.
- Questions that change from one follow-up to one per side rename their follow-up ids (`fu` → `fuA`/`fuB`). Old saves lose only that pick.

## Part B: the Observatory (world 5, the last)
Theme: the self (reality, memory, meaning, the future). 18 questions. Region **south of the Coast** (x 126–154, y 49.6–80): a high plateau with contour lines, rocks, dry grass, sparse pines, winding trails, and a domed observatory as the landmark. A trail runs south from the Coast's north–south lane through the woods.

| Stop | Question | Scene id | Map prop |
|---|---|---|---|
| B47 | The Perfect Life Machine | `lifemachine` | a deck chair under a canopy |
| B48 | The Erased Memory | `memory` | a stone cairn |
| B49 | Two Lives | `twolives` | a signpost with two arms |
| B14 | The Proud Thing | `proud` | a lookout bench |
| B26 | The Pleading Robot | `robot` | a small workshop shed |
| B27 | The AI Companion | `companion` | a hillside cottage |
| B39 | The Edited Child | `edited` | a swing on a tree |
| B06 | The Unread Manuscript | `manuscript` | a small study cabin |
| B08 | The Family Secret | `secret` | a stone well |
| B11 | The Bully's Son | `bullyson` | a small office hut |
| B16 | The Shared Bonus | `sharedbonus` | a picnic table |
| B17 | The Late Paper | `latepaper` | a one-room schoolhouse |
| B38 | The Group | `group` | a camp circle of logs around a cold fire pit |
| B57 | The Dream Job | `dreamjob` | a milestone by the trail |
| B54 | The One-Star Review | `review` | a roadside diner |
| B50 | The Word That Stings (quick read) | `quickword` | a telescope |
| B51 | The Rule You'd Bend (quick read) | `quickrule` | a telescope |
| B52 | The One Belief (quick read) | `quickbelief` | a telescope |

The bank's session rule allows at most two quick reads per sitting. On a free-roam map the player chooses, so all three are stops (flagged to Ken).

- **World entry:** `{ id: 'observatory', chapter: 'Who you are underneath', closeTo: 'when the question is about you', ladder: 4 / 8 / 12 }`. It opens at 8 Coast answers. It is the last world, so its chapter screen says the map is complete.
- **Engine:** a region becomes a rectangle with its own y bounds. Walking is limited to the union of open regions (`clampPt`), fog is drawn per rectangle, and the route-finder treats cells outside every open region as walls.

## Delegation
- Content: Part A in `content-coast.js` and `content-city.js`, then `content-observatory.js` → one Opus subagent.
- Scenes, Observatory (18) → one Opus subagent.
- Scenes, Part A follow-up variants in `scenes-coast.js` and `scenes-city.js` → one Opus subagent.
- Region generalization, map, props, look-over, ending, testing → me.

## Done-check
Hidden Chrome: 8 Coast answers → Coast chapter → look-over → Observatory awake; its unlocks at 4/8/12; final chapter screen; code unchanged; random walks in five worlds never enter a building or leave the map; earlier layouts unchanged; every new follow-up plays with its scene; no console errors; phone and desktop.

## Status
- 2026-10-04: plan written.
- 2026-10-04: content helper applied every Coast/City recommendation and wrote the Observatory (18). Engine: regions as rectangles, Observatory plateau, dome, trails, 18 props, look-over, ending line. Verified in hidden Chrome: Coast chapter → look-over → Observatory awake; unlocks at 4/8/12; final chapter screen; code unchanged; 168 random walks across five worlds, none entering a building or leaving the map; four-answer card fits a phone; no console errors.
- 2026-10-04: Ken approved the Observatory content and all scenes; he commits. Observatory proposals left unapplied.
