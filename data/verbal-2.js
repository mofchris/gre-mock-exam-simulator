/* Verbal bank - expansion set (all difficulties).
   Adds what the original bank was thin on: three-blank Text Completion,
   Critical Reasoning variants (resolve-the-paradox, evaluate, inference,
   complete-the-passage), and second-meaning vocabulary traps.
   Ids are prefixed v2_. */
(function () {
  const B = window.GREBANK = window.GREBANK || {};
  B.verbal = B.verbal || [];
  const V = B.verbal;

  /* ---------- Text Completion: single blank ---------- */
  V.push(
    { id: "v2_tc1", type: "tc", diff: "easy", blanks: 1,
      text: "Because the instructions were so {1}, several of the assembly steps could be performed in either of two orders, with no way to tell which the manufacturer intended.",
      choices: ["ambiguous", "precise", "tedious", "novel", "reliable"],
      answer: 0,
      expl: "Steps that can be read two ways with \"no way to tell which was intended\" define <strong>ambiguous</strong> instructions. \"Precise\" is the opposite; \"tedious\" instructions would be boring but clear.",
      tip: "The clause after the comma usually defines the blank — match the definition, not the mood." },
    { id: "v2_tc2", type: "tc", diff: "easy", blanks: 1,
      text: "Although the film was marketed as a lighthearted comedy, its final act takes a decidedly {1} turn that sent audiences out in silence.",
      choices: ["predictable", "somber", "festive", "brisk", "humorous"],
      answer: 1,
      expl: "\"Although\" opposes \"lighthearted comedy,\" and \"audiences out in silence\" confirms the direction: <strong>somber</strong>. \"Humorous\" and \"festive\" continue the comedy instead of contrasting with it.",
      tip: "'Although' promises a reversal — pick the word that completes it, then verify with the closing detail." },
    { id: "v2_tc3", type: "tc", diff: "medium", blanks: 1,
      text: "The new director's changes amounted less to a revolution than to a {1}: every existing policy was retained, but each was pursued with far greater vigor.",
      choices: ["repudiation", "intensification", "capitulation", "digression", "subterfuge"],
      answer: 1,
      expl: "Policies kept but pursued harder is an <strong>intensification</strong>. \"Repudiation\" (rejection) contradicts \"retained\"; \"capitulation\" (surrender) has no support.",
      tip: "'Less X than Y' sets up a corrected label — the blank must fit the description that follows the colon." },
    { id: "v2_tc4", type: "tc", diff: "medium", blanks: 1,
      text: "Her lecture style is best described as {1}: she meanders through anecdotes and asides, yet each apparent detour proves, in retrospect, essential to the argument.",
      choices: ["disciplined", "perfunctory", "digressive", "combative", "terse"],
      answer: 2,
      expl: "Meandering through asides is <strong>digressive</strong> — the \"yet\" concedes the detours are ultimately purposeful without denying they are detours. \"Terse\" and \"disciplined\" contradict the meandering.",
      tip: "Describe what the style IS (wandering), not the later concession about its value." },
    { id: "v2_tc5", type: "tc", diff: "hard", blanks: 1,
      text: "The novelist's judgments of her characters are never {1}; even her villains are rendered with a patience that shades, at moments, into sympathy.",
      choices: ["summary", "equivocal", "veiled", "provisional", "charitable"],
      answer: 0,
      expl: "The contrast with \"patience\" requires a word meaning hasty and without due consideration: <strong>summary</strong> (as in \"summary judgment\") — the GRE's beloved second meaning. \"Charitable\" is what the judgments ARE, not what they're not.",
      tip: "When a common word (summary, arrest, qualify, economy) looks out of place, test its second meaning." },
    { id: "v2_tc6", type: "tc", diff: "hard", blanks: 1,
      text: "So thoroughly had the doctrine been {1} by mid-century that later historians struggled to reconstruct how it could ever have commanded serious assent.",
      choices: ["assimilated", "discredited", "anticipated", "qualified", "promulgated"],
      answer: 1,
      expl: "If historians can't see how it was ever believed, the doctrine must have been utterly <strong>discredited</strong>. \"Assimilated\" or \"promulgated\" (spread) would leave belief intact and explain nothing.",
      tip: "Work backwards from the result clause: what state makes former belief seem incredible?" }
  );

  /* ---------- Text Completion: two blanks ---------- */
  V.push(
    { id: "v2_tc2b1", type: "tc", diff: "medium", blanks: 2,
      text: "The report, though {1} in its criticisms, was received with surprising {2} by the very administrators it faulted, several of whom pronounced it fair.",
      choices: [
        ["measured", "scathing", "perfunctory"],
        ["equanimity", "indignation", "fanfare"]
      ],
      answer: [1, 0],
      expl: "\"Though\" plus \"surprising\" requires tension between the blanks: a <strong>scathing</strong> report met with <strong>equanimity</strong> (calm composure). A \"measured\" report meeting calm acceptance would surprise no one.",
      tip: "'Though … surprising' means the two blanks must clash — pick the pair with maximum friction." },
    { id: "v2_tc2b2", type: "tc", diff: "medium", blanks: 2,
      text: "Far from {1} the rumor, the spokesman's evasive reply seemed only to {2} it: by the next morning the story was on every front page.",
      choices: [
        ["confirming", "quashing", "spreading"],
        ["corroborate", "extinguish", "predate"]
      ],
      answer: [1, 0],
      expl: "\"Far from\" reverses the first blank against the outcome. The reply was meant to <strong>quash</strong> the rumor but instead seemed to <strong>corroborate</strong> it — evasion read as admission. \"Confirming/corroborate\" would make the two halves agree, killing the reversal.",
      tip: "'Far from X, it did Y' — X and Y must be opposites; solve them as a pair." },
    { id: "v2_tc2b3", type: "tc", diff: "hard", blanks: 2,
      text: "The biography's achievement is to make its subject seem neither {1} nor {2}: he emerges as no saint and no monster, but as a man of ordinary, if magnified, contradictions.",
      choices: [
        ["exemplary", "obscure", "representative"],
        ["influential", "monstrous", "tragic"]
      ],
      answer: [0, 1],
      expl: "\"No saint and no monster\" glosses the two blanks in order: neither <strong>exemplary</strong> (saintly) nor <strong>monstrous</strong>. The other options aren't anchored by the saint/monster restatement.",
      tip: "A colon that restates ('no saint and no monster') hands you both blanks — map them in order." },
    { id: "v2_tc2b4", type: "tc", diff: "hard", blanks: 2,
      text: "What the treatise loses in {1} by its refusal to simplify, it gains in {2}: no rival account preserves so faithfully the phenomenon's real intricacy.",
      choices: [
        ["rigor", "accessibility", "novelty"],
        ["brevity", "popularity", "fidelity"]
      ],
      answer: [1, 2],
      expl: "Refusing to simplify costs <strong>accessibility</strong> (it's harder to read) but buys <strong>fidelity</strong> — \"preserves so faithfully\" is the direct clue. Losing \"rigor\" by refusing to simplify reverses the logic.",
      tip: "Trade-off sentences: identify what simplifying would have bought (ease) and what refusing it buys (accuracy)." }
  );

  /* ---------- Text Completion: three blanks ---------- */
  V.push(
    { id: "v2_tc3b1", type: "tc", diff: "medium", blanks: 3,
      text: "Early reviewers treated the composer's borrowings from folk melody as a {1} — proof that his invention had run dry. Later critics, more {2}, heard in the same borrowings a deliberate widening of the symphonic vocabulary: evidence not of exhaustion but of {3}.",
      choices: [
        ["failing", "coincidence", "triumph"],
        ["dismissive", "sympathetic", "prolific"],
        ["fatigue", "imitation", "ambition"]
      ],
      answer: [0, 1, 2],
      expl: "The arc runs from hostile to generous reading. Blank (i): early reviewers saw a <strong>failing</strong> (\"invention had run dry\"). Blank (ii): later critics were more <strong>sympathetic</strong>. Blank (iii): \"not exhaustion but…\" demands the positive counterpart — <strong>ambition</strong>.",
      tip: "In 'not X but Y' the Y-blank must be X's opposite; anchor there and work outward." },
    { id: "v2_tc3b2", type: "tc", diff: "medium", blanks: 3,
      text: "Because the archive had been catalogued {1}, researchers for decades stumbled on crucial documents largely by {2} — a state of affairs the new digital index is intended to {3}.",
      choices: [
        ["haphazardly", "meticulously", "confidentially"],
        ["accident", "design", "committee"],
        ["perpetuate", "remedy", "commemorate"]
      ],
      answer: [0, 0, 1],
      expl: "A cause-and-effect chain: a <strong>haphazardly</strong> catalogued archive forces discovery by <strong>accident</strong>, which a new index would <strong>remedy</strong>. \"Meticulously\" would make accidental discovery inexplicable and leave nothing to fix.",
      tip: "Three-blank sentences are often one causal chain — make sure your three choices tell a single coherent story." },
    { id: "v2_tc3b3", type: "tc", diff: "hard", blanks: 3,
      text: "It is tempting to read the diplomat's memoir as {1}, yet the very smoothness of its self-justifications should give us pause: a truly {2} conscience rarely feels the need to be quite so {3}.",
      choices: [
        ["candor itself", "special pleading", "ancient history"],
        ["troubled", "clear", "selective"],
        ["thorough", "reticent", "careless"]
      ],
      answer: [0, 1, 0],
      expl: "The \"yet\" undercuts a charitable first impression: the memoir reads as <strong>candor itself</strong>, but polished self-justification suggests guilt, since a <strong>clear</strong> conscience rarely needs to be so <strong>thorough</strong> in defending itself. Choosing \"troubled\" for blank (ii) inverts the aphorism.",
      tip: "Blank (iii) must be what the memoir demonstrably IS (exhaustively self-justifying); build the aphorism around that." },
    { id: "v2_tc3b4", type: "tc", diff: "hard", blanks: 3,
      text: "The economist's prose {1} the reader into agreement: premises stated so mildly seem {2}, and only later does one notice that the argument's crucial step was {3} rather than demonstrated.",
      choices: [
        ["bullies", "lulls", "dazzles"],
        ["contentious", "decisive", "innocuous"],
        ["refuted", "assumed", "italicized"]
      ],
      answer: [1, 2, 1],
      expl: "Mild premises don't bully or dazzle; they <strong>lull</strong>. Mildness makes them seem <strong>innocuous</strong> (harmless), and the sleight of hand is that the key step was <strong>assumed</strong>, not proved. \"Contentious\" contradicts \"stated so mildly.\"",
      tip: "Keep the metaphor consistent: a lulling writer needs harmless-seeming premises and a quietly smuggled conclusion." }
  );

  /* ---------- Sentence Equivalence ---------- */
  V.push(
    { id: "v2_se1", type: "se", diff: "easy",
      text: "Hikers were warned that the trail's final mile was ____ and should on no account be attempted in wet weather.",
      choices: ["scenic", "treacherous", "brief", "hazardous", "popular", "unmarked"],
      answer: [1, 3],
      expl: "A warning tied to dangerous conditions calls for <strong>treacherous</strong> / <strong>hazardous</strong>. \"Unmarked\" might justify caution but has no partner producing the same sentence.",
      tip: "Both chosen words must yield the SAME sentence — a plausible loner is still wrong." },
    { id: "v2_se2", type: "se", diff: "easy",
      text: "The editor praised the young reporter's ____ in checking every quoted figure against the original court records.",
      choices: ["haste", "diligence", "flair", "thoroughness", "cynicism", "brevity"],
      answer: [1, 3],
      expl: "Checking every figure shows <strong>diligence</strong> / <strong>thoroughness</strong>. \"Haste\" is the opposite; \"flair\" praises style, not care.",
      tip: "Let the concrete behavior (checking everything) name the trait for you." },
    { id: "v2_se3", type: "se", diff: "medium",
      text: "The candidate's answers were so ____ that commentators from opposing camps each came away convinced she supported their side.",
      choices: ["forthright", "noncommittal", "rehearsed", "equivocal", "combative", "lengthy"],
      answer: [1, 3],
      expl: "Answers that let both camps claim her must commit to nothing: <strong>noncommittal</strong> / <strong>equivocal</strong>. \"Rehearsed\" answers could still be perfectly clear.",
      tip: "The result (both sides convinced) is the clue — only vagueness produces it." },
    { id: "v2_se4", type: "se", diff: "medium",
      text: "A scientist's public reputation can be an oddly ____ thing, inflated by a single lucky finding and destroyed by a single honest error.",
      choices: ["durable", "precarious", "deserved", "fragile", "collective", "opaque"],
      answer: [1, 3],
      expl: "Something one error can destroy is <strong>precarious</strong> / <strong>fragile</strong>. \"Durable\" is the direct opposite of the evidence given.",
      tip: "'Inflated by one X, destroyed by one Y' describes instability — match that, not fairness or fame." },
    { id: "v2_se5", type: "se", diff: "hard",
      text: "The prize, once a reliable marker of scholarly distinction, has of late been bestowed so freely that it has begun to seem ____.",
      choices: ["coveted", "debased", "posthumous", "devalued", "partisan", "ceremonial"],
      answer: [1, 3],
      expl: "Over-supply erodes worth: <strong>debased</strong> / <strong>devalued</strong> — the currency metaphor. \"Ceremonial\" tempts (an empty honor) but has no equivalent partner among the rest.",
      tip: "Watch for the near-miss third word; the test wants the tightest PAIR, not every word that loosely fits." },
    { id: "v2_se6", type: "se", diff: "hard",
      text: "His indictment of the administration, delivered with a lawyer's care never to claim more than the evidence allowed, was all the more ____ for its restraint.",
      choices: ["muted", "damning", "verbose", "telling", "gentle", "opaque"],
      answer: [1, 3],
      expl: "\"All the more ___ for its restraint\" is concessive: the restraint AMPLIFIED its force, so the blank is a strong word — <strong>damning</strong> / <strong>telling</strong>. \"Muted\" and \"gentle\" read the sentence backwards.",
      tip: "'All the more X for its Y' makes X the surprising consequence, not a synonym of Y." }
  );

  /* ---------- Critical Reasoning: variant stems ---------- */
  V.push(
    { id: "v2_cr1", type: "cr", diff: "medium",
      passage: "A national retail chain finds that its stores in the cities with the highest rates of bicycle commuting sell the fewest new bicycles per resident.",
      text: "Which of the following, if true, most helps to explain the surprising finding?",
      choices: [
        "Cities with high rates of bicycle commuting typically have many independent repair shops that keep older bicycles in service for decades.",
        "The chain's stores charge similar prices for bicycles in every city in which they operate.",
        "Bicycle helmets and accessories sell briskly in cities with high rates of bicycle commuting.",
        "Some people who commute by bicycle also own cars.",
        "The chain's bicycle sales nationwide are highest in the spring months."
      ],
      answer: 0,
      expl: "The paradox: most riders, fewest sales. If thriving repair shops keep old bikes running, heavy riders rarely need NEW bikes — both facts stand, explained. Accessory sales tempt as \"related revenue,\" but they say nothing about why NEW-bicycle sales are lowest exactly where riding is highest.",
      tip: "Resolve-the-paradox answers keep BOTH facts true and supply the missing link between them." },
    { id: "v2_cr2", type: "cr", diff: "medium",
      passage: "A researcher claims that a dietary supplement improves memory, citing a study in which adults who took the supplement daily for a year scored substantially higher on recall tests than adults who did not take it.",
      text: "Which of the following would it be most useful to know in evaluating the researcher's claim?",
      choices: [
        "Whether participants were randomly assigned to take the supplement or chose for themselves whether to take it",
        "Whether the supplement is more expensive than similar products",
        "How many recall tests each participant completed",
        "Whether the researcher has published previous studies on nutrition",
        "Whether memory can be improved by regular physical exercise"
      ],
      answer: 0,
      expl: "If people self-selected, supplement-takers may differ systematically (health-conscious habits, education) and the score gap may reflect who they are, not what they took. Random assignment is what separates cause from correlation — knowing which occurred decides how much the study proves.",
      tip: "Evaluate questions reward the answer whose two possible outcomes push the conclusion in opposite directions." },
    { id: "v2_cr3", type: "cr", diff: "hard",
      passage: "At a factory, every batch that fails inspection is reworked exactly once. Reworked batches are inspected a second time, and any batch that fails this second inspection is scrapped. Last month, 40 batches were reworked and no batch was scrapped.",
      text: "If the statements above are true, which of the following must also be true of last month?",
      choices: [
        "Every batch that was reworked passed its second inspection.",
        "Most of the factory's batches failed their first inspection.",
        "The factory produced at least 80 batches.",
        "The second inspection was less demanding than the first.",
        "Fewer batches were reworked than in the previous month."
      ],
      answer: 0,
      expl: "All 40 reworked batches were inspected again, and scrapping is the mandated outcome of a second failure. Zero scrapped batches therefore forces zero second failures — every reworked batch passed. The totals, standards, and trends in the other choices are simply not determined by the given facts.",
      tip: "Inference answers must be FORCED by the statements; anything about unstated quantities is out." },
    { id: "v2_cr4", type: "cr", diff: "hard",
      passage: "Economist: Tariffs on imported steel do protect jobs in the domestic steel-making industry. But industries that use steel to make other products employ roughly ten times as many workers as steel-making does, and tariffs raise those industries' costs, forcing them to cut output and staff. If employment is truly the government's concern, then, the tariffs are ______.",
      text: "Which of the following most logically completes the economist's argument?",
      choices: [
        "likely to eliminate more jobs than they preserve",
        "certain to reduce the price of domestically produced steel",
        "best defended on grounds of national security rather than economics",
        "popular with workers in the steel-making industry",
        "impossible to repeal once enacted"
      ],
      answer: 0,
      expl: "The premises weigh a small protected group against a tenfold-larger harmed group, under the stated standard of employment. The conclusion the argument is built to deliver: the tariffs likely destroy more jobs than they save. The national-security choice changes the subject the economist explicitly fixed.",
      tip: "Complete-the-passage: the blank is the conclusion the premises already aim at — no new topics allowed." },
    { id: "v2_cr5", type: "cr", diff: "medium",
      passage: "Last year the city replaced the four-way stop intersections in its northern district with roundabouts, and vehicle collisions in that district fell by 30 percent. City engineers concluded that the roundabouts caused the reduction.",
      text: "Which of the following, if true, most strengthens the engineers' conclusion?",
      choices: [
        "In the city's southern district, where intersections were left unchanged, collision rates did not decline over the same period.",
        "Roundabouts are generally cheaper to maintain than signalized intersections.",
        "Some drivers report finding roundabouts confusing at first.",
        "The northern district contains several of the city's busiest roads.",
        "Collisions at roundabouts tend to occur at lower speeds than collisions at four-way stops."
      ],
      answer: 0,
      expl: "The unchanged southern district acts as a control: no intervention, no decline. That rules out citywide explanations (weather, fuel prices, traffic volume) and isolates the roundabouts as the difference. Lower-speed collisions is about severity, not the NUMBER of collisions the conclusion concerns.",
      tip: "The strongest strengthener for a causal claim is a comparison group without the cause and without the effect." },
    { id: "v2_cr6", type: "cr", diff: "easy",
      passage: "In March, a cafe hired a new pastry chef. By May, its breakfast revenue had risen 25 percent. The owner concluded that the new chef's pastries caused the increase.",
      text: "Which of the following, if true, most seriously weakens the owner's conclusion?",
      choices: [
        "A large office complex directly across the street opened in April, tripling weekday foot traffic in the area.",
        "The pastry chef previously worked at a well-regarded bakery.",
        "The cafe's lunch revenue remained roughly constant from March to May.",
        "Some longtime customers say they preferred the old menu.",
        "Breakfast is the cafe's busiest period of the day."
      ],
      answer: 0,
      expl: "The office complex is an alternative cause: tripled foot traffic alone could produce the revenue jump whether or not the pastries improved. Flat lunch revenue slightly complicates it but doesn't supply a cause the way the new neighbors do.",
      tip: "Weaken causal conclusions by offering a rival cause that fits the same timeline." }
  );
})();
