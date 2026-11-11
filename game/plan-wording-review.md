# Plan: wording and follow-up review of the four later worlds

*Started 2026-10-07. Ken's ask: "do another pass at the questions for the new worlds… worded in strange ways… not always easy to understand or feel neutral… some questions can have more follow-up questions for deeper thinking."*

**Scope:** the 63 questions in the Neighborhood (14), City (19), Coast (12) and Observatory (18). The park's 12 are out of scope.

**Nothing in `game/content-*.js` changes in this pass.** Question, answer and setup wording is instrument text; the output is proposals for Ken to rule on.

## Steps
1. Extract the instrument text (setups, questions, answers, which answer leads to which follow-up) into one file all reviewers read.
2. Four independent reviewers (subagents, same model as this session), each covering all 63 questions through one lens:
   - **Clarity:** can a first-time reader follow it in one pass?
   - **Neutrality:** does any wording lean toward one answer or tell you what to feel?
   - **Depth:** where would a follow-up make the player think harder, on both sides?
   - **Cold read:** how do several ordinary players react on first sight?
3. Merge: one recommended wording per question, reconciling disagreements, plus a ranked list of new follow-ups.
4. Skeptic judge (a fifth, separate subagent) checks the merged proposals against the house rules (no escape answers, must be hard, no leaks, plain words) before Ken sees them.
5. Deliver an HTML review document for Ken: summary first, then per world, current text beside proposed text.
6. Apply only what Ken approves, then `npm run export:questions`, AGENTS.md entry, NEXT-STEPS update.

## Done-check
Every one of the 63 ids appears in the merged proposals with a verdict (keep / reword / rethink). Every proposed follow-up names which answer it follows, has two answers, and passed the judge.

## Status (2026-10-07)
Steps 1 to 5 done. Four reviews and the judge's verdicts were written in the session scratchpad. The final merged proposals are in `game/wording-review-proposals.md`, and Ken has the HTML review page. **Waiting on Ken's rulings (12 decisions) before step 6.** Nothing in `game/content-*.js` has changed.

## Status (2026-10-07, later)
Ken: "i approve all of your recommendations". Applied: the ratified wording (425 lines, checked against the game text by script), titles, four scoring rulings, id renames, and the 19 tier-1 follow-ups with notes, `did` lines, tendency wiring and scene changes (one agent per world). Verified: `npm run export:questions` reports 0 data problems, and a headless-Chrome run plays every answer path in all four worlds, checking the shown text against the content with no console errors (`playall.mjs` in the session scratchpad). Not done: the 22 tier-2 follow-ups, and the park's light pass, which goes to Ken as a proposal.
