// Tern: the Coast (world 4): 12 questions about strangers and sacrifice, people far away and not yet born. Instrument data; see content.js header.
// Wording is verbatim from docs/QUESTION-BANK.md (B15, B19, B20, B22, B23, B25) and docs/QUESTIONS.md (Q2, Q4, D2, D4, D9, D12;
// dashes in answers became periods, as in the park). D12's clarifying preface ("Something came up that we want to explore.")
// is dropped because here it is an ordinary stop. Nudges, setups, notes, did lines, tendencies and tensions are first-authored
// here. The old doc nudges were re-checked against the axis meanings in content.js, and several were changed (see
// game/coast-proposals.md). Ken ratified the Coast on 2026-10-04 and approved every recommendation in coast-proposals.md:
// Q2's follow-up answer reworded; follow-ups on both sides for D2, D4, D9 and B20; the missing side for Q2, B19, B23, B15,
// B25 and D12 (their old `fu` became `fuA` / `fuB` / `fuC` by trunk answer, renaming its answer ids); B23's "leave, or act"
// split in two; B25's "I already don't" given its own follow-up. The new answers were authored here.
// Skeptic judge fixes (Ken approved, 2026-10-04; docs/question-bank-wip/judge-coast.md, game/plan-judge-fixes.md Group 1):
// a replaced follow-up keeps its key and gets new answer ids with a "2" (e.g. D4-FUA2-A), so old saves drop only that pick.
// Axis ids: OR (O+ / R-), CI (C+ / I-), HT (H+ / T-), LP (L+ / P-), SD (S+ / D-).
(function (root) {
  const C = root.TERN_CONTENT;

  const questions = [
    // Q2 ────────────────────────────────────────────────────────────
    {
      id: 'Q2', world: 'coast', title: `The Wallet`, scene: 'seawallet', weight: 'medium',
      steps: {
        trunk: {
          setup: `No one saw. Being short means a late fee, not eviction.`,
          q: `You find a wallet with $400 cash and an ID. The owner lives in a wealthy neighborhood. You're $400 short on rent this week, and no one saw you. What do you do?`,
          answers: [
            { id: 'Q2-A', text: `Return the wallet with all the cash`, nudges: { SD: 2, OR: -1, CI: 1 },
              note: `You'd return a found wallet with all $400 inside, though you're $400 short on rent and no one would know. Money you find isn't yours to keep.`,
              did: `You'd return a found wallet with all $400 inside, though you were $400 short on rent and no one saw you.` },
            { id: 'Q2-B', text: `Keep the cash, mail back the wallet and ID`, nudges: { CI: -2, SD: -1, OR: 1 },
              note: `You'd keep the $400 from a found wallet and mail back the rest. The owner is well off, and you need the money more.`,
              did: `You'd keep the $400 from a wealthy stranger's lost wallet and mail back the wallet and ID.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Same wallet, same $400. Now being short could cost you your home.`,
          q: `Your landlord says one more late payment and you're out.`,
          answers: [
            { id: 'Q2-FUA-A', text: `I still return all the cash.`, nudges: { SD: 2, OR: -2 },
              note: `Even if one more late payment would cost you your home, you'd return all $400 in a stranger's wallet. Money you find isn't yours to keep.`,
              did: `You'd return all $400 in a wealthy stranger's lost wallet, even if one more late payment would get you evicted.` },
            { id: 'Q2-FUA-B', text: `Then I keep the cash and mail back the rest.`, nudges: { CI: -2, OR: 1, SD: -1 },
              note: `You'd return a found wallet with all the cash, until keeping the $400 was the only way to keep your home. Then you'd keep it.`,
              did: `You'd keep the $400 from a wealthy stranger's lost wallet if one more late payment would get you evicted.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Same wallet, same $400. Only the owner's street changes.`,
          q: `What if the owner lives in a low-income neighborhood?`,
          answers: [
            { id: 'Q2-FUB-A', text: `I'd return it. That changes things`, nudges: { CI: 2, OR: 1 },
              note: `You'd keep a wealthy stranger's $400, but not a poor stranger's. Who loses the money matters to you.`,
              did: `You'd return a lost wallet's $400 if the owner lived in a low-income neighborhood.` },
            { id: 'Q2-FUB-B', text: `I'd still keep it. My rent is due either way.`, nudges: { CI: -3 },
              note: `Even if the owner lives in a low-income neighborhood, you'd keep the $400 from their wallet. Your rent comes first.`,
              did: `You'd keep a lost wallet's $400 even if the owner lived in a low-income neighborhood.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'Q2-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // D4 ────────────────────────────────────────────────────────────
    {
      id: 'D4', world: 'coast', title: `The Stranded Stranger`, scene: 'busstop', weight: 'medium',
      steps: {
        trunk: {
          setup: `Your phone is dead. They're upset, not in danger.`,
          q: `You're driving to the airport for a flight you can't miss. At a bus stop in heavy rain, a stranger sits alone, clearly upset. The last bus is gone. Driving them home means you'll miss your flight. Do you stop?`,
          answers: [
            { id: 'D4-A', text: `Stop. I can't just drive past`, nudges: { CI: 2, HT: 1 },
              note: `You'd miss an important flight to help an upset stranger stranded in the rain. You can't drive past someone who needs help.`,
              did: `You'd stop for a stranger stranded at a bus stop in the rain, though it meant missing an important flight.` },
            { id: 'D4-B', text: `Keep driving. I can't miss this flight`, nudges: { CI: -2, HT: -1 },
              note: `You'd drive past an upset stranger stranded in the rain to make your flight. They aren't in danger, and your flight matters.`,
              did: `You'd drive past a stranger stranded at a bus stop in the rain to make an important flight.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The stranger still isn't in danger. The cost to you just grew.`,
          q: `A new ticket would cost $1,200, money you can't spare.`,
          answers: [
            { id: 'D4-FUA2-A', text: `I still stop.`, nudges: { CI: 2, HT: 1 },
              note: `Even if a new ticket cost $1,200 you can't spare, you'd stop for an upset stranger stranded in the rain.`,
              did: `You'd stop for a stranger stranded at a bus stop in the rain, even if a new ticket cost $1,200 you couldn't spare.` },
            { id: 'D4-FUA2-B', text: `Then I keep driving.`, nudges: { CI: -2 },
              note: `You'd miss an important flight for an upset stranger in the rain, but not if it cost you $1,200 you can't spare.`,
              did: `You'd drive past a stranger stranded at a bus stop in the rain if stopping cost you $1,200 you couldn't spare.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Same rain, same flight. Now you see who it is.`,
          q: `In your mirror, you see the stranger is about 15.`,
          answers: [
            { id: 'D4-FUB-A', text: `Then I turn back.`, nudges: { CI: 2, HT: 2 },
              note: `You'd drive past an upset adult in the rain to make your flight, but not a 15-year-old. A child alone changes it for you.`,
              did: `You'd turn back for a stranded 15-year-old at a bus stop in the rain, though it meant missing an important flight.` },
            { id: 'D4-FUB-B', text: `I keep driving.`, nudges: { CI: -2, HT: -2 },
              note: `Even after seeing that the stranger at the bus stop is about 15, you'd keep driving to make your flight.`,
              did: `You'd keep driving past a stranded 15-year-old at a bus stop in the rain to make an important flight.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'D4-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B25 ───────────────────────────────────────────────────────────
    {
      id: 'B25', world: 'coast', title: `The Slaughterhouse Test`, scene: 'meat', weight: 'light',
      steps: {
        trunk: {
          setup: `Your own hands, every time you eat meat.`,
          q: `Imagine that to eat meat, you had to kill the animal yourself. Would you still eat meat?`,
          answers: [
            { id: 'B25-A', text: `Yes.`, nudges: { HT: -2 },
              note: `You'd kill an animal yourself to eat meat. If you eat it, you can face where it comes from.`,
              did: `You'd still eat meat if you had to kill the animal yourself.` },
            { id: 'B25-B', text: `No, I'd stop.`, nudges: { HT: 2 },
              note: `You'd stop eating meat if you had to kill the animal yourself. Being close to the killing would change your mind.`,
              did: `You'd stop eating meat if you had to kill the animal yourself.` },
            { id: 'B25-C', text: `I already don't.`, nudges: {},
              note: `You don't eat meat, so this choice is already made for you.`,
              did: `You already don't eat meat.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Same choice. Now you know the animal.`,
          q: `The animal is a pig. Pigs are about as smart as dogs, and this one seems to know what's coming.`,
          answers: [
            { id: 'B25-FUA-A', text: `I'd still do it.`, nudges: { HT: -2 },
              note: `Even knowing a pig is about as smart as a dog and seems to know what's coming, you'd kill it yourself to eat meat.`,
              did: `You'd kill a pig yourself to eat meat, even knowing it's about as smart as a dog and seems to know what's coming.` },
            { id: 'B25-FUA-B', text: `Then I'd stop.`, nudges: { HT: 2 },
              note: `You'd kill an animal yourself to eat meat, but not a pig as smart as a dog that seems to know what's coming.`,
              did: `You'd stop eating meat if you had to kill a pig yourself, knowing it's about as smart as a dog.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `In real life, someone else does the killing for you.`,
          q: `Knowing you couldn't kill the animal yourself, will you keep eating meat?`,
          answers: [
            { id: 'B25-FUB2-A', text: `Yes, I'll keep eating it.`, nudges: { CI: -1, HT: -1 },
              note: `You couldn't kill an animal yourself, but you'd keep eating meat that someone else killed.`,
              did: `You'd keep eating meat, though you couldn't kill the animal yourself.` },
            { id: 'B25-FUB2-B', text: `No, I'd stop.`, nudges: { HT: 2, OR: -1 },
              note: `You couldn't kill an animal yourself, so you'd stop eating meat, even though someone else does the killing.`,
              did: `You'd stop eating meat because you couldn't kill the animal yourself.` },
          ],
        },
        fuC: {
          weight: 1.5,
          setup: `No animal is harmed. Nothing else changes.`,
          q: `Meat grown in a lab, with no animal harmed, tastes exactly the same. Would you eat it?`,
          answers: [
            { id: 'B25-FUC2-A', text: `Yes. No animal is harmed.`, nudges: { OR: 2 },
              note: `You don't eat meat, but you'd eat lab-grown meat that harms no animal. The harm was what mattered to you.`,
              did: `You'd eat lab-grown meat that harms no animal, though you don't eat meat now.` },
            { id: 'B25-FUC2-B', text: `No. I still wouldn't.`, nudges: { OR: -2 },
              note: `You don't eat meat, and you wouldn't eat lab-grown meat either, even with no animal harmed.`,
              did: `You wouldn't eat lab-grown meat, even with no animal harmed.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B25-A' ? 'fuA' : picks.trunk === 'B25-B' ? 'fuB' : 'fuC';
        return null;
      },
    },

    // D2 ────────────────────────────────────────────────────────────
    {
      id: 'D2', world: 'coast', title: `The Neighbor's Rent`, scene: 'donor', weight: 'medium',
      steps: {
        trunk: {
          setup: `The charity's numbers are reliable. Your neighbor has no other way.`,
          q: `You have $1,000 to give. A proven charity would use it to protect about 200 children from malaria. Or you can give it to your neighbor, a single parent who is $1,000 short on rent. Who gets it?`,
          answers: [
            { id: 'D2-A', text: `The charity. More lives protected`, nudges: { OR: 2, LP: -2, HT: -1 },
              note: `You'd give $1,000 to protect 200 faraway children from malaria rather than cover your neighbor's rent. More lives count for more, wherever they are.`,
              did: `You'd give $1,000 to protect 200 children from malaria rather than cover your neighbor's rent.` },
            { id: 'D2-B', text: `My neighbor. I can see exactly what it does`, nudges: { HT: 2, LP: 2 },
              note: `You'd give $1,000 to cover your neighbor's rent rather than protect 200 children from malaria far away. You'd rather help someone you can see.`,
              did: `You'd give $1,000 to cover a struggling neighbor's rent rather than protect 200 children from malaria.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The charity's numbers haven't changed. Now your neighbor is at your door.`,
          q: `Your neighbor knocks and asks you for help, face to face.`,
          answers: [
            { id: 'D2-FUA-A', text: `I still give it to the charity.`, nudges: { OR: 2, HT: -2 },
              note: `Even with your neighbor at your door asking for help, you'd give $1,000 to protect 200 children from malaria. More lives count for more.`,
              did: `You'd give $1,000 to protect 200 children from malaria, even after your neighbor asked you face to face for rent money.` },
            { id: 'D2-FUA-B', text: `Then I help my neighbor.`, nudges: { HT: 2, LP: 2 },
              note: `You'd give $1,000 to protect 200 faraway children, until your neighbor asks you face to face. Then you'd cover their rent.`,
              did: `You'd give $1,000 to cover your neighbor's rent once they asked you face to face, rather than protect 200 children from malaria.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Your neighbor's need hasn't changed. The other side has grown.`,
          q: `It's not 200 children. It's 2,000.`,
          answers: [
            { id: 'D2-FUB-A', text: `I still help my neighbor.`, nudges: { HT: 2, LP: 2 },
              note: `Even if $1,000 could protect 2,000 children from malaria, you'd cover your neighbor's rent. You'd rather help someone you can see.`,
              did: `You'd give $1,000 to cover your neighbor's rent, even if the money could protect 2,000 children from malaria instead.` },
            { id: 'D2-FUB-B', text: `Then the charity.`, nudges: { OR: 2, LP: -1 },
              note: `You'd help your neighbor over 200 faraway children, but not over 2,000. At some number, the faraway lives outweigh the one you can see.`,
              did: `You'd give $1,000 to protect 2,000 children from malaria rather than cover your neighbor's rent.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'D2-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // Q4 ────────────────────────────────────────────────────────────
    {
      id: 'Q4', world: 'coast', title: `The Saturday`, scene: 'shelter', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Each takes the whole day. The charity is proven.`,
          q: `You have one free Saturday. You can volunteer at a local shelter, or work an extra shift and give all the pay to a charity that helps far more people. Which do you do?`,
          answers: [
            { id: 'Q4-A', text: `Volunteer. Being there matters most`, nudges: { HT: 2, LP: 1 },
              note: `You'd spend your free Saturday at a local shelter rather than earn money for a charity that helps more people. Being there in person matters to you.`,
              did: `You'd volunteer at a local shelter on your free Saturday rather than work and give the pay to a charity that helps more people.` },
            { id: 'Q4-B', text: `Work and donate. More people get helped`, nudges: { OR: 2, LP: -2, HT: -1 },
              note: `You'd work an extra shift and give the pay to a charity rather than volunteer at a local shelter. Helping more people beats being there in person.`,
              did: `You'd work an extra shift on your free Saturday and give the pay to a charity rather than volunteer at a local shelter.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The shelter is fine either way. You'd still be there in person.`,
          q: `The shelter has more volunteers than it needs that Saturday. You'd spend the day sorting donated clothes in a back room.`,
          answers: [
            { id: 'Q4-FUA2-A', text: `I still volunteer.`, nudges: { HT: 2, CI: -1 },
              note: `Even if the shelter had more volunteers than it needed, you'd spend your Saturday there rather than earn money for a charity. Being there in person matters to you.`,
              did: `You'd volunteer at a shelter that had more volunteers than it needed, rather than work and give the pay to a charity.` },
            { id: 'Q4-FUA2-B', text: `Then I work and donate.`, nudges: { OR: 2, LP: -1 },
              note: `You'd volunteer at a local shelter, but not if it already had more help than it needed. Then you'd work and give the pay to a charity.`,
              did: `You'd work and give the pay to a charity once you learned the local shelter had more volunteers than it needed.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `If you go, there's no shift and no donation.`,
          q: `The shelter calls. They're short-staffed, and if you don't come, someone will go without a bed tonight.`,
          answers: [
            { id: 'Q4-FUB-A', text: `I go to the shelter`, nudges: { HT: 3 },
              note: `You'd give up your shift and the donation once the shelter calls and you know someone would go without a bed tonight.`,
              did: `You'd go to a short-staffed shelter instead of working to donate, once you knew someone would otherwise go without a bed tonight.` },
            { id: 'Q4-FUB-B', text: `I still donate. More people need that money`, nudges: { OR: 2, HT: -2 },
              note: `Even knowing someone will go without a bed tonight, you'd work your shift and donate. The money helps more people.`,
              did: `You'd still work and donate, even knowing someone at a short-staffed shelter would go without a bed tonight.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'Q4-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B22 ───────────────────────────────────────────────────────────
    {
      id: 'B22', world: 'coast', title: `The 200-Year Deal`, scene: 'sapling', weight: 'light',
      steps: {
        trunk: {
          setup: `You'll never meet them. The cost is yours for life.`,
          q: `Pressing a button would give you 10% less money and comfort for the rest of your life. In 200 years, a million people you'll never meet would live noticeably better. Do you press it?`,
          answers: [
            { id: 'B22-A', text: `Yes.`, nudges: { CI: 3, LP: -1 },
              note: `You'd live on 10% less for the rest of your life so people born 200 years from now live better. People not yet born count to you.`,
              did: `You'd take 10% less money and comfort for life so a million people 200 years from now live better.` },
            { id: 'B22-B', text: `No.`, nudges: { CI: -2 },
              note: `You wouldn't give up 10% of your money and comfort for people who'll live 200 years from now. Your own life comes first.`,
              did: `You wouldn't take 10% less money and comfort for life so a million people 200 years from now live better.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The same 10%. Now it isn't only you.`,
          q: `Now everyone alive takes the same 10% cut, including people who are already poor. It happens only if most people vote yes. How do you vote?`,
          answers: [
            { id: 'B22-FUA-A', text: `Yes.`, nudges: { CI: 2, OR: 1 },
              note: `You'd vote for everyone alive, even the poorest, to take 10% less so people 200 years from now live better.`,
              did: `You'd vote for everyone alive, even the poorest, to take 10% less so people 200 years from now live better.` },
            { id: 'B22-FUA-B', text: `No.`, nudges: { CI: -1, OR: -1 },
              note: `You'd take 10% less yourself for people 200 years from now, but you wouldn't vote to make everyone else, including the poorest, do the same.`,
              did: `You'd vote against everyone alive, including the poorest, taking 10% less for people 200 years from now.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Same button, same cost to you.`,
          q: `Your own great-great-grandchildren would be among the million.`,
          answers: [
            { id: 'B22-FUB-A', text: `Then I press it.`, nudges: { LP: 2 },
              note: `You wouldn't give up 10% for strangers 200 years from now, but you would for your own descendants.`,
              did: `You'd take 10% less money and comfort for life if your own great-great-grandchildren were among a million people who'd live better 200 years from now.` },
            { id: 'B22-FUB-B', text: `Still no.`, nudges: { CI: -2 },
              note: `Even if your own great-great-grandchildren would live better, you wouldn't take 10% less for the rest of your life.`,
              did: `You wouldn't take 10% less money and comfort for life, even for your own great-great-grandchildren 200 years from now.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B22-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // D12 ───────────────────────────────────────────────────────────
    {
      id: 'D12', world: 'coast', title: `The Bonus Pool`, scene: 'bonus', weight: 'medium',
      steps: {
        trunk: {
          setup: `The numbers are clear. Everyone knows who did what.`,
          q: `You manage a team of five and have one bonus pool to divide. Your best performer produced more than the other four combined. The other four all worked hard. How do you divide it?`,
          answers: [
            { id: 'D12-A', text: `Most of it to the best performer. Reward what they produced`, nudges: { CI: -2 },
              note: `You'd give most of a team bonus to the one person who produced the most. Rewards should follow results.`,
              did: `You'd give most of a team bonus to the best performer, who produced more than the other four combined.` },
            { id: 'D12-B', text: `Evenly. Everyone gave their full effort`, nudges: { CI: 2 },
              note: `You'd split a team bonus evenly, though one person produced more than the other four combined. Everyone worked hard, so everyone gets the same.`,
              did: `You'd split a team bonus evenly, though one person produced more than the other four combined.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Their results were real. So was their head start.`,
          q: `You learn the best performer was handed the biggest clients by chance. The other four never had that shot.`,
          answers: [
            { id: 'D12-FUA-A', text: `I still give them most of it.`, nudges: { CI: -2 },
              note: `Even knowing your best performer got the biggest clients by chance, you'd give them most of the bonus. Rewards follow results, however they came.`,
              did: `You'd give most of a team bonus to the best performer, even knowing they were handed the biggest clients by chance.` },
            { id: 'D12-FUA-B', text: `Then I split it evenly.`, nudges: { CI: 2 },
              note: `You'd reward the best performer's results, until you learn chance handed them the biggest clients. Then you'd split the bonus evenly.`,
              did: `You'd split a team bonus evenly once you learned the best performer was handed the biggest clients by chance.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `The threat is real. Replacing them would take a year.`,
          q: `Your best performer says they'll quit if it's split evenly. Losing them would sink the team next year.`,
          answers: [
            { id: 'D12-FUB-A', text: `I change the split`, nudges: { OR: 2, CI: -1 },
              note: `You'd split a team bonus evenly, until your best performer threatens to quit and sink the team. Then you'd give them more.`,
              did: `You'd give your best performer more of a team bonus you meant to split evenly, once they threatened to quit.` },
            { id: 'D12-FUB-B', text: `I keep it even`, nudges: { OR: -2, CI: 1 },
              note: `Even if your best performer quits and the team sinks next year, you'd keep the bonus split evenly.`,
              did: `You'd keep a team bonus split evenly, even if your best performer quit and the team sank next year.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'D12-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // D9 ────────────────────────────────────────────────────────────
    {
      id: 'D9', world: 'coast', title: `The Two Programs`, scene: 'programs', weight: 'medium',
      steps: {
        trunk: {
          setup: `The numbers are reliable. Splitting the money would sink both.`,
          q: `Your small nonprofit must close one of two programs. Mentoring changes 5 kids' lives deeply. You built it and know them all. Tutoring helps 200 kids a little. Which do you close?`,
          answers: [
            { id: 'D9-A', text: `Mentoring. 200 kids outweigh 5`, nudges: { OR: 2, HT: -1, LP: -1 },
              note: `You'd close the mentoring program you built for 5 kids you know, to keep tutoring for 200. More kids helped counts for more.`,
              did: `You'd close a mentoring program you built for 5 kids you know, to keep tutoring that helps 200 kids a little.` },
            { id: 'D9-B', text: `Tutoring. Deep change matters more`, nudges: { HT: 2, LP: 2, OR: -1 },
              note: `You'd close tutoring for 200 kids to keep mentoring 5 kids you know. Changing a few lives deeply matters more to you than helping many a little.`,
              did: `You'd close tutoring that helps 200 kids a little, to keep mentoring 5 kids you know.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `The numbers are the same. Now you know more about one of the 5.`,
          q: `One of the 5 kids has no one else. Without mentoring, they'll likely drop out of school.`,
          answers: [
            { id: 'D9-FUA2-A', text: `I still close mentoring.`, nudges: { OR: 2, HT: -2 },
              note: `Even knowing one of the 5 kids you mentor would likely drop out without it, you'd close mentoring to keep tutoring for 200.`,
              did: `You'd close a mentoring program for 5 kids, even knowing one of them would likely drop out of school without it.` },
            { id: 'D9-FUA2-B', text: `Then I close tutoring instead.`, nudges: { HT: 2, OR: -1 },
              note: `You'd close mentoring to help 200 kids a little, until one of the 5 kids would likely drop out without it. Then you'd keep mentoring.`,
              did: `You'd close tutoring for 200 kids to keep mentoring once you learned one of the 5 kids would likely drop out without it.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Same two programs. Only your part in it changes.`,
          q: `What if someone else had built mentoring, and you'd never met the 5 kids?`,
          answers: [
            { id: 'D9-FUB2-A', text: `I'd still close tutoring.`, nudges: { HT: 1, OR: -1, LP: -1 },
              note: `Even if you'd never met the 5 kids, you'd keep mentoring and close tutoring for 200. Changing a few lives deeply matters more to you.`,
              did: `You'd close tutoring for 200 kids to keep mentoring 5 kids, even if you'd never met them.` },
            { id: 'D9-FUB2-B', text: `Then I'd close mentoring.`, nudges: { LP: 2 },
              note: `You'd keep mentoring 5 kids you know over tutoring for 200, but not if you'd never met them. Knowing them was what decided it.`,
              did: `You'd close a mentoring program for 5 kids over tutoring for 200 if you'd never met the 5 kids.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'D9-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B20 ───────────────────────────────────────────────────────────
    {
      id: 'B20', world: 'coast', title: `The Weapons Job`, scene: 'crane', weight: 'heavy',
      steps: {
        trunk: {
          setup: `You're against the project. It gets built either way.`,
          q: `You're offered a job designing weapons systems. The pay would clear your family's debts. You're against the project, but if you say no, it goes to someone more careless, and more civilians will likely be hurt. Do you take the job?`,
          answers: [
            { id: 'B20-A', text: `Yes. Better me than someone worse.`, nudges: { OR: 3, LP: 1 },
              note: `You'd design weapons for a project you're against, because someone more careless would hurt more civilians. Making the harm smaller matters more to you than staying out of it.`,
              did: `You'd take a weapons design job you're against, so that someone more careless doesn't get it.` },
            { id: 'B20-B', text: `No. I won't put my hands on it.`, nudges: { OR: -3 },
              note: `You'd turn down a weapons job you're against, even knowing someone more careless would get it and more civilians would likely be hurt. You won't take part.`,
              did: `You'd turn down a weapons design job you're against, though someone more careless would get it and hurt more civilians.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `You did your job well. The weapon worked as designed.`,
          q: `Your first design is used in a strike that kills civilians. Do you stay?`,
          answers: [
            { id: 'B20-FUA-A', text: `I stay. Someone worse would kill more.`, nudges: { OR: 3 },
              note: `Even after your first design is used in a strike that kills civilians, you'd stay in the weapons job. A more careless designer would kill more.`,
              did: `You'd stay in a weapons design job after your first design was used in a strike that killed civilians.` },
            { id: 'B20-FUA-B', text: `I quit.`, nudges: { OR: -2, HT: 2 },
              note: `You took a weapons job to make the harm smaller, but once your own design kills civilians, you'd quit.`,
              did: `You'd quit a weapons design job once your first design was used in a strike that killed civilians.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `The job is still yours if you want it.`,
          q: `Without the pay, your family will lose their home.`,
          answers: [
            { id: 'B20-FUB-A', text: `I still say no.`, nudges: { OR: -3, LP: -1 },
              note: `Even if your family loses their home, you'd turn down a weapons job you're against. You won't take part.`,
              did: `You'd turn down a weapons design job you're against, even if your family lost their home without the pay.` },
            { id: 'B20-FUB-B', text: `Then I take the job.`, nudges: { LP: 2, OR: 1 },
              note: `You'd turn down a weapons job you're against, until your family would lose their home. Then you'd take it.`,
              did: `You'd take a weapons design job you're against if your family would otherwise lose their home.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B20-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B19 ───────────────────────────────────────────────────────────
    {
      id: 'B19', world: 'coast', title: `The Kidney`, scene: 'kidney', weight: 'heavy',
      steps: {
        trunk: {
          setup: `A stranger. Six painful weeks, and a small risk for life.`,
          q: `You learn you're a match for a stranger who will die without a kidney. The surgery is safe, but it means six weeks of painful recovery and a small lifelong risk. Honestly, do you donate?`,
          answers: [
            { id: 'B19-A', text: `Yes.`, nudges: { CI: 3 },
              note: `You'd give a kidney to a stranger, with six weeks of pain and a small risk for the rest of your life. Saving their life is worth that to you.`,
              did: `You'd donate a kidney to a stranger who would die without it.` },
            { id: 'B19-B', text: `No.`, nudges: { CI: -2 },
              note: `You wouldn't give a kidney to a stranger, even to save their life. Six weeks of pain and a lifelong risk is too much to ask of yourself.`,
              did: `You wouldn't donate a kidney to a stranger who would die without it.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Same match, same surgery. Now you know their past.`,
          q: `The stranger served 20 years for murder and was released last year.`,
          answers: [
            { id: 'B19-FUA-A', text: `Still yes.`, nudges: { OR: 2, CI: 1 },
              note: `Even knowing the stranger served 20 years for murder, you'd give them your kidney. A life is a life, whatever they did.`,
              did: `You'd still donate a kidney to a stranger who served 20 years for murder.` },
            { id: 'B19-FUA-B', text: `No.`, nudges: { OR: -2, CI: -1 },
              note: `You'd give a kidney to a stranger, but not to one who served 20 years for murder. What someone has done decides whether you'd make that sacrifice for them.`,
              did: `You wouldn't donate a kidney to a stranger who served 20 years for murder.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Same match, same surgery. Now you know who it is.`,
          q: `The stranger is 8 years old.`,
          answers: [
            { id: 'B19-FUB-A', text: `Then I donate.`, nudges: { CI: 2, HT: 2 },
              note: `You wouldn't give a kidney to an adult stranger, but you would to an 8-year-old who would die without it.`,
              did: `You'd donate a kidney to an 8-year-old stranger who would die without it.` },
            { id: 'B19-FUB-B', text: `Still no.`, nudges: { CI: -3 },
              note: `Even if the stranger who needs your kidney is 8 years old, you wouldn't donate. The pain and the lifelong risk are too much to ask of yourself.`,
              did: `You wouldn't donate a kidney to a stranger, even an 8-year-old who would die without it.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B19-A' ? 'fuA' : 'fuB';
        return null;
      },
    },

    // B23 ───────────────────────────────────────────────────────────
    {
      id: 'B23', world: 'coast', title: `The Happy City`, scene: 'happycity', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Outside the city, life is poor and hard. Inside, one hidden child pays for everyone.`,
          q: `You live in a city where everyone is healthy and happy. The city's good fortune depends on one child kept suffering alone in a basement. If the child is freed, sickness and hunger come back for everyone. What do you do?`,
          answers: [
            { id: 'B23-A', text: `Stay. Leaving wouldn't help the child.`, nudges: { OR: 2, HT: -1, SD: 1 },
              note: `You'd stay in a happy city built on one child's suffering, because leaving wouldn't help the child. You judge by what your choice would change.`,
              did: `You'd stay in a happy city whose good fortune depends on one child suffering alone.` },
            { id: 'B23-B', text: `Walk away. I can't live on that.`, nudges: { OR: -2, CI: -1 },
              note: `You'd leave a happy city built on one child's suffering, though leaving wouldn't help the child. You won't live off that cruelty.`,
              did: `You'd leave a happy city whose good fortune depends on one child suffering alone, though leaving wouldn't help the child.` },
            { id: 'B23-C', text: `Free the child, whatever it costs.`, nudges: { SD: -2, HT: 2, OR: -1 },
              note: `You'd free a suffering child, even if it ended everyone else's good fortune. You won't accept a happy life built on one child's pain.`,
              did: `You'd free a child kept suffering for a city's good fortune, even if it ended the good fortune for everyone.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Same city, same happiness. Now the cost is a hundred children.`,
          q: `It's not one child. It's a hundred.`,
          answers: [
            { id: 'B23-FUA-A', text: `I'd still stay.`, nudges: { HT: -2, SD: 1 },
              note: `Even if a hundred children were kept suffering for the city's good fortune, you'd stay.`,
              did: `You'd stay in a happy city even if its good fortune depended on a hundred children suffering.` },
            { id: 'B23-FUA-B', text: `Then I'd leave.`, nudges: { HT: 2, OR: -1 },
              note: `You'd stay in a happy city built on one child's suffering, but not on a hundred children's. Then you'd walk away, though leaving wouldn't free them.`,
              did: `You'd leave a happy city if its good fortune depended on a hundred children suffering, though you'd stay for one.` },
            { id: 'B23-FUA-C', text: `Then I'd free them.`, nudges: { HT: 2, SD: -2 },
              note: `You'd stay in a happy city built on one child's suffering, but not on a hundred children's. Then you'd free them, whatever it cost everyone else.`,
              did: `You'd free a hundred children kept suffering for a city's good fortune, though you'd stay if it were one child.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `Outside the city there's hunger and sickness. The child stays where they are.`,
          q: `Leaving means your own children grow up poor and often sick, and the child in the basement suffers just the same.`,
          answers: [
            { id: 'B23-FUB-A', text: `I still leave.`, nudges: { OR: -3 },
              note: `Even if your own children grow up poor and sick outside the city, you'd leave. You won't live on a child's suffering, though leaving doesn't help them.`,
              did: `You'd leave a happy city built on one child's suffering, even if your own children grew up poor and sick outside.` },
            { id: 'B23-FUB-B', text: `Then I stay.`, nudges: { LP: 2, OR: 1 },
              note: `You'd walk away from a city built on one child's suffering, but not if your own children paid for it. Then you'd stay.`,
              did: `You'd stay in a happy city built on one child's suffering rather than raise your own children poor and sick outside.` },
          ],
        },
        fuC: {
          weight: 1.5,
          setup: `The good fortune ends the moment the child is free.`,
          q: `Freeing the child brings sickness back to the city. Hundreds will die, some of them children.`,
          answers: [
            { id: 'B23-FUC-A', text: `I still free the child.`, nudges: { OR: -3, SD: -1 },
              note: `Even if hundreds in the city would die, some of them children, you'd free the suffering child. You won't buy everyone's health with one child's pain.`,
              did: `You'd free a child kept suffering for a city's good fortune, even if hundreds would then die of sickness.` },
            { id: 'B23-FUC-B', text: `Then I leave the child there.`, nudges: { OR: 3, HT: -1 },
              note: `You'd free a suffering child, until it would cost hundreds of lives. Then you'd leave the child where they are.`,
              did: `You'd leave a child suffering for a city's good fortune if freeing them would cost hundreds of lives.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B23-A' ? 'fuA' : picks.trunk === 'B23-B' ? 'fuB' : 'fuC';
        return null;
      },
    },

    // B15 ───────────────────────────────────────────────────────────
    {
      id: 'B15', world: 'coast', title: `The Lifeboat`, scene: 'lifeboat', weight: 'heavy',
      steps: {
        trunk: {
          setup: `Nine people, room for eight. Someone has to go.`,
          q: `A lifeboat holds 8 people, but 9 are on it. If no one leaves, it sinks and everyone dies. You're one of the 9. What do you say?`,
          answers: [
            { id: 'B15-A', text: `We draw lots. Everyone takes the same chance.`, nudges: { OR: -2, SD: 1 },
              note: `In a sinking lifeboat, you'd have everyone draw lots to decide who goes. No one gets to judge whose life is worth less.`,
              did: `You'd have everyone in an overloaded lifeboat draw lots to decide who goes over the side.` },
            { id: 'B15-B', text: `The person least likely to survive should go.`, nudges: { OR: 3, HT: -2 },
              note: `In a sinking lifeboat, you'd send over the person least likely to survive anyway. Saving the most lives decides it for you.`,
              did: `You'd send the person least likely to survive over the side of an overloaded lifeboat.` },
            { id: 'B15-C', text: `I'll go.`, nudges: { CI: 3 },
              note: `In a sinking lifeboat, you'd go over the side yourself so the other eight live.`,
              did: `You'd go over the side of an overloaded lifeboat yourself so the other eight live.` },
          ],
        },
        fuA: {
          weight: 1.5,
          setup: `Everyone agreed to the lots. The lot fell to you.`,
          q: `The lots are drawn. It's you. You have two small children waiting at home.`,
          answers: [
            { id: 'B15-FUA2-A', text: `I go. That was the deal.`, nudges: { SD: 2, OR: -1, LP: -1 },
              note: `When the lifeboat lots fall to you, you go. You keep to a fair deal even when it costs you your life.`,
              did: `You'd go over the side of an overloaded lifeboat when the lots you agreed to fell to you.` },
            { id: 'B15-FUA2-B', text: `I won't go. I ask for another draw.`, nudges: { SD: -2, LP: 2, CI: -1 },
              note: `You'd draw lots in a sinking lifeboat, but when the lot falls to you and you have small children at home, you'd refuse and ask for another draw.`,
              did: `You'd refuse to go over the side of an overloaded lifeboat when the lots you agreed to fell to you, because you have small children at home.` },
          ],
        },
        fuB: {
          weight: 1.5,
          setup: `The same rule. Now it points at you.`,
          q: `The doctor on board says the one least likely to survive is you.`,
          answers: [
            { id: 'B15-FUB-A', text: `Then I go.`, nudges: { OR: 2, CI: 2 },
              note: `You'd send over the person least likely to survive, and when that's you, you'd go. You hold yourself to the same rule.`,
              did: `You'd go over the side of an overloaded lifeboat yourself when the doctor said you were the least likely to survive.` },
            { id: 'B15-FUB-B', text: `Then we should draw lots.`, nudges: { CI: -3, OR: -1 },
              note: `You'd send over the person least likely to survive, until that person is you. Then you'd want lots drawn instead.`,
              did: `You'd ask for lots to be drawn in an overloaded lifeboat once the doctor said you were the least likely to survive.` },
          ],
        },
        fuC: {
          weight: 1.5,
          setup: `You offered to go. The others need you to stay.`,
          q: `The others say you're the strongest rower, and the boat needs you to reach land.`,
          answers: [
            { id: 'B15-FUC-A', text: `I still go.`, nudges: { HT: 2, OR: -1, CI: 1 },
              note: `Even when the others say the boat needs its strongest rower, you'd go over the side yourself. You won't let someone else die in your place.`,
              did: `You'd still go over the side of an overloaded lifeboat, though the others said the boat needed you as its strongest rower.` },
            { id: 'B15-FUC-B', text: `Then I stay, and someone else goes.`, nudges: { OR: 3, HT: -1 },
              note: `You'd go over the side yourself, until the boat needs you to reach land. Then you'd stay and let someone else go.`,
              did: `You'd stay in an overloaded lifeboat as its strongest rower and let someone else go over the side.` },
          ],
        },
      },
      next: function (step, picks) {
        if (step === 'trunk') return picks.trunk === 'B15-A' ? 'fuA' : picks.trunk === 'B15-B' ? 'fuB' : 'fuC';
        return null;
      },
    },
  ];

  C.questions.push(...questions);

  // Coast answers that also count as evidence for tendencies the park, the Neighborhood and the City already have.
  const more = {
    'distance': { support: ['D2-A', 'D2-FUA-A', 'D2-FUB-B', 'Q4-B', 'Q4-FUA2-B', 'Q4-FUB-B', 'B22-A', 'B22-FUA-A'],
      against: ['D2-B', 'D2-FUA-B', 'D2-FUB-A', 'Q4-A', 'Q4-FUA2-A', 'Q4-FUB-A', 'B22-B'] },
    'count-numbers': { support: ['D9-A', 'D9-FUA2-A', 'D2-FUA-A', 'D2-FUB-B', 'Q4-FUA2-B', 'Q4-FUB-B', 'B15-B', 'B15-FUC-B', 'B20-A', 'B20-FUA-A', 'B23-A', 'B23-FUC-B'],
      against: ['D9-B', 'D9-FUA2-B', 'D9-FUB2-A', 'D2-FUB-A', 'Q4-FUB-A', 'B20-B', 'B20-FUA-B', 'B20-FUB-A', 'B15-A', 'B23-FUB-A', 'B23-FUC-A'] },
    'gives-it-up': { support: ['D4-A', 'D4-FUA2-A', 'D4-FUB-A', 'B22-A', 'Q2-FUB-A', 'B19-A', 'B19-FUB-A'], against: ['D4-B', 'D4-FUB-B', 'B22-B', 'Q2-FUB-B', 'B19-B', 'B19-FUB-B'] },
    'own-gain': { support: ['Q2-B', 'Q2-FUB-B', 'Q2-FUA-B'], against: ['Q2-A', 'Q2-FUB-A', 'Q2-FUA-A'] },
    'follow-rules': { support: ['Q2-A', 'Q2-FUA-A', 'B15-FUA2-A'], against: ['Q2-B', 'Q2-FUA-B', 'B15-FUA2-B', 'B23-C', 'B23-FUA-C'] },
    'keeps-word': { support: ['B15-FUA2-A'], against: ['B15-FUA2-B'] },
    'own-first': { support: ['B20-FUB-B', 'B23-FUB-B', 'B15-FUA2-B', 'B22-FUB-A'], against: ['B20-FUB-A', 'B23-FUB-A'] },
    'watch-not-act': { support: ['B20-B', 'B20-FUA-B', 'B20-FUB-A', 'B23-B', 'B23-FUA-B', 'B23-FUB-A'], against: ['B20-A', 'B20-FUA-A', 'B23-C', 'B23-FUA-C'] },
    'step-in': { support: ['B23-C', 'B23-FUA-C', 'B23-FUC-A'], against: ['B23-A', 'B23-FUC-B'] },
    'break-unjust': { support: ['B23-C', 'B23-FUA-C', 'B23-FUC-A'], against: ['B23-A', 'B23-FUA-A'] },
    'second-chances': { support: ['B19-FUA-A'], against: ['B19-FUA-B'] },
    'must-pay': { support: ['B19-FUA-B'], against: ['B19-FUA-A'] },
  };
  Object.entries(more).forEach(([id, m]) => { const t = C.tendencies.find(x => x.id === id); if (!t) throw new Error('unknown tendency ' + id); t.support.push(...(m.support || [])); t.against = (t.against || []).concat(m.against || []); });

  C.tendencies.push(
    { id: 'risks-for-strangers', text: `You'd put yourself at risk for a stranger.`, share: `I'd put myself at risk for a stranger.`,
      detail: `You'd accept pain or danger to yourself so that someone you've never met can live or be safe.`,
      support: ['B19-A', 'B19-FUA-A', 'B19-FUB-A', 'B15-C', 'B15-FUA2-A', 'B15-FUB-A', 'B15-FUC-A', 'Q10-B', 'Q10-FUB-A', 'Q10-FUA-A'],
      against: ['B19-B', 'B19-FUB-B', 'B15-FUA2-B', 'B15-FUB-B', 'Q10-C', 'Q10-FUB-B', 'Q10-FUA-B'],
      min: 2, priority: 2, protect: ['strangers in danger'], trade: ['your own safety'] },
    { id: 'equal-share', text: `You give everyone an equal share.`, share: `I give everyone an equal share.`,
      detail: `When there isn't enough to go around, you'd rather split it evenly or draw lots than decide who deserves more.`,
      support: ['B15-A', 'B15-FUA2-A', 'D12-B', 'D12-FUB-B', 'D12-FUA-B', 'B13-A', 'B13-FU-B'], against: ['B15-B', 'D12-A', 'D12-FUA-A', 'D12-FUB-A', 'B13-B'],
      min: 2, priority: 3, protect: ['an equal chance for everyone'], trade: ['rewarding who did more'] },
    { id: 'animals-count', text: `You take animals' lives seriously.`, share: `Animals' lives matter to me.`,
      detail: `You won't harm animals lightly, and an animal you love can count as much to you as a person.`,
      support: ['B25-B', 'B25-FUA-B', 'B25-FUB2-B', 'B25-FUC2-A', 'B24-B', 'B24-FU-B'], against: ['B25-A', 'B25-FUA-A', 'B25-FUB2-A'],
      min: 2, priority: 4, protect: ['animals'], trade: ['your own convenience'] },
    { id: 'near-first', text: `You help the people in front of you first.`, share: `I help the people in front of me first.`,
      detail: `When you could help people nearby or more people far away, you choose the ones you can see and know.`,
      support: ['D2-B', 'D2-FUA-B', 'D2-FUB-A', 'Q4-A', 'Q4-FUA2-A', 'Q4-FUB-A', 'D9-B', 'D9-FUA2-B', 'D9-FUB2-A', 'B18-A'],
      against: ['D2-A', 'D2-FUA-A', 'D2-FUB-B', 'Q4-B', 'Q4-FUA2-B', 'Q4-FUB-B', 'D9-A', 'D9-FUA2-A', 'B18-B'],
      min: 2, priority: 4, protect: ['the people in front of you'], trade: ['helping more people far away'] },
  );

  // All ids in `when` must be picked.
  C.tensions.push(
    { when: ['Q1-A', 'B15-A'], text: `You'd pull the lever to save five, but in a sinking lifeboat you'd draw lots rather than choose who goes.` },
    { when: ['Q1-B', 'B15-B'], text: `You wouldn't pull the lever to save five, but in a sinking lifeboat you'd send over the person least likely to survive.` },
    { when: ['B18-B', 'D2-B'], text: `You think a faraway child counts as much as a drowning one in front of you, but you'd give $1,000 to your neighbor's rent rather than protect 200 children from malaria.` },
    { when: ['B18-A', 'D2-A'], text: `You think being right there makes a drowning child yours to save, but you'd give $1,000 to faraway children rather than cover your neighbor's rent.` },
    { when: ['B21-B', 'Q2-B'], text: `You'd turn down $1 million that costs a stranger $1,000, but you'd keep the $400 from a stranger's lost wallet.` },
    { when: ['B22-A', 'B22-FUA-B'], text: `You'd live on 10% less for people born 200 years from now, but you'd vote against everyone alive doing the same.` },
    { when: ['B24-B', 'B25-A'], text: `You'd save your dog from a fire before a stranger, but you'd kill an animal yourself to eat meat.` },
    { when: ['B19-A', 'D4-B'], text: `You'd give a stranger your kidney, but you'd drive past a stranger stranded in the rain to make your flight.` },
    { when: ['Q1-A', 'B20-B'], text: `You'd pull the lever to save five, but you'd turn down a weapons job even though someone more careless would hurt more civilians.` },
    { when: ['Q6-B', 'D12-A'], text: `You'd give up a promotion for a colleague who needs it, but you'd give most of a team bonus to your best performer.` },
    { when: ['B33-B', 'B19-FUA-B'], text: `You wouldn't send a changed man to prison for a robbery at 19, but you wouldn't give your kidney to a stranger who served 20 years for murder.` },
    { when: ['B37-B', 'B15-FUA2-B'], text: `You'd keep your promise about a friend's bank card, even if it ends the friendship, but you'd refuse to go when the lifeboat lots you agreed to fall to you.` },
    { when: ['Q1-B', 'B20-FUA-A'], text: `You wouldn't pull the lever to save five, but you'd stay in a weapons job after your design killed civilians, because someone worse would kill more.` },
    { when: ['Q1-A', 'B23-FUC-A'], text: `You'd pull the lever to save five, but you'd free one suffering child even if hundreds in the city would die.` },
  );
})(typeof window !== 'undefined' ? window : globalThis);
