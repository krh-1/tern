# Workflow — Tern

How agents and developers work on this repo effectively. Read this before starting any task.

---

## Philosophy

Tern uses the Compound Engineering philosophy:

> Each unit of work should make subsequent units easier — not harder.

This means: plan thoroughly, review carefully, document everything. The AGENTS.md file is how Tern gets smarter over time. Never skip it.

---

## Tool Stack

### Compound Engineering (day-to-day feature work)
The primary development workflow for all feature work on Tern.

**Install:**
```bash
/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

**The four commands:**

| Command | When to use |
|---|---|
| `/workflows:plan` | Before writing any code. Turn a feature idea into a detailed implementation plan. |
| `/workflows:work` | Execute the plan. Use worktrees and task tracking. |
| `/workflows:review` | Before considering any work done. Multi-agent review catches issues. |
| `/workflows:compound` | After every session. Document learnings in AGENTS.md. |

**Rule:** Never start coding without running `/workflows:plan` first. No exceptions.

---

### Ralph (autonomous multi-iteration tasks)
Use Ralph for tasks that require many iterations — particularly content generation tasks like the V2 question pipeline.

**Install:**
```bash
/plugin marketplace add snarktank/ralph
# or manually:
mkdir -p scripts/ralph
# copy ralph.sh from https://github.com/snarktank/ralph
chmod +x scripts/ralph/ralph.sh
```

**Run:**
```bash
./scripts/ralph/ralph.sh --tool claude 10   # up to 10 iterations
```

**When to use Ralph on Tern:**

| Task | Ralph? |
|---|---|
| Generate new question candidates | Yes — write a PRD, let Ralph iterate |
| Validate axis mappings across question set | Yes |
| Generate distinction paragraph variants | Yes |
| Build a new UI component | No — use Compound Engineering |
| Fix a bug | No — too focused for Ralph |
| Generate illustrations batch (V2) | Yes — with appropriate PRD |

**Ralph key files for Tern:**
- `prd.json` — user stories Ralph works through
- `progress.txt` — append-only learnings between Ralph iterations
- `AGENTS.md` — Ralph updates this after each iteration

---

### Useful Slash Commands

| Command | When to use |
|---|---|
| `/simplify` | After any complex implementation — reduce cognitive load for future agents |
| `/batch` | When making the same change across multiple files simultaneously |

---

## Bootstrapping (First-Time Setup)

The repo currently contains documentation only — no source code, no `package.json`, no config files. Before any feature work, scaffold the project:

```bash
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install recharts html-to-image
npm install -D vite-plugin-pwa
```

Then configure:
1. **`vite.config.js`** — add Tailwind and PWA plugins. See `docs/ARCHITECTURE.md` → PWA Configuration for settings.
2. **`src/styles/index.css`** — add `@import "tailwindcss"` and the CSS custom properties from `docs/DESIGN.md` → Section 5 (CSS Variables).
3. **`index.html`** — add Google Fonts links for Cormorant Garamond and Quattrocento Sans.
4. Create the directory structure: `src/data/`, `src/engine/`, `src/components/`, `src/hooks/`, `public/illustrations/`, `public/illustrations/depth/`.

**Implementation order:**
1. Data layer first — `src/data/questions.js` (populate from `docs/QUESTIONS.md`)
2. Engine layer — `src/engine/scoring.js`, `src/engine/branching.js`
3. State layer — `src/hooks/useAssessment.js`
4. UI layer — components, then `App.jsx`
5. Illustrations — source or generate per `docs/DESIGN.md` → Section 6

Do not start UI work before the engine is testable with golden test cases from `docs/SCORING.md`.

---

## Standard Feature Workflow

```
1. Read cursor.md (every session, no exceptions)
2. Read AGENTS.md (check for relevant gotchas)
3. Read relevant doc (ARCHITECTURE, SCORING, QUESTIONS depending on task)
4. /workflows:plan → get plan approved
5. /workflows:work → implement
6. /workflows:review → review
7. /workflows:compound → update AGENTS.md
8. Update relevant docs if anything changed (SCORING.md, QUESTIONS.md, DESIGN.md)
9. Commit with clear message
```

---

## Standard Content Generation Workflow (V2 Question Pipeline)

```
1. Write PRD for the content task (use /prd skill)
2. Convert to prd.json (use /ralph skill)
3. Run Ralph: ./scripts/ralph/ralph.sh --tool claude
4. Review generated content against:
   - Axis mapping validity (does each question move the axes it claims?)
   - Answer balance (no obviously correct answer)
   - Tone consistency (matches Tern voice)
   - Novelty (not redundant with existing questions)
5. Approve or revise
6. Update QUESTIONS.md
7. Commit
```

---

## Commit Message Format

```
type(scope): short description

Types: feat, fix, docs, style, refactor, content
Scope: questions, scoring, ui, engine, docs, pwa

Examples:
  feat(questions): add Q12 nuclear preemption scenario
  fix(scoring): correct proximity axis normalization range
  docs(scoring): update distinction thresholds after Q8 reweight
  content(questions): add Iran nuclear follow-up variants (V2 staging)
  style(ui): adjust answer button hover timing to 180ms
```

---

## What Requires a Doc Update

| Change | Update required |
|---|---|
| Any question wording change | QUESTIONS.md |
| Any axis nudge change | QUESTIONS.md + SCORING.md |
| Any distinction generation logic change | SCORING.md |
| Any convergence threshold change | SCORING.md |
| Any new visual component | DESIGN.md |
| Any color, font, or animation timing change | DESIGN.md |
| Any new file or folder | ARCHITECTURE.md + README.md |
| Any discovered pattern or gotcha | AGENTS.md |

**If you are unsure whether a change needs a doc update, it does.**

---

## Branching Strategy (V1 — Main-Only)

V1 uses a simplified branching model. Feature branches merge directly to main.

| Branch | Purpose |
|---|---|
| `main` | Production. Every push deploys to Vercel. |
| `feat/[name]` | Feature work. Branch from main, merge back to main. |
| `fix/[name]` | Bug fixes. Branch from main. |
| `content/[name]` | New questions, distinction copy, depth nodes. |

V2 may introduce a `dev` integration branch when the team grows or release cadence requires it.

---

## Testing

V1 has no automated test suite. Manual verification checklist before any merge:

- [ ] All questions in the active question set render correctly on mobile (390px)
- [ ] All follow-up triggers fire correctly
- [ ] Progress bar advances correctly and reaches 100%
- [ ] Results screen shows correct code for a known answer set (see golden test cases in SCORING.md)
- [ ] Share card generates and downloads correctly
- [ ] App works offline after first load (PWA)
- [ ] Scenes appear with no loading flash (they're code-drawn; see `docs/DESIGN.md` §0)
- [ ] Animations respect `prefers-reduced-motion`

V2 will introduce automated scoring unit tests. Add them when building the question pipeline.
