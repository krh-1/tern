# Prototype plan — Tern park walk

**File:** `prototypes/trolley-walk.html` (single self-contained HTML file, canvas-drawn, no dependencies)
**Published:** https://claude.ai/artifact/2ZbxVZXBZE1amxGWBXJ9hZ (private artifact; current version v21)
**Role:** throwaway UX prototype for Roadmap Phase 2 ("Feel it", `docs/VISION.md`). It is also the **visual reference** for `docs/DESIGN.md` §0. If this file and DESIGN §0 disagree, DESIGN §0 wins and the prototype gets fixed.

Read before changing anything: `docs/DESIGN.md` §0 (look and feel), `docs/PLAN-progression.md` (map, portrait, unlocks, worlds), `AGENTS.md` (especially the 2026-09 entries).

---

## What exists now (v21)

1. **Character select** — a modal over the live park, heading "Choose One". Profile left + 2×4 grid right (landscape), profile top + 4×2 grid below (portrait). Start walking / Surprise me. Your figure in the park previews the character you're browsing.
2. **The park** — isometric ink-on-paper national park: trails, road, rail line, stream and pond with wavy banks, bridges, contour hills (walkable), forests, horizon ridge and windmill, animals. Mild wind through trees and leaves only.
3. **11 stops** — one per current core question (Q1–Q11), each announced on screen by pennant, ground disc and "?" bubble. No wayfinding.
4. **Question card** — rises over the map with an animated code-drawn scene per question and per follow-up; the scene changes before the text; each answer plays a small action, then fades. "Step away" closes it.
5. **Characters** — the Puff family as the player; everyone inside scenes is a plain puff that never shares the player's shape.

Answers are recorded in memory and logged to the console (`[Tern prototype]`). No scoring is shown; scoring is deferred.

---

## Binding decisions (current state)

**Look and feel** — see `docs/DESIGN.md` §0 for the full rules.
- Pure black and white on paper. Code-drawn. No accent colour, no dark mode, no raster images.
- Calm, cozy, low intensity: wind only through trees and leaves (no wind lines), trees sway but never churn, water and paths never move, one soft ripple per stop, reduced motion respected.
- Free roam, tap to walk, arrow keys on desktop. Hills don't block movement.
- No wayfinding arrows. A stop is obvious only once it's on screen.

**Characters** — see `docs/DESIGN.md` §0.6.
- Direction: **Puff**, small puffy abstract folk. Shared body grammar: soft puffy outline, tiny legs, floating puff hands, gentle float.
- Every character has its own silhouette. Abstract, not symbolic. Decorations are abstract marks only, never known objects. Not "strange for the sake of strange".
- Exactly one neutral character (Mof, formerly Puff). Everyone else shows personality through expression and idle habits.
- Name and look only; no descriptions (priming risk: AGENTS.md "Avatars Must Not Prime Answers").
- Gotchas: anything centred under the eyes reads as a mouth; watch for accidental objects (a rounded triangle with a dark base = onigiri; a dark pear with a curl = the poop emoji).

**Current roster**

| Name | Shape | Decoration / personality |
|---|---|---|
| Mof (was Puff) | classic puff | none; sleepy; the neutral one |
| Nib | round | glasses, striped lower half |
| Sumi | small round, all ink | shy: eyes glance aside and back |
| Ro | soft rounded square | curious: one big roving eye |
| Zig | tall stack | zigzag band, low on the body |
| Zo | smooth oval (no bumps) | ink band across the eyes |
| Tri | soft rounded triangle | cheerful: arched brows, grin, periodic hop |
| Duo | lopsided | split half ink / half paper; quizzical: mismatched eyes, raised brow, sway |

**Scenes**
- Scene first, then words. Harm is never shown: fade before impact.
- Relationships are shown by a thread and relative size, never by identity cues.
- Puffs draw about 20% larger inside scenes (they're squatter than the old human figures).

---

## Known gaps

- **Question content is stale.** The 11 stops use the pre-2026-09-27 wording and follow-ups. `docs/QUESTIONS.md` has since been revised (no escape answers; follow-ups on every question, often per answer), and the proposed core 12 (`docs/PLAN-progression.md` §6) replaces several of the 11. The italic setup line on each card is the prototype's own compression of each question's assumptions block. It's new copy, not doc text.
- **Dead code.** Drawing code for about 20 explored-and-rejected character styles is still in the file, unused. Strip it before building further.
- **Prop alignment.** A few hand-placed props (the protest sign, the lifted wallet) sit slightly off for some puff shapes.
- **Not committed.** Nothing in `prototypes/` is in git yet.

---

## Next

1. **Roadmap Phase 2 (after Ken's Phase 1 rulings):** swap the 11 stops for the proposed core 12 (`docs/PLAN-progression.md` §6), add ✓/○/◆ markers, add the "who you are" portrait panel (right side in landscape, a bottom sheet in portrait) with realistic text, play the unlock moments (1 → answer note, 4 → headline, 6 → protect/trade, 8 → tension, 12 → code + a fogged Neighborhood opening), and show the next unlock as dots. Check with Ken that it feels right.
   - Take all question wording from the current `docs/QUESTIONS.md` and draw a code-drawn scene for every follow-up.
   - New UI (panel, markers, unlock moments) follows `docs/DESIGN.md` §0: same ink style, same calm motion; ◆ is a glow on the stop, never an arrow.
2. Free roam is now ratified (Ken, 2026-09-27): the same 12 for everyone, in any order.
3. Strip the unused character code; commit `prototypes/`.

---

## Decision log (newest first)

| Version | Ken's call |
|---|---|
| v21 | Characters inside scenes become puffs too |
| v20 | Only one personality-less character (Puff); others get personality; Ro redesigned (too close to Puff) |
| v19 | Pip and Tock cut ("strange for the sake of strange"); add geometric characters (Ro, Tri) |
| v18 | Character select becomes a modal over the live map; heading "Choose One" |
| v17 | Remove character descriptions (they could bias answers) |
| v16 | Every character needs its own silhouette |
| v15 | More like Nib: decorated, but only with abstract decorations, never known objects; Bim renamed Sumi |
| v14 | Abstract, not symbolic ("too many are trying to mean something") |
| v12–13 | A Puff needn't be a cloud or weather; "a puffy lil guy (or gal)" |
| v11–12 | Main character direction chosen: **Puff** (after 16 explored styles) |
| v9–10 | Character select screen, fighting-game layout, 8 very different styles |
| v8 | Calm, cozy, low intensity; no wind lines; no spinning trees; one windmill |
| v7 | No wayfinding arrows; make on-screen stops obvious |
| v6 | All 11 core questions as stops; hills don't block movement |
| v3–5 | Ambient life (wind, leaves, creatures); streams must not look like sliding paths; wavy banks |
| v2 | National park setting; stronger stop markers; no other people in the world |
| v1 | Isometric 2.5D, black and white, code-drawn; free roam; animated scene inside the question card |
