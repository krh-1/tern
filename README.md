# Tern 🦋

> *You already know who you are.*

Tern is a values and decision-style assessment framework. Through scenario-based dilemmas with branching follow-up questions and illustrated scenes, it surfaces the instincts and philosophies people already carry — revealing how they actually make decisions, not just how they think they do.

The framework is **domain-agnostic**. Each domain asks a different question of the same person:

- **Ethics** — how do you weigh rules, outcomes, loyalty, and justice? *(Active — V1)*
- **Parenting** — what do you believe about discipline, independence, and how children grow? *(Planned)*
- **Leadership** — how do you distribute authority, handle conflict, and build trust? *(Future)*
- **Relationships** — what do you believe about commitment, conflict, and care? *(Future)*

Each domain produces a **five-letter code** — one letter per philosophical axis — and for users who go deeper, a **distinction report**: a one-line summary, radar chart, axis breakdown, and generated paragraph describing what's most specific and interesting about their particular profile.

---

## What a User Experiences

A user opens Tern and is immediately placed inside a scenario — a full-screen illustrated scene with a question fading in over it. They choose from carefully designed answers, each one genuinely defensible. Some questions branch into follow-ups that shift the context: the person they're protecting becomes someone they love, the wealthy neighborhood becomes a poor one. These shifts are the emotional core of the experience.

After enough signal is gathered, the user receives their **code** — five letters materializing one at a time, each representing where they landed on one of five philosophical axes. The code is shareable, comparable, and immediately discussable: *"You're OCHLS and I'm RCHLS — we agree on everything except the first axis, that's probably why we argue about this."*

Users who continue into the depth graph receive a **distinction report**: a one-line summary, a radar chart showing how strongly they sit on each axis, an axis breakdown, and a generated paragraph describing what's most specific, extreme, or tensioned about their particular profile.

There are no right answers. There is no score. There is only the mirror.

---

## The Five-Letter Code (Ethics Domain)

| Position | Axis | Letter A | Letter B |
|---|---|---|---|
| 1 | Outcomes vs. Rules | **O** — consequentialist | **R** — deontological |
| 2 | Collective vs. Individual | **C** — collective good | **I** — personal interest |
| 3 | Heart vs. Thought | **H** — empathetic | **T** — rational |
| 4 | Loyalty vs. Principle | **L** — allegiance | **P** — justice |
| 5 | System vs. Disruption | **S** — works within structures | **D** — breaks unjust rules |

Example codes: `OCHLS`, `RIHPD`, `OCHPD`. 32 possible combinations.

---

## Quick Start

If you're in the full app repository (with `src/` and `package.json`), run:

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview
```

This current snapshot may be documentation-only for planning/review sessions.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| PWA | vite-plugin-pwa |
| Charts | Recharts |
| Share card | html-to-image |
| Deployment | Vercel |

No backend. No database. No API calls. Fully client-side in V1.

---

## Project Structure

```
tern/
├── public/
│   ├── manifest.json
│   ├── icons/
│   └── illustrations/
│       ├── Q1.jpg, Q2.jpg ...       # Core question illustrations
│       └── depth/
│           └── D1.jpg, D2.jpg ...   # Depth graph illustrations
│
├── src/
│   ├── data/
│   │   ├── questions.js             # Core question set (fixed, universal)
│   │   └── depthGraph.js            # Depth graph nodes (adaptive)
│   ├── engine/
│   │   ├── scoring.js               # Axis scoring, code generation, distinction — domain-agnostic
│   │   └── branching.js             # Core sequencing + depth routing — domain-agnostic
│   ├── components/
│   │   ├── QuestionCard.jsx
│   │   ├── AnswerButton.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── ConvergenceOffer.jsx     # Mid-assessment invitation screen
│   │   ├── CodeReveal.jsx           # Five-letter code reveal — free tier endpoint
│   │   ├── DistinctionReveal.jsx    # Summary + radar + axis breakdown + paragraph — paid tier endpoint
│   │   ├── RadarChart.jsx
│   │   └── ShareCard.jsx
│   ├── hooks/
│   │   └── useAssessment.js         # All assessment state across both phases
│   ├── styles/index.css
│   ├── App.jsx
│   └── main.jsx
│
├── cursor.md                        # Agent instructions — read every session
├── AGENTS.md                        # Discovered patterns and gotchas — append every session
├── README.md                        # This file
│
├── docs/
│   ├── VISION.md                    # What Tern is and where it's going
│   ├── ARCHITECTURE.md              # How the system is structured
│   ├── DESIGN.md                    # Visual and interaction system
│   ├── SCORING.md                   # Five axes, code logic, distinction generation
│   ├── QUESTIONS.md                 # Core question set + depth graph documentation
│   └── WORKFLOW.md                  # Tools and development process
```

---

## Documentation Reading Order

**If you are an AI agent or developer:**
1. `cursor.md` — instructions and non-negotiables
2. `docs/ARCHITECTURE.md` — system structure and two-phase model
3. `docs/SCORING.md` — five axes, code generation, distinction logic
4. `docs/QUESTIONS.md` — core question set and depth graph
5. `docs/DESIGN.md` — visual system and all screen states
6. `docs/WORKFLOW.md` — how to work on this repo (including bootstrapping)
7. `AGENTS.md` — patterns and gotchas from prior sessions

**If you are a product person, designer, or stakeholder:**
1. `docs/VISION.md` — what Tern is, the code model, game-feel principle, freemium structure
2. `docs/DESIGN.md` — the visual and product experience
3. `docs/QUESTIONS.md` — the question library
4. `docs/SCORING.md` — how the axes and code work

---

## Deployment

Push to `main` triggers a Vercel production deploy. Feature branches should be based off `dev`. See `docs/WORKFLOW.md` for the full branching strategy.
