// Tern: the City (world 3): 19 questions about rules, work and institutions. Instrument data; see content.js header.
// Wording is verbatim from docs/QUESTION-BANK.md (B-questions) and docs/QUESTIONS.md (Q8, Q9, Q10, Q11, D3, D5, D6, D10, D11;
// dashes in answers became periods, as in the park). D11's clarifying preface ("Something came up that we want to explore.")
// is dropped because here it is an ordinary stop. Nudges, setups, notes, did lines, tendencies and tensions were first-authored
// here; Ken ratified the City's content on 2026-10-03 with the recommended changes from game/city-proposals.md applied:
// new follow-ups for D11 and D6 (both sides) and the missing side for B41 and B03 (whose old `fu` became `fuA` / `fuB`).
// On 2026-10-04 Ken approved the deferred items too: Q10 and B34 gained their missing side (old `fu` became `fuB`,
// renaming Q10-FU-* to Q10-FUB-* and B34-FU-* to B34-FUB-*; Q10's fuB serves both "stand with the target" and "stay").
// The old doc nudges were re-checked against the axis meanings in content.js, and several were changed.
// 2026-10-04, skeptic judge fixes (docs/question-bank-wip/judge-city.md; scope in game/plan-judge-fixes.md): a follow-up
// whose situation was replaced keeps its key and gets new answer ids with a "2" (Q11-FUA2-*, B03-FUB2-*, B41-FUA2-*, Q8-FUB2-*,
// D6-FUB2-*, D11-FUB2-*), so an old save never shows a note for a question the player wasn't asked. B04's `fu` became `fuA`
// (B04-FUA-*) and it gained `fuB`; B32's `fu` became `fuB` (B32-FUB-*). See game/city-proposals.md for the full list.
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
          setup: `Every car follows your rule, including the ones your family rides in.`,
          q: `Your own children will ride in these cars every day. Do you keep the rule?`,
          answers: [
            { id: 'Q11-FUA2-A', text: `Yes. Same rule for my family`, nudges: { OR: 1, CI: 1, LP: -2 },
              note: `You'd keep a rule that has self-driving cars kill their passenger to save five, even with your own children riding in them every day.`,
              did: `You'd keep self-driving cars set to sacrifice their passenger to save five pedestrians, even with your own children riding in them.` },
            { id: 'Q11-FUA2-B', text: `No. Then protect the passenger`, nudges: { CI: -2, LP: 2 },
              note: `You'd have self-driving cars save the five, until your own children were the passengers. Then you'd change the rule to protect the passenger.`,
              did: `You'd change the rule so self-driving cars protect their passenger once your own children would ride in them.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `The five were crossing lawfully.`,
          q: `The passenger chose to ride. The five pedestrians chose nothing. Does that change it?`,
          answers: [
            { id: 'Q11-FUB-A', text: `Yes. Then swerve`, nudges: { OR: 1, CI: 1 },
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
          setup: `Same drinks, same road, same care.`,
          q: `Two friends each have three drinks and drive home the same way, equally carefully. A child runs into the road in front of one of them, and that driver hits the child. The other gets home without incident. Did they do something equally wrong?`,
          answers: [
            { id: 'B12-A', text: `Yes. They made the same choice.`, nudges: { OR: -2, HT: -1 },
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
        fuA: {
          weight: 1.5,
          setup: `Eight months out of work. Two kids. It comes down to you.`,
          q: `The hiring manager says your answer will decide it.`,
          answers: [
            { id: 'B03-FUA-A', text: `I still give the honest picture.`, nudges: { HT: -2, OR: -1 },
              note: `Even when your words alone decide whether a parent of two gets the job, you'd tell the hiring manager about their problems. A reference has to be honest, whatever it costs them.`,
              did: `You'd still give an honest reference, problems included, when your answer alone would decide whether an unreliable former employee with two kids gets the job.` },
            { id: 'B03-FUA-B', text: `Then I leave out the problems.`, nudges: { HT: 2, LP: 1 },
              note: `You'd give an honest reference, until your answer alone decides whether a parent of two gets the job. Then you'd leave out the problems.`,
              did: `You'd leave an unreliable former employee's problems out of a reference once your answer alone would decide whether they got the job.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Now other people depend on this person showing up.`,
          q: `The job is at a daycare. When a worker doesn't show, families get turned away for the day.`,
          answers: [
            { id: 'B03-FUB2-A', text: `Then I tell them about the reliability problem.`, nudges: { CI: 2, LP: -2 },
              note: `You'd leave out a former employee's problems to help them, but not for a daycare job where a missed shift turns families away. Then you'd tell the hiring manager.`,
              did: `You'd tell a hiring manager about a former employee's unreliability once you knew the job was at a daycare where a missed shift turns families away.` },
            { id: 'B03-FUB2-B', text: `I stick with what I said.`, nudges: { LP: 2, HT: 1, CI: -1 },
              note: `Even knowing families could be turned away from a daycare, you'd keep a former employee's problems out of the reference. You'd give the person you know their chance.`,
              did: `You'd still leave a former employee's unreliability out of a reference for a daycare job where a missed shift turns families away.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B03-A' ? 'fuA' : 'fuB';
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
            { id: 'B04-A', text: `"Yes, it's the supplier." I say what I was told.`, nudges: { SD: 2, CI: -1 },
              note: `You'd give a customer the false excuse your manager told you to give. At work, you say what you were told.`,
              did: `You'd tell a customer a late order was the supplier's fault, as your manager instructed, though it wasn't true.` },
            { id: 'B04-B', text: `"No. We put bigger clients first."`, nudges: { SD: -2, OR: -1 },
              note: `You'd tell a customer the real reason for a late order, in front of the manager who told you not to. Your job doesn't make a lie OK for you.`,
              did: `You'd tell a customer their order was late because your company put bigger clients first, with your manager standing there.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Same question. Now the truth could help them.`,
          q: `The customer is a small bakery. If they knew the real reason, they'd order from a competitor today and save a wedding order.`,
          answers: [
            { id: 'B04-FUA-A', text: `I still give the company line.`, nudges: { SD: 2, CI: -1 },
              note: `Even when the truth would let a small bakery save a wedding order, you'd stick to the excuse your manager gave you. At work, you keep to your role.`,
              did: `You'd still blame the supplier for a late order, even knowing the truth would let a small bakery save a wedding order.` },
            { id: 'B04-FUA-B', text: `I tell them the truth.`, nudges: { SD: -2, HT: 2 },
              note: `You'd repeat your company's excuse to most customers, but not when the truth would let a small bakery save a wedding order.`,
              did: `You'd tell a small bakery the real reason their order was late, against your manager's instructions, so the bakery could save a wedding order.` },
          ],
        },
        // after the truth: does it hold when your job is on the line?
        fuB: {
          weight: 1.5,
          setup: `Your manager has warned you before.`,
          q: `Last month your manager said one more mistake and you're fired.`,
          answers: [
            { id: 'B04-FUB-A', text: `I still tell the truth.`, nudges: { SD: -2, CI: 1 },
              note: `Even with your job on the line, you'd tell a customer the real reason their order was late, in front of your manager.`,
              did: `You'd tell a customer the real reason their order was late, in front of a manager who had warned they'd fire you.` },
            { id: 'B04-FUB-B', text: `Then I say it's the supplier.`, nudges: { CI: -2, SD: 1 },
              note: `You'd tell a customer the truth about a late order, unless your manager had already warned they'd fire you. Then you'd blame the supplier.`,
              did: `You'd blame the supplier for a late order once your manager had warned they'd fire you for one more mistake.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B04-A' ? 'fuA' : 'fuB';
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
            { id: 'B05-FU-B', text: `Still no.`, nudges: { CI: -2 },
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
        // after "refuse" or "leave"
        fuB: {
          weight: 1.5,
          setup: `A different war. This time your country is invaded.`,
          q: `Your country has been invaded. The leaders who started the wrong war are still in charge. Would you fight?`,
          answers: [
            { id: 'B32-FUB-A', text: `Yes. I'd fight to defend my home.`, nudges: { LP: 1, SD: 1, OR: 1 },
              note: `You wouldn't serve in a war you believe is wrong, but you'd fight if your country were invaded, even under the leaders who started that war.`,
              did: `You'd fight to defend your invaded country, even under the leaders who started a war you believe is wrong.` },
            { id: 'B32-FUB-B', text: `No. I still won't fight.`, nudges: { SD: -1, OR: -2 },
              note: `You wouldn't fight even when your country is invaded, while the leaders who started a wrong war are still in charge.`,
              did: `You wouldn't fight for your invaded country under the leaders who started a war you believe is wrong.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && (picks.trunk === 'B32-B' || picks.trunk === 'B32-C')) return 'fuB';
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
              did: `You think a person convicted of assault should serve their sentence, even after a pill made them sorry and unable to commit assault again.` },
            { id: 'B34-B', text: `No. There's nothing left for prison to do.`, nudges: { OR: 3, SD: -1 },
              note: `If someone is truly sorry and can never do it again, you see no point in prison. For you, punishment has to do some good.`,
              did: `You think a person convicted of assault should go free once a pill made them sorry and unable to commit assault again.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The pill still works. Now the person they hurt has spoken.`,
          q: `The person they assaulted has forgiven them and asks the court to let them go.`,
          answers: [
            { id: 'B34-FUA-A', text: `They should still serve.`, nudges: { OR: -2, SD: 1 },
              note: `Even when the person they assaulted forgives them and asks for their release, you think they should serve their sentence. The punishment is owed for the crime, not to the victim.`,
              did: `You think a person convicted of assault should serve their sentence, even after the person they hurt forgave them and asked the court to let them go.` },
            { id: 'B34-FUA-B', text: `Then let them go.`, nudges: { HT: 2, OR: 1 },
              note: `You think punishment is owed, until the person who was hurt forgives and asks for their release. Then you'd let them go.`,
              did: `You'd free a person convicted of assault once the person they hurt forgave them and asked the court to let them go.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Now think about everyone else watching the case.`,
          q: `If they walk free, others may think they can get away with crime.`,
          answers: [
            { id: 'B34-FUB-A', text: `Then they should serve.`, nudges: { CI: 2, OR: 1, SD: 1 },
              note: `You'd free someone who can never do it again, but not if it tells others they can get away with crime. Their sentence also protects everyone else.`,
              did: `You'd make a person convicted of assault serve their sentence so others don't think they can get away with crime, even after a pill made them unable to commit assault again.` },
            { id: 'B34-FUB-B', text: `That's not a reason to punish this person.`, nudges: { OR: -2, CI: -1 },
              note: `You won't keep someone in prison just to warn other people. A person is punished for what they did, not to send a message.`,
              did: `You'd free a person convicted of assault who can never commit assault again, even if others might think they can get away with crime.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B34-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B35 ───────────────────────────────────────────────────────────
    {
      id: 'B35', world: 'city', title: `The True Story`, scene: 'truestory', weight: 'heavy',
      steps: {
        trunk: {
          setup: `The police dropped it. Your proof is real.`,
          q: `Someone seriously hurt a person you love. The police looked into it, and nothing came of it. You have proof of what they did, and posting it anonymously would wreck their reputation. Do you post it?`,
          answers: [
            { id: 'B35-A', text: `Yes. They earned it.`, nudges: { SD: -3, LP: 2 },
              note: `You'd anonymously post proof of what someone did to a person you love, after the police dropped the case. When the system fails, you act yourself.`,
              did: `You'd anonymously post proof of what someone did to a person you love, after the police dropped the case.` },
            { id: 'B35-B', text: `No. That's not my role.`, nudges: { SD: 2, LP: -1 },
              note: `You wouldn't post proof of what someone did to a person you love, even after the police dropped the case. Punishing them isn't your job.`,
              did: `You wouldn't post proof of what someone did to a person you love, though the police dropped the case.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Their children did nothing wrong.`,
          q: `It will also hurt their teenage kids, who did nothing.`,
          answers: [
            { id: 'B35-FU-A', text: `Still yes.`, nudges: { LP: 2, SD: -1 },
              note: `Even knowing it would hurt their teenage kids, you'd still post proof of what they did. The person you love comes first.`,
              did: `You'd still post proof against the person who hurt someone you love, even though posting would hurt their innocent teenage kids.` },
            { id: 'B35-FU-B', text: `Then no.`, nudges: { HT: 2, OR: 1, LP: -1 },
              note: `You'd expose the person who hurt someone you love, but not if their teenage kids would be hurt too. Innocent children stop you.`,
              did: `You wouldn't post proof against the person who hurt someone you love once you knew posting would hurt their teenage kids.` },
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
          setup: `The idea was your coworker's. Your pay review is next week.`,
          q: `Your boss praises you in a meeting for an idea that was actually your coworker's. Your coworker isn't there, and your pay review is next week. What do you do?`,
          answers: [
            { id: 'B41-A', text: `Make sure my boss knows it was theirs.`, nudges: { CI: 2 },
              note: `You'd tell your boss that an idea they praised you for was your coworker's, with your pay review a week away. You won't keep credit you didn't earn.`,
              did: `You'd tell your boss that the idea they praised you for was your coworker's, with your pay review a week away.` },
            { id: 'B41-B', text: `Let it go.`, nudges: { CI: -2 },
              note: `You'd let your boss go on thinking a coworker's idea was yours, with your pay review a week away.`,
              did: `You'd let your boss credit you for your coworker's idea, with your pay review a week away.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `There's only one raise this year.`,
          q: `Your coworker is up for the same raise. Only one of you will get it.`,
          answers: [
            { id: 'B41-FUA2-A', text: `I still correct it.`, nudges: { CI: 3 },
              note: `Even with your coworker competing with you for the only raise, you'd tell your boss the idea was your coworker's.`,
              did: `You'd tell your boss a praised idea was your coworker's, even with the two of you competing for one raise.` },
            { id: 'B41-FUA2-B', text: `Then I'd let it go.`, nudges: { CI: -2 },
              note: `You'd give your coworker the credit, until the two of you were competing for the same raise. Then you'd let your boss believe the idea was yours.`,
              did: `You'd let your boss credit you for your coworker's idea once the two of you were competing for one raise.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Your coworker heard about the meeting. They ask you directly.`,
          q: `Your coworker finds out and asks if you said anything.`,
          answers: [
            { id: 'B41-FUB-A', text: `I admit I let it go.`, nudges: { OR: -2, CI: 1 },
              note: `You let your boss credit you for a coworker's idea, but you won't lie about it when they ask. You'd rather own it than cover it up.`,
              did: `You'd admit to your coworker that you let your boss credit you for their idea.` },
            { id: 'B41-FUB-B', text: `I say I didn't get the chance.`, nudges: { CI: -2, OR: 1 },
              note: `You let your boss credit you for a coworker's idea, and when they ask, you'd give them an excuse rather than admit it.`,
              did: `You'd tell your coworker you didn't get the chance to correct your boss, after letting the boss credit you for their idea.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B41-A' ? 'fuA' : 'fuB';
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
          setup: `The losses are adding up. Other people are paying for them.`,
          q: `You learn the missing money is why the owners just cut two of your coworkers' hours. Now what?`,
          answers: [
            { id: 'Q8-FUB2-A', text: `I report it now`, nudges: { LP: -2, SD: 1, OR: 1 },
              note: `You'd stay out of a colleague's stealing until you learned it cost two coworkers their hours. Then you'd report it.`,
              did: `You'd report a colleague you like for stealing once you learned the losses had cost two coworkers their hours.` },
            { id: 'Q8-FUB2-B', text: `I still stay out of it`, nudges: { LP: 2, SD: -1 },
              note: `Even knowing a colleague's stealing cost two coworkers their hours, you'd stay out of it. You won't turn in someone you like.`,
              did: `You'd still stay out of it when a colleague you like steals, even knowing the losses cost two coworkers their hours.` },
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
            { id: 'Q10-C', text: `Stay where I am`, nudges: { CI: -2 },
              note: `You'd stay where you are while a stranger is harassed on a subway platform. You'd keep yourself out of a fight that isn't yours.`,
              did: `You'd stay where you are while a stranger is verbally harassed on a subway platform.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `You spoke up. Now the harasser has turned on you.`,
          q: `The harasser turns on you. They're much bigger than you, and they step in close.`,
          answers: [
            { id: 'Q10-FUA-A', text: `I stand my ground.`, nudges: { CI: 2 },
              note: `Even when a much bigger harasser turns on you, you'd stand your ground to protect the stranger they were harassing.`,
              did: `You'd stand your ground when a much bigger harasser you confronted on a subway platform turned on you.` },
            { id: 'Q10-FUA-B', text: `I back away.`, nudges: { CI: -2 },
              note: `You'd confront a stranger's harasser, until the harasser, much bigger than you, turns on you. Then you'd back away.`,
              did: `You'd back away when a much bigger harasser you confronted on a subway platform turned on you.` },
          ],
        },
        // after "Go stand with the target" or "Stay where I am"
        fuB: {
          weight: 1.5,
          setup: `Now it's physical. No one else is moving.`,
          q: `The harasser shoves the target to the ground. No one else moves.`,
          answers: [
            { id: 'Q10-FUB-A', text: `I step in physically`, nudges: { CI: 2, HT: 2 },
              note: `Once a stranger is shoved to the ground and no one else moves, you'd step in physically.`,
              did: `You'd physically step in when a stranger was shoved to the ground on a subway platform.` },
            { id: 'Q10-FUB-B', text: `I hold back`, nudges: { CI: -2 },
              note: `Even when a stranger is shoved to the ground and no one else moves, you'd hold back.`,
              did: `You'd hold back when a stranger was shoved to the ground on a subway platform and no one else moved.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'Q10-A' ? 'fuA' : 'fuB';
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
      id: 'D6', world: 'city', title: `The Pension Cut`, scene: 'pensions', weight: 'heavy',
      steps: {
        trunk: {
          setup: `The cut is legal. You tried inside. Going public costs you.`,
          q: `Your company will quietly cut the pensions of 3,000 retired workers next week. You raised it inside a month ago, and nothing happened. Going public would likely stop it, but it breaks the confidentiality agreement you signed, and you'd be fired and sued. What do you do?`,
          answers: [
            { id: 'D6-A', text: `Go public`, nudges: { SD: -3, OR: 2, CI: 2 },
              note: `You'd break your confidentiality agreement and lose your job to stop a pension cut for 3,000 retirees. Their harm outweighs your agreement and your career.`,
              did: `You'd go public about your company's plan to cut 3,000 retirees' pensions, though going public breaks your confidentiality agreement and costs you your job.` },
            { id: 'D6-B', text: `Stay quiet. I signed, and I tried`, nudges: { SD: 2, OR: -1, CI: -1 },
              note: `You'd stay quiet about a pension cut for 3,000 retirees after raising it inside the company. You signed an agreement, and you keep it.`,
              did: `You'd stay quiet about your company's plan to cut 3,000 retirees' pensions, because you signed a confidentiality agreement and already raised the cut inside.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Going public would still likely stop the cut.`,
          q: `Your lawyer says the lawsuit would take your savings and your home.`,
          answers: [
            { id: 'D6-FUA-A', text: `I still go public.`, nudges: { CI: 3, SD: -1 },
              note: `You'd go public about a pension cut for 3,000 retirees even if the lawsuit took your savings and your home. Their pensions come before what you own.`,
              did: `You'd still go public about your company's plan to cut 3,000 retirees' pensions, even if the lawsuit took your savings and your home.` },
            { id: 'D6-FUA-B', text: `Then I stay quiet.`, nudges: { CI: -2 },
              note: `You'd lose your job to stop a pension cut for 3,000 retirees, but not your savings and your home. Then you'd stay quiet.`,
              did: `You'd stay quiet about your company's plan to cut 3,000 retirees' pensions once you knew the lawsuit would take your savings and your home.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Same cut, same agreement. Now one of them is family.`,
          q: `One of the 3,000 is your grandmother.`,
          answers: [
            { id: 'D6-FUB2-A', text: `Then I go public.`, nudges: { LP: 2, SD: -2, HT: 1 },
              note: `You'd keep your agreement while the 3,000 retirees were strangers, but not once your grandmother was one of them. Then you'd go public.`,
              did: `You'd go public about your company's plan to cut 3,000 retirees' pensions once you learned your grandmother was one of them.` },
            { id: 'D6-FUB2-B', text: `I still stay quiet.`, nudges: { SD: 2, LP: -2 },
              note: `Even with your grandmother among the 3,000 retirees, you'd stay quiet about the pension cut. Family doesn't change your agreement.`,
              did: `You'd still stay quiet about your company's plan to cut 3,000 retirees' pensions, even with your grandmother among them.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'D6-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // D10 ───────────────────────────────────────────────────────────
    {
      id: 'D10', world: 'city', title: `The Housing List`, scene: 'favor', weight: 'medium',
      steps: {
        trunk: {
          setup: `No one would find out. Everyone on the list needs a home.`,
          q: `You run the waiting list for cheap city apartments. The woman who took you in when you were homeless asks you to move her grandson to the top. Families have waited years. What do you do?`,
          answers: [
            { id: 'D10-A', text: `Move him up. I owe her`, nudges: { LP: 2, SD: -2 },
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
          setup: `You're the only witness. Who struck first decides the case. Refusing means a contempt charge.`,
          q: `Your brother got into a fight outside a bar. The other man was badly hurt. In court, you're asked who threw the first punch. It was your brother. What do you say?`,
          answers: [
            { id: 'D11-A', text: `The whole truth`, nudges: { SD: 2, LP: -2 },
              note: `You'd tell the court your brother threw the first punch. In court, your brother gets no exception.`,
              did: `You'd testify in court that your brother threw the first punch.` },
            { id: 'D11-B', text: `Say I didn't see who started it`, nudges: { LP: 2, SD: -3, OR: 1 },
              note: `You'd tell the court you didn't see who threw the first punch, to protect your brother. You'd lie under oath for him.`,
              did: `You'd tell the court you didn't see who threw the first punch, though it was your brother.` },
            { id: 'D11-C', text: `I refuse to testify and accept the charge`, nudges: { LP: 2, SD: -2, OR: -1 },
              note: `You'd take a contempt charge rather than testify against your brother. You won't lie in court, and you won't turn him in.`,
              did: `You'd refuse to testify about your brother's fight and accept a contempt charge.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Your testimony is the strongest evidence against him.`,
          q: `Your answer will very likely send your brother to prison.`,
          answers: [
            { id: 'D11-FUA-A', text: `I still tell the whole truth.`, nudges: { SD: 2, LP: -2 },
              note: `Even if your answer will likely send your brother to prison, you'd tell the court he threw the first punch.`,
              did: `You'd testify that your brother threw the first punch, even knowing your answer would likely send him to prison.` },
            { id: 'D11-FUA-B', text: `Then I say I didn't see.`, nudges: { LP: 3, SD: -2 },
              note: `You'd tell the court the whole truth, until it would likely send your brother to prison. Then you'd say you didn't see who threw the first punch.`,
              did: `You'd tell the court you didn't see who threw the first punch once you knew the truth would likely send your brother to prison.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `The other man was badly hurt. He can't work anymore.`,
          q: `Without your answer, the court will likely decide the other man started it, and he'll get nothing for his injuries.`,
          answers: [
            { id: 'D11-FUB2-A', text: `Then I tell them it was my brother.`, nudges: { LP: -2, SD: 2, CI: 1 },
              note: `You'd protect your brother in court, but not if the man he hurt, who can't work anymore, would get nothing. Then you'd say who threw the first punch.`,
              did: `You'd testify that your brother threw the first punch once you knew the man he hurt, who can't work anymore, would otherwise get nothing for his injuries.` },
            { id: 'D11-FUB2-B', text: `I still don't say it.`, nudges: { LP: 3, SD: -1, CI: -1 },
              note: `Even if the man your brother hurt can't work and would get nothing, you wouldn't say your brother threw the first punch. Your brother comes first.`,
              did: `You still wouldn't say your brother threw the first punch, even knowing the man he hurt can't work and would get nothing for his injuries.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'D11-A' ? 'fuA' : 'fuB';
        return null;
      },
    },
  ];

  C.questions.push(...questions);

  // City answers that also count as evidence for tendencies the park and the Neighborhood already have.
  const more = {
    'follow-rules': { support: ['Q8-A', 'Q8-FUA-A', 'Q9-B', 'Q9-FUB-B', 'D10-B', 'D11-A', 'D11-FUA-A', 'D11-FUB2-A', 'B30-B', 'B30-FU-B', 'B32-A', 'D6-B', 'D6-FUB2-B'],
      against: ['Q9-A', 'Q9-FUA-A', 'Q9-FUB-A', 'D10-A', 'D11-B', 'D11-C', 'D11-FUA-B', 'B30-A', 'B30-FU-A', 'D6-A', 'D6-FUB2-A'] },
    'break-unjust': { support: ['Q9-A', 'Q9-FUA-A', 'Q9-FUB-A', 'D6-A', 'D6-FUA-A', 'B32-B'], against: ['Q9-B', 'Q9-FUB-B', 'D6-B', 'D6-FUA-B', 'B32-A'] },
    'step-in': { support: ['Q10-A', 'Q10-B', 'Q10-FUA-A', 'Q10-FUB-A', 'Q8-FUB2-A', 'D6-A', 'D6-FUA-A'], against: ['Q10-C', 'Q10-FUA-B', 'Q10-FUB-B', 'D6-FUA-B'] },
    'watch-not-act': { support: ['Q10-C', 'Q10-FUA-B', 'Q10-FUB-B', 'Q8-B', 'Q8-FUB2-B'], against: ['Q10-A', 'Q10-B', 'Q10-FUA-A', 'Q10-FUB-A', 'Q8-FUB2-A'] },
    'hard-truths': { support: ['B03-A', 'B03-FUA-A', 'B03-FUB2-A', 'B04-B', 'B04-FUA-B', 'B04-FUB-A', 'B05-A', 'B05-FU-A', 'D11-A', 'D11-FUA-A', 'B41-FUB-A'],
      against: ['B03-B', 'B03-FUA-B', 'B03-FUB2-B', 'B04-A', 'B04-FUA-A', 'B04-FUB-B', 'B05-FU-B', 'D11-B', 'D11-FUA-B', 'B41-FUB-B'] },
    'soften-truth': { support: ['B03-B', 'B03-FUA-B', 'B03-FUB2-B', 'B05-B'], against: ['B03-A', 'B03-FUA-A', 'B05-A'] },
    'keeps-word': { support: ['D6-B', 'D6-FUB2-B'], against: ['D6-A'] },
    'own-first': { support: ['Q11-FUA2-B', 'Q9-FUA-B', 'D11-B', 'D11-C', 'D11-FUA-B', 'D11-FUB2-B', 'D6-FUB2-A'], against: ['Q11-FUA2-A', 'D11-A', 'D11-FUA-A', 'D11-FUB2-A', 'D6-FUB2-B'] },
    'bend-for-love': { support: ['D11-B', 'D11-C', 'D11-FUA-B', 'D11-FUB2-B', 'Q9-FUB-A', 'D10-A', 'D6-FUB2-A'], against: ['D11-A', 'D11-FUA-A', 'Q9-FUB-B', 'D10-B', 'D6-FUB2-B'] },
    'waits-turn': { support: ['D10-B', 'D5-A', 'D11-A', 'D11-FUA-A', 'D11-FUB2-A', 'Q11-FUA2-A'], against: ['D10-A', 'D5-B', 'D11-B', 'D11-C', 'D11-FUB2-B'] },
    'gives-it-up': { support: ['D6-FUA-A'], against: ['D6-FUA-B'] },
    'count-numbers': { support: ['Q11-A', 'Q11-FUA2-A', 'Q11-FUB-A', 'D6-A'], against: ['Q11-B', 'Q11-FUB-B'] },
    'meant-not-outcome': { support: ['B12-A', 'B12-FU-A', 'Q8-FUA-B'], against: ['B12-B', 'Q8-FUA-A'] },
    'second-chances': { support: ['B33-B', 'B33-FU-B', 'B34-B', 'B34-FUA-B'], against: ['B33-A', 'B34-A', 'B34-FUA-A'] },
    'needs-watching': { support: ['B34-FUB-A'], against: ['B34-FUB-B'] },
    'avoid-conflict': { support: ['D3-B', 'Q8-B'], against: ['D3-A', 'Q8-A'] },
  };
  Object.entries(more).forEach(([id, m]) => { const t = C.tendencies.find(x => x.id === id); if (!t) throw new Error('unknown tendency ' + id); t.support.push(...(m.support || [])); t.against = (t.against || []).concat(m.against || []); });

  C.tendencies.push(
    { id: 'speaks-up-work', text: `You speak up when something's wrong at work.`, share: `I speak up when something's wrong at work.`,
      detail: `When your company or a colleague does something wrong, you say so or report it, even when it costs you.`,
      support: ['B04-B', 'B04-FUA-B', 'B04-FUB-A', 'D3-A', 'D6-A', 'D6-FUA-A', 'D6-FUB2-A', 'Q8-A', 'Q8-FUB2-A'], against: ['B04-A', 'B04-FUA-A', 'B04-FUB-B', 'D3-B', 'D6-B', 'D6-FUA-B', 'D6-FUB2-B', 'Q8-B', 'Q8-FUB2-B'],
      min: 2, priority: 3, protect: ['honesty at work'], trade: ['your standing at work'] },
    { id: 'owns-up', text: `You own up, even when no one would know.`, share: `I own up, even when no one would know.`,
      detail: `When you've gained from your own mistake or from credit that isn't yours, you say so, even if no one would ever find out.`,
      support: ['B05-A', 'B05-FU-A', 'B41-A', 'B41-FUA2-A', 'B41-FUB-A'], against: ['B05-FU-B', 'B41-B', 'B41-FUA2-B', 'B41-FUB-B'],
      min: 2, priority: 2, protect: ['credit where it’s due'], trade: ['looking good'] },
    { id: 'must-pay', text: `You think wrongdoing should always be punished.`, share: `I think people should answer for what they do.`,
      detail: `You think a crime should be punished even when the person is sorry, has changed, or could never do it again.`,
      support: ['B33-A', 'B33-FU-A', 'B34-A', 'B34-FUA-A', 'B34-FUB-A'], against: ['B33-B', 'B33-FU-B', 'B34-B', 'B34-FUA-B', 'B34-FUB-B'],
      min: 2, priority: 4, protect: ['justice for what people did'], trade: ['mercy'] },
    { id: 'repays-help', text: `You stay loyal to people who helped you.`, share: `I stay loyal to people who helped me.`,
      detail: `When someone who helped you asks for a favor or does something wrong, you side with them, even if it isn't fair to others.`,
      support: ['D3-B', 'D5-B', 'D10-A'], against: ['D3-A', 'D5-A', 'D10-B'],
      min: 2, priority: 3, protect: ['people who helped you'], trade: ['fairness to strangers'] },
    { id: 'career-first', text: `You protect your job first.`,
      detail: `When doing the right thing at work could cost you a raise or your job, you keep quiet and keep the job.`,
      support: ['B41-B', 'B41-FUA2-B', 'B04-FUA-A', 'B04-FUB-B', 'B30-FU-A'], against: ['B41-FUA2-A', 'B04-FUA-B', 'B04-FUB-A', 'B30-FU-B', 'D6-A', 'D6-FUA-A'],
      min: 2, priority: 5, protect: ['your job'], trade: ['speaking up at work'] },
  );

  // All ids in `when` must be picked.
  C.tensions.push(
    { when: ['B09-A', 'D11-A'], text: `You'd lie to the police to cover your sibling's hit-and-run, but in court you'd testify that your brother threw the first punch.` },
    { when: ['B09-B', 'D11-B'], text: `You won't lie to the police for your sibling, but in court you'd say you didn't see your brother throw the first punch.` },
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
    { when: ['Q1-FUB-A', 'D11-FUB2-B'], text: `You'd pull the lever on your own child to save 100 strangers, but you'd let a stranger take the blame in court to protect your brother.` },
    { when: ['D6-FUB2-A', 'D10-B'], text: `You'd break your confidentiality agreement once your grandmother's pension was at stake, but you'd refuse to move the grandson of the woman who took you in up a housing list.` },
    { when: ['D11-FUA-A', 'D6-FUB2-A'], text: `You'd testify against your brother even if it sent him to prison, but you'd break your confidentiality agreement to protect your grandmother's pension.` },
  );
})(typeof window !== 'undefined' ? window : globalThis);
