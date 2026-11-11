# Plan: the character fingerprint (exploration)

**Ask (Ken, 2026-10-05):** a colour or pattern mark that slowly appears and shifts on your character, driven by your compass. It becomes a "fingerprint" the player gets attached to. Every stage of it must look good, and different players should get distinct vibes.

**Status:** Ken picked **Aura** (2026-10-06). Built in `game/aura.js` and wired into `game/index.html`; spec in `docs/DESIGN.md` §0.8. This prototype stays as the record of the directions considered.

## Round two (2026-10-06)
Ken rejected round one: Grain reads as stress or stretch marks, and circles risk reading as measles. He asked for something "more creative or out there" with nothing people could associate with anything negative. Lesson: anything printed on the body reads as skin, so round two moves the fingerprint off the body. `prototypes/fingerprint.html` now shows **Aura** (a two-colour watercolour glow behind you, recommended), **Mobile** (a tiny Calder-style mobile floating beside you, pure ink) and **Trail** (marks your steps leave, an extra). Dropped this round: Seal (doily, puddle), Hand (sticker border, cracks), loose floating shapes (debris), trail arcs and upright waves (arrows, smell lines). Every idea gets a "what could this be mistaken for" check before Ken sees it.

## Round one (history): what was built
`prototypes/fingerprint.html`: one page that draws the real Puff-family characters (code copied from `game/index.html`) with four fingerprint directions on top:
1. **Grain**: contour lines, like the park's hills and a real fingertip.
2. **Strata**: ink settling in bands from the feet up, one band per world.
3. **Speckle**: ink dots, like a speckled egg.
4. **Stitch**: rows of running stitch at the hip, one row per world.

Each is shown on six sample compasses, across the unlock steps (2 answers → all 75), across all eight characters, at map size, and in ink or one muted pigment. A playground has five compass sliders and an answer slider, so the shift can be watched happening slowly.

## Rules the fingerprint must keep
- Abstract marks only; no known objects; nothing centred just under the eyes (DESIGN §0.6).
- Calm: it never moves on its own; it changes slowly and only at unlock steps (DESIGN §0.3).
- It must not prime answers (AGENTS "Avatars Must Not Prime Answers"): no legend, no per-axis explanation, no "better" end state.
- Colour breaks the ratified black-and-white rule, so it's shown as an option for Ken's ruling, not assumed.

## Done check
The page renders with no console errors; screenshots of each section reviewed for looks, face clearance and look-alikes.
