/* Verbal bank — MEDIUM. */
(function () {
  const B = window.GREBANK = window.GREBANK || {};
  B.verbal = B.verbal || [];
  B.vpassages = B.vpassages || [];
  const V = B.verbal, P = B.vpassages;
  const d = "medium";

  /* ---------- Text Completion: single blank ---------- */
  V.push(
    { id: "vm_tc1", type: "tc", diff: d, blanks: 1,
      text: "Far from being the {1} figure his memoirs suggest, the general was, by most contemporary accounts, cautious to the point of timidity.",
      choices: ["intrepid", "duplicitous", "reticent", "affable", "meticulous"],
      answer: 0,
      expl: "\"Far from being\" sets up a contrast with \"cautious to the point of timidity.\" The opposite of timid is bold — <strong>intrepid</strong>. The others don't oppose timidity.",
      tip: "'Far from being X' means the blank is the opposite of what actually follows." },
    { id: "vm_tc2", type: "tc", diff: d, blanks: 1,
      text: "The essayist is celebrated less for the novelty of her ideas than for the {1} with which she expresses them, turning familiar observations into memorable prose.",
      choices: ["obscurity", "felicity", "brevity", "hesitancy", "acrimony"],
      answer: 1,
      expl: "Her ideas aren't novel, yet she is celebrated — so she must express them well, turning the familiar into memorable prose. <strong>Felicity</strong> means apt, pleasing expression. \"Obscurity\" and \"acrimony\" are negative; \"brevity\" and \"hesitancy\" aren't supported.",
      tip: "'Turning familiar observations into memorable prose' defines the praised quality." },
    { id: "vm_tc3", type: "tc", diff: d, blanks: 1,
      text: "Critics complained that the policy, however well intentioned, was ultimately {1}, addressing the symptoms of poverty while leaving its causes untouched.",
      choices: ["comprehensive", "palliative", "punitive", "revolutionary", "clandestine"],
      answer: 1,
      expl: "Treating symptoms but not causes is the definition of <strong>palliative</strong> (relieving without curing). \"Comprehensive\" and \"revolutionary\" contradict the critique.",
      tip: "The 'symptoms not causes' clue points to a word meaning superficial relief." },
    { id: "vm_tc4", type: "tc", diff: d, blanks: 1,
      text: "Although often dismissed as a mere {1}, the diplomat's studied vagueness was in fact a calculated strategy, allowing each party to claim victory.",
      choices: ["triumph", "evasion", "concession", "blunder", "formality"],
      answer: 1,
      expl: "\"Studied vagueness\" that lets each side claim victory looks, superficially, like dodging — an <strong>evasion</strong> — though it's really strategic. \"Blunder\" and \"concession\" don't match 'vagueness'; the 'although' contrasts a dismissive label with a shrewd reality.",
      tip: "The blank is the unflattering label; pick the word that fits 'studied vagueness.'" },
    { id: "vm_tc5", type: "tc", diff: d, blanks: 1,
      text: "The biography is admirably {1}: the author neither conceals her subject's failures nor allows them to eclipse his genuine achievements.",
      choices: ["laudatory", "evenhanded", "exhaustive", "tentative", "polemical"],
      answer: 1,
      expl: "Neither concealing failures nor letting them eclipse achievements is balance — <strong>evenhanded</strong>. \"Laudatory\" and \"polemical\" are one-sided.",
      tip: "'Neither…nor…' balancing two extremes signals a word meaning fair/balanced." },
    { id: "vm_tc6", type: "tc", diff: d, blanks: 1,
      text: "Once {1} by mainstream economists, her theories are now taught in graduate seminars and cited approvingly in the very journals that had rejected them.",
      choices: ["endorsed", "scrutinized", "spurned", "amended", "anticipated"],
      answer: 2,
      expl: "The contrast (\"now taught… cited approvingly… journals that had rejected them\") shows the theories were once refused — <strong>spurned</strong>. \"Endorsed\" reverses the meaning.",
      tip: "The later reversal ('journals that had rejected them') tells you the early attitude was hostile." },
    { id: "vm_tc7", type: "tc", diff: d, blanks: 1,
      text: "The senator's speech was a model of {1}: in twenty minutes she managed to say a great deal while committing herself to almost nothing.",
      choices: ["candor", "circumspection", "erudition", "indignation", "spontaneity"],
      answer: 1,
      expl: "Saying much while committing to nothing is cautious guardedness — <strong>circumspection</strong>. \"Candor\" (frankness) is the opposite.",
      tip: "'Say a great deal while committing to nothing' defines careful, guarded speech." },
    { id: "vm_tc8", type: "tc", diff: d, blanks: 1,
      text: "Paradoxically, the more the museum tried to make its exhibits {1} to casual visitors, the more it alienated the specialists on whose expertise its reputation rested.",
      choices: ["accessible", "esoteric", "valuable", "permanent", "controversial"],
      answer: 0,
      expl: "Making exhibits appealing to \"casual visitors\" means making them <strong>accessible</strong>; doing so alienated specialists. \"Esoteric\" would appeal to specialists, not casual visitors.",
      tip: "The audience named ('casual visitors') tells you which direction the blank goes." },
    { id: "vm_tc9", type: "tc", diff: d, blanks: 1,
      text: "His prose style is anything but {1}; every sentence bristles with subordinate clauses, parenthetical asides, and abrupt changes of direction.",
      choices: ["ornate", "spare", "erudite", "vivid", "formal"],
      answer: 1,
      expl: "\"Anything but\" negates the blank. Sentences full of clauses and asides are elaborate, so the blank is the opposite — <strong>spare</strong> (plain, uncluttered).",
      tip: "'Anything but X' + evidence of the opposite ⇒ the blank names the opposite of the evidence." },
    { id: "vm_tc10", type: "tc", diff: d, blanks: 1,
      text: "The committee's report was notable for its {1}; rather than assigning blame, it soberly catalogued the failures of every party, including itself.",
      choices: ["partiality", "impartiality", "brevity", "vindictiveness", "optimism"],
      answer: 1,
      expl: "Cataloguing every party's failures, including its own, without assigning blame is fairness — <strong>impartiality</strong>. \"Partiality\" and \"vindictiveness\" are the opposite.",
      tip: "'Including itself' signals fairness that spares no one." }
  );

  /* ---------- Text Completion: two blanks ---------- */
  V.push(
    { id: "vm_tc2b1", type: "tc", diff: d, blanks: 2,
      text: "The researcher's conclusions, though {1} when first published, have since become so widely accepted that they now seem almost {2}.",
      choices: [
        ["heretical", "tentative", "unremarkable"],
        ["self-evident", "obscure", "erroneous"]
      ],
      answer: [0, 0],
      expl: "The arc is from controversial to obvious. Blank (i): once <strong>heretical</strong> (against orthodoxy). Blank (ii): now <strong>self-evident</strong>. The 'though… now seem almost' structure demands opposites.",
      tip: "Two-blank contrasts often trace a shift from one extreme to its opposite." },
    { id: "vm_tc2b2", type: "tc", diff: d, blanks: 2,
      text: "Because the evidence was largely {1}, the jury was asked to convict on the basis of inference rather than {2} proof of the defendant's presence.",
      choices: [
        ["fabricated", "circumstantial", "overwhelming"],
        ["direct", "hearsay", "moral"]
      ],
      answer: [1, 0],
      expl: "\"Inference rather than ___ proof\" contrasts with the evidence's nature. Blank (i): <strong>circumstantial</strong> evidence supports inference; blank (ii): the opposite of inference is <strong>direct</strong> proof.",
      tip: "Find the pair of blanks tied by 'rather than' — they contrast." },
    { id: "vm_tc2b3", type: "tc", diff: d, blanks: 2,
      text: "The novelist's early work was praised for its {1} realism, but her later novels grew increasingly {2}, populated by talking animals and cities that float in the sky.",
      choices: [
        ["gritty", "sentimental", "derivative"],
        ["conventional", "fantastical", "restrained"]
      ],
      answer: [0, 1],
      expl: "\"Realism\" pairs with <strong>gritty</strong>; the contrast \"but… increasingly\" plus \"talking animals… floating cities\" signals <strong>fantastical</strong>. \"Conventional\" and \"restrained\" contradict the fantastical imagery.",
      tip: "Let the concrete later detail (floating cities) fix the second blank, then match the first." },
    { id: "vm_tc2b4", type: "tc", diff: d, blanks: 2,
      text: "What appears in his paintings to be spontaneous {1} is in fact the product of {2} planning; each apparently careless drip was placed with deliberate care.",
      choices: [
        ["abandon", "precision", "imitation"],
        ["meticulous", "hasty", "minimal"]
      ],
      answer: [0, 0],
      expl: "\"Apparently careless drip… placed with deliberate care\" sets up appearance vs. reality. Blank (i): apparent spontaneous <strong>abandon</strong>; blank (ii): actually <strong>meticulous</strong> planning.",
      tip: "'What appears to be X is in fact Y' — the blanks fill X (appearance) and Y (reality)." }
  );

  /* ---------- Sentence Equivalence ---------- */
  V.push(
    { id: "vm_se1", type: "se", diff: d,
      text: "The professor's lectures, though rich in content, were so ____ that even devoted students struggled to stay awake.",
      choices: ["soporific", "riveting", "erudite", "dull", "concise", "controversial"],
      answer: [0, 3],
      expl: "Students struggle to stay awake ⇒ the lectures put them to sleep: <strong>soporific</strong> and <strong>dull</strong>. \"Erudite\" is true but not the cause of drowsiness and has no synonym pair here.",
      tip: "Trap alert: 'erudite' is tempting but only two choices produce equivalent sentences." },
    { id: "vm_se2", type: "se", diff: d,
      text: "Rather than confront the problem directly, management chose to ____ it, hoping that a vague promise of future review would placate the staff.",
      choices: ["resolve", "temporize over", "exacerbate", "finesse", "publicize", "confront"],
      answer: [1, 3],
      expl: "Avoiding direct confrontation with vague promises means to stall or handle evasively: <strong>temporize over</strong> and <strong>finesse</strong>. \"Resolve\" and \"confront\" are opposite.",
      tip: "'Rather than confront directly' means the blank is a word for evade/delay." },
    { id: "vm_se3", type: "se", diff: d,
      text: "For all his reputation as an innovator, the composer was in practice quite ____, rarely straying from the forms he had mastered as a student.",
      choices: ["daring", "conservative", "traditional", "prolific", "reclusive", "experimental"],
      answer: [1, 2],
      expl: "\"For all his reputation as an innovator\" contrasts with \"rarely straying from… forms\" — so he was actually <strong>conservative</strong> / <strong>traditional</strong>. \"Daring\" and \"experimental\" match the reputation, not the reality.",
      tip: "'For all his reputation as X' cues that the reality is the opposite of X." },
    { id: "vm_se4", type: "se", diff: d,
      text: "The treaty was hailed as a triumph, yet its terms were so ____ that within a year each side interpreted them to its own advantage.",
      choices: ["equivocal", "stringent", "ambiguous", "generous", "explicit", "punitive"],
      answer: [0, 2],
      expl: "Terms interpreted differently by each side are open to multiple readings: <strong>equivocal</strong> and <strong>ambiguous</strong>. \"Explicit\" is the opposite.",
      tip: "'Each side interpreted to its own advantage' ⇒ the language was open to multiple readings." },
    { id: "vm_se5", type: "se", diff: d,
      text: "Once a ____ presence at every gala and premiere, the actor now shuns publicity and lives in near-total seclusion.",
      choices: ["ubiquitous", "reluctant", "omnipresent", "minor", "belated", "controversial"],
      answer: [0, 2],
      expl: "\"At every gala and premiere\" and the contrast with seclusion mean he was everywhere: <strong>ubiquitous</strong> and <strong>omnipresent</strong>. The other options don't pair.",
      tip: "'At every…' plus the seclusion contrast points to a word meaning 'everywhere.'" },
    { id: "vm_se6", type: "se", diff: d,
      text: "The scientist warned against drawing ____ conclusions from a single trial, no matter how striking its results.",
      choices: ["premature", "warranted", "hasty", "cautious", "modest", "sound"],
      answer: [0, 2],
      expl: "Warning against conclusions from a single trial means warning against jumping too fast: <strong>premature</strong> and <strong>hasty</strong>. \"Warranted\" and \"sound\" are the opposite of what she warns against.",
      tip: "The verb 'warned against' means the blank is negative (too quick)." },
    { id: "vm_se7", type: "se", diff: d,
      text: "His apology, delivered in a flat monotone with his eyes on the floor, struck everyone as entirely ____.",
      choices: ["heartfelt", "perfunctory", "sincere", "genuine", "cursory", "eloquent"],
      answer: [1, 4],
      expl: "A flat, downcast delivery reads as going-through-the-motions: <strong>perfunctory</strong> and <strong>cursory</strong>. \"Heartfelt,\" \"sincere,\" and \"genuine\" contradict the described manner.",
      tip: "Physical detail (flat monotone, eyes down) signals an insincere, mechanical apology." },
    { id: "vm_se8", type: "se", diff: d,
      text: "The editor pruned every ____ phrase, leaving prose that was lean, direct, and free of ornament.",
      choices: ["superfluous", "essential", "redundant", "vivid", "concise", "technical"],
      answer: [0, 2],
      expl: "Cutting to leave lean prose means removing unnecessary words: <strong>superfluous</strong> and <strong>redundant</strong>. \"Essential\" and \"concise\" contradict the pruning.",
      tip: "Result ('lean, free of ornament') tells you what was removed: excess words." }
  );

  /* ---------- Critical Reasoning ---------- */
  V.push(
    { id: "vm_cr1", type: "cr", diff: d,
      passage: "A recent study found that people who take regular naps have lower rates of heart disease than those who do not nap. A health columnist concluded that napping protects the heart and urged readers to begin napping daily.",
      text: "Which of the following, if true, most seriously undermines the columnist's conclusion?",
      choices: [
        "People with demanding, high-stress jobs are both less able to nap and independently more prone to heart disease.",
        "Some of the nappers in the study napped in the afternoon rather than the morning.",
        "The study was conducted over a period of ten years.",
        "Heart disease is among the leading causes of death worldwide.",
        "A few participants who napped daily still developed heart disease."
      ],
      answer: 0,
      expl: "If stressful jobs both prevent napping and cause heart disease, then a third factor (stress) explains the correlation — napping needn't protect the heart. This is a classic <strong>confounding variable</strong>.",
      tip: "Weaken a causal claim by finding a third factor that causes both correlated things." },
    { id: "vm_cr2", type: "cr", diff: d,
      passage: "To reduce traffic congestion, the city plans to raise tolls on the downtown bridge during rush hour. Officials predict that the higher tolls will push many commuters to travel at off-peak times, easing congestion during the busiest hours.",
      text: "The officials' prediction depends on which of the following assumptions?",
      choices: [
        "A significant number of rush-hour commuters have the flexibility to shift their travel to off-peak times.",
        "The toll increase will generate more revenue than it costs to administer.",
        "Downtown businesses support the toll increase.",
        "Most commuters currently use the bridge rather than alternate routes.",
        "The bridge is the only route into the downtown area."
      ],
      answer: 0,
      expl: "For higher tolls to shift commuters to off-peak times, those commuters must be <strong>able</strong> to change when they travel. If their schedules are fixed, the plan fails. Revenue and business support are irrelevant to the congestion prediction.",
      tip: "A plan assumes the target group can actually do what the plan needs them to do." },
    { id: "vm_cr3", type: "cr", diff: d,
      passage: "Bookstore owner: Ever since we began offering a comfortable reading area with armchairs, our sales have increased. Clearly, giving customers a place to sit and read makes them more likely to buy books.",
      text: "Which of the following, if true, would most strengthen the owner's argument?",
      choices: [
        "Sales did not rise at a nearby competing bookstore that made no changes during the same period.",
        "The reading area occupies space that was previously used to display bestsellers.",
        "Some customers use the armchairs without ever purchasing a book.",
        "The store also began selling coffee at the same time it added the armchairs.",
        "The armchairs were expensive to purchase and maintain."
      ],
      answer: 0,
      expl: "If a comparable store without the change saw no sales rise in the same period, seasonal or market-wide explanations are ruled out, strengthening the claim that the armchairs caused the increase. Choice D (coffee added simultaneously) would <em>weaken</em> it.",
      tip: "A control case that lacks the cause and lacks the effect strengthens a causal claim." },
    { id: "vm_cr4", type: "cr", diff: d,
      passage: "A magazine reported that its online subscribers renew at a higher rate than its print subscribers. The publisher concluded that the online format itself inspires greater loyalty and decided to phase out the print edition entirely.",
      text: "Which of the following, if true, casts the most doubt on the publisher's reasoning?",
      choices: [
        "Online subscribers tend to be younger readers who are, in general, more likely to renew any subscription they hold.",
        "Print subscribers pay slightly more per year than online subscribers.",
        "The magazine has published continuously for over fifty years.",
        "Producing the print edition is more expensive than maintaining the website.",
        "Some readers subscribe to both the print and online editions."
      ],
      answer: 0,
      expl: "If online subscribers differ systematically (younger, more likely to renew anything), the higher renewal reflects <strong>who</strong> they are, not the format — a self-selection problem. That undercuts 'the format inspires loyalty.'",
      tip: "When two groups differ in outcome, ask whether they differ in composition, not just in the treatment." }
  );

  /* ---------- Reading Comprehension ---------- */
  P.push({
    id: "vm_p1", diff: d, title: "Photography and painting",
    text: `<p>When photography emerged in the mid-nineteenth century, many painters greeted it with alarm, fearing that a machine capable of recording the visible world in perfect detail would render their craft obsolete. For a time the fear seemed justified: portrait painters, in particular, lost commissions to photographers who could produce a likeness in minutes at a fraction of the cost.</p>
    <p>Yet the longer-term effect of photography on painting was liberating rather than destructive. Freed from the obligation to document, painters turned to what a camera could not capture: the play of light as sensation, the distortions of memory and emotion, the pure relationships of color and form. The Impressionists, and later the abstract movements of the twentieth century, arguably owe their existence in part to the very technology that once seemed to threaten them. Photography did not kill painting; it changed the questions painting asked.</p>
    <p>This pattern — a new technology displacing an older practice from one function while pushing it toward another — recurs throughout cultural history. It suggests that the survival of an art form often depends less on defending its traditional role than on discovering what it alone can still do.</p>`,
    questions: [
      { id: "vm_p1q1", type: "mcq", diff: d,
        text: "The primary purpose of the passage is to",
        choices: [
          "argue that photography ultimately benefited painting by redirecting its aims",
          "trace the technical development of the camera",
          "demonstrate that Impressionism was superior to earlier painting",
          "explain why portrait painting disappeared entirely",
          "warn artists against adopting new technologies"
        ],
        answer: 0,
        expl: "The passage argues photography's long-term effect was \"liberating rather than destructive,\" redirecting painting. It doesn't cover camera engineering, rank movements, claim portraiture vanished, or warn against technology.",
        tip: "The main purpose ties the whole passage together, including the general lesson in paragraph 3." },
      { id: "vm_p1q2", type: "mcma", diff: d,
        text: "The passage suggests that painters, freed from the need to document reality, pursued which of the following? Consider each choice separately and select all that apply.",
        choices: [
          "The rendering of light as subjective sensation",
          "Relationships of color and form for their own sake",
          "Ever more exact reproduction of visible detail"
        ],
        answer: [0, 1],
        expl: "Paragraph 2 lists \"the play of light as sensation\" and \"the pure relationships of color and form.\" The third choice — exact reproduction — is precisely what painters <em>abandoned</em> to the camera.",
        tip: "For select-all, test each choice; the third reverses the passage's point." },
      { id: "vm_p1q3", type: "mcq", diff: d,
        text: "The final paragraph functions primarily to",
        choices: [
          "generalize the specific case of painting into a broader principle",
          "introduce a counterexample to the earlier argument",
          "cast doubt on the claims made in the second paragraph",
          "provide technical detail about photography",
          "predict the disappearance of photography"
        ],
        answer: 0,
        expl: "The last paragraph says \"this pattern… recurs throughout cultural history,\" turning the painting example into a general principle about art forms and technology.",
        tip: "Ask what a paragraph DOES; here it widens a single case into a rule." },
      { id: "vm_p1q4", type: "mcq", diff: d,
        text: "It can be inferred that the author would most likely agree that an art form threatened by new technology should",
        choices: [
          "seek out functions that the new technology cannot fulfill",
          "lobby to have the new technology restricted",
          "abandon its traditional audience",
          "imitate the new technology as closely as possible",
          "cease to evolve and preserve its old methods"
        ],
        answer: 0,
        expl: "The closing sentence states survival \"depends less on defending its traditional role than on discovering what it alone can still do\" — i.e., finding what the new technology cannot do.",
        tip: "Inference answers must follow from the passage's stated conclusion, not go beyond it." }
    ]
  });

  P.push({
    id: "vm_p2", diff: d, title: "Coral reef resilience",
    text: `<p>Coral reefs are often described as fragile, and in one sense the label is apt: a rise of even a degree or two in water temperature can trigger bleaching, in which corals expel the symbiotic algae that feed them and, if the stress persists, die. Yet recent fieldwork complicates the picture. On some reefs, corals that survived an initial bleaching event proved markedly more resistant to a second, suggesting that exposure can, under certain conditions, confer a kind of acquired tolerance.</p>
    <p>The mechanism remains debated. Some researchers attribute the effect to shifts in the community of algae hosted by the coral, with more heat-tolerant strains replacing vulnerable ones. Others point to changes in the coral's own gene expression. What is not in dispute is that resilience varies enormously from reef to reef, so that findings from one site cannot be safely generalized to all.</p>`,
    questions: [
      { id: "vm_p2q1", type: "mcq", diff: d,
        text: "The passage as a whole is primarily concerned with",
        choices: [
          "qualifying the common view of coral reefs as simply fragile",
          "proving that coral reefs are in no real danger",
          "explaining exactly how bleaching kills coral",
          "comparing coral reefs with other marine ecosystems",
          "advocating a specific conservation policy"
        ],
        answer: 0,
        expl: "The passage grants that reefs are fragile but then \"complicates the picture\" with evidence of acquired tolerance — qualifying, not overturning, the fragile label.",
        tip: "'In one sense apt… yet recent fieldwork complicates' signals a qualification, not a reversal." },
      { id: "vm_p2q2", type: "mcq", diff: d,
        text: "According to the passage, which of the following is NOT in dispute among researchers?",
        choices: [
          "that resilience differs greatly from one reef to another",
          "that shifting algae communities are the sole cause of acquired tolerance",
          "that changes in coral gene expression fully explain resilience",
          "that bleaching never leads to coral death",
          "that all reefs respond identically to warming"
        ],
        answer: 0,
        expl: "The last sentence says \"What is not in dispute is that resilience varies enormously from reef to reef.\" The algae and gene-expression explanations are explicitly \"debated,\" and D and E contradict the passage.",
        tip: "Watch for 'not in dispute' / 'debated' — they mark exactly what's settled vs. contested." },
      { id: "vm_p2q3", type: "mcq", diff: d,
        text: "The author mentions heat-tolerant strains of algae replacing vulnerable ones in order to",
        choices: [
          "give one proposed explanation for acquired heat tolerance",
          "prove that gene expression plays no role",
          "argue that all algae are equally vulnerable to heat",
          "show that coral cannot survive any bleaching",
          "dismiss the idea of acquired tolerance"
        ],
        answer: 0,
        expl: "The algae-shift idea is offered as one of the competing explanations (\"Some researchers attribute…\"). It doesn't disprove the gene-expression view — the passage keeps both open.",
        tip: "'Some researchers… Others…' means each is presented as a candidate explanation, not a proof." }
    ]
  });

  P.push({
    id: "vm_p3", diff: d, title: "The economics of open-source software (short)",
    text: `<p>Economists long assumed that people contribute significant labor only in exchange for pay, yet the success of open-source software, built largely by unpaid volunteers, poses an apparent puzzle. Closer study dissolves much of the mystery: contributors gain reputation among peers, sharpen skills employers value, and shape tools they themselves depend on. The "free" labor, in other words, is repaid in currencies other than money.</p>`,
    questions: [
      { id: "vm_p3q1", type: "mcq", diff: d,
        text: "The passage suggests that the \"puzzle\" of open-source software is best resolved by recognizing that",
        choices: [
          "contributors receive non-monetary forms of compensation",
          "open-source software is not actually successful",
          "the contributors are in fact secretly paid",
          "economists were entirely correct in their original assumption",
          "reputation has no real value"
        ],
        answer: 0,
        expl: "The passage resolves the puzzle by listing non-monetary returns — reputation, skills, useful tools — \"currencies other than money.\"",
        tip: "The resolution of a stated puzzle is usually the passage's final sentence." },
      { id: "vm_p3q2", type: "mcq", diff: d,
        text: "The passage implies that the economists' original assumption was",
        choices: [
          "too narrow because it recognized only monetary incentives",
          "correct in every respect",
          "irrelevant to the study of labor",
          "based on a study of open-source software",
          "concerned mainly with reputation"
        ],
        answer: 0,
        expl: "The volunteers contradict the assumption that people work \"only in exchange for pay,\" implying the assumption was too narrow — it missed non-monetary incentives.",
        tip: "If evidence contradicts an assumption, the passage implies the assumption was flawed or incomplete." }
    ]
  });
})();
