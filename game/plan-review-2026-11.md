# Game review and improvement plan (2026-11-09)

Ken asked for a deep review of the game, a plan to improve it for players, and action on it. This file is the plan; it survives context loss. Status of each item is kept current below.

## How the review was done

- **Played it.** A headless Chrome (a browser with no window, driven by script) played every park stop from a fresh start, on a phone-sized screen (390×844) and on desktop (1280×800), clicking the real buttons, then went through the code reveal, the look-over and "Go to the Neighborhood". Screenshots at every step.
- **Simulated 3,000 players.** A node script fed random answers through the real scoring code (`game/portrait.js`) for all 75 questions, to see how the portrait behaves across many people, not just one run.
- **Read the code** for the card, the portrait panel, the unlock flow and saving.

## What works well

- The core loop holds up: walk, a scene, a hard choice, a follow-up that changes the situation, and the portrait grows. No console errors in any run.
- Pacing between a trunk answer and its follow-up sits at 3.5–4 s, as intended.
- The code reveal, the look-over and "Go to the Neighborhood" all work end to end, on phone and desktop.
- Sharing is careful: the sender sees the picture and message first and picks the lines.
- Payload is small for what it is: about 270 KB compressed for all five worlds.

## Problems found

### Fix now (bugs; no ruling needed)

1. **Numbers read wrong in every question.** The serif font (Cormorant Garamond) draws old-style figures by default: "1" looks like a small "ı", so "the 1 person on the side track" reads "the ı person", "$200" reads "$2oo", "100 strangers" reads "ıoo". It hits the trolley, the $800 pond, the $200 loan and many more. Fix: lining figures (numbers the height of capitals) everywhere the serif is used.
2. **About 1 in 6 players never get the summary moment.** The one-line summary is meant to arrive with its own screen at 4 answers. If no portrait line has two supporting answers yet (17.5% of simulated players), the step is marked done anyway, so when the summary appears at answer 5 to 8 it shows up silently. Fix: the summary step waits until a summary exists, the same way "Where you're torn" already waits for a tension.
3. **The summary flips for no reason.** Across a full run the headline changes about 6 times; 42% of those changes happen while the old line is still tied for strongest, so it swaps on a tie-break, not because the player changed. Each swap announces "Your summary changed." Fix: keep the current summary while it is still tied for strongest; change only when another line overtakes it.
4. **The portrait repeats itself.** Under the summary, the two description sentences are then repeated word for word as the first two chips under "More about you". Fix: the chips show only lines not already shown above.

### Needs Ken's ruling (instrument text, design rules or product calls)

5. **The code leans toward some letters.** With random answers, the park's 12 give **H (Heart) 81% of the time vs T (Thought) 19%**, O over R 73/27, S over D 70/30. The park's weighted nudges available toward Heart total 47.5 vs 20.5 toward Thought. Random answering isn't how people play, but it shows the scoring is built lopsided: a thinker has to work much harder to earn a T. Since the code is what friends compare, this matters most. Recommendation: rebalance park nudges so each pair offers roughly equal weight both ways, then rerun this simulation. Instrument change, so Ken rules.
6. **Ties in the code.** When a pair's score is exactly 0 (2–4% of players per pair), the letter silently defaults to the first side (O, C, H, L, S). About a quarter of players sit near the middle on any given pair. Recommendation: break an exact tie by the player's most recent answer on that pair rather than always the same side.
7. **Park wording pass** (already next in NEXT-STEPS). Confirmed in play: the park still breaks the card-writing rules the later worlds now follow. Several follow-ups are statements with no question (Q6 "You learn that last year, this colleague quietly took credit for your work.", B29, B21), and Q1's two answers are unequal ("Pull the lever" vs "Do not pull. I won't directly cause a death."). Recommendation: run the planned light pass as a proposal.
8. **Label clash.** The button "Read more about you" sits right above a section titled "More about you", which is a different thing. Recommendation: rename the chip section "Also true of you".
9. **No way to learn from real players.** The privacy promise ("no tracking, no analytics") means there is no signal on where people stop, which stops they skip, or how long a session lasts. Recommendation: keep it until launch, then decide whether to add privacy-preserving counts (no answers, no ids) and say so in the privacy note. Ken's call.
10. **One device only.** A full game is 75 questions over several sessions, saved only in one browser. Losing a phone or clearing site data erases it. Recommendation: before any server work, a "save code" (a short text you copy and paste on another device) would cover most of the need with no account.
11. **Two portrait lines can never appear** ("You don't dismiss a machine that seems to feel", "You'd rather remember painful things"): confirmed in 3,000 runs. Already in NEXT-STEPS.

### Bigger improvements for players (recommended order)

1. Fixes 1 to 4 (this session).
2. Ken plays from a fresh start on a phone (still item 1 in NEXT-STEPS; nothing replaces it).
3. Rulings on 5 to 8, then the park wording and nudge pass as one proposal, with a judge.
4. Compare with a friend (the recommended next feature): two codes side by side and the questions where you split.
5. Save code across devices (item 10).

## Status

- [x] Review and simulation
- [x] Fix 1: lining numbers (`body { font-variant-numeric: lining-nums }` in `game/index.html`)
- [x] Fix 2: summary waits until it exists (`afterAnswer`: "headline" is marked seen only once `P.headline` exists)
- [x] Fix 3: summary holds on ties (`opts.keep` in `portrait.js` `compute`; `portraitNow` passes `state.headline`). Simulated: summary changes per player drop from 1.97 to 1.03 in the park and from 6.25 to 3.64 across all worlds; codes unchanged in 3,000 runs.
- [x] Fix 4: no repeated lines (chips show lines 4 to 8; "Read more about you" covers lines 1 to 8)
- [x] Verified in headless Chrome: a phone run where the summary first exists at answer 5 now gets its arrival screen at 5; numbers render as lining figures; a desktop run through all 12 and "Go to the Neighborhood" shows no repeated lines and no console errors
- [x] NEXT-STEPS, SCORING and AGENTS.md updated
- [x] The simulation is saved as `npm run simulate` (`scripts/simulate-players.cjs`) for rerunning after any nudge or line change
- [x] Items 5 and 7 drafted as one proposal, skeptic-judged and simulated: `game/park-proposals.md` (overlay `scripts/park-proposal-overlay.cjs`, crowd test `scripts/park-crowd-sim.cjs`)
- [x] Park proposal applied on Ken's yes (2026-11-10), with the D8 setup: `content.js`, the Trolley's new 100-strangers scene and save migration in `index.html`, `docs/QUESTIONS.md` regenerated; crowd test (`npm run simulate:crowd`) matches the proposal; Q1's three paths played in headless Chrome
- [x] Item 6 built on Ken's yes (2026-11-10): an exact tie goes to the most recent answer's side (`portrait.js` `scoreAxes`; the detail view and aura follow the letter). Checked against an independent calculation over 3,000 random park runs, plus the code reveal in headless Chrome
- [x] Item 8 done on Ken's yes (2026-11-10): the chip section is now "Also true of you"
- [ ] Not done: Ken's ruling on items 9 and 10 (analytics, cross-device saves); nothing committed
