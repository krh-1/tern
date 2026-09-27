# Tern — UX/UI Design Document

**Version:** 1.3
**Last updated:** September 2026
**Status:** V1 — Ethics Domain. **§0 (Visual Direction) is ratified and authoritative.** Sections 5 and 6 below describe the earlier dark, orange-accent, sepia-illustration look and are kept for history only. The screen architecture in §7 still describes the old test-then-result flow; it will be rewritten when Ken approves `docs/PLAN-progression.md`.

> This document defines the visual system for the Ethics domain and establishes the core design language for Tern. Future domains may introduce domain-specific visual variations. Those should be documented as addendum sections within this file, not as separate documents.

---

## 0. Visual Direction — the Ink-on-Paper Park (ratified by Ken, 2026-09)

**Why:** Tern should feel like a calm, cozy game you wander through, not a test you sit. The world is a place; the questions are stops in it; you are a small, soft character walking between them. Everything is drawn in code, in black ink on paper, so the whole world shares one hand and one mood.

**Reference implementation:** `prototypes/trolley-walk.html` (published as a private artifact; see `prototypes/PLAN.md`). It is a throwaway prototype, but it is the visual reference for everything in this section. When this section and the prototype disagree, this section wins and the prototype gets fixed.

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
- **Movement:** free roam, tap or click to walk (arrow keys on desktop). Nothing blocks walking except the world's edge; you can walk over hills.
- **Each world** (Park, Neighborhood, City, Coast, Observatory in `docs/PLAN-progression.md`) is drawn in this same style, with its own setting.

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
- When a stop is done, its pennant lowers and shows a tick. (Map markers for the progression model, such as ✓ ○ ◆ ✦ and locked regions, are specified in `docs/PLAN-progression.md` §3 and will be drawn in this style.)

### 0.5 The question card
- The card rises from the bottom over the map (the map stays visible above it). It carries its own **animated, code-drawn scene** above the question.
- **The scene arrives first, then the words.** On a follow-up the scene changes *before* the question text (the rule in AGENTS.md "Illustration Swap Must Precede Text Update" applies to code-drawn scenes).
- Choosing an answer plays a small action in the scene (the lever moves, the wallet is lifted), then the scene fades to paper. Harm is never shown: fade before impact.
- Relationships are shown without identity cues: a thin thread from you to someone you love, a smaller figure for a child.
- "Step away" closes the card without answering.

### 0.6 Characters: the Puff family
The main character direction is **Puff**: small, puffy, abstract folk. Binding rules for any character, now or later:
1. **One body grammar:** a soft puffy outline, tiny stick legs, floating round puff hands, a gentle float when walking.
2. **Every character has its own silhouette.** Never reuse a body shape.
3. **Abstract, not symbolic.** Nothing that stands for something. Decorations are allowed but must be abstract marks and patterns (stripes, a band, a split, a zigzag). Never known objects: no hats, bows, ties, flowers, ears, props. Watch for accidental look-alikes; a rounded triangle with a dark base read as an onigiri, and a dark pear with a curl on top read as the poop emoji.
4. **Only one neutral character (Puff).** Every other character has a personality, shown only through expression and idle habits: a glance, a roving eye, a hop, a sway.
5. **Nothing centred just under the eyes.** Bands, dots and patterns there read as a mouth. Keep body patterns low and off-centre.
6. **Name and look only.** No descriptions, traits, stats or "carries" lines. They could prime how someone answers (AGENTS.md "Avatars Must Not Prime Answers"). Names are short, made-up sounds.
7. **Everyone in the question scenes is a puff too,** but plain and undecorated. Each keeps one shape for the whole scene and never shares the player's shape, so "you" always stands out. The player's chosen character is "you" inside every scene.

**Current roster (v21):** Puff (classic puff, sleepy, the neutral one) · Nib (round, glasses, striped lower half) · Sumi (small, all ink, shy side-glance) · Ro (soft rounded square, one big roving eye, curious) · Zig (tall stack, low zigzag band) · Zo (smooth oval, ink band across the eyes) · Tri (soft rounded triangle, arched brows, grin, periodic hop) · Duo (lopsided, split half ink / half paper, mismatched eyes, sway). Nib's glasses are the one known object, kept by Ken's choice.

### 0.7 Character select
- Shown first, as a **modal over the live park**: the map animates behind a light veil as a clue to what's ahead, and your figure in the park previews the character you're browsing.
- Heading: **"Choose One"**. A large animated profile of the selected character plus the grid: **2×4 grid to the right in landscape; 4×2 grid below in portrait.** The selected tile is marked with the park's pennant. Hover previews on desktop; arrow keys and Enter work.
- Buttons: **Start walking** and **Surprise me** (random pick). Starting fades the modal away into the park.

---

## 1. Design Philosophy

Three principles govern every decision in Tern. They operate together — remove any one and the experience degrades.

### It is a mirror, not a quiz

The visual language must feel weighty enough to earn trust and warm enough that users actually feel something when they answer. Clinical, bright, or gamified aesthetics undermine this. Every screen should feel like it's revealing something that was already there — not extracting data or scoring performance.

### It has gravity and warmth

Serious enough to be taken seriously. Warm enough to be enjoyed. These are not in tension — they're the same thing at different registers. A question that makes you sit for a moment before answering is both. An answer button that lights up in amber when selected is both. The balance must be maintained everywhere.

### It feels like a game

Not gamified — a game. The distinction is precise: gamification is extrinsic reward layered on top of content (points, badges, streaks). Game-feel is intrinsic to the experience design itself — pacing, anticipation, the satisfaction of a reveal, the sense that something is being built toward.

Tern has this structurally if it's built right:
- A well-written dilemma with a genuinely hard choice creates engagement the moment it's read
- The follow-up illustration swap — the world shifting before the question changes — is a mechanic that rewards attention
- The convergence offer is a reveal moment: the system signals that it found something
- The code reveal is the payoff of the core experience
- The distinction paragraph is the deeper payoff for those who kept going

None of these require extrinsic reward. The engagement is intrinsic to the content and pacing. Every design decision should protect and amplify this quality — never flatten it.

**Specific implications of game-feel:**
- Questions should feel like they were chosen for you, not like the next item on a list
- Transitions create anticipation, not just movement between screens
- The depth graph feels like going deeper into something interesting, not answering more questions
- The code reveal feels like a moment, not a result page
- The distinction paragraph feels like something a perceptive person said about you, not generated output

> **The one thing users should remember:** The moment the image shifted — when the wallet moved from the Upper East Side to South Central, and they felt something change in their chest before they changed their answer.

---

## 2. Brand Identity

### Name
**Tern**

### Tagline options
- *You already know who you are.*
- *Your instincts have always known.*
- *Some things you don't decide. They decide you.*

### Voice & Tone
- Warm but not cheerful
- Curious but not academic
- Playful but never flippant
- Direct. No hedging. No filler.
- Speaks like a smart, kind friend who has read a lot of philosophy but never mentions it

**Examples:**

| ❌ Don't | ✅ Do |
|---|---|
| "Please select your answer from the options below." | "What do you do?" |
| "Question 4 of 11" | A quiet progress bar. No numbers. |
| "Your results are ready!" | "Here's what we found." |
| "You are a Utilitarian thinker." | "You trust the math, even when it hurts." |
| "You are The Iron Idealist." | "You tend to defer to principle even when it costs the people you care about." |
| "Processing your responses..." | No loading state. Transition directly. |

---

## 3. Result Copy Principles

The distinction paragraph is the most important piece of copy in the product. It must feel like something a thoughtful person observed — not a personality quiz result, not a generated summary.

**What this rules out:**
- Fantasy or mythological vocabulary: Guardian, Warrior, Oracle, Shadow, Sage
- Character-class compound nouns: The Iron Idealist, The Silent Architect
- Results everyone would want — honest results occasionally sit slightly uncomfortably
- Vague generalizations: "You are empathetic and value fairness" — this describes almost everyone

**The test:** would a real person say this about themselves in a conversation, or to describe someone they know well? If not, rewrite it.

**Register:** second person, direct, specific. Name the actual axis tension. Don't explain the scoring system — speak about the person. "Your sense of fairness is unusually impartial — you hold strangers to the same standard as people you love, and that consistency shows up even when it costs you" is good. "Your E axis score indicates equal-weight proximity preferences" is not.

---

## 4. Typography

### Primary Font: Cormorant Garamond
- **Source:** Google Fonts (`https://fonts.google.com/specimen/Cormorant+Garamond`)
- **Why:** Elegant, thin, almost philosophical. Carries intellectual weight without feeling cold. Slightly dramatic, unmistakably literary.
- **Use for:** All headlines, question text, code display, distinction paragraph

### Secondary Font: Cormorant Garamond (Italic)
- **Use for:** Scenario setup text, scene descriptions, follow-up context, taglines
- Italics in Cormorant feel like a stage whisper — intimate, slightly cinematic

### Body/UI Font: Quattrocento Sans
- **Use for:** Answer button labels, axis labels, small UI text
- Should feel quiet next to Cormorant — functional, not competing

### Type Scale (mobile-first, base 16px)

| Role | Size | Weight | Style |
|---|---|---|---|
| Code display | 56px | 600 | Upright, tracked wide |
| Question text | 28–32px | 400 | Upright |
| Scenario setup | 18–20px | 400 | Italic |
| Distinction paragraph | 18px | 400 | Upright |
| Answer button label | 16px | 400 | Upright, UI font |
| Axis label | 13px | 400 | Upright, UI font |
| Caption / metadata | 13px | 300 | Upright |

### Line Height
- Question text: 1.5–1.6
- Distinction paragraph: 1.7 (needs room — it's being read carefully)
- Display/headline: 1.1–1.2

---

## 5. Color Palette

> **[SUPERSEDED — history only]** Replaced by §0.1 (pure black and white on paper, no accent). Do not build with the dark background or Monarch Orange below.

### Core Palette

| Name | Hex | Usage |
|---|---|---|
| **Charcoal** | `#1C1C1E` | Primary background, main surfaces |
| **Deep Charcoal** | `#111110` | Darkest backgrounds, illustration overlay |
| **Cream** | `#F5F0E8` | Primary text, light surfaces |
| **Warm White** | `#FAF7F2` | Cards, answer buttons (resting state) |
| **Monarch Orange** | `#E8652A` | Accent — CTAs, selected state, progress, code highlight |
| **Monarch Orange (dim)** | `#B34D1A` | Hover state, pressed state |
| **Muted Cream** | `#C8BFA8` | Secondary text, axis labels, disabled states |

*Note: "Monarch Orange" is the palette name for the accent color. The CSS variable is `--color-accent`. Always use the variable in code, never the hex directly.*

### Usage Rules
- `--color-accent` is used sparingly. It should feel like a flame — noticed because everything around it is dark. Never use it as a background fill for large areas.
- **The background is always dark.** Even on result screens. This is not a bright, clinical app.
- **Text on illustrations** uses cream with a subtle dark vignette — never a solid overlay.
- Answer buttons resting: Warm White text on semi-transparent dark (`rgba(255,255,255,0.07)`). Selected: accent border + text.
- **The code letters** are displayed in cream at large size. On the share card, each letter may be individually highlighted in accent to draw the eye.

### CSS Variables
```css
:root {
  --color-bg:           #1C1C1E;
  --color-bg-deep:      #111110;
  --color-cream:        #F5F0E8;
  --color-warm-white:   #FAF7F2;
  --color-accent:       #E8652A;
  --color-accent-dim:   #B34D1A;
  --color-muted:        #C8BFA8;
  --color-overlay:      rgba(17, 17, 16, 0.55);

  --font-display:       'Cormorant Garamond', Georgia, serif;
  --font-ui:            'Quattrocento Sans', sans-serif;

  --transition-slow:    600ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-medium:  350ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast:    180ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Tailwind Integration

Tern uses Tailwind CSS v4 with CSS-first configuration. The CSS custom properties above are defined in `src/styles/index.css` and referenced directly in Tailwind classes via `var()`. No `tailwind.config.js` theme extension needed in v4 — use arbitrary value syntax:

```html
<!-- Use CSS variables directly in Tailwind classes -->
<div class="bg-[var(--color-bg)] text-[var(--color-cream)]">
<button class="border-[var(--color-accent)] transition-[var(--transition-fast)]">
<h1 class="font-[var(--font-display)] text-[56px] tracking-[0.15em]">
```

For commonly reused combinations, use `@apply` in `index.css` rather than creating Tailwind theme tokens — this keeps the design system in one place (CSS variables) rather than splitting it between CSS and Tailwind config.

The component specs in Section 9 below give exact values. Use these directly in Tailwind arbitrary values rather than creating custom utility classes.

---

## 6. Illustration System

> **[SUPERSEDED — history only]** Replaced by §0.2 and §0.5: scenes are drawn in code, in the ink-on-paper style, inside the question card. No full-bleed sepia images and no AI image generation.

### Style
- **Hand-drawn, sketch aesthetic** — not photorealistic, not flat vector
- Black and white with sepia toning — warm, aged, like a woodcut or editorial illustration
- Linework intentional and slightly loose — human, not mechanical
- Each illustration evokes a scene, not a diagram. Atmosphere over accuracy.

### Generation Guidance (AI-assisted, V1)
> *"Editorial illustration, ink sketch style, sepia tone, high contrast, loose confident linework, no color, atmospheric, slightly dramatic — [scene description]. Style of New Yorker editorial illustration or vintage woodcut print."*

Avoid: flat vectors, realistic photography, anime/cartoon styles, anything that reads as obviously AI-generated.

### Sizing & Display
- **Full-bleed, full-screen** — fill the entire viewport
- Portrait, optimized for mobile (roughly 9:16)
- Dark gradient vignette overlays the bottom 50% where text appears
- Core files: `/public/illustrations/Q1.jpg`, `Q1-followup-a.jpg`, etc.
- Depth files: `/public/illustrations/depth/D1.jpg`, etc.
- Recommended resolution: 1080×1920px minimum

---

## 7. Screen Architecture

Six screens across the two assessment phases. No routing — pure state-driven rendering.

### Screen 1: Question Screen

Used for core set, depth graph, and exploration mode. The layout is identical across all three — the phase is invisible to the user.

```
┌─────────────────────────────┐
│                             │
│   [Full-bleed illustration] │
│                             │
│                             │
│▓▓▓▓ dark vignette ▓▓▓▓▓▓▓▓│
│                             │
│  [Setup text — italic]      │
│                             │
│  [Question — large serif]   │
│                             │
│  ┌─────────────────────┐   │
│  │   Answer option A   │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │   Answer option B   │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │   Answer option C   │   │
│  └─────────────────────┘   │
│                             │
│  [——————●————————————]      │  ← progress bar, no numbers, ever
└─────────────────────────────┘
```

**Depth phase:** no visual announcement when the depth graph begins. Questions continue seamlessly. The shift is felt in question quality, not labeled in UI.

**Exploration phase:** identical to depth phase visually. One addition: a quiet text link ("See your results") appears below the progress bar, styled in `var(--color-muted)` at 13px. This is the only way to distinguish exploration from depth visually — and only for the user, not an observer. When no questions remain, the system transitions back to the distinction reveal with the message *"You've explored everything we have."* displayed as setup text.

**Clarifying question:** when meaningful inconsistency triggers a clarifying question, a single quiet line appears above the setup text: *"Something came up that we want to explore."* No explanation of the tension. No accusatory framing. The question does the work.

### Screen 2: Follow-up Screen

Identical to Screen 1, except:
- Illustration **cross-fades** to the follow-up variant — this is the emotional beat
- Setup text updates to reflect the new context
- Image shifts first, question fades in after a beat

This is the most important transition in the app. It must feel like the world just changed.

### Screen 3: Convergence Offer

Appears when axis letters have stabilized before the core set is complete. Framed as discovery, not permission to stop.

```
┌─────────────────────────────┐
│                             │
│   [Same illustration —      │
│    held, not transitioning] │
│                             │
│▓▓▓▓ dark vignette ▓▓▓▓▓▓▓▓│
│                             │
│  We have a pretty clear     │
│  picture of you.            │
│                             │
│  Want to see what           │
│  we found?                  │
│                             │
│  ┌─────────────────────┐   │
│  │   Show me           │   │  ← goes to Code Reveal
│  └─────────────────────┘   │
│                             │
│  [Keep going ↓]             │  ← quiet text link, continues core set
│                             │
└─────────────────────────────┘
```

**Copy principle:** never say "you can stop" or "that's enough." The system found something and is offering to share it. The user is always in control of continuing.

### Screen 4: Code Reveal

The primary result screen. The code is the moment.

```
┌─────────────────────────────┐
│                             │
│   [Muted background —       │
│    abstract tern motif]     │
│                             │
│▓▓▓▓ dark vignette ▓▓▓▓▓▓▓▓│
│                             │
│  Your instinct is           │  ← small, italic, fades in first
│                             │
│  O C H L S                  │  ← large, tracked, cream, fades in
│                             │
│  O · outcomes               │  ← axis legend, muted, small
│  C · collective             │
│  H · heart                  │
│  L · loyalty                │
│  S · system                 │
│                             │
│  ┌─────────────────────┐   │
│  │   Go deeper  →      │   │  ← paid: enters depth graph
│  └─────────────────────┘   │
│                             │
│  [Share this  ↗]            │  ← free share action
│  [Start over  ↺]            │
└─────────────────────────────┘
```

**Code display:** the five letters are displayed large, with generous tracking, in cream. Below each letter, the axis label in muted small type — *O · outcomes*, *C · collective* — gives immediate legibility without requiring prior knowledge of the system. Users can read their result without a manual.

**Reveal animation:** the letters do not appear all at once. They materialize one at a time, left to right, each with a brief pause — as if the system is deciding. Total reveal time: ~2.5 seconds (see Section 8 for exact spec). This is the payoff of the whole experience. It should feel like a moment.

### Screen 5: Distinction Reveal

The distinction result screen. Code + one-line summary + full radar chart + axis breakdown + distinction paragraph.

```
┌─────────────────────────────┐
│                             │
│   [Muted background]        │
│                             │
│▓▓▓▓ dark vignette ▓▓▓▓▓▓▓▓│
│                             │
│  O C H L S                  │  ← code, smaller than Code Reveal
│                             │
│  [Radar chart — 5 axes]     │  ← fills the middle section
│                             │
│  [Distinction paragraph —   │
│   3–4 sentences, large-ish  │
│   serif, cream, reads like  │
│   something someone said    │
│   about you]                │
│                             │
│  ┌─────────────────────┐   │
│  │   Share this  ↗     │   │
│  └─────────────────────┘   │
│                             │
│  [Keep exploring  ↓]        │
│  [Start over  ↺]            │
└─────────────────────────────┘
```

**Distinction paragraph placement:** below the radar chart, in Cormorant Garamond at 18px. It should feel like it's being read, not scanned. Give it space.

**Radar chart:** five axes, accent fill, animates outward from center on entry. Axes are labeled. The visual contrast between a tight chart and a wide one — between someone who sits close to the midpoint on everything and someone who scores extreme on all five — should be immediately readable.

**Final report readability requirements (non-negotiable):**
- Present information in this fixed order:
1. Code (hero)
2. One-line plain-language summary
3. Radar chart
4. Axis breakdown (5 short rows)
5. Distinction paragraph
- Keep each axis row to one line: `[LETTER] [Pole name] — [short plain-language gloss]`
- Avoid technical scoring language (`normalized`, `nudge`, `threshold`) in user-visible copy.
- Distinction paragraph is 3–4 sentences max, with average sentence length under 22 words.
- Use one key tension sentence at most; avoid stacking multiple abstract tensions in one paragraph.
- If a sentence exceeds two commas, split it.
- Keep line length readable on mobile by constraining paragraph width to content max-width and 1.7 line height.
- Maintain contrast priority: code > summary > paragraph > axis metadata.

**Suggested one-line summary format:**
- `You lean [pole], [pole], and [pole] — with your strongest signal in [axis].`
- Purpose: orient quickly before chart reading; not a replacement for the paragraph.

### Screen 6: Share Card (generated image)

- 1080×1080px square
- Charcoal background, faint Arctic Tern silhouette watermark
- Code letters large, tracked, cream — the hero element
- Axis legend in muted small type below the code
- Code + legend + Tern wordmark
- If distinction is available: code + radar chart (small) + first sentence of distinction paragraph + Tern wordmark

#### Share Card Generation

The share card is rendered using `html-to-image` from a **hidden off-screen component** (`ShareCard.jsx`). The component is always mounted when the share screen is active but positioned off-viewport (`position: absolute; left: -9999px`). It renders at a fixed 1080×1080px regardless of device viewport.

When the user taps "Share this":
1. `html-to-image` captures the hidden component as a PNG blob
2. The share flow is attempted in this order:

**Primary — Web Share API (mobile):**
```js
if (navigator.share && navigator.canShare({ files: [file] })) {
  navigator.share({ files: [pngFile], title: 'My Tern code', text: `I'm ${code}` })
}
```
This opens the native share sheet (iMessage, WhatsApp, Instagram Stories, etc.) with the image attached.

**Fallback — Download (desktop and unsupported mobile):**
```js
// Create a download link with the PNG blob
a.download = `tern-${code}.png`
```
Downloads `tern-OCHLS.png` (or whatever the code is) directly.

**Share content:** Image only. No link back to Tern in V1 (no backend to resolve). The Tern wordmark on the card serves as branding.

#### iOS Safari Known Issue

`html-to-image` has inconsistent rendering on iOS Safari — particularly with custom fonts and CSS transforms. Mitigations:
- Use `toPng()` with `pixelRatio: 2` for retina quality
- Ensure Cormorant Garamond is fully loaded before capture (`document.fonts.ready`)
- If `toPng()` fails, retry once with `toCanvas()` fallback
- If both fail, show a quiet message: *"Screenshot your result to share it"* — do not break the experience

---

## 8. Animation System

### Core Principle
> **The scene breathes. The user waits, just a moment, and the moment is worth it.**

Deliberate pacing signals that what's happening matters. Every animation should feel like something earned, not endured.

### Transition Types

#### Scene Entry (new question)
1. Previous screen fades to black — `400ms`
2. New illustration fades in — `800ms`, slow, like developing in a darkroom
3. Setup text fades up (opacity 0→1, translateY 12px→0) — `500ms`, delayed `300ms`
4. Question text — same treatment, delayed `600ms`
5. Answer buttons stagger in — `100ms` apart, starting at `900ms`

Total time to fully readable: ~1.4 seconds. Deliberate, not slow.

#### Follow-up Illustration Swap (the emotional beat)
1. Current illustration fades to 0 — `600ms`
2. New illustration fades in — `800ms`
3. Question text cross-fades simultaneously — content changes as image changes

This is the most important animation in the app. It must feel like the world just shifted. Never update text and image simultaneously — the image leads.

#### Phase Transitions (convergence offer, code reveal, distinction reveal)
Slower and more deliberate than question transitions. These are arrival moments.
1. Fade to black — `600ms`
2. New screen fades in — `1000ms`
3. Text elements stagger — `800ms` before first element, `400ms` between elements

#### Code Letter Reveal (special)
The five letters materialize one at a time, left to right.
1. Each letter: opacity 0→1, scale 0.8→1.0 — `300ms` per letter
2. Pause between letters: `200ms`
3. Total reveal: ~2.5 seconds including pauses
4. After all letters: axis legend fades in — `500ms`, delayed `300ms`

This is a designed moment. Do not rush it. Do not reveal all letters simultaneously.

#### Answer Selection
1. Tapped button: border → `var(--color-accent)`, text → accent — `180ms`
2. Other buttons: fade to 40% opacity — `180ms`
3. `300ms` pause, then scene transition begins

#### Progress Bar
- Fills left to right using `var(--color-accent)`
- Smooth width transition — `400ms ease`
- No numbers. No labels. No percentage. Just the bar.
- In depth phase: tracks axis confidence — may advance unevenly, which is honest

#### Radar Chart Entry
- Axes animate outward from center — each draws in sequence, `600ms` total
- Fill fades in after axes complete — `300ms`

### CSS Animation Tokens
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes illustrationIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes selectPulse {
  0%   { border-color: transparent; }
  100% { border-color: var(--color-accent); }
}

@keyframes phaseIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes letterReveal {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1.0); }
}
```

---

## 9. Component Specs

### Answer Button
```
Background:    rgba(255, 255, 255, 0.06)
Border:        1px solid rgba(255, 255, 255, 0.12)
Border-radius: 8px
Padding:       16px 20px
Font:          UI font, 16px, color: var(--color-cream)
Min-height:    56px
Width:         100%

On hover:
  Background: rgba(255, 255, 255, 0.10)
  Border:     1px solid rgba(255, 255, 255, 0.20)
  Transition: var(--transition-fast)

On selected:
  Border:     1.5px solid var(--color-accent)
  Color:      var(--color-accent)
  Background: rgba(232, 101, 42, 0.08)
```

### Progress Bar
```
Container: full width, height 2px, background rgba(255,255,255,0.12)
Fill:      var(--color-accent), height 2px
Position:  fixed bottom, full width
No label. No percentage. No question count. Ever.
```

### Code Display
```
Font:          Cormorant Garamond, 56px, weight 600
Letter-spacing: 0.15em
Color:         var(--color-cream)
Layout:        centered, single row
```

### Axis Legend (below code)
```
Font:     Quattrocento Sans, 13px, weight 300
Color:    var(--color-muted)
Layout:   centered column, 6px gap between rows
Format:   "[LETTER] · [pole name]" — e.g. "O · outcomes"
```

### Distinction Report Block
```
Order:
  1) code (hero)
  2) one-line summary (16px)
  3) radar chart
  4) 5-row axis breakdown
  5) distinction paragraph

Axis breakdown row:
  Font:      Quattrocento Sans, 14px
  Color:     var(--color-muted)
  Spacing:   8px vertical
  Example:   "O · outcomes — you optimize for net impact."

Paragraph:
  Font:      Cormorant Garamond, 18px
  Lineheight:1.7
  Max width: 38ch
  Margin-top:20px
```

### Vignette Overlay
```css
.vignette {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 65%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(17, 17, 16, 0.4) 30%,
    rgba(17, 17, 16, 0.85) 60%,
    rgba(17, 17, 16, 0.97) 100%
  );
}
```

---

## 10. Motion Accessibility

All animations respect `prefers-reduced-motion`. When reduced motion is preferred: crossfades replace slides/transforms, illustration swap is instant, code letter reveal shows all letters simultaneously.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Mobile-First Layout

- Base design: 390px wide (iPhone 14 viewport)
- Max content width: 480px, centered on larger screens
- Text padding: 24px horizontal
- Answer button stack: 12px gap
- Bottom safe area: `env(safe-area-inset-bottom)`
- Illustrations: `object-fit: cover`, `object-position: center top`

---

## 12. PWA Shell

- `display: standalone`
- Status bar: `black-translucent`
- Theme color: `#1C1C1E`
- Splash screen: charcoal background, Tern wordmark centered in Cormorant Garamond
- App icon: Arctic Tern silhouette on charcoal, accent orange detail

---

## 13. What This Is Not

- **No bright white backgrounds.** This is not a clinical survey.
- **No progress numbers.** "4 of 11" turns a mirror into a test.
- **No confetti, celebrations, or gamification rewards.** The insight is the reward.
- **No purple gradients.** No glassmorphism. No generic SaaS aesthetic.
- **No sans-serif headlines.** Cormorant is non-negotiable for display text.
- **No busy layouts.** One question. One image. Choices. Nothing else.
- **No rushed transitions.** If an animation feels fast, slow it down.
- **No kitschy result copy.** See Section 3.
- **No announced phase transitions.** Core-to-depth is invisible. Users don't need to know the system changed gears.
- **No loading states.** Design so transitions are immediate. If something must load, the illustration preloading strategy in `docs/ARCHITECTURE.md` handles it.

---

*Tern Design System — maintained alongside the codebase. Any visual changes must be reflected here first.*
