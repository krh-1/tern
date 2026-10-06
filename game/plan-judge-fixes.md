# Plan: apply the skeptic judges' fixes (my recommendation, approved by Ken 2026-10-04)

Source verdicts: `docs/question-bank-wip/judge-city.md`, `judge-coast.md`, `judge-observatory.md` (49 questions: KEEP 7 / SHARPEN 42 / CUT 0).

## Rule: what gets applied now
**Group 1 (apply everything in it):** anything in a judge file that fixes something wrong *today*:
- **False portrait lines:** an answer feeding a tendency (or its `against`) that it doesn't genuinely show. If removing evidence leaves a tendency unable to trigger (needs 2+ supporting answers from 2+ questions), leave the tendency in place but unreachable for now rather than borrowing weak evidence, and say so.
- **Scoring corrections:** wrong axis or sign, e.g. Thought used for "froze / did nothing", D12 scoring Outcomes for "rewarding results", D11's System weights.
- **Giveaway wording:** D9 "does more good overall", B12 "Only luck differs", and any similar case in the judge files.
- **Impossible or self-contradicting setups and answers:** D11-B (an omission that is really a lie), Q8 fuB, Q11 fuA, B04's follow-up (the truth must actually help), B35's unclear "true, damaging information".
- **Copy that claims what the player didn't choose:** B08 fuB note/did, and any similar case.
- **Near-unanimous (~80%+) questions and follow-ups, and follow-ups that repeat the same choice or measure nothing:** B41 trunk (pay review moves into the trunk; coworker becomes the raise rival in fuA), D4 (a real cost such as the $1,200 ticket), B25's follow-ups, B26 (state that no one can tell; rescore; follow-ups below), B32's "fight if invaded", B22's follow-up, D9's follow-ups that duplicate D2, B23's trunk costs stated up front, the quick-read options B51 and B52.
- Each judge's "Top priorities" list is in Group 1.

**Group 2 (only these six now):** new follow-ups that add pressure to an untested side: **Observatory B06, B26, B27, B47** (B47 also gains the line that the people who rely on you would be looked after); **City B41 and B04** (B04's job-threat follow-up for people who told the truth). Use each judge's proposed wording.

**Not now:** every other "add the missing side" follow-up in the judge files. They wait for a later round with its own judge pass.

## Rules for applying
- Use the judge's exact proposed wording unless it breaks a rule in AGENTS.md (then fix minimally and say why).
- Keys follow the trunk answer (`fuA`/`fuB`/`fuC`); renamed or replaced steps get new answer ids; update every reference (tendencies, `more`, tensions, `next()`) in all content files.
- Every changed or new answer has nudges, note, `did`, and tendency wiring a stranger would agree with.
- Scenes: any changed situation (trunk, follow-up, answer meaning) or new/renamed id gets its scene updated (base/shift/acts). The scene changes before the words.
- In each world's proposals file, add a section "Skeptic judge fixes applied (2026-10-04)" listing what changed; mark anything deferred.

## Delegation
Three Opus subagents in parallel, one per world; each edits only `content-<world>.js`, `scenes-<world>.js` and `<world>-proposals.md`. Done-check per agent: node verification across all five content files (load, reachability, ids, references, 2,000 random runs, code unchanged by non-park answers, no em dashes); every answer path of every changed question played in hidden Chrome at phone width with no console errors.

## Status
- 2026-10-04: plan written; agents launched.
- 2026-10-04: all three worlds' fixes applied by subagents. Verified: node check across 75 questions / 365 answers (no duplicate ids, missing copy or broken references; 1,000 random runs, no errors; code unchanged by non-park answers); every one of the 75 stops played to the end in hidden Chrome with no console errors; D4's answer animation shortened (5.2 s to 4.2 s).
