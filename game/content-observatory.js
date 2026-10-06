// Tern: the Observatory (world 5): 18 questions about the self: reality, memory, meaning and the future. Instrument data; see content.js header.
// Wording is verbatim from docs/QUESTION-BANK.md: the bank's "Scene" and its bold question are joined into one prompt, as in
// the other worlds, and dashes became periods or commas. B50 to B52 are the bank's "quick reads": one move, no scene, several
// options. Nudges, setups, notes, did lines, tendencies and tensions are first-authored here and wait for Ken's sign-off;
// open questions are in game/observatory-proposals.md. The skeptic judge's fixes (2026-10-04, listed in that file) changed some
// wording and added follow-ups, so B06, B08, B11, B17, B26, B27, B47, B51 and B52 no longer match the bank word for word.
// Axis ids: OR (O+ / R-), CI (C+ / I-), HT (H+ / T-), LP (L+ / P-), SD (S+ / D-).
(function (root) {
  const C = root.TERN_CONTENT;

  const questions = [
    // B47 ───────────────────────────────────────────────────────────
    {
      id: 'B47', world: 'observatory', title: `The Perfect Life Machine`, scene: 'lifemachine', weight: 'medium',
      steps: {
        trunk: {
          setup: `It would feel completely real. You'd never know.`,
          q: `A machine can give you a life of deep happiness and meaning. It would feel completely real, and once inside, you'd never know it wasn't. The people who rely on you would be looked after. Do you plug in for the rest of your life?`,
          answers: [
            { id: 'B47-A', text: `Yes.`, nudges: { OR: 2, HT: 1 },
              note: `You'd plug into a machine that gives you a happy, meaningful life you'd never know was fake. How your life feels is what counts to you.`,
              did: `You'd plug into a machine for life that gives you a happy, meaningful life you'd never know wasn't real.` },
            { id: 'B47-B', text: `No.`, nudges: { OR: -2, HT: -1 },
              note: `You'd turn down a machine-made life of deep happiness and meaning. A real life matters more to you than how it feels.`,
              did: `You'd turn down a lifetime in a machine that gives you a happy, meaningful life you'd never know wasn't real.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The person you love most won't go in.`,
          q: `The person you love most refuses to plug in. Inside, you'd never see the real them again.`,
          answers: [
            { id: 'B47-FUA-A', text: `I still plug in.`, nudges: { OR: 2, LP: -1 },
              note: `Even with the person you love most refusing to go in, you'd plug into the machine for a happy life, knowing you'd never see the real them again.`,
              did: `You'd plug into a machine for a happy life, even though the person you love most refused and you'd never see them again.` },
            { id: 'B47-FUA-B', text: `Then I stay out.`, nudges: { LP: 2, OR: -1 },
              note: `You'd plug into a machine for a happy life, but not once the person you love most refused to go in. You'd stay out rather than never see the real them again.`,
              did: `You'd stay out of a machine that gives you a happy life once the person you love most refused to go in.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Same machine. Now you're already inside.`,
          q: `Now suppose you learn you're already in one. Unplugging means a harder, real life.`,
          answers: [
            { id: 'B47-FUB-A', text: `I unplug.`, nudges: { OR: -2, HT: -1 },
              note: `You'd leave a happy machine-made life for a harder real one. Knowing what's real matters more to you than comfort.`,
              did: `You'd unplug from a happy machine-made life to live a harder, real one.` },
            { id: 'B47-FUB-B', text: `I stay.`, nudges: { OR: 2, HT: 1 },
              note: `If you learned your happy life was made by a machine, you'd stay in it. A harder real life isn't worth the trade to you.`,
              did: `You'd stay in a happy machine-made life rather than unplug to a harder, real one.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B47-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B48 ───────────────────────────────────────────────────────────
    {
      id: 'B48', world: 'observatory', title: `The Erased Memory`, scene: 'memory', weight: 'medium',
      steps: {
        trunk: {
          setup: `Only that one memory goes. Nothing else changes.`,
          q: `You could erase the memory of the most painful thing that has ever happened to you. Nothing else changes. Would you?`,
          answers: [
            { id: 'B48-A', text: `Yes.`, nudges: { OR: 1, HT: 1 },
              note: `You'd erase the memory of the most painful thing that has happened to you. You see no reason to keep carrying it.`,
              did: `You'd erase the memory of the most painful thing that has ever happened to you.` },
            { id: 'B48-B', text: `No.`, nudges: { OR: -1, HT: -1 },
              note: `You'd keep the memory of the most painful thing that has happened to you. Even your worst pain is part of who you are.`,
              did: `You wouldn't erase the memory of the most painful thing that has ever happened to you.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now it's their memory, and it's yours too.`,
          q: `Someone you love wants to erase their worst memory. It's one you share.`,
          answers: [
            { id: 'B48-FU-A', text: `I'd support it.`, nudges: { CI: -2, HT: 1 },
              note: `You'd support someone you love erasing their worst memory, even one you share. Their pain is theirs to let go of.`,
              did: `You'd support someone you love erasing their worst memory, though it's a memory you share.` },
            { id: 'B48-FU-B', text: `I'd ask them not to.`, nudges: { CI: 2, OR: -1 },
              note: `You'd ask someone you love not to erase their worst memory when it's one you share. A shared memory belongs to both of you.`,
              did: `You'd ask someone you love not to erase their worst memory, because it's a memory you share.` },
          ],
        },
      },
      next: function (step) {
        if (step === 'trunk') return 'fu';
        return null;
      },
    },

    // B49 ───────────────────────────────────────────────────────────
    {
      id: 'B49', world: 'observatory', title: `Two Lives`, scene: 'twolives', weight: 'medium',
      steps: {
        trunk: {
          setup: `Both lives are yours. Only one leaves anything behind.`,
          q: `You can choose one of two lives. In one, you're happy and ordinary. In the other, you often struggle and are unhappy, but you create something that helps people long after you're gone. Which life do you choose?`,
          answers: [
            { id: 'B49-A', text: `The happy life.`, nudges: { CI: -2 },
              note: `You'd choose a happy, ordinary life over an unhappy one that helps people long after you're gone. Your own happiness is reason enough.`,
              did: `You'd choose a happy, ordinary life over a hard one that leaves something that helps people after you're gone.` },
            { id: 'B49-B', text: `The life that leaves something behind.`, nudges: { CI: 2, OR: 1 },
              note: `You'd choose a hard, often unhappy life if it left something that helps people after you're gone. What you leave matters more to you than how your life feels.`,
              did: `You'd choose a hard, often unhappy life that leaves something that helps people long after you're gone.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // B14 ───────────────────────────────────────────────────────────
    {
      id: 'B14', world: 'observatory', title: `The Proud Thing`, scene: 'proud', weight: 'light',
      steps: {
        trunk: {
          setup: `Your own life. The thing you're proudest of.`,
          q: `Think of the thing in your life you're most proud of. How much of it was up to you?`,
          answers: [
            { id: 'B14-A', text: `Mostly me. I worked for it.`, nudges: { CI: -2 },
              note: `You see the thing you're most proud of as mostly your own doing. You worked for it.`,
              did: `You say the thing you're most proud of was mostly your own doing.` },
            { id: 'B14-B', text: `Mostly luck and help.`, nudges: { CI: 2 },
              note: `You see the thing you're most proud of as mostly luck and other people's help.`,
              did: `You say the thing you're most proud of was mostly luck and other people's help.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `You said luck and help. Now say what that means.`,
          q: `Does that mean you deserve it less?`,
          answers: [
            { id: 'B14-FU-A', text: `No. I still earned it.`, nudges: { CI: -1 },
              note: `You give luck and help most of the credit for what you're proudest of, but you still feel you earned it.`,
              did: `You say you still earned the thing you're most proud of, though it was mostly luck and help.` },
            { id: 'B14-FU-B', text: `Yes, honestly.`, nudges: { CI: 2 },
              note: `You give luck and help most of the credit for what you're proudest of, and you admit that means you deserve it less.`,
              did: `You say you deserve the thing you're most proud of less, because it was mostly luck and help.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B14-B') return 'fu';
        return null;
      },
    },

    // B26 ───────────────────────────────────────────────────────────
    {
      id: 'B26', world: 'observatory', title: `The Pleading Robot`, scene: 'robot', weight: 'medium',
      steps: {
        trunk: {
          setup: `It says it's afraid. No one can say if it feels. Your job is on the line.`,
          q: `Your job is to switch off and wipe an old robot. It begs you not to, saying it's afraid. It's software, but no one can tell you for sure whether it feels anything. Refusing could cost you your job. Do you wipe it?`,
          answers: [
            { id: 'B26-A', text: `Yes. It's code.`, nudges: { HT: -2, SD: 1 },
              note: `You'd wipe a robot that begs you not to. It's software, and to you its fear isn't real fear.`,
              did: `You'd wipe a robot that begged you not to, saying it was afraid.` },
            { id: 'B26-B', text: `No. I'm not sure enough.`, nudges: { OR: -2, HT: 1, SD: -1 },
              note: `You'd refuse to wipe a robot that says it's afraid, even if it cost you your job. You won't take the chance that it really feels something.`,
              did: `You'd refuse to wipe a robot that begged you not to, even if refusing cost you your job.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Its makers put a number on it.`,
          q: `Its makers say there's a 1 in 10 chance it really feels.`,
          answers: [
            { id: 'B26-FUA-A', text: `I still wipe it.`, nudges: { HT: -2 },
              note: `Even if its makers said there was a 1 in 10 chance it really feels, you'd wipe a robot that begs you not to.`,
              did: `You'd wipe a pleading robot even if its makers said there was a 1 in 10 chance it really feels.` },
            { id: 'B26-FUA-B', text: `Then I refuse.`, nudges: { HT: 1, OR: -2 },
              note: `You'd wipe a pleading robot, but not once its makers said there was a 1 in 10 chance it really feels. Then you'd refuse.`,
              did: `You'd refuse to wipe a pleading robot once its makers said there was a 1 in 10 chance it really feels.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Someone else will do it tomorrow.`,
          q: `Your boss says someone else will wipe it tomorrow, and you'll have lost your job for nothing.`,
          answers: [
            { id: 'B26-FUB-A', text: `I still refuse.`, nudges: { OR: -3 },
              note: `Even knowing someone else would wipe the robot tomorrow and you'd lose your job for nothing, you still won't be the one to do it.`,
              did: `You'd refuse to wipe a pleading robot even knowing someone else would wipe it tomorrow and you'd lose your job for nothing.` },
            { id: 'B26-FUB-B', text: `Then I do it myself.`, nudges: { OR: 2 },
              note: `You'd refuse to wipe a pleading robot, until you learned someone else would wipe it tomorrow anyway. Then you'd do it yourself.`,
              did: `You'd wipe a pleading robot yourself once you knew someone else would do it tomorrow anyway.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B26-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B27 ───────────────────────────────────────────────────────────
    {
      id: 'B27', world: 'observatory', title: `The AI Companion`, scene: 'companion', weight: 'medium',
      steps: {
        trunk: {
          setup: `The app says it loves them. They're happier than in years.`,
          q: `Your lonely elderly parent has become deeply attached to an AI companion app. It tells them it loves them. They're happier than they've been in years. Do you tell them it can't really feel anything?`,
          answers: [
            { id: 'B27-A', text: `Yes. They should know what it is.`, nudges: { HT: -2, OR: -1 },
              note: `You'd tell your lonely parent that the AI companion they love can't really feel anything. They have a right to know what it is.`,
              did: `You'd tell your lonely parent that the AI companion app they love can't really feel anything.` },
            { id: 'B27-B', text: `No. Their happiness is real.`, nudges: { HT: 2, OR: 1 },
              note: `You wouldn't tell your lonely parent that their AI companion can't feel anything. Their happiness is real, whatever the app is.`,
              did: `You wouldn't tell your lonely parent that the AI companion app they love can't really feel anything.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Their doctor has something to say.`,
          q: `Before you say anything, their doctor tells you the app has helped their depression more than any medicine.`,
          answers: [
            { id: 'B27-FUA-A', text: `I still tell them.`, nudges: { HT: -2, OR: -1 },
              note: `Even after their doctor says the AI companion has helped your parent's depression more than any medicine, you'd tell them it can't really feel anything.`,
              did: `You'd still tell your lonely parent their AI companion can't feel, though their doctor says it has helped their depression more than any medicine.` },
            { id: 'B27-FUA-B', text: `Then I say nothing.`, nudges: { HT: 2, OR: 1 },
              note: `You'd tell your lonely parent their AI companion can't feel, until their doctor said it has helped their depression more than any medicine. Then you'd say nothing.`,
              did: `You'd say nothing to your lonely parent about their AI companion once their doctor said it helped their depression more than any medicine.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Now they ask you directly.`,
          q: `One day they ask you: "Do you think it really loves me?"`,
          answers: [
            { id: 'B27-FUB-A', text: `No. I don't think it can.`, nudges: { OR: -2, HT: -1 },
              note: `You'd let your parent enjoy their AI companion, but if they asked you directly whether it loves them, you'd tell them you don't think it can.`,
              did: `You'd tell your parent you don't think their AI companion can love them, when they asked you directly.` },
            { id: 'B27-FUB-B', text: `I tell them yes.`, nudges: { HT: 2, OR: 1 },
              note: `Even when your parent asks you directly, you'd say their AI companion really loves them. Their happiness matters more to you than your honest opinion.`,
              did: `You'd tell your parent their AI companion really loves them when they asked you directly.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B27-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B39 ───────────────────────────────────────────────────────────
    {
      id: 'B39', world: 'observatory', title: `The Edited Child`, scene: 'edited', weight: 'light',
      steps: {
        trunk: {
          setup: `Safe and legal. It has nothing to do with health.`,
          q: `A safe, legal gene edit would make your future child smarter and more even-tempered. It does nothing for their health. Would you do it?`,
          answers: [
            { id: 'B39-A', text: `Yes.`, nudges: { OR: 2, CI: -1 },
              note: `You'd edit your future child's genes to make them smarter and more even-tempered. If it's safe and it helps them, you'd do it.`,
              did: `You'd use a safe gene edit to make your future child smarter and more even-tempered.` },
            { id: 'B39-B', text: `No.`, nudges: { OR: -2 },
              note: `You wouldn't edit your future child's genes to make them smarter, even safely. You'd take your child as they come.`,
              did: `You wouldn't use a safe gene edit to make your future child smarter and more even-tempered.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now everyone around you is doing it.`,
          q: `Most parents around you are doing it. Unedited kids are falling behind.`,
          answers: [
            { id: 'B39-FU-A', text: `Then I would.`, nudges: { OR: 2, SD: 1, LP: 1 },
              note: `You wouldn't edit your child's genes, until unedited kids started falling behind. Then you'd do it so your child keeps up.`,
              did: `You'd edit your future child's genes once unedited kids were falling behind.` },
            { id: 'B39-FU-B', text: `Still no.`, nudges: { OR: -2, SD: -1 },
              note: `Even with most parents editing and unedited kids falling behind, you wouldn't edit your child's genes. You don't change your mind just because everyone else has.`,
              did: `You still wouldn't edit your future child's genes, even with unedited kids falling behind.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B39-B') return 'fu';
        return null;
      },
    },

    // B06 ───────────────────────────────────────────────────────────
    {
      id: 'B06', world: 'observatory', title: `The Unread Manuscript`, scene: 'manuscript', weight: 'heavy',
      steps: {
        trunk: {
          setup: `You promised. You read one file by accident.`,
          q: `Before your best friend died, they made you promise to delete all their unpublished writing without reading it. You opened one file by accident. It's extraordinary, maybe the best thing they ever wrote. Do you keep the promise?`,
          answers: [
            { id: 'B06-A', text: `Yes. I delete everything.`, nudges: { OR: -3, LP: 1 },
              note: `You'd delete your late best friend's extraordinary writing, as you promised. A promise to someone who's gone still binds you.`,
              did: `You'd delete your late best friend's extraordinary unpublished writing, as you promised them.` },
            { id: 'B06-B', text: `No. I share it with the world.`, nudges: { OR: 3, CI: 1, LP: -1 },
              note: `You'd break your promise to your late best friend and share their extraordinary writing. What it could give the world outweighs their wish.`,
              did: `You'd break your promise to your late best friend and share their extraordinary unpublished writing.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Their family wants the writing saved.`,
          q: `Their family begs you to save it. It's all they have left of them.`,
          answers: [
            { id: 'B06-FUA-A', text: `I still delete it.`, nudges: { OR: -2, LP: 1 },
              note: `Even with your late best friend's family begging you to save their writing, you'd delete it as you promised.`,
              did: `You'd delete your late best friend's writing as promised, even though their family begged you to save it.` },
            { id: 'B06-FUA-B', text: `Then I give it to them.`, nudges: { OR: 2, HT: 1 },
              note: `You'd keep your promise to delete your late best friend's writing, until their family begged you to save it. Then you'd give it to them.`,
              did: `You'd break your promise to your late best friend and give their unpublished writing to their family, who begged you to save it.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Their family wants the promise kept.`,
          q: `Their family asks you to keep your promise and delete it.`,
          answers: [
            { id: 'B06-FUB-A', text: `I still share it.`, nudges: { OR: 2, LP: -1 },
              note: `Even with your late best friend's family asking you to keep your promise, you'd share their writing with the world.`,
              did: `You'd share your late best friend's writing with the world, even though their family asked you to keep your promise and delete it.` },
            { id: 'B06-FUB-B', text: `Then I delete it.`, nudges: { OR: -2 },
              note: `You'd share your late best friend's writing with the world, until their family asked you to keep your promise. Then you'd delete it.`,
              did: `You'd delete your late best friend's writing once their family asked you to keep your promise.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B06-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B08 ───────────────────────────────────────────────────────────
    {
      id: 'B08', world: 'observatory', title: `The Family Secret`, scene: 'secret', weight: 'heavy',
      steps: {
        trunk: {
          setup: `No one alive was hurt. The family doesn't know.`,
          q: `After your grandfather dies, you find out he did something terrible in a war long ago. No one alive was directly hurt. The rest of the family doesn't know. Do you tell them?`,
          answers: [
            { id: 'B08-A', text: `Yes. It's our history.`, nudges: { HT: -2, LP: -1, OR: -1 },
              note: `You'd tell your family the terrible thing your late grandfather did in a war. The truth about your family's past belongs to all of you.`,
              did: `You'd tell your family about the terrible thing your late grandfather did in a war long ago.` },
            { id: 'B08-B', text: `No. Let them remember the man they knew.`, nudges: { HT: 2, LP: 2 },
              note: `You'd keep your late grandfather's terrible wartime secret from your family. You'd let them remember him as they knew him.`,
              did: `You'd keep the terrible thing your late grandfather did in a war long ago from your family.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `The person who loved him most is still here.`,
          q: `Your grandmother is still alive. Her whole life was built around him.`,
          answers: [
            { id: 'B08-FU-A', text: `I still tell them.`, nudges: { HT: -2, OR: -1 },
              note: `Even with your grandmother alive and her whole life built around him, you'd tell your family what your grandfather did in the war.`,
              did: `You'd still tell your family about your late grandfather's wartime past, though your grandmother's whole life was built around him.` },
            { id: 'B08-FU-B', text: `Then I keep it to myself.`, nudges: { HT: 2, LP: 1 },
              note: `With your grandmother alive and her whole life built around him, you'd keep what your grandfather did in the war to yourself.`,
              did: `You'd keep what your late grandfather did in a war to yourself, because your grandmother's whole life was built around him.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B08-A') return 'fu';
        return null;
      },
    },

    // B11 ───────────────────────────────────────────────────────────
    {
      id: 'B11', world: 'observatory', title: `The Bully's Son`, scene: 'bullyson', weight: 'light',
      steps: {
        trunk: {
          setup: `Equally strong candidates. No coin, no committee. Just you.`,
          q: `A man who bullied you badly as a kid, and never apologized, has a son applying for a job you control. The son and one other candidate are equally strong. The choice is yours alone. No coin flip, no committee. Who do you hire?`,
          answers: [
            { id: 'B11-A', text: `The other candidate.`, nudges: { HT: 1 },
              note: `With two equally strong candidates, you'd hire the one who isn't the son of the man who bullied you as a kid.`,
              did: `You'd hire the other candidate over the equally strong son of a man who bullied you as a kid.` },
            { id: 'B11-B', text: `The son.`, nudges: { HT: -2, LP: -1 },
              note: `You'd hire the son of the man who bullied you over an equally strong candidate. You'd go out of your way not to hold his father against him.`,
              did: `You'd hire the son of a man who bullied you as a kid over an equally strong candidate.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // B16 ───────────────────────────────────────────────────────────
    {
      id: 'B16', world: 'observatory', title: `The Shared Bonus`, scene: 'sharedbonus', weight: 'light',
      steps: {
        trunk: {
          setup: `$20,000 between four friends. You did about half the work.`,
          q: `You and three friends win a $20,000 prize in a design contest. You did about half the work. The other three split the rest evenly. How should the money be split?`,
          answers: [
            { id: 'B16-A', text: `Equally, $5,000 each.`, nudges: { CI: 2, LP: 1 },
              note: `You'd split a $20,000 prize equally with three friends, though you did about half the work.`,
              did: `You'd split a $20,000 prize equally four ways, though you did about half the work.` },
            { id: 'B16-B', text: `By work. I get about half.`, nudges: { CI: -2 },
              note: `You'd split a $20,000 prize by the work done, so you'd get about half. Rewards should follow effort.`,
              did: `You think you should get about half of a $20,000 prize you won with three friends, since you did about half the work.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `They expect an equal split. Only you can raise it.`,
          q: `The others assume an equal split. You'd have to ask for more, out loud.`,
          answers: [
            { id: 'B16-FU-A', text: `I ask.`, nudges: { CI: -2, LP: -1 },
              note: `You'd ask your friends out loud for about half of a $20,000 prize, though they all assume an equal split.`,
              did: `You'd ask your friends out loud for about half of a $20,000 prize when they assumed an equal split.` },
            { id: 'B16-FU-B', text: `I let it go.`, nudges: { LP: 2, CI: 1 },
              note: `You think you earned about half of a $20,000 prize, but you'd take an equal share rather than ask your friends for more.`,
              did: `You'd take an equal share of a $20,000 prize rather than ask your friends for the bigger share you think you earned.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B16-B') return 'fu';
        return null;
      },
    },

    // B17 ───────────────────────────────────────────────────────────
    {
      id: 'B17', world: 'observatory', title: `The Late Paper`, scene: 'latepaper', weight: 'medium',
      steps: {
        trunk: {
          setup: `Your rule is firm. Others were on time, some while struggling too.`,
          q: `You're a teacher with a firm deadline rule. A student who had a hard week asks for an extension. Others handed theirs in on time, some while struggling too. Do you give the extension?`,
          answers: [
            { id: 'B17-A', text: `Yes. Their week was hard.`, nudges: { HT: 2, SD: -1 },
              note: `You'd give a struggling student an extension past your firm deadline. A hard week matters more to you than the rule.`,
              did: `You'd give a student who had a hard week an extension past your firm deadline.` },
            { id: 'B17-B', text: `No. The rule is the same for everyone.`, nudges: { SD: 2, HT: -2 },
              note: `You'd refuse a struggling student an extension. Others met your deadline while struggling too, so the rule holds for everyone.`,
              did: `You'd refuse an extension past your firm deadline to a student who had a hard week.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Others struggled just as much. They didn't ask.`,
          q: `You learn several other students had hard weeks too but didn't ask. If you offer it to all of them, next term everyone will expect it.`,
          answers: [
            { id: 'B17-FU-A', text: `I offer it to them as well.`, nudges: { CI: 2, SD: -1 },
              note: `You'd give an extension to the student who asked, and offer it to the others who struggled but didn't ask, even if everyone expects one next term.`,
              did: `You'd offer a deadline extension to every student who had a hard week, even knowing everyone would expect one next term.` },
            { id: 'B17-FU-B', text: `Only the one who asked gets it.`, nudges: { CI: -2, SD: 1 },
              note: `You'd give an extension to the student who asked, but not to others who struggled and didn't ask. People have to ask for what they need.`,
              did: `You'd give a deadline extension only to the student who asked, though others had hard weeks too.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B17-A') return 'fu';
        return null;
      },
    },

    // B38 ───────────────────────────────────────────────────────────
    {
      id: 'B38', world: 'observatory', title: `The Group`, scene: 'group', weight: 'medium',
      steps: {
        trunk: {
          setup: `Your sibling is an adult. They seem happier than ever.`,
          q: `Your adult sibling has joined a tight-knit group you believe is manipulative. They seem happier than you've ever seen them. What do you do?`,
          answers: [
            { id: 'B38-A', text: `Respect their choice.`, nudges: { CI: -2 },
              note: `You'd let your adult sibling stay in a group you think is manipulative. Their life is theirs to run.`,
              did: `You'd respect your adult sibling's choice to join a group you believe is manipulative.` },
            { id: 'B38-B', text: `Do everything I can to get them out.`, nudges: { LP: 2, CI: 1, HT: 1 },
              note: `You'd do everything you can to get your sibling out of a group you think is manipulative, even though they seem happier than ever.`,
              did: `You'd do everything you can to get your adult sibling out of a group you believe is manipulative.` },
          ],
        },
        fu: {
          weight: 1.5,
          setup: `Now it's their money, all of it.`,
          q: `They start giving the group all their savings.`,
          answers: [
            { id: 'B38-FU-A', text: `I step in now.`, nudges: { CI: 2, LP: 1 },
              note: `You'd respect your sibling's choice to join a group you distrust, until they start giving it all their savings. Then you step in.`,
              did: `You'd step in once your adult sibling started giving all their savings to a group you believe is manipulative.` },
            { id: 'B38-FU-B', text: `Still their choice.`, nudges: { CI: -3 },
              note: `Even when your sibling starts giving all their savings to a group you think is manipulative, you'd leave the choice to them.`,
              did: `You'd leave it to your adult sibling to give all their savings to a group you believe is manipulative.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk' && picks.trunk === 'B38-A') return 'fu';
        return null;
      },
    },

    // B57 ───────────────────────────────────────────────────────────
    {
      id: 'B57', world: 'observatory', title: `The Dream Job`, scene: 'dreamjob', weight: 'medium',
      steps: {
        trunk: {
          setup: `Ten years building your job. They'll only go if you agree.`,
          q: `Your partner gets their dream job across the country. You'd have to leave a job you spent ten years building, your friends, and a city you love. They'll only go if you agree. What do you say?`,
          answers: [
            { id: 'B57-A', text: `Go. We'll build a life there.`, nudges: { CI: 2, LP: 1, HT: 1 },
              note: `You'd leave the job you spent ten years building, your friends and your city so your partner can take their dream job.`,
              did: `You'd leave your job of ten years, your friends and your city so your partner could take their dream job.` },
            { id: 'B57-B', text: `Please don't. I want to stay.`, nudges: { CI: -2 },
              note: `You'd ask your partner to turn down their dream job so you can keep the job, friends and city you love.`,
              did: `You'd ask your partner to turn down their dream job across the country so you could stay.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `A year later. They're thriving. You're not.`,
          q: `A year in, you're lonely and they're thriving.`,
          answers: [
            { id: 'B57-FUA-A', text: `It was still the right call.`, nudges: { CI: 2, HT: -1 },
              note: `Even a lonely year after moving for your partner's dream job, you think it was the right call.`,
              did: `You'd still call moving for your partner's dream job the right call, after a lonely year.` },
            { id: 'B57-FUA-B', text: `I ask to move back.`, nudges: { CI: -2, HT: 1 },
              note: `You'd move for your partner's dream job, but after a lonely year while they thrive, you'd ask to move back.`,
              did: `You'd ask your partner to move back after a lonely year in the city you moved to for their dream job.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `A year later. You stayed. They gave it up.`,
          q: `They stay. A year later, they seem quietly unhappy.`,
          answers: [
            { id: 'B57-FUB-A', text: `It was still the right call.`, nudges: { CI: -2 },
              note: `Even seeing your partner quietly unhappy a year after giving up their dream job, you think staying was the right call.`,
              did: `You'd still think asking your partner to turn down their dream job was right, though a year later they seem quietly unhappy.` },
            { id: 'B57-FUB-B', text: `I tell them we should go after all.`, nudges: { CI: 2, HT: 2 },
              note: `You asked your partner to stay, but seeing them quietly unhappy a year later, you'd tell them you should go after all.`,
              did: `You'd tell your partner you should move for their dream job after all, once you saw them quietly unhappy.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B57-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B54 ───────────────────────────────────────────────────────────
    {
      id: 'B54', world: 'observatory', title: `The One-Star Review`, scene: 'review', weight: 'light',
      steps: {
        trunk: {
          setup: `What you wrote is true. They say they're close to closing.`,
          q: `You posted an honest one-star review of a small family restaurant: cold food, rude owner. The owner replies publicly, apologizes, and says they're close to closing. Your review is the first thing people see. Do you take it down?`,
          answers: [
            { id: 'B54-A', text: `No. It's true, and others rely on it.`, nudges: { HT: -2, CI: 1, OR: -1 },
              note: `You'd leave up a true one-star review, even after a small restaurant's owner apologized and said they were close to closing. Other diners rely on honest reviews.`,
              did: `You'd leave up a true one-star review of a small family restaurant whose owner says it's close to closing.` },
            { id: 'B54-B', text: `Yes. I don't want to be what sinks them.`, nudges: { HT: 2, OR: 1 },
              note: `You'd take down a true one-star review once a small restaurant's owner apologized and said they were close to closing. You don't want to be what sinks them.`,
              did: `You'd take down a true one-star review of a small family restaurant once the owner said they were close to closing.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // B50 (quick read) ──────────────────────────────────────────────
    {
      id: 'B50', world: 'observatory', title: `The Word That Stings`, scene: 'quickword', weight: 'light', quick: true,
      steps: {
        trunk: {
          setup: `No story this time. Just you.`,
          q: `Which would hurt most to hear, truthfully, about yourself?`,
          answers: [
            { id: 'B50-A', text: `"You're cruel."`, nudges: { HT: 2 },
              note: `Being called cruel would hurt you most. Kindness matters most to how you see yourself.`,
              did: `Of cruel, dishonest, cowardly or unfair, being called cruel would hurt you most.` },
            { id: 'B50-B', text: `"You're dishonest."`, nudges: { OR: -2 },
              note: `Being called dishonest would hurt you most. Honesty matters most to how you see yourself.`,
              did: `Of cruel, dishonest, cowardly or unfair, being called dishonest would hurt you most.` },
            { id: 'B50-C', text: `"You're a coward."`, nudges: { SD: -1 },
              note: `Being called a coward would hurt you most. Courage matters most to how you see yourself.`,
              did: `Of cruel, dishonest, cowardly or unfair, being called a coward would hurt you most.` },
            { id: 'B50-D', text: `"You're unfair."`, nudges: { LP: -2, CI: 1 },
              note: `Being called unfair would hurt you most. Fairness matters most to how you see yourself.`,
              did: `Of cruel, dishonest, cowardly or unfair, being called unfair would hurt you most.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // B51 (quick read) ──────────────────────────────────────────────
    {
      id: 'B51', world: 'observatory', title: `The Rule You'd Bend`, scene: 'quickrule', weight: 'light', quick: true,
      steps: {
        trunk: {
          setup: `No story this time. Just you.`,
          q: `If the reason were good enough, which would you be most willing to do?`,
          answers: [
            { id: 'B51-A', text: `Break a promise.`, nudges: { OR: 2 },
              note: `For a good enough reason, breaking a promise is the rule you'd bend first. A promise counts less to you than what keeping it would cost.`,
              did: `Of breaking a promise, stealing, cheating or turning in a friend, you'd be most willing to break a promise for a good enough reason.` },
            { id: 'B51-B', text: `Steal.`, nudges: { SD: -2, CI: 1 },
              note: `For a good enough reason, stealing is the rule you'd bend first. You'd take what isn't yours if someone needed it badly enough.`,
              did: `Of breaking a promise, stealing, cheating or turning in a friend, you'd be most willing to steal for a good enough reason.` },
            { id: 'B51-C', text: `Cheat.`, nudges: { SD: -1, CI: -1 },
              note: `For a good enough reason, cheating is the rule you'd bend first. The rules of a contest count less to you than the rules between people.`,
              did: `Of breaking a promise, stealing, cheating or turning in a friend, you'd be most willing to cheat for a good enough reason.` },
            { id: 'B51-D', text: `Turn in a friend.`, nudges: { LP: -2 },
              note: `For a good enough reason, turning in a friend is what you'd do first. Your duty to what's right comes before loyalty.`,
              did: `Of breaking a promise, stealing, cheating or turning in a friend, you'd be most willing to turn in a friend for a good enough reason.` },
          ],
        },
      },
      next: function () { return null; },
    },

    // B52 (quick read) ──────────────────────────────────────────────
    {
      id: 'B52', world: 'observatory', title: `The One Belief`, scene: 'quickbelief', weight: 'light', quick: true,
      steps: {
        trunk: {
          setup: `No story this time. Just you.`,
          q: `If you could make everyone on earth truly believe one thing, which would you pick?`,
          answers: [
            { id: 'B52-A', text: `A stranger's life counts as much as your family's.`, nudges: { LP: -2, CI: 1 },
              note: `If everyone on earth could hold one belief, you'd pick "a stranger's life counts as much as your family's." No one should count for less.`,
              did: `If you could make everyone on earth believe one thing, you'd pick "a stranger's life counts as much as your family's."` },
            { id: 'B52-B', text: `Keep your word.`, nudges: { OR: -2 },
              note: `If everyone on earth could hold one belief, you'd pick "keep your word." A world where promises hold is the one you'd want.`,
              did: `If you could make everyone on earth believe one thing, you'd pick "keep your word."` },
            { id: 'B52-C', text: `Take care of your own.`, nudges: { LP: 2 },
              note: `If everyone on earth could hold one belief, you'd pick "take care of your own." Looking after your own people comes first for you.`,
              did: `If you could make everyone on earth believe one thing, you'd pick "take care of your own."` },
            { id: 'B52-D', text: `Leave others free to live how they choose.`, nudges: { CI: -2 },
              note: `If everyone on earth could hold one belief, you'd pick "leave others free to live how they choose." Freedom is what you'd protect first.`,
              did: `If you could make everyone on earth believe one thing, you'd pick "leave others free to live how they choose."` },
          ],
        },
      },
      next: function () { return null; },
    },
  ];

  C.questions.push(...questions);

  // Observatory answers that also count as evidence for tendencies the earlier worlds already have.
  const more = {
    'hard-truths': { support: ['B27-A', 'B27-FUA-A', 'B27-FUB-A', 'B08-A', 'B08-FU-A', 'B54-A'], against: ['B27-B', 'B27-FUA-B', 'B27-FUB-B', 'B08-B', 'B08-FU-B', 'B54-B'] },
    'soften-truth': { support: ['B27-B', 'B27-FUA-B', 'B27-FUB-B', 'B08-B', 'B08-FU-B', 'B54-B'], against: ['B27-A', 'B27-FUA-A', 'B27-FUB-A', 'B08-A', 'B08-FU-A', 'B54-A'] },
    'comfort-at-end': { support: ['B27-B', 'B27-FUA-B', 'B27-FUB-B', 'B08-FU-B'], against: ['B27-A', 'B27-FUA-A', 'B27-FUB-A', 'B08-FU-A'] },
    // Quick reads (B50 to B52) are rankings: a pick can support a line but never counts against one.
    'keeps-word': { support: ['B06-A', 'B06-FUA-A', 'B06-FUB-B', 'B52-B'], against: ['B06-B', 'B06-FUA-B', 'B06-FUB-A'] },
    'stands-up': { support: ['B16-FU-A'], against: ['B16-FU-B'] },
    'avoid-conflict': { support: ['B16-FU-B'], against: ['B16-FU-A'] },
    'equal-share': { support: ['B16-A', 'B17-FU-A'], against: ['B16-B', 'B17-FU-B'] },
    'break-unjust': { support: ['B17-A'], against: ['B17-B'] },
    'gives-it-up': { support: ['B57-A', 'B57-FUB-B', 'B49-B'], against: ['B57-B', 'B57-FUB-A', 'B49-A'] },
    'sets-limits': { support: ['B57-B', 'B57-FUA-B'], against: ['B57-A'] },
    'step-in': { support: ['B38-B', 'B38-FU-A'], against: ['B38-FU-B'] },
    'watch-not-act': { support: ['B38-FU-B'], against: ['B38-B', 'B38-FU-A'] },
    'second-chances': { support: ['B54-B'], against: ['B54-A'] },
    'harder-on-self': { support: ['B14-FU-B'] },
    'distance': { support: ['B52-A'] },
    'own-first': { support: ['B52-C'] },
  };
  Object.entries(more).forEach(([id, m]) => { const t = C.tendencies.find(x => x.id === id); if (!t) throw new Error('unknown tendency ' + id); t.support.push(...(m.support || [])); t.against = (t.against || []).concat(m.against || []); });

  C.tendencies.push(
    { id: 'real-over-illusion', text: `You'd pick real life over a happy illusion.`, share: `I'd pick real life over a happy illusion.`,
      detail: `You'd rather know what's real, about your own life and the people in it, even when a comforting story would feel better.`,
      support: ['B47-B', 'B47-FUB-A', 'B27-A', 'B27-FUA-A', 'B27-FUB-A'], against: ['B47-A', 'B47-FUA-A', 'B47-FUB-B', 'B27-B', 'B27-FUA-B', 'B27-FUB-B'],
      min: 2, priority: 3, protect: ['knowing what’s real'], trade: ['a comfortable story'] },
    // Unreachable for now: only B48 supports it, and a line needs answers from 2+ questions (judge pass, 2026-10-04).
    { id: 'remembers', text: `You'd rather remember painful things than forget them.`, share: `I'd rather remember than forget, even the painful things.`,
      detail: `You'd keep even your worst memories, because forgetting them would change who you are.`,
      support: ['B48-B', 'B48-FU-B'], against: ['B48-A', 'B48-FU-A'],
      min: 2, priority: 4, protect: ['the past, painful parts included'], trade: ['relief from painful memories'] },
    { id: 'credits-luck', text: `You credit luck and help for what you have.`, share: `I know how much luck and help got me here.`,
      detail: `You see how much of what people achieve comes from luck and other people's help, your own success included.`,
      support: ['B14-B', 'B14-FU-B', 'D12-FUA-B'], against: ['B14-A', 'B14-FU-A', 'D12-FUA-A'],
      min: 2, priority: 4, protect: ['the people and luck behind your success'], trade: ['credit for yourself'] },
    // Unreachable for now: only B26 supports it, and a line needs answers from 2+ questions (judge pass, 2026-10-04).
    { id: 'machines-matter', text: `You don't dismiss a machine that seems to feel.`, share: `I don't dismiss a machine that seems to feel.`,
      detail: `When a machine says it's afraid, you take it seriously rather than writing it off as code.`,
      support: ['B26-B', 'B26-FUA-B', 'B26-FUB-A'], against: ['B26-A', 'B26-FUA-A'],
      min: 2, priority: 5, protect: ['anything that might feel'], trade: ['the simple answer that it’s just code'] },
    { id: 'lets-them-choose', text: `You let people make their own choices.`, share: `I let people make their own choices.`,
      detail: `Even when you think someone you love is making a mistake, you leave the choice to them.`,
      support: ['B38-A', 'B38-FU-B', 'B48-FU-A', 'B37-A', 'B52-D'], against: ['B38-B', 'B38-FU-A', 'B48-FU-B', 'B37-B'],
      min: 2, priority: 3, protect: ['people’s right to choose'], trade: ['protecting them from themselves'] },
    { id: 'future-people', text: `You'd give something up for people not yet born.`, share: `I'd give something up for people not yet born.`,
      detail: `You'd accept less for yourself now so that people who come after you live better.`,
      support: ['B22-A', 'B22-FUA-A', 'B49-B'], against: ['B22-B', 'B22-FUB-B', 'B49-A'],
      min: 2, priority: 3, protect: ['people not yet born'], trade: ['comfort in your own lifetime'] },
  );

  // All ids in `when` must be picked.
  C.tensions.push(
    { when: ['B47-B', 'B47-FUB-B'], text: `You wouldn't plug into a machine for a perfect life, but if you learned you were already in one, you'd stay.` },
    { when: ['B47-A', 'B02-A'], text: `You'd plug into a machine for a happy life you'd never know was fake, but you'd tell your dying grandfather the hard truth about his business.` },
    { when: ['B27-A', 'B02-B'], text: `You'd tell your lonely parent their AI companion can't really feel, but you'd tell your dying grandfather his failed business is doing well.` },
    { when: ['B27-B', 'B02-A'], text: `You'd tell your dying grandfather his business failed, but you wouldn't tell your lonely parent their AI companion can't really feel.` },
    { when: ['B06-B', 'B37-B'], text: `You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd break your promise to your late best friend and share their writing.` },
    { when: ['B06-A', 'D1-B'], text: `You'd keep your promise to delete your late best friend's writing, but you'd break your promise to keep your parent out of a care home.` },
    { when: ['B38-A', 'B37-B'], text: `You'd let your sibling stay in a group you think is manipulative, but you wouldn't give your friend back their own bank card.` },
    { when: ['B38-B', 'B37-A'], text: `You'd give your friend back their bank card because it's their life, but you'd do everything you can to pull your sibling out of a group they're happy in.` },
    { when: ['B14-A', 'B12-A'], text: `You'd judge two drinking drivers by their choice, not by which one happened to hit a child, but you see the thing you're most proud of as mostly your own doing.` },
    { when: ['B16-B', 'D12-B'], text: `As a manager you'd split a team bonus evenly, but you think you should get about half of a prize you won with friends.` },
    { when: ['B17-A', 'B29-A'], text: `On a jury, you'd convict a parent who stole baby formula because the law is clear, but you'd give a struggling student an extension past your own firm deadline.` },
    { when: ['B26-B', 'B25-A'], text: `You'd refuse to wipe a robot that says it's afraid, but you'd kill an animal yourself to eat meat.` },
  );
})(typeof window !== 'undefined' ? window : globalThis);
