# cursor.md — Tern Agent Instructions

Read at the start of every Cursor session. The detailed rules live in `.cursor/rules/`; this is the short version.

## Read first, every time
1. `AGENTS.md` — Ken's rulings and hard-won lessons. Where any doc disagrees with it, AGENTS.md wins.
2. `docs/NEXT-STEPS.md` — what's done, what's open, what needs Ken.
3. `docs/ARCHITECTURE.md` (how `game/` is built), `docs/SCORING.md` (how answers become the portrait and the code), `docs/DESIGN.md` (§0 is the ratified look).
4. For content work: `docs/QUESTIONS.md` (generated from the game files) and the world's `game/*-proposals.md`.

## What Tern is now
A calm, ink-on-paper game of hard moral choices. You walk a map of five worlds (Park, Neighborhood, City, Coast, Observatory; 75 questions). Each stop is a question card with a code-drawn scene. From the first answer, a portrait of you grows: a plain one-line summary, short "You…" lines, a compass of five value pairs, places where your answers pull against each other, and a chapter per world. The five-letter code comes only from the park's 12 shared questions. Static files, no build step: `python3 -m http.server 8123 --directory game`.

## Core rules
- **Five fixed axes:** O/R, C/I, H/T, L/P, S/D. No archetype names, no type labels, no crowd statistics.
- **Content is the instrument.** All 75 questions are ratified. Change wording, answers or nudges only with Ken's say-so. No escape answers. A separate skeptic judge reviews every content pass before Ken ratifies it. After a content change, run `npm run export:questions`.
- **Calm, ink on paper, no wayfinding.** Black and white only; little motion; scenes change before the words; no arrows to unseen stops; no progress numbers.
- **Never shift an earlier world's layout** (its street control points and random sequence are fixed).
- **Plans on disk** for substantial work (`game/plan-*.md`); tell Ken before delegating, with the done-check.
- **A push to `main` is a release** (storych.art redeploys automatically).
- **"Done" needs proof:** node checks plus a headless Chrome run with no console errors (see ARCHITECTURE → Testing).

## After every session
Append what you learned or what Ken ruled to `AGENTS.md`, and update `docs/NEXT-STEPS.md`.
