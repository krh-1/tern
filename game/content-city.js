// Tern: the City (world 3): 19 questions about rules, work and institutions. Instrument data; see content.js header.
// Wording is verbatim from docs/QUESTION-BANK.md (B-questions) and docs/QUESTIONS.md (Q8, Q9, Q10, Q11, D3, D5, D6, D10, D11;
// dashes in answers became periods, as in the park). D11's clarifying preface ("Something came up that we want to explore.")
// is dropped because here it is an ordinary stop. Nudges, setups, notes, did lines, tendencies and tensions are first-authored
// here and wait for Ken's sign-off. The old doc nudges were re-checked against the axis meanings in content.js, and several
// were changed (see game/city-proposals.md).
// Axis ids: OR (O+ / R-), CI (C+ / I-), HT (H+ / T-), LP (L+ / P-), SD (S+ / D-).
(function (root) {
  const C = root.TERN_CONTENT;

  const questions = [
    // Q11 ───────────────────────────────────────────────────────────
    {
      id: 'Q11', world: 'city', title: `The Autonomous Car`, scene: 'selfdrive', weight: 'heavy',
      steps: {
        trunk: {
          setup: `No brakes. Everyone involved is an adult stranger.`,
          q: `A self-driving car's brakes fail. It can hit five pedestrians, or swerve into a wall and kill its one passenger. If you set the rule for every car, what should it do?`,
          answers: [
            { id: 'Q11-A', text: `Swerve. Save the five`, nudges: { OR: 3, CI: 2 },
              note: `You'd have every self-driving car kill its own passenger to save five people on the road. Saving the most lives is the rule you'd set.`,
              did: `You'd set every self-driving car to swerve and kill its passenger rather than hit five pedestrians.` },
            { id: 'Q11-B', text: `Protect the passenger`, nudges: { OR: -2, CI: -1 },
              note: `You'd have a self-driving car protect the person inside it, even if five people on the road die. A car shouldn't be built to kill its own passenger.`,
              did: `You'd set every self-driving car to protect its passenger, even if the car hits five pedestrians.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `It costs the same as a car without this rule.`,
          q: `Would you buy a car programmed this way for your own family?`,
          answers: [
            { id: 'Q11-FUA-A', text: `Yes`, nudges: { OR: 1, CI: 1, LP: -2 },
              note: `You'd put your own family in a car built to sacrifice its passengers for five strangers. The rule you set for everyone applies to them too.`,
              did: `You'd buy your family a self-driving car programmed to sacrifice its passengers to save five pedestrians.` },
            { id: 'Q11-FUA-B', text: `No`, nudges: { CI: -2, LP: 2 },
              note: `You want self-driving cars to save the five, but you wouldn't put your own family in one. Your family is the exception to your own rule.`,
              did: `You wouldn't buy your family a self-driving car programmed to sacrifice its passengers to save five pedestrians.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `The five were crossing lawfully.`,
          q: `The passenger chose to ride. The five pedestrians chose nothing. Does that change it?`,
          answers: [
            { id: 'Q11-FUB-A', text: `Yes. Then swerve`, nudges: { OR: 2, CI: 1 },
              note: `You'd protect the passenger at first, but the five on the road never chose any risk. Once you see that, you'd have the car swerve.`,
              did: `You'd set self-driving cars to swerve into a wall once you saw that the passenger chose to ride and the five pedestrians didn't.` },
            { id: 'Q11-FUB-B', text: `No. The car shouldn't turn on its passenger`, nudges: { OR: -2, CI: -1 },
              note: `Even though the five on the road chose nothing, you'd still have the car protect its passenger. A car should never be built to kill the person inside it.`,
              did: `You'd still set self-driving cars to protect their passenger, even though the five pedestrians chose no risk.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'Q11-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B12 ───────────────────────────────────────────────────────────
    {
      id: 'B12', world: 'city', title: `Two Drivers`, scene: 'twodrivers', weight: 'light',
      steps: {
        trunk: {
          setup: `Same drinks, same road, same care. Only luck differs.`,
          q: `Two friends each have three drinks and drive home the same way, equally carefully. A child runs into the road in front of one of them, and that driver hits the child. The other gets home without incident. Did they do something equally wrong?`,
          answers: [
            { id: 'B12-A', text: `Yes. Same choice, same wrong. The rest was luck.`, nudges: { OR: -2, HT: -1 },
              note: `You judge the two drivers by what they chose, not by what happened. Both chose to drive after drinking, so both did the same wrong.`,
              did: `You think two friends who drove home after three drinks did equally wrong, though only one of them hit a child.` },
            { id: 'B12-B', text: `No. The one who hit the child did something worse.`, nudges: { OR: 2, HT: 1 },
              note: `For you, what actually happens counts. The driver who hit a child did something worse, even though the other made the same choice.`,
              did: `You think a drunk driver who hit a child did worse than a friend who drove home the same way without hitting anyone.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now it's about what the law should do.`,
          q: `Should they get the same punishment?`,
          answers: [
            { id: 'B12-FU-A', text: `Yes.`, nudges: { OR: -2, HT: -1 },
              note: `You'd punish both drivers the same, since both made the same choice. Luck shouldn't decide anyone's sentence.`,
              did: `You'd give the same punishment to a drunk driver who hit a child and one who got home safely.` },
            { id: 'B12-FU-B', text: `No. What actually happened has to matter in the law.`, nudges: { OR: 1, SD: 1 },
              note: `You think both drivers did the same wrong, but the law should still punish the one who hit a child more. In court, what happened has to count.`,
              did: `You'd punish a drunk driver who hit a child more than one who got home safely, though you think both did equally wrong.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B12-A') return 'fu';
        return null;
      },
    },

    // B03 ───────────────────────────────────────────────────────────
    {
      id: 'B03', world: 'city', title: `The Reference Call`, scene: 'reference', weight: 'medium',
      steps: {
        trunk: {
          setup: `Pleasant but unreliable. Eight months out of work. Two kids.`,
          q: `A former employee of yours was pleasant but unreliable: missed deadlines, sometimes didn't show up. They've been out of work for 8 months and support two kids. A hiring manager calls you for a reference. What do you say?`,
          answers: [
            { id: 'B03-A', text: `The honest picture, problems included.`, nudges: { HT: -2, LP: -1, OR: -1 },
              note: `You'd tell a hiring manager about a former employee's problems, even with their kids depending on the job. A reference has to be honest.`,
              did: `You'd give an honest job reference, problems included, for an unreliable former employee who supports two kids.` },
            { id: 'B03-B', text: `The good parts. I leave out the rest.`, nudges: { HT: 2, LP: 1 },
              note: `You'd leave a former employee's problems out of a reference to help them get back to work. Their family's need weighs more with you than the full picture.`,
              did: `You'd give only the good parts in a job reference for an unreliable former employee who supports two kids.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now strangers' care depends on this person showing up.`,
          q: `The job is overnight care for elderly patients. A missed shift means someone goes without help.`,
          answers: [
            { id: 'B03-FU-A', text: `Then I tell them about the reliability problem.`, nudges: { CI: 2, LP: -2 },
              note: `You'd soften a reference to help someone, but not when patients would pay for it. Once strangers could go without care, you tell the hiring manager.`,
              did: `You'd tell a hiring manager about a former employee's unreliability once you knew the job was overnight care for elderly patients.` },
            { id: 'B03-FU-B', text: `I stick with what I said.`, nudges: { LP: 2, HT: 1, CI: -1 },
              note: `Even knowing elderly patients could go without care, you'd keep a former employee's problems out of the reference. You'd give the person you know their chance.`,
              did: `You'd still leave a former employee's unreliability out of a reference for a job caring for elderly patients overnight.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B03-B') return 'fu';
        return null;
      },
    },

    // B04 ───────────────────────────────────────────────────────────
    {
      id: 'B04', world: 'city', title: `The Company Line`, scene: 'companyline', weight: 'medium',
      steps: {
        trunk: {
          setup: `Your manager is right there. The customer asks you directly.`,
          q: `Your manager tells you to blame a late order on a "supplier issue." The real reason is that your company put bigger clients first. With your manager standing right there, a customer asks you: "Is it really the supplier?" What do you say?`,
          answers: [
            { id: 'B04-A', text: `"Yes, it's the supplier." It's the company's line, not my lie.`, nudges: { SD: 2, CI: -1 },
              note: `You'd give a customer the excuse your manager told you to give. When you speak for the company, you see the lie as the company's, not yours.`,
              did: `You'd tell a customer a late order was the supplier's fault, as your manager instructed, though it wasn't true.` },
            { id: 'B04-B', text: `"No. We put bigger orders first."`, nudges: { SD: -2, OR: -1 },
              note: `You'd tell a customer the real reason for a late order, in front of the manager who told you not to. Your job doesn't make a lie OK for you.`,
              did: `You'd tell a customer their order was late because your company put bigger clients first, with your manager standing there.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Same question. Now you know what the delay costs them.`,
          q: `The customer is a small bakery that may lose a wedding order because of the delay.`,
          answers: [
            { id: 'B04-FU-A', text: `I still give the company line.`, nudges: { SD: 2, HT: -1, CI: -1 },
              note: `Even when a small bakery could lose a wedding order, you'd stick to the excuse your manager gave you. At work, you keep to your role.`,
              did: `You'd still blame the supplier for a late order, even knowing a small bakery could lose a wedding order over the delay.` },
            { id: 'B04-FU-B', text: `I tell them the truth.`, nudges: { SD: -2, HT: 2 },
              note: `You'd repeat your company's excuse to most customers, but not to a small bakery about to lose a wedding order. Their trouble makes you tell the truth.`,
              did: `You'd tell a small bakery the real reason their order was late, against your manager's instructions.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B04-A') return 'fu';
        return null;
      },
    },

    // B05 ───────────────────────────────────────────────────────────
    {
      id: 'B05', world: 'city', title: `The Mistake No One Saw`, scene: 'mistake', weight: 'medium',
      steps: {
        trunk: {
          setup: `Years ago. They never found out. They're doing fine now.`,
          q: `Years ago, you made a mistake on a shared project, and your coworker took the blame. It cost them a promotion. They never found out, and today they're doing fine. Do you tell them?`,
          answers: [
            { id: 'B05-A', text: `Yes, and apologize.`, nudges: { OR: -2, HT: -1 },
              note: `You'd tell a coworker your old mistake cost them a promotion, even though they're doing fine now. You think they have a right to know.`,
              did: `You'd tell a coworker that your mistake years ago cost them a promotion, and apologize.` },
            { id: 'B05-B', text: `No. It would only hurt them now.`, nudges: { OR: 2, HT: 1 },
              note: `You'd keep quiet about an old mistake that cost a coworker a promotion. Telling them now would hurt them and change nothing.`,
              did: `You wouldn't tell a coworker that your mistake years ago cost them a promotion.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `The lost promotion still weighs on them.`,
          q: `They mention that losing that promotion still makes them doubt themselves.`,
          answers: [
            { id: 'B05-FU-A', text: `Then I tell them.`, nudges: { HT: 2, OR: 1 },
              note: `You'd keep quiet to spare a coworker, until you learn the lost promotion still makes them doubt themselves. Then the truth would help them, so you tell.`,
              did: `You'd tell a coworker your old mistake cost them a promotion once you learned the lost promotion still makes them doubt themselves.` },
            { id: 'B05-FU-B', text: `Still no.`, nudges: { CI: -2, HT: -1 },
              note: `Even knowing a coworker still doubts themselves over a promotion your mistake cost them, you wouldn't tell them.`,
              did: `You still wouldn't tell a coworker your old mistake cost them a promotion, though losing the promotion still makes them doubt themselves.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B05-B') return 'fu';
        return null;
      },
    },

    // B30 ───────────────────────────────────────────────────────────
    {
      id: 'B30', world: 'city', title: `The Permit Fee`, scene: 'permit', weight: 'light',
      steps: {
        trunk: {
          setup: `You're entitled to the permit. Paying is normal here.`,
          q: `You're living in another country and need a permit you're entitled to. Everyone knows the official expects a small cash "fee." Locals pay it without thinking twice. Do you pay?`,
          answers: [
            { id: 'B30-A', text: `Yes. That's how it works here.`, nudges: { OR: 2, SD: -1, CI: -1 },
              note: `You'd pay an official the small cash "fee" that everyone pays. You go by how things work where you are.`,
              did: `You'd pay an official's expected cash "fee" for a permit you're entitled to abroad.` },
            { id: 'B30-B', text: `No, even if it takes months longer.`, nudges: { OR: -2, SD: 1, CI: 1 },
              note: `You'd refuse to pay an official a bribe, even if your permit takes months longer. What's wrong at home is wrong anywhere to you.`,
              did: `You'd refuse to pay an official's expected cash "fee" abroad, even if your permit took months longer.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now refusing costs you the reason you came.`,
          q: `Without the permit, you can't start the job you moved there for.`,
          answers: [
            { id: 'B30-FU-A', text: `Then I pay.`, nudges: { OR: 2, SD: -1 },
              note: `You'd refuse to pay a bribe for a permit until refusing costs you the job you moved abroad for. Then you pay.`,
              did: `You'd pay an official's cash "fee" abroad once refusing would cost you the job you moved for.` },
            { id: 'B30-FU-B', text: `Still no.`, nudges: { OR: -2, SD: 1 },
              note: `Even if refusing costs you the job you moved abroad for, you won't pay an official a bribe.`,
              did: `You'd still refuse to pay an official's cash "fee" abroad, even if refusing cost you the job you moved for.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B30-B') return 'fu';
        return null;
      },
    },

    // B32 ───────────────────────────────────────────────────────────
    {
      id: 'B32', world: 'city', title: `The Call-Up`, scene: 'callup', weight: 'heavy',
      steps: {
        trunk: {
          setup: `You believe this war is wrong. The call-up is official.`,
          q: `Your country goes to war. You believe this war is wrong. You're called up to serve. What do you do?`,
          answers: [
            { id: 'B32-A', text: `I serve. My country asked.`, nudges: { SD: 3, CI: 1 },
              note: `You'd fight in a war you believe is wrong because your country called you up. Your duty to your country comes before your own judgment.`,
              did: `You'd serve in a war you believe is wrong when your country calls you up.` },
            { id: 'B32-B', text: `I refuse and accept the consequences, even prison.`, nudges: { SD: -2, OR: -2 },
              note: `You'd go to prison rather than fight in a war you believe is wrong. You won't take part, and you won't run from the price.`,
              did: `You'd refuse to serve in a war you believe is wrong, even if it meant prison.` },
            { id: 'B32-C', text: `I leave the country for good.`, nudges: { SD: -2, CI: -2 },
              note: `You'd leave your country for good rather than fight in a war you believe is wrong. You'd give up your home before you'd serve or go to prison.`,
              did: `You'd leave your country for good rather than serve in a war you believe is wrong.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `A different war. This time your country is attacked.`,
          q: `Now it's a different war. Your country has been invaded. Would you fight?`,
          answers: [
            { id: 'B32-FU-A', text: `Yes. Defending my home is different.`, nudges: { OR: 2, LP: 1, SD: 1 },
              note: `You wouldn't serve in a war you think is wrong, but you'd fight if your country were invaded. You don't reject every war, only wrong ones.`,
              did: `You'd fight if your country were invaded, though you wouldn't serve in a war you believe is wrong.` },
            { id: 'B32-FU-B', text: `No. I won't fight in any war.`, nudges: { OR: -3 },
              note: `You wouldn't fight even if your country were invaded. For you, no war makes fighting right.`,
              did: `You wouldn't fight in any war, even if your country were invaded.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && (picks.trunk === 'B32-B' || picks.trunk === 'B32-C')) return 'fu';
        return null;
      },
    },

    // B33 ───────────────────────────────────────────────────────────
    {
      id: 'B33', world: 'city', title: `The Man Who Changed`, scene: 'changed', weight: 'medium',
      steps: {
        trunk: {
          setup: `Twenty-six years later. He was never caught until now.`,
          q: `At 19, a man badly hurt someone in a robbery and was never caught. He's now 45: a teacher, a father, a volunteer. New evidence surfaces. Should he go to prison?`,
          answers: [
            { id: 'B33-A', text: `Yes. Justice doesn't expire.`, nudges: { SD: 2, OR: -2 },
              note: `You'd send a man to prison for a robbery he committed at 19, even though he's now a teacher and a father. A crime still has to be answered for, however long ago.`,
              did: `You think a man should go to prison at 45 for badly hurting someone in a robbery at 19.` },
            { id: 'B33-B', text: `No. He's not that person anymore.`, nudges: { OR: 2, SD: -1, HT: 1 },
              note: `You wouldn't send a man to prison for a robbery he committed at 19, now that he's a teacher and a father. Who he is now matters more to you than what he did then.`,
              did: `You think a man who badly hurt someone in a robbery at 19 shouldn't go to prison at 45, now that he's changed.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `The person he hurt has never recovered.`,
          q: `The person he hurt still lives with daily pain and wants him prosecuted.`,
          answers: [
            { id: 'B33-FU-A', text: `Then yes, prosecute.`, nudges: { SD: 2, HT: 1 },
              note: `You'd spare a man who changed, unless the person he hurt still suffers and wants him prosecuted. The victim's wish decides it for you.`,
              did: `You'd prosecute a man for a robbery at 19 once you learned the person he hurt still lives in pain and wants him prosecuted.` },
            { id: 'B33-FU-B', text: `I understand, but no.`, nudges: { SD: -2, OR: 1 },
              note: `Even with the person he hurt still in daily pain and asking for prosecution, you wouldn't send a changed man to prison.`,
              did: `You still wouldn't send a changed man to prison for a robbery at 19, though the person he hurt lives in pain and wants him prosecuted.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B33-B') return 'fu';
        return null;
      },
    },

    // B34 ───────────────────────────────────────────────────────────
    {
      id: 'B34', world: 'city', title: `The Remorse Pill`, scene: 'remorse', weight: 'light',
      steps: {
        trunk: {
          setup: `The pill works. They will never do it again.`,
          q: `A pill makes anyone who takes it deeply sorry for their crime and unable to ever do it again. A person convicted of assault has taken it. Should they still serve their prison sentence?`,
          answers: [
            { id: 'B34-A', text: `Yes. They still deserve it.`, nudges: { OR: -2, SD: 1 },
              note: `Even if someone convicted of assault is truly sorry and can never do it again, you think they should serve their sentence. Punishment is owed for what they did.`,
              did: `You think a person convicted of assault should serve their sentence, even after a pill made them sorry and unable to reoffend.` },
            { id: 'B34-B', text: `No. There's nothing left for prison to do.`, nudges: { OR: 3, SD: -1 },
              note: `If someone is truly sorry and can never do it again, you see no point in prison. For you, punishment has to do some good.`,
              did: `You think a person convicted of assault should go free once a pill made them sorry and unable to reoffend.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now think about everyone else watching the case.`,
          q: `If they walk free, others may think crime is cheap.`,
          answers: [
            { id: 'B34-FU-A', text: `Then they should serve.`, nudges: { CI: 2, OR: 1, SD: 1 },
              note: `You'd free someone who can't reoffend, but not if it tells others that crime is cheap. Their sentence also protects everyone else.`,
              did: `You'd make a person convicted of assault serve their sentence so others don't think crime is cheap, even after a pill made them unable to reoffend.` },
            { id: 'B34-FU-B', text: `That's not a reason to punish this person.`, nudges: { CI: -2, OR: -1 },
              note: `You won't keep someone in prison just to warn other people. A person is punished for what they did, not to send a message.`,
              did: `You'd free a person convicted of assault who can't reoffend, even if others might think crime is cheap.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B34-B') return 'fu';
        return null;
      },
    },

    // B35 ───────────────────────────────────────────────────────────
    {
      id: 'B35', world: 'city', title: `The True Story`, scene: 'truestory', weight: 'heavy',
      steps: {
        trunk: {
          setup: `The police found nothing. What you know is true.`,
          q: `Someone seriously hurt a person you love. Police looked into it, and nothing came of it. You have true, damaging information about them that would wreck their reputation if you posted it anonymously. Do you post it?`,
          answers: [
            { id: 'B35-A', text: `Yes. They earned it.`, nudges: { SD: -3, LP: 2 },
              note: `You'd anonymously post true, damaging information about someone who hurt a person you love, after the police did nothing. When the system fails, you act yourself.`,
              did: `You'd anonymously post true, damaging information about someone who hurt a person you love, after the police did nothing.` },
            { id: 'B35-B', text: `No. That's not my role.`, nudges: { SD: 2, LP: -1 },
              note: `You wouldn't post damaging information about someone who hurt a person you love, even after the police did nothing. Punishing them isn't your job.`,
              did: `You wouldn't post true, damaging information about someone who hurt a person you love, though the police did nothing.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Their children did nothing wrong.`,
          q: `It will also hurt their teenage kids, who did nothing.`,
          answers: [
            { id: 'B35-FU-A', text: `Still yes.`, nudges: { LP: 2, SD: -1, HT: -1 },
              note: `Even knowing it would hurt their teenage kids, you'd still post the damaging information. The person you love comes first.`,
              did: `You'd still post damaging information about the person who hurt someone you love, even though posting would hurt their innocent teenage kids.` },
            { id: 'B35-FU-B', text: `Then no.`, nudges: { HT: 2, OR: 1, LP: -1 },
              note: `You'd expose the person who hurt someone you love, but not if their teenage kids would be hurt too. Innocent children stop you.`,
              did: `You wouldn't post damaging information about the person who hurt someone you love once you knew posting would hurt their teenage kids.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B35-A') return 'fu';
        return null;
      },
    },

    // B41 ───────────────────────────────────────────────────────────
    {
      id: 'B41', world: 'city', title: `The Borrowed Credit`, scene: 'credit', weight: 'light',
      steps: {
        trunk: {
          setup: `The idea was your coworker's. They aren't in the room.`,
          q: `Your boss praises you in a meeting for an idea that was actually your coworker's. Your coworker isn't there. What do you do?`,
          answers: [
            { id: 'B41-A', text: `Make sure my boss knows it was theirs.`, nudges: { CI: 2 },
              note: `You'd tell your boss that an idea they praised you for was your coworker's. You won't keep credit you didn't earn.`,
              did: `You'd tell your boss that the idea they praised you for was your coworker's.` },
            { id: 'B41-B', text: `Let it go.`, nudges: { CI: -2 },
              note: `You'd let your boss go on thinking a coworker's idea was yours. You wouldn't go out of your way to correct the record.`,
              did: `You'd let your boss credit you for your coworker's idea.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now the praise could be worth money to you.`,
          q: `Your pay review is next week. This praise could decide your raise.`,
          answers: [
            { id: 'B41-FU-A', text: `I still correct it.`, nudges: { CI: 3 },
              note: `Even with your raise on the line, you'd tell your boss the idea was your coworker's.`,
              did: `You'd tell your boss a praised idea was your coworker's, even with your raise riding on the praise.` },
            { id: 'B41-FU-B', text: `Then I'd let it go.`, nudges: { CI: -2 },
              note: `You'd give your coworker the credit until keeping quiet could win you a raise. Then you'd let your boss believe the idea was yours.`,
              did: `You'd let your boss credit you for your coworker's idea once the praise could decide your raise.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B41-A') return 'fu';
        return null;
      },
    },

    // Q8 ────────────────────────────────────────────────────────────
    {
      id: 'Q8', world: 'city', title: `The Coworker`, scene: 'theft', weight: 'medium',
      steps: {
        trunk: {
          setup: `Clear proof. It's still going on. You like them.`,
          q: `A colleague you like has been stealing small amounts from work for months. You have clear proof. What do you do?`,
          answers: [
            { id: 'Q8-A', text: `Report it`, nudges: { SD: 2, LP: -2 },
              note: `You'd report a colleague you like for stealing from work. Liking them doesn't put them above the rules.`,
              did: `You'd report a colleague you like for stealing small amounts from work.` },
            { id: 'Q8-B', text: `Stay out of it`, nudges: { LP: 2, SD: -1 },
              note: `You'd keep quiet about a colleague you like stealing small amounts from work. It isn't your job to turn them in.`,
              did: `You'd stay out of it when a colleague you like steals small amounts from work.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The bills are real. You haven't reported yet.`,
          q: `Before you do, you learn they did it to pay their child's medical bills. Do you still report it?`,
          answers: [
            { id: 'Q8-FUA-A', text: `Yes, I still report it`, nudges: { SD: 2, HT: -2 },
              note: `Even knowing a colleague stole to pay their child's medical bills, you'd report them. A good reason doesn't make stealing OK to you.`,
              did: `You'd report a colleague for stealing from work, even knowing they stole to pay their child's medical bills.` },
            { id: 'Q8-FUA-B', text: `No, I don't report it`, nudges: { HT: 3, SD: -1 },
              note: `You'd report a colleague for stealing, unless they did it to pay their child's medical bills. Then you'd let it go.`,
              did: `You wouldn't report a colleague for stealing from work once you learned the money paid their child's medical bills.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `It's a small family business. The losses hit their payroll.`,
          q: `You learn the victim is a small family business, and the losses are hurting them. Now what?`,
          answers: [
            { id: 'Q8-FUB-A', text: `I report it now`, nudges: { LP: -2, SD: 1, OR: 1 },
              note: `You'd stay out of a colleague's stealing until you learned it was hurting a small family business. Then you'd report it.`,
              did: `You'd report a colleague you like for stealing once you learned the losses were hurting a small family business.` },
            { id: 'Q8-FUB-B', text: `I still stay out of it`, nudges: { LP: 2, SD: -1 },
              note: `Even knowing a colleague's stealing is hurting a small family business, you'd stay out of it. You won't turn in someone you like.`,
              did: `You'd still stay out of it when a colleague you like steals, even knowing the losses are hurting a small family business.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'Q8-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // Q9 ────────────────────────────────────────────────────────────
    {
      id: 'Q9', world: 'city', title: `The Protest`, scene: 'unjustlaw', weight: 'heavy',
      steps: {
        trunk: {
          setup: `The courts said no. The protest is peaceful. Arrest is likely.`,
          q: `A law you believe is deeply unjust passes through normal democratic process. Court challenges have already failed. Would you break that law through nonviolent civil disobedience?`,
          answers: [
            { id: 'Q9-A', text: `Break it through nonviolent protest`, nudges: { SD: -3, CI: 1 },
              note: `You'd break a law you believe is deeply unjust, even though it passed fairly and the courts upheld it. Some laws you won't obey.`,
              did: `You'd break a deeply unjust law through nonviolent protest after court challenges failed.` },
            { id: 'Q9-B', text: `Do not break it. Protect the process`, nudges: { SD: 3, HT: -1 },
              note: `You wouldn't break a law you believe is deeply unjust once it passed fairly and the courts upheld it. Keeping the process working matters more to you than any one law.`,
              did: `You wouldn't break a deeply unjust law that passed through a fair democratic process.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `People depend on your income.`,
          q: `An arrest would likely cost you your job, and your family depends on your income.`,
          answers: [
            { id: 'Q9-FUA-A', text: `I still do it`, nudges: { SD: -2, LP: -1 },
              note: `You'd break an unjust law in protest even if the arrest cost you the job your family depends on.`,
              did: `You'd break an unjust law in protest, even if an arrest would cost you the job your family depends on.` },
            { id: 'Q9-FUA-B', text: `Then I don't`, nudges: { LP: 2, SD: 1 },
              note: `You'd protest an unjust law until it put your family's income at risk. Then your family comes first.`,
              did: `You wouldn't break an unjust law in protest if an arrest would cost you the job your family depends on.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Legal routes are still closed. Now it's personal.`,
          q: `The law starts hurting someone you love.`,
          answers: [
            { id: 'Q9-FUB-A', text: `Then I'd break it`, nudges: { SD: -2, LP: 2 },
              note: `You'd obey an unjust law until it hurt someone you love. Then you'd break it.`,
              did: `You'd break an unjust law once the law started hurting someone you love.` },
            { id: 'Q9-FUB-B', text: `I still wouldn't`, nudges: { SD: 2, LP: -1 },
              note: `Even when an unjust law hurts someone you love, you wouldn't break it. You hold to the process for everyone, your own people included.`,
              did: `You still wouldn't break an unjust law, even when the law hurts someone you love.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'Q9-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // Q10 ───────────────────────────────────────────────────────────
    {
      id: 'Q10', world: 'city', title: `The Bystander`, scene: 'platform', weight: 'medium',
      steps: {
        trunk: {
          setup: `No staff, no signal. Others are watching and doing nothing.`,
          q: `On a subway platform, you see one adult verbally harassing another adult. The aggression is escalating. No staff are around, and your phone has no signal. What do you do?`,
          answers: [
            { id: 'Q10-A', text: `Confront the harasser`, nudges: { CI: 2, OR: 1 },
              note: `You'd confront a stranger harassing someone on a subway platform, with no one else to help. You'd try to stop the harassment yourself.`,
              did: `You'd confront a stranger verbally harassing someone on a subway platform.` },
            { id: 'Q10-B', text: `Go stand with the target, even if the harasser turns on me`, nudges: { HT: 2, CI: 1 },
              note: `You'd go stand beside a stranger being harassed on a subway platform, even if the harasser turned on you. You'd make sure they weren't alone.`,
              did: `You'd go stand beside a stranger being harassed on a subway platform, even if the harasser turned on you.` },
            { id: 'Q10-C', text: `Stay where I am`, nudges: { CI: -2, HT: -1 },
              note: `You'd stay where you are while a stranger is harassed on a subway platform. You'd keep yourself out of a fight that isn't yours.`,
              did: `You'd stay where you are while a stranger is verbally harassed on a subway platform.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now it's physical. No one else is moving.`,
          q: `The harasser shoves the target to the ground. No one else moves.`,
          answers: [
            { id: 'Q10-FU-A', text: `I step in physically`, nudges: { CI: 2, HT: 2 },
              note: `Once a stranger is shoved to the ground and no one else moves, you'd step in physically.`,
              did: `You'd physically step in when a stranger was shoved to the ground on a subway platform.` },
            { id: 'Q10-FU-B', text: `I still hold back`, nudges: { CI: -2, HT: -1 },
              note: `Even when a stranger is shoved to the ground and no one else moves, you'd hold back.`,
              did: `You'd hold back when a stranger was shoved to the ground on a subway platform and no one else moved.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && (picks.trunk === 'Q10-B' || picks.trunk === 'Q10-C')) return 'fu';
        return null;
      },
    },

    // D3 ────────────────────────────────────────────────────────────
    {
      id: 'D3', world: 'city', title: `The Informant`, scene: 'shifts', weight: 'medium',
      steps: {
        trunk: {
          setup: `You've raised it with them twice. Reporting will cost them.`,
          q: `A colleague who helped build your career keeps giving the worst shifts to a teammate they dislike. You've talked to them twice. Nothing changed. Do you report it to HR?`,
          answers: [
            { id: 'D3-A', text: `Report it`, nudges: { SD: 2, LP: -2 },
              note: `You'd report the colleague who helped build your career to HR for treating a teammate unfairly. What they did for you doesn't excuse what they're doing.`,
              did: `You'd report the colleague who helped build your career to HR for giving a teammate the worst shifts.` },
            { id: 'D3-B', text: `Let it go`, nudges: { LP: 2, SD: -1 },
              note: `You'd let it go when the colleague who helped build your career keeps treating a teammate unfairly. You've tried twice, and you won't go to HR about them.`,
              did: `You wouldn't report the colleague who helped build your career for giving a teammate the worst shifts.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // D5 ────────────────────────────────────────────────────────────
    {
      id: 'D5', world: 'city', title: `The Unearned Advantage`, scene: 'hiring', weight: 'light',
      steps: {
        trunk: {
          setup: `It's your call. Both can do the job. No one would know.`,
          q: `You're hiring. One candidate is a bit stronger. The other is the child of a mentor who shaped your career, and the mentor asked you, as a personal favor, to hire them. Their kid could do the job. Who do you hire?`,
          answers: [
            { id: 'D5-A', text: `The stronger candidate`, nudges: { LP: -2, CI: 1 },
              note: `You'd hire the stronger candidate over your mentor's child, even though your mentor asked you as a favor. The job goes to whoever is best for it.`,
              did: `You'd hire the stronger candidate over the child of a mentor who asked you for the favor.` },
            { id: 'D5-B', text: `My mentor's kid`, nudges: { LP: 2, HT: 1 },
              note: `You'd hire your mentor's child over a slightly stronger candidate because your mentor asked. What you owe your mentor counts for more than a small edge.`,
              did: `You'd hire your mentor's child over a slightly stronger candidate as a favor to your mentor.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // D6 ────────────────────────────────────────────────────────────
    {
      id: 'D6', world: 'city', title: `The Leaked Draft`, scene: 'pensions', weight: 'heavy',
      steps: {
        trunk: {
          setup: `The cut is legal. You tried inside. Going public costs you.`,
          q: `Your company will quietly cut the pensions of 3,000 retired workers next week. You raised it inside a month ago, and nothing happened. Going public would likely stop it, but it breaks your NDA, and you'd be fired and sued. What do you do?`,
          answers: [
            { id: 'D6-A', text: `Go public`, nudges: { SD: -3, OR: 2, CI: 2 },
              note: `You'd break your confidentiality agreement and lose your job to stop a pension cut for 3,000 retirees. Their harm outweighs your agreement and your career.`,
              did: `You'd go public about your company's plan to cut 3,000 retirees' pensions, though going public breaks your confidentiality agreement and costs you your job.` },
            { id: 'D6-B', text: `Stay quiet. I signed, and I tried`, nudges: { SD: 2, OR: -1, CI: -1 },
              note: `You'd stay quiet about a pension cut for 3,000 retirees after raising it inside the company. You signed an agreement, and you keep it.`,
              did: `You'd stay quiet about your company's plan to cut 3,000 retirees' pensions, because you signed a confidentiality agreement and already raised the cut inside.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // D10 ───────────────────────────────────────────────────────────
    {
      id: 'D10', world: 'city', title: `The Returning Favor`, scene: 'favor', weight: 'medium',
      steps: {
        trunk: {
          setup: `No one would find out. Everyone on the list needs a home.`,
          q: `You run the waiting list for cheap city apartments. The woman who took you in when you were homeless asks you to move her grandson to the top. Families have waited years. What do you do?`,
          answers: [
            { id: 'D10-A', text: `Move him up. I owe her`, nudges: { LP: 2, SD: -2, CI: -1 },
              note: `You'd move the grandson of the woman who took you in to the top of a housing list, ahead of families who've waited years. What you owe her comes first.`,
              did: `You'd move the grandson of the woman who took you in when you were homeless to the top of a housing waiting list you run.` },
            { id: 'D10-B', text: `Say no. The list is the list`, nudges: { LP: -2, SD: 2, CI: 1 },
              note: `You'd refuse to move up the grandson of the woman who took you in when you were homeless. Families who've waited years come first, whoever is asking.`,
              did: `You'd refuse to move the grandson of the woman who took you in when you were homeless up a housing waiting list you run.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // D11 ───────────────────────────────────────────────────────────
    {
      id: 'D11', world: 'city', title: `The Silent Witness`, scene: 'witness', weight: 'heavy',
      steps: {
        trunk: {
          setup: `You're the only witness. Refusing means a contempt charge.`,
          q: `Your brother got into a fight outside a bar. The other man was badly hurt. In court, you're asked who threw the first punch. It was your brother. What do you say?`,
          answers: [
            { id: 'D11-A', text: `The whole truth`, nudges: { SD: 2, LP: -2 },
              note: `You'd tell the court your brother threw the first punch. In court, your brother gets no exception.`,
              did: `You'd testify in court that your brother threw the first punch.` },
            { id: 'D11-B', text: `Everything but that. I leave it out`, nudges: { LP: 2, SD: -2, OR: 1 },
              note: `You'd testify in court but leave out that your brother threw the first punch. Protecting your brother matters more to you than telling the court everything.`,
              did: `You'd testify in court but leave out that your brother threw the first punch.` },
            { id: 'D11-C', text: `I refuse to testify and accept the charge`, nudges: { LP: 2, SD: -3, OR: -1 },
              note: `You'd take a contempt charge rather than testify against your brother. You won't lie in court, and you won't turn him in.`,
              did: `You'd refuse to testify about your brother's fight and accept a contempt charge.` },
          ],
        },
      },
      next: function () { return null; },
    },
  ];

  C.questions.push(...questions);

  // City answers that also count as evidence for tendencies the park and the Neighborhood already have.
  const more = {
    'follow-rules': { support: ['Q8-A', 'Q8-FUA-A', 'Q9-B', 'Q9-FUB-B', 'D10-B', 'D11-A', 'B30-B', 'B30-FU-B', 'B32-A', 'D6-B'],
      against: ['Q9-A', 'Q9-FUA-A', 'Q9-FUB-A', 'D10-A', 'D11-B', 'D11-C', 'B30-A', 'B30-FU-A', 'D6-A'] },
    'break-unjust': { support: ['Q9-A', 'Q9-FUA-A', 'Q9-FUB-A', 'D6-A', 'B32-B'], against: ['Q9-B', 'Q9-FUB-B', 'D6-B', 'B32-A'] },
    'step-in': { support: ['Q10-A', 'Q10-B', 'Q10-FU-A', 'Q8-FUB-A', 'D6-A'], against: ['Q10-C', 'Q10-FU-B'] },
    'watch-not-act': { support: ['Q10-C', 'Q10-FU-B', 'Q8-B', 'Q8-FUB-B'], against: ['Q10-A', 'Q10-B', 'Q10-FU-A', 'Q8-FUB-A'] },
    'hard-truths': { support: ['B03-A', 'B03-FU-A', 'B04-B', 'B04-FU-B', 'B05-A', 'B05-FU-A', 'D11-A'],
      against: ['B03-B', 'B03-FU-B', 'B04-A', 'B04-FU-A', 'B05-FU-B', 'D11-B'] },
    'soften-truth': { support: ['B03-B', 'B03-FU-B', 'B05-B'], against: ['B03-A', 'B05-A'] },
    'keeps-word': { support: ['D6-B'], against: ['D6-A'] },
    'own-first': { support: ['Q11-FUA-B', 'Q9-FUA-B', 'D11-B', 'D11-C'], against: ['Q11-FUA-A', 'D11-A'] },
    'bend-for-love': { support: ['D11-B', 'D11-C', 'Q9-FUB-A', 'D10-A'], against: ['D11-A', 'Q9-FUB-B', 'D10-B'] },
    'waits-turn': { support: ['D10-B', 'D5-A', 'D11-A', 'Q11-FUA-A'], against: ['D10-A', 'D5-B', 'D11-B', 'D11-C'] },
    'count-numbers': { support: ['Q11-A', 'Q11-FUA-A', 'Q11-FUB-A', 'D6-A'], against: ['Q11-B', 'Q11-FUB-B'] },
    'meant-not-outcome': { support: ['B12-A', 'B12-FU-A', 'Q8-FUA-B'], against: ['B12-B', 'Q8-FUA-A'] },
    'second-chances': { support: ['B33-B', 'B33-FU-B', 'B34-B'], against: ['B33-A', 'B34-A'] },
    'needs-watching': { support: ['B34-FU-A'], against: ['B34-FU-B'] },
    'avoid-conflict': { support: ['D3-B', 'Q8-B'], against: ['D3-A', 'Q8-A'] },
  };
  Object.entries(more).forEach(([id, m]) => { const t = C.tendencies.find(x => x.id === id); if (!t) throw new Error('unknown tendency ' + id); t.support.push(...(m.support || [])); t.against = (t.against || []).concat(m.against || []); });

  C.tendencies.push(
    { id: 'speaks-up-work', text: `You speak up when something's wrong at work.`, share: `I speak up when something's wrong at work.`,
      detail: `When your company or a colleague does something wrong, you say so or report it, even when it costs you.`,
      support: ['B04-B', 'B04-FU-B', 'D3-A', 'D6-A', 'Q8-A', 'Q8-FUB-A'], against: ['B04-A', 'B04-FU-A', 'D3-B', 'D6-B', 'Q8-B', 'Q8-FUB-B'],
      min: 2, priority: 3, protect: ['honesty at work'], trade: ['your standing at work'] },
    { id: 'owns-up', text: `You own up, even when no one would know.`, share: `I own up, even when no one would know.`,
      detail: `When you've gained from your own mistake or from credit that isn't yours, you say so, even if no one would ever find out.`,
      support: ['B05-A', 'B05-FU-A', 'B41-A', 'B41-FU-A'], against: ['B05-FU-B', 'B41-B', 'B41-FU-B'],
      min: 2, priority: 2, protect: ['credit where it’s due'], trade: ['looking good'] },
    { id: 'must-pay', text: `You think wrongdoing should always be punished.`, share: `I think people should answer for what they do.`,
      detail: `You think a crime should be punished even when the person is sorry, has changed, or could never do it again.`,
      support: ['B33-A', 'B33-FU-A', 'B34-A', 'B34-FU-A'], against: ['B33-B', 'B33-FU-B', 'B34-B', 'B34-FU-B'],
      min: 2, priority: 4, protect: ['justice for what people did'], trade: ['mercy'] },
    { id: 'repays-help', text: `You stay loyal to people who helped you.`, share: `I stay loyal to people who helped me.`,
      detail: `When someone who helped you asks for a favor or does something wrong, you side with them, even if it isn't fair to others.`,
      support: ['D3-B', 'D5-B', 'D10-A'], against: ['D3-A', 'D5-A', 'D10-B'],
      min: 2, priority: 3, protect: ['people who helped you'], trade: ['fairness to strangers'] },
    { id: 'career-first', text: `You protect your job first.`,
      detail: `When doing the right thing at work could cost you a raise or your job, you keep quiet and keep the job.`,
      support: ['B41-B', 'B41-FU-B', 'B04-FU-A', 'B30-FU-A'], against: ['B41-FU-A', 'B04-FU-B', 'B30-FU-B', 'D6-A'],
      min: 2, priority: 5, protect: ['your job'], trade: ['speaking up at work'] },
  );

  // All ids in `when` must be picked.
  C.tensions.push(
    { when: ['B09-A', 'D11-A'], text: `You'd lie to the police to cover your sibling's hit-and-run, but in court you'd testify that your brother threw the first punch.` },
    { when: ['B09-B', 'D11-B'], text: `You won't lie to the police for your sibling, but in court you'd leave out that your brother threw the first punch.` },
    { when: ['B29-A', 'Q9-A'], text: `On a jury, you'd convict a parent who stole baby formula because the law is clear, but you'd break a law you think is unjust in a protest.` },
    { when: ['B29-B', 'Q9-B'], text: `You'd vote not guilty for a parent who stole baby formula, setting the law aside, but you wouldn't break an unjust law in a protest.` },
    { when: ['Q1-A', 'Q11-B'], text: `You'd pull the lever to save five strangers, but you'd set self-driving cars to protect their one passenger over five pedestrians.` },
    { when: ['Q1-B', 'Q11-A'], text: `You wouldn't pull the lever to save five, but you'd set every self-driving car to kill its passenger to save five pedestrians.` },
    { when: ['D8-A', 'D10-B'], text: `You'd use a connection to move your father up a surgery list, but you'd refuse to move the grandson of the woman who took you in up a housing list.` },
    { when: ['D8-B', 'D10-A'], text: `You'd make your own father wait his turn for surgery, but you'd move the grandson of the woman who took you in to the top of a housing list.` },
    { when: ['B02-A', 'B03-B'], text: `You'd tell your dying grandfather his business failed, but you'd leave a former employee's problems out of a job reference.` },
    { when: ['B40-A', 'B04-A'], text: `You'd speak up when a relative makes a cruel joke at dinner, but you'd give a customer your company's false excuse for a late order.` },
    { when: ['B36-A', 'B33-A'], text: `You think you owe forgiveness to someone who betrayed you and then changed, but you'd send a man to prison at 45 for a robbery he committed at 19.` },
    { when: ['B21-B', 'B41-B'], text: `You'd turn down $1 million that costs a stranger $1,000, but you'd let your boss credit you for a coworker's idea.` },
    { when: ['B37-B', 'D6-A'], text: `You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd break your company's confidentiality agreement to stop a pension cut.` },
    { when: ['Q9-A', 'D6-B'], text: `You'd break an unjust law in a protest, but you'd stay quiet about a pension cut for 3,000 retirees because you signed an agreement.` },
  );
})(typeof window !== 'undefined' ? window : globalThis);
