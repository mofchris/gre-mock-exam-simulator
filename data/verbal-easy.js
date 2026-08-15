/* Verbal bank - EASY. Standalone items go in B.verbal; passages in B.vpassages. */
(function () {
  const B = window.GREBANK = window.GREBANK || {};
  B.verbal = B.verbal || [];
  B.vpassages = B.vpassages || [];
  const V = B.verbal, P = B.vpassages;
  const d = "easy";

  /* ---------- Text Completion (single blank) ---------- */
  V.push(
    { id: "ve_tc1", type: "tc", diff: d, blanks: 1,
      text: "Because the witness's account was so {1}, the detective had little trouble reconstructing the sequence of events.",
      choices: ["detailed", "confusing", "brief", "reluctant", "dishonest"],
      answer: 0,
      expl: "The detective had <em>little trouble</em> reconstructing events, so the account must have helped: a <strong>detailed</strong> account does that. \"Confusing,\" \"brief,\" and \"reluctant\" would make reconstruction harder; \"dishonest\" would mislead.",
      tip: "Find the result clause ('little trouble') and choose the word that causes it." },
    { id: "ve_tc2", type: "tc", diff: d, blanks: 1,
      text: "The new employee was praised for her {1}; she completed every task on time and never left work unfinished.",
      choices: ["diligence", "creativity", "humor", "ambition", "curiosity"],
      answer: 0,
      expl: "The evidence (finishing tasks on time and never leaving work unfinished) describes <strong>diligence</strong> (steady, careful effort). The other traits aren't supported by that specific evidence.",
      tip: "The semicolon defines the blank: whatever follows it explains the missing word." },
    { id: "ve_tc3", type: "tc", diff: d, blanks: 1,
      text: "Although the film received {1} reviews from critics, audiences flocked to theaters and it became a commercial success.",
      choices: ["glowing", "lengthy", "poor", "early", "foreign"],
      answer: 2,
      expl: "\"Although\" signals contrast between critics and audiences. Since audiences loved it, the critics must have <strong>not</strong>, so <strong>poor</strong> reviews. \"Glowing\" would remove the contrast.",
      tip: "'Although' demands opposition: the two halves must point in different directions." },
    { id: "ve_tc4", type: "tc", diff: d, blanks: 1,
      text: "The manual is written in such {1} language that even a first-time user can follow it without difficulty.",
      choices: ["technical", "lucid", "dense", "archaic", "ambiguous"],
      answer: 1,
      expl: "A first-time user follows it <em>without difficulty</em>, so the language must be clear: <strong>lucid</strong>. \"Technical,\" \"dense,\" \"archaic,\" and \"ambiguous\" would all impede a beginner.",
      tip: "Match the blank to the outcome it produces (easy to follow → clear)." },
    { id: "ve_tc5", type: "tc", diff: d, blanks: 1,
      text: "Rather than acting on impulse, the committee chose a more {1} approach, weighing each option carefully before deciding.",
      choices: ["hasty", "reckless", "deliberate", "casual", "secretive"],
      answer: 2,
      expl: "\"Rather than acting on impulse\" and \"weighing each option carefully\" both point to a slow, careful method, <strong>deliberate</strong>. The impulse contrast rules out \"hasty\" and \"reckless.\"",
      tip: "'Rather than X' means the blank is the opposite of X." },
    { id: "ve_tc6", type: "tc", diff: d, blanks: 1,
      text: "The scientist's findings were initially met with {1}, but repeated experiments eventually convinced the skeptics.",
      choices: ["acceptance", "doubt", "applause", "indifference", "gratitude"],
      answer: 1,
      expl: "The word \"but\" contrasts the initial reaction with later conviction of \"skeptics.\" So the first reaction was <strong>doubt</strong>, which the experiments overcame.",
      tip: "'Skeptics' later in the sentence tells you the early mood was doubtful." },
    { id: "ve_tc7", type: "tc", diff: d, blanks: 1,
      text: "The desert landscape was strikingly {1}, with nothing but sand stretching to the horizon in every direction.",
      choices: ["lush", "barren", "crowded", "fertile", "humid"],
      answer: 1,
      expl: "\"Nothing but sand\" describes an empty, lifeless expanse, <strong>barren</strong>. \"Lush\" and \"fertile\" contradict the image.",
      tip: "Let the concrete detail (only sand) define the abstract blank." },
    { id: "ve_tc8", type: "tc", diff: d, blanks: 1,
      text: "Known for her {1}, the mayor donated much of her salary to local shelters and food banks.",
      choices: ["frugality", "generosity", "ambition", "stubbornness", "reticence"],
      answer: 1,
      expl: "Donating salary to shelters is an act of <strong>generosity</strong>. Note the trap: \"frugality\" is about saving, not giving.",
      tip: "Beware near-neighbors; frugality (thrift) is not the same as generosity (giving)." },
    { id: "ve_tc9", type: "tc", diff: d, blanks: 1,
      text: "The instructions were so {1} that the students argued for an hour about what they actually required.",
      choices: ["precise", "vague", "brief", "helpful", "formal"],
      answer: 1,
      expl: "If students argued about what the instructions required, the instructions must have been unclear, <strong>vague</strong>. \"Precise\" and \"helpful\" would prevent the argument.",
      tip: "The consequence (confusion, argument) reveals the cause (unclear wording)." },
    { id: "ve_tc10", type: "tc", diff: d, blanks: 1,
      text: "The athlete's {1} training paid off when she broke the national record after months of daily practice.",
      choices: ["sporadic", "relentless", "casual", "reluctant", "brief"],
      answer: 1,
      expl: "\"Months of daily practice\" indicates constant, intense effort, <strong>relentless</strong>. \"Sporadic,\" \"casual,\" and \"brief\" contradict daily practice.",
      tip: "Quantified detail (daily, for months) points to an intensity word." }
  );

  /* ---------- Sentence Equivalence ---------- */
  V.push(
    { id: "ve_se1", type: "se", diff: d,
      text: "The teacher was known for her ____ manner, always speaking to students with warmth and kindness.",
      choices: ["genial", "aloof", "cordial", "severe", "hasty", "clever"],
      answer: [0, 2],
      expl: "Warmth and kindness call for two synonyms meaning friendly: <strong>genial</strong> and <strong>cordial</strong>. \"Aloof\" and \"severe\" are opposite; \"hasty\" and \"clever\" don't fit or don't pair.",
      tip: "Find the two choices closest to your predicted word ('friendly')." },
    { id: "ve_se2", type: "se", diff: d,
      text: "The critic found the novel utterly ____, unable to put it down until the final page.",
      choices: ["tedious", "gripping", "predictable", "engrossing", "confusing", "brief"],
      answer: [1, 3],
      expl: "\"Unable to put it down\" means the book held attention: <strong>gripping</strong> and <strong>engrossing</strong>. \"Tedious\" and \"predictable\" are opposites.",
      tip: "The clause after the comma defines the blank as 'held his attention.'" },
    { id: "ve_se3", type: "se", diff: d,
      text: "Faced with mounting evidence, the official could no longer ____ his involvement in the scandal.",
      choices: ["deny", "confirm", "disavow", "reveal", "celebrate", "recall"],
      answer: [0, 2],
      expl: "With evidence mounting, he can no longer <strong>deny</strong> / <strong>disavow</strong> (reject) his involvement. \"Confirm\" and \"reveal\" are the opposite action.",
      tip: "'Deny' and 'disavow' both mean to refuse to admit, a matching pair." },
    { id: "ve_se4", type: "se", diff: d,
      text: "The once-bustling factory now stood ____, its machines silent and its windows broken.",
      choices: ["abandoned", "renovated", "deserted", "profitable", "crowded", "modern"],
      answer: [0, 2],
      expl: "Silent machines and broken windows describe an empty, neglected place: <strong>abandoned</strong> and <strong>deserted</strong>. The other options contradict the decay imagery.",
      tip: "Concrete details (silence, disrepair) fix the meaning as 'empty/neglected.'" },
    { id: "ve_se5", type: "se", diff: d,
      text: "Her ____ for detail made her an excellent proofreader, catching errors others overlooked.",
      choices: ["disregard", "eye", "aptitude", "aversion", "contempt", "flair"],
      answer: [2, 5],
      expl: "Being an excellent proofreader requires a talent for detail: <strong>aptitude</strong> and <strong>flair</strong>. (\"Eye\" fits meaning but doesn't pair with a second synonym here.) \"Disregard,\" \"aversion,\" and \"contempt\" are opposite.",
      tip: "You need two words that produce the same meaning; 'aptitude' and 'flair' both mean natural talent." },
    { id: "ve_se6", type: "se", diff: d,
      text: "The general's plan was so ____ that his officers immediately grasped exactly what was expected of them.",
      choices: ["convoluted", "clear", "vague", "lucid", "risky", "secret"],
      answer: [1, 3],
      expl: "Officers grasped it \"immediately\" and \"exactly,\" so the plan was easy to understand: <strong>clear</strong> and <strong>lucid</strong>. \"Convoluted\" and \"vague\" are opposite.",
      tip: "The result (instant understanding) determines the blank." },
    { id: "ve_se7", type: "se", diff: d,
      text: "Despite the team's ____ start, they rallied in the second half and won the championship.",
      choices: ["triumphant", "dismal", "promising", "wretched", "cautious", "brilliant"],
      answer: [1, 3],
      expl: "\"Despite\" and the later rally mean the start was bad: <strong>dismal</strong> and <strong>wretched</strong>. \"Triumphant,\" \"promising,\" and \"brilliant\" would remove the contrast.",
      tip: "'Despite' plus a later comeback signals a negative opening." }
  );

  /* ---------- Critical Reasoning ---------- */
  V.push(
    { id: "ve_cr1", type: "cr", diff: d,
      passage: "A city installed brighter streetlights in its downtown core, and over the following year, reported nighttime accidents in that area fell by 20 percent. City officials concluded that the brighter lights caused the decline.",
      text: "Which of the following, if true, most weakens the officials' conclusion?",
      choices: [
        "During the same year, the city also reduced the downtown speed limit and added several new pedestrian crossings.",
        "Several drivers reported that the new lights made the roadway noticeably easier to see at night.",
        "The decline was measured using the same accident-reporting methods as in previous years.",
        "Downtown business owners had lobbied for brighter streetlights for several years.",
        "Nighttime accidents remain more common downtown than in the city's residential districts."
      ],
      answer: 0,
      expl: "The conclusion is causal (lights → fewer accidents). The correct choice supplies an <strong>alternative cause</strong> (lower speed limits and new crossings) that could explain the drop, undermining the claim that the lights were responsible. The driver reports and the consistent reporting methods would, if anything, <em>support</em> the officials; the lobbying and the downtown-versus-residential comparison leave the causal question untouched.",
      tip: "To weaken a causal claim, look for an alternative explanation for the same result — not for statements that merely sound skeptical." },
    { id: "ve_cr2", type: "cr", diff: d,
      passage: "A company found that employees who ate lunch at their desks were, on average, more productive than those who left for lunch. The company plans to encourage all employees to eat at their desks in order to raise overall productivity.",
      text: "The company's plan assumes which of the following?",
      choices: [
        "Eating lunch at one's desk is at least partly responsible for the higher productivity, rather than merely accompanying it.",
        "All employees prefer to eat lunch at their desks.",
        "Employees who leave for lunch never return late.",
        "Productivity is the only measure of a good employee.",
        "Employees who eat at their desks take shorter lunch breaks than those who leave."
      ],
      answer: 0,
      expl: "The plan treats a <strong>correlation</strong> as if eating at the desk <em>causes</em> productivity. It assumes the behavior is at least partly responsible, otherwise encouraging it wouldn't raise productivity.",
      tip: "A plan built on a correlation assumes the correlation is causal." },
    { id: "ve_cr3", type: "cr", diff: d,
      passage: "Every winter, sales of hot chocolate at the campus café rise sharply. The café manager notes that colder weather always coincides with these higher sales and concludes that cold weather drives students to buy more hot chocolate.",
      text: "Which of the following, if true, most strengthens the manager's conclusion?",
      choices: [
        "On unusually warm winter days, hot chocolate sales drop noticeably even though it is still winter.",
        "Sales of all beverages, hot and cold alike, rise during examination weeks.",
        "Hot chocolate is the café's most profitable beverage.",
        "Many students study at the café regardless of the season.",
        "The café introduced a new hot chocolate flavor at the start of last winter."
      ],
      answer: 0,
      expl: "Strengthening a causal claim: if sales fall specifically when it's <em>warm</em> during winter, temperature (not just the season) tracks sales, supporting the cold-weather cause.",
      tip: "Strengthen a cause by showing the effect tracks the cause even when other factors are held constant." }
  );

  /* ---------- Reading Comprehension passages ---------- */
  P.push({
    id: "ve_p1", diff: d, title: "Urban beekeeping",
    text: `<p>In the past two decades, beekeeping has moved from the countryside into the heart of major cities. Rooftops, community gardens, and balconies now host hives that would once have seemed out of place amid concrete and traffic. Advocates argue that urban bees are often healthier than their rural counterparts: cities offer a wider variety of flowering plants across a longer season, and they are largely free of the agricultural pesticides that harm bees in farming regions.</p>
    <p>Critics, however, caution that a city can support only so many hives. When enthusiasm outpaces the available forage, colonies compete for a limited supply of nectar, and both managed honeybees and wild native pollinators may suffer. Some researchers now recommend that cities track hive density and plant more bee-friendly vegetation before encouraging further growth, rather than treating every new hive as an unambiguous good.</p>`,
    questions: [
      { id: "ve_p1q1", type: "mcq", diff: d,
        text: "The primary purpose of the passage is to",
        choices: [
          "present the rise of urban beekeeping along with a benefit and a concern",
          "argue that cities should stop adding hives until more forage is planted",
          "explain why urban bees are often healthier than their rural counterparts",
          "describe how competition among hives harms wild native pollinators",
          "recommend that cities begin tracking the density of their hives"
        ],
        answer: 0,
        expl: "The passage describes the trend, gives a benefit (paragraph 1) and a concern (paragraph 2). Each wrong choice inflates one piece into the whole: the healthier-bees claim covers only paragraph 1, the competition harm and density-tracking cover only paragraph 2, and \"stop adding hives\" is stronger than what the researchers actually recommend.",
        tip: "The main purpose must cover the whole passage; a choice that is true of one paragraph is still wrong." },
      { id: "ve_p1q2", type: "mcq", diff: d,
        text: "According to the passage, one reason urban bees may be healthier than rural bees is that cities",
        choices: [
          "have fewer of the agricultural pesticides that harm bees",
          "offer a wider variety of flowering plants, though over a shorter season",
          "have fewer wild pollinators competing with honeybees for nectar",
          "monitor the health of their hives more closely than farming regions do",
          "are entirely free of pesticides of every kind"
        ],
        answer: 0,
        expl: "Paragraph 1 states cities are \"largely free of the agricultural pesticides that harm bees.\" The flowering-plants choice reverses a detail — the passage says a <em>longer</em> season, not a shorter one; \"entirely free of pesticides of every kind\" overstates \"largely free of agricultural pesticides\"; and paragraph 2 raises competition with wild pollinators as a <em>problem</em>, not an advantage.",
        tip: "For a detail question, find the exact supporting line — half-right choices reverse or overstate it." },
      { id: "ve_p1q3", type: "mcq", diff: d,
        text: "The concern raised by critics in the second paragraph is best described as",
        choices: [
          "too many hives competing for limited nectar",
          "wild pollinators driving managed honeybees out of city gardens",
          "cities planting vegetation that bees are unable to use",
          "enthusiasm for beekeeping fading before cities can benefit from it",
          "agricultural pesticides drifting from farms into urban areas"
        ],
        answer: 0,
        expl: "Critics warn that when hives outpace forage, colonies \"compete for a limited supply of nectar.\" The wild-pollinator choice reverses the harm (the passage worries hives hurt wild pollinators, not the reverse); \"enthusiasm fading\" reverses \"enthusiasm outpaces the available forage\"; and pesticides belong to paragraph 1's point about farms, not the critics' concern.",
        tip: "Paraphrase the critics' point in your own words first — reversals of it will then stand out." }
    ]
  });

  P.push({
    id: "ve_p2", diff: d, title: "The lighthouse keeper",
    text: `<p>For centuries, lighthouses were tended by keepers who lived on-site, trimming wicks, polishing lenses, and sounding fog signals through the night. The work was solitary and demanding, but it carried a clear sense of purpose: a single lapse could cost a ship and its crew. By the late twentieth century, however, automation had made the human keeper largely obsolete. Electric lamps, timers, and remote monitoring could perform the essential tasks without a resident.</p>
    <p>The last keepers were often reluctant to leave. Some had spent decades on their islands and rocks, and they spoke of the lights almost as living companions. Their departure marked the end of a profession, but not of the lighthouses themselves, many of which continue to shine: now watched over by sensors and distant technicians rather than by a lantern-carrying figure on the stairs.</p>`,
    questions: [
      { id: "ve_p2q1", type: "mcq", diff: d,
        text: "The passage suggests that the work of a traditional lighthouse keeper was",
        choices: [
          "demanding and carried out largely alone",
          "solitary but without much real responsibility",
          "demanding chiefly because of the volume of passing ships",
          "less difficult than is commonly believed",
          "already unnecessary well before automation arrived"
        ],
        answer: 0,
        expl: "The passage calls the work \"solitary and demanding.\" The \"without much real responsibility\" choice keeps the right adjective but reverses the point of \"a single lapse could cost a ship and its crew\"; the ship-volume cause is invented; and the passage dates obsolescence to automation, not before it.",
        tip: "Half-right answers keep one true adjective and quietly negate the other half — verify both parts." },
      { id: "ve_p2q2", type: "mcq", diff: d,
        text: "According to the passage, human keepers became obsolete mainly because of",
        choices: [
          "automation such as electric lamps and remote monitoring",
          "a decline in the number of ships needing guidance",
          "the keepers' growing unwillingness to live in isolation",
          "the closing of most lighthouses in the late twentieth century",
          "the replacement of lighthouses by shore-based fog signals"
        ],
        answer: 0,
        expl: "Paragraph 1 attributes obsolescence to automation — electric lamps, timers, remote monitoring. The unwillingness choice reverses the second paragraph (keepers were reluctant to <em>leave</em>), and \"the closing of most lighthouses\" contradicts \"many of which continue to shine.\" Declining traffic is plausible but never stated.",
        tip: "Cause questions want the reason the passage actually gives — and beware reversals of details from other paragraphs." }
    ]
  });
})();
