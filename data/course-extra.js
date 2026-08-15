/* GRE Study Course - Extra question pool.
   Appends additional questions to every module quiz and checkpoint so that
   quizzes can sample a subset instead of showing the entire pool.
   APPEND ONLY: existing question positions must never change. */
(function () {
  var CC = window.GRECOURSE;
  if (!CC || !CC.units) return;

  var byId = {};
  CC.units.forEach(function (u) {
    u.modules.forEach(function (m) { byId[m.id] = m; });
    if (u.checkpoint) byId[u.checkpoint.id] = u.checkpoint;
  });

  function extend(id, listKey, extra) {
    var owner = byId[id];
    if (!owner || !owner[listKey]) return;
    if (owner.quizN == null) owner.quizN = owner[listKey].length; // original on-screen quiz size
    extra.forEach(function (q) { owner[listKey].push(q); });
  }

  /* ============================================================
     UNIT 1
     ============================================================ */

  extend("gm1_1", "quiz", [
    { text: "Quantitative Reasoning Section 1 gives you 12 questions in 21 minutes. What is your average budget per question?",
      choices: [
        "About 75 seconds",
        "About 90 seconds",
        "About 105 seconds",
        "About 120 seconds"],
      answer: 2,
      expl: "21 minutes is 1,260 seconds, and 1,260 &divide; 12 = 105 seconds per question. About 90 seconds is the <em>Verbal</em> Section 1 budget (18 minutes for 12 questions), which is why it feels like the familiar number and is the easiest one to grab by mistake." },
    { text: "You stumble badly through Verbal Section 1, then answer every question in Verbal Section 2 correctly. What is the most likely result?",
      choices: [
        "A near-perfect Verbal score, since Section 2 was flawless",
        "Only Section 2 counts, so Section 1 is irrelevant",
        "A score capped well below your potential, because the weak Section 1 routed you into an easier Section 2",
        "The test re-administers Section 1"],
      answer: 2,
      expl: "Section-level adaptivity means Section 1 performance chooses the difficulty of Section 2, and that difficulty is folded into the scaled score. A perfect run through an easy Section 2 still lands in a lower band. The tempting answer treats the GRE as if only raw correct answers mattered, which would be true on a non-adaptive test." },
    { text: "The pacing table shows roughly 90 seconds per Verbal question. How should you actually spend that time inside a section?",
      choices: [
        "Give every question close to 90 seconds so nothing is rushed",
        "Finish Text Completions in 45&ndash;60 seconds so a long Reading Comprehension passage can take several minutes",
        "Spend the most time on Text Completions, since they come first",
        "Skip Reading Comprehension entirely and bank the time"],
      answer: 1,
      expl: "The 90 seconds is an average across very different tasks. Sentence-level questions are fast and fund the passages, which genuinely need three or four minutes. Spending an even 90 seconds everywhere sounds disciplined but starves the questions that actually require time." },
    { text: "Every question in a section is worth the same. Which two consequences follow? (Select TWO.)",
      choices: [
        "Doing the questions you can answer quickly, before the slow ones, maximizes your score",
        "Harder questions deserve proportionally more of your time because they are worth more",
        "A question you answer in 30 seconds is worth exactly as much as one that takes four minutes",
        "You should always work through the questions in the order presented"],
      answer: [0, 2],
      expl: "Equal weighting means points are bought with questions answered, not with difficulty conquered, so harvesting the fast ones first and treating a 30-second question as equal to a four-minute one are both correct. The idea that hard questions are worth more describes a different test entirely; on the GRE it only guarantees you run out of clock." }
  ]);

  extend("gm1_2", "quiz", [
    { text: "The root <em>-loqu-</em> means speech. A speaker described as <b>grandiloquent</b> is most likely:",
      choices: [
        "Pompous and inflated in style",
        "Barely audible",
        "Careless with grammar",
        "Admirably brief"],
      answer: 0,
      expl: "Grand + loqu = lofty, swollen speech, so pompous and inflated is right. \"Admirably brief\" describes <em>laconic</em>, the opposite quality, and is tempting only if you read the root and forget the prefix." },
    { text: "\"Her review was thoroughly ______: she praised the score, savaged the script, and declined to say whether the film worked.\" The blank means:",
      choices: [
        "Unequivocal",
        "Equivocal",
        "Laudatory",
        "Laconic",
        "Vitriolic"],
      answer: 1,
      expl: "The colon explains the blank, and the evidence is a refusal to come down on one side: that is <em>equivocal</em>. <em>Unequivocal</em> is the exact reversal, one prefix away, and is the trap for anyone matching the word's look rather than its meaning." },
    { text: "\"Because the drought had ______ an already fragile food supply, relief agencies doubled their shipments.\" The blank means:",
      choices: [
        "Ameliorated",
        "Stabilized",
        "Exacerbated",
        "Obscured"],
      answer: 2,
      expl: "\"Because\" makes the blank the cause of doubled shipments, so the drought must have made a bad situation worse: <em>exacerbated</em>. <em>Ameliorated</em> means improved, the precise opposite, and it is placed there for anyone who registers the topic (drought, relief) without tracking the direction of the logic." },
    { text: "Which two roots or prefixes signal something good or pleasant? (Select TWO.)",
      choices: ["mal-", "bene-", "eu-", "contra-"],
      answer: [1, 2],
      expl: "<em>bene-</em> gives benevolent and benign, and <em>eu-</em> gives eulogy and euphony, both marking the positive side. <em>mal-</em> is its mirror image (malevolent, malign) and <em>contra-</em> means against, so both belong on the negative side of a charge analysis." }
  ]);

  extend("gm1_3", "quiz", [
    { text: "\"Because the drug's benefit appeared only in one small subgroup, the authors called their finding ______ rather than definitive.\" The blank means:",
      choices: [
        "Conclusive",
        "Provisional",
        "Irrelevant",
        "Exhaustive"],
      answer: 1,
      expl: "\"Rather than definitive\" tells you the blank is definitive's opposite, and the small subgroup explains why: the result is tentative, or <em>provisional</em>. <em>Conclusive</em> is a synonym of definitive, so it is the reversal trap; <em>irrelevant</em> overshoots, since a limited finding is still a finding." },
    { text: "On a two-blank Text Completion you are certain of blank (ii) but torn between two options for blank (i). What is the most efficient next move?",
      choices: [
        "Guess between the two and move on immediately",
        "Choose whichever word for (i) is more difficult",
        "Start over and re-solve blank (ii)",
        "Read the sentence with blank (ii) filled in and see which option for (i) produces coherent logic"],
      answer: 3,
      expl: "A solved blank is leverage: reading the sentence back with (ii) in place usually makes one option for (i) obviously incoherent. Guessing immediately throws away that leverage, and since there is no partial credit, a coin flip on (i) makes the whole question a coin flip." },
    { text: "\"The historian's account is admirably ______: she consulted archives in four countries and interviewed every surviving participant.\" The blank means:",
      choices: [
        "Concise",
        "Speculative",
        "Contentious",
        "Thorough"],
      answer: 3,
      expl: "The colon means what follows explains the blank, and what follows describes enormous scope of research, so the blank is <em>thorough</em>. <em>Concise</em> is a natural companion to \"admirably\" in ordinary prose, which is exactly why it is offered, but nothing after the colon is about brevity." },
    { text: "Which two statements about Text Completion format are correct? (Select TWO.)",
      choices: [
        "A single-blank question offers five answer choices",
        "A three-blank question offers five choices for each blank",
        "Two- and three-blank questions offer three choices for each blank",
        "Getting two of three blanks right earns partial credit"],
      answer: [0, 2],
      expl: "One blank means five choices; two or three blanks mean three choices each. The partial-credit option is the dangerous one to believe, because it makes a three-blank question feel safe to half-solve when in fact one wrong blank zeroes the entire question." }
  ]);

  extend("gm1_4", "quiz", [
    { text: "\"Once ______ by collectors, the painter's late canvases now command prices rivaling those of his celebrated early work.\" Which TWO choices are correct?",
      choices: ["Prized", "Disdained", "Neglected", "Forged"],
      answer: [1, 2],
      expl: "\"Once ... now\" sets up a reversal, so the earlier attitude must be the opposite of today's high prices: <em>disdained</em> and <em>neglected</em> both give a sentence about work that used to be unwanted. <em>Prized</em> describes the present situation rather than the past one, so it inverts the sentence's arc." },
    { text: "\"The senator's speech was so ______ that even her allies could not say afterward what she had committed to.\" Which TWO choices are correct?",
      choices: ["Nebulous", "Strident", "Vague", "Candid"],
      answer: [0, 2],
      expl: "If listeners cannot identify what was promised, the speech lacked definiteness: <em>nebulous</em> and <em>vague</em> produce equivalent sentences. <em>Candid</em> means frank and open, which would make the confusion impossible, and <em>strident</em> describes volume rather than clarity." },
    { text: "You examine the six choices and find three words that all fit the blank's meaning comfortably. What does this most likely mean?",
      choices: [
        "Any two of the three will earn credit",
        "The question is defective",
        "Two of them are closer in meaning to each other, and the third differs in a way the sentence cares about",
        "You should pick the two least common words"],
      answer: 2,
      expl: "The requirement is equivalent completed sentences, not merely acceptable ones, so when three words fit loosely, the deciding question is which two produce the same sentence. Assuming any two will do ignores the equivalence requirement and is precisely how people select one right word and one wrong one." },
    { text: "Six Sentence Equivalence choices contain three tidy synonym pairs. What determines which pair is correct?",
      choices: [
        "The pair whose words are the most advanced vocabulary",
        "The pair the sentence's signal words and evidence actually require",
        "The pair listed first among the choices",
        "The pair that shares a root with a word in the sentence"],
      answer: 1,
      expl: "Multiple pairs are planted precisely so that pair-hunting alone cannot solve the question; only the sentence's logic selects among them. Reaching for the hardest-sounding pair is the habit the decoys are built to punish, since difficulty has no correlation with correctness." }
  ]);

  extend("gcp1", "questions", [
    { text: "\"The mayor's proposal was hardly ______: nearly identical plans had been floated by three previous administrations.\" The blank means:",
      choices: ["Unprecedented", "Unpopular", "Expensive", "Detailed"],
      answer: 0,
      expl: "The colon explains the blank, and the evidence is that similar plans already existed, so the blank is about originality: hardly <em>unprecedented</em>. <em>Unpopular</em> is plausible for a mayor's proposal but nothing after the colon concerns how people received it." },
    { text: "'Prosaic' most nearly means:",
      choices: ["Poetic and elevated", "Dull and unoriginal", "Wordy", "Prophetic"],
      answer: 1,
      expl: "Prosaic means commonplace and uninspired, grouping with banal and pedestrian. \"Poetic and elevated\" is the trap built on the prose/poetry contrast: prosaic comes from prose, but it means dull, not merely non-verse." },
    { text: "Which two words mean 'cautious'? (Select TWO.)",
      choices: ["Circumspect", "Prudent", "Garrulous", "Tenuous"],
      answer: [0, 1],
      expl: "Circumspect and prudent both describe careful, risk-aware behavior and would produce equivalent sentences. <em>Tenuous</em> means flimsy, which sounds vaguely negative-and-careful but describes an argument's strength, not a person's caution." },
    { text: "You face a two-blank Text Completion and feel unsure about both blanks. What is the best first move?",
      choices: [
        "Fill blank (i) with your best guess and work rightward",
        "Eliminate the longest word in each column",
        "Skip it, since two-blank questions are worth less",
        "Read the whole sentence for its signal word, then solve whichever blank is more heavily clued"],
      answer: 3,
      expl: "Blanks are never equally constrained, so locating the clued one and using it to pin the other converts a two-way guess into one decision. Working left to right by default is the habit that makes people solve the hard blank first with no leverage." },
    { text: "'Tenuous' most nearly means:",
      choices: ["Flimsy or weak", "Tense and anxious", "Lengthy", "Stubborn"],
      answer: 0,
      expl: "A tenuous connection is thin enough to break under scrutiny. \"Tense and anxious\" is the sound-alike trap: tenuous shares no meaning with <em>tense</em>, and the GRE uses it almost exclusively for weak arguments, claims, and links." }
  ]);

  /* ============================================================
     UNIT 2
     ============================================================ */

  extend("gm2_1", "quiz", [
    { text: "A paragraph opens: \"Admittedly, the earliest surveys were poorly designed.\" What is this paragraph most likely doing?",
      choices: [
        "Stating the author's conclusion",
        "Conceding a point before limiting or answering it",
        "Introducing an unrelated topic",
        "Summarizing the entire passage"],
      answer: 1,
      expl: "\"Admittedly,\" like \"granted\" and \"to be sure,\" marks a concession the author intends to survive. Reading it as the author's conclusion inverts the paragraph's function, and a question about the author's position would then be answered with the very claim the author is about to push back on." },
    { text: "Which statement describes a paragraph's FUNCTION rather than its content?",
      choices: [
        "Nineteenth-century whaling logs recorded daily sea temperatures",
        "Sea temperatures in the North Atlantic rose over the period studied",
        "The paragraph supplies evidence for the claim made in the opening paragraph",
        "The logs were kept by ships' officers"],
      answer: 2,
      expl: "Function describes what a paragraph does for the argument, which is the note that tells you where to look when a question arrives. The others are all accurate content, and content is exactly what you should leave on screen to look up rather than memorize." },
    { text: "An answer to a \"primary purpose\" question accurately describes what the third paragraph does, and nothing else. Why is it wrong?",
      choices: [
        "It is too extreme",
        "It uses vocabulary from the passage",
        "It is stated too tentatively",
        "A primary-purpose answer must account for the passage as a whole, not one section of it"],
      answer: 3,
      expl: "This is the \"right answer, wrong part of the passage\" construction: perfectly true, but scoped to one paragraph when the question asked about the whole. Nothing about it is extreme or hedged incorrectly, which is what makes it survive a careless elimination pass." },
    { text: "A passage reads: \"Traditionally, scholars attributed the settlement's collapse to overhunting. Recent isotope analysis, however, points to a shift in rainfall.\" What is the author's likely position?",
      choices: [
        "Overhunting caused the collapse",
        "Rainfall has no bearing on the collapse",
        "The traditional explanation is being challenged by newer evidence",
        "Earlier scholars deliberately misled their readers"],
      answer: 2,
      expl: "\"Traditionally\" flags a received view and \"however\" pivots away from it, so the author is setting up a challenge. Choosing overhunting attributes to the author the view he introduced in order to complicate, which is the single most common comprehension error; the accusation of deliberate deception is a tone the GRE almost never takes." },
    { text: "Which two answer choices should you eliminate on sight in Reading Comprehension? (Select TWO.)",
      choices: [
        "The evidence proves that no alternative explanation is possible",
        "The evidence indicates that one factor may have contributed",
        "The author suggests the record remains incomplete",
        "The finding demonstrates conclusively that the practice was universal"],
      answer: [0, 3],
      expl: "\"Proves that no alternative is possible\" and \"demonstrates conclusively ... universal\" both claim a certainty and reach that hedged academic prose almost never supports. The surviving choices use <em>indicates</em>, <em>may</em>, and <em>suggests</em>, and answers written at that strength are usually the ones that match the passage." }
  ]);

  extend("gm2_2", "quiz", [
    { text: "The passage states: \"Many of the surviving manuscripts, though by no means all, show the corrections.\" Which answer is supported?",
      choices: [
        "Every surviving manuscript shows the corrections",
        "Most surviving manuscripts show the corrections",
        "A substantial number of surviving manuscripts show the corrections",
        "Almost no surviving manuscripts show the corrections"],
      answer: 2,
      expl: "\"Many\" establishes a substantial number and nothing more. \"Most\" is the near-miss that costs points: it asserts a majority, and many is entirely compatible with a minority, so the answer quietly adds a quantitative claim the passage never made." },
    { text: "A passage says: \"Whatever its commercial success, the format never influenced later composers.\" What does this construction tell you?",
      choices: [
        "Commercial success is the author's measure of influence",
        "The author explicitly rules commercial success out as evidence of influence",
        "The format was a commercial failure",
        "Later composers admired the format"],
      answer: 1,
      expl: "\"Whatever its X\" is a concede-and-dismiss: the author grants X and declares it irrelevant to the claim being made, so any answer resting on commercial success is dead. Reading it as a statement that the format failed commercially adds a fact the sentence deliberately leaves open." },
    { text: "A sentence begins \"To be sure, the earlier estimates were imprecise.\" What follows is most likely:",
      choices: [
        "Further support for the imprecision",
        "The passage's opening thesis",
        "A turn in which the author argues the imprecision does not undermine the conclusion",
        "An unrelated example"],
      answer: 2,
      expl: "\"To be sure\" is a concession marker, and concessions exist to be answered; the sentence after it usually carries the author's real point. Expecting more support treats the concession as the author's own emphasis, which reverses who is speaking." },
    { text: "A passage closes: \"The theory's explanatory reach is undeniable, though its empirical foundations remain thin.\" The author's attitude is best described as:",
      choices: [
        "Unqualified endorsement",
        "Admiring but reserved",
        "Contemptuous dismissal",
        "Complete indifference"],
      answer: 1,
      expl: "Praise plus a stated reservation is textbook qualified approval. \"Unqualified endorsement\" ignores the second half of the sentence, and it is tempting exactly because the first half is so emphatic; extreme attitudes on either end almost never survive a hedged closing clause." },
    { text: "Two answers survive and differ by a single word. Which two moves resolve the question? (Select TWO.)",
      choices: [
        "Identify the divergent word and check it directly against the passage's own language",
        "Choose the longer and more detailed answer",
        "Ask whether one choice overstates the passage's certainty or widens its scope",
        "Choose the answer that reuses the most vocabulary from the passage"],
      answer: [0, 2],
      expl: "Hard questions are decided at the point of divergence, and the divergence is nearly always a quantifier, a qualifier, or a scope shift, so locating it and testing it for overstatement is the whole task. Length and borrowed vocabulary are surface features that trap answers imitate on purpose." }
  ]);

  extend("gm2_3", "quiz", [
    { text: "A town installed speed cameras in 2015, and by 2018 traffic deaths had fallen 30%. Officials credit the cameras. Which fact most weakens the argument?",
      choices: [
        "The cameras cost more than the town had budgeted",
        "Traffic volume was roughly unchanged over the period",
        "The town rebuilt its two most dangerous intersections in 2016",
        "A few drivers slowed only when directly in front of a camera"],
      answer: 2,
      expl: "Rebuilding the deadliest intersections supplies an alternative cause that fully explains the drop without the cameras doing anything. Cost is irrelevant to whether the cameras worked, and steady traffic volume actually removes one competing explanation, nudging the argument in the opposite direction." },
    { text: "A company claims its new onboarding program caused first-year turnover to drop. Which fact most strengthens the claim?",
      choices: [
        "Turnover at comparable firms with no such program was unchanged over the same period",
        "New hires reported enjoying the program",
        "The program cost less than the company expected",
        "A few employees left despite completing the program"],
      answer: 0,
      expl: "Showing that similar firms without the program saw no change rules out an industry-wide cause and isolates the program as the difference. That employees enjoyed it is about satisfaction, not retention: a classic merely-relevant answer that touches the topic without moving the conclusion." },
    { text: "\"The new bridge will shorten commute times, since it provides a direct route from the suburb to downtown.\" Which is an assumption the argument requires?",
      choices: [
        "The bridge was built under budget",
        "Commuters prefer driving to taking transit",
        "The old route will be closed",
        "A meaningful number of commuters will actually use the bridge"],
      answer: 3,
      expl: "Negate it: if essentially no one uses the bridge, commute times cannot fall, and the argument collapses, which is exactly what the negation test is for. That commuters prefer driving is a broader preference claim the argument never needs; a route can shorten commutes for those who drive it regardless." },
    { text: "\"Our best-selling product also has our highest customer-satisfaction score, so improving quality is what drives sales.\" The flaw is that the argument:",
      choices: [
        "Treats a correlation as though the direction of causation were established",
        "Relies on evidence that is probably false",
        "Uses a sample that is too small",
        "Assumes conditions have not changed over time"],
      answer: 0,
      expl: "High satisfaction could just as easily be a <em>result</em> of a product's popularity, or both could stem from a third factor such as price; the argument simply picks one direction. Calling the evidence false is off-limits, since premises are granted, and it is the most common way to answer this kind of question wrongly." },
    { text: "Which two answers would NOT properly weaken an argument? (Select TWO.)",
      choices: [
        "Disputing the accuracy of the survey data offered as evidence",
        "Offering an alternative explanation for the observed outcome",
        "Noting that the person making the argument lacks credentials",
        "Showing that the two groups being compared differ in composition"],
      answer: [0, 2],
      expl: "Premises are granted as true, so attacking the data is not available to you, and attacking the speaker rather than the reasoning is irrelevant to whether the conclusion follows. Alternative explanations and non-comparable groups both strike the link between evidence and conclusion, which is where every legitimate weakener lands." }
  ]);

  extend("gcp2", "questions", [
    { text: "\"Students who eat breakfast score higher on tests, so schools should serve breakfast to raise scores.\" Which most weakens this?",
      choices: [
        "Students who eat breakfast typically come from households with more stable routines and more academic support",
        "Breakfast foods vary widely in nutritional value",
        "Some high-scoring students skip breakfast",
        "The study examined only one school district"],
      answer: 0,
      expl: "Household stability plausibly produces both the breakfast and the higher scores, so the correlation survives while the causal claim dies. The single-district objection is the seductive one, but it disputes the quality of the evidence rather than the leap from evidence to conclusion, and a few high-scoring skippers are perfectly compatible with a general effect." },
    { text: "A passage states that every documented eruption of the volcano was preceded by a swarm of small earthquakes. Which must be true?",
      choices: [
        "Every earthquake swarm at the volcano is followed by an eruption",
        "No documented eruption occurred without a preceding swarm",
        "Earthquake swarms cause eruptions",
        "The volcano is likely to erupt again soon"],
      answer: 1,
      expl: "\"No documented eruption occurred without a preceding swarm\" is simply a restatement of the given, so it is guaranteed. Claiming that every swarm is followed by an eruption reverses the conditional: swarms could occur a hundred times with nothing following, and the passage would still be true." },
    { text: "'Candor' most nearly means:",
      choices: ["Frankness", "Flattery", "Caution", "Brightness"],
      answer: 0,
      expl: "Candor is honest, unguarded speech, and its adjective <em>candid</em> is the more familiar form. \"Flattery\" is the trap for anyone who associates candor with pleasantness; candid speech is frequently the unwelcome kind." },
    { text: "Which two words mean 'talkative'? (Select TWO.)",
      choices: ["Garrulous", "Laconic", "Voluble", "Reticent"],
      answer: [0, 2],
      expl: "Garrulous and voluble both describe someone who talks freely and at length. Laconic and reticent are their opposites and form a competing pair, which is exactly the setup Sentence Equivalence uses to punish anyone who selects a tidy pair without checking the sentence's direction." },
    { text: "An argument concludes that a training program improved performance, based on results from employees who volunteered for it. The gap is that:",
      choices: [
        "The program may have been too short",
        "Performance is difficult to measure",
        "Volunteers were probably already more motivated, so the group is not representative",
        "The company had other programs as well"],
      answer: 2,
      expl: "Self-selection means the group differed before the training began, so the outcome cannot be attributed to the training. Measurement difficulty is a challenge to the evidence itself, which you must accept as given, and it is the most common wrong turn on selection-bias questions." }
  ]);

  /* ============================================================
     UNIT 3
     ============================================================ */

  extend("gm3_1", "quiz", [
    { text: "A jacket is marked down 30%, and the sale price is then reduced by another 10%. The final price is what percent of the original?",
      choices: ["60%", "63%", "67%", "70%"],
      answer: 1,
      expl: "Successive percent changes multiply: 0.70 &times; 0.90 = 0.63, so 63%. The 60% choice comes from adding the discounts to 40% off, which double-counts, because the second 10% applies to the already reduced price, not the original." },
    { text: "A recipe calls for flour, sugar, and butter in the ratio 5 : 3 : 2, and uses 40 ounces of these ingredients in total. How many ounces of sugar does it use?",
      choices: ["8", "12", "15", "20"],
      answer: 1,
      expl: "The parts sum to 5 + 3 + 2 = 10, so one part is 40 &divide; 10 = 4 ounces, and sugar is 3 &times; 4 = 12. The 15 comes from treating 3 : 2 as if sugar were three-eighths of the total, which ignores the flour entirely." },
    { text: "Machine A alone finishes a job in 5 hours. Machines A and B working together finish it in 2 hours. How long would B take alone?",
      choices: [
        "3 hours 20 minutes",
        "2 hours 30 minutes",
        "3 hours",
        "7 hours"],
      answer: 0,
      expl: "Rates subtract: 1/2 &minus; 1/5 = 3/10 of the job per hour, so B alone takes 10/3 hours, or 3 hours 20 minutes. The 7 hours comes from adding or subtracting <em>times</em> instead of rates, and it fails the sanity check: B alone must be slower than the 2-hour combined pace but faster than nothing." },
    { text: "A quantity falls from 80 to 60. Which statement is correct?",
      choices: [
        "It decreased by 25%, and 60 is 75% of 80",
        "It decreased by 20%, and 60 is 80% of 80",
        "It decreased by 33.3%, and 60 is 75% of 80",
        "It decreased by 25%, and 60 is 125% of 80"],
      answer: 0,
      expl: "Percent change divides by the original: 20/80 = 25% decrease, and separately 60/80 = 0.75, so 60 is 75% of 80. The 33.3% figure divides by 60 instead of 80, which is the percent increase you would get going the <em>other</em> direction, from 60 up to 80." },
    { text: "Which two statements about percent change are true? (Select TWO.)",
      choices: [
        "Tripling a value is a 200% increase",
        "Tripling a value is a 300% increase",
        "An increase of 25% followed by a decrease of 20% returns to the original value",
        "Successive percent changes are added together"],
      answer: [0, 2],
      expl: "Tripling adds twice the original, so the change over the original is 200%, and 1.25 &times; 0.80 = 1.00 exactly because 5/4 and 4/5 are reciprocals. Calling tripling a 300% increase confuses \"300% <em>of</em>\" with \"300% <em>greater than</em>,\" the distinction the whole module is built around." }
  ]);

  extend("gm3_2", "quiz", [
    { text: "How many distinct positive factors does 100 have?",
      choices: ["6", "8", "9", "10"],
      answer: 2,
      expl: "100 = 2&sup2; &times; 5&sup2;, so add 1 to each exponent and multiply: (2+1)(2+1) = 9. The tempting 8 comes from listing factors in pairs and forgetting that 10 &times; 10 contributes only one factor, not two." },
    { text: "If the integer n is divisible by both 6 and 8, then n must also be divisible by:",
      choices: ["14", "16", "24", "48"],
      answer: 2,
      expl: "Divisibility by both means n contains 2&sup3; and 3, so n is a multiple of the least common multiple, 24. The 48 choice assumes you multiply 6 &times; 8, but n = 24 already satisfies the condition and is not divisible by 48." },
    { text: "What is the units digit of 4<sup>37</sup>?",
      choices: ["2", "4", "6", "8"],
      answer: 1,
      expl: "Powers of 4 end in 4, 6, 4, 6, a cycle of length 2, so odd exponents end in 4 and even exponents end in 6. The 6 is the trap for anyone who counts the cycle correctly but lands on the wrong parity." },
    { text: "If &minus;1 &lt; x &lt; 0, which statement must be TRUE?",
      choices: [
        "x&sup2; &lt; x",
        "x&sup3; &gt; x&sup2;",
        "x&sup2; &gt; x",
        "x&sup2; &gt; 1"],
      answer: 2,
      expl: "Squaring a negative makes it positive, and any positive number beats a negative one, so x&sup2; &gt; x for every x in this range (test x = &minus;0.5: 0.25 &gt; &minus;0.5). The \"x&sup2; &lt; x\" choice imports the rule for fractions between 0 <em>and</em> 1 without noticing the sign, which is the whole point of the constraint." },
    { text: "Which two statements must be true for every integer n? (Select TWO.)",
      choices: [
        "n&sup2; + n is even",
        "n&sup2; + n is odd",
        "n(n + 1)(n + 2) is divisible by 3",
        "2n + 1 is even"],
      answer: [0, 2],
      expl: "n&sup2; + n factors as n(n + 1), a product of consecutive integers, so it always includes an even factor, and any three consecutive integers must include a multiple of 3. The expression 2n + 1 is even for no n at all: 2n is always even, so adding 1 always makes it odd." }
  ]);

  extend("gm3_3", "quiz", [
    { text: "If 5x + 2y = 26 and 3x &minus; 2y = 6, what is the value of x + y?",
      choices: ["3", "4", "7", "12"],
      answer: 2,
      expl: "The y terms cancel when you add: 8x = 32, so x = 4, and 2y = 26 &minus; 20 = 6 gives y = 3, making x + y = 7. Notice that 4, 3, and even the product 12 are all sitting among the choices, which is the standard punishment for solving correctly and answering the wrong question." },
    { text: "If &minus;3x + 5 &ge; 20, then:",
      choices: ["x &ge; &minus;5", "x &le; &minus;5", "x &ge; 5", "x &le; 5"],
      answer: 1,
      expl: "Subtract 5 to get &minus;3x &ge; 15, then divide by &minus;3 and flip the sign: x &le; &minus;5. The choice that keeps the sign pointing the same way is what you get by treating the inequality exactly like an equation, which is right for every step except this one." },
    { text: "If x &minus; 1/x = 3, what is x&sup2; + 1/x&sup2;?",
      choices: ["7", "9", "11", "12"],
      answer: 2,
      expl: "Squaring gives x&sup2; &minus; 2 + 1/x&sup2; = 9, so x&sup2; + 1/x&sup2; = 11. The cross-term here is <em>minus</em> 2 because of the subtraction, so you add 2 back; answering 7 comes from reusing the plus-2 pattern from x + 1/x and subtracting instead." },
    { text: "In an arithmetic sequence, the 4th term is 17 and the 9th term is 42. What is the first term?",
      choices: ["2", "5", "7", "12"],
      answer: 0,
      expl: "There are five steps from term 4 to term 9, so d = (42 &minus; 17)/5 = 5, and the first term is 17 &minus; 3(5) = 2. Counting four steps instead of five gives d = 6.25 and derails everything; the off-by-one between term numbers and gaps is the standard sequence trap." },
    { text: "Which two shortcuts are sound on GRE algebra? (Select TWO.)",
      choices: [
        "When the answer choices are specific numbers and the algebra is ugly, test the middle value first",
        "Always apply the quadratic formula rather than factoring",
        "When the answer choices contain variables, substitute easy numbers, avoiding 0 and 1",
        "Use 0 and 1 as your plug-in values, since they make the arithmetic easiest"],
      answer: [0, 2],
      expl: "Backsolving from the middle choice can eliminate half the field in one test, and plugging in numbers turns abstract manipulation into arithmetic. The reason to avoid 0 and 1 is that they collapse distinctions, often making several choices produce the same value and forcing you to redo the work." }
  ]);

  extend("gm3_4", "quiz", [
    { text: "$5,000 is invested at 8% <b>simple</b> annual interest for 3 years. How much interest is earned?",
      choices: ["$1,200", "$1,298.56", "$400", "$6,200"],
      answer: 0,
      expl: "Simple interest is I = P &times; r &times; t = 5000 &times; 0.08 &times; 3 = $1,200, computed on the original principal every year. The $1,298.56 figure is what compounding would produce, and it is offered precisely to catch anyone who applies the wrong interest model." },
    { text: "4 liters of a 10% salt solution are mixed with 6 liters of a 20% salt solution. What percent of the mixture is salt?",
      choices: ["14%", "15%", "16%", "30%"],
      answer: 2,
      expl: "Work with amounts: 0.4 + 1.2 = 1.6 liters of salt in 10 liters total, so 16%. The 15% choice averages the two concentrations, which would only be right if the volumes were equal; here the stronger solution is the larger share, so the result is pulled toward 20%." },
    { text: "In a group of 60 people, 35 speak French, 28 speak German, and 12 speak both. How many speak neither?",
      choices: ["3", "9", "12", "15"],
      answer: 1,
      expl: "Inclusion-exclusion gives 35 + 28 &minus; 12 = 51 who speak at least one, so 60 &minus; 51 = 9 speak neither. Answering 3 comes from adding 35 + 28 and subtracting from 60 without removing the double-counted overlap first." },
    { text: "What is the sum of all integers from 20 to 60, inclusive?",
      choices: ["1,600", "1,640", "1,680", "820"],
      answer: 1,
      expl: "The set is evenly spaced, so the mean is (20 + 60)/2 = 40, and the count is 60 &minus; 20 + 1 = 41, giving 40 &times; 41 = 1,640. The 1,600 answer uses 40 terms instead of 41: the inclusive count is the whole difficulty of this question." },
    { text: "Which two translations are correct? (Select TWO.)",
      choices: [
        "\"x is 7 less than y\" becomes x = y &minus; 7",
        "\"x is 7 less than y\" becomes x = 7 &minus; y",
        "\"the number of quarters is three times the number of dimes\" becomes q = 3d",
        "\"the number of quarters is three times the number of dimes\" becomes d = 3q"],
      answer: [0, 2],
      expl: "\"Less than\" reverses the order you read it in, so you start from y and remove 7, and \"is three times\" attaches the multiplier to the smaller quantity to produce the larger one. Writing d = 3q reverses which group is bigger, and it is the more dangerous error because the equation still looks tidy." }
  ]);

  extend("gcp3", "questions", [
    { text: "A number is increased by 50%, and the result is then decreased by 40%. The final value is what percent of the original?",
      choices: ["90%", "100%", "110%", "10%"],
      answer: 0,
      expl: "Multiply the factors: 1.5 &times; 0.6 = 0.9, so 90% of the original. The 110% choice comes from adding +50 and &minus;40 to get +10%, which ignores that the 40% cut applies to the enlarged value." },
    { text: "How many distinct positive factors does 72 have?",
      choices: ["8", "10", "12", "14"],
      answer: 2,
      expl: "72 = 2&sup3; &times; 3&sup2;, so (3+1)(2+1) = 12 factors. The 8 is what you get from 2&sup3; alone, forgetting that the factor of 3&sup2; multiplies the count rather than adding to it." },
    { text: "If 3(x &minus; 4) = 18, what is x&sup2;?",
      choices: ["36", "64", "100", "196"],
      answer: 2,
      expl: "Divide by 3 to get x &minus; 4 = 6, so x = 10 and x&sup2; = 100. The 36 comes from squaring 6, that is, squaring (x &minus; 4) instead of x, which is why underlining what is asked matters." },
    { text: "The ratio of cats to dogs at a shelter is 4 : 5, and there are 12 more dogs than cats. How many dogs are there?",
      choices: ["15", "48", "60", "108"],
      answer: 2,
      expl: "The difference is 5k &minus; 4k = k, so k = 12 and dogs = 5 &times; 12 = 60. The 48 is the number of cats, a correct computation attached to the wrong animal, and 108 is the total." },
    { text: "Which two statements must be true? (Select TWO.)",
      choices: [
        "For any positive integer n, n(n + 1) is even",
        "For any positive integer n, n&sup2; + n + 1 is even",
        "If an integer is divisible by 9, its digits sum to a multiple of 9",
        "Every prime number is odd"],
      answer: [0, 2],
      expl: "Consecutive integers guarantee an even factor, and the digit-sum test for 9 holds for every multiple of 9. \"Every prime is odd\" fails on exactly one number, 2, which is the only even prime and the reason that claim shows up so often as a distractor." }
  ]);

  /* ============================================================
     UNIT 4
     ============================================================ */

  extend("gm4_1", "quiz", [
    { text: "A rectangle has length 12 and diagonal 13. What is its perimeter?",
      choices: ["30", "34", "50", "60"],
      answer: 1,
      expl: "The diagonal makes a right triangle with the sides, and 5-12-13 is a standard triple, so the width is 5 and the perimeter is 2(12 + 5) = 34. The 60 is the area, which is what you compute if you find the width correctly and then answer the wrong question." },
    { text: "An equilateral triangle has side 6. What is its area?",
      choices: ["9&radic;3", "12&radic;3", "18", "36&radic;3"],
      answer: 0,
      expl: "Drop an altitude to split it into two 30-60-90 triangles with legs 3 and 3&radic;3, so the area is &frac12; &times; 6 &times; 3&radic;3 = 9&radic;3. The 18 comes from using 6 as the height, which is the side length, not the perpendicular distance to the base." },
    { text: "In a circle of radius 9, a sector has a central angle of 60&deg;. What is the length of its arc?",
      choices: ["3&pi;", "4.5&pi;", "9&pi;", "13.5&pi;"],
      answer: 0,
      expl: "Arc length is (60/360) &times; 2&pi;(9) = (1/6)(18&pi;) = 3&pi;. The 13.5&pi; choice is the sector's <em>area</em>, (1/6)(81&pi;), computed correctly but for the wrong quantity, so read whether the question wants a length or an area." },
    { text: "What is the distance between the points (&minus;2, 3) and (4, &minus;5)?",
      choices: ["10", "2&radic;13", "14", "&radic;14"],
      answer: 0,
      expl: "The horizontal change is 6 and the vertical change is 8, and 6-8-10 is a scaled 3-4-5 triple, so the distance is 10. The 14 comes from adding the legs instead of applying the Pythagorean theorem, which would only be the walking distance along the grid." },
    { text: "Which two statements are true? (Select TWO.)",
      choices: [
        "A square inscribed in a circle has a diagonal equal to the circle's diameter",
        "A square inscribed in a circle has a side equal to the circle's diameter",
        "A circle inscribed in a square has a diameter equal to the square's side",
        "An angle inscribed in a semicircle measures 45&deg;"],
      answer: [0, 2],
      expl: "When the square is inside, its corners touch the circle, so the diagonal spans the diameter; when the circle is inside, it touches the midpoints of the sides, so the diameter equals the side. Swapping these two relationships is the classic error, and an angle inscribed in a semicircle is always 90&deg;, never 45&deg;." }
  ]);

  extend("gm4_2", "quiz", [
    { text: "A code is formed by arranging 3 of 5 distinct letters in order, with no letter repeated. How many codes are possible?",
      choices: ["10", "15", "60", "125"],
      answer: 2,
      expl: "Order matters, so it is a permutation: 5 &times; 4 &times; 3 = 60. The 10 is C(5,3), the count you get by treating the letters as an unordered selection, which would be right for a committee but wrong for a code." },
    { text: "Two fair six-sided dice are rolled. What is the probability that the sum is 7?",
      choices: ["1/6", "1/9", "1/12", "5/36"],
      answer: 0,
      expl: "There are 6 ordered pairs summing to 7 out of 36 equally likely outcomes, so 6/36 = 1/6. The 5/36 belongs to a sum of 6 or 8; 7 is the unique sum with the most combinations, which is why it is the most likely roll." },
    { text: "For the set {4, 7, 7, 10, 22}, which is true?",
      choices: [
        "The mean is greater than the median",
        "The median is greater than the mean",
        "The mean equals the median",
        "The relationship cannot be determined"],
      answer: 0,
      expl: "The mean is 50/5 = 10 and the median is the middle value, 7, so the mean is larger. The 22 pulls the mean upward while leaving the median untouched, which is exactly the outlier behavior the GRE tests." },
    { text: "Every value in a data set is multiplied by 3. What happens to the standard deviation?",
      choices: [
        "It is unchanged",
        "It is multiplied by 3",
        "It is multiplied by 9",
        "It becomes zero"],
      answer: 1,
      expl: "Scaling every value stretches the spread by the same factor, so the standard deviation is multiplied by 3. \"Unchanged\" is the rule for <em>adding</em> a constant, which shifts the data without stretching it, and confusing the two is the standard slip." },
    { text: "A bag holds 5 green and 3 yellow marbles. Two are drawn without replacement. Which two statements are true? (Select TWO.)",
      choices: [
        "The probability that both are green is 5/14",
        "The probability that both are green is 25/64",
        "The probability that at least one is yellow is 9/14",
        "The probability that at least one is yellow is 3/8"],
      answer: [0, 2],
      expl: "Both green is (5/8)(4/7) = 20/56 = 5/14, and at least one yellow is its complement, 1 &minus; 5/14 = 9/14. The 25/64 figure is (5/8)&sup2;, which assumes the first marble goes back in the bag, so it ignores the without-replacement condition entirely." }
  ]);

  extend("gm4_3", "quiz", [
    { text: "A line graph rises every year from 2019 to 2023, but each year's segment is less steep than the one before. What does this show?",
      choices: [
        "The quantity is shrinking",
        "The quantity is constant",
        "The quantity is still growing, but more slowly each year",
        "The quantity peaked in 2019"],
      answer: 2,
      expl: "A rising line means growth, and decreasing steepness means the <em>rate</em> of growth is falling, not the quantity. Reading the flattening as a decline confuses the slope with the value, which is the most common line-graph misread." },
    { text: "In a stacked bar chart, one segment's top edge sits at 70 and the segment beneath it ends at 45. What is that segment's value?",
      choices: ["25", "45", "70", "115"],
      answer: 0,
      expl: "In a stacked bar, a segment's value is its own height, 70 &minus; 45 = 25, not the position of its top edge. Reading 70 off the axis is the trap the stacked format is built on, since that number is the cumulative total, not the category." },
    { text: "A category occupies a central angle of 54&deg; in a pie chart. What percent of the total does it represent?",
      choices: ["15%", "18%", "20%", "54%"],
      answer: 0,
      expl: "Percent = 54/360 = 0.15, so 15%. The 18% answer comes from dividing by 300 or from estimating against a quarter-circle; the anchor worth memorizing is that 90&deg; is 25%, so 54&deg; must be well under that." },
    { text: "Which two habits reduce Data Interpretation errors? (Select TWO.)",
      choices: [
        "Checking whether the vertical axis begins at zero",
        "Comparing bar heights directly when the question asks about a rate",
        "Confirming the chart's units against the units used in the answer choices",
        "Using the on-screen calculator for every computation"],
      answer: [0, 2],
      expl: "A truncated axis exaggerates differences, and a units mismatch between a chart in thousands and choices in units produces a perfect calculation with a wrong answer. Rates always require division, so comparing heights answers a question about magnitude rather than the one that was asked." }
  ]);

  extend("gm4_4", "quiz", [
    { text: "x is an integer and x&sup2; = 16. <b>Quantity A:</b> x. <b>Quantity B:</b> 4.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 3,
      expl: "x can be 4, making the quantities equal, or &minus;4, making Quantity B greater, and two different relationships mean the relationship is not fixed. \"Quantity B is greater\" is the trap for anyone who remembers the negative root but forgets to check whether equality is also possible." },
    { text: "n &gt; 0. <b>Quantity A:</b> (n + 1)/n. <b>Quantity B:</b> 1.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 0,
      expl: "Split the fraction: (n + 1)/n = 1 + 1/n, and 1/n is positive for every positive n, so Quantity A always exceeds 1. Reaching for \"cannot be determined\" because a variable is present is the reflex to resist here; simplifying first shows the variable cannot change the outcome." },
    { text: "<b>Quantity A:</b> the area of a square with perimeter 20. <b>Quantity B:</b> the area of a circle with circumference 20.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 1,
      expl: "The square has side 5 and area 25; the circle has r = 10/&pi;, so its area is 100/&pi; &asymp; 31.8, making Quantity B greater. For a fixed perimeter the circle always encloses the most area, and note that with two specific numbers \"cannot be determined\" was impossible from the start." },
    { text: "0 &lt; x &lt; 1. <b>Quantity A:</b> x&sup3;. <b>Quantity B:</b> x&sup2;.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 1,
      expl: "Multiplying x&sup2; by a factor smaller than 1 shrinks it, so x&sup3; &lt; x&sup2; throughout the interval (at x = 0.5: 0.125 versus 0.25). Without the constraint the answer would be (D), since a negative x or an x above 1 reverses it, which is why reading the given condition is the entire question." },
    { text: "Which two operations may you safely perform on both quantities in a Quantitative Comparison? (Select TWO.)",
      choices: [
        "Divide both quantities by 4",
        "Square both quantities",
        "Subtract the same expression from both quantities",
        "Multiply both quantities by x when x could be negative"],
      answer: [0, 2],
      expl: "Dividing by a known positive number and subtracting the same thing from both sides preserve the relationship exactly. Squaring is unsafe because it destroys sign information (&minus;5 and 3 reverse order once squared), and multiplying by a possibly negative variable flips the comparison outright." }
  ]);

  extend("gcp4", "questions", [
    { text: "A cylinder has radius 3 and height 5. What is its volume?",
      choices: ["45&pi;", "15&pi;", "30&pi;", "75&pi;"],
      answer: 0,
      expl: "V = &pi;r&sup2;h = &pi;(9)(5) = 45&pi;. The 15&pi; comes from using r rather than r&sup2;, and the 30&pi; is the lateral surface area, 2&pi;rh, which is a different quantity entirely." },
    { text: "In how many different orders can 4 distinct books be arranged on a shelf?",
      choices: ["4", "12", "24", "256"],
      answer: 2,
      expl: "Arrangements of distinct items use the factorial: 4! = 24. The 256 is 4<sup>4</sup>, which would count arrangements if books could repeat, and 12 is 4 &times; 3, stopping two steps early." },
    { text: "A fair coin is flipped 4 times. What is the probability of getting at least one tail?",
      choices: ["15/16", "7/8", "1/2", "1/16"],
      answer: 0,
      expl: "Use the complement: P(no tails) = (1/2)<sup>4</sup> = 1/16, so P(at least one tail) = 15/16. The 7/8 is the answer for three flips, and it is what you get by reaching for a memorized result instead of recounting the flips." },
    { text: "<b>Quantity A:</b> the slope of the line through (1, 2) and (4, 11). <b>Quantity B:</b> 3.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 2,
      expl: "Slope = (11 &minus; 2)/(4 &minus; 1) = 9/3 = 3, so the quantities are equal. Because both are specific numbers, \"cannot be determined\" was eliminable before any computation began." },
    { text: "A triangle has sides 9, 12, and 15. Which two statements are true? (Select TWO.)",
      choices: [
        "It is a right triangle",
        "It is equilateral",
        "Its area is 54",
        "Its area is 90"],
      answer: [0, 2],
      expl: "9-12-15 is the 3-4-5 triple scaled by 3, so the triangle is right, and the legs serve as base and height: &frac12;(9)(12) = 54. The 90 comes from using the hypotenuse as a side of the rectangle-style product, which overcounts because 15 is not perpendicular to anything." }
  ]);

  /* ============================================================
     UNIT 5
     ============================================================ */

  extend("gm5_1", "quiz", [
    { text: "Which single addition most often moves an Issue essay from a 4 to a 5?",
      choices: [
        "A longer introduction that restates the prompt",
        "A conclusion that repeats the thesis in new words",
        "A body paragraph that states the strongest objection honestly and then answers it",
        "A list of three additional examples"],
      answer: 2,
      expl: "Graders reward reasoning that survives contact with the other side, and most 4-level essays simply never acknowledge one. Adding more examples feels like development but usually produces more assertions at the same shallow depth, which is what capped the essay at a 4 in the first place." },
    { text: "The task instructions say to \"describe specific circumstances in which adopting the recommendation would or would not be advantageous.\" An essay that argues forcefully that the recommendation is always right will most likely:",
      choices: [
        "Score well for the strength of its conviction",
        "Be capped low, because it does not perform the task it was assigned",
        "Be scored purely on grammar and mechanics",
        "Receive a 6 if the examples are strong"],
      answer: 1,
      expl: "The instructions are part of the assignment, and an essay that ignores them is answering a different prompt no matter how well it is written. Conviction reads as strength in ordinary argument, which is exactly why this trap catches confident writers." },
    { text: "Essay length correlates with score. What is the actual reason?",
      choices: [
        "Graders award points per paragraph",
        "ETS enforces a 500-word minimum",
        "Longer essays display more vocabulary",
        "Developing reasons with concrete examples takes words, and a very short essay cannot have developed anything"],
      answer: 3,
      expl: "Length is a symptom of development, not a cause of the score: you cannot show a specific case in detail in 250 words. Believing there is an enforced minimum leads people to pad, which adds words without adding the development that the correlation actually reflects." },
    { text: "Which two statements about the Analytical Writing section are correct? (Select TWO.)",
      choices: [
        "It is scored from 0 to 6",
        "It is scored from 130 to 170",
        "You have 30 minutes for it",
        "It contains two separate essay tasks"],
      answer: [0, 2],
      expl: "One Issue essay, 30 minutes, scored 0 to 6 in half-point increments. The 130-to-170 range belongs to Verbal and Quant, and the second essay, the Argument task, was removed when the test was shortened." }
  ]);

  extend("gm5_2", "quiz", [
    { text: "You finish the eight sentence-level Verbal questions in seven minutes total. What has this bought you?",
      choices: [
        "Nothing, since unused time cannot carry over",
        "A higher score on those eight questions",
        "Roughly five extra minutes for the reading passages, which is where time is genuinely needed",
        "Permission to leave the section early"],
      answer: 2,
      expl: "Time inside a section is fungible: minutes saved on fast question types fund the passages that cannot be rushed. Speed itself earns nothing on the questions you just answered; its entire value is what it buys later in the same section." },
    { text: "What is the main risk of abandoning the two-pass method and grinding through a hard question?",
      choices: [
        "You may run out of scratch paper",
        "You trade several answerable questions at the end of the section for one difficult one",
        "The test penalizes slow answers",
        "Marked questions are scored differently"],
      answer: 1,
      expl: "Since every question carries the same weight, four minutes spent on one hard item is four minutes taken from two or three you could have answered, a straight loss of points. The penalty is entirely an opportunity cost, not anything the scoring engine does to you." },
    { text: "Reviewing a practice test, you find that four misses came from rushing the last questions of a section and two came from topics you had never studied. What is the primary fix?",
      choices: [
        "Study more content, since content gaps are the real problem",
        "Take more practice tests without reviewing them",
        "Work only on the hardest questions",
        "Fix the pacing, since most of the damage came from arriving at the end of the section with no time"],
      answer: 3,
      expl: "The bigger bucket is timing, so the fix is a pacing change, such as guessing and marking earlier, that puts real minutes at the end of the section. Defaulting to more content study addresses the smaller bucket and is the reflex that keeps scores flat." },
    { text: "Which two techniques raise your odds above a blind guess? (Select TWO.)",
      choices: [
        "Eliminating \"cannot be determined\" when both quantities are specific numbers",
        "Choosing the longest answer choice",
        "Eliminating Reading Comprehension answers containing \"always\" or \"proves\"",
        "Choosing the answer that repeats the most words from the passage"],
      answer: [0, 2],
      expl: "Both eliminations rest on real properties of the test: two known numbers always have a fixed relationship, and hedged academic passages rarely support absolutes. Length and repeated passage vocabulary are surface features that wrong answers imitate deliberately, so leaning on them is worse than random." }
  ]);

  extend("gm5_3", "quiz", [
    { text: "What is &radic;(9 + 16)?",
      choices: ["5", "7", "12", "25"],
      answer: 0,
      expl: "Add first, then take the root: &radic;25 = 5. The 7 is &radic;9 + &radic;16, and roots never distribute across addition, which is the single most repeated algebra error on the test." },
    { text: "What is the sum of the integers from 1 to 30, inclusive?",
      choices: ["435", "465", "495", "900"],
      answer: 1,
      expl: "n(n + 1)/2 = 30(31)/2 = 465. The 435 is the sum through 29, which is what you get from using (n &minus; 1)n/2 or from stopping one term early; the 900 is 30&sup2;." },
    { text: "A 45-45-90 triangle has a hypotenuse of 8. What is the length of each leg?",
      choices: ["4", "4&radic;2", "4&radic;3", "8&radic;2"],
      answer: 1,
      expl: "The ratio is x : x : x&radic;2, so x&radic;2 = 8 gives x = 8/&radic;2 = 4&radic;2. The 8&radic;2 answer multiplies by &radic;2 instead of dividing, producing legs longer than the hypotenuse, which the sanity check should catch instantly." },
    { text: "Which two statements are true? (Select TWO.)",
      choices: [
        "Adding a constant to every value leaves the standard deviation unchanged",
        "\"At least one\" probabilities are best computed as 1 &minus; P(none)",
        "Figures in the coordinate plane are not drawn to scale",
        "Averaging the two speeds gives the average speed for a round trip"],
      answer: [0, 1],
      expl: "A constant shift moves every value equally without changing the spread, and the complement turns a messy enumeration into one subtraction. Coordinate systems and number lines are the stated exception to the not-to-scale rule, and average speed always requires total distance divided by total time." }
  ]);

  extend("gcp5", "questions", [
    { text: "What is the units digit of 9<sup>15</sup>?",
      choices: ["1", "3", "8", "9"],
      answer: 3,
      expl: "Powers of 9 end in 9, 1, 9, 1, a cycle of length 2, so odd exponents end in 9. The 1 is the trap for landing on the wrong parity, which is the only thing this question actually tests." },
    { text: "A rectangle's length is 3 times its width, and its perimeter is 64. What is its area?",
      choices: ["96", "192", "256", "384"],
      answer: 1,
      expl: "Perimeter = 2(3w + w) = 8w = 64, so w = 8 and the length is 24, giving an area of 192. The 384 comes from treating 64 as half the perimeter and doubling the dimensions, and 96 comes from stopping at 8 &times; 12." },
    { text: "\"The lecture was mercifully ______: the speaker finished in twenty minutes and took no questions.\" The blank means:",
      choices: ["Protracted", "Erudite", "Succinct", "Digressive"],
      answer: 2,
      expl: "The colon explains the blank, and \"finished in twenty minutes\" plus \"mercifully\" points to brevity: <em>succinct</em>. <em>Protracted</em> and <em>digressive</em> both mean the opposite, and <em>erudite</em> is a word one expects near \"lecture\" without being anything the sentence's evidence supports." },
    { text: "In Critical Reasoning, what does the negation test establish?",
      choices: [
        "Whether a choice weakens the argument",
        "Whether the conclusion is actually true",
        "Whether the evidence is accurate",
        "Whether a choice is a necessary assumption"],
      answer: 3,
      expl: "If negating a choice makes the argument collapse, that choice was required for the argument to work, which is the definition of a necessary assumption. It is not a weaken tool: plenty of statements damage an argument without being assumptions it depends on." },
    { text: "<b>Quantity A:</b> 2<sup>30</sup>. <b>Quantity B:</b> 4<sup>16</sup>.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 1,
      expl: "Rewrite in a common base: 4<sup>16</sup> = (2&sup2;)<sup>16</sup> = 2<sup>32</sup>, which exceeds 2<sup>30</sup>. Comparing the visible numbers instead, 30 against 16, makes Quantity A look larger, which is exactly why the bases must be matched before the exponents mean anything." },
    { text: "Which two statements about test-day strategy are correct? (Select TWO.)",
      choices: [
        "Every question within a section carries the same weight",
        "Questions you mark for review are scored differently",
        "A blank scores the same as a wrong answer",
        "You may return to a previous section later in the test"],
      answer: [0, 2],
      expl: "Equal weighting is why the two-pass method works, and identical scoring for blanks and wrong answers is why a guess strictly dominates leaving anything empty. Marking is a purely private navigation aid, and once you exit a section it is closed for good." }
  ]);

})();
