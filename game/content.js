// Tern V1 — assessment content for the Park (the core 12).
// This is the assessment instrument, not UI copy: wording, nudges and follow-up
// triggers affect scoring validity. Question and answer wording is verbatim from
// docs/QUESTIONS.md (Q1, Q6, D8) and docs/QUESTION-BANK.md (B-questions).
// Nudges on B-questions are first-authored here (the bank has none yet).
// Axis ids: OR (O+ / R-), CI (C+ / I-), HT (H+ / T-), LP (L+ / P-), SD (S+ / D-).
var window = typeof window !== 'undefined' ? window : globalThis;

window.TERN_CONTENT = {
  axes: [
    { id: 'OR', pos: 'O', neg: 'R', posLabel: 'Outcomes', negLabel: 'Rules',
      posDetail: `You judge a choice by what it leads to.`,
      negDetail: `Some things you won't do, even for a better result.` },
    { id: 'CI', pos: 'C', neg: 'I', posLabel: 'Collective', negLabel: 'Individual',
      posDetail: `You put what's good for everyone above your own gain.`,
      negDetail: `You look out for yourself and let others run their own lives.` },
    { id: 'HT', pos: 'H', neg: 'T', posLabel: 'Heart', negLabel: 'Thought',
      posDetail: `You decide by how it will feel for the people involved.`,
      negDetail: `You reason it through and keep feelings out of it.` },
    { id: 'LP', pos: 'L', neg: 'P', posLabel: 'Loyalty', negLabel: 'Principle',
      posDetail: `The people close to you count more than strangers.`,
      negDetail: `You hold people close to you to the same standard as anyone.` },
    { id: 'SD', pos: 'S', neg: 'D', posLabel: 'System', negLabel: 'Disruption',
      posDetail: `You work within the rules, even when you don't like the result.`,
      negDetail: `You'll break the rules when you think they're wrong.` },
  ],

  questions: [
    // 1 ─────────────────────────────────────────────────────────────
    {
      id: 'Q1', title: `The Trolley`, scene: 'trolley', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Six strangers. No third option. Three seconds to act.`,
          q: `A runaway trolley is heading toward 5 people. You can pull a lever that diverts it to a side track where 1 person will die. What do you do?`,
          answers: [
            { id: 'Q1-A', text: `Pull the lever`, nudges: { OR: 3 },
              note: `You'd rather cause one death than stand by for five. For you, doing nothing is still a choice.`,
              did: `You'd pull the lever to save five, knowing one will die.` },
            { id: 'Q1-B', text: `Do not pull. I won't directly cause a death.`, nudges: { OR: -3 },
              note: `There's a line you won't cross with your own hands, even when the numbers say you should.`,
              did: `You wouldn't pull the lever, even to save five.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The five are still strangers. Nothing else changes.`,
          q: `What if the 1 person on the side track is your mother?`,
          answers: [
            { id: 'Q1-FUA-A', text: `Pull anyway`, nudges: { OR: 2, LP: -2, HT: -2 },
              note: `You'd give up your own mother to save five strangers. Her life counts the same as anyone's.`,
              did: `You'd pull the lever even if the person on the side track were your mother.` },
            { id: 'Q1-FUA-B', text: `I can't do it. Not her.`, nudges: { HT: 3, LP: 2 },
              note: `You'd trade one stranger to save five, but not your mother.`,
              did: `You wouldn't pull the lever if the person on the side track were your mother.` },
          ],
        },
        fuB: {
          weight: 2,
          setup: `A hundred strangers. Your child alone on the side track.`,
          q: `What if the 1 person on the side track is your child, and pulling now would save 100 strangers?`,
          answers: [
            { id: 'Q1-FUB-A', text: `Pull. 100 lives outweigh one.`, nudges: { OR: 3, LP: -3 },
              note: `You wouldn't give up your mother to save five, but you would give up your child to save 100. Your loyalty to family has a limit.`,
              did: `You'd pull the lever to save 100 strangers, even with your child on the side track.` },
            { id: 'Q1-FUB-B', text: `Do not pull. I won't choose my child's death.`, nudges: { HT: 3, LP: 3 },
              note: `No number of strangers would make you give up your child.`,
              did: `You wouldn't pull the lever with your child on the side track, even to save 100 strangers.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return 'fuA';
        if (step === 'fuA' && picks.trunk === 'Q1-A' && picks.fuA === 'Q1-FUA-B') return 'fuB';
        return null;
      },
    },

    // 2 ─────────────────────────────────────────────────────────────
    {
      id: 'B09', title: `The 2 A.M. Call`, scene: 'call', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Your sibling fled a crash. The cyclist will recover. No leads.`,
          q: `At 2 a.m., your sibling calls: they hit a cyclist and drove off in a panic. The cyclist will recover, and the police have no leads. Your sibling asks you to say they were with you tonight. Do you say they were with you?`,
          answers: [
            { id: 'B09-A', text: `Yes. I cover for them.`, nudges: { LP: 3, SD: -2 },
              note: `You'd lie to the police for family. Your sibling comes before the law.`,
              did: `You'd lie to the police to cover your sibling's hit-and-run.` },
            { id: 'B09-B', text: `No. I won't lie for them.`, nudges: { LP: -2, SD: 2 },
              note: `You love them, but you won't lie to the police for them.`,
              did: `You wouldn't lie to the police about your sibling's hit-and-run.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `A week later. Someone else is paying for it.`,
          q: `A week later, police arrest a different person for it. That person is innocent.`,
          answers: [
            { id: 'B09-FUA-A', text: `I tell the police the truth.`, nudges: { LP: -2, SD: 2, CI: 1 },
              note: `You'll shield your sibling, but not at a stranger's expense. Your loyalty stops where someone innocent pays.`,
              did: `You'd tell the police the truth once an innocent person was arrested for your sibling's crash.` },
            { id: 'B09-FUA-B', text: `I stay quiet.`, nudges: { LP: 3, SD: -2, CI: -1 },
              note: `Even with an innocent person arrested, you protect your sibling. Your loyalty to them has almost no limit.`,
              did: `You'd stay quiet even after an innocent person was arrested for your sibling's crash.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `No one comes asking. Speaking up is up to you.`,
          q: `The police never ask you. Do you tell them what you know?`,
          answers: [
            { id: 'B09-FUB-A', text: `Yes. I report my sibling.`, nudges: { SD: 2, LP: -2 },
              note: `You don't just refuse to lie; you go to the police yourself. For you, what happened matters more than who did it.`,
              did: `You'd report your sibling without being asked.` },
            { id: 'B09-FUB-B', text: `No. I just won't lie for them.`, nudges: { LP: 2, HT: 1 },
              note: `You wouldn't lie for your sibling, but you wouldn't turn them in either.`,
              did: `You wouldn't lie for your sibling or report them.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B09-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // 3 ─────────────────────────────────────────────────────────────
    {
      id: 'B02', title: `The Deathbed Question`, scene: 'deathbed', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Hours left. The business failed last year. He asks directly.`,
          q: `Your grandfather has hours to live. The family business he spent his life building went bankrupt last year. He grips your hand: "Tell me the truth. Is it doing well?" What do you say?`,
          answers: [
            { id: 'B02-A', text: `The truth, as gently as I can.`, nudges: { OR: -2, HT: -2 },
              note: `He asked for the truth, so he gets it, even now. You think people have a right to the truth about their own lives.`,
              did: `You'd tell your dying grandfather his business failed.` },
            { id: 'B02-B', text: `"Yes, it's doing well."`, nudges: { OR: 2, HT: 3 },
              note: `You'd give a dying man peace over facts he can't change.`,
              did: `You'd tell your dying grandfather his failed business is doing well.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `He once asked you never to lie to him.`,
          q: `Years ago he told you, "Whatever happens, never lie to me. Not even at the end." Does that change your answer?`,
          answers: [
            { id: 'B02-FU-A', text: `Yes. I tell him the truth.`, nudges: { OR: -3, HT: -1 },
              note: `You'd bend the truth for his comfort, but not break a promise he asked you to keep.`,
              did: `You'd tell your grandfather the truth because he once asked you never to lie to him.` },
            { id: 'B02-FU-B', text: `No. Right now, his peace matters more than that promise.`, nudges: { OR: 2, HT: 2 },
              note: `You'd break his own wish to spare him pain. You trust what he needs now over what he said then.`,
              did: `You'd still tell your grandfather the business is doing well, though he once asked you never to lie to him.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B02-B') return 'fu';
        return null;
      },
    },

    // 4 ─────────────────────────────────────────────────────────────
    {
      id: 'B13', title: `Two Worlds`, scene: 'worlds', weight: 'light',
      steps: {
        trunk: {
          setup: `You don't know who you'll be. You pick the world.`,
          q: `You'll be born into one of two worlds, as a random person. In World A, everyone has a decent, secure life, but no one is rich. In World B, most people live much better than in World A, but 1 in 10 struggle to afford food and a home. Which world do you choose?`,
          answers: [
            { id: 'B13-A', text: `World A.`, nudges: { CI: 3 },
              note: `You'd give up a better life for most so that no one struggles.`,
              did: `You'd choose the world where everyone is secure and no one is rich.` },
            { id: 'B13-B', text: `World B.`, nudges: { CI: -2, OR: 1 },
              note: `You'll take the better odds for most people, even knowing some will struggle.`,
              did: `You'd choose the richer world where 1 in 10 struggle.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now you know you'll land on top.`,
          q: `Now you know for sure you'll be born into the top half of World B. Do you switch?`,
          answers: [
            { id: 'B13-FU-A', text: `Yes, B.`, nudges: { CI: -3 },
              note: `You picked World A so you wouldn't end up at the bottom. Once you're safe, you'd take the richer world.`,
              did: `You'd switch to the richer world once you knew you'd be in its top half.` },
            { id: 'B13-FU-B', text: `No, still A.`, nudges: { CI: 2, HT: 1 },
              note: `Even knowing you'd be fine, you'd rather live where no one is left out.`,
              did: `You'd stay in the equal world, even knowing you'd be in the richer one's top half.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B13-A') return 'fu';
        return null;
      },
    },

    // 5 ─────────────────────────────────────────────────────────────
    {
      id: 'B18', title: `The Pond and the Faraway Child`, scene: 'pond', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Same $800, same child's life. One is here, one far away.`,
          q: `A small child is drowning in a pond in front of you. Saving them will ruin your $800 phone. Meanwhile, $800 given to a proven charity would very likely save a child's life far away. Is walking past the drowning child worse than not giving $800 to charity?`,
          answers: [
            { id: 'B18-A', text: `Yes. Being right there makes it mine.`, nudges: { LP: 2, HT: 2 },
              note: `The child in front of you matters more than one you can't see. Being there makes it your job.`,
              did: `You think walking past a drowning child is worse than not giving to save one far away.` },
            { id: 'B18-B', text: `No. A child is a child.`, nudges: { LP: -2, HT: -2, OR: 1 },
              note: `You don't let distance decide who counts. A life far away weighs the same to you.`,
              did: `You think not giving to save a faraway child is as bad as walking past a drowning one.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Be honest about how you actually live.`,
          q: `Most people don't act as if a faraway child counts the same. Do you?`,
          answers: [
            { id: 'B18-FU-A', text: `Mostly, yes.`, nudges: { CI: 2, LP: -1 },
              note: `You say distance doesn't matter, and you give money like you mean it.`,
              did: `You say you give as if faraway children count the same.` },
            { id: 'B18-FU-B', text: `Not really, and it bothers me.`, nudges: { CI: 1, HT: 1 },
              note: `You believe it, but you don't fully live by it, and that bothers you.`,
              did: `You say you don't live as if faraway children count the same, and it bothers you.` },
            { id: 'B18-FU-C', text: `Not really, and I'm at peace with that.`, nudges: { CI: -2 },
              note: `You believe every child counts the same, and you've made peace with not acting on it.`,
              did: `You say you don't live as if faraway children count the same, and you're at peace with it.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B18-B') return 'fu';
        return null;
      },
    },

    // 6 ─────────────────────────────────────────────────────────────
    {
      id: 'B29', title: `The Jury`, scene: 'jury', weight: 'medium',
      steps: {
        trunk: {
          setup: `The law is clear. The evidence is clear. Five years.`,
          q: `You're on a jury. The law is clear and so is the evidence: the defendant is guilty. They stole baby formula for their infant and now face five years in prison. How do you vote?`,
          answers: [
            { id: 'B29-A', text: `Guilty. My job is the law, not the sentence.`, nudges: { SD: 3, HT: -2 },
              note: `You do the job you were given, even when the outcome feels wrong. The sentence isn't yours to fix.`,
              did: `You'd vote guilty for a parent who stole baby formula.` },
            { id: 'B29-B', text: `Not guilty. I won't send them to prison for this.`, nudges: { SD: -2, HT: 2 },
              note: `You'd set the law aside rather than let it crush someone for feeding their baby.`,
              did: `You'd vote not guilty for a parent who stole baby formula, though the law says guilty.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Same case. Now a baby's future rides on it.`,
          q: `If convicted, their baby goes into foster care.`,
          answers: [
            { id: 'B29-FUA-A', text: `Still guilty.`, nudges: { SD: 2, HT: -2 },
              note: `Even with a baby's home at stake, you vote by the law. Higher stakes don't change your vote.`,
              did: `You'd still vote guilty on the baby formula theft, even with their baby going into foster care.` },
            { id: 'B29-FUA-B', text: `Then not guilty.`, nudges: { HT: 3, SD: -2 },
              note: `You'll follow the law until a child pays for it. Then the child wins.`,
              did: `You'd switch to not guilty on the baby formula theft to keep their baby out of foster care.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Same law, same evidence. A less sympathetic reason.`,
          q: `Same law, same evidence, but they stole to pay off a gambling debt.`,
          answers: [
            { id: 'B29-FUB-A', text: `Guilty.`, nudges: { HT: 2, SD: 1 },
              note: `You let them off because of the baby. Without that reason, you'd convict.`,
              did: `You'd vote guilty if the theft paid off a gambling debt.` },
            { id: 'B29-FUB-B', text: `Not guilty. The law is still too harsh.`, nudges: { SD: -3, HT: -1 },
              note: `Your problem is the law itself, whoever breaks it. You'd vote the same for someone you don't feel sorry for.`,
              did: `You'd still vote not guilty if the theft paid off a gambling debt.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B29-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // 7 ─────────────────────────────────────────────────────────────
    {
      id: 'B37', title: `The Bank Card`, scene: 'bankcard', weight: 'medium',
      steps: {
        trunk: {
          setup: `They asked you to hold it. Now, sober, they want it back.`,
          q: `A friend trying to quit gambling asked you to hold their bank card and never give it back, no matter what they say. Tonight they're calm and sober and ask for it back. They say they've changed their mind, and if you don't hand it over, the friendship is over. Do you give it back?`,
          answers: [
            { id: 'B37-A', text: `Yes. It's their money and their life.`, nudges: { CI: -2, OR: 1 },
              note: `You let your friend decide for themselves tonight, even though they asked you not to.`,
              did: `You'd give your friend back the bank card they asked you to keep from them.` },
            { id: 'B37-B', text: `No. I keep the promise they asked me to keep.`, nudges: { OR: -2, CI: 1 },
              note: `You'd risk the friendship to keep the promise they asked for when they wanted help.`,
              did: `You'd keep your friend's bank card as promised, even if it ends the friendship.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // 8 ─────────────────────────────────────────────────────────────
    {
      id: 'D8', title: `The Waiting List`, scene: 'waitlist', weight: 'medium',
      steps: {
        trunk: {
          setup: `It's legal and no one would find out. He's in pain every day, but his life isn't at risk.`,
          q: `Your father needs hip surgery. The waiting list is eight months, and he's in pain every day. A friend on the hospital board can move him up this week, ahead of people who've waited longer. It breaks no rules. Do you make the call?`,
          answers: [
            { id: 'D8-A', text: `Make the call`, nudges: { CI: -2, SD: -1, LP: 1 },
              note: `You'd use a connection to spare your father pain, even if it means others wait longer.`,
              did: `You'd use a connection to get your father's surgery ahead of people who waited longer.` },
            { id: 'D8-B', text: `Don't. He waits his turn.`, nudges: { SD: 2, CI: 2 },
              note: `You'd let your own father hurt before you'd step ahead of people who've waited longer.`,
              did: `You'd let your father wait his turn for surgery, though he's in pain.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // 9 ─────────────────────────────────────────────────────────────
    {
      id: 'B40', title: `The Dinner Joke`, scene: 'dinner', weight: 'medium',
      steps: {
        trunk: {
          setup: `Your own family. No one from that group is there.`,
          q: `At a family dinner, a relative makes a cruel joke about a group of people. No one from that group is there. Most of the table laughs. Honestly, what do you usually do?`,
          answers: [
            { id: 'B40-A', text: `Say something right then.`, nudges: { SD: -2, LP: -2 },
              note: `You'll break the mood at your own family's table. Saying it's wrong matters more to you than keeping the peace.`,
              did: `You'd speak up when a relative makes a cruel joke at dinner.` },
            { id: 'B40-B', text: `Stay quiet.`, nudges: { LP: 1, SD: 1 },
              note: `You don't join in, but you don't make it a fight either.`,
              did: `You'd stay quiet when a relative makes a cruel joke at dinner.` },
            { id: 'B40-C', text: `Smile along to keep the peace.`, nudges: { LP: 2, SD: 2 },
              note: `You'll go along with the room to keep the family evening pleasant.`,
              did: `You'd smile along when a relative makes a cruel joke at dinner.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now it's about someone you love.`,
          q: `Your close friend belongs to that group.`,
          answers: [
            { id: 'B40-FU-A', text: `Then I'd say something.`, nudges: { LP: 2, HT: 2 },
              note: `You'll speak up when it's someone you love. It has to be personal before you'll make a scene.`,
              did: `You'd speak up if a close friend were in the group being mocked.` },
            { id: 'B40-FU-B', text: `I'd still let it go.`, nudges: { SD: 2, LP: 1 },
              note: `Even for a close friend, you'd keep the table calm. Open conflict with family costs you a lot.`,
              did: `You'd still let it go if a close friend were in the group being mocked.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && (picks.trunk === 'B40-B' || picks.trunk === 'B40-C')) return 'fu';
        return null;
      },
    },

    // 10 ────────────────────────────────────────────────────────────
    {
      id: 'Q6', title: `The Promotion`, scene: 'promotion', weight: 'medium',
      steps: {
        trunk: {
          setup: `Equally qualified. One role. No splitting it.`,
          q: `You and a colleague are finalists for one promotion, and performance is essentially equal. Your colleague is under heavy financial pressure. What do you do?`,
          answers: [
            { id: 'Q6-A', text: `Compete fully. Let merit decide.`, nudges: { CI: -1, OR: 1, HT: -1 },
              note: `You'd feel for them, but you won't step aside. You'd let the better candidate win.`,
              did: `You'd compete for the promotion against a colleague who needs the money.` },
            { id: 'Q6-B', text: `Withdraw. Let them have it.`, nudges: { HT: 3, CI: 2 },
              note: `You'd give up your own step forward because they need it more.`,
              did: `You'd step aside so a colleague who needs the money gets the promotion.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The risk to them is real. You're secure either way.`,
          q: `You learn they may lose their home without the raise. You'd be fine either way.`,
          answers: [
            { id: 'Q6-FUA-A', text: `Still compete fully. The best candidate should win.`, nudges: { CI: -2, OR: 1, HT: -1 },
              note: `Even with their home at stake, you won't let need decide who earns the job.`,
              did: `You'd still compete for the promotion knowing your colleague might lose their home.` },
            { id: 'Q6-FUA-B', text: `Withdraw. That changes it.`, nudges: { HT: 3, CI: 3 },
              note: `You'll compete until someone could really get hurt. Then you step back.`,
              did: `You'd step aside from the promotion once you knew your colleague might lose their home.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Their need is unchanged. You know for sure they took credit.`,
          q: `You learn that last year, this colleague quietly took credit for your work.`,
          answers: [
            { id: 'Q6-FUB-A', text: `I still withdraw. Their need is still real.`, nudges: { HT: 2, CI: 1 },
              note: `What they did to you doesn't cancel what they need. You're kind to people even when they haven't earned it.`,
              did: `You'd still step aside after learning your colleague took credit for your work.` },
            { id: 'Q6-FUB-B', text: `Then I compete fully`, nudges: { OR: 1, HT: -1, LP: 1 },
              note: `Your generosity has a condition: people have to have played fair with you.`,
              did: `You'd compete once you learned your colleague took credit for your work.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'Q6-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // 11 ────────────────────────────────────────────────────────────
    {
      id: 'B21', title: `The Million-Dollar Button`, scene: 'button', weight: 'light',
      steps: {
        trunk: {
          setup: `A stranger you'll never meet. It hurts, but not badly.`,
          q: `If you press a button, you get $1 million. Somewhere, a stranger you'll never meet loses $1,000. It hurts them, but not badly. Do you press it?`,
          answers: [
            { id: 'B21-A', text: `Yes.`, nudges: { CI: -3, OR: 1 },
              note: `A big gain for you outweighs a small hurt to someone you'll never see.`,
              did: `You'd take $1 million, knowing a stranger loses $1,000.` },
            { id: 'B21-B', text: `No.`, nudges: { CI: 2, OR: -1 },
              note: `You won't take money from someone who didn't agree to it, even a little, even for a million.`,
              did: `You'd turn down $1 million that costs a stranger $1,000.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Same button. Now the harm is spread wide.`,
          q: `It's actually a thousand strangers, each losing $1,000.`,
          answers: [
            { id: 'B21-FUA-A', text: `Still yes.`, nudges: { CI: -3 },
              note: `Even a thousand strangers losing money doesn't stop you. Your own gain comes first.`,
              did: `You'd still take the $1 million if a thousand strangers each lost $1,000.` },
            { id: 'B21-FUA-B', text: `Then no.`, nudges: { CI: 2, OR: 2 },
              note: `You were weighing the harm all along. One stranger's loss was worth it to you. A thousand aren't.`,
              did: `You'd turn down the $1 million if a thousand strangers each lost $1,000.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Same button. Now the loss wouldn't even be felt.`,
          q: `The stranger is a billionaire who would never notice.`,
          answers: [
            { id: 'B21-FUB-A', text: `Then yes.`, nudges: { OR: 2, CI: -1 },
              note: `Your no was about the harm, not the taking. If no one really gets hurt, you'd press it.`,
              did: `You'd take the $1 million if it came from a billionaire who'd never notice.` },
            { id: 'B21-FUB-B', text: `Still no.`, nudges: { OR: -2, CI: 1 },
              note: `How much it hurts doesn't matter to you. Taking what isn't yours is wrong.`,
              did: `You'd still turn down the $1 million if it came from a billionaire who'd never notice.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B21-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // 12 ────────────────────────────────────────────────────────────
    {
      id: 'B01', title: `The Invisible Year`, scene: 'invisible', weight: 'light',
      steps: {
        trunk: {
          setup: `One year. No cameras, no witnesses, no consequences.`,
          q: `For one year, nothing you do can ever be traced back to you. No cameras, no witnesses, no consequences. Honestly, would you live any differently?`,
          answers: [
            { id: 'B01-A', text: `No. I'd live the same.`, nudges: { OR: -2, SD: 1 },
              note: `You say you'd act the same whether or not anyone's watching.`,
              did: `You say you'd live the same if nothing could be traced back to you.` },
            { id: 'B01-B', text: `Yes. I'd do things I'm not proud of.`, nudges: { OR: 1, CI: -2 },
              note: `You admit that being watched keeps you in line, which most people won't say out loud.`,
              did: `You say you'd do things you're not proud of if nothing could be traced back to you.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now everyone gets the same unseen year.`,
          q: `Now everyone gets the same year. By the end, is the world better or worse?`,
          answers: [
            { id: 'B01-FU-A', text: `Better. Most people are decent when no one's watching.`, nudges: { SD: -1, HT: 1, CI: 1 },
              note: `You trust people to be good on their own. You don't think rules are the only thing keeping them in line.`,
              did: `You think the world would be better if everyone got a year where nothing could be traced to them.` },
            { id: 'B01-FU-B', text: `Worse. Most people are decent because someone is watching.`, nudges: { SD: 2, HT: -1 },
              note: `You think most people behave because someone might see. That's why rules matter to you.`,
              did: `You think the world would be worse if everyone got a year where nothing could be traced to them.` },
          ],
        },
      },
      next: function (step) {
        if (step === 'trunk') return 'fu';
        return null;
      },
    },
  ],

  // Tendency library. A tendency shows when (picked supports − picked against) >= min.
  // Headline = strongest-supported, ties broken by priority (lower = preferred).
  // `share` is the line a player may send to a friend: first person, something they'd be glad to say about themselves.
  // A tendency with no `share` is never sent (own-gain, needs-watching): it can read badly out of context.
  tendencies: [
    { id: 'keeps-word', text: `You keep your word.`, share: `I keep my word.`,
      detail: `A promise still counts when breaking it would be easier or kinder.`,
      support: ['B37-B', 'B02-FU-A', 'B01-A', 'Q6-FUB-A', 'B21-FUB-B'], against: ['B37-A', 'B02-FU-B'],
      min: 2, priority: 1, protect: ['promises'], trade: ['your own comfort'] },
    { id: 'bend-for-love', text: `You'd break rules for people you love.`, share: `I'd break rules for the people I love.`,
      detail: `If a rule stops you protecting someone you love, you break it.`,
      support: ['B09-A', 'B09-FUA-B', 'D8-A', 'Q1-FUA-B', 'Q1-FUB-B'], against: ['B09-B', 'D8-B'],
      min: 2, priority: 2, protect: ['family'], trade: ['rules'] },
    { id: 'own-first', text: `Your family comes before strangers.`, share: `My family comes first.`,
      detail: `When family and strangers both need something, family gets it.`,
      support: ['Q1-FUA-B', 'Q1-FUB-B', 'B09-A', 'B09-FUA-B', 'D8-A', 'B18-A'], against: ['Q1-FUA-A', 'D8-B', 'B09-FUA-A'],
      min: 2, priority: 4, protect: ['family and friends'], trade: ['fairness to strangers'] },
    { id: 'waits-turn', text: `You treat family and strangers the same.`, share: `I play fair, even with family.`,
      detail: `You won't use connections to move your own people ahead.`,
      support: ['D8-B', 'B09-B', 'B09-FUA-A', 'Q1-FUA-A', 'Q1-FUB-A', 'B13-A'], against: ['D8-A', 'B09-FUA-B'],
      min: 2, priority: 3, protect: ['fairness'], trade: ['your family’s comfort'] },
    { id: 'hard-truths', text: `You tell the truth, even when it hurts.`, share: `I tell the truth, even when it hurts.`,
      detail: `You think people are better off knowing.`,
      support: ['B02-A', 'B02-FU-A', 'B40-A', 'B09-B', 'B09-FUA-A'], against: ['B02-B', 'B40-C'],
      min: 2, priority: 2, protect: ['the truth'], trade: ['keeping things pleasant'] },
    { id: 'soften-truth', text: `You soften the truth to spare feelings.`, share: `I'm gentle with hard truths.`,
      detail: `When the truth would hurt and change nothing, you soften it or leave it out.`,
      support: ['B02-B', 'B02-FU-B', 'B40-C', 'B09-A'], against: ['B02-A', 'B40-A'],
      min: 2, priority: 5, protect: ['people’s feelings'], trade: ['the full truth'] },
    { id: 'avoid-conflict', text: `You avoid open conflict.`, share: `I keep the peace.`,
      detail: `When speaking up would start an argument, you usually hold back.`,
      support: ['B40-B', 'B40-C', 'B40-FU-B', 'B37-A', 'B09-FUB-B'], against: ['B40-A', 'B40-FU-A'],
      min: 2, priority: 3, protect: ['keeping the peace'], trade: ['saying what you think'] },
    { id: 'step-in', text: `You step in when someone's being hurt.`, share: `I step in when someone's being hurt.`,
      detail: `You act, even when it's risky or awkward.`,
      support: ['B40-A', 'B40-FU-A', 'Q1-A', 'B09-FUA-A', 'B09-FUB-A', 'B18-FU-A'], against: ['B40-FU-B', 'Q1-B'],
      min: 2, priority: 3, protect: ['people getting hurt'], trade: ['staying out of trouble'] },
    { id: 'watch-not-act', text: `You stay out of it.`, share: `I won't be the one who causes harm.`,
      detail: `You'd rather let something bad happen than be the one who causes it.`,
      support: ['Q1-B', 'B40-B', 'B40-FU-B', 'B09-FUB-B', 'B18-FU-C'], against: ['B40-A', 'Q1-A', 'B18-FU-A'],
      min: 2, priority: 6, protect: ['staying out of it'], trade: ['the chance to change what happens'] },
    { id: 'distance', text: `Faraway strangers count as much as anyone.`, share: `Strangers far away matter to me as much as anyone.`,
      detail: `Whether you can see someone doesn't change how much they count.`,
      support: ['B18-B', 'B18-FU-A', 'B13-FU-B', 'B21-B', 'B21-FUA-B', 'B09-FUA-A'], against: ['B18-A', 'B21-FUA-A'],
      min: 2, priority: 3, protect: ['strangers far away'], trade: ['the people right in front of you'] },
    { id: 'follow-rules', text: `You follow the rules, even when no one's watching.`, share: `I follow the rules, even when no one's watching.`,
      detail: `You keep to rules and laws even when breaking them would go unnoticed.`,
      support: ['B29-A', 'B29-FUA-A', 'D8-B', 'B01-A', 'B09-FUB-A', 'B21-FUB-B'], against: ['B29-B', 'B09-A'],
      min: 2, priority: 3, protect: ['rules'], trade: ['exceptions for sympathy'] },
    { id: 'break-unjust', text: `You'll break a rule that hurts people.`, share: `I'll break a rule that hurts people.`,
      detail: `When a rule hurts someone unfairly, you set it aside.`,
      support: ['B29-B', 'B29-FUA-B', 'B29-FUB-B', 'B40-A', 'B09-A'], against: ['B29-A', 'B29-FUA-A'],
      min: 2, priority: 3, protect: ['people the rules would hurt'], trade: ['following the law to the letter'] },
    { id: 'count-numbers', text: `You aim for the greater good.`, share: `I aim for the greater good.`,
      detail: `You pick what helps the most people or does the least harm, even when it's hard.`,
      support: ['Q1-A', 'Q1-FUA-A', 'Q1-FUB-A', 'B18-B', 'B21-FUA-B', 'B21-FUB-A', 'B13-B'], against: ['Q1-B', 'Q1-FUB-B'],
      min: 2, priority: 3, protect: ['the greatest number of people'], trade: ['your gut feelings'] },
    { id: 'meant-not-outcome', text: `You judge people by their reasons.`, share: `I try to understand why people do what they do.`,
      detail: `The same act looks different to you depending on why someone did it.`,
      support: ['B29-B', 'B29-FUA-B', 'B29-FUB-A', 'Q6-FUB-B', 'B01-FU-A'], against: ['B29-FUB-B'],
      min: 2, priority: 4, protect: ['the reasons behind what people do'], trade: ['treating every case the same'] },
    { id: 'gives-it-up', text: `You give things up for people who need them more.`, share: `I give things up for people who need them more.`,
      detail: `When someone needs something more than you do, you'll give up your chance at it.`,
      support: ['Q6-B', 'Q6-FUA-B', 'Q6-FUB-A', 'B21-B', 'B18-FU-A', 'B13-FU-B'], against: ['Q6-FUA-A', 'B21-FUA-A'],
      min: 2, priority: 2, protect: ['people who need it more'], trade: ['getting ahead'] },
    { id: 'floor-for-all', text: `You'd take less so no one gets left behind.`, share: `I'd take less so no one gets left behind.`,
      detail: `Everyone having enough matters more to you than most people having more.`,
      support: ['B13-A', 'B13-FU-B', 'B21-B', 'B21-FUA-B', 'D8-B'], against: ['B13-B', 'B13-FU-A'],
      min: 2, priority: 4, protect: ['enough for everyone'], trade: ['a bigger share for yourself'] },
    { id: 'own-gain', text: `You'll take a gain that costs strangers.`,
      detail: `When a choice helps you and the cost falls on people you don't know, you take it.`,
      support: ['B21-A', 'B21-FUA-A', 'B13-B', 'B13-FU-A', 'Q6-A', 'Q6-FUA-A', 'B18-FU-C'], against: ['B21-B', 'Q6-B'],
      min: 2, priority: 5, protect: ['your own interests'], trade: ['strangers’ interests'] },
    { id: 'harder-on-self', text: `You're harder on yourself than on others.`, share: `I give others the benefit of the doubt.`,
      detail: `You're quick to see your own faults and slow to judge others for theirs.`,
      support: ['B18-FU-B', 'B01-B', 'B01-FU-A', 'Q6-FUB-A'], against: ['B01-FU-B'],
      min: 2, priority: 5, protect: ['the benefit of the doubt for others'], trade: ['going easy on yourself'] },
    { id: 'second-chances', text: `You give second chances.`, share: `I give second chances.`,
      detail: `You think people can change, so you'll trust them again after they let you down.`,
      support: ['B37-A', 'Q6-FUB-A', 'B29-B', 'B01-FU-A', 'B29-FUA-B'], against: ['Q6-FUB-B', 'B01-FU-B'],
      min: 2, priority: 4, protect: ['people’s chance to change'], trade: ['playing it safe'] },
    { id: 'needs-watching', text: `You think rules keep people honest.`,
      detail: `You think most people behave because they might get caught.`,
      support: ['B01-FU-B', 'B01-B', 'B37-B', 'B29-A'], against: ['B01-FU-A', 'B37-A'],
      min: 2, priority: 5, protect: ['rules that keep people honest'], trade: ['taking people at their word'] },
    { id: 'comfort-at-end', text: `You put feelings before facts.`, share: `I put kindness before cold facts.`,
      detail: `When the facts would hurt and can't be changed, you choose comfort.`,
      support: ['B02-B', 'B02-FU-B', 'Q6-B', 'Q1-FUA-B', 'B29-FUA-B'], against: ['B02-A', 'B02-FU-A'],
      min: 2, priority: 5, protect: ['people’s peace of mind'], trade: ['the full facts'] },
  ],

  // All ids in `when` must be picked.
  tensions: [
    { when: ['Q1-A', 'Q1-FUA-B'], text: `You'd sacrifice one stranger to save five, but not someone you love. Family is the exception.` },
    { when: ['Q1-A', 'D8-A'], text: `You'd pull the lever to save more lives, but you'd move your father ahead of people who waited longer. The numbers matter until it's your family.` },
    { when: ['B09-B', 'B02-B'], text: `You won't lie to the police for your sibling, but you'd lie to your dying grandfather. Whether you'd lie depends on who it's for.` },
    { when: ['B29-A', 'B09-A'], text: `On a jury, the law is your job. When your sibling calls at 2 a.m., it isn't.` },
    { when: ['B37-B', 'B02-FU-B'], text: `You held your friend to what they asked for back then, but you'd break your grandfather's old request to give him peace.` },
    { when: ['B02-A', 'B40-B'], text: `You'd tell a dying man the hard truth, but you stay quiet at the dinner table.` },
    { when: ['B02-A', 'B40-C'], text: `You'd tell a dying man the hard truth, but you smile along at the dinner table.` },
    { when: ['B18-B', 'B21-A'], text: `A faraway child counts as much as one in front of you, but a faraway stranger's $1,000 doesn't stop you from pressing the button.` },
    { when: ['Q6-B', 'B21-A'], text: `You'd give up a promotion for a colleague who needs it, but you'd take a stranger's $1,000 for yourself. You're generous to people you can see.` },
    { when: ['B13-A', 'B21-A'], text: `You'd pick a world where no one falls through, but you'd press a button that costs a stranger $1,000.` },
    { when: ['B01-A', 'B21-A'], text: `You say you'd live the same with no one watching, and you'd press the button no one will ever trace.` },
    { when: ['B40-A', 'B09-A'], text: `You'll call out your family at dinner, but you'd cover for your sibling with the police.` },
    { when: ['B01-FU-A', 'B37-B'], text: `You trust most people to be good unwatched, but you won't trust your friend with their own bank card.` },
    { when: ['B29-B', 'D8-B'], text: `You'd set the law aside for a stranger in court, but make your own father wait his turn.` },
    { when: ['B18-A', 'D8-B'], text: `Being right there makes a child yours to save, but you'd leave your own father on the waiting list.` },
  ],

  // Worlds, in the order they open. The first is the shared core; each later world has its own small unlock ladder,
  // counted in answers from that world, which builds its chapter in the portrait (docs/PLAN-progression.md §3, §5).
  worlds: [
    { id: 'park', name: `The Park` },
    { id: 'hood', name: `The Neighborhood`, chapter: `With the people closest to you`, closeTo: `with the people closest to you`,
      opens: 'all',
      ladder: [
        { at: 3, key: 'shift', name: `How you change close to home` },
        { at: 6, key: 'tend', name: `What you do close to home` },
        { at: 10, key: 'chapter', name: `Your Neighborhood chapter` },
      ] },
    { id: 'city', name: `The City`, chapter: `At work and under the law`, closeTo: `at work and under the law`,
      opens: 'most',
      ladder: [
        { at: 4, key: 'shift', name: `How you change at work and under the law` },
        { at: 8, key: 'tend', name: `What you do at work and under the law` },
        { at: 13, key: 'chapter', name: `Your City chapter` },
      ] },
    { id: 'coast', name: `The Coast`, chapter: `For strangers and people not yet born`, closeTo: `when strangers are counting on you`,
      opens: 'most',
      ladder: [
        { at: 3, key: 'shift', name: `How you change when strangers count on you` },
        { at: 6, key: 'tend', name: `What you do when strangers count on you` },
        { at: 8, key: 'chapter', name: `Your Coast chapter` },
      ] },
    { id: 'observatory', name: `The Observatory`, chapter: `Who you are underneath`, closeTo: `when the question is about you`,
      opens: 'most', last: true,
      ladder: [
        { at: 4, key: 'shift', name: `How you change when the question is about you` },
        { at: 8, key: 'tend', name: `What you do when the question is about you` },
        { at: 12, key: 'chapter', name: `Your Observatory chapter` },
      ] },
  ],

  // What a player sends a friend (index.html → share). The friend has seen none of the questions, so say what Tern is.
  shareCopy: {
    intro: `I just played Tern, a game of 12 hard choices about right and wrong. Here's what my choices say about me:`,
    introBare: `I just played Tern, a game of 12 hard choices about right and wrong.`,
    introSoFar: `I'm playing Tern, a game of 12 hard choices about right and wrong. So far, my choices say:`,
    introSoFarBare: `I'm playing Tern, a game of 12 hard choices about right and wrong.`,
    code: `My code is {code}. Play and tell me yours:`,
    invite: `Try it:`,
    cardKicker: `What my choices say about me`,
    cardKickerSoFar: `So far, my choices say`,
    cardTagline: `12 hard choices about right and wrong`,
  },

  codeLine: `Five letters, one for each way you lean: outcomes or rules, the group or yourself, heart or head, your people or your principles, working within the system or pushing against it.`,
};

if (typeof module !== 'undefined') module.exports = window.TERN_CONTENT;
