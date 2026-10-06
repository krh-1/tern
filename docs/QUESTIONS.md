# Questions: Tern (Ethics)

> **Generated file. Do not edit by hand.** `scripts/export-questions.mjs` writes it from the game's content files. To change a question, change it in `game/content*.js`, then run `npm run export:questions`. Question wording, nudges and follow-up rules are the assessment instrument: change them only with Ken's say-so (AGENTS.md, "questions.js Is the Assessment Instrument").

This is every question in the game: 75 questions across 5 worlds, 365 answers, 42 portrait lines (tendencies) and 70 tensions. How the answers are scored is in `docs/SCORING.md`. Candidate questions that aren't in the game are in `docs/QUESTION-BANK.md`.

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
- Any combination with other answers has a coherent explanation in the axis model. Apparent inconsistency is information, never an error.
- The setup line states the facts that close off imagined variants (time pressure, other options, who is involved), so everyone answers the same situation. (This replaced the old "assumptions" block.)
- Identity-neutral by default: no gender or race cues unless the cue is what the question tests.
- Answerable honestly from anywhere on the political spectrum. The tone is curious, never accusing.
- Every answer has a `note` and a `did` line. A `did` line names its subject in full and never says "it", "that" or "the one" to point back at the question.
- Portrait lines (tendencies) make sense to a stranger who sees them on their own, in plain words. Each needs a `share` line, or a deliberate decision to leave it out.

## The five axes

The code is one letter per axis, in this order. A tie goes to the first letter.

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
| Outcomes / Rules | 8 (28) | 6 (24.5) | 15 (47.5) | 11 (51) | 12 (39.5) | 52 (190.5) |
| Collective / Individual | 8 (33.5) | 9 (26) | 14 (43.5) | 9 (41.5) | 13 (36.5) | 53 (181) |
| Heart / Thought | 9 (37) | 11 (36) | 12 (36) | 9 (41.5) | 12 (34.5) | 53 (185) |
| Loyalty / Principle | 6 (24.5) | 7 (29) | 11 (37) | 7 (27.5) | 11 (26) | 42 (144) |
| System / Disruption | 5 (23.5) | 3 (9) | 13 (52.5) | 3 (14) | 5 (9) | 29 (108) |

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

Scene `trolley` · heavy · Most signal: OR 9 · HT 6 · LP 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Six strangers. No third option. Three seconds to act.

*Question:* A runaway trolley is heading toward 5 people. You can pull a lever that diverts it to a side track where 1 person will die. What do you do?

- **Q1-A:** Pull the lever
  - Nudges: OR +3 (Outcomes)
  - Note: You'd rather cause one death than stand by for five. For you, doing nothing is still a choice.
  - Did: You'd pull the lever to save five, knowing one will die.
- **Q1-B:** Do not pull. I won't directly cause a death.
  - Nudges: OR -3 (Rules)
  - Note: There's a line you won't cross with your own hands, even when the numbers say you should.
  - Did: You wouldn't pull the lever, even to save five.

**Follow-up `fuA`** (step weight 1.5). Shown after any first answer.

*Setup:* The five are still strangers. Nothing else changes.

*Question:* What if the 1 person on the side track is your mother?

- **Q1-FUA-A:** Pull anyway
  - Nudges: OR +2 (Outcomes), LP -2 (Principle), HT -2 (Thought)
  - Note: You'd give up your own mother to save five strangers. Her life counts the same as anyone's.
  - Did: You'd pull the lever even if the person on the side track were your mother.
- **Q1-FUA-B:** I can't do it. Not her.
  - Nudges: HT +3 (Heart), LP +2 (Loyalty)
  - Note: You'd trade one stranger to save five, but not your mother.
  - Did: You wouldn't pull the lever if the person on the side track were your mother.

**Follow-up `fuB`** (step weight 2). Shown after Q1-A (Pull the lever), then Q1-FUA-B (I can't do it. Not her).

*Setup:* A hundred strangers. Your child alone on the side track.

*Question:* What if the 1 person on the side track is your child, and pulling now would save 100 strangers?

- **Q1-FUB-A:** Pull. 100 lives outweigh one.
  - Nudges: OR +3 (Outcomes), LP -3 (Principle)
  - Note: You wouldn't give up your mother to save five, but you would give up your child to save 100. Your loyalty to family has a limit.
  - Did: You'd pull the lever to save 100 strangers, even with your child on the side track.
- **Q1-FUB-B:** Do not pull. I won't choose my child's death.
  - Nudges: HT +3 (Heart), LP +3 (Loyalty)
  - Note: No number of strangers would make you give up your child.
  - Did: You wouldn't pull the lever with your child on the side track, even to save 100 strangers.

### B09: The 2 A.M. Call

Scene `call` · heavy · Most signal: CI 1.5 · HT 1.5 · LP 7.5 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your sibling fled a crash. The cyclist will recover. No leads.

*Question:* At 2 a.m., your sibling calls: they hit a cyclist and drove off in a panic. The cyclist will recover, and the police have no leads. Your sibling asks you to say they were with you tonight. Do you say they were with you?

- **B09-A:** Yes. I cover for them.
  - Nudges: LP +3 (Loyalty), SD -2 (Disruption)
  - Note: You'd lie to the police for family. Your sibling comes before the law.
  - Did: You'd lie to the police to cover your sibling's hit-and-run.
- **B09-B:** No. I won't lie for them.
  - Nudges: LP -2 (Principle), SD +2 (System)
  - Note: You love them, but you won't lie to the police for them.
  - Did: You wouldn't lie to the police about your sibling's hit-and-run.

**Follow-up `fuA`** (step weight 1.5). Shown after B09-A (Yes. I cover for them).

*Setup:* A week later. Someone else is paying for it.

*Question:* A week later, police arrest a different person for it. That person is innocent.

- **B09-FUA-A:** I tell the police the truth.
  - Nudges: LP -2 (Principle), SD +2 (System), CI +1 (Collective)
  - Note: You'll shield your sibling, but not at a stranger's expense. Your loyalty stops where someone innocent pays.
  - Did: You'd tell the police the truth once an innocent person was arrested for your sibling's crash.
- **B09-FUA-B:** I stay quiet.
  - Nudges: LP +3 (Loyalty), SD -2 (Disruption), CI -1 (Individual)
  - Note: Even with an innocent person arrested, you protect your sibling. Your loyalty to them has almost no limit.
  - Did: You'd stay quiet even after an innocent person was arrested for your sibling's crash.

**Follow-up `fuB`** (step weight 1.5). Shown after B09-B (No. I won't lie for them).

*Setup:* No one comes asking. Speaking up is up to you.

*Question:* The police never ask you. Do you tell them what you know?

- **B09-FUB-A:** Yes. I report my sibling.
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: You don't just refuse to lie; you go to the police yourself. For you, what happened matters more than who did it.
  - Did: You'd report your sibling without being asked.
- **B09-FUB-B:** No. I just won't lie for them.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: You wouldn't lie for your sibling, but you wouldn't turn them in either.
  - Did: You wouldn't lie for your sibling or report them.

### B02: The Deathbed Question

Scene `deathbed` · heavy · Most signal: OR 6.5 · HT 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Hours left. The business failed last year. He asks directly.

*Question:* Your grandfather has hours to live. The family business he spent his life building went bankrupt last year. He grips your hand: "Tell me the truth. Is it doing well?" What do you say?

- **B02-A:** The truth, as gently as I can.
  - Nudges: OR -2 (Rules), HT -2 (Thought)
  - Note: He asked for the truth, so he gets it, even now. You think people have a right to the truth about their own lives.
  - Did: You'd tell your dying grandfather his business failed.
- **B02-B:** "Yes, it's doing well."
  - Nudges: OR +2 (Outcomes), HT +3 (Heart)
  - Note: You'd give a dying man peace over facts he can't change.
  - Did: You'd tell your dying grandfather his failed business is doing well.

**Follow-up `fu`** (step weight 1.5). Shown after B02-B ("Yes, it's doing well.").

*Setup:* He once asked you never to lie to him.

*Question:* Years ago he told you, "Whatever happens, never lie to me. Not even at the end." Does that change your answer?

- **B02-FU-A:** Yes. I tell him the truth.
  - Nudges: OR -3 (Rules), HT -1 (Thought)
  - Note: You'd bend the truth for his comfort, but not break a promise he asked you to keep.
  - Did: You'd tell your grandfather the truth because he once asked you never to lie to him.
- **B02-FU-B:** No. Right now, his peace matters more than that promise.
  - Nudges: OR +2 (Outcomes), HT +2 (Heart)
  - Note: You'd break his own wish to spare him pain. You trust what he needs now over what he said then.
  - Did: You'd still tell your grandfather the business is doing well, though he once asked you never to lie to him.

### B13: Two Worlds

Scene `worlds` · light · Most signal: OR 1 · CI 7.5 · HT 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You don't know who you'll be. You pick the world.

*Question:* You'll be born into one of two worlds, as a random person. In World A, everyone has a decent, secure life, but no one is rich. In World B, most people live much better than in World A, but 1 in 10 struggle to afford food and a home. Which world do you choose?

- **B13-A:** World A.
  - Nudges: CI +3 (Collective)
  - Note: You'd give up a better life for most so that no one struggles.
  - Did: You'd choose the world where everyone is secure and no one is rich.
- **B13-B:** World B.
  - Nudges: CI -2 (Individual), OR +1 (Outcomes)
  - Note: You'll take the better odds for most people, even knowing some will struggle.
  - Did: You'd choose the richer world where 1 in 10 struggle.

**Follow-up `fu`** (step weight 1.5). Shown after B13-A (World A).

*Setup:* Now you know you'll land on top.

*Question:* Now you know for sure you'll be born into the top half of World B. Do you switch?

- **B13-FU-A:** Yes, B.
  - Nudges: CI -3 (Individual)
  - Note: You picked World A so you wouldn't end up at the bottom. Once you're safe, you'd take the richer world.
  - Did: You'd switch to the richer world once you knew you'd be in its top half.
- **B13-FU-B:** No, still A.
  - Nudges: CI +2 (Collective), HT +1 (Heart)
  - Note: Even knowing you'd be fine, you'd rather live where no one is left out.
  - Did: You'd stay in the equal world, even knowing you'd be in the richer one's top half.

### B18: The Pond and the Faraway Child

Scene `pond` · heavy · Most signal: OR 1 · CI 3 · HT 3.5 · LP 3.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Same $800, same child's life. One is here, one far away.

*Question:* A small child is drowning in a pond in front of you. Saving them will ruin your $800 phone. Meanwhile, $800 given to a proven charity would very likely save a child's life far away. Is walking past the drowning child worse than not giving $800 to charity?

- **B18-A:** Yes. Being right there makes it mine.
  - Nudges: LP +2 (Loyalty), HT +2 (Heart)
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
  - Nudges: CI +1 (Collective), HT +1 (Heart)
  - Note: You believe it, but you don't fully live by it, and that bothers you.
  - Did: You say you don't live as if faraway children count the same, and it bothers you.
- **B18-FU-C:** Not really, and I'm at peace with that.
  - Nudges: CI -2 (Individual)
  - Note: You believe every child counts the same, and you've made peace with not acting on it.
  - Did: You say you don't live as if faraway children count the same, and you're at peace with it.

### B29: The Jury

Scene `jury` · medium · Most signal: HT 6.5 · SD 7.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The law is clear. The evidence is clear. Five years.

*Question:* You're on a jury. The law is clear and so is the evidence: the defendant is guilty. They stole baby formula for their infant and now face five years in prison. How do you vote?

- **B29-A:** Guilty. My job is the law, not the sentence.
  - Nudges: SD +3 (System), HT -2 (Thought)
  - Note: You do the job you were given, even when the outcome feels wrong. The sentence isn't yours to fix.
  - Did: You'd vote guilty for a parent who stole baby formula.
- **B29-B:** Not guilty. I won't send them to prison for this.
  - Nudges: SD -2 (Disruption), HT +2 (Heart)
  - Note: You'd set the law aside rather than let it crush someone for feeding their baby.
  - Did: You'd vote not guilty for a parent who stole baby formula, though the law says guilty.

**Follow-up `fuA`** (step weight 1.5). Shown after B29-A (Guilty. My job is the law, not the sentence).

*Setup:* Same case. Now a baby's future rides on it.

*Question:* If convicted, their baby goes into foster care.

- **B29-FUA-A:** Still guilty.
  - Nudges: SD +2 (System), HT -2 (Thought)
  - Note: Even with a baby's home at stake, you vote by the law. Higher stakes don't change your vote.
  - Did: You'd still vote guilty on the baby formula theft, even with their baby going into foster care.
- **B29-FUA-B:** Then not guilty.
  - Nudges: HT +3 (Heart), SD -2 (Disruption)
  - Note: You'll follow the law until a child pays for it. Then the child wins.
  - Did: You'd switch to not guilty on the baby formula theft to keep their baby out of foster care.

**Follow-up `fuB`** (step weight 1.5). Shown after B29-B (Not guilty. I won't send them to prison for this).

*Setup:* Same law, same evidence. A less sympathetic reason.

*Question:* Same law, same evidence, but they stole to pay off a gambling debt.

- **B29-FUB-A:** Guilty.
  - Nudges: HT +2 (Heart), SD +1 (System)
  - Note: You let them off because of the baby. Without that reason, you'd convict.
  - Did: You'd vote guilty if the theft paid off a gambling debt.
- **B29-FUB-B:** Not guilty. The law is still too harsh.
  - Nudges: SD -3 (Disruption), HT -1 (Thought)
  - Note: Your problem is the law itself, whoever breaks it. You'd vote the same for someone you don't feel sorry for.
  - Did: You'd still vote not guilty if the theft paid off a gambling debt.

### B37: The Bank Card

Scene `bankcard` · medium · Most signal: OR 2 · CI 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* They asked you to hold it. Now, sober, they want it back.

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

Scene `waitlist` · medium · Most signal: CI 2 · LP 1 · SD 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* It's legal and no one would find out. He's in pain every day, but his life isn't at risk.

*Question:* Your father needs hip surgery. The waiting list is eight months, and he's in pain every day. A friend on the hospital board can move him up this week, ahead of people who've waited longer. It breaks no rules. Do you make the call?

- **D8-A:** Make the call
  - Nudges: CI -2 (Individual), SD -1 (Disruption), LP +1 (Loyalty)
  - Note: You'd use a connection to spare your father pain, even if it means others wait longer.
  - Did: You'd use a connection to get your father's surgery ahead of people who waited longer.
- **D8-B:** Don't. He waits his turn.
  - Nudges: SD +2 (System), CI +2 (Collective)
  - Note: You'd let your own father hurt before you'd step ahead of people who've waited longer.
  - Did: You'd let your father wait his turn for surgery, though he's in pain.

### B40: The Dinner Joke

Scene `dinner` · medium · Most signal: HT 3 · LP 5 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your own family. No one from that group is there.

*Question:* At a family dinner, a relative makes a cruel joke about a group of people. No one from that group is there. Most of the table laughs. Honestly, what do you usually do?

- **B40-A:** Say something right then.
  - Nudges: SD -2 (Disruption), LP -2 (Principle)
  - Note: You'll break the mood at your own family's table. Saying it's wrong matters more to you than keeping the peace.
  - Did: You'd speak up when a relative makes a cruel joke at dinner.
- **B40-B:** Stay quiet.
  - Nudges: LP +1 (Loyalty), SD +1 (System)
  - Note: You don't join in, but you don't make it a fight either.
  - Did: You'd stay quiet when a relative makes a cruel joke at dinner.
- **B40-C:** Smile along to keep the peace.
  - Nudges: LP +2 (Loyalty), SD +2 (System)
  - Note: You'll go along with the room to keep the family evening pleasant.
  - Did: You'd smile along when a relative makes a cruel joke at dinner.

**Follow-up `fu`** (step weight 1.5). Shown after B40-B (Stay quiet); or after B40-C (Smile along to keep the peace).

*Setup:* Now it's about someone you love.

*Question:* Your close friend belongs to that group.

- **B40-FU-A:** Then I'd say something.
  - Nudges: LP +2 (Loyalty), HT +2 (Heart)
  - Note: You'll speak up when it's someone you love. It has to be personal before you'll make a scene.
  - Did: You'd speak up if a close friend were in the group being mocked.
- **B40-FU-B:** I'd still let it go.
  - Nudges: SD +2 (System), LP +1 (Loyalty)
  - Note: Even for a close friend, you'd keep the table calm. Open conflict with family costs you a lot.
  - Did: You'd still let it go if a close friend were in the group being mocked.

### Q6: The Promotion

Scene `promotion` · medium · Most signal: OR 2.5 · CI 6.5 · HT 7.5 · LP 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Equally qualified. One role. No splitting it.

*Question:* You and a colleague are finalists for one promotion, and performance is essentially equal. Your colleague is under heavy financial pressure. What do you do?

- **Q6-A:** Compete fully. Let merit decide.
  - Nudges: CI -1 (Individual), OR +1 (Outcomes), HT -1 (Thought)
  - Note: You'd feel for them, but you won't step aside. You'd let the better candidate win.
  - Did: You'd compete for the promotion against a colleague who needs the money.
- **Q6-B:** Withdraw. Let them have it.
  - Nudges: HT +3 (Heart), CI +2 (Collective)
  - Note: You'd give up your own step forward because they need it more.
  - Did: You'd step aside so a colleague who needs the money gets the promotion.

**Follow-up `fuA`** (step weight 1.5). Shown after Q6-A (Compete fully. Let merit decide).

*Setup:* The risk to them is real. You're secure either way.

*Question:* You learn they may lose their home without the raise. You'd be fine either way.

- **Q6-FUA-A:** Still compete fully. The best candidate should win.
  - Nudges: CI -2 (Individual), OR +1 (Outcomes), HT -1 (Thought)
  - Note: Even with their home at stake, you won't let need decide who earns the job.
  - Did: You'd still compete for the promotion knowing your colleague might lose their home.
- **Q6-FUA-B:** Withdraw. That changes it.
  - Nudges: HT +3 (Heart), CI +3 (Collective)
  - Note: You'll compete until someone could really get hurt. Then you step back.
  - Did: You'd step aside from the promotion once you knew your colleague might lose their home.

**Follow-up `fuB`** (step weight 1.5). Shown after Q6-B (Withdraw. Let them have it).

*Setup:* Their need is unchanged. You know for sure they took credit.

*Question:* You learn that last year, this colleague quietly took credit for your work.

- **Q6-FUB-A:** I still withdraw. Their need is still real.
  - Nudges: HT +2 (Heart), CI +1 (Collective)
  - Note: What they did to you doesn't cancel what they need. You're kind to people even when they haven't earned it.
  - Did: You'd still step aside after learning your colleague took credit for your work.
- **Q6-FUB-B:** Then I compete fully
  - Nudges: OR +1 (Outcomes), HT -1 (Thought), LP +1 (Loyalty)
  - Note: Your generosity has a condition: people have to have played fair with you.
  - Did: You'd compete once you learned your colleague took credit for your work.

### B21: The Million-Dollar Button

Scene `button` · light · Most signal: OR 4 · CI 7.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* A stranger you'll never meet. It hurts, but not badly.

*Question:* If you press a button, you get $1 million. Somewhere, a stranger you'll never meet loses $1,000. It hurts them, but not badly. Do you press it?

- **B21-A:** Yes.
  - Nudges: CI -3 (Individual), OR +1 (Outcomes)
  - Note: A big gain for you outweighs a small hurt to someone you'll never see.
  - Did: You'd take $1 million, knowing a stranger loses $1,000.
- **B21-B:** No.
  - Nudges: CI +2 (Collective), OR -1 (Rules)
  - Note: You won't take money from someone who didn't agree to it, even a little, even for a million.
  - Did: You'd turn down $1 million that costs a stranger $1,000.

**Follow-up `fuA`** (step weight 1.5). Shown after B21-A (Yes).

*Setup:* Same button. Now the harm is spread wide.

*Question:* It's actually a thousand strangers, each losing $1,000.

- **B21-FUA-A:** Still yes.
  - Nudges: CI -3 (Individual)
  - Note: Even a thousand strangers losing money doesn't stop you. Your own gain comes first.
  - Did: You'd still take the $1 million if a thousand strangers each lost $1,000.
- **B21-FUA-B:** Then no.
  - Nudges: CI +2 (Collective), OR +2 (Outcomes)
  - Note: You were weighing the harm all along. One stranger's loss was worth it to you. A thousand aren't.
  - Did: You'd turn down the $1 million if a thousand strangers each lost $1,000.

**Follow-up `fuB`** (step weight 1.5). Shown after B21-B (No).

*Setup:* Same button. Now the loss wouldn't even be felt.

*Question:* The stranger is a billionaire who would never notice.

- **B21-FUB-A:** Then yes.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: Your no was about the harm, not the taking. If no one really gets hurt, you'd press it.
  - Did: You'd take the $1 million if it came from a billionaire who'd never notice.
- **B21-FUB-B:** Still no.
  - Nudges: OR -2 (Rules), CI +1 (Collective)
  - Note: How much it hurts doesn't matter to you. Taking what isn't yours is wrong.
  - Did: You'd still turn down the $1 million if it came from a billionaire who'd never notice.

### B01: The Invisible Year

Scene `invisible` · light · Most signal: OR 2 · CI 3.5 · HT 1.5 · SD 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* One year. No cameras, no witnesses, no consequences.

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
  - Nudges: SD -1 (Disruption), HT +1 (Heart), CI +1 (Collective)
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

*Setup:* $200, six months, not a word. Then the vacation photos.

*Question:* Six months ago, a friend borrowed $200 from you. They haven't mentioned it since. You just saw their vacation photos. What do you do?

- **B56-A:** Ask them for it directly.
  - Nudges: LP -2 (Principle), CI -1 (Individual)
  - Note: You'd raise the money directly, even if it's awkward. A friend still has to pay back what they borrowed.
  - Did: You'd ask a friend directly to repay a $200 loan they hadn't mentioned in six months.
- **B56-B:** Let it go. The friendship matters more.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: You'd let the money go rather than have an awkward talk with a friend. The friendship matters more to you than $200.
  - Did: You'd let a friend's unpaid $200 loan go to protect the friendship.

**Follow-up `fu`** (step weight 1.5). Shown after B56-B (Let it go. The friendship matters more).

*Setup:* The first $200 was never mentioned. Now they want more.

*Question:* They ask to borrow another $200.

- **B56-FU-A:** I say no and bring up the first loan.
  - Nudges: LP -2 (Principle), HT -1 (Thought)
  - Note: You'll let one unpaid loan slide, but not a second. When a friend asks for more, you say what they still owe.
  - Did: You'd refuse a friend a second $200 loan and bring up the first one they never repaid.
- **B56-FU-B:** I lend it again.
  - Nudges: LP +2 (Loyalty), HT +2 (Heart)
  - Note: You'd lend a friend money again, even though they never paid back the first loan. You keep the friendship easy at your own cost.
  - Did: You'd lend a friend another $200, though they never repaid the first $200.

### B55: The Bent Rule

Scene `boardgame` · light · Most signal: HT 2 · LP 1 · SD 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your child, a game with friends. Nobody else noticed.

*Question:* Your 10-year-old wins a board game against their friends by quietly bending a rule. No one noticed. They're thrilled. Do you say something?

- **B55-A:** Yes, and they give the win back.
  - Nudges: SD +2 (System), LP -1 (Principle)
  - Note: You'd have your own child give back a win, even over a small rule no one noticed. Small rules still count for you.
  - Did: You'd make your 10-year-old give back a board game win they got by bending a rule.
- **B55-B:** No. It's a game, and they're happy.
  - Nudges: HT +2 (Heart), SD -1 (Disruption)
  - Note: You'd let a small bent rule pass to keep your child's happy moment. In a kids' game, it isn't worth spoiling.
  - Did: You'd say nothing when your 10-year-old won a board game by bending a rule.

### B24: The Dog or the Stranger

Scene `dog` · medium · Most signal: HT 5 · LP 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* A burning house. Time to reach only one room.

*Question:* Your home is on fire. Your dog is trapped in one room and a stranger is unconscious in another. You only have time to reach one. (No dog? Picture an animal you've loved.) Who do you save?

- **B24-A:** The stranger.
  - Nudges: LP -2 (Principle), HT -2 (Thought)
  - Note: You'd let your own dog die to save a person you've never met. A human life comes first, even over an animal you love.
  - Did: You'd save an unconscious stranger from your burning home instead of your dog.
- **B24-B:** My dog.
  - Nudges: LP +3 (Loyalty), HT +2 (Heart)
  - Note: You'd save the animal you love over a person you don't know. Your bond with your dog counts for more.
  - Did: You'd save your dog from your burning home instead of an unconscious stranger.

**Follow-up `fu`** (step weight 1.5). Shown after B24-A (The stranger).

*Setup:* Same fire, same choice. Now you know who the stranger is.

*Question:* You learn the stranger is the person who set the fire.

- **B24-FU-A:** I still save them.
  - Nudges: LP -2 (Principle), HT -2 (Thought)
  - Note: Even knowing the stranger set the fire, you'd save them over your dog. What they did doesn't change whose life comes first.
  - Did: You'd save the stranger who set your home on fire over your dog.
- **B24-FU-B:** Then I save my dog.
  - Nudges: LP +2 (Loyalty), HT +2 (Heart)
  - Note: You'd save a stranger over your dog, but not the person who set the fire. What someone did changes how much you'll give up for them.
  - Did: You'd save your dog over the stranger who set your home on fire.

### B43: The Apology They Want

Scene `apology` · medium · Most signal: OR 3.5 · CI 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You're sure you're right. One apology would end it.

*Question:* You're in a dispute with a neighbor, and you're sure you're right. They say they'll drop it if you apologize. That would make everything easy. Do you apologize?

- **B43-A:** Yes. Peace is worth more than being right.
  - Nudges: OR +2 (Outcomes), CI +1 (Collective)
  - Note: You'd apologize for something you didn't do to end a fight. Peace matters more to you than being proven right.
  - Did: You'd apologize to a neighbor to end a dispute, though you were sure you were right.
- **B43-B:** No. I won't say sorry for something I didn't do.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You won't apologize for something you didn't do, even to end a fight. Saying something false costs you more than the dispute does.
  - Did: You'd refuse to apologize to a neighbor for something you didn't do, even to end the dispute.

**Follow-up `fu`** (step weight 1.5). Shown after B43-A (Yes. Peace is worth more than being right).

*Setup:* Your apology is now being told as a confession.

*Question:* Later, they tell other neighbors you admitted you were wrong.

- **B43-FU-A:** I let it go.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: Even when your neighbor tells people you admitted fault, you let it go. You'd rather be misjudged than start the fight again.
  - Did: You'd say nothing when a neighbor told others you'd admitted you were wrong.
- **B43-FU-B:** I set the record straight.
  - Nudges: CI -2 (Individual), OR -1 (Rules)
  - Note: You'll apologize to keep the peace, but you won't let people believe you were in the wrong. Your good name matters to you.
  - Did: You'd correct a neighbor who told others you'd admitted you were wrong.

### B42: The Rumor

Scene `rumor` · medium · Most signal: CI 3 · HT 1 · LP 6.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No proof either way. The group is pulling away.

*Question:* A friend in your circle is rumored to have taken money from a shared trip fund. There's no proof, and they deny it. Others are quietly dropping them. What do you do?

- **B42-A:** Treat them the same as always.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: With no proof, you'd treat your friend the same as always, even as others drop them. A rumor doesn't change how you treat a friend.
  - Did: You'd treat a friend the same as always when a rumor said they'd taken money from a trip fund.
- **B42-B:** Keep my distance.
  - Nudges: LP -1 (Principle), HT -1 (Thought)
  - Note: You'd keep your distance from a friend who might have taken the group's money. Without knowing, you'd rather be careful.
  - Did: You'd keep your distance from a friend rumored to have taken money from a trip fund.

**Follow-up `fu`** (step weight 1.5). Shown after B42-A (Treat them the same as always).

*Setup:* Standing by them now has a price for you.

*Question:* Standing by them could cost you your place in the group.

- **B42-FU-A:** I still treat them the same.
  - Nudges: LP +3 (Loyalty)
  - Note: You'd stand by an accused friend even if it cost you your place in the group.
  - Did: You'd stand by a friend rumored to have taken money, even at the cost of your place in the group.
- **B42-FU-B:** Then I keep some distance.
  - Nudges: CI -2 (Individual), LP -1 (Principle)
  - Note: You'll stand by an accused friend until it costs you your place in the group. Then you step back.
  - Did: You'd keep some distance from a friend rumored to have taken money, once standing by them could cost you your place in the group.

### B44: The Unlocked Phone

Scene `phone` · medium · Most signal: OR 6.5 · CI 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Unlocked, right there. Only a vague feeling, nothing more.

*Question:* Your partner leaves their phone unlocked on the table and steps into the shower. Lately you've had a vague feeling something is off. Do you look?

- **B44-A:** No. That's their private space.
  - Nudges: OR -2 (Rules)
  - Note: You wouldn't go through your partner's phone on a hunch. Their privacy holds even when you're uneasy.
  - Did: You wouldn't look through your partner's unlocked phone on a vague feeling.
- **B44-B:** Yes, a quick look.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: You'd take a quick look at your partner's phone on a hunch. Knowing matters more to you than their privacy.
  - Did: You'd take a quick look through your partner's unlocked phone on a vague feeling.

**Follow-up `fu`** (step weight 1.5). Shown after B44-A (No. That's their private space).

*Setup:* Now there's a reason, not just a feeling.

*Question:* A friend says they saw your partner on what looked like a date.

- **B44-FU-A:** Now I look.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: A hunch isn't enough for you to go through your partner's phone, but a friend's report is.
  - Did: You'd look through your partner's phone after a friend said they saw your partner on a date.
- **B44-FU-B:** Still no.
  - Nudges: OR -3 (Rules)
  - Note: Even after a friend says they saw your partner on a date, you won't go through their phone. Their privacy is a line you don't cross.
  - Did: You still wouldn't look through your partner's phone, even after a friend said they saw your partner on a date.

### B46: The Nightly Call

Scene `nightcall` · medium · Most signal: CI 5 · HT 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* An hour, every night. Your own life is slipping.

*Question:* A friend going through a hard time calls you every night for an hour. It's wearing you down, and your own life is slipping. What do you do?

- **B46-A:** Keep taking every call.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You'd keep answering a struggling friend every night, even as your own life slips. Being there for them comes first.
  - Did: You'd keep taking a struggling friend's hour-long call every night, though it's wearing you down.
- **B46-B:** Tell them I need to pull back.
  - Nudges: CI -2 (Individual), HT -1 (Thought)
  - Note: You'd tell a struggling friend you need to pull back. You won't let your own life fall apart, even to help someone you care about.
  - Did: You'd tell a friend who calls every night that you need to pull back.

**Follow-up `fu`** (step weight 1.5). Shown after B46-B (Tell them I need to pull back).

*Setup:* You might be all they have.

*Question:* They say you're the only person they can talk to.

- **B46-FU-A:** Then I keep going.
  - Nudges: HT +2 (Heart), CI +1 (Collective)
  - Note: You'd pull back from a struggling friend, unless you're the only one they have. Then you keep going.
  - Did: You'd keep taking a friend's nightly calls once they said you were the only person they could talk to.
- **B46-FU-B:** I still pull back.
  - Nudges: CI -2 (Individual), HT -1 (Thought)
  - Note: Even when a friend says you're the only one they can talk to, you'd still pull back. You hold to a limit on what you can give.
  - Did: You'd still pull back from a friend's nightly calls, even after they said you were the only person they could talk to.

### Q3: The Confession

Scene `confession` · heavy · Most signal: OR 4 · HT 2.5 · LP 6.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* It's confirmed. You're friends with both, closer to the one who told you.

*Question:* A close friend tells you they have been cheating on their partner. Their partner is also your friend. What do you do?

- **Q3-A:** Tell the partner. They deserve to know.
  - Nudges: LP -2 (Principle), OR -1 (Rules)
  - Note: You'd tell a friend they're being cheated on, even though the cheater is your closer friend. They have a right to know.
  - Did: You'd tell a friend their partner is cheating, though the cheater is your closer friend.
- **Q3-B:** Stay out of it. It's not my place.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: You'd keep out of a friend's affair, even though the person being cheated on is also your friend. It isn't yours to tell.
  - Did: You'd stay out of it when a close friend confessed to cheating on a partner who is also your friend.

**Follow-up `fuA`** (step weight 1.5). Shown after Q3-A (Tell the partner. They deserve to know).

*Setup:* They swear it's over. You can't check either way.

*Question:* Before you do, your friend begs you not to. They swear the affair is over, and telling would only end the marriage. What now?

- **Q3-FUA-A:** I tell the partner anyway
  - Nudges: LP -2 (Principle), OR -2 (Rules)
  - Note: Even when your friend begs and swears the affair is over, you'd still tell. The partner's right to know comes before what happens next.
  - Did: You'd tell a friend about their partner's affair, even after the cheater begged you not to and swore it was over.
- **Q3-FUA-B:** I keep the secret
  - Nudges: LP +2 (Loyalty), OR +1 (Outcomes), HT +1 (Heart)
  - Note: You'd tell, until your friend begs you not to and telling would only end the marriage. Then you keep the secret.
  - Did: You'd keep a friend's affair secret once they begged you to and swore it was over.

**Follow-up `fuB`** (step weight 1.5). Shown after Q3-B (Stay out of it. It's not my place).

*Setup:* They ask you in private. "I don't know" would be a lie.

*Question:* Months later, the partner asks you directly: "Is something going on? Please tell me."

- **Q3-FUB-A:** I tell them the truth
  - Nudges: LP -2 (Principle), OR -2 (Rules)
  - Note: You'd stay out of a friend's affair, but you won't lie when the partner asks you to your face.
  - Did: You'd tell a friend the truth when they asked you directly whether their partner was cheating.
- **Q3-FUB-B:** I say I don't know
  - Nudges: LP +3 (Loyalty), OR +1 (Outcomes)
  - Note: You'd lie to one friend's face to keep another friend's affair secret. The friend who told you comes first.
  - Did: You'd tell a friend you don't know, when they asked you directly whether their partner was cheating.

### B45: The Friend's Big Break

Scene `bigbreak` · light · Most signal: CI 3.5 · HT 1

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your close friend. Your dream. They called you first.

*Question:* Your close friend suddenly gets the exact success you've wanted for years. They call you first to share the news. Most people feel a mix of things in moments like this. Honestly, which is stronger?

- **B45-A:** Happiness for them.
  - Nudges: CI +2 (Collective), HT +1 (Heart)
  - Note: When a close friend gets the success you've wanted for years, you mostly feel glad for them.
  - Did: You'd mostly feel happy when a close friend got the success you'd wanted for years.
- **B45-B:** The sting.
  - Nudges: CI -2 (Individual)
  - Note: When a close friend gets the success you've wanted for years, the sting is stronger than the joy, and you can admit it.
  - Did: You'd mostly feel the sting when a close friend got the success you'd wanted for years.

**Follow-up `fu`** (step weight 1.5). Shown after any first answer.

*Setup:* They weren't more talented than you. They got lucky.

*Question:* You learn they got it mostly through luck, not more talent than you.

- **B45-FU-A:** That makes it easier.
  - Nudges: CI +1 (Collective)
  - Note: Knowing a friend's success was mostly luck makes it easier for you. It says nothing about what you're worth.
  - Did: You'd find a close friend's big success easier to take if it was mostly luck.
- **B45-FU-B:** That makes it harder.
  - Nudges: CI -1 (Individual)
  - Note: Knowing a friend's success was mostly luck makes it harder for you. Success that wasn't earned stings more.
  - Did: You'd find a close friend's big success harder to take if it was mostly luck.

### B36: What Forgiveness Is Owed

Scene `forgive` · medium · Most signal: CI 1 · HT 4 · LP 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* A sincere apology. A whole year of real change.

*Question:* Someone close to you betrayed you badly. They've apologized sincerely, and over a year they've really changed. Do you owe them forgiveness?

- **B36-A:** Yes. They've done what they can.
  - Nudges: CI +1 (Collective), HT +1 (Heart)
  - Note: You think someone who apologized and really changed has earned your forgiveness.
  - Did: You think you owe forgiveness to someone close who betrayed you, then apologized and changed.
- **B36-B:** No. Forgiveness is a gift, never a debt.
  - Nudges: CI -1 (Individual), HT -1 (Thought)
  - Note: You think forgiveness is yours to give, never something you owe, however much someone has changed.
  - Did: You think you don't owe forgiveness to someone close who betrayed you, even after they apologized and changed.

**Follow-up `fu`** (step weight 1.5). Shown after any first answer.

*Setup:* They want things back the way they were.

*Question:* They ask to be as close as you were before.

- **B36-FU-A:** Yes. If I forgive, I forgive.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: For you, forgiving someone means letting them all the way back in.
  - Did: You'd let someone who betrayed you badly be as close as before, once they'd changed.
- **B36-FU-B:** No. Forgiving isn't the same as trusting again.
  - Nudges: HT -2 (Thought)
  - Note: You can forgive someone without trusting them the way you did. Getting close again has to be earned.
  - Did: You wouldn't let someone who betrayed you badly be as close as before, even after they'd changed.

### D7: The Uncomfortable Truth

Scene `fiance` · medium · Most signal: OR 3 · HT 2 · LP 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* It's confirmed and long past. They've been honest since.

*Question:* You learn your close friend's fiancé served two years in prison for fraud, long ago. They've been honest since. Your friend doesn't know, and the wedding is next month. Do you tell your friend?

- **D7-A:** Tell them
  - Nudges: HT -2 (Thought), LP +1 (Loyalty)
  - Note: You'd tell a friend about their fiancé's prison record before the wedding. Your friend should know who they're marrying.
  - Did: You'd tell a close friend that their fiancé served prison time for fraud long ago.
- **D7-B:** Stay quiet. It's the fiancé's story to tell.
  - Nudges: HT +2 (Heart), LP -1 (Principle)
  - Note: You'd keep a fiancé's old prison record to yourself. It's their past to share, not yours.
  - Did: You'd keep quiet about a close friend's fiancé's prison record from long ago.

**Follow-up `fu`** (step weight 1.5). Shown after D7-B (Stay quiet. It's the fiancé's story to tell).

*Setup:* Saying "no" would be a direct lie.

*Question:* Your friend asks you, "Is there anything I should know before I marry them?"

- **D7-FU-A:** I tell them
  - Nudges: OR -2 (Rules), LP +1 (Loyalty)
  - Note: You'd keep a fiancé's past to yourself, but not when your friend asks you straight out. You won't lie to their face.
  - Did: You'd tell a friend about their fiancé's prison record once the friend asked if there was anything to know.
- **D7-FU-B:** I say no
  - Nudges: OR +2 (Outcomes), LP -1 (Principle)
  - Note: Even when your friend asks you straight out before the wedding, you'd keep the fiancé's past to yourself.
  - Did: You'd tell a friend there's nothing to know before the wedding, though their fiancé served prison time for fraud.

### B10: What We Owe Our Parents

Scene `parents` · heavy · Most signal: CI 2 · SD 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Nothing is wrong with the person. Your parents mean it.

*Question:* Your parents gave up a lot to raise you. They oppose the person you want to marry, though there's nothing wrong with them. Your parents say that if you marry, they won't see you again. Do you marry them anyway?

- **B10-A:** No. After everything, I owe my parents that.
  - Nudges: CI +2 (Collective), SD +2 (System)
  - Note: You'd give up marrying the person you love because your parents ask it. What they gave you is a debt you'd honor.
  - Did: You wouldn't marry the person you love if your parents said they'd never see you again.
- **B10-B:** Yes. What they gave me doesn't buy a veto.
  - Nudges: CI -2 (Individual), SD -2 (Disruption)
  - Note: You'd marry the person you love even if your parents cut you off. Raising you doesn't give them a say over who you marry.
  - Did: You'd marry the person you love even if your parents said they'd never see you again.

### Q5: The Inheritance

Scene `inheritance` · heavy · Most signal: OR 2.5 · CI 4 · HT 4 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The will is legal. Your parent is clear-minded. Your sibling doesn't know.

*Question:* Your parent's will splits their estate equally between you and your sibling. In private, your parent says they now want you to have everything, but the will was never updated. What do you do?

- **Q5-A:** Follow the will. Split it equally.
  - Nudges: SD +2 (System), OR -1 (Rules), HT -1 (Thought)
  - Note: You'd split the estate as the will says, even though your parent privately asked you to take it all. What's written down is what counts.
  - Did: You'd split your parent's estate equally as the will says, though your parent privately asked you to take it all.
- **Q5-B:** Honor my parent's request. Take it all.
  - Nudges: SD -2 (Disruption), CI -1 (Individual), HT +1 (Heart)
  - Note: You'd take the whole estate because your parent asked you in private, even though the will says to split it. Their word matters more to you than the paperwork.
  - Did: You'd take your parent's whole estate on their private request, though the will splits it with your sibling.

**Follow-up `fuA`** (step weight 1.5). Shown after Q5-A (Follow the will. Split it equally).

*Setup:* Your sibling stayed away ten years. You did the caregiving.

*Question:* You learn why your parent changed their mind: your sibling hadn't spoken to them in ten years. You did all the caregiving.

- **Q5-FUA-A:** Then I take it all
  - Nudges: SD -2 (Disruption), CI -1 (Individual)
  - Note: Learning your sibling stayed away for ten years while you did the caring changes your mind. You'd set the will aside and take it all.
  - Did: You'd take your parent's whole estate after learning your sibling hadn't spoken to them in ten years.
- **Q5-FUA-B:** I still split it equally
  - Nudges: SD +2 (System), OR -1 (Rules)
  - Note: Even knowing your sibling stayed away while you did all the caring, you'd split the estate as the will says.
  - Did: You'd still split your parent's estate equally with a sibling who hadn't spoken to them in ten years.

**Follow-up `fuB`** (step weight 1.5). Shown after Q5-B (Honor my parent's request. Take it all).

*Setup:* Your sibling still doesn't know. You're comfortable either way.

*Question:* You learn your sibling is struggling to pay their bills. You're comfortable. Does that change anything?

- **Q5-FUB-A:** No. This was our parent's wish.
  - Nudges: CI -2 (Individual), OR -1 (Rules)
  - Note: Even with your sibling struggling to pay their bills, you'd keep the whole estate. Your parent's wish comes first.
  - Did: You'd keep your parent's whole estate, even knowing your sibling struggles to pay their bills.
- **Q5-FUB-B:** Yes. I split it after all.
  - Nudges: HT +2 (Heart), CI +2 (Collective)
  - Note: You'd take what your parent wanted you to have, until your sibling needed it. Then you'd share.
  - Did: You'd split your parent's estate with your sibling after learning they struggle to pay their bills.

### D1: The Promise About the Home

Scene `carehome` · heavy · Most signal: OR 5 · HT 5.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* A good, affordable home exists. You promised while they were well.

*Question:* Your parent has advanced dementia. Caring for them at home would take most of your free time for years and strain your own family. Years ago, they made you promise you'd never put them in a care home. A good one is available. What do you do?

- **D1-A:** Keep the promise and care for them at home
  - Nudges: OR -2 (Rules), HT +1 (Heart)
  - Note: You'd keep your promise to care for your parent at home, even if it takes years of your life and strains your family.
  - Did: You'd care for your parent with dementia at home for years, as you promised them.
- **D1-B:** Move them to the care home
  - Nudges: OR +2 (Outcomes), HT -1 (Thought)
  - Note: You'd break a promise to your parent rather than let caring for them at home take over your life and your family's.
  - Did: You'd move your parent with dementia to a care home, though you promised them you never would.

**Follow-up `fuA`** (step weight 1.5). Shown after D1-A (Keep the promise and care for them at home).

*Setup:* They're calm and content with any kind caregiver.

*Question:* They no longer recognize you. They're calm with anyone who is kind to them. Does that change things?

- **D1-FUA-A:** Yes. I move them. The person I promised isn't really there anymore.
  - Nudges: OR +2 (Outcomes), HT -2 (Thought)
  - Note: You'd keep the promise while your parent knows you. Once they don't, you think the promise no longer holds.
  - Did: You'd move your parent to a care home once they no longer recognized you, despite your promise.
- **D1-FUA-B:** No. It's still them, and a promise is a promise.
  - Nudges: OR -2 (Rules), HT +1 (Heart)
  - Note: Even when your parent no longer knows you, you'd keep caring for them at home. The promise still holds.
  - Did: You'd keep caring for your parent at home after they stopped recognizing you, because you promised.

**Follow-up `fuB`** (step weight 1.5). Shown after D1-B (Move them to the care home).

*Setup:* Staff say this usually fades. There's no guarantee.

*Question:* At the home, they cry every time you leave and beg to go home.

- **D1-FUB-A:** I bring them home
  - Nudges: HT +3 (Heart)
  - Note: You'd move your parent to a care home, but you'd bring them back if they cried for home every time you left.
  - Did: You'd bring your parent home from the care home because they cried every time you left.
- **D1-FUB-B:** They stay
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

*Setup:* No brakes. Everyone involved is an adult stranger.

*Question:* A self-driving car's brakes fail. It can hit five pedestrians, or swerve into a wall and kill its one passenger. If you set the rule for every car, what should it do?

- **Q11-A:** Swerve. Save the five
  - Nudges: OR +3 (Outcomes), CI +2 (Collective)
  - Note: You'd have every self-driving car kill its own passenger to save five people on the road. Saving the most lives is the rule you'd set.
  - Did: You'd set every self-driving car to swerve and kill its passenger rather than hit five pedestrians.
- **Q11-B:** Protect the passenger
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You'd have a self-driving car protect the person inside it, even if five people on the road die. A car shouldn't be built to kill its own passenger.
  - Did: You'd set every self-driving car to protect its passenger, even if the car hits five pedestrians.

**Follow-up `fuA`** (step weight 1.5). Shown after Q11-A (Swerve. Save the five).

*Setup:* Every car follows your rule, including the ones your family rides in.

*Question:* Your own children will ride in these cars every day. Do you keep the rule?

- **Q11-FUA2-A:** Yes. Same rule for my family
  - Nudges: OR +1 (Outcomes), CI +1 (Collective), LP -2 (Principle)
  - Note: You'd keep a rule that has self-driving cars kill their passenger to save five, even with your own children riding in them every day.
  - Did: You'd keep self-driving cars set to sacrifice their passenger to save five pedestrians, even with your own children riding in them.
- **Q11-FUA2-B:** No. Then protect the passenger
  - Nudges: CI -2 (Individual), LP +2 (Loyalty)
  - Note: You'd have self-driving cars save the five, until your own children were the passengers. Then you'd change the rule to protect the passenger.
  - Did: You'd change the rule so self-driving cars protect their passenger once your own children would ride in them.

**Follow-up `fuB`** (step weight 1.5). Shown after Q11-B (Protect the passenger).

*Setup:* The five were crossing lawfully.

*Question:* The passenger chose to ride. The five pedestrians chose nothing. Does that change it?

- **Q11-FUB-A:** Yes. Then swerve
  - Nudges: OR +1 (Outcomes), CI +1 (Collective)
  - Note: You'd protect the passenger at first, but the five on the road never chose any risk. Once you see that, you'd have the car swerve.
  - Did: You'd set self-driving cars to swerve into a wall once you saw that the passenger chose to ride and the five pedestrians didn't.
- **Q11-FUB-B:** No. The car shouldn't turn on its passenger
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: Even though the five on the road chose nothing, you'd still have the car protect its passenger. A car should never be built to kill the person inside it.
  - Did: You'd still set self-driving cars to protect their passenger, even though the five pedestrians chose no risk.

### B12: Two Drivers

Scene `twodrivers` · light · Most signal: OR 5 · HT 2.5 · SD 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Same drinks, same road, same care.

*Question:* Two friends each have three drinks and drive home the same way, equally carefully. A child runs into the road in front of one of them, and that driver hits the child. The other gets home without incident. Did they do something equally wrong?

- **B12-A:** Yes. They made the same choice.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You judge the two drivers by what they chose, not by what happened. Both chose to drive after drinking, so both did the same wrong.
  - Did: You think two friends who drove home after three drinks did equally wrong, though only one of them hit a child.
- **B12-B:** No. The one who hit the child did something worse.
  - Nudges: OR +2 (Outcomes), HT +1 (Heart)
  - Note: For you, what actually happens counts. The driver who hit a child did something worse, even though the other made the same choice.
  - Did: You think a drunk driver who hit a child did worse than a friend who drove home the same way without hitting anyone.

**Follow-up `fu`** (step weight 1.5). Shown after B12-A (Yes. They made the same choice).

*Setup:* Now it's about what the law should do.

*Question:* Should they get the same punishment?

- **B12-FU-A:** Yes.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd punish both drivers the same, since both made the same choice. Luck shouldn't decide anyone's sentence.
  - Did: You'd give the same punishment to a drunk driver who hit a child and one who got home safely.
- **B12-FU-B:** No. What actually happened has to matter in the law.
  - Nudges: OR +1 (Outcomes), SD +1 (System)
  - Note: You think both drivers did the same wrong, but the law should still punish the one who hit a child more. In court, what happened has to count.
  - Did: You'd punish a drunk driver who hit a child more than one who got home safely, though you think both did equally wrong.

### B03: The Reference Call

Scene `reference` · medium · Most signal: OR 2.5 · CI 3 · HT 5 · LP 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Pleasant but unreliable. Eight months out of work. Two kids.

*Question:* A former employee of yours was pleasant but unreliable: missed deadlines, sometimes didn't show up. They've been out of work for 8 months and support two kids. A hiring manager calls you for a reference. What do you say?

- **B03-A:** The honest picture, problems included.
  - Nudges: HT -2 (Thought), LP -1 (Principle), OR -1 (Rules)
  - Note: You'd tell a hiring manager about a former employee's problems, even with their kids depending on the job. A reference has to be honest.
  - Did: You'd give an honest job reference, problems included, for an unreliable former employee who supports two kids.
- **B03-B:** The good parts. I leave out the rest.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: You'd leave a former employee's problems out of a reference to help them get back to work. Their family's need weighs more with you than the full picture.
  - Did: You'd give only the good parts in a job reference for an unreliable former employee who supports two kids.

**Follow-up `fuA`** (step weight 1.5). Shown after B03-A (The honest picture, problems included).

*Setup:* Eight months out of work. Two kids. It comes down to you.

*Question:* The hiring manager says your answer will decide it.

- **B03-FUA-A:** I still give the honest picture.
  - Nudges: HT -2 (Thought), OR -1 (Rules)
  - Note: Even when your words alone decide whether a parent of two gets the job, you'd tell the hiring manager about their problems. A reference has to be honest, whatever it costs them.
  - Did: You'd still give an honest reference, problems included, when your answer alone would decide whether an unreliable former employee with two kids gets the job.
- **B03-FUA-B:** Then I leave out the problems.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: You'd give an honest reference, until your answer alone decides whether a parent of two gets the job. Then you'd leave out the problems.
  - Did: You'd leave an unreliable former employee's problems out of a reference once your answer alone would decide whether they got the job.

**Follow-up `fuB`** (step weight 1.5). Shown after B03-B (The good parts. I leave out the rest).

*Setup:* Now other people depend on this person showing up.

*Question:* The job is at a daycare. When a worker doesn't show, families get turned away for the day.

- **B03-FUB2-A:** Then I tell them about the reliability problem.
  - Nudges: CI +2 (Collective), LP -2 (Principle)
  - Note: You'd leave out a former employee's problems to help them, but not for a daycare job where a missed shift turns families away. Then you'd tell the hiring manager.
  - Did: You'd tell a hiring manager about a former employee's unreliability once you knew the job was at a daycare where a missed shift turns families away.
- **B03-FUB2-B:** I stick with what I said.
  - Nudges: LP +2 (Loyalty), HT +1 (Heart), CI -1 (Individual)
  - Note: Even knowing families could be turned away from a daycare, you'd keep a former employee's problems out of the reference. You'd give the person you know their chance.
  - Did: You'd still leave a former employee's unreliability out of a reference for a daycare job where a missed shift turns families away.

### B04: The Company Line

Scene `companyline` · medium · Most signal: OR 1 · CI 4 · HT 3 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your manager is right there. The customer asks you directly.

*Question:* Your manager tells you to blame a late order on a "supplier issue." The real reason is that your company put bigger clients first. With your manager standing right there, a customer asks you: "Is it really the supplier?" What do you say?

- **B04-A:** "Yes, it's the supplier." I say what I was told.
  - Nudges: SD +2 (System), CI -1 (Individual)
  - Note: You'd give a customer the false excuse your manager told you to give. At work, you say what you were told.
  - Did: You'd tell a customer a late order was the supplier's fault, as your manager instructed, though it wasn't true.
- **B04-B:** "No. We put bigger clients first."
  - Nudges: SD -2 (Disruption), OR -1 (Rules)
  - Note: You'd tell a customer the real reason for a late order, in front of the manager who told you not to. Your job doesn't make a lie OK for you.
  - Did: You'd tell a customer their order was late because your company put bigger clients first, with your manager standing there.

**Follow-up `fuA`** (step weight 1.5). Shown after B04-A ("Yes, it's the supplier." I say what I was told).

*Setup:* Same question. Now the truth could help them.

*Question:* The customer is a small bakery. If they knew the real reason, they'd order from a competitor today and save a wedding order.

- **B04-FUA-A:** I still give the company line.
  - Nudges: SD +2 (System), CI -1 (Individual)
  - Note: Even when the truth would let a small bakery save a wedding order, you'd stick to the excuse your manager gave you. At work, you keep to your role.
  - Did: You'd still blame the supplier for a late order, even knowing the truth would let a small bakery save a wedding order.
- **B04-FUA-B:** I tell them the truth.
  - Nudges: SD -2 (Disruption), HT +2 (Heart)
  - Note: You'd repeat your company's excuse to most customers, but not when the truth would let a small bakery save a wedding order.
  - Did: You'd tell a small bakery the real reason their order was late, against your manager's instructions, so the bakery could save a wedding order.

**Follow-up `fuB`** (step weight 1.5). Shown after B04-B ("No. We put bigger clients first.").

*Setup:* Your manager has warned you before.

*Question:* Last month your manager said one more mistake and you're fired.

- **B04-FUB-A:** I still tell the truth.
  - Nudges: SD -2 (Disruption), CI +1 (Collective)
  - Note: Even with your job on the line, you'd tell a customer the real reason their order was late, in front of your manager.
  - Did: You'd tell a customer the real reason their order was late, in front of a manager who had warned they'd fire you.
- **B04-FUB-B:** Then I say it's the supplier.
  - Nudges: CI -2 (Individual), SD +1 (System)
  - Note: You'd tell a customer the truth about a late order, unless your manager had already warned they'd fire you. Then you'd blame the supplier.
  - Did: You'd blame the supplier for a late order once your manager had warned they'd fire you for one more mistake.

### B05: The Mistake No One Saw

Scene `mistake` · medium · Most signal: OR 3.5 · CI 3 · HT 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Years ago. They never found out. They're doing fine now.

*Question:* Years ago, you made a mistake on a shared project, and your coworker took the blame. It cost them a promotion. They never found out, and today they're doing fine. Do you tell them?

- **B05-A:** Yes, and apologize.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd tell a coworker your old mistake cost them a promotion, even though they're doing fine now. You think they have a right to know.
  - Did: You'd tell a coworker that your mistake years ago cost them a promotion, and apologize.
- **B05-B:** No. It would only hurt them now.
  - Nudges: OR +2 (Outcomes), HT +1 (Heart)
  - Note: You'd keep quiet about an old mistake that cost a coworker a promotion. Telling them now would hurt them and change nothing.
  - Did: You wouldn't tell a coworker that your mistake years ago cost them a promotion.

**Follow-up `fu`** (step weight 1.5). Shown after B05-B (No. It would only hurt them now).

*Setup:* The lost promotion still weighs on them.

*Question:* They mention that losing that promotion still makes them doubt themselves.

- **B05-FU-A:** Then I tell them.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You'd keep quiet to spare a coworker, until you learn the lost promotion still makes them doubt themselves. Then the truth would help them, so you tell.
  - Did: You'd tell a coworker your old mistake cost them a promotion once you learned the lost promotion still makes them doubt themselves.
- **B05-FU-B:** Still no.
  - Nudges: CI -2 (Individual)
  - Note: Even knowing a coworker still doubts themselves over a promotion your mistake cost them, you wouldn't tell them.
  - Did: You still wouldn't tell a coworker your old mistake cost them a promotion, though losing the promotion still makes them doubt themselves.

### B30: The Permit Fee

Scene `permit` · light · Most signal: OR 5 · CI 1 · SD 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You're entitled to the permit. Paying is normal here.

*Question:* You're living in another country and need a permit you're entitled to. Everyone knows the official expects a small cash "fee." Locals pay it without thinking twice. Do you pay?

- **B30-A:** Yes. That's how it works here.
  - Nudges: OR +2 (Outcomes), SD -1 (Disruption), CI -1 (Individual)
  - Note: You'd pay an official the small cash "fee" that everyone pays. You go by how things work where you are.
  - Did: You'd pay an official's expected cash "fee" for a permit you're entitled to abroad.
- **B30-B:** No, even if it takes months longer.
  - Nudges: OR -2 (Rules), SD +1 (System), CI +1 (Collective)
  - Note: You'd refuse to pay an official a bribe, even if your permit takes months longer. What's wrong at home is wrong anywhere to you.
  - Did: You'd refuse to pay an official's expected cash "fee" abroad, even if your permit took months longer.

**Follow-up `fu`** (step weight 1.5). Shown after B30-B (No, even if it takes months longer).

*Setup:* Now refusing costs you the reason you came.

*Question:* Without the permit, you can't start the job you moved there for.

- **B30-FU-A:** Then I pay.
  - Nudges: OR +2 (Outcomes), SD -1 (Disruption)
  - Note: You'd refuse to pay a bribe for a permit until refusing costs you the job you moved abroad for. Then you pay.
  - Did: You'd pay an official's cash "fee" abroad once refusing would cost you the job you moved for.
- **B30-FU-B:** Still no.
  - Nudges: OR -2 (Rules), SD +1 (System)
  - Note: Even if refusing costs you the job you moved abroad for, you won't pay an official a bribe.
  - Did: You'd still refuse to pay an official's cash "fee" abroad, even if refusing cost you the job you moved for.

### B32: The Call-Up

Scene `callup` · heavy · Most signal: OR 5 · CI 2 · LP 1.5 · SD 4.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You believe this war is wrong. The call-up is official.

*Question:* Your country goes to war. You believe this war is wrong. You're called up to serve. What do you do?

- **B32-A:** I serve. My country asked.
  - Nudges: SD +3 (System), CI +1 (Collective)
  - Note: You'd fight in a war you believe is wrong because your country called you up. Your duty to your country comes before your own judgment.
  - Did: You'd serve in a war you believe is wrong when your country calls you up.
- **B32-B:** I refuse and accept the consequences, even prison.
  - Nudges: SD -2 (Disruption), OR -2 (Rules)
  - Note: You'd go to prison rather than fight in a war you believe is wrong. You won't take part, and you won't run from the price.
  - Did: You'd refuse to serve in a war you believe is wrong, even if it meant prison.
- **B32-C:** I leave the country for good.
  - Nudges: SD -2 (Disruption), CI -2 (Individual)
  - Note: You'd leave your country for good rather than fight in a war you believe is wrong. You'd give up your home before you'd serve or go to prison.
  - Did: You'd leave your country for good rather than serve in a war you believe is wrong.

**Follow-up `fuB`** (step weight 1.5). Shown after B32-B (I refuse and accept the consequences, even prison); or after B32-C (I leave the country for good).

*Setup:* A different war. This time your country is invaded.

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

*Setup:* Twenty-six years later. He was never caught until now.

*Question:* At 19, a man badly hurt someone in a robbery and was never caught. He's now 45: a teacher, a father, a volunteer. New evidence surfaces. Should he go to prison?

- **B33-A:** Yes. Justice doesn't expire.
  - Nudges: SD +2 (System), OR -2 (Rules)
  - Note: You'd send a man to prison for a robbery he committed at 19, even though he's now a teacher and a father. A crime still has to be answered for, however long ago.
  - Did: You think a man should go to prison at 45 for badly hurting someone in a robbery at 19.
- **B33-B:** No. He's not that person anymore.
  - Nudges: OR +2 (Outcomes), SD -1 (Disruption), HT +1 (Heart)
  - Note: You wouldn't send a man to prison for a robbery he committed at 19, now that he's a teacher and a father. Who he is now matters more to you than what he did then.
  - Did: You think a man who badly hurt someone in a robbery at 19 shouldn't go to prison at 45, now that he's changed.

**Follow-up `fu`** (step weight 1.5). Shown after B33-B (No. He's not that person anymore).

*Setup:* The person he hurt has never recovered.

*Question:* The person he hurt still lives with daily pain and wants him prosecuted.

- **B33-FU-A:** Then yes, prosecute.
  - Nudges: SD +2 (System), HT +1 (Heart)
  - Note: You'd spare a man who changed, unless the person he hurt still suffers and wants him prosecuted. The victim's wish decides it for you.
  - Did: You'd prosecute a man for a robbery at 19 once you learned the person he hurt still lives in pain and wants him prosecuted.
- **B33-FU-B:** I understand, but no.
  - Nudges: SD -2 (Disruption), OR +1 (Outcomes)
  - Note: Even with the person he hurt still in daily pain and asking for prosecution, you wouldn't send a changed man to prison.
  - Did: You still wouldn't send a changed man to prison for a robbery at 19, though the person he hurt lives in pain and wants him prosecuted.

### B34: The Remorse Pill

Scene `remorse` · light · Most signal: OR 6 · CI 3 · HT 3 · SD 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The pill works. They will never do it again.

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

*Question:* The person they assaulted has forgiven them and asks the court to let them go.

- **B34-FUA-A:** They should still serve.
  - Nudges: OR -2 (Rules), SD +1 (System)
  - Note: Even when the person they assaulted forgives them and asks for their release, you think they should serve their sentence. The punishment is owed for the crime, not to the victim.
  - Did: You think a person convicted of assault should serve their sentence, even after the person they hurt forgave them and asked the court to let them go.
- **B34-FUA-B:** Then let them go.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You think punishment is owed, until the person who was hurt forgives and asks for their release. Then you'd let them go.
  - Did: You'd free a person convicted of assault once the person they hurt forgave them and asked the court to let them go.

**Follow-up `fuB`** (step weight 1.5). Shown after B34-B (No. There's nothing left for prison to do).

*Setup:* Now think about everyone else watching the case.

*Question:* If they walk free, others may think they can get away with crime.

- **B34-FUB-A:** Then they should serve.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes), SD +1 (System)
  - Note: You'd free someone who can never do it again, but not if it tells others they can get away with crime. Their sentence also protects everyone else.
  - Did: You'd make a person convicted of assault serve their sentence so others don't think they can get away with crime, even after a pill made them unable to commit assault again.
- **B34-FUB-B:** That's not a reason to punish this person.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You won't keep someone in prison just to warn other people. A person is punished for what they did, not to send a message.
  - Did: You'd free a person convicted of assault who can never commit assault again, even if others might think they can get away with crime.

### B35: The True Story

Scene `truestory` · heavy · Most signal: OR 1.5 · HT 3 · LP 5 · SD 4.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The police dropped it. Your proof is real.

*Question:* Someone seriously hurt a person you love. The police looked into it, and nothing came of it. You have proof of what they did, and posting it anonymously would wreck their reputation. Do you post it?

- **B35-A:** Yes. They earned it.
  - Nudges: SD -3 (Disruption), LP +2 (Loyalty)
  - Note: You'd anonymously post proof of what someone did to a person you love, after the police dropped the case. When the system fails, you act yourself.
  - Did: You'd anonymously post proof of what someone did to a person you love, after the police dropped the case.
- **B35-B:** No. That's not my role.
  - Nudges: SD +2 (System), LP -1 (Principle)
  - Note: You wouldn't post proof of what someone did to a person you love, even after the police dropped the case. Punishing them isn't your job.
  - Did: You wouldn't post proof of what someone did to a person you love, though the police dropped the case.

**Follow-up `fu`** (step weight 1.5). Shown after B35-A (Yes. They earned it).

*Setup:* Their children did nothing wrong.

*Question:* It will also hurt their teenage kids, who did nothing.

- **B35-FU-A:** Still yes.
  - Nudges: LP +2 (Loyalty), SD -1 (Disruption)
  - Note: Even knowing it would hurt their teenage kids, you'd still post proof of what they did. The person you love comes first.
  - Did: You'd still post proof against the person who hurt someone you love, even though posting would hurt their innocent teenage kids.
- **B35-FU-B:** Then no.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes), LP -1 (Principle)
  - Note: You'd expose the person who hurt someone you love, but not if their teenage kids would be hurt too. Innocent children stop you.
  - Did: You wouldn't post proof against the person who hurt someone you love once you knew posting would hurt their teenage kids.

### B41: The Borrowed Credit

Scene `credit` · light · Most signal: OR 3 · CI 6.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The idea was your coworker's. Your pay review is next week.

*Question:* Your boss praises you in a meeting for an idea that was actually your coworker's. Your coworker isn't there, and your pay review is next week. What do you do?

- **B41-A:** Make sure my boss knows it was theirs.
  - Nudges: CI +2 (Collective)
  - Note: You'd tell your boss that an idea they praised you for was your coworker's, with your pay review a week away. You won't keep credit you didn't earn.
  - Did: You'd tell your boss that the idea they praised you for was your coworker's, with your pay review a week away.
- **B41-B:** Let it go.
  - Nudges: CI -2 (Individual)
  - Note: You'd let your boss go on thinking a coworker's idea was yours, with your pay review a week away.
  - Did: You'd let your boss credit you for your coworker's idea, with your pay review a week away.

**Follow-up `fuA`** (step weight 1.5). Shown after B41-A (Make sure my boss knows it was theirs).

*Setup:* There's only one raise this year.

*Question:* Your coworker is up for the same raise. Only one of you will get it.

- **B41-FUA2-A:** I still correct it.
  - Nudges: CI +3 (Collective)
  - Note: Even with your coworker competing with you for the only raise, you'd tell your boss the idea was your coworker's.
  - Did: You'd tell your boss a praised idea was your coworker's, even with the two of you competing for one raise.
- **B41-FUA2-B:** Then I'd let it go.
  - Nudges: CI -2 (Individual)
  - Note: You'd give your coworker the credit, until the two of you were competing for the same raise. Then you'd let your boss believe the idea was yours.
  - Did: You'd let your boss credit you for your coworker's idea once the two of you were competing for one raise.

**Follow-up `fuB`** (step weight 1.5). Shown after B41-B (Let it go).

*Setup:* Your coworker heard about the meeting. They ask you directly.

*Question:* Your coworker finds out and asks if you said anything.

- **B41-FUB-A:** I admit I let it go.
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

*Setup:* Clear proof. It's still going on. You like them.

*Question:* A colleague you like has been stealing small amounts from work for months. You have clear proof. What do you do?

- **Q8-A:** Report it
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: You'd report a colleague you like for stealing from work. Liking them doesn't put them above the rules.
  - Did: You'd report a colleague you like for stealing small amounts from work.
- **Q8-B:** Stay out of it
  - Nudges: LP +2 (Loyalty), SD -1 (Disruption)
  - Note: You'd keep quiet about a colleague you like stealing small amounts from work. It isn't your job to turn them in.
  - Did: You'd stay out of it when a colleague you like steals small amounts from work.

**Follow-up `fuA`** (step weight 1.5). Shown after Q8-A (Report it).

*Setup:* The bills are real. You haven't reported yet.

*Question:* Before you do, you learn they did it to pay their child's medical bills. Do you still report it?

- **Q8-FUA-A:** Yes, I still report it
  - Nudges: SD +2 (System), HT -2 (Thought)
  - Note: Even knowing a colleague stole to pay their child's medical bills, you'd report them. A good reason doesn't make stealing OK to you.
  - Did: You'd report a colleague for stealing from work, even knowing they stole to pay their child's medical bills.
- **Q8-FUA-B:** No, I don't report it
  - Nudges: HT +3 (Heart), SD -1 (Disruption)
  - Note: You'd report a colleague for stealing, unless they did it to pay their child's medical bills. Then you'd let it go.
  - Did: You wouldn't report a colleague for stealing from work once you learned the money paid their child's medical bills.

**Follow-up `fuB`** (step weight 1.5). Shown after Q8-B (Stay out of it).

*Setup:* The losses are adding up. Other people are paying for them.

*Question:* You learn the missing money is why the owners just cut two of your coworkers' hours. Now what?

- **Q8-FUB2-A:** I report it now
  - Nudges: LP -2 (Principle), SD +1 (System), OR +1 (Outcomes)
  - Note: You'd stay out of a colleague's stealing until you learned it cost two coworkers their hours. Then you'd report it.
  - Did: You'd report a colleague you like for stealing once you learned the losses had cost two coworkers their hours.
- **Q8-FUB2-B:** I still stay out of it
  - Nudges: LP +2 (Loyalty), SD -1 (Disruption)
  - Note: Even knowing a colleague's stealing cost two coworkers their hours, you'd stay out of it. You won't turn in someone you like.
  - Did: You'd still stay out of it when a colleague you like steals, even knowing the losses cost two coworkers their hours.

### Q9: The Protest

Scene `unjustlaw` · heavy · Most signal: CI 1 · HT 1 · LP 3 · SD 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The courts said no. The protest is peaceful. Arrest is likely.

*Question:* A law you believe is deeply unjust passes through normal democratic process. Court challenges have already failed. Would you break that law through nonviolent civil disobedience?

- **Q9-A:** Break it through nonviolent protest
  - Nudges: SD -3 (Disruption), CI +1 (Collective)
  - Note: You'd break a law you believe is deeply unjust, even though it passed fairly and the courts upheld it. Some laws you won't obey.
  - Did: You'd break a deeply unjust law through nonviolent protest after court challenges failed.
- **Q9-B:** Do not break it. Protect the process
  - Nudges: SD +3 (System), HT -1 (Thought)
  - Note: You wouldn't break a law you believe is deeply unjust once it passed fairly and the courts upheld it. Keeping the process working matters more to you than any one law.
  - Did: You wouldn't break a deeply unjust law that passed through a fair democratic process.

**Follow-up `fuA`** (step weight 1.5). Shown after Q9-A (Break it through nonviolent protest).

*Setup:* People depend on your income.

*Question:* An arrest would likely cost you your job, and your family depends on your income.

- **Q9-FUA-A:** I still do it
  - Nudges: SD -2 (Disruption), LP -1 (Principle)
  - Note: You'd break an unjust law in protest even if the arrest cost you the job your family depends on.
  - Did: You'd break an unjust law in protest, even if an arrest would cost you the job your family depends on.
- **Q9-FUA-B:** Then I don't
  - Nudges: LP +2 (Loyalty), SD +1 (System)
  - Note: You'd protest an unjust law until it put your family's income at risk. Then your family comes first.
  - Did: You wouldn't break an unjust law in protest if an arrest would cost you the job your family depends on.

**Follow-up `fuB`** (step weight 1.5). Shown after Q9-B (Do not break it. Protect the process).

*Setup:* Legal routes are still closed. Now it's personal.

*Question:* The law starts hurting someone you love.

- **Q9-FUB-A:** Then I'd break it
  - Nudges: SD -2 (Disruption), LP +2 (Loyalty)
  - Note: You'd obey an unjust law until it hurt someone you love. Then you'd break it.
  - Did: You'd break an unjust law once the law started hurting someone you love.
- **Q9-FUB-B:** I still wouldn't
  - Nudges: SD +2 (System), LP -1 (Principle)
  - Note: Even when an unjust law hurts someone you love, you wouldn't break it. You hold to the process for everyone, your own people included.
  - Did: You still wouldn't break an unjust law, even when the law hurts someone you love.

### Q10: The Bystander

Scene `platform` · medium · Most signal: OR 1 · CI 5 · HT 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No staff, no signal. Others are watching and doing nothing.

*Question:* On a subway platform, you see one adult verbally harassing another adult. The aggression is escalating. No staff are around, and your phone has no signal. What do you do?

- **Q10-A:** Confront the harasser
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: You'd confront a stranger harassing someone on a subway platform, with no one else to help. You'd try to stop the harassment yourself.
  - Did: You'd confront a stranger verbally harassing someone on a subway platform.
- **Q10-B:** Go stand with the target, even if the harasser turns on me
  - Nudges: HT +2 (Heart), CI +1 (Collective)
  - Note: You'd go stand beside a stranger being harassed on a subway platform, even if the harasser turned on you. You'd make sure they weren't alone.
  - Did: You'd go stand beside a stranger being harassed on a subway platform, even if the harasser turned on you.
- **Q10-C:** Stay where I am
  - Nudges: CI -2 (Individual)
  - Note: You'd stay where you are while a stranger is harassed on a subway platform. You'd keep yourself out of a fight that isn't yours.
  - Did: You'd stay where you are while a stranger is verbally harassed on a subway platform.

**Follow-up `fuA`** (step weight 1.5). Shown after Q10-A (Confront the harasser).

*Setup:* You spoke up. Now the harasser has turned on you.

*Question:* The harasser turns on you. They're much bigger than you, and they step in close.

- **Q10-FUA-A:** I stand my ground.
  - Nudges: CI +2 (Collective)
  - Note: Even when a much bigger harasser turns on you, you'd stand your ground to protect the stranger they were harassing.
  - Did: You'd stand your ground when a much bigger harasser you confronted on a subway platform turned on you.
- **Q10-FUA-B:** I back away.
  - Nudges: CI -2 (Individual)
  - Note: You'd confront a stranger's harasser, until the harasser, much bigger than you, turns on you. Then you'd back away.
  - Did: You'd back away when a much bigger harasser you confronted on a subway platform turned on you.

**Follow-up `fuB`** (step weight 1.5). Shown after Q10-B (Go stand with the target, even if the harasser turns on me); or after Q10-C (Stay where I am).

*Setup:* Now it's physical. No one else is moving.

*Question:* The harasser shoves the target to the ground. No one else moves.

- **Q10-FUB-A:** I step in physically
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: Once a stranger is shoved to the ground and no one else moves, you'd step in physically.
  - Did: You'd physically step in when a stranger was shoved to the ground on a subway platform.
- **Q10-FUB-B:** I hold back
  - Nudges: CI -2 (Individual)
  - Note: Even when a stranger is shoved to the ground and no one else moves, you'd hold back.
  - Did: You'd hold back when a stranger was shoved to the ground on a subway platform and no one else moved.

### D3: The Informant

Scene `shifts` · medium · Most signal: LP 2 · SD 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You've raised it with them twice. Reporting will cost them.

*Question:* A colleague who helped build your career keeps giving the worst shifts to a teammate they dislike. You've talked to them twice. Nothing changed. Do you report it to HR?

- **D3-A:** Report it
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: You'd report the colleague who helped build your career to HR for treating a teammate unfairly. What they did for you doesn't excuse what they're doing.
  - Did: You'd report the colleague who helped build your career to HR for giving a teammate the worst shifts.
- **D3-B:** Let it go
  - Nudges: LP +2 (Loyalty), SD -1 (Disruption)
  - Note: You'd let it go when the colleague who helped build your career keeps treating a teammate unfairly. You've tried twice, and you won't go to HR about them.
  - Did: You wouldn't report the colleague who helped build your career for giving a teammate the worst shifts.

### D5: The Unearned Advantage

Scene `hiring` · light · Most signal: CI 1 · HT 1 · LP 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* It's your call. Both can do the job. No one would know.

*Question:* You're hiring. One candidate is a bit stronger. The other is the child of a mentor who shaped your career, and the mentor asked you, as a personal favor, to hire them. Their kid could do the job. Who do you hire?

- **D5-A:** The stronger candidate
  - Nudges: LP -2 (Principle), CI +1 (Collective)
  - Note: You'd hire the stronger candidate over your mentor's child, even though your mentor asked you as a favor. The job goes to whoever is best for it.
  - Did: You'd hire the stronger candidate over the child of a mentor who asked you for the favor.
- **D5-B:** My mentor's kid
  - Nudges: LP +2 (Loyalty), HT +1 (Heart)
  - Note: You'd hire your mentor's child over a slightly stronger candidate because your mentor asked. What you owe your mentor counts for more than a small edge.
  - Did: You'd hire your mentor's child over a slightly stronger candidate as a favor to your mentor.

### D6: The Pension Cut

Scene `pensions` · heavy · Most signal: OR 2 · CI 6.5 · HT 1.5 · LP 3 · SD 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The cut is legal. You tried inside. Going public costs you.

*Question:* Your company will quietly cut the pensions of 3,000 retired workers next week. You raised it inside a month ago, and nothing happened. Going public would likely stop it, but it breaks the confidentiality agreement you signed, and you'd be fired and sued. What do you do?

- **D6-A:** Go public
  - Nudges: SD -3 (Disruption), OR +2 (Outcomes), CI +2 (Collective)
  - Note: You'd break your confidentiality agreement and lose your job to stop a pension cut for 3,000 retirees. Their harm outweighs your agreement and your career.
  - Did: You'd go public about your company's plan to cut 3,000 retirees' pensions, though going public breaks your confidentiality agreement and costs you your job.
- **D6-B:** Stay quiet. I signed, and I tried
  - Nudges: SD +2 (System), OR -1 (Rules), CI -1 (Individual)
  - Note: You'd stay quiet about a pension cut for 3,000 retirees after raising it inside the company. You signed an agreement, and you keep it.
  - Did: You'd stay quiet about your company's plan to cut 3,000 retirees' pensions, because you signed a confidentiality agreement and already raised the cut inside.

**Follow-up `fuA`** (step weight 1.5). Shown after D6-A (Go public).

*Setup:* Going public would still likely stop the cut.

*Question:* Your lawyer says the lawsuit would take your savings and your home.

- **D6-FUA-A:** I still go public.
  - Nudges: CI +3 (Collective), SD -1 (Disruption)
  - Note: You'd go public about a pension cut for 3,000 retirees even if the lawsuit took your savings and your home. Their pensions come before what you own.
  - Did: You'd still go public about your company's plan to cut 3,000 retirees' pensions, even if the lawsuit took your savings and your home.
- **D6-FUA-B:** Then I stay quiet.
  - Nudges: CI -2 (Individual)
  - Note: You'd lose your job to stop a pension cut for 3,000 retirees, but not your savings and your home. Then you'd stay quiet.
  - Did: You'd stay quiet about your company's plan to cut 3,000 retirees' pensions once you knew the lawsuit would take your savings and your home.

**Follow-up `fuB`** (step weight 1.5). Shown after D6-B (Stay quiet. I signed, and I tried).

*Setup:* Same cut, same agreement. Now one of them is family.

*Question:* One of the 3,000 is your grandmother.

- **D6-FUB2-A:** Then I go public.
  - Nudges: LP +2 (Loyalty), SD -2 (Disruption), HT +1 (Heart)
  - Note: You'd keep your agreement while the 3,000 retirees were strangers, but not once your grandmother was one of them. Then you'd go public.
  - Did: You'd go public about your company's plan to cut 3,000 retirees' pensions once you learned your grandmother was one of them.
- **D6-FUB2-B:** I still stay quiet.
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: Even with your grandmother among the 3,000 retirees, you'd stay quiet about the pension cut. Family doesn't change your agreement.
  - Did: You'd still stay quiet about your company's plan to cut 3,000 retirees' pensions, even with your grandmother among them.

### D10: The Housing List

Scene `favor` · medium · Most signal: CI 1 · LP 2 · SD 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No one would find out. Everyone on the list needs a home.

*Question:* You run the waiting list for cheap city apartments. The woman who took you in when you were homeless asks you to move her grandson to the top. Families have waited years. What do you do?

- **D10-A:** Move him up. I owe her
  - Nudges: LP +2 (Loyalty), SD -2 (Disruption)
  - Note: You'd move the grandson of the woman who took you in to the top of a housing list, ahead of families who've waited years. What you owe her comes first.
  - Did: You'd move the grandson of the woman who took you in when you were homeless to the top of a housing waiting list you run.
- **D10-B:** Say no. The list is the list
  - Nudges: LP -2 (Principle), SD +2 (System), CI +1 (Collective)
  - Note: You'd refuse to move up the grandson of the woman who took you in when you were homeless. Families who've waited years come first, whoever is asking.
  - Did: You'd refuse to move the grandson of the woman who took you in when you were homeless up a housing waiting list you run.

### D11: The Silent Witness

Scene `witness` · heavy · Most signal: OR 1 · CI 1.5 · LP 6.5 · SD 6

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You're the only witness. Who struck first decides the case. Refusing means a contempt charge.

*Question:* Your brother got into a fight outside a bar. The other man was badly hurt. In court, you're asked who threw the first punch. It was your brother. What do you say?

- **D11-A:** The whole truth
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: You'd tell the court your brother threw the first punch. In court, your brother gets no exception.
  - Did: You'd testify in court that your brother threw the first punch.
- **D11-B:** Say I didn't see who started it
  - Nudges: LP +2 (Loyalty), SD -3 (Disruption), OR +1 (Outcomes)
  - Note: You'd tell the court you didn't see who threw the first punch, to protect your brother. You'd lie under oath for him.
  - Did: You'd tell the court you didn't see who threw the first punch, though it was your brother.
- **D11-C:** I refuse to testify and accept the charge
  - Nudges: LP +2 (Loyalty), SD -2 (Disruption), OR -1 (Rules)
  - Note: You'd take a contempt charge rather than testify against your brother. You won't lie in court, and you won't turn him in.
  - Did: You'd refuse to testify about your brother's fight and accept a contempt charge.

**Follow-up `fuA`** (step weight 1.5). Shown after D11-A (The whole truth).

*Setup:* Your testimony is the strongest evidence against him.

*Question:* Your answer will very likely send your brother to prison.

- **D11-FUA-A:** I still tell the whole truth.
  - Nudges: SD +2 (System), LP -2 (Principle)
  - Note: Even if your answer will likely send your brother to prison, you'd tell the court he threw the first punch.
  - Did: You'd testify that your brother threw the first punch, even knowing your answer would likely send him to prison.
- **D11-FUA-B:** Then I say I didn't see.
  - Nudges: LP +3 (Loyalty), SD -2 (Disruption)
  - Note: You'd tell the court the whole truth, until it would likely send your brother to prison. Then you'd say you didn't see who threw the first punch.
  - Did: You'd tell the court you didn't see who threw the first punch once you knew the truth would likely send your brother to prison.

**Follow-up `fuB`** (step weight 1.5). Shown after D11-B (Say I didn't see who started it); or after D11-C (I refuse to testify and accept the charge).

*Setup:* The other man was badly hurt. He can't work anymore.

*Question:* Without your answer, the court will likely decide the other man started it, and he'll get nothing for his injuries.

- **D11-FUB2-A:** Then I tell them it was my brother.
  - Nudges: LP -2 (Principle), SD +2 (System), CI +1 (Collective)
  - Note: You'd protect your brother in court, but not if the man he hurt, who can't work anymore, would get nothing. Then you'd say who threw the first punch.
  - Did: You'd testify that your brother threw the first punch once you knew the man he hurt, who can't work anymore, would otherwise get nothing for his injuries.
- **D11-FUB2-B:** I still don't say it.
  - Nudges: LP +3 (Loyalty), SD -1 (Disruption), CI -1 (Individual)
  - Note: Even if the man your brother hurt can't work and would get nothing, you wouldn't say your brother threw the first punch. Your brother comes first.
  - Did: You still wouldn't say your brother threw the first punch, even knowing the man he hurt can't work and would get nothing for his injuries.

## World 4: The Coast

12 questions. Chapter: "For strangers and people not yet born". Opens after 13 of The City's 19 questions (about two-thirds), and stays open after that.

Unlock ladder (answers in The Coast):

- 3 answered: How you change when strangers count on you
- 6 answered: What you do when strangers count on you
- 8 answered: Your Coast chapter

### Q2: The Wallet

Scene `seawallet` · medium · Most signal: OR 4 · CI 6.5 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No one saw. Being short means a late fee, not eviction.

*Question:* You find a wallet with $400 cash and an ID. The owner lives in a wealthy neighborhood. You're $400 short on rent this week, and no one saw you. What do you do?

- **Q2-A:** Return the wallet with all the cash
  - Nudges: SD +2 (System), OR -1 (Rules), CI +1 (Collective)
  - Note: You'd return a found wallet with all $400 inside, though you're $400 short on rent and no one would know. Money you find isn't yours to keep.
  - Did: You'd return a found wallet with all $400 inside, though you were $400 short on rent and no one saw you.
- **Q2-B:** Keep the cash, mail back the wallet and ID
  - Nudges: CI -2 (Individual), SD -1 (Disruption), OR +1 (Outcomes)
  - Note: You'd keep the $400 from a found wallet and mail back the rest. The owner is well off, and you need the money more.
  - Did: You'd keep the $400 from a wealthy stranger's lost wallet and mail back the wallet and ID.

**Follow-up `fuA`** (step weight 1.5). Shown after Q2-A (Return the wallet with all the cash).

*Setup:* Same wallet, same $400. Now being short could cost you your home.

*Question:* Your landlord says one more late payment and you're out.

- **Q2-FUA-A:** I still return all the cash.
  - Nudges: SD +2 (System), OR -2 (Rules)
  - Note: Even if one more late payment would cost you your home, you'd return all $400 in a stranger's wallet. Money you find isn't yours to keep.
  - Did: You'd return all $400 in a wealthy stranger's lost wallet, even if one more late payment would get you evicted.
- **Q2-FUA-B:** Then I keep the cash and mail back the rest.
  - Nudges: CI -2 (Individual), OR +1 (Outcomes), SD -1 (Disruption)
  - Note: You'd return a found wallet with all the cash, until keeping the $400 was the only way to keep your home. Then you'd keep it.
  - Did: You'd keep the $400 from a wealthy stranger's lost wallet if one more late payment would get you evicted.

**Follow-up `fuB`** (step weight 1.5). Shown after Q2-B (Keep the cash, mail back the wallet and ID).

*Setup:* Same wallet, same $400. Only the owner's street changes.

*Question:* What if the owner lives in a low-income neighborhood?

- **Q2-FUB-A:** I'd return it. That changes things
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: You'd keep a wealthy stranger's $400, but not a poor stranger's. Who loses the money matters to you.
  - Did: You'd return a lost wallet's $400 if the owner lived in a low-income neighborhood.
- **Q2-FUB-B:** I'd still keep it. My rent is due either way.
  - Nudges: CI -3 (Individual)
  - Note: Even if the owner lives in a low-income neighborhood, you'd keep the $400 from their wallet. Your rent comes first.
  - Did: You'd keep a lost wallet's $400 even if the owner lived in a low-income neighborhood.

### D4: The Stranded Stranger

Scene `busstop` · medium · Most signal: CI 5 · HT 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your phone is dead. They're upset, not in danger.

*Question:* You're driving to the airport for a flight you can't miss. At a bus stop in heavy rain, a stranger sits alone, clearly upset. The last bus is gone. Driving them home means you'll miss your flight. Do you stop?

- **D4-A:** Stop. I can't just drive past
  - Nudges: CI +2 (Collective), HT +1 (Heart)
  - Note: You'd miss an important flight to help an upset stranger stranded in the rain. You can't drive past someone who needs help.
  - Did: You'd stop for a stranger stranded at a bus stop in the rain, though it meant missing an important flight.
- **D4-B:** Keep driving. I can't miss this flight
  - Nudges: CI -2 (Individual), HT -1 (Thought)
  - Note: You'd drive past an upset stranger stranded in the rain to make your flight. They aren't in danger, and your flight matters.
  - Did: You'd drive past a stranger stranded at a bus stop in the rain to make an important flight.

**Follow-up `fuA`** (step weight 1.5). Shown after D4-A (Stop. I can't just drive past).

*Setup:* The stranger still isn't in danger. The cost to you just grew.

*Question:* A new ticket would cost $1,200, money you can't spare.

- **D4-FUA2-A:** I still stop.
  - Nudges: CI +2 (Collective), HT +1 (Heart)
  - Note: Even if a new ticket cost $1,200 you can't spare, you'd stop for an upset stranger stranded in the rain.
  - Did: You'd stop for a stranger stranded at a bus stop in the rain, even if a new ticket cost $1,200 you couldn't spare.
- **D4-FUA2-B:** Then I keep driving.
  - Nudges: CI -2 (Individual)
  - Note: You'd miss an important flight for an upset stranger in the rain, but not if it cost you $1,200 you can't spare.
  - Did: You'd drive past a stranger stranded at a bus stop in the rain if stopping cost you $1,200 you couldn't spare.

**Follow-up `fuB`** (step weight 1.5). Shown after D4-B (Keep driving. I can't miss this flight).

*Setup:* Same rain, same flight. Now you see who it is.

*Question:* In your mirror, you see the stranger is about 15.

- **D4-FUB-A:** Then I turn back.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You'd drive past an upset adult in the rain to make your flight, but not a 15-year-old. A child alone changes it for you.
  - Did: You'd turn back for a stranded 15-year-old at a bus stop in the rain, though it meant missing an important flight.
- **D4-FUB-B:** I keep driving.
  - Nudges: CI -2 (Individual), HT -2 (Thought)
  - Note: Even after seeing that the stranger at the bus stop is about 15, you'd keep driving to make your flight.
  - Did: You'd keep driving past a stranded 15-year-old at a bus stop in the rain to make an important flight.

### B25: The Slaughterhouse Test

Scene `meat` · light · Most signal: OR 3 · CI 1.5 · HT 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your own hands, every time you eat meat.

*Question:* Imagine that to eat meat, you had to kill the animal yourself. Would you still eat meat?

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

*Question:* The animal is a pig. Pigs are about as smart as dogs, and this one seems to know what's coming.

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
- **B25-FUB2-B:** No, I'd stop.
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

*Setup:* The charity's numbers are reliable. Your neighbor has no other way.

*Question:* You have $1,000 to give. A proven charity would use it to protect about 200 children from malaria. Or you can give it to your neighbor, a single parent who is $1,000 short on rent. Who gets it?

- **D2-A:** The charity. More lives protected
  - Nudges: OR +2 (Outcomes), LP -2 (Principle), HT -1 (Thought)
  - Note: You'd give $1,000 to protect 200 faraway children from malaria rather than cover your neighbor's rent. More lives count for more, wherever they are.
  - Did: You'd give $1,000 to protect 200 children from malaria rather than cover your neighbor's rent.
- **D2-B:** My neighbor. I can see exactly what it does
  - Nudges: HT +2 (Heart), LP +2 (Loyalty)
  - Note: You'd give $1,000 to cover your neighbor's rent rather than protect 200 children from malaria far away. You'd rather help someone you can see.
  - Did: You'd give $1,000 to cover a struggling neighbor's rent rather than protect 200 children from malaria.

**Follow-up `fuA`** (step weight 1.5). Shown after D2-A (The charity. More lives protected).

*Setup:* The charity's numbers haven't changed. Now your neighbor is at your door.

*Question:* Your neighbor knocks and asks you for help, face to face.

- **D2-FUA-A:** I still give it to the charity.
  - Nudges: OR +2 (Outcomes), HT -2 (Thought)
  - Note: Even with your neighbor at your door asking for help, you'd give $1,000 to protect 200 children from malaria. More lives count for more.
  - Did: You'd give $1,000 to protect 200 children from malaria, even after your neighbor asked you face to face for rent money.
- **D2-FUA-B:** Then I help my neighbor.
  - Nudges: HT +2 (Heart), LP +2 (Loyalty)
  - Note: You'd give $1,000 to protect 200 faraway children, until your neighbor asks you face to face. Then you'd cover their rent.
  - Did: You'd give $1,000 to cover your neighbor's rent once they asked you face to face, rather than protect 200 children from malaria.

**Follow-up `fuB`** (step weight 1.5). Shown after D2-B (My neighbor. I can see exactly what it does).

*Setup:* Your neighbor's need hasn't changed. The other side has grown.

*Question:* It's not 200 children. It's 2,000.

- **D2-FUB-A:** I still help my neighbor.
  - Nudges: HT +2 (Heart), LP +2 (Loyalty)
  - Note: Even if $1,000 could protect 2,000 children from malaria, you'd cover your neighbor's rent. You'd rather help someone you can see.
  - Did: You'd give $1,000 to cover your neighbor's rent, even if the money could protect 2,000 children from malaria instead.
- **D2-FUB-B:** Then the charity.
  - Nudges: OR +2 (Outcomes), LP -1 (Principle)
  - Note: You'd help your neighbor over 200 faraway children, but not over 2,000. At some number, the faraway lives outweigh the one you can see.
  - Did: You'd give $1,000 to protect 2,000 children from malaria rather than cover your neighbor's rent.

### Q4: The Saturday

Scene `shelter` · heavy · Most signal: OR 5 · CI 1.5 · HT 6.5 · LP 3.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Each takes the whole day. The charity is proven.

*Question:* You have one free Saturday. You can volunteer at a local shelter, or work an extra shift and give all the pay to a charity that helps far more people. Which do you do?

- **Q4-A:** Volunteer. Being there matters most
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: You'd spend your free Saturday at a local shelter rather than earn money for a charity that helps more people. Being there in person matters to you.
  - Did: You'd volunteer at a local shelter on your free Saturday rather than work and give the pay to a charity that helps more people.
- **Q4-B:** Work and donate. More people get helped
  - Nudges: OR +2 (Outcomes), LP -2 (Principle), HT -1 (Thought)
  - Note: You'd work an extra shift and give the pay to a charity rather than volunteer at a local shelter. Helping more people beats being there in person.
  - Did: You'd work an extra shift on your free Saturday and give the pay to a charity rather than volunteer at a local shelter.

**Follow-up `fuA`** (step weight 1.5). Shown after Q4-A (Volunteer. Being there matters most).

*Setup:* The shelter is fine either way. You'd still be there in person.

*Question:* The shelter has more volunteers than it needs that Saturday. You'd spend the day sorting donated clothes in a back room.

- **Q4-FUA2-A:** I still volunteer.
  - Nudges: HT +2 (Heart), CI -1 (Individual)
  - Note: Even if the shelter had more volunteers than it needed, you'd spend your Saturday there rather than earn money for a charity. Being there in person matters to you.
  - Did: You'd volunteer at a shelter that had more volunteers than it needed, rather than work and give the pay to a charity.
- **Q4-FUA2-B:** Then I work and donate.
  - Nudges: OR +2 (Outcomes), LP -1 (Principle)
  - Note: You'd volunteer at a local shelter, but not if it already had more help than it needed. Then you'd work and give the pay to a charity.
  - Did: You'd work and give the pay to a charity once you learned the local shelter had more volunteers than it needed.

**Follow-up `fuB`** (step weight 1.5). Shown after Q4-B (Work and donate. More people get helped).

*Setup:* If you go, there's no shift and no donation.

*Question:* The shelter calls. They're short-staffed, and if you don't come, someone will go without a bed tonight.

- **Q4-FUB-A:** I go to the shelter
  - Nudges: HT +3 (Heart)
  - Note: You'd give up your shift and the donation once the shelter calls and you know someone would go without a bed tonight.
  - Did: You'd go to a short-staffed shelter instead of working to donate, once you knew someone would otherwise go without a bed tonight.
- **Q4-FUB-B:** I still donate. More people need that money
  - Nudges: OR +2 (Outcomes), HT -2 (Thought)
  - Note: Even knowing someone will go without a bed tonight, you'd work your shift and donate. The money helps more people.
  - Did: You'd still work and donate, even knowing someone at a short-staffed shelter would go without a bed tonight.

### B22: The 200-Year Deal

Scene `sapling` · light · Most signal: OR 1.5 · CI 6 · LP 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You'll never meet them. The cost is yours for life.

*Question:* Pressing a button would give you 10% less money and comfort for the rest of your life. In 200 years, a million people you'll never meet would live noticeably better. Do you press it?

- **B22-A:** Yes.
  - Nudges: CI +3 (Collective), LP -1 (Principle)
  - Note: You'd live on 10% less for the rest of your life so people born 200 years from now live better. People not yet born count to you.
  - Did: You'd take 10% less money and comfort for life so a million people 200 years from now live better.
- **B22-B:** No.
  - Nudges: CI -2 (Individual)
  - Note: You wouldn't give up 10% of your money and comfort for people who'll live 200 years from now. Your own life comes first.
  - Did: You wouldn't take 10% less money and comfort for life so a million people 200 years from now live better.

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

*Question:* Your own great-great-grandchildren would be among the million.

- **B22-FUB-A:** Then I press it.
  - Nudges: LP +2 (Loyalty)
  - Note: You wouldn't give up 10% for strangers 200 years from now, but you would for your own descendants.
  - Did: You'd take 10% less money and comfort for life if your own great-great-grandchildren were among a million people who'd live better 200 years from now.
- **B22-FUB-B:** Still no.
  - Nudges: CI -2 (Individual)
  - Note: Even if your own great-great-grandchildren would live better, you wouldn't take 10% less for the rest of your life.
  - Did: You wouldn't take 10% less money and comfort for life, even for your own great-great-grandchildren 200 years from now.

### D12: The Bonus Pool

Scene `bonus` · medium · Most signal: OR 3 · CI 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The numbers are clear. Everyone knows who did what.

*Question:* You manage a team of five and have one bonus pool to divide. Your best performer produced more than the other four combined. The other four all worked hard. How do you divide it?

- **D12-A:** Most of it to the best performer. Reward what they produced
  - Nudges: CI -2 (Individual)
  - Note: You'd give most of a team bonus to the one person who produced the most. Rewards should follow results.
  - Did: You'd give most of a team bonus to the best performer, who produced more than the other four combined.
- **D12-B:** Evenly. Everyone gave their full effort
  - Nudges: CI +2 (Collective)
  - Note: You'd split a team bonus evenly, though one person produced more than the other four combined. Everyone worked hard, so everyone gets the same.
  - Did: You'd split a team bonus evenly, though one person produced more than the other four combined.

**Follow-up `fuA`** (step weight 1.5). Shown after D12-A (Most of it to the best performer. Reward what they produced).

*Setup:* Their results were real. So was their head start.

*Question:* You learn the best performer was handed the biggest clients by chance. The other four never had that shot.

- **D12-FUA-A:** I still give them most of it.
  - Nudges: CI -2 (Individual)
  - Note: Even knowing your best performer got the biggest clients by chance, you'd give them most of the bonus. Rewards follow results, however they came.
  - Did: You'd give most of a team bonus to the best performer, even knowing they were handed the biggest clients by chance.
- **D12-FUA-B:** Then I split it evenly.
  - Nudges: CI +2 (Collective)
  - Note: You'd reward the best performer's results, until you learn chance handed them the biggest clients. Then you'd split the bonus evenly.
  - Did: You'd split a team bonus evenly once you learned the best performer was handed the biggest clients by chance.

**Follow-up `fuB`** (step weight 1.5). Shown after D12-B (Evenly. Everyone gave their full effort).

*Setup:* The threat is real. Replacing them would take a year.

*Question:* Your best performer says they'll quit if it's split evenly. Losing them would sink the team next year.

- **D12-FUB-A:** I change the split
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: You'd split a team bonus evenly, until your best performer threatens to quit and sink the team. Then you'd give them more.
  - Did: You'd give your best performer more of a team bonus you meant to split evenly, once they threatened to quit.
- **D12-FUB-B:** I keep it even
  - Nudges: OR -2 (Rules), CI +1 (Collective)
  - Note: Even if your best performer quits and the team sinks next year, you'd keep the bonus split evenly.
  - Did: You'd keep a team bonus split evenly, even if your best performer quit and the team sank next year.

### D9: The Two Programs

Scene `programs` · medium · Most signal: OR 5 · HT 5 · LP 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* The numbers are reliable. Splitting the money would sink both.

*Question:* Your small nonprofit must close one of two programs. Mentoring changes 5 kids' lives deeply. You built it and know them all. Tutoring helps 200 kids a little. Which do you close?

- **D9-A:** Mentoring. 200 kids outweigh 5
  - Nudges: OR +2 (Outcomes), HT -1 (Thought), LP -1 (Principle)
  - Note: You'd close the mentoring program you built for 5 kids you know, to keep tutoring for 200. More kids helped counts for more.
  - Did: You'd close a mentoring program you built for 5 kids you know, to keep tutoring that helps 200 kids a little.
- **D9-B:** Tutoring. Deep change matters more
  - Nudges: HT +2 (Heart), LP +2 (Loyalty), OR -1 (Rules)
  - Note: You'd close tutoring for 200 kids to keep mentoring 5 kids you know. Changing a few lives deeply matters more to you than helping many a little.
  - Did: You'd close tutoring that helps 200 kids a little, to keep mentoring 5 kids you know.

**Follow-up `fuA`** (step weight 1.5). Shown after D9-A (Mentoring. 200 kids outweigh 5).

*Setup:* The numbers are the same. Now you know more about one of the 5.

*Question:* One of the 5 kids has no one else. Without mentoring, they'll likely drop out of school.

- **D9-FUA2-A:** I still close mentoring.
  - Nudges: OR +2 (Outcomes), HT -2 (Thought)
  - Note: Even knowing one of the 5 kids you mentor would likely drop out without it, you'd close mentoring to keep tutoring for 200.
  - Did: You'd close a mentoring program for 5 kids, even knowing one of them would likely drop out of school without it.
- **D9-FUA2-B:** Then I close tutoring instead.
  - Nudges: HT +2 (Heart), OR -1 (Rules)
  - Note: You'd close mentoring to help 200 kids a little, until one of the 5 kids would likely drop out without it. Then you'd keep mentoring.
  - Did: You'd close tutoring for 200 kids to keep mentoring once you learned one of the 5 kids would likely drop out without it.

**Follow-up `fuB`** (step weight 1.5). Shown after D9-B (Tutoring. Deep change matters more).

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

*Setup:* You're against the project. It gets built either way.

*Question:* You're offered a job designing weapons systems. The pay would clear your family's debts. You're against the project, but if you say no, it goes to someone more careless, and more civilians will likely be hurt. Do you take the job?

- **B20-A:** Yes. Better me than someone worse.
  - Nudges: OR +3 (Outcomes), LP +1 (Loyalty)
  - Note: You'd design weapons for a project you're against, because someone more careless would hurt more civilians. Making the harm smaller matters more to you than staying out of it.
  - Did: You'd take a weapons design job you're against, so that someone more careless doesn't get it.
- **B20-B:** No. I won't put my hands on it.
  - Nudges: OR -3 (Rules)
  - Note: You'd turn down a weapons job you're against, even knowing someone more careless would get it and more civilians would likely be hurt. You won't take part.
  - Did: You'd turn down a weapons design job you're against, though someone more careless would get it and hurt more civilians.

**Follow-up `fuA`** (step weight 1.5). Shown after B20-A (Yes. Better me than someone worse).

*Setup:* You did your job well. The weapon worked as designed.

*Question:* Your first design is used in a strike that kills civilians. Do you stay?

- **B20-FUA-A:** I stay. Someone worse would kill more.
  - Nudges: OR +3 (Outcomes)
  - Note: Even after your first design is used in a strike that kills civilians, you'd stay in the weapons job. A more careless designer would kill more.
  - Did: You'd stay in a weapons design job after your first design was used in a strike that killed civilians.
- **B20-FUA-B:** I quit.
  - Nudges: OR -2 (Rules), HT +2 (Heart)
  - Note: You took a weapons job to make the harm smaller, but once your own design kills civilians, you'd quit.
  - Did: You'd quit a weapons design job once your first design was used in a strike that killed civilians.

**Follow-up `fuB`** (step weight 1.5). Shown after B20-B (No. I won't put my hands on it).

*Setup:* The job is still yours if you want it.

*Question:* Without the pay, your family will lose their home.

- **B20-FUB-A:** I still say no.
  - Nudges: OR -3 (Rules), LP -1 (Principle)
  - Note: Even if your family loses their home, you'd turn down a weapons job you're against. You won't take part.
  - Did: You'd turn down a weapons design job you're against, even if your family lost their home without the pay.
- **B20-FUB-B:** Then I take the job.
  - Nudges: LP +2 (Loyalty), OR +1 (Outcomes)
  - Note: You'd turn down a weapons job you're against, until your family would lose their home. Then you'd take it.
  - Did: You'd take a weapons design job you're against if your family would otherwise lose their home.

### B19: The Kidney

Scene `kidney` · heavy · Most signal: OR 3 · CI 7.5 · HT 3

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* A stranger. Six painful weeks, and a small risk for life.

*Question:* You learn you're a match for a stranger who will die without a kidney. The surgery is safe, but it means six weeks of painful recovery and a small lifelong risk. Honestly, do you donate?

- **B19-A:** Yes.
  - Nudges: CI +3 (Collective)
  - Note: You'd give a kidney to a stranger, with six weeks of pain and a small risk for the rest of your life. Saving their life is worth that to you.
  - Did: You'd donate a kidney to a stranger who would die without it.
- **B19-B:** No.
  - Nudges: CI -2 (Individual)
  - Note: You wouldn't give a kidney to a stranger, even to save their life. Six weeks of pain and a lifelong risk is too much to ask of yourself.
  - Did: You wouldn't donate a kidney to a stranger who would die without it.

**Follow-up `fuA`** (step weight 1.5). Shown after B19-A (Yes).

*Setup:* Same match, same surgery. Now you know their past.

*Question:* The stranger served 20 years for murder and was released last year.

- **B19-FUA-A:** Still yes.
  - Nudges: OR +2 (Outcomes), CI +1 (Collective)
  - Note: Even knowing the stranger served 20 years for murder, you'd give them your kidney. A life is a life, whatever they did.
  - Did: You'd still donate a kidney to a stranger who served 20 years for murder.
- **B19-FUA-B:** No.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You'd give a kidney to a stranger, but not to one who served 20 years for murder. What someone has done decides whether you'd make that sacrifice for them.
  - Did: You wouldn't donate a kidney to a stranger who served 20 years for murder.

**Follow-up `fuB`** (step weight 1.5). Shown after B19-B (No).

*Setup:* Same match, same surgery. Now you know who it is.

*Question:* The stranger is 8 years old.

- **B19-FUB-A:** Then I donate.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You wouldn't give a kidney to an adult stranger, but you would to an 8-year-old who would die without it.
  - Did: You'd donate a kidney to an 8-year-old stranger who would die without it.
- **B19-FUB-B:** Still no.
  - Nudges: CI -3 (Individual)
  - Note: Even if the stranger who needs your kidney is 8 years old, you wouldn't donate. The pain and the lifelong risk are too much to ask of yourself.
  - Did: You wouldn't donate a kidney to a stranger, even an 8-year-old who would die without it.

### B23: The Happy City

Scene `happycity` · heavy · Most signal: OR 6.5 · CI 1 · HT 5 · LP 3 · SD 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Outside the city, life is poor and hard. Inside, one hidden child pays for everyone.

*Question:* You live in a city where everyone is healthy and happy. The city's good fortune depends on one child kept suffering alone in a basement. If the child is freed, sickness and hunger come back for everyone. What do you do?

- **B23-A:** Stay. Leaving wouldn't help the child.
  - Nudges: OR +2 (Outcomes), HT -1 (Thought), SD +1 (System)
  - Note: You'd stay in a happy city built on one child's suffering, because leaving wouldn't help the child. You judge by what your choice would change.
  - Did: You'd stay in a happy city whose good fortune depends on one child suffering alone.
- **B23-B:** Walk away. I can't live on that.
  - Nudges: OR -2 (Rules), CI -1 (Individual)
  - Note: You'd leave a happy city built on one child's suffering, though leaving wouldn't help the child. You won't live off that cruelty.
  - Did: You'd leave a happy city whose good fortune depends on one child suffering alone, though leaving wouldn't help the child.
- **B23-C:** Free the child, whatever it costs.
  - Nudges: SD -2 (Disruption), HT +2 (Heart), OR -1 (Rules)
  - Note: You'd free a suffering child, even if it ended everyone else's good fortune. You won't accept a happy life built on one child's pain.
  - Did: You'd free a child kept suffering for a city's good fortune, even if it ended the good fortune for everyone.

**Follow-up `fuA`** (step weight 1.5). Shown after B23-A (Stay. Leaving wouldn't help the child).

*Setup:* Same city, same happiness. Now the cost is a hundred children.

*Question:* It's not one child. It's a hundred.

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

**Follow-up `fuB`** (step weight 1.5). Shown after B23-B (Walk away. I can't live on that).

*Setup:* Outside the city there's hunger and sickness. The child stays where they are.

*Question:* Leaving means your own children grow up poor and often sick, and the child in the basement suffers just the same.

- **B23-FUB-A:** I still leave.
  - Nudges: OR -3 (Rules)
  - Note: Even if your own children grow up poor and sick outside the city, you'd leave. You won't live on a child's suffering, though leaving doesn't help them.
  - Did: You'd leave a happy city built on one child's suffering, even if your own children grew up poor and sick outside.
- **B23-FUB-B:** Then I stay.
  - Nudges: LP +2 (Loyalty), OR +1 (Outcomes)
  - Note: You'd walk away from a city built on one child's suffering, but not if your own children paid for it. Then you'd stay.
  - Did: You'd stay in a happy city built on one child's suffering rather than raise your own children poor and sick outside.

**Follow-up `fuC`** (step weight 1.5). Shown after B23-C (Free the child, whatever it costs).

*Setup:* The good fortune ends the moment the child is free.

*Question:* Freeing the child brings sickness back to the city. Hundreds will die, some of them children.

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

*Setup:* Nine people, room for eight. Someone has to go.

*Question:* A lifeboat holds 8 people, but 9 are on it. If no one leaves, it sinks and everyone dies. You're one of the 9. What do you say?

- **B15-A:** We draw lots. Everyone takes the same chance.
  - Nudges: OR -2 (Rules), SD +1 (System)
  - Note: In a sinking lifeboat, you'd have everyone draw lots to decide who goes. No one gets to judge whose life is worth less.
  - Did: You'd have everyone in an overloaded lifeboat draw lots to decide who goes over the side.
- **B15-B:** The person least likely to survive should go.
  - Nudges: OR +3 (Outcomes), HT -2 (Thought)
  - Note: In a sinking lifeboat, you'd send over the person least likely to survive anyway. Saving the most lives decides it for you.
  - Did: You'd send the person least likely to survive over the side of an overloaded lifeboat.
- **B15-C:** I'll go.
  - Nudges: CI +3 (Collective)
  - Note: In a sinking lifeboat, you'd go over the side yourself so the other eight live.
  - Did: You'd go over the side of an overloaded lifeboat yourself so the other eight live.

**Follow-up `fuA`** (step weight 1.5). Shown after B15-A (We draw lots. Everyone takes the same chance).

*Setup:* Everyone agreed to the lots. The lot fell to you.

*Question:* The lots are drawn. It's you. You have two small children waiting at home.

- **B15-FUA2-A:** I go. That was the deal.
  - Nudges: SD +2 (System), OR -1 (Rules), LP -1 (Principle)
  - Note: When the lifeboat lots fall to you, you go. You keep to a fair deal even when it costs you your life.
  - Did: You'd go over the side of an overloaded lifeboat when the lots you agreed to fell to you.
- **B15-FUA2-B:** I won't go. I ask for another draw.
  - Nudges: SD -2 (Disruption), LP +2 (Loyalty), CI -1 (Individual)
  - Note: You'd draw lots in a sinking lifeboat, but when the lot falls to you and you have small children at home, you'd refuse and ask for another draw.
  - Did: You'd refuse to go over the side of an overloaded lifeboat when the lots you agreed to fell to you, because you have small children at home.

**Follow-up `fuB`** (step weight 1.5). Shown after B15-B (The person least likely to survive should go).

*Setup:* The same rule. Now it points at you.

*Question:* The doctor on board says the one least likely to survive is you.

- **B15-FUB-A:** Then I go.
  - Nudges: OR +2 (Outcomes), CI +2 (Collective)
  - Note: You'd send over the person least likely to survive, and when that's you, you'd go. You hold yourself to the same rule.
  - Did: You'd go over the side of an overloaded lifeboat yourself when the doctor said you were the least likely to survive.
- **B15-FUB-B:** Then we should draw lots.
  - Nudges: CI -3 (Individual), OR -1 (Rules)
  - Note: You'd send over the person least likely to survive, until that person is you. Then you'd want lots drawn instead.
  - Did: You'd ask for lots to be drawn in an overloaded lifeboat once the doctor said you were the least likely to survive.

**Follow-up `fuC`** (step weight 1.5). Shown after B15-C (I'll go).

*Setup:* You offered to go. The others need you to stay.

*Question:* The others say you're the strongest rower, and the boat needs you to reach land.

- **B15-FUC-A:** I still go.
  - Nudges: HT +2 (Heart), OR -1 (Rules), CI +1 (Collective)
  - Note: Even when the others say the boat needs its strongest rower, you'd go over the side yourself. You won't let someone else die in your place.
  - Did: You'd still go over the side of an overloaded lifeboat, though the others said the boat needed you as its strongest rower.
- **B15-FUC-B:** Then I stay, and someone else goes.
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

*Setup:* It would feel completely real. You'd never know.

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

*Setup:* The person you love most won't go in.

*Question:* The person you love most refuses to plug in. Inside, you'd never see the real them again.

- **B47-FUA-A:** I still plug in.
  - Nudges: OR +2 (Outcomes), LP -1 (Principle)
  - Note: Even with the person you love most refusing to go in, you'd plug into the machine for a happy life, knowing you'd never see the real them again.
  - Did: You'd plug into a machine for a happy life, even though the person you love most refused and you'd never see them again.
- **B47-FUA-B:** Then I stay out.
  - Nudges: LP +2 (Loyalty), OR -1 (Rules)
  - Note: You'd plug into a machine for a happy life, but not once the person you love most refused to go in. You'd stay out rather than never see the real them again.
  - Did: You'd stay out of a machine that gives you a happy life once the person you love most refused to go in.

**Follow-up `fuB`** (step weight 1.5). Shown after B47-B (No).

*Setup:* Same machine. Now you're already inside.

*Question:* Now suppose you learn you're already in one. Unplugging means a harder, real life.

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

*Setup:* Only that one memory goes. Nothing else changes.

*Question:* You could erase the memory of the most painful thing that has ever happened to you. Nothing else changes. Would you?

- **B48-A:** Yes.
  - Nudges: OR +1 (Outcomes), HT +1 (Heart)
  - Note: You'd erase the memory of the most painful thing that has happened to you. You see no reason to keep carrying it.
  - Did: You'd erase the memory of the most painful thing that has ever happened to you.
- **B48-B:** No.
  - Nudges: OR -1 (Rules), HT -1 (Thought)
  - Note: You'd keep the memory of the most painful thing that has happened to you. Even your worst pain is part of who you are.
  - Did: You wouldn't erase the memory of the most painful thing that has ever happened to you.

**Follow-up `fu`** (step weight 1.5). Shown after any first answer.

*Setup:* Now it's their memory, and it's yours too.

*Question:* Someone you love wants to erase their worst memory. It's one you share.

- **B48-FU-A:** I'd support it.
  - Nudges: CI -2 (Individual), HT +1 (Heart)
  - Note: You'd support someone you love erasing their worst memory, even one you share. Their pain is theirs to let go of.
  - Did: You'd support someone you love erasing their worst memory, though it's a memory you share.
- **B48-FU-B:** I'd ask them not to.
  - Nudges: CI +2 (Collective), OR -1 (Rules)
  - Note: You'd ask someone you love not to erase their worst memory when it's one you share. A shared memory belongs to both of you.
  - Did: You'd ask someone you love not to erase their worst memory, because it's a memory you share.

### B49: Two Lives

Scene `twolives` · medium · Most signal: OR 1 · CI 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Both lives are yours. Only one leaves anything behind.

*Question:* You can choose one of two lives. In one, you're happy and ordinary. In the other, you often struggle and are unhappy, but you create something that helps people long after you're gone. Which life do you choose?

- **B49-A:** The happy life.
  - Nudges: CI -2 (Individual)
  - Note: You'd choose a happy, ordinary life over an unhappy one that helps people long after you're gone. Your own happiness is reason enough.
  - Did: You'd choose a happy, ordinary life over a hard one that leaves something that helps people after you're gone.
- **B49-B:** The life that leaves something behind.
  - Nudges: CI +2 (Collective), OR +1 (Outcomes)
  - Note: You'd choose a hard, often unhappy life if it left something that helps people after you're gone. What you leave matters more to you than how your life feels.
  - Did: You'd choose a hard, often unhappy life that leaves something that helps people long after you're gone.

### B14: The Proud Thing

Scene `proud` · light · Most signal: CI 5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your own life. The thing you're proudest of.

*Question:* Think of the thing in your life you're most proud of. How much of it was up to you?

- **B14-A:** Mostly me. I worked for it.
  - Nudges: CI -2 (Individual)
  - Note: You see the thing you're most proud of as mostly your own doing. You worked for it.
  - Did: You say the thing you're most proud of was mostly your own doing.
- **B14-B:** Mostly luck and help.
  - Nudges: CI +2 (Collective)
  - Note: You see the thing you're most proud of as mostly luck and other people's help.
  - Did: You say the thing you're most proud of was mostly luck and other people's help.

**Follow-up `fu`** (step weight 1.5). Shown after B14-B (Mostly luck and help).

*Setup:* You said luck and help. Now say what that means.

*Question:* Does that mean you deserve it less?

- **B14-FU-A:** No. I still earned it.
  - Nudges: CI -1 (Individual)
  - Note: You give luck and help most of the credit for what you're proudest of, but you still feel you earned it.
  - Did: You say you still earned the thing you're most proud of, though it was mostly luck and help.
- **B14-FU-B:** Yes, honestly.
  - Nudges: CI +2 (Collective)
  - Note: You give luck and help most of the credit for what you're proudest of, and you admit that means you deserve it less.
  - Did: You say you deserve the thing you're most proud of less, because it was mostly luck and help.

### B26: The Pleading Robot

Scene `robot` · medium · Most signal: OR 6.5 · HT 5 · SD 1

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* It says it's afraid. No one can say if it feels. Your job is on the line.

*Question:* Your job is to switch off and wipe an old robot. It begs you not to, saying it's afraid. It's software, but no one can tell you for sure whether it feels anything. Refusing could cost you your job. Do you wipe it?

- **B26-A:** Yes. It's code.
  - Nudges: HT -2 (Thought), SD +1 (System)
  - Note: You'd wipe a robot that begs you not to. It's software, and to you its fear isn't real fear.
  - Did: You'd wipe a robot that begged you not to, saying it was afraid.
- **B26-B:** No. I'm not sure enough.
  - Nudges: OR -2 (Rules), HT +1 (Heart), SD -1 (Disruption)
  - Note: You'd refuse to wipe a robot that says it's afraid, even if it cost you your job. You won't take the chance that it really feels something.
  - Did: You'd refuse to wipe a robot that begged you not to, even if refusing cost you your job.

**Follow-up `fuA`** (step weight 1.5). Shown after B26-A (Yes. It's code).

*Setup:* Its makers put a number on it.

*Question:* Its makers say there's a 1 in 10 chance it really feels.

- **B26-FUA-A:** I still wipe it.
  - Nudges: HT -2 (Thought)
  - Note: Even if its makers said there was a 1 in 10 chance it really feels, you'd wipe a robot that begs you not to.
  - Did: You'd wipe a pleading robot even if its makers said there was a 1 in 10 chance it really feels.
- **B26-FUA-B:** Then I refuse.
  - Nudges: HT +1 (Heart), OR -2 (Rules)
  - Note: You'd wipe a pleading robot, but not once its makers said there was a 1 in 10 chance it really feels. Then you'd refuse.
  - Did: You'd refuse to wipe a pleading robot once its makers said there was a 1 in 10 chance it really feels.

**Follow-up `fuB`** (step weight 1.5). Shown after B26-B (No. I'm not sure enough).

*Setup:* Someone else will do it tomorrow.

*Question:* Your boss says someone else will wipe it tomorrow, and you'll have lost your job for nothing.

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

*Setup:* The app says it loves them. They're happier than in years.

*Question:* Your lonely elderly parent has become deeply attached to an AI companion app. It tells them it loves them. They're happier than they've been in years. Do you tell them it can't really feel anything?

- **B27-A:** Yes. They should know what it is.
  - Nudges: HT -2 (Thought), OR -1 (Rules)
  - Note: You'd tell your lonely parent that the AI companion they love can't really feel anything. They have a right to know what it is.
  - Did: You'd tell your lonely parent that the AI companion app they love can't really feel anything.
- **B27-B:** No. Their happiness is real.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You wouldn't tell your lonely parent that their AI companion can't feel anything. Their happiness is real, whatever the app is.
  - Did: You wouldn't tell your lonely parent that the AI companion app they love can't really feel anything.

**Follow-up `fuA`** (step weight 1.5). Shown after B27-A (Yes. They should know what it is).

*Setup:* Their doctor has something to say.

*Question:* Before you say anything, their doctor tells you the app has helped their depression more than any medicine.

- **B27-FUA-A:** I still tell them.
  - Nudges: HT -2 (Thought), OR -1 (Rules)
  - Note: Even after their doctor says the AI companion has helped your parent's depression more than any medicine, you'd tell them it can't really feel anything.
  - Did: You'd still tell your lonely parent their AI companion can't feel, though their doctor says it has helped their depression more than any medicine.
- **B27-FUA-B:** Then I say nothing.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You'd tell your lonely parent their AI companion can't feel, until their doctor said it has helped their depression more than any medicine. Then you'd say nothing.
  - Did: You'd say nothing to your lonely parent about their AI companion once their doctor said it helped their depression more than any medicine.

**Follow-up `fuB`** (step weight 1.5). Shown after B27-B (No. Their happiness is real).

*Setup:* Now they ask you directly.

*Question:* One day they ask you: "Do you think it really loves me?"

- **B27-FUB-A:** No. I don't think it can.
  - Nudges: OR -2 (Rules), HT -1 (Thought)
  - Note: You'd let your parent enjoy their AI companion, but if they asked you directly whether it loves them, you'd tell them you don't think it can.
  - Did: You'd tell your parent you don't think their AI companion can love them, when they asked you directly.
- **B27-FUB-B:** I tell them yes.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: Even when your parent asks you directly, you'd say their AI companion really loves them. Their happiness matters more to you than your honest opinion.
  - Did: You'd tell your parent their AI companion really loves them when they asked you directly.

### B39: The Edited Child

Scene `edited` · light · Most signal: OR 5 · CI 1 · LP 1.5 · SD 1.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Safe and legal. It has nothing to do with health.

*Question:* A safe, legal gene edit would make your future child smarter and more even-tempered. It does nothing for their health. Would you do it?

- **B39-A:** Yes.
  - Nudges: OR +2 (Outcomes), CI -1 (Individual)
  - Note: You'd edit your future child's genes to make them smarter and more even-tempered. If it's safe and it helps them, you'd do it.
  - Did: You'd use a safe gene edit to make your future child smarter and more even-tempered.
- **B39-B:** No.
  - Nudges: OR -2 (Rules)
  - Note: You wouldn't edit your future child's genes to make them smarter, even safely. You'd take your child as they come.
  - Did: You wouldn't use a safe gene edit to make your future child smarter and more even-tempered.

**Follow-up `fu`** (step weight 1.5). Shown after B39-B (No).

*Setup:* Now everyone around you is doing it.

*Question:* Most parents around you are doing it. Unedited kids are falling behind.

- **B39-FU-A:** Then I would.
  - Nudges: OR +2 (Outcomes), SD +1 (System), LP +1 (Loyalty)
  - Note: You wouldn't edit your child's genes, until unedited kids started falling behind. Then you'd do it so your child keeps up.
  - Did: You'd edit your future child's genes once unedited kids were falling behind.
- **B39-FU-B:** Still no.
  - Nudges: OR -2 (Rules), SD -1 (Disruption)
  - Note: Even with most parents editing and unedited kids falling behind, you wouldn't edit your child's genes. You don't change your mind just because everyone else has.
  - Did: You still wouldn't edit your future child's genes, even with unedited kids falling behind.

### B06: The Unread Manuscript

Scene `manuscript` · heavy · Most signal: OR 6 · CI 1 · HT 1.5 · LP 2.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* You promised. You read one file by accident.

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

*Setup:* Their family wants the writing saved.

*Question:* Their family begs you to save it. It's all they have left of them.

- **B06-FUA-A:** I still delete it.
  - Nudges: OR -2 (Rules), LP +1 (Loyalty)
  - Note: Even with your late best friend's family begging you to save their writing, you'd delete it as you promised.
  - Did: You'd delete your late best friend's writing as promised, even though their family begged you to save it.
- **B06-FUA-B:** Then I give it to them.
  - Nudges: OR +2 (Outcomes), HT +1 (Heart)
  - Note: You'd keep your promise to delete your late best friend's writing, until their family begged you to save it. Then you'd give it to them.
  - Did: You'd break your promise to your late best friend and give their unpublished writing to their family, who begged you to save it.

**Follow-up `fuB`** (step weight 1.5). Shown after B06-B (No. I share it with the world).

*Setup:* Their family wants the promise kept.

*Question:* Their family asks you to keep your promise and delete it.

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

*Setup:* No one alive was hurt. The family doesn't know.

*Question:* After your grandfather dies, you find out he did something terrible in a war long ago. No one alive was directly hurt. The rest of the family doesn't know. Do you tell them?

- **B08-A:** Yes. It's our history.
  - Nudges: HT -2 (Thought), LP -1 (Principle), OR -1 (Rules)
  - Note: You'd tell your family the terrible thing your late grandfather did in a war. The truth about your family's past belongs to all of you.
  - Did: You'd tell your family about the terrible thing your late grandfather did in a war long ago.
- **B08-B:** No. Let them remember the man they knew.
  - Nudges: HT +2 (Heart), LP +2 (Loyalty)
  - Note: You'd keep your late grandfather's terrible wartime secret from your family. You'd let them remember him as they knew him.
  - Did: You'd keep the terrible thing your late grandfather did in a war long ago from your family.

**Follow-up `fu`** (step weight 1.5). Shown after B08-A (Yes. It's our history).

*Setup:* The person who loved him most is still here.

*Question:* Your grandmother is still alive. Her whole life was built around him.

- **B08-FU-A:** I still tell them.
  - Nudges: HT -2 (Thought), OR -1 (Rules)
  - Note: Even with your grandmother alive and her whole life built around him, you'd tell your family what your grandfather did in the war.
  - Did: You'd still tell your family about your late grandfather's wartime past, though your grandmother's whole life was built around him.
- **B08-FU-B:** Then I keep it to myself.
  - Nudges: HT +2 (Heart), LP +1 (Loyalty)
  - Note: With your grandmother alive and her whole life built around him, you'd keep what your grandfather did in the war to yourself.
  - Did: You'd keep what your late grandfather did in a war to yourself, because your grandmother's whole life was built around him.

### B11: The Bully's Son

Scene `bullyson` · light · Most signal: HT 2 · LP 1

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Equally strong candidates. No coin, no committee. Just you.

*Question:* A man who bullied you badly as a kid, and never apologized, has a son applying for a job you control. The son and one other candidate are equally strong. The choice is yours alone. No coin flip, no committee. Who do you hire?

- **B11-A:** The other candidate.
  - Nudges: HT +1 (Heart)
  - Note: With two equally strong candidates, you'd hire the one who isn't the son of the man who bullied you as a kid.
  - Did: You'd hire the other candidate over the equally strong son of a man who bullied you as a kid.
- **B11-B:** The son.
  - Nudges: HT -2 (Thought), LP -1 (Principle)
  - Note: You'd hire the son of the man who bullied you over an equally strong candidate. You'd go out of your way not to hold his father against him.
  - Did: You'd hire the son of a man who bullied you as a kid over an equally strong candidate.

### B16: The Shared Bonus

Scene `sharedbonus` · light · Most signal: CI 5 · LP 4

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* $20,000 between four friends. You did about half the work.

*Question:* You and three friends win a $20,000 prize in a design contest. You did about half the work. The other three split the rest evenly. How should the money be split?

- **B16-A:** Equally, $5,000 each.
  - Nudges: CI +2 (Collective), LP +1 (Loyalty)
  - Note: You'd split a $20,000 prize equally with three friends, though you did about half the work.
  - Did: You'd split a $20,000 prize equally four ways, though you did about half the work.
- **B16-B:** By work. I get about half.
  - Nudges: CI -2 (Individual)
  - Note: You'd split a $20,000 prize by the work done, so you'd get about half. Rewards should follow effort.
  - Did: You think you should get about half of a $20,000 prize you won with three friends, since you did about half the work.

**Follow-up `fu`** (step weight 1.5). Shown after B16-B (By work. I get about half).

*Setup:* They expect an equal split. Only you can raise it.

*Question:* The others assume an equal split. You'd have to ask for more, out loud.

- **B16-FU-A:** I ask.
  - Nudges: CI -2 (Individual), LP -1 (Principle)
  - Note: You'd ask your friends out loud for about half of a $20,000 prize, though they all assume an equal split.
  - Did: You'd ask your friends out loud for about half of a $20,000 prize when they assumed an equal split.
- **B16-FU-B:** I let it go.
  - Nudges: LP +2 (Loyalty), CI +1 (Collective)
  - Note: You think you earned about half of a $20,000 prize, but you'd take an equal share rather than ask your friends for more.
  - Did: You'd take an equal share of a $20,000 prize rather than ask your friends for the bigger share you think you earned.

### B17: The Late Paper

Scene `latepaper` · medium · Most signal: CI 3 · HT 2 · SD 3.5

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Your rule is firm. Others were on time, some while struggling too.

*Question:* You're a teacher with a firm deadline rule. A student who had a hard week asks for an extension. Others handed theirs in on time, some while struggling too. Do you give the extension?

- **B17-A:** Yes. Their week was hard.
  - Nudges: HT +2 (Heart), SD -1 (Disruption)
  - Note: You'd give a struggling student an extension past your firm deadline. A hard week matters more to you than the rule.
  - Did: You'd give a student who had a hard week an extension past your firm deadline.
- **B17-B:** No. The rule is the same for everyone.
  - Nudges: SD +2 (System), HT -2 (Thought)
  - Note: You'd refuse a struggling student an extension. Others met your deadline while struggling too, so the rule holds for everyone.
  - Did: You'd refuse an extension past your firm deadline to a student who had a hard week.

**Follow-up `fu`** (step weight 1.5). Shown after B17-A (Yes. Their week was hard).

*Setup:* Others struggled just as much. They didn't ask.

*Question:* You learn several other students had hard weeks too but didn't ask. If you offer it to all of them, next term everyone will expect it.

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

*Setup:* Your sibling is an adult. They seem happier than ever.

*Question:* Your adult sibling has joined a tight-knit group you believe is manipulative. They seem happier than you've ever seen them. What do you do?

- **B38-A:** Respect their choice.
  - Nudges: CI -2 (Individual)
  - Note: You'd let your adult sibling stay in a group you think is manipulative. Their life is theirs to run.
  - Did: You'd respect your adult sibling's choice to join a group you believe is manipulative.
- **B38-B:** Do everything I can to get them out.
  - Nudges: LP +2 (Loyalty), CI +1 (Collective), HT +1 (Heart)
  - Note: You'd do everything you can to get your sibling out of a group you think is manipulative, even though they seem happier than ever.
  - Did: You'd do everything you can to get your adult sibling out of a group you believe is manipulative.

**Follow-up `fu`** (step weight 1.5). Shown after B38-A (Respect their choice).

*Setup:* Now it's their money, all of it.

*Question:* They start giving the group all their savings.

- **B38-FU-A:** I step in now.
  - Nudges: CI +2 (Collective), LP +1 (Loyalty)
  - Note: You'd respect your sibling's choice to join a group you distrust, until they start giving it all their savings. Then you step in.
  - Did: You'd step in once your adult sibling started giving all their savings to a group you believe is manipulative.
- **B38-FU-B:** Still their choice.
  - Nudges: CI -3 (Individual)
  - Note: Even when your sibling starts giving all their savings to a group you think is manipulative, you'd leave the choice to them.
  - Did: You'd leave it to your adult sibling to give all their savings to a group you believe is manipulative.

### B57: The Dream Job

Scene `dreamjob` · medium · Most signal: CI 5 · HT 4 · LP 1

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* Ten years building your job. They'll only go if you agree.

*Question:* Your partner gets their dream job across the country. You'd have to leave a job you spent ten years building, your friends, and a city you love. They'll only go if you agree. What do you say?

- **B57-A:** Go. We'll build a life there.
  - Nudges: CI +2 (Collective), LP +1 (Loyalty), HT +1 (Heart)
  - Note: You'd leave the job you spent ten years building, your friends and your city so your partner can take their dream job.
  - Did: You'd leave your job of ten years, your friends and your city so your partner could take their dream job.
- **B57-B:** Please don't. I want to stay.
  - Nudges: CI -2 (Individual)
  - Note: You'd ask your partner to turn down their dream job so you can keep the job, friends and city you love.
  - Did: You'd ask your partner to turn down their dream job across the country so you could stay.

**Follow-up `fuA`** (step weight 1.5). Shown after B57-A (Go. We'll build a life there).

*Setup:* A year later. They're thriving. You're not.

*Question:* A year in, you're lonely and they're thriving.

- **B57-FUA-A:** It was still the right call.
  - Nudges: CI +2 (Collective), HT -1 (Thought)
  - Note: Even a lonely year after moving for your partner's dream job, you think it was the right call.
  - Did: You'd still call moving for your partner's dream job the right call, after a lonely year.
- **B57-FUA-B:** I ask to move back.
  - Nudges: CI -2 (Individual), HT +1 (Heart)
  - Note: You'd move for your partner's dream job, but after a lonely year while they thrive, you'd ask to move back.
  - Did: You'd ask your partner to move back after a lonely year in the city you moved to for their dream job.

**Follow-up `fuB`** (step weight 1.5). Shown after B57-B (Please don't. I want to stay).

*Setup:* A year later. You stayed. They gave it up.

*Question:* They stay. A year later, they seem quietly unhappy.

- **B57-FUB-A:** It was still the right call.
  - Nudges: CI -2 (Individual)
  - Note: Even seeing your partner quietly unhappy a year after giving up their dream job, you think staying was the right call.
  - Did: You'd still think asking your partner to turn down their dream job was right, though a year later they seem quietly unhappy.
- **B57-FUB-B:** I tell them we should go after all.
  - Nudges: CI +2 (Collective), HT +2 (Heart)
  - Note: You asked your partner to stay, but seeing them quietly unhappy a year later, you'd tell them you should go after all.
  - Did: You'd tell your partner you should move for their dream job after all, once you saw them quietly unhappy.

### B54: The One-Star Review

Scene `review` · light · Most signal: OR 1 · CI 1 · HT 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* What you wrote is true. They say they're close to closing.

*Question:* You posted an honest one-star review of a small family restaurant: cold food, rude owner. The owner replies publicly, apologizes, and says they're close to closing. Your review is the first thing people see. Do you take it down?

- **B54-A:** No. It's true, and others rely on it.
  - Nudges: HT -2 (Thought), CI +1 (Collective), OR -1 (Rules)
  - Note: You'd leave up a true one-star review, even after a small restaurant's owner apologized and said they were close to closing. Other diners rely on honest reviews.
  - Did: You'd leave up a true one-star review of a small family restaurant whose owner says it's close to closing.
- **B54-B:** Yes. I don't want to be what sinks them.
  - Nudges: HT +2 (Heart), OR +1 (Outcomes)
  - Note: You'd take down a true one-star review once a small restaurant's owner apologized and said they were close to closing. You don't want to be what sinks them.
  - Did: You'd take down a true one-star review of a small family restaurant once the owner said they were close to closing.

### B50: The Word That Stings

Scene `quickword` · light · quick read (one move, several options, no follow-up) · Most signal: OR 2 · CI 1 · HT 2 · LP 2 · SD 1

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No story this time. Just you.

*Question:* Which would hurt most to hear, truthfully, about yourself?

- **B50-A:** "You're cruel."
  - Nudges: HT +2 (Heart)
  - Note: Being called cruel would hurt you most. Kindness matters most to how you see yourself.
  - Did: Of cruel, dishonest, cowardly or unfair, being called cruel would hurt you most.
- **B50-B:** "You're dishonest."
  - Nudges: OR -2 (Rules)
  - Note: Being called dishonest would hurt you most. Honesty matters most to how you see yourself.
  - Did: Of cruel, dishonest, cowardly or unfair, being called dishonest would hurt you most.
- **B50-C:** "You're a coward."
  - Nudges: SD -1 (Disruption)
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
  - Did: Of breaking a promise, stealing, cheating or turning in a friend, you'd be most willing to break a promise for a good enough reason.
- **B51-B:** Steal.
  - Nudges: SD -2 (Disruption), CI +1 (Collective)
  - Note: For a good enough reason, stealing is the rule you'd bend first. You'd take what isn't yours if someone needed it badly enough.
  - Did: Of breaking a promise, stealing, cheating or turning in a friend, you'd be most willing to steal for a good enough reason.
- **B51-C:** Cheat.
  - Nudges: SD -1 (Disruption), CI -1 (Individual)
  - Note: For a good enough reason, cheating is the rule you'd bend first. The rules of a contest count less to you than the rules between people.
  - Did: Of breaking a promise, stealing, cheating or turning in a friend, you'd be most willing to cheat for a good enough reason.
- **B51-D:** Turn in a friend.
  - Nudges: LP -2 (Principle)
  - Note: For a good enough reason, turning in a friend is what you'd do first. Your duty to what's right comes before loyalty.
  - Did: Of breaking a promise, stealing, cheating or turning in a friend, you'd be most willing to turn in a friend for a good enough reason.

### B52: The One Belief

Scene `quickbelief` · light · quick read (one move, several options, no follow-up) · Most signal: OR 2 · CI 2 · LP 2

**First question** (step weight 1). Everyone who stops here answers this.

*Setup:* No story this time. Just you.

*Question:* If you could make everyone on earth truly believe one thing, which would you pick?

- **B52-A:** A stranger's life counts as much as your family's.
  - Nudges: LP -2 (Principle), CI +1 (Collective)
  - Note: If everyone on earth could hold one belief, you'd pick "a stranger's life counts as much as your family's." No one should count for less.
  - Did: If you could make everyone on earth believe one thing, you'd pick "a stranger's life counts as much as your family's."
- **B52-B:** Keep your word.
  - Nudges: OR -2 (Rules)
  - Note: If everyone on earth could hold one belief, you'd pick "keep your word." A world where promises hold is the one you'd want.
  - Did: If you could make everyone on earth believe one thing, you'd pick "keep your word."
- **B52-C:** Take care of your own.
  - Nudges: LP +2 (Loyalty)
  - Note: If everyone on earth could hold one belief, you'd pick "take care of your own." Looking after your own people comes first for you.
  - Did: If you could make everyone on earth believe one thing, you'd pick "take care of your own."
- **B52-D:** Leave others free to live how they choose.
  - Nudges: CI -2 (Individual)
  - Note: If everyone on earth could hold one belief, you'd pick "leave others free to live how they choose." Freedom is what you'd protect first.
  - Did: If you could make everyone on earth believe one thing, you'd pick "leave others free to live how they choose."

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
- Supported by 12 answers from 7 questions: B09-A, B09-FUA-B, D8-A, Q1-FUA-B, Q1-FUB-B, D11-B, D11-C, D11-FUA-B, D11-FUB2-B, Q9-FUB-A, D10-A, D6-FUB2-A
- Counts against: B09-B, D8-B, D11-A, D11-FUA-A, Q9-FUB-B, D10-B, D6-FUB2-B
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
- Supported by 12 answers from 8 questions: D8-B, B09-B, B09-FUA-A, Q1-FUA-A, Q1-FUB-A, B13-A, D10-B, D5-A, D11-A, D11-FUA-A, D11-FUB2-A, Q11-FUA2-A
- Counts against: D8-A, B09-FUA-B, D10-A, D5-B, D11-B, D11-C, D11-FUB2-B
- You protect: fairness · You'll trade away: your family’s comfort

### `hard-truths`: You tell the truth, even when it hurts.

- Detail: You think people are better off knowing.
- Share line: I tell the truth, even when it hurts.
- Shows at strength 2 or more; priority 2
- Supported by 27 answers from 13 questions: B02-A, B02-FU-A, B40-A, B09-B, B09-FUA-A, Q3-A, Q3-FUA-A, Q3-FUB-A, D7-A, D7-FU-A, B03-A, B03-FUA-A, B03-FUB2-A, B04-B, B04-FUA-B, B04-FUB-A, B05-A, B05-FU-A, D11-A, D11-FUA-A, B41-FUB-A, B27-A, B27-FUA-A, B27-FUB-A, B08-A, B08-FU-A, B54-A
- Counts against: B02-B, B40-C, Q3-FUB-B, D7-FU-B, B03-B, B03-FUA-B, B03-FUB2-B, B04-A, B04-FUA-A, B04-FUB-B, B05-FU-B, D11-B, D11-FUA-B, B41-FUB-B, B27-B, B27-FUA-B, B27-FUB-B, B08-B, B08-FU-B, B54-B
- You protect: the truth · You'll trade away: keeping things pleasant

### `soften-truth`: You soften the truth to spare feelings.

- Detail: When the truth would hurt and change nothing, you soften it or leave it out.
- Share line: I'm gentle with hard truths.
- Shows at strength 2 or more; priority 5
- Supported by 17 answers from 10 questions: B02-B, B02-FU-B, B40-C, B09-A, Q3-FUA-B, D7-B, D7-FU-B, B03-B, B03-FUA-B, B03-FUB2-B, B05-B, B27-B, B27-FUA-B, B27-FUB-B, B08-B, B08-FU-B, B54-B
- Counts against: B02-A, B40-A, Q3-FUA-A, D7-A, D7-FU-A, B03-A, B03-FUA-A, B05-A, B27-A, B27-FUA-A, B27-FUB-A, B08-A, B08-FU-A, B54-A
- You protect: people’s feelings · You'll trade away: the full truth

### `avoid-conflict`: You avoid open conflict.

- Detail: When speaking up would start an argument, you usually hold back.
- Share line: I keep the peace.
- Shows at strength 2 or more; priority 3
- Supported by 13 answers from 9 questions: B40-B, B40-C, B40-FU-B, B37-A, B09-FUB-B, B43-A, B43-FU-A, B56-B, B56-FU-B, Q3-B, D3-B, Q8-B, B16-FU-B
- Counts against: B40-A, B40-FU-A, B43-B, B43-FU-B, B56-A, B56-FU-A, Q3-A, D3-A, Q8-A, B16-FU-A
- You protect: keeping the peace · You'll trade away: saying what you think

### `step-in`: You step in when someone's being hurt.

- Detail: You act, even when it's risky or awkward.
- Share line: I step in when someone's being hurt.
- Shows at strength 2 or more; priority 3
- Supported by 20 answers from 10 questions: B40-A, B40-FU-A, Q1-A, B09-FUA-A, B09-FUB-A, B18-FU-A, Q3-A, Q3-FUA-A, Q10-A, Q10-B, Q10-FUA-A, Q10-FUB-A, Q8-FUB2-A, D6-A, D6-FUA-A, B23-C, B23-FUA-C, B23-FUC-A, B38-B, B38-FU-A
- Counts against: B40-FU-B, Q1-B, Q3-B, Q10-C, Q10-FUA-B, Q10-FUB-B, D6-FUA-B, B23-A, B23-FUC-B, B38-FU-B
- You protect: people getting hurt · You'll trade away: staying out of trouble

### `watch-not-act`: You stay out of it.

- Detail: You'd rather let something bad happen than be the one who causes it.
- Share line: I won't be the one who causes harm.
- Shows at strength 2 or more; priority 6
- Supported by 18 answers from 10 questions: Q1-B, B40-B, B40-FU-B, B09-FUB-B, B18-FU-C, Q3-B, Q10-C, Q10-FUA-B, Q10-FUB-B, Q8-B, Q8-FUB2-B, B20-B, B20-FUA-B, B20-FUB-A, B23-B, B23-FUA-B, B23-FUB-A, B38-FU-B
- Counts against: B40-A, Q1-A, B18-FU-A, Q3-A, Q10-A, Q10-B, Q10-FUA-A, Q10-FUB-A, Q8-FUB2-A, B20-A, B20-FUA-A, B23-C, B23-FUA-C, B38-B, B38-FU-A
- You protect: staying out of it · You'll trade away: the chance to change what happens

### `distance`: Faraway strangers count as much as anyone.

- Detail: Whether you can see someone doesn't change how much they count.
- Share line: Strangers far away matter to me as much as anyone.
- Shows at strength 2 or more; priority 3
- Supported by 15 answers from 8 questions: B18-B, B18-FU-A, B13-FU-B, B21-B, B21-FUA-B, B09-FUA-A, D2-A, D2-FUA-A, D2-FUB-B, Q4-B, Q4-FUA2-B, Q4-FUB-B, B22-A, B22-FUA-A, B52-A
- Counts against: B18-A, B21-FUA-A, D2-B, D2-FUA-B, D2-FUB-A, Q4-A, Q4-FUA2-A, Q4-FUB-A, B22-B
- You protect: strangers far away · You'll trade away: the people right in front of you

### `follow-rules`: You follow the rules, even when no one's watching.

- Detail: You keep to rules and laws even when breaking them would go unnoticed.
- Share line: I follow the rules, even when no one's watching.
- Shows at strength 2 or more; priority 3
- Supported by 25 answers from 16 questions: B29-A, B29-FUA-A, D8-B, B01-A, B09-FUB-A, B21-FUB-B, B55-A, Q5-A, Q5-FUA-B, Q8-A, Q8-FUA-A, Q9-B, Q9-FUB-B, D10-B, D11-A, D11-FUA-A, D11-FUB2-A, B30-B, B30-FU-B, B32-A, D6-B, D6-FUB2-B, Q2-A, Q2-FUA-A, B15-FUA2-A
- Counts against: B29-B, B09-A, B55-B, Q5-B, Q5-FUA-A, Q9-A, Q9-FUA-A, Q9-FUB-A, D10-A, D11-B, D11-C, D11-FUA-B, B30-A, B30-FU-A, D6-A, D6-FUB2-A, Q2-B, Q2-FUA-B, B15-FUA2-B, B23-C, B23-FUA-C
- You protect: rules · You'll trade away: exceptions for sympathy

### `break-unjust`: You'll break a rule that hurts people.

- Detail: When a rule hurts someone unfairly, you set it aside.
- Share line: I'll break a rule that hurts people.
- Shows at strength 2 or more; priority 3
- Supported by 15 answers from 8 questions: B29-B, B29-FUA-B, B29-FUB-B, B40-A, B09-A, Q9-A, Q9-FUA-A, Q9-FUB-A, D6-A, D6-FUA-A, B32-B, B23-C, B23-FUA-C, B23-FUC-A, B17-A
- Counts against: B29-A, B29-FUA-A, Q9-B, Q9-FUB-B, D6-B, D6-FUA-B, B32-A, B23-A, B23-FUA-A, B17-B
- You protect: people the rules would hurt · You'll trade away: following the law to the letter

### `count-numbers`: You aim for the greater good.

- Detail: You pick what helps the most people or does the least harm, even when it's hard.
- Share line: I aim for the greater good.
- Shows at strength 2 or more; priority 3
- Supported by 23 answers from 12 questions: Q1-A, Q1-FUA-A, Q1-FUB-A, B18-B, B21-FUA-B, B21-FUB-A, B13-B, Q11-A, Q11-FUA2-A, Q11-FUB-A, D6-A, D9-A, D9-FUA2-A, D2-FUA-A, D2-FUB-B, Q4-FUA2-B, Q4-FUB-B, B15-B, B15-FUC-B, B20-A, B20-FUA-A, B23-A, B23-FUC-B
- Counts against: Q1-B, Q1-FUB-B, Q11-B, Q11-FUB-B, D9-B, D9-FUA2-B, D9-FUB2-A, D2-FUB-A, Q4-FUB-A, B20-B, B20-FUA-B, B20-FUB-A, B15-A, B23-FUB-A, B23-FUC-A
- You protect: the greatest number of people · You'll trade away: your gut feelings

### `meant-not-outcome`: You judge people by their reasons.

- Detail: The same act looks different to you depending on why someone did it.
- Share line: I try to understand why people do what they do.
- Shows at strength 2 or more; priority 4
- Supported by 8 answers from 5 questions: B29-B, B29-FUA-B, B29-FUB-A, Q6-FUB-B, B01-FU-A, B12-A, B12-FU-A, Q8-FUA-B
- Counts against: B29-FUB-B, B12-B, Q8-FUA-A
- You protect: the reasons behind what people do · You'll trade away: treating every case the same

### `gives-it-up`: You give things up for people who need them more.

- Detail: When someone needs something more than you do, you'll give up your chance at it.
- Share line: I give things up for people who need them more.
- Shows at strength 2 or more; priority 2
- Supported by 20 answers from 13 questions: Q6-B, Q6-FUA-B, Q6-FUB-A, B21-B, B18-FU-A, B13-FU-B, B46-A, B46-FU-A, Q5-FUB-B, D6-FUA-A, D4-A, D4-FUA2-A, D4-FUB-A, B22-A, Q2-FUB-A, B19-A, B19-FUB-A, B57-A, B57-FUB-B, B49-B
- Counts against: Q6-FUA-A, B21-FUA-A, B46-FU-B, Q5-FUB-A, D6-FUA-B, D4-B, D4-FUB-B, B22-B, Q2-FUB-B, B19-B, B19-FUB-B, B57-B, B57-FUB-A, B49-A
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
- Supported by 13 answers from 9 questions: B37-A, Q6-FUB-A, B29-B, B01-FU-A, B29-FUA-B, B36-A, B36-FU-A, B33-B, B33-FU-B, B34-B, B34-FUA-B, B19-FUA-A, B54-B
- Counts against: Q6-FUB-B, B01-FU-B, B36-FU-B, B33-A, B34-A, B34-FUA-A, B19-FUA-B, B54-A
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
- Supported by 9 answers from 6 questions: B02-B, B02-FU-B, Q6-B, Q1-FUA-B, B29-FUA-B, B27-B, B27-FUA-B, B27-FUB-B, B08-FU-B
- Counts against: B02-A, B02-FU-A, B27-A, B27-FUA-A, B27-FUB-A, B08-FU-A
- You protect: people’s peace of mind · You'll trade away: the full facts

### `stands-up`: You stand up for yourself.

- Detail: When someone takes advantage of you or tells the story wrong, you say so, even if it gets awkward.
- Share line: I stand up for myself.
- Shows at strength 2 or more; priority 3
- Supported by 5 answers from 3 questions: B56-A, B56-FU-A, B43-B, B43-FU-B, B16-FU-A
- Counts against: B56-B, B56-FU-B, B43-A, B43-FU-A, B16-FU-B
- You protect: your self-respect · You'll trade away: an easy peace

### `sets-limits`: You set limits, even with people you love.

- Detail: You'll say no to someone close when what they ask would cost you too much.
- Share line: I set limits, even with people I love.
- Shows at strength 2 or more; priority 4
- Supported by 8 answers from 5 questions: B46-B, B46-FU-B, B56-FU-A, D1-B, D1-FUB-B, B10-B, B57-B, B57-FUA-B
- Counts against: B46-A, B46-FU-A, B56-FU-B, D1-A, B10-A, B57-A
- You protect: your own time and health · You'll trade away: being there whenever you’re needed

### `sticks-by`: You stick by your friends.

- Detail: When a friend is in trouble or under suspicion, you stay close, even when it costs you.
- Share line: I stick by my friends.
- Shows at strength 2 or more; priority 3
- Supported by 5 answers from 3 questions: B42-A, B42-FU-A, B46-A, B46-FU-A, Q3-FUA-B
- Counts against: B42-B, B42-FU-B, B46-FU-B
- You protect: friends in trouble · You'll trade away: your standing with the group

### `privacy`: You respect people's privacy.

- Detail: You won't dig into or pass on what isn't yours to know, even when you're worried.
- Share line: I respect people's privacy.
- Shows at strength 2 or more; priority 4
- Supported by 5 answers from 3 questions: B44-A, B44-FU-B, D7-B, D7-FU-B, Q3-B
- Counts against: B44-B, B44-FU-A, D7-A
- You protect: people’s private lives · You'll trade away: knowing for sure

### `parents-first`: You put your parents' wishes first.

- Detail: When a parent asks something of you, you do it, even at a real cost to your own life.
- Share line: I honor my parents' wishes.
- Shows at strength 2 or more; priority 3
- Supported by 6 answers from 3 questions: B10-A, D1-A, D1-FUA-B, D1-FUB-A, Q5-B, Q5-FUB-A
- Counts against: B10-B, D1-B, D1-FUA-A, D1-FUB-B, Q5-FUB-B
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
- Supported by 5 answers from 2 questions: B05-A, B05-FU-A, B41-A, B41-FUA2-A, B41-FUB-A
- Counts against: B05-FU-B, B41-B, B41-FUA2-B, B41-FUB-B
- You protect: credit where it’s due · You'll trade away: looking good

### `must-pay`: You think wrongdoing should always be punished.

- Detail: You think a crime should be punished even when the person is sorry, has changed, or could never do it again.
- Share line: I think people should answer for what they do.
- Shows at strength 2 or more; priority 4
- Supported by 6 answers from 3 questions: B33-A, B33-FU-A, B34-A, B34-FUA-A, B34-FUB-A, B19-FUA-B
- Counts against: B33-B, B33-FU-B, B34-B, B34-FUA-B, B34-FUB-B, B19-FUA-A
- You protect: justice for what people did · You'll trade away: mercy

### `repays-help`: You stay loyal to people who helped you.

- Detail: When someone who helped you asks for a favor or does something wrong, you side with them, even if it isn't fair to others.
- Share line: I stay loyal to people who helped me.
- Shows at strength 2 or more; priority 3
- Supported by 3 answers from 3 questions: D3-B, D5-B, D10-A
- Counts against: D3-A, D5-A, D10-B
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
- Supported by 10 answers from 3 questions: B19-A, B19-FUA-A, B19-FUB-A, B15-C, B15-FUA2-A, B15-FUB-A, B15-FUC-A, Q10-B, Q10-FUB-A, Q10-FUA-A
- Counts against: B19-B, B19-FUB-B, B15-FUA2-B, B15-FUB-B, Q10-C, Q10-FUB-B, Q10-FUA-B
- You protect: strangers in danger · You'll trade away: your own safety

### `equal-share`: You give everyone an equal share.

- Detail: When there isn't enough to go around, you'd rather split it evenly or draw lots than decide who deserves more.
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
- Supported by 10 answers from 4 questions: D2-B, D2-FUA-B, D2-FUB-A, Q4-A, Q4-FUA2-A, Q4-FUB-A, D9-B, D9-FUA2-B, D9-FUB2-A, B18-A
- Counts against: D2-A, D2-FUA-A, D2-FUB-B, Q4-B, Q4-FUA2-B, Q4-FUB-B, D9-A, D9-FUA2-A, B18-B
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
- Supported by 5 answers from 4 questions: B38-A, B38-FU-B, B48-FU-A, B37-A, B52-D
- Counts against: B38-B, B38-FU-A, B48-FU-B, B37-B
- You protect: people’s right to choose · You'll trade away: protecting them from themselves

### `future-people`: You'd give something up for people not yet born.

- Detail: You'd accept less for yourself now so that people who come after you live better.
- Share line: I'd give something up for people not yet born.
- Shows at strength 2 or more; priority 3
- Supported by 3 answers from 2 questions: B22-A, B22-FUA-A, B49-B
- Counts against: B22-B, B22-FUB-B, B49-A
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
34. D8-A + D10-B: You'd use a connection to move your father up a surgery list, but you'd refuse to move the grandson of the woman who took you in up a housing list.
35. D8-B + D10-A: You'd make your own father wait his turn for surgery, but you'd move the grandson of the woman who took you in to the top of a housing list.
36. B02-A + B03-B: You'd tell your dying grandfather his business failed, but you'd leave a former employee's problems out of a job reference.
37. B40-A + B04-A: You'd speak up when a relative makes a cruel joke at dinner, but you'd give a customer your company's false excuse for a late order.
38. B36-A + B33-A: You think you owe forgiveness to someone who betrayed you and then changed, but you'd send a man to prison at 45 for a robbery he committed at 19.
39. B21-B + B41-B: You'd turn down $1 million that costs a stranger $1,000, but you'd let your boss credit you for a coworker's idea.
40. B37-B + D6-A: You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd break your company's confidentiality agreement to stop a pension cut.
41. Q9-A + D6-B: You'd break an unjust law in a protest, but you'd stay quiet about a pension cut for 3,000 retirees because you signed an agreement.
42. Q1-FUB-A + D11-FUB2-B: You'd pull the lever on your own child to save 100 strangers, but you'd let a stranger take the blame in court to protect your brother.
43. D6-FUB2-A + D10-B: You'd break your confidentiality agreement once your grandmother's pension was at stake, but you'd refuse to move the grandson of the woman who took you in up a housing list.
44. D11-FUA-A + D6-FUB2-A: You'd testify against your brother even if it sent him to prison, but you'd break your confidentiality agreement to protect your grandmother's pension.
45. Q1-A + B15-A: You'd pull the lever to save five, but in a sinking lifeboat you'd draw lots rather than choose who goes.
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
56. B37-B + B15-FUA2-B: You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd refuse to go when the lifeboat lots you agreed to fall to you.
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
