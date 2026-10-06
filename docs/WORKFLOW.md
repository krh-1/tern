# Workflow: Tern

How agents and developers work on this repo. Read this before starting any task.

---

## Philosophy

Tern uses the Compound Engineering philosophy:

> Each unit of work should make subsequent units easier, not harder.

Plan on disk, review carefully, and record every ruling and lesson. `AGENTS.md` is how Tern gets smarter over time. Never skip it.

**Ken operates; agents execute.** Ken dictates, reviews and rules. Agents draft and build. Specs, expected answers and judgment calls are Ken's: propose, then get his explicit yes. Never run through a decision point unattended.

---

## Before any task

1. Read `AGENTS.md` (every entry is a ruling or a lesson; later entries supersede earlier ones where marked).
2. Read the doc for the task: `docs/ARCHITECTURE.md` (code), `docs/DESIGN.md` (anything visual or interactive; §0 is ratified), `docs/QUESTIONS.md` and `docs/SCORING.md` (content).
3. Check the relevant `game/plan*.md` and `game/<world>-proposals.md`.

---

## Plans live on disk

Substantial work gets a plan file in `game/` before it starts, so a lost context window can't erase it: `game/plan.md` (the park), `game/plan-<world>.md` (one per world), `game/plan-judge-fixes.md`. Each plan holds:
- the goal, in Ken's words, with the date;
- Ken's rulings for this piece of work;
- what's delegated, to whom, and the done-check;
- the done-check for the whole piece;
- a **Status** list, appended as work lands.

**Delegation is never silent.** Tell Ken before or as you hand work to a subagent: what, to which model, and the done-check. Content and scenes usually go to separate subagents; the engine, integration and testing stay with the lead agent.

---

## How content changes flow

Questions, answers, follow-ups, nudges, notes, `did` lines, tendencies and tensions are the **instrument**: they decide what Tern measures. They change only this way:

```
author → skeptic judge → Ken ratifies → apply → scenes → verify → record
```

1. **Author.** A subagent drafts into `game/content-<world>.js` (or proposes changes to an existing world). Every answer gets `nudges`, `note` and `did`; every new tendency gets `detail` and a `share` line, or a deliberate decision to leave it out.
2. **Skeptic judge, before Ken sees it.** A separate judge agent reviews against the bar in `docs/QUESTIONS.md`: no escape answers, a thoughtful person must hesitate, follow-ups pressure both sides, answers feed only tendencies they genuinely show, no giveaway wording, no impossible setups, copy claims only what the player chose. The author's own pass has always been too lenient. Verdicts go in `docs/question-bank-wip/judge-<world>.md`.
3. **Ken ratifies.** Open questions go in `game/<world>-proposals.md`, each with a recommendation. "Approved" ratifies what exists. Applying a proposals file needs an explicit "implement", and then means exactly what the file recommends now, not what it defers.
4. **Apply.** Edit only the content file(s) in scope. A replaced follow-up keeps its key; its answers get new ids with a "2" (`Q11-FUA2-A`). Update every reference (tendencies, `more`, tensions, `next()`).
5. **Scenes.** Any changed situation, follow-up or answer meaning gets its scene updated in `game/scenes-<world>.js`. The scene changes before the words.
6. **Verify** (below).
7. **Record.** Add a section to the proposals file listing what changed and what's deferred, update the plan's Status, and append to `AGENTS.md`.

**Never in a copy sweep:** question, answer and setup wording. Propose those to Ken.

---

## Verify before calling anything done

"Done" needs proof: the check output or the thing itself, not a claim.

**Content (node):** load all five content files and `game/portrait.js`; every step reachable; every answer has `nudges`/`note`/`did`; ids unique; every referenced id exists; thousands of random runs through `compute()` with no errors; the code unchanged by non-park answers; no em dashes.

**Game (headless Chrome over the DevTools protocol):** play every changed stop to the end at phone width with no console errors; random walks never enter a building or leave the map; earlier worlds' layouts unchanged; phone feel with touch and 4× CPU slowdown. Disable the cache, or a reused profile can test stale scripts. Use `127.0.0.1:8123` for a save separate from `localhost:8123`.

Details and the `window.__tern` dev hooks: `docs/ARCHITECTURE.md` → Testing.

---

## Tool Stack

### Compound Engineering (day-to-day feature work)

**Install:**
```bash
/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

| Command | When to use |
|---|---|
| `/workflows:plan` | Before writing code. Turn a feature idea into a plan (saved on disk, see above). |
| `/workflows:work` | Execute the plan. |
| `/workflows:review` | Before considering work done. |
| `/workflows:compound` | After every session. Record learnings in `AGENTS.md`. |

### Ralph (autonomous multi-iteration tasks)
For long content tasks such as the future question pipeline. Not installed in this repo yet (`scripts/ralph/` doesn't exist); see https://github.com/snarktank/ralph.

```bash
./scripts/ralph/ralph.sh --tool claude 10   # up to 10 iterations
```

| Task | Ralph? |
|---|---|
| Generate new question candidates | Yes: write a PRD, let Ralph iterate, then the judge and Ken |
| Check axis mappings across the question set | Yes |
| Draft tendency or note variants | Yes, then the judge and Ken |
| Engine or map work | No: plan and build directly |
| Fix a bug | No |

### Useful slash commands

| Command | When to use |
|---|---|
| `/simplify` | After a complex implementation |
| `/batch` | The same change across many files |

---

## What requires a doc update

| Change | Update |
|---|---|
| Question wording, follow-up or nudge | `docs/QUESTIONS.md` (and `docs/SCORING.md` for nudges) |
| Portrait rules, ladders, world opening | `docs/SCORING.md`, `docs/ARCHITECTURE.md` |
| A new screen, marker, timing or visual element | `docs/DESIGN.md` |
| A new file, data field or engine mechanism | `docs/ARCHITECTURE.md` (and `README.md` for new files) |
| A new world | `docs/VISION.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/QUESTIONS.md` |
| Any ruling by Ken, pattern or gotcha | `AGENTS.md` |

**If you are unsure whether a change needs a doc update, it does.**

---

## Commit message format

```
type(scope): short description

Types: feat, fix, docs, style, refactor, content
Scope: questions, scoring, ui, engine, map, scenes, docs

Examples:
  content(city): add D11 follow-ups on both sides
  feat(map): add the Observatory region
  fix(engine): route taps around Coast buildings
  docs(design): describe the look-over
```

Ken commits. Agents commit only when asked.

---

## Branching

| Branch | Purpose |
|---|---|
| `main` | The current game. |
| `feat/[name]` | Feature work. Branch from main, merge back to main. |
| `fix/[name]` | Bug fixes. |
| `content/[name]` | New questions, notes, tendencies. |

Every push to `main` redeploys storych.art through `.github/workflows/deploy-storychart.yml` (Vercel redeploy API), so a push is a release. The game is static files.

---

## History

Until 2026-10 this doc described bootstrapping a React + Vite app, populating `src/data/questions.js`, generating illustrations, and a manual checklist built around a progress bar and a share card made with html-to-image. None of that was built: the game is static files in `game/` (`docs/ARCHITECTURE.md`).
