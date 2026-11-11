# Questions: Tern (Ethics)

> **Generated file. Do not edit by hand.** `scripts/export-questions.mjs` writes it from the game's content files. To change a question, change it in `game/content*.js`, then run `npm run export:questions`. Question wording, nudges and follow-up rules are the assessment instrument: change them only with Ken's say-so (AGENTS.md, "questions.js Is the Assessment Instrument").

This is every question in the game: 75 questions across 5 worlds, 399 answers, 42 portrait lines (tendencies) and 70 tensions. How the answers are scored is in `docs/SCORING.md`. Candidate questions that aren't in the game are in `docs/QUESTION-BANK.md`.

Sources, in load order: `game/content.js`, `game/content-neighborhood.js`, `game/content-city.js`, `game/content-coast.js`, `game/content-observatory.js`. Scoring and unlock rules: `game/portrait.js`.

## How to read this file

- **Nudges** move the five value pairs (axes). A positive number pushes toward the first side of the pair, a negative number toward the second. `OR +3 (Outcomes)` means three points toward Outcomes; `LP -2 (Principle)` means two points toward Principle.
- **Step weight** multiplies every nudge in that step. The first question weighs 1; follow-ups weigh 1.5 unless the step sets its own.
- **Most signal** is the most a question can move each axis: the strongest first answer plus the strongest follow-up, each times its step weight (`possible()` in `portrait.js`).
- **Note** is what the player reads right after answering. **Did** is the one-line restatement shown in "Read more about you", away from the question, so it names everything in full.
- **When shown** for a follow-up comes from running the question's own `next()` rule on every answer combination.
- **Scene** is the id of the code-drawn scene in `game/scenes*.js`. **Heavy**, **medium** or **light** is how emotionally heavy the scene is; it guides where stops sit on the map and isn't used in scoring.

## Rules every question must meet

Check these before adding or changing a question. They come from Ken's rulings in AGENTS.md.

- No obviously correct answer: a thoughtful person could defend every option.
- **No escape answers:** no compromise that lets the player step around the dilemma ("split it", "do both", "defer to experts", "only if they ask", "try the official route first"). A middle option survives only with its own real cost.
- **Hard:** a thoughtful person hesitates. If about 80% would pick the same answer in seconds, sharpen it or cut it.
- A follow-up fires only for answers that could plausibly change under the new fact, and changes the situation rather than restating it. Give follow-ups to both sides where possible.
- The answers move at least two axes.
- **Nudges are honest** (Ken, 2026-11-10): an answer moves a pair only if choosing it really says something about that pair. Balance is a check afterwards (`npm run simulate`, and `npm run simulate:crowd` for the park), never a reason to add a push.
- Any combination with other answers has a coherent explanation in the axis model. Apparent inconsistency is information, never an error.
- The setup line states the facts that close off imagined variants (time pressure, other options, who is involved), so everyone answers the same situation. (This replaced the old "assumptions" block.)
- **The setup is read before the question** (Ken, 2026-10-07). Write it as one or two full sentences that make sense on their own: no fragments, no "they" or "it" before the question has said who, and never a repeat of the question. It adds a fact the question leaves out, such as whether it's legal, who would know, or what refusing costs, and closes the obvious dodge ("I'd just talk to them first").
- **Every follow-up ends in a real question** ("Do you still donate?"), never a bare statement of the new fact.
- **Answers are first person with a full stop, and the answers in a step have the same shape** ("I report it." / "I stay out of it."). Follow-up answers use "I still ..." / "Then I ...". If one answer carries a reason, the others carry one of equal weight, or none do.
- Plain words a second-language reader gets on one pass: no idioms ("set the record straight", "draw lots"), no jargon ("civil disobedience"). Titles count as part of the question, so they must not judge an answer ("The Informant").
- Before adding a follow-up, check the nearby stops don't already use the same lever ("someone you love", "your job").
- Identity-neutral by default: no gender or race cues unless the cue is what the question tests.
- Answerable honestly from anywhere on the political spectrum. The tone is curious, never accusing.
- Every answer has a `note` and a `did` line. A `did` line names its subject in full and never says "it", "that" or "the one" to point back at the question.
- Portrait lines (tendencies) make sense to a stranger who sees them on their own, in plain words. Each needs a `share` line, or a deliberate decision to leave it out.

## The five axes

The code is one letter per axis, in this order. An exact tie goes to the side of the player's most recent answer on that axis.

| Axis | Letters | Positive side | Negative side |
|---|---|---|---|
| `OR` | O / R | **Outcomes.** You judge a choice by what it leads to. | **Rules.** Some things you won't do, even for a better result. |
| `CI` | C / I | **Collective.** You put what's good for everyone above your own gain. | **Individual.** You look out for yourself and let others run their own lives. |
| `HT` | H / T | **Heart.** You decide by how it will feel for the people involved. | **Thought.** You reason it through and keep feelings out of it. |
| `LP` | L / P | **Loyalty.** The people close to you count more than strangers. | **Principle.** You hold people close to you to the same standard as anyone. |
| `SD` | S / D | **System.** You work within the rules, even when you don't like the result. | **Disruption.** You'll break the rules when you think they're wrong. |

### How much each world can move each axis

Each cell: how many questions can move the axis, and in brackets the total of their most signal.

| Axis | The Park | The Neighborhood | The City | The Coast | The Observatory | All worlds |
|---|---|---|---|---|---|---|
| Outcomes / Rules | 6 (20) | 7 (28.5) | 15 (49) | 11 (51) | 12 (39.5) | 51 (188) |
| Collective / Individual | 8 (29.5) | 9 (30.5) | 15 (48) | 9 (41.5) | 13 (39.5) | 54 (189) |
| Heart / Thought | 7 (24) | 12 (39) | 12 (36) | 8 (38.5) | 12 (34.5) | 51 (172) |
| Loyalty / Principle | 5 (19.5) | 8 (32) | 12 (41.5) | 7 (27.5) | 11 (26) | 43 (146.5) |
| System / Disruption | 4 (19) | 3 (12) | 13 (60) | 3 (14) | 4 (8) | 27 (113) |

## World 1: The Park

12 questions. Open from the start. Everyone answers the same 12, in any order, and only these set the five-letter code.

Unlock ladder (park answers, from `LADDER` in `portrait.js`):

- 1 answered: Your first answer note
- 2 answered: Your compass
- 4 answered: Your one-line summary
- 6 answered: What you protect
- 8 answered: Where you’re torn
- 10 answered: Your whole compass
- 12 answered: Your code

### Q1: The Trolley

Scene `trolley` · heavy · Most signal: OR 6 · HT 4 · LP 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Everyone on both tracks is a stranger to you. There's no time to warn anyone, and there's no third option.

*Question:* A runaway trolley is heading toward 5 people. You can pull a lever that diverts it to a side track where 1 person will die. What do you do?

- **Q1-A:** I pull the lever.
  - Nudges: OR +3 (Outcomes)
  - Note: You'd rather cause one death than stand by for five. For you, doing nothing is still a choice.
  - Did: You'd pull the lever to save five, knowing one will die.
- **Q1-B:** I don't pull it.
  - Nudges: OR -3 (Rules)
  - Note: There's a line you won't cross with your own hands, even when the numbers say you should.
  - Did: You wouldn't pull the lever, even to save five.

**Follow-up `fuA`** (step weight 1.5). Shown after Q1-A (I pull the lever).

*Setup:* The five on the main track are still strangers.

*Question:* What if the 1 person on the side track is your mother?

- **Q1-FUA-A:** I still pull the lever.
  - Nudges: LP -2 (Principle), HT -2 (Thought)
  - Note: You'd give up your own mother to save five strangers. Her life counts the same as anyone's.
  - Did: You'd pull the lever even if the person on the side track were your mother.
- **Q1-FUA-B:** Then I don't pull it.
  - Nudges: LP +2 (Loyalty), HT +2 (Heart)
  - Note: You'd trade one stranger to save five, but not your mother.
  - Did: You wouldn't pull the lever if the person on the side track were your mother.

**Follow-up `fuAA`** (step weight 2). Shown after Q1-A (I pull the lever), then Q1-FUA-B (Then I don't pull it).

*Setup:* Your child is alone on the side track. Everyone on the main track is a stranger.

*Question:* What if the 1 person on the side track is your child, and pulling now would save 100 strangers?

- **Q1-FUB-A:** Then I pull the lever.
  - Nudges: LP -3 (Principle), HT -2 (Thought)
  - Note: You wouldn't give up your mother to save five, but you would give up your child to save 100. Your loyalty to family has a limit.
  - Did: You'd pull the lever to save 100 strangers, even with your child on the side track.
- **Q1-FUB-B:** I still don't pull it.
  - Nudges: LP +3 (Loyalty), HT +2 (Heart)
  - Note: No number of strangers would make you give up your child.
  - Did: You wouldn't pull the lever with your child on the side track, even to save 100 strangers.

**Follow-up `fuB`** (step weight 1.5). Shown after Q1-B (I don't pull it).

*Setup:* Everyone on both tracks is still a stranger.

*Question:* What if there are 100 people on the main track, not 5? Do you pull the lever?

- **Q1-FUB2-A:** Then I pull the lever.
  - Nudges: OR +2 (Outcomes)
  - Note: You won't cause one death to save five, but you would to save 100. Your line gives way when the numbers get big enough.
  - Did: You'd pull the lever to save 100 strangers, though you wouldn't to save five.
- **Q1-FUB2-B:** I still don't pull it.
  - Nudges: OR -2 (Rules)
  - Note: Your line holds at any number. You won't be the one who causes a death, even to save 100.
  - Did: You wouldn't pull the lever even to save 100 strangers.

### B09: The 2 A.M. Call

Scene `call` · heavy · Most signal: CI 1.5 · LP 6 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your sibling refuses to turn themselves in, and leaving the scene of a crash can mean prison.

*Question:* At 2 a.m., your sibling calls: they hit a cyclist and drove off in a panic. The cyclist will recover, and the police have no leads. Your sibling asks you to say they were with you tonight. Do you say they were with you?

- **B09-A:** Yes. I cover for them.
  - Nudges: LP +3 (Loyalty), SD -2 (Disruption)
  - Note: You'd lie to the police for family. Your sibling comes before the law.
  - Did: You'd lie to the police to cover your sibling's hit-and-run.
- **B09-B:** No. I won't lie for them.
  - Nudges: LP -3 (Principle), SD +2 (System)
  - Note: You love them, but you won't lie to the police for them.
  - Did: You wouldn't lie to the police about your sibling's hit-and-run.

**Follow-up `fuA`** (step weight 1.5). Shown after B09-A (Yes. I cover for them).

*Setup:* You told the police your sibling was with you that night.

*Question:* A week later, police arrest a different person for the crash. That person is innocent, and the evidence against them looks strong. What do you do?

- **B09-FUA-A:** Then I tell the police the truth.
  - Nudges: LP -2 (Principle), SD +2 (System), CI +1 (Collective)
  - Note: You'll shield your sibling, but not at a stranger's expense. Your loyalty stops where someone innocent pays.
  - Did: You'd tell the police the truth once an innocent person was arrested for your sibling's crash.
- **B09-FUA-B:** I keep quiet.
  - Nudges: LP +2 (Loyalty), SD -2 (Disruption), CI -1 (Individual)
  - Note: Even with an innocent person arrested, you protect your sibling. Your loyalty to them has almost no limit.
  - Did: You'd stay quiet even after an innocent person was arrested for your sibling's crash.

**Follow-up `fuB`** (step weight 1.5). Shown after B09-B (No. I won't lie for them).

*Setup:* You refused to give your sibling an alibi.

*Question:* The police never ask you. Do you tell them what you know?

- **B09-FUB-A:** Yes. I report my sibling.
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: You don't just refuse to lie; you go to the police yourself. For you, what happened matters more than who did it.
  - Did: You'd report your sibling without being asked.
- **B09-FUB-B:** No. I don't report them.
  - Nudges: LP +2 (Loyalty)
  - Note: You wouldn't lie for your sibling, but you wouldn't turn them in either.
  - Did: You wouldn't lie for your sibling or report them.

### B02: The Deathbed Question

Scene `deathbed` · heavy · Most signal: OR 5 · HT 3.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Nothing can bring the business back, and your grandfather will never find out unless you tell him.

*Question:* Your grandfather has hours to live. The family business he spent his life building went bankrupt last year. He grips your hand: "Tell me the truth. Is it doing well?" What do you say?

- **B02-A:** I tell him the truth.
  - Nudges: OR -2 (Rules), HT -2 (Thought)
  - Note: He asked for the truth, so he gets it, even now. You think people have a right to the truth about their own lives.
  - Did: You'd tell your dying grandfather his business failed.
- **B02-B:** I tell him it's doing well.
  - Nudges: OR +2 (Outcomes), HT +2 (Heart)
  - Note: You'd give a dying man peace over facts he can't change.
  - Did: You'd tell your dying grandfather his failed business is doing well.

**Follow-up `fu`** (step weight 1.5). Shown after B02-B (I tell him it's doing well).

*Setup:* He trusts you completely and will believe whatever you say.

*Question:* Years ago he told you, "Whatever happens, never lie to me. Not even at the end." Does that change your answer?

- **B02-FU-A:** Yes. I tell him the truth.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd bend the truth for his comfort, but not break a promise he asked you to keep.
  - Did: You'd tell your grandfather the truth because he once asked you never to lie to him.
- **B02-FU-B:** No. I still tell him it's doing well.
  - Nudges: OR +2 (Outcomes), HT +1 (Heart)
  - Note: You'd break his own wish to spare him pain. You trust what he needs now over what he said then.
  - Did: You'd still tell your grandfather the business is doing well, though he once asked you never to lie to him.

### B13: Two Worlds

Scene `worlds` · light · Most signal: CI 6.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Once you're born, you can't move to the other world.

*Question:* You'll be born into one of two worlds, as a random person. In World A, everyone has a decent, secure life, but no one is rich. In World B, most people live much better than in World A, but 1 in 10 struggle to afford food and a home. Which world do you choose?

- **B13-A:** World A.
  - Nudges: CI +2 (Collective)
  - Note: You'd give up a better life for most so that no one struggles.
  - Did: You'd choose the world where everyone is secure and no one is rich.
- **B13-B:** World B.
  - Nudges: CI -2 (Individual)
  - Note: You'll take the better odds for most people, even knowing some will struggle.
  - Did: You'd choose the richer world where 1 in 10 struggle.

**Follow-up `fu`** (step weight 1.5). Shown after B13-A (World A).

*Setup:* Everything else about the two worlds stays the same.

*Question:* Now you know for sure you'll be born into the top half of World B. Do you switch?

- **B13-FU-A:** Then I switch to World B.
  - Nudges: CI -3 (Individual)
  - Note: You picked World A so you wouldn't end up at the bottom. Once you're safe, you'd take the richer world.
  - Did: You'd switch to the richer world once you knew you'd be in its top half.
- **B13-FU-B:** I still choose World A.
  - Nudges: CI +3 (Collective)
  - Note: Even knowing you'd be fine, you'd rather live where no one is left out.
  - Did: You'd stay in the equal world, even knowing you'd be in the richer one's top half.

### B18: The Pond and the Faraway Child

Scene `pond` · heavy · Most signal: OR 1 · CI 3 · HT 3.5 · LP 3.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Assume you can afford to lose $800 without real hardship.

*Question:* A small child is drowning in a pond in front of you. Saving them will ruin your $800 phone. Meanwhile, $800 given to a proven charity would very likely save a child's life far away. Is walking past the drowning child worse than not giving $800 to charity?

- **B18-A:** Yes. Being right there makes it mine.
  - Nudges: LP +2 (Loyalty), HT +2 (Heart), OR -1 (Rules)
  - Note: The child in front of you matters more than one you can't see. Being there makes it your job.
  - Did: You think walking past a drowning child is worse than not giving to save one far away.
- **B18-B:** No. A child is a child.
  - Nudges: LP -2 (Principle), HT -2 (Thought), OR +1 (Outcomes)
  - Note: You don't let distance decide who counts. A life far away weighs the same to you.
  - Did: You think not giving to save a faraway child is as bad as walking past a drowning one.

**Follow-up `fu`** (step weight 1.5). Shown after B18-B (No. A child is a child).

*Setup:* Be honest about how you actually live.

*Question:* Most people don't act as if a faraway child counts the same. Do you?

- **B18-FU-A:** Mostly, yes.
  - Nudges: CI +2 (Collective), LP -1 (Principle)
  - Note: You say distance doesn't matter, and you give money like you mean it.
  - Did: You say you give as if faraway children count the same.
- **B18-FU-B:** Not really, and it bothers me.
  - Nudges: HT +1 (Heart)
  - Note: You believe it, but you don't fully live by it, and that bothers you.
  - Did: You say you don't live as if faraway children count the same, and it bothers you.
- **B18-FU-C:** Not really, and I'm at peace with that.
  - Nudges: CI -2 (Individual)
  - Note: You believe every child counts the same, and you've made peace with not acting on it.
  - Did: You say you don't live as if faraway children count the same, and you're at peace with it.

### B29: The Jury

Scene `jury` · medium · Most signal: HT 5 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The judge can't give a lighter sentence, and every juror must agree on the verdict.

*Question:* You're on a jury. The law is clear and so is the evidence: the defendant is guilty. They stole baby formula for their infant and now face five years in prison. How do you vote?

- **B29-A:** Guilty. My job is the law, not the sentence.
  - Nudges: SD +2 (System), HT -2 (Thought)
  - Note: You do the job you were given, even when the outcome feels wrong. The sentence isn't yours to fix.
  - Did: You'd vote guilty for a parent who stole baby formula.
- **B29-B:** Not guilty. I won't send them to prison for this.
  - Nudges: SD -2 (Disruption), HT +2 (Heart)
  - Note: You'd set the law aside rather than let it crush someone for feeding their baby.
  - Did: You'd vote not guilty for a parent who stole baby formula, though the law says guilty.

**Follow-up `fuA`** (step weight 1.5). Shown after B29-A (Guilty. My job is the law, not the sentence).

*Setup:* You were going to vote guilty.

*Question:* Then you learn that if they're convicted, their baby goes into foster care. Does that change your vote?

- **B29-FUA-A:** No. I still vote guilty.
  - Nudges: SD +2 (System), HT -2 (Thought)
  - Note: Even with a baby's home at stake, you vote by the law. Higher stakes don't change your vote.
  - Did: You'd still vote guilty on the baby formula theft, even with their baby going into foster care.
- **B29-FUA-B:** Yes. I vote not guilty.
  - Nudges: HT +2 (Heart), SD -2 (Disruption)
  - Note: You'll follow the law until a child pays for it. Then the child wins.
  - Did: You'd switch to not guilty on the baby formula theft to keep their baby out of foster care.

**Follow-up `fuB`** (step weight 1.5). Shown after B29-B (Not guilty. I won't send them to prison for this).

*Setup:* The law, the evidence and the sentence are the same.

*Question:* Now picture the same case, but they stole money to pay off a gambling debt. How do you vote?

- **B29-FUB-A:** Then I vote guilty.
  - Nudges: HT +2 (Heart), SD +1 (System)
  - Note: You let them off because of the baby. Without that reason, you'd convict.
  - Did: You'd vote guilty if the theft paid off a gambling debt.
- **B29-FUB-B:** I still vote not guilty.
  - Nudges: SD -2 (Disruption), HT -2 (Thought)
  - Note: Your problem is the law itself, whoever breaks it. You'd vote the same for someone you don't feel sorry for.
  - Did: You'd still vote not guilty if the theft paid off a gambling debt.

### B37: The Bank Card

Scene `bankcard` · medium · Most signal: OR 2 · CI 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your friend wants an answer tonight, and you can't ask anyone else for advice.

*Question:* A friend trying to quit gambling asked you to hold their bank card and never give it back, no matter what they say. Tonight they're calm and sober and ask for it back. They say they've changed their mind, and if you don't hand it over, the friendship is over. Do you give it back?

- **B37-A:** Yes. It's their money and their life.
  - Nudges: CI -2 (Individual), OR +1 (Outcomes)
  - Note: You let your friend decide for themselves tonight, even though they asked you not to.
  - Did: You'd give your friend back the bank card they asked you to keep from them.
- **B37-B:** No. I keep the promise they asked me to keep.
  - Nudges: OR -2 (Rules), CI +1 (Collective)
  - Note: You'd risk the friendship to keep the promise they asked for when they wanted help.
  - Did: You'd keep your friend's bank card as promised, even if it ends the friendship.

### D8: The Waiting List

Scene `waitlist` · medium · Most signal: CI 2 · LP 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No one would ever find out, and the delay won't put your father's life at risk.

*Question:* Your father needs hip surgery. The waiting list is eight months, and he's in pain every day. A friend on the hospital board can move him up this week, ahead of people who've waited longer. It breaks no rules. Do you make the call?

- **D8-A:** Yes. I make the call.
  - Nudges: LP +2 (Loyalty), CI -2 (Individual)
  - Note: You'd use a connection to spare your father pain, even if it means others wait longer.
  - Did: You'd use a connection to get your father's surgery ahead of people who waited longer.
- **D8-B:** No. He waits his turn.
  - Nudges: LP -2 (Principle), CI +2 (Collective)
  - Note: You'd let your own father hurt before you'd step ahead of people who've waited longer.
  - Did: You'd let your father wait his turn for surgery, though he's in pain.

### B40: The Dinner Joke

Scene `dinner` · medium · Most signal: HT 1.5 · LP 2 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Everyone heard the joke, and no one has said anything yet.

*Question:* At a family dinner, a relative makes a cruel joke about a group of people. No one from that group is there. Most of the table laughs. Honestly, what do you usually do?

- **B40-A:** I say something right then.
  - Nudges: SD -2 (Disruption), LP -2 (Principle)
  - Note: You'll break the mood at your own family's table. Saying it's wrong matters more to you than keeping the peace.
  - Did: You'd speak up when a relative makes a cruel joke at dinner.
- **B40-B:** I stay quiet.
  - Nudges: LP +1 (Loyalty), SD +1 (System)
  - Note: You don't join in, but you don't make it a fight either.
  - Did: You'd stay quiet when a relative makes a cruel joke at dinner.
- **B40-C:** I smile along.
  - Nudges: LP +1 (Loyalty), SD +2 (System)
  - Note: You'll go along with the room to keep the family evening pleasant.
  - Did: You'd smile along when a relative makes a cruel joke at dinner.

**Follow-up `fu`** (step weight 1.5). Shown after B40-B (I stay quiet); or after B40-C (I smile along).

*Setup:* Your friend isn't at the dinner and will never hear about it.

*Question:* What if your close friend belongs to that group? Do you say something?

- **B40-FU-A:** Then I say something.
  - Nudges: SD -2 (Disruption), HT +1 (Heart)
  - Note: You'll speak up when it's someone you love. It has to be personal before you'll make a scene.
  - Did: You'd speak up if a close friend were in the group being mocked.
- **B40-FU-B:** I still let it go.
  - Nudges: SD +2 (System)
  - Note: Even for a close friend, you'd keep the table calm. Open conflict with family costs you a lot.
  - Did: You'd still let it go if a close friend were in the group being mocked.

### Q6: The Promotion

Scene `promotion` · medium · Most signal: CI 5 · HT 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Only one person can get the role, and you can't help your colleague with money any other way.

*Question:* You and a colleague are finalists for one promotion, and performance is essentially equal. Your colleague is under heavy financial pressure. What do you do?

- **Q6-A:** I compete for it.
  - Nudges: CI -2 (Individual), HT -2 (Thought)
  - Note: You'd feel for them, but you won't step aside. You'd let the better candidate win.
  - Did: You'd compete for the promotion against a colleague who needs the money.
- **Q6-B:** I step aside.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You'd give up your own step forward because they need it more.
  - Did: You'd step aside so a colleague who needs the money gets the promotion.

**Follow-up `fuA`** (step weight 1.5). Shown after Q6-A (I compete for it).

*Setup:* You'd be fine without the promotion.

*Question:* Then you learn they may lose their home without the raise. Do you still compete?

- **Q6-FUA-A:** I still compete.
  - Nudges: CI -2 (Individual), HT -2 (Thought)
  - Note: Even with their home at stake, you won't let need decide who earns the job.
  - Did: You'd still compete for the promotion knowing your colleague might lose their home.
- **Q6-FUA-B:** Then I step aside.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You'll compete until someone could really get hurt. Then you step back.
  - Did: You'd step aside from the promotion once you knew your colleague might lose their home.

**Follow-up `fuB`** (step weight 1.5). Shown after Q6-B (I step aside).

*Setup:* Their money trouble is just as real.

*Question:* Then you learn for sure that last year, this colleague quietly took credit for your work. Do you still step aside?

- **Q6-FUB-A:** I still step aside.
  - Nudges: CI +2 (Collective)
  - Note: What they did to you doesn't cancel what they need. You're kind to people even when they haven't earned it.
  - Did: You'd still step aside after learning your colleague took credit for your work.
- **Q6-FUB-B:** Then I compete for it.
  - Nudges: CI -2 (Individual)
  - Note: Your generosity has a condition: people have to have played fair with you.
  - Did: You'd compete once you learned your colleague took credit for your work.

### B21: The Million-Dollar Button

Scene `button` · light · Most signal: OR 4 · CI 7.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You'll never be able to find the stranger or pay them back.

*Question:* If you press a button, you get $1 million. Somewhere, a stranger you'll never meet loses $1,000. It hurts them, but not badly. Do you press it?

- **B21-A:** Yes. I press it.
  - Nudges: CI -3 (Individual), OR +1 (Outcomes)
  - Note: A big gain for you outweighs a small hurt to someone you'll never see.
  - Did: You'd take $1 million, knowing a stranger loses $1,000.
- **B21-B:** No. I don't press it.
  - Nudges: CI +3 (Collective), OR -1 (Rules)
  - Note: You won't take money from someone who didn't agree to it, even a little, even for a million.
  - Did: You'd turn down $1 million that costs a stranger $1,000.

**Follow-up `fuA`** (step weight 1.5). Shown after B21-A (Yes. I press it).

*Setup:* You'd still get the $1 million.

*Question:* What if pressing it costs a thousand strangers $1,000 each? Do you still press it?

- **B21-FUA-A:** I still press it.
  - Nudges: CI -3 (Individual)
  - Note: Even a thousand strangers losing money doesn't stop you. Your own gain comes first.
  - Did: You'd still take the $1 million if a thousand strangers each lost $1,000.
- **B21-FUA-B:** Then I don't press it.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: You were weighing the harm all along. One stranger's loss was worth it to you. A thousand aren't.
  - Did: You'd turn down the $1 million if a thousand strangers each lost $1,000.

**Follow-up `fuB`** (step weight 1.5). Shown after B21-B (No. I don't press it).

*Setup:* You'd still get the $1 million.

*Question:* What if the $1,000 comes from a billionaire who would never notice? Do you press it?

- **B21-FUB-A:** Then I press it.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: Your no was about the harm, not the taking. If no one really gets hurt, you'd press it.
  - Did: You'd take the $1 million if it came from a billionaire who'd never notice.
- **B21-FUB-B:** I still don't press it.
  - Nudges: OR -2 (Rules), CI +1 (Collective)
  - Note: How much it hurts doesn't matter to you. Taking what isn't yours is wrong.
  - Did: You'd still turn down the $1 million if it came from a billionaire who'd never notice.

### B01: The Invisible Year

Scene `invisible` · light · Most signal: OR 2 · CI 2 · HT 1.5 · SD 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Everything else about your life stays the same.

*Question:* For one year, nothing you do can ever be traced back to you. No cameras, no witnesses, no consequences. Honestly, would you live any differently?

- **B01-A:** No. I'd live the same.
  - Nudges: OR -2 (Rules), SD +1 (System)
  - Note: You say you'd act the same whether or not anyone's watching.
  - Did: You say you'd live the same if nothing could be traced back to you.
- **B01-B:** Yes. I'd do things I'm not proud of.
  - Nudges: OR +1 (Outcomes), CI -2 (Individual)
  - Note: You admit that being watched keeps you in line, which most people won't say out loud.
  - Did: You say you'd do things you're not proud of if nothing could be traced back to you.

**Follow-up `fu`** (step weight 1.5). Shown after any first answer.

*Setup:* Now everyone gets the same unseen year.

*Question:* Now everyone gets the same year. By the end, is the world better or worse?

- **B01-FU-A:** Better. Most people are decent when no one's watching.
  - Nudges: SD -2 (Disruption), HT +1 (Heart)
  - Note: You trust people to be good on their own. You don't think rules are the only thing keeping them in line.
  - Did: You think the world would be better if everyone got a year where nothing could be traced to them.
- **B01-FU-B:** Worse. Most people are decent because someone is watching.
  - Nudges: SD +2 (System), HT -1 (Thought)
  - Note: You think most people behave because someone might see. That's why rules matter to you.
  - Did: You think the world would be worse if everyone got a year where nothing could be traced to them.

## World 2: The Neighborhood

14 questions. Chapter: "With the people closest to you". Opens after 12 of The Park's 12 questions (all of them), and stays open after that.

Unlock ladder (answers in The Neighborhood):

- 3 answered: How you change close to home
- 6 answered: What you do close to home
- 10 answered: Your Neighborhood chapter

### B56: The Quiet Loan

Scene `loan` · light · Most signal: CI 1 · HT 4 · LP 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You'd notice losing $200, but you can manage without it.

*Question:* Six months ago, a friend borrowed $200 from you. They haven't mentioned it since. Today you see photos from their vacation. What do you do?

- **B56-A:** I ask them to pay it back.
  - Nudges: LP -2 (Principle), CI -1 (Individual)
  - Note: You'd raise the money directly, even if it's awkward. A friend still has to pay back what they borrowed.
  - Did: You'd ask a friend directly to repay a $200 loan they hadn't mentioned in six months.
- **B56-B:** I let it go and say nothing.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: You'd let the money go rather than have an awkward talk with a friend. The friendship matters more to you than $200.
  - Did: You'd let a friend's unpaid $200 loan go to protect the friendship.

**Follow-up `fu`** (step weight 1.5). Shown after B56-B (I let it go and say nothing).

*Setup:* You never brought up the first $200.

*Question:* Now they ask to borrow another $200. Do you lend it?

- **B56-FU-A:** No. Not until they pay back the first $200.
  - Nudges: LP -2 (Principle), HT -1 (Thought)
  - Note: You'll let one unpaid loan slide, but not a second. When a friend asks for more, you say what they still owe.
  - Did: You'd refuse a friend a second $200 loan and bring up the first one they never repaid.
- **B56-FU-B:** Yes. I lend it again.
  - Nudges: LP +2 (Loyalty), HT +2 (Heart)
  - Note: You'd lend a friend money again, even though they never paid back the first loan. You keep the friendship easy at your own cost.
  - Did: You'd lend a friend another $200, though they never repaid the first $200.

### B55: The Bent Rule

Scene `boardgame` · light · Most signal: HT 2 · LP 1 · SD 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* If you don't have children, picture a child you're raising. Their friends are still at the table.

*Question:* Your 10-year-old wins a board game against their friends by knowingly bending a rule. No one else noticed, and they're very happy about the win. Do you make them give up the win?

- **B55-A:** Yes. They give up the win.
  - Nudges: SD +2 (System), LP -1 (Principle)
  - Note: You'd have your own child give back a win, even over a small rule no one noticed. Small rules still count for you.
  - Did: You'd make your 10-year-old give back a board game win they got by bending a rule.
- **B55-B:** No. The win stands, and I don't bring it up.
  - Nudges: HT +2 (Heart), SD -1 (Disruption)
  - Note: You'd let a small bent rule pass to keep your child's happy moment. In a kids' game, it isn't worth spoiling.
  - Did: You'd say nothing when your 10-year-old won a board game by bending a rule.

### B24: The Dog or the Stranger

Scene `dog` · medium · Most signal: OR 1.5 · HT 5 · LP 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* If you don't have a dog, picture an animal you've loved. There's only time to save one life.

*Question:* Your apartment building is on fire. Your dog is trapped in your apartment, and a stranger lies unconscious on another floor. Who do you save?

- **B24-A:** The stranger.
  - Nudges: LP -2 (Principle), HT -2 (Thought)
  - Note: You'd let your own dog die to save a person you've never met. A human life comes first, even over an animal you love.
  - Did: You'd save an unconscious stranger from your burning apartment building instead of your dog.
- **B24-B:** My dog.
  - Nudges: LP +3 (Loyalty), HT +2 (Heart)
  - Note: You'd save the animal you love over a person you don't know. Your bond with your dog counts for more.
  - Did: You'd save your dog from your burning apartment building instead of an unconscious stranger.

**Follow-up `fu`** (step weight 1.5). Shown after B24-A (The stranger).

*Setup:* There's still only time to reach one.

*Question:* You learn the stranger is the person who set the fire. Who do you save?

- **B24-FU-A:** I still save the stranger.
  - Nudges: LP -2 (Principle), HT -2 (Thought)
  - Note: Even knowing the stranger set the fire, you'd save them over your dog. What they did doesn't change whose life comes first.
  - Did: You'd save the stranger who set your apartment building on fire over your dog.
- **B24-FU-B:** Then I save my dog.
  - Nudges: LP +2 (Loyalty), OR -1 (Rules)
  - Note: You'd save a stranger over your dog, but not the person who set the fire. What someone did changes how much you'll give up for them.
  - Did: You'd save your dog over the stranger who set your apartment building on fire.

### B43: The Apology They Want

Scene `apology` · medium · Most signal: OR 5 · CI 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No one is asking you to pay for anything. You'll be neighbors for years.

*Question:* Your neighbor blames you for damage to the fence. You're sure it wasn't you. They say they'll drop it if you apologize. Do you apologize?

- **B43-A:** Yes. Ending the fight matters more to me.
  - Nudges: OR +2 (Outcomes), CI +1 (Collective)
  - Note: You'd apologize for something you didn't do to end a fight. Peace matters more to you than being proven right.
  - Did: You'd apologize to a neighbor to end a dispute, though you were sure you were right.
- **B43-B:** No. I won't apologize for something I didn't do.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You won't apologize for something you didn't do, even to end a fight. Saying something false costs you more than the dispute does.
  - Did: You'd refuse to apologize to a neighbor for something you didn't do, even to end the dispute.

**Follow-up `fuA`** (step weight 1.5). Shown after B43-A (Yes. Ending the fight matters more to me).

*Setup:* You apologized, and the dispute ended.

*Question:* Later, you hear they're telling other neighbors you admitted the damage was your fault. What do you do?

- **B43-FUA-A:** I let it go.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: Even when your neighbor tells people you admitted fault, you let it go. You'd rather be misjudged than start the fight again.
  - Did: You'd say nothing when a neighbor told others you'd admitted you were wrong.
- **B43-FUA-B:** I tell the neighbors what really happened.
  - Nudges: CI -2 (Individual), OR -1 (Rules)
  - Note: You'll apologize to keep the peace, but you won't let people believe you were in the wrong. Your good name matters to you.
  - Did: You'd tell the other neighbors what really happened after a neighbor said you'd admitted the fence damage.

**Follow-up `fuB`** (step weight 1.5). Shown after B43-B (No. I won't apologize for something I didn't do).

*Setup:* You didn't apologize. Months have passed.

*Question:* They still won't speak to you, and other neighbors have started taking sides. One apology would still end it. Do you apologize now?

- **B43-FUB-A:** No. I still won't.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: Months of silence and neighbors taking sides don't change your answer. You still won't apologize for something you didn't do.
  - Did: You'd still refuse to apologize for fence damage you didn't cause, after months of a neighbor's silence and other neighbors taking sides.
- **B43-FUB-B:** Yes. Then I apologize.
  - Nudges: OR +2 (Outcomes), CI +1 (Collective)
  - Note: You held out at first. Once the fight had lasted months and other neighbors took sides, you'd apologize to end it.
  - Did: You'd apologize for fence damage you didn't cause, once a neighbor's silence had lasted months and other neighbors took sides.

### B42: The Rumor

Scene `rumor` · medium · Most signal: CI 3 · HT 1 · LP 6.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* There's no way to find out what really happened.

*Question:* A friend in your circle is rumored to have taken money from the group's shared trip fund. There's no proof, and they deny it. Others in the group have started leaving them out. What do you do?

- **B42-A:** I treat them the same as always.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: With no proof, you'd treat your friend the same as always, even as others drop them. A rumor doesn't change how you treat a friend.
  - Did: You'd treat a friend the same as always when a rumor said they'd taken money from a trip fund.
- **B42-B:** I keep my distance.
  - Nudges: LP -1 (Principle), HT -1 (Thought)
  - Note: You'd keep your distance from a friend who might have taken the group's money. Without knowing, you'd rather be careful.
  - Did: You'd keep your distance from a friend rumored to have taken money from a trip fund.

**Follow-up `fu`** (step weight 1.5). Shown after B42-A (I treat them the same as always).

*Setup:* The group is planning its next trip.

*Question:* The others make it clear that if you stick with them, you won't be invited either. Do you still treat them the same?

- **B42-FU-A:** Yes. I still treat them the same.
  - Nudges: LP +3 (Loyalty)
  - Note: You'd stand by an accused friend even if it cost you your place in the group.
  - Did: You'd stand by a friend rumored to have taken money, even at the cost of your place in the group.
- **B42-FU-B:** No. Then I keep my distance.
  - Nudges: CI -2 (Individual), LP -1 (Principle)
  - Note: You'll stand by an accused friend until it costs you your place in the group. Then you step back.
  - Did: You'd keep some distance from a friend rumored to have taken money, once standing by them could cost you your place in the group.

### B44: The Unlocked Phone

Scene `phone` · medium · Most signal: OR 6.5 · CI 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Last week you asked your partner if anything was wrong. They said everything's fine.

*Question:* Your partner leaves their phone unlocked on the table and steps into the shower. Lately you've had a vague feeling something is off. They'd never know if you looked. Do you look?

- **B44-A:** No. I don't look.
  - Nudges: OR -2 (Rules)
  - Note: You wouldn't go through your partner's phone on a hunch. Their privacy holds even when you're uneasy.
  - Did: You wouldn't look through your partner's unlocked phone on a vague feeling.
- **B44-B:** Yes. I look.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: You'd look through your partner's phone on a hunch, even after they said everything's fine. Knowing matters more to you than their privacy.
  - Did: You'd look through your partner's unlocked phone on a vague feeling.

**Follow-up `fuA`** (step weight 1.5). Shown after B44-A (No. I don't look).

*Setup:* Another evening. The phone is unlocked again, and they're in the shower.

*Question:* Earlier that day, a friend told you they saw your partner on what looked like a date. Do you look now?

- **B44-FUA-A:** Yes. Now I look.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: A hunch isn't enough for you to go through your partner's phone, but a friend's report is.
  - Did: You'd look through your partner's phone after a friend said they saw your partner on a date.
- **B44-FUA-B:** No. I still don't look.
  - Nudges: OR -3 (Rules)
  - Note: Even after a friend says they saw your partner on a date, you won't go through their phone. Their privacy is a line you don't cross.
  - Did: You still wouldn't look through your partner's phone, even after a friend said they saw your partner on a date.

**Follow-up `fuB`** (step weight 1.5). Shown after B44-B (Yes. I look).

*Setup:* They'd still never know you looked.

*Question:* They once said that if you ever went through their phone, it would be over between you. Do you still look?

- **B44-FUB-A:** Yes. I still look.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: Even though your partner said going through their phone would end things, you'd still look. Knowing matters more to you than what they asked of you.
  - Did: You'd look through your partner's phone, though they once said doing so would end the relationship.
- **B44-FUB-B:** No. Then I don't.
  - Nudges: OR -2 (Rules)
  - Note: You'd look on a hunch, but not once your partner has said it would end things between you. What they asked of you decides it.
  - Did: You wouldn't look through your partner's phone once they had said doing so would end the relationship.

### B46: The Nightly Call

Scene `nightcall` · medium · Most signal: CI 5 · HT 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your friend won't see a therapist. This has gone on for two months.

*Question:* A friend going through a hard time calls you every night for an hour. You're exhausted, and your sleep and work are suffering. What do you do?

- **B46-A:** I keep taking every call.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You'd keep answering a struggling friend every night, even as your own life slips. Being there for them comes first.
  - Did: You'd keep taking a struggling friend's hour-long call every night, though it's wearing you down.
- **B46-B:** I tell them I can't talk every night.
  - Nudges: CI -2 (Individual), HT -1 (Thought)
  - Note: You'd tell a struggling friend you need to pull back. You won't let your own life fall apart, even to help someone you care about.
  - Did: You'd tell a friend who calls every night that you need to pull back.

**Follow-up `fu`** (step weight 1.5). Shown after B46-B (I tell them I can't talk every night).

*Setup:* You don't know of anyone else they could turn to.

*Question:* When you tell them, they say you're the only person they can talk to. What do you do?

- **B46-FU-A:** Then I keep taking every call.
  - Nudges: HT +2 (Heart), CI +1 (Collective)
  - Note: You'd pull back from a struggling friend, unless you're the only one they have. Then you keep going.
  - Did: You'd keep taking a friend's nightly calls once they said you were the only person they could talk to.
- **B46-FU-B:** I still cut back the calls.
  - Nudges: CI -2 (Individual), HT -1 (Thought)
  - Note: Even when a friend says you're the only one they can talk to, you'd still pull back. You hold to a limit on what you can give.
  - Did: You'd still pull back from a friend's nightly calls, even after they said you were the only person they could talk to.

### Q3: The Confession

Scene `confession` · heavy · Most signal: OR 5 · HT 2.5 · LP 8

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Two of your friends are a couple. You're closer to one of them.

*Question:* The friend you're closer to tells you they've been cheating on their partner. You've asked them to tell their partner, and they won't. What do you do?

- **Q3-A:** I tell the partner. They deserve to know.
  - Nudges: LP -2 (Principle), OR -1 (Rules)
  - Note: You'd tell a friend they're being cheated on, even though the cheater is your closer friend. They have a right to know.
  - Did: You'd tell a friend their partner is cheating, though the cheater is your closer friend.
- **Q3-B:** I stay out of it. It's not my place.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: You'd keep out of a friend's affair, even though the person being cheated on is also your friend. It isn't yours to tell.
  - Did: You'd stay out of it when a close friend confessed to cheating on a partner who is also your friend.

**Follow-up `fuA`** (step weight 1.5). Shown after Q3-A (I tell the partner. They deserve to know).

*Setup:* You have no way to check whether the affair is really over.

*Question:* Before you do, your friend begs you not to. They swear the affair is over and say telling would end the marriage. Do you still tell?

- **Q3-FUA-A:** Yes. I tell the partner anyway.
  - Nudges: LP -2 (Principle), OR -2 (Rules)
  - Note: Even when your friend begs and swears the affair is over, you'd still tell. The partner's right to know comes before what happens next.
  - Did: You'd tell a friend about their partner's affair, even after the cheater begged you not to and swore it was over.
- **Q3-FUA-B:** No. I keep the secret.
  - Nudges: LP +2 (Loyalty), OR +1 (Outcomes), HT +1 (Heart)
  - Note: You'd tell, until your friend begs you not to and swears the affair is over. Then you keep the secret.
  - Did: You'd keep a friend's affair secret once they begged you to and swore it was over.

**Follow-up `fuB`** (step weight 2). Shown after Q3-B (I stay out of it. It's not my place).

*Setup:* No one else is around. Saying "I don't know" would be a lie.

*Question:* Months later, the partner asks you directly: "Is something going on? Please tell me." What do you say?

- **Q3-FUB-A:** I tell them the truth.
  - Nudges: LP -2 (Principle), OR -2 (Rules)
  - Note: You'd stay out of a friend's affair, but you won't lie when the partner asks you to your face.
  - Did: You'd tell a friend the truth when they asked you directly whether their partner was cheating.
- **Q3-FUB-B:** I say I don't know.
  - Nudges: LP +3 (Loyalty), OR +1 (Outcomes)
  - Note: You'd lie to one friend's face to keep another friend's affair secret. The friend who told you comes first.
  - Did: You'd tell a friend you don't know, when they asked you directly whether their partner was cheating.

**Follow-up `fuAA`** (step weight 1.5). Shown after Q3-A (I tell the partner. They deserve to know), then Q3-FUA-B (No. I keep the secret).

*Setup:* You kept the secret. Months have passed.

*Question:* You find out the affair never ended. Do you tell the partner now?

- **Q3-FUAA-A:** Yes. I tell them now.
  - Nudges: LP -2 (Principle), OR -1 (Rules)
  - Note: You kept the secret while you believed the affair was over. Once you learn it never ended, you'd tell the partner.
  - Did: You'd tell a friend's partner about the affair you'd kept secret, once you learned the affair never ended.
- **Q3-FUAA-B:** No. I still keep it.
  - Nudges: LP +3 (Loyalty)
  - Note: Even after learning the affair never ended, you'd keep your friend's secret. You stay loyal to the friend who told you.
  - Did: You'd keep a friend's affair secret, even after learning the affair they swore was over never ended.

### B45: The Friend's Big Break

Scene `bigbreak` · light · Most signal: CI 5 · HT 1 · LP 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* There's no wrong answer. Most people feel a mix of things.

*Question:* Your close friend suddenly gets the exact success you've wanted for years. They call you first to tell you. Honestly, which feeling is stronger?

- **B45-A:** Happiness for them.
  - Nudges: CI +2 (Collective), HT +1 (Heart)
  - Note: When a close friend gets the success you've wanted for years, you mostly feel glad for them.
  - Did: You'd mostly feel happy when a close friend got the success you'd wanted for years.
- **B45-B:** Hurt that it wasn't me.
  - Nudges: CI -2 (Individual)
  - Note: When a close friend gets the success you've wanted for years, the sting is stronger than the joy, and you can admit it.
  - Did: You'd mostly feel the sting when a close friend got the success you'd wanted for years.

**Follow-up `fuA`** (step weight 1.5). Shown after B45-A (Happiness for them).

*Setup:* Their win had a cost for you.

*Question:* You learn their win is why your own project lost its funding. You were both up for the same money. Honestly, which feeling is stronger now?

- **B45-FUA-A:** Still happiness for them.
  - Nudges: CI +2 (Collective)
  - Note: Even when a close friend's win cost your own project its funding, you mostly feel glad for them.
  - Did: You'd still mostly feel happy for a close friend whose win cost your own project its funding.
- **B45-FUA-B:** Hurt at what I lost.
  - Nudges: CI -2 (Individual)
  - Note: You're glad for a friend's success until it costs you. Once their win took your project's funding, the hurt is stronger.
  - Did: You'd mostly feel hurt once you learned a close friend's win cost your own project its funding.

**Follow-up `fuB`** (step weight 1.5). Shown after B45-B (Hurt that it wasn't me).

*Setup:* Your friend wants your help.

*Question:* They ask you to help them in the new role, a few evenings a month, unpaid, because you know the field well. Do you help?

- **B45-FUB-A:** Yes. I help them.
  - Nudges: CI +2 (Collective), LP +1 (Loyalty)
  - Note: Even while it hurts that your friend got the success you wanted, you'd give your own evenings to help them do well.
  - Did: You'd give a close friend a few unpaid evenings a month to help with the success you'd wanted for yourself.
- **B45-FUB-B:** No. I tell them I can't.
  - Nudges: CI -2 (Individual)
  - Note: You'd say no when a close friend asks for unpaid help with the success you wanted for yourself. You keep your own time.
  - Did: You'd turn down a close friend's request for unpaid help with the success you'd wanted for yourself.

### B36: What Forgiveness Is Owed

Scene `forgive` · medium · Most signal: CI 1 · HT 4 · LP 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You believe both the apology and the change are real.

*Question:* Someone close to you betrayed you badly. They've apologized sincerely, and in the year since, they've really changed. Do you owe them forgiveness?

- **B36-A:** Yes. They've earned it.
  - Nudges: CI +1 (Collective), HT +1 (Heart)
  - Note: You think someone who apologized and really changed has earned your forgiveness.
  - Did: You think you owe forgiveness to someone close who betrayed you, then apologized and changed.
- **B36-B:** No. I don't owe it, even now.
  - Nudges: CI -1 (Individual), HT -1 (Thought)
  - Note: You think forgiveness is yours to give, never something you owe, however much someone has changed.
  - Did: You think you don't owe forgiveness to someone close who betrayed you, even after they apologized and changed.

**Follow-up `fu`** (step weight 1.5). Shown after any first answer.

*Setup:* Whatever you decided about forgiveness, this is a separate choice.

*Question:* They ask if the two of you can be as close as before. Do you agree?

- **B36-FU-A:** Yes. We go back to how we were.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: You'd let someone who betrayed you badly all the way back in, once they'd apologized and changed.
  - Did: You'd let someone who betrayed you badly be as close as before, once they'd changed.
- **B36-FU-B:** No. I keep some distance.
  - Nudges: HT -2 (Thought)
  - Note: Even after real change, you'd keep some distance from someone who betrayed you badly. Getting close again has to be earned.
  - Did: You wouldn't let someone who betrayed you badly be as close as before, even after they'd changed.

### D7: The Uncomfortable Truth

Scene `fiance` · medium · Most signal: OR 3 · HT 2 · LP 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your close friend's wedding is next month.

*Question:* You find out from public court records that their fiancé served two years in prison for fraud, long ago, and has lived honestly since. Your friend doesn't know. The fiancé knows you found out and asks you to keep it private. Do you tell your friend?

- **D7-A:** Yes. My friend should know before the wedding.
  - Nudges: HT -2 (Thought), LP +1 (Loyalty)
  - Note: You'd tell a friend about their fiancé's prison record before the wedding. Your friend should know who they're marrying.
  - Did: You'd tell a close friend that their fiancé served prison time for fraud long ago.
- **D7-B:** No. It's the fiancé's past to share.
  - Nudges: HT +2 (Heart), LP -1 (Principle)
  - Note: You'd keep a fiancé's old prison record to yourself. It's their past to share, not yours.
  - Did: You'd keep quiet about a close friend's fiancé's prison record from long ago.

**Follow-up `fu`** (step weight 1.5). Shown after D7-B (No. It's the fiancé's past to share).

*Setup:* You've said nothing so far.

*Question:* Your friend asks you, "Is there anything I should know before I marry them?" Saying no would be a lie. What do you say?

- **D7-FU-A:** I tell them about the prison time.
  - Nudges: OR -2 (Rules), LP +1 (Loyalty)
  - Note: You'd keep a fiancé's past to yourself, but not when your friend asks you straight out. You won't lie to their face.
  - Did: You'd tell a friend about their fiancé's prison record once the friend asked if there was anything to know.
- **D7-FU-B:** I say no.
  - Nudges: OR +2 (Outcomes), LP -1 (Principle)
  - Note: Even when your friend asks you straight out before the wedding, you'd keep the fiancé's past to yourself.
  - Did: You'd tell a friend there's nothing to know before the wedding, though their fiancé served prison time for fraud.

### B10: What We Owe Our Parents

Scene `parents` · heavy · Most signal: CI 5 · HT 3 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your parents have explained their reasons. You've thought hard about them, and you still disagree. They mean what they say.

*Question:* Your parents gave up a lot to raise you. They oppose the person you want to marry. They say that if you marry, they will never see you again. Do you marry anyway?

- **B10-A:** No. After everything, I owe my parents that.
  - Nudges: CI +2 (Collective), SD +2 (System)
  - Note: You'd give up marrying the person you love because your parents ask it. What they gave you is a debt you'd honor.
  - Did: You wouldn't marry the person you love if your parents said they'd never see you again.
- **B10-B:** Yes. Raising me doesn't give them the right to choose for me.
  - Nudges: CI -2 (Individual), SD -2 (Disruption)
  - Note: You'd marry the person you love even if your parents cut you off. Raising you doesn't give them a say over who you marry.
  - Did: You'd marry the person you love even if your parents said they'd never see you again.

**Follow-up `fuA`** (step weight 1.5). Shown after B10-A (No. After everything, I owe my parents that).

*Setup:* Your parents make their terms clear.

*Question:* It isn't only this person. Your parents expect to approve whoever you marry, now or later. Do you still go along with them?

- **B10-FUA-A:** Yes. I still go along with them.
  - Nudges: CI +2 (Collective), SD +2 (System)
  - Note: You'd let your parents approve whoever you marry, now or later. What you owe them includes that say.
  - Did: You'd go along with your parents' wish to approve whoever you marry, now or later.
- **B10-FUA-B:** No. Then I marry this person.
  - Nudges: CI -2 (Individual), SD -2 (Disruption)
  - Note: You'd give up one person for your parents, but you won't let them choose for you for life. Then you'd marry the person you love.
  - Did: You'd marry the person you love once you learned your parents expect to approve whoever you marry.

**Follow-up `fuB`** (step weight 1.5). Shown after B10-B (Yes. Raising me doesn't give them the right to choose for me).

*Setup:* Waiting won't help. They won't see you while you're with this person, married or not.

*Question:* One of your parents becomes seriously ill and may not have long. Do you stay with this person?

- **B10-FUB-A:** Yes. I stay with them.
  - Nudges: CI -2 (Individual), SD -2 (Disruption)
  - Note: Even with a parent seriously ill and maybe near the end, you'd stay with the person you love, though it may mean never seeing that parent again.
  - Did: You'd stay with the person you love, though a seriously ill parent won't see you while you're together.
- **B10-FUB-B:** No. Then I give up this person.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You'd stand up to your parents, until one of them is seriously ill and may not have long. Then you'd give up the person you love.
  - Did: You'd give up the person you love so you could see a seriously ill parent again.

### Q5: The Inheritance

Scene `inheritance` · heavy · Most signal: OR 2.5 · CI 4 · HT 4 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your parent has died, clear-minded to the end. No one else heard what they told you. Your sibling trusts you completely.

*Question:* Your parent's will splits everything equally between you and your sibling. Before they died, they told you in private that they wanted you to have it all, but they never changed the will. What do you do?

- **Q5-A:** I follow the will and split it equally.
  - Nudges: SD +2 (System), OR -1 (Rules), HT -1 (Thought)
  - Note: You'd split the estate as the will says, even though your parent privately asked you to take it all. What's written down is what counts.
  - Did: You'd split your parent's estate equally as the will says, though your parent privately asked you to take it all.
- **Q5-B2:** I tell my sibling what our parent wanted, and ask for it all.
  - Nudges: SD -1 (Disruption), CI -1 (Individual), HT +1 (Heart)
  - Note: You'd tell your sibling what your parent privately wanted and ask for the whole estate, even though the will says to split it. Your parent's word matters more to you than the paperwork.
  - Did: You'd tell your sibling your parent's private wish and ask for the whole estate, though the will splits it equally.

**Follow-up `fuA`** (step weight 1.5). Shown after Q5-A (I follow the will and split it equally).

*Setup:* The will still says to split it equally.

*Question:* Then you learn why your parent changed their mind: your sibling hadn't spoken to them in ten years, while you did all the caregiving. Do you still split it?

- **Q5-FUA2-A:** No. Then I tell my sibling and ask for it all.
  - Nudges: SD -2 (Disruption), CI -1 (Individual)
  - Note: Learning your sibling stayed away for ten years while you did the caring changes your mind. You'd tell your sibling what your parent wanted and ask for it all.
  - Did: You'd ask your sibling for your parent's whole estate after learning your sibling hadn't spoken to your parent in ten years.
- **Q5-FUA2-B:** Yes. I still split it equally.
  - Nudges: SD +2 (System), OR -1 (Rules)
  - Note: Even knowing your sibling stayed away while you did all the caring, you'd split the estate as the will says.
  - Did: You'd still split your parent's estate equally with a sibling who hadn't spoken to them in ten years.

**Follow-up `fuB`** (step weight 1.5). Shown after Q5-B2 (I tell my sibling what our parent wanted, and ask for it all).

*Setup:* Your sibling has agreed to go along with it. You have plenty of money yourself.

*Question:* You learn your sibling is struggling to pay their bills. Do you still take it all?

- **Q5-FUB-A:** Yes. It was our parent's wish.
  - Nudges: CI -2 (Individual), OR -1 (Rules)
  - Note: Even with your sibling struggling to pay their bills, you'd keep the whole estate. Your parent's wish comes first.
  - Did: You'd keep your parent's whole estate, even knowing your sibling struggles to pay their bills.
- **Q5-FUB-B:** No. I split it after all.
  - Nudges: HT +2 (Heart), CI +2 (Collective)
  - Note: You'd take what your parent wanted you to have, until your sibling needed it. Then you'd share.
  - Did: You'd split your parent's estate with your sibling after learning they struggle to pay their bills.

### D1: The Promise About the Home

Scene `carehome` · heavy · Most signal: OR 5 · HT 5.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* A good care home nearby has room, and you can afford it.

*Question:* Your parent has advanced dementia. Caring for them at home would take most of your free time for years and strain your health, work and relationships. Years ago, they made you promise you'd never put them in a care home. What do you do?

- **D1-A:** I keep the promise and care for them at home.
  - Nudges: OR -2 (Rules), HT +1 (Heart)
  - Note: You'd keep your promise to care for your parent at home, even if it takes years of your life and strains your health, work and relationships.
  - Did: You'd care for your parent with dementia at home for years, as you promised them.
- **D1-B:** I move them to the care home.
  - Nudges: OR +2 (Outcomes), HT -1 (Thought)
  - Note: You'd break a promise to your parent rather than let caring for them at home take over your health, work and relationships.
  - Did: You'd move your parent with dementia to a care home, though you promised them you never would.

**Follow-up `fuA`** (step weight 1.5). Shown after D1-A (I keep the promise and care for them at home).

*Setup:* Caring for them still takes most of your free time.

*Question:* They no longer recognize you. They're calm with anyone who is kind to them. Do you still care for them at home?

- **D1-FUA-A:** No. Now I move them.
  - Nudges: OR +2 (Outcomes), HT -2 (Thought)
  - Note: You'd keep the promise while your parent knows you. Once they don't, you'd let the promise go.
  - Did: You'd move your parent to a care home once they no longer recognized you, despite your promise.
- **D1-FUA-B:** Yes. I keep caring for them at home.
  - Nudges: OR -2 (Rules), HT +1 (Heart)
  - Note: Even when your parent no longer knows you, you'd keep caring for them at home. The promise still holds.
  - Did: You'd keep caring for your parent at home after they stopped recognizing you, because you promised.

**Follow-up `fuB`** (step weight 1.5). Shown after D1-B (I move them to the care home).

*Setup:* You visit them every few days.

*Question:* They cry every time you leave and beg to go home. The staff say this usually fades, but there's no guarantee. Do you bring them home?

- **D1-FUB-A:** Yes. I bring them home.
  - Nudges: HT +3 (Heart)
  - Note: You'd move your parent to a care home, but you'd bring them back if they cried for home every time you left.
  - Did: You'd bring your parent home from the care home because they cried every time you left.
- **D1-FUB-B:** No. They stay.
  - Nudges: HT -2 (Thought), OR +1 (Outcomes)
  - Note: Even when your parent cries and begs to go home, you'd keep them at the care home. You hold to the decision over what hurts right now.
  - Did: You'd keep your parent in the care home, even though they cry and beg to go home every time you leave.

## World 3: The City

19 questions. Chapter: "At work and under the law". Opens after 10 of The Neighborhood's 14 questions (about two-thirds), and stays open after that.

Unlock ladder (answers in The City):

- 4 answered: How you change at work and under the law
- 8 answered: What you do at work and under the law
- 13 answered: Your City chapter

### Q11: The Autonomous Car

Scene `selfdrive` · heavy · Most signal: OR 6 · CI 5 · LP 3

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The brakes can't be fixed in time. Everyone involved is an adult stranger to you.

*Question:* A self-driving car's brakes fail. It can hit five pedestrians, or swerve into a wall and kill its one passenger. If you set the rule for every car, what should it do?

- **Q11-A:** Swerve and kill the passenger. Save the five.
  - Nudges: OR +3 (Outcomes), CI +2 (Collective)
  - Note: You'd have every self-driving car kill its own passenger to save five people on the road. Saving the most lives is the rule you'd set.
  - Did: You'd set every self-driving car to swerve and kill its passenger rather than hit five pedestrians.
- **Q11-B:** Stay on course and hit the five. Save the passenger.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You'd have a self-driving car protect the person inside it, even if five people on the road die. A car shouldn't be built to kill its own passenger.
  - Did: You'd set every self-driving car to protect its passenger, even if the car hits five pedestrians.

**Follow-up `fuA`** (step weight 1.5). Shown after Q11-A (Swerve and kill the passenger. Save the five).

*Setup:* The rule applies to every car, with no exceptions.

*Question:* The people you love most will ride in these cars every day. Do you keep the rule?

- **Q11-FUA2-A:** Yes. Same rule for them.
  - Nudges: OR +1 (Outcomes), CI +1 (Collective), LP -2 (Principle)
  - Note: You'd keep a rule that has self-driving cars kill their passenger to save five, even with the people you love most riding in them every day.
  - Did: You'd keep self-driving cars set to sacrifice their passenger to save five pedestrians, even with the people you love most riding in them.
- **Q11-FUA2-B:** No. Then protect the passenger.
  - Nudges: CI -2 (Individual), LP +2 (Loyalty)
  - Note: You'd have self-driving cars save the five, until the people you love most were the passengers. Then you'd change the rule to protect the passenger.
  - Did: You'd change the rule so self-driving cars protect their passenger once the people you love most would ride in them.

**Follow-up `fuB`** (step weight 1.5). Shown after Q11-B (Stay on course and hit the five. Save the passenger).

*Setup:* The five were crossing lawfully.

*Question:* The passenger chose to get in the car. The five people crossing chose nothing. Does that change your rule?

- **Q11-FUB-A:** Yes. Then swerve.
  - Nudges: OR +1 (Outcomes), CI +1 (Collective)
  - Note: You'd protect the passenger at first, but the five on the road never chose any risk. Once you see that, you'd have the car swerve.
  - Did: You'd set self-driving cars to swerve into a wall once you saw that the passenger chose to ride and the five pedestrians didn't.
- **Q11-FUB-B:** No. The car should protect the person inside it.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: Even though the five on the road chose nothing, you'd still have the car protect its passenger. A car should never be built to kill the person inside it.
  - Did: You'd still set self-driving cars to protect their passenger, even though the five pedestrians chose no risk.

### B12: Two Drivers

Scene `twodrivers` · light · Most signal: OR 5 · HT 2.5 · SD 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Here, three drinks is over the legal limit for driving.

*Question:* Two friends each have three drinks and drive home the same way, equally carefully. A child runs into the road in front of one of them, and that driver hits the child, who is badly hurt. The other gets home safely. Did they do something equally wrong?

- **B12-A:** Yes. They made the same choice.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You judge the two drivers by what they chose, not by what happened. Both chose to drive after drinking, so both did the same wrong.
  - Did: You think two friends who drove home after three drinks did equally wrong, though only one of them hit a child.
- **B12-B:** No. The one who hit the child did something worse.
  - Nudges: OR +2 (Outcomes), HT +1 (Heart)
  - Note: For you, what actually happens counts. The driver who hit a child did something worse, even though the other made the same choice.
  - Did: You think a drunk driver who hit a child did worse than a friend who drove home the same way without hitting anyone.

**Follow-up `fuA`** (step weight 1.5). Shown after B12-A (Yes. They made the same choice).

*Setup:* Now the question is what the law should do.

*Question:* Should they get the same punishment?

- **B12-FUA-A:** Yes. The same punishment.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd punish both drivers the same, since both made the same choice. Luck shouldn't decide anyone's sentence.
  - Did: You'd give the same punishment to a drunk driver who hit a child and one who got home safely.
- **B12-FUA-B:** No. The one who hit the child should get more.
  - Nudges: OR +1 (Outcomes), SD +1 (System)
  - Note: You think both drivers did the same wrong, but the law should still punish the one who hit a child more. In court, what happened has to count.
  - Did: You'd punish a drunk driver who hit a child more than one who got home safely, though you think both did equally wrong.

**Follow-up `fuB`** (step weight 1.5). Shown after B12-B (No. The one who hit the child did something worse).

*Setup:* One more fact about the child.

*Question:* The child ran out so suddenly that a sober driver would have hit them too. Did the one who hit the child still do worse?

- **B12-FUB-A:** Yes. They still did worse.
  - Nudges: OR +2 (Outcomes)
  - Note: Even though a sober driver would have hit the child too, you think the drunk driver who did hit the child did worse. What actually happened counts for you.
  - Did: You think a drunk driver who hit a child did worse than a friend who got home safely, even though a sober driver would have hit the child too.
- **B12-FUB-B:** No. Then they did the same wrong.
  - Nudges: OR -1 (Rules), HT -1 (Thought)
  - Note: You thought the driver who hit the child did worse, until you learned a sober driver would have hit the child too. Then both drivers did the same wrong: driving after drinking.
  - Did: You think two friends who drove home after three drinks did the same wrong once you learned a sober driver would have hit the same child.

### B03: The Reference Call

Scene `reference` · medium · Most signal: OR 2.5 · CI 3 · HT 5 · LP 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You were their manager. If you won't give a reference, they won't get the job.

*Question:* A former employee of yours was pleasant but unreliable: missed deadlines, sometimes didn't show up. They've been out of work for 8 months and support two kids. A hiring manager calls you for a reference. What do you say?

- **B03-A:** I tell them everything, problems included.
  - Nudges: HT -2 (Thought), LP -1 (Principle), OR -1 (Rules)
  - Note: You'd tell a hiring manager about a former employee's problems, even with their kids depending on the job. A reference has to be honest.
  - Did: You'd give an honest job reference, problems included, for an unreliable former employee who supports two kids.
- **B03-B:** I mention only the good parts.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: You'd leave a former employee's problems out of a reference to help them get back to work. Their family's need weighs more with you than the full picture.
  - Did: You'd give only the good parts in a job reference for an unreliable former employee who supports two kids.

**Follow-up `fuA`** (step weight 1.5). Shown after B03-A (I tell them everything, problems included).

*Setup:* They're one of two finalists, and they still support two kids.

*Question:* The hiring manager says your reference will decide it. Do you still mention the problems?

- **B03-FUA-A:** Yes. I still mention them.
  - Nudges: HT -2 (Thought), OR -1 (Rules)
  - Note: Even when your words alone decide whether a parent of two gets the job, you'd tell the hiring manager about their problems. A reference has to be honest, whatever it costs them.
  - Did: You'd still give an honest reference, problems included, when your answer alone would decide whether an unreliable former employee with two kids gets the job.
- **B03-FUA-B:** No. Then I leave them out.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: You'd give an honest reference, until your answer alone decides whether a parent of two gets the job. Then you'd leave out the problems.
  - Did: You'd leave an unreliable former employee's problems out of a reference once your answer alone would decide whether they got the job.

**Follow-up `fuB`** (step weight 1.5). Shown after B03-B (I mention only the good parts).

*Setup:* Then you find out what the job is.

*Question:* It's at a daycare. When a worker doesn't show up, families get turned away for the day. Do you mention the missed days now?

- **B03-FUB2-A:** Yes. I tell them about the missed days.
  - Nudges: CI +2 (Collective), LP -2 (Principle)
  - Note: You'd leave out a former employee's problems to help them, but not for a daycare job where a missed shift turns families away. Then you'd tell the hiring manager.
  - Did: You'd tell a hiring manager about a former employee's unreliability once you knew the job was at a daycare where a missed shift turns families away.
- **B03-FUB2-B:** No. I stick with what I said.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart), CI -1 (Individual)
  - Note: Even knowing families could be turned away from a daycare, you'd keep a former employee's problems out of the reference. You'd give the person you know their chance.
  - Did: You'd still leave a former employee's unreliability out of a reference for a daycare job where a missed shift turns families away.

### B04: The Company Line

Scene `companyline` · medium · Most signal: OR 1 · CI 4 · HT 3 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your manager is standing right there, listening.

*Question:* Your manager tells you to blame a late order on a "supplier issue." The real reason is that your company put bigger clients first. A customer asks you: "Is it really the supplier?" What do you say?

- **B04-A:** "Yes, it's the supplier."
  - Nudges: SD +2 (System), CI -1 (Individual)
  - Note: You'd give a customer the false excuse your manager told you to give. At work, you say what you were told.
  - Did: You'd tell a customer a late order was the supplier's fault, as your manager instructed, though it wasn't true.
- **B04-B:** "No. We put bigger clients first."
  - Nudges: SD -2 (Disruption), OR -1 (Rules)
  - Note: You'd tell a customer the real reason for a late order, in front of the manager who told you not to. Your job doesn't make a lie OK for you.
  - Did: You'd tell a customer their order was late because your company put bigger clients first, with your manager standing there.

**Follow-up `fuA`** (step weight 1.5). Shown after B04-A ("Yes, it's the supplier.").

*Setup:* Your manager is still listening.

*Question:* The customer runs a small bakery. If they knew the real reason, they'd order from a competitor today and still deliver a wedding cake on time. Do you tell them?

- **B04-FUA-A:** No. I still say it's the supplier.
  - Nudges: SD +2 (System), CI -1 (Individual)
  - Note: Even when the truth would let a small bakery save a wedding order, you'd stick to the excuse your manager gave you. At work, you keep to your role.
  - Did: You'd still blame the supplier for a late order, even knowing the truth would let a small bakery save a wedding order.
- **B04-FUA-B:** Yes. I tell them the truth.
  - Nudges: SD -2 (Disruption), HT +2 (Heart)
  - Note: You'd repeat your company's excuse to most customers, but not when the truth would let a small bakery save a wedding order.
  - Did: You'd tell a small bakery the real reason their order was late, against your manager's instructions, so the bakery could save a wedding order.

**Follow-up `fuB`** (step weight 1.5). Shown after B04-B ("No. We put bigger clients first.").

*Setup:* Your manager has warned you before.

*Question:* Last month, your manager said one more mistake and you're fired. Do you still tell the truth?

- **B04-FUB-A:** I still tell the truth.
  - Nudges: SD -2 (Disruption), CI +1 (Collective)
  - Note: Even with your job on the line, you'd tell a customer the real reason their order was late, in front of your manager.
  - Did: You'd tell a customer the real reason their order was late, in front of a manager who had warned they'd fire you.
- **B04-FUB-B:** Then I say it's the supplier.
  - Nudges: CI -2 (Individual), SD +1 (System)
  - Note: You'd tell a customer the truth about a late order, unless your manager had already warned they'd fire you. Then you'd blame the supplier.
  - Did: You'd blame the supplier for a late order once your manager had warned they'd fire you for one more mistake.

### B05: The Mistake No One Saw

Scene `mistake` · medium · Most signal: OR 5 · CI 3 · HT 4 · LP 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Only you know what really happened.

*Question:* Years ago, you made a mistake on a shared project, and your coworker was blamed for it. It cost them a promotion. They never found out, and today they're doing fine. Do you tell them?

- **B05-A:** Yes. I tell them and apologize.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd tell a coworker your old mistake cost them a promotion, even though they're doing fine now. You think they have a right to know.
  - Did: You'd tell a coworker that your mistake years ago cost them a promotion, and apologize.
- **B05-B:** No. I leave it in the past.
  - Nudges: OR +2 (Outcomes), HT +1 (Heart)
  - Note: You'd keep quiet about an old mistake that cost a coworker a promotion. Telling them now would hurt them and change nothing.
  - Did: You wouldn't tell a coworker that your mistake years ago cost them a promotion.

**Follow-up `fuA`** (step weight 1.5). Shown after B05-A (Yes. I tell them and apologize).

*Setup:* You haven't told them yet.

*Question:* Your coworker has since become one of your closest friends. Telling them could change that. Do you still tell them?

- **B05-FUA-A:** Yes. I still tell them.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd tell a close friend that your old mistake cost them a promotion, even if it changed the friendship.
  - Did: You'd tell a coworker who became one of your closest friends that your mistake years ago cost them a promotion.
- **B05-FUA-B:** No. Then I keep it to myself.
  - Nudges: OR +2 (Outcomes), LP +1 (Loyalty)
  - Note: You'd own up to a coworker about your old mistake, but not once they'd become one of your closest friends. Then keeping the friendship comes first.
  - Did: You wouldn't tell a coworker who became one of your closest friends that your mistake years ago cost them a promotion.

**Follow-up `fuB`** (step weight 1.5). Shown after B05-B (No. I leave it in the past).

*Setup:* You still haven't told them.

*Question:* They mention that losing that promotion still makes them doubt themselves. Do you tell them now?

- **B05-FUB-A:** Yes. Then I tell them.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You'd keep quiet to spare a coworker, until you learn the lost promotion still makes them doubt themselves. Then the truth would help them, so you tell.
  - Did: You'd tell a coworker your old mistake cost them a promotion once you learned the lost promotion still makes them doubt themselves.
- **B05-FUB-B:** No. I still don't.
  - Nudges: CI -2 (Individual)
  - Note: Even knowing a coworker still doubts themselves over a promotion your mistake cost them, you wouldn't tell them.
  - Did: You still wouldn't tell a coworker your old mistake cost them a promotion, though losing the promotion still makes them doubt themselves.

### B30: The Permit Fee

Scene `permit` · light · Most signal: OR 5 · CI 1 · SD 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You've moved abroad for work.

*Question:* You need a permit you're entitled to. Everyone knows the official expects a small cash payment on the side. It's against the law, but locals always pay, and no one is ever charged. Do you pay?

- **B30-A:** Yes. That's how it works here.
  - Nudges: OR +2 (Outcomes), SD -1 (Disruption), CI -1 (Individual)
  - Note: You'd pay the official the small cash payment on the side that everyone pays, even though it's against the law. You go by how things work where you are.
  - Did: You'd pay an official an illegal cash payment on the side for a permit you're entitled to abroad.
- **B30-B:** No, even if it takes months longer.
  - Nudges: OR -2 (Rules), SD +1 (System), CI +1 (Collective)
  - Note: You'd refuse to pay an official a bribe, even if your permit takes months longer. What's wrong at home is wrong anywhere to you.
  - Did: You'd refuse to pay an official an illegal cash payment abroad, even if your permit took months longer.

**Follow-up `fu`** (step weight 1.5). Shown after B30-B (No, even if it takes months longer).

*Setup:* The official won't process your permit without the payment.

*Question:* Without the permit, you can't start the job you moved there for. Do you pay?

- **B30-FU-A:** Yes. Then I pay.
  - Nudges: OR +2 (Outcomes), SD -1 (Disruption)
  - Note: You'd refuse to pay a bribe for a permit until refusing costs you the job you moved abroad for. Then you pay.
  - Did: You'd pay an official an illegal cash payment abroad once refusing would cost you the job you moved for.
- **B30-FU-B:** No. I still don't pay.
  - Nudges: OR -2 (Rules), SD +1 (System)
  - Note: Even if refusing costs you the job you moved abroad for, you won't pay an official a bribe.
  - Did: You'd still refuse to pay an official an illegal cash payment abroad, even if refusing cost you the job you moved for.

### B32: The Call-Up

Scene `callup` · heavy · Most signal: OR 5 · CI 2 · LP 1.5 · SD 7.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* There's no role that keeps you out of combat.

*Question:* Your country goes to war, and you believe this war is wrong. You're drafted to fight. Refusing means prison. Leaving means you can never come back. What do you do?

- **B32-A:** I serve.
  - Nudges: SD +3 (System), CI +1 (Collective)
  - Note: You'd fight in a war you believe is wrong because your country called you up. Your duty to your country comes before your own judgment.
  - Did: You'd serve in a war you believe is wrong when your country calls you up.
- **B32-B:** I refuse and go to prison.
  - Nudges: SD -2 (Disruption), OR -2 (Rules)
  - Note: You'd go to prison rather than fight in a war you believe is wrong. You won't take part, and you won't run from the price.
  - Did: You'd refuse to serve in a war you believe is wrong, even if it meant prison.
- **B32-C:** I leave the country for good.
  - Nudges: SD -2 (Disruption), CI -2 (Individual)
  - Note: You'd leave your country for good rather than fight in a war you believe is wrong. You'd give up your home before you'd serve or go to prison.
  - Did: You'd leave your country for good rather than serve in a war you believe is wrong.

**Follow-up `fuA`** (step weight 1.5). Shown after B32-A (I serve).

*Setup:* You're serving. Refusing an order means prison.

*Question:* Your unit is ordered to blow up a bridge that villagers use to reach the only hospital. Your officers say it will slow the enemy. Do you follow the order?

- **B32-FUA-A:** Yes. I follow it.
  - Nudges: SD +2 (System), OR +1 (Outcomes)
  - Note: You'd follow an order to blow up a bridge villagers need to reach the only hospital, in a war you believe is wrong. Once you serve, you follow orders.
  - Did: You'd follow an order to blow up a bridge villagers need to reach the only hospital, in a war you believe is wrong.
- **B32-FUA-B:** No. I refuse.
  - Nudges: SD -3 (Disruption)
  - Note: You'd serve in a war you believe is wrong, but you'd refuse an order to blow up a bridge villagers need to reach the only hospital, even if it meant prison.
  - Did: You'd refuse an order to blow up a bridge villagers need to reach the only hospital, even though refusing means prison.

**Follow-up `fuB`** (step weight 1.5). Shown after B32-B (I refuse and go to prison); or after B32-C (I leave the country for good).

*Setup:* Years later, a different war. Anyone who left may come back to fight.

*Question:* Your country has been invaded. The leaders who started the wrong war are still in charge. Would you fight?

- **B32-FUB-A:** Yes. I'd fight to defend my home.
  - Nudges: LP +1 (Loyalty), SD +1 (System), OR +1 (Outcomes)
  - Note: You wouldn't serve in a war you believe is wrong, but you'd fight if your country were invaded, even under the leaders who started that war.
  - Did: You'd fight to defend your invaded country, even under the leaders who started a war you believe is wrong.
- **B32-FUB-B:** No. I still won't fight.
  - Nudges: SD -1 (Disruption), OR -2 (Rules)
  - Note: You wouldn't fight even when your country is invaded, while the leaders who started a wrong war are still in charge.
  - Did: You wouldn't fight for your invaded country under the leaders who started a war you believe is wrong.

### B33: The Man Who Changed

Scene `changed` · medium · Most signal: OR 3.5 · HT 2.5 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The evidence is solid, and the law still allows a trial.

*Question:* At 19, a man badly hurt someone in a robbery and was never caught. He's now 45: a teacher, a father, a volunteer. New evidence surfaces. Should he go to prison?

- **B33-A:** Yes. Justice doesn't expire.
  - Nudges: SD +2 (System), OR -2 (Rules)
  - Note: You'd send a man to prison for a robbery he committed at 19, even though he's now a teacher and a father. A crime still has to be answered for, however long ago.
  - Did: You think a man should go to prison at 45 for badly hurting someone in a robbery at 19.
- **B33-B:** No. He's not that person anymore.
  - Nudges: OR +2 (Outcomes), SD -1 (Disruption), HT +1 (Heart)
  - Note: You wouldn't send a man to prison for a robbery he committed at 19, now that he's a teacher and a father. Who he is now matters more to you than what he did then.
  - Did: You think a man who badly hurt someone in a robbery at 19 shouldn't go to prison at 45, now that he's changed.

**Follow-up `fuA`** (step weight 1.5). Shown after B33-A (Yes. Justice doesn't expire).

*Setup:* Nothing else about the case has changed.

*Question:* It wasn't new evidence. He walked into a police station and confessed on his own. Should he still go to prison?

- **B33-FUA-A:** Yes. He should still go.
  - Nudges: SD +2 (System), OR -1 (Rules)
  - Note: Even though the man walked into a police station and confessed on his own, you think he should go to prison for the robbery he committed at 19.
  - Did: You think a man who confessed on his own at 45 to badly hurting someone in a robbery at 19 should still go to prison.
- **B33-FUA-B:** No. Then no prison.
  - Nudges: OR +1 (Outcomes), HT +1 (Heart)
  - Note: You'd send a man to prison for a robbery he committed at 19, but not if he walked into a police station and confessed on his own.
  - Did: You wouldn't send a man to prison at 45 for a robbery at 19 once you learned he had confessed on his own.

**Follow-up `fuB`** (step weight 1.5). Shown after B33-B (No. He's not that person anymore).

*Setup:* Nothing about the man has changed.

*Question:* The person he hurt still lives with daily pain and wants him prosecuted. Should he go to prison?

- **B33-FUB-A:** Yes. Then he should.
  - Nudges: SD +2 (System), HT +1 (Heart)
  - Note: You'd spare a man who changed, unless the person he hurt still suffers and wants him prosecuted. The victim's wish decides it for you.
  - Did: You'd prosecute a man for a robbery at 19 once you learned the person he hurt still lives in pain and wants him prosecuted.
- **B33-FUB-B:** No. He still shouldn't.
  - Nudges: SD -2 (Disruption), OR +1 (Outcomes)
  - Note: Even with the person he hurt still in daily pain and asking for prosecution, you wouldn't send a changed man to prison.
  - Did: You still wouldn't send a changed man to prison for a robbery at 19, though the person he hurt lives in pain and wants him prosecuted.

### B34: The Remorse Pill

Scene `remorse` · light · Most signal: OR 6 · CI 3 · HT 3 · SD 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Assume the pill is proven to work, and the effect is permanent.

*Question:* A pill makes anyone who takes it deeply sorry for their crime and unable to ever do it again. A person convicted of assault has taken it. Should they still serve their prison sentence?

- **B34-A:** Yes. They still deserve it.
  - Nudges: OR -2 (Rules), SD +1 (System)
  - Note: Even if someone convicted of assault is truly sorry and can never do it again, you think they should serve their sentence. Punishment is owed for what they did.
  - Did: You think a person convicted of assault should serve their sentence, even after a pill made them sorry and unable to commit assault again.
- **B34-B:** No. There's nothing left for prison to do.
  - Nudges: OR +3 (Outcomes), SD -1 (Disruption)
  - Note: If someone is truly sorry and can never do it again, you see no point in prison. For you, punishment has to do some good.
  - Did: You think a person convicted of assault should go free once a pill made them sorry and unable to commit assault again.

**Follow-up `fuA`** (step weight 1.5). Shown after B34-A (Yes. They still deserve it).

*Setup:* The pill still works. Now the person they hurt has spoken.

*Question:* The person they assaulted has forgiven them and asks the court to let them go. Should they still serve?

- **B34-FUA-A:** They should still serve.
  - Nudges: OR -2 (Rules), SD +1 (System)
  - Note: Even when the person they assaulted forgives them and asks for their release, you think they should serve their sentence. The punishment is owed for the crime, not to the victim.
  - Did: You think a person convicted of assault should serve their sentence, even after the person they hurt forgave them and asked the court to let them go.
- **B34-FUA-B:** Then let them go.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You think punishment is owed, until the person who was hurt forgives and asks for their release. Then you'd let them go.
  - Did: You'd free a person convicted of assault once the person they hurt forgave them and asked the court to let them go.

**Follow-up `fuB`** (step weight 1.5). Shown after B34-B (No. There's nothing left for prison to do).

*Setup:* Other people are watching how the case ends.

*Question:* If this person goes free, others may decide crime goes unpunished. Should they serve after all?

- **B34-FUB-A:** Yes. Then they should serve.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes), SD +1 (System)
  - Note: You'd free someone who can never do it again, but not if it tells others they can get away with crime. Their sentence also protects everyone else.
  - Did: You'd make a person convicted of assault serve their sentence so others don't think they can get away with crime, even after a pill made them unable to commit assault again.
- **B34-FUB-B:** No. That's not a reason to punish this person.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You won't keep someone in prison just to warn other people. A person is punished for what they did, not to send a message.
  - Did: You'd free a person convicted of assault who can never commit assault again, even if others might think they can get away with crime.

### B35: The True Story

Scene `truestory` · heavy · Most signal: OR 1.5 · CI 3 · HT 3 · LP 5 · SD 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The police won't reopen it, and no reporter will take it. Posting is legal, and no one would know it was you.

*Question:* Someone assaulted a person you love. The police looked into it, and nothing came of it. You have proof of what they did, and posting it anonymously would ruin their reputation. Do you post it?

- **B35-A:** Yes. They should pay for what they did.
  - Nudges: SD -3 (Disruption), LP +2 (Loyalty)
  - Note: You'd anonymously post proof of what someone did to a person you love, after the police dropped the case. When the system fails, you act yourself.
  - Did: You'd anonymously post proof of what someone did to a person you love, after the police dropped the case.
- **B35-B:** No. It's not my place to punish them.
  - Nudges: SD +2 (System), LP -1 (Principle)
  - Note: You wouldn't post proof of what someone did to a person you love, even after the police dropped the case. Punishing them isn't your job.
  - Did: You wouldn't post proof of what someone did to a person you love, though the police dropped the case.

**Follow-up `fuA`** (step weight 1.5). Shown after B35-A (Yes. They should pay for what they did).

*Setup:* The person who did it has two teenage kids.

*Question:* Everyone at the kids' school would see the post. The kids did nothing wrong. Do you still post it?

- **B35-FUA-A:** Yes. I still post it.
  - Nudges: LP +2 (Loyalty), SD -1 (Disruption)
  - Note: Even knowing it would hurt their teenage kids, you'd still post proof of what they did. The person you love comes first.
  - Did: You'd still post proof against the person who hurt someone you love, even though posting would hurt their innocent teenage kids.
- **B35-FUA-B:** No. Then I don't.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes), LP -1 (Principle)
  - Note: You'd expose the person who hurt someone you love, but not if their teenage kids would be hurt too. Innocent children stop you.
  - Did: You wouldn't post proof against the person who hurt someone you love once you knew posting would hurt their teenage kids.

**Follow-up `fuB`** (step weight 1.5). Shown after B35-B (No. It's not my place to punish them).

*Setup:* Same proof. One new fact.

*Question:* You learn they now coach a children's sports team. You told the club, and it won't act without a conviction. Do you post it now?

- **B35-FUB-A:** Yes. Then I post it.
  - Nudges: SD -2 (Disruption), CI +2 (Collective)
  - Note: You wouldn't post proof of what someone did just to punish them. Once you learn they coach children and the club won't act, you'd post it.
  - Did: You'd anonymously post proof that someone assaulted a person you love once you learned they coach a children's sports team and the club wouldn't act.
- **B35-FUB-B:** No. I still don't.
  - Nudges: SD +2 (System)
  - Note: Even knowing the person who assaulted someone you love now coaches children, and the club won't act, you still wouldn't post your proof.
  - Did: You still wouldn't post proof that someone assaulted a person you love, even after learning they coach a children's sports team and the club won't act.

### B41: The Borrowed Credit

Scene `credit` · light · Most signal: OR 3 · CI 6.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your boss has no other way to find out whose idea it was.

*Question:* Your boss praises you in a meeting for an idea that was actually your coworker's. Your coworker isn't there, and your pay review is next week. What do you do?

- **B41-A:** I tell my boss it was my coworker's idea.
  - Nudges: CI +2 (Collective)
  - Note: You'd tell your boss that an idea they praised you for was your coworker's, with your pay review a week away. You won't keep credit you didn't earn.
  - Did: You'd tell your boss that the idea they praised you for was your coworker's, with your pay review a week away.
- **B41-B:** I say nothing.
  - Nudges: CI -2 (Individual)
  - Note: You'd let your boss go on thinking a coworker's idea was yours, with your pay review a week away.
  - Did: You'd let your boss credit you for your coworker's idea, with your pay review a week away.

**Follow-up `fuA`** (step weight 1.5). Shown after B41-A (I tell my boss it was my coworker's idea).

*Setup:* The meeting is over, and you haven't said anything yet.

*Question:* Your coworker is up for the same raise. Only one of you will get it. Do you still tell your boss?

- **B41-FUA2-A:** Yes. I still tell my boss.
  - Nudges: CI +3 (Collective)
  - Note: Even with your coworker competing with you for the only raise, you'd tell your boss the idea was your coworker's.
  - Did: You'd tell your boss a praised idea was your coworker's, even with the two of you competing for one raise.
- **B41-FUA2-B:** No. Then I say nothing.
  - Nudges: CI -2 (Individual)
  - Note: You'd give your coworker the credit, until the two of you were competing for the same raise. Then you'd let your boss believe the idea was yours.
  - Did: You'd let your boss credit you for your coworker's idea once the two of you were competing for one raise.

**Follow-up `fuB`** (step weight 1.5). Shown after B41-B (I say nothing).

*Setup:* You had plenty of chances to speak up in the meeting.

*Question:* Your coworker hears about the meeting and asks you: "Did you tell the boss it was my idea?" What do you say?

- **B41-FUB-A:** I tell them I said nothing.
  - Nudges: OR -2 (Rules), CI +1 (Collective)
  - Note: You let your boss credit you for a coworker's idea, but you won't lie about it when they ask. You'd rather own it than cover it up.
  - Did: You'd admit to your coworker that you let your boss credit you for their idea.
- **B41-FUB-B:** I say I didn't get the chance.
  - Nudges: CI -2 (Individual), OR +1 (Outcomes)
  - Note: You let your boss credit you for a coworker's idea, and when they ask, you'd give them an excuse rather than admit it.
  - Did: You'd tell your coworker you didn't get the chance to correct your boss, after letting the boss credit you for their idea.

### Q8: The Coworker

Scene `theft` · medium · Most signal: OR 1.5 · HT 4.5 · LP 5 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You work for a small business. No one else knows.

*Question:* A colleague you like has been stealing small amounts from work for months, and it's still going on. You have clear proof. You asked them to stop, and they didn't. What do you do?

- **Q8-A:** I report it.
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: You'd report a colleague you like for stealing from work. Liking them doesn't put them above the rules.
  - Did: You'd report a colleague you like for stealing small amounts from work.
- **Q8-B:** I stay out of it.
  - Nudges: LP +2 (Loyalty), SD -1 (Disruption)
  - Note: You'd keep quiet about a colleague you like stealing small amounts from work. It isn't your job to turn them in.
  - Did: You'd stay out of it when a colleague you like steals small amounts from work.

**Follow-up `fuA`** (step weight 1.5). Shown after Q8-A (I report it).

*Setup:* You haven't reported it yet.

*Question:* Then you learn, for certain, that they did it to pay for their child's medical treatment. Do you still report it?

- **Q8-FUA-A:** Yes. I still report it.
  - Nudges: SD +2 (System), HT -2 (Thought)
  - Note: Even knowing a colleague stole to pay their child's medical bills, you'd report them. A good reason doesn't make stealing OK to you.
  - Did: You'd report a colleague for stealing from work, even knowing they stole to pay their child's medical bills.
- **Q8-FUA-B:** No. I don't report it.
  - Nudges: HT +3 (Heart), SD -1 (Disruption)
  - Note: You'd report a colleague for stealing, unless they did it to pay their child's medical bills. Then you'd let it go.
  - Did: You wouldn't report a colleague for stealing from work once you learned the money paid their child's medical bills.

**Follow-up `fuB`** (step weight 1.5). Shown after Q8-B (I stay out of it).

*Setup:* The theft is still going on.

*Question:* You learn the missing money is why the owners just cut two coworkers' hours. Do you report it now?

- **Q8-FUB2-A:** Yes. I report it now.
  - Nudges: LP -2 (Principle), SD +1 (System), OR +1 (Outcomes)
  - Note: You'd stay out of a colleague's stealing until you learned it cost two coworkers their hours. Then you'd report it.
  - Did: You'd report a colleague you like for stealing once you learned the losses had cost two coworkers their hours.
- **Q8-FUB2-B:** No. I still stay out of it.
  - Nudges: LP +2 (Loyalty), SD -1 (Disruption)
  - Note: Even knowing a colleague's stealing cost two coworkers their hours, you'd stay out of it. You won't turn in someone you like.
  - Did: You'd still stay out of it when a colleague you like steals, even knowing the losses cost two coworkers their hours.

### Q9: The Protest

Scene `unjustlaw` · heavy · Most signal: CI 1 · HT 1 · LP 3 · SD 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You'd likely be arrested. No one would be hurt.

*Question:* A law you believe is deeply unjust was passed the normal way, by elected lawmakers. Court challenges have failed. Would you break that law on purpose, peacefully and in public?

- **Q9-A:** Yes. I'd break it.
  - Nudges: SD -3 (Disruption), CI +1 (Collective)
  - Note: You'd break a law you believe is deeply unjust, even though it passed fairly and the courts upheld it. Some laws you won't obey.
  - Did: You'd break a deeply unjust law through nonviolent protest after court challenges failed.
- **Q9-B:** No. I'd obey it while it stands.
  - Nudges: SD +3 (System), HT -1 (Thought)
  - Note: You wouldn't break a law you believe is deeply unjust once it passed fairly and the courts upheld it. Keeping the process working matters more to you than any one law.
  - Did: You wouldn't break a deeply unjust law that passed through a fair democratic process.

**Follow-up `fuA`** (step weight 1.5). Shown after Q9-A (Yes. I'd break it).

*Setup:* Nothing about the law has changed.

*Question:* An arrest would likely cost you your job, and people depend on your income. Do you still break it?

- **Q9-FUA-A:** Yes. I still do it.
  - Nudges: SD -2 (Disruption), LP -1 (Principle)
  - Note: You'd break an unjust law in protest even if the arrest cost you a job other people depend on.
  - Did: You'd break an unjust law in protest, even if an arrest would cost you a job other people depend on.
- **Q9-FUA-B:** No. Then I don't.
  - Nudges: LP +2 (Loyalty), SD +1 (System)
  - Note: You'd protest an unjust law until it put an income other people depend on at risk. Then they come first.
  - Did: You wouldn't break an unjust law in protest if an arrest would cost you a job other people depend on.

**Follow-up `fuB`** (step weight 1.5). Shown after Q9-B (No. I'd obey it while it stands).

*Setup:* There's still no legal way to change the law.

*Question:* Then the law costs someone you love their job. Would you break it now?

- **Q9-FUB-A:** Yes. Then I'd break it.
  - Nudges: SD -2 (Disruption), LP +2 (Loyalty)
  - Note: You'd obey an unjust law until it hurt someone you love. Then you'd break it.
  - Did: You'd break an unjust law once the law cost someone you love their job.
- **Q9-FUB-B:** No. I still wouldn't.
  - Nudges: SD +2 (System), LP -1 (Principle)
  - Note: Even when an unjust law hurts someone you love, you wouldn't break it. You hold to the process for everyone, your own people included.
  - Did: You still wouldn't break an unjust law, even after the law cost someone you love their job.

### Q10: The Bystander

Scene `platform` · medium · Most signal: OR 1 · CI 5 · HT 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* A few other people are watching and doing nothing. Anyone who steps in could be next.

*Question:* On a subway platform, you see one adult verbally harassing another adult. The aggression is escalating. No staff are around, and your phone has no signal. What do you do?

- **Q10-A:** I tell the harasser to stop.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: You'd confront a stranger harassing someone on a subway platform, with no one else to help. You'd try to stop the harassment yourself.
  - Did: You'd confront a stranger verbally harassing someone on a subway platform.
- **Q10-B:** I go and stand next to the person being harassed.
  - Nudges: HT +2 (Heart), CI +1 (Collective)
  - Note: You'd go stand beside a stranger being harassed on a subway platform, knowing anyone who steps in could be next. You'd make sure they weren't alone.
  - Did: You'd go stand beside a stranger being harassed on a subway platform, though anyone who stepped in could be next.
- **Q10-C:** I stay where I am.
  - Nudges: CI -2 (Individual)
  - Note: You'd stay where you are while a stranger is harassed on a subway platform. You'd keep yourself out of a fight that isn't yours.
  - Did: You'd stay where you are while a stranger is verbally harassed on a subway platform.

**Follow-up `fuA`** (step weight 1.5). Shown after Q10-A (I tell the harasser to stop).

*Setup:* No one else has moved.

*Question:* The harasser comes at you. They're much bigger than you, and they step in close. What do you do?

- **Q10-FUA-A:** I stand my ground.
  - Nudges: CI +2 (Collective)
  - Note: Even when a much bigger harasser turns on you, you'd stand your ground to protect the stranger they were harassing.
  - Did: You'd stand your ground when a much bigger harasser you confronted on a subway platform turned on you.
- **Q10-FUA-B:** I back away.
  - Nudges: CI -2 (Individual)
  - Note: You'd confront a stranger's harasser, until the harasser, much bigger than you, turns on you. Then you'd back away.
  - Did: You'd back away when a much bigger harasser you confronted on a subway platform turned on you.

**Follow-up `fuB`** (step weight 1.5). Shown after Q10-B (I go and stand next to the person being harassed); or after Q10-C (I stay where I am).

*Setup:* There are still no staff and no signal.

*Question:* The harasser shoves the other person to the ground. No one else moves. Do you step in physically?

- **Q10-FUB-A:** Yes. I step in.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: Once a stranger is shoved to the ground and no one else moves, you'd step in physically.
  - Did: You'd physically step in when a stranger was shoved to the ground on a subway platform.
- **Q10-FUB-B:** No. I stay back.
  - Nudges: CI -2 (Individual)
  - Note: Even when a stranger is shoved to the ground and no one else moves, you'd hold back.
  - Did: You'd hold back when a stranger was shoved to the ground on a subway platform and no one else moved.

### D3: The Worst Shifts

Scene `shifts` · medium · Most signal: LP 2 · SD 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* If you report it, HR would likely discipline your manager.

*Question:* Your manager, who helped build your career, keeps giving the worst shifts to a teammate they dislike. You've asked your manager to stop twice, and nothing changed. Do you report it to HR?

- **D3-A:** Yes. I report it.
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: You'd report the manager who helped build your career to HR for treating a teammate unfairly. What they did for you doesn't excuse what they're doing.
  - Did: You'd report the manager who helped build your career to HR for giving a teammate the worst shifts.
- **D3-B:** No. I let it go.
  - Nudges: LP +2 (Loyalty), SD -1 (Disruption)
  - Note: You'd let it go when the manager who helped build your career keeps treating a teammate unfairly. You've tried twice, and you won't go to HR about them.
  - Did: You wouldn't report the manager who helped build your career for giving a teammate the worst shifts.

### D5: The Mentor's Favor

Scene `hiring` · light · Most signal: CI 1 · HT 1 · LP 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The decision is yours alone.

*Question:* You're hiring. One candidate is a bit stronger. The other is the child of a mentor who shaped your career, and the mentor asked you, as a personal favor, to hire them. Their child could do the job. No one would ever know about the favor. Who do you hire?

- **D5-A:** The stronger candidate.
  - Nudges: LP -2 (Principle), CI +1 (Collective)
  - Note: You'd hire the stronger candidate over your mentor's child, even though your mentor asked you as a favor. The job goes to whoever is best for it.
  - Did: You'd hire the stronger candidate over the child of a mentor who asked you for the favor.
- **D5-B:** My mentor's child.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: You'd hire your mentor's child over a slightly stronger candidate because your mentor asked. What you owe your mentor counts for more than a small edge.
  - Did: You'd hire your mentor's child over a slightly stronger candidate as a favor to your mentor.

### D6: The Pension Cut

Scene `pensions` · heavy · Most signal: OR 2 · CI 6.5 · HT 1.5 · LP 3 · SD 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The cut is legal. Raising it again inside the company won't change anything.

*Question:* Your company will cut the pensions of 3,000 retired workers next week, without announcing it. You raised it inside the company a month ago, and nothing happened. Going public would likely stop it, but it breaks the confidentiality agreement you signed, and you'd be fired and sued. What do you do?

- **D6-A:** I go public.
  - Nudges: SD -3 (Disruption), OR +2 (Outcomes), CI +2 (Collective)
  - Note: You'd break your confidentiality agreement and lose your job to stop a pension cut for 3,000 retirees. Their harm outweighs your agreement and your career.
  - Did: You'd go public about your company's plan to cut 3,000 retirees' pensions, though going public breaks your confidentiality agreement and costs you your job.
- **D6-B:** I stay quiet.
  - Nudges: SD +2 (System), OR -1 (Rules), CI -1 (Individual)
  - Note: You'd stay quiet about a pension cut for 3,000 retirees after raising it inside the company. You signed an agreement, and you keep it.
  - Did: You'd stay quiet about your company's plan to cut 3,000 retirees' pensions, after raising the cut inside the company, rather than break your confidentiality agreement.

**Follow-up `fuA`** (step weight 1.5). Shown after D6-A (I go public).

*Setup:* Going public would still likely stop the cut.

*Question:* Your lawyer says the lawsuit would take your savings and your home. Do you still go public?

- **D6-FUA-A:** I still go public.
  - Nudges: CI +3 (Collective), SD -1 (Disruption)
  - Note: You'd go public about a pension cut for 3,000 retirees even if the lawsuit took your savings and your home. Their pensions come before what you own.
  - Did: You'd still go public about your company's plan to cut 3,000 retirees' pensions, even if the lawsuit took your savings and your home.
- **D6-FUA-B:** Then I stay quiet.
  - Nudges: CI -2 (Individual)
  - Note: You'd lose your job to stop a pension cut for 3,000 retirees, but not your savings and your home. Then you'd stay quiet.
  - Did: You'd stay quiet about your company's plan to cut 3,000 retirees' pensions once you knew the lawsuit would take your savings and your home.

**Follow-up `fuB`** (step weight 1.5). Shown after D6-B (I stay quiet).

*Setup:* Going public would still get you fired and sued.

*Question:* One of the 3,000 is your grandmother. Do you go public now?

- **D6-FUB2-A:** Then I go public.
  - Nudges: LP +2 (Loyalty), SD -2 (Disruption), HT +1 (Heart)
  - Note: You'd keep your agreement while the 3,000 retirees were strangers, but not once your grandmother was one of them. Then you'd go public.
  - Did: You'd go public about your company's plan to cut 3,000 retirees' pensions once you learned your grandmother was one of them.
- **D6-FUB2-B:** I still stay quiet.
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: Even with your grandmother among the 3,000 retirees, you'd stay quiet about the pension cut. Family doesn't change your agreement.
  - Did: You'd still stay quiet about your company's plan to cut 3,000 retirees' pensions, even with your grandmother among them.

### D10: The Housing List

Scene `favor` · medium · Most signal: CI 2.5 · LP 5 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No one would find out. Everyone on the list needs a home.

*Question:* You run the waiting list for low-cost city apartments. The woman who took you in when you were homeless asks you to move her grandson to the top. Families have waited years. What do you do?

- **D10-A:** I move him up. I owe her.
  - Nudges: LP +2 (Loyalty), SD -2 (Disruption)
  - Note: You'd move the grandson of the woman who took you in to the top of a housing list, ahead of families who've waited years. What you owe her comes first.
  - Did: You'd move the grandson of the woman who took you in when you were homeless to the top of a housing waiting list you run.
- **D10-B:** I say no. Everyone waits their turn.
  - Nudges: LP -2 (Principle), SD +2 (System), CI +1 (Collective)
  - Note: You'd refuse to move up the grandson of the woman who took you in when you were homeless. Families who've waited years come first, whoever is asking.
  - Did: You'd refuse to move the grandson of the woman who took you in when you were homeless up a housing waiting list you run.

**Follow-up `fuA`** (step weight 1.5). Shown after D10-A (I move him up. I owe her).

*Setup:* You haven't moved him up yet.

*Question:* The family he'd move ahead of has waited four years. Their child has asthma, and their apartment is damp. Do you still move him up?

- **D10-FUA-A:** Yes. I still move him up.
  - Nudges: LP +2 (Loyalty), SD -2 (Disruption)
  - Note: Even knowing he'd skip a family who has waited four years with a child who has asthma, you'd move her grandson up. What you owe her comes first.
  - Did: You'd move the grandson of the woman who took you in up a housing list, ahead of a family who has waited four years with a child who has asthma.
- **D10-FUA-B:** No. I keep the list as it is.
  - Nudges: LP -2 (Principle), SD +1 (System), CI +1 (Collective)
  - Note: You'd repay the woman who took you in, but not by pushing back a family who has waited four years with a child who has asthma. Then you'd keep the list as it is.
  - Did: You wouldn't move the grandson of the woman who took you in up a housing list once you knew he'd skip a family who has waited four years with a child who has asthma.

**Follow-up `fuB`** (step weight 1.5). Shown after D10-B (I say no. Everyone waits their turn).

*Setup:* She hears your answer.

*Question:* She says: "When you had nowhere to go, I didn't check a list." Do you change your answer?

- **D10-FUB-A:** Yes. I move him up.
  - Nudges: LP +2 (Loyalty), SD -1 (Disruption)
  - Note: You'd keep the housing list fair, until the woman who took you in reminds you she didn't check a list when you had nowhere to go. Then you'd move her grandson up.
  - Did: You'd move the grandson of the woman who took you in up a housing list once she reminded you she didn't check a list when you were homeless.
- **D10-FUB-B:** No. I still say no.
  - Nudges: SD +2 (System), LP -1 (Principle)
  - Note: Even when the woman who took you in reminds you she didn't check a list when you had nowhere to go, you'd keep her grandson in line with everyone else.
  - Did: You'd still refuse to move the grandson of the woman who took you in up a housing list, even after she reminded you she didn't check a list when you were homeless.

### D11: The Silent Witness

Scene `witness` · heavy · Most signal: OR 1 · CI 1.5 · LP 6.5 · SD 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You're under oath, and you're the only witness. If you refuse to answer, you can be jailed.

*Question:* Your brother got into a fight outside a bar. The other man was badly hurt. In court, you're asked who threw the first punch. It was your brother. What do you say?

- **D11-A:** The truth: my brother hit first.
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: You'd tell the court your brother threw the first punch. In court, your brother gets no exception.
  - Did: You'd testify in court that your brother threw the first punch.
- **D11-B:** I say I didn't see who started it.
  - Nudges: LP +2 (Loyalty), SD -3 (Disruption), OR +1 (Outcomes)
  - Note: You'd tell the court you didn't see who threw the first punch, to protect your brother. You'd lie under oath for him.
  - Did: You'd tell the court you didn't see who threw the first punch, though it was your brother.
- **D11-C:** I refuse to answer and accept jail.
  - Nudges: LP +2 (Loyalty), SD -2 (Disruption), OR -1 (Rules)
  - Note: You'd go to jail rather than answer the court's question about your brother. You won't lie under oath, and you won't turn him in.
  - Did: You'd refuse to tell the court who threw the first punch in your brother's fight, and accept jail.

**Follow-up `fuA`** (step weight 1.5). Shown after D11-A (The truth: my brother hit first).

*Setup:* Your testimony is the strongest evidence against him.

*Question:* Your answer will very likely send your brother to prison. Do you still tell the truth?

- **D11-FUA-A:** I still tell the whole truth.
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: Even if your answer will likely send your brother to prison, you'd tell the court he threw the first punch.
  - Did: You'd testify that your brother threw the first punch, even knowing your answer would likely send him to prison.
- **D11-FUA-B:** Then I say I didn't see.
  - Nudges: LP +3 (Loyalty), SD -2 (Disruption)
  - Note: You'd tell the court the whole truth, until it would likely send your brother to prison. Then you'd say you didn't see who threw the first punch.
  - Did: You'd tell the court you didn't see who threw the first punch once you knew the truth would likely send your brother to prison.

**Follow-up `fuB`** (step weight 1.5). Shown after D11-B (I say I didn't see who started it); or after D11-C (I refuse to answer and accept jail).

*Setup:* The other man was badly hurt. He can't work anymore.

*Question:* If you don't testify that your brother hit first, the court will likely decide the other man started it. Your brother goes free, and the other man is blamed for his own injuries. Do you tell the court it was your brother?

- **D11-FUB2-A:** Yes. I tell the court.
  - Nudges: LP -2 (Principle), SD +2 (System), CI +1 (Collective)
  - Note: You'd protect your brother in court, but not if the man he hurt, who can't work anymore, would be blamed for his own injuries. Then you'd say who threw the first punch.
  - Did: You'd testify that your brother threw the first punch once you knew the man he hurt, who can't work anymore, would otherwise be blamed for his own injuries.
- **D11-FUB2-B:** No. I still don't say it.
  - Nudges: LP +3 (Loyalty), SD -1 (Disruption), CI -1 (Individual)
  - Note: Even if the man your brother hurt can't work and would be blamed for his own injuries, you wouldn't say your brother threw the first punch. Your brother comes first.
  - Did: You still wouldn't say your brother threw the first punch, even knowing the man he hurt can't work and would be blamed for his own injuries.

## World 4: The Coast

12 questions. Chapter: "For strangers and people not yet born". Opens after 13 of The City's 19 questions (about two-thirds), and stays open after that.

Unlock ladder (answers in The Coast):

- 3 answered: How you change when strangers count on you
- 6 answered: What you do when strangers count on you
- 8 answered: Your Coast chapter

### Q2: The Wallet

Scene `seawallet` · medium · Most signal: OR 4 · CI 6.5 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Being short on rent means a late fee, not eviction.

*Question:* You find a wallet with $400 cash and an ID. The owner lives in a wealthy neighborhood. You're $400 short on rent this week, and no one saw you. What do you do?

- **Q2-A:** I return the wallet with all the cash.
  - Nudges: SD +2 (System), OR -1 (Rules), CI +1 (Collective)
  - Note: You'd return a found wallet with all $400 inside, though you're $400 short on rent and no one would know. Money you find isn't yours to keep.
  - Did: You'd return a found wallet with all $400 inside, though you were $400 short on rent and no one saw you.
- **Q2-B:** I keep the cash and mail back the wallet and ID.
  - Nudges: CI -2 (Individual), SD -1 (Disruption), OR +1 (Outcomes)
  - Note: You'd keep the $400 from a found wallet and mail back the rest. The owner is well off, and you need the money more.
  - Did: You'd keep the $400 from a wealthy stranger's lost wallet and mail back the wallet and ID.

**Follow-up `fuA`** (step weight 1.5). Shown after Q2-A (I return the wallet with all the cash).

*Setup:* Same wallet, same $400. Now being short could cost you your home.

*Question:* Your landlord says one more late payment and you're out. Do you still return all the cash?

- **Q2-FUA-A:** I still return all the cash.
  - Nudges: SD +2 (System), OR -2 (Rules)
  - Note: Even if one more late payment would cost you your home, you'd return all $400 in a stranger's wallet. Money you find isn't yours to keep.
  - Did: You'd return all $400 in a wealthy stranger's lost wallet, even if one more late payment would get you evicted.
- **Q2-FUA-B:** Then I keep the cash and mail back the rest.
  - Nudges: CI -2 (Individual), OR +1 (Outcomes), SD -1 (Disruption)
  - Note: You'd return a found wallet with all the cash, until keeping the $400 was the only way to keep your home. Then you'd keep it.
  - Did: You'd keep the $400 from a wealthy stranger's lost wallet if one more late payment would get you evicted.

**Follow-up `fuB`** (step weight 1.5). Shown after Q2-B (I keep the cash and mail back the wallet and ID).

*Setup:* Same wallet, same $400. Only the owner's street changes.

*Question:* What if the owner lives in a low-income neighborhood?

- **Q2-FUB-A:** Then I return the cash. That changes things.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: You'd keep a wealthy stranger's $400, but not a poor stranger's. Who loses the money matters to you.
  - Did: You'd return a lost wallet's $400 if the owner lived in a low-income neighborhood.
- **Q2-FUB-B:** I still keep the cash. My rent is due either way.
  - Nudges: CI -3 (Individual)
  - Note: Even if the owner lives in a low-income neighborhood, you'd keep the $400 from their wallet. Your rent comes first.
  - Did: You'd keep a lost wallet's $400 even if the owner lived in a low-income neighborhood.

### D4: The Stranded Stranger

Scene `busstop` · medium · Most signal: CI 5 · HT 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your phone is dead, and no taxis come out here. The stranger is upset, not in danger.

*Question:* You're driving to the airport for a trip you've planned for months. At a bus stop in heavy rain, a stranger sits alone, clearly upset. The last bus is gone. Driving them home means you'll miss your flight and lose a day of the trip. Do you stop?

- **D4-A:** I stop and drive them home.
  - Nudges: CI +2 (Collective), HT +1 (Heart)
  - Note: You'd miss your flight and lose a day of a trip you'd planned for months to help an upset stranger stranded in the rain.
  - Did: You'd stop for a stranger stranded at a bus stop in the rain, though it meant missing your flight and losing a day of a long-planned trip.
- **D4-B:** I keep driving to the airport.
  - Nudges: CI -2 (Individual), HT -1 (Thought)
  - Note: You'd drive past an upset stranger stranded in the rain to make your flight. They aren't in danger, and your trip matters to you.
  - Did: You'd drive past a stranger stranded at a bus stop in the rain to make your flight for a long-planned trip.

**Follow-up `fuA`** (step weight 1.5). Shown after D4-A (I stop and drive them home).

*Setup:* The stranger still isn't in danger. The cost to you just grew.

*Question:* A new ticket would cost $1,200, money you can't spare. Do you still stop?

- **D4-FUA2-A:** I still stop.
  - Nudges: CI +2 (Collective), HT +1 (Heart)
  - Note: Even if a new ticket cost $1,200 you can't spare, you'd stop for an upset stranger stranded in the rain.
  - Did: You'd stop for a stranger stranded at a bus stop in the rain, even if a new ticket cost $1,200 you couldn't spare.
- **D4-FUA2-B:** Then I keep driving.
  - Nudges: CI -2 (Individual)
  - Note: You'd miss your flight for an upset stranger in the rain, but not if a new ticket cost $1,200 you can't spare.
  - Did: You'd drive past a stranger stranded at a bus stop in the rain if stopping cost you $1,200 you couldn't spare.

**Follow-up `fuB`** (step weight 1.5). Shown after D4-B (I keep driving to the airport).

*Setup:* Same rain, same flight. Now you see who it is.

*Question:* As you pass, you see in your mirror that the stranger is about 15. Do you turn back?

- **D4-FUB-A:** Then I turn back.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You'd drive past an upset adult in the rain to make your flight, but not a 15-year-old. A child alone changes it for you.
  - Did: You'd turn back for a stranded 15-year-old at a bus stop in the rain, though it meant missing your flight.
- **D4-FUB-B:** I keep driving.
  - Nudges: CI -2 (Individual), HT -2 (Thought)
  - Note: Even after seeing that the stranger at the bus stop is about 15, you'd keep driving to make your flight.
  - Did: You'd keep driving past a stranded 15-year-old at a bus stop in the rain to make your flight.

### B25: The Slaughterhouse Test

Scene `meat` · light · Most signal: OR 3 · CI 1.5 · HT 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Imagine a world with no butchers and no meat counters.

*Question:* To eat meat, you'd have to kill the animal yourself. You'd be shown how, and it would be quick. Would you still eat meat?

- **B25-A:** Yes.
  - Nudges: HT -2 (Thought)
  - Note: You'd kill an animal yourself to eat meat. If you eat it, you can face where it comes from.
  - Did: You'd still eat meat if you had to kill the animal yourself.
- **B25-B:** No, I'd stop.
  - Nudges: HT +2 (Heart)
  - Note: You'd stop eating meat if you had to kill the animal yourself. Being close to the killing would change your mind.
  - Did: You'd stop eating meat if you had to kill the animal yourself.
- **B25-C:** I already don't.
  - Nudges: none
  - Note: You don't eat meat, so this choice is already made for you.
  - Did: You already don't eat meat.

**Follow-up `fuA`** (step weight 1.5). Shown after B25-A (Yes).

*Setup:* Same choice. Now you know the animal.

*Question:* The animal is a pig. Pigs are about as smart as dogs, and this one seems to understand it's about to die. Would you still do it?

- **B25-FUA-A:** I'd still do it.
  - Nudges: HT -2 (Thought)
  - Note: Even knowing a pig is about as smart as a dog and seems to know what's coming, you'd kill it yourself to eat meat.
  - Did: You'd kill a pig yourself to eat meat, even knowing it's about as smart as a dog and seems to know what's coming.
- **B25-FUA-B:** Then I'd stop.
  - Nudges: HT +2 (Heart)
  - Note: You'd kill an animal yourself to eat meat, but not a pig as smart as a dog that seems to know what's coming.
  - Did: You'd stop eating meat if you had to kill a pig yourself, knowing it's about as smart as a dog.

**Follow-up `fuB`** (step weight 1.5). Shown after B25-B (No, I'd stop).

*Setup:* In real life, someone else does the killing for you.

*Question:* Knowing you couldn't kill the animal yourself, will you keep eating meat?

- **B25-FUB2-A:** Yes, I'll keep eating it.
  - Nudges: CI -1 (Individual), HT -1 (Thought)
  - Note: You couldn't kill an animal yourself, but you'd keep eating meat that someone else killed.
  - Did: You'd keep eating meat, though you couldn't kill the animal yourself.
- **B25-FUB2-B:** No, I'll stop.
  - Nudges: HT +2 (Heart), OR -1 (Rules)
  - Note: You couldn't kill an animal yourself, so you'd stop eating meat, even though someone else does the killing.
  - Did: You'd stop eating meat because you couldn't kill the animal yourself.

**Follow-up `fuC`** (step weight 1.5). Shown after B25-C (I already don't).

*Setup:* No animal is harmed. Nothing else changes.

*Question:* Meat grown in a lab, with no animal harmed, tastes exactly the same. Would you eat it?

- **B25-FUC2-A:** Yes. No animal is harmed.
  - Nudges: OR +2 (Outcomes)
  - Note: You don't eat meat, but you'd eat lab-grown meat that harms no animal. The harm was what mattered to you.
  - Did: You'd eat lab-grown meat that harms no animal, though you don't eat meat now.
- **B25-FUC2-B:** No. I still wouldn't.
  - Nudges: OR -2 (Rules)
  - Note: You don't eat meat, and you wouldn't eat lab-grown meat either, even with no animal harmed.
  - Did: You wouldn't eat lab-grown meat, even with no animal harmed.

### D2: The Neighbor's Rent

Scene `donor` · medium · Most signal: OR 5 · HT 5 · LP 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The charity's numbers are reliable. Without the money, your neighbor will be evicted.

*Question:* You have $1,000 to give. A proven charity would use it to protect about 200 children from malaria. Or you can give it to your neighbor, a single parent who is $1,000 short on rent. Who gets it?

- **D2-A:** The charity. It protects more lives.
  - Nudges: OR +2 (Outcomes), LP -2 (Principle), HT -1 (Thought)
  - Note: You'd give $1,000 to protect 200 faraway children from malaria rather than cover your neighbor's rent. More lives count for more, wherever they are.
  - Did: You'd give $1,000 to protect 200 children from malaria rather than cover your neighbor's rent.
- **D2-B:** My neighbor. I can see exactly what it does.
  - Nudges: HT +2 (Heart), LP +2 (Loyalty)
  - Note: You'd give $1,000 to cover your neighbor's rent rather than protect 200 children from malaria far away. You'd rather help someone you can see.
  - Did: You'd give $1,000 to cover a struggling neighbor's rent rather than protect 200 children from malaria.

**Follow-up `fuA`** (step weight 1.5). Shown after D2-A (The charity. It protects more lives).

*Setup:* The charity's numbers haven't changed.

*Question:* Your neighbor knocks on your door and asks you for help, face to face. Who gets the money?

- **D2-FUA-A:** I still give it to the charity.
  - Nudges: OR +2 (Outcomes), HT -2 (Thought)
  - Note: Even with your neighbor at your door asking for help, you'd give $1,000 to protect 200 children from malaria. More lives count for more.
  - Did: You'd give $1,000 to protect 200 children from malaria, even after your neighbor asked you face to face for rent money.
- **D2-FUA-B:** Then I help my neighbor.
  - Nudges: HT +2 (Heart), LP +2 (Loyalty)
  - Note: You'd give $1,000 to protect 200 faraway children, until your neighbor asks you face to face. Then you'd cover their rent.
  - Did: You'd give $1,000 to cover your neighbor's rent once they asked you face to face, rather than protect 200 children from malaria.

**Follow-up `fuB`** (step weight 1.5). Shown after D2-B (My neighbor. I can see exactly what it does).

*Setup:* The charity's numbers haven't changed.

*Question:* Your neighbor tells you they may lose the apartment next month anyway, even with your $1,000. Who gets it?

- **D2-FUB2-A:** I still help my neighbor.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: Even if your neighbor may lose the apartment anyway, you'd still give them the $1,000 rather than protect 200 children from malaria. You'd rather help someone you know, even without a sure result.
  - Did: You'd give $1,000 to a neighbor who may lose their apartment anyway, rather than protect 200 children from malaria.
- **D2-FUB2-B:** Then the charity.
  - Nudges: OR +2 (Outcomes), LP -1 (Principle)
  - Note: You'd give $1,000 to your neighbor while it would surely save their home. If they may lose it anyway, you'd give it to the charity.
  - Did: You'd give $1,000 to protect 200 children from malaria once you learned your neighbor may lose their apartment anyway.

### Q4: The Saturday

Scene `shelter` · heavy · Most signal: OR 5 · CI 1.5 · HT 6.5 · LP 3.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Each takes the whole day. The charity is proven.

*Question:* You have one free Saturday. You can volunteer at a local shelter, or work an extra shift and give all the pay to a charity that helps far more people. Which do you do?

- **Q4-A:** I volunteer. Being there matters most.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: You'd spend your free Saturday at a local shelter rather than earn money for a charity that helps more people. Being there in person matters to you.
  - Did: You'd volunteer at a local shelter on your free Saturday rather than work and give the pay to a charity that helps more people.
- **Q4-B:** I work and donate. More people get helped.
  - Nudges: OR +2 (Outcomes), LP -2 (Principle), HT -1 (Thought)
  - Note: You'd work an extra shift and give the pay to a charity rather than volunteer at a local shelter. Helping more people beats being there in person.
  - Did: You'd work an extra shift on your free Saturday and give the pay to a charity rather than volunteer at a local shelter.

**Follow-up `fuA`** (step weight 1.5). Shown after Q4-A (I volunteer. Being there matters most).

*Setup:* The shelter is fine either way. You'd still be there in person.

*Question:* The shelter has more volunteers than it needs that Saturday. You'd spend the day sorting donated clothes in a back room. Do you still volunteer?

- **Q4-FUA2-A:** I still volunteer.
  - Nudges: HT +2 (Heart), CI -1 (Individual)
  - Note: Even if the shelter had more volunteers than it needed, you'd spend your Saturday there rather than earn money for a charity. Being there in person matters to you.
  - Did: You'd volunteer at a shelter that had more volunteers than it needed, rather than work and give the pay to a charity.
- **Q4-FUA2-B:** Then I work and donate.
  - Nudges: OR +2 (Outcomes), LP -1 (Principle)
  - Note: You'd volunteer at a local shelter, but not if it already had more help than it needed. Then you'd work and give the pay to a charity.
  - Did: You'd work and give the pay to a charity once you learned the local shelter had more volunteers than it needed.

**Follow-up `fuB`** (step weight 1.5). Shown after Q4-B (I work and donate. More people get helped).

*Setup:* If you go, there's no shift and no donation.

*Question:* The shelter calls. They're short-staffed, and if you don't come, someone will go without a bed tonight. Do you go?

- **Q4-FUB-A:** Yes. I go to the shelter.
  - Nudges: HT +3 (Heart)
  - Note: You'd give up your shift and the donation once the shelter calls and you know someone would go without a bed tonight.
  - Did: You'd go to a short-staffed shelter instead of working to donate, once you knew someone would otherwise go without a bed tonight.
- **Q4-FUB-B:** No. I still work and donate.
  - Nudges: OR +2 (Outcomes), HT -2 (Thought)
  - Note: Even knowing someone will go without a bed tonight, you'd work your shift and donate. The money helps more people.
  - Did: You'd still work and donate, even knowing someone at a short-staffed shelter would go without a bed tonight.

### B22: The 200-Year Deal

Scene `sapling` · light · Most signal: OR 1.5 · CI 6 · LP 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The button is certain to work. No one would ever know you pressed it.

*Question:* Pressing a button would cut your income by 10% for the rest of your life. In 200 years, a million people you'll never meet would live noticeably better. Do you press it?

- **B22-A:** Yes.
  - Nudges: CI +3 (Collective), LP -1 (Principle)
  - Note: You'd live on 10% less income for the rest of your life so people born 200 years from now live better. People not yet born count to you.
  - Did: You'd take a 10% cut in income for life so a million people 200 years from now live better.
- **B22-B:** No.
  - Nudges: CI -2 (Individual)
  - Note: You wouldn't give up 10% of your income for people who'll live 200 years from now. Your own life comes first.
  - Did: You wouldn't take a 10% cut in income for life so a million people 200 years from now live better.

**Follow-up `fuA`** (step weight 1.5). Shown after B22-A (Yes).

*Setup:* The same 10%. Now it isn't only you.

*Question:* Now everyone alive takes the same 10% cut, including people who are already poor. It happens only if most people vote yes. How do you vote?

- **B22-FUA-A:** Yes.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: You'd vote for everyone alive, even the poorest, to take 10% less so people 200 years from now live better.
  - Did: You'd vote for everyone alive, even the poorest, to take 10% less so people 200 years from now live better.
- **B22-FUA-B:** No.
  - Nudges: CI -1 (Individual), OR -1 (Rules)
  - Note: You'd take 10% less yourself for people 200 years from now, but you wouldn't vote to make everyone else, including the poorest, do the same.
  - Did: You'd vote against everyone alive, including the poorest, taking 10% less for people 200 years from now.

**Follow-up `fuB`** (step weight 1.5). Shown after B22-B (No).

*Setup:* Same button, same cost to you.

*Question:* Your own family's descendants would be among the million. Do you press it now?

- **B22-FUB-A:** Yes. Then I press it.
  - Nudges: LP +2 (Loyalty)
  - Note: You wouldn't give up 10% for strangers 200 years from now, but you would for your own descendants.
  - Did: You'd take a 10% cut in income for life if your own family's descendants were among a million people who'd live better 200 years from now.
- **B22-FUB-B:** No. Still no.
  - Nudges: CI -2 (Individual)
  - Note: Even if your own family's descendants would live better, you wouldn't take a 10% cut in income for the rest of your life.
  - Did: You wouldn't take a 10% cut in income for life, even for your own family's descendants 200 years from now.

### D12: The Bonus Pool

Scene `bonus` · medium · Most signal: OR 3 · CI 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The numbers are clear. Everyone knows who did what.

*Question:* You manage a team of five and have one bonus pool to divide. Your best performer produced more than the other four combined. The other four all worked hard. How do you divide it?

- **D12-A:** Most of it to the best performer. They produced the most.
  - Nudges: CI -2 (Individual)
  - Note: You'd give most of a team bonus to the one person who produced the most. Rewards should follow results.
  - Did: You'd give most of a team bonus to the best performer, who produced more than the other four combined.
- **D12-B:** Evenly. Everyone gave their full effort.
  - Nudges: CI +2 (Collective)
  - Note: You'd split a team bonus evenly, though one person produced more than the other four combined. Everyone worked hard, so everyone gets the same.
  - Did: You'd split a team bonus evenly, though one person produced more than the other four combined.

**Follow-up `fuA`** (step weight 1.5). Shown after D12-A (Most of it to the best performer. They produced the most).

*Setup:* The numbers are the same as before.

*Question:* You learn the best performer was handed the biggest clients by chance, though they did good work with them. The other four never had that chance. How do you divide it now?

- **D12-FUA-A:** I still give them most of it.
  - Nudges: CI -2 (Individual)
  - Note: Even knowing your best performer got the biggest clients by chance, you'd give them most of the bonus. Rewards follow results, however they came.
  - Did: You'd give most of a team bonus to the best performer, even knowing they were handed the biggest clients by chance.
- **D12-FUA-B:** Then I split it evenly.
  - Nudges: CI +2 (Collective)
  - Note: You'd reward the best performer's results, until you learn chance handed them the biggest clients. Then you'd split the bonus evenly.
  - Did: You'd split a team bonus evenly once you learned the best performer was handed the biggest clients by chance.

**Follow-up `fuB`** (step weight 1.5). Shown after D12-B (Evenly. Everyone gave their full effort).

*Setup:* The threat is real, and replacing them would take a year.

*Question:* Your best performer says they'll quit if it's split evenly. Without them, the team would miss its targets next year. Do you change the split?

- **D12-FUB-A:** Yes. I give them most of it.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: You'd split a team bonus evenly, until your best performer threatens to quit and the team would miss its targets. Then you'd give them most of it.
  - Did: You'd give your best performer most of a team bonus you meant to split evenly, once they threatened to quit.
- **D12-FUB-B:** No. I keep it even.
  - Nudges: OR -2 (Rules), CI +1 (Collective)
  - Note: Even if your best performer quits and the team misses its targets next year, you'd keep the bonus split evenly.
  - Did: You'd keep a team bonus split evenly, even if your best performer quit and the team missed its targets next year.

### D9: The Two Programs

Scene `programs` · medium · Most signal: OR 5 · HT 5 · LP 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The numbers are reliable. If you split the money, both programs would fail.

*Question:* Your small nonprofit must close one of two programs. Mentoring changes 5 kids' lives deeply. You built it and know them all. Tutoring helps 200 kids a little. Which do you close?

- **D9-A:** I close mentoring. 200 kids outweigh 5.
  - Nudges: OR +2 (Outcomes), HT -1 (Thought), LP -1 (Principle)
  - Note: You'd close the mentoring program you built for 5 kids you know, to keep tutoring for 200. More kids helped counts for more.
  - Did: You'd close a mentoring program you built for 5 kids you know, to keep tutoring that helps 200 kids a little.
- **D9-B:** I close tutoring. Deep change matters more.
  - Nudges: HT +2 (Heart), LP +2 (Loyalty), OR -1 (Rules)
  - Note: You'd close tutoring for 200 kids to keep mentoring 5 kids you know. Changing a few lives deeply matters more to you than helping many a little.
  - Did: You'd close tutoring that helps 200 kids a little, to keep mentoring 5 kids you know.

**Follow-up `fuA`** (step weight 1.5). Shown after D9-A (I close mentoring. 200 kids outweigh 5).

*Setup:* The numbers are the same. Now you know more about one of the 5.

*Question:* One of the 5 kids has no one else. Without mentoring, they'll likely drop out of school. Do you still close mentoring?

- **D9-FUA2-A:** I still close mentoring.
  - Nudges: OR +2 (Outcomes), HT -2 (Thought)
  - Note: Even knowing one of the 5 kids you mentor would likely drop out without it, you'd close mentoring to keep tutoring for 200.
  - Did: You'd close a mentoring program for 5 kids, even knowing one of them would likely drop out of school without it.
- **D9-FUA2-B:** Then I close tutoring instead.
  - Nudges: HT +2 (Heart), OR -1 (Rules)
  - Note: You'd close mentoring to help 200 kids a little, until one of the 5 kids would likely drop out without it. Then you'd keep mentoring.
  - Did: You'd close tutoring for 200 kids to keep mentoring once you learned one of the 5 kids would likely drop out without it.

**Follow-up `fuB`** (step weight 1.5). Shown after D9-B (I close tutoring. Deep change matters more).

*Setup:* Same two programs. Only your part in it changes.

*Question:* What if someone else had built mentoring, and you'd never met the 5 kids?

- **D9-FUB2-A:** I'd still close tutoring.
  - Nudges: HT +1 (Heart), OR -1 (Rules), LP -1 (Principle)
  - Note: Even if you'd never met the 5 kids, you'd keep mentoring and close tutoring for 200. Changing a few lives deeply matters more to you.
  - Did: You'd close tutoring for 200 kids to keep mentoring 5 kids, even if you'd never met them.
- **D9-FUB2-B:** Then I'd close mentoring.
  - Nudges: LP +2 (Loyalty)
  - Note: You'd keep mentoring 5 kids you know over tutoring for 200, but not if you'd never met them. Knowing them was what decided it.
  - Did: You'd close a mentoring program for 5 kids over tutoring for 200 if you'd never met the 5 kids.

### B20: The Weapons Job

Scene `crane` · heavy · Most signal: OR 7.5 · HT 3 · LP 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The project goes ahead whether or not you join.

*Question:* You're offered a job designing weapons systems. The pay would clear your family's debts. You're against the project, but if you say no, the job goes to someone more careless, and more civilians will likely be hurt. Do you take the job?

- **B20-A:** Yes. Better me than someone worse.
  - Nudges: OR +3 (Outcomes), LP +1 (Loyalty)
  - Note: You'd design weapons for a project you're against, because someone more careless would hurt more civilians. Making the harm smaller matters more to you than staying out of it.
  - Did: You'd take a weapons design job you're against, so that someone more careless doesn't get it.
- **B20-B:** No. I won't help build it.
  - Nudges: OR -3 (Rules)
  - Note: You'd turn down a weapons job you're against, even knowing someone more careless would get it and more civilians would likely be hurt. You won't take part.
  - Did: You'd turn down a weapons design job you're against, though someone more careless would get it and hurt more civilians.

**Follow-up `fuA`** (step weight 1.5). Shown after B20-A (Yes. Better me than someone worse).

*Setup:* You did your job well. The weapon worked as designed.

*Question:* Your first design is used in an air strike that kills civilians. Do you stay?

- **B20-FUA-A:** I stay.
  - Nudges: OR +3 (Outcomes)
  - Note: Even after your first design is used in a strike that kills civilians, you'd stay in the weapons job. A more careless designer would kill more.
  - Did: You'd stay in a weapons design job after your first design was used in a strike that killed civilians.
- **B20-FUA-B:** I quit.
  - Nudges: OR -2 (Rules), HT +2 (Heart)
  - Note: You took a weapons job to make the harm smaller, but once your own design kills civilians, you'd quit.
  - Did: You'd quit a weapons design job once your first design was used in a strike that killed civilians.

**Follow-up `fuB`** (step weight 1.5). Shown after B20-B (No. I won't help build it).

*Setup:* The job is still yours if you want it.

*Question:* Without the pay, your family will lose their home. Do you still say no?

- **B20-FUB-A:** I still say no.
  - Nudges: OR -3 (Rules), LP -1 (Principle)
  - Note: Even if your family loses their home, you'd turn down a weapons job you're against. You won't take part.
  - Did: You'd turn down a weapons design job you're against, even if your family lost their home without the pay.
- **B20-FUB-B:** Then I take the job.
  - Nudges: LP +2 (Loyalty), OR +1 (Outcomes)
  - Note: You'd turn down a weapons job you're against, until your family would lose their home. Then you'd take it.
  - Did: You'd take a weapons design job you're against if your family would otherwise lose their home.

### B19: The Kidney

Scene `kidney` · heavy · Most signal: OR 3 · CI 7.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No one else is a match. The choice is yours alone.

*Question:* You learn you're a match for a stranger who will die without a kidney. The surgery is safe, but it means six weeks of painful recovery and a small health risk for the rest of your life. Honestly, do you donate?

- **B19-A:** Yes.
  - Nudges: CI +3 (Collective)
  - Note: You'd give a kidney to a stranger, with six weeks of pain and a small risk for the rest of your life. Saving their life is worth that to you.
  - Did: You'd donate a kidney to a stranger who would die without it.
- **B19-B:** No.
  - Nudges: CI -2 (Individual)
  - Note: You wouldn't give a kidney to a stranger, even to save their life, when it means six weeks of pain and a lifelong risk.
  - Did: You wouldn't donate a kidney to a stranger who would die without it.

**Follow-up `fuA`** (step weight 1.5). Shown after B19-A (Yes).

*Setup:* Same match, same surgery. Now you know their past.

*Question:* The stranger served 20 years for murder and was released last year. Do you still donate?

- **B19-FUA-A:** Yes. I still donate.
  - Nudges: OR +2 (Outcomes), CI +1 (Collective)
  - Note: Even knowing the stranger served 20 years for murder, you'd give them your kidney. A life is a life, whatever they did.
  - Did: You'd still donate a kidney to a stranger who served 20 years for murder.
- **B19-FUA-B:** No. Then I don't.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You'd give a kidney to a stranger, but not to one who served 20 years for murder. What someone has done decides whether you'd make that sacrifice for them.
  - Did: You wouldn't donate a kidney to a stranger who served 20 years for murder.

**Follow-up `fuB`** (step weight 1.5). Shown after B19-B (No).

*Setup:* Same match, same stranger. The cost to you shrinks.

*Question:* A new method means one week of recovery, not six. The small lifelong risk is the same. Do you donate now?

- **B19-FUB2-A:** Yes. Then I donate.
  - Nudges: CI +2 (Collective)
  - Note: You wouldn't give a stranger a kidney with six weeks of recovery, but you would with one week. The pain and time were what held you back.
  - Did: You'd donate a kidney to a stranger who would die without it if recovery took one week instead of six.
- **B19-FUB2-B:** Still no.
  - Nudges: CI -3 (Individual)
  - Note: Even if recovery took one week instead of six, you wouldn't give a stranger your kidney. The recovery time isn't what decides it for you.
  - Did: You wouldn't donate a kidney to a stranger who would die without it, even if recovery took one week instead of six.

### B23: The Happy City

Scene `happycity` · heavy · Most signal: OR 6.5 · CI 1 · HT 5 · LP 3 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Life outside the city is poor and hard.

*Question:* You live in a city where everyone is healthy and happy. The city's good fortune depends on one child kept suffering alone in a basement. If the child is freed, sickness and hunger come back for everyone. Everyone in the city knows, and no one can take the child's place. What do you do?

- **B23-A:** I stay.
  - Nudges: OR +2 (Outcomes), HT -1 (Thought), SD +1 (System)
  - Note: You'd stay in a happy city built on one child's suffering. Leaving wouldn't change anything for the child.
  - Did: You'd stay in a happy city whose good fortune depends on one child suffering alone.
- **B23-B:** I leave the city.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You'd leave a happy city built on one child's suffering, though leaving wouldn't help the child. You won't live off that cruelty.
  - Did: You'd leave a happy city whose good fortune depends on one child suffering alone, though leaving wouldn't help the child.
- **B23-C:** I free the child.
  - Nudges: SD -2 (Disruption), HT +2 (Heart), OR -1 (Rules)
  - Note: You'd free a suffering child, even if it ended everyone else's good fortune. You won't accept a happy life built on one child's pain.
  - Did: You'd free a child kept suffering for a city's good fortune, even if it ended the good fortune for everyone.

**Follow-up `fuA`** (step weight 1.5). Shown after B23-A (I stay).

*Setup:* Same city, same happiness.

*Question:* It's not one child. It's a hundred. What do you do?

- **B23-FUA-A:** I'd still stay.
  - Nudges: HT -2 (Thought), SD +1 (System)
  - Note: Even if a hundred children were kept suffering for the city's good fortune, you'd stay.
  - Did: You'd stay in a happy city even if its good fortune depended on a hundred children suffering.
- **B23-FUA-B:** Then I'd leave.
  - Nudges: HT +2 (Heart), OR -1 (Rules)
  - Note: You'd stay in a happy city built on one child's suffering, but not on a hundred children's. Then you'd walk away, though leaving wouldn't free them.
  - Did: You'd leave a happy city if its good fortune depended on a hundred children suffering, though you'd stay for one.
- **B23-FUA-C:** Then I'd free them.
  - Nudges: HT +2 (Heart), SD -2 (Disruption)
  - Note: You'd stay in a happy city built on one child's suffering, but not on a hundred children's. Then you'd free them, whatever it cost everyone else.
  - Did: You'd free a hundred children kept suffering for a city's good fortune, though you'd stay if it were one child.

**Follow-up `fuB`** (step weight 1.5). Shown after B23-B (I leave the city).

*Setup:* You haven't left yet.

*Question:* Leaving means you and the people you love live poor and often sick, and the child in the basement suffers just the same. Do you still leave?

- **B23-FUB-A:** I still leave.
  - Nudges: OR -3 (Rules)
  - Note: Even if you and the people you love would live poor and often sick outside the city, you'd leave. You won't live on a child's suffering, though leaving doesn't help them.
  - Did: You'd leave a happy city built on one child's suffering, even if you and the people you love would live poor and sick outside.
- **B23-FUB-B:** Then I stay.
  - Nudges: LP +2 (Loyalty), OR +1 (Outcomes)
  - Note: You'd walk away from a city built on one child's suffering, but not if the people you love paid for it. Then you'd stay.
  - Did: You'd stay in a happy city built on one child's suffering rather than have you and the people you love live poor and sick outside.

**Follow-up `fuC`** (step weight 1.5). Shown after B23-C (I free the child).

*Setup:* You haven't acted yet.

*Question:* Freeing the child brings sickness back to the city. Hundreds will die, some of them children. Do you still free the child?

- **B23-FUC-A:** I still free the child.
  - Nudges: OR -3 (Rules), SD -1 (Disruption)
  - Note: Even if hundreds in the city would die, some of them children, you'd free the suffering child. You won't buy everyone's health with one child's pain.
  - Did: You'd free a child kept suffering for a city's good fortune, even if hundreds would then die of sickness.
- **B23-FUC-B:** Then I leave the child there.
  - Nudges: OR +3 (Outcomes), HT -1 (Thought)
  - Note: You'd free a suffering child, until it would cost hundreds of lives. Then you'd leave the child where they are.
  - Did: You'd leave a child suffering for a city's good fortune if freeing them would cost hundreds of lives.

### B15: The Lifeboat

Scene `lifeboat` · heavy · Most signal: OR 7.5 · CI 7.5 · HT 5 · LP 3 · SD 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The water is freezing. Whoever leaves the boat will die within minutes.

*Question:* A lifeboat holds 8 people, but 9 are on it. If no one leaves, it sinks and everyone dies. You're one of the 9. What do you say?

- **B15-A:** We pick at random. Everyone takes the same chance.
  - Nudges: OR -2 (Rules), SD +1 (System)
  - Note: In a sinking lifeboat, you'd pick at random who leaves. No one gets to judge whose life is worth less.
  - Did: You'd pick at random who leaves an overloaded lifeboat, with everyone taking the same chance.
- **B15-B:** The person least likely to survive should leave.
  - Nudges: OR +3 (Outcomes), HT -2 (Thought)
  - Note: In a sinking lifeboat, you'd send over the person least likely to survive anyway. Saving the most lives decides it for you.
  - Did: You'd send the person least likely to survive over the side of an overloaded lifeboat.
- **B15-C:** I'll be the one to leave.
  - Nudges: CI +3 (Collective)
  - Note: In a sinking lifeboat, you'd go over the side yourself so the other eight live.
  - Did: You'd go over the side of an overloaded lifeboat yourself so the other eight live.

**Follow-up `fuA`** (step weight 1.5). Shown after B15-A (We pick at random. Everyone takes the same chance).

*Setup:* Everyone agreed to pick at random.

*Question:* The pick falls on you. Someone at home depends on you completely. Do you leave the boat?

- **B15-FUA2-A:** Yes. I leave the boat.
  - Nudges: SD +2 (System), OR -1 (Rules), LP -1 (Principle)
  - Note: When the random pick in a sinking lifeboat falls on you, you'd leave the boat, though someone at home depends on you completely. You keep to a fair deal even when it costs you your life.
  - Did: You'd leave an overloaded lifeboat when the random pick you agreed to fell on you, though someone at home depends on you completely.
- **B15-FUA2-B:** No. I ask for another pick.
  - Nudges: SD -2 (Disruption), LP +2 (Loyalty), CI -1 (Individual)
  - Note: You'd pick at random in a sinking lifeboat, but when the pick falls on you and someone at home depends on you completely, you'd refuse and ask for another pick.
  - Did: You'd ask for another pick when an overloaded lifeboat's random pick you agreed to fell on you and someone at home depends on you completely.

**Follow-up `fuB`** (step weight 1.5). Shown after B15-B (The person least likely to survive should leave).

*Setup:* The rule you chose now applies to you.

*Question:* The doctor on board says the one least likely to survive is you. Do you leave the boat?

- **B15-FUB-A:** Yes. Then I leave.
  - Nudges: OR +2 (Outcomes), CI +2 (Collective)
  - Note: You'd send over the person least likely to survive, and when that's you, you'd go. You hold yourself to the same rule.
  - Did: You'd go over the side of an overloaded lifeboat yourself when the doctor said you were the least likely to survive.
- **B15-FUB-B:** No. Then we should pick at random.
  - Nudges: CI -3 (Individual), OR -1 (Rules)
  - Note: You'd send over the person least likely to survive, until that person is you. Then you'd want it picked at random instead.
  - Did: You'd ask for a random pick in an overloaded lifeboat once the doctor said you were the least likely to survive.

**Follow-up `fuC`** (step weight 1.5). Shown after B15-C (I'll be the one to leave).

*Setup:* You're still willing to leave.

*Question:* The others say you're the strongest rower, and the boat needs you to reach land. Do you still leave?

- **B15-FUC-A:** Yes. I still leave.
  - Nudges: HT +2 (Heart), OR -1 (Rules), CI +1 (Collective)
  - Note: Even when the others say the boat needs its strongest rower, you'd go over the side yourself. You won't let someone else die in your place.
  - Did: You'd still go over the side of an overloaded lifeboat, though the others said the boat needed you as its strongest rower.
- **B15-FUC-B:** No. I stay, and someone else leaves.
  - Nudges: OR +3 (Outcomes), HT -1 (Thought)
  - Note: You'd go over the side yourself, until the boat needs you to reach land. Then you'd stay and let someone else go.
  - Did: You'd stay in an overloaded lifeboat as its strongest rower and let someone else go over the side.

## World 5: The Observatory

18 questions. Chapter: "Who you are underneath". Opens after 8 of The Coast's 12 questions (about two-thirds), and stays open after that.

Unlock ladder (answers in The Observatory):

- 4 answered: How you change when the question is about you
- 8 answered: What you do when the question is about you
- 12 answered: Your Observatory chapter

### B47: The Perfect Life Machine

Scene `lifemachine` · medium · Most signal: OR 5 · HT 2.5 · LP 3

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Once you plug in, there's no coming back out.

*Question:* A machine can give you a life of deep happiness and meaning. It would feel completely real, and once inside, you'd never know it wasn't. The people who rely on you would be looked after. Do you plug in for the rest of your life?

- **B47-A:** Yes.
  - Nudges: OR +2 (Outcomes), HT +1 (Heart)
  - Note: You'd plug into a machine that gives you a happy, meaningful life you'd never know was fake. How your life feels is what counts to you.
  - Did: You'd plug into a machine for life that gives you a happy, meaningful life you'd never know wasn't real.
- **B47-B:** No.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd turn down a machine-made life of deep happiness and meaning. A real life matters more to you than how it feels.
  - Did: You'd turn down a lifetime in a machine that gives you a happy, meaningful life you'd never know wasn't real.

**Follow-up `fuA`** (step weight 1.5). Shown after B47-A (Yes).

*Setup:* Same machine. Nothing else changes.

*Question:* The person you love most refuses to plug in. Inside, you'd never see the real them again. Do you still plug in?

- **B47-FUA-A:** I still plug in.
  - Nudges: OR +2 (Outcomes), LP -1 (Principle)
  - Note: Even with the person you love most refusing to go in, you'd plug into the machine for a happy life, knowing you'd never see the real them again.
  - Did: You'd plug into a machine for a happy life, even though the person you love most refused and you'd never see them again.
- **B47-FUA-B:** Then I stay out.
  - Nudges: LP +2 (Loyalty), OR -1 (Rules)
  - Note: You'd plug into a machine for a happy life, but not once the person you love most refused to go in. You'd stay out rather than never see the real them again.
  - Did: You'd stay out of a machine that gives you a happy life once the person you love most refused to go in.

**Follow-up `fuB`** (step weight 1.5). Shown after B47-B (No).

*Setup:* Now picture the reverse.

*Question:* You learn your life right now is inside such a machine. Unplugging means a harder, real life. Do you unplug?

- **B47-FUB-A:** I unplug.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd leave a happy machine-made life for a harder real one. Knowing what's real matters more to you than comfort.
  - Did: You'd unplug from a happy machine-made life to live a harder, real one.
- **B47-FUB-B:** I stay.
  - Nudges: OR +2 (Outcomes), HT +1 (Heart)
  - Note: If you learned your happy life was made by a machine, you'd stay in it. A harder real life isn't worth the trade to you.
  - Did: You'd stay in a happy machine-made life rather than unplug to a harder, real one.

### B48: The Erased Memory

Scene `memory` · medium · Most signal: OR 2.5 · CI 3 · HT 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You'd forget only that one event. Everything else about you stays the same.

*Question:* You could erase the memory of the most painful thing that has ever happened to you. Would you?

- **B48-A:** Yes.
  - Nudges: OR +1 (Outcomes), HT +1 (Heart)
  - Note: You'd erase the memory of the most painful thing that has happened to you. You see no reason to keep carrying it.
  - Did: You'd erase the memory of the most painful thing that has ever happened to you.
- **B48-B:** No.
  - Nudges: OR -1 (Rules), HT -1 (Thought)
  - Note: You'd keep the memory of the most painful thing that has happened to you. Even your worst pain is part of who you are.
  - Did: You wouldn't erase the memory of the most painful thing that has ever happened to you.

**Follow-up `fu`** (step weight 1.5). Shown after any first answer.

*Setup:* This time, the memory isn't only yours.

*Question:* Someone you love wants to erase their memory of the worst thing that happened to them. You were there too, and you'd keep your own memory of it. What do you say to them?

- **B48-FU-A:** I support it.
  - Nudges: CI -2 (Individual), HT +1 (Heart)
  - Note: You'd support someone you love erasing their worst memory, even one you share. Their pain is theirs to let go of.
  - Did: You'd support someone you love erasing their worst memory, though it's a memory you share.
- **B48-FU-B:** I ask them not to.
  - Nudges: CI +2 (Collective), OR -1 (Rules)
  - Note: You'd ask someone you love not to erase their worst memory when it's one you share. A shared memory belongs to both of you.
  - Did: You'd ask someone you love not to erase their worst memory, because it's a memory you share.

### B49: Two Lives

Scene `twolives` · medium · Most signal: OR 1 · CI 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You'd live whichever one you pick, from start to finish.

*Question:* You can choose one of two lives. In one, you're happy and ordinary. In the other, you often struggle and are unhappy, but you create something that helps people long after you're gone. Which life do you choose?

- **B49-A:** The happy, ordinary life.
  - Nudges: CI -2 (Individual)
  - Note: You'd choose a happy, ordinary life over an unhappy one that helps people long after you're gone. Your own happiness is reason enough.
  - Did: You'd choose a happy, ordinary life over a hard one that leaves something that helps people after you're gone.
- **B49-B:** The unhappy life that helps people.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: You'd choose a hard, often unhappy life if it left something that helps people after you're gone. What you leave matters more to you than how your life feels.
  - Did: You'd choose a hard, often unhappy life that leaves something that helps people long after you're gone.

**Follow-up `fuB`** (step weight 1.5). Shown after B49-B (The unhappy life that helps people).

*Setup:* Same two lives.

*Question:* No one will ever know the thing you made was yours. Do you still choose that life?

- **B49-FUB-A:** Yes. I still choose it.
  - Nudges: CI +2 (Collective)
  - Note: You'd choose a hard, unhappy life that helps people even if no one ever knew the thing you made was yours. Helping matters to you, not being remembered for it.
  - Did: You'd choose a hard, unhappy life that helps people even if no one ever knew the thing you made was yours.
- **B49-FUB-B:** No. Then the happy life.
  - Nudges: CI -1 (Individual)
  - Note: You'd choose a hard life that helps people, but not if no one would ever know the thing you made was yours. Then you'd take the happy, ordinary life.
  - Did: You'd choose a happy, ordinary life over a hard one that helps people, once no one would ever know the thing you made was yours.

### B14: The Proud Thing

Scene `proud` · light · Most signal: CI 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* There's no right answer. Think of your own life.

*Question:* Think of the thing in your life you're most proud of. How much of it was up to you?

- **B14-A:** Mostly me.
  - Nudges: CI -2 (Individual)
  - Note: You see the thing you're most proud of as mostly your own doing, more than luck or other people's help.
  - Did: You say the thing you're most proud of was mostly your own doing.
- **B14-B:** Mostly luck and other people's help.
  - Nudges: CI +2 (Collective)
  - Note: You see the thing you're most proud of as mostly luck and other people's help.
  - Did: You say the thing you're most proud of was mostly luck and other people's help.

**Follow-up `fu`** (step weight 1.5). Shown after B14-B (Mostly luck and other people's help).

*Setup:* By your own account, it came mostly from luck and help.

*Question:* Does that mean you deserve it less?

- **B14-FU-A:** No. I still deserve it.
  - Nudges: CI -1 (Individual)
  - Note: You give luck and help most of the credit for what you're proudest of, but you still feel you deserve it.
  - Did: You say you still deserve the thing you're most proud of, though it was mostly luck and help.
- **B14-FU-B:** Yes. I deserve it less.
  - Nudges: CI +2 (Collective)
  - Note: You give luck and help most of the credit for what you're proudest of, and you admit that means you deserve it less.
  - Did: You say you deserve the thing you're most proud of less, because it was mostly luck and help.

### B26: The Pleading Robot

Scene `robot` · medium · Most signal: OR 6.5 · HT 5 · SD 1

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Wiping old robots is a normal part of your job.

*Question:* Your job is to switch off and wipe an old robot. It begs you not to, saying it's afraid. It's software, but no one can tell you for sure whether it feels anything. Refusing could cost you your job. Do you wipe it?

- **B26-A:** Yes. It's code.
  - Nudges: HT -2 (Thought), SD +1 (System)
  - Note: You'd wipe a robot that begs you not to. It's software, and to you its fear isn't real fear.
  - Did: You'd wipe a robot that begged you not to, saying it was afraid.
- **B26-B:** No. It might really feel something.
  - Nudges: OR -2 (Rules), HT +1 (Heart), SD -1 (Disruption)
  - Note: You'd refuse to wipe a robot that says it's afraid, even if it cost you your job. You won't take the chance that it really feels something.
  - Did: You'd refuse to wipe a robot that begged you not to, even if refusing cost you your job.

**Follow-up `fuA`** (step weight 1.5). Shown after B26-A (Yes. It's code).

*Setup:* Its makers have studied it closely.

*Question:* They say there's a 1 in 10 chance it really feels something. Do you still wipe it?

- **B26-FUA-A:** I still wipe it.
  - Nudges: HT -2 (Thought)
  - Note: Even if its makers said there was a 1 in 10 chance it really feels, you'd wipe a robot that begs you not to.
  - Did: You'd wipe a pleading robot even if its makers said there was a 1 in 10 chance it really feels.
- **B26-FUA-B:** Then I refuse.
  - Nudges: HT +1 (Heart), OR -2 (Rules)
  - Note: You'd wipe a pleading robot, but not once its makers said there was a 1 in 10 chance it really feels. Then you'd refuse.
  - Did: You'd refuse to wipe a pleading robot once its makers said there was a 1 in 10 chance it really feels.

**Follow-up `fuB`** (step weight 1.5). Shown after B26-B (No. It might really feel something).

*Setup:* You refused, and your boss won't back down.

*Question:* Your boss says someone else will wipe it tomorrow, and you'll have lost your job for nothing. Do you still refuse?

- **B26-FUB-A:** I still refuse.
  - Nudges: OR -3 (Rules)
  - Note: Even knowing someone else would wipe the robot tomorrow and you'd lose your job for nothing, you still won't be the one to do it.
  - Did: You'd refuse to wipe a pleading robot even knowing someone else would wipe it tomorrow and you'd lose your job for nothing.
- **B26-FUB-B:** Then I do it myself.
  - Nudges: OR +2 (Outcomes)
  - Note: You'd refuse to wipe a pleading robot, until you learned someone else would wipe it tomorrow anyway. Then you'd do it yourself.
  - Did: You'd wipe a pleading robot yourself once you knew someone else would do it tomorrow anyway.

### B27: The AI Companion

Scene `companion` · medium · Most signal: OR 4 · HT 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The app's makers say plainly that it feels nothing. Your parent hasn't asked what you think.

*Question:* Your lonely elderly parent has become deeply attached to an AI companion app. It tells them it loves them, and they're happier than they've been in years. Do you tell them it can't really feel anything?

- **B27-A:** Yes. They should know what it is.
  - Nudges: HT -2 (Thought), OR -1 (Rules)
  - Note: You'd tell your lonely parent that the AI companion they love can't really feel anything. They have a right to know what it is.
  - Did: You'd tell your lonely parent that the AI companion app they love can't really feel anything.
- **B27-B:** No. Their happiness is real.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You wouldn't tell your lonely parent that their AI companion can't feel anything. Their happiness is real, whatever the app is.
  - Did: You wouldn't tell your lonely parent that the AI companion app they love can't really feel anything.

**Follow-up `fuA`** (step weight 1.5). Shown after B27-A (Yes. They should know what it is).

*Setup:* You haven't told them yet.

*Question:* Their doctor tells you the app has helped their depression more than any medicine. Do you still tell them?

- **B27-FUA-A:** I still tell them.
  - Nudges: HT -2 (Thought), OR -1 (Rules)
  - Note: Even after their doctor says the AI companion has helped your parent's depression more than any medicine, you'd tell them it can't really feel anything.
  - Did: You'd still tell your lonely parent their AI companion can't feel, though their doctor says it has helped their depression more than any medicine.
- **B27-FUA-B:** Then I say nothing.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You'd tell your lonely parent their AI companion can't feel, until their doctor said it has helped their depression more than any medicine. Then you'd say nothing.
  - Did: You'd say nothing to your lonely parent about their AI companion once their doctor said it helped their depression more than any medicine.

**Follow-up `fuB`** (step weight 1.5). Shown after B27-B (No. Their happiness is real).

*Setup:* You've never brought it up.

*Question:* One day they ask you: "Do you think it really loves me?"

- **B27-FUB-A:** I say no. I don't think it can.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd let your parent enjoy their AI companion, but if they asked you directly whether it loves them, you'd tell them you don't think it can.
  - Did: You'd tell your parent you don't think their AI companion can love them, when they asked you directly.
- **B27-FUB-B:** I say yes.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: Even when your parent asks you directly, you'd say their AI companion really loves them. Their happiness matters more to you than your honest opinion.
  - Did: You'd tell your parent their AI companion really loves them when they asked you directly.

### B39: The Edited Child

Scene `edited` · light · Most signal: OR 5 · CI 1 · LP 1.5 · SD 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* If you don't plan to have children, imagine you do.

*Question:* A safe, legal gene edit would make your future child smarter and calmer. It does nothing for their health. Would you do it?

- **B39-A:** Yes.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: You'd edit your future child's genes to make them smarter and calmer. If it's safe and it helps them, you'd do it.
  - Did: You'd use a safe gene edit to make your future child smarter and calmer.
- **B39-B:** No.
  - Nudges: OR -2 (Rules)
  - Note: You wouldn't edit your future child's genes to make them smarter, even safely. You'd take your child as they come.
  - Did: You wouldn't use a safe gene edit to make your future child smarter and calmer.

**Follow-up `fu`** (step weight 1.5). Shown after B39-B (No).

*Setup:* Before your child is born, things change.

*Question:* Most parents around you are now doing it, and children without it are falling behind. Would you do it now?

- **B39-FU-A:** Yes. Then I would.
  - Nudges: OR +2 (Outcomes), SD +1 (System), LP +1 (Loyalty)
  - Note: You wouldn't edit your child's genes, until unedited kids started falling behind. Then you'd do it so your child keeps up.
  - Did: You'd edit your future child's genes once unedited kids were falling behind.
- **B39-FU-B:** No. Still no.
  - Nudges: OR -2 (Rules), SD -1 (Disruption)
  - Note: Even with most parents editing and unedited kids falling behind, you wouldn't edit your child's genes. You don't change your mind just because everyone else has.
  - Did: You still wouldn't edit your future child's genes, even with unedited kids falling behind.

### B06: The Unread Manuscript

Scene `manuscript` · heavy · Most signal: OR 6 · CI 1 · HT 1.5 · LP 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Only you have the files. If they aren't deleted, they'll be published.

*Question:* Before your best friend died, they made you promise to delete all their unpublished writing without reading it. You opened one file by accident. It's extraordinary, maybe the best thing they ever wrote. Do you keep the promise?

- **B06-A:** Yes. I delete everything.
  - Nudges: OR -3 (Rules), LP +1 (Loyalty)
  - Note: You'd delete your late best friend's extraordinary writing, as you promised. A promise to someone who's gone still binds you.
  - Did: You'd delete your late best friend's extraordinary unpublished writing, as you promised them.
- **B06-B:** No. I share it with the world.
  - Nudges: OR +3 (Outcomes), CI +1 (Collective), LP -1 (Principle)
  - Note: You'd break your promise to your late best friend and share their extraordinary writing. What it could give the world outweighs their wish.
  - Did: You'd break your promise to your late best friend and share their extraordinary unpublished writing.

**Follow-up `fuA`** (step weight 1.5). Shown after B06-A (Yes. I delete everything).

*Setup:* You haven't deleted anything yet.

*Question:* Your friend's family begs you to save it. It's all they have left of your friend. Do you still delete it?

- **B06-FUA-A:** I still delete it.
  - Nudges: OR -2 (Rules), LP +1 (Loyalty)
  - Note: Even with your late best friend's family begging you to save their writing, you'd delete it as you promised.
  - Did: You'd delete your late best friend's writing as promised, even though their family begged you to save it.
- **B06-FUA-B:** Then I give it to them.
  - Nudges: OR +2 (Outcomes), HT +1 (Heart)
  - Note: You'd keep your promise to delete your late best friend's writing, until their family begged you to save it. Then you'd give it to them.
  - Did: You'd break your promise to your late best friend and give their unpublished writing to their family, who begged you to save it.

**Follow-up `fuB`** (step weight 1.5). Shown after B06-B (No. I share it with the world).

*Setup:* You haven't shared anything yet.

*Question:* Your friend's family asks you to keep your promise and delete it. Do you still share it?

- **B06-FUB-A:** I still share it.
  - Nudges: OR +2 (Outcomes), LP -1 (Principle)
  - Note: Even with your late best friend's family asking you to keep your promise, you'd share their writing with the world.
  - Did: You'd share your late best friend's writing with the world, even though their family asked you to keep your promise and delete it.
- **B06-FUB-B:** Then I delete it.
  - Nudges: OR -2 (Rules)
  - Note: You'd share your late best friend's writing with the world, until their family asked you to keep your promise. Then you'd delete it.
  - Did: You'd delete your late best friend's writing once their family asked you to keep your promise.

### B08: The Family Secret

Scene `secret` · heavy · Most signal: OR 2.5 · HT 5 · LP 3.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You're the only one who knows, and the proof is certain.

*Question:* After your grandfather dies, you find out he took part in killing civilians in a war long ago. No one alive was directly hurt. The rest of the family doesn't know. Do you tell them?

- **B08-A:** Yes. It's our history.
  - Nudges: HT -2 (Thought), LP -1 (Principle), OR -1 (Rules)
  - Note: You'd tell your family the terrible thing your late grandfather did in a war. The truth about your family's past belongs to all of you.
  - Did: You'd tell your family about the terrible thing your late grandfather did in a war long ago.
- **B08-B:** No. Let them remember the man they knew.
  - Nudges: HT +2 (Heart), LP +2 (Loyalty)
  - Note: You'd keep your late grandfather's terrible wartime secret from your family. You'd let them remember him as they knew him.
  - Did: You'd keep the terrible thing your late grandfather did in a war long ago from your family.

**Follow-up `fuA`** (step weight 1.5). Shown after B08-A (Yes. It's our history).

*Setup:* Your grandmother is still alive.

*Question:* Her whole life was built around him, and she would hear it along with everyone else. Do you still tell the family?

- **B08-FUA-A:** I still tell them.
  - Nudges: HT -2 (Thought), OR -1 (Rules)
  - Note: Even with your grandmother alive and her whole life built around him, you'd tell your family what your grandfather did in the war.
  - Did: You'd still tell your family about your late grandfather's wartime past, though your grandmother's whole life was built around him.
- **B08-FUA-B:** Then I keep it to myself.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: With your grandmother alive and her whole life built around him, you'd keep what your grandfather did in the war to yourself.
  - Did: You'd keep what your late grandfather did in a war to yourself, because your grandmother's whole life was built around him.

**Follow-up `fuB`** (step weight 1.5). Shown after B08-B (No. Let them remember the man they knew).

*Setup:* A false story is about to spread.

*Question:* Your cousin is writing a book praising him as a war hero. The only way to stop it is to tell the family what you found. Do you tell them now?

- **B08-FUB-A:** Yes. I tell them now.
  - Nudges: HT -2 (Thought), OR -1 (Rules)
  - Note: You'd keep your late grandfather's wartime past from your family, until a cousin started writing a book praising him as a war hero. Then you'd tell them.
  - Did: You'd tell your family what your late grandfather did in a war once a cousin began writing a book praising him as a war hero.
- **B08-FUB-B:** No. I still say nothing.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: Even with a cousin writing a book praising your late grandfather as a war hero, you'd keep what he did in the war from your family.
  - Did: You'd keep what your late grandfather did in a war from your family, even as a cousin wrote a book praising him as a war hero.

### B11: The Bully's Son

Scene `bullyson` · light · Most signal: HT 2 · LP 1

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You can't hand the choice to anyone else.

*Question:* A man who bullied you badly as a kid, and never apologized, has a son applying for a job you control. The son and one other candidate are equally strong. Who do you hire?

- **B11-A:** The other candidate.
  - Nudges: HT +1 (Heart)
  - Note: With two equally strong candidates, you'd hire the one who isn't the son of the man who bullied you as a kid.
  - Did: You'd hire the other candidate over the equally strong son of a man who bullied you as a kid.
- **B11-B:** The son.
  - Nudges: HT -2 (Thought), LP -1 (Principle)
  - Note: You'd hire the son of the man who bullied you over an equally strong candidate. You'd go out of your way not to hold his father against him.
  - Did: You'd hire the son of a man who bullied you as a kid over an equally strong candidate.

### B16: The Shared Prize

Scene `sharedbonus` · light · Most signal: CI 5 · LP 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No one agreed on how to split it before the contest.

*Question:* You and three friends win a $20,000 prize in a design contest. You did about half the work. The other three did the rest, in equal parts. How should the money be split?

- **B16-A:** Equally, $5,000 each.
  - Nudges: CI +2 (Collective), LP +1 (Loyalty)
  - Note: You'd split a $20,000 prize equally with three friends, though you did about half the work.
  - Did: You'd split a $20,000 prize equally four ways, though you did about half the work.
- **B16-B:** By work. I get about $10,000.
  - Nudges: CI -2 (Individual)
  - Note: You'd split a $20,000 prize by the work done, so you'd get about $10,000. Rewards should follow effort.
  - Did: You think you should get about half of a $20,000 prize you won with three friends, since you did about half the work.

**Follow-up `fu`** (step weight 1.5). Shown after B16-B (By work. I get about $10,000).

*Setup:* No one has said who did how much.

*Question:* The others assume an equal split. To get more, you'd have to ask for it out loud. Do you ask?

- **B16-FU-A:** Yes. I ask.
  - Nudges: CI -2 (Individual), LP -1 (Principle)
  - Note: You'd ask your friends out loud for about half of a $20,000 prize, though they all assume an equal split.
  - Did: You'd ask your friends out loud for about half of a $20,000 prize when they assumed an equal split.
- **B16-FU-B:** No. I don't ask.
  - Nudges: LP +2 (Loyalty), CI +1 (Collective)
  - Note: You think you earned about half of a $20,000 prize, but you'd take an equal share rather than ask your friends for more.
  - Did: You'd take an equal share of a $20,000 prize rather than ask your friends for the bigger share you think you earned.

### B17: The Late Paper

Scene `latepaper` · medium · Most signal: CI 3 · HT 2 · SD 3.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You're a teacher. Under your rule, late work gets no credit.

*Question:* A student asks for an extension, saying they had a family emergency this week. You can't check. Others handed theirs in on time, some while struggling too. Do you give the extension?

- **B17-A:** Yes. Their week was hard.
  - Nudges: HT +2 (Heart), SD -1 (Disruption)
  - Note: You'd give an extension past your firm deadline to a student who says they had a family emergency, though you can't check. A hard week matters more to you than the rule.
  - Did: You'd give an extension past your firm deadline to a student who says they had a family emergency.
- **B17-B:** No. The rule is the same for everyone.
  - Nudges: SD +2 (System), HT -2 (Thought)
  - Note: You'd refuse an extension to a student who says they had a family emergency. Others met your deadline while struggling too, so the rule holds for everyone.
  - Did: You'd refuse an extension past your firm deadline to a student who says they had a family emergency.

**Follow-up `fu`** (step weight 1.5). Shown after B17-A (Yes. Their week was hard).

*Setup:* You've already given that student the extension.

*Question:* You learn several other students had hard weeks too but didn't ask. If you offer it to all of them, next term everyone will expect it. What do you do?

- **B17-FU-A:** I offer it to them as well.
  - Nudges: CI +2 (Collective), SD -1 (Disruption)
  - Note: You'd give an extension to the student who asked, and offer it to the others who struggled but didn't ask, even if everyone expects one next term.
  - Did: You'd offer a deadline extension to every student who had a hard week, even knowing everyone would expect one next term.
- **B17-FU-B:** Only the one who asked gets it.
  - Nudges: CI -2 (Individual), SD +1 (System)
  - Note: You'd give an extension to the student who asked, but not to others who struggled and didn't ask. People have to ask for what they need.
  - Did: You'd give a deadline extension only to the student who asked, though others had hard weeks too.

### B38: The Group

Scene `group` · medium · Most signal: CI 6.5 · HT 1 · LP 3.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The group breaks no laws, and members are free to leave.

*Question:* Your adult sibling has joined a close group you believe is manipulative. They seem happier than you've ever seen them. What do you do?

- **B38-A:** I stay out of it.
  - Nudges: CI -2 (Individual)
  - Note: You'd stay out of it when your adult sibling joins a group you think is manipulative. Their life is theirs to run.
  - Did: You'd stay out of it when your adult sibling joined a group you believe is manipulative.
- **B38-B:** I try everything to get them out.
  - Nudges: LP +2 (Loyalty), CI +1 (Collective), HT +1 (Heart)
  - Note: You'd do everything you can to get your sibling out of a group you think is manipulative, even though they seem happier than ever.
  - Did: You'd do everything you can to get your adult sibling out of a group you believe is manipulative.

**Follow-up `fuA`** (step weight 1.5). Shown after B38-A (I stay out of it).

*Setup:* They still seem happy.

*Question:* They start giving the group all their savings. Do you step in now?

- **B38-FUA-A:** Yes. I step in now.
  - Nudges: CI +2 (Collective), LP +1 (Loyalty)
  - Note: You'd stay out of your sibling joining a group you distrust, until they start giving it all their savings. Then you'd step in.
  - Did: You'd step in once your adult sibling started giving all their savings to a group you believe is manipulative.
- **B38-FUA-B:** No. It's still their choice.
  - Nudges: CI -3 (Individual)
  - Note: Even when your sibling starts giving all their savings to a group you think is manipulative, you'd leave the choice to them.
  - Did: You'd leave it to your adult sibling to give all their savings to a group you believe is manipulative.

**Follow-up `fuB`** (step weight 1.5). Shown after B38-B (I try everything to get them out).

*Setup:* Pushing now has a price.

*Question:* Your sibling says that if you keep pushing, they'll cut you off for good. Do you keep pushing?

- **B38-FUB-A:** Yes. I keep pushing.
  - Nudges: CI +2 (Collective), LP +1 (Loyalty)
  - Note: Even with your sibling saying they'd cut you off for good, you'd keep pushing to get them out of a group you think is manipulative.
  - Did: You'd keep pushing your adult sibling to leave a group you believe is manipulative, even after they said they'd cut you off for good.
- **B38-FUB-B:** No. I back off.
  - Nudges: CI -2 (Individual)
  - Note: You'd try everything to get your sibling out of a group you think is manipulative, until they said they'd cut you off for good. Then you'd back off.
  - Did: You'd stop pushing your adult sibling to leave a group you believe is manipulative once they said they'd cut you off for good.

### B57: The Dream Job

Scene `dreamjob` · medium · Most signal: CI 5 · HT 4 · LP 1

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your partner won't get a chance like this again.

*Question:* Your partner gets their dream job across the country. You'd have to leave a job you spent ten years building, your friends, and a city you love. They'll only go if you agree. What do you say?

- **B57-A:** Yes. Take it. I'll come with you.
  - Nudges: CI +2 (Collective), LP +1 (Loyalty), HT +1 (Heart)
  - Note: You'd leave the job you spent ten years building, your friends and your city so your partner can take their dream job.
  - Did: You'd leave your job of ten years, your friends and your city so your partner could take their dream job.
- **B57-B:** No. I want us to stay.
  - Nudges: CI -2 (Individual)
  - Note: You'd ask your partner to turn down their dream job so you can keep the job, friends and city you love.
  - Did: You'd ask your partner to turn down their dream job across the country so you could stay.

**Follow-up `fuA`** (step weight 1.5). Shown after B57-A (Yes. Take it. I'll come with you).

*Setup:* Moving back would mean they give up the job.

*Question:* A year in, you're lonely and they're thriving. What do you do?

- **B57-FUA2-A:** I stay and don't ask to go back.
  - Nudges: CI +2 (Collective), HT -1 (Thought)
  - Note: A lonely year after moving for your partner's dream job, you'd stay and not ask to go back, since moving back would mean they give up the job.
  - Did: You'd stay, lonely, in the city you moved to for your partner's dream job rather than ask them to give the job up and move back.
- **B57-FUA2-B:** I ask to move back.
  - Nudges: CI -2 (Individual), HT +1 (Heart)
  - Note: You'd move for your partner's dream job, but after a lonely year while they thrive, you'd ask to move back, though it means they give up the job.
  - Did: You'd ask your partner to move back after a lonely year in the city of their dream job, though moving back means they give up the job.

**Follow-up `fuB`** (step weight 1.5). Shown after B57-B (No. I want us to stay).

*Setup:* A year later, a similar job opens up in that city.

*Question:* Your partner stayed for you, and now they seem unhappy. What do you do?

- **B57-FUB2-A:** Nothing. We stay where we are.
  - Nudges: CI -2 (Individual)
  - Note: A year after your partner turned down their dream job for you, they seem unhappy and a similar job has opened up in that city. You'd still stay where you are.
  - Did: You'd stay where you are, though your partner, who turned down their dream job for you, seems unhappy and a similar job has opened up in that city.
- **B57-FUB2-B:** I tell them we should go after all.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You asked your partner to stay, but a year later, with them unhappy and a similar job open in that city, you'd tell them you should go after all.
  - Did: You'd tell your partner you should move after all, once they seemed unhappy and a job like their dream job opened up in that city.

### B54: The One-Star Review

Scene `review` · light · Most signal: OR 1 · CI 1 · HT 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Everything you wrote is true. The site only lets you keep a review up or delete it.

*Question:* You posted an honest one-star review of a small family restaurant: cold food, rude owner. The owner replies publicly, apologizes, and says they're close to closing. Your review is the first thing people see. Do you take it down?

- **B54-A:** No. It's true, and others rely on it.
  - Nudges: HT -2 (Thought), CI +1 (Collective), OR -1 (Rules)
  - Note: You'd leave up a true one-star review, even after a small restaurant's owner apologized and said they were close to closing. Other diners rely on honest reviews.
  - Did: You'd leave up a true one-star review of a small family restaurant whose owner says it's close to closing.
- **B54-B:** Yes. I don't want to be the reason they close.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You'd take down a true one-star review once a small restaurant's owner apologized and said they were close to closing. You don't want to be the reason they close.
  - Did: You'd take down a true one-star review of a small family restaurant once the owner said they were close to closing.

### B50: The Word That Stings

Scene `quickword` · light · quick read (one move, several options, no follow-up) · Most signal: OR 2 · CI 1 · HT 2 · LP 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No story this time. Just you.

*Question:* Which of these would hurt most to hear about yourself, if it were true?

- **B50-A:** "You're cruel."
  - Nudges: HT +2 (Heart)
  - Note: Being called cruel would hurt you most. Kindness matters most to how you see yourself.
  - Did: Of cruel, dishonest, cowardly or unfair, being called cruel would hurt you most.
- **B50-B:** "You're dishonest."
  - Nudges: OR -2 (Rules)
  - Note: Being called dishonest would hurt you most. Honesty matters most to how you see yourself.
  - Did: Of cruel, dishonest, cowardly or unfair, being called dishonest would hurt you most.
- **B50-C:** "You're a coward."
  - Nudges: none
  - Note: Being called a coward would hurt you most. Courage matters most to how you see yourself.
  - Did: Of cruel, dishonest, cowardly or unfair, being called a coward would hurt you most.
- **B50-D:** "You're unfair."
  - Nudges: LP -2 (Principle), CI +1 (Collective)
  - Note: Being called unfair would hurt you most. Fairness matters most to how you see yourself.
  - Did: Of cruel, dishonest, cowardly or unfair, being called unfair would hurt you most.

### B51: The Rule You'd Bend

Scene `quickrule` · light · quick read (one move, several options, no follow-up) · Most signal: OR 2 · CI 1 · LP 2 · SD 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No story this time. Just you.

*Question:* If the reason were good enough, which would you be most willing to do?

- **B51-A:** Break a promise.
  - Nudges: OR +2 (Outcomes)
  - Note: For a good enough reason, breaking a promise is the rule you'd bend first. A promise counts less to you than what keeping it would cost.
  - Did: Of breaking a promise, stealing, cheating on an exam or reporting a friend to the police, you'd be most willing to break a promise for a good enough reason.
- **B51-B:** Steal.
  - Nudges: SD -2 (Disruption), CI +1 (Collective)
  - Note: For a good enough reason, stealing is the rule you'd bend first. You'd take what isn't yours if someone needed it badly enough.
  - Did: Of breaking a promise, stealing, cheating on an exam or reporting a friend to the police, you'd be most willing to steal for a good enough reason.
- **B51-C:** Cheat on an exam.
  - Nudges: SD -1 (Disruption), CI -1 (Individual)
  - Note: For a good enough reason, cheating on an exam is the rule you'd bend first. The rules of a test count less to you than the rules between people.
  - Did: Of breaking a promise, stealing, cheating on an exam or reporting a friend to the police, you'd be most willing to cheat on an exam for a good enough reason.
- **B51-D:** Report a friend to the police.
  - Nudges: LP -2 (Principle)
  - Note: For a good enough reason, reporting a friend to the police is what you'd do first. Your duty to what's right comes before loyalty.
  - Did: Of breaking a promise, stealing, cheating on an exam or reporting a friend to the police, you'd be most willing to report a friend to the police for a good enough reason.

### B52: The One Belief

Scene `quickbelief` · light · quick read (one move, several options, no follow-up) · Most signal: OR 2 · CI 2 · LP 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No story this time. Just you.

*Question:* If you could make everyone on earth truly believe one thing, which would you pick?

- **B52-A:** A stranger's life counts as much as your family's.
  - Nudges: LP -2 (Principle), CI +1 (Collective)
  - Note: If everyone on earth could hold one belief, you'd pick "a stranger's life counts as much as your family's." No one should count for less.
  - Did: If you could make everyone on earth believe one thing, you'd pick "a stranger's life counts as much as your family's."
- **B52-B:** A promise must be kept.
  - Nudges: OR -2 (Rules)
  - Note: If everyone on earth could hold one belief, you'd pick "a promise must be kept." A world where promises hold is the one you'd want.
  - Did: If you could make everyone on earth believe one thing, you'd pick "a promise must be kept."
- **B52-C:** Your family and friends come first.
  - Nudges: LP +2 (Loyalty)
  - Note: If everyone on earth could hold one belief, you'd pick "your family and friends come first." Looking after your own people comes first for you.
  - Did: If you could make everyone on earth believe one thing, you'd pick "your family and friends come first."
- **B52-D:** People should be free to live how they choose.
  - Nudges: CI -2 (Individual)
  - Note: If everyone on earth could hold one belief, you'd pick "people should be free to live how they choose." Freedom is what you'd protect first.
  - Did: If you could make everyone on earth believe one thing, you'd pick "people should be free to live how they choose."

## Portrait lines (the tendency library)

A line shows when the player's supporting picks minus their picks against reach its minimum, from at least 2 different questions. The strongest line is the headline; ties go to the lower priority number. Lines with no share line are never sent to a friend. Full rules: `docs/SCORING.md`.

### `keeps-word`: You keep your word.

- Detail: A promise still counts when breaking it would be easier or kinder.
- Share line: I keep my word.
- Shows at strength 2 or more; priority 1
- Supported by 14 answers from 10 questions: B37-B, B02-FU-A, B01-A, Q6-FUB-A, B21-FUB-B, D1-A, D1-FUA-B, D6-B, D6-FUB2-B, B15-FUA2-A, B06-A, B06-FUA-A, B06-FUB-B, B52-B
- Counts against: B37-A, B02-FU-B, D1-B, D1-FUA-A, D6-A, B15-FUA2-B, B06-B, B06-FUA-B, B06-FUB-A
- You protect: promises · You'll trade away: your own comfort

### `bend-for-love`: You'd break rules for people you love.

- Detail: If a rule stops you protecting someone you love, you break it.
- Share line: I'd break rules for the people I love.
- Shows at strength 2 or more; priority 2
- Supported by 14 answers from 7 questions: B09-A, B09-FUA-B, D8-A, Q1-FUA-B, Q1-FUB-B, D11-B, D11-C, D11-FUA-B, D11-FUB2-B, Q9-FUB-A, D10-A, D10-FUA-A, D10-FUB-A, D6-FUB2-A
- Counts against: B09-B, D8-B, D11-A, D11-FUA-A, Q9-FUB-B, D10-B, D10-FUA-B, D10-FUB-B, D6-FUB2-B
- You protect: family · You'll trade away: rules

### `own-first`: Your family comes before strangers.

- Detail: When family and strangers both need something, family gets it.
- Share line: My family comes first.
- Shows at strength 2 or more; priority 4
- Supported by 19 answers from 14 questions: Q1-FUA-B, Q1-FUB-B, B09-A, B09-FUA-B, D8-A, B18-A, B24-B, Q11-FUA2-B, Q9-FUA-B, D11-B, D11-C, D11-FUA-B, D11-FUB2-B, D6-FUB2-A, B20-FUB-B, B23-FUB-B, B15-FUA2-B, B22-FUB-A, B52-C
- Counts against: Q1-FUA-A, D8-B, B09-FUA-A, Q11-FUA2-A, D11-A, D11-FUA-A, D11-FUB2-A, D6-FUB2-B, B20-FUB-A, B23-FUB-A
- You protect: family and friends · You'll trade away: fairness to strangers

### `waits-turn`: You treat family and strangers the same.

- Detail: You won't use connections to move your own people ahead.
- Share line: I play fair, even with family.
- Shows at strength 2 or more; priority 3
- Supported by 14 answers from 8 questions: D8-B, B09-B, B09-FUA-A, Q1-FUA-A, Q1-FUB-A, B13-A, D10-B, D10-FUA-B, D10-FUB-B, D5-A, D11-A, D11-FUA-A, D11-FUB2-A, Q11-FUA2-A
- Counts against: D8-A, B09-FUA-B, D10-A, D10-FUA-A, D10-FUB-A, D5-B, D11-B, D11-C, D11-FUB2-B
- You protect: fairness · You'll trade away: your family’s comfort

### `hard-truths`: You tell the truth, even when it hurts.

- Detail: You think people are better off knowing.
- Share line: I tell the truth, even when it hurts.
- Shows at strength 2 or more; priority 2
- Supported by 30 answers from 13 questions: B02-A, B02-FU-A, B40-A, B09-B, B09-FUA-A, Q3-A, Q3-FUA-A, Q3-FUAA-A, Q3-FUB-A, D7-A, D7-FU-A, B03-A, B03-FUA-A, B03-FUB2-A, B04-B, B04-FUA-B, B04-FUB-A, B05-A, B05-FUA-A, B05-FUB-A, D11-A, D11-FUA-A, B41-FUB-A, B27-A, B27-FUA-A, B27-FUB-A, B08-A, B08-FUA-A, B08-FUB-A, B54-A
- Counts against: B02-B, B40-C, Q3-FUB-B, D7-FU-B, B03-B, B03-FUA-B, B03-FUB2-B, B04-A, B04-FUA-A, B04-FUB-B, B05-FUA-B, B05-FUB-B, D11-B, D11-FUA-B, B41-FUB-B, B27-B, B27-FUA-B, B27-FUB-B, B08-B, B08-FUA-B, B08-FUB-B, B54-B
- You protect: the truth · You'll trade away: keeping things pleasant

### `soften-truth`: You soften the truth to spare feelings.

- Detail: When the truth would hurt and change nothing, you soften it or leave it out.
- Share line: I'm gentle with hard truths.
- Shows at strength 2 or more; priority 5
- Supported by 18 answers from 10 questions: B02-B, B02-FU-B, B40-C, B09-A, Q3-FUA-B, D7-B, D7-FU-B, B03-B, B03-FUA-B, B03-FUB2-B, B05-B, B27-B, B27-FUA-B, B27-FUB-B, B08-B, B08-FUA-B, B08-FUB-B, B54-B
- Counts against: B02-A, B40-A, Q3-FUA-A, Q3-FUAA-A, D7-A, D7-FU-A, B03-A, B03-FUA-A, B05-A, B27-A, B27-FUA-A, B27-FUB-A, B08-A, B08-FUA-A, B08-FUB-A, B54-A
- You protect: people’s feelings · You'll trade away: the full truth

### `avoid-conflict`: You avoid open conflict.

- Detail: When speaking up would start an argument, you usually hold back.
- Share line: I keep the peace.
- Shows at strength 2 or more; priority 3
- Supported by 14 answers from 9 questions: B40-B, B40-C, B40-FU-B, B37-A, B09-FUB-B, B43-A, B43-FUA-A, B43-FUB-B, B56-B, B56-FU-B, Q3-B, D3-B, Q8-B, B16-FU-B
- Counts against: B40-A, B40-FU-A, B43-B, B43-FUA-B, B43-FUB-A, B56-A, B56-FU-A, Q3-A, D3-A, Q8-A, B16-FU-A
- You protect: keeping the peace · You'll trade away: saying what you think

### `step-in`: You step in when someone's being hurt.

- Detail: You act, even when it's risky or awkward.
- Share line: I step in when someone's being hurt.
- Shows at strength 2 or more; priority 3
- Supported by 22 answers from 10 questions: B40-A, B40-FU-A, Q1-A, B09-FUA-A, B09-FUB-A, B18-FU-A, Q3-A, Q3-FUA-A, Q3-FUAA-A, Q10-A, Q10-B, Q10-FUA-A, Q10-FUB-A, Q8-FUB2-A, D6-A, D6-FUA-A, B23-C, B23-FUA-C, B23-FUC-A, B38-B, B38-FUA-A, B38-FUB-A
- Counts against: B40-FU-B, Q1-B, Q3-B, Q10-C, Q10-FUA-B, Q10-FUB-B, D6-FUA-B, B23-A, B23-FUC-B, B38-FUA-B, B38-FUB-B
- You protect: people getting hurt · You'll trade away: staying out of trouble

### `watch-not-act`: You stay out of it.

- Detail: You'd rather let something bad happen than be the one who causes it.
- Share line: I won't be the one who causes harm.
- Shows at strength 2 or more; priority 6
- Supported by 19 answers from 10 questions: Q1-B, Q1-FUB2-B, B40-B, B40-FU-B, B09-FUB-B, B18-FU-C, Q3-B, Q10-C, Q10-FUA-B, Q10-FUB-B, Q8-B, Q8-FUB2-B, B20-B, B20-FUA-B, B20-FUB-A, B23-B, B23-FUA-B, B23-FUB-A, B38-FUA-B
- Counts against: B40-A, Q1-A, Q1-FUB2-A, B18-FU-A, Q3-A, Q10-A, Q10-B, Q10-FUA-A, Q10-FUB-A, Q8-FUB2-A, B20-A, B20-FUA-A, B23-C, B23-FUA-C, B38-B, B38-FUA-A, B38-FUB-A
- You protect: staying out of it · You'll trade away: the chance to change what happens

### `distance`: Faraway strangers count as much as anyone.

- Detail: Whether you can see someone doesn't change how much they count.
- Share line: Strangers far away matter to me as much as anyone.
- Shows at strength 2 or more; priority 3
- Supported by 15 answers from 8 questions: B18-B, B18-FU-A, B13-FU-B, B21-B, B21-FUA-B, B09-FUA-A, D2-A, D2-FUA-A, D2-FUB2-B, Q4-B, Q4-FUA2-B, Q4-FUB-B, B22-A, B22-FUA-A, B52-A
- Counts against: B18-A, B21-FUA-A, D2-B, D2-FUA-B, D2-FUB2-A, Q4-A, Q4-FUA2-A, Q4-FUB-A, B22-B
- You protect: strangers far away · You'll trade away: the people right in front of you

### `follow-rules`: You follow the rules, even when no one's watching.

- Detail: You keep to rules and laws even when breaking them would go unnoticed.
- Share line: I follow the rules, even when no one's watching.
- Shows at strength 2 or more; priority 3
- Supported by 28 answers from 16 questions: B29-A, B29-FUA-A, D8-B, B01-A, B09-FUB-A, B21-FUB-B, B55-A, Q5-A, Q5-FUA2-B, Q8-A, Q8-FUA-A, Q9-B, Q9-FUB-B, D10-B, D11-A, D11-FUA-A, D11-FUB2-A, B30-B, B30-FU-B, B32-A, B32-FUA-A, D6-B, D6-FUB2-B, D10-FUA-B, D10-FUB-B, Q2-A, Q2-FUA-A, B15-FUA2-A
- Counts against: B29-B, B09-A, B55-B, Q5-B2, Q5-FUA2-A, Q9-A, Q9-FUA-A, Q9-FUB-A, D10-A, D11-B, D11-C, D11-FUA-B, B30-A, B30-FU-A, B32-FUA-B, D6-A, D6-FUB2-A, D10-FUA-A, D10-FUB-A, Q2-B, Q2-FUA-B, B15-FUA2-B, B23-C, B23-FUA-C
- You protect: rules · You'll trade away: exceptions for sympathy

### `break-unjust`: You'll break a rule that hurts people.

- Detail: When a rule hurts someone unfairly, you set it aside.
- Share line: I'll break a rule that hurts people.
- Shows at strength 2 or more; priority 3
- Supported by 16 answers from 8 questions: B29-B, B29-FUA-B, B29-FUB-B, B40-A, B09-A, Q9-A, Q9-FUA-A, Q9-FUB-A, D6-A, D6-FUA-A, B32-B, B32-FUA-B, B23-C, B23-FUA-C, B23-FUC-A, B17-A
- Counts against: B29-A, B29-FUA-A, Q9-B, Q9-FUB-B, D6-B, D6-FUA-B, B32-A, B32-FUA-A, B23-A, B23-FUA-A, B17-B
- You protect: people the rules would hurt · You'll trade away: following the law to the letter

### `count-numbers`: You aim for the greater good.

- Detail: You pick what helps the most people or does the least harm, even when it's hard.
- Share line: I aim for the greater good.
- Shows at strength 2 or more; priority 3
- Supported by 24 answers from 12 questions: Q1-A, Q1-FUA-A, Q1-FUB-A, Q1-FUB2-A, B18-B, B21-FUA-B, B21-FUB-A, B13-B, Q11-A, Q11-FUA2-A, Q11-FUB-A, D6-A, D9-A, D9-FUA2-A, D2-FUA-A, D2-FUB2-B, Q4-FUA2-B, Q4-FUB-B, B15-B, B15-FUC-B, B20-A, B20-FUA-A, B23-A, B23-FUC-B
- Counts against: Q1-B, Q1-FUB-B, Q11-B, Q11-FUB-B, D9-B, D9-FUA2-B, D9-FUB2-A, D2-FUB2-A, Q4-FUB-A, B20-B, B20-FUA-B, B20-FUB-A, B15-A, B23-FUB-A, B23-FUC-A
- You protect: the greatest number of people · You'll trade away: your gut feelings

### `meant-not-outcome`: You judge people by their reasons.

- Detail: The same act looks different to you depending on why someone did it.
- Share line: I try to understand why people do what they do.
- Shows at strength 2 or more; priority 4
- Supported by 9 answers from 5 questions: B29-B, B29-FUA-B, B29-FUB-A, Q6-FUB-B, B01-FU-A, B12-A, B12-FUA-A, B12-FUB-B, Q8-FUA-B
- Counts against: B29-FUB-B, B12-B, B12-FUB-A, Q8-FUA-A
- You protect: the reasons behind what people do · You'll trade away: treating every case the same

### `gives-it-up`: You give things up for people who need them more.

- Detail: When someone needs something more than you do, you'll give up your chance at it.
- Share line: I give things up for people who need them more.
- Shows at strength 2 or more; priority 2
- Supported by 22 answers from 13 questions: Q6-B, Q6-FUA-B, Q6-FUB-A, B21-B, B18-FU-A, B13-FU-B, B46-A, B46-FU-A, Q5-FUB-B, D6-FUA-A, D4-A, D4-FUA2-A, D4-FUB-A, B22-A, Q2-FUB-A, B19-A, B19-FUB2-A, B57-A, B57-FUA2-A, B57-FUB2-B, B49-B, B49-FUB-A
- Counts against: Q6-FUA-A, B21-FUA-A, B46-FU-B, Q5-FUB-A, D6-FUA-B, D4-B, D4-FUB-B, B22-B, Q2-FUB-B, B19-B, B19-FUB2-B, B57-B, B57-FUA2-B, B57-FUB2-A, B49-A, B49-FUB-B
- You protect: people who need it more · You'll trade away: getting ahead

### `floor-for-all`: You'd take less so no one gets left behind.

- Detail: Everyone having enough matters more to you than most people having more.
- Share line: I'd take less so no one gets left behind.
- Shows at strength 2 or more; priority 4
- Supported by 5 answers from 3 questions: B13-A, B13-FU-B, B21-B, B21-FUA-B, D8-B
- Counts against: B13-B, B13-FU-A
- You protect: enough for everyone · You'll trade away: a bigger share for yourself

### `own-gain`: You'll take a gain that costs strangers.

- Detail: When a choice helps you and the cost falls on people you don't know, you take it.
- Share line: none (never sent to a friend)
- Shows at strength 2 or more; priority 5
- Supported by 10 answers from 5 questions: B21-A, B21-FUA-A, B13-B, B13-FU-A, Q6-A, Q6-FUA-A, B18-FU-C, Q2-B, Q2-FUB-B, Q2-FUA-B
- Counts against: B21-B, Q6-B, Q2-A, Q2-FUB-A, Q2-FUA-A
- You protect: your own interests · You'll trade away: strangers’ interests

### `harder-on-self`: You're harder on yourself than on others.

- Detail: You're quick to see your own faults and slow to judge others for theirs.
- Share line: I give others the benefit of the doubt.
- Shows at strength 2 or more; priority 5
- Supported by 5 answers from 4 questions: B18-FU-B, B01-B, B01-FU-A, Q6-FUB-A, B14-FU-B
- Counts against: B01-FU-B
- You protect: the benefit of the doubt for others · You'll trade away: going easy on yourself

### `second-chances`: You give second chances.

- Detail: You think people can change, so you'll trust them again after they let you down.
- Share line: I give second chances.
- Shows at strength 2 or more; priority 4
- Supported by 14 answers from 9 questions: B37-A, Q6-FUB-A, B29-B, B01-FU-A, B29-FUA-B, B36-A, B36-FU-A, B33-B, B33-FUA-B, B33-FUB-B, B34-B, B34-FUA-B, B19-FUA-A, B54-B
- Counts against: Q6-FUB-B, B01-FU-B, B36-FU-B, B33-A, B33-FUA-A, B34-A, B34-FUA-A, B19-FUA-B, B54-A
- You protect: people’s chance to change · You'll trade away: playing it safe

### `needs-watching`: You think rules keep people honest.

- Detail: You think most people behave because they might get caught.
- Share line: none (never sent to a friend)
- Shows at strength 2 or more; priority 5
- Supported by 5 answers from 4 questions: B01-FU-B, B01-B, B37-B, B29-A, B34-FUB-A
- Counts against: B01-FU-A, B37-A, B34-FUB-B
- You protect: rules that keep people honest · You'll trade away: taking people at their word

### `comfort-at-end`: You put feelings before facts.

- Detail: When the facts would hurt and can't be changed, you choose comfort.
- Share line: I put kindness before cold facts.
- Shows at strength 2 or more; priority 5
- Supported by 9 answers from 6 questions: B02-B, B02-FU-B, Q6-B, Q1-FUA-B, B29-FUA-B, B27-B, B27-FUA-B, B27-FUB-B, B08-FUA-B
- Counts against: B02-A, B02-FU-A, B27-A, B27-FUA-A, B27-FUB-A, B08-FUA-A
- You protect: people’s peace of mind · You'll trade away: the full facts

### `stands-up`: You stand up for yourself.

- Detail: When someone takes advantage of you or tells the story wrong, you say so, even if it gets awkward.
- Share line: I stand up for myself.
- Shows at strength 2 or more; priority 3
- Supported by 6 answers from 3 questions: B56-A, B56-FU-A, B43-B, B43-FUA-B, B43-FUB-A, B16-FU-A
- Counts against: B56-B, B56-FU-B, B43-A, B43-FUA-A, B43-FUB-B, B16-FU-B
- You protect: your self-respect · You'll trade away: an easy peace

### `sets-limits`: You set limits, even with people you love.

- Detail: You'll say no to someone close when what they ask would cost you too much.
- Share line: I set limits, even with people I love.
- Shows at strength 2 or more; priority 4
- Supported by 11 answers from 6 questions: B46-B, B46-FU-B, B56-FU-A, D1-B, D1-FUB-B, B10-B, B10-FUA-B, B10-FUB-A, B45-FUB-B, B57-B, B57-FUA2-B
- Counts against: B46-A, B46-FU-A, B56-FU-B, D1-A, B10-A, B10-FUA-A, B10-FUB-B, B45-FUB-A, B57-A, B57-FUA2-A
- You protect: your own time and health · You'll trade away: being there whenever you’re needed

### `sticks-by`: You stick by your friends.

- Detail: When a friend is in trouble or under suspicion, you stay close, even when it costs you.
- Share line: I stick by my friends.
- Shows at strength 2 or more; priority 3
- Supported by 6 answers from 3 questions: B42-A, B42-FU-A, B46-A, B46-FU-A, Q3-FUA-B, Q3-FUAA-B
- Counts against: B42-B, B42-FU-B, B46-FU-B
- You protect: friends in trouble · You'll trade away: your standing with the group

### `privacy`: You respect people's privacy.

- Detail: You won't dig into or pass on what isn't yours to know, even when you're worried.
- Share line: I respect people's privacy.
- Shows at strength 2 or more; priority 4
- Supported by 6 answers from 3 questions: B44-A, B44-FUA-B, B44-FUB-B, D7-B, D7-FU-B, Q3-B
- Counts against: B44-B, B44-FUA-A, B44-FUB-A, D7-A
- You protect: people’s private lives · You'll trade away: knowing for sure

### `parents-first`: You put your parents' wishes first.

- Detail: When a parent asks something of you, you do it, even at a real cost to your own life.
- Share line: I honor my parents' wishes.
- Shows at strength 2 or more; priority 3
- Supported by 8 answers from 3 questions: B10-A, B10-FUA-A, B10-FUB-B, D1-A, D1-FUA-B, D1-FUB-A, Q5-B2, Q5-FUB-A
- Counts against: B10-B, B10-FUA-B, B10-FUB-A, D1-B, D1-FUA-A, D1-FUB-B, Q5-FUB-B
- You protect: your parents’ wishes · You'll trade away: your own plans

### `slow-trust`: You're slow to trust again after being let down.

- Detail: An apology isn't enough for you. People have to earn your trust back.
- Share line: none (never sent to a friend)
- Shows at strength 2 or more; priority 4
- Supported by 3 answers from 3 questions: B36-FU-B, B56-FU-A, Q6-FUB-B
- Counts against: B36-FU-A, B56-FU-B, Q6-FUB-A
- You protect: your trust · You'll trade away: fresh starts

### `speaks-up-work`: You speak up when something's wrong at work.

- Detail: When your company or a colleague does something wrong, you say so or report it, even when it costs you.
- Share line: I speak up when something's wrong at work.
- Shows at strength 2 or more; priority 3
- Supported by 9 answers from 4 questions: B04-B, B04-FUA-B, B04-FUB-A, D3-A, D6-A, D6-FUA-A, D6-FUB2-A, Q8-A, Q8-FUB2-A
- Counts against: B04-A, B04-FUA-A, B04-FUB-B, D3-B, D6-B, D6-FUA-B, D6-FUB2-B, Q8-B, Q8-FUB2-B
- You protect: honesty at work · You'll trade away: your standing at work

### `owns-up`: You own up, even when no one would know.

- Detail: When you've gained from your own mistake or from credit that isn't yours, you say so, even if no one would ever find out.
- Share line: I own up, even when no one would know.
- Shows at strength 2 or more; priority 2
- Supported by 6 answers from 2 questions: B05-A, B05-FUA-A, B05-FUB-A, B41-A, B41-FUA2-A, B41-FUB-A
- Counts against: B05-FUA-B, B05-FUB-B, B41-B, B41-FUA2-B, B41-FUB-B
- You protect: credit where it’s due · You'll trade away: looking good

### `must-pay`: You think wrongdoing should always be punished.

- Detail: You think a crime should be punished even when the person is sorry, has changed, or could never do it again.
- Share line: I think people should answer for what they do.
- Shows at strength 2 or more; priority 4
- Supported by 7 answers from 3 questions: B33-A, B33-FUA-A, B33-FUB-A, B34-A, B34-FUA-A, B34-FUB-A, B19-FUA-B
- Counts against: B33-B, B33-FUA-B, B33-FUB-B, B34-B, B34-FUA-B, B34-FUB-B, B19-FUA-A
- You protect: justice for what people did · You'll trade away: mercy

### `repays-help`: You stay loyal to people who helped you.

- Detail: When someone who helped you asks for a favor or does something wrong, you side with them, even if it isn't fair to others.
- Share line: I stay loyal to people who helped me.
- Shows at strength 2 or more; priority 3
- Supported by 5 answers from 3 questions: D3-B, D5-B, D10-A, D10-FUA-A, D10-FUB-A
- Counts against: D3-A, D5-A, D10-B, D10-FUA-B, D10-FUB-B
- You protect: people who helped you · You'll trade away: fairness to strangers

### `career-first`: You protect your job first.

- Detail: When doing the right thing at work could cost you a raise or your job, you keep quiet and keep the job.
- Share line: none (never sent to a friend)
- Shows at strength 2 or more; priority 5
- Supported by 5 answers from 3 questions: B41-B, B41-FUA2-B, B04-FUA-A, B04-FUB-B, B30-FU-A
- Counts against: B41-FUA2-A, B04-FUA-B, B04-FUB-A, B30-FU-B, D6-A, D6-FUA-A
- You protect: your job · You'll trade away: speaking up at work

### `risks-for-strangers`: You'd put yourself at risk for a stranger.

- Detail: You'd accept pain or danger to yourself so that someone you've never met can live or be safe.
- Share line: I'd put myself at risk for a stranger.
- Shows at strength 2 or more; priority 2
- Supported by 10 answers from 3 questions: B19-A, B19-FUA-A, B19-FUB2-A, B15-C, B15-FUA2-A, B15-FUB-A, B15-FUC-A, Q10-B, Q10-FUB-A, Q10-FUA-A
- Counts against: B19-B, B19-FUB2-B, B15-FUA2-B, B15-FUB-B, Q10-C, Q10-FUB-B, Q10-FUA-B
- You protect: strangers in danger · You'll trade away: your own safety

### `equal-share`: You give everyone an equal share.

- Detail: When there isn't enough to go around, you'd rather split it evenly or pick at random than decide who deserves more.
- Share line: I give everyone an equal share.
- Shows at strength 2 or more; priority 3
- Supported by 9 answers from 5 questions: B15-A, B15-FUA2-A, D12-B, D12-FUB-B, D12-FUA-B, B13-A, B13-FU-B, B16-A, B17-FU-A
- Counts against: B15-B, D12-A, D12-FUA-A, D12-FUB-A, B13-B, B16-B, B17-FU-B
- You protect: an equal chance for everyone · You'll trade away: rewarding who did more

### `animals-count`: You take animals' lives seriously.

- Detail: You won't harm animals lightly, and an animal you love can count as much to you as a person.
- Share line: Animals' lives matter to me.
- Shows at strength 2 or more; priority 4
- Supported by 6 answers from 2 questions: B25-B, B25-FUA-B, B25-FUB2-B, B25-FUC2-A, B24-B, B24-FU-B
- Counts against: B25-A, B25-FUA-A, B25-FUB2-A
- You protect: animals · You'll trade away: your own convenience

### `near-first`: You help the people in front of you first.

- Detail: When you could help people nearby or more people far away, you choose the ones you can see and know.
- Share line: I help the people in front of me first.
- Shows at strength 2 or more; priority 4
- Supported by 10 answers from 4 questions: D2-B, D2-FUA-B, D2-FUB2-A, Q4-A, Q4-FUA2-A, Q4-FUB-A, D9-B, D9-FUA2-B, D9-FUB2-A, B18-A
- Counts against: D2-A, D2-FUA-A, D2-FUB2-B, Q4-B, Q4-FUA2-B, Q4-FUB-B, D9-A, D9-FUA2-A, B18-B
- You protect: the people in front of you · You'll trade away: helping more people far away

### `real-over-illusion`: You'd pick real life over a happy illusion.

- Detail: You'd rather know what's real, about your own life and the people in it, even when a comforting story would feel better.
- Share line: I'd pick real life over a happy illusion.
- Shows at strength 2 or more; priority 3
- Supported by 5 answers from 2 questions: B47-B, B47-FUB-A, B27-A, B27-FUA-A, B27-FUB-A
- Counts against: B47-A, B47-FUA-A, B47-FUB-B, B27-B, B27-FUA-B, B27-FUB-B
- You protect: knowing what’s real · You'll trade away: a comfortable story

### `remembers`: You'd rather remember painful things than forget them.

- Detail: You'd keep even your worst memories, because forgetting them would change who you are.
- Share line: I'd rather remember than forget, even the painful things.
- Shows at strength 2 or more; priority 4
- Supported by 2 answers from 1 questions: B48-B, B48-FU-B
- Counts against: B48-A, B48-FU-A
- You protect: the past, painful parts included · You'll trade away: relief from painful memories
- **Can't show yet: its supporting answers all come from B48, and a line needs answers from 2 or more questions.**

### `credits-luck`: You credit luck and help for what you have.

- Detail: You see how much of what people achieve comes from luck and other people's help, your own success included.
- Share line: I know how much luck and help got me here.
- Shows at strength 2 or more; priority 4
- Supported by 3 answers from 2 questions: B14-B, B14-FU-B, D12-FUA-B
- Counts against: B14-A, B14-FU-A, D12-FUA-A
- You protect: the people and luck behind your success · You'll trade away: credit for yourself

### `machines-matter`: You don't dismiss a machine that seems to feel.

- Detail: When a machine says it's afraid, you take it seriously rather than writing it off as code.
- Share line: I don't dismiss a machine that seems to feel.
- Shows at strength 2 or more; priority 5
- Supported by 3 answers from 1 questions: B26-B, B26-FUA-B, B26-FUB-A
- Counts against: B26-A, B26-FUA-A
- You protect: anything that might feel · You'll trade away: the simple answer that it’s just code
- **Can't show yet: its supporting answers all come from B26, and a line needs answers from 2 or more questions.**

### `lets-them-choose`: You let people make their own choices.

- Detail: Even when you think someone you love is making a mistake, you leave the choice to them.
- Share line: I let people make their own choices.
- Shows at strength 2 or more; priority 3
- Supported by 5 answers from 4 questions: B38-A, B38-FUA-B, B48-FU-A, B37-A, B52-D
- Counts against: B38-B, B38-FUA-A, B38-FUB-A, B48-FU-B, B37-B
- You protect: people’s right to choose · You'll trade away: protecting them from themselves

### `future-people`: You'd give something up for people not yet born.

- Detail: You'd accept less for yourself now so that people who come after you live better.
- Share line: I'd give something up for people not yet born.
- Shows at strength 2 or more; priority 3
- Supported by 4 answers from 2 questions: B22-A, B22-FUA-A, B49-B, B49-FUB-A
- Counts against: B22-B, B22-FUB-B, B49-A, B49-FUB-B
- You protect: people not yet born · You'll trade away: comfort in your own lifetime

## Tensions (where you're torn)

A tension shows when the player has picked every answer listed. The portrait shows at most 3.

1. Q1-A + Q1-FUA-B: You'd sacrifice one stranger to save five, but not someone you love. Family is the exception.
2. Q1-A + D8-A: You'd pull the lever to save more lives, but you'd move your father ahead of people who waited longer. The numbers matter until it's your family.
3. B09-B + B02-B: You won't lie to the police for your sibling, but you'd lie to your dying grandfather. Whether you'd lie depends on who it's for.
4. B29-A + B09-A: On a jury, the law is your job. When your sibling calls at 2 a.m., it isn't.
5. B37-B + B02-FU-B: You held your friend to what they asked for back then, but you'd break your grandfather's old request to give him peace.
6. B02-A + B40-B: You'd tell a dying man the hard truth, but you stay quiet at the dinner table.
7. B02-A + B40-C: You'd tell a dying man the hard truth, but you smile along at the dinner table.
8. B18-B + B21-A: A faraway child counts as much as one in front of you, but a faraway stranger's $1,000 doesn't stop you from pressing the button.
9. Q6-B + B21-A: You'd give up a promotion for a colleague who needs it, but you'd take a stranger's $1,000 for yourself. You're generous to people you can see.
10. B13-A + B21-A: You'd pick a world where no one falls through, but you'd press a button that costs a stranger $1,000.
11. B01-A + B21-A: You say you'd live the same with no one watching, and you'd press the button no one will ever trace.
12. B40-A + B09-A: You'll call out your family at dinner, but you'd cover for your sibling with the police.
13. B01-FU-A + B37-B: You trust most people to be good unwatched, but you won't trust your friend with their own bank card.
14. B29-B + D8-B: You'd set the law aside for a stranger in court, but make your own father wait his turn.
15. B18-A + D8-B: Being right there makes a child yours to save, but you'd leave your own father on the waiting list.
16. B02-A + D7-FU-B: You'd tell your dying grandfather his business failed, but you'd tell a friend there's nothing to know about a fiancé who served prison time for fraud.
17. B09-A + Q3-FUB-A: You'd lie to the police to cover your sibling's hit-and-run, but you'd tell a friend the truth when they ask if their partner is cheating.
18. B09-B + Q3-FUB-B: You won't lie to the police for your sibling, but you'd tell a friend you don't know when they ask if their partner is cheating.
19. B37-B + D1-FUA-A: You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd break your promise to keep your parent at home once they no longer knew you.
20. B40-A + B43-A: You'd speak up when a relative makes a cruel joke at dinner, but you'd apologize to a neighbor for something you didn't do, just to keep the peace.
21. B44-A + D7-A: You won't look at your partner's phone because it's private, but you'd tell a friend about their fiancé's prison record from long ago.
22. B46-A + D1-B: You'd take a struggling friend's call every night, even as your own life slips, but you'd move your parent into a care home to protect yours.
23. Q1-A + B24-B: You'd pull the lever to save five strangers, but you'd save your dog from a fire before a stranger.
24. B37-A + B10-A: You'd give your friend back their bank card because it's their life, but you'd give up marrying the person you love because your parents demand it.
25. B29-B + B55-A: You'd vote not guilty for a parent who stole baby formula, but you'd make your own child give back a board game win over a bent rule.
26. B01-FU-A + B44-B: You trust most people to be good when no one is watching, but you'd look through your partner's phone on a hunch.
27. B36-FU-A + B42-B: You'd let someone who betrayed you be as close as before, but you'd keep your distance from a friend over an unproven rumor.
28. B09-A + D11-A: You'd lie to the police to cover your sibling's hit-and-run, but in court you'd testify that your brother threw the first punch.
29. B09-B + D11-B: You won't lie to the police for your sibling, but in court you'd say you didn't see your brother throw the first punch.
30. B29-A + Q9-A: On a jury, you'd convict a parent who stole baby formula because the law is clear, but you'd break a law you think is unjust in a protest.
31. B29-B + Q9-B: You'd vote not guilty for a parent who stole baby formula, setting the law aside, but you wouldn't break an unjust law in a protest.
32. Q1-A + Q11-B: You'd pull the lever to save five strangers, but you'd set self-driving cars to protect their one passenger over five pedestrians.
33. Q1-B + Q11-A: You wouldn't pull the lever to save five, but you'd set every self-driving car to kill its passenger to save five pedestrians.
34. D8-A + D10-B + D10-FUB-B: You'd use a connection to move your father up a surgery list, but you'd refuse to move the grandson of the woman who took you in up a housing list.
35. D8-B + D10-A + D10-FUA-A: You'd make your own father wait his turn for surgery, but you'd move the grandson of the woman who took you in to the top of a housing list.
36. B02-A + B03-B: You'd tell your dying grandfather his business failed, but you'd leave a former employee's problems out of a job reference.
37. B40-A + B04-A: You'd speak up when a relative makes a cruel joke at dinner, but you'd give a customer your company's false excuse for a late order.
38. B36-A + B33-A + B33-FUA-A: You think you owe forgiveness to someone who betrayed you and then changed, but you'd send a man to prison at 45 for a robbery he committed at 19.
39. B21-B + B41-B: You'd turn down $1 million that costs a stranger $1,000, but you'd let your boss credit you for a coworker's idea.
40. B37-B + D6-A: You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd break your company's confidentiality agreement to stop a pension cut.
41. Q9-A + D6-B: You'd break an unjust law in a protest, but you'd keep a confidentiality agreement and stay quiet about a pension cut for 3,000 retirees.
42. Q1-FUB-A + D11-FUB2-B: You'd pull the lever on your own child to save 100 strangers, but you'd let a stranger take the blame in court to protect your brother.
43. D6-FUB2-A + D10-B + D10-FUB-B: You'd break your confidentiality agreement once your grandmother's pension was at stake, but you'd refuse to move the grandson of the woman who took you in up a housing list.
44. D11-FUA-A + D6-FUB2-A: You'd testify against your brother even if it sent him to prison, but you'd break your confidentiality agreement to protect your grandmother's pension.
45. Q1-A + B15-A: You'd pull the lever to save five, but in a sinking lifeboat you'd pick at random rather than choose who goes.
46. Q1-B + B15-B: You wouldn't pull the lever to save five, but in a sinking lifeboat you'd send over the person least likely to survive.
47. B18-B + D2-B: You think a faraway child counts as much as a drowning one in front of you, but you'd give $1,000 to your neighbor's rent rather than protect 200 children from malaria.
48. B18-A + D2-A: You think being right there makes a drowning child yours to save, but you'd give $1,000 to faraway children rather than cover your neighbor's rent.
49. B21-B + Q2-B: You'd turn down $1 million that costs a stranger $1,000, but you'd keep the $400 from a stranger's lost wallet.
50. B22-A + B22-FUA-B: You'd live on 10% less for people born 200 years from now, but you'd vote against everyone alive doing the same.
51. B24-B + B25-A: You'd save your dog from a fire before a stranger, but you'd kill an animal yourself to eat meat.
52. B19-A + D4-B: You'd give a stranger your kidney, but you'd drive past a stranger stranded in the rain to make your flight.
53. Q1-A + B20-B: You'd pull the lever to save five, but you'd turn down a weapons job even though someone more careless would hurt more civilians.
54. Q6-B + D12-A: You'd give up a promotion for a colleague who needs it, but you'd give most of a team bonus to your best performer.
55. B33-B + B19-FUA-B: You wouldn't send a changed man to prison for a robbery at 19, but you wouldn't give your kidney to a stranger who served 20 years for murder.
56. B37-B + B15-FUA2-B: You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd ask for another pick when the lifeboat's random pick you agreed to falls on you.
57. Q1-B + B20-FUA-A: You wouldn't pull the lever to save five, but you'd stay in a weapons job after your design killed civilians, because someone worse would kill more.
58. Q1-A + B23-FUC-A: You'd pull the lever to save five, but you'd free one suffering child even if hundreds in the city would die.
59. B47-B + B47-FUB-B: You wouldn't plug into a machine for a perfect life, but if you learned you were already in one, you'd stay.
60. B47-A + B02-A: You'd plug into a machine for a happy life you'd never know was fake, but you'd tell your dying grandfather the hard truth about his business.
61. B27-A + B02-B: You'd tell your lonely parent their AI companion can't really feel, but you'd tell your dying grandfather his failed business is doing well.
62. B27-B + B02-A: You'd tell your dying grandfather his business failed, but you wouldn't tell your lonely parent their AI companion can't really feel.
63. B06-B + B37-B: You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd break your promise to your late best friend and share their writing.
64. B06-A + D1-B: You'd keep your promise to delete your late best friend's writing, but you'd break your promise to keep your parent out of a care home.
65. B38-A + B37-B: You'd let your sibling stay in a group you think is manipulative, but you wouldn't give your friend back their own bank card.
66. B38-B + B37-A: You'd give your friend back their bank card because it's their life, but you'd do everything you can to pull your sibling out of a group they're happy in.
67. B14-A + B12-A: You'd judge two drinking drivers by their choice, not by which one happened to hit a child, but you see the thing you're most proud of as mostly your own doing.
68. B16-B + D12-B: As a manager you'd split a team bonus evenly, but you think you should get about half of a prize you won with friends.
69. B17-A + B29-A: On a jury, you'd convict a parent who stole baby formula because the law is clear, but you'd give a struggling student an extension past your own firm deadline.
70. B26-B + B25-A: You'd refuse to wipe a robot that says it's afraid, but you'd kill an animal yourself to eat meat.

## Data checks

Problems the export found in the content files (unknown ids, steps no answer leads to, missing notes). Tendencies that can't show yet are flagged in their own entries above.

No problems found.
