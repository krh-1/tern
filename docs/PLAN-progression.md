# Plan — Progression, Map, and the Living Portrait

> **Status (2026-10-05):** built. All five worlds are live in `game/`, and the spec docs were rewritten to the built game, so they now describe the details; this file stays as the record of the approved direction and Ken's rulings (§10). Not built from this plan: clarifying stops (✦), the portrait paragraph at 12, compare with a friend, share a single question, the magic-link save. See `docs/NEXT-STEPS.md`.

---

## 1. The big why

The old model was **test, then result**: answer 11 questions in a fixed order, then get a code. Nothing pays off until the end, so every question before it feels like homework.

The new model is a **running mirror**. From the very first answer, Tern tells you something about yourself, and the picture sharpens with every question. You can stop at any point and still leave with something true and shareable. You come back because more of the world, and more of you, is still waiting to be uncovered.

Three things carry this:

1. **The map** — every question is a place you can walk to. You can see what you've done and what's still out there.
2. **The portrait** — a "who you are" panel that starts writing itself after your first answer and grows as you go.
3. **Unlocks** — answering more reveals more, about you and about the world. The game is uncovering yourself.

**What stays sacred:** hard questions with no escape answers; the illustration changing *before* the text on a follow-up; the letter-by-letter code reveal; plain, human language about the person (never cute archetype names).

**Look and feel (ratified 2026-09):** everything in this plan is drawn in the ink-on-paper park style in `docs/DESIGN.md` §0: pure black and white, code-drawn, calm and cozy, with no wayfinding, and the Puff characters (name and look only). The session starts with the character select modal over the live map (§0.7). New UI such as the portrait panel, markers and unlock moments must match that style and its low-intensity motion.

---

## 2. The screen

```
┌──────────────────────────────────────────┬─────────────────────────┐
│                                          │  YOU, SO FAR            │
│            THE MAP (park)                │  "You keep your word,   │
│                                          │   even when it costs."  │
│    ✓ trolley     ○ jury                  │  One-line description.  │
│         ○ pond        ✓ bank card        │─────────────────────────│
│   ✓ 2 a.m. call          ○ promotion     │  Tendencies  (chips)    │
│              [you]                       │  You protect / You'll   │
│   ○ queue    ○ dinner    ○ button        │  trade away             │
│                                          │  Your compass (5 bars)  │
│   ░░ locked: the neighborhood ░░         │  Where you're torn      │
│                                          │  Notes on each answer   │
│                                          │─────────────────────────│
│                                          │  NEXT: ●●○  your first  │
│                                          │  tension                │
└──────────────────────────────────────────┴─────────────────────────┘
```

- **Desktop / landscape:** map on the left, portrait panel on the right, always visible.
- **Phone / portrait:** the map fills the screen; the portrait is a bottom sheet you pull up. A small glow on its handle means something new was revealed.
- **The question card** rises over the map, as in the park prototype. After you answer, it settles back and the portrait panel animates the new insight in. Order matters: the answer lands, *then* the portrait updates, so each insight feels caused by what you just chose.

---

## 3. The map

**Every question is on the map.** Ken's direction: all questions visible, with markers for done and not done.

| Marker | Meaning |
|---|---|
| **○ open** | Not answered yet. The "?" bubble pops when it comes on screen (as in the prototype). |
| **✓ done** | Answered. Tapping it re-reads your answer and its note, with "Answer again" to redo that one question (Ken, 2026-09-27). |
| **◆ calling** | A question the portrait most wants you to answer next, because it's least sure about one part of you. A soft glow on the stop itself, only once it's on screen: never an arrow or an edge pointer (AGENTS.md "No Wayfinding"). This replaces the old adaptive "depth graph": it's a suggestion, not a forced path. |
| **✦ new** | A stop that just appeared, for example a clarifying question: *"Something came up that we want to explore."* |
| **░ locked** | A region you can see but can't enter yet. It is fogged or sketched in, so you know it's there. |

**No "7 of 12" anywhere on the map.** A region shows its completion only as filled and empty markers.

### Worlds

Each world has a theme, and the setting carries that theme, so the place itself says what kind of question lives there.

| # | World | Theme | Unlocks when | Sample questions |
|---|---|---|---|---|
| 1 | **The Park** | The core 12: the shared questions everyone answers | From the start | See section 6 |
| 2 | **The Neighborhood** | The people closest to you: family, friends, partners, neighbors | All 12 core answered | B10 parents & marriage, B24 dog or stranger, B45 friend's big break, B44 unlocked phone, B42 the rumor, B43 the apology, B56 the quiet loan, B55 the bent rule, B46 the nightly call, B36 forgiveness, Q3 confession, Q5 inheritance, D1 the promise about the home, D7 the fiancé |
| 3 | **The City** | Rules, work and institutions: law, jobs, power | Most of the Neighborhood | Q11 self-driving car, B12 two drivers, B03 reference, B04 company line, B05 the mistake, B30 permit fee, B32 call-up, B33/B34 punishment, B35 true story, B41 borrowed credit, Q8 coworker, Q9 protest, Q10 bystander, D3, D5, D6, D10, D11 |
| 4 | **The Coast** | Strangers and sacrifice: people far away and not yet born | Most of the City | B15 lifeboat, B19 kidney, B20 weapons job, B22 200-year deal, B23 happy city, B25 slaughterhouse, Q2 wallet, Q4 Saturday, D2, D4, D9, D12 |
| 5 | **The Observatory** (hilltop, or desert at night) | The self: reality, memory, meaning, the future | Most of the Coast | B47 life machine, B48 erased memory, B49 two lives, B14 proud thing, B26 robot, B27 AI companion, B39 edited child, B06 manuscript, B08 family secret, B11 bully's son, B16 shared bonus, B17 late paper, B38 the group, B57 dream job, B54 review, quick reads B50–B52 |

The assignments above are a first cut; they get balanced once the core set is final. New questions from the future question pipeline land in whichever world matches their theme, so worlds keep growing.

**World unlocks (ruled):** the Neighborhood needs all 12 core questions; each later world needs about two-thirds of the previous one.

---

## 4. The portrait ("who you are")

### What sits at the top: the headline

Ken's ruling: no cheesy archetypes and no MBTI-style labels, but a short, plain, shareable phrase that describes you, built directly from your choices.

**Recommendation: a headline plus a one-line description.**

> **You keep your word, even when it costs you.**
> You'd rather be trusted than be right, and you judge people by what they meant, not by how it turned out.

- The headline is one plain sentence that starts with "You", built from your strongest tendency. The test is whether a real person would say it about a friend.
- The description is one or two sentences that add your next-strongest traits.
- It is **provisional early** ("So far: …") and allowed to change. When it shifts, the panel says so: *"Your headline changed."* That shift is itself a revealing moment.

### What sits under it, in the order it unlocks

| Section | What it is | Example |
|---|---|---|
| **Answer notes** | One or two sentences after each answer about what *that* choice suggests. The log of how the portrait was built. | *"You wouldn't lie to the police for your sibling, but you wouldn't turn them in either… (answer 3)"* |
| **Tendencies** | Three to five short "You…" statements, each backed by at least two answers. Shareable as chips. | *You step in. · You tell hard truths. · You avoid open conflict at home.* |
| **You protect / You'll trade away** | Ken's "likes / dislikes" idea in plainer words: what you hold onto under pressure, and what you give up first. | *Protect: promises, family, the person in front of you. Trade away: rules, your own comfort.* |
| **Your compass** | The five value axes as simple bars that fill in as evidence arrives. Each bar has a plain label at each end, like "Loyalty ← → Principle". | Bars appear one by one as each axis gets signal. |
| **Where you're torn** | Tensions: places where two of your answers pull against each other. This is often the most interesting thing Tern can tell you. | *"You'd sacrifice one stranger to save five, but not someone you love. Your math has a family exception."* |
| **Your code** (after the core 12) | The five-letter code, revealed one letter at a time, plus the radar chart. The compact thing friends compare. | `OCHLS` |
| **Chapters** (one per later world) | A short section per world, for example "With the people closest to you" or "Inside institutions". | Added when a world is mostly done. |

### Other formats considered for the top, and why they weren't chosen

| Format | Verdict |
|---|---|
| **Likes / dislikes** | Kept, reworded as *You protect / You'll trade away* ("likes" sounds like taste, not values). Too list-like to be the headline, so it sits just below. |
| **Biases** | Sounds like an accusation, and a *bias* claims you're wrong. Better phrased as *tendencies*. |
| **Temperament** | Sounds fixed and clinical. Tern reads choices, not inborn temperament. |
| **Moral compass** | Good as the name for the five-axis bars (a visual). Weak as the headline, because a compass is abstract. |
| **Several phrases at the top** | Works as the *tendency chips* under one headline. One headline stays more memorable and shareable. |

**Portrait text (ruled):** **an authored library of tendency statements with clear rules for when each one appears.** It's auditable, can't drift into kitsch, and is honest about the evidence ("based on 3 of your answers"). A language model can later polish the description paragraph, built on top of the library rather than replacing it. The alternative, having a model write everything freely, reads more naturally but is harder to trust and harder to test.

A starting set of tendency statements, each needing at least two supporting answers before it shows:

- You keep your word, even when it costs you.
- You'd bend a rule to protect someone you love.
- You judge people by what they meant, not how it turned out.
- You tell hard truths.
- You soften the truth to spare people.
- You avoid open conflict. *(the existing conflict-avoidance pattern, now surfaced plainly)*
- You step in.
- You'd rather watch than act.
- Distance doesn't change your duty.
- You look after your own first.
- You follow the rules, even when no one's watching.
- You break rules you think are unjust.
- You count the numbers.
- You go with your gut about people.
- You're harder on yourself than on others.
- You give second chances.

---

## 5. The unlock ladder

Unlocks trigger on **how many questions you've answered**, not on which ones. Because of free roam, the core set must be balanced enough that any few answers say something. The judge check in section 6 tests exactly that.

| After | You unlock | How it's shown |
|---|---|---|
| **1 answer** | Your first **answer note**, plus the portrait panel appears | The panel slides in for the first time. |
| **2** | Your first **compass bars** (the axes you've touched) | Bars draw in. |
| **4** | Your **headline**, marked "So far" | A reveal moment: slower, centered, like the code reveal. |
| **6** | **You protect / You'll trade away** | |
| **8** | **Where you're torn**: your first tension | Only shown if a real tension exists. Otherwise it waits and the next item comes first. |
| **10** | **All five compass bars** are filled | |
| **12 (all core)** | **The full portrait**: the code revealed letter by letter, the radar chart, a portrait paragraph and a share card. **The Neighborhood opens.** | The biggest moment in the game: the code reveal, then the fog lifts off world 2. |
| **Each later world, mostly done** | A new **chapter** in your portrait, the next world opens, and your headline may sharpen | |
| **Any time** | Clarifying stops appear (✦) when two answers seem to conflict | *"Something came up that we want to explore."* |

**Telling people what's next.** The bottom of the panel always shows the *next locked item* as a card: its name, and how close you are.

**Dots, not numbers (ruled).** The rule "No Progress Numbers, Ever" exists because "Question 4 of 11" makes people rush. So closeness is **shown as dots (●●○), not digits, and total questions are never counted.** "Two dots to your headline" gives the pull of an unlock without the feel of a test.

**Kept from the old rules:** no points, no badges to collect, no streaks, no leaderboards. The rewards are information about you and new places to explore. Ken's ruling: *"if it comes off like a game, so be it."*

---

## 6. The core 12 (the Park)

The fixed set everyone sees. It's the social layer ("did you pull the lever?") and the path to your first full portrait.

**Selection criteria:**
- Impact: iconic, discussable, hard.
- Balance: every value axis gets at least four strong probes.
- Fast insight: any four answers support a real headline.
- Mix: heavy and light, varied settings, not all workplace.
- Together, all 12 add up to a meaningful full portrait.

**Proposed core 12** (my first pick, then a judge check that swapped four; full reasoning in `docs/question-bank-wip/judge-core.md`):

| # | Question | What it reads | Axes (primary) | Weight |
|---|---|---|---|---|
| 1 | **Q1 The Trolley** (escalating: stranger → your mother → your child vs 100) | Harm, and where your math has a family exception | O, L, H | heavy |
| 2 | **B09 The 2 A.M. Call** | Loyalty to family vs the law, and an innocent stranger | L, S | heavy |
| 3 | **B02 The Deathbed Question** | Honesty vs comfort at the very end | H, O | heavy |
| 4 | **B13 Two Worlds** | Security for everyone vs a better average | C | light |
| 5 | **B18 The Pond and the Faraway Child** | Whether distance changes duty | L, H | heavy |
| 6 | **B29 The Jury** | Law vs mercy, and whether sympathy is doing the work | S, H | medium |
| 7 | **B37 The Bank Card** | Which version of a person gets to decide | C, O | medium |
| 8 | **D8 The Waiting List** (hip surgery; "father", not "mother", to avoid echoing Q1) | Your person vs the people ahead of them in line | C, S | medium |
| 9 | **B40 The Dinner Joke** | Everyday courage in a room of your own people | S, L | medium |
| 10 | **Q6 The Promotion** | Giving something up for someone else, at real cost | H, C | medium |
| 11 | **B21 The Million-Dollar Button** | Your gain vs a small harm spread across strangers | C, O | light |
| 12 | **B01 The Invisible Year** | Who you are when no one's watching, and whether you trust people | S | light |

**Axis coverage:** every axis has at least four primary probes (O 4 · C 6 · H 5 · L 4 · S 5). **Weight:** 4 heavy, 5 medium, 3 light. There is only one workplace scene.

**What the judge swapped out, and why:**
- **Q11 The Self-Driving Car** → D8. With the trolley, the pond and the dog, that was four "who do you save" questions.
- **B12 Two Drivers** → B13. Opposite kinds of reasoner give the same answer to B12, so it reads the person less clearly.
- **B24 The Dog or the Stranger** → Q6.
- **B45 The Friend's Big Break** → B01. Envy isn't one of the five axes, and few people will honestly answer "the sting."

All four stay in the library and move to later worlds, where they remain crowd-pleasers.

**First stops a new player is likely to walk into:** B21 (light, answered in seconds) and Q1 (the social hook). Place B02 and B09 deeper into the park, so a random walk doesn't open with three heavy scenes in a row.

**Fast-insight check:** the judge ran random sets of four through the ladder. Each produced a real, non-generic headline, for example *"You'll protect people from the rules, but you won't let anyone else pay for it."*

**After all 12:** the code reveal, the full portrait, final protect/trade lists, "where you're torn" quoting your actual answers, a "compare with a friend" prompt, and world 2 opening. The world 2 stop that glows first targets your least-certain axis.

---

## 7. Stop, save, share, come back

| Need | Plan |
|---|---|
| **Stop any time** | Nothing is lost mid-question. Closing the app during a question just leaves that stop open. |
| **Save** | Autosave after every answer. V1 saves on the device. An optional email magic link (a one-time sign-in link, no password) for syncing across devices comes in Phase 4. Full accounts come later. |
| **Share your portrait** | A share card at any milestone: your headline and top tendencies, marked "So far" before the core is done, plus the code and radar after 12. It links back to Tern. |
| **Share a single question** | "Would you give back the bank card?" sent to a friend. They answer it, then see how you answered. This is the strongest growth loop: it starts the argument that the social layer exists for. |
| **Compare** | After both people finish the core 12: side-by-side headlines, codes, and the questions where you split. (Friend-to-friend only; crowd statistics like "62% pulled the lever" are not in V1.) |
| **Come back** | You return to the map where you left off. Any ◆ calling stop glows, and the panel shows the next unlock. |

---

## 8. Changes to existing rules and docs

Ken's rulings from 2026-09-27 are recorded in `AGENTS.md`. The spec docs are updated **after** this plan is approved.

| Existing rule (AGENTS.md / VISION) | Change |
|---|---|
| **No Named Archetypes** | *Amended:* still no archetype names or type labels. Plain, generated "You…" statements drawn from the user's own choices are now the headline. |
| **Game-feel, not gamification** | *Amended:* unlocks are explicitly in, because revealing information is the reward. Still no points, badges, streaks or leaderboards. |
| **Core set: same questions, same order** | *Amended:* same 12 questions for everyone, in any order (free roam). |
| **Two-phase model** (core → depth graph) | *Replaced:* worlds plus "calling" stops. The depth graph survives as the logic behind which stop glows ◆ and when a clarifying stop appears. |
| **Convergence offer** ("we have a clear picture, want to see it?") | *Replaced* by the unlock ladder: you see something from the first answer on. |
| **No Progress Numbers** | *Amended:* dots for unlock closeness; still no question counts or percentages. |
| **Code reveal letter by letter** | *Kept:* it is the 12-question moment. |
| **Paid tier = distinction paragraph** (VISION, V2) | *To revisit:* the portrait is now incremental, so the free/paid line needs redrawing later. Not needed for V1. |

**Docs to update after approval:** `VISION.md` (the model), `ARCHITECTURE.md` (state: from phases to worlds, unlocks, portrait, map markers), `DESIGN.md` (map, panel, reveal moments, share; the visual direction in §0 is already done), `QUESTIONS.md` (the core 12, world tags), `SCORING.md` (portrait from partial answers, tendency rules, confidence per axis), `prototypes/PLAN.md` (swap stops to the new core 12; add the panel).

---

## 9. Roadmap

The phased roadmap lives in `docs/VISION.md` → **Roadmap**, the single source for sequencing. In short:

| Phase | What | Ends with |
|---|---|---|
| **0. Question library** ✅ | Expansion, three judge passes, existing set revised, core 12 proposed | Done 2026-09 |
| **1. Decide and design** (now) | Ken's rulings (§10), answer notes for the core 12, tendency library, spec docs updated | Ken approves the spec |
| **2. Feel it** | Park prototype: 12 stops, markers, portrait panel, unlock moments | Ken: "this feels right" |
| **3. V1: the Park** | Partial-answer scoring, unlock ladder, portrait engine, code reveal, save and share, code-drawn scenes for the core 12 | V1 ship |
| **4. V1.x: more worlds** | Neighborhood → City → Coast → Observatory, compare with a friend, how others answered, cross-device save | Each world ships on its own |
| **5. V2+** | Question pipeline feeding worlds, monetization redraw, accounts, Parenting domain, social | — |

---

## 10. Decisions (all ruled by Ken, 2026-09-27)

| # | Decision | Ruling |
|---|---|---|
| 1 | World unlock rule | **All 12 core → the Neighborhood; about two-thirds of each world → the next.** |
| 2 | How portrait text is written | **An authored library of "You…" statements with rules for when each appears** (needs 2+ supporting answers). A language model may later polish only the one-line description. |
| 3 | Unlock meter | **Dots (●●○○), no numbers.** Never a total question count. |
| 4 | Save | **On-device autosave in V1; optional email magic link in Phase 4.** |
| 5 | Core 12 | **Approved: the judge's 12** (§6). D8 uses "father". |
| 6 | Can the headline change? | **Yes, and it says so** ("Your headline changed"). Marked "So far" until the core 12 are done. |
| 7 | World names | **Park → Neighborhood → City → Coast → Observatory.** |
| 8 | How others answered | **Not in V1.** The mirror stays purely about you; revisit later. |
| 9 | Conflict avoidance | **Becomes the tendency "You avoid open conflict,"** detected across B40, Q3, B43 and B56. |
