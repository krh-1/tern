# Plan: Moving from one world to the next

Goal (Ken, 2026-10-07): make it obvious when the next world opens, let the player go there without walking to the edge of the map, and still give them time to take in the world they just finished.

**Status:** approved by Ken (2026-10-07). Rulings: the three-step flow as written; the button copy is "Go to {world}"; no Places line (players can walk back, since the worlds are connected, but going back isn't something to design for). **Built 2026-10-07**; the "Getting back" section below was dropped. Copy detail added in the build: "Stay on the Coast" and "Stay at the Observatory" instead of "in".

## The short version

When a world finishes, three things should happen in order, each one waiting for the player:

1. **Your report.** The chapter screen stays up until you're done reading. It shows what this world said about you.
2. **A look at the next world.** The map shows the new world's entrance while its fog lifts (this exists today), then asks: **Go to the City** or **Stay in the Neighborhood**.
3. **You step in.** If you choose Go, your character appears right there at the entrance, on the view you're already looking at, and the camera settles on them. If you choose Stay, you're back where you were.

The "teleport" is called **Go to <world>** on screen and "travel" in code and docs. "Teleport" suggests a sci-fi effect; this is a quiet paper fade, like everything else in the park.

## What happens today, and why it falls flat

Each world opens on the same answer that completes the previous world's chapter. I checked the numbers:

| Answer that does it | Report you get | World that opens |
|---|---|---|
| 12th park answer | Code reveal | The Neighborhood |
| 10th Neighborhood answer | Neighborhood chapter | The City |
| 13th City answer | City chapter | The Coast |
| 8th Coast answer | Coast chapter | The Observatory |

So the "take it in" moment and the "something new" moment always land together. Today the game stacks them back to back:

1. The chapter screen appears. Its button says "Keep walking".
2. The moment you close it, the look-over starts on its own: the map fades, shows the new world's entrance for about 4 seconds, then fades back to your character.
3. You now have to remember the directions ("past the cabin and through the gate") and walk there. The walk speed is about 4 map squares a second, and a tap can only target what's on screen, so crossing the park from its west side takes several taps and roughly 11 seconds of walking.

Three problems come out of that:

- **No breathing room.** The report and the look-over run together. You never choose when to move on.
- **The look-over shows you the place, then takes it away.** It ends where you started. The big moment ends in a chore.
- **A forced jump would be wrong too.** From the Neighborhood on, a world opens when you've answered two-thirds of the current one, so about a third of its stops are still open. Moving the player without asking would strand those stops. That's why the plan ends on a choice.

## The new flow, step by step

### Step 1: The report waits for you

- The chapter screen becomes the world's report. It keeps its headline and "how you change here" line, and adds up to three lines from "what you do here" (that world's tendencies, which already exist in the portrait).
- If the world still has unanswered stops, one plain line says so: "Stops you haven't answered in the Neighborhood stay open." No counts (the no-progress-numbers rule).
- The last line still teases the next world ("Past the Neighborhood, the fog is lifting over the City.").
- Buttons: **Send to a friend** and **Continue** (replacing "Keep walking", which no longer describes what happens next).
- Nothing else starts until the player taps Continue.
- The park's code reveal works the same way: its "Keep walking" becomes "Continue". Its text is unchanged.

### Step 2: The look-over ends on a choice

- Same as today up to the point where the fog has lifted and the new world's "?" bubbles have risen one by one.
- Then, instead of fading back, a small card rises at the bottom of the screen with the existing directions line and two buttons:
  - **Go to the City** (main button)
  - **Stay in the Neighborhood** (quieter button)
- A tap on the map before the card appears skips ahead to the card (today it skips back to you). Escape means Stay. The Go button gets keyboard focus.

### Step 3a: Go

- The view is already on the new world's entrance, so there's no second fade. Your character fades in just inside the entrance with one small hop, and the camera eases from the wide look-over view to your normal zoom, centred on you (about 1.2 seconds).
- The game saves straight away.
- With reduced motion on: no hop, no easing. The view cuts under a paper fade.

### Step 3b: Stay

- Exactly what happens today: paper fade, back to your character.
- The bottom line of the portrait keeps saying "The City is open", now with a **Go there** link (was "Show me"). It replays Step 2, choice included. It disappears once you answer a stop in the City, as now.

### Getting back (for your ruling)

After a jump, the stops you left behind are a long walk away. I recommend a quiet **Places** line in the portrait's tools row, next to "Change character": "Go to: The Park · The Neighborhood · The City", listing only worlds that are open. It uses a plain paper fade and puts you at that world's entrance. It never appears on the map and never points at a stop, so it stays within the "No Wayfinding" rule: you go to a place you've been shown, not toward something you haven't found.

## Timing, from the last answer of a world

| Moment | Length |
|---|---|
| Note and portrait update (unchanged) | about 3 s |
| Report screen | as long as you like |
| Fade to paper, look at the entrance, fog lifts, bubbles rise | about 4 s |
| Choice card | as long as you like |
| Go: character appears, camera settles | about 1.2 s |

Compare today: report, then a 4-second look you didn't ask for, then 10 to 20 seconds of walking.

## Copy for your yes

- Report button: "Continue" (was "Keep walking"), on the code reveal and every chapter screen.
- Unanswered stops line: "Stops you haven't answered in {world} stay open."
- Choice buttons: "Go to {next world}" / "Stay in {current world}".
- Portrait bottom line: "{World} is open · Go there" (was "Show me").
- Places line: "Go to: The Park · The Neighborhood · …"

## How I'd build it (all in `game/index.html`, no content changes)

- **Arrival points.** Each region in `REGIONS` gets `arrive: [x, y]`: on the road just inside its entrance, outside every building footprint and every stop's standing spot. Starting guesses: Neighborhood (46.4, 25.6), City (86, 26), Coast (127, 26), Observatory (138.9, 51.5). Each gets checked with `solidAt` and `walkAreas`.
- **`revealChapter(w)`** adds the "what you do here" lines and the unanswered-stops line; button text changes.
- **`lookOver(r)`** returns `'go'` or `'stay'`. After the bubbles rise it shows the choice card (new `#lookChoice` element, styled like the existing reveal buttons) and waits.
- **`travelTo(r)`** places the player at `r.arrive`, clears any walk in progress, fades the character in with a hop, lets the camera and zoom ease to the player (the camera and zoom already ease), and saves. Places and "Go there" call the same function.
- **`afterAnswer`** stops after a Go if more than one world opened at once (only possible with old saves); the others stay listed in the portrait.
- No change to scoring, unlocks, saves' format, or anything in a question scene.

## How I'd prove it works

A headless Chrome script (like the earlier walk tests), on a fresh save and at phone size with 4× CPU slowdown:

1. Answer all 12 park stops. Check the code reveal stays up with no look-over until Continue.
2. Check the choice card appears after the bubbles, and Go puts the player inside the Neighborhood, not inside a building, with the camera centred and the save updated.
3. Repeat for the City, Coast and Observatory using the test helpers.
4. Check Stay leaves the player where they were, and that "Go there" in the portrait replays the choice.
5. Check reduced motion, keyboard (Enter, Escape), and that the card doesn't collide with the phone's portrait sheet.
6. Screenshots of each step for you.

Then I'd update the "Look-Over" entry in `AGENTS.md`, the look-over section of `docs/DESIGN.md`, and `docs/NEXT-STEPS.md`.

## Considered and dropped

- **Moving the player automatically after the report.** Takes control away and strands unanswered stops.
- **A train ride between worlds** (the railway already runs to the Coast). Charming, but a lot of motion for a calm game and a large build. Could come later as a flourish.

## Decisions for Ken

1. Approve the three-step flow (report waits, look-over ends on a choice, Go puts you at the entrance).
2. Approve the copy above, or rule on changes.
3. Add the Places line for getting back? My recommendation: yes.
