# Next steps

*Updated 2026-10-05. Keep this file current: update it at the end of every session.*

## Where things stand

**The game is built and live.** All five worlds are playable in `game/` and on storych.art (every push to `main` redeploys it):

| World | Questions | Opens when | Content status |
|---|---|---|---|
| Park | 12 | from the start | ratified; judged (three passes, 2026-09) |
| Neighborhood | 14 | all 12 park stops answered | ratified; **never skeptic-judged** |
| City | 19 | 10 Neighborhood answers | ratified; judged and fixed 2026-10-04 |
| Coast | 12 | 13 City answers | ratified; judged and fixed 2026-10-04 |
| Observatory | 18 | 8 Coast answers | ratified; judged and fixed 2026-10-04 |

**Verified on 2026-10-04/05:**
- 75 questions and 365 answers, with no missing copy and no broken references.
- Every stop plays to the end with no console errors.
- 168 random walks never entered a building.
- The five-letter code never changes after the park.
- On a phone-sized screen at 4× CPU slowdown, every world holds 60 frames per second, with the main thread about 25–29% busy.

**The docs match the build.** `docs/QUESTIONS.md` is generated from the game files (`npm run export:questions`). VISION, ARCHITECTURE, DESIGN, SCORING, WORKFLOW, README, `cursor.md` and `.cursor/rules/` were rewritten on 2026-10-05. Old material is marked as history.

## Recommended order (my recommendation)

1. **Play it yourself on a real phone, about 30 minutes, from a fresh start.** Everything so far is verified by scripts and screenshots, but only you can judge the feel. That covers pacing, whether the look-over makes each new world easy to find, whether follow-ups stall, and whether the portrait reads like you. Note anything that feels off; small fixes are cheap now.
2. **Run a skeptic judge pass on the Neighborhood.** It's the only world that went live without one, and the same pass found problems in 42 of 49 questions in the other three worlds. This is low effort and high value.
3. **The deferred follow-ups round.** About 25 "missing side" follow-ups across the City, Coast and Observatory (listed in each `game/*-proposals.md`). A judge reviews them *before* they reach you. This also brings back two portrait lines that can't appear yet ("You don't dismiss a machine that seems to feel", "You'd rather remember painful things"), because each needs a second question.
4. **Pick the next feature.** My recommendation is **compare with a friend**: after two people finish the park, show their summaries and codes side by side, and the questions where they split. `docs/PLAN-progression.md` calls this the strongest growth loop, and the code exists for exactly this.

## Decisions that need you

| # | Decision | My recommendation |
|---|---|---|
| 1 | The 2026-03 rule that every question needs an "assumptions" block. In the game, each question's short setup line does that job. | Confirm the setup line replaces it, and mark the rule amended. |
| 2 | `career-first` ("You protect your job first") has no share line, so it can never be sent. AGENTS.md lists only three deliberately share-less lines. | Leave it out on purpose (it reads badly out of context), and add it to that list. |
| 3 | The judges suggest moving D12 (the work bonus) out of the Coast, and question whether six everyday-ethics questions belong in the Observatory (B11, B16, B17, B38, B54, B57). | Leave both as they are until after your phone play-through; the fit matters less than the feel. |
| 4 | Q7 "The White Lie" from the old core set isn't in any world. | Keep it in the bank as a candidate for later. |
| 5 | The share lines, written by an agent for the share feature, haven't been ratified. | Read them in the share sheet during your play-through. |
| 6 | Which Phase 4 feature comes first: compare with a friend, share a single question, magic-link save across devices, or clarifying stops when two answers conflict. | Compare with a friend first (see above). |

## Open items for later
- **Content:** the Observatory proposals still not applied (`game/observatory-proposals.md`), the bank's "keep apart" pairs (they can't be enforced on a free-roam map), and whether the three quick reads should be spaced further apart.
- **Engine:** `game/index.html` is about 4,500 lines. When the next big feature lands, consider splitting the map, panel and card into separate files (no build step needed).
- **Monetization:** the old paid tier (the distinction) no longer exists. The free/paid line needs redrawing before any launch push (V2 in `docs/VISION.md`).
- **History, not to build on:** `prototypes/`, `scripts/illustrations/` (the paused Gemini pipeline), `docs/SIMULATIONS.md`, `docs/BUILD-READINESS.md`, `docs/question-bank-wip/`.
