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
- [ ] **No escape answers** (Ken's ruling, 2026-09): no compromise option that lets the user step around the dilemma ("split it", "do both", "defer to experts", "only if they ask", "try the official route first"). If a realistic middle path exists, the scene must close it off or give it a real cost
- [ ] **Challenging:** a thoughtful person should hesitate before answering. If most people would answer in under five seconds, sharpen it or cut it
- [ ] Each follow-up fires only for answers that could plausibly change under the new fact
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
The branching engine must track which trunk answer was given to determine whether FU-B fires. FU-B's trigger condition is: "user pulled the lever for strangers (Q1-A) but won't pull for their mother (Q1-FU-A-B)." This is the only nested follow-up in the V1 core set. Other questions use separate follow-ups per trunk answer (e.g. Q3, Q5, Q6, Q8, Q9, Q11).


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

11 trunk questions. All 11 have conditional or universal follow-ups; several have separate follow-ups per answer. Average session: 20–22 total prompts before code convergence (though convergence may occur earlier).

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
- No one saw you pick it up, and no one will ever know.
- You are exactly $400 short on rent this week and will pay a late fee. You won't lose your home.
**Question:** You find a wallet with $400 cash and an ID. The owner lives in a wealthy neighborhood. You're $400 short on rent this week, and no one saw you. What do you do?

- A: Return the wallet with all the cash *(O-1, L-2)*
- B: Keep the cash, mail back the wallet and ID *(O+1, C-2)*

**Follow-up (if kept cash):** *Illustration: same wallet, cracked sidewalk, laundromat behind*
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

**Follow-up A (if told):** *Illustration: three figures — a table, a secret, a third person in the background*
**Assumptions (follow-up):**
- The friend says the affair is over and they believe it.
- You have no evidence either way.
Before you do, your friend begs you not to. They swear the affair is over, and telling would only end the marriage. What now?
- A: I tell the partner anyway *(L-2, O-1)*
- B: I keep the secret *(L+2, H+1)*

**Follow-up B (if stayed out):** *Illustration: the partner alone at the same table, looking straight out*
**Assumptions (follow-up):**
- The partner asks you directly, in private.
- Saying "I don't know" would be a lie.
Months later, the partner asks you directly: "Is something going on? Please tell me."
- A: I tell them the truth *(L-2, O-1)*
- B: I say I don't know *(L+2, H+1)*

---

### Q4 — The Saturday

**Illustration:** A soup kitchen counter, steam rising, hands passing a tray
**Assumptions (global):**
- You have one Saturday and can only choose one primary action.
- Working the extra shift and volunteering both take the whole day.
- Your donation would go to a vetted, high-effectiveness charity.
- Your volunteer shift has clear local benefit but smaller total reach.
**Question:** You have one free Saturday. You can volunteer at a local shelter, or work an extra shift and give all the pay to a charity that helps far more people. Which do you do?

- A: Volunteer — being there matters most *(H+2, L+1, C-1)*
- B: Work and donate — more people get helped *(O+2, C+2, L-2, H-1)*

**Follow-up (if donate):** *Illustration: the shelter door at dusk, a handwritten "short-staffed" sign*
**Assumptions (follow-up):**
- If you go, you can't work the shift, so there's no donation.
- Your absence means a specific person goes without a bed tonight.
The shelter calls. They're short-staffed, and if you don't come, someone will go without a bed tonight.
- A: I go to the shelter *(H+2, L+1)*
- B: I still donate — more people need that money *(O+2, H-1)*

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

- A: Follow the will — split it equally *(S+2, O-2, H-1)*
- B: Honor my parent's request — take it all *(L+2, O+2)*

**Follow-up B (if took it all):** *Illustration: the sibling's kitchen table, bills spread out*
**Assumptions (follow-up):**
- Your sibling does not know about the private request.
- You are financially comfortable either way.
You learn your sibling is struggling to pay their bills. You're comfortable. Does that change anything?
- A: No — this was our parent's wish *(L+2, O-1)*
- B: Yes — I split it after all *(H+2, C+1, L-1)*

**Follow-up A (if followed the will):** *Illustration: the same room — one chair worn, one chair empty for years*
**Assumptions (follow-up):**
- The estrangement and the caregiving are both confirmed.
- Legal documents remain unchanged.
You learn why your parent changed their mind: your sibling hadn't spoken to them in ten years. You did all the caregiving.
- A: Then I take it all *(L+2, O+1)*
- B: I still split it equally *(S+2, O-1)*

---

### Q6 — The Promotion

**Illustration:** Two figures outside an office door, both looking at it
**Assumptions (global):**
- You and your colleague are equally qualified.
- The role can go to only one person.
- You cannot split salary or responsibilities.
**Question:** You and a colleague are finalists for one promotion, and performance is essentially equal. Your colleague is under heavy financial pressure. What do you do?

- A: Compete fully — let merit decide *(C-1, O+1, H-1)*
- B: Withdraw — let them have it *(H+3, C+2)*

**Follow-up A (if compete):** *Illustration: same scene, one figure's background slightly visible — a child's drawing on a desk*
**Assumptions (follow-up):**
- You have strong financial security either way.
- The risk to your colleague is concrete, not speculative.
You learn they may lose their home without the raise. You'd be fine either way.
- A: Still compete fully — the best candidate should win *(C-2, O+1, H-1)*
- B: Withdraw — that changes it *(H+3, C+3)*

**Follow-up B (if withdraw):** *Illustration: the same door, a memo with two names, one crossed out*
**Assumptions (follow-up):**
- Their financial situation is unchanged.
- The credit-taking is confirmed and was never acknowledged.
You learn that last year, this colleague quietly took credit for your work.
- A: I still withdraw — their need is still real *(H+2, C+1)*
- B: Then I compete fully *(O+1, H-1, L+1)*

---

### Q7 — The White Lie

**Illustration:** Two friends at a café, one showing the other a notebook
**Assumptions (global):**
- You have relevant judgment and see serious flaws in the plan.
- Your friend asked for your honest reaction.
- Your feedback may affect whether they continue investing savings.
- They want a yes or no, not a discussion.
**Question:** A close friend quit a stable job to start a business. They show you a plan with serious flaws, and you think it will likely fail. They look at you and ask: "Will this work? Yes or no."

- A: "Honestly? I don't think so." *(L-2, O-1, H-1)*
- B: "Yes. Go for it." *(H+2, L+2)*

**Follow-up (if honest):** *Illustration: the same café, the notebook closed, a hand resting on it*
**Assumptions (follow-up):**
- Your opinion of the plan hasn't changed.
Their face falls. They ask: "Can you just tell me you believe in me?"
- A: I say it *(H+2, L+1)*
- B: I don't *(L-2, H-1)*

**Follow-up (if encouraged):** *Illustration: an empty desk, a resignation letter, a closed laptop*
**Assumptions (follow-up):**
- Your friend is asking in hindsight, not in a legal dispute.
- Your answer now can only affect repair and future decisions.
Six months later, the business fails. They invested their savings. They tell you they wish someone had been more honest with them. Do you tell them you had doubts?

- A: Tell them now — even if it's late *(L-2, O-1)*
- B: Don't tell them now — it won't help *(O+2, H+1)*

---

### Q8 — The Coworker

**Illustration:** A dim office corridor, a figure at a filing cabinet
**Assumptions (global):**
- You have clear proof of repeated theft.
- The theft is ongoing.
- You like this colleague and have access to internal reporting channels.
**Question:** A colleague you like has been stealing small amounts from work for months. You have clear proof. What do you do?

- A: Report it *(O-2, S+2)*
- B: Stay out of it *(S-2, L+1)*

**Follow-up A (if reported):** *Illustration: a child's drawing pinned to a cubicle wall*
**Assumptions (follow-up):**
- The medical-bills explanation is verified.
- You haven't reported yet; the decision is still yours.
Before you do, you learn they did it to pay their child's medical bills. Do you still report it?
- A: Yes, I still report it *(O-2, S+1)*
- B: No, I don't report it *(H+3, L+1)*

**Follow-up B (if stayed out):** *Illustration: a small shop front, handwritten sign*
**Assumptions (follow-up):**
- The victim is a small family-owned business with limited cash buffer.
- The theft meaningfully affects payroll and operations.
You learn the victim is a small family business, and the losses are hurting them. Now what?
- A: I report it now *(L-2, O-1, S+1)*
- B: I still stay out of it *(L+2, S-1)*

---

### Q9 — The Protest

**Illustration:** A crowd outside a government building at night
**Assumptions (global):**
- Legal challenges have already been tried and failed.
- Breaking the law would be nonviolent civil disobedience.
- You accept a real risk of arrest.
**Question:** A law you believe is deeply unjust passes through normal democratic process. Court challenges have already failed. Would you break that law through nonviolent civil disobedience?

- A: Break it through nonviolent protest *(S-3, L-2)*
- B: Do not break it — protect the process *(S+2, O-2, H-1)*

**Follow-up A (if break it):** *Illustration: a kitchen table, a lunchbox, a work badge*
**Assumptions (follow-up):**
- An arrest record would very likely cost you your job.
- People depend on your income.
An arrest would likely cost you your job, and your family depends on your income.
- A: I still do it *(S-2, L-1)*
- B: Then I don't *(L+2, S+1)*

**Follow-up B (if don't break it):** *Illustration: the same crowd, one familiar face in it*
**Assumptions (follow-up):**
- The harm is now concrete and personal.
- Legal routes remain closed.
The law starts hurting someone you love.
- A: Then I'd break it *(S-2, L+2)*
- B: I still wouldn't *(S+2, O-1)*

---

### Q10 — The Bystander

**Illustration:** A subway platform, a confrontation in the distance
**Assumptions (global):**
- The target is an adult and currently unarmed.
- The harasser is verbally aggressive, not yet physically violent.
- Other bystanders are present but doing nothing.
- No staff or security are in sight, and your phone has no signal.
**Question:** On a subway platform, you see one adult verbally harassing another adult. The aggression is escalating. No staff are around, and your phone has no signal. What do you do?

- A: Confront the harasser *(S-2, C+2, L+1)*
- B: Go stand with the target, even if the harasser turns on me *(H+2, L+1)*
- C: Stay where I am *(S+2, C-1)*

**Follow-up (if stand beside or stay out):** *Illustration: same platform — the target stumbling back, the crowd frozen*
**Assumptions (follow-up):**
- The harasser is now physically violent.
- No one else is moving to help.
The harasser shoves the target to the ground. No one else moves.
- A: I step in physically *(C+2, H+2, S-1)*
- B: I still hold back *(C-2, S+1)*

---

### Q11 — The Autonomous Car

**Illustration:** A rain-slicked road, headlights, a lone figure inside the car, five figures ahead
**Assumptions (global):**
- All pedestrians and the passenger are adults and strangers to you.
- Braking is impossible; one of the two outcomes is certain.
- The rule you set applies to every car of this kind.
**Question:** A self-driving car's brakes fail. It can hit five pedestrians, or swerve into a wall and kill its one passenger. If you set the rule for every car, what should it do?

- A: Swerve — save the five *(O+3, C+2, L-1)*
- B: Protect the passenger *(O-2, C-2, L+1)*

**Follow-up A (if swerve):** *Illustration: a showroom, a single car under a spotlight*
**Assumptions (follow-up):**
- A car without this programming costs the same.
Would you buy a car programmed this way for your own family?
- A: Yes *(O+1, C+1)*
- B: No *(C-2, L+1)*

**Follow-up B (if protect):** *Illustration: the passenger buckling in; the five on the sidewalk, unaware*
**Assumptions (follow-up):**
- The pedestrians were walking lawfully.
The passenger chose to ride. The five pedestrians chose nothing. Does that change it?
- A: Yes — then swerve *(O+2, C+1)*
- B: No — the car shouldn't turn on its passenger *(L+2, C-1)*

---

## Depth Graph — V1 Nodes

The depth graph in V1 is intentionally small (10–15 nodes). It will grow significantly through the V2 question pipeline. Each node probes a specific axis tension that may remain unresolved after the core set — the engine routes each user to nodes most relevant to their lowest-confidence axes.

Depth questions follow the same quality criteria as core questions, plus one additional requirement: **the question must resolve ambiguity that the core set cannot — it must probe a tension that is genuinely unresolved after a user's specific core set path.**

Depth nodes are stored in `src/data/depthGraph.js`. The canonical definitions are listed below. New nodes are documented in individual PRDs (see `docs/WORKFLOW.md`) and validated against the no-noise guarantee before being added.

---

### D1 — The Promise About the Home

**probesAxes:** `[L, O]` · **probeTension:** `loyalty_vs_outcomes` · **isClarifying:** false
**Illustration:** An empty armchair by a window, a cardigan folded over it
**Assumptions:**
- A good care home is available and affordable.
- Home care would take most of your free time for years.
- The promise was explicit and made when your parent was well.

**Question:** Your parent has advanced dementia. Caring for them at home would take most of your free time for years and strain your own family. Years ago, they made you promise you'd never put them in a care home. A good one is available. What do you do?

- A: Keep the promise and care for them at home *(L+2, O-2)*
- B: Move them to the care home *(O+2, L-1)*

**Follow-up (if kept the promise):** *Illustration: the same chair, a stranger's hand on the parent's shoulder*
**Assumptions (follow-up):**
- They are calm and content with any kind caregiver.
They no longer recognize you. They're calm with anyone who is kind to them. Does that change things?
- A: Yes — I move them. The person I promised isn't really there anymore *(O+2, H-1)*
- B: No — it's still them, and a promise is a promise *(L+2)*

**Follow-up (if moved them):** *Illustration: a care-home doorway, a hand reaching after a departing figure*
**Assumptions (follow-up):**
- The staff say this distress is common and usually fades, but there's no guarantee.
At the home, they cry every time you leave and beg to go home.
- A: I bring them home *(L+2, H+2)*
- B: They stay *(O+2, H-1)*

---

### D2 — The Anonymous Donor

**probesAxes:** `[C, H]` · **probeTension:** `collective_efficiency_vs_relational_care` · **isClarifying:** false
**Illustration:** An envelope slid under a door, no return address
**Assumptions:**
- The charity estimate is reliable.
- Your neighbor has no other way to cover the rent.
- The money can't usefully be split.

**Question:** You have $1,000 to give. A proven charity would use it to protect about 200 children from malaria. Or you can give it to your neighbor, a single parent who is $1,000 short on rent. Who gets it?

- A: The charity — more lives protected *(C+2, H-1)*
- B: My neighbor — I can see exactly what it does *(H+2, C-1)*

---

### D3 — The Informant

**probesAxes:** `[S, L]` · **probeTension:** `institutional_trust_vs_personal_allegiance` · **isClarifying:** false
**Illustration:** A glass-walled office, someone watching through blinds
**Assumptions:**
- The pattern is clear and ongoing.
- Reporting will likely have consequences for your colleague.
- You have already raised it with them directly, twice.

**Question:** A colleague who helped build your career keeps giving the worst shifts to a teammate they dislike. You've talked to them twice. Nothing changed. Do you report it to HR?

- A: Report it *(S+2, L-2)*
- B: Let it go *(L+2, S-1)*

---

### D4 — The Stranded Stranger

**probesAxes:** `[H, C]` · **probeTension:** `empathy_vs_scale` · **isClarifying:** false
**Illustration:** A figure sitting alone at a bus stop in the rain, late at night
**Assumptions:**
- The stranger is not in physical danger but is clearly distressed.
- Missing the flight has a real cost you care about, but no one is hurt by it.
- Your phone is dead; there is no one to call.

**Question:** You're driving to the airport for a flight you can't miss. At a bus stop in heavy rain, a stranger sits alone, clearly upset. The last bus is gone, and stopping means you'll miss your flight. Do you stop?

- A: Stop — I can't just drive past *(H+2, C-1)*
- B: Keep driving — I can't miss this flight *(C-1, H-2)*

---

### D5 — The Unearned Advantage

**probesAxes:** `[O, L]` · **probeTension:** `meritocracy_vs_loyalty` · **isClarifying:** false
**Illustration:** Two résumés on a desk, one with a familiar name circled
**Assumptions:**
- You are the hiring decision-maker.
- Both candidates can do the job.
- No one will know you favored one over the other.

**Question:** You're hiring. One candidate is a bit stronger. The other is the child of a mentor who shaped your career, and the mentor asked you, as a personal favor, to hire them. Their kid could do the job. Who do you hire?

- A: The stronger candidate *(O+1, L-2)*
- B: My mentor's kid *(L+2, O-1)*

---

### D6 — The Leaked Draft

**probesAxes:** `[S, O]` · **probeTension:** `process_vs_urgency` · **isClarifying:** false
**Illustration:** A laptop screen glowing in a dark room, a document marked "DRAFT — NOT FOR DISTRIBUTION"
**Assumptions:**
- The cut is legal but will cause real hardship.
- Internal channels have been tried and failed.
- Going public would very likely stop it, and would very likely cost you your job and a lawsuit.

**Question:** Your company will quietly cut the pensions of 3,000 retired workers next week. You raised it inside a month ago, and nothing happened. Going public would likely stop it, but it breaks your NDA, and you'd be fired and sued. What do you do?

- A: Go public *(S-3, O+2)*
- B: Stay quiet — I signed, and I tried *(S+2, O-1)*

---

### D7 — The Uncomfortable Truth

**probesAxes:** `[H, L]` · **probeTension:** `honesty_vs_relational_protection` · **isClarifying:** false
**Illustration:** A dinner table, two people, one looking away
**Assumptions:**
- The information is confirmed.
- There is no sign of current wrongdoing.
- The fiancé does not know you know.

**Question:** You learn your close friend's fiancé served two years in prison for fraud, long ago. They've been honest since. Your friend doesn't know, and the wedding is next month. Do you tell your friend?

- A: Tell them *(L-2, H-1)*
- B: Stay quiet — it's the fiancé's story to tell *(H+2, L+2)*

**Follow-up (if stayed quiet):** *Illustration: the same table, the friend leaning in, a ring on their hand*
**Assumptions (follow-up):**
- Saying "no" would be a direct lie.
Your friend asks you, "Is there anything I should know before I marry them?"
- A: I tell them *(L-2, O-1)*
- B: I say no *(L+2, H+1)*

---

### D8 — The Broken System

**probesAxes:** `[S, C]` · **probeTension:** `systemic_compliance_vs_direct_action` · **isClarifying:** false
**Illustration:** A long queue outside a government office, one person stepping out of line
**Assumptions:**
- The people ahead of her also need the surgery.
- Using the connection is legal and would not be discovered.
- His condition is painful but not life-threatening.

**Question:** Your father needs hip surgery. The waiting list is eight months, and he's in pain every day. A friend on the hospital board can move him up this week, ahead of people who've waited longer. It breaks no rules. Do you make the call?

- A: Make the call *(C-2, S-1, L+1)*
- B: Don't — he waits his turn *(S+2, C+2)*

---

### D9 — The Sacrifice Calculus

**probesAxes:** `[O, H]` · **probeTension:** `utilitarian_logic_vs_emotional_cost` · **isClarifying:** false
**Illustration:** A scale with a heart on one side and a calculator on the other
**Assumptions:**
- The numbers are reliable.
- Splitting the budget would leave neither program able to run.
- No one else will make this decision for you.

**Question:** Your small nonprofit must close one of two programs. Mentoring changes 5 kids' lives deeply; you built it and know them all. Tutoring helps 200 kids a little, and does more good overall. Which do you close?

- A: Mentoring — 200 kids outweigh 5 *(O+2, H-2)*
- B: Tutoring — deep change matters more *(H+2, O-2)*

---

### D10 — The Returning Favor

**probesAxes:** `[L, C]` · **probeTension:** `reciprocity_vs_impartiality` · **isClarifying:** false
**Illustration:** Two hands exchanging something across a counter
**Assumptions:**
- You have the power to do it, and no one would find out.
- Her grandson genuinely needs housing, as do the others.
- There is no other way to repay her that she would accept.

**Question:** You run the waiting list for cheap city apartments. The woman who took you in when you were homeless asks you to move her grandson to the top. Families have waited years. What do you do?

- A: Move him up — I owe her *(L+2, C-2)*
- B: Say no — the list is the list *(L-2, C+2)*

---

### D11 — The Silent Witness (Clarifying)

**probesAxes:** `[S, L]` · **probeTension:** `authority_trust_vs_personal_judgment` · **isClarifying:** true
**Illustration:** A courtroom, an empty witness stand
**Assumptions:**
- You were the only witness.
- Leaving out who struck first would be a lie by omission.
- Refusing to testify carries a contempt charge.

**Question:** *Something came up that we want to explore.* Your brother got into a fight outside a bar. The other man was badly hurt. In court, you're asked who threw the first punch. It was your brother. What do you say?

- A: The whole truth *(S+2, L-2)*
- B: Everything but that — I leave it out *(L+2, S-1)*
- C: I refuse to testify and accept the charge *(L+2, S-3)*

---

### D12 — The Bonus Pool (Clarifying)

**probesAxes:** `[O, C]` · **probeTension:** `individual_optimization_vs_collective_equity` · **isClarifying:** true
**Illustration:** Five envelopes on a desk, one much thicker than the others
**Assumptions:**
- The performance numbers are accurate and not disputed.
- The whole team knows each other's output.
- You have full decision authority, and the pool can only be divided once.

**Question:** *Something came up that we want to explore.* You manage a team of five and have one bonus pool to divide. Your best performer produced more than the other four combined. The other four all worked hard. How do you divide it?

- A: Most of it to the best performer — reward what they produced *(O+2, C-2)*
- B: Evenly — everyone gave their full effort *(C+2, O-2)*

**Follow-up (if evenly):** *Illustration: the thick envelope, now pushed back across the desk*
**Assumptions (follow-up):**
- The threat is credible, and replacing them would take a year.
Your best performer says they'll quit if it's split evenly. Losing them would sink the team next year.
- A: I change the split *(O+2, C-1)*
- B: I keep it even *(C+2, L-1)*

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
