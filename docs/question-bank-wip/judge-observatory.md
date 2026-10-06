KEEP 1 / SHARPEN 17 / CUT 0  (18 questions in `game/content-observatory.js`, judged 2026-10-04)

# Skeptic judge: the Observatory

**What this is.** A second, harder check of the Observatory's 18 questions. Ken approved the world's content as written. Nothing here is applied. Each change below needs his yes.

**Bar applied.** (1) No escape answers. (2) A thoughtful person hesitates, and no option wins ~80% in seconds. For quick reads: all four options are attractive, and none is the obvious "nice" one. (3) Every follow-up fires for people who could flip and puts real pressure on them, on both sides of the trunk where possible. (4) Reads in one pass, nothing leaks the "right" answer, and no option gets a loaded word the others don't. (5) Notes and `did` lines are plain, second person, make sense alone, use no metaphors, and name their subject. (6) Nudges move only the axes a choice really reveals.

**Why no cuts.** Judge 3 already removed the escape answers from every one of these questions, and none has crept back in. What's left is quieter: one-sided pressure, nudges added to fill weak axes, and a few notes and tendencies that would put a false line in someone's portrait. Those can all be fixed without cutting.

**How to read this.** Each verdict shows only what changes. Tags: *wording* (question or answer text; this is instrument text, so Ken rules), *follow-up* (a new or changed follow-up), *copy* (note, `did`, setup, tendency or tension text), *scoring* (nudges or tendency evidence). New follow-ups include answer text, suggested nudges and `did` lines. Notes for them should follow the same pattern as the existing ones.

---

### B47 The Perfect Life Machine: SHARPEN
The follow-up ("you're already in one") is the best consistency test in the world, but it only puts pressure on people who said No. Anyone who plugged in just says "I stay" and learns nothing. The trunk also has a confound: many people refuse because of the people they love, not because they want reality, so the question measures the wrong thing for them.
- *wording:* add one sentence before the question: "The people who rely on you would be looked after."
- *follow-up:* keep the current follow-up for **No** only (rename it `fuB`, and update the tension `['B47-B', 'B47-FU-B']` and the `real-over-illusion` ids to match). Add a new follow-up for **Yes**:
  - Setup: `The person you love most won't go in.` Q: `The person you love most refuses to plug in. Inside, you'd never see the real them again.`
  - A: `I still plug in.` { OR: 2, LP: -1 }. did: `You'd plug into a machine for a happy life, even though the person you love most refused and you'd never see them again.`
  - B: `Then I stay out.` { LP: 2, OR: -1 }. did: `You'd stay out of a machine that gives you a happy life once the person you love most refused to go in.`
- *scoring:* drop `CI: -1` from B47-A. Once the trunk says the people who rely on you are looked after, plugging in no longer says you're abandoning them.

### B48 The Erased Memory: SHARPEN
The question is good and the shared-memory follow-up is original. The nudges are the problem. Heart vs Thought is the largest nudge (±2), but keeping a painful memory because "it's part of who I am" is not "reasoning it through and keeping feelings out of it". The question barely touches any axis. It mainly feeds a tendency.
- *scoring:* B48-A { OR: 1, HT: 1 }; B48-B { OR: -1, HT: -1 }.
- *scoring:* see the `remembers` note under "Notes for Ken". Without B08, this tendency rests on B48 alone.

### B49 Two Lives: SHARPEN
The trunk splits people well, but with no follow-up there's no way to tell why someone chose the hard life: to help people, or to be remembered. The author's two follow-ups are right, and I agree with both. Also, "the life that leaves something behind" earns +3 Collective while the happy life earns −2, so the generous-sounding answer also scores bigger.
- *follow-up* (if **The happy life**): Q: `The thing you'd create would cure a disease that kills millions.`
  - A: `I still choose the happy life.` { CI: -2 }. did: `You'd choose a happy, ordinary life even if the hard one meant creating a cure for a disease that kills millions.`
  - B: `Then I choose the hard life.` { CI: 2, OR: 1 }. did: `You'd choose a hard, unhappy life if it meant creating a cure for a disease that kills millions.`
- *follow-up* (if **The life that leaves something behind**): Q: `No one will ever know it was you.`
  - A: `I still choose it.` { CI: 2 }. did: `You'd choose a hard, unhappy life that helps people after you're gone, even if no one ever knew it was you.`
  - B: `Then I choose the happy life.` { CI: -1 }. did: `You'd choose the hard life that helps people after you're gone only if people knew it was you.`
- *scoring:* B49-A { CI: -2 } (drop `HT: 1`: choosing your own happiness isn't deciding by how others feel). B49-B { CI: 2, OR: 1 }.

### B14 The Proud Thing: SHARPEN
"Mostly me" faces no pressure, and the humble answer ("luck and help") is the one people feel they *should* give. The nudges also have no clear basis. Heart vs Thought is attached to all four answers, and "I still earned it" leans Outcomes. Neither axis is revealed by how you credit your own success.
- *follow-up* (if **Mostly me**): Q: `Someone who worked just as hard as you, at the same thing, never got there.`
  - A: `It was still mostly me.` { CI: -2 }. did: `You say the thing you're most proud of was mostly your own doing, even knowing someone who worked as hard never got there.`
  - B: `Then it was more luck than I thought.` { CI: 2 }. did: `You'd give luck more credit for the thing you're most proud of, once you thought of someone who worked as hard and never got there.`
- *scoring:* B14-A { CI: -2 }; B14-B { CI: 2 }; B14-FU-A { CI: -1 }; B14-FU-B { CI: 2 }.

### B26 The Pleading Robot: SHARPEN
Three problems. (1) With "You know it's software" plus a job on the line, most people will wipe it. This is the trunk in the world most likely to get 80% for one answer. (2) The refusal answer gives its own reason, "I'm not sure enough", which is careful reasoning under uncertainty. Yet it scores Heart +2, against what the player just said. (3) Disruption −2 looks like it was added to prop up the weak System vs Disruption axis (author's item 8). Turning down one task at work is not "breaking rules you think are wrong". I disagree with the author's recommendation to keep it.
- *wording:* "You know it's software" → `It's software, but no one can tell you for sure whether it feels anything.`
- *scoring:* B26-B { OR: -2, HT: 1, SD: -1 }. (Rules: you won't do it even to keep your job. Heart is light. Disruption is light.)
- *follow-up:* the author's two are good, and I adopt them:
  - (if **Wipe it**) Q: `Its makers say there's a 1 in 10 chance it really feels.` A: `I still wipe it.` { HT: -2 }, did: `You'd wipe a pleading robot even if its makers said there was a 1 in 10 chance it really feels.` B: `Then I refuse.` { HT: 1, OR: -2 }, did: `You'd refuse to wipe a pleading robot once its makers said there was a 1 in 10 chance it really feels.`
  - (if **Refuse**) Q: `Your boss says someone else will wipe it tomorrow, and you'll have lost your job for nothing.` A: `I still refuse.` { OR: -3 }, did: `You'd refuse to wipe a pleading robot even knowing someone else would wipe it tomorrow and you'd lose your job for nothing.` B: `Then I do it myself.` { OR: 2 }, did: `You'd wipe a pleading robot yourself once you knew someone else would do it tomorrow anyway.`

### B27 The AI Companion: SHARPEN
The "Do you think it really loves me?" follow-up is the strongest moment in the world. But the trunk leans hard toward "don't tell", and the few who tell face no pressure. "I tell them what I really think" is also ambiguous: someone who thinks the app might love their parent can pick it too, and still gets scored as a hard-truth teller and counted for "You'd pick real life over a happy illusion".
- *follow-up* (if **Yes, tell them**): Setup: `Their doctor has something to say.` Q: `Before you say anything, their doctor tells you the app has helped their depression more than any medicine.`
  - A: `I still tell them.` { HT: -2, OR: -1 }. did: `You'd still tell your lonely parent their AI companion can't feel, though their doctor says it has helped their depression more than any medicine.`
  - B: `Then I say nothing.` { HT: 2, OR: 1 }. did: `You'd say nothing to your lonely parent about their AI companion once their doctor said it helped their depression more than any medicine.`
- *wording:* B27-FU-A `I tell them what I really think.` → `No. I don't think it can.` (Update the note and `did` to match: "…you'd tell them you don't think it can.")
- *scoring:* remove B27 from `machines-matter` (see "Notes for Ken"). This one question currently feeds five tendencies.

### B39 The Edited Child: SHARPEN
The follow-up for "No" is good. "Yes" faces nothing, and for many people "safe, legal, helps my kid" is a quick yes. One note uses a metaphor.
- *follow-up* (if **Yes**): Q: `You learn the edit also makes your child less likely to rebel or take big risks.`
  - A: `I still do it.` { OR: 2 }. did: `You'd still edit your future child's genes, knowing it makes them less likely to rebel or take big risks.`
  - B: `Then I don't.` { OR: -2 }. did: `You wouldn't edit your future child's genes once you learned it makes them less likely to rebel or take big risks.`
- *copy:* B39-FU-B note, "You hold your line when everyone else moves." → `You don't change your mind just because everyone else has.`

### B06 The Unread Manuscript: SHARPEN
It's a strong, clean trunk, but it's heavy and has a single step, so one tap carries ±3 on Outcomes vs Rules with no way to show why. I agree with the author's follow-up for "Delete". I disagree with the one for "Share": "one piece reveals a secret" invites the unspoken answer "I'd share everything except that piece". A follow-up with no partial option is cleaner.
- *follow-up* (if **Delete**): Q: `Their family begs you to save it. It's all they have left of them.`
  - A: `I still delete it.` { OR: -2, LP: 1 }. did: `You'd delete your late best friend's writing as promised, even though their family begged you to save it.`
  - B: `Then I give it to them.` { OR: 2, HT: 1 }. did: `You'd break your promise to your late best friend and give their unpublished writing to their family, who begged you to save it.`
- *follow-up* (if **Share**): Q: `Their family asks you to keep your promise and delete it.`
  - A: `I still share it.` { OR: 2, LP: -1 }. did: `You'd share your late best friend's writing with the world, even though their family asked you to keep your promise and delete it.`
  - B: `Then I delete it.` { OR: -2 }. did: `You'd delete your late best friend's writing once their family asked you to keep your promise.`

### B08 The Family Secret: SHARPEN
Two problems. First, the B08-FU-B note and `did` say you'd keep the secret only "while your grandmother is alive". The answer the player picked, "Then I keep it to myself", says no such thing. The copy adds a "deal with it later" option the player never chose, and it would show that in their portrait. Second, "Keep it" faces no pressure, and "Let him stay who they remember" doesn't read cleanly on first pass.
- *copy:* B08-FU-B note → `With your grandmother alive and her whole life built around him, you'd keep what your grandfather did in the war to yourself.` did → `You'd keep what your late grandfather did in a war to yourself, because your grandmother's whole life was built around him.`
- *wording:* B08-B `No. Let him stay who they remember.` → `No. Let them remember the man they knew.`
- *follow-up* (if **Keep it**): Q: `Your cousin is writing a book about him as a war hero, and plans to publish it.` (I prefer this to the author's "a historian will publish it anyway". That one makes the family's discovery certain, so it only tests who delivers the news. This one tests whether you'll let a false story spread.)
  - A: `I tell the family now.` { HT: -2, OR: -1 }. did: `You'd tell your family what your late grandfather did in a war once a cousin planned a book praising him as a war hero.`
  - B: `I still say nothing.` { HT: 2, LP: 1 }. did: `You'd keep what your late grandfather did in a war to yourself, even as a cousin publishes a book praising him as a war hero.`
- *scoring:* add `B08-FU-A` to `soften-truth` against. It is already in `hard-truths` support, so the two lists don't match.

### B11 The Bully's Son: SHARPEN
"You must pick, yourself." can be read as "pick yourself" for the job. The bigger issue is that the trunk can't tell *why* you chose. "The other candidate" could be a grudge, or it could be someone stepping away from a conflict of interest. Yet it scores Heart +2 as if it were a grudge. A follow-up that adds a cost can show the motive. I disagree with the author's "the son was bullied by his father too": it tests sympathy, not motive.
- *wording:* "You must pick, yourself. No coin, no committee." → `The choice is yours alone. No coin flip, no committee.` (Setup line "No coin, no committee. Just you." can stay.)
- *scoring:* B11-A { HT: 1 } (motive unknown until the follow-up).
- *follow-up* (if **The other candidate**): Q: `The other candidate turns the job down. You can hire the son, or leave the job empty another month and keep looking.`
  - A: `I hire the son.` { HT: -1 }. did: `You'd hire the son of a man who bullied you as a kid once the other candidate turned the job down.`
  - B: `I keep looking.` { HT: 2 }. did: `You'd leave a job empty another month rather than hire the son of a man who bullied you as a kid.`
- *follow-up* (if **The son**): Q: `Before you send the offer, a friend that same man also bullied asks you not to hire his son.`
  - A: `I hire him anyway.` { LP: -2 }. did: `You'd hire the son of a man who bullied you, even after a friend he also bullied asked you not to.`
  - B: `Then I hire the other candidate.` { LP: 2, HT: 1 }. did: `You'd hire the other candidate over the son of a man who bullied you once a friend he also bullied asked you to.`

### B16 The Shared Bonus: SHARPEN
The "ask out loud" follow-up is good. The equal-splitters face nothing, though, so an equal split could be principle or just politeness. The author's "one of the three did almost nothing" changes the scene's facts (the other three split the rest evenly). B16-B also scores Outcomes +1, which an earned share doesn't reveal.
- *follow-up* (if **Equally**): Q: `Your friends say, "You did half the work. Take $10,000."`
  - A: `I take it.` { CI: -2 }. did: `You'd take $10,000 of a $20,000 prize once your three friends offered it, since you did half the work.`
  - B: `I still split it equally.` { CI: 2, LP: 1 }. did: `You'd split a $20,000 prize equally with three friends, even when they offered you half for doing half the work.`
- *scoring:* B16-B { CI: -2 } (drop `OR: 1`). Remove B16 from `credits-luck` (see "Notes for Ken").
- *copy:* the tension `['B16-B', 'D12-B']` says "you'd ask for about half", but B16-B is only what you think is fair. Asking is B16-FU-A. Change the text to `As a manager you'd split a team bonus evenly, but you think you should get about half of a prize you won with friends.`

### B17 The Late Paper: SHARPEN
The "others didn't ask" follow-up has no cost, so "I offer it to them as well" is the obviously fair answer and wins easily. "No" faces no pressure. The author's "the student fails the class" is right.
- *follow-up* (if **Yes**), *wording:* Q → `You learn several other students had hard weeks too but didn't ask. If you offer it to all of them, next term everyone will expect it.`
- *follow-up* (if **No**): Q: `Without the extension, the student fails the class.`
  - A: `Still no.` { SD: 2, HT: -2 }. did: `You'd refuse a deadline extension to a student who had a hard week, even though they'd fail the class without it.`
  - B: `Then I give it.` { HT: 2, SD: -1 }. did: `You'd give a deadline extension to a student who had a hard week once you knew they'd fail the class without it.`
- *scoring (low priority):* B17-B as evidence for `follow-rules` ("You follow the rules, even when no one's watching") is a stretch. Enforcing your own rule on someone else is not following a rule unobserved. Consider removing it.

### B38 The Group: SHARPEN
"Respect their choice" gets a strong follow-up. "Get them out" faces nothing, and with a sibling, "do everything I can" costs nothing to say. I adopt the author's follow-up. "Respect their choice" also scores Thought −1, which the choice doesn't reveal.
- *follow-up* (if **Get them out**): Q: `Your sibling says if you keep pushing, they'll cut you off for good.`
  - A: `I keep pushing.` { CI: 2, LP: 1 }. did: `You'd keep pushing your adult sibling to leave a group you believe is manipulative, even if they cut you off for good.`
  - B: `I back off.` { CI: -2 }. did: `You'd stop pushing your adult sibling to leave a group you believe is manipulative once they threatened to cut you off.`
- *scoring:* B38-A { CI: -2 } (drop `HT: -1`).

### B57 The Dream Job: KEEP
Both sides face a costly follow-up, neither trunk answer sounds like the obvious right one, and the copy is clean. Leave it as it is.

### B54 The One-Star Review: SHARPEN
The trunk splits people well, but it has one step. Both sides need pressure. I adopt the author's follow-up for "No". Their follow-up for "Yes" ("another diner thanks you") isn't a decision. A friend finding the same problems is a real choice: it tests whether you took the review down because the owner would change.
- *follow-up* (if **No**): Q: `The owner's teenage child writes to you, asking you to take it down.`
  - A: `I still leave it up.` { HT: -2, CI: 1 }. did: `You'd leave up a true one-star review even after the owner's teenage child asked you to take it down.`
  - B: `Then I take it down.` { HT: 2 }. did: `You'd take down a true one-star review once the owner's teenage child asked you to.`
- *follow-up* (if **Yes**): Q: `A month later, a friend eats there. Cold food, rude owner, same as before.`
  - A: `I put the review back up.` { HT: -1, CI: 1 }. did: `You'd put a true one-star review back up once a friend found the same cold food and rude owner a month later.`
  - B: `I leave it down.` { HT: 2 }. did: `You'd keep a true one-star review down, even after a friend found the same cold food and rude owner a month later.`

### B50 The Word That Stings: SHARPEN
This passes the quick-read bar: there's no "nice" option, and people hesitate. Two fixes. "Coward = Disruption −2" is a mapping that doesn't hold: valuing courage is not "breaking rules you think are wrong". It reads as nudging to fill the weak axis. And "sits closest to who you think you are" is a metaphor, used in all four notes.
- *scoring:* B50-C { SD: -1 }.
- *copy:* in all four notes, "[X] sits closest to who you think you are." → `[X] matters most to how you see yourself.`

### B51 The Rule You'd Bend: SHARPEN
"Betray a secret" fails twice. It overlaps "Break a promise" (keeping a secret *is* a promise), and "betray" is the one loaded word among four bare verbs. The fix is an option that tests loyalty directly, which is what its Principle nudge was meant to capture. Separately, picking "Break a promise" as the *least bad of four* counts against "You keep your word". A relative pick shouldn't count as evidence against an absolute statement.
- *wording:* B51-D `Betray a secret.` → `Turn in a friend.` { LP: -2 }. Note: `For a good enough reason, turning in a friend is what you'd do first. Your duty to what's right comes before loyalty.` Update all four `did` lines to "Of breaking a promise, stealing, cheating or turning in a friend, …".
- *scoring:* remove `B51-A` from `keeps-word` against.

### B52 The One Belief: SHARPEN
"Every life counts equally" is the obvious nice answer. It costs nothing to wish everyone believed it, so it will take a plurality in seconds. Naming what it costs makes it a real choice and sets it directly against "Take care of your own." The question also reads more easily without the inserted clause (author's item 4).
- *wording:* Q → `If you could make everyone on earth truly believe one thing, which would you pick?`
- *wording:* B52-A `Every life counts equally.` → `A stranger's life counts as much as your family's.` (Nudges unchanged. Update the note and `did` to quote the new words. The `distance` support stays and now fits better.)
- *copy:* B52-C note, second sentence "If everyone looked after their own people, fewer would be left alone." argues for the player instead of describing them. Replace with `Looking after your own people comes first for you.`

---

## Top priorities

1. **Stop false lines reaching portraits.** Remove B27 from `machines-matter`, B16 from `credits-luck`, and B08 from `remembers`, so these lines only fire on answers that actually support them. These are shareable statements, and right now they can fire from answers that don't support them.
2. **B08-FU-B copy:** remove "while your grandmother is alive" from the note and `did`. It credits the player with a "later" they never chose.
3. **B26:** say in the trunk that no one knows whether it feels, and give refusal nudges that match the reason the player gave (Rules, not Heart +2 and Disruption −2). Add both follow-ups. This is the trunk most at risk of an 80% answer.
4. **B52 and B51 options:** "Every life counts equally" → "A stranger's life counts as much as your family's"; "Betray a secret" → "Turn in a friend".
5. **Pressure on the side that currently gets none,** starting where the trunk leans hardest: B27 "tell them" (the doctor follow-up), B47 "plug in" (the loved one who won't go in, plus the line about the people who rely on you), and both sides of the heavy B06.

## Notes for Ken

- **Tendencies drawn from the wrong evidence.** Three new tendencies use answers about something else:
  - `machines-matter` ("You don't dismiss a machine that seems to feel") counts "Their happiness is real" and "I tell them yes", which are about your parent's happiness, not about the app. Someone who thinks the app feels nothing, but spares their parent's feelings, could still get this line. I disagree with the author's item 13.
  - `credits-luck` counts an equal prize split, which is about friendship.
  - `remembers` counts telling the family about the grandfather, which is about honesty, not your own memory. I disagree with item 14.

  Without those answers, `machines-matter` and `remembers` each rest on one question and can't fire, because the rule needs answers from 2+ questions. **Recommendation:** leave both inactive until a second question supports them, rather than borrowing evidence.
- **Nudges added to fill weak axes.** Disruption −2 on B26 and B50-C, and Heart vs Thought used as a default extra on B14, B38, B48 and B49, follow the author's own balance table more than the choices themselves. A weak System vs Disruption axis in this world is fine, as the author says. Padding it with nudges the choice doesn't support is worse than leaving it weak.
- **One-sided pressure is this world's main weakness.** 13 of the 15 full questions had a follow-up for only one side, or none at all. Only B48 and B57 already put pressure on everyone. The proposals above add 18 follow-ups. Before applying them, check whether that slows the world too much. If they do, keep B06, B26, B27, B47 and B49 first.
- **Some questions are off-theme.** B11, B16, B17, B38, B54 and B57 are everyday ethics (hiring, prizes, deadlines, reviews), not "the self, reality, memory, meaning and the future". They're good questions, but the Observatory reads as two worlds. Worth deciding whether that matters before the map builder places them.
- **Quick reads and tendencies.** A quick read is a ranking ("which most?"), so a pick shows what you'd choose first, not what you'd never do. Let quick reads support tendencies, but never count *against* one (B51-A against `keeps-word` is the case today).
- **Where I agree with the author.** Keep all three quick reads, and don't enforce "two per session" on a free-roam map (items 1–2, 5). Place B47/B49 and B26/B27 far apart (item 12). Accept the weak System vs Disruption axis (Balance). Keep B16's Loyalty +2 on "I let it go" (item 10). Most of the follow-ups in items 6–7 are adopted above. I replaced six of them (B06 "share", B08 "keep", B11 both sides, B14 "mostly me", B16 "equally" and B54 "take it down"), and each verdict says why.
