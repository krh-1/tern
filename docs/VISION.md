# Vision: Tern

> **Status (2026-10):** describes the game as built in `game/` and ruled by Ken through 2026-10-04. The approved plan behind it is `docs/PLAN-progression.md`. Rulings live in `AGENTS.md`; where this doc and `AGENTS.md` disagree, `AGENTS.md` wins.

## What Tern is

Tern is a calm walking game about hard choices. You walk a hand-drawn map, and every stop on it is a dilemma with no easy way out. Each answer adds a line to a portrait of how you decide, starting with your very first answer.

It is a mirror, not a quiz. There are no right answers and no score. The point is to show you values you already hold, often without knowing it, in plain words you'd be glad to share.

The name comes from the Arctic tern, which migrates pole to pole guided by instinct. Tern the product works the same way: it doesn't teach you your values, it helps you read what was already there.

---

## The running mirror

The old model was "test, then result": answer a fixed list of questions, then get a code. Nothing paid off until the end, so every question felt like homework. Ken replaced it on 2026-09-27.

Tern now tells you something from the first answer, and the picture sharpens with every question. You can stop at any point and leave with something true. You come back because more of the map, and more of you, is still waiting.

Three things carry this:

1. **The map.** Every question is a place you walk to. You can see what you've answered and what's still open.
2. **The portrait.** A "who you are" panel beside the map (a pull-up sheet on a phone) that writes itself as you answer.
3. **Unlocks.** More answers reveal more, about you and about the world. The reward is information and new places, never points.

---

## The map: five worlds

Each world has a theme, and its setting carries that theme. They sit on one continuous map: you walk from one into the next, and earlier worlds stay reachable.

| # | World | Theme | Questions | Opens when |
|---|---|---|---|---|
| 1 | **The Park** | The shared core: the same 12 questions for everyone | 12 | From the start |
| 2 | **The Neighborhood** | The people closest to you: family, friends, partners, neighbors | 14 | All 12 park questions are answered |
| 3 | **The City** | Rules, work and institutions: law, jobs, power | 19 | 10 Neighborhood answers (about two-thirds) |
| 4 | **The Coast** | Strangers and sacrifice: people far away and not yet born | 12 | 13 City answers |
| 5 | **The Observatory** | The self: reality, memory, meaning, the future | 18 | 8 Coast answers |

That is 75 questions in all. Once a world opens it stays open, even if you later redo an answer that opened it.

**Free roam.** You answer in any order. The park's 12 are the same for everyone, but no one forces the sequence.

**No wayfinding.** No arrows point toward unseen stops; finding them is part of the game. A stop announces itself once it's on screen. When a new world opens, the game shows it to you once (the "look-over", see `docs/DESIGN.md`), and never walks you there.

---

## The portrait

The portrait is written from an authored library of plain statements, each shown only when your answers support it. Nothing is generated freely, so every line can be traced to the answers behind it.

What it contains, roughly in the order it unlocks:

- **Answer notes.** One or two sentences after each answer about what that choice suggests.
- **Your compass.** The five value pairs as bars, each appearing once two of your questions touch it.
- **Your summary (the headline).** One plain sentence that starts with "You", built from your best-supported tendency, plus a short description. Marked "so far" until the park is done. It can change, and the panel says so when it does.
- **More about you.** Other tendencies, each backed by at least two answers from at least two questions.
- **You protect / You'll trade away.** What you hold onto under pressure, and what you give up first.
- **Where you're torn.** Pairs of your own answers that pull against each other. Often the most interesting thing Tern can tell you.
- **Your code.** Five letters, revealed one at a time after the 12 park questions.
- **Chapters.** One section per later world: how you change there, what you do there, and its own one-line summary.
- **Read more about you.** An optional deeper view that explains each line in plain words and lists the specific answers behind it, including the ones pointing the other way. Facts, not verdicts.

**Identity without archetypes (Ken's ruling).** No cheesy archetype names ("The Pragmatic Rebel") and no type labels. Instead, short, plain statements a real person would say about a friend: "You keep your word." "You avoid open conflict." Every line must make sense to a stranger who sees it on its own.

---

## Unlocks: information, not points

Unlocks trigger on how many questions you've answered, not which ones.

| Park answers | Unlocks |
|---|---|
| 1 | Your first answer note; the portrait panel appears |
| 2 | Your compass (the pairs you've touched) |
| 4 | Your summary, shown as an arrival moment |
| 6 | You protect / You'll trade away |
| 8 | Where you're torn (waits until a real tension exists) |
| 10 | Your whole compass |
| 12 | Your code, revealed letter by letter; the Neighborhood opens |

Each later world has its own short ladder (for example 3 / 6 / 10 in the Neighborhood) that builds its chapter and, at the last step, opens the next world.

**Dots, not numbers.** How close you are to the next unlock shows as dots (●●○). There is never a question count, a step count or a percentage: counting questions turns a mirror into a test, and people start rushing.

**Ken's ruling:** "if it comes off like a game, so be it." Unlocks are in. Points, badges, streaks and leaderboards are still out.

---

## The code

The code is five letters, one per value pair, in a fixed order:

| Position | Pair | Letters |
|---|---|---|
| 1 | Outcomes or Rules | **O** / **R** |
| 2 | Collective or Individual | **C** / **I** |
| 3 | Heart or Thought | **H** / **T** |
| 4 | Loyalty or Principle | **L** / **P** |
| 5 | System or Disruption | **S** / **D** |

**The code comes only from the park's 12 questions** (Ken's ruling, 2026-10-03). Everyone answers those same 12, so two codes can be compared directly: "You're OCHLS and I'm RCHLS, so we only split on the first pair." Later worlds never change your code. Your compass, tendencies, summary and tensions keep learning from every answer.

Scoring details: `docs/SCORING.md`.

---

## Sharing, written for the friend who receives it

Portrait lines are written to you, and some are unflattering. Sent as they are, they read as a confusing accusation to someone who has seen none of the questions. So a shared message has two readers: the sender, who must be glad to put their name to it, and the friend, who knows nothing yet.

- Only lines written for sharing can be sent: first person, something you'd be glad to say about yourself ("I keep my word."). Tendencies that read badly out of context are never sent.
- The message says what Tern is, lists up to three lines you pick, gives your code with an invitation ("Play and tell me yours"), and ends with the link.
- A picture card says the same, so it still makes sense if forwarded without the text.
- You always see the picture and the message before anything is sent.

Once the park is done, sharing is the main button on the code reveal and a box near the top of the portrait. Before that, it's a quiet link.

---

## Game feel: calm and cozy

Tern should feel like a game: not gamified with extrinsic rewards, but engaging through pacing, anticipation and reveals. Ken's bar is a **low-intensity, cozy game**: "having an overall vibe of less intensity, calming, cozy game vibe is critical."

What carries it:
- A hard dilemma creates engagement the moment it's read.
- On a follow-up, the scene changes before the words do, so you feel the world shift before you read why.
- Reveal moments (your summary, your code, each chapter, a new world) are slower arrivals, not page loads.
- The world is quiet: trees sway, water never moves, one slow ripple per stop.

The look is a pure black-and-white, code-drawn, ink-on-paper world (`docs/DESIGN.md` §0).

---

## Principles that still hold

- **Hard questions, no escape answers.** No compromise or "do both" option that lets people step around the dilemma. A thoughtful person must hesitate. Follow-ups pressure both sides where possible.
- **Inconsistency is meaningful.** The question library is designed so any combination of answers has a coherent explanation. Apparent contradictions surface as "Where you're torn", never as a correction.
- **The questions are the instrument.** Wording, follow-up triggers and scoring are measurement, not UI copy. They change only with Ken's say-so.
- **Avatars must not prime answers.** Characters carry a name and a look only.
- **Five axes, fixed.** Not more, not fewer.
- **Domain-agnostic engine.** Ethics is the first domain. A new domain is new content files, not a new engine.

### Copy principles

Portrait copy must feel like something a perceptive person observed, in plain words.
- No fantasy or archetype vocabulary (Guardian, Sage, "The Iron Idealist").
- No metaphors standing in for behavior. "You aim for the greater good," not "You count the numbers."
- Results are honest; some sit slightly uncomfortably.
- **The test:** would a real person say this about a friend, and would a stranger understand it with no context?

Full copy rules: `docs/DESIGN.md` → Copy rules.

---

## No crowd statistics in V1

"62% pulled the lever" is out of V1 (Ken's ruling, 2026-09-27). The mirror stays about you. Revisit after launch.

---

## Privacy

Answers are saved only in the player's browser, on their device. Nothing is sent anywhere. There is no account, no tracking, no analytics and no ads. Sharing sends only what the player sees and approves.

---

## Domains

| Domain | Core question | Status |
|---|---|---|
| Ethics | How do you weigh rules, outcomes, loyalty and justice? | Built: five worlds |
| Parenting | What do you believe about discipline, independence and how children grow? | Planned |
| Leadership | How do you distribute authority, handle conflict and build trust? | Future |
| Relationships | What do you believe about commitment, conflict and care? | Future |
| Financial ethics | How do you think about money, obligation, risk and fairness? | Future |

A new domain needs its own axes (4 to 6, each pole named without judgment), its own questions, tendency library and worlds. The portrait engine (`game/portrait.js`) is shared.

---

## Roadmap

| Phase | What | State |
|---|---|---|
| **0. Question library** | Expansion, judge passes, no-escape-answer revision | Done (2026-09) |
| **1. Decide and design** | Ken's rulings on the progression model; answer notes; tendency library | Done (2026-09-27). Spec docs rewritten 2026-10. |
| **2. Feel it** | Park prototype (`prototypes/trolley-walk.html`) | Done; the game was forked from it |
| **3. V1: the Park** | Portrait engine, unlock ladder, code reveal, on-device save, share | Built in `game/` |
| **4. More worlds and friends** | Neighborhood, City, Coast, Observatory | All five worlds built and ratified (2026-10-04) |
| | Compare with a friend | Not built |
| | Share a single question with a friend | Not built |
| | Optional cross-device save by email magic link (a one-time sign-in link, no password) | Not built |
| | Clarifying stops ("Something came up that we want to explore.") when two answers conflict | Not built |
| **5. V2 and beyond** | Question pipeline, monetization, accounts, new domains | Not started |

### Open content work
- About 25 "missing side" follow-ups the skeptic judges proposed and Ken deferred, listed in `game/city-proposals.md`, `game/coast-proposals.md` and `game/observatory-proposals.md`. They wait for their own judge round.
- The Observatory's 15 open proposals (`game/observatory-proposals.md`), not applied.
- Two Observatory tendencies are defined but can't appear until a second question supports them.

### Phase 5 detail
- **Question pipeline:** generate → review (judge agents, then a human) → stage (tagged with axes, intensity, home world) → publish as new stops → retire topical ones. Drafts must pass the no-escape-answer bar.
- **Monetization:** V1 is fully free. The old plan (a paid deeper report; see "What changed") doesn't fit a portrait that builds up gradually, so the free/paid line gets redrawn later.
- **Accounts:** full accounts, retake-and-compare months later.
- **New domains:** Parenting first.
- **Social:** compare portraits side by side; any aggregate statistics only anonymized and opt-in, and only after Ken revisits the V1 ruling.

---

## What changed (history)

These ideas from the original vision were retired by Ken's rulings in 2026-09. They are kept here so the history isn't lost; don't rebuild them.

| Retired | Replaced by |
|---|---|
| **Two-phase assessment:** a fixed core set in a fixed order, then an adaptive "depth graph" of follow-on questions | Five worlds you roam freely. What's left of the depth graph is the "calling" stop: a soft glow on the open stop that would most sharpen your least-certain value pair. |
| **Convergence offer:** "We have a pretty clear picture of you. Want to see it?" midway through the core | The unlock ladder: you see something from the first answer on. |
| **The "distinction" as a paid tier:** a radar chart plus a generated paragraph, sold as the deeper result | The portrait, built up gradually and free in V1. The radar chart appears at the code reveal. |
| **Fixed question order** | Same 12 park questions for everyone, any order. |
| **"No named archetypes" meaning no identity statements at all** | Plain "You…" statements drawn from the player's own choices. Still no archetype names or type labels. |
| **No progress indication beyond a bare bar** | Dots for unlock closeness. Still no counts or percentages. |
| **Answers are final** | Any answer can be redone from its stop ("Answer again"). |
| **Dark UI, orange accent, full-screen sepia illustrations, AI image generation** | The ink-on-paper map with code-drawn scenes (`docs/DESIGN.md` §0). |

---

## Long-term vision

Tern becomes the tool people use to understand themselves, and to explain that understanding to the people they share their lives with. Partners use the Relationships domain before a conflict hardens into a pattern. Parents use the Parenting domain before their different philosophies cause friction. People use the Ethics domain because they're curious about themselves.

The Arctic tern knows where it's going. Tern helps you see that you've known all along too.
