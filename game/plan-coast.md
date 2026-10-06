# Plan: City proposals, then World 4, the Coast

Goal (Ken, 2026-10-03): "implement it" → both: apply the City proposals, then build the Coast.

## Part A: City proposals (`game/city-proposals.md`), applied as recommended
- **Ratified:** the City's content as written, apart from the changes below (Ken chose to implement the recommendations).
- **New follow-ups** (scoring, notes, `did` lines, tendency/tension wiring and scene variants for each):
  - **D11:** after "the whole truth": "Your answer will very likely send your brother to prison." After "leave it out" or "refuse": "Without your answer, the jury will likely blame the other man."
  - **D6:** after "Go public": "Your lawyer says the lawsuit would take your savings and your home." After "Stay quiet": "One of the 3,000 is your old mentor."
  - **B41:** the missing side, after "Let it go": "Your coworker finds out and asks if you said anything."
  - **B03:** the missing side, after "The honest picture": "The hiring manager says your answer will decide it."
- **Kept as is** (the proposals said keep): D11's dropped preface, B30, B12, the four middle answers, the scoring calls. Q10 and B34 one-sided follow-ups stay for later (the file only recommended B41 and B03 "first").
- B41 and B03 now have a follow-up per side, so their existing `fu` becomes `fuA`/`fuB` (by trunk answer). Old saves lose only that one follow-up pick.

## Part B: The Coast
| Stop | Question | Scene id | Map prop |
|---|---|---|---|
| Q2 | The Wallet | `seawallet` | a bench on the promenade |
| D4 | The Stranded Stranger | `busstop` | a bus shelter on the coast road |
| B25 | The Slaughterhouse Test | `meat` | a barn behind the dunes |
| D2 | The Anonymous Donor | `donor` | a small post office |
| Q4 | The Saturday | `shelter` | a shelter hall with a soup pot sign-free window |
| B22 | The 200-Year Deal | `sapling` | a young tree with a stake, in a ring of stones |
| D12 | The Bonus Pool | `bonus` | a harbor office |
| D9 | The Sacrifice Calculus | `programs` | a community center |
| B20 | The Weapons Job | `crane` | a dockyard crane |
| B19 | The Kidney | `kidney` | a clinic |
| B23 | The Happy City | `happycity` | a still carousel on the boardwalk |
| B15 | The Lifeboat | `lifeboat` | a rowboat pulled up on the beach |

D12 was a clarifying question in the docs; here it's an ordinary stop, so its preface is dropped (as with D11).

- **World entry:** `{ id: 'coast', chapter: 'For strangers and people not yet born', closeTo: 'when strangers are counting on you', opens: 'most', ladder: 3 / 6 / 8 }`. The Coast opens at 13 City answers (two-thirds), right after the City chapter. The Observatory becomes the next `soon` world.
- **Map:** region x 125.6–152, east of the City's woods. The City's avenue, lower street and upper lane carry on as coast roads, joined at the City streets' exact end points. A boardwalk runs north–south along the beach; sand, dunes and grass; the sea beyond (x > 152), drawn still (water never moves) with a pier and a few moored boats; a lighthouse on a rocky point. Beach cottages (`drawHouse`) and small shops (`drawTower`). All buildings solid; you can walk to the waterline.
- **Next world:** the Observatory, sketched in fog on a hill north of the Coast, "opening soon". `SOON_AT` becomes per-region.

## Delegation
- Content (Part A follow-ups in `content-city.js`, then `content-coast.js`) → one Opus subagent.
- Scenes (`scenes-coast.js`, then the new City follow-up variants in `scenes-city.js`) → one Opus subagent.
- Region, map, props, look-over framing, testing → me.

## Done-check
Hidden Chrome: 13 City answers → City chapter → look-over → Coast awake; Coast unlocks at 3/6/8; Observatory sketch; code unchanged; random walks in four worlds never enter a building; earlier worlds' layouts unchanged; the new City follow-ups play with their scenes; no console errors; phone and desktop.

## Status
- 2026-10-03: plan written.
- 2026-10-03: Part A applied by the content subagent (City ratified; D11, D6, B41, B03 follow-ups). Part B built: Coast region, sea, boardwalk, pier, lighthouse, 12 stop props, look-over framing, Observatory sketch. Verified in hidden Chrome: City chapter → look-over → Coast awake; Coast unlocks at 3/6/8; Observatory sketch; code unchanged; 139 random walks across four worlds, none entering a building; no console errors. Scenes pending.
