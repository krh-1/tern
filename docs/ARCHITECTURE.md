# Architecture: Tern

> **Status (2026-10):** describes the game as built in `game/`. Rulings live in `AGENTS.md`; where this doc and `AGENTS.md` disagree, `AGENTS.md` wins. The old React/Vite plan this doc used to describe was never built; see "History" at the end.

## Overview

Tern is a handful of static files with **no build step**, no backend, no database and no network calls. Open `game/index.html` through any static server and it runs.

```bash
python3 -m http.server 8123 --directory game
# then open http://localhost:8123
```

Three layers, kept apart on purpose:

| Layer | Files | What it is |
|---|---|---|
| **Instrument** (content) | `game/content.js`, `game/content-<world>.js` | The questions, follow-ups, scoring nudges, notes and the portrait's statement library. This is measurement, not UI copy. |
| **Portrait engine** | `game/portrait.js` | Pure logic: answers in, portrait out. No DOM. Runs in the browser and in node. |
| **Game engine and scenes** | `game/index.html`, `game/scenes*.js` | The map, the player, the question card, the portrait panel, unlocks, reveals, share and save. Scenes are code-drawn on a canvas. |

---

## File map

```
game/
├── index.html                  # the engine: map, player, card, panel, unlocks, reveals, share, save, zoom
├── content.js                  # the instrument for the Park (core 12), plus axes, tendencies, tensions, worlds, shareCopy
├── content-neighborhood.js     # world 2: appends 14 questions, tendencies, tensions
├── content-city.js             # world 3: 19 questions
├── content-coast.js            # world 4: 12 questions
├── content-observatory.js      # world 5: 18 questions
├── portrait.js                 # scoring and portrait logic (window.TernPortrait, or module.exports in node)
├── scenes.js                   # code-drawn scenes for the park (window.TERN_SCENES)
├── scenes-<world>.js           # one scene pack per later world (pushed onto window.TERN_SCENE_PACKS)
├── manifest.webmanifest, icons/  # home-screen install (app icon is Mof)
├── plan.md                     # V1 plan, contracts and decisions (the park)
├── plan-<world>.md             # one build plan per later world
├── plan-judge-fixes.md         # scope of the 2026-10-04 skeptic-judge fixes
└── <world>-proposals.md        # open content questions per world: what was applied, what's deferred
```

Elsewhere:
- `docs/question-bank-wip/judge-*.md`: the judge verdicts behind each content pass.
- `prototypes/trolley-walk.html`: the original park prototype the engine was forked from (history; the game is now the reference).
- `scripts/illustrations/`, `docs/ILLUSTRATION-GENERATION.md`: the image-generation pipeline, **on hold** (scenes are drawn in code).

**Script load order** (in `index.html`): `content.js`, then each `content-<world>.js` in world order (each appends to `window.TERN_CONTENT`), then `portrait.js`, then `scenes.js` and each `scenes-<world>.js`.

---

## Data shapes (the instrument)

All content hangs off `window.TERN_CONTENT`. Axis ids are signed pairs: `OR` (+ toward Outcomes, − toward Rules), `CI` (Collective / Individual), `HT` (Heart / Thought), `LP` (Loyalty / Principle), `SD` (System / Disruption).

### Axes
```js
{ id: 'OR', pos: 'O', neg: 'R', posLabel: 'Outcomes', negLabel: 'Rules',
  posDetail: `You judge a choice by what it leads to.`,           // shown in "Read more about you"
  negDetail: `Some things you won't do, even for a better result.` }
```

### Questions
```js
{
  id: 'B56', world: 'hood', title: `The Quiet Loan`, scene: 'loan', weight: 'light',  // weight: light | medium | heavy (emotional load, for placement)
  steps: {
    trunk: { setup: `…`, q: `…`, answers: [
      { id: 'B56-A', text: `Ask them for it directly.`,
        nudges: { LP: -2, CI: -1 },                 // signed pushes on the axes
        note: `…`,                                  // shown after answering: what this choice suggests
        did: `You'd ask a friend directly to repay…` },  // one plain sentence, used in "Read more about you"
    ] },
    fuA: { weight: 1.5, setup: `…`, q: `…`, answers: [ … ] },
  },
  next(step, picks) { /* returns the next step key, or null when the question is done */ },
}
```

- `world` is the world id (`park` is the default when it's missing).
- **Step keys:** `trunk`, then follow-ups. A single follow-up is `fu`. When follow-ups depend on the trunk answer, the key follows the trunk answer: `fuA` after answer A, `fuB` after B, `fuC` after C. (Q1, the oldest question, is an exception: its `fuA` follows any trunk answer and its `fuB` is a second-level follow-up after a specific pair of picks. `next()` is always the source of truth.)
- **Step weight:** the trunk counts 1. A follow-up counts 1.5 by default, or its own `weight` (for example 2 for a high-stakes follow-up).
- **Answer ids:** `<QID>-<letter>` for the trunk (`B56-A`), `<QID>-FU-<letter>` for `fu`, `<QID>-FUA-<letter>` for `fuA`, and so on.
- **Replaced follow-ups get a "2":** when a follow-up's situation is replaced, it keeps its key but its answers get new ids with a "2" (`Q11-FUA2-A`). An old save then never shows a note for a question the player wasn't asked.
- **Renamed keys:** when a single `fu` becomes `fuA`/`fuB`, its answer ids change too. Old saves lose only that one pick.
- Every answer must have `nudges`, `note` and `did`. `did` names its subject in full, so it reads correctly in a list away from its question.

### Tendencies (the statement library)
```js
{ id: 'keeps-word', text: `You keep your word.`,       // the portrait line, second person
  share: `I keep my word.`,                            // optional: the first-person line a player may send; no share = never sent
  detail: `A promise still counts when breaking it would be easier or kinder.`,
  support: ['B37-B', 'B02-FU-A', …], against: ['B37-A', …],   // answer ids
  min: 2, priority: 1,                                 // lower priority wins ties
  protect: ['promises'], trade: ['your own comfort'] } // read after "You protect:" and "You'll trade away:"
```
A later world adds evidence to an existing tendency through its `more` map (extra `support`/`against` ids), and pushes its own new tendencies.

### Tensions
```js
{ when: ['Q1-A', 'Q1-FUA-B'], text: `You'd sacrifice one stranger to save five, but not someone you love. …` }
```
A tension shows when every id in `when` was picked.

### Worlds
```js
worlds: [
  { id: 'park', name: `The Park` },
  { id: 'hood', name: `The Neighborhood`, chapter: `With the people closest to you`,
    closeTo: `with the people closest to you`,   // used in "Close to home, you lean more toward…"
    opens: 'all',                                // 'all' of the previous world, or 'most' (two-thirds, rounded up)
    ladder: [ { at: 3, key: 'shift', name: `How you change close to home` },
              { at: 6, key: 'tend',  name: `What you do close to home` },
              { at: 10, key: 'chapter', name: `Your Neighborhood chapter` } ] },
  …
]
```
Optional flags: `soon: true` (declared but not built: shown as an "opening soon" sketch), `last: true` (the final world).

| World | id | Opens at | Ladder |
|---|---|---|---|
| The Park | `park` | start | the park ladder (below) |
| The Neighborhood | `hood` | all 12 park answers | 3 / 6 / 10 |
| The City | `city` | 10 Neighborhood answers | 4 / 8 / 13 |
| The Coast | `coast` | 13 City answers | 3 / 6 / 8 |
| The Observatory | `observatory` | 8 Coast answers | 4 / 8 / 12 |

### Other content
- `shareCopy`: every sentence of the share message and card (`intro`, `introSoFar`, `code`, `cardKicker`…). The friend has seen none of the questions, so it says what Tern is.
- `codeLine`: the one-line explanation shown under the code.

---

## The portrait computation (`game/portrait.js`)

`TernPortrait.compute(content, answers, { opened })` takes the answers so far and returns everything the panel shows. It is pure and deterministic, so it can be checked in node.

**Input:** `answers` is `{ [questionId]: { picks: { trunk: 'Q1-A', fuA: 'Q1-FUA-B' }, order: n } }`. `opened` is the list of world ids that have opened before.

**What it computes:**

| Output | How |
|---|---|
| `axes` (the compass) | For each pair: the sum of weighted nudges over every answered question in every world. `lean` (−1 to 1) is that score divided by the most signal those questions could carry. `confidence` is the share of possible signal answered so far. An axis is `known` once 2 questions touch it. Each axis lists the answers that pulled `toward` your side and `away` from it. |
| `code`, `codeAxes` | The same scoring over **the first world's questions only** (the park). One letter per axis: the positive letter if the score is ≥ 0. Later worlds can never change it. |
| `tendencies` | A tendency shows when (supporting answers picked − against answers picked) ≥ `min` (2), from at least 2 different questions. Sorted by strength, then `priority`. Each carries `evidence` and `counter` (the answers behind it, as plain `did` facts). |
| `headline`, `description` | The strongest tendency; the next two joined. |
| `protect`, `trade` | Up to 4 each, collected from the tendencies shown. |
| `tensions` | Every tension whose `when` ids are all picked. |
| `notes` | Each answered question's notes, in answer order. |
| `calling` | The open stop that would most sharpen the least-certain axis, among worlds that are open. Only after the first answer. |
| `count`, `complete` | Park answers counted; `complete` once all 12 park questions are answered. |
| `unlocked`, `has(key)`, `next` | Which ladder steps are reached, and the next one as filled/empty dots. |
| `worlds` | Per world: `open`, `ready`, `answered`, `total`, its `unlocked` steps, and its chapter: `shift` (the pair where this world's answers lean most differently from all your other answers, if the gap is ≥ 0.3), `tendencies` backed by 2+ answers from this world, and its `headline`. |

**The park ladder** (`LADDER` in `portrait.js`): 1 notes · 2 compass · 4 headline · 6 protect · 8 tension · 10 all bars · 12 code. It counts park answers only.

**Opening worlds:** a world opens when the previous world is open and has enough answers (`opens: 'all'` or two-thirds), or when its id is in `opened`. The engine records an opened world in the save as `world:<id>` in `seen`, so a world **stays open forever**: "Answer again" on a park stop never re-fogs the Neighborhood.

---

## The game engine (`game/index.html`)

One self-contained page: CSS, markup and a single script.

### The map
- **Isometric projection.** The world is a flat grid in map units; `iso()` turns map units into screen pixels at a fixed tile size, and `toScreen()` / `toWorld()` convert with the camera. Everything is drawn at fixed pixel sizes.
- **One continuous map.** The park sits at the west. Each later world is a region further east (the Observatory is south of the Coast). Streets carry on from one world into the next, joined at exactly the same end points.
- **Regions.** `REGIONS` lists every world past the park, in opening order, with its bounds, fog label, "how to open" hint and, optionally:
  - `walk`: its own rectangle you can walk in (for a world off the east strip, like the Observatory);
  - `fogArea`: the rectangle its fog covers, and which edge it fades from;
  - `soonAt`: where the next unbuilt world's "opening soon" sketch stands.
- **Fog.** Each region has a fog level that eases slowly from 1 to 0 when it opens. Stops in a world wake (`isOpen`) once its fog is half gone.
- **Where you can walk.** `walkAreas()` is the park plus every open world's strip (up to `eastLimit()`), plus any open region's `walk` rectangle. `clampPt()` keeps every target inside them.
- **Separate random sequences per world.** Scenery placement uses a seeded random number generator, one per world (`rnd` for the park, `hr` for the Neighborhood, `cr`, `kr`, `orr` for the others). Adding a world never shifts an earlier world's trees or houses. To clear space in an earlier world, filter its scenery afterwards; never change its seed or its street control points.
- **Stops.** `PLACES` gives each question a map position, a prop `kind`, and optionally where you stand (`stand`) and where its flag goes (`flag`). Walking onto a stop opens its card.

### Solid buildings and routing
- `FOOT` gives every building-type prop a footprint (width, depth, optional y offset). Houses in the Neighborhood have footprints too. You can't walk into any of them.
- A stop's `stand` point must sit outside its footprint.
- **Taps route around buildings** (`walkTo`): a straight line if it's clear, otherwise an A* search (a standard shortest-path search) on a half-unit grid, smoothed down to the corners you can't see past. Cells outside the open areas count as walls.
- **Arrow keys slide along walls** rather than stopping dead.

### The look-over
When a world opens, `lookOver(region)` runs once, after any reveal screens:
1. The map fades to paper.
2. It comes back framed on the new world's entrance (`LOOKS[id].at`), zoomed out enough to show a landmark the player already knows.
3. The fog lifts while that world's "?" bubbles rise one by one, west to east.
4. One line of plain directions shows (`LOOKS[id].line`, for example "The Neighborhood is open, past the cabin and through the gate.").
5. After about 4 seconds, the view fades back to the player. A tap or key skips it.

Until the player answers a stop in that world, the panel's bottom line reads "<World> is open · Show me", which replays the look-over. It never walks the character there.

### Zoom
- Pinch on a phone, pinch or scroll on a trackpad, `+` and `-` on a keyboard. Range 0.6× to 1.8×, always centred on the player, eased (no snapping), saved with the game.
- Zoom is a canvas scale (`Z`), not a change of tile size. `W` and `H` are the view size in map pixels (screen size ÷ `Z`).
- **Gotcha:** anything comparing screen pixels (pointer `clientX/Y`, the card's camera shift, the desktop panel width) must be divided by `Z` or use `innerWidth`/`innerHeight`. Pointer coordinates go into `toWorld` / `nodeAtScreen` divided by `Z`.
- A second finger cancels the first finger's walk.

### The question card and scenes
- **Scene packs.** `scenes.js` defines `window.TERN_SCENES(h)`; each later world pushes a function onto `window.TERN_SCENE_PACKS`. The engine calls each with the same helper kit `h` (scene state, easing, ink colours, drawing helpers such as `drawPerson`, `indoor`, `bubble`) and merges the returned scenes by id. A question's `scene` field picks its scene.
- **Scene contract.** Each scene is an object drawn on a 400 × 250 canvas:
  - `base(variant)`: set the starting state for a step (the variant is the step key: `trunk`, `fu`, `fuA`…);
  - `shift(variant)`: animate into a follow-up's situation;
  - `acts`: a map from answer id to target values, or `act(answer)`: the small action an answer plays (the lever moves, the door opens);
  - `draw(g, t)`, and optionally `update(dt)`.
  Scene values ease toward targets (`sset` sets, `sto` eases). Harm is never drawn: the scene fades before impact.
- **Answer flow** (`choose`): the chosen answer marks (250 ms) → the words hide → the scene plays the answer → the scene fades to paper → the next step's scene is set up and fades in → `shift` → a 0.9 s hold → the words appear. The new text is laid out while hidden and the card glides to its new height. Aim for about 3.5 s from answer to follow-up.
- **Opening a card:** the scene arrives first; the words follow after 1 s.
- **Answers need a confirm:** tap an answer, then "Confirm". A misclick costs nothing.
- **Done stops:** tapping one opens a review (your answers and their notes) with "Answer again", which clears that one answer and asks the question fresh. Unlocks already seen stay seen.

### The portrait panel, reveals and share
- `renderPortrait()` calls `TernPortrait.compute` and rebuilds the panel. Changed sections dissolve out and resolve back in.
- `afterAnswer()` runs 0.7 s after the card closes: it finds newly reached unlocks, marks them in `seen`, re-renders, then plays any arrival screens (summary at 4, code at 12, each chapter) and then any look-over.
- Share builds the message from `shareCopy` and draws a 1080 × 1350 card image on a canvas. It uses the Web Share API when available, with copy-message and save-picture fallbacks.
- Details of each screen: `docs/DESIGN.md`.

### Performance
While the question card covers a phone screen, the map behind it redraws at half rate.

---

## Save format

Saved on the device only, in `localStorage` (the browser's per-site storage). Every read and write is wrapped so a private window still plays, just unsaved.

| Key | Contents |
|---|---|
| `tern.v1` | The game state (below) |
| `tern.panelMin` | `'1'` if the desktop portrait panel is minimized |

```js
{
  started: true,
  char: 0,                                   // index into CHARACTERS
  answers: { Q1: { picks: { trunk: 'Q1-A', fuA: 'Q1-FUA-B' }, order: 1 }, … },
  headline: 'You keep your word.',           // the last summary shown, to detect "Your summary changed."
  seen: ['notes', 'compass', 'headline', …, 'hood:shift', 'world:hood'],  // unlocks already revealed, and worlds opened
  pos: { x: 20, y: 27 },                     // where the player stood
  zoom: 1,
}
```

- Saved after every answer and on page hide.
- On load, answers to questions that no longer exist are dropped. Picks with unknown answer ids are skipped by the portrait.
- "Start over" clears `tern.v1` and reloads.

---

## Testing

There is no automated test suite in the repo. The practice that has worked:

**Node checks** (load all five content files and `portrait.js` in node):
- every step reachable through `next()`; every answer has `nudges`, `note`, `did`; ids unique;
- every id referenced by tendencies, `more`, tensions and `next()` exists;
- thousands of random answer runs through `compute()` with no errors;
- the code never changes when only non-park answers change;
- no em dashes in copy.

**Headless Chrome over the DevTools protocol** (Chrome with no window, driven by a script):
- with touch input and 4× CPU slowdown, it measures phone feel reliably (the browser pane can't: it pauses animations while hidden);
- play every stop to the end at phone width and check the console;
- run random walks across all worlds and check none enters a building or leaves the map;
- **disable the cache** (`Network.setCacheDisabled`): the local server lets Chrome cache scripts, so a reused profile can test stale code.

**Save isolation:** two tabs on `localhost:8123` share one save, and the page saves on unload, so parallel testers overwrite each other. Use `127.0.0.1:8123` for a separate save.

**Dev hooks** (`window.__tern` in the browser console):

| Hook | Does |
|---|---|
| `__tern.go(x, y)` | Teleport the player |
| `__tern.walk(x, y)` | Walk there using the router |
| `__tern.where()` | Player position, route, and whether it's inside a wall |
| `__tern.open('B09')` | Open a stop's card |
| `__tern.review('B09')` | Open a done stop's review |
| `__tern.state` | The live save state |
| `__tern.card(answers, lines)` | Draw a share card for a given set of answers |
| `__tern.icon(size)` | Draw Mof as an app icon |
| `__tern.wipe()` | Clear the save and reload |

---

## How to add a world

From `AGENTS.md` (2026-10 entries):

1. **Content:** `game/content-<world>.js` appends questions with `world: '<id>'`, new tendencies, extra evidence for existing tendencies (`more`), and tensions. Every answer has `nudges`, `note`, `did`; every new tendency has `detail` and a `share` line (or a deliberate decision to leave it out).
2. **Scenes:** `game/scenes-<world>.js` pushes a pack onto `window.TERN_SCENE_PACKS`, one scene per question, covering every step and answer.
3. **World entry** in `content.worlds`: `name`, `chapter`, `closeTo`, `opens`, `ladder`.
4. **Region** in `REGIONS`: bounds, fog label, hint; `walk` and `fogArea` if it sits off the east strip; `soonAt` for the next world's sketch.
5. **Streets** joined to the previous world's at exactly the same end points.
6. **Its own random sequence** for scenery. Never change an earlier world's street control points or seed; filter afterwards instead.
7. **`PLACES`** for every stop, and a **`FOOT`** footprint for every building-type stop, with `stand` outside it.
8. **`LOOKS`** entry: the point to frame and one line of directions from a landmark the player already knows.
9. Add the `<script>` tags to `index.html`.
10. Constants that scenery generation reads (like `shoreX`) must be defined above the generation code, or the page fails to load.
11. Verify: node checks, every stop played in headless Chrome, random walks, earlier worlds' layouts unchanged, the code unchanged.

## Adding a domain

A new domain is new content: its own axes, questions, tendency library, tensions, worlds and share copy, in the same shapes. `portrait.js` doesn't change. The engine's map and places are Ethics-specific today.

---

## History

Until 2026-10 this doc described a planned React + Vite progressive web app with `src/data/questions.js`, `src/data/depthGraph.js`, a scoring engine with a "convergence" check, a two-phase state machine (core set, convergence offer, code reveal, depth graph, distinction reveal, exploration, share), Recharts for the radar chart, html-to-image for the share card, image preloading, and a Gemini/Imagen illustration pipeline. None of it was built. Ken's progression model (`docs/PLAN-progression.md`) replaced the design, and the game was built as static files instead. Don't reintroduce those pieces without Ken's ruling.
