# Vision — Tern

## What Tern Is

Tern is a values and decision-style assessment framework. Through scenario-based dilemmas with branching follow-up questions and illustrated scenes, it surfaces the instincts and philosophies people already carry — the beliefs and values that shape every choice they make, often without their awareness.

It is not a quiz. It is a mirror. And it should feel like a game — not in the cheap sense of points and badges, but in the sense that every question makes you want the next one, every reveal feels earned, and the whole experience has the quality of something you're moving through rather than enduring.

The name comes from the Arctic Tern: a bird that migrates pole to pole — the longest journey of any animal on Earth — guided by something built in. No map. No instruction. Just instinct honed over millions of years. Tern the product works the same way. It doesn't teach you your values. It helps you read what was already there.

---

## The Framework

Tern's engine is domain-agnostic. Every domain uses the same underlying structure:

**Scenarios** — branching dilemmas that probe real tradeoffs. Each scenario has a trunk question and optional follow-ups that shift the context, raising the stakes or changing who is affected. The follow-up is where the most revealing data lives.

**Axes** — the philosophical dimensions most relevant to the domain. Every answer nudges one or more axes. Scores are computed continuously. Each axis produces a single letter — one pole or the other — based on which side a user lands on at the end of the assessment.

**The Code** — a short string of letters, one per axis, that captures the user's profile across all dimensions. Like MBTI but specific to this domain. Instantly shareable. Immediately discussable. The thing you tell someone at a party.

**The Distinction** — a paid-tier result that adds two layers to the code: a radar chart showing axis magnitudes (two people can share a code but have very different charts), and a generated paragraph that describes what's most specific, extreme, or tensioned about this particular profile based on their depth path. The paragraph is the thing that makes a user feel seen rather than sorted.

**Share card** — a visual, portable result. Something worth showing someone. A conversation starter.

---

## Game Feel

Tern should feel like a game. This is a design principle, not a feature.

The distinction between game-feel and gamification is precise: gamification is extrinsic reward layered on top of content — points, badges, streaks, leaderboards. Game-feel is intrinsic to the experience design itself. It's the quality of wanting the next thing before the current thing is finished. It's pacing, anticipation, the satisfaction of a reveal, the sense that something is being built toward.

Tern has this structurally if it's built right:

- A well-written dilemma with a genuinely hard choice creates engagement the moment it's read
- The follow-up illustration swap — the world shifting before the question changes — is a mechanic that rewards attention
- The convergence offer is a reveal moment: the system signals that it knows something
- The code reveal is the payoff of the core experience
- The distinction paragraph is the deeper payoff for people who kept going

None of these require extrinsic reward. The engagement is intrinsic to the content and the pacing. The job of every design decision is to protect and amplify that quality — never to flatten it with friction, clinical language, or a feeling of assessment rather than exploration.

**Specific implications:**

- Questions should feel like they were chosen for you, not like the next item in a list
- Transitions should create anticipation, not just move you from one screen to the next
- The depth graph should feel like going deeper into something interesting, not answering more questions
- The code reveal should feel like a moment, not a result
- The distinction paragraph should feel like something a perceptive person said about you, not a generated summary

---

## The Progression Model (2026-09 — approved)

> **This is the direction going forward.** Ken set it on 2026-09-27; the full plan is in `docs/PLAN-progression.md`. It replaces "test, then result" with a **running mirror**. The two-phase section below is kept for history. Its ideas (the fixed shared set, adaptive routing, clarifying questions, the code) survive inside this model in a new form.

**The idea:** Tern starts telling you who you are from your first answer, and the picture sharpens with every question. You can stop at any point and leave with something true and shareable. You come back because more of the world, and more of you, is still waiting to be uncovered.

- **The map.** Every question is a place you can walk to. Markers show what you've answered and what's still open. Locked regions are visible but fogged. A soft glow marks the question the portrait most wants you to answer next; that glow is what's left of the old adaptive routing.
- **The portrait.** A "who you are" panel sits beside the map. At the top is a plain headline about you, starting with "You" (for example *"You keep your word, even when it costs you"*), with a one-line description. Below it: notes on each answer, tendencies, what you protect and what you'll trade away, your five value axes, where you're torn, and, after the core, your code.
- **Unlocks.** More answers reveal more. After 1 answer, a note on that answer; after 4, your headline; after 6, protect / trade away; after 8, your first tension; after all 12 core questions, the full portrait with the code reveal, and the next world opens. The rewards are information about you and new places to explore. Still no points, badges, streaks or leaderboards.
- **Worlds.** The Park holds the **core 12**: the same questions for everyone, in any order. Later worlds group the rest of the library by theme: the Neighborhood (people close to you), the City (rules and institutions), the Coast (strangers and sacrifice), and the Observatory (the self).
- **Stop, save, share, come back.** Progress autosaves after every answer. You can share your portrait at any milestone, or send a single question to a friend and compare answers.

**Amended principles:** plain "You…" statements are allowed (still no archetype names or type labels); unlocks are allowed (still no points or badges); the core set is fixed but its order is free.

---

## The Two-Phase Assessment Model

> **Being replaced** by the Progression Model above. Kept for history; to be rewritten once Ken approves `docs/PLAN-progression.md`.

This is a core architectural decision, not a feature. Every domain uses it.

### Phase 1 — Core Set (Fixed, Universal)

Every user answers the same questions in the same order. This is non-negotiable. The core set is the shared reference point that makes Tern a social tool — users can compare notes, ask each other how they answered the trolley problem, and recognize themselves in each other's results. If users get different core questions, that social layer collapses entirely.

The core set is designed to cover all axes with enough signal to produce a reliable code. After completing the core set — or earlier if convergence is detected — the user receives their code and an invitation to continue.

**Convergence detection:** the scoring engine runs continuously during the core set. If all five axis letters have stabilized before the core set is finished, the system offers an early exit — framed as an invitation, not a shortcut: *"We have a pretty clear picture of you. Want to see what we found, or keep going?"* Continuing always sharpens the radar chart and feeds the distinction. It never changes the code.

### Phase 2 — Depth Graph (Adaptive, Optional)

After the code is revealed, users are invited to continue into the depth graph. This is a branching network of questions — not a fixed sequence. Entry into the graph is determined by which axes have the lowest confidence after the core set. Navigation within the graph is determined by axis confidence: each new question targets the axis or tension the system understands least about this particular user.

The depth graph is large. Any individual user sees only a small portion of it — typically 4–7 questions. Users who want to go deeper can keep going. Eventually the full question library becomes explorable.

**Meaningful inconsistency:** when the depth graph detects that a user has answered two questions in apparently contradictory ways, it surfaces a clarifying question transparently — *"Something came up that we want to explore."* The clarifying question does the work; the system doesn't explain the tension. This only happens when the inconsistency is genuinely ambiguous. The question library is designed so that apparent inconsistency is almost always meaningful — two different framings of the same axis producing different answers — rather than noise.

**The distinction:** when the depth graph has gathered enough signal, the distinction is produced. Its two core analytic components are:

- A sharpened radar chart showing axis scores with depth-graph precision — magnitudes, not just letters
- A generated paragraph, 3–4 sentences, that describes what is most specific, extreme, or tensioned about this particular profile: where scores are unusually strong, where two axes pull against each other, what the depth path revealed about how values interact under pressure

In the final report UI, these are presented with a one-line plain-language summary and a short axis breakdown for scan readability.

The paragraph is not template-filled copy. It is generated from the actual shape of the scores and the specific questions answered. Two users with identical codes can receive genuinely different paragraphs.

### Exploration Mode

After the distinction is revealed, users can continue exploring questions they haven't seen. The system continues routing by axis confidence. Additional questions may refine the radar chart and update the distinction paragraph, but will not change the code.

---

## The Code

The code is the primary result artifact. Five letters, one per axis, each representing which pole the user lands on across the full assessment.

Each axis has two named poles. A user gets the letter for whichever pole their normalized score exceeds 50% toward. Threshold is simple majority — 51% toward one pole earns that letter. The letter doesn't tell you how strongly you sit on that side; the radar chart does.

The code is consistent across all users. Two people can compare codes directly. "We're both RIHPD — let's look at our charts and see where we actually differ." This is the social layer. It requires that every user sees the same axes and the same letter options. No variation per user.

See `docs/SCORING.md` for the full axis definitions and letter assignments.

---

## The Social Layer

Tern is designed to be a point of conversation, not just a personal insight tool.

The core question set is fixed and universal because shared reference points are what make results discussable. *"Did you pull the lever?"* is a conversation. *"I got a question about a trolley — did you?"* is not.

The code is consistent because comparison requires a shared coordinate system. *"You're RCHLS and I'm OCHLD — we agree on everything except the first and last axis, that's probably where we always end up disagreeing"* is a conversation that can only happen if the axes are the same for everyone.

Results are designed to be shareable and legible to people who haven't taken the assessment. The code should be comprehensible to someone who reads it on a share card with a short axis legend. The distinction paragraph should read as something a perceptive person observed — not as output from a scoring system.

---

## Axis Naming Principles

Axis letter assignments are fixed across all users of a domain. They must be:

- **Instantly legible** — read the letter, know the concept
- **Non-pejorative at both poles** — neither letter should feel like the "bad" answer
- **Memorable as a set** — the five letters together shouldn't clash or repeat
- **Honest about what they measure** — the letter names the pole, not a flattering version of it

See `docs/SCORING.md` for the Ethics domain axis definitions and letter assignments.

---

## Result Copy Principles

The distinction paragraph must feel like something a thoughtful person would say about someone — not a personality quiz result, not a fantasy character description.

**What this rules out:**

- Mythological or fantasy vocabulary: Guardian, Warrior, Dragon, Sage, Shadow, Weaver, Oracle
- Compound nouns that sound like character classes: The Iron Idealist, The Silent Architect
- Names that everyone would want — results should occasionally be slightly uncomfortable
- Names requiring context to understand

**The test:** would a real person say this about themselves in a conversation? If not, rewrite it.

This applies to any named elements within the distinction — axis labels, tension descriptions, anything that gets surfaced to the user.

---

## Domains

Tern is built to support many domains over time. Each domain asks a different question of the same person.

| Domain | Core Question | Status |
|---|---|---|
| Ethics | How do you weigh rules, outcomes, loyalty, and justice? | Active — V1 |
| Parenting | What do you believe about discipline, independence, and how children grow? | Planned — V2 |
| Leadership | How do you distribute authority, handle conflict, and build trust? | Future |
| Relationships | What do you believe about commitment, conflict, and care? | Future |
| Financial ethics | How do you think about money, obligation, risk, and fairness? | Future |

New domains require only new data — questions, axes, distinction logic, and illustrations. The scoring and branching engine is shared and unchanged.

---

## How Domains Are Built

1. **Define the axes** — what are the genuine philosophical tensions in this domain? Aim for 4–6 axes. Each axis must have two clearly named, non-pejorative poles. Work backwards from questions to axes, not the other way around.

2. **Assign letters** — one letter per pole, per axis. Five axes = five letters in the code. Letters must be legible, non-repeating, and honest.

3. **Design the core question set** — fixed, universal, covers all axes with enough signal to produce a reliable code. No obviously correct answers. The question set must be designed so any combination of answers has a coherent axis-model explanation.

4. **Design the depth question graph** — a network of questions tagged by which axes they probe and which tensions they surface. Each node targets a specific unresolved tension. Large library; individual users see a fraction of it.

5. **Define distinction generation logic** — what does the scoring engine look for to generate the distinction paragraph? Which axis magnitudes, which tensions, which depth-path patterns are worth surfacing? This is the intellectual design work specific to each domain.

6. **Source illustrations** — each scenario and context-shifting follow-up has a corresponding illustration. The image change on a follow-up is the emotional beat of the experience.

---

## Monetization (V2)

> **Note (2026-09):** under the Progression Model the portrait builds up gradually, so the free/paid split below no longer fits cleanly. It gets redrawn in Roadmap Phase 5.

**V1 ships fully unlocked.** All users receive the full experience: code + depth graph + distinction report (summary, radar, axis breakdown, paragraph). No payment gate in V1. This lets us validate the product, the questions, and the distinction quality before introducing monetization.

**Planned V2 freemium model:**

- **Free tier:** Five-letter code + radar chart showing core-set scores. Shareable. Complete and genuinely valuable.
- **Paid tier:** Same code + one-line summary + full precision radar chart + axis breakdown + distinction paragraph.

The gate will be honest. The free result will not be artificially degraded — it's the first phase of a two-phase experience. Users pay to go deeper, not to unlock something already computed.

**Future paid features:** cross-domain profiles, retake and compare, "how others answered" reveals, challenge a friend comparisons.

---

## Roadmap

Phases run in order. Each phase ends with a check Ken approves before the next starts. The detail lives in `docs/PLAN-progression.md`. The look and feel for every phase is fixed by `docs/DESIGN.md` §0 (ink-on-paper park, code-drawn scenes, calm pacing, the Puff characters), ratified 2026-09.

### Phase 0 — The question library ✅ (2026-09)
- Questions expanded and judged three times against the no-escape-answer bar. The existing Q1–Q11 and D1–D12 were revised, and a 53-question draft bank sits in `docs/QUESTION-BANK.md`.
- A core 12 is proposed and judge-checked (`docs/PLAN-progression.md` §6).

### Phase 1 — Decide and design (now)
- ✅ Ken's rulings (2026-09-27, `docs/PLAN-progression.md` §10): the core 12 approved; world unlocks at all 12, then about two-thirds; an authored tendency library; dots, not numbers; on-device save; the headline can change; no crowd statistics in V1.
- Write a note for every answer option in the core 12.
- Write the **tendency library** (about 20 plain "You…" statements, each with the rule for when it appears) and the protect / trade-away rules. Test them on sample answer paths so no path produces a wrong or cheesy read.
- Update `VISION.md`, `ARCHITECTURE.md`, `DESIGN.md`, `QUESTIONS.md` and `SCORING.md` to the approved model.

### Phase 2 — Feel it (prototype)
- **Already in the park prototype** (`prototypes/trolley-walk.html`, see `prototypes/PLAN.md`): the ink-on-paper park, free roam, stops that announce themselves on screen, the question card with animated code-drawn scenes and follow-ups, the character select modal, and the Puff characters, including the characters inside the scenes.
- Update the park prototype: the 12 new stops (with wording from the current `QUESTIONS.md`), ✓/○ markers, a portrait panel with realistic text, the unlock moments, and a fogged Neighborhood on the horizon.
- **Check with Ken:** does uncovering yourself feel like a game worth continuing?

### Phase 3 — V1: the Park, for real
- Scoring from partial answers, with confidence per axis. The unlock ladder. The "calling" stop pick. Clarifying stops.
- The portrait engine (tendency library, headline, tensions), the code reveal at 12, and the radar chart.
- On-device autosave. A share card at any milestone. Share-a-question.
- Code-drawn scenes for the core 12 and their follow-ups, in the `DESIGN.md` §0 style. No image files or image generation.
- Recompute the scoring constants and golden tests. Refresh `SIMULATIONS.md`.

### Phase 4 — V1.x: more worlds
- The Neighborhood, then the City, the Coast and the Observatory: a code-drawn environment per world (same ink style, own setting), stops, and one portrait chapter per world.
- Scores for every answer in the bank questions as they move into worlds.
- Compare with a friend. (Crowd statistics such as "how others answered" were ruled out of V1; revisit after launch.)
- Optional cross-device save (email magic link: a one-time sign-in link, no password).

### Phase 5 — V2 and beyond
- **Question creator pipeline:** a living system that generates, reviews and publishes new questions into the worlds:
  ```
  Generate → Review → Stage → Publish → (Retire)
  ```
  1. **Generate:** a CRON-triggered agent (Ralph) drafts candidates from the axis framework, the existing library, the tone guidelines, and optionally current news. Drafts must pass the no-escape-answer bar.
  2. **Review:** a human gate for axis validity, answer balance, tone, the no-noise guarantee and sensitivity. Judge agents pre-screen.
  3. **Stage:** approved questions are tagged with the axes they probe, emotional intensity, topicality, expiry date and **home world**.
  4. **Publish:** questions appear as new stops (✦) in their world. Topical ones rotate.
  5. **Retire:** news-linked questions expire. They're archived, not deleted.
- **Monetization:** redraw the free/paid line for an incremental portrait (to be decided; V1 ships fully unlocked).
- **Accounts and persistence:** full accounts, retake-and-compare six months later, returning-user detection with fresh stops.
- **New domains:** Parenting first (a child wants to quit an activity, a partner disciplines differently in the moment, a child lies to avoid punishment). Each domain can be its own region of worlds, and eventually there's a cross-domain profile.
- **Social:** "challenge a friend" (compare codes and portraits side by side), and aggregate analytics that are anonymized and opt-in.

---

## Long-Term Vision

Tern becomes the tool people use to understand themselves — and to communicate that understanding to the people they share their lives with.

Partners use the Relationship domain before conflict calcifies into pattern. Parents use the Parenting domain before their differing philosophies become a source of friction. Leaders use the Leadership domain before they take on a team. People use the Ethics domain because they are curious about themselves.

Every domain uses the same engine. Every result is shareable. Every assessment is a conversation starter.

The Arctic Tern knows exactly where it's going. Tern helps you figure out that you've known all along too.
