# The park's 12: wording and scoring proposal

*2026-11-09, after a skeptic judge pass. **Applied 2026-11-10** (Ken: "Yes, apply it", with all four recommendations below, including the D8 setup). `game/content.js` is now the source of truth; this file records why each change was made. Rerun the crowd test with `npm run simulate:crowd`. The "Current" column below is the park before the change.*

## Why this matters

The park's 12 questions make the five-letter code, and the code is what friends compare. Two things are wrong with them today.

1. **The scoring leans hard toward some letters.** Each answer pushes your score on one or more of the five pairs (for example, H for Heart or T for Thought). The park offers far more push toward some letters than toward their opposites. With answer rates I'd expect from a real crowd (my estimates, below), **93% of players end up H**, 80% L and 78% S. A letter nearly everyone gets tells friends nothing. Part of it is a bug: the Trolley's "your mother" follow-up is shown to people who already refused to pull the lever. Nearly all of them pick "Not her", which hands them Heart and Loyalty points for free.
2. **The wording breaks the card rules** that the later worlds now follow (ratified 2026-10-07):
   - Setups are fragments that only make sense after the question.
   - Seven follow-ups state a fact and ask nothing.
   - Some answers carry a reason that their opposite doesn't.
   - Several cards leave an obvious dodge open, such as "press it, then pay them back".

## How it was rebalanced

**Honesty first, then balance as a check.** An answer moves a pair only if choosing it really says something about that pair. Then I checked each question for pushes with no opposite. Where a push was honest but one-sided, it stays. Where it was a side effect, it goes.

My first draft used a strict "mirror rule": opposite answers always push equally hard. The judge showed this gave some players the wrong letter. For example, a player who pulls for five strangers but won't pull on their mother or child scored as R (Rules) instead of O. So the mirror is now a check, not the rule.

Push sizes stay in today's range (1 to 3), and follow-ups keep their extra weight.

## Results

Each test ran 3,000 to 4,000 simulated players through the real scoring code.

| Test | Current | Proposed |
|---|---|---|
| **Estimated real crowd** (my guessed answer rates): share getting O · C · H · L · S | 78 · 54 · **93** · 80 · 78 | 57 · 47 · 70 · 66 · 70 |
| Estimated real crowd: most common code | OIHLS, 23% of players | OIHLS, 14% |
| **Players with a real lean** who get their true letter (O/R · C/I · H/T · L/P · S/D) | 87 · 94 · 87 · 87 · 87 | 92 · 95 · 88 · 89 · 86 |
| **Random answers**: share getting O · C · H · L · S | 73 · 54 · 82 · 66 · 71 | 51 · 43 · 58 · 48 · 59 |

What the three tests mean:
- **Estimated real crowd:** answers are picked at the rates I'd expect from real people. For example, 80% pull the lever, 75% compete for the promotion, and 75% say the unseen year makes the world worse. These rates are guesses; the game collects no data. This is the test that matters most for "does the letter tell friends apart".
- **Players with a real lean:** each simulated player has a hidden true lean on each pair and picks the answers that fit it, with some noise. This tests whether the code tells people the truth about themselves.
- **Random answers:** this only shows how lopsided the scoring is built.

Portraits barely change. Summary changes per player are 1.02 in the park and 3.62 across all worlds (today 1.03 and 3.64), and the same lines are common or rare. Slightly more players (22% instead of 18%) have no summary yet at 4 answers, because people who don't pull the lever no longer get the mother follow-up. Today's fix makes the summary screen wait until a summary exists, so they still get it.

**One side effect:** whole-number pushes that cancel out produce more exact ties. For example, 5.7% of players tie on O/R. A tie then went to the first letter; since 2026-11-10 it goes to the side of the player's most recent answer on that pair (NEXT-STEPS decision 8).

**What's left:** popular answers still push the real crowd toward H, L and S (about 70% each), because real people really do lean that way on these questions. One later option: centre each pair on the real crowd, so a letter means "more than most people" rather than "more than zero". That needs real answer rates, which the game doesn't collect. It's not proposed now.

---

# The cards

Each card is shown as it would read. `[was: "..."]` marks a change. Scoring is shown as `{pair push}`; a positive number pushes toward the first letter (O, C, H, L, S). Lines not mentioned stay as they are.

## Q1 The Trolley

Problems:
- The setup refers to people the question hasn't introduced yet.
- One answer carries a reason ("I won't directly cause a death") and the other doesn't.
- The "your mother" follow-up fires for people who already refused to pull, so it can't change their answer.
- The family follow-ups pushed toward O, which made refusing to sacrifice your own child count as following rules.

### trunk
- setup: Everyone on both tracks is a stranger to you. There's no time to warn anyone, and there's no third option. [was: "Six strangers. No third option. Three seconds to act."]
- q: (unchanged) A runaway trolley is heading toward 5 people. You can pull a lever that diverts it to a side track where 1 person will die. What do you do?
- Q1-A: I pull the lever. [was: "Pull the lever"] `{OR 3}`
- Q1-B: I don't pull it. [was: "Do not pull. I won't directly cause a death."] `{OR −3}`

### fuA, your mother (now only after "I pull the lever")
- setup: The five on the main track are still strangers. [was: "The five are still strangers. Nothing else changes."]
- Q1-FUA-A: I still pull the lever. [was: "Pull anyway"] `{LP −2, HT −2}` [was: `{OR 2, LP −2, HT −2}`]
- Q1-FUA-B: Then I don't pull it. [was: "I can't do it. Not her."] `{LP 2, HT 2}` [was: `{HT 3, LP 2}`]

### fuAA, your child and 100 strangers (was the `fuB` key; same ids, same trigger)
- setup: Your child is alone on the side track. Everyone on the main track is a stranger. [was: "A hundred strangers. Your child alone on the side track."]
- Q1-FUB-A: Then I pull the lever. [was: "Pull. 100 lives outweigh one."] `{LP −3, HT −2}` [was: `{OR 3, LP −3}`]
- Q1-FUB-B: I still don't pull it. [was: "Do not pull. I won't choose my child's death."] `{LP 3, HT 2}` [was: `{HT 3, LP 3}`]

### NEW fuB, 100 strangers (after "I don't pull it")
- setup: Everyone on both tracks is still a stranger.
- q: What if there are 100 people on the main track, not 5? Do you pull the lever?
- Q1-FUB2-A: Then I pull the lever. `{OR 2}`. Note: "You won't cause one death to save five, but you would to save 100. Your line gives way when the numbers get big enough."
- Q1-FUB2-B: I still don't pull it. `{OR −2}`. Note: "Your line holds at any number. You won't be the one who causes a death, even to save 100."
- Why: it tests the line the player just drew. It's likely close to an even split. It hands out no free Heart or Loyalty points, and it avoids adding a sixth "someone you love" question to the park.
- Portrait: A supports "You aim for the greater good". B supports "You stay out of it", and A counts against that line.

## B09 The 2 A.M. Call

Problems:
- The setup repeats the question and leaves open the dodge "I'd tell them to turn themselves in".
- fuA asks nothing and leaves open "they'll be cleared anyway".
- One answer in fuB has an extra reason and an extra push.

### trunk
- setup: Your sibling refuses to turn themselves in, and leaving the scene of a crash can mean prison. [was: "Your sibling fled a crash. The cyclist will recover. No leads."]
- B09-A: (unchanged) Yes. I cover for them. `{LP 3, SD −2}`
- B09-B: (unchanged) No. I won't lie for them. `{LP −3, SD 2}` [was: `{LP −2, SD 2}`]

### fuA (after A)
- setup: You told the police your sibling was with you that night. [was: "A week later. Someone else is paying for it."]
- q: A week later, police arrest a different person for the crash. That person is innocent, and the evidence against them looks strong. What do you do? [was: "A week later, police arrest a different person for it. That person is innocent."]
- B09-FUA-A: Then I tell the police the truth. [was: "I tell the police the truth."] `{LP −2, SD 2, CI 1}`
- B09-FUA-B: I keep quiet. [was: "I stay quiet."] `{LP 2, SD −2, CI −1}` [was: `{LP 3, ...}`]

### fuB (after B)
- setup: You refused to give your sibling an alibi. [was: "No one comes asking. Speaking up is up to you."]
- B09-FUB-B: No. I don't report them. [was: "No. I just won't lie for them."] `{LP 2}` [was: `{LP 2, HT 1}`]

## B02 The Deathbed Question

Problems:
- The setup repeats the question.
- "The truth, as gently as I can" softens one side only.
- The follow-up's setup adds nothing, and it leaves open "he'd see through a lie".

### trunk
- setup: Nothing can bring the business back, and your grandfather will never find out unless you tell him. [was: "Hours left. The business failed last year. He asks directly."]
- B02-A: I tell him the truth. [was: "The truth, as gently as I can."] `{OR −2, HT −2}`
- B02-B: I tell him it's doing well. [was: "\"Yes, it's doing well.\""] `{OR 2, HT 2}` [was: `{OR 2, HT 3}`]

### fu (after B)
- setup: He trusts you completely and will believe whatever you say. [was: "He once asked you never to lie to him."]
- q: (unchanged) Years ago he told you, "Whatever happens, never lie to me. Not even at the end." Does that change your answer?
- B02-FU-A: (unchanged) Yes. I tell him the truth. `{OR −2, HT −1}` [was: `{OR −3, HT −1}`]
- B02-FU-B: No. I still tell him it's doing well. [was: "No. Right now, his peace matters more than that promise."] `{OR 2, HT 1}` [was: `{OR 2, HT 2}`]

## B13 Two Worlds

Problems:
- Choosing World B also counted as Outcomes, but World A is just as much an outcome choice.
- The trunk pushed harder than the choice justifies. World B is better for most people, so choosing it isn't simply selfish; the follow-up is the real test of that.

### trunk
- setup: Once you're born, you can't move to the other world. [was: "You don't know who you'll be. You pick the world."]
- B13-A: (unchanged) World A. `{CI 2}` [was: `{CI 3}`]
- B13-B: (unchanged) World B. `{CI −2}` [was: `{CI −2, OR 1}`]

### fu (after A)
- setup: Everything else about the two worlds stays the same. [was: "Now you know you'll land on top."]
- B13-FU-A: Then I switch to World B. [was: "Yes, B."] `{CI −3}`
- B13-FU-B: I still choose World A. [was: "No, still A."] `{CI 3}` [was: `{CI 2, HT 1}`]

## B18 The Pond and the Faraway Child

Problems:
- The setup refers back to a question not yet read, and it leaves open "I can't afford $800".
- The two answers' Outcomes/Rules pushes were uneven.

### trunk
- setup: Assume you can afford to lose $800 without real hardship. [was: "Same $800, same child's life. One is here, one far away."]
- B18-A: (unchanged) Yes. Being right there makes it mine. `{LP 2, HT 2, OR −1}` [was: `{LP 2, HT 2}`]
- B18-B: (unchanged) No. A child is a child. `{LP −2, HT −2, OR 1}`

### fu (after B), wording unchanged
- B18-FU-B: Not really, and it bothers me. `{HT 1}` [was: `{CI 1, HT 1}`]

## B29 The Jury

Problems:
- The setup repeats the question.
- Neither follow-up asks anything.
- fuB's "same theft" would mean stealing baby formula to pay a gambling debt.
- One answer carries a reason ("The law is still too harsh") and the other doesn't.

### trunk
- setup: The judge can't give a lighter sentence, and every juror must agree on the verdict. [was: "The law is clear. The evidence is clear. Five years."]
- B29-A: (unchanged) Guilty. My job is the law, not the sentence. `{SD 2, HT −2}` [was: `{SD 3, HT −2}`]

### fuA (after A)
- setup: You were going to vote guilty. [was: "Same case. Now a baby's future rides on it."]
- q: Then you learn that if they're convicted, their baby goes into foster care. Does that change your vote? [was: "If convicted, their baby goes into foster care."]
- B29-FUA-A: No. I still vote guilty. [was: "Still guilty."]
- B29-FUA-B: Yes. I vote not guilty. [was: "Then not guilty."] `{HT 2, SD −2}` [was: `{HT 3, SD −2}`]

### fuB (after B)
- setup: The law, the evidence and the sentence are the same. [was: "Same law, same evidence. A less sympathetic reason."]
- q: Now picture the same case, but they stole money to pay off a gambling debt. How do you vote? [was: "Same law, same evidence, but they stole to pay off a gambling debt."]
- B29-FUB-A: Then I vote guilty. [was: "Guilty."] `{HT 2, SD 1}` (unchanged)
- B29-FUB-B: I still vote not guilty. [was: "Not guilty. The law is still too harsh."] `{SD −2, HT −2}` [was: `{SD −3, HT −1}`]

## B37 The Bank Card

Problem: the setup repeats the question and leaves open "I'd stall and ask someone".

- setup: Your friend wants an answer tonight, and you can't ask anyone else for advice. [was: "They asked you to hold it. Now, sober, they want it back."]
- Answers and scoring unchanged.

## D8 The Waiting List

Problems:
- The answers don't follow the house shape.
- The setup says the call breaks no rules, yet making it counted as Disruption.
- It is the park's clearest loyalty choice, but it barely moved Loyalty.

- D8-A: Yes. I make the call. [was: "Make the call"] `{LP 2, CI −2}` [was: `{CI −2, SD −1, LP 1}`]
- D8-B: No. He waits his turn. [was: "Don't. He waits his turn."] `{LP −2, CI 2}` [was: `{SD 2, CI 2}`]
- Optional, needs your ruling (you ratified the current setup on 2026-09-29): the setup opens with "He" before the question names the father, and repeats "in pain every day". The judge suggests: "No one would ever find out, and the delay won't put your father's life at risk."

## B40 The Dinner Joke

Problems:
- The setup repeats the question and leaves open "someone else would speak up".
- The follow-up asks nothing, and its setup adds nothing.
- Both follow-up answers pushed toward Loyalty, so the question leaned L, S and H.
- "Smile along to keep the peace" carries a reason.

### trunk
- setup: Everyone heard the joke, and no one has said anything yet. [was: "Your own family. No one from that group is there."]
- B40-A: I say something right then. [was: "Say something right then."] `{SD −2, LP −2}`
- B40-B: I stay quiet. [was: "Stay quiet."] `{LP 1, SD 1}`
- B40-C: I smile along. [was: "Smile along to keep the peace."] `{LP 1, SD 2}` [was: `{LP 2, SD 2}`]

### fu (after B or C)
- setup: Your friend isn't at the dinner and will never hear about it. [was: "Now it's about someone you love."]
- q: What if your close friend belongs to that group? Do you say something? [was: "Your close friend belongs to that group."]
- B40-FU-A: Then I say something. [was: "Then I'd say something."] `{SD −2, HT 1}` [was: `{LP 2, HT 2}`]
- B40-FU-B: I still let it go. [was: "I'd still let it go."] `{SD 2}` [was: `{SD 2, LP 1}`]
- Why no Loyalty: the friend and the relative are both your people, so loyalty is on both sides.

## Q6 The Promotion

Problems:
- The setup leaves open "I'd compete and help them with money".
- Neither follow-up asks anything.
- "Withdraw. Let them have it" adds a purpose that the other answer lacks.
- "Merit" counted as Outcomes.
- Resenting stolen credit counted as Thought.

### trunk
- setup: Only one person can get the role, and you can't help your colleague with money any other way. [was: "Equally qualified. One role. No splitting it."]
- Q6-A: I compete for it. [was: "Compete fully. Let merit decide."] `{CI −2, HT −2}` [was: `{CI −1, OR 1, HT −1}`]
- Q6-B: I step aside. [was: "Withdraw. Let them have it."] `{CI 2, HT 2}` [was: `{HT 3, CI 2}`]

### fuA (after A)
- setup: You'd be fine without the promotion. [was: "The risk to them is real. You're secure either way."]
- q: Then you learn they may lose their home without the raise. Do you still compete? [was: "You learn they may lose their home without the raise. You'd be fine either way."]
- Q6-FUA-A: I still compete. [was: "Still compete fully. The best candidate should win."] `{CI −2, HT −2}`
- Q6-FUA-B: Then I step aside. [was: "Withdraw. That changes it."] `{CI 2, HT 2}` [was: `{HT 3, CI 3}`]

### fuB (after B)
- setup: Their money trouble is just as real. [was: "Their need is unchanged. You know for sure they took credit."]
- q: Then you learn for sure that last year, this colleague quietly took credit for your work. Do you still step aside? [was: "You learn that last year, this colleague quietly took credit for your work."]
- Q6-FUB-A: I still step aside. [was: "I still withdraw. Their need is still real."] `{CI 2}` [was: `{HT 2, CI 1}`]
- Q6-FUB-B: Then I compete for it. [was: "Then I compete fully"] `{CI −2}` [was: `{OR 1, HT −1, LP 1}`]

## B21 The Million-Dollar Button

Problems:
- The setup repeats the question and leaves open "press it, then pay them back".
- One-word answers ("Yes.", "Still yes.") don't stand alone.
- Neither follow-up asks anything.

### trunk
- setup: You'll never be able to find the stranger or pay them back. [was: "A stranger you'll never meet. It hurts, but not badly."]
- B21-A: Yes. I press it. [was: "Yes."] `{CI −3, OR 1}`
- B21-B: No. I don't press it. [was: "No."] `{CI 3, OR −1}` [was: `{CI 2, OR −1}`]

### fuA (after A)
- setup: You'd still get the $1 million. [was: "Same button. Now the harm is spread wide."]
- q: What if pressing it costs a thousand strangers $1,000 each? Do you still press it? [was: "It's actually a thousand strangers, each losing $1,000."]
- B21-FUA-A: I still press it. [was: "Still yes."] `{CI −3}`
- B21-FUA-B: Then I don't press it. [was: "Then no."] `{CI 2, OR 1}` [was: `{CI 2, OR 2}`]

### fuB (after B)
- setup: You'd still get the $1 million. [was: "Same button. Now the loss wouldn't even be felt."]
- q: What if the $1,000 comes from a billionaire who would never notice? Do you press it? [was: "The stranger is a billionaire who would never notice."]
- B21-FUB-A: Then I press it. [was: "Then yes."] `{OR 2, CI −1}`
- B21-FUB-B: I still don't press it. [was: "Still no."] `{OR −2, CI 1}`

## B01 The Invisible Year

Problems:
- The setup repeats the question.
- The follow-up leaned toward S (System), and "Better" also counted as Collective, which it doesn't show.

- setup: Everything else about your life stays the same. [was: "One year. No cameras, no witnesses, no consequences."]
- Trunk answers and scoring unchanged.
- B01-FU-A: (unchanged) Better. Most people are decent when no one's watching. `{SD −2, HT 1}` [was: `{SD −1, HT 1, CI 1}`]
- B01-FU-B: (unchanged) `{SD 2, HT −1}`

---

# Decisions for Ken

1. **Apply the whole proposal.** Recommendation: yes. It's one change to the instrument, judged and simulated.
2. **Q1's new follow-up asks about 100 strangers, not your mother.** Recommendation: the 100-strangers version. The mother version would be close to unanimous, would still hand out free Heart and Loyalty points, and would be the park's sixth "someone you love" question.
3. **Honesty is the rule, balance is the check.** Recommendation: yes, as a standing rule for scoring in every world. An answer moves a pair only if choosing it really says something about that pair. After any scoring change, run `npm run simulate` and look for pushes with no honest opposite.
4. **D8's setup** (optional, above). Recommendation: yes. It's the only card where the setup opens with "He" before you know who he is.

# What applying it involves (for whoever builds it)

- Every wording and scoring change goes in `game/content.js`, with `did`/`note` lines updated where an answer's words changed (meaning is unchanged, so ids stay).
- Q1's steps:
  - The child step moves from the `fuB` key to `fuAA`, keeping its answer ids.
  - The new 100-strangers step takes `fuB`, with ids `Q1-FUB2-A/B`.
  - Update `next()` to match.
- Scenes in `game/index.html`:
  - `VARIANTS.trolley` must map `fuAA` to `child` and `fuB` to a new variant.
  - The new variant is a drawn crowd on the main track, because the scene changes before the words.
  - `LEGACY_ACTS` needs `Q1-FUB2-A: { lever: 1 }`.
- Old saves (a migration when loading):
  - A Q1 record with key `fuB` holding `Q1-FUB-*` moves to `fuAA`.
  - A Q1 record with trunk `Q1-B` and a `fuA` pick drops the `fuA` pick, so the player gets the new follow-up on "Answer again".
- Portrait wiring:
  - `Q1-FUB2-A` supports `count-numbers` and counts against `watch-not-act`.
  - `Q1-FUB2-B` supports `watch-not-act`.
- After applying:
  - Run `npm run export:questions` and `npm run simulate`.
  - Run a headless play of Q1's three paths to check each scene appears before its text.

# Not in this proposal

- Tie letters (NEXT-STEPS decision 8): an engine change, but more pressing after this (see Results).
- Centring letters on the real crowd: needs real answer rates.
- Near-unanimous trunks the judge flagged but kept: the Trolley (about 80% pull, but it's the iconic opener), the Pond, the Promotion and the Invisible Year. Their follow-ups carry the hesitation.
- New follow-ups for B02 (after telling the truth), B37 and D8: only after you've played the park with these changes.
