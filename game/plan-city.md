# Plan: World 3, the City

Goal (Ken, 2026-10-03): "go ahead and build the next one." Source: `docs/PLAN-progression.md` §3 (approved first cut). Rulings that carry over from the Neighborhood (`game/plan-neighborhood.md`): one continuous map; the five-letter code stays from the park; all questions in one pass; scoring and notes by a subagent, ratified by Ken afterwards; buildings are solid.

## The 19 questions (PLAN-progression §3, City row)
| Stop | Question | Scene id | Map prop |
|---|---|---|---|
| Q11 | The Autonomous Car | `selfdrive` | a small car at a crosswalk |
| B12 | Two Drivers | `twodrivers` | a bar with two cars parked outside |
| B03 | The Reference Call | `reference` | a phone booth |
| B04 | The Company Line | `companyline` | a warehouse with a loading dock and crates |
| B05 | The Mistake No One Saw | `mistake` | an office building with a revolving door |
| B30 | The Permit Fee | `permit` | a permit office with a service window and queue posts |
| B32 | The Call-Up | `callup` | a notice board on a post |
| B33 | The Man Who Changed | `changed` | a school with a bell |
| B34 | The Remorse Pill | `remorse` | a prison: barred windows behind a fence |
| B35 | The True Story | `truestory` | a newsstand kiosk |
| B41 | The Borrowed Credit | `credit` | a glass office tower |
| Q8 | The Coworker | `theft` | a small office with a filing cabinet by the door |
| Q9 | The Protest | `unjustlaw` | a government building with a dome and steps |
| Q10 | The Bystander | `platform` | a subway entrance: stairs going down, a rail |
| D3 | The Informant | `shifts` | a factory with a saw-tooth roof |
| D5 | The Unearned Advantage | `hiring` | an office with two chairs outside |
| D6 | The Leaked Draft | `pensions` | a tall headquarters tower |
| D10 | The Returning Favor | `favor` | an apartment block with balconies |
| D11 | The Silent Witness | `witness` | a courthouse with columns |

D11 is written in the docs as a clarifying question ("Something came up…"). Here it's an ordinary stop, so that preface is dropped (flagged to Ken in the proposals file).

## The City's own unlocks (same pattern as the Neighborhood)
19 questions, so about two-thirds is 13.
| City answers | Unlock |
|---|---|
| 4 | How you change at work and under the law |
| 8 | What you do at work and under the law |
| 13 | Your City chapter; the Coast appears in fog, "opening soon" |

The City opens when 10 Neighborhood stops are answered (two-thirds, already the rule); its fog lifts after the Neighborhood chapter's arrival screen.

## Map
- Region x 84.6–120, y 1–43, east of the Neighborhood through its eastern woods. Main street, the lower street and the upper lane continue as city streets; three north–south avenues; the railway runs on with a small station.
- Flat-roofed buildings of 3–6 stories with window grids, a few water tanks, awnings at street level, street trees, lamps, benches, a small square. Same ink-on-paper style, calm. All buildings solid.
- Engine: the Neighborhood-only code (fog, open check, walking limit, gate) becomes a list of regions, so the Coast and Observatory can be added the same way. Park and Neighborhood layouts must not shift (separate random sequences; filter, don't re-seed).

## Delegation
- `game/content-city.js` → Opus subagent. Done-check: loads in node; all steps reachable; every answer has nudges/note/did; ids unique; 2,000 random runs through `portrait.js` with no errors; System/Disruption is this world's strongest axis.
- `game/scenes-city.js` → Opus subagent. Done-check: all 19 scenes, every answer path, played in a hidden Chrome at phone width, no console errors.
- Engine, map, props, regions refactor, unlocks, testing → me.

## Done-check
Hidden Chrome: a save with 10 Neighborhood answers opens the City after the chapter screen; all 19 stops answerable; City unlocks at 4/8/13 fire once in order; Coast sketch appears; code unchanged; random walks never enter a building; park and Neighborhood look the same as before; no console errors; phone and desktop.

## Status
- 2026-10-03: plan written.
- 2026-10-03: built map (streets, blocks of flat-roofed buildings, 19 stop props, City sign, Coast sketch), regions refactor (fog, walking limit, opening per region), City ladder 4/8/13. Content by subagent (awaits Ken; see city-proposals.md). Verified in hidden Chrome: Neighborhood chapter opens the City via the look-over (another session's feature), City unlocks fire once at 4/8/13, Coast appears, code unchanged, 140 random walks across three worlds never enter a building, no console errors.
