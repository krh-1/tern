# Tern: UX and Design

**Version:** 2.0
**Last updated:** October 2026
**Status:** describes the game as built in `game/` and ratified by Ken through 2026-10-04. **§0 (Visual Direction) is ratified and authoritative.** Rulings live in `AGENTS.md`; where this doc and `AGENTS.md` disagree, `AGENTS.md` wins. The earlier dark, orange-accent, sepia-illustration design and its result screens are retired; see §12.

> This document defines the visual and interaction system for the Ethics domain. Future domains may add their own settings; document them as addendum sections here, not as separate documents.

---

## 0. Visual Direction: the Ink-on-Paper Park (ratified by Ken, 2026-09)

**Why:** Tern should feel like a calm, cozy game you wander through, not a test you sit. The world is a place; the questions are stops in it; you are a small, soft character walking between them. Everything is drawn in code, in black ink on paper, so the whole world shares one hand and one mood.

**Reference implementation:** `game/index.html` (the game, forked from the park prototype `prototypes/trolley-walk.html`). When this section and the game disagree, this section wins and the game gets fixed.

### 0.1 Palette and type
- **Pure black and white. No accent colour.** One look only (no dark mode variant).

| Token | Hex | Use |
|---|---|---|
| Paper | `#FAFAF8` | Ground, cards, fills |
| Ink | `#141414` | Outlines, text, solid shapes |
| Graphite | `#6E6E6A` | Secondary lines: grass, hatching, ties, faint marks |
| Hairline | `#DCDCD7` | Trail edges, card borders, far ridge |
| Trail | `#EDEDE8` | Trail bands |
| Shadow | `rgba(20,20,20,0.10)` | Soft ground shadows under everything that stands |

- **Type is unchanged:** Cormorant Garamond for questions, names and headlines (italic for the short setup line above each question); Quattrocento Sans for answers and small UI text.

### 0.2 The world
- **Isometric 2.5D national park**, drawn in canvas code. No image files and no image generation: the Gemini/Imagen pipeline (`docs/ILLUSTRATION-GENERATION.md`) is on hold.
- **What's in it:** winding trails with a dotted centre line (like a park map), a road, an old rail line, a stream with irregular wavy banks and a pond, bridges wherever paths cross water, hills drawn as stacked contour rings, pine and round-tree forests, wildflowers, rocks, a mountain ridge on the horizon, and one old windmill on the far ridge.
- **Life:** animals only (deer, rabbits, squirrels, mice, ducks, butterflies, terns overhead, the occasional fish jump). The only people in the world are the player and the characters inside question scenes.
- **Movement:** free roam, tap or click to walk (arrow keys on desktop). You can walk over hills. Buildings are solid: you can't walk through them, and taps route around them (Ken's ruling, 2026-10-03). Otherwise only the edge of the open map stops you.
- **Each world** is drawn in this same style, with its own setting: the Park; the Neighborhood (houses on lots, fences, hedges, a gate past the cabin); the City (flat-roofed buildings with window grids, avenues, a station); the Coast (a still sea, sand and dunes, a boardwalk, a pier, a lighthouse, moored boats); the Observatory (a high plateau with contour lines, trails, sparse pines, and a domed observatory).

### 0.3 Calm is a rule, not a mood
Low intensity everywhere. The overall feel is a calm, cozy game.
- Wind is mild and shown **only** through trees swaying, grass bending and a few leaves falling. No wind lines or streaks.
- Trees sway and their canopy edge gently breathes in place. They never churn or look like they rotate.
- Water, trails and roads never look like they slide. Water gets small static wave marks.
- One slow, faint ripple per stop. Flags wave slowly. Creatures potter rather than dart.
- Respect `prefers-reduced-motion`: ambient motion stops and figures hold still.
- If something feels busy, calm it; don't add more.

### 0.4 Stops and discovery
- **No wayfinding.** No arrows toward off-screen stops. Discovery is part of the game.
- A stop announces itself only once it is on screen: a tall pennant flag, a pale ground disc with one soft ripple, and a black **"?"** speech bubble that fades up gently and floats. No bursts or bounces.
- When a stop is done, its pennant turns to paper with a bold check, and its ground disc goes away. The full set of map markers is in §5.

### 0.5 The question card
- The card rises from the bottom over the map (the map stays visible above it). It carries its own **animated, code-drawn scene** above the question.
- **The scene arrives first, then the words.** On a follow-up the scene changes *before* the question text (the rule in AGENTS.md "Illustration Swap Must Precede Text Update" applies to code-drawn scenes).
- Choosing an answer plays a small action in the scene (the lever moves, the wallet is lifted), then the scene fades to paper. Harm is never shown: fade before impact.
- Relationships are shown without identity cues: a thin thread from you to someone you love, a smaller figure for a child.
- "Step away" closes the card without answering.

### 0.6 Characters: the Puff family
The character style is **the Puff family**: small, puffy, abstract folk. The neutral main character is **Mof** (named Puff until 2026-09-27). Binding rules for any character, now or later:
1. **One body grammar:** a soft puffy outline, tiny stick legs, floating round puff hands, a gentle float when walking.
2. **Every character has its own silhouette.** Never reuse a body shape.
3. **Abstract, not symbolic.** Nothing that stands for something. Decorations are allowed but must be abstract marks and patterns (stripes, a band, a split, a zigzag). Never known objects: no hats, bows, ties, flowers, ears, props. Watch for accidental look-alikes; a rounded triangle with a dark base read as an onigiri, and a dark pear with a curl on top read as the poop emoji.
4. **Only one neutral character (Mof).** Every other character has a personality, shown only through expression and idle habits: a glance, a roving eye, a hop, a sway.
5. **Nothing centred just under the eyes.** Bands, dots and patterns there read as a mouth. Keep body patterns low and off-centre.
6. **Name and look only.** No descriptions, traits, stats or "carries" lines. They could prime how someone answers (AGENTS.md "Avatars Must Not Prime Answers"). Names are short, made-up sounds.
7. **Everyone in the question scenes is a puff too,** but plain and undecorated. Each keeps one shape for the whole scene and never shares the player's shape, so "you" always stands out. The player's chosen character is "you" inside every scene.

**Current roster:** Mof (classic puff, sleepy, the neutral one, and the app icon) · Nib (round, glasses, striped lower half) · Sumi (small, all ink, shy side-glance) · Ro (soft rounded square, one big roving eye, curious) · Zig (tall stack, low zigzag band) · Zo (smooth oval, ink band across the eyes) · Tri (soft rounded triangle, arched brows, grin, periodic hop) · Duo (lopsided, split half ink / half paper, mismatched eyes, sway). Nib's glasses are the one known object, kept by Ken's choice.

### 0.7 Character select
- Shown as a **modal over the live park**, after the title screen (§4.1): the map animates behind a light veil as a clue to what's ahead, and your figure in the park previews the character you're browsing.
- Heading: **"Choose One"**. A large animated profile of the selected character plus the grid: **2×4 grid to the right in landscape; 4×2 grid below in portrait.** The selected tile is marked with the park's pennant. Hover previews on desktop; arrow keys and Enter work.
- Buttons: **Start walking** and **Surprise me** (random pick). Starting fades the modal away into the park.
- **Changing character later** (from the panel's "Change character" link, or by tapping your own figure) reopens the same modal with **Keep walking**. It never touches answers ("Same answers, new look.").

---

## 1. Design philosophy

### It is a mirror, not a quiz
Every screen should feel like it's revealing something already there, not extracting data or grading performance. No right answers, no score.

### It has gravity and warmth
Serious enough to be taken seriously, warm enough to enjoy. A question that makes you sit for a moment before answering is both.

### It feels like a game, a calm one
Game-feel is intrinsic: pacing, anticipation, the satisfaction of a reveal, the sense of building toward something. It is not extrinsic reward: no points, badges, streaks or leaderboards. Unlocks are allowed because the reward is information about you and new places to walk (Ken: "if it comes off like a game, so be it").

What carries it:
- A well-written dilemma with a hard choice creates engagement the moment it's read.
- The scene shifting before the follow-up's words is a mechanic that rewards attention.
- The portrait growing after each answer makes every answer pay off.
- Arrival moments (your summary, your code, each chapter, a new world) are slower and centred, not page loads.
- Everything stays calm (§0.3).

> **The one thing players should remember:** the moment the scene shifted, and they felt something change before they read why.

---

## 2. Voice and tone

- Warm but not cheerful. Curious but not academic. Playful but never flippant.
- Direct. No hedging, no filler.
- Speaks like a smart, kind friend who has read a lot of philosophy but never mentions it.

| Don't | Do |
|---|---|
| "Please select your answer from the options below." | "What do you do?" |
| "Question 4 of 11" | Dots for the next unlock (●●○). Never a count. |
| "You are a Utilitarian thinker." | "You aim for the greater good." |
| "You are The Iron Idealist." | "You keep your word." |
| "Processing your responses..." | No loading state. Transition directly. |
| "Tendencies", "Your headline" | "More about you", "Your summary" |

---

## 3. Copy rules

Ken's rulings (2026-09-29 and 2026-10-03). The bar: **every line must make sense to a stranger who sees it on its own, with no context.**

### Portrait lines (tendencies, the summary)
- Plain second-person behavior, starting with "You". Say the behavior, not a metaphor for it.
- As few words as stay clear: aim for 3 to 8. Ken's example: "You aim for the greater good," not "You go with whatever does the most good overall," and not "You count the numbers."
- Passes the friend test: would a real person say this about a friend?
- No archetype names, no type labels, no fantasy vocabulary.
- The explanation lives in "Read more about you" (the tendency's `detail`), not in the line.
- Honest results: some sit slightly uncomfortably.

### Answer notes
- One or two sentences after an answer about what that choice suggests. Plain words; no coined phrases ("your family exception", "the fight has to have a face").

### `did` lines (answer summaries)
- One plain sentence restating the choice, second person.
- They show in mixed lists, away from their question, so **every `did` names its subject in full** ("the $1 million", "the person on the side track", "your colleague"). Never "it", "that" or "the one" pointing back at the question.

### You protect / You'll trade away
- Each item must read correctly after "You protect:" and "You'll trade away:" (for example "promises", "your own comfort").

### Share lines
- First person, something the sender would be glad to say about themselves ("I keep my word."). A tendency that reads badly out of context gets no share line and is never sent.

### Everywhere
- No em dashes. No "math", "ceiling" or "floor" metaphors. No internal terms in the UI.
- Labels in "Read more about you" stay short: "Your answers", "Pointing the other way", "Toward outcomes" / "Toward rules".
- **Question, answer and setup wording is instrument text.** Propose changes to Ken; never apply them in a copy sweep.

---

## 4. Typography

| Role | Font | Notes |
|---|---|---|
| Question text, summary, code letters, reveal headings, character names | Cormorant Garamond | Upright |
| Setup line above a question | Cormorant Garamond italic | Like a stage whisper |
| Answers, buttons, panel text, labels, kickers | Quattrocento Sans | Quiet next to Cormorant |

- Code letters on the reveal screen: large (about 56 to 92 px), one row, generous spacing.
- Reveal headings: about 30 to 44 px, line height about 1.15.
- Kickers: small capitals, wide letter spacing, graphite.
- No sans-serif headlines.

---

## 5. Screens and flow

### 5.1 Title screen
First visit only. "Tern", the line "A quiet walk through hard questions.", and three buttons: **Choose your character**, **What is Tern?** (a short explanation on an arrival screen), **Privacy**. Returning players skip straight to the map where they left off ("Welcome back.").

### 5.2 Character select
See §0.7. After starting, a one-time hint: "Tap anywhere to walk · explore the park".

### 5.3 The map and its markers

| Marker | Meaning | How it's drawn |
|---|---|---|
| **Open** | Not answered yet | Ink pennant, pale ground disc with one slow ripple, a "?" bubble that fades up once the stop is on screen |
| **Done** | Answered | Paper pennant with a bold check; the disc goes away and the place melts back into the map |
| **Calling** | The open stop the portrait most wants answered next (it would sharpen your least-certain value pair) | A second, dashed ring around the stop's disc that breathes slowly. Only on the stop itself, never an arrow |
| **Fogged world** | A world that hasn't opened | Paper fog over the region, its name, and how to open it (for example "answer every stop in the park") |
| **Opening soon** | A declared world that isn't built | A faint sketch in fog. (None today: all five worlds are built.) |

No "7 of 12" anywhere on the map.

Walking onto an open stop opens its card. "Step away" walks you a step back, and that stop stays quiet until you walk away and return.

### 5.4 The question card

**Layout:** the card rises from the bottom over the map. Scene on top, then the setup line (italic), the question, the answers, and "Step away".

**Order on open:** the scene arrives first; the words follow after about 1 s.

**Answering:** tap an answer, then **Confirm**. A misclick costs nothing.

**After Confirm** (the answer-to-follow-up sequence):
1. The chosen answer marks (about 250 ms) and the words hide.
2. The scene plays the answer's small action.
3. The scene fades to paper.
4. The follow-up's scene fades in, then shifts into the new situation.
5. A hold of 0.9 s, so the change lands.
6. The follow-up's words appear.

Aim for about **3.5 s** from answer to follow-up. Longer feels like a stall (D4's "Stop" was cut from 5.2 s to 4.2 s).

**The card never jumps.** The new text is laid out while hidden, and the card glides to its new height (about 0.55 s).

**After the last step**, the card closes. The answer lands, then the portrait updates (0.7 s later), so each insight feels caused by the choice.

**Revisiting a done stop** opens a review: the question's title, your answers and their notes, **Answer again** (clears that one answer and asks it fresh) and **Close**.

### 5.5 The portrait panel

**Desktop and landscape (900 px wide and up):** a panel on the right, always visible. It can be minimized to a thin rail, which glows softly when something new arrives.

**Phone and portrait:** a bottom sheet. Closed, it shows a 64 px handle with your summary (or "You, so far"), a grip and a chevron. A glow on the handle means something new was revealed. See §8 for how it moves.

**When something changes,** your character points toward the panel and says "Your portrait just changed →" (or "↓" on a phone). Changed sections dissolve out and resolve back in, with a short ink mark beside them.

**Sections, top to bottom** (each appears once its unlock is reached):

| Section | Shows | Unlocks at |
|---|---|---|
| **You, so far** / **You, in full** | Your summary (one "You…" sentence) and a short description; "Your summary changed." when it shifts; **Read more about you** | 4 park answers (before that: "Answer a question to begin." / "Keep going. Your summary appears after a few answers.") |
| **Your code** | The five letters and one line explaining them | 12 park answers |
| **Share your result** | A box with **Send to a friend** | 12 park answers |
| **Chapters** | One per later world: its one-line summary, how you change there, what you do there | That world's ladder |
| **More about you** | Other tendencies, as chips | 4 park answers, once there's more than one |
| **You protect / You'll trade away** | Two short lists | 6 park answers |
| **Your compass** | Five pairs as bars from the middle ("Rules ↔ Outcomes"), each appearing once two of your questions touch it | 2 park answers; all five at 10 |
| **Where you're torn** | Up to three tensions between your own answers | 8 park answers, and only once a real tension exists |
| **Notes on each answer** | Each question's notes, newest first, collapsible | 1 answer |
| Tools | "Share what you have so far" (before the park is done), "Change character", "Start over", "Privacy" | Always |

**Read more about you** opens an extra section under the summary: each tendency with what it means and the answers behind it ("Your answers", "Pointing the other way"), then each compass pair ("You lean clearly toward rules.") with the answers pulling each way. Facts from the player's own choices, no new judgment.

**The bottom line** of the panel always says what's next:
- a world that just opened and has no answers yet: "The City is open · Show me" (replays the look-over);
- otherwise the next unlock and its dots: "Next: What you protect ●●○";
- at the very end: "You've walked every world".

### 5.6 Unlock ladders and dots

**The park:** 1 notes · 2 compass · 4 summary · 6 protect/trade · 8 where you're torn · 10 whole compass · 12 code.

**Each later world** has three steps, counted in that world's answers:

| World | How you change there | What you do there | Chapter (and the next world opens) |
|---|---|---|---|
| Neighborhood | 3 | 6 | 10 |
| City | 4 | 8 | 13 |
| Coast | 3 | 6 | 8 |
| Observatory | 4 | 8 | 12 |

**Dots, never numbers.** Closeness to the next unlock is filled and empty dots (●●○), counting only the answers since the last unlock. Never a total, a fraction or a percentage.

An unlock is revealed once. Redoing an answer never replays a reveal.

### 5.7 Arrival moments

Arrival screens are slower than anything else in the game: a paper veil fades in over the map (0.8 s), then each line rises in turn (first after 0.9 s, then 0.5 s apart, each fading over 1 s). Text is centred. They close on a button.

| Moment | When | What it shows |
|---|---|---|
| **Your summary** | 4 park answers | "So far", your summary, its description, "This can change as you answer more.", **Keep walking** |
| **Your code** | 12 park answers | "You answered every question in the park", the five letters **one at a time, left to right** (each fades in over 0.3 s, 0.5 s apart), your summary, the radar chart, the letter legend, a line that the Neighborhood is open and your code won't change there; **Send your code to a friend** (main) and **Keep walking** |
| **A chapter** | A later world's last ladder step | The chapter name, its summary, how you change there, "Your portrait has a new chapter.", and what's next ("Past the City, the fog is lifting over the Coast."); **Send to a friend** and **Keep walking** |
| **The look-over** | Right after the reveal screens, when a world opens | See below |
| **The ending** | The Observatory's chapter | "You've walked every world. Your portrait is as full as it gets, and you can always answer a question again." |

The code reveal is non-negotiable: never show all five letters at once.

**The look-over** (Ken's ruling, 2026-10-03). How a newly opened world shows itself without an arrow:
1. The map fades to paper.
2. It comes back framed on the new world's entrance (a gate, a street sign, a trail sign) with a landmark the player already knows in view.
3. The fog lifts slowly while that world's "?" bubbles rise one by one.
4. One line of directions in words, from a known landmark:
   - "The Neighborhood is open, past the cabin and through the gate."
   - "The City is open, where the main street leaves the Neighborhood."
   - "The Coast is open, where the avenue leaves the City."
   - "The Observatory is open, up the trail south of the Coast."
5. About 4 s later the view fades back to the player. A tap or key skips it.

No camera slides across the map, no bursts. It never walks the character there. "Show me" in the panel replays it until the player answers a stop in that world.

### 5.8 Sharing

Written for the friend who receives it (Ken's ruling, 2026-10-03). The friend has seen none of the questions; the sender must be glad to put their name to it.

**Where:** after the park is done, sharing is the main button on the code reveal, on each chapter screen, and a box near the top of the portrait. Before that, a quiet "Share what you have so far" link at the bottom of the panel.

**The share sheet** ("Send to a friend"):
- The picture the friend will see: a 1080 × 1350 ink-on-paper card with your character, the lines you picked, and your code (after the park).
- "Pick up to 3 lines about you": chips with the share lines of your tendencies (first person). Lines without a share line never appear.
- "Your message": the exact text that will be sent. It says what Tern is ("a game of 12 hard choices about right and wrong"), lists your lines, gives your code with "Play and tell me yours:", and ends with the link. Before the park is done it says "So far".
- **Share** (the phone's share sheet, with the picture) and **Copy message**; on a computer without a share sheet, **Copy message** and **Save picture**.
- "Only what you see here is sent. Your answers stay on this device." and **Not now**.

Message and card copy live in `content.js` → `shareCopy`.

### 5.9 Privacy and other screens
"Privacy" (on the title screen, character select and panel) opens an arrival screen: answers stay in this browser on this device, are never sent, no account, no tracking, no analytics, no ads; "Start over" or clearing site data erases them. "Start over" asks for confirmation first.

---

## 6. Motion and timing

| Moment | Timing |
|---|---|
| Card opens: scene, then words | Words after about 1 s |
| Answer marks, words hide | about 250 ms |
| Scene fades to paper / next scene fades in | about 0.55 s each |
| Hold after the scene shifts, before the words | 0.9 s |
| Answer to follow-up, total | aim for about 3.5 s |
| Card glides to a new height | about 0.55 s |
| Portrait updates after the card closes | 0.7 s |
| Panel section dissolve / resolve | 0.7 s / 1.2 s, in coarse steps (a soft, pixelated feel) |
| Arrival screen veil | 0.8 s |
| Arrival screen lines | first at 0.9 s, then every 0.5 s, each fading over 1 s |
| Code letters | one every 0.5 s, each fading over 0.3 s |
| Look-over | fade to paper about 0.7 s, hold about 4 s, fade back about 0.9 s |
| Fog lifting | slow ease over several seconds |
| Zoom | eased, never snaps |

**Reduced motion** (`prefers-reduced-motion`): ambient motion stops and figures hold still; scenes jump to their end states; panel dissolves, arrival-screen staggers and the look-over's fades are instant.

---

## 7. Accessibility
- Every control is a real button, reachable by keyboard. Arrow keys walk; `+` and `-` zoom; arrow keys and Enter work in character select; Escape closes the share sheet.
- The card and arrival screens are live regions, so screen readers hear new text.
- Focus moves to the first answer when the words appear, and to the main button on arrival screens.
- Dots carry a text label ("2 more to go") for screen readers.

---

## 8. Phone feel

Ken's rulings (2026-09-29). Browser-pane checks can't catch these, because the pane pauses animations while hidden; check them in headless Chrome with touch and CPU slowdown (`docs/ARCHITECTURE.md` → Testing).

- **Sheets drag.** Any bottom sheet follows the finger when dragged, closes on a pull-down or a tap outside it, and shows a chevron. A quarter-ish pull or a quick flick is enough. A drag starting inside scrolled content scrolls instead.
- **Cards glide, never jump.** When card text changes, the new text is laid out hidden and the card glides to its new height.
- **No stalls.** Keep answer-to-follow-up near 3.5 s.
- **The map rests.** While a card covers a phone screen, the map behind it redraws at half rate.
- **Pinch to zoom**; a second finger cancels the first finger's walk.

---

## 9. Map zoom
Pinch on a phone, pinch or scroll on a trackpad, `+` / `-` on a keyboard. 0.6× to 1.8×, centred on the player, eased, saved with the game.

---

## 10. Home-screen app
- Installable (`game/manifest.webmanifest`): standalone display, paper background and theme colour (`#FAFAF8`).
- App icon: Mof on paper.

---

## 11. What this is not
- **No colour accents, no dark mode, no raster illustrations, no AI image generation** without Ken's ruling.
- **No progress numbers.** No question counts, steps or percentages. Dots only.
- **No points, badges, streaks, leaderboards, confetti or celebrations.** The insight is the reward.
- **No wayfinding arrows**, compasses or edge pointers.
- **No busy motion.** If it feels busy, calm it.
- **No crowd statistics** ("how others answered") in V1.
- **No archetype names or type labels.**
- **No loading states.** Everything is drawn in code, so there's nothing to wait for.
- **No purple gradients, glassmorphism or generic app styling.**

---

## 12. Superseded (history only)

Retired by Ken's rulings in 2026-09; kept so the history isn't lost. Do not build from these.

- **Visual system:** a dark charcoal background, a "Monarch Orange" accent, cream text, a dark vignette, full-bleed sepia editorial illustrations generated by AI (Gemini/Imagen). Replaced by §0.
- **Screens:** a full-screen question screen with a bottom progress bar; a "convergence offer" ("We have a pretty clear picture of you. Want to see what we found?"); a code reveal leading to a paid "Go deeper"; a "distinction reveal" (code, one-line summary, radar chart, axis breakdown, generated paragraph); an "exploration mode"; a share card rendered with html-to-image. Replaced by the map, the portrait panel, the unlock ladder and the arrival moments in §5.
- **Kept from that design:** the scene changing before the words, the letter-by-letter code reveal, the slower pacing of arrival moments, the type pairing, and the copy principles.

---

*Tern design system, maintained alongside the game. Any visual change is reflected here first.*
