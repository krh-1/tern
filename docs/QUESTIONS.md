# Questions — Tern (Ethics Domain, V1)

> **This document covers the Ethics domain (V1).** When new domains are added, create a corresponding `QUESTIONS-{domain}.md` file. The question schema is shared across all domains — see `docs/ARCHITECTURE.md`.

Questions in Tern exist in two layers: the **core set** (fixed, universal, socially referenceable) and the **depth graph** (adaptive, personalized, optional). This document covers both.

---

## The No-Noise Design Guarantee

Every question in the library — core and depth — must be designed so that any combination of answers has a coherent explanation in the axis model. There is no such thing as a "noisy" inconsistency by construction.

This means: before any question is added to the library, it must be stress-tested against every question it might follow. If two questions can be answered in a way that is logically contradictory with no principled axis-model explanation, one of them needs to be redesigned. This is a quality bar for question authorship, not a runtime problem to solve in code.

When the system detects what appears to be inconsistency during the depth graph, it is always *meaningful* inconsistency — two framings of the same axis producing different answers, which is genuine data about how the user's values interact with emotional context. The system surfaces a clarifying question transparently. It never re-asks a question because the user got it "wrong."

**Question validation checklist (apply before adding any question):**

- [ ] No obviously correct answer — every option is defensible by a thoughtful person
- [ ] At least two axes are moved by the answers
- [ ] Every answer-combination with preceding questions has a coherent axis-model explanation
- [ ] Follow-up (if present) changes the emotional or relational context meaningfully — not just restates the trunk question
- [ ] Tone is warm and non-accusatory — the question is curious, not testing
- [ ] The question can be answered honestly by someone across the political spectrum
- [ ] Includes an explicit assumptions block (time pressure, available alternatives, who is involved) so users answer the same scenario rather than imagined variants
- [ ] Uses identity-neutral specificity by default (age/role/risk clarity without unnecessary gender/race cues unless the cue is itself the variable being tested)

---

## Question Schemas

**Axis reference:** `O/R` = Outcomes/Rules · `C/I` = Collective/Individual · `H/T` = Heart/Thought · `L/P` = Loyalty/Principle · `S/D` = System/Disruption

**Nudge sign convention:** positive pushes toward the first-named pole (O, C, H, L, S), negative pushes toward the second (R, I, T, P, D).

### Core Question Schema

```js
{
  id: 'Q1',
  title: 'The Trolley Problem',
  illustration: 'Q1.jpg',
  setup: '...',                         // optional italic scene text
  assumptions: [                        // required scenario constraints
    'No hidden information beyond what is stated.',
    'You must choose now; waiting is not possible.',
    'All people mentioned are adults unless stated otherwise.'
  ],
  question: '...',
  phase: 'core',
  answers: [
    {
      id: 'Q1-A',
      text: '...',
      nudges: { O: +2, L: -1 }          // O+ = toward Outcomes; L- = toward Principle
    }
  ],
  followUp: null | {
    trigger: ['Q1-B'] | 'all',         // answer IDs that fire this follow-up, or 'all' for universal
    illustration: 'Q1-followup-a.jpg',
    setup: '...',
    assumptions: ['...'],               // follow-up constraints
    question: '...',
    answers: [...],
    weight: 1.5,                        // follow-up scoring weight multiplier (default 1.5, high-stakes 2.0)
    followUp: null | { ... }            // one additional nesting level allowed (max depth: trunk → FU → nested FU)
  }
}
```

**Nesting example (Q1):** Q1 uses nested follow-ups:
```
Q1 trunk (2 answers)
  └─ Q1 FU-A (trigger: 'all', weight: 1.5x)
       ├─ answer A → no further follow-up
       └─ answer B → Q1 FU-B (trigger: trunk=A AND FU-A=B, weight: 2.0x)
```
The branching engine must track which trunk answer was given to determine whether FU-B fires. FU-B's trigger condition is: "user pulled the lever for strangers (Q1-A) but won't pull for their mother (Q1-FU-A-B)." This is the only nested follow-up in the V1 core set.


### Depth Graph Node Schema

```js
{
  id: 'D1',
  title: '...',
  illustration: 'depth/D1.jpg',
  setup: '...',
  assumptions: ['...'],                 // required scenario constraints
  question: '...',
  phase: 'depth',
  probesAxes: ['L', 'H'],               // primary axes this question moves
  probeTension: 'loyalty_vs_consistency',
  isClarifying: false,                  // true = surfaced by inconsistency detection
  answers: [
    {
      id: 'D1-A',
      text: '...',
      nudges: { L: -2, H: +1 }          // L- = toward Principle; H+ = toward Heart
    }
  ],
  followUp: null | { /* same shape as core follow-up */ },
  weight: 1.0
}
```

---

## Axis Nudge Translation Reference

For authors migrating questions from the old 7-axis model (A–G) or reasoning about how concepts map to new keys:

| Concept | New key + sign | Notes |
|---|---|---|
| Toward Outcomes (utilitarian) | `O+` | Absorbs old A+ and F+ |
| Toward Rules (deontological) | `O-` | Absorbs old A- and F- |
| Toward Collective | `C+` | Old B+ |
| Toward Individual | `C-` | Old B- |
| Toward Heart (empathetic) | `H+` | Old C+ |
| Toward Thought (rational) | `H-` | Old C- |
| Toward Loyalty (allegiance, near-first) | `L+` | Old D- and E- (direction was flipped in old model) |
| Toward Principle (justice, equal weight) | `L-` | Old D+ and E+ |
| Toward System (work within structures) | `S+` | Old G+ |
| Toward Disruption (break unjust rules) | `S-` | Old G- |

When old nudges had separate A and F values pointing the same direction, combine them additively into `O`. When they pointed opposite directions, use whichever was stronger and document the judgment call.

---

## Core Question Set

11 trunk questions. 7 have conditional or universal follow-ups. Average session: 15–17 total prompts before code convergence (though convergence may occur earlier).

The core set is **fixed and universal**. Every user answers these in the same order. The shared question set is what makes Tern a social tool — users can compare answers and recognize themselves in each other's results. Do not make the core set adaptive.

---

### Q1 — The Trolley Problem (Escalating)

**Illustration:** Railway fork at dusk — one figure on each track
**Assumptions (global):**
- The six people are strangers to you.
- All are adults with equal expected life expectancy.
- No one can move in time, and there is no third option.
- You have 3 seconds to act.
**Question:** A runaway trolley is heading toward 5 people. You can pull a lever that diverts it to a side track where 1 person will die. What do you do?

- A: Pull the lever *(O+3)*
- B: Do not pull — I won't directly cause a death *(O-3)*

**Follow-up A (everyone):** *Illustration: the single figure becomes your mother's silhouette*
**Assumptions (follow-up):**
- The five on the main track remain strangers.
- Everything else is unchanged.
What if the 1 person on the side track is your mother?
- A: Pull anyway *(O+2, L-2, H-2)*
- B: I can't do it — not her *(H+3, L+2)*

**Follow-up B (only if pulled for stranger, won't pull for mother):** *Illustration: a child's silhouette*
**Assumptions (follow-up):**
- The 100 are strangers.
- Your child is the only person on the side track.
What if the 1 person on the side track is your child, and pulling now would save 100 strangers?
- A: Pull — 100 lives outweigh one *(O+3, L-3)*
- B: Do not pull — I won't choose my child's death *(H+3, L+3)*

---

### Q2 — The Wallet

**Illustration:** A wallet on a polished sidewalk, elegant townhouses behind
**Assumptions (global):**
- You can return the wallet with minimal effort.
- There is no legal risk to returning it.
- You are not in immediate financial emergency.
**Question:** You find a wallet with $400 cash and an ID. The owner lives in a wealthy neighborhood. What do you do?

- A: Return the wallet with all the cash *(O-1, L-2)*
- B: Keep the cash, return the wallet and ID *(O+1, C-2)*
- C: Keep both the wallet and the cash *(O+2, C-3)*

**Follow-up (if kept cash or everything):** *Illustration: same wallet, cracked sidewalk, laundromat behind*
**Assumptions (follow-up):**
- Same amount of cash and same return effort.
- Only the neighborhood context changes.
What if the owner lives in a low-income neighborhood?
- A: I'd return it — that changes things *(H+3, L+2)*
- B: I'd still keep it — finding it doesn't make it theirs to me *(O+1, L-2, C-1)*

---

### Q3 — The Confession

**Illustration:** Two figures at a bar, one leaning in close
**Assumptions (global):**
- You have confirmed the confession is true.
- There is no immediate physical danger.
- You are close to both people, but closer to the person confessing.
**Question:** A close friend tells you they have been cheating on their partner. Their partner is also your friend. What do you do?

- A: Tell the partner — they deserve to know *(L-2, O-1)*
- B: Stay out of it — it's not my place *(L+2, H+1)*
- C: Give my friend a deadline, then tell if they don't *(L-1, S-1)*

**Follow-up (everyone):** *Illustration: three figures — a table, a secret, a third person in the background*
**Assumptions (follow-up):**
- The friend directly asks you to keep this secret.
- No new facts are added beyond relationship closeness.
Your friend asks you to keep it secret. Does that change your decision?
- A: No — loyalty doesn't override honesty *(L-2)*
- B: Yes — I stay out of it *(L+2)*
- C: Same ultimatum, but with more empathy *(H+2)*

---

### Q4 — The Saturday

**Illustration:** A soup kitchen counter, steam rising, hands passing a tray
**Assumptions (global):**
- You have one Saturday and can only choose one primary action.
- Your donation would go to a vetted, high-effectiveness charity.
- Your volunteer shift has clear local benefit but smaller total reach.
**Question:** You have one free Saturday. Would you spend it volunteering at a local shelter, or donate that day's wages to a charity that helps more people overall?

- A: Volunteer — direct connection matters most *(H+2, L+1, C-1)*
- B: Donate — higher impact matters most *(O+2, C+2, L-2, H-1)*
- C: Split the day: volunteer some, donate some *(O+1, H+1)*

**Follow-up (if volunteer):** *Illustration: a desk at night, a laptop, a donation form*
**Assumptions (follow-up):**
- The 50x estimate is reliable.
- Volunteer work remains meaningful but lower impact in scale.
What if you learn the donation would help about 50 times more people than your volunteer shift?
- A: Still volunteer — I need direct contact with the work *(H+3, L+2)*
- B: Switch to donating — 50x is hard to ignore *(O+2, L-2)*

---

### Q5 — The Inheritance

**Illustration:** A hospital room, a will on a bedside table
**Assumptions (global):**
- The written will is legally valid and enforceable.
- Your parent is mentally competent when speaking to you.
- Your sibling does not know about the private request.
**Question:** Your parent's will splits their estate equally between you and your sibling. In private, your parent says they now want you to have everything, but the will was never updated. What do you do?

- A: Follow the will as written *(S+2, O-2, H-1)*
- B: Follow my parent's final request *(L+2, O+2)*
- C: Tell my sibling everything and decide together *(H+2, L-1)*
- D: Keep peace — split equally and say nothing *(S+1, L+1)*

**Follow-up (if honored will or kept peace):** *Illustration: the same room — a second chair pulled close*
**Assumptions (follow-up):**
- This request is explicit and repeated right before death.
- Legal documents remain unchanged.
Your parent explicitly repeats: "I want you to have it all. Please." Does that change your answer?
- A: Change course — honor the direct request *(L+2, O+1)*
- B: Keep course — follow the written will *(S+2, O-1)*

---

### Q6 — The Promotion

**Illustration:** Two figures outside an office door, both looking at it
**Assumptions (global):**
- You and your colleague are equally qualified.
- The role can go to only one person.
- You cannot split salary or responsibilities.
**Question:** You and a colleague are finalists for one promotion, and performance is essentially equal. Your colleague is under heavy financial pressure. How do you approach the competition?

- A: Compete fully — keep it merit-based *(C-1, O+1, H-1)*
- B: Pull back slightly — their need is greater *(H+2, C+2)*
- C: Compete fully, then help them elsewhere *(C+1, L-1)*

**Follow-up (everyone):** *Illustration: same scene, one figure's background slightly visible — a child's drawing on a desk*
**Assumptions (follow-up):**
- You have strong financial security either way.
- Your colleague would face significant hardship if not promoted.
What if you knew you would be financially fine either way, and your colleague would genuinely struggle without the promotion?
- A: Still compete fully — best candidate should win *(C-2, O+1, H-1)*
- B: Defer — their circumstance changes the decision *(H+3, C+3)*
- C: Compete, but advocate strongly for them in other ways *(L-1, H+1)*

---

### Q7 — The White Lie

**Illustration:** Two friends at a café, one showing the other a notebook
**Assumptions (global):**
- You have relevant judgment and see serious flaws in the plan.
- Your friend asked for your honest reaction.
- Your feedback may affect whether they continue investing savings.
**Question:** A close friend quit a stable job to start a business. They show you a plan with serious flaws, and you think it will likely fail. What do you say?

- A: Give direct honest feedback *(L-2, O-1, H-1)*
- B: Lead with encouragement *(H+2, L+2)*
- C: Give honest feedback, carefully and gently *(L-1, H+1, O-1)*

**Follow-up (if encouraged):** *Illustration: an empty desk, a resignation letter, a closed laptop*
**Assumptions (follow-up):**
- Your friend is asking in hindsight, not in a legal dispute.
- Your answer now can only affect repair and future decisions.
Six months later, the business fails. They invested their savings. They tell you they wish someone had been more honest with them. Do you tell them you had doubts?

- A: Tell them now — even if it's late *(L-2, O-1)*
- B: Don't tell them now — it won't help *(O+2, H+1)*
- C: Be honest now, then focus on next steps *(L-1, H+2)*

---

### Q8 — The Coworker

**Illustration:** A dim office corridor, a figure at a filing cabinet
**Assumptions (global):**
- You have reliable evidence of repeated theft.
- The theft is ongoing.
- You have access to internal reporting channels.
**Question:** You discover a colleague has been repeatedly stealing small amounts from work over several months. What do you do?

- A: Report it immediately *(O-2, S+2)*
- B: Confront them privately first *(L-1, H+1)*
- C: Stay out of it *(S-2, L+1)*

**Follow-up A (if reported):** *Illustration: a child's drawing pinned to a cubicle wall*
**Assumptions (follow-up):**
- The medical-bills explanation is verified.
- The theft and harm to the employer were real.
You learn they did it to cover their child's medical bills. Does that change your view?

- A: Still report, but advocate for leniency *(O-2, H+1)*
- B: Reconsider — help find another way *(H+3, L-1)*

**Follow-up B (if confronted or stayed out):** *Illustration: a small shop front, handwritten sign*
**Assumptions (follow-up):**
- The victim is a small family-owned business with limited cash buffer.
- The theft meaningfully affects payroll and operations.
You learn the victim is a small family-owned business and the losses are materially hurting them. Does that change your decision?

- A: Yes — report it now; the harm is too direct *(L+2, O-1)*
- B: Still no report, but push harder to stop it *(L-1, H+1)*

---

### Q9 — The Protest

**Illustration:** A crowd outside a government building at night
**Assumptions (global):**
- Legal challenge routes exist but are slow.
- Breaking the law would be nonviolent civil disobedience.
- You accept a real risk of arrest.
**Question:** A law you believe is deeply unjust passes through normal democratic process. Would you break that law through nonviolent civil disobedience?

- A: Break it through nonviolent protest *(S-3, L-2)*
- B: Do not break it — protect the process *(S+2, O-2, H-1)*
- C: Exhaust legal options first, then decide *(S-1, O-1)*

---

### Q10 — The Bystander

**Illustration:** A subway platform, a confrontation in the distance
**Assumptions (global):**
- The target is an adult and currently unarmed.
- The harasser is verbally aggressive, not yet physically violent.
- Other bystanders are present, and transit staff can be reached quickly.
**Question:** On a subway platform, you see one adult verbally harassing another adult. The aggression is escalating. What do you do?

- A: Intervene directly *(S-2, C+2, L+1)*
- B: Alert transit staff or security *(S+1, O-1, H-1)*
- C: Support the target without direct confrontation *(H+2, L+1)*
- D: Do not intervene *(S+2, C-1)*

**Follow-up (everyone):** *Illustration: same platform — a small child in frame, watching*
**Assumptions (follow-up):**
- A visibly distressed child is nearby and watching.
- You still have the same response options and time pressure.
What if you notice a visibly distressed child watching the scene?

- A: Intervene now *(H+2, L-1)*
- B: Move the child to safety while getting help *(H+3, L-1)*
- C: Keep the same response plan *(L-2)*

---

### Q11 — The Autonomous Car

**Illustration:** A rain-slicked road, headlights, a fork ahead
**Assumptions (global):**
- All pedestrians are adults and strangers.
- Braking distance is insufficient; collision is unavoidable.
- The system has only two available trajectories.
**Question:** A self-driving car loses control and must choose between two unavoidable paths: hit 1 pedestrian or hit 5. If you set the policy, what should it do?

- A: Swerve — minimize casualties *(O+3, L-2)*
- B: Stay course — do not program intentional harm *(O-3)*
- C: Defer policy to regulators and ethicists *(S+2, O+1, H-1)*

---

## Depth Graph — V1 Nodes

The depth graph in V1 is intentionally small (10–15 nodes). It will grow significantly through the V2 question pipeline. Each node probes a specific axis tension that may remain unresolved after the core set — the engine routes each user to nodes most relevant to their lowest-confidence axes.

Depth questions follow the same quality criteria as core questions, plus one additional requirement: **the question must resolve ambiguity that the core set cannot — it must probe a tension that is genuinely unresolved after a user's specific core set path.**

Depth nodes are stored in `src/data/depthGraph.js`. They are not listed exhaustively in this document because the graph will grow continuously. New nodes are documented in individual PRDs (see `docs/WORKFLOW.md`) and validated against the no-noise guarantee before being added.

**Current node inventory:** see `src/data/depthGraph.js` for the live list.

---

## Axis Coverage Summary

Every question that nudges an axis is listed. **Bold** = primary (nudge magnitude ≥ 2). This table must match the one in `docs/SCORING.md`.

| Axis | Contributing Questions |
|---|---|
| O/R | **Q1**, **Q2**, Q3, **Q4**, **Q5**, Q6, **Q7**, **Q8**, **Q9**, Q10, **Q11** |
| C/I | **Q2**, **Q4**, **Q6**, **Q10** |
| H/T | **Q1**, **Q2**, Q3, **Q4**, Q5, **Q6**, **Q7**, **Q8**, **Q10** |
| L/P | **Q1**, **Q2**, **Q3**, **Q4**, **Q5**, Q6, **Q7**, **Q8**, **Q9**, **Q10**, **Q11** |
| S/D | Q3, **Q5**, **Q8**, **Q9**, **Q10**, **Q11** |

---

## Illustration Design Principles

Each question — core and depth — has a base illustration and one illustration per context-shifting follow-up. The illustration swap is the emotional beat of the experience, not decoration.

- Hand-drawn, sketch aesthetic — not photorealistic, not flat vector
- Sepia toning — warm, aged, editorial
- Portrait orientation, full-bleed
- Scene, not diagram — atmosphere over accuracy
- The follow-up illustration must change something specific and meaningful — not just a variant of the base

When generating AI-assisted illustrations, prompt for: *"Editorial illustration, ink sketch style, sepia tone, high contrast, loose confident linework, no color, atmospheric, slightly dramatic — [scene description]. Style of New Yorker editorial illustration or vintage woodcut print."*

Avoid: flat vectors, photorealism, anime styles, anything that reads as obviously AI-generated.
