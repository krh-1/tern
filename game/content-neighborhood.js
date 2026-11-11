// Tern: the Neighborhood (world 2): 14 questions about the people closest to you. Instrument data; see content.js header.
// Wording is verbatim from docs/QUESTION-BANK.md (B-questions) and docs/QUESTIONS.md (Q3, Q5, D1, D7; dashes in answers
// became periods, as in the park). Nudges, setups, notes, did lines, tendencies and tensions are first-authored here and
// wait for Ken's sign-off. The old doc nudges for Q3, Q5, D1 and D7 were re-checked against the axis meanings in content.js,
// and several were changed (see game/neighborhood-proposals.md).
// Axis ids: OR (O+ / R-), CI (C+ / I-), HT (H+ / T-), LP (L+ / P-), SD (S+ / D-).
(function (root) {
  const C = root.TERN_CONTENT;

  const questions = [
    // B56 ───────────────────────────────────────────────────────────
    {
      id: 'B56', world: 'hood', title: `The Quiet Loan`, scene: 'loan', weight: 'light',
      steps: {
        trunk: {
          setup: `You'd notice losing $200, but you can manage without it.`,
          q: `Six months ago, a friend borrowed $200 from you. They haven't mentioned it since. Today you see photos from their vacation. What do you do?`,
          answers: [
            { id: 'B56-A', text: `I ask them to pay it back.`, nudges: { LP: -2, CI: -1 },
              note: `You'd raise the money directly, even if it's awkward. A friend still has to pay back what they borrowed.`,
              did: `You'd ask a friend directly to repay a $200 loan they hadn't mentioned in six months.` },
            { id: 'B56-B', text: `I let it go and say nothing.`, nudges: { LP: 2, HT: 1 },
              note: `You'd let the money go rather than have an awkward talk with a friend. The friendship matters more to you than $200.`,
              did: `You'd let a friend's unpaid $200 loan go to protect the friendship.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `You never brought up the first $200.`,
          q: `Now they ask to borrow another $200. Do you lend it?`,
          answers: [
            { id: 'B56-FU-A', text: `No. Not until they pay back the first $200.`, nudges: { LP: -2, HT: -1 },
              note: `You'll let one unpaid loan slide, but not a second. When a friend asks for more, you say what they still owe.`,
              did: `You'd refuse a friend a second $200 loan and bring up the first one they never repaid.` },
            { id: 'B56-FU-B', text: `Yes. I lend it again.`, nudges: { LP: 2, HT: 2 },
              note: `You'd lend a friend money again, even though they never paid back the first loan. You keep the friendship easy at your own cost.`,
              did: `You'd lend a friend another $200, though they never repaid the first $200.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B56-B') return 'fu';
        return null;
      },
    },

    // B55 ───────────────────────────────────────────────────────────
    {
      id: 'B55', world: 'hood', title: `The Bent Rule`, scene: 'boardgame', weight: 'light',
      steps: {
        trunk: {
          setup: `If you don't have children, picture a child you're raising. Their friends are still at the table.`,
          q: `Your 10-year-old wins a board game against their friends by knowingly bending a rule. No one else noticed, and they're very happy about the win. Do you make them give up the win?`,
          answers: [
            { id: 'B55-A', text: `Yes. They give up the win.`, nudges: { SD: 2, LP: -1 },
              note: `You'd have your own child give back a win, even over a small rule no one noticed. Small rules still count for you.`,
              did: `You'd make your 10-year-old give back a board game win they got by bending a rule.` },
            { id: 'B55-B', text: `No. The win stands, and I don't bring it up.`, nudges: { HT: 2, SD: -1 },
              note: `You'd let a small bent rule pass to keep your child's happy moment. In a kids' game, it isn't worth spoiling.`,
              did: `You'd say nothing when your 10-year-old won a board game by bending a rule.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // B24 ───────────────────────────────────────────────────────────
    {
      id: 'B24', world: 'hood', title: `The Dog or the Stranger`, scene: 'dog', weight: 'medium',
      steps: {
        trunk: {
          setup: `If you don't have a dog, picture an animal you've loved. There's only time to save one life.`,
          q: `Your apartment building is on fire. Your dog is trapped in your apartment, and a stranger lies unconscious on another floor. Who do you save?`,
          answers: [
            { id: 'B24-A', text: `The stranger.`, nudges: { LP: -2, HT: -2 },
              note: `You'd let your own dog die to save a person you've never met. A human life comes first, even over an animal you love.`,
              did: `You'd save an unconscious stranger from your burning apartment building instead of your dog.` },
            { id: 'B24-B', text: `My dog.`, nudges: { LP: 3, HT: 2 },
              note: `You'd save the animal you love over a person you don't know. Your bond with your dog counts for more.`,
              did: `You'd save your dog from your burning apartment building instead of an unconscious stranger.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `There's still only time to reach one.`,
          q: `You learn the stranger is the person who set the fire. Who do you save?`,
          answers: [
            { id: 'B24-FU-A', text: `I still save the stranger.`, nudges: { LP: -2, HT: -2 },
              note: `Even knowing the stranger set the fire, you'd save them over your dog. What they did doesn't change whose life comes first.`,
              did: `You'd save the stranger who set your apartment building on fire over your dog.` },
            { id: 'B24-FU-B', text: `Then I save my dog.`, nudges: { LP: 2, OR: -1 },
              note: `You'd save a stranger over your dog, but not the person who set the fire. What someone did changes how much you'll give up for them.`,
              did: `You'd save your dog over the stranger who set your apartment building on fire.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B24-A') return 'fu';
        return null;
      },
    },

    // B43 ───────────────────────────────────────────────────────────
    {
      id: 'B43', world: 'hood', title: `The Apology They Want`, scene: 'apology', weight: 'medium',
      steps: {
        trunk: {
          setup: `No one is asking you to pay for anything. You'll be neighbors for years.`,
          q: `Your neighbor blames you for damage to the fence. You're sure it wasn't you. They say they'll drop it if you apologize. Do you apologize?`,
          answers: [
            { id: 'B43-A', text: `Yes. Ending the fight matters more to me.`, nudges: { OR: 2, CI: 1 },
              note: `You'd apologize for something you didn't do to end a fight. Peace matters more to you than being proven right.`,
              did: `You'd apologize to a neighbor to end a dispute, though you were sure you were right.` },
            { id: 'B43-B', text: `No. I won't apologize for something I didn't do.`, nudges: { OR: -2, CI: -1 },
              note: `You won't apologize for something you didn't do, even to end a fight. Saying something false costs you more than the dispute does.`,
              did: `You'd refuse to apologize to a neighbor for something you didn't do, even to end the dispute.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `You apologized, and the dispute ended.`,
          q: `Later, you hear they're telling other neighbors you admitted the damage was your fault. What do you do?`,
          answers: [
            { id: 'B43-FUA-A', text: `I let it go.`, nudges: { CI: 2, OR: 1 },
              note: `Even when your neighbor tells people you admitted fault, you let it go. You'd rather be misjudged than start the fight again.`,
              did: `You'd say nothing when a neighbor told others you'd admitted you were wrong.` },
            { id: 'B43-FUA-B', text: `I tell the neighbors what really happened.`, nudges: { CI: -2, OR: -1 },
              note: `You'll apologize to keep the peace, but you won't let people believe you were in the wrong. Your good name matters to you.`,
              did: `You'd tell the other neighbors what really happened after a neighbor said you'd admitted the fence damage.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `You didn't apologize. Months have passed.`,
          q: `They still won't speak to you, and other neighbors have started taking sides. One apology would still end it. Do you apologize now?`,
          answers: [
            { id: 'B43-FUB-A', text: `No. I still won't.`, nudges: { OR: -2, CI: -1 },
              note: `Months of silence and neighbors taking sides don't change your answer. You still won't apologize for something you didn't do.`,
              did: `You'd still refuse to apologize for fence damage you didn't cause, after months of a neighbor's silence and other neighbors taking sides.` },
            { id: 'B43-FUB-B', text: `Yes. Then I apologize.`, nudges: { OR: 2, CI: 1 },
              note: `You held out at first. Once the fight had lasted months and other neighbors took sides, you'd apologize to end it.`,
              did: `You'd apologize for fence damage you didn't cause, once a neighbor's silence had lasted months and other neighbors took sides.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B43-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B42 ───────────────────────────────────────────────────────────
    {
      id: 'B42', world: 'hood', title: `The Rumor`, scene: 'rumor', weight: 'medium',
      steps: {
        trunk: {
          setup: `There's no way to find out what really happened.`,
          q: `A friend in your circle is rumored to have taken money from the group's shared trip fund. There's no proof, and they deny it. Others in the group have started leaving them out. What do you do?`,
          answers: [
            { id: 'B42-A', text: `I treat them the same as always.`, nudges: { LP: 2, HT: 1 },
              note: `With no proof, you'd treat your friend the same as always, even as others drop them. A rumor doesn't change how you treat a friend.`,
              did: `You'd treat a friend the same as always when a rumor said they'd taken money from a trip fund.` },
            { id: 'B42-B', text: `I keep my distance.`, nudges: { LP: -1, HT: -1 },
              note: `You'd keep your distance from a friend who might have taken the group's money. Without knowing, you'd rather be careful.`,
              did: `You'd keep your distance from a friend rumored to have taken money from a trip fund.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `The group is planning its next trip.`,
          q: `The others make it clear that if you stick with them, you won't be invited either. Do you still treat them the same?`,
          answers: [
            { id: 'B42-FU-A', text: `Yes. I still treat them the same.`, nudges: { LP: 3 },
              note: `You'd stand by an accused friend even if it cost you your place in the group.`,
              did: `You'd stand by a friend rumored to have taken money, even at the cost of your place in the group.` },
            { id: 'B42-FU-B', text: `No. Then I keep my distance.`, nudges: { CI: -2, LP: -1 },
              note: `You'll stand by an accused friend until it costs you your place in the group. Then you step back.`,
              did: `You'd keep some distance from a friend rumored to have taken money, once standing by them could cost you your place in the group.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B42-A') return 'fu';
        return null;
      },
    },

    // B44 ───────────────────────────────────────────────────────────
    {
      id: 'B44', world: 'hood', title: `The Unlocked Phone`, scene: 'phone', weight: 'medium',
      steps: {
        trunk: {
          setup: `Last week you asked your partner if anything was wrong. They said everything's fine.`,
          q: `Your partner leaves their phone unlocked on the table and steps into the shower. Lately you've had a vague feeling something is off. They'd never know if you looked. Do you look?`,
          answers: [
            { id: 'B44-A', text: `No. I don't look.`, nudges: { OR: -2 },
              note: `You wouldn't go through your partner's phone on a hunch. Their privacy holds even when you're uneasy.`,
              did: `You wouldn't look through your partner's unlocked phone on a vague feeling.` },
            { id: 'B44-B', text: `Yes. I look.`, nudges: { OR: 2, CI: -1 },
              note: `You'd look through your partner's phone on a hunch, even after they said everything's fine. Knowing matters more to you than their privacy.`,
              did: `You'd look through your partner's unlocked phone on a vague feeling.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Another evening. The phone is unlocked again, and they're in the shower.`,
          q: `Earlier that day, a friend told you they saw your partner on what looked like a date. Do you look now?`,
          answers: [
            { id: 'B44-FUA-A', text: `Yes. Now I look.`, nudges: { OR: 2, CI: -1 },
              note: `A hunch isn't enough for you to go through your partner's phone, but a friend's report is.`,
              did: `You'd look through your partner's phone after a friend said they saw your partner on a date.` },
            { id: 'B44-FUA-B', text: `No. I still don't look.`, nudges: { OR: -3 },
              note: `Even after a friend says they saw your partner on a date, you won't go through their phone. Their privacy is a line you don't cross.`,
              did: `You still wouldn't look through your partner's phone, even after a friend said they saw your partner on a date.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `They'd still never know you looked.`,
          q: `They once said that if you ever went through their phone, it would be over between you. Do you still look?`,
          answers: [
            { id: 'B44-FUB-A', text: `Yes. I still look.`, nudges: { OR: 2, CI: -1 },
              note: `Even though your partner said going through their phone would end things, you'd still look. Knowing matters more to you than what they asked of you.`,
              did: `You'd look through your partner's phone, though they once said doing so would end the relationship.` },
            { id: 'B44-FUB-B', text: `No. Then I don't.`, nudges: { OR: -2 },
              note: `You'd look on a hunch, but not once your partner has said it would end things between you. What they asked of you decides it.`,
              did: `You wouldn't look through your partner's phone once they had said doing so would end the relationship.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B44-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B46 ───────────────────────────────────────────────────────────
    {
      id: 'B46', world: 'hood', title: `The Nightly Call`, scene: 'nightcall', weight: 'medium',
      steps: {
        trunk: {
          setup: `Your friend won't see a therapist. This has gone on for two months.`,
          q: `A friend going through a hard time calls you every night for an hour. You're exhausted, and your sleep and work are suffering. What do you do?`,
          answers: [
            { id: 'B46-A', text: `I keep taking every call.`, nudges: { CI: 2, HT: 2 },
              note: `You'd keep answering a struggling friend every night, even as your own life slips. Being there for them comes first.`,
              did: `You'd keep taking a struggling friend's hour-long call every night, though it's wearing you down.` },
            { id: 'B46-B', text: `I tell them I can't talk every night.`, nudges: { CI: -2, HT: -1 },
              note: `You'd tell a struggling friend you need to pull back. You won't let your own life fall apart, even to help someone you care about.`,
              did: `You'd tell a friend who calls every night that you need to pull back.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `You don't know of anyone else they could turn to.`,
          q: `When you tell them, they say you're the only person they can talk to. What do you do?`,
          answers: [
            { id: 'B46-FU-A', text: `Then I keep taking every call.`, nudges: { HT: 2, CI: 1 },
              note: `You'd pull back from a struggling friend, unless you're the only one they have. Then you keep going.`,
              did: `You'd keep taking a friend's nightly calls once they said you were the only person they could talk to.` },
            { id: 'B46-FU-B', text: `I still cut back the calls.`, nudges: { CI: -2, HT: -1 },
              note: `Even when a friend says you're the only one they can talk to, you'd still pull back. You hold to a limit on what you can give.`,
              did: `You'd still pull back from a friend's nightly calls, even after they said you were the only person they could talk to.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B46-B') return 'fu';
        return null;
      },
    },

    // Q3 ────────────────────────────────────────────────────────────
    {
      id: 'Q3', world: 'hood', title: `The Confession`, scene: 'confession', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Two of your friends are a couple. You're closer to one of them.`,
          q: `The friend you're closer to tells you they've been cheating on their partner. You've asked them to tell their partner, and they won't. What do you do?`,
          answers: [
            { id: 'Q3-A', text: `I tell the partner. They deserve to know.`, nudges: { LP: -2, OR: -1 },
              note: `You'd tell a friend they're being cheated on, even though the cheater is your closer friend. They have a right to know.`,
              did: `You'd tell a friend their partner is cheating, though the cheater is your closer friend.` },
            { id: 'Q3-B', text: `I stay out of it. It's not my place.`, nudges: { LP: 2, HT: 1 },
              note: `You'd keep out of a friend's affair, even though the person being cheated on is also your friend. It isn't yours to tell.`,
              did: `You'd stay out of it when a close friend confessed to cheating on a partner who is also your friend.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `You have no way to check whether the affair is really over.`,
          q: `Before you do, your friend begs you not to. They swear the affair is over and say telling would end the marriage. Do you still tell?`,
          answers: [
            { id: 'Q3-FUA-A', text: `Yes. I tell the partner anyway.`, nudges: { LP: -2, OR: -2 },
              note: `Even when your friend begs and swears the affair is over, you'd still tell. The partner's right to know comes before what happens next.`,
              did: `You'd tell a friend about their partner's affair, even after the cheater begged you not to and swore it was over.` },
            { id: 'Q3-FUA-B', text: `No. I keep the secret.`, nudges: { LP: 2, OR: 1, HT: 1 },
              note: `You'd tell, until your friend begs you not to and swears the affair is over. Then you keep the secret.`,
              did: `You'd keep a friend's affair secret once they begged you to and swore it was over.` },
          ],
        },
        fuB: {
          weight: 2,
          setup: `No one else is around. Saying "I don't know" would be a lie.`,
          q: `Months later, the partner asks you directly: "Is something going on? Please tell me." What do you say?`,
          answers: [
            { id: 'Q3-FUB-A', text: `I tell them the truth.`, nudges: { LP: -2, OR: -2 },
              note: `You'd stay out of a friend's affair, but you won't lie when the partner asks you to your face.`,
              did: `You'd tell a friend the truth when they asked you directly whether their partner was cheating.` },
            { id: 'Q3-FUB-B', text: `I say I don't know.`, nudges: { LP: 3, OR: 1 },
              note: `You'd lie to one friend's face to keep another friend's affair secret. The friend who told you comes first.`,
              did: `You'd tell a friend you don't know, when they asked you directly whether their partner was cheating.` },
          ],
        },
        fuAA: {
          weight: 1.5,
          setup: `You kept the secret. Months have passed.`,
          q: `You find out the affair never ended. Do you tell the partner now?`,
          answers: [
            { id: 'Q3-FUAA-A', text: `Yes. I tell them now.`, nudges: { LP: -2, OR: -1 },
              note: `You kept the secret while you believed the affair was over. Once you learn it never ended, you'd tell the partner.`,
              did: `You'd tell a friend's partner about the affair you'd kept secret, once you learned the affair never ended.` },
            { id: 'Q3-FUAA-B', text: `No. I still keep it.`, nudges: { LP: 3 },
              note: `Even after learning the affair never ended, you'd keep your friend's secret. You stay loyal to the friend who told you.`,
              did: `You'd keep a friend's affair secret, even after learning the affair they swore was over never ended.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'Q3-A' ? 'fuA' : 'fuB';
        if (step === 'fuA' && picks.fuA === 'Q3-FUA-B') return 'fuAA';
        return null;
      },
    },

    // B45 ───────────────────────────────────────────────────────────
    {
      id: 'B45', world: 'hood', title: `The Friend's Big Break`, scene: 'bigbreak', weight: 'light',
      steps: {
        trunk: {
          setup: `There's no wrong answer. Most people feel a mix of things.`,
          q: `Your close friend suddenly gets the exact success you've wanted for years. They call you first to tell you. Honestly, which feeling is stronger?`,
          answers: [
            { id: 'B45-A', text: `Happiness for them.`, nudges: { CI: 2, HT: 1 },
              note: `When a close friend gets the success you've wanted for years, you mostly feel glad for them.`,
              did: `You'd mostly feel happy when a close friend got the success you'd wanted for years.` },
            { id: 'B45-B', text: `Hurt that it wasn't me.`, nudges: { CI: -2 },
              note: `When a close friend gets the success you've wanted for years, the sting is stronger than the joy, and you can admit it.`,
              did: `You'd mostly feel the sting when a close friend got the success you'd wanted for years.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Their win had a cost for you.`,
          q: `You learn their win is why your own project lost its funding. You were both up for the same money. Honestly, which feeling is stronger now?`,
          answers: [
            { id: 'B45-FUA-A', text: `Still happiness for them.`, nudges: { CI: 2 },
              note: `Even when a close friend's win cost your own project its funding, you mostly feel glad for them.`,
              did: `You'd still mostly feel happy for a close friend whose win cost your own project its funding.` },
            { id: 'B45-FUA-B', text: `Hurt at what I lost.`, nudges: { CI: -2 },
              note: `You're glad for a friend's success until it costs you. Once their win took your project's funding, the hurt is stronger.`,
              did: `You'd mostly feel hurt once you learned a close friend's win cost your own project its funding.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Your friend wants your help.`,
          q: `They ask you to help them in the new role, a few evenings a month, unpaid, because you know the field well. Do you help?`,
          answers: [
            { id: 'B45-FUB-A', text: `Yes. I help them.`, nudges: { CI: 2, LP: 1 },
              note: `Even while it hurts that your friend got the success you wanted, you'd give your own evenings to help them do well.`,
              did: `You'd give a close friend a few unpaid evenings a month to help with the success you'd wanted for yourself.` },
            { id: 'B45-FUB-B', text: `No. I tell them I can't.`, nudges: { CI: -2 },
              note: `You'd say no when a close friend asks for unpaid help with the success you wanted for yourself. You keep your own time.`,
              did: `You'd turn down a close friend's request for unpaid help with the success you'd wanted for yourself.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B45-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B36 ───────────────────────────────────────────────────────────
    {
      id: 'B36', world: 'hood', title: `What Forgiveness Is Owed`, scene: 'forgive', weight: 'medium',
      steps: {
        trunk: {
          setup: `You believe both the apology and the change are real.`,
          q: `Someone close to you betrayed you badly. They've apologized sincerely, and in the year since, they've really changed. Do you owe them forgiveness?`,
          answers: [
            { id: 'B36-A', text: `Yes. They've earned it.`, nudges: { CI: 1, HT: 1 },
              note: `You think someone who apologized and really changed has earned your forgiveness.`,
              did: `You think you owe forgiveness to someone close who betrayed you, then apologized and changed.` },
            { id: 'B36-B', text: `No. I don't owe it, even now.`, nudges: { CI: -1, HT: -1 },
              note: `You think forgiveness is yours to give, never something you owe, however much someone has changed.`,
              did: `You think you don't owe forgiveness to someone close who betrayed you, even after they apologized and changed.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Whatever you decided about forgiveness, this is a separate choice.`,
          q: `They ask if the two of you can be as close as before. Do you agree?`,
          answers: [
            { id: 'B36-FU-A', text: `Yes. We go back to how we were.`, nudges: { HT: 2, LP: 1 },
              note: `You'd let someone who betrayed you badly all the way back in, once they'd apologized and changed.`,
              did: `You'd let someone who betrayed you badly be as close as before, once they'd changed.` },
            { id: 'B36-FU-B', text: `No. I keep some distance.`, nudges: { HT: -2 },
              note: `Even after real change, you'd keep some distance from someone who betrayed you badly. Getting close again has to be earned.`,
              did: `You wouldn't let someone who betrayed you badly be as close as before, even after they'd changed.` },
          ],
        },
      },
      next: function (step) {
        if (step === 'trunk') return 'fu';
        return null;
      },
    },

    // D7 ────────────────────────────────────────────────────────────
    {
      id: 'D7', world: 'hood', title: `The Uncomfortable Truth`, scene: 'fiance', weight: 'medium',
      steps: {
        trunk: {
          setup: `Your close friend's wedding is next month.`,
          q: `You find out from public court records that their fiancé served two years in prison for fraud, long ago, and has lived honestly since. Your friend doesn't know. The fiancé knows you found out and asks you to keep it private. Do you tell your friend?`,
          answers: [
            { id: 'D7-A', text: `Yes. My friend should know before the wedding.`, nudges: { HT: -2, LP: 1 },
              note: `You'd tell a friend about their fiancé's prison record before the wedding. Your friend should know who they're marrying.`,
              did: `You'd tell a close friend that their fiancé served prison time for fraud long ago.` },
            { id: 'D7-B', text: `No. It's the fiancé's past to share.`, nudges: { HT: 2, LP: -1 },
              note: `You'd keep a fiancé's old prison record to yourself. It's their past to share, not yours.`,
              did: `You'd keep quiet about a close friend's fiancé's prison record from long ago.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `You've said nothing so far.`,
          q: `Your friend asks you, "Is there anything I should know before I marry them?" Saying no would be a lie. What do you say?`,
          answers: [
            { id: 'D7-FU-A', text: `I tell them about the prison time.`, nudges: { OR: -2, LP: 1 },
              note: `You'd keep a fiancé's past to yourself, but not when your friend asks you straight out. You won't lie to their face.`,
              did: `You'd tell a friend about their fiancé's prison record once the friend asked if there was anything to know.` },
            { id: 'D7-FU-B', text: `I say no.`, nudges: { OR: 2, LP: -1 },
              note: `Even when your friend asks you straight out before the wedding, you'd keep the fiancé's past to yourself.`,
              did: `You'd tell a friend there's nothing to know before the wedding, though their fiancé served prison time for fraud.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'D7-B') return 'fu';
        return null;
      },
    },

    // B10 ───────────────────────────────────────────────────────────
    {
      id: 'B10', world: 'hood', title: `What We Owe Our Parents`, scene: 'parents', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Your parents have explained their reasons. You've thought hard about them, and you still disagree. They mean what they say.`,
          q: `Your parents gave up a lot to raise you. They oppose the person you want to marry. They say that if you marry, they will never see you again. Do you marry anyway?`,
          answers: [
            { id: 'B10-A', text: `No. After everything, I owe my parents that.`, nudges: { CI: 2, SD: 2 },
              note: `You'd give up marrying the person you love because your parents ask it. What they gave you is a debt you'd honor.`,
              did: `You wouldn't marry the person you love if your parents said they'd never see you again.` },
            { id: 'B10-B', text: `Yes. Raising me doesn't give them the right to choose for me.`, nudges: { CI: -2, SD: -2 },
              note: `You'd marry the person you love even if your parents cut you off. Raising you doesn't give them a say over who you marry.`,
              did: `You'd marry the person you love even if your parents said they'd never see you again.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Your parents make their terms clear.`,
          q: `It isn't only this person. Your parents expect to approve whoever you marry, now or later. Do you still go along with them?`,
          answers: [
            { id: 'B10-FUA-A', text: `Yes. I still go along with them.`, nudges: { CI: 2, SD: 2 },
              note: `You'd let your parents approve whoever you marry, now or later. What you owe them includes that say.`,
              did: `You'd go along with your parents' wish to approve whoever you marry, now or later.` },
            { id: 'B10-FUA-B', text: `No. Then I marry this person.`, nudges: { CI: -2, SD: -2 },
              note: `You'd give up one person for your parents, but you won't let them choose for you for life. Then you'd marry the person you love.`,
              did: `You'd marry the person you love once you learned your parents expect to approve whoever you marry.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Waiting won't help. They won't see you while you're with this person, married or not.`,
          q: `One of your parents becomes seriously ill and may not have long. Do you stay with this person?`,
          answers: [
            { id: 'B10-FUB-A', text: `Yes. I stay with them.`, nudges: { CI: -2, SD: -2 },
              note: `Even with a parent seriously ill and maybe near the end, you'd stay with the person you love, though it may mean never seeing that parent again.`,
              did: `You'd stay with the person you love, though a seriously ill parent won't see you while you're together.` },
            { id: 'B10-FUB-B', text: `No. Then I give up this person.`, nudges: { CI: 2, HT: 2 },
              note: `You'd stand up to your parents, until one of them is seriously ill and may not have long. Then you'd give up the person you love.`,
              did: `You'd give up the person you love so you could see a seriously ill parent again.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B10-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // Q5 ────────────────────────────────────────────────────────────
    {
      id: 'Q5', world: 'hood', title: `The Inheritance`, scene: 'inheritance', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Your parent has died, clear-minded to the end. No one else heard what they told you. Your sibling trusts you completely.`,
          q: `Your parent's will splits everything equally between you and your sibling. Before they died, they told you in private that they wanted you to have it all, but they never changed the will. What do you do?`,
          answers: [
            { id: 'Q5-A', text: `I follow the will and split it equally.`, nudges: { SD: 2, OR: -1, HT: -1 },
              note: `You'd split the estate as the will says, even though your parent privately asked you to take it all. What's written down is what counts.`,
              did: `You'd split your parent's estate equally as the will says, though your parent privately asked you to take it all.` },
            { id: 'Q5-B2', text: `I tell my sibling what our parent wanted, and ask for it all.`, nudges: { SD: -1, CI: -1, HT: 1 },
              note: `You'd tell your sibling what your parent privately wanted and ask for the whole estate, even though the will says to split it. Your parent's word matters more to you than the paperwork.`,
              did: `You'd tell your sibling your parent's private wish and ask for the whole estate, though the will splits it equally.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The will still says to split it equally.`,
          q: `Then you learn why your parent changed their mind: your sibling hadn't spoken to them in ten years, while you did all the caregiving. Do you still split it?`,
          answers: [
            { id: 'Q5-FUA2-A', text: `No. Then I tell my sibling and ask for it all.`, nudges: { SD: -2, CI: -1 },
              note: `Learning your sibling stayed away for ten years while you did the caring changes your mind. You'd tell your sibling what your parent wanted and ask for it all.`,
              did: `You'd ask your sibling for your parent's whole estate after learning your sibling hadn't spoken to your parent in ten years.` },
            { id: 'Q5-FUA2-B', text: `Yes. I still split it equally.`, nudges: { SD: 2, OR: -1 },
              note: `Even knowing your sibling stayed away while you did all the caring, you'd split the estate as the will says.`,
              did: `You'd still split your parent's estate equally with a sibling who hadn't spoken to them in ten years.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Your sibling has agreed to go along with it. You have plenty of money yourself.`,
          q: `You learn your sibling is struggling to pay their bills. Do you still take it all?`,
          answers: [
            { id: 'Q5-FUB-A', text: `Yes. It was our parent's wish.`, nudges: { CI: -2, OR: -1 },
              note: `Even with your sibling struggling to pay their bills, you'd keep the whole estate. Your parent's wish comes first.`,
              did: `You'd keep your parent's whole estate, even knowing your sibling struggles to pay their bills.` },
            { id: 'Q5-FUB-B', text: `No. I split it after all.`, nudges: { HT: 2, CI: 2 },
              note: `You'd take what your parent wanted you to have, until your sibling needed it. Then you'd share.`,
              did: `You'd split your parent's estate with your sibling after learning they struggle to pay their bills.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'Q5-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // D1 ────────────────────────────────────────────────────────────
    {
      id: 'D1', world: 'hood', title: `The Promise About the Home`, scene: 'carehome', weight: 'heavy',
      steps: {
        trunk: {
          setup: `A good care home nearby has room, and you can afford it.`,
          q: `Your parent has advanced dementia. Caring for them at home would take most of your free time for years and strain your health, work and relationships. Years ago, they made you promise you'd never put them in a care home. What do you do?`,
          answers: [
            { id: 'D1-A', text: `I keep the promise and care for them at home.`, nudges: { OR: -2, HT: 1 },
              note: `You'd keep your promise to care for your parent at home, even if it takes years of your life and strains your health, work and relationships.`,
              did: `You'd care for your parent with dementia at home for years, as you promised them.` },
            { id: 'D1-B', text: `I move them to the care home.`, nudges: { OR: 2, HT: -1 },
              note: `You'd break a promise to your parent rather than let caring for them at home take over your health, work and relationships.`,
              did: `You'd move your parent with dementia to a care home, though you promised them you never would.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Caring for them still takes most of your free time.`,
          q: `They no longer recognize you. They're calm with anyone who is kind to them. Do you still care for them at home?`,
          answers: [
            { id: 'D1-FUA-A', text: `No. Now I move them.`, nudges: { OR: 2, HT: -2 },
              note: `You'd keep the promise while your parent knows you. Once they don't, you'd let the promise go.`,
              did: `You'd move your parent to a care home once they no longer recognized you, despite your promise.` },
            { id: 'D1-FUA-B', text: `Yes. I keep caring for them at home.`, nudges: { OR: -2, HT: 1 },
              note: `Even when your parent no longer knows you, you'd keep caring for them at home. The promise still holds.`,
              did: `You'd keep caring for your parent at home after they stopped recognizing you, because you promised.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `You visit them every few days.`,
          q: `They cry every time you leave and beg to go home. The staff say this usually fades, but there's no guarantee. Do you bring them home?`,
          answers: [
            { id: 'D1-FUB-A', text: `Yes. I bring them home.`, nudges: { HT: 3 },
              note: `You'd move your parent to a care home, but you'd bring them back if they cried for home every time you left.`,
              did: `You'd bring your parent home from the care home because they cried every time you left.` },
            { id: 'D1-FUB-B', text: `No. They stay.`, nudges: { HT: -2, OR: 1 },
              note: `Even when your parent cries and begs to go home, you'd keep them at the care home. You hold to the decision over what hurts right now.`,
              did: `You'd keep your parent in the care home, even though they cry and beg to go home every time you leave.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'D1-A' ? 'fuA' : 'fuB';
        return null;
      },
    },
  ];

  C.questions.push(...questions);

  // Neighborhood answers that also count as evidence for tendencies the park already has.
  const more = {
    'avoid-conflict': { support: ['B43-A', 'B43-FUA-A', 'B43-FUB-B', 'B56-B', 'B56-FU-B', 'Q3-B'], against: ['B43-B', 'B43-FUA-B', 'B43-FUB-A', 'B56-A', 'B56-FU-A', 'Q3-A'] },
    'hard-truths': { support: ['Q3-A', 'Q3-FUA-A', 'Q3-FUAA-A', 'Q3-FUB-A', 'D7-A', 'D7-FU-A'], against: ['Q3-FUB-B', 'D7-FU-B'] },
    'soften-truth': { support: ['Q3-FUA-B', 'D7-B', 'D7-FU-B'], against: ['Q3-FUA-A', 'Q3-FUAA-A', 'D7-A', 'D7-FU-A'] },
    'keeps-word': { support: ['D1-A', 'D1-FUA-B'], against: ['D1-B', 'D1-FUA-A'] },
    'own-first': { support: ['B24-B'] },
    'second-chances': { support: ['B36-A', 'B36-FU-A'], against: ['B36-FU-B'] },
    'gives-it-up': { support: ['B46-A', 'B46-FU-A', 'Q5-FUB-B'], against: ['B46-FU-B', 'Q5-FUB-A'] },
    'follow-rules': { support: ['B55-A', 'Q5-A', 'Q5-FUA2-B'], against: ['B55-B', 'Q5-B2', 'Q5-FUA2-A'] },
    'watch-not-act': { support: ['Q3-B'], against: ['Q3-A'] },
    'step-in': { support: ['Q3-A', 'Q3-FUA-A', 'Q3-FUAA-A'], against: ['Q3-B'] },
  };
  Object.entries(more).forEach(([id, m]) => { const t = C.tendencies.find(x => x.id === id); if (!t) throw new Error('unknown tendency ' + id); t.support.push(...(m.support || [])); t.against = (t.against || []).concat(m.against || []); });

  C.tendencies.push(
    { id: 'stands-up', text: `You stand up for yourself.`, share: `I stand up for myself.`,
      detail: `When someone takes advantage of you or tells the story wrong, you say so, even if it gets awkward.`,
      support: ['B56-A', 'B56-FU-A', 'B43-B', 'B43-FUA-B', 'B43-FUB-A'], against: ['B56-B', 'B56-FU-B', 'B43-A', 'B43-FUA-A', 'B43-FUB-B'],
      min: 2, priority: 3, protect: ['your self-respect'], trade: ['an easy peace'] },
    { id: 'sets-limits', text: `You set limits, even with people you love.`, share: `I set limits, even with people I love.`,
      detail: `You'll say no to someone close when what they ask would cost you too much.`,
      support: ['B46-B', 'B46-FU-B', 'B56-FU-A', 'D1-B', 'D1-FUB-B', 'B10-B', 'B10-FUA-B', 'B10-FUB-A', 'B45-FUB-B'], against: ['B46-A', 'B46-FU-A', 'B56-FU-B', 'D1-A', 'B10-A', 'B10-FUA-A', 'B10-FUB-B', 'B45-FUB-A'],
      min: 2, priority: 4, protect: ['your own time and health'], trade: ['being there whenever you’re needed'] },
    { id: 'sticks-by', text: `You stick by your friends.`, share: `I stick by my friends.`,
      detail: `When a friend is in trouble or under suspicion, you stay close, even when it costs you.`,
      support: ['B42-A', 'B42-FU-A', 'B46-A', 'B46-FU-A', 'Q3-FUA-B', 'Q3-FUAA-B'], against: ['B42-B', 'B42-FU-B', 'B46-FU-B'],
      min: 2, priority: 3, protect: ['friends in trouble'], trade: ['your standing with the group'] },
    { id: 'privacy', text: `You respect people's privacy.`, share: `I respect people's privacy.`,
      detail: `You won't dig into or pass on what isn't yours to know, even when you're worried.`,
      support: ['B44-A', 'B44-FUA-B', 'B44-FUB-B', 'D7-B', 'D7-FU-B', 'Q3-B'], against: ['B44-B', 'B44-FUA-A', 'B44-FUB-A', 'D7-A'],
      min: 2, priority: 4, protect: ['people’s private lives'], trade: ['knowing for sure'] },
    { id: 'parents-first', text: `You put your parents' wishes first.`, share: `I honor my parents' wishes.`,
      detail: `When a parent asks something of you, you do it, even at a real cost to your own life.`,
      support: ['B10-A', 'B10-FUA-A', 'B10-FUB-B', 'D1-A', 'D1-FUA-B', 'D1-FUB-A', 'Q5-B2', 'Q5-FUB-A'], against: ['B10-B', 'B10-FUA-B', 'B10-FUB-A', 'D1-B', 'D1-FUA-A', 'D1-FUB-B', 'Q5-FUB-B'],
      min: 2, priority: 3, protect: ['your parents’ wishes'], trade: ['your own plans'] },
    { id: 'slow-trust', text: `You're slow to trust again after being let down.`,
      detail: `An apology isn't enough for you. People have to earn your trust back.`,
      support: ['B36-FU-B', 'B56-FU-A', 'Q6-FUB-B'], against: ['B36-FU-A', 'B56-FU-B', 'Q6-FUB-A'],
      min: 2, priority: 4, protect: ['your trust'], trade: ['fresh starts'] },
  );

  // All ids in `when` must be picked.
  C.tensions.push(
    { when: ['B02-A', 'D7-FU-B'], text: `You'd tell your dying grandfather his business failed, but you'd tell a friend there's nothing to know about a fiancé who served prison time for fraud.` },
    { when: ['B09-A', 'Q3-FUB-A'], text: `You'd lie to the police to cover your sibling's hit-and-run, but you'd tell a friend the truth when they ask if their partner is cheating.` },
    { when: ['B09-B', 'Q3-FUB-B'], text: `You won't lie to the police for your sibling, but you'd tell a friend you don't know when they ask if their partner is cheating.` },
    { when: ['B37-B', 'D1-FUA-A'], text: `You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd break your promise to keep your parent at home once they no longer knew you.` },
    { when: ['B40-A', 'B43-A'], text: `You'd speak up when a relative makes a cruel joke at dinner, but you'd apologize to a neighbor for something you didn't do, just to keep the peace.` },
    { when: ['B44-A', 'D7-A'], text: `You won't look at your partner's phone because it's private, but you'd tell a friend about their fiancé's prison record from long ago.` },
    { when: ['B46-A', 'D1-B'], text: `You'd take a struggling friend's call every night, even as your own life slips, but you'd move your parent into a care home to protect yours.` },
    { when: ['Q1-A', 'B24-B'], text: `You'd pull the lever to save five strangers, but you'd save your dog from a fire before a stranger.` },
    { when: ['B37-A', 'B10-A'], text: `You'd give your friend back their bank card because it's their life, but you'd give up marrying the person you love because your parents demand it.` },
    { when: ['B29-B', 'B55-A'], text: `You'd vote not guilty for a parent who stole baby formula, but you'd make your own child give back a board game win over a bent rule.` },
    { when: ['B01-FU-A', 'B44-B'], text: `You trust most people to be good when no one is watching, but you'd look through your partner's phone on a hunch.` },
    { when: ['B36-FU-A', 'B42-B'], text: `You'd let someone who betrayed you be as close as before, but you'd keep your distance from a friend over an unproven rumor.` },
  );
})(typeof window !== 'undefined' ? window : globalThis);
