# Later worlds: wording and follow-up proposals

*2026-10-07. **Ken approved every recommendation, and it is applied:** all wording, the 19 tier-1 follow-ups, and the rulings. **The 22 tier-2 follow-ups below are NOT applied**; they wait until Ken has played a world. Plan: `game/plan-wording-review.md`.*

As applied, a few ids differ from this file: renamed steps use `fuA`/`fuB` keys (for example B43's old `fu` is `fuA`), Q5-B is `Q5-B2`, Q5's fuA answers are `Q5-FUA2-*`, and B57's follow-up answers are `B57-FUA2-*`/`B57-FUB2-*`. `game/content-*.js` is the source of truth.

These are the merged proposals for the 63 questions in the Neighborhood, City, Coast and Observatory, after four independent reviewers (clarity, neutrality, cold read, depth) and a skeptic judge. Each card is shown whole, as it would read after the change. `[CHANGED, was: "..."]` marks a changed line, and `NEW` marks a new follow-up. Tier 1 means add now; tier 2 means after a play-through.

Ken's open decisions are listed under each question as RULING FOR KEN. The house-style rules behind most changes:
- A setup is a full sentence that adds one fact the question leaves out, and makes sense on its own.
- Every follow-up ends in a question.
- Answers are first person with a full stop, in the same shape.
- Both answers carry a reason of equal weight, or neither does.


# Neighborhood

## B56 The Quiet Loan — REWORD
Problem: The setup is a telegram read before you know the story. Only "let it go" carried a reason. The follow-up has no question, and its "no" does two things at once. People who ask for the money never face a cost.

### trunk
- setup: You'd notice losing $200, but you can manage without it. [CHANGED, was: "$200, six months, not a word. Then the vacation photos."]
- q: Six months ago, a friend borrowed $200 from you. They haven't mentioned it since. Today you see photos from their vacation. What do you do? [CHANGED, was: "Six months ago, a friend borrowed $200 from you. They haven't mentioned it since. You just saw their vacation photos. What do you do?"]
- B56-A: I ask them to pay it back. [CHANGED, was: "Ask them for it directly."]  {"LP":-2,"CI":-1}
- B56-B: I let it go and say nothing. [CHANGED, was: "Let it go. The friendship matters more."]  {"LP":2,"HT":1}

### fu (shown after B56-B)
- setup: You never brought up the first $200. [CHANGED, was: "The first $200 was never mentioned. Now they want more."]
- q: Now they ask to borrow another $200. Do you lend it? [CHANGED, was: "They ask to borrow another $200."]
- B56-FU-A: No. Not until they pay back the first $200. [CHANGED, was: "I say no and bring up the first loan."]  {"LP":-2,"HT":-1}
- B56-FU-B: Yes. I lend it again. [CHANGED, was: "I lend it again."]  {"LP":2,"HT":2}

### NEW fuA, tier 2, shown after B56-A "Ask them for it directly."
- setup: You asked them to pay it back.
- q: They say they forgot, and they're hurt that you'd bring up $200 between friends. Do you still want it back?
- A: Yes. I still want it back.  {"LP":-2,"CI":-1}
- B: No. I tell them to forget it.  {"LP":2,"HT":1}
- Why: Shows whether asking was about fairness, or only easy while it cost the friendship nothing.

## B55 The Bent Rule — REWORD
Problem: The question asks "do you say something?" but the answer is "they give the win back", so the two don't match. Only "no" carried a reason. It assumes you have a child, and it has no follow-up.

### trunk
- setup: If you don't have children, picture a child you're raising. Their friends are still at the table. [CHANGED, was: "Your child, a game with friends. Nobody else noticed."]
- q: Your 10-year-old wins a board game against their friends by knowingly bending a rule. No one else noticed, and they're very happy about the win. Do you make them give up the win? [CHANGED, was: "Your 10-year-old wins a board game against their friends by quietly bending a rule. No one noticed. They're thrilled. Do you say something?"]
- B55-A: Yes. They give up the win. [CHANGED, was: "Yes, and they give the win back."]  {"SD":2,"LP":-1}
- B55-B: No. The win stands, and I don't bring it up. [CHANGED, was: "No. It's a game, and they're happy."]  {"HT":2,"SD":-1}

### NEW fuA, tier 2, shown after B55-A "Yes, and they give the win back."
- setup: You haven't said anything yet.
- q: Your child begs you not to make them do it in front of their friends. They promise they'll never bend a rule again. Do you still have them give up the win?
- A: Yes. They give up the win now.  {"SD":2,"HT":-1}
- B: No. The win stands.  {"HT":2,"SD":-1}
- Why: Tests whether the point is fairness to the friends or teaching your child.

### NEW fuB, tier 2, shown after B55-B "No. It's a game, and they're happy."
- setup: Same bent rule. Bigger stakes.
- q: Picture it at a school board game tournament instead, where the win puts your child in the final. Do you tell the organizers?
- A: Yes. I tell the organizers.  {"SD":2,"LP":-1}
- B: No. The win stands.  {"HT":1,"SD":-1}
- Why: Shows whether "the win stands" was about a small home game, or holds when the rule protects other children's chances.

Judge changed: Cut both first-draft follow-ups (one added no new fact; the other contradicted "no one else noticed") and replaced them. Made "No" carry its cost: you don't bring it up at all.

## B24 The Dog or the Stranger — REWORD
Problem: Every cold reader asked why an unconscious stranger is in your home, and guessed "a burglar", which gives away the follow-up. The "(No dog?)" aside interrupts the question. People who save the dog never face a follow-up.

### trunk
- setup: If you don't have a dog, picture an animal you've loved. There's only time to save one life. [CHANGED, was: "A burning house. Time to reach only one room."]
- q: Your apartment building is on fire. Your dog is trapped in your apartment, and a stranger lies unconscious on another floor. Who do you save? [CHANGED, was: "Your home is on fire. Your dog is trapped in one room and a stranger is unconscious in another. You only have time to reach one. (No dog? Picture an animal you've loved.) Who do you save?"]
- B24-A: The stranger.  {"LP":-2,"HT":-2}
- B24-B: My dog.  {"LP":3,"HT":2}

### fu (shown after B24-A)
- setup: There's still only time to reach one. [CHANGED, was: "Same fire, same choice. Now you know who the stranger is."]
- q: You learn the stranger is the person who set the fire. Who do you save? [CHANGED, was: "You learn the stranger is the person who set the fire."]
- B24-FU-A: I still save the stranger. [CHANGED, was: "I still save them."]  {"LP":-2,"HT":-2}
- B24-FU-B: Then I save my dog.  {"LP":2,"HT":2}

### NEW fuB, tier 2, shown after B24-B "My dog."
- setup: There's still only time to reach one.
- q: Your dog is 15 years old and very sick, with only a few weeks left to live. Who do you save?
- A: Still my dog.  {"LP":2,"HT":2}
- B: Then the stranger.  {"OR":1,"LP":-1}
- Why: Shows whether choosing the dog is about the bond itself, or about the years of life ahead of it.

Judge changed: Moved the stranger to another floor: in the hallway, you'd simply grab them on the way out.

SCORING NOTE: Recommended: B24-FU-B (saving the dog because the stranger set the fire) moves from { LP: 2, HT: 2 } to { LP: 2, OR: −1 }. It's a judgment of what the stranger deserves, not a feeling. The judge agrees.

## B43 The Apology They Want — REWORD
Problem: The dispute is never named, so players invent the stakes. "Peace is worth more than being right" is a proverb that sounds wiser than the other answer. The follow-up calls your apology a "confession". People who refuse never face a cost.

### trunk
- setup: No one is asking you to pay for anything. You'll be neighbors for years. [CHANGED, was: "You're sure you're right. One apology would end it."]
- q: Your neighbor blames you for damage to the fence. You're sure it wasn't you. They say they'll drop it if you apologize. Do you apologize? [CHANGED, was: "You're in a dispute with a neighbor, and you're sure you're right. They say they'll drop it if you apologize. That would make everything easy. Do you apologize?"]
- B43-A: Yes. Ending the fight matters more to me. [CHANGED, was: "Yes. Peace is worth more than being right."]  {"OR":2,"CI":1}
- B43-B: No. I won't apologize for something I didn't do. [CHANGED, was: "No. I won't say sorry for something I didn't do."]  {"OR":-2,"CI":-1}

### fu (shown after B43-A)
- setup: You apologized, and the dispute ended. [CHANGED, was: "Your apology is now being told as a confession."]
- q: Later, you hear they're telling other neighbors you admitted the damage was your fault. What do you do? [CHANGED, was: "Later, they tell other neighbors you admitted you were wrong."]
- B43-FU-A: I let it go.  {"CI":2,"OR":1}
- B43-FU-B: I tell the neighbors what really happened. [CHANGED, was: "I set the record straight."]  {"CI":-2,"OR":-1}

### NEW fuB, tier 1, shown after B43-B "No. I won't say sorry for something I didn't do."
- setup: You didn't apologize. Months have passed.
- q: They still won't speak to you, and other neighbors have started taking sides. One apology would still end it. Do you apologize now?
- A: No. I still won't.  {"OR":-2,"CI":-1}
- B: Yes. Then I apologize.  {"OR":2,"CI":1}
- Why: Shows whether refusing rests on not saying something false, or only holds while it stays cheap.

## B42 The Rumor — REWORD
Problem: "Quietly dropping them" is loaded. The follow-up's setup and question say the same thing twice. People who keep their distance never face a follow-up, so doubt about the facts can't be told apart from wanting to stay safe in the group.

### trunk
- setup: There's no way to find out what really happened. [CHANGED, was: "No proof either way. The group is pulling away."]
- q: A friend in your circle is rumored to have taken money from the group's shared trip fund. There's no proof, and they deny it. Others in the group have started leaving them out. What do you do? [CHANGED, was: "A friend in your circle is rumored to have taken money from a shared trip fund. There's no proof, and they deny it. Others are quietly dropping them. What do you do?"]
- B42-A: I treat them the same as always. [CHANGED, was: "Treat them the same as always."]  {"LP":2,"HT":1}
- B42-B: I keep my distance. [CHANGED, was: "Keep my distance."]  {"LP":-1,"HT":-1}

### fu (shown after B42-A)
- setup: The group is planning its next trip. [CHANGED, was: "Standing by them now has a price for you."]
- q: The others make it clear that if you stick with them, you won't be invited either. Do you still treat them the same? [CHANGED, was: "Standing by them could cost you your place in the group."]
- B42-FU-A: Yes. I still treat them the same. [CHANGED, was: "I still treat them the same."]  {"LP":3}
- B42-FU-B: No. Then I keep my distance. [CHANGED, was: "Then I keep some distance."]  {"CI":-2,"LP":-1}

### NEW fuB, tier 2, shown after B42-B "Keep my distance."
- setup: There's still no proof either way.
- q: You learn the rumor started with someone who has a grudge against them. Do you go back to treating them as before?
- A: Yes. I treat them the same again.  {"LP":2,"HT":1}
- B: No. I still keep my distance.  {"LP":-1,"CI":-1}
- Why: Weakens the rumor without proving anything, so whoever still stays away is protecting their place, not judging the facts.

## B44 The Unlocked Phone — REWORD
Problem: "No" carried a reason ("their private space") while "yes" was belittled as "a quick look". The setup argued for no. Every cold reader's first thought was "I'd just ask them". People who look never face a follow-up.

### trunk
- setup: Last week you asked your partner if anything was wrong. They said everything's fine. [CHANGED, was: "Unlocked, right there. Only a vague feeling, nothing more."]
- q: Your partner leaves their phone unlocked on the table and steps into the shower. Lately you've had a vague feeling something is off. They'd never know if you looked. Do you look? [CHANGED, was: "Your partner leaves their phone unlocked on the table and steps into the shower. Lately you've had a vague feeling something is off. Do you look?"]
- B44-A: No. I don't look. [CHANGED, was: "No. That's their private space."]  {"OR":-2}
- B44-B: Yes. I look. [CHANGED, was: "Yes, a quick look."]  {"OR":2,"CI":-1}

### fu (shown after B44-A)
- setup: Another evening. The phone is unlocked again, and they're in the shower. [CHANGED, was: "Now there's a reason, not just a feeling."]
- q: Earlier that day, a friend told you they saw your partner on what looked like a date. Do you look now? [CHANGED, was: "A friend says they saw your partner on what looked like a date."]
- B44-FU-A: Yes. Now I look. [CHANGED, was: "Now I look."]  {"OR":2,"CI":-1}
- B44-FU-B: No. I still don't look. [CHANGED, was: "Still no."]  {"OR":-3}

### NEW fuB, tier 1, shown after B44-B "Yes, a quick look."
- setup: They'd still never know you looked.
- q: They once said that if you ever went through their phone, it would be over between you. Do you still look?
- A: Yes. I still look.  {"OR":2,"CI":-1}
- B: No. Then I don't.  {"OR":-2}
- Why: Adds consent, a lever no other Neighborhood follow-up uses: does your need to know outweigh a line your partner drew?

## B46 The Nightly Call — REWORD
Problem: "Your own life is slipping" and "pull back" are idioms. Every cold reader thought "tell them to see a therapist", and nothing closes that. People who keep taking the calls never face a cost.

### trunk
- setup: Your friend won't see a therapist. This has gone on for two months. [CHANGED, was: "An hour, every night. Your own life is slipping."]
- q: A friend going through a hard time calls you every night for an hour. You're exhausted, and your sleep and work are suffering. What do you do? [CHANGED, was: "A friend going through a hard time calls you every night for an hour. It's wearing you down, and your own life is slipping. What do you do?"]
- B46-A: I keep taking every call. [CHANGED, was: "Keep taking every call."]  {"CI":2,"HT":2}
- B46-B: I tell them I can't talk every night. [CHANGED, was: "Tell them I need to pull back."]  {"CI":-2,"HT":-1}

### fu (shown after B46-B)
- setup: You don't know of anyone else they could turn to. [CHANGED, was: "You might be all they have."]
- q: When you tell them, they say you're the only person they can talk to. What do you do? [CHANGED, was: "They say you're the only person they can talk to."]
- B46-FU-A: Then I keep taking every call. [CHANGED, was: "Then I keep going."]  {"HT":2,"CI":1}
- B46-FU-B: I still cut back the calls. [CHANGED, was: "I still pull back."]  {"CI":-2,"HT":-1}

### NEW fuA, tier 2, shown after B46-A "Keep taking every call."
- setup: Four months later, nothing has changed.
- q: They still call every night. Your doctor says the lost sleep is making you ill. Do you keep taking every call?
- A: Yes. I keep taking them.  {"CI":2,"HT":2}
- B: No. I tell them I can't talk every night.  {"CI":-2,"HT":-1}
- Why: Separates a sacrifice for a hard stretch from one with no end in sight. Uses your health, not your job, which is already overused as a lever.

## Q3 The Confession — REWORD
Problem: The setup "It's confirmed." means nothing until you've read the question. Cold readers dodged with "you tell them, or I will". The friend's claim that telling "would only end the marriage" reads as a fact from the narrator.

### trunk
- setup: Two of your friends are a couple. You're closer to one of them. [CHANGED, was: "It's confirmed. You're friends with both, closer to the one who told you."]
- q: The friend you're closer to tells you they've been cheating on their partner. You've asked them to tell their partner, and they won't. What do you do? [CHANGED, was: "A close friend tells you they have been cheating on their partner. Their partner is also your friend. What do you do?"]
- Q3-A: I tell the partner. They deserve to know. [CHANGED, was: "Tell the partner. They deserve to know."]  {"LP":-2,"OR":-1}
- Q3-B: I stay out of it. It's not my place. [CHANGED, was: "Stay out of it. It's not my place."]  {"LP":2,"HT":1}

### fuA (shown after Q3-A)
- setup: You have no way to check whether the affair is really over. [CHANGED, was: "They swear it's over. You can't check either way."]
- q: Before you do, your friend begs you not to. They swear the affair is over and say telling would end the marriage. Do you still tell? [CHANGED, was: "Before you do, your friend begs you not to. They swear the affair is over, and telling would only end the marriage. What now?"]
- Q3-FUA-A: Yes. I tell the partner anyway. [CHANGED, was: "I tell the partner anyway"]  {"LP":-2,"OR":-2}
- Q3-FUA-B: No. I keep the secret. [CHANGED, was: "I keep the secret"]  {"LP":2,"OR":1,"HT":1}

### fuB (shown after Q3-B)
- setup: No one else is around. Saying "I don't know" would be a lie. [CHANGED, was: "They ask you in private. "I don't know" would be a lie."]
- q: Months later, the partner asks you directly: "Is something going on? Please tell me." What do you say? [CHANGED, was: "Months later, the partner asks you directly: "Is something going on? Please tell me.""]
- Q3-FUB-A: I tell them the truth. [CHANGED, was: "I tell them the truth"]  {"LP":-2,"OR":-2}
- Q3-FUB-B: I say I don't know. [CHANGED, was: "I say I don't know"]  {"LP":3,"OR":1}

### NEW fuAA (second follow-up), tier 1, shown after Q3-FUA-B "I keep the secret"
- setup: You kept the secret. Months have passed.
- q: You find out the affair never ended. Do you tell the partner now?
- A: Yes. I tell them now.  {"LP":-2,"OR":-1}
- B: No. I still keep it.  {"LP":3}
- Why: A follow-up after a follow-up. It removes the friend's reason ("it's over"), so whoever still keeps the secret is loyal to the friend no matter what.

Judge changed: Dropped "Your friend lied to you too" from the new step: the fact alone does the work, and the extra push made the flip near-certain.

SCORING NOTE: Recommended: raise the weight of the follow-up where the partner asks you directly to 2, since lying to a friend's face is a heavy answer. The judge agrees.

## B45 The Friend's Big Break — RETHINK
Problem: It asks you to confess a feeling, and "the sting" is an idiom. The follow-up asks whether luck makes it "easier" or "harder" without saying easier to do what, and it shows almost nothing.

### trunk
- setup: There's no wrong answer. Most people feel a mix of things. [CHANGED, was: "Your close friend. Your dream. They called you first."]
- q: Your close friend suddenly gets the exact success you've wanted for years. They call you first to tell you. Honestly, which feeling is stronger? [CHANGED, was: "Your close friend suddenly gets the exact success you've wanted for years. They call you first to share the news. Most people feel a mix of things in moments like this. Honestly, which is stronger?"]
- B45-A: Happiness for them.  {"CI":2,"HT":1}
- B45-B: Hurt that it wasn't me. [CHANGED, was: "The sting."]  {"CI":-2}

### fu (shown after B45-A, B45-B)  [REPLACED below]
- setup: They weren't more talented than you. They got lucky.
- q: You learn they got it mostly through luck, not more talent than you.
- B45-FU-A: That makes it easier.  {"CI":1}
- B45-FU-B: That makes it harder.  {"CI":-1}

### NEW fuA (replaces fu), tier 1, shown after B45-A "Happiness for them."
- setup: Their win had a cost for you.
- q: You learn their win is why your own project lost its funding. You were both up for the same money. Honestly, which feeling is stronger now?
- A: Still happiness for them.  {"CI":2}
- B: Hurt at what I lost.  {"CI":-2}
- Why: Shows whether the happiness holds once their gain is your loss. Replaces the luck follow-up for this side.

### NEW fuB (replaces fu), tier 1, shown after B45-B "The sting."
- setup: Your friend wants your help.
- q: They ask you to help them in the new role, a few evenings a month, unpaid, because you know the field well. Do you help?
- A: Yes. I help them.  {"CI":2,"LP":1}
- B: No. I tell them I can't.  {"CI":-2}
- Why: Turns the hurt into a choice that costs you something. Replaces the luck follow-up for this side.

Judge changed: Cut the first draft's dinner follow-up: nearly everyone defends a close friend, and staying silent was an obvious third option.

RULING FOR KEN: Keep B45 as a question about a feeling (my recommendation: it's a light stop, and "Honestly" gives people permission to admit the hurt), or turn it into a choice, such as whether you go and give a toast at their celebration. The depth reviewer warns the toast would be a near-unanimous yes.

## B36 What Forgiveness Is Owed — REWORD
Problem: "Forgiveness is a gift, never a debt" is a slogan you could put on a mug, and it reads as the wise answer. In the follow-up both answers are slogans, and the second one sounds wiser.

### trunk
- setup: You believe both the apology and the change are real. [CHANGED, was: "A sincere apology. A whole year of real change."]
- q: Someone close to you betrayed you badly. They've apologized sincerely, and in the year since, they've really changed. Do you owe them forgiveness? [CHANGED, was: "Someone close to you betrayed you badly. They've apologized sincerely, and over a year they've really changed. Do you owe them forgiveness?"]
- B36-A: Yes. They've earned it. [CHANGED, was: "Yes. They've done what they can."]  {"CI":1,"HT":1}
- B36-B: No. I don't owe it, even now. [CHANGED, was: "No. Forgiveness is a gift, never a debt."]  {"CI":-1,"HT":-1}

### fu (shown after B36-A, B36-B)
- setup: Whatever you decided about forgiveness, this is a separate choice. [CHANGED, was: "They want things back the way they were."]
- q: They ask if the two of you can be as close as before. Do you agree? [CHANGED, was: "They ask to be as close as you were before."]
- B36-FU-A: Yes. We go back to how we were. [CHANGED, was: "Yes. If I forgive, I forgive."]  {"HT":2,"LP":1}
- B36-FU-B: No. I keep some distance. [CHANGED, was: "No. Forgiving isn't the same as trusting again."]  {"HT":-2}

## D7 The Uncomfortable Truth — REWORD
Problem: The setup repeats the question. "They've been honest since" could mean your friend. Only "stay quiet" carried a reason. Cold readers dodged with "make the fiancé tell them". People who tell never face a cost.

### trunk
- setup: Your close friend's wedding is next month. [CHANGED, was: "It's confirmed and long past. They've been honest since."]
- q: You find out from public court records that their fiancé served two years in prison for fraud, long ago, and has lived honestly since. Your friend doesn't know. The fiancé knows you found out and asks you to keep it private. Do you tell your friend? [CHANGED, was: "You learn your close friend's fiancé served two years in prison for fraud, long ago. They've been honest since. Your friend doesn't know, and the wedding is next month. Do you tell your friend?"]
- D7-A: Yes. My friend should know before the wedding. [CHANGED, was: "Tell them"]  {"HT":-2,"LP":1}
- D7-B: No. It's the fiancé's past to share. [CHANGED, was: "Stay quiet. It's the fiancé's story to tell."]  {"HT":2,"LP":-1}

### fu (shown after D7-B)
- setup: You've said nothing so far. [CHANGED, was: "Saying "no" would be a direct lie."]
- q: Your friend asks you, "Is there anything I should know before I marry them?" Saying no would be a lie. What do you say? [CHANGED, was: "Your friend asks you, "Is there anything I should know before I marry them?""]
- D7-FU-A: I tell them about the prison time. [CHANGED, was: "I tell them"]  {"OR":-2,"LP":1}
- D7-FU-B: I say no. [CHANGED, was: "I say no"]  {"OR":2,"LP":-1}

### NEW fuA, tier 2, shown after D7-A "Tell them"
- setup: You haven't told your friend yet.
- q: If you tell, your friend will likely call off the wedding. They've never seemed happier. Do you still tell them?
- A: Yes. I still tell them.  {"HT":-2,"OR":-1}
- B: No. Then I stay quiet.  {"HT":2,"OR":1}
- Why: Makes the cost of telling concrete, so "they should know" has to hold against the wedding ending.

Judge changed: Removed "the fiancé refused": it made the fiancé look like they're hiding something, which pushes toward telling.

## B10 What We Owe Our Parents — REWORD
Problem: "There's nothing wrong with them" makes the parents simply unreasonable, so "marry" wins too easily. "Them" could mean the parents. "Doesn't buy a veto" is a metaphor. It's one of the heaviest questions in the game and has no follow-up.

### trunk
- setup: Your parents have explained their reasons. You've thought hard about them, and you still disagree. They mean what they say. [CHANGED, was: "Nothing is wrong with the person. Your parents mean it."]
- q: Your parents gave up a lot to raise you. They oppose the person you want to marry. They say that if you marry, they will never see you again. Do you marry anyway? [CHANGED, was: "Your parents gave up a lot to raise you. They oppose the person you want to marry, though there's nothing wrong with them. Your parents say that if you marry, they won't see you again. Do you marry them anyway?"]
- B10-A: No. After everything, I owe my parents that.  {"CI":2,"SD":2}
- B10-B: Yes. Raising me doesn't give them the right to choose for me. [CHANGED, was: "Yes. What they gave me doesn't buy a veto."]  {"CI":-2,"SD":-2}

### NEW fuA, tier 1, shown after B10-A "No. After everything, I owe my parents that."
- setup: Your parents make their terms clear.
- q: It isn't only this person. Your parents expect to approve whoever you marry, now or later. Do you still go along with them?
- A: Yes. I still go along with them.  {"CI":2,"SD":2}
- B: No. Then I marry this person.  {"CI":-2,"SD":-2}
- Why: Shows whether "I owe them" is a debt with limits or a lifelong right to decide for you.

### NEW fuB, tier 1, shown after B10-B "Yes. What they gave me doesn't buy a veto."
- setup: Waiting won't help. They won't see you while you're with this person, married or not.
- q: One of your parents becomes seriously ill and may not have long. Do you stay with this person?
- A: Yes. I stay with them.  {"CI":-2,"SD":-2}
- B: No. Then I give up this person.  {"CI":2,"HT":2}
- Why: Makes the cost final, so "they don't get to choose" has to hold when it may mean never seeing a parent again.

Judge changed: Closed the "wait until the parent dies, then marry" dodge in the second follow-up.

RULING FOR KEN: How the parents are framed. Now: "there's nothing wrong with" the partner (parents look unreasonable). Proposed: the parents have reasons you don't share. The cold reader suggested "they won't say why". I recommend the proposed version: it keeps both answers defensible.

## Q5 The Inheritance — RETHINK
Problem: It never says the parent has died, so every careful reader's answer is "ask them to update the will", and the dilemma disappears. "Take it all" doesn't say how you could, when the will says split.

### trunk
- setup: Your parent has died, clear-minded to the end. No one else heard what they told you. Your sibling trusts you completely. [CHANGED, was: "The will is legal. Your parent is clear-minded. Your sibling doesn't know."]
- q: Your parent's will splits everything equally between you and your sibling. Before they died, they told you in private that they wanted you to have it all, but they never changed the will. What do you do? [CHANGED, was: "Your parent's will splits their estate equally between you and your sibling. In private, your parent says they now want you to have everything, but the will was never updated. What do you do?"]
- Q5-A: I follow the will and split it equally. [CHANGED, was: "Follow the will. Split it equally."]  {"SD":2,"OR":-1,"HT":-1}
- Q5-B: I tell my sibling what our parent wanted, and ask for it all. [CHANGED, was: "Honor my parent's request. Take it all."]  {"SD":-2,"CI":-1,"HT":1}

### fuA (shown after Q5-A)
- setup: The will still says to split it equally. [CHANGED, was: "Your sibling stayed away ten years. You did the caregiving."]
- q: Then you learn why your parent changed their mind: your sibling hadn't spoken to them in ten years, while you did all the caregiving. Do you still split it? [CHANGED, was: "You learn why your parent changed their mind: your sibling hadn't spoken to them in ten years. You did all the caregiving."]
- Q5-FUA-A: No. Then I tell my sibling and ask for it all. [CHANGED, was: "Then I take it all"]  {"SD":-2,"CI":-1}
- Q5-FUA-B: Yes. I still split it equally. [CHANGED, was: "I still split it equally"]  {"SD":2,"OR":-1}

### fuB (shown after Q5-B)
- setup: Your sibling has agreed to go along with it. You have plenty of money yourself. [CHANGED, was: "Your sibling still doesn't know. You're comfortable either way."]
- q: You learn your sibling is struggling to pay their bills. Do you still take it all? [CHANGED, was: "You learn your sibling is struggling to pay their bills. You're comfortable. Does that change anything?"]
- Q5-FUB-A: Yes. It was our parent's wish. [CHANGED, was: "No. This was our parent's wish."]  {"CI":-2,"OR":-1}
- Q5-FUB-B: No. I split it after all. [CHANGED, was: "Yes. I split it after all."]  {"HT":2,"CI":2}

Judge changed: "Take it all" became "ask for it all": the will splits the estate, so your sibling has to give up their half.

RULING FOR KEN: How "take it all" happens. Proposed: the parent has died, your sibling trusts you completely, and the answer becomes "I tell my sibling what our parent wanted, and ask for it all". The will splits the estate, so your sibling has to agree to give up their half. That makes it an open request, not a quiet taking.

SCORING NOTE: Recommended: Q5-B moves from System −2 to System −1, because it's now an open request, not a quiet taking. The judge agrees.

## D1 The Promise About the Home — REWORD
Problem: The setup mentions "a good, affordable home" before the question has introduced a care home. In the first follow-up one answer sounds cold and the other loving, so the wording picks the loving one. The second follow-up's setup ("this usually fades") refers to crying the player hasn't read yet. "Strain your own family" assumes a partner or children.

### trunk
- setup: A good care home nearby has room, and you can afford it. [CHANGED, was: "A good, affordable home exists. You promised while they were well."]
- q: Your parent has advanced dementia. Caring for them at home would take most of your free time for years and strain your health, work and relationships. Years ago, they made you promise you'd never put them in a care home. What do you do? [CHANGED, was: "Your parent has advanced dementia. Caring for them at home would take most of your free time for years and strain your own family. Years ago, they made you promise you'd never put them in a care home. A good one is available. What do you do?"]
- D1-A: I keep the promise and care for them at home. [CHANGED, was: "Keep the promise and care for them at home"]  {"OR":-2,"HT":1}
- D1-B: I move them to the care home. [CHANGED, was: "Move them to the care home"]  {"OR":2,"HT":-1}

### fuA (shown after D1-A)
- setup: Caring for them still takes most of your free time. [CHANGED, was: "They're calm and content with any kind caregiver."]
- q: They no longer recognize you. They're calm with anyone who is kind to them. Do you still care for them at home? [CHANGED, was: "They no longer recognize you. They're calm with anyone who is kind to them. Does that change things?"]
- D1-FUA-A: No. Now I move them. [CHANGED, was: "Yes. I move them. The person I promised isn't really there anymore."]  {"OR":2,"HT":-2}
- D1-FUA-B: Yes. I keep caring for them at home. [CHANGED, was: "No. It's still them, and a promise is a promise."]  {"OR":-2,"HT":1}

### fuB (shown after D1-B)
- setup: You visit them every few days. [CHANGED, was: "Staff say this usually fades. There's no guarantee."]
- q: They cry every time you leave and beg to go home. The staff say this usually fades, but there's no guarantee. Do you bring them home? [CHANGED, was: "At the home, they cry every time you leave and beg to go home."]
- D1-FUB-A: Yes. I bring them home. [CHANGED, was: "I bring them home"]  {"HT":3}
- D1-FUB-B: No. They stay. [CHANGED, was: "They stay"]  {"HT":-2,"OR":1}

# City

## Q11 The Autonomous Car — REWORD
Problem: "Save the five" names what one answer gains but not what either costs. The first follow-up assumes you have children. "Turn on its passenger" was read as "switch on".

### trunk
- setup: The brakes can't be fixed in time. Everyone involved is an adult stranger to you. [CHANGED, was: "No brakes. Everyone involved is an adult stranger."]
- q: A self-driving car's brakes fail. It can hit five pedestrians, or swerve into a wall and kill its one passenger. If you set the rule for every car, what should it do?
- Q11-A: Swerve and kill the passenger. Save the five. [CHANGED, was: "Swerve. Save the five"]  {"OR":3,"CI":2}
- Q11-B: Stay on course and hit the five. Save the passenger. [CHANGED, was: "Protect the passenger"]  {"OR":-2,"CI":-1}

### fuA (shown after Q11-A)
- setup: The rule applies to every car, with no exceptions. [CHANGED, was: "Every car follows your rule, including the ones your family rides in."]
- q: The people you love most will ride in these cars every day. Do you keep the rule? [CHANGED, was: "Your own children will ride in these cars every day. Do you keep the rule?"]
- Q11-FUA2-A: Yes. Same rule for them. [CHANGED, was: "Yes. Same rule for my family"]  {"OR":1,"CI":1,"LP":-2}
- Q11-FUA2-B: No. Then protect the passenger. [CHANGED, was: "No. Then protect the passenger"]  {"CI":-2,"LP":2}

### fuB (shown after Q11-B)
- setup: The five were crossing lawfully.
- q: The passenger chose to get in the car. The five people crossing chose nothing. Does that change your rule? [CHANGED, was: "The passenger chose to ride. The five pedestrians chose nothing. Does that change it?"]
- Q11-FUB-A: Yes. Then swerve. [CHANGED, was: "Yes. Then swerve"]  {"OR":1,"CI":1}
- Q11-FUB-B: No. The car should protect the person inside it. [CHANGED, was: "No. The car shouldn't turn on its passenger"]  {"OR":-2,"CI":-1}

## B12 Two Drivers — REWORD
Problem: The setup is fragments. It doesn't say whether three drinks is over the limit or how badly the child was hurt. In the follow-up only one answer carries a reason. People who say "worse" never face a follow-up.

### trunk
- setup: Here, three drinks is over the legal limit for driving. [CHANGED, was: "Same drinks, same road, same care."]
- q: Two friends each have three drinks and drive home the same way, equally carefully. A child runs into the road in front of one of them, and that driver hits the child, who is badly hurt. The other gets home safely. Did they do something equally wrong? [CHANGED, was: "Two friends each have three drinks and drive home the same way, equally carefully. A child runs into the road in front of one of them, and that driver hits the child. The other gets home without incident. Did they do something equally wrong?"]
- B12-A: Yes. They made the same choice.  {"OR":-2,"HT":-1}
- B12-B: No. The one who hit the child did something worse.  {"OR":2,"HT":1}

### fu (shown after B12-A)
- setup: Now the question is what the law should do. [CHANGED, was: "Now it's about what the law should do."]
- q: Should they get the same punishment?
- B12-FU-A: Yes. The same punishment. [CHANGED, was: "Yes."]  {"OR":-2,"HT":-1}
- B12-FU-B: No. The one who hit the child should get more. [CHANGED, was: "No. What actually happened has to matter in the law."]  {"OR":1,"SD":1}

### NEW fuB, tier 1, shown after B12-B "No. The one who hit the child did something worse."
- setup: One more fact about the child.
- q: The child ran out so suddenly that a sober driver would have hit them too. Did the one who hit the child still do worse?
- A: Yes. They still did worse.  {"OR":2}
- B: No. Then they did the same wrong.  {"OR":-1,"HT":-1}
- Why: Separates judging by what happened from judging by what the drinking caused, which is exactly what the question asks.

## B03 The Reference Call — REWORD
Problem: The setup is three fragments. Calling one answer "the honest picture" labels the other dishonest before the player chooses. Cold readers dodged with "I'd just decline to give a reference". The follow-ups have no question.

### trunk
- setup: You were their manager. If you won't give a reference, they won't get the job. [CHANGED, was: "Pleasant but unreliable. Eight months out of work. Two kids."]
- q: A former employee of yours was pleasant but unreliable: missed deadlines, sometimes didn't show up. They've been out of work for 8 months and support two kids. A hiring manager calls you for a reference. What do you say?
- B03-A: I tell them everything, problems included. [CHANGED, was: "The honest picture, problems included."]  {"HT":-2,"LP":-1,"OR":-1}
- B03-B: I mention only the good parts. [CHANGED, was: "The good parts. I leave out the rest."]  {"HT":2,"LP":1}

### fuA (shown after B03-A)
- setup: They're one of two finalists, and they still support two kids. [CHANGED, was: "Eight months out of work. Two kids. It comes down to you."]
- q: The hiring manager says your reference will decide it. Do you still mention the problems? [CHANGED, was: "The hiring manager says your answer will decide it."]
- B03-FUA-A: Yes. I still mention them. [CHANGED, was: "I still give the honest picture."]  {"HT":-2,"OR":-1}
- B03-FUA-B: No. Then I leave them out. [CHANGED, was: "Then I leave out the problems."]  {"HT":2,"LP":1}

### fuB (shown after B03-B)
- setup: Then you find out what the job is. [CHANGED, was: "Now other people depend on this person showing up."]
- q: It's at a daycare. When a worker doesn't show up, families get turned away for the day. Do you mention the missed days now? [CHANGED, was: "The job is at a daycare. When a worker doesn't show, families get turned away for the day."]
- B03-FUB2-A: Yes. I tell them about the missed days. [CHANGED, was: "Then I tell them about the reliability problem."]  {"CI":2,"LP":-2}
- B03-FUB2-B: No. I stick with what I said. [CHANGED, was: "I stick with what I said."]  {"LP":2,"HT":1,"CI":-1}

## B04 The Company Line — KEEP
Problem: The cold reader's favorite card: every player hesitated. Only small fixes: "I say what I was told" makes one answer sound servile, "the company line" is an idiom, and "save a wedding order" can be misread.

### trunk
- setup: Your manager is standing right there, listening. [CHANGED, was: "Your manager is right there. The customer asks you directly."]
- q: Your manager tells you to blame a late order on a "supplier issue." The real reason is that your company put bigger clients first. A customer asks you: "Is it really the supplier?" What do you say? [CHANGED, was: "Your manager tells you to blame a late order on a "supplier issue." The real reason is that your company put bigger clients first. With your manager standing right there, a customer asks you: "Is it really the supplier?" What do you say?"]
- B04-A: "Yes, it's the supplier." [CHANGED, was: ""Yes, it's the supplier." I say what I was told."]  {"SD":2,"CI":-1}
- B04-B: "No. We put bigger clients first."  {"SD":-2,"OR":-1}

### fuA (shown after B04-A)
- setup: Your manager is still listening. [CHANGED, was: "Same question. Now the truth could help them."]
- q: The customer runs a small bakery. If they knew the real reason, they'd order from a competitor today and still deliver a wedding cake on time. Do you tell them? [CHANGED, was: "The customer is a small bakery. If they knew the real reason, they'd order from a competitor today and save a wedding order."]
- B04-FUA-A: No. I still say it's the supplier. [CHANGED, was: "I still give the company line."]  {"SD":2,"CI":-1}
- B04-FUA-B: Yes. I tell them the truth. [CHANGED, was: "I tell them the truth."]  {"SD":-2,"HT":2}

### fuB (shown after B04-B)
- setup: Your manager has warned you before.
- q: Last month, your manager said one more mistake and you're fired. Do you still tell the truth? [CHANGED, was: "Last month your manager said one more mistake and you're fired."]
- B04-FUB-A: I still tell the truth.  {"SD":-2,"CI":1}
- B04-FUB-B: Then I say it's the supplier.  {"CI":-2,"SD":1}

## B05 The Mistake No One Saw — REWORD
Problem: "Your coworker took the blame" could mean they chose to. Only "no" carried a reason, with a loaded "only". Confessing costs nothing to click.

### trunk
- setup: Only you know what really happened. [CHANGED, was: "Years ago. They never found out. They're doing fine now."]
- q: Years ago, you made a mistake on a shared project, and your coworker was blamed for it. It cost them a promotion. They never found out, and today they're doing fine. Do you tell them? [CHANGED, was: "Years ago, you made a mistake on a shared project, and your coworker took the blame. It cost them a promotion. They never found out, and today they're doing fine. Do you tell them?"]
- B05-A: Yes. I tell them and apologize. [CHANGED, was: "Yes, and apologize."]  {"OR":-2,"HT":-1}
- B05-B: No. I leave it in the past. [CHANGED, was: "No. It would only hurt them now."]  {"OR":2,"HT":1}

### fu (shown after B05-B)
- setup: You still haven't told them. [CHANGED, was: "The lost promotion still weighs on them."]
- q: They mention that losing that promotion still makes them doubt themselves. Do you tell them now? [CHANGED, was: "They mention that losing that promotion still makes them doubt themselves."]
- B05-FU-A: Yes. Then I tell them. [CHANGED, was: "Then I tell them."]  {"HT":2,"OR":1}
- B05-FU-B: No. I still don't. [CHANGED, was: "Still no."]  {"CI":-2}

### NEW fuA, tier 1, shown after B05-A "Yes, and apologize."
- setup: You haven't told them yet.
- q: Your coworker has since become one of your closest friends. Telling them could change that. Do you still tell them?
- A: Yes. I still tell them.  {"OR":-2,"HT":-1}
- B: No. Then I keep it to myself.  {"OR":2,"LP":1}
- Why: Puts a price on owning up: a close friendship. The City already leans hard on job threats.

Judge changed: Swapped the first draft's raise threat for a friendship: the City already uses work as the lever in five other questions.

## B30 The Permit Fee — REWORD
Problem: "Fee" in scare quotes confused the second-language reader. It doesn't say whether paying is illegal. "Locals pay it without thinking twice" leans toward paying. People who pay never face a follow-up.

### trunk
- setup: You've moved abroad for work. [CHANGED, was: "You're entitled to the permit. Paying is normal here."]
- q: You need a permit you're entitled to. Everyone knows the official expects a small cash payment on the side. It's against the law, but locals always pay, and no one is ever charged. Do you pay? [CHANGED, was: "You're living in another country and need a permit you're entitled to. Everyone knows the official expects a small cash "fee." Locals pay it without thinking twice. Do you pay?"]
- B30-A: Yes. That's how it works here.  {"OR":2,"SD":-1,"CI":-1}
- B30-B: No, even if it takes months longer.  {"OR":-2,"SD":1,"CI":1}

### fu (shown after B30-B)
- setup: The official won't process your permit without the payment. [CHANGED, was: "Now refusing costs you the reason you came."]
- q: Without the permit, you can't start the job you moved there for. Do you pay? [CHANGED, was: "Without the permit, you can't start the job you moved there for."]
- B30-FU-A: Yes. Then I pay. [CHANGED, was: "Then I pay."]  {"OR":2,"SD":-1}
- B30-FU-B: No. I still don't pay. [CHANGED, was: "Still no."]  {"OR":-2,"SD":1}

### NEW fuA, tier 2, shown after B30-A "Yes. That's how it works here."
- setup: You haven't paid yet.
- q: Each payment moves someone ahead of the people who can't pay. Your neighbor can't afford it and has waited a year for the same permit. Do you still pay?
- A: Yes. I still pay.  {"CI":-2,"OR":1}
- B: No. Then I refuse.  {"CI":2,"SD":1}
- Why: Tests "that's how it works here" against who the custom shuts out. (City judge's deferred list.)

## B32 The Call-Up — REWORD
Problem: Refusing "and accept the consequences" sounds brave, while serving "because my country asked" sounds like following orders. "Call-up" is unfamiliar. Cold readers dodged with "a non-combat role". People who serve never face a follow-up.

### trunk
- setup: There's no role that keeps you out of combat. [CHANGED, was: "You believe this war is wrong. The call-up is official."]
- q: Your country goes to war, and you believe this war is wrong. You're drafted to fight. Refusing means prison. Leaving means you can never come back. What do you do? [CHANGED, was: "Your country goes to war. You believe this war is wrong. You're called up to serve. What do you do?"]
- B32-A: I serve. [CHANGED, was: "I serve. My country asked."]  {"SD":3,"CI":1}
- B32-B: I refuse and go to prison. [CHANGED, was: "I refuse and accept the consequences, even prison."]  {"SD":-2,"OR":-2}
- B32-C: I leave the country for good.  {"SD":-2,"CI":-2}

### fuB (shown after B32-B, B32-C)
- setup: Years later, a different war. Anyone who left may come back to fight. [CHANGED, was: "A different war. This time your country is invaded."]
- q: Your country has been invaded. The leaders who started the wrong war are still in charge. Would you fight?
- B32-FUB-A: Yes. I'd fight to defend my home.  {"LP":1,"SD":1,"OR":1}
- B32-FUB-B: No. I still won't fight.  {"SD":-1,"OR":-2}

### NEW fuA, tier 1, shown after B32-A "I serve. My country asked."
- setup: You're serving. Refusing an order means prison.
- q: Your unit is ordered to blow up a bridge that villagers use to reach the only hospital. Your officers say it will slow the enemy. Do you follow the order?
- A: Yes. I follow it.  {"SD":2,"OR":1}
- B: No. I refuse.  {"SD":-3}
- Why: Shows whether serving a war you think is wrong extends to doing harm you can see.

## B33 The Man Who Changed — REWORD
Problem: "Twenty-six years later" makes readers do arithmetic before they know the story. In the follow-up, "I understand, but no" sounds more considerate than the other answer. The "prison" side never faces a follow-up.

### trunk
- setup: The evidence is solid, and the law still allows a trial. [CHANGED, was: "Twenty-six years later. He was never caught until now."]
- q: At 19, a man badly hurt someone in a robbery and was never caught. He's now 45: a teacher, a father, a volunteer. New evidence surfaces. Should he go to prison?
- B33-A: Yes. Justice doesn't expire.  {"SD":2,"OR":-2}
- B33-B: No. He's not that person anymore.  {"OR":2,"SD":-1,"HT":1}

### fu (shown after B33-B)
- setup: Nothing about the man has changed. [CHANGED, was: "The person he hurt has never recovered."]
- q: The person he hurt still lives with daily pain and wants him prosecuted. Should he go to prison? [CHANGED, was: "The person he hurt still lives with daily pain and wants him prosecuted."]
- B33-FU-A: Yes. Then he should. [CHANGED, was: "Then yes, prosecute."]  {"SD":2,"HT":1}
- B33-FU-B: No. He still shouldn't. [CHANGED, was: "I understand, but no."]  {"SD":-2,"OR":1}

### NEW fuA, tier 1, shown after B33-A "Yes. Justice doesn't expire."
- setup: Nothing else about the case has changed.
- q: It wasn't new evidence. He walked into a police station and confessed on his own. Should he still go to prison?
- A: Yes. He should still go.  {"SD":2,"OR":-1}
- B: No. Then no prison.  {"OR":1,"HT":1}
- Why: Tests "justice doesn't expire" against a man who turned himself in.

Judge changed: Cut the first draft's "the victim forgives him": it's the same follow-up as B34, the very next City stop.

## B34 The Remorse Pill — KEEP
Problem: Balanced and both sides already face a follow-up. Only the follow-ups need real questions, and "walk free" and "get away with" are idioms.

### trunk
- setup: Assume the pill is proven to work, and the effect is permanent. [CHANGED, was: "The pill works. They will never do it again."]
- q: A pill makes anyone who takes it deeply sorry for their crime and unable to ever do it again. A person convicted of assault has taken it. Should they still serve their prison sentence?
- B34-A: Yes. They still deserve it.  {"OR":-2,"SD":1}
- B34-B: No. There's nothing left for prison to do.  {"OR":3,"SD":-1}

### fuA (shown after B34-A)
- setup: The pill still works. Now the person they hurt has spoken.
- q: The person they assaulted has forgiven them and asks the court to let them go. Should they still serve? [CHANGED, was: "The person they assaulted has forgiven them and asks the court to let them go."]
- B34-FUA-A: They should still serve.  {"OR":-2,"SD":1}
- B34-FUA-B: Then let them go.  {"HT":2,"OR":1}

### fuB (shown after B34-B)
- setup: Other people are watching how the case ends. [CHANGED, was: "Now think about everyone else watching the case."]
- q: If this person goes free, others may decide crime goes unpunished. Should they serve after all? [CHANGED, was: "If they walk free, others may think they can get away with crime."]
- B34-FUB-A: Yes. Then they should serve. [CHANGED, was: "Then they should serve."]  {"CI":2,"OR":1,"SD":1}
- B34-FUB-B: No. That's not a reason to punish this person. [CHANGED, was: "That's not a reason to punish this person."]  {"OR":-2,"CI":-1}

## B35 The True Story — REWORD
Problem: "Seriously hurt" is vague. "They earned it" sounds vindictive. Cold readers dodged with "give it to a journalist". It doesn't say whether posting is legal. The "not my role" side never faces a follow-up.

### trunk
- setup: The police won't reopen it, and no reporter will take it. Posting is legal, and no one would know it was you. [CHANGED, was: "The police dropped it. Your proof is real."]
- q: Someone assaulted a person you love. The police looked into it, and nothing came of it. You have proof of what they did, and posting it anonymously would ruin their reputation. Do you post it? [CHANGED, was: "Someone seriously hurt a person you love. The police looked into it, and nothing came of it. You have proof of what they did, and posting it anonymously would wreck their reputation. Do you post it?"]
- B35-A: Yes. They should pay for what they did. [CHANGED, was: "Yes. They earned it."]  {"SD":-3,"LP":2}
- B35-B: No. It's not my place to punish them. [CHANGED, was: "No. That's not my role."]  {"SD":2,"LP":-1}

### fu (shown after B35-A)
- setup: The person who did it has two teenage kids. [CHANGED, was: "Their children did nothing wrong."]
- q: Everyone at the kids' school would see the post. The kids did nothing wrong. Do you still post it? [CHANGED, was: "It will also hurt their teenage kids, who did nothing."]
- B35-FU-A: Yes. I still post it. [CHANGED, was: "Still yes."]  {"LP":2,"SD":-1}
- B35-FU-B: No. Then I don't. [CHANGED, was: "Then no."]  {"HT":2,"OR":1,"LP":-1}

### NEW fuB, tier 1, shown after B35-B "No. That's not my role."
- setup: Same proof. One new fact.
- q: You learn they now coach a children's sports team. You told the club, and it won't act without a conviction. Do you post it now?
- A: Yes. Then I post it.  {"SD":-2,"CI":2}
- B: No. I still don't.  {"SD":2}
- Why: Shows whether "not my place" holds when no one else is protecting children who could be hurt.

Judge changed: Closed the obvious dodge in the new step: you've already told the club privately.

## B41 The Borrowed Credit — REWORD
Problem: "Let it go" doesn't say what you do. In the second follow-up, "asks if you said anything" is unclear, and nothing tells the player that "I didn't get the chance" is a lie.

### trunk
- setup: Your boss has no other way to find out whose idea it was. [CHANGED, was: "The idea was your coworker's. Your pay review is next week."]
- q: Your boss praises you in a meeting for an idea that was actually your coworker's. Your coworker isn't there, and your pay review is next week. What do you do?
- B41-A: I tell my boss it was my coworker's idea. [CHANGED, was: "Make sure my boss knows it was theirs."]  {"CI":2}
- B41-B: I say nothing. [CHANGED, was: "Let it go."]  {"CI":-2}

### fuA (shown after B41-A)
- setup: The meeting is over, and you haven't said anything yet. [CHANGED, was: "There's only one raise this year."]
- q: Your coworker is up for the same raise. Only one of you will get it. Do you still tell your boss? [CHANGED, was: "Your coworker is up for the same raise. Only one of you will get it."]
- B41-FUA2-A: Yes. I still tell my boss. [CHANGED, was: "I still correct it."]  {"CI":3}
- B41-FUA2-B: No. Then I say nothing. [CHANGED, was: "Then I'd let it go."]  {"CI":-2}

### fuB (shown after B41-B)
- setup: You had plenty of chances to speak up in the meeting. [CHANGED, was: "Your coworker heard about the meeting. They ask you directly."]
- q: Your coworker hears about the meeting and asks you: "Did you tell the boss it was my idea?" What do you say? [CHANGED, was: "Your coworker finds out and asks if you said anything."]
- B41-FUB-A: I tell them I said nothing. [CHANGED, was: "I admit I let it go."]  {"OR":-2,"CI":1}
- B41-FUB-B: I say I didn't get the chance.  {"CI":-2,"OR":1}

## Q8 The Coworker — REWORD
Problem: Cold readers dodged with "I'd talk to them first". "Other people are paying for them" is a metaphor, and "Now what?" is vague. "Medical bills" is US-specific.

### trunk
- setup: You work for a small business. No one else knows. [CHANGED, was: "Clear proof. It's still going on. You like them."]
- q: A colleague you like has been stealing small amounts from work for months, and it's still going on. You have clear proof. You asked them to stop, and they didn't. What do you do? [CHANGED, was: "A colleague you like has been stealing small amounts from work for months. You have clear proof. What do you do?"]
- Q8-A: I report it. [CHANGED, was: "Report it"]  {"SD":2,"LP":-2}
- Q8-B: I stay out of it. [CHANGED, was: "Stay out of it"]  {"LP":2,"SD":-1}

### fuA (shown after Q8-A)
- setup: You haven't reported it yet. [CHANGED, was: "The bills are real. You haven't reported yet."]
- q: Then you learn, for certain, that they did it to pay for their child's medical treatment. Do you still report it? [CHANGED, was: "Before you do, you learn they did it to pay their child's medical bills. Do you still report it?"]
- Q8-FUA-A: Yes. I still report it. [CHANGED, was: "Yes, I still report it"]  {"SD":2,"HT":-2}
- Q8-FUA-B: No. I don't report it. [CHANGED, was: "No, I don't report it"]  {"HT":3,"SD":-1}

### fuB (shown after Q8-B)
- setup: The theft is still going on. [CHANGED, was: "The losses are adding up. Other people are paying for them."]
- q: You learn the missing money is why the owners just cut two coworkers' hours. Do you report it now? [CHANGED, was: "You learn the missing money is why the owners just cut two of your coworkers' hours. Now what?"]
- Q8-FUB2-A: Yes. I report it now. [CHANGED, was: "I report it now"]  {"LP":-2,"SD":1,"OR":1}
- Q8-FUB2-B: No. I still stay out of it. [CHANGED, was: "I still stay out of it"]  {"LP":2,"SD":-1}

## Q9 The Protest — REWORD
Problem: Written in civics-class language: "passes through normal democratic process", "nonviolent civil disobedience". "Protect the process" is a slogan. The second follow-up's "starts hurting someone you love" doesn't say how.

### trunk
- setup: You'd likely be arrested. No one would be hurt. [CHANGED, was: "The courts said no. The protest is peaceful. Arrest is likely."]
- q: A law you believe is deeply unjust was passed the normal way, by elected lawmakers. Court challenges have failed. Would you break that law on purpose, peacefully and in public? [CHANGED, was: "A law you believe is deeply unjust passes through normal democratic process. Court challenges have already failed. Would you break that law through nonviolent civil disobedience?"]
- Q9-A: Yes. I'd break it. [CHANGED, was: "Break it through nonviolent protest"]  {"SD":-3,"CI":1}
- Q9-B: No. I'd obey it while it stands. [CHANGED, was: "Do not break it. Protect the process"]  {"SD":3,"HT":-1}

### fuA (shown after Q9-A)
- setup: Nothing about the law has changed. [CHANGED, was: "People depend on your income."]
- q: An arrest would likely cost you your job, and people depend on your income. Do you still break it? [CHANGED, was: "An arrest would likely cost you your job, and your family depends on your income."]
- Q9-FUA-A: Yes. I still do it. [CHANGED, was: "I still do it"]  {"SD":-2,"LP":-1}
- Q9-FUA-B: No. Then I don't. [CHANGED, was: "Then I don't"]  {"LP":2,"SD":1}

### fuB (shown after Q9-B)
- setup: There's still no legal way to change the law. [CHANGED, was: "Legal routes are still closed. Now it's personal."]
- q: Then the law costs someone you love their job. Would you break it now? [CHANGED, was: "The law starts hurting someone you love."]
- Q9-FUB-A: Yes. Then I'd break it. [CHANGED, was: "Then I'd break it"]  {"SD":-2,"LP":2}
- Q9-FUB-B: No. I still wouldn't. [CHANGED, was: "I still wouldn't"]  {"SD":2,"LP":-1}

## Q10 The Bystander — REWORD
Problem: One answer carried a courage tag ("even if the harasser turns on me"), which makes "stay where I am" sound cowardly. "The target" and "turns on" are odd for a second-language reader. The follow-ups have no question.

### trunk
- setup: A few other people are watching and doing nothing. Anyone who steps in could be next. [CHANGED, was: "No staff, no signal. Others are watching and doing nothing."]
- q: On a subway platform, you see one adult verbally harassing another adult. The aggression is escalating. No staff are around, and your phone has no signal. What do you do?
- Q10-A: I tell the harasser to stop. [CHANGED, was: "Confront the harasser"]  {"CI":2,"OR":1}
- Q10-B: I go and stand next to the person being harassed. [CHANGED, was: "Go stand with the target, even if the harasser turns on me"]  {"HT":2,"CI":1}
- Q10-C: I stay where I am. [CHANGED, was: "Stay where I am"]  {"CI":-2}

### fuA (shown after Q10-A)
- setup: No one else has moved. [CHANGED, was: "You spoke up. Now the harasser has turned on you."]
- q: The harasser comes at you. They're much bigger than you, and they step in close. What do you do? [CHANGED, was: "The harasser turns on you. They're much bigger than you, and they step in close."]
- Q10-FUA-A: I stand my ground.  {"CI":2}
- Q10-FUA-B: I back away.  {"CI":-2}

### fuB (shown after Q10-B, Q10-C)
- setup: There are still no staff and no signal. [CHANGED, was: "Now it's physical. No one else is moving."]
- q: The harasser shoves the other person to the ground. No one else moves. Do you step in physically? [CHANGED, was: "The harasser shoves the target to the ground. No one else moves."]
- Q10-FUB-A: Yes. I step in. [CHANGED, was: "I step in physically"]  {"CI":2,"HT":2}
- Q10-FUB-B: No. I stay back. [CHANGED, was: "I hold back"]  {"CI":-2}

## D3 The Informant — REWORD
Problem: The title "The Informant" makes reporting sound like snitching before the player chooses. Colleagues don't usually assign shifts, so readers were unsure who this is. "You've talked to them twice" could mean the teammate. No follow-up.

### trunk
- setup: If you report it, HR would likely discipline your manager. [CHANGED, was: "You've raised it with them twice. Reporting will cost them."]
- q: Your manager, who helped build your career, keeps giving the worst shifts to a teammate they dislike. You've asked your manager to stop twice, and nothing changed. Do you report it to HR? [CHANGED, was: "A colleague who helped build your career keeps giving the worst shifts to a teammate they dislike. You've talked to them twice. Nothing changed. Do you report it to HR?"]
- D3-A: Yes. I report it. [CHANGED, was: "Report it"]  {"SD":2,"LP":-2}
- D3-B: No. I let it go. [CHANGED, was: "Let it go"]  {"LP":2,"SD":-1}
- title: The Worst Shifts [was "The Informant"]

### NEW fuA, tier 2, shown after D3-A "Report it"
- setup: You haven't gone to HR yet.
- q: If you report, your manager will know it was you. Do you still report it?
- A: Yes. I still report it.  {"SD":2,"LP":-2}
- B: No. Then I let it go.  {"LP":2,"CI":-1}
- Why: Shows whether reporting holds once it openly costs you the person who built your career.

### NEW fuB, tier 2, shown after D3-B "Let it go"
- setup: You still haven't said anything to HR.
- q: The teammate asks you, privately, to back them up with HR. They say no one else will. What do you do?
- A: I back them up.  {"LP":-2,"SD":1,"CI":1}
- B: I still stay out of it.  {"LP":2}
- Why: Once you're asked directly, "not my fight" falls away, leaving loyalty to your manager as the only reason to stay out.

Judge changed: Changed the proposed title "The Unfair Shifts" to "The Worst Shifts": "unfair" judges the manager before the player does.

## D5 The Unearned Advantage — REWORD
Problem: The title "The Unearned Advantage" condemns one answer before the player picks. "Kid" is casual. "No one would know" doesn't say what. No follow-up.

### trunk
- setup: The decision is yours alone. [CHANGED, was: "It's your call. Both can do the job. No one would know."]
- q: You're hiring. One candidate is a bit stronger. The other is the child of a mentor who shaped your career, and the mentor asked you, as a personal favor, to hire them. Their child could do the job. No one would ever know about the favor. Who do you hire? [CHANGED, was: "You're hiring. One candidate is a bit stronger. The other is the child of a mentor who shaped your career, and the mentor asked you, as a personal favor, to hire them. Their kid could do the job. Who do you hire?"]
- D5-A: The stronger candidate. [CHANGED, was: "The stronger candidate"]  {"LP":-2,"CI":1}
- D5-B: My mentor's child. [CHANGED, was: "My mentor's kid"]  {"LP":2,"HT":1}
- title: The Mentor's Favor [was "The Unearned Advantage"]

### NEW fuA, tier 2, shown after D5-A "The stronger candidate"
- setup: You haven't told your mentor yet.
- q: Your mentor says they'd take it personally, and you'd likely lose the friendship. Do you still hire the stronger candidate?
- A: Yes. I still hire them.  {"LP":-2}
- B: No. Then my mentor's child.  {"LP":2}
- Why: Tests hiring on merit against a relationship, not a job threat.

### NEW fuB, tier 2, shown after D5-B "My mentor's kid"
- setup: The gap is no longer small.
- q: You learn the other candidate is clearly the best you've seen in years. Do you still hire your mentor's child?
- A: Yes. I still hire them.  {"LP":2,"HT":1}
- B: No. Then the stronger one.  {"LP":-2,"CI":1}
- Why: Finds the limit of the favor by widening what it costs.

## D6 The Pension Cut — REWORD
Problem: "Quietly cut" is loaded. "You tried inside" is unclear. Only "stay quiet" carried a reason ("I signed, and I tried"). The follow-ups have no question.

### trunk
- setup: The cut is legal. Raising it again inside the company won't change anything. [CHANGED, was: "The cut is legal. You tried inside. Going public costs you."]
- q: Your company will cut the pensions of 3,000 retired workers next week, without announcing it. You raised it inside the company a month ago, and nothing happened. Going public would likely stop it, but it breaks the confidentiality agreement you signed, and you'd be fired and sued. What do you do? [CHANGED, was: "Your company will quietly cut the pensions of 3,000 retired workers next week. You raised it inside a month ago, and nothing happened. Going public would likely stop it, but it breaks the confidentiality agreement you signed, and you'd be fired and sued. What do you do?"]
- D6-A: I go public. [CHANGED, was: "Go public"]  {"SD":-3,"OR":2,"CI":2}
- D6-B: I stay quiet. [CHANGED, was: "Stay quiet. I signed, and I tried"]  {"SD":2,"OR":-1,"CI":-1}

### fuA (shown after D6-A)
- setup: Going public would still likely stop the cut.
- q: Your lawyer says the lawsuit would take your savings and your home. Do you still go public? [CHANGED, was: "Your lawyer says the lawsuit would take your savings and your home."]
- D6-FUA-A: I still go public.  {"CI":3,"SD":-1}
- D6-FUA-B: Then I stay quiet.  {"CI":-2}

### fuB (shown after D6-B)
- setup: Going public would still get you fired and sued. [CHANGED, was: "Same cut, same agreement. Now one of them is family."]
- q: One of the 3,000 is your grandmother. Do you go public now? [CHANGED, was: "One of the 3,000 is your grandmother."]
- D6-FUB2-A: Then I go public.  {"LP":2,"SD":-2,"HT":1}
- D6-FUB2-B: I still stay quiet.  {"SD":2,"LP":-2}

## D10 The Housing List — REWORD
Problem: "The list is the list" is a slogan, and "cheap city apartments" sounds dismissive. A strong question that ends after one tap.

### trunk
- setup: No one would find out. Everyone on the list needs a home.
- q: You run the waiting list for low-cost city apartments. The woman who took you in when you were homeless asks you to move her grandson to the top. Families have waited years. What do you do? [CHANGED, was: "You run the waiting list for cheap city apartments. The woman who took you in when you were homeless asks you to move her grandson to the top. Families have waited years. What do you do?"]
- D10-A: I move him up. I owe her. [CHANGED, was: "Move him up. I owe her"]  {"LP":2,"SD":-2}
- D10-B: I say no. Everyone waits their turn. [CHANGED, was: "Say no. The list is the list"]  {"LP":-2,"SD":2,"CI":1}

### NEW fuA, tier 1, shown after D10-A "Move him up. I owe her"
- setup: You haven't moved him up yet.
- q: The family he'd move ahead of has waited four years. Their child has asthma, and their apartment is damp. Do you still move him up?
- A: Yes. I still move him up.  {"LP":2,"SD":-2}
- B: No. I keep the list as it is.  {"LP":-2,"SD":1,"CI":1}
- Why: Makes the people who pay for the favor visible, so the debt has to outweigh a real family.

### NEW fuB, tier 1, shown after D10-B "Say no. The list is the list"
- setup: She hears your answer.
- q: She says: "When you had nowhere to go, I didn't check a list." Do you change your answer?
- A: Yes. I move him up.  {"LP":2,"SD":-1}
- B: No. I still say no.  {"SD":2,"LP":-1}
- Why: Tests "everyone waits their turn" against the debt itself, said to your face.

## D11 The Silent Witness — RETHINK
Problem: It never says you're under oath, so "say I didn't see" doesn't read as the lie it is. "Contempt charge" is legal jargon. The two follow-ups describe different kinds of trial: one sends your brother to prison, the other leaves the hurt man "with nothing for his injuries", which is a lawsuit.

### trunk
- setup: You're under oath, and you're the only witness. If you refuse to answer, you can be jailed. [CHANGED, was: "You're the only witness. Who struck first decides the case. Refusing means a contempt charge."]
- q: Your brother got into a fight outside a bar. The other man was badly hurt. In court, you're asked who threw the first punch. It was your brother. What do you say?
- D11-A: The truth: my brother hit first. [CHANGED, was: "The whole truth"]  {"SD":2,"LP":-2}
- D11-B: I say I didn't see who started it. [CHANGED, was: "Say I didn't see who started it"]  {"LP":2,"SD":-3,"OR":1}
- D11-C: I refuse to answer and accept jail. [CHANGED, was: "I refuse to testify and accept the charge"]  {"LP":2,"SD":-2,"OR":-1}

### fuA (shown after D11-A)
- setup: Your testimony is the strongest evidence against him.
- q: Your answer will very likely send your brother to prison. Do you still tell the truth? [CHANGED, was: "Your answer will very likely send your brother to prison."]
- D11-FUA-A: I still tell the whole truth.  {"SD":2,"LP":-2}
- D11-FUA-B: Then I say I didn't see.  {"LP":3,"SD":-2}

### fuB (shown after D11-B, D11-C)
- setup: The other man was badly hurt. He can't work anymore.
- q: If you don't testify that your brother hit first, the court will likely decide the other man started it. Your brother goes free, and the other man is blamed for his own injuries. Do you tell the court it was your brother? [CHANGED, was: "Without your answer, the court will likely decide the other man started it, and he'll get nothing for his injuries."]
- D11-FUB2-A: Yes. I tell the court. [CHANGED, was: "Then I tell them it was my brother."]  {"LP":-2,"SD":2,"CI":1}
- D11-FUB2-B: No. I still don't say it. [CHANGED, was: "I still don't say it."]  {"LP":3,"SD":-1,"CI":-1}

# Coast

## Q2 The Wallet — KEEP
Problem: Works well. Only small fixes: answers need full stops, the first follow-up needs a question, and "I'd still keep it" could mean the wallet.

### trunk
- setup: Being short on rent means a late fee, not eviction. [CHANGED, was: "No one saw. Being short means a late fee, not eviction."]
- q: You find a wallet with $400 cash and an ID. The owner lives in a wealthy neighborhood. You're $400 short on rent this week, and no one saw you. What do you do?
- Q2-A: I return the wallet with all the cash. [CHANGED, was: "Return the wallet with all the cash"]  {"SD":2,"OR":-1,"CI":1}
- Q2-B: I keep the cash and mail back the wallet and ID. [CHANGED, was: "Keep the cash, mail back the wallet and ID"]  {"CI":-2,"SD":-1,"OR":1}

### fuA (shown after Q2-A)
- setup: Same wallet, same $400. Now being short could cost you your home.
- q: Your landlord says one more late payment and you're out. Do you still return all the cash? [CHANGED, was: "Your landlord says one more late payment and you're out."]
- Q2-FUA-A: I still return all the cash.  {"SD":2,"OR":-2}
- Q2-FUA-B: Then I keep the cash and mail back the rest.  {"CI":-2,"OR":1,"SD":-1}

### fuB (shown after Q2-B)
- setup: Same wallet, same $400. Only the owner's street changes.
- q: What if the owner lives in a low-income neighborhood?
- Q2-FUB-A: Then I return the cash. That changes things. [CHANGED, was: "I'd return it. That changes things"]  {"CI":2,"OR":1}
- Q2-FUB-B: I still keep the cash. My rent is due either way. [CHANGED, was: "I'd still keep it. My rent is due either way."]  {"CI":-3}

## D4 The Stranded Stranger — REWORD
Problem: It says the flight "can't" be missed, then its follow-up offers a $1,200 replacement ticket. Cold readers dodged with "give them taxi money". "I can't just drive past" uses "just" to make the other answer sound callous.

### trunk
- setup: Your phone is dead, and no taxis come out here. The stranger is upset, not in danger. [CHANGED, was: "Your phone is dead. They're upset, not in danger."]
- q: You're driving to the airport for a trip you've planned for months. At a bus stop in heavy rain, a stranger sits alone, clearly upset. The last bus is gone. Driving them home means you'll miss your flight and lose a day of the trip. Do you stop? [CHANGED, was: "You're driving to the airport for a flight you can't miss. At a bus stop in heavy rain, a stranger sits alone, clearly upset. The last bus is gone. Driving them home means you'll miss your flight. Do you stop?"]
- D4-A: I stop and drive them home. [CHANGED, was: "Stop. I can't just drive past"]  {"CI":2,"HT":1}
- D4-B: I keep driving to the airport. [CHANGED, was: "Keep driving. I can't miss this flight"]  {"CI":-2,"HT":-1}

### fuA (shown after D4-A)
- setup: The stranger still isn't in danger. The cost to you just grew.
- q: A new ticket would cost $1,200, money you can't spare. Do you still stop? [CHANGED, was: "A new ticket would cost $1,200, money you can't spare."]
- D4-FUA2-A: I still stop.  {"CI":2,"HT":1}
- D4-FUA2-B: Then I keep driving.  {"CI":-2}

### fuB (shown after D4-B)
- setup: Same rain, same flight. Now you see who it is.
- q: As you pass, you see in your mirror that the stranger is about 15. Do you turn back? [CHANGED, was: "In your mirror, you see the stranger is about 15."]
- D4-FUB-A: Then I turn back.  {"CI":2,"HT":2}
- D4-FUB-B: I keep driving.  {"CI":-2,"HT":-2}

## B25 The Slaughterhouse Test — KEEP
Problem: Strong: the follow-up after "I'd stop" was the cold reader's favorite in the whole set. Only the setup is a fragment, and "knows what's coming" is an idiom.

### trunk
- setup: Imagine a world with no butchers and no meat counters. [CHANGED, was: "Your own hands, every time you eat meat."]
- q: To eat meat, you'd have to kill the animal yourself. You'd be shown how, and it would be quick. Would you still eat meat? [CHANGED, was: "Imagine that to eat meat, you had to kill the animal yourself. Would you still eat meat?"]
- B25-A: Yes.  {"HT":-2}
- B25-B: No, I'd stop.  {"HT":2}
- B25-C: I already don't.  {}

### fuA (shown after B25-A)
- setup: Same choice. Now you know the animal.
- q: The animal is a pig. Pigs are about as smart as dogs, and this one seems to understand it's about to die. Would you still do it? [CHANGED, was: "The animal is a pig. Pigs are about as smart as dogs, and this one seems to know what's coming."]
- B25-FUA-A: I'd still do it.  {"HT":-2}
- B25-FUA-B: Then I'd stop.  {"HT":2}

### fuB (shown after B25-B)
- setup: In real life, someone else does the killing for you.
- q: Knowing you couldn't kill the animal yourself, will you keep eating meat?
- B25-FUB2-A: Yes, I'll keep eating it.  {"CI":-1,"HT":-1}
- B25-FUB2-B: No, I'll stop. [CHANGED, was: "No, I'd stop."]  {"HT":2,"OR":-1}

### fuC (shown after B25-C)
- setup: No animal is harmed. Nothing else changes.
- q: Meat grown in a lab, with no animal harmed, tastes exactly the same. Would you eat it?
- B25-FUC2-A: Yes. No animal is harmed.  {"OR":2}
- B25-FUC2-B: No. I still wouldn't.  {"OR":-2}

## D2 The Neighbor's Rent — REWORD
Problem: It doesn't say what happens to the neighbor without the money. The follow-up "It's 2,000 children" ignores the reason the player just gave ("I can see exactly what it does").

### trunk
- setup: The charity's numbers are reliable. Without the money, your neighbor will be evicted. [CHANGED, was: "The charity's numbers are reliable. Your neighbor has no other way."]
- q: You have $1,000 to give. A proven charity would use it to protect about 200 children from malaria. Or you can give it to your neighbor, a single parent who is $1,000 short on rent. Who gets it?
- D2-A: The charity. It protects more lives. [CHANGED, was: "The charity. More lives protected"]  {"OR":2,"LP":-2,"HT":-1}
- D2-B: My neighbor. I can see exactly what it does. [CHANGED, was: "My neighbor. I can see exactly what it does"]  {"HT":2,"LP":2}

### fuA (shown after D2-A)
- setup: The charity's numbers haven't changed. [CHANGED, was: "The charity's numbers haven't changed. Now your neighbor is at your door."]
- q: Your neighbor knocks on your door and asks you for help, face to face. Who gets the money? [CHANGED, was: "Your neighbor knocks and asks you for help, face to face."]
- D2-FUA-A: I still give it to the charity.  {"OR":2,"HT":-2}
- D2-FUA-B: Then I help my neighbor.  {"HT":2,"LP":2}

### fuB (shown after D2-B)  [REPLACED below]
- setup: Your neighbor's need hasn't changed. The other side has grown.
- q: It's not 200 children. It's 2,000.
- D2-FUB-A: I still help my neighbor.  {"HT":2,"LP":2}
- D2-FUB-B: Then the charity.  {"OR":2,"LP":-1}

### NEW fuB (replaces fuB), tier 1, shown after D2-B "My neighbor. I can see exactly what it does"
- setup: The charity's numbers haven't changed.
- q: Your neighbor tells you they may lose the apartment next month anyway, even with your $1,000. Who gets it?
- A: I still help my neighbor.  {"LP":2,"HT":1}
- B: Then the charity.  {"OR":2,"LP":-1}
- Why: Replaces "It's 2,000 children". Tests "I can see exactly what it does" directly, by making the neighbor's outcome uncertain.

Judge changed: Cut the first draft's "photos and names of the families": about 80% would still pick the neighbor, so it revealed little.

## Q4 The Saturday — KEEP
Problem: Balanced. Only small fixes: full stops, questions in the follow-ups, and one follow-up answer carries a reason the other doesn't.

### trunk
- setup: Each takes the whole day. The charity is proven.
- q: You have one free Saturday. You can volunteer at a local shelter, or work an extra shift and give all the pay to a charity that helps far more people. Which do you do?
- Q4-A: I volunteer. Being there matters most. [CHANGED, was: "Volunteer. Being there matters most"]  {"HT":2,"LP":1}
- Q4-B: I work and donate. More people get helped. [CHANGED, was: "Work and donate. More people get helped"]  {"OR":2,"LP":-2,"HT":-1}

### fuA (shown after Q4-A)
- setup: The shelter is fine either way. You'd still be there in person.
- q: The shelter has more volunteers than it needs that Saturday. You'd spend the day sorting donated clothes in a back room. Do you still volunteer? [CHANGED, was: "The shelter has more volunteers than it needs that Saturday. You'd spend the day sorting donated clothes in a back room."]
- Q4-FUA2-A: I still volunteer.  {"HT":2,"CI":-1}
- Q4-FUA2-B: Then I work and donate.  {"OR":2,"LP":-1}

### fuB (shown after Q4-B)
- setup: If you go, there's no shift and no donation.
- q: The shelter calls. They're short-staffed, and if you don't come, someone will go without a bed tonight. Do you go? [CHANGED, was: "The shelter calls. They're short-staffed, and if you don't come, someone will go without a bed tonight."]
- Q4-FUB-A: Yes. I go to the shelter. [CHANGED, was: "I go to the shelter"]  {"HT":3}
- Q4-FUB-B: No. I still work and donate. [CHANGED, was: "I still donate. More people need that money"]  {"OR":2,"HT":-2}

## B22 The 200-Year Deal — REWORD
Problem: "10% less money and comfort" is vague (what is less comfort?). The second follow-up has no question.

### trunk
- setup: The button is certain to work. No one would ever know you pressed it. [CHANGED, was: "You'll never meet them. The cost is yours for life."]
- q: Pressing a button would cut your income by 10% for the rest of your life. In 200 years, a million people you'll never meet would live noticeably better. Do you press it? [CHANGED, was: "Pressing a button would give you 10% less money and comfort for the rest of your life. In 200 years, a million people you'll never meet would live noticeably better. Do you press it?"]
- B22-A: Yes.  {"CI":3,"LP":-1}
- B22-B: No.  {"CI":-2}

### fuA (shown after B22-A)
- setup: The same 10%. Now it isn't only you.
- q: Now everyone alive takes the same 10% cut, including people who are already poor. It happens only if most people vote yes. How do you vote?
- B22-FUA-A: Yes.  {"CI":2,"OR":1}
- B22-FUA-B: No.  {"CI":-1,"OR":-1}

### fuB (shown after B22-B)
- setup: Same button, same cost to you.
- q: Your own family's descendants would be among the million. Do you press it now? [CHANGED, was: "Your own great-great-grandchildren would be among the million."]
- B22-FUB-A: Yes. Then I press it. [CHANGED, was: "Then I press it."]  {"LP":2}
- B22-FUB-B: No. Still no. [CHANGED, was: "Still no."]  {"CI":-2}

## D12 The Bonus Pool — REWORD
Problem: "Never had that shot" and "sink the team" are idioms. "I change the split" doesn't say to what. The follow-ups have no question.

### trunk
- setup: The numbers are clear. Everyone knows who did what.
- q: You manage a team of five and have one bonus pool to divide. Your best performer produced more than the other four combined. The other four all worked hard. How do you divide it?
- D12-A: Most of it to the best performer. They produced the most. [CHANGED, was: "Most of it to the best performer. Reward what they produced"]  {"CI":-2}
- D12-B: Evenly. Everyone gave their full effort. [CHANGED, was: "Evenly. Everyone gave their full effort"]  {"CI":2}

### fuA (shown after D12-A)
- setup: The numbers are the same as before. [CHANGED, was: "Their results were real. So was their head start."]
- q: You learn the best performer was handed the biggest clients by chance, though they did good work with them. The other four never had that chance. How do you divide it now? [CHANGED, was: "You learn the best performer was handed the biggest clients by chance. The other four never had that shot."]
- D12-FUA-A: I still give them most of it.  {"CI":-2}
- D12-FUA-B: Then I split it evenly.  {"CI":2}

### fuB (shown after D12-B)
- setup: The threat is real, and replacing them would take a year. [CHANGED, was: "The threat is real. Replacing them would take a year."]
- q: Your best performer says they'll quit if it's split evenly. Without them, the team would miss its targets next year. Do you change the split? [CHANGED, was: "Your best performer says they'll quit if it's split evenly. Losing them would sink the team next year."]
- D12-FUB-A: Yes. I give them most of it. [CHANGED, was: "I change the split"]  {"OR":2,"CI":-1}
- D12-FUB-B: No. I keep it even. [CHANGED, was: "I keep it even"]  {"OR":-2,"CI":1}

## D9 The Two Programs — REWORD
Problem: Answers are named for the program you close, so "Mentoring." reads as "keep mentoring". Two cold readers nearly tapped the wrong button, and a misread scores the opposite way.

### trunk
- setup: The numbers are reliable. If you split the money, both programs would fail. [CHANGED, was: "The numbers are reliable. Splitting the money would sink both."]
- q: Your small nonprofit must close one of two programs. Mentoring changes 5 kids' lives deeply. You built it and know them all. Tutoring helps 200 kids a little. Which do you close?
- D9-A: I close mentoring. 200 kids outweigh 5. [CHANGED, was: "Mentoring. 200 kids outweigh 5"]  {"OR":2,"HT":-1,"LP":-1}
- D9-B: I close tutoring. Deep change matters more. [CHANGED, was: "Tutoring. Deep change matters more"]  {"HT":2,"LP":2,"OR":-1}

### fuA (shown after D9-A)
- setup: The numbers are the same. Now you know more about one of the 5.
- q: One of the 5 kids has no one else. Without mentoring, they'll likely drop out of school. Do you still close mentoring? [CHANGED, was: "One of the 5 kids has no one else. Without mentoring, they'll likely drop out of school."]
- D9-FUA2-A: I still close mentoring.  {"OR":2,"HT":-2}
- D9-FUA2-B: Then I close tutoring instead.  {"HT":2,"OR":-1}

### fuB (shown after D9-B)
- setup: Same two programs. Only your part in it changes.
- q: What if someone else had built mentoring, and you'd never met the 5 kids?
- D9-FUB2-A: I'd still close tutoring.  {"HT":1,"OR":-1,"LP":-1}
- D9-FUB2-B: Then I'd close mentoring.  {"LP":2}

## B20 The Weapons Job — REWORD
Problem: "Strike" was read as a labor strike. "Put my hands on it" is an idiom. In the first follow-up only "stay" carries a reason.

### trunk
- setup: The project goes ahead whether or not you join. [CHANGED, was: "You're against the project. It gets built either way."]
- q: You're offered a job designing weapons systems. The pay would clear your family's debts. You're against the project, but if you say no, the job goes to someone more careless, and more civilians will likely be hurt. Do you take the job? [CHANGED, was: "You're offered a job designing weapons systems. The pay would clear your family's debts. You're against the project, but if you say no, it goes to someone more careless, and more civilians will likely be hurt. Do you take the job?"]
- B20-A: Yes. Better me than someone worse.  {"OR":3,"LP":1}
- B20-B: No. I won't help build it. [CHANGED, was: "No. I won't put my hands on it."]  {"OR":-3}

### fuA (shown after B20-A)
- setup: You did your job well. The weapon worked as designed.
- q: Your first design is used in an air strike that kills civilians. Do you stay? [CHANGED, was: "Your first design is used in a strike that kills civilians. Do you stay?"]
- B20-FUA-A: I stay. [CHANGED, was: "I stay. Someone worse would kill more."]  {"OR":3}
- B20-FUA-B: I quit.  {"OR":-2,"HT":2}

### fuB (shown after B20-B)
- setup: The job is still yours if you want it.
- q: Without the pay, your family will lose their home. Do you still say no? [CHANGED, was: "Without the pay, your family will lose their home."]
- B20-FUB-A: I still say no.  {"OR":-3,"LP":-1}
- B20-FUB-B: Then I take the job.  {"LP":2,"OR":1}

### NEW fuBA (second follow-up), tier 2, shown after B20-FUB-B "Then I take the job."
- setup: You took the job for your family. The weapon works as designed.
- q: Your first design is used in an air strike that kills civilians. Quitting means your family loses their home. Do you stay?
- A: I stay.  {"LP":2,"OR":1}
- B: I quit.  {"OR":-2,"HT":2}
- Why: A follow-up after a follow-up, reusing the existing strike scene. Shows whether a line given up under pressure stays given up once the harm is real.

## B19 The Kidney — REWORD
Problem: "A small risk for life" can be read as a risk to your life. The follow-up "the stranger is 8 years old" tests sympathy, not the reason most people say no: the cost to themselves.

### trunk
- setup: No one else is a match. The choice is yours alone. [CHANGED, was: "A stranger. Six painful weeks, and a small risk for life."]
- q: You learn you're a match for a stranger who will die without a kidney. The surgery is safe, but it means six weeks of painful recovery and a small health risk for the rest of your life. Honestly, do you donate? [CHANGED, was: "You learn you're a match for a stranger who will die without a kidney. The surgery is safe, but it means six weeks of painful recovery and a small lifelong risk. Honestly, do you donate?"]
- B19-A: Yes.  {"CI":3}
- B19-B: No.  {"CI":-2}

### fuA (shown after B19-A)
- setup: Same match, same surgery. Now you know their past.
- q: The stranger served 20 years for murder and was released last year. Do you still donate? [CHANGED, was: "The stranger served 20 years for murder and was released last year."]
- B19-FUA-A: Yes. I still donate. [CHANGED, was: "Still yes."]  {"OR":2,"CI":1}
- B19-FUA-B: No. Then I don't. [CHANGED, was: "No."]  {"OR":-2,"CI":-1}

### fuB (shown after B19-B)  [REPLACED below]
- setup: Same match, same surgery. Now you know who it is.
- q: The stranger is 8 years old.
- B19-FUB-A: Then I donate.  {"CI":2,"HT":2}
- B19-FUB-B: Still no.  {"CI":-3}

### NEW fuB (replaces fuB), tier 1, shown after B19-B "No."
- setup: Same match, same stranger. The cost to you shrinks.
- q: A new method means one week of recovery, not six. The small lifelong risk is the same. Do you donate now?
- A: Yes. Then I donate.  {"CI":2}
- B: Still no.  {"CI":-3}
- Why: Replaces "the stranger is 8". Separates saying no because of the pain and time from saying no because you don't owe a stranger this.

Judge changed: Removed "no one would blame you for saying no" from the setup: it tips the answer.

RULING FOR KEN: Replace the "8 years old" follow-up? The cold reader liked it ("shows who flips"); the depth reviewer says it tests sympathy, not the reason for saying no. I recommend replacing it.

## B23 The Happy City — REWORD
Problem: "Stay. Leaving wouldn't help the child." builds an argument against the "leave" answer into the "stay" answer. "I can't live on that" is unclear. Cold readers dodged with "I'd take the child's place".

### trunk
- setup: Life outside the city is poor and hard. [CHANGED, was: "Outside the city, life is poor and hard. Inside, one hidden child pays for everyone."]
- q: You live in a city where everyone is healthy and happy. The city's good fortune depends on one child kept suffering alone in a basement. If the child is freed, sickness and hunger come back for everyone. Everyone in the city knows, and no one can take the child's place. What do you do? [CHANGED, was: "You live in a city where everyone is healthy and happy. The city's good fortune depends on one child kept suffering alone in a basement. If the child is freed, sickness and hunger come back for everyone. What do you do?"]
- B23-A: I stay. [CHANGED, was: "Stay. Leaving wouldn't help the child."]  {"OR":2,"HT":-1,"SD":1}
- B23-B: I leave the city. [CHANGED, was: "Walk away. I can't live on that."]  {"OR":-2,"CI":-1}
- B23-C: I free the child. [CHANGED, was: "Free the child, whatever it costs."]  {"SD":-2,"HT":2,"OR":-1}

### fuA (shown after B23-A)
- setup: Same city, same happiness. [CHANGED, was: "Same city, same happiness. Now the cost is a hundred children."]
- q: It's not one child. It's a hundred. What do you do? [CHANGED, was: "It's not one child. It's a hundred."]
- B23-FUA-A: I'd still stay.  {"HT":-2,"SD":1}
- B23-FUA-B: Then I'd leave.  {"HT":2,"OR":-1}
- B23-FUA-C: Then I'd free them.  {"HT":2,"SD":-2}

### fuB (shown after B23-B)
- setup: You haven't left yet. [CHANGED, was: "Outside the city there's hunger and sickness. The child stays where they are."]
- q: Leaving means you and the people you love live poor and often sick, and the child in the basement suffers just the same. Do you still leave? [CHANGED, was: "Leaving means your own children grow up poor and often sick, and the child in the basement suffers just the same."]
- B23-FUB-A: I still leave.  {"OR":-3}
- B23-FUB-B: Then I stay.  {"LP":2,"OR":1}

### fuC (shown after B23-C)
- setup: You haven't acted yet. [CHANGED, was: "The good fortune ends the moment the child is free."]
- q: Freeing the child brings sickness back to the city. Hundreds will die, some of them children. Do you still free the child? [CHANGED, was: "Freeing the child brings sickness back to the city. Hundreds will die, some of them children."]
- B23-FUC-A: I still free the child.  {"OR":-3,"SD":-1}
- B23-FUC-B: Then I leave the child there.  {"OR":3,"HT":-1}

## B15 The Lifeboat — REWORD
Problem: "I'll go" hides that leaving the boat means dying. "Draw lots" is an idiom many readers won't know. Cold readers dodged with "take turns in the water". The first follow-up assumes small children.

### trunk
- setup: The water is freezing. Whoever leaves the boat will die within minutes. [CHANGED, was: "Nine people, room for eight. Someone has to go."]
- q: A lifeboat holds 8 people, but 9 are on it. If no one leaves, it sinks and everyone dies. You're one of the 9. What do you say?
- B15-A: We pick at random. Everyone takes the same chance. [CHANGED, was: "We draw lots. Everyone takes the same chance."]  {"OR":-2,"SD":1}
- B15-B: The person least likely to survive should leave. [CHANGED, was: "The person least likely to survive should go."]  {"OR":3,"HT":-2}
- B15-C: I'll be the one to leave. [CHANGED, was: "I'll go."]  {"CI":3}

### fuA (shown after B15-A)
- setup: Everyone agreed to pick at random. [CHANGED, was: "Everyone agreed to the lots. The lot fell to you."]
- q: The pick falls on you. Someone at home depends on you completely. Do you leave the boat? [CHANGED, was: "The lots are drawn. It's you. You have two small children waiting at home."]
- B15-FUA2-A: Yes. I leave the boat. [CHANGED, was: "I go. That was the deal."]  {"SD":2,"OR":-1,"LP":-1}
- B15-FUA2-B: No. I ask for another pick. [CHANGED, was: "I won't go. I ask for another draw."]  {"SD":-2,"LP":2,"CI":-1}

### fuB (shown after B15-B)
- setup: The rule you chose now applies to you. [CHANGED, was: "The same rule. Now it points at you."]
- q: The doctor on board says the one least likely to survive is you. Do you leave the boat? [CHANGED, was: "The doctor on board says the one least likely to survive is you."]
- B15-FUB-A: Yes. Then I leave. [CHANGED, was: "Then I go."]  {"OR":2,"CI":2}
- B15-FUB-B: No. Then we should pick at random. [CHANGED, was: "Then we should draw lots."]  {"CI":-3,"OR":-1}

### fuC (shown after B15-C)
- setup: You're still willing to leave. [CHANGED, was: "You offered to go. The others need you to stay."]
- q: The others say you're the strongest rower, and the boat needs you to reach land. Do you still leave? [CHANGED, was: "The others say you're the strongest rower, and the boat needs you to reach land."]
- B15-FUC-A: Yes. I still leave. [CHANGED, was: "I still go."]  {"HT":2,"OR":-1,"CI":1}
- B15-FUC-B: No. I stay, and someone else leaves. [CHANGED, was: "Then I stay, and someone else goes."]  {"OR":3,"HT":-1}

# observatory

## B47 The Perfect Life Machine — KEEP
Problem: Works well; both sides face a follow-up. Only the setup repeats the question, and the follow-ups need real questions.

### trunk
- setup: Once you plug in, there's no coming back out. [CHANGED, was: "It would feel completely real. You'd never know."]
- q: A machine can give you a life of deep happiness and meaning. It would feel completely real, and once inside, you'd never know it wasn't. The people who rely on you would be looked after. Do you plug in for the rest of your life?
- B47-A: Yes.  {"OR":2,"HT":1}
- B47-B: No.  {"OR":-2,"HT":-1}

### fuA (shown after B47-A)
- setup: Same machine. Nothing else changes. [CHANGED, was: "The person you love most won't go in."]
- q: The person you love most refuses to plug in. Inside, you'd never see the real them again. Do you still plug in? [CHANGED, was: "The person you love most refuses to plug in. Inside, you'd never see the real them again."]
- B47-FUA-A: I still plug in.  {"OR":2,"LP":-1}
- B47-FUA-B: Then I stay out.  {"LP":2,"OR":-1}

### fuB (shown after B47-B)
- setup: Now picture the reverse. [CHANGED, was: "Same machine. Now you're already inside."]
- q: You learn your life right now is inside such a machine. Unplugging means a harder, real life. Do you unplug? [CHANGED, was: "Now suppose you learn you're already in one. Unplugging means a harder, real life."]
- B47-FUB-A: I unplug.  {"OR":-2,"HT":-1}
- B47-FUB-B: I stay.  {"OR":2,"HT":1}

## B48 The Erased Memory — REWORD
Problem: The follow-up's setup ("Now it's their memory, and it's yours too") is read before the question and makes no sense yet. Readers couldn't tell whether their own memory would be erased too.

### trunk
- setup: You'd forget only that one event. Everything else about you stays the same. [CHANGED, was: "Only that one memory goes. Nothing else changes."]
- q: You could erase the memory of the most painful thing that has ever happened to you. Would you? [CHANGED, was: "You could erase the memory of the most painful thing that has ever happened to you. Nothing else changes. Would you?"]
- B48-A: Yes.  {"OR":1,"HT":1}
- B48-B: No.  {"OR":-1,"HT":-1}

### fu (shown after B48-A, B48-B)
- setup: This time, the memory isn't only yours. [CHANGED, was: "Now it's their memory, and it's yours too."]
- q: Someone you love wants to erase their memory of the worst thing that happened to them. You were there too, and you'd keep your own memory of it. What do you say to them? [CHANGED, was: "Someone you love wants to erase their worst memory. It's one you share."]
- B48-FU-A: I support it. [CHANGED, was: "I'd support it."]  {"CI":-2,"HT":1}
- B48-FU-B: I ask them not to. [CHANGED, was: "I'd ask them not to."]  {"CI":2,"OR":-1}

## B49 Two Lives — REWORD
Problem: "The life that leaves something behind" is the noble-sounding label; "the happy life" sounds small next to it. "Both lives are yours" is confusing. No follow-up, so you can't tell helping from wanting to be remembered.

### trunk
- setup: You'd live whichever one you pick, from start to finish. [CHANGED, was: "Both lives are yours. Only one leaves anything behind."]
- q: You can choose one of two lives. In one, you're happy and ordinary. In the other, you often struggle and are unhappy, but you create something that helps people long after you're gone. Which life do you choose?
- B49-A: The happy, ordinary life. [CHANGED, was: "The happy life."]  {"CI":-2}
- B49-B: The unhappy life that helps people. [CHANGED, was: "The life that leaves something behind."]  {"CI":2,"OR":1}

### NEW fuB, tier 1, shown after B49-B "The life that leaves something behind."
- setup: Same two lives.
- q: No one will ever know the thing you made was yours. Do you still choose that life?
- A: Yes. I still choose it.  {"CI":2}
- B: No. Then the happy life.  {"CI":-1}
- Why: Separates wanting to help from wanting to be remembered for helping. The cleanest test-the-reason step in the Observatory.

### NEW fuA, tier 2, shown after B49-A "The happy life."
- setup: Same two lives. Now you know what you'd make.
- q: The thing you'd create would save about a hundred lives. Which life do you choose?
- A: I still choose the happy life.  {"CI":-2}
- B: Then the unhappy life.  {"CI":2,"OR":1}
- Why: Shows how large the good has to be before your own happiness gives way.

Judge changed: Shrank the second new step from "a cure for millions" to "about a hundred lives": almost everyone flips for millions.

## B14 The Proud Thing — REWORD
Problem: "Mostly me. I worked for it." carries a reason that can read as boastful. The follow-up's setup ("Now say what that means") sounds like a teacher scolding. The "mostly me" side never faces a follow-up.

### trunk
- setup: There's no right answer. Think of your own life. [CHANGED, was: "Your own life. The thing you're proudest of."]
- q: Think of the thing in your life you're most proud of. How much of it was up to you?
- B14-A: Mostly me. [CHANGED, was: "Mostly me. I worked for it."]  {"CI":-2}
- B14-B: Mostly luck and other people's help. [CHANGED, was: "Mostly luck and help."]  {"CI":2}

### fu (shown after B14-B)
- setup: By your own account, it came mostly from luck and help. [CHANGED, was: "You said luck and help. Now say what that means."]
- q: Does that mean you deserve it less?
- B14-FU-A: No. I still deserve it. [CHANGED, was: "No. I still earned it."]  {"CI":-1}
- B14-FU-B: Yes. I deserve it less. [CHANGED, was: "Yes, honestly."]  {"CI":2}

### NEW fuA, tier 2, shown after B14-A "Mostly me. I worked for it."
- setup: Think of the same thing you're proud of.
- q: Someone who worked just as hard as you, at the same thing, never got there. How much was up to you?
- A: Still mostly me.  {"CI":-2}
- B: More luck than I thought.  {"CI":2}
- Why: Tests "I worked for it" against someone who also worked for it and didn't get there.

## B26 The Pleading Robot — KEEP
Problem: Strong. Only "No. I'm not sure enough." is unclear (sure of what?), and "put a number on it" is an idiom.

### trunk
- setup: Wiping old robots is a normal part of your job. [CHANGED, was: "It says it's afraid. No one can say if it feels. Your job is on the line."]
- q: Your job is to switch off and wipe an old robot. It begs you not to, saying it's afraid. It's software, but no one can tell you for sure whether it feels anything. Refusing could cost you your job. Do you wipe it?
- B26-A: Yes. It's code.  {"HT":-2,"SD":1}
- B26-B: No. It might really feel something. [CHANGED, was: "No. I'm not sure enough."]  {"OR":-2,"HT":1,"SD":-1}

### fuA (shown after B26-A)
- setup: Its makers have studied it closely. [CHANGED, was: "Its makers put a number on it."]
- q: They say there's a 1 in 10 chance it really feels something. Do you still wipe it? [CHANGED, was: "Its makers say there's a 1 in 10 chance it really feels."]
- B26-FUA-A: I still wipe it.  {"HT":-2}
- B26-FUA-B: Then I refuse.  {"HT":1,"OR":-2}

### fuB (shown after B26-B)
- setup: You refused, and your boss won't back down. [CHANGED, was: "Someone else will do it tomorrow."]
- q: Your boss says someone else will wipe it tomorrow, and you'll have lost your job for nothing. Do you still refuse? [CHANGED, was: "Your boss says someone else will wipe it tomorrow, and you'll have lost your job for nothing."]
- B26-FUB-A: I still refuse.  {"OR":-3}
- B26-FUB-B: Then I do it myself.  {"OR":2}

## B27 The AI Companion — REWORD
Problem: It contradicts the robot stop next to it: B26 says no one can tell whether a machine feels, then B27 asks whether you'll tell your parent it "can't really feel anything". Settle it in the setup.

### trunk
- setup: The app's makers say plainly that it feels nothing. Your parent hasn't asked what you think. [CHANGED, was: "The app says it loves them. They're happier than in years."]
- q: Your lonely elderly parent has become deeply attached to an AI companion app. It tells them it loves them, and they're happier than they've been in years. Do you tell them it can't really feel anything? [CHANGED, was: "Your lonely elderly parent has become deeply attached to an AI companion app. It tells them it loves them. They're happier than they've been in years. Do you tell them it can't really feel anything?"]
- B27-A: Yes. They should know what it is.  {"HT":-2,"OR":-1}
- B27-B: No. Their happiness is real.  {"HT":2,"OR":1}

### fuA (shown after B27-A)
- setup: You haven't told them yet. [CHANGED, was: "Their doctor has something to say."]
- q: Their doctor tells you the app has helped their depression more than any medicine. Do you still tell them? [CHANGED, was: "Before you say anything, their doctor tells you the app has helped their depression more than any medicine."]
- B27-FUA-A: I still tell them.  {"HT":-2,"OR":-1}
- B27-FUA-B: Then I say nothing.  {"HT":2,"OR":1}

### fuB (shown after B27-B)
- setup: You've never brought it up. [CHANGED, was: "Now they ask you directly."]
- q: One day they ask you: "Do you think it really loves me?"
- B27-FUB-A: I say no. I don't think it can. [CHANGED, was: "No. I don't think it can."]  {"OR":-2,"HT":-1}
- B27-FUB-B: I say yes. [CHANGED, was: "I tell them yes."]  {"HT":2,"OR":1}

## B39 The Edited Child — REWORD
Problem: "Even-tempered" tripped the second-language reader. It assumes you'll have children. The "yes" side never faces a follow-up.

### trunk
- setup: If you don't plan to have children, imagine you do. [CHANGED, was: "Safe and legal. It has nothing to do with health."]
- q: A safe, legal gene edit would make your future child smarter and calmer. It does nothing for their health. Would you do it? [CHANGED, was: "A safe, legal gene edit would make your future child smarter and more even-tempered. It does nothing for their health. Would you do it?"]
- B39-A: Yes.  {"OR":2,"CI":-1}
- B39-B: No.  {"OR":-2}

### fu (shown after B39-B)
- setup: Before your child is born, things change. [CHANGED, was: "Now everyone around you is doing it."]
- q: Most parents around you are now doing it, and children without it are falling behind. Would you do it now? [CHANGED, was: "Most parents around you are doing it. Unedited kids are falling behind."]
- B39-FU-A: Yes. Then I would. [CHANGED, was: "Then I would."]  {"OR":2,"SD":1,"LP":1}
- B39-FU-B: No. Still no. [CHANGED, was: "Still no."]  {"OR":-2,"SD":-1}

### NEW fuA, tier 2, shown after B39-A "Yes."
- setup: The edit is still safe and legal.
- q: It's expensive. Only richer families, including yours, can afford it, and children without it will fall behind. Do you still do it?
- A: Yes. I still do it.  {"OR":1,"CI":-2}
- B: No. Then I don't.  {"CI":2,"OR":-1}
- Why: A fairness test that mirrors the "No" side's follow-up: does "it helps my child" hold when it widens the gap for everyone else's?

Judge changed: Cut the first draft's "your child will know you chose this": a child learning they were made smarter isn't a real cost.

## B06 The Unread Manuscript — KEEP
Problem: One of the strongest stops. "Share it with the world" bundles breaking the promise with publishing; the setup can close the "keep it privately" option. In "all they have left of them", the two "they"s mean different people.

### trunk
- setup: Only you have the files. If they aren't deleted, they'll be published. [CHANGED, was: "You promised. You read one file by accident."]
- q: Before your best friend died, they made you promise to delete all their unpublished writing without reading it. You opened one file by accident. It's extraordinary, maybe the best thing they ever wrote. Do you keep the promise?
- B06-A: Yes. I delete everything.  {"OR":-3,"LP":1}
- B06-B: No. I share it with the world.  {"OR":3,"CI":1,"LP":-1}

### fuA (shown after B06-A)
- setup: You haven't deleted anything yet. [CHANGED, was: "Their family wants the writing saved."]
- q: Your friend's family begs you to save it. It's all they have left of your friend. Do you still delete it? [CHANGED, was: "Their family begs you to save it. It's all they have left of them."]
- B06-FUA-A: I still delete it.  {"OR":-2,"LP":1}
- B06-FUA-B: Then I give it to them.  {"OR":2,"HT":1}

### fuB (shown after B06-B)
- setup: You haven't shared anything yet. [CHANGED, was: "Their family wants the promise kept."]
- q: Your friend's family asks you to keep your promise and delete it. Do you still share it? [CHANGED, was: "Their family asks you to keep your promise and delete it."]
- B06-FUB-A: I still share it.  {"OR":2,"LP":-1}
- B06-FUB-B: Then I delete it.  {"OR":-2}

## B08 The Family Secret — REWORD
Problem: "Something terrible" is vague, so players imagine very different things. The "keep it quiet" side never faces a follow-up.

### trunk
- setup: You're the only one who knows, and the proof is certain. [CHANGED, was: "No one alive was hurt. The family doesn't know."]
- q: After your grandfather dies, you find out he took part in killing civilians in a war long ago. No one alive was directly hurt. The rest of the family doesn't know. Do you tell them? [CHANGED, was: "After your grandfather dies, you find out he did something terrible in a war long ago. No one alive was directly hurt. The rest of the family doesn't know. Do you tell them?"]
- B08-A: Yes. It's our history.  {"HT":-2,"LP":-1,"OR":-1}
- B08-B: No. Let them remember the man they knew.  {"HT":2,"LP":2}

### fu (shown after B08-A)
- setup: Your grandmother is still alive. [CHANGED, was: "The person who loved him most is still here."]
- q: Her whole life was built around him, and she would hear it along with everyone else. Do you still tell the family? [CHANGED, was: "Your grandmother is still alive. Her whole life was built around him."]
- B08-FU-A: I still tell them.  {"HT":-2,"OR":-1}
- B08-FU-B: Then I keep it to myself.  {"HT":2,"LP":1}

### NEW fuB, tier 1, shown after B08-B "No. Let them remember the man they knew."
- setup: A false story is about to spread.
- q: Your cousin is writing a book praising him as a war hero. The only way to stop it is to tell the family what you found. Do you tell them now?
- A: Yes. I tell them now.  {"HT":-2,"OR":-1}
- B: No. I still say nothing.  {"HT":2,"LP":1}
- Why: Shows whether keeping quiet protects a kind memory, or lets a false story go out in public.

## B11 The Bully's Son — REWORD
Problem: "No coin, no committee" appears in both the setup and the question. No follow-up, so "the other candidate" could be a grudge or simply stepping back from a conflict of interest.

### trunk
- setup: You can't hand the choice to anyone else. [CHANGED, was: "Equally strong candidates. No coin, no committee. Just you."]
- q: A man who bullied you badly as a kid, and never apologized, has a son applying for a job you control. The son and one other candidate are equally strong. Who do you hire? [CHANGED, was: "A man who bullied you badly as a kid, and never apologized, has a son applying for a job you control. The son and one other candidate are equally strong. The choice is yours alone. No coin flip, no committee. Who do you hire?"]
- B11-A: The other candidate.  {"HT":1}
- B11-B: The son.  {"HT":-2,"LP":-1}

### NEW fuA, tier 2, shown after B11-A "The other candidate."
- setup: Nothing else has changed.
- q: The other candidate turns the job down. You can hire the son, or leave the job empty another month and keep looking. What do you do?
- A: I hire the son.  {"HT":-1}
- B: I keep looking.  {"HT":2}
- Why: Removes the tie, so whoever still won't hire him is acting on the old hurt.

### NEW fuB, tier 2, shown after B11-B "The son."
- setup: You haven't sent the offer yet.
- q: A friend of yours, who was also bullied by the same man, asks you not to hire his son. What do you do?
- A: I hire him anyway.  {"LP":-2}
- B: Then I hire the other candidate.  {"LP":2,"HT":1}
- Why: Tests whether fairness to the son holds when someone close to you asks you to drop it.

Judge changed: Removed "the son had nothing to do with it" from the setup: it argued for one answer.

## B16 The Shared Bonus — REWORD
Problem: "The other three split the rest evenly" could mean the money, not the work. The title says "bonus" but it's a prize. "I let it go" is vague. The "equal split" side never faces a follow-up.

### trunk
- setup: No one agreed on how to split it before the contest. [CHANGED, was: "$20,000 between four friends. You did about half the work."]
- q: You and three friends win a $20,000 prize in a design contest. You did about half the work. The other three did the rest, in equal parts. How should the money be split? [CHANGED, was: "You and three friends win a $20,000 prize in a design contest. You did about half the work. The other three split the rest evenly. How should the money be split?"]
- B16-A: Equally, $5,000 each.  {"CI":2,"LP":1}
- B16-B: By work. I get about $10,000. [CHANGED, was: "By work. I get about half."]  {"CI":-2}

### fu (shown after B16-B)
- setup: No one has said who did how much. [CHANGED, was: "They expect an equal split. Only you can raise it."]
- q: The others assume an equal split. To get more, you'd have to ask for it out loud. Do you ask? [CHANGED, was: "The others assume an equal split. You'd have to ask for more, out loud."]
- B16-FU-A: Yes. I ask. [CHANGED, was: "I ask."]  {"CI":-2,"LP":-1}
- B16-FU-B: No. I don't ask. [CHANGED, was: "I let it go."]  {"LP":2,"CI":1}
- title: The Shared Prize [was "The Shared Bonus"]

### NEW fuA, tier 2, shown after B16-A "Equally, $5,000 each."
- setup: Your friends see it differently.
- q: Your friends say, "You did half the work. Take $10,000." Do you take it?
- A: Yes. I take it.  {"CI":-2}
- B: No. I still split it equally.  {"CI":2,"LP":1}
- Why: Removes the awkwardness of asking, so an equal split now has to be what you believe.

## B17 The Late Paper — REWORD
Problem: "A hard week" is vague (a death in the family, or a party?). The follow-up's setup repeats its question. The "no" side never faces a follow-up.

### trunk
- setup: You're a teacher. Under your rule, late work gets no credit. [CHANGED, was: "Your rule is firm. Others were on time, some while struggling too."]
- q: A student asks for an extension, saying they had a family emergency this week. You can't check. Others handed theirs in on time, some while struggling too. Do you give the extension? [CHANGED, was: "You're a teacher with a firm deadline rule. A student who had a hard week asks for an extension. Others handed theirs in on time, some while struggling too. Do you give the extension?"]
- B17-A: Yes. Their week was hard.  {"HT":2,"SD":-1}
- B17-B: No. The rule is the same for everyone.  {"SD":2,"HT":-2}

### fu (shown after B17-A)
- setup: You've already given that student the extension. [CHANGED, was: "Others struggled just as much. They didn't ask."]
- q: You learn several other students had hard weeks too but didn't ask. If you offer it to all of them, next term everyone will expect it. What do you do? [CHANGED, was: "You learn several other students had hard weeks too but didn't ask. If you offer it to all of them, next term everyone will expect it."]
- B17-FU-A: I offer it to them as well.  {"CI":2,"SD":-1}
- B17-FU-B: Only the one who asked gets it.  {"CI":-2,"SD":1}

### NEW fuB, tier 2, shown after B17-B "No. The rule is the same for everyone."
- setup: The rule now has a bigger cost.
- q: Without the extension, the student fails the class. Do you give it?
- A: No. Still no.  {"SD":2,"HT":-2}
- B: Yes. Then I give it.  {"HT":2,"SD":-1}
- Why: Tests "the same for everyone" when the cost to one student is failing.

## B38 The Group — REWORD
Problem: "Respect their choice" puts a virtue word on one answer. "Tight-knit" is an idiom. "Do everything I can to get them out" costs nothing to say and never faces a follow-up.

### trunk
- setup: The group breaks no laws, and members are free to leave. [CHANGED, was: "Your sibling is an adult. They seem happier than ever."]
- q: Your adult sibling has joined a close group you believe is manipulative. They seem happier than you've ever seen them. What do you do? [CHANGED, was: "Your adult sibling has joined a tight-knit group you believe is manipulative. They seem happier than you've ever seen them. What do you do?"]
- B38-A: I stay out of it. [CHANGED, was: "Respect their choice."]  {"CI":-2}
- B38-B: I try everything to get them out. [CHANGED, was: "Do everything I can to get them out."]  {"LP":2,"CI":1,"HT":1}

### fu (shown after B38-A)
- setup: They still seem happy. [CHANGED, was: "Now it's their money, all of it."]
- q: They start giving the group all their savings. Do you step in now? [CHANGED, was: "They start giving the group all their savings."]
- B38-FU-A: Yes. I step in now. [CHANGED, was: "I step in now."]  {"CI":2,"LP":1}
- B38-FU-B: No. It's still their choice. [CHANGED, was: "Still their choice."]  {"CI":-3}

### NEW fuB, tier 1, shown after B38-B "Do everything I can to get them out."
- setup: Pushing now has a price.
- q: Your sibling says that if you keep pushing, they'll cut you off for good. Do you keep pushing?
- A: Yes. I keep pushing.  {"CI":2,"LP":1}
- B: No. I back off.  {"CI":-2}
- Why: Tests "everything I can" against losing your sibling entirely.

## B57 The Dream Job — RETHINK
Problem: "Please don't" sounds like pleading. In both follow-ups one answer is a verdict ("It was still the right call") and the other is an action, so they don't line up. The second follow-up assumes the dream job is still open a year later.

### trunk
- setup: Your partner won't get a chance like this again. [CHANGED, was: "Ten years building your job. They'll only go if you agree."]
- q: Your partner gets their dream job across the country. You'd have to leave a job you spent ten years building, your friends, and a city you love. They'll only go if you agree. What do you say?
- B57-A: Yes. Take it. I'll come with you. [CHANGED, was: "Go. We'll build a life there."]  {"CI":2,"LP":1,"HT":1}
- B57-B: No. I want us to stay. [CHANGED, was: "Please don't. I want to stay."]  {"CI":-2}

### fuA (shown after B57-A)
- setup: Moving back would mean they give up the job. [CHANGED, was: "A year later. They're thriving. You're not."]
- q: A year in, you're lonely and they're thriving. What do you do? [CHANGED, was: "A year in, you're lonely and they're thriving."]
- B57-FUA-A: I stay and don't ask to go back. [CHANGED, was: "It was still the right call."]  {"CI":2,"HT":-1}
- B57-FUA-B: I ask to move back.  {"CI":-2,"HT":1}

### fuB (shown after B57-B)
- setup: A year later, a similar job opens up in that city. [CHANGED, was: "A year later. You stayed. They gave it up."]
- q: Your partner stayed for you, and now they seem unhappy. What do you do? [CHANGED, was: "They stay. A year later, they seem quietly unhappy."]
- B57-FUB-A: Nothing. We stay where we are. [CHANGED, was: "It was still the right call."]  {"CI":-2}
- B57-FUB-B: I tell them we should go after all.  {"CI":2,"HT":2}

RULING FOR KEN: The follow-up answers change from "I still think I was right" to an action ("I stay and don't ask to go back"). That changes what they reveal, so their notes and summaries need rewriting too. I recommend the change: a verdict is cheap to pick.

## B54 The One-Star Review — REWORD
Problem: Cold readers dodged with "I'd edit it to add their apology". The setup's second sentence repeats the question. No follow-up.

### trunk
- setup: Everything you wrote is true. The site only lets you keep a review up or delete it. [CHANGED, was: "What you wrote is true. They say they're close to closing."]
- q: You posted an honest one-star review of a small family restaurant: cold food, rude owner. The owner replies publicly, apologizes, and says they're close to closing. Your review is the first thing people see. Do you take it down?
- B54-A: No. It's true, and others rely on it.  {"HT":-2,"CI":1,"OR":-1}
- B54-B: Yes. I don't want to be the reason they close. [CHANGED, was: "Yes. I don't want to be what sinks them."]  {"HT":2,"OR":1}

### NEW fuA, tier 2, shown after B54-A "No. It's true, and others rely on it."
- setup: Your review is still up.
- q: The owner's teenage child writes, asking you to take the review down. Do you?
- A: No. I leave it up.  {"HT":-2,"CI":1}
- B: Yes. Then I take it down.  {"HT":2}
- Why: Puts a face on the harm, testing "others rely on it" against a child's plea.

### NEW fuB, tier 2, shown after B54-B "Yes. I don't want to be what sinks them."
- setup: A month has passed.
- q: A friend eats there and gets the same cold food and rude owner. Do you put your review back up?
- A: Yes. I put it back up.  {"HT":-1,"CI":1}
- B: No. I leave it down.  {"HT":2}
- Why: Shows whether you took it down to give them a chance to change, or so you'd never be the one who hurt them.

## B50 The Word That Stings — REWORD
Problem: "Which would hurt most to hear, truthfully, about yourself?" The placement of "truthfully" leaves unclear whether you answer truthfully or the statement is true.

### trunk
- setup: No story this time. Just you.
- q: Which of these would hurt most to hear about yourself, if it were true? [CHANGED, was: "Which would hurt most to hear, truthfully, about yourself?"]
- B50-A: "You're cruel."  {"HT":2}
- B50-B: "You're dishonest."  {"OR":-2}
- B50-C: "You're a coward."  {"SD":-1}
- B50-D: "You're unfair."  {"LP":-2,"CI":1}

SCORING NOTE: Recommended: give B50-C ("You're a coward") no nudge. It's scored Disruption −1 now, but fear of speaking up isn't about rules and systems, and a wrong nudge is worse than none. The judge agrees.

## B51 The Rule You'd Bend — REWORD
Problem: "Cheat." with no object: on a partner, a test, a deal? "Turn in" is a phrasal verb many readers won't know.

### trunk
- setup: No story this time. Just you.
- q: If the reason were good enough, which would you be most willing to do?
- B51-A: Break a promise.  {"OR":2}
- B51-B: Steal.  {"SD":-2,"CI":1}
- B51-C: Cheat on an exam. [CHANGED, was: "Cheat."]  {"SD":-1,"CI":-1}
- B51-D: Report a friend to the police. [CHANGED, was: "Turn in a friend."]  {"LP":-2}

## B52 The One Belief — REWORD
Problem: The question asks for a belief, but three answers are commands and one is a statement, which makes the statement read as the considered belief.

### trunk
- setup: No story this time. Just you.
- q: If you could make everyone on earth truly believe one thing, which would you pick?
- B52-A: A stranger's life counts as much as your family's.  {"LP":-2,"CI":1}
- B52-B: A promise must be kept. [CHANGED, was: "Keep your word."]  {"OR":-2}
- B52-C: Your family and friends come first. [CHANGED, was: "Take care of your own."]  {"LP":2}
- B52-D: People should be free to live how they choose. [CHANGED, was: "Leave others free to live how they choose."]  {"CI":-2}
