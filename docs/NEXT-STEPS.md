# Next steps

*Updated 2026-11-09. Keep this file current: update it at the end of every session.*

## Where things stand

**The game is built and live.** All five worlds are playable in `game/` and on storych.art (every push to `main` rebuilds it):

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

**New since 2026-10-06: the aura.** A soft glow behind your character, blended from your five compass letters; the game's one colour (DESIGN §0.8, `game/aura.js`). Built and tested in the game (map, character select, share card, live unlock); **not yet committed or played by you on a phone.**

**New on 2026-10-07: moving between worlds.** When a world opens, the report screen now waits for Continue, and the look-over ends on **Go to <world>** or **Stay**. Go puts your character just inside the new world's entrance (plan: `game/plan-world-transition.md`). Tested by a headless play-through of all four world openings (desktop, phone at 4× CPU slowdown, reduced motion): 47 checks pass, no console errors. **Not yet committed or played by you on a phone.**

**New on 2026-11-09: a full review** (`game/plan-review-2026-11.md`). A scripted play-through of the park on phone and desktop, plus 3,000 simulated players run through the real scoring. Four bugs fixed and checked in the page: numbers in the serif font read wrong ("the ı person", "$2oo"); about 1 in 6 players never got the summary's arrival screen; the summary swapped on tie-breaks (now about half as many changes); the portrait showed two lines twice. **Not yet committed.**

**The docs match the build.** `docs/QUESTIONS.md` is generated from the game files (`npm run export:questions`). VISION, ARCHITECTURE, DESIGN, SCORING, WORKFLOW, README, `cursor.md` and `.cursor/rules/` were rewritten on 2026-10-05. Old material is marked as history.

## Recommended order (my recommendation)

1. **Play it yourself on a real phone, about 30 minutes, from a fresh start.** (Still first. The 2026-11-09 review was scripted; it can't judge feel.) Everything so far is verified by scripts and screenshots, but only you can judge the feel. That covers pacing, whether the report, look-over and "Go to" flow into each new world well, whether follow-ups stall, and whether the portrait reads like you. Note anything that feels off; small fixes are cheap now.
2. **Wording pass: done and applied (2026-10-07).** All 63 later-world questions were reworded to your four card-writing rules, and 19 new follow-ups were added (Neighborhood 7, City 7, Coast 2, Observatory 3). **The park's 12 got the same pass on 2026-11-10** (`game/park-proposals.md`, applied on your yes): every card rewritten to the card rules, scoring rebalanced (honesty first, balance as a check), and the Trolley's refusers now get a 100-strangers follow-up in place of the mother one. With estimated real answer rates, the share of players who get an H drops from 93% to 70%. **Not yet committed or played by you.** The other 22 follow-ups (`game/wording-review-proposals.md`, tier 2) wait until you've played a world.
3. **The deferred follow-ups round.** Now folded into the wording review above: it takes up most of the "missing side" follow-ups from the `game/*-proposals.md` files, with the judge's fixes. Still open: two portrait lines that can't appear yet ("You don't dismiss a machine that seems to feel", "You'd rather remember painful things"), because each needs a second supporting question, and the review doesn't add one.
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
| 7 | ~~The code leans toward some letters.~~ **Ruled and applied 2026-11-10** (`game/park-proposals.md`): H drops from 93% to 70% of an estimated real crowd. Honesty first, balance as a check, is now a standing scoring rule (SCORING §13). | Done. |
| 8 | ~~An exact tie on a pair always gives the first letter.~~ **Ruled and built 2026-11-10:** a tie goes to the side of your most recent answer on that pair (SCORING §4). About 3–4% of an estimated real crowd tie on O/R, C/I or H/T. | Done. |
| 9 | ~~The button "Read more about you" sat right above a different section titled "More about you".~~ **Ruled and done 2026-11-10:** the section is now "Also true of you". | Done. |
| 10 | No signal from real players (the privacy note promises no analytics), and saves live on one device. | Keep both as they are until launch. Then consider privacy-preserving counts (no answers, no ids), and a copy-and-paste "save code" before any account system. |

## Open items for later
- **Content:** the Observatory proposals still not applied (`game/observatory-proposals.md`), the bank's "keep apart" pairs (they can't be enforced on a free-roam map), and whether the three quick reads should be spaced further apart.
- **Engine:** `game/index.html` is about 4,500 lines. When the next big feature lands, consider splitting the map, panel and card into separate files (no build step needed).
- **Monetization:** the old paid tier (the distinction) no longer exists. The free/paid line needs redrawing before any launch push (V2 in `docs/VISION.md`).
- **History, not to build on:** `prototypes/` (`fingerprint.html` records the fingerprint directions considered before the aura), `scripts/illustrations/` (the paused Gemini pipeline), `docs/SIMULATIONS.md`, `docs/BUILD-READINESS.md`, `docs/question-bank-wip/`.
