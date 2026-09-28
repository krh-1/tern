# Plan — Tern V1, first playable (the Park)

Goal (Ken, 2026-09-27): the first playable game, built from `docs/PLAN-progression.md` (approved) and the park prototype.

## What "playable" means here
Pick a character → walk the park → 12 stops (the approved core 12) → question card with a code-drawn scene per question → after each answer the portrait panel grows (answer note, compass bars, headline at 4, protect/trade at 6, tension at 8, all bars at 10, code reveal at 12) → the Neighborhood appears fogged and opens after 12 (V1: shown as "coming soon" — its questions are not built). Autosave on device. Reload resumes.

## Layout
- `game/index.html` — engine: park, player, card, portrait panel, unlocks, save. Forked from `prototypes/trolley-walk.html`, dead character code stripped.
- `game/content.js` — `window.TERN_CONTENT`: axes, the 12 questions (wording, follow-ups, nudges, answer notes), tendency library, protect/trade items, tensions, descriptions. Instrument data, not UI copy.
- `game/scenes.js` — `window.TERN_SCENES(h)`: code-drawn scenes for the 10 new questions (trolley + promotion stay inline from the prototype).

## Contracts
- Step keys: `trunk`, then `fu` (one follow-up) or `fuA` / `fuB` (several), in doc order. Scene variant = step key.
- Answer ids: `<QID>-A`, `<QID>-FU-A`, `<QID>-FUA-A` …
- Scenes own their answer actions: `scene.acts[answerId]` → targets passed to `sto`, or `scene.act(answer)`.

## Decisions I made (Ken asked me to decide outstanding ones)
1. **Partial-answer scoring:** axis score = sum of weighted nudges; shown as a bar from the midpoint; letter/bar only appears once the axis has ≥2 contributing answers. Confidence = answered weight / possible weight for that axis. No global normalization table needed for V1.
2. **Headline:** the strongest-supported tendency (most supporting answers, ties by authored priority). Description = next two tendencies joined in one sentence. "So far" until 12.
3. **Unlock ladder** exactly as PLAN §5; if no tension exists at 8, it waits and appears when one does.
4. **◆ calling:** the unanswered stop that most probes the axis with lowest confidence. Glow on the stop only.
5. **Answers can be redone** (Ken, 2026-09-27): tapping a done stop shows your answer and its note, with "Answer again". Changing character never touches answers.
6. **Neighborhood:** fogged region at the park edge; after 12 it clears with a sign "The Neighborhood — opening soon". Its questions are Phase 4.
7. **Share:** "Copy my portrait" button copies headline + tendencies (+ code after 12) as text. Share cards/images later.
8. **Save:** localStorage, wrapped in try/catch; "Start over" in the panel.
9. **Build:** plain static files, no build step; open `game/index.html`.

## Delegation
- content.js → Opus subagent (judgment-heavy instrument work).
- scenes.js → Opus subagent (drawing taste).
- Engine, panel, unlocks, integration, testing → me.

## Done-check
Play all 12 in the browser pane; each unlock fires once at the right count; code reveal letter by letter; reload keeps state; no console errors; phone and desktop layouts.

## Status (2026-09-27)
Built and verified: a fresh run of all 12 with random answers, each unlock firing once in order (notes → compass → headline → protect → tension → all bars → code), the letter-by-letter code reveal, and save/resume. No console errors. Desktop and phone layouts checked.
Not done yet: the unused prototype character styles are still in index.html (harmless). Sharing copies text only. The Neighborhood is shown but can't be entered. The bank nudges need Ken's ratification.
