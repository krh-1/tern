# Tern

> *You already know who you are.*

Tern is a calm walking game about hard choices. You walk a hand-drawn, black-and-white map as a small puffy character. Every stop on the map is a dilemma with no easy way out. From your first answer, a portrait of how you decide starts writing itself beside the map, in plain sentences like "You keep your word."

- **Five worlds** on one map: the Park (the same 12 questions for everyone), the Neighborhood, the City, the Coast and the Observatory. 75 questions in all.
- **Unlocks are information, not points.** More answers reveal more: your summary, what you protect, where you're torn, and after the park's 12, your five-letter code.
- **The code** (for example `OCHLS`) is one letter per value pair: Outcomes or Rules, Collective or Individual, Heart or Thought, Loyalty or Principle, System or Disruption. It comes only from the park's 12, so friends can compare.
- **Private by design.** Answers are saved only in your browser. No account, no tracking.

There are no right answers. There is no score. There is only the mirror.

---

## Run it

The game is static files with no build step.

```bash
python3 -m http.server 8123 --directory game
```

Then open http://localhost:8123. (Testing in parallel? `127.0.0.1:8123` keeps a separate save from `localhost:8123`.)

---

## Where things live

```
game/                      # the game
  index.html               # the engine: map, player, question card, portrait panel, unlocks, share, save
  content.js               # the instrument for the Park, plus axes, tendencies, tensions, worlds, share copy
  content-<world>.js       # the instrument for each later world
  portrait.js              # scoring and portrait logic (also runs in node)
  scenes.js, scenes-<world>.js   # code-drawn scenes, one pack per world
  plan*.md                 # build plans, one per world
  <world>-proposals.md     # open content questions per world
docs/                      # product, design and content specs (below)
docs/question-bank-wip/    # judge verdicts behind each content pass
prototypes/                # the original park prototype (history)
AGENTS.md                  # every ruling and lesson so far; read first, append last
cursor.md, .cursor/rules/  # agent instructions for Cursor
```

`scripts/illustrations/` and `docs/ILLUSTRATION-GENERATION.md` belong to an image-generation pipeline that is on hold: every scene is drawn in code.

---

## Docs

| Doc | What it covers |
|---|---|
| `AGENTS.md` | Ken's rulings and lessons from every session. Wins over any other doc. |
| `docs/NEXT-STEPS.md` | **Start here:** where things stand, the recommended next steps, decisions waiting on Ken |
| `docs/VISION.md` | What Tern is, the five worlds, the portrait, the code, sharing, the roadmap |
| `docs/DESIGN.md` | The ink-on-paper look (§0, ratified), screens, timings, copy rules, phone feel |
| `docs/ARCHITECTURE.md` | Files, data shapes, the portrait computation, the map engine, save format, testing, how to add a world |
| `docs/QUESTIONS.md` | The question set |
| `docs/SCORING.md` | The five value pairs and how answers score |
| `docs/QUESTION-BANK.md` | The question library and its history |
| `docs/SIMULATIONS.md` | Worked example runs |
| `docs/PLAN-progression.md` | The approved plan for the map, portrait and unlocks |
| `docs/WORKFLOW.md` | How work flows: plans, content passes, judges, verification |

**Reading order for an agent or developer:** `AGENTS.md`, then `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/WORKFLOW.md`, and `docs/QUESTIONS.md` / `docs/SCORING.md` before touching content.

**For a product person or designer:** `docs/VISION.md`, then `docs/DESIGN.md`, then play the game.

---

## Deploying

Every push to `main` redeploys storych.art (the `/tern` page of hamada-world) through `.github/workflows/deploy-storychart.yml`, which calls Vercel's redeploy API; its secrets live in the GitHub repo settings. The game is plain static files, so any static host could serve the `game/` folder.
