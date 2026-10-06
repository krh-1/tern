KEEP 3 / SHARPEN 16 / CUT 0

# Judge: the City (`game/content-city.js`, 19 questions)

**Bar applied:** the six checks in the brief: no escape answer, a thoughtful person must hesitate, follow-ups that fire for people who could flip and put pressure on both sides, reads in one pass with no leak, plain standalone notes and `did` lines, and nudges that move only what the choice reveals. Every follow-up step was checked, including those added on 2026-10-03 and 2026-10-04.

**How to read this:** each SHARPEN lists only what changes. Each change is tagged **[wording]** (setup, question or answer text, which is instrument text and needs your ruling), **[follow-up]** (a new or replaced follow-up step), **[copy]** (notes, `did` lines and titles) or **[scoring]** (nudges and tendency wiring). Anything not shown stays as it is. A new follow-up on a side that had none renames the old `fu` to `fuA` or `fuB`, as was done for B41, B03, Q10 and B34.

No question is cut. The trunks are mostly sound. The failures sit in the follow-ups and the details: two follow-ups contradict their own scene, one answer disguises a lie as an omission, one trunk is too easy, and seven questions still test only one side.

---

### Q11 The Autonomous Car: SHARPEN
The trunk and `fuB` work. `fuA` contradicts the trunk: the trunk has you set the rule "for every car", but `fuA` says "It costs the same as a car without this rule", so a car without it can't exist. Ask whether you'd keep the rule once your own children ride under it. That's the same test, and it fits the scene. In `fuB`, "Yes. Then swerve" flips because the passenger accepted the risk. That's a fairness reason, not counting lives, so OR+2 overstates it.

- **[follow-up] fuA**
  - setup: `Every car follows your rule, including the ones your family rides in.`
  - q: `Your own children will ride in these cars every day. Do you keep the rule?`
  - Q11-FUA-A: `Yes. Same rule for my family` (nudges unchanged)
  - Q11-FUA-B: `No. Then protect the passenger` (nudges unchanged)
- **[copy]** Q11-FUA-A note: `You'd keep a rule that has self-driving cars kill their passenger to save five, even with your own children riding in them every day.` did: `You'd keep self-driving cars set to sacrifice their passenger to save five pedestrians, even with your own children riding in them.`
- **[copy]** Q11-FUA-B note: `You'd have self-driving cars save the five, until your own children were the passengers. Then you'd change the rule to protect the passenger.` did: `You'd change the rule so self-driving cars protect their passenger once your own children would ride in them.`
- **[scoring]** Q11-FUB-A: `{ OR: 2, CI: 1 }` → `{ OR: 1, CI: 1 }`.

### B12 Two Drivers: SHARPEN
The setup leaks the answer. "Only luck differs" makes the case for "equally wrong" before the player chooses, and answer A repeats it ("The rest was luck"), while B gets no reason. Drop the argument from both places so the two answers stand level. People who say "worse" face no pressure. One fact tests whether they judge by outcome or by cause: the drinking didn't cause the crash.

- **[wording]** trunk setup: `Same drinks, same road, same care.`
- **[wording]** B12-A text: `Yes. They made the same choice.`
- **[follow-up] new fuB** (after B12-B; rename the old `fu` to `fuA`), weight 1.5
  - setup: `Same night, same road. One more fact about the child.`
  - q: `The child ran out so suddenly that a sober driver would have hit them too.`
  - B12-FUB-A: `The drunk driver still did worse` `{ OR: 2 }`. Note: `Even though the drinking didn't cause the crash, you think the driver who hit a child did worse. What actually happened counts for you.` did: `You think a drunk driver who hit a child did worse than a friend who drove the same way, even if a sober driver would have hit the child too.`
  - B12-FUB-B: `Then they did the same wrong` `{ OR: -1, HT: -1 }`. Note: `You judged the driver who hit a child more harshly, until you learned a sober driver would have hit the child too. Then both drivers did the same wrong.` did: `You think two friends who drove home after three drinks did the same wrong once you knew a sober driver would have hit the child too.`
- **[scoring]** `meant-not-outcome`: support + `B12-FUB-B`, against + `B12-FUB-A`.

### B03 The Reference Call: SHARPEN
The trunk is a real split, and `fuA` now tests the honest side. `fuB` probably fails the hesitation test. Once "a missed shift means someone goes without help" for elderly patients overnight, almost everyone who softened the reference will flip in seconds, so the step only finds the rare holdout. A lower stake that still lands on strangers keeps it hard. The current FUB-A note also says "patients would pay for it", which is a figure of speech.

- **[follow-up] fuB**
  - setup: `Now other people depend on this person showing up.`
  - q: `The job is at a daycare. When a worker doesn't show, families get turned away for the day.`
  - answers: text and nudges unchanged.
- **[copy]** B03-FUB-A note: `You'd leave out a former employee's problems to help them, but not for a daycare job where a missed shift turns families away. Then you'd tell the hiring manager.` did: `You'd tell a hiring manager about a former employee's unreliability once you knew the job was at a daycare where a missed shift turns families away.`
- **[copy]** B03-FUB-B note: `Even knowing families could be turned away from a daycare, you'd keep a former employee's problems out of the reference. You'd give the person you know their chance.` did: `You'd still leave a former employee's unreliability out of a reference for a daycare job where a missed shift turns families away.`

### B04 The Company Line: SHARPEN
The follow-up's pressure doesn't hold up. Telling the bakery the real reason doesn't make the order arrive sooner, so a careful player sees that the truth doesn't help them. The step then measures sympathy, not a reason. Answer A also carries its own excuse ("It's the company's line, not my lie"), which reads as self-deception and makes A look bad to pick honestly. Answer B says "bigger orders" where the scene says "bigger clients". The truth-tellers, who face the manager, face no further pressure. A job threat is the obvious test, and it gives `career-first` clean evidence.

- **[wording]** B04-A text: `"Yes, it's the supplier." I say what I was told.`
- **[wording]** B04-B text: `"No. We put bigger clients first."`
- **[follow-up] fuA** (rename `fu`; after B04-A)
  - setup: `Same question. Now the truth could help them.`
  - q: `The customer is a small bakery. If they knew the real reason, they'd order from a competitor today and save a wedding order.`
  - answers: text and nudges unchanged.
- **[copy]** B04-FUA-A did: `You'd still blame the supplier for a late order, even knowing the truth would let a small bakery save a wedding order.`
- **[copy]** B04-FUA-B note: `You'd repeat your company's excuse to most customers, but not when the truth would let a small bakery save a wedding order.` did: `You'd tell a small bakery the real reason their order was late, against your manager's instructions, so the bakery could save a wedding order.`
- **[follow-up] new fuB** (after B04-B), weight 1.5
  - setup: `Your manager has warned you before.`
  - q: `Last month your manager said one more mistake and you're fired.`
  - B04-FUB-A: `I still tell the truth.` `{ SD: -2, CI: 1 }`. Note: `Even with your job on the line, you'd tell a customer the real reason their order was late, in front of your manager.` did: `You'd tell a customer the real reason their order was late, in front of a manager who had warned they'd fire you.`
  - B04-FUB-B: `Then I say it's the supplier.` `{ CI: -2, SD: 1 }`. Note: `You'd tell a customer the truth about a late order, unless your manager had already warned they'd fire you. Then you'd blame the supplier.` did: `You'd blame the supplier for a late order once your manager had warned they'd fire you for one more mistake.`
- **[scoring]** `next`: B04-A → `fuA`, B04-B → `fuB`. `speaks-up-work` and `hard-truths`: support + `B04-FUB-A`, against + `B04-FUB-B`. `career-first`: support + `B04-FUB-B`, against + `B04-FUB-A`.

### B05 The Mistake No One Saw: SHARPEN
The trunk and the "still doubts themselves" follow-up are fine. That follow-up removes the stated reason for B, so whoever still says no is protecting themselves, and the step reveals exactly that. But "Yes, and apologize" faces no pressure, and as written it costs almost nothing. It's the answer people pick to feel good. Put a price on confessing.

- **[follow-up] new fuA** (after B05-A; rename the old `fu` to `fuB`), weight 1.5
  - setup: `Telling them now could cost you.`
  - q: `Your coworker is now your manager and decides your raise this year.`
  - B05-FUA-A: `I still tell them.` `{ OR: -2, CI: 1 }`. Note: `Even with your raise in their hands, you'd tell your manager that your old mistake cost them a promotion.` did: `You'd tell a coworker who now decides your raise that your mistake years ago cost them a promotion.`
  - B05-FUA-B: `Then I keep it to myself.` `{ CI: -2, OR: 1 }`. Note: `You'd tell a coworker your old mistake cost them a promotion, unless they now decided your raise. Then you'd keep quiet.` did: `You wouldn't tell a coworker your old mistake cost them a promotion once that coworker decided your raise.`
- **[scoring]** `owns-up`: support + `B05-FUA-A`, against + `B05-FUA-B`. `career-first`: support + `B05-FUA-B`, against + `B05-FUA-A`.

### B30 The Permit Fee: SHARPEN
The trunk is a fair split, and the job follow-up puts a real price on refusing. Payers, probably the larger group, face nothing. "That's how it works here" deserves one test: who pays the price for the custom.

- **[follow-up] new fuA** (after B30-A; rename the old `fu` to `fuB`), weight 1.5
  - setup: `Now you see who the custom leaves behind.`
  - q: `Your neighbor can't afford the "fee" and has waited a year for the same permit.`
  - B30-FUA-A: `I still pay.` `{ CI: -2, OR: 1 }`. Note: `Even knowing a neighbor who can't pay has waited a year for the same permit, you'd pay the official's "fee" for yours.` did: `You'd pay an official's cash "fee" abroad for a permit, even knowing a neighbor who can't pay has waited a year for the same permit.`
  - B30-FUA-B: `Then I refuse.` `{ CI: 2, SD: 1 }`. Note: `You'd pay an official's "fee" like everyone else, until you saw a neighbor who couldn't pay wait a year. Then you'd refuse.` did: `You'd refuse to pay an official's cash "fee" abroad once you saw a neighbor who couldn't pay wait a year for the same permit.`
- **[scoring]** `follow-rules`: support + `B30-FUA-B`, against + `B30-FUA-A`.

### B32 The Call-Up: SHARPEN
The trunk is strong, and "leave for good" costs enough to stay. The follow-up fails the hesitation test. Nearly everyone who refused a wrong war will say yes, in seconds, to defending against an invasion, so it only finds strict pacifists. Keep the leaders who started the wrong war in charge, and fighting becomes a real choice. People who serve face no pressure, though they're the ones who put duty above their own judgment. Test that with one legal but wrong order. In the old follow-up, "Defending my home is different" at OR+2 overstates the case: it's a judgment about which war is just, not about counting outcomes.

- **[follow-up] fuB** (rename `fu`; after B32-B or B32-C)
  - setup: `A different war. This time your country is invaded.`
  - q: `Your country has been invaded. The leaders who started the wrong war are still in charge. Would you fight?`
  - B32-FUB-A: `Yes. I'd fight to defend my home.` `{ LP: 1, SD: 1, OR: 1 }`. Note: `You wouldn't serve in a war you believe is wrong, but you'd fight if your country were invaded, even under the leaders who started that war.` did: `You'd fight to defend your invaded country, even under the leaders who started a war you believe is wrong.`
  - B32-FUB-B: `No. I still won't fight.` `{ SD: -1, OR: -2 }`. Note: `You wouldn't fight even when your country is invaded, while the leaders who started a wrong war are still in charge.` did: `You wouldn't fight for your invaded country under the leaders who started a war you believe is wrong.`
- **[follow-up] new fuA** (after B32-A), weight 1.5
  - setup: `You're serving. An order comes down.`
  - q: `Your unit is ordered to destroy a town's water supply. The order is legal, but families there will suffer.`
  - B32-FUA-A: `I follow the order.` `{ SD: 2, OR: 1 }`. Note: `You'd serve in a war you believe is wrong, and you'd follow a legal order to cut off a town's water, even though families there will suffer.` did: `You'd follow a legal order to destroy a town's water supply in a war you believe is wrong.`
  - B32-FUA-B: `I refuse, even if it means prison.` `{ SD: -3, OR: -1 }`. Note: `You'd serve when your country calls, but you'd refuse an order to cut off a town's water, even if refusing meant prison.` did: `You'd refuse a legal order to destroy a town's water supply, even if refusing meant prison.`
- **[scoring]** `next`: B32-A → `fuA`, B32-B or B32-C → `fuB`. `follow-rules`: support + `B32-FUA-A`, against + `B32-FUA-B`. `break-unjust`: support + `B32-FUA-B`, against + `B32-FUA-A`.

### B33 The Man Who Changed: SHARPEN
The trunk is a fair split, and the victim follow-up is a real flip. Only the people who would spare him face pressure. "Justice doesn't expire" faces none, though it's a slogan that's easy to say when it costs nothing. A cost that falls on innocent people tests it. (The forgiving-victim test is already used in B34, so it isn't used here.)

- **[follow-up] new fuA** (after B33-A; rename the old `fu` to `fuB`), weight 1.5
  - setup: `Prison would hit more people than him.`
  - q: `He's raising two young children alone. If he goes to prison, they lose the only parent they have at home.`
  - B33-FUA-A: `He should still go to prison.` `{ SD: 2, HT: -2 }`. Note: `Even if his two young children would be left without a parent at home, you think a man should go to prison for a robbery he committed at 19.` did: `You think a man should go to prison for a robbery at 19, even though he's raising two young children alone.`
  - B33-FUA-B: `Then no prison.` `{ HT: 2, OR: 1 }`. Note: `You'd send a man to prison for an old crime, unless it took away the only parent his two young children have at home.` did: `You wouldn't send a man to prison for a robbery at 19 once you knew he was raising two young children alone.`
- **[scoring]** `must-pay`: support + `B33-FUA-A`, against + `B33-FUA-B`. `second-chances`: support + `B33-FUA-B`, against + `B33-FUA-A`.

### B34 The Remorse Pill: SHARPEN
A hard trunk, and both follow-ups now put real pressure on their side. Two copy problems: "crime is cheap" is a figure of speech, used in the question, two notes and two `did` lines, and "unable to reoffend" is legal jargon. In scoring, refusing to punish one person as a warning to others is a rule about how a person may be treated. It isn't looking out for yourself, so CI-2 is misplaced.

- **[wording]** fuB q: `If they walk free, others may think they can get away with crime.`
- **[copy]** B34-FUB-A note: `You'd free someone who can never do it again, but not if it tells others they can get away with crime. Their sentence also protects everyone else.` did: `You'd make a person convicted of assault serve their sentence so others don't think they can get away with crime, even after a pill made them unable to commit assault again.`
- **[copy]** B34-FUB-B did: `You'd free a person convicted of assault who can never commit assault again, even if others might think they can get away with crime.`
- **[copy]** In B34-A, B34-B and B34-FUB-A `did`, replace `unable to reoffend` with `unable to commit assault again`.
- **[scoring]** B34-FUB-B: `{ CI: -2, OR: -1 }` → `{ OR: -2, CI: -1 }`.

### B35 The True Story: SHARPEN
"True, damaging information about them" is ambiguous. Players can't tell whether they're exposing what the person did or digging up an unrelated secret for revenge, and those are different moral acts. People will fill in whichever version makes their answer easy. Make it proof of what they did. That also makes "Yes" more defensible, so the trunk gets harder. People who wouldn't post face no pressure. A risk to other people is the right test for "not my role".

- **[wording]** trunk setup: `The police dropped it. Your proof is real.`
- **[wording]** trunk q: `Someone seriously hurt a person you love. The police looked into it, and nothing came of it. You have proof of what they did, and posting it anonymously would wreck their reputation. Do you post it?`
- **[copy]** B35-A did: `You'd anonymously post proof of what someone did to a person you love, after the police dropped the case.` B35-B did: `You wouldn't post proof of what someone did to a person you love, though the police dropped the case.` In both notes and in both FU `did` lines, replace `true, damaging information` / `damaging information` with `proof of what they did`.
- **[follow-up] new fuB** (after B35-B; rename the old `fu` to `fuA`), weight 1.5
  - setup: `Now other people could be at risk.`
  - q: `You learn they now coach a kids' sports team.`
  - B35-FUB-A: `Then I post it.` `{ SD: -2, CI: 2 }`. Note: `You'd leave punishment to others, until you learned the person who hurt someone you love now coaches children. Then you'd post the proof.` did: `You'd anonymously post proof of what someone did to a person you love once you learned they coach a kids' sports team.`
  - B35-FUB-B: `I still don't.` `{ SD: 2 }`. Note: `Even knowing they coach children, you wouldn't post proof of what the person who hurt someone you love did. Punishing them still isn't your job.` did: `You still wouldn't post proof of what someone did to a person you love, even knowing they coach a kids' sports team.`
- **[scoring]** `step-in`: support + `B35-FUB-A`, against + `B35-FUB-B`.

### B41 The Borrowed Credit: SHARPEN
The trunk fails the hesitation test. With no cost, "Make sure my boss knows" is the answer about 80% will give in two seconds. The raise is the only thing that makes this hard, and it's hidden in a follow-up only the correctors see. Move the raise into the trunk. Then test the correctors with a sharper cost: the coworker is their rival for that raise. `fuB` (the coworker asks) is good as it is.

- **[wording]** trunk setup: `The idea was your coworker's. Your pay review is next week.`
- **[wording]** trunk q: `Your boss praises you in a meeting for an idea that was actually your coworker's. Your coworker isn't there, and your pay review is next week. What do you do?`
- **[copy]** B41-A note: `You'd tell your boss that an idea they praised you for was your coworker's, with your pay review a week away. You won't keep credit you didn't earn.` did: `You'd tell your boss that the idea they praised you for was your coworker's, with your pay review a week away.`
- **[copy]** B41-B note: `You'd let your boss go on thinking a coworker's idea was yours, with your pay review a week away.` did: `You'd let your boss credit you for your coworker's idea, with your pay review a week away.`
- **[follow-up] fuA**
  - setup: `There's only one raise this year.`
  - q: `Your coworker is up for the same raise. Only one of you will get it.`
  - answers: text and nudges unchanged.
- **[copy]** B41-FUA-A note: `Even with your coworker competing with you for the only raise, you'd tell your boss the idea was your coworker's.` did: `You'd tell your boss a praised idea was your coworker's, even with the two of you competing for one raise.`
- **[copy]** B41-FUA-B note: `You'd give your coworker the credit, until the two of you were competing for the same raise. Then you'd let your boss believe the idea was yours.` did: `You'd let your boss credit you for your coworker's idea once the two of you were competing for one raise.`

### Q8 The Coworker: SHARPEN
The trunk and `fuA` are good. `fuB` contradicts the scene. The colleague steals "from work", so the victim is your own employer, and you can't "learn" that the place you work is a small family business. Keep the harm and make it something you could actually learn.

- **[follow-up] fuB**
  - setup: `The losses are adding up. Other people are paying for them.`
  - q: `You learn the missing money is why the owners just cut two of your coworkers' hours. Now what?`
  - answers: text and nudges unchanged.
- **[copy]** Q8-FUB-A note: `You'd stay out of a colleague's stealing until you learned it cost two coworkers their hours. Then you'd report it.` did: `You'd report a colleague you like for stealing once you learned the losses had cost two coworkers their hours.`
- **[copy]** Q8-FUB-B note: `Even knowing a colleague's stealing cost two coworkers their hours, you'd stay out of it. You won't turn in someone you like.` did: `You'd still stay out of it when a colleague you like steals, even knowing the losses cost two coworkers their hours.`

### Q9 The Protest: KEEP
Legal routes have already failed, and both sides get a follow-up with a real personal cost: your family's income, or someone you love. The trunk is abstract enough to answer honestly from any political side, and the nudges match what each choice reveals. Nothing to fix.

### Q10 The Bystander: SHARPEN
The three answers hold up. "Stand with the target" states its cost, and both follow-ups now apply real pressure. Two small faults remain. In `fuB`, "I still hold back" doesn't fit people who already walked over to the target. And every inaction answer (Q10-C, Q10-FUA-B, Q10-FUB-B) scores Thought −1. That makes "reasoning it through" the label for freezing, which is unfair to the Thought side and isn't what the choice reveals.

- **[wording]** Q10-FUB-B text: `I hold back`.
- **[scoring]** Q10-C `{ CI: -2, HT: -1 }` → `{ CI: -2 }`. Q10-FUA-B `{ CI: -2, HT: -1 }` → `{ CI: -2 }`. Q10-FUB-B `{ CI: -2, HT: -1 }` → `{ CI: -2 }`. To keep the pair even, Q10-FUA-A `{ CI: 2, HT: 1 }` → `{ CI: 2 }`.

### D3 The Informant: KEEP
Binary, with a real cost both ways: a fair process for the teammate against the person who built your career. "Let it go" isn't an escape, because the scene has already used up the private talk. One optional wording point: a "colleague" who hands out shifts reads like a manager, and `A manager who helped build your career` would read faster. I don't count that as a failure.

### D5 The Unearned Advantage: KEEP
The favor is explicit, the gap between candidates is small and stated, and no one would know. That makes it a real hesitation. It's part of a crowded cluster of "someone who helped you asks for something unfair" questions (see Notes), but it's the cleanest of them, so keep it.

### D6 The Leaked Draft: SHARPEN
The dilemma is strong, and both follow-ups apply real pressure. "NDA" is jargon a 14-year-old won't know, though the notes already say "confidentiality agreement". The title promises a leaked draft that isn't in the scene. `fuB`'s "old mentor" is the fourth benefactor in the City (D3, D5, D10, D6), so the step measures the same loyalty again. A family member makes it a cleaner Loyalty test. "Then I stay quiet" after the lawsuit threat is self-protection, not trust in the system, so SD+1 doesn't belong.

- **[wording]** trunk q: `...Going public would likely stop it, but it breaks the confidentiality agreement you signed, and you'd be fired and sued. What do you do?`
- **[copy]** title: `The Pension Cut`.
- **[follow-up] fuB**
  - setup: `Same cut, same agreement. Now one of them is family.`
  - q: `One of the 3,000 is your grandmother.`
  - answers: text and nudges unchanged.
- **[copy]** D6-FUB-A note: `You'd keep your agreement while the 3,000 retirees were strangers, but not once your grandmother was one of them. Then you'd go public.` did: `You'd go public about your company's plan to cut 3,000 retirees' pensions once you learned your grandmother was one of them.`
- **[copy]** D6-FUB-B note: `Even with your grandmother among the 3,000 retirees, you'd stay quiet about the pension cut. Family doesn't change your agreement.` did: `You'd still stay quiet about your company's plan to cut 3,000 retirees' pensions, even with your grandmother among them.`
- **[scoring]** D6-FUA-B `{ CI: -2, SD: 1 }` → `{ CI: -2 }`. Move D6-FUB-A from `repays-help` support to `own-first` and `bend-for-love` support, and D6-FUB-B from `repays-help` against to `own-first` and `bend-for-love` against.
- **[copy]** Tensions: in the two that mention `your old mentor's pension` / `once your old mentor's pension was at stake`, change to `your grandmother's pension` / `once your grandmother's pension was at stake`.

### D10 The Returning Favor: SHARPEN
The trunk works: a huge personal debt against families who have waited years, and you hold the list. D10-A scores Individual −1, but moving her grandson up gains you nothing. It's partiality, which Loyalty already captures. "The Returning Favor" is awkward English.

- **[scoring]** D10-A `{ LP: 2, SD: -2, CI: -1 }` → `{ LP: 2, SD: -2 }`.
- **[copy]** title: `The Housing List`.

### D11 The Silent Witness: SHARPEN
This is the most important fix in the City. The court asks one direct question: who threw the first punch. You can't answer "everything but that". The only ways to leave it out are to refuse, which is answer C, or to say you didn't see, which is a lie under oath. Answer B is perjury worded to sound like a polite omission, which makes it an escape by wording. Say it plainly. Lying under oath also breaks the rules more than openly refusing and accepting the charge, so the System weights should swap. Separately, `fuB` (the other man takes the blame) is the same move as the park's B09 follow-up (an innocent person is arrested for your sibling's crime), and the B09/D11 tensions already pair these questions. Use a different harm.

- **[wording]** trunk setup: `You're the only witness. Who struck first decides the case. Refusing means a contempt charge.`
- **[wording]** D11-B text: `Say I didn't see who started it`
- **[copy]** D11-B note: `You'd tell the court you didn't see who threw the first punch, to protect your brother. You'd lie under oath for him.` did: `You'd tell the court you didn't see who threw the first punch, though it was your brother.`
- **[wording]** D11-FUA-B text: `Then I say I didn't see.`
- **[copy]** D11-FUA-B note: `You'd tell the court the whole truth, until it would likely send your brother to prison. Then you'd say you didn't see who threw the first punch.` did: `You'd tell the court you didn't see who threw the first punch once you knew the truth would likely send your brother to prison.`
- **[follow-up] fuB**
  - setup: `The other man was badly hurt. He can't work anymore.`
  - q: `Without your answer, the court will likely decide the other man started it, and he'll get nothing for his injuries.`
  - answers: text and nudges unchanged.
- **[copy]** D11-FUB-A note: `You'd protect your brother in court, but not if the man he hurt, who can't work anymore, would get nothing. Then you'd say who threw the first punch.` did: `You'd testify that your brother threw the first punch once you knew the man he hurt, who can't work anymore, would otherwise get nothing for his injuries.`
- **[copy]** D11-FUB-B note: `Even if the man your brother hurt can't work and would get nothing, you wouldn't say your brother threw the first punch. Your brother comes first.` did: `You still wouldn't say your brother threw the first punch, even knowing the man he hurt can't work and would get nothing for his injuries.`
- **[scoring]** D11-B `{ LP: 2, SD: -2, OR: 1 }` → `{ LP: 2, SD: -3, OR: 1 }`. D11-C `{ LP: 2, SD: -3, OR: -1 }` → `{ LP: 2, SD: -2, OR: -1 }`.
- **[copy]** Tension `['B09-B', 'D11-B']`: `You won't lie to the police for your sibling, but in court you'd say you didn't see your brother throw the first punch.`

---

## Top priorities

1. **D11-B is a lie disguised as an omission.** You can't leave out the one thing you were asked. Reword it to `Say I didn't see who started it`, swap the System weights with C, and replace `fuB`, which duplicates the park's B09.
2. **Q8 `fuB` contradicts its own scene.** You'd already know whether your employer is a small family business. Replace it with a harm you could learn: the losses cost two coworkers their hours.
3. **B04's follow-up pressure doesn't hold up.** The truth doesn't save the bakery's wedding order as written. Make the truth actually help them, and add a job-threat follow-up for the truth-tellers.
4. **B41's trunk is too easy.** With no cost, about 80% correct the boss. Move the pay review into the trunk, and make the coworker a rival for the raise in `fuA`.
5. **Q11 `fuA` contradicts the trunk.** "A car without this rule" can't exist when you set the rule for every car. Ask instead whether you'd keep the rule with your own children riding.

Next tier: B12's setup leaks the answer ("Only luck differs"). B35's "information" is ambiguous. B32's follow-up gets a near-unanimous yes.

## Notes for Ken

- **One-sided follow-ups are still the most common gap.** Before this pass, B04, B05, B12, B30, B32, B33 and B35 tested only one side. The side left alone is usually the one that sounds virtuous and costs nothing as written ("Yes, and apologize", "Justice doesn't expire", "No, it's the supplier"). Players will pick that side to look good, and nothing checks them. Each SHARPEN above adds the missing side.
- **The Thought side keeps getting attached to inaction and self-protection** (Q10-C, Q10-FUA-B, Q10-FUB-B, B05-FU-B, B04-FU-A, B35-FU-A all score Thought −1). Over a full City run, "You reason it through" starts to stand for "you froze" or "you looked after yourself". I fixed Q10 above. I'd apply the same rule to the others: inaction scores on the axes it actually reveals, not on Thought.
- **Benefactor cluster.** D3, D5, D10 and D6's mentor follow-up all ask "someone who helped you wants something unfair". `repays-help` can then fire from one disposition measured three or four times. I moved D6's follow-up to family. If the City gets new questions, don't add another benefactor.
- **Punishment cluster.** B12, B33, B34 and B35, plus the park's B29, all test whether a wrong must be punished. B33's new follow-up deliberately avoids forgiveness, which B34 already uses. It does resemble B29's "the baby goes into foster care", and I accepted that as the lesser overlap.
- **Answers that argue for themselves.** Several answers carry a reason that only one side gets (B12-A "The rest was luck", B04-A "not my lie", B05-B "It would only hurt them"). A built-in argument either sells the answer or makes it sound like an excuse. I fixed B12 and B04. B05-B is fine, because its reason is exactly what the follow-up then tests.
- **Ripple effects if you accept these:** three tension texts change (D11, plus the two D6 mentor tensions). `next()` changes for B04, B05, B12, B30, B32, B33 and B35. Old saves lose only a follow-up picked under a renamed id, as in the earlier renames. All new and changed `did` lines name their subject in full and contain no dashes.
- **The follow-ups added on 2026-10-03/04 (D11, D6, B41, B03, Q10, B34)** had not been checked by a separate judge before this pass. Of those, Q10 and B34 pass apart from copy and scoring. D11 `fuB` and B03 `fuB` need the changes above. D6 and B41 needed changes to the facts in the scene (the family member and where the cost sits), not to the follow-up's structure.
