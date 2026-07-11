/* Verbal bank - HARD. */
(function () {
  const B = window.GREBANK = window.GREBANK || {};
  B.verbal = B.verbal || [];
  B.vpassages = B.vpassages || [];
  const V = B.verbal, P = B.vpassages;
  const d = "hard";

  /* ---------- Text Completion: single blank ---------- */
  V.push(
    { id: "vh_tc1", type: "tc", diff: d, blanks: 1,
      text: "The historian's account is best read not as a chronicle but as an act of {1}: by selecting which episodes to dwell on and which to pass over in silence, she quietly indicts a generation.",
      choices: ["transcription", "advocacy", "contrition", "conciliation", "divination"],
      answer: 1,
      expl: "Selection that \"quietly indicts\" is argument disguised as history, <strong>advocacy</strong>. \"Transcription\" is what a mere chronicle would be (the rejected reading); \"contrition\" (remorse) and \"conciliation\" (peacemaking) reverse the aggressive intent.",
      tip: "'Not as X but as Y'. The blank (Y) must contrast with a neutral chronicle." },
    { id: "vh_tc2", type: "tc", diff: d, blanks: 1,
      text: "There is something {1} in the memoirist's self-criticism: each confession of weakness is so artfully staged that it reads as a covert boast.",
      choices: ["disarming", "meretricious", "candid", "lugubrious", "salutary"],
      answer: 1,
      expl: "Confessions staged to function as boasts are showy and falsely sincere, <strong>meretricious</strong> (attractive but deceitful). \"Candid\" and \"disarming\" credit a sincerity the sentence denies.",
      tip: "When apparent humility is 'staged,' look for a word meaning false or showy." },
    { id: "vh_tc3", type: "tc", diff: d, blanks: 1,
      text: "Reviewers who called the philosopher's late style {1} missed the point: the endless qualifications were not evasions but the very substance of a mind refusing premature certainty.",
      choices: ["rigorous", "pusillanimous", "perspicuous", "mellifluous", "dogmatic"],
      answer: 1,
      expl: "The reviewers (wrongly) read the qualifications as timid evasion, <strong>pusillanimous</strong> (cowardly). The author rebuts that charge. \"Dogmatic\" is the opposite of endless qualification; \"perspicuous\" (clear) isn't a charge the defense answers.",
      tip: "The blank is the critics' mistaken accusation; the rebuttal ('not evasions') tells you what they accused it of." },
    { id: "vh_tc4", type: "tc", diff: d, blanks: 1,
      text: "The candidate's rhetoric, for all its populist fire, was in substance remarkably {1}: on every contested issue she managed to gesture toward both sides without committing to either.",
      choices: ["incendiary", "anodyne", "partisan", "trenchant", "prophetic"],
      answer: 1,
      expl: "Contrast: fiery style, but substance that offends no one and commits to nothing, <strong>anodyne</strong> (inoffensive, bland). \"Incendiary,\" \"partisan,\" and \"trenchant\" contradict the fence-sitting described.",
      tip: "'For all its X' concedes style; the blank describes the opposite substance." },
    { id: "vh_tc5", type: "tc", diff: d, blanks: 1,
      text: "Her scholarship is marked by a productive {1}: trained as both a linguist and an archaeologist, she reads artifacts as texts and texts as artifacts.",
      choices: ["hybridity", "orthodoxy", "asceticism", "insularity", "pedantry"],
      answer: 0,
      expl: "Two trainings fused into one method is <strong>hybridity</strong>. \"Insularity\" and \"orthodoxy\" suggest closed, single-tradition work: the reverse.",
      tip: "The colon's elaboration (two disciplines crossing) defines the blank." },
    { id: "vh_tc6", type: "tc", diff: d, blanks: 1,
      text: "The judge's opinions were models of {1} reasoning; even lawyers who deplored her conclusions conceded that each step followed ineluctably from the last.",
      choices: ["tendentious", "rigorous", "specious", "labyrinthine", "intuitive"],
      answer: 1,
      expl: "Steps following \"ineluctably\" (inescapably) from one another, conceded even by opponents, define <strong>rigorous</strong> reasoning. \"Specious\" (falsely plausible) and \"tendentious\" (biased) are what opponents did NOT accuse her of.",
      tip: "'Even opponents conceded' signals a genuinely positive quality." }
  );

  /* ---------- Text Completion: two & three blanks ---------- */
  V.push(
    { id: "vh_tc2b1", type: "tc", diff: d, blanks: 2,
      text: "It is a nice irony that the theory now invoked to {1} centralized planning was first elaborated by economists who intended it as that system's most {2} defense.",
      choices: [
        ["discredit", "refine", "celebrate"],
        ["equivocal", "spirited", "reluctant"]
      ],
      answer: [0, 1],
      expl: "The irony requires reversal: a theory now used to <strong>discredit</strong> planning was originally its <strong>spirited</strong> (vigorous) defense. Without opposition between the blanks there is no irony.",
      tip: "'Irony' announces that the two uses of the theory must be opposites." },
    { id: "vh_tc2b2", type: "tc", diff: d, blanks: 2,
      text: "The ethnographer resisted the {1} of her predecessors, whose confident generalizations about 'the village mind' now read as {2} projections of their own assumptions.",
      choices: [
        ["diffidence", "assurance", "empiricism"],
        ["little more than", "far more than", "nothing less than"]
      ],
      answer: [1, 0],
      expl: "Predecessors made \"confident generalizations,\" so she resisted their <strong>assurance</strong>. Those generalizations are dismissed as <strong>little more than</strong> projections. \"Diffidence\" (shyness) contradicts 'confident.'",
      tip: "Blank (i) must name the trait shown by 'confident generalizations.'" },
    { id: "vh_tc3b1", type: "tc", diff: d, blanks: 3,
      text: "The paradox of archival research is that abundance can {1} rather than {2} understanding: confronted with every letter a statesman ever wrote, the biographer may find the essential pattern of a life more, not less, {3}.",
      choices: [
        ["impede", "guarantee", "reflect"],
        ["obstruct", "advance", "survey"],
        ["legible", "elusive", "trivial"]
      ],
      answer: [0, 1, 1],
      expl: "The paradox: more material makes understanding harder. Abundance can <strong>impede</strong> rather than <strong>advance</strong> understanding, making the pattern more <strong>elusive</strong>. 'More, not less' + a negative overall arc confirms blank (iii) is a difficulty word.",
      tip: "Solve blank (iii) first from 'more, not less' (the paradox needs a bad outcome) then blanks (i)/(ii) as oppose/help." },
    { id: "vh_tc3b2", type: "tc", diff: d, blanks: 3,
      text: "Though the review begins by {1} the novel's ambitions, the praise proves {2}: within a paragraph the critic is cataloguing the book's failures with such relish that the opening compliments seem, in retrospect, merely {3}.",
      choices: [
        ["disparaging", "saluting", "ignoring"],
        ["unstinting", "short-lived", "infectious"],
        ["prophetic", "perfunctory", "malicious"]
      ],
      answer: [1, 1, 1],
      expl: "The arc: opens with praise (<strong>saluting</strong>), which is <strong>short-lived</strong> (failures follow within a paragraph), so the compliments were <strong>perfunctory</strong>: token gestures. \"Unstinting\" (generous without limit) contradicts the quick turn.",
      tip: "Track the narrative arc: praise → reversal → reinterpretation of the praise." }
  );

  /* ---------- Sentence Equivalence ---------- */
  V.push(
    { id: "vh_se1", type: "se", diff: d,
      text: "What the senator's admirers called principled independence, her detractors dismissed as mere ____.",
      choices: ["contrarianism", "statesmanship", "perversity", "pragmatism", "erudition", "charisma"],
      answer: [0, 2],
      expl: "The detractors' word must be the negative spin on \"independence\": opposing for its own sake, <strong>contrarianism</strong> and <strong>perversity</strong>. \"Statesmanship\" and \"pragmatism\" are compliments.",
      tip: "Reframing questions need the uncharitable synonym of the praised trait." },
    { id: "vh_se2", type: "se", diff: d,
      text: "The composer's late quartets were long considered ____, admired in principle but seldom performed, their difficulties thought to exceed their rewards.",
      choices: ["canonical", "forbidding", "accessible", "daunting", "derivative", "seminal"],
      answer: [1, 3],
      expl: "Seldom performed because difficulties exceed rewards: <strong>forbidding</strong> and <strong>daunting</strong>. \"Canonical\" and \"seminal\" fit 'admired in principle' but don't explain the neglect and don't pair as required.",
      tip: "The blank must explain why they were seldom performed, difficulty, not status." },
    { id: "vh_se3", type: "se", diff: d,
      text: "Far from the ____ figure of popular legend, the outlaw revealed in court records was calculating, literate, and keenly attentive to his own image.",
      choices: ["romantic", "artless", "shrewd", "ingenuous", "villainous", "obscure"],
      answer: [1, 3],
      expl: "\"Far from\" contrasts the legend with a calculating, image-conscious reality. The legend must be of a simple, naive figure: <strong>artless</strong> and <strong>ingenuous</strong>. \"Shrewd\" describes the reality, not the legend.",
      tip: "Put the blank on the legend side; the court-records description is its opposite." },
    { id: "vh_se4", type: "se", diff: d,
      text: "The manifesto's prose is deliberately ____: sentences fragment, pronouns shift referents mid-clause, and the reader is never allowed the comfort of a stable vantage point.",
      choices: ["disorienting", "limpid", "vertiginous", "soporific", "aphoristic", "mellifluous"],
      answer: [0, 2],
      expl: "Fragmenting sentences and shifting referents unsettle the reader: <strong>disorienting</strong> and <strong>vertiginous</strong> (dizzying). \"Limpid\" (clear) and \"mellifluous\" (smooth) are opposites.",
      tip: "The colon's examples (fragments, shifting pronouns) define the effect: dizziness." },
    { id: "vh_se5", type: "se", diff: d,
      text: "Because the treaty's drafters could not resolve their deepest disagreement, they buried it in language so ____ that both delegations could sign in good conscience.",
      choices: ["precise", "elastic", "belligerent", "accommodating", "archaic", "terse"],
      answer: [1, 3],
      expl: "Language both sides can sign despite disagreement must stretch to fit both readings: <strong>elastic</strong> and <strong>accommodating</strong>. \"Precise\" would expose the disagreement.",
      tip: "Diplomatic ambiguity: the words must flex to cover incompatible positions." },
    { id: "vh_se6", type: "se", diff: d,
      text: "His celebrated modesty was, colleagues suspected, a kind of ____: the more he deprecated his own influence, the more visibly indispensable he became.",
      choices: ["stratagem", "affliction", "gambit", "penance", "reflex", "burden"],
      answer: [0, 2],
      expl: "Modesty that increases his standing, arousing colleagues' suspicion, is a calculated move: <strong>stratagem</strong> and <strong>gambit</strong>. \"Affliction,\" \"penance,\" and \"burden\" cast it as suffering, not tactics.",
      tip: "'Colleagues suspected' + a self-serving effect ⇒ the modesty is tactical." }
  );

  /* ---------- Critical Reasoning ---------- */
  V.push(
    { id: "vh_cr1", type: "cr", diff: d,
      passage: "In a certain country, hospitals that perform the most heart surgeries have the highest patient mortality rates for that surgery. A journalist concluded that patients needing heart surgery should avoid high-volume hospitals.",
      text: "Which of the following, if true, most seriously calls the journalist's advice into question?",
      choices: [
        "The most difficult and highest-risk cases are systematically referred to high-volume hospitals because of their greater expertise.",
        "Some low-volume hospitals are located in rural areas.",
        "Heart surgery mortality has declined nationwide over the past decade.",
        "High-volume hospitals also perform many surgeries other than heart surgery.",
        "Patients at high-volume hospitals tend to have shorter stays after surgery."
      ],
      answer: 0,
      expl: "If the sickest patients are funneled to high-volume hospitals, higher mortality reflects <strong>case mix</strong>, not worse care: indeed those hospitals may be the best choice. The journalist ignores selection effects.",
      tip: "Raw outcome comparisons mislead when the groups being compared start out different." },
    { id: "vh_cr2", type: "cr", diff: d,
      passage: "Company memo: Our engineers who attended last year's optional training workshop wrote 30 percent fewer bugs this year than engineers who did not attend. To cut bugs across the organization, we will now make the workshop mandatory for all engineers.",
      text: "The plan's prospects are most weakened by which of the following considerations?",
      choices: [
        "Engineers who chose to attend an optional workshop are likely those already most motivated to improve their code quality.",
        "The workshop requires engineers to spend two full days away from their projects.",
        "Some bugs are introduced by teams other than engineering.",
        "The company's bug-tracking software was upgraded this year.",
        "A few engineers attended only part of the workshop."
      ],
      answer: 0,
      expl: "Attendance was voluntary, so attendees self-selected, likely the most motivated engineers, who would write fewer bugs anyway. Forcing everyone to attend won't transfer the motivation. (The software upgrade affected both groups equally, so it explains little.)",
      tip: "Voluntary-participation data can't predict the effect of making participation mandatory." },
    { id: "vh_cr3", type: "cr", diff: d,
      passage: "Paleontologist: Fossilized pollen from the site shows that the region was grassland when the ancient settlement was founded. Since the crops these settlers are known to have grown require substantial rainfall, and grasslands typically indicate low rainfall, the settlers must have irrigated their fields.",
      text: "The paleontologist's argument depends on which of the following assumptions?",
      choices: [
        "Rainfall in the region did not increase substantially after the period in which the pollen was deposited.",
        "The settlers were the first people ever to inhabit the region.",
        "Grasslands can never receive substantial rainfall.",
        "Irrigation was practiced in neighboring regions at the same time.",
        "The settlers grew no crops other than those known to archaeologists."
      ],
      answer: 0,
      expl: "The pollen shows grassland (low rain) <em>at founding</em>. If rainfall increased afterward (during the actual farming) no irrigation would be needed. The argument silently assumes conditions stayed dry. Choice C is too strong: the argument needs 'typically,' not 'never.'",
      tip: "Watch time gaps: evidence about one period, conclusion about another, assumes nothing changed between." },
    { id: "vh_cr4", type: "cr", diff: d,
      passage: "Critic: Defenders of the proposed dam say it will generate clean electricity and reduce the region's reliance on coal. But the reservoir behind the dam will flood a forest, and rotting vegetation in reservoirs releases methane, a potent greenhouse gas. Therefore the dam will actually worsen the region's total greenhouse emissions.",
      text: "Which of the following, if true, most weakens the critic's conclusion?",
      choices: [
        "Independent measurements show that emissions from reservoirs of this type are far smaller than the emissions avoided by displacing an equivalent amount of coal generation.",
        "The forest to be flooded is home to several rare species.",
        "Methane persists in the atmosphere for a shorter time than carbon dioxide.",
        "The dam will also provide water storage for agriculture.",
        "Coal mining in the region employs thousands of workers."
      ],
      answer: 0,
      expl: "The critic's conclusion is about <em>net</em> emissions. If reservoir methane is far smaller than the coal emissions displaced, the dam's net effect is a reduction: directly contradicting the conclusion. Choices B, D, E are off-topic; C alone doesn't quantify the comparison.",
      tip: "Net-effect conclusions are weakened by comparing magnitudes, not by side issues." }
  );

  /* ---------- Reading Comprehension ---------- */
  P.push({
    id: "vh_p1", diff: d, title: "Scientific consensus and dissent",
    text: `<p>The notion that science advances by the steady accumulation of settled facts has few defenders among historians of science, yet it persists in public discourse, where "the scientific consensus" is invoked as though it were a monolith. The reality is more textured. A consensus is best understood not as unanimity but as a distribution of confidence: a claim commands consensus when the community's best-supported models converge on it, when rival explanations have been seriously pursued and found wanting, and when the remaining dissent clusters at the field's margins rather than its center.</p>
    <p>This account has an uncomfortable implication for those who would treat dissent as either heroic or negligible. Dissent is epistemically valuable in proportion to its engagement with the evidence that grounds the consensus; a dissenter who must explain away an ever-growing body of independent lines of evidence occupies a progressively weaker position, however rhetorically effective the dissent may be. Conversely, a consensus that has ceased to attract serious attempts at refutation may be less secure than it appears, since its strength was never tested. The health of a scientific field, on this view, is measured neither by the absence of dissent nor by its abundance, but by whether the traffic between orthodoxy and challenge remains open and evidence-bound.</p>`,
    questions: [
      { id: "vh_p1q1", type: "mcq", diff: d,
        text: "The primary purpose of the passage is to",
        choices: [
          "propose a more nuanced account of what scientific consensus is and what makes dissent valuable",
          "argue that scientific consensus is usually wrong",
          "defend the public's understanding of science against historians",
          "show that dissent in science is always heroic",
          "recount the history of a particular scientific controversy"
        ],
        answer: 0,
        expl: "The passage replaces the monolith view with consensus-as-confidence-distribution and gives criteria for when dissent matters, a nuanced reframing, not an attack on consensus or a case study.",
        tip: "Both paragraphs serve one project: redefining consensus and grading dissent by evidence-engagement." },
      { id: "vh_p1q2", type: "mcq", diff: d,
        text: "According to the passage, a claim commands scientific consensus when",
        choices: [
          "well-supported models converge on it, rivals have been pursued and found wanting, and remaining dissent is marginal",
          "every scientist in the field affirms it without exception",
          "it has been repeated frequently in public discourse",
          "no one has ever attempted to refute it",
          "its defenders are more rhetorically effective than its critics"
        ],
        answer: 0,
        expl: "This restates the three conditions in paragraph 1. \"Unanimity\" is explicitly rejected; untested claims are said to be <em>less</em> secure, not consensual.",
        tip: "Detail questions about definitions: return to the sentence that begins 'A claim commands consensus when…'" },
      { id: "vh_p1q3", type: "mcq", diff: d,
        text: "The author suggests that a consensus which no longer attracts serious attempts at refutation is",
        choices: [
          "possibly weaker than it appears, because its strength goes untested",
          "the strongest form of consensus",
          "proof that the field is healthy",
          "identical to public unanimity",
          "certain to be overturned eventually"
        ],
        answer: 0,
        expl: "Paragraph 2: such a consensus \"may be less secure than it appears, since its strength was never tested.\" Note the hedge 'may be': 'certain to be overturned' overshoots.",
        tip: "Match the answer's strength to the passage's hedged language ('may be')." },
      { id: "vh_p1q4", type: "mcma", diff: d,
        text: "The passage indicates that the value of scientific dissent depends on which of the following? Consider each choice separately and select all that apply.",
        choices: [
          "the degree to which the dissent engages the evidence supporting the consensus",
          "the rhetorical effectiveness of the dissenter",
          "whether the exchange between orthodoxy and challengers remains evidence-bound"
        ],
        answer: [0, 2],
        expl: "Dissent is valuable \"in proportion to its engagement with the evidence,\" and field health depends on evidence-bound traffic between orthodoxy and challenge. Rhetorical effectiveness is explicitly dismissed (\"however rhetorically effective\").",
        tip: "'However rhetorically effective' concedes-and-dismisses. That choice is excluded." }
    ]
  });

  P.push({
    id: "vh_p2", diff: d, title: "Translation and loss",
    text: `<p>It is a commonplace that translation is loss. That the music of the original leaks away and only a paraphrase survives. The commonplace deserves skepticism, not because loss is unreal, but because the ledger is incomplete. A translation can recover what time has taken from the original: rendered into a living language, an ancient poem regains the immediacy it possessed for its first audience, an immediacy the original, now legible only to specialists, has lost. What the source forfeits in nuance it may regain in force.</p>
    <p>This is not to license carelessness. It is to say that fidelity is not one thing: a translator faithful to the dictionary sense may betray the poem's speed, its register, its wit, and one faithful to these may stray from the letter. Every translation is an argument about which fidelities matter most, and the finest translators make that argument consciously rather than by default.</p>`,
    questions: [
      { id: "vh_p2q1", type: "mcq", diff: d,
        text: "The author's attitude toward the 'commonplace' that translation is loss can best be described as",
        choices: [
          "skeptical of its completeness while conceding its partial truth",
          "wholehearted endorsement",
          "outright dismissal as entirely false",
          "indifference to the question",
          "confusion about its meaning"
        ],
        answer: 0,
        expl: "\"The commonplace deserves skepticism, not because loss is unreal, but because the ledger is incomplete\", the author accepts real loss while rejecting the one-sided accounting.",
        tip: "'Not because X is unreal, but because…' concedes X while limiting it." },
      { id: "vh_p2q2", type: "mcq", diff: d,
        text: "The passage suggests that an ancient poem readable only by specialists has lost",
        choices: [
          "the immediacy it once had for its original audience",
          "its dictionary meaning",
          "its length and structure",
          "its claim to be literature",
          "nothing at all"
        ],
        answer: 0,
        expl: "The passage says translation can restore \"the immediacy it possessed for its first audience, an immediacy the original… has lost.\"",
        tip: "The appositive clause ('an immediacy the original has lost') answers the question directly." }
    ]
  });
})();
