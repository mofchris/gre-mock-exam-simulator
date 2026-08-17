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
      expl: "Convert the section to seconds first, then divide.<br>21 minutes &times; 60 = 1,260 seconds.<br>1,260 &divide; 12 = <strong>105 seconds</strong> per question.<br><em>The trap:</em> \"about 90 seconds\" is the <em>Verbal</em> Section 1 budget (18 minutes for 12 questions), so it feels like the familiar number and gets grabbed by reflex.<br><em>Fast method:</em> minutes &times; 60 &divide; questions &mdash; memorize 105s Quant, 90s Verbal. Target: ~10 seconds." },
    { text: "You stumble badly through Verbal Section 1, then answer every question in Verbal Section 2 correctly. What is the most likely result?",
      choices: [
        "A near-perfect Verbal score, since Section 2 was flawless",
        "Only Section 2 counts, so Section 1 is irrelevant",
        "A score capped well below your potential, because the weak Section 1 routed you into an easier Section 2",
        "The test re-administers Section 1"],
      answer: 2,
      expl: "Ask what Section 1 actually controls.<br>Section-level adaptivity means Section 1 performance chooses the <strong>difficulty of Section 2</strong>.<br>That difficulty is folded into the scaled score, not just the raw count.<br>So a perfect run through an easy Section 2 still lands in a lower band: <strong>capped below your potential</strong>.<br><em>The trap:</em> \"near-perfect, since Section 2 was flawless\" treats raw correct answers as everything &mdash; true on a non-adaptive test, not this one.<br><em>Fast method:</em> on a section-adaptive test, Section 1 sets your ceiling. Target: ~15 seconds." },
    { text: "The pacing table shows roughly 90 seconds per Verbal question. How should you actually spend that time inside a section?",
      choices: [
        "Give every question close to 90 seconds so nothing is rushed",
        "Finish Text Completions in 45&ndash;60 seconds so a long Reading Comprehension passage can take several minutes",
        "Spend the most time on Text Completions, since they come first",
        "Skip Reading Comprehension entirely and bank the time"],
      answer: 1,
      expl: "The 90 seconds is an average across tasks of wildly different length.<br>Sentence-level questions are fast: 45&ndash;60 seconds each.<br>The seconds banked there fund a passage that genuinely needs three or four minutes.<br>So <strong>finish Text Completions quickly so Reading Comprehension can run long</strong>.<br><em>The trap:</em> spending an even 90 seconds everywhere sounds disciplined but starves exactly the questions that require time.<br><em>Fast method:</em> averages are budgets to redistribute, not per-question timers. Target: ~15 seconds." },
    { text: "Every question in a section is worth the same. Which two consequences follow? (Select TWO.)",
      choices: [
        "Doing the questions you can answer quickly, before the slow ones, maximizes your score",
        "Harder questions deserve proportionally more of your time because they are worth more",
        "A question you answer in 30 seconds is worth exactly as much as one that takes four minutes",
        "You should always work through the questions in the order presented"],
      answer: [0, 2],
      expl: "Equal weighting means points are bought with questions <em>answered</em>, not difficulty conquered.<br>So harvesting the fast ones first maximizes how many you answer &mdash; correct.<br>And a 30-second question is worth exactly what a four-minute one is &mdash; correct.<br>Answer: <strong>both of those</strong>.<br><em>The trap:</em> \"harder questions are worth more\" describes a different test entirely; on the GRE that belief only guarantees you run out of clock.<br><em>Fast method:</em> equal points means maximize count, not conquest. Target: ~20 seconds." }
  ]);

  extend("gm1_2", "quiz", [
    { text: "The root <em>-loqu-</em> means speech. A speaker described as <b>grandiloquent</b> is most likely:",
      choices: [
        "Pompous and inflated in style",
        "Barely audible",
        "Careless with grammar",
        "Admirably brief"],
      answer: 0,
      expl: "Split the word, then read both halves.<br>grand = lofty, swollen. -loqu- = speech.<br>Lofty, swollen speech = <strong>pompous and inflated in style</strong>.<br><em>The trap:</em> \"admirably brief\" describes <em>laconic</em>, the opposite quality, and tempts anyone who reads the root and forgets the prefix.<br><em>Fast method:</em> decode prefix and root separately, then combine. Target: ~10 seconds." },
    { text: "\"Her review was thoroughly ______: she praised the score, savaged the script, and declined to say whether the film worked.\" The blank means:",
      choices: [
        "Unequivocal",
        "Equivocal",
        "Laudatory",
        "Laconic",
        "Vitriolic"],
      answer: 1,
      expl: "The colon means what follows defines the blank.<br>Evidence: praised one thing, savaged another, then <em>declined to say</em> whether it worked.<br>That is a refusal to come down on either side &mdash; <strong>equivocal</strong>.<br><em>The trap:</em> <em>unequivocal</em> is the exact reversal, one prefix away, and catches anyone matching the word's look rather than its meaning.<br><em>Fast method:</em> a colon defines the blank &mdash; predict your own word before reading choices. Target: ~20 seconds." },
    { text: "\"Because the drought had ______ an already fragile food supply, relief agencies doubled their shipments.\" The blank means:",
      choices: [
        "Ameliorated",
        "Stabilized",
        "Exacerbated",
        "Obscured"],
      answer: 2,
      expl: "\"Because\" makes the blank the cause of the doubled shipments.<br>The supply was already fragile, and agencies had to send more.<br>So the drought made a bad situation worse &mdash; <strong>exacerbated</strong>.<br><em>The trap:</em> <em>ameliorated</em> means improved, the precise opposite, planted for readers who register the topic (drought, relief) without tracking the direction of the logic.<br><em>Fast method:</em> find the logic word, then fix the direction before picking. Target: ~20 seconds." },
    { text: "Which two roots or prefixes signal something good or pleasant? (Select TWO.)",
      choices: ["mal-", "bene-", "eu-", "contra-"],
      answer: [1, 2],
      expl: "Tag each one with a word you already know.<br><em>bene-</em>: benevolent, benign &rarr; good.<br><em>eu-</em>: eulogy, euphony &rarr; good.<br>Answer: <strong>bene- and eu-</strong>.<br><em>The trap:</em> <em>mal-</em> is bene-'s mirror image (malevolent, malign) and <em>contra-</em> means against, so both belong on the negative side of a charge analysis.<br><em>Fast method:</em> mark every root +, &minus;, or neutral using one familiar example. Target: ~10 seconds." }
  ]);

  extend("gm1_3", "quiz", [
    { text: "\"Because the drug's benefit appeared only in one small subgroup, the authors called their finding ______ rather than definitive.\" The blank means:",
      choices: [
        "Conclusive",
        "Provisional",
        "Irrelevant",
        "Exhaustive"],
      answer: 1,
      expl: "\"Rather than definitive\" tells you the blank is definitive's opposite.<br>Why? The benefit showed up in only one small subgroup.<br>Evidence that thin makes a result tentative &mdash; <strong>provisional</strong>.<br><em>The trap:</em> <em>conclusive</em> is a synonym of definitive, so it reverses the sentence; <em>irrelevant</em> overshoots, since a limited finding is still a finding.<br><em>Fast method:</em> \"rather than X\" means the blank is not-X. Target: ~20 seconds." },
    { text: "On a two-blank Text Completion you are certain of blank (ii) but torn between two options for blank (i). What is the most efficient next move?",
      choices: [
        "Guess between the two and move on immediately",
        "Choose whichever word for (i) is more difficult",
        "Start over and re-solve blank (ii)",
        "Read the sentence with blank (ii) filled in and see which option for (i) produces coherent logic"],
      answer: 3,
      expl: "A solved blank is leverage, so use it.<br><strong>Reread the sentence with (ii) in place</strong>, then test each option for (i).<br>Once the logic is anchored, one of the two usually turns obviously incoherent.<br><em>The trap:</em> guessing immediately throws that leverage away, and since there is no partial credit, a coin flip on (i) makes the whole question a coin flip.<br><em>Fast method:</em> solve the clued blank first, then reread with it filled in. Target: ~15 seconds." },
    { text: "\"The historian's account is admirably ______: she consulted archives in four countries and interviewed every surviving participant.\" The blank means:",
      choices: [
        "Concise",
        "Speculative",
        "Contentious",
        "Thorough"],
      answer: 3,
      expl: "The colon means what follows explains the blank.<br>What follows: archives in four countries, every surviving participant interviewed.<br>That is enormous research scope &mdash; <strong>thorough</strong>.<br><em>The trap:</em> <em>concise</em> is a natural companion to \"admirably\" in ordinary prose, which is exactly why it is offered, but nothing after the colon is about brevity.<br><em>Fast method:</em> take the post-colon evidence literally; ignore words that merely sound at home. Target: ~20 seconds." },
    { text: "Which two statements about Text Completion format are correct? (Select TWO.)",
      choices: [
        "A single-blank question offers five answer choices",
        "A three-blank question offers five choices for each blank",
        "Two- and three-blank questions offer three choices for each blank",
        "Getting two of three blanks right earns partial credit"],
      answer: [0, 2],
      expl: "Count the choices; that is the whole rule.<br>One blank &rarr; five choices.<br>Two or three blanks &rarr; three choices each.<br>Answer: <strong>those two statements</strong>.<br><em>The trap:</em> believing in partial credit makes a three-blank question feel safe to half-solve, when in fact one wrong blank zeroes the entire question.<br><em>Fast method:</em> 1 blank = 5 choices, 2&ndash;3 blanks = 3 each, all-or-nothing scoring. Target: ~10 seconds." }
  ]);

  extend("gm1_4", "quiz", [
    { text: "\"Once ______ by collectors, the painter's late canvases now command prices rivaling those of his celebrated early work.\" Which TWO choices are correct?",
      choices: ["Prized", "Disdained", "Neglected", "Forged"],
      answer: [1, 2],
      expl: "\"Once ... now\" is a reversal frame, so the past attitude opposes the present.<br>Present: prices rival his celebrated early work &mdash; high regard.<br>Past must be low regard: <strong>disdained</strong> and <strong>neglected</strong>.<br>Both give the same sentence, about work that used to be unwanted.<br><em>The trap:</em> <em>prized</em> describes the present situation rather than the past one, so it flattens the arc the sentence is built on.<br><em>Fast method:</em> on \"once ... now,\" flip the sign of the half you can see. Target: ~20 seconds." },
    { text: "\"The senator's speech was so ______ that even her allies could not say afterward what she had committed to.\" Which TWO choices are correct?",
      choices: ["Nebulous", "Strident", "Vague", "Candid"],
      answer: [0, 2],
      expl: "Work backward from the consequence.<br>Even allies could not identify what was promised.<br>So the speech lacked definiteness: <strong>nebulous</strong> and <strong>vague</strong>, true synonyms here.<br><em>The trap:</em> <em>candid</em> means frank and open, which would make the confusion impossible, and <em>strident</em> describes volume rather than clarity.<br><em>Fast method:</em> name the effect, then pick the pair that causes it. Target: ~20 seconds." },
    { text: "You examine the six choices and find three words that all fit the blank's meaning comfortably. What does this most likely mean?",
      choices: [
        "Any two of the three will earn credit",
        "The question is defective",
        "Two of them are closer in meaning to each other, and the third differs in a way the sentence cares about",
        "You should pick the two least common words"],
      answer: 2,
      expl: "The requirement is <strong>equivalent completed sentences</strong>, not merely acceptable ones.<br>So when three words fit loosely, the deciding question is which two produce the <em>same</em> sentence.<br>The third must differ in some way the sentence cares about.<br><em>The trap:</em> \"any two of the three\" ignores the equivalence requirement, and it is precisely how people select one right word and one wrong one.<br><em>Fast method:</em> ask which two are interchangeable here, not which ones fit. Target: ~15 seconds." },
    { text: "Six Sentence Equivalence choices contain three tidy synonym pairs. What determines which pair is correct?",
      choices: [
        "The pair whose words are the most advanced vocabulary",
        "The pair the sentence's signal words and evidence actually require",
        "The pair listed first among the choices",
        "The pair that shares a root with a word in the sentence"],
      answer: 1,
      expl: "Multiple pairs are planted on purpose, so pair-hunting alone cannot solve the question.<br>Only the sentence's logic selects among them.<br>Answer: <strong>the pair the signal words and evidence require</strong>.<br><em>The trap:</em> reaching for the hardest-sounding pair is the habit the decoys are built to punish, since difficulty has no correlation with correctness.<br><em>Fast method:</em> find pairs to narrow the field, then let the clue choose. Target: ~15 seconds." }
  ]);

  extend("gcp1", "questions", [
    { text: "\"The mayor's proposal was hardly ______: nearly identical plans had been floated by three previous administrations.\" The blank means:",
      choices: ["Unprecedented", "Unpopular", "Expensive", "Detailed"],
      answer: 0,
      expl: "The colon explains the blank, and \"hardly\" negates it.<br>Evidence: nearly identical plans came from three previous administrations.<br>So the topic is originality &mdash; hardly <strong>unprecedented</strong>.<br><em>The trap:</em> <em>unpopular</em> is plausible for a mayor's proposal, but nothing after the colon concerns how anyone received it.<br><em>Fast method:</em> match the blank to the evidence's topic, not the sentence's mood. Target: ~20 seconds." },
    { text: "'Prosaic' most nearly means:",
      choices: ["Poetic and elevated", "Dull and unoriginal", "Wordy", "Prophetic"],
      answer: 1,
      expl: "Anchor on the word family, then correct for meaning.<br>Prosaic comes from prose, but it means commonplace and uninspired.<br>Group it with banal and pedestrian: <strong>dull and unoriginal</strong>.<br><em>The trap:</em> \"poetic and elevated\" is built on the prose/poetry contrast &mdash; prosaic means dull, not merely non-verse.<br><em>Fast method:</em> place the word in a synonym cluster you already own. Target: ~10 seconds." },
    { text: "Which two words mean 'cautious'? (Select TWO.)",
      choices: ["Circumspect", "Prudent", "Garrulous", "Tenuous"],
      answer: [0, 1],
      expl: "Look for two words that are genuinely interchangeable.<br><em>Circumspect</em>: careful, alert to risk.<br><em>Prudent</em>: careful, sensible.<br>Same sentence either way &mdash; <strong>circumspect and prudent</strong>.<br><em>The trap:</em> <em>tenuous</em> sounds vaguely negative-and-careful but describes an argument's flimsiness, not a person's caution.<br><em>Fast method:</em> for \"means X,\" demand true interchangeability. Target: ~10 seconds." },
    { text: "You face a two-blank Text Completion and feel unsure about both blanks. What is the best first move?",
      choices: [
        "Fill blank (i) with your best guess and work rightward",
        "Eliminate the longest word in each column",
        "Skip it, since two-blank questions are worth less",
        "Read the whole sentence for its signal word, then solve whichever blank is more heavily clued"],
      answer: 3,
      expl: "Blanks are never equally constrained.<br>So <strong>read the whole sentence for its signal word first</strong>, then solve whichever blank carries more evidence.<br>That solved blank pins the other, turning a two-way guess into a single decision.<br><em>The trap:</em> filling (i) first and working rightward is the default habit that makes people solve the hard blank with no leverage.<br><em>Fast method:</em> easiest blank first, always. Target: ~15 seconds." },
    { text: "'Tenuous' most nearly means:",
      choices: ["Flimsy or weak", "Tense and anxious", "Lengthy", "Stubborn"],
      answer: 0,
      expl: "Test the word in its usual GRE sentence.<br>A tenuous connection is thin enough to break under scrutiny.<br>So: <strong>flimsy or weak</strong>, used almost exclusively for arguments, claims, and links.<br><em>The trap:</em> \"tense and anxious\" is the sound-alike; tenuous shares no meaning with <em>tense</em>.<br><em>Fast method:</em> distrust a choice that only echoes the word's sound. Target: ~10 seconds." }
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
      expl: "Read the signal word and ask what it announces.<br>\"Admittedly,\" like \"granted\" and \"to be sure,\" gives ground to the other side.<br>Authors concede in order to answer: <strong>conceding a point before limiting or answering it</strong>.<br><em>The trap:</em> reading it as the author's conclusion inverts the paragraph's function, and a question about the author's position then gets answered with the very claim she is about to push back on.<br><em>Fast method:</em> concession markers flag borrowed opinion, not the author's. Target: ~15 seconds." },
    { text: "Which statement describes a paragraph's FUNCTION rather than its content?",
      choices: [
        "Nineteenth-century whaling logs recorded daily sea temperatures",
        "Sea temperatures in the North Atlantic rose over the period studied",
        "The paragraph supplies evidence for the claim made in the opening paragraph",
        "The logs were kept by ships' officers"],
      answer: 2,
      expl: "Function is what a paragraph <em>does</em> for the argument; content is what it <em>says</em>.<br>Whaling logs, sea temperatures, ships' officers &mdash; all facts, all content.<br>Only one choice names a job: <strong>supplies evidence for the opening claim</strong>.<br><em>The trap:</em> the content choices are all accurate, and accuracy is what makes them feel right, but content is exactly what you leave on screen to look up rather than memorize.<br><em>Fast method:</em> if it fits \"this paragraph does X for the argument,\" it is function. Target: ~15 seconds." },
    { text: "An answer to a \"primary purpose\" question accurately describes what the third paragraph does, and nothing else. Why is it wrong?",
      choices: [
        "It is too extreme",
        "It uses vocabulary from the passage",
        "It is stated too tentatively",
        "A primary-purpose answer must account for the passage as a whole, not one section of it"],
      answer: 3,
      expl: "Match the answer's scope to the question's scope.<br>The question asks about the passage as a whole.<br>The choice covers only paragraph three &mdash; true, but too narrow: <strong>a primary-purpose answer must account for the whole passage</strong>.<br><em>The trap:</em> this is the \"right answer, wrong part of the passage\" build; nothing in it is extreme or badly hedged, which is what lets it survive a careless elimination pass.<br><em>Fast method:</em> on purpose questions, check scope before truth. Target: ~15 seconds." },
    { text: "A passage reads: \"Traditionally, scholars attributed the settlement's collapse to overhunting. Recent isotope analysis, however, points to a shift in rainfall.\" What is the author's likely position?",
      choices: [
        "Overhunting caused the collapse",
        "Rainfall has no bearing on the collapse",
        "The traditional explanation is being challenged by newer evidence",
        "Earlier scholars deliberately misled their readers"],
      answer: 2,
      expl: "Track who owns each sentence.<br>\"Traditionally, scholars attributed ...\" flags a received view, not the author's.<br>\"Recent isotope analysis, <em>however</em> ...\" is the pivot away from it.<br>So the author is showing that <strong>newer evidence challenges the traditional explanation</strong>.<br><em>The trap:</em> choosing overhunting hands the author the view he raised in order to complicate, the single most common comprehension error; and deliberate deception is a tone the GRE almost never takes.<br><em>Fast method:</em> \"traditionally ... however\" means the author sides with the second half. Target: ~20 seconds." },
    { text: "Which two answer choices should you eliminate on sight in Reading Comprehension? (Select TWO.)",
      choices: [
        "The evidence proves that no alternative explanation is possible",
        "The evidence indicates that one factor may have contributed",
        "The author suggests the record remains incomplete",
        "The finding demonstrates conclusively that the practice was universal"],
      answer: [0, 3],
      expl: "Scan for certainty and reach, not for content.<br>\"Proves that no alternative is possible\" &mdash; absolute.<br>\"Demonstrates conclusively ... universal\" &mdash; absolute plus universal scope.<br>Both claim more than hedged academic prose supports: <strong>eliminate those two</strong>.<br><em>The trap:</em> the survivors use <em>indicates</em>, <em>may</em>, and <em>suggests</em>, and that hedged register is usually where the credited answer lives.<br><em>Fast method:</em> flag proves, conclusively, no alternative, always, universal, never. Target: ~15 seconds." }
  ]);

  extend("gm2_2", "quiz", [
    { text: "The passage states: \"Many of the surviving manuscripts, though by no means all, show the corrections.\" Which answer is supported?",
      choices: [
        "Every surviving manuscript shows the corrections",
        "Most surviving manuscripts show the corrections",
        "A substantial number of surviving manuscripts show the corrections",
        "Almost no surviving manuscripts show the corrections"],
      answer: 2,
      expl: "Pin the quantifier exactly.<br>\"Many ... though by no means all\" establishes a substantial number and stops there.<br>Supported: <strong>a substantial number show the corrections</strong>.<br><em>The trap:</em> \"most\" asserts a majority, and many is entirely compatible with a minority, so that choice quietly adds a quantitative claim the passage never made.<br><em>Fast method:</em> many &ne; most &mdash; never upgrade a quantifier. Target: ~20 seconds." },
    { text: "A passage says: \"Whatever its commercial success, the format never influenced later composers.\" What does this construction tell you?",
      choices: [
        "Commercial success is the author's measure of influence",
        "The author explicitly rules commercial success out as evidence of influence",
        "The format was a commercial failure",
        "Later composers admired the format"],
      answer: 1,
      expl: "Decode the construction, not the topic.<br>\"Whatever its X\" is concede-and-dismiss: the author grants X and declares it beside the point.<br>Here X is commercial success and the claim is about influence, so the author <strong>rules commercial success out as evidence of influence</strong>.<br><em>The trap:</em> reading it as \"the format failed commercially\" adds a fact the sentence deliberately leaves open &mdash; the phrasing works whether it sold well or badly.<br><em>Fast method:</em> \"whatever its X\" means X is off the table. Target: ~20 seconds." },
    { text: "A sentence begins \"To be sure, the earlier estimates were imprecise.\" What follows is most likely:",
      choices: [
        "Further support for the imprecision",
        "The passage's opening thesis",
        "A turn in which the author argues the imprecision does not undermine the conclusion",
        "An unrelated example"],
      answer: 2,
      expl: "\"To be sure\" is a concession marker.<br>Concessions exist to be answered, so the author is not endorsing the imprecision.<br>The sentence after it carries the real point: <strong>a turn arguing the imprecision does not undermine the conclusion</strong>.<br><em>The trap:</em> expecting more support for the imprecision treats the concession as the author's own emphasis, which reverses who is speaking.<br><em>Fast method:</em> after a concession marker, predict a but. Target: ~15 seconds." },
    { text: "A passage closes: \"The theory's explanatory reach is undeniable, though its empirical foundations remain thin.\" The author's attitude is best described as:",
      choices: [
        "Unqualified endorsement",
        "Admiring but reserved",
        "Contemptuous dismissal",
        "Complete indifference"],
      answer: 1,
      expl: "Score each half of the sentence.<br>\"Explanatory reach is undeniable\" &rarr; praise.<br>\"Though its empirical foundations remain thin\" &rarr; stated reservation.<br>Praise plus reservation is textbook qualified approval: <strong>admiring but reserved</strong>.<br><em>The trap:</em> \"unqualified endorsement\" reads only the emphatic first half, which is what makes it tempting; extreme attitudes at either end almost never survive a hedged closing clause.<br><em>Fast method:</em> a \"though\" clause forces a mixed-tone answer. Target: ~15 seconds." },
    { text: "Two answers survive and differ by a single word. Which two moves resolve the question? (Select TWO.)",
      choices: [
        "Identify the divergent word and check it directly against the passage's own language",
        "Choose the longer and more detailed answer",
        "Ask whether one choice overstates the passage's certainty or widens its scope",
        "Choose the answer that reuses the most vocabulary from the passage"],
      answer: [0, 2],
      expl: "Two survivors differing by one word means the question has already narrowed to that word.<br>So <strong>locate the divergent word and check it against the passage's own language</strong>.<br>Then <strong>ask whether one choice overstates certainty or widens scope</strong> &mdash; the divergence is nearly always a quantifier, a qualifier, or a scope shift.<br><em>The trap:</em> picking the longer, more detailed answer, or the one reusing the most passage vocabulary; those are surface features trap answers imitate on purpose.<br><em>Fast method:</em> decide at the point of divergence, in the passage. Target: ~20 seconds." }
  ]);

  extend("gm2_3", "quiz", [
    { text: "A town installed speed cameras in 2015, and by 2018 traffic deaths had fallen 30%. Officials credit the cameras. Which fact most weakens the argument?",
      choices: [
        "The cameras cost more than the town had budgeted",
        "Traffic volume was roughly unchanged over the period",
        "The town rebuilt its two most dangerous intersections in 2016",
        "A few drivers slowed only when directly in front of a camera"],
      answer: 2,
      expl: "To weaken a causal claim, supply a rival cause inside the same window.<br>Conclusion: the cameras produced the 30% drop.<br><strong>Rebuilding the two most dangerous intersections in 2016</strong> could explain the whole drop with the cameras doing nothing.<br><em>The trap:</em> the cost overrun says nothing about whether the cameras worked, and unchanged traffic volume actually <em>removes</em> a competing explanation, nudging the argument the other way.<br><em>Fast method:</em> hunt for another change in the same time period. Target: ~30 seconds." },
    { text: "A company claims its new onboarding program caused first-year turnover to drop. Which fact most strengthens the claim?",
      choices: [
        "Turnover at comparable firms with no such program was unchanged over the same period",
        "New hires reported enjoying the program",
        "The program cost less than the company expected",
        "A few employees left despite completing the program"],
      answer: 0,
      expl: "To strengthen a causal claim, kill the rival explanation.<br>Rival: turnover fell everywhere for industry-wide reasons.<br><strong>Comparable firms without the program saw no change</strong> &mdash; that rules the industry out and isolates the program as the difference.<br><em>The trap:</em> new hires enjoying the program speaks to satisfaction, not retention &mdash; a merely-relevant answer that touches the topic without moving the conclusion.<br><em>Fast method:</em> a control group with no effect is the strongest strengthener. Target: ~30 seconds." },
    { text: "\"The new bridge will shorten commute times, since it provides a direct route from the suburb to downtown.\" Which is an assumption the argument requires?",
      choices: [
        "The bridge was built under budget",
        "Commuters prefer driving to taking transit",
        "The old route will be closed",
        "A meaningful number of commuters will actually use the bridge"],
      answer: 3,
      expl: "Run the negation test on each candidate.<br>Negate <strong>\"a meaningful number of commuters will actually use the bridge\"</strong>: if essentially no one drives it, commute times cannot fall and the argument collapses. So it is required.<br><em>The trap:</em> \"commuters prefer driving to transit\" is a broader preference claim the argument never needs &mdash; a route can shorten commutes for whoever drives it regardless.<br><em>Fast method:</em> negate the choice; if the argument dies, it was necessary. Target: ~30 seconds." },
    { text: "\"Our best-selling product also has our highest customer-satisfaction score, so improving quality is what drives sales.\" The flaw is that the argument:",
      choices: [
        "Treats a correlation as though the direction of causation were established",
        "Relies on evidence that is probably false",
        "Uses a sample that is too small",
        "Assumes conditions have not changed over time"],
      answer: 0,
      expl: "Name the logical move.<br>Evidence: best-seller also scores highest on satisfaction &mdash; a correlation.<br>Conclusion: quality drives sales &mdash; one specific causal direction.<br>But satisfaction could be a <em>result</em> of popularity, or both could follow from price: <strong>the argument treats correlation as settled causation</strong>.<br><em>The trap:</em> \"the evidence is probably false\" is off-limits, since premises are granted, and it is the most common way to answer this kind of question wrongly.<br><em>Fast method:</em> two facts, one arrow asserted &mdash; check direction and third causes. Target: ~30 seconds." },
    { text: "Which two answers would NOT properly weaken an argument? (Select TWO.)",
      choices: [
        "Disputing the accuracy of the survey data offered as evidence",
        "Offering an alternative explanation for the observed outcome",
        "Noting that the person making the argument lacks credentials",
        "Showing that the two groups being compared differ in composition"],
      answer: [0, 2],
      expl: "Legitimate weakeners attack the <em>link</em> from evidence to conclusion.<br>Premises are granted as true, so <strong>disputing the survey data</strong> is not available to you.<br>And <strong>attacking the speaker's credentials</strong> targets the person, not the reasoning.<br><em>The trap:</em> disputing the data feels devastating in real argument, which is why it is offered here; the other two choices (alternative explanation, non-comparable groups) both strike the evidence-to-conclusion link, where every real weakener lands.<br><em>Fast method:</em> accept the premises, strike the leap. Target: ~20 seconds." }
  ]);

  extend("gcp2", "questions", [
    { text: "\"Students who eat breakfast score higher on tests, so schools should serve breakfast to raise scores.\" Which most weakens this?",
      choices: [
        "Students who eat breakfast typically come from households with more stable routines and more academic support",
        "Breakfast foods vary widely in nutritional value",
        "Some high-scoring students skip breakfast",
        "The study examined only one school district"],
      answer: 0,
      expl: "Hunt the third variable behind both observed facts.<br><strong>Households with stable routines and academic support</strong> plausibly produce both the breakfast and the higher scores.<br>The correlation survives, but the causal claim dies, so serving breakfast need not raise scores.<br><em>The trap:</em> \"only one school district\" disputes the quality of the evidence rather than the leap from evidence to conclusion, and a few high-scoring skippers are perfectly compatible with a general effect.<br><em>Fast method:</em> correlation-to-policy arguments fall to a common cause. Target: ~30 seconds." },
    { text: "A passage states that every documented eruption of the volcano was preceded by a swarm of small earthquakes. Which must be true?",
      choices: [
        "Every earthquake swarm at the volcano is followed by an eruption",
        "No documented eruption occurred without a preceding swarm",
        "Earthquake swarms cause eruptions",
        "The volcano is likely to erupt again soon"],
      answer: 1,
      expl: "\"Must be true\" means restate the given and add nothing.<br>Given: every documented eruption was preceded by a swarm.<br><strong>\"No documented eruption occurred without a preceding swarm\"</strong> is that same sentence, so it is guaranteed.<br><em>The trap:</em> \"every swarm is followed by an eruption\" reverses the conditional &mdash; swarms could occur a hundred times with nothing following and the passage would still be true.<br><em>Fast method:</em> eruption &rarr; swarm does not give swarm &rarr; eruption. Target: ~20 seconds." },
    { text: "'Candor' most nearly means:",
      choices: ["Frankness", "Flattery", "Caution", "Brightness"],
      answer: 0,
      expl: "Convert the unfamiliar noun into the adjective you know.<br><em>Candid</em> = honest, unguarded; candor is its noun.<br>So: <strong>frankness</strong>.<br><em>The trap:</em> \"flattery\" tempts anyone who associates candor with pleasantness &mdash; candid speech is frequently the unwelcome kind.<br><em>Fast method:</em> swap the noun for its familiar adjective form. Target: ~10 seconds." },
    { text: "Which two words mean 'talkative'? (Select TWO.)",
      choices: ["Garrulous", "Laconic", "Voluble", "Reticent"],
      answer: [0, 2],
      expl: "Find the pair that genuinely matches.<br><em>Garrulous</em>: talks on and on. <em>Voluble</em>: talks freely and fluently.<br>Answer: <strong>garrulous and voluble</strong>.<br><em>The trap:</em> laconic and reticent form a competing pair meaning the opposite &mdash; exactly the setup Sentence Equivalence uses to punish anyone who grabs a tidy pair without checking the sentence's direction.<br><em>Fast method:</em> when two pairs exist, direction decides. Target: ~10 seconds." },
    { text: "An argument concludes that a training program improved performance, based on results from employees who volunteered for it. The gap is that:",
      choices: [
        "The program may have been too short",
        "Performance is difficult to measure",
        "Volunteers were probably already more motivated, so the group is not representative",
        "The company had other programs as well"],
      answer: 2,
      expl: "Check how the study group was assembled.<br>The employees <em>volunteered</em>, so they selected themselves.<br>That means <strong>they were probably already more motivated, making the group unrepresentative</strong>, and the gain cannot be pinned on the training.<br><em>The trap:</em> \"performance is difficult to measure\" attacks the evidence itself, which you must accept as given, and it is the most common wrong turn on selection-bias questions.<br><em>Fast method:</em> a self-selected group differed before the treatment began. Target: ~30 seconds." }
  ]);

  /* ============================================================
     UNIT 3
     ============================================================ */

  extend("gm3_1", "quiz", [
    { text: "A jacket is marked down 30%, and the sale price is then reduced by another 10%. The final price is what percent of the original?",
      choices: ["60%", "63%", "67%", "70%"],
      answer: 1,
      expl: "Successive percent changes multiply as factors; they never add.<br>30% off &rarr; &times; 0.70.<br>Another 10% off &rarr; &times; 0.90.<br>0.70 &times; 0.90 = 0.63 &rarr; <strong>63%</strong> of the original.<br><em>The trap:</em> 60% comes from adding the discounts into 40% off, which double-counts, because the second 10% applies to the already reduced price.<br><em>Fast method:</em> chain discounts as a product of multipliers. Target: ~20 seconds." },
    { text: "A recipe calls for flour, sugar, and butter in the ratio 5 : 3 : 2, and uses 40 ounces of these ingredients in total. How many ounces of sugar does it use?",
      choices: ["8", "12", "15", "20"],
      answer: 1,
      expl: "Turn the ratio into parts, find one part, then scale.<br>Parts: 5 + 3 + 2 = 10.<br>One part: 40 &divide; 10 = 4 ounces.<br>Sugar: 3 &times; 4 = <strong>12 ounces</strong>.<br><em>The trap:</em> 15 comes from reading 3 : 2 alone and calling sugar three-eighths of the total, which ignores the flour entirely.<br><em>Fast method:</em> total &divide; sum of parts = one part. Target: ~20 seconds." },
    { text: "Machine A alone finishes a job in 5 hours. Machines A and B working together finish it in 2 hours. How long would B take alone?",
      choices: [
        "3 hours 20 minutes",
        "2 hours 30 minutes",
        "3 hours",
        "7 hours"],
      answer: 0,
      expl: "Work in rates per hour, never in times.<br>Together: 1/2 job per hour. A alone: 1/5.<br>B = 1/2 &minus; 1/5 = 5/10 &minus; 2/10 = 3/10 per hour.<br>Time = 10/3 hours = <strong>3 hours 20 minutes</strong>.<br><em>The trap:</em> 7 hours comes from adding or subtracting <em>times</em>, and it fails the sanity check &mdash; B alone must be slower than the 2-hour combined pace.<br><em>Fast method:</em> rates add and subtract; times never do. Target: ~30 seconds." },
    { text: "A quantity falls from 80 to 60. Which statement is correct?",
      choices: [
        "It decreased by 25%, and 60 is 75% of 80",
        "It decreased by 20%, and 60 is 80% of 80",
        "It decreased by 33.3%, and 60 is 75% of 80",
        "It decreased by 25%, and 60 is 125% of 80"],
      answer: 0,
      expl: "Percent change always divides by the <em>original</em>.<br>Drop = 20, and 20/80 = 0.25 &rarr; a 25% decrease.<br>Separately, 60/80 = 0.75 &rarr; 60 is 75% of 80.<br>So: <strong>decreased 25%, and 60 is 75% of 80</strong>.<br><em>The trap:</em> 33.3% divides by 60 instead of 80 &mdash; that is the percent increase going the <em>other</em> direction, from 60 up to 80.<br><em>Fast method:</em> change &divide; starting value; for \"percent of,\" divide by whatever follows \"of.\" Target: ~20 seconds." },
    { text: "Which two statements about percent change are true? (Select TWO.)",
      choices: [
        "Tripling a value is a 200% increase",
        "Tripling a value is a 300% increase",
        "An increase of 25% followed by a decrease of 20% returns to the original value",
        "Successive percent changes are added together"],
      answer: [0, 2],
      expl: "Separate \"percent of\" from \"percent greater than.\"<br>Tripling: new = 3 &times; old, so the <em>change</em> is 2 &times; old &rarr; a <strong>200% increase</strong>. True.<br>+25% then &minus;20%: 1.25 &times; 0.80 = 1.00 exactly, because 5/4 and 4/5 are reciprocals. True.<br><em>The trap:</em> calling tripling a 300% increase confuses \"300% <em>of</em>\" with \"300% <em>greater than</em>\"; and successive changes multiply, they do not add.<br><em>Fast method:</em> percent increase = (new &minus; old)/old. Target: ~30 seconds." }
  ]);

  extend("gm3_2", "quiz", [
    { text: "How many distinct positive factors does 100 have?",
      choices: ["6", "8", "9", "10"],
      answer: 2,
      expl: "Use the exponent rule instead of hunting for factors.<br>100 = 2&sup2; &times; 5&sup2;.<br>Add 1 to each exponent and multiply: (2+1)(2+1) = <strong>9</strong>.<br><em>The trap:</em> 8 comes from listing factors in pairs and forgetting that 10 &times; 10 contributes only one factor, not two.<br><em>Fast method:</em> factor count = product of (exponent + 1). Target: ~20 seconds." },
    { text: "If the integer n is divisible by both 6 and 8, then n must also be divisible by:",
      choices: ["14", "16", "24", "48"],
      answer: 2,
      expl: "\"Divisible by both\" means divisible by their least common multiple.<br>6 = 2 &times; 3 and 8 = 2&sup3;, so n must contain 2&sup3; and 3.<br>LCM = 8 &times; 3 = <strong>24</strong>.<br><em>The trap:</em> 48 comes from multiplying 6 &times; 8, but n = 24 already satisfies the condition and is not divisible by 48.<br><em>Fast method:</em> take the highest power of each prime, not the product of the numbers. Target: ~20 seconds." },
    { text: "What is the units digit of 4<sup>37</sup>?",
      choices: ["2", "4", "6", "8"],
      answer: 1,
      expl: "Units digits cycle, so find the cycle length.<br>4&sup1; ends in 4, 4&sup2; ends in 6, 4&sup3; ends in 4 &mdash; a cycle of 2.<br>Odd exponent &rarr; 4; even exponent &rarr; 6.<br>37 is odd, so the units digit is <strong>4</strong>.<br><em>The trap:</em> 6 catches anyone who finds the cycle correctly but lands on the wrong parity.<br><em>Fast method:</em> list powers until the pattern repeats, then match the exponent's parity. Target: ~20 seconds." },
    { text: "If &minus;1 &lt; x &lt; 0, which statement must be TRUE?",
      choices: [
        "x&sup2; &lt; x",
        "x&sup3; &gt; x&sup2;",
        "x&sup2; &gt; x",
        "x&sup2; &gt; 1"],
      answer: 2,
      expl: "Pick a number inside the range and test.<br>x = &minus;0.5 gives x&sup2; = 0.25, a positive.<br>A positive always beats a negative, so <strong>x&sup2; &gt; x</strong> (0.25 &gt; &minus;0.5) for every x here.<br><em>The trap:</em> \"x&sup2; &lt; x\" imports the rule for fractions between 0 <em>and</em> 1 while ignoring the sign, and the sign is the whole point of this constraint.<br><em>Fast method:</em> on \"must be true\" with a range, test one value inside it. Target: ~20 seconds." },
    { text: "Which two statements must be true for every integer n? (Select TWO.)",
      choices: [
        "n&sup2; + n is even",
        "n&sup2; + n is odd",
        "n(n + 1)(n + 2) is divisible by 3",
        "2n + 1 is even"],
      answer: [0, 2],
      expl: "Factor first, then look for guaranteed structure.<br>n&sup2; + n = n(n + 1): consecutive integers, so one of them is even &rarr; <strong>always even</strong>.<br>n(n + 1)(n + 2): any three consecutive integers include a multiple of 3 &rarr; <strong>always divisible by 3</strong>.<br><em>The trap:</em> 2n + 1 is even for no n at all &mdash; 2n is always even, so adding 1 always makes it odd.<br><em>Fast method:</em> k consecutive integers always contain a multiple of k. Target: ~30 seconds." }
  ]);

  extend("gm3_3", "quiz", [
    { text: "If 5x + 2y = 26 and 3x &minus; 2y = 6, what is the value of x + y?",
      choices: ["3", "4", "7", "12"],
      answer: 2,
      expl: "The y terms are already opposites, so add the equations.<br>(5x + 2y) + (3x &minus; 2y) = 26 + 6 &rarr; 8x = 32 &rarr; x = 4.<br>Then 2y = 26 &minus; 20 = 6 &rarr; y = 3.<br>x + y = <strong>7</strong>.<br><em>The trap:</em> 4, 3, and even the product 12 all sit among the choices &mdash; the standard punishment for solving correctly and answering the wrong question.<br><em>Fast method:</em> add or subtract to kill a variable, then reread what was asked. Target: ~30 seconds." },
    { text: "If &minus;3x + 5 &ge; 20, then:",
      choices: ["x &ge; &minus;5", "x &le; &minus;5", "x &ge; 5", "x &le; 5"],
      answer: 1,
      expl: "Isolate x and watch the negative divisor.<br>&minus;3x + 5 &ge; 20 &rarr; &minus;3x &ge; 15.<br>Divide by &minus;3 and <strong>flip the inequality</strong>: x &le; &minus;5.<br><em>The trap:</em> the choice that keeps the sign pointing the same way is what you get by treating the inequality exactly like an equation &mdash; right for every step except this one.<br><em>Fast method:</em> multiply or divide by a negative, flip the sign. Target: ~20 seconds." },
    { text: "If x &minus; 1/x = 3, what is x&sup2; + 1/x&sup2;?",
      choices: ["7", "9", "11", "12"],
      answer: 2,
      expl: "Square the given expression and read off the cross-term.<br>(x &minus; 1/x)&sup2; = x&sup2; &minus; 2 + 1/x&sup2; = 3&sup2; = 9.<br>So x&sup2; + 1/x&sup2; = 9 + 2 = <strong>11</strong>.<br><em>The trap:</em> 7 comes from reusing the +2 pattern of (x + 1/x)&sup2; and subtracting; with a minus sign inside, the cross-term is &minus;2, so you add 2 back.<br><em>Fast method:</em> square the given &mdash; the cross-term is the entire trick. Target: ~30 seconds." },
    { text: "In an arithmetic sequence, the 4th term is 17 and the 9th term is 42. What is the first term?",
      choices: ["2", "5", "7", "12"],
      answer: 0,
      expl: "Count the gaps between terms, not the terms.<br>Term 4 to term 9 is 9 &minus; 4 = 5 steps.<br>d = (42 &minus; 17)/5 = 5.<br>First term = 17 &minus; 3(5) = <strong>2</strong>.<br><em>The trap:</em> counting four steps gives d = 6.25 and derails everything; the off-by-one between term numbers and gaps is the standard sequence trap.<br><em>Fast method:</em> gaps = difference of the term numbers. Target: ~30 seconds." },
    { text: "Which two shortcuts are sound on GRE algebra? (Select TWO.)",
      choices: [
        "When the answer choices are specific numbers and the algebra is ugly, test the middle value first",
        "Always apply the quadratic formula rather than factoring",
        "When the answer choices contain variables, substitute easy numbers, avoiding 0 and 1",
        "Use 0 and 1 as your plug-in values, since they make the arithmetic easiest"],
      answer: [0, 2],
      expl: "Judge each shortcut by what it actually saves.<br><strong>Backsolving from the middle choice</strong>: numeric choices are ordered, so one test can eliminate half the field.<br><strong>Plugging in easy numbers when the choices contain variables</strong>: turns abstract manipulation into arithmetic.<br><em>The trap:</em> 0 and 1 collapse distinctions, often making several choices produce the same value and forcing you to redo the work; and the quadratic formula is slower than factoring whenever factoring works.<br><em>Fast method:</em> numeric choices &rarr; backsolve the middle; variable choices &rarr; plug in 2, 3, or 10. Target: ~20 seconds." }
  ]);

  extend("gm3_4", "quiz", [
    { text: "$5,000 is invested at 8% <b>simple</b> annual interest for 3 years. How much interest is earned?",
      choices: ["$1,200", "$1,298.56", "$400", "$6,200"],
      answer: 0,
      expl: "Simple interest is computed on the original principal every year.<br>I = P &times; r &times; t = 5000 &times; 0.08 &times; 3.<br>= 400 &times; 3 = <strong>$1,200</strong>.<br><em>The trap:</em> $1,298.56 is what compounding produces (5000 &times; 1.08&sup3; &minus; 5000), offered precisely to catch the wrong interest model; $400 is one year alone.<br><em>Fast method:</em> simple interest = one year's interest &times; years. Target: ~20 seconds." },
    { text: "4 liters of a 10% salt solution are mixed with 6 liters of a 20% salt solution. What percent of the mixture is salt?",
      choices: ["14%", "15%", "16%", "30%"],
      answer: 2,
      expl: "Mixtures work on amounts, not on percents.<br>Salt: 0.10(4) = 0.4 L and 0.20(6) = 1.2 L.<br>Total salt 1.6 L in 4 + 6 = 10 L.<br>1.6/10 = <strong>16%</strong>.<br><em>The trap:</em> 15% averages the two concentrations, which is right only when the volumes are equal; here the stronger solution is the larger share, so the result is pulled toward 20%.<br><em>Fast method:</em> add the parts of the substance, divide by total volume. Target: ~30 seconds." },
    { text: "In a group of 60 people, 35 speak French, 28 speak German, and 12 speak both. How many speak neither?",
      choices: ["3", "9", "12", "15"],
      answer: 1,
      expl: "Count \"at least one\" first, then subtract from the whole group.<br>At least one language: 35 + 28 &minus; 12 = 51.<br>Neither: 60 &minus; 51 = <strong>9</strong>.<br><em>The trap:</em> 3 comes from 60 &minus; (35 + 28) without removing the 12 who were double-counted in both totals.<br><em>Fast method:</em> total = A + B &minus; both + neither. Target: ~20 seconds." },
    { text: "What is the sum of all integers from 20 to 60, inclusive?",
      choices: ["1,600", "1,640", "1,680", "820"],
      answer: 1,
      expl: "For an evenly spaced list, sum = mean &times; count.<br>Mean = (20 + 60)/2 = 40.<br>Count = 60 &minus; 20 + 1 = 41.<br>Sum = 40 &times; 41 = <strong>1,640</strong>.<br><em>The trap:</em> 1,600 uses 40 terms instead of 41 &mdash; the inclusive count is the whole difficulty of this question.<br><em>Fast method:</em> average of endpoints &times; (last &minus; first + 1). Target: ~30 seconds." },
    { text: "Which two translations are correct? (Select TWO.)",
      choices: [
        "\"x is 7 less than y\" becomes x = y &minus; 7",
        "\"x is 7 less than y\" becomes x = 7 &minus; y",
        "\"the number of quarters is three times the number of dimes\" becomes q = 3d",
        "\"the number of quarters is three times the number of dimes\" becomes d = 3q"],
      answer: [0, 2],
      expl: "Translate word by word, then sanity-check which quantity is bigger.<br>\"Less than\" reverses the reading order: start from y and remove 7 &rarr; <strong>x = y &minus; 7</strong>.<br>\"Is three times\" attaches the multiplier to the smaller quantity to build the larger &rarr; <strong>q = 3d</strong>.<br><em>The trap:</em> d = 3q reverses which group is bigger, and it is the more dangerous error because the equation still looks tidy; x = 7 &minus; y reverses the subtraction.<br><em>Fast method:</em> \"less than\" flips the order; \"is\" is the equals sign. Target: ~20 seconds." }
  ]);

  extend("gcp3", "questions", [
    { text: "A number is increased by 50%, and the result is then decreased by 40%. The final value is what percent of the original?",
      choices: ["90%", "100%", "110%", "10%"],
      answer: 0,
      expl: "Convert each change into a multiplier and multiply.<br>+50% &rarr; &times; 1.5.<br>&minus;40% &rarr; &times; 0.6.<br>1.5 &times; 0.6 = 0.9 &rarr; <strong>90%</strong> of the original.<br><em>The trap:</em> 110% comes from adding +50 and &minus;40 to get +10%, which ignores that the 40% cut applies to the enlarged value.<br><em>Fast method:</em> chain percent changes as a product of multipliers. Target: ~20 seconds." },
    { text: "How many distinct positive factors does 72 have?",
      choices: ["8", "10", "12", "14"],
      answer: 2,
      expl: "Prime factorize, then use the exponent rule.<br>72 = 8 &times; 9 = 2&sup3; &times; 3&sup2;.<br>(3+1)(2+1) = <strong>12</strong> factors.<br><em>The trap:</em> 8 is what 2&sup3; alone gives &mdash; the 3&sup2; multiplies the count rather than adding to it.<br><em>Fast method:</em> factor count = product of (exponent + 1). Target: ~20 seconds." },
    { text: "If 3(x &minus; 4) = 18, what is x&sup2;?",
      choices: ["36", "64", "100", "196"],
      answer: 2,
      expl: "Solve for x, then answer the question actually asked.<br>3(x &minus; 4) = 18 &rarr; x &minus; 4 = 6 &rarr; x = 10.<br>x&sup2; = <strong>100</strong>.<br><em>The trap:</em> 36 is 6&sup2;, that is, squaring (x &minus; 4) instead of x &mdash; which is why underlining what is asked matters.<br><em>Fast method:</em> solve, then reread the question before selecting. Target: ~20 seconds." },
    { text: "The ratio of cats to dogs at a shelter is 4 : 5, and there are 12 more dogs than cats. How many dogs are there?",
      choices: ["15", "48", "60", "108"],
      answer: 2,
      expl: "Write the ratio with a multiplier and use the difference.<br>Cats = 4k, dogs = 5k.<br>Difference = 5k &minus; 4k = k, so k = 12.<br>Dogs = 5 &times; 12 = <strong>60</strong>.<br><em>The trap:</em> 48 is the number of cats, a correct computation attached to the wrong animal, and 108 is the total.<br><em>Fast method:</em> when the ratio parts differ by 1, the stated difference <em>is</em> the multiplier. Target: ~20 seconds." },
    { text: "Which two statements must be true? (Select TWO.)",
      choices: [
        "For any positive integer n, n(n + 1) is even",
        "For any positive integer n, n&sup2; + n + 1 is even",
        "If an integer is divisible by 9, its digits sum to a multiple of 9",
        "Every prime number is odd"],
      answer: [0, 2],
      expl: "Test each claim for a counterexample.<br>n(n + 1): consecutive integers, so one is even &rarr; <strong>always even</strong>.<br>Digit-sum test: every multiple of 9 has digits summing to a multiple of 9 &rarr; <strong>always true</strong>.<br><em>The trap:</em> \"every prime is odd\" fails on exactly one number, 2, the only even prime, which is why that claim appears so often as a distractor; and n&sup2; + n + 1 is an even number plus 1, so it is always odd.<br><em>Fast method:</em> for \"must be true,\" hunt one counterexample per claim. Target: ~30 seconds." }
  ]);

  /* ============================================================
     UNIT 4
     ============================================================ */

  extend("gm4_1", "quiz", [
    { text: "A rectangle has length 12 and diagonal 13. What is its perimeter?",
      choices: ["30", "34", "50", "60"],
      answer: 1,
      expl: "The diagonal makes a right triangle with the two sides.<br>Leg 12, hypotenuse 13 &rarr; 5-12-13, a standard triple, so the width is 5.<br>Perimeter = 2(12 + 5) = <strong>34</strong>.<br><em>The trap:</em> 60 is the area, 12 &times; 5 &mdash; the width found correctly, then the wrong question answered.<br><em>Fast method:</em> recognize 3-4-5, 5-12-13, 8-15-17 instead of computing roots. Target: ~20 seconds." },
    { text: "An equilateral triangle has side 6. What is its area?",
      choices: ["9&radic;3", "12&radic;3", "18", "36&radic;3"],
      answer: 0,
      expl: "Drop an altitude to split it into two 30-60-90 triangles.<br>Those have legs 3 and 3&radic;3, so the height is 3&radic;3.<br>Area = &frac12; &times; 6 &times; 3&radic;3 = <strong>9&radic;3</strong>.<br><em>The trap:</em> 18 comes from using 6 as the height, but 6 is the side length, not the perpendicular distance to the base.<br><em>Fast method:</em> equilateral area = side&sup2;&radic;3/4 &rarr; 36&radic;3/4 = 9&radic;3. Target: ~20 seconds." },
    { text: "In a circle of radius 9, a sector has a central angle of 60&deg;. What is the length of its arc?",
      choices: ["3&pi;", "4.5&pi;", "9&pi;", "13.5&pi;"],
      answer: 0,
      expl: "A sector is a fraction of the whole circle: 60/360 = 1/6.<br>Full circumference = 2&pi;(9) = 18&pi;.<br>Arc = (1/6)(18&pi;) = <strong>3&pi;</strong>.<br><em>The trap:</em> 13.5&pi; is the sector's <em>area</em>, (1/6)(81&pi;) &mdash; computed correctly for the wrong quantity, so check whether a length or an area is wanted.<br><em>Fast method:</em> angle/360 times the whole &mdash; circumference for arc, area for sector. Target: ~20 seconds." },
    { text: "What is the distance between the points (&minus;2, 3) and (4, &minus;5)?",
      choices: ["10", "2&radic;13", "14", "&radic;14"],
      answer: 0,
      expl: "Distance is the hypotenuse of the run and the rise.<br>Run: 4 &minus; (&minus;2) = 6. Rise: &minus;5 &minus; 3 = &minus;8, so 8.<br>6-8-10 is 3-4-5 tripled, so the distance is <strong>10</strong>.<br><em>The trap:</em> 14 comes from adding the legs, 6 + 8, which is the walking distance along the grid rather than the straight line.<br><em>Fast method:</em> take &Delta;x and &Delta;y, then look for a known triple. Target: ~20 seconds." },
    { text: "Which two statements are true? (Select TWO.)",
      choices: [
        "A square inscribed in a circle has a diagonal equal to the circle's diameter",
        "A square inscribed in a circle has a side equal to the circle's diameter",
        "A circle inscribed in a square has a diameter equal to the square's side",
        "An angle inscribed in a semicircle measures 45&deg;"],
      answer: [0, 2],
      expl: "Draw each inscription and ask which parts touch.<br>Square inside circle: the corners touch, so the <strong>diagonal equals the diameter</strong>.<br>Circle inside square: it touches the midpoints of the sides, so the <strong>diameter equals the side</strong>.<br><em>The trap:</em> \"side equals the diameter\" swaps those two relationships, the classic error; and an angle inscribed in a semicircle is always 90&deg;, never 45&deg;.<br><em>Fast method:</em> find the contact points, then name the equal lengths. Target: ~20 seconds." }
  ]);

  extend("gm4_2", "quiz", [
    { text: "A code is formed by arranging 3 of 5 distinct letters in order, with no letter repeated. How many codes are possible?",
      choices: ["10", "15", "60", "125"],
      answer: 2,
      expl: "A code is ordered, so this is a permutation.<br>Three slots from 5 distinct letters, no repeats: 5 &times; 4 &times; 3.<br>= <strong>60</strong>.<br><em>The trap:</em> 10 is C(5,3), which treats the letters as an unordered selection &mdash; right for a committee, wrong for a code.<br><em>Fast method:</em> ask whether rearranging makes a new object; if yes, multiply the slots. Target: ~20 seconds." },
    { text: "Two fair six-sided dice are rolled. What is the probability that the sum is 7?",
      choices: ["1/6", "1/9", "1/12", "5/36"],
      answer: 0,
      expl: "Count ordered pairs over the full sample space.<br>Sum 7: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) &rarr; 6 ways.<br>Total outcomes: 6 &times; 6 = 36.<br>6/36 = <strong>1/6</strong>.<br><em>The trap:</em> 5/36 belongs to a sum of 6 or 8; 7 is the unique sum with the most combinations, which is why it is the most likely roll.<br><em>Fast method:</em> for two dice, remember 6 ways out of 36 for a sum of 7. Target: ~20 seconds." },
    { text: "For the set {4, 7, 7, 10, 22}, which is true?",
      choices: [
        "The mean is greater than the median",
        "The median is greater than the mean",
        "The mean equals the median",
        "The relationship cannot be determined"],
      answer: 0,
      expl: "Compute both rather than eyeballing.<br>Mean = (4 + 7 + 7 + 10 + 22)/5 = 50/5 = 10.<br>Median = the middle value of the sorted list = 7.<br>So <strong>the mean is greater than the median</strong>.<br><em>The trap:</em> \"cannot be determined\" is never right for a fully listed set; the 22 pulls the mean upward while leaving the median untouched, which is exactly the outlier behavior being tested.<br><em>Fast method:</em> a high outlier drags the mean, not the median. Target: ~20 seconds." },
    { text: "Every value in a data set is multiplied by 3. What happens to the standard deviation?",
      choices: [
        "It is unchanged",
        "It is multiplied by 3",
        "It is multiplied by 9",
        "It becomes zero"],
      answer: 1,
      expl: "Ask whether the operation stretches the data or just shifts it.<br>Multiplying every value by 3 stretches every gap by 3.<br>So the standard deviation is <strong>multiplied by 3</strong>. (Variance would be &times; 9.)<br><em>The trap:</em> \"unchanged\" is the rule for <em>adding</em> a constant, which slides the data without stretching it, and confusing the two is the standard slip.<br><em>Fast method:</em> adding shifts and SD holds; multiplying scales and SD scales. Target: ~15 seconds." },
    { text: "A bag holds 5 green and 3 yellow marbles. Two are drawn without replacement. Which two statements are true? (Select TWO.)",
      choices: [
        "The probability that both are green is 5/14",
        "The probability that both are green is 25/64",
        "The probability that at least one is yellow is 9/14",
        "The probability that at least one is yellow is 3/8"],
      answer: [0, 2],
      expl: "Without replacement, the denominator drops on the second draw.<br>Both green: (5/8)(4/7) = 20/56 = <strong>5/14</strong>.<br>At least one yellow is the complement: 1 &minus; 5/14 = <strong>9/14</strong>.<br><em>The trap:</em> 25/64 is (5/8)&sup2;, which assumes the first marble goes back in the bag, ignoring the without-replacement condition entirely.<br><em>Fast method:</em> \"at least one\" = 1 &minus; P(none). Target: ~30 seconds." }
  ]);

  extend("gm4_3", "quiz", [
    { text: "A line graph rises every year from 2019 to 2023, but each year's segment is less steep than the one before. What does this show?",
      choices: [
        "The quantity is shrinking",
        "The quantity is constant",
        "The quantity is still growing, but more slowly each year",
        "The quantity peaked in 2019"],
      answer: 2,
      expl: "Separate the line's height from its slope.<br>Rising every year &rarr; the quantity is increasing.<br>Each segment less steep &rarr; the <em>rate</em> of increase is falling.<br>So it is <strong>still growing, but more slowly each year</strong>.<br><em>The trap:</em> reading the flattening as a decline confuses the slope with the value, which is the most common line-graph misread.<br><em>Fast method:</em> height is the amount; steepness is the change. Target: ~15 seconds." },
    { text: "In a stacked bar chart, one segment's top edge sits at 70 and the segment beneath it ends at 45. What is that segment's value?",
      choices: ["25", "45", "70", "115"],
      answer: 0,
      expl: "In a stacked bar a segment's value is its own height, not the position of its top edge.<br>70 &minus; 45 = <strong>25</strong>.<br><em>The trap:</em> reading 70 off the axis is the trap the stacked format is built on &mdash; that number is the cumulative total, not the category.<br><em>Fast method:</em> stacked bars &mdash; always subtract the boundary below. Target: ~15 seconds." },
    { text: "A category occupies a central angle of 54&deg; in a pie chart. What percent of the total does it represent?",
      choices: ["15%", "18%", "20%", "54%"],
      answer: 0,
      expl: "A slice's share is its angle over the full 360&deg;.<br>54/360 = 0.15 &rarr; <strong>15%</strong>.<br><em>The trap:</em> 18% comes from dividing by 300 or from estimating against a quarter-circle; the anchor worth memorizing is that 90&deg; is 25%, so 54&deg; must be well under that.<br><em>Fast method:</em> percent = angle/360, checked against 90&deg; = 25%. Target: ~15 seconds." },
    { text: "Which two habits reduce Data Interpretation errors? (Select TWO.)",
      choices: [
        "Checking whether the vertical axis begins at zero",
        "Comparing bar heights directly when the question asks about a rate",
        "Confirming the chart's units against the units used in the answer choices",
        "Using the on-screen calculator for every computation"],
      answer: [0, 2],
      expl: "Both winning habits are about the chart's frame, not its bars.<br><strong>Check whether the vertical axis starts at zero</strong>: a truncated axis exaggerates differences.<br><strong>Confirm the units</strong>: a chart in thousands against choices in units gives a perfect calculation and a wrong answer.<br><em>The trap:</em> comparing bar heights when the question asks about a rate answers a magnitude question instead, since rates always require division; and calculator-for-everything just burns clock.<br><em>Fast method:</em> read title, axis, and units before touching a number. Target: ~20 seconds." }
  ]);

  extend("gm4_4", "quiz", [
    { text: "x is an integer and x&sup2; = 16. <b>Quantity A:</b> x. <b>Quantity B:</b> 4.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 3,
      expl: "In Quantitative Comparison one case is never enough &mdash; hunt for a second.<br>x&sup2; = 16 gives x = 4 or x = &minus;4.<br>x = 4 &rarr; the quantities are equal. x = &minus;4 &rarr; Quantity B is greater.<br>Two different relationships means <strong>(D), cannot be determined</strong>.<br><em>The trap:</em> (B) catches anyone who remembers the negative root but forgets to check whether equality is also possible.<br><em>Fast method:</em> even powers give two roots &mdash; test both signs. Target: ~20 seconds." },
    { text: "n &gt; 0. <b>Quantity A:</b> (n + 1)/n. <b>Quantity B:</b> 1.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 0,
      expl: "Simplify before deciding.<br>Split the fraction: (n + 1)/n = n/n + 1/n = 1 + 1/n.<br>n &gt; 0 makes 1/n positive, so A is 1 plus something positive.<br><strong>Quantity A is greater</strong>, always.<br><em>The trap:</em> reaching for (D) just because a variable appears &mdash; simplifying first shows the variable cannot change the outcome.<br><em>Fast method:</em> split the fraction, then look for a term that is always positive. Target: ~20 seconds." },
    { text: "<b>Quantity A:</b> the area of a square with perimeter 20. <b>Quantity B:</b> the area of a circle with circumference 20.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 1,
      expl: "Both quantities are fully determined numbers, so (D) is impossible before any work begins.<br>Square: perimeter 20 &rarr; side 5 &rarr; area 25.<br>Circle: 2&pi;r = 20 &rarr; r = 10/&pi; &rarr; area = 100/&pi; &asymp; 31.8.<br><strong>Quantity B is greater</strong>.<br><em>The trap:</em> assuming equal perimeters give equal areas &mdash; for a fixed perimeter the circle always encloses the most area.<br><em>Fast method:</em> no variables anywhere means (D) is out; same perimeter favors the circle. Target: ~30 seconds." },
    { text: "0 &lt; x &lt; 1. <b>Quantity A:</b> x&sup3;. <b>Quantity B:</b> x&sup2;.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 1,
      expl: "Ask what multiplying by x does here.<br>x&sup3; = x&sup2; &times; x, and x is a positive number smaller than 1, so multiplying shrinks.<br>Check x = 0.5: 0.125 versus 0.25.<br><strong>Quantity B is greater</strong> throughout the interval.<br><em>The trap:</em> without the constraint the answer would be (D), since a negative x or an x above 1 reverses it &mdash; reading the given condition is the entire question.<br><em>Fast method:</em> on 0 &lt; x &lt; 1, higher powers are smaller. Target: ~20 seconds." },
    { text: "Which two operations may you safely perform on both quantities in a Quantitative Comparison? (Select TWO.)",
      choices: [
        "Divide both quantities by 4",
        "Square both quantities",
        "Subtract the same expression from both quantities",
        "Multiply both quantities by x when x could be negative"],
      answer: [0, 2],
      expl: "Ask whether the operation preserves order for every allowed value.<br><strong>Divide both by 4</strong>: a known positive divisor, so order is preserved.<br><strong>Subtract the same expression from both</strong>: order is preserved exactly.<br><em>The trap:</em> squaring destroys sign information (&minus;5 &lt; 3, but 25 &gt; 9), and multiplying by a possibly negative variable flips the comparison outright.<br><em>Fast method:</em> add and subtract freely; multiply or divide only by known positives. Target: ~20 seconds." }
  ]);

  extend("gcp4", "questions", [
    { text: "A cylinder has radius 3 and height 5. What is its volume?",
      choices: ["45&pi;", "15&pi;", "30&pi;", "75&pi;"],
      answer: 0,
      expl: "Volume of a cylinder is the circle's area times the height.<br>V = &pi;r&sup2;h = &pi;(9)(5).<br>= <strong>45&pi;</strong>.<br><em>The trap:</em> 15&pi; uses r instead of r&sup2;, and 30&pi; is the lateral surface area 2&pi;rh, a different quantity entirely.<br><em>Fast method:</em> square the radius first, then multiply by the height. Target: ~15 seconds." },
    { text: "In how many different orders can 4 distinct books be arranged on a shelf?",
      choices: ["4", "12", "24", "256"],
      answer: 2,
      expl: "All items distinct and all positions filled means a factorial.<br>4! = 4 &times; 3 &times; 2 &times; 1 = <strong>24</strong>.<br><em>The trap:</em> 256 is 4<sup>4</sup>, which would count arrangements if books could repeat, and 12 is 4 &times; 3, stopping two steps early.<br><em>Fast method:</em> arranging all n distinct items gives n!. Target: ~10 seconds." },
    { text: "A fair coin is flipped 4 times. What is the probability of getting at least one tail?",
      choices: ["15/16", "7/8", "1/2", "1/16"],
      answer: 0,
      expl: "\"At least one\" calls for the complement.<br>P(no tails) = all heads = (1/2)<sup>4</sup> = 1/16.<br>P(at least one tail) = 1 &minus; 1/16 = <strong>15/16</strong>.<br><em>The trap:</em> 7/8 is the answer for three flips &mdash; what you get by reaching for a memorized result instead of recounting the flips.<br><em>Fast method:</em> at least one = 1 &minus; P(none). Target: ~20 seconds." },
    { text: "<b>Quantity A:</b> the slope of the line through (1, 2) and (4, 11). <b>Quantity B:</b> 3.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 2,
      expl: "Two specific points fix a specific slope, so (D) is eliminable before any computation.<br>Slope = (11 &minus; 2)/(4 &minus; 1) = 9/3 = 3.<br>Quantity B is 3, so <strong>the two quantities are equal</strong>.<br><em>The trap:</em> flipping the fraction to 3/9 = 1/3 makes Quantity B look larger; the rise always goes on top.<br><em>Fast method:</em> no variables means (D) is out; slope = &Delta;y/&Delta;x. Target: ~20 seconds." },
    { text: "A triangle has sides 9, 12, and 15. Which two statements are true? (Select TWO.)",
      choices: [
        "It is a right triangle",
        "It is equilateral",
        "Its area is 54",
        "Its area is 90"],
      answer: [0, 2],
      expl: "Check for a Pythagorean triple first, then use the legs.<br>9-12-15 is 3-4-5 scaled by 3, so it is a <strong>right triangle</strong>.<br>The legs are perpendicular, so area = &frac12;(9)(12) = <strong>54</strong>.<br><em>The trap:</em> 90 comes from treating 15 as a leg, but the hypotenuse is not perpendicular to anything, so it is never a height here.<br><em>Fast method:</em> in a right triangle the two legs are base and height. Target: ~30 seconds." }
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
      expl: "Ask what separates a 4 from a 5: reasoning that has survived contact with the other side.<br>Most 4-level essays never acknowledge an opposing view at all.<br>So the highest-value addition is <strong>a body paragraph that states the strongest objection honestly and then answers it</strong>.<br><em>The trap:</em> adding three more examples feels like development but usually produces more assertions at the same shallow depth, which is what capped the essay at a 4 in the first place.<br><em>Fast method:</em> one honest counterargument, answered, beats three more examples. Target: ~15 seconds." },
    { text: "The task instructions say to \"describe specific circumstances in which adopting the recommendation would or would not be advantageous.\" An essay that argues forcefully that the recommendation is always right will most likely:",
      choices: [
        "Score well for the strength of its conviction",
        "Be capped low, because it does not perform the task it was assigned",
        "Be scored purely on grammar and mechanics",
        "Receive a 6 if the examples are strong"],
      answer: 1,
      expl: "The instructions are part of the assignment, not decoration.<br>They ask for specific circumstances where the recommendation would and would not help.<br>An essay arguing it is always right never performs that task, so it is <strong>capped low no matter how well it is written</strong>.<br><em>The trap:</em> conviction reads as strength in ordinary argument, which is exactly why this catches confident writers.<br><em>Fast method:</em> reread the instruction line and mirror its verbs in your structure. Target: ~15 seconds." },
    { text: "Essay length correlates with score. What is the actual reason?",
      choices: [
        "Graders award points per paragraph",
        "ETS enforces a 500-word minimum",
        "Longer essays display more vocabulary",
        "Developing reasons with concrete examples takes words, and a very short essay cannot have developed anything"],
      answer: 3,
      expl: "Separate the correlation from its cause.<br>Developing a reason means walking through a concrete case, and that takes words.<br>A 250-word essay cannot have developed anything, so <strong>length is a symptom of development, not a cause of the score</strong>.<br><em>The trap:</em> believing there is an enforced minimum leads people to pad, which adds words without adding the development the correlation actually reflects.<br><em>Fast method:</em> write to finish the reasoning; length follows. Target: ~15 seconds." },
    { text: "Which two statements about the Analytical Writing section are correct? (Select TWO.)",
      choices: [
        "It is scored from 0 to 6",
        "It is scored from 130 to 170",
        "You have 30 minutes for it",
        "It contains two separate essay tasks"],
      answer: [0, 2],
      expl: "Recall the current section spec.<br>Analytical Writing: one Issue essay.<br><strong>30 minutes</strong>, scored <strong>0 to 6</strong> in half-point increments.<br><em>The trap:</em> 130 to 170 is the Verbal and Quant scale, and the second essay (the Argument task) was removed when the test was shortened, so \"two separate essay tasks\" describes the old GRE.<br><em>Fast method:</em> AWA is 1 essay, 30 minutes, 0&ndash;6. Target: ~10 seconds." }
  ]);

  extend("gm5_2", "quiz", [
    { text: "You finish the eight sentence-level Verbal questions in seven minutes total. What has this bought you?",
      choices: [
        "Nothing, since unused time cannot carry over",
        "A higher score on those eight questions",
        "Roughly five extra minutes for the reading passages, which is where time is genuinely needed",
        "Permission to leave the section early"],
      answer: 2,
      expl: "Time inside a section is fungible, so ask where the saved minutes go.<br>Eight questions at the 90-second average would be 12 minutes; you used 7.<br>That leaves <strong>roughly five extra minutes for the passages</strong>, which cannot be rushed.<br><em>The trap:</em> \"a higher score on those eight\" &mdash; speed itself earns nothing on the questions you just answered; its entire value is what it buys later in the same section.<br><em>Fast method:</em> bank time on the fast types, spend it on passages. Target: ~15 seconds." },
    { text: "What is the main risk of abandoning the two-pass method and grinding through a hard question?",
      choices: [
        "You may run out of scratch paper",
        "You trade several answerable questions at the end of the section for one difficult one",
        "The test penalizes slow answers",
        "Marked questions are scored differently"],
      answer: 1,
      expl: "Every question carries the same weight, so price the cost in questions.<br>Four minutes on one hard item is four minutes not spent on the two or three at the end you could have answered.<br>So you <strong>trade several answerable questions for one difficult one</strong> &mdash; a straight loss of points.<br><em>The trap:</em> looking for a scoring penalty on slow answers; the penalty is entirely opportunity cost, not anything the scoring engine does to you.<br><em>Fast method:</em> price every extra minute in questions forgone. Target: ~15 seconds." },
    { text: "Reviewing a practice test, you find that four misses came from rushing the last questions of a section and two came from topics you had never studied. What is the primary fix?",
      choices: [
        "Study more content, since content gaps are the real problem",
        "Take more practice tests without reviewing them",
        "Work only on the hardest questions",
        "Fix the pacing, since most of the damage came from arriving at the end of the section with no time"],
      answer: 3,
      expl: "Size the two buckets before choosing a fix.<br>Rushing the end of sections: 4 misses. Unstudied topics: 2 misses.<br>Timing is the bigger bucket, so <strong>fix the pacing</strong> &mdash; guess and mark earlier so real minutes remain at the end.<br><em>The trap:</em> defaulting to more content study addresses the smaller bucket, and it is the reflex that keeps scores flat.<br><em>Fast method:</em> sort misses by cause, then attack the tallest column. Target: ~20 seconds." },
    { text: "Which two techniques raise your odds above a blind guess? (Select TWO.)",
      choices: [
        "Eliminating \"cannot be determined\" when both quantities are specific numbers",
        "Choosing the longest answer choice",
        "Eliminating Reading Comprehension answers containing \"always\" or \"proves\"",
        "Choosing the answer that repeats the most words from the passage"],
      answer: [0, 2],
      expl: "Keep only eliminations grounded in a real property of the test.<br><strong>Two specific numbers always have a fixed relationship</strong>, so \"cannot be determined\" is impossible there.<br><strong>Hedged academic passages rarely support \"always\" or \"proves.\"</strong><br><em>The trap:</em> answer length and repeated passage vocabulary are surface features that wrong answers imitate deliberately, so leaning on them is worse than random.<br><em>Fast method:</em> guess from structural rules, never from cosmetics. Target: ~20 seconds." }
  ]);

  extend("gm5_3", "quiz", [
    { text: "What is &radic;(9 + 16)?",
      choices: ["5", "7", "12", "25"],
      answer: 0,
      expl: "Finish what is inside the radical first.<br>9 + 16 = 25.<br>&radic;25 = <strong>5</strong>.<br><em>The trap:</em> 7 is &radic;9 + &radic;16, but roots never distribute across addition &mdash; the single most repeated algebra error on the test.<br><em>Fast method:</em> radicals split over multiplication only, never over + or &minus;. Target: ~10 seconds." },
    { text: "What is the sum of the integers from 1 to 30, inclusive?",
      choices: ["435", "465", "495", "900"],
      answer: 1,
      expl: "Use the consecutive-sum formula.<br>n(n + 1)/2 with n = 30.<br>30 &times; 31/2 = 930/2 = <strong>465</strong>.<br><em>The trap:</em> 435 is the sum through 29, from using (n &minus; 1)n/2 or stopping one term early; 900 is just 30&sup2;.<br><em>Fast method:</em> 1 to n sums to n(n + 1)/2. Target: ~15 seconds." },
    { text: "A 45-45-90 triangle has a hypotenuse of 8. What is the length of each leg?",
      choices: ["4", "4&radic;2", "4&radic;3", "8&radic;2"],
      answer: 1,
      expl: "Use the 45-45-90 ratio x : x : x&radic;2.<br>The hypotenuse is the x&radic;2 side, so x&radic;2 = 8.<br>x = 8/&radic;2 = <strong>4&radic;2</strong>.<br><em>The trap:</em> 8&radic;2 multiplies by &radic;2 instead of dividing, producing legs longer than the hypotenuse, which the sanity check should catch instantly.<br><em>Fast method:</em> hypotenuse to leg &rarr; divide by &radic;2. Target: ~20 seconds." },
    { text: "Which two statements are true? (Select TWO.)",
      choices: [
        "Adding a constant to every value leaves the standard deviation unchanged",
        "\"At least one\" probabilities are best computed as 1 &minus; P(none)",
        "Figures in the coordinate plane are not drawn to scale",
        "Averaging the two speeds gives the average speed for a round trip"],
      answer: [0, 1],
      expl: "Check each rule against its exact statement.<br><strong>Adding a constant leaves SD unchanged</strong>: every value shifts equally, so the gaps are untouched. True.<br><strong>\"At least one\" = 1 &minus; P(none)</strong>: turns a messy enumeration into one subtraction. True.<br><em>The trap:</em> coordinate systems and number lines are the stated <em>exception</em> to the not-to-scale rule, and average speed is total distance over total time, which equals the two-speed average only when the times are equal.<br><em>Fast method:</em> shift vs. scale for SD; complement for \"at least one.\" Target: ~20 seconds." }
  ]);

  extend("gcp5", "questions", [
    { text: "What is the units digit of 9<sup>15</sup>?",
      choices: ["1", "3", "8", "9"],
      answer: 3,
      expl: "Find the cycle of units digits for 9.<br>9&sup1; ends in 9, 9&sup2; ends in 1, 9&sup3; ends in 9 &mdash; a cycle of 2.<br>Odd exponent &rarr; 9, and 15 is odd, so the units digit is <strong>9</strong>.<br><em>The trap:</em> 1 catches anyone who lands on the wrong parity, which is the only thing this question actually tests.<br><em>Fast method:</em> 9 alternates 9, 1 &mdash; odd exponents end in 9. Target: ~15 seconds." },
    { text: "A rectangle's length is 3 times its width, and its perimeter is 64. What is its area?",
      choices: ["96", "192", "256", "384"],
      answer: 1,
      expl: "Put both dimensions in one variable, then solve.<br>Perimeter: 2(3w + w) = 8w = 64 &rarr; w = 8.<br>Length = 3(8) = 24.<br>Area = 8 &times; 24 = <strong>192</strong>.<br><em>The trap:</em> 384 comes from treating 64 as half the perimeter and doubling the dimensions, and 96 comes from stopping at 8 &times; 12.<br><em>Fast method:</em> express every side in terms of the smallest, then use the perimeter. Target: ~30 seconds." },
    { text: "\"The lecture was mercifully ______: the speaker finished in twenty minutes and took no questions.\" The blank means:",
      choices: ["Protracted", "Erudite", "Succinct", "Digressive"],
      answer: 2,
      expl: "The colon explains the blank, and \"mercifully\" sets the charge.<br>Evidence: finished in twenty minutes, took no questions.<br>That points straight at brevity &mdash; <strong>succinct</strong>.<br><em>The trap:</em> <em>protracted</em> and <em>digressive</em> both mean the opposite, and <em>erudite</em> is a word one expects near \"lecture\" without anything in the evidence supporting it.<br><em>Fast method:</em> predict the blank from the post-colon evidence before reading choices. Target: ~20 seconds." },
    { text: "In Critical Reasoning, what does the negation test establish?",
      choices: [
        "Whether a choice weakens the argument",
        "Whether the conclusion is actually true",
        "Whether the evidence is accurate",
        "Whether a choice is a necessary assumption"],
      answer: 3,
      expl: "Recall what negation is for.<br>Negate the choice, then reread the argument.<br>If the argument collapses, that choice was required for it to work &mdash; the definition of <strong>a necessary assumption</strong>.<br><em>The trap:</em> using it as a weaken tool; plenty of statements damage an argument without being assumptions it depends on.<br><em>Fast method:</em> negate it; collapse means necessary. Target: ~15 seconds." },
    { text: "<b>Quantity A:</b> 2<sup>30</sup>. <b>Quantity B:</b> 4<sup>16</sup>.",
      choices: [
        "Quantity A is greater",
        "Quantity B is greater",
        "The two quantities are equal",
        "The relationship cannot be determined from the information given"],
      answer: 1,
      expl: "Exponents are only comparable in a common base.<br>4<sup>16</sup> = (2&sup2;)<sup>16</sup> = 2<sup>32</sup>.<br>2<sup>32</sup> &gt; 2<sup>30</sup>, so <strong>Quantity B is greater</strong>.<br><em>The trap:</em> comparing the visible numbers, 30 against 16, makes Quantity A look larger &mdash; which is exactly why the bases must be matched before the exponents mean anything.<br><em>Fast method:</em> rewrite both sides as powers of the smaller base. Target: ~20 seconds." },
    { text: "Which two statements about test-day strategy are correct? (Select TWO.)",
      choices: [
        "Every question within a section carries the same weight",
        "Questions you mark for review are scored differently",
        "A blank scores the same as a wrong answer",
        "You may return to a previous section later in the test"],
      answer: [0, 2],
      expl: "Check each claim against how the section actually scores.<br><strong>Equal weight for every question</strong> &mdash; true, and the reason the two-pass method works.<br><strong>A blank scores the same as a wrong answer</strong> &mdash; true, which is why a guess strictly dominates leaving anything empty.<br><em>The trap:</em> marking is a purely private navigation aid with no scoring effect, and once you exit a section it is closed for good.<br><em>Fast method:</em> equal weight plus no penalty means never leave a blank. Target: ~15 seconds." }
  ]);

})();
