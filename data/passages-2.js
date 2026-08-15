/* Verbal bank - reading passage expansion.
   Adds passages at true GRE length and register: a 400+-word hard humanities
   passage with four questions, dense science at hard, and an easy four-question
   passage the blueprint previously lacked. Ids are prefixed p2_. */
(function () {
  const B = window.GREBANK = window.GREBANK || {};
  B.vpassages = B.vpassages || [];
  const P = B.vpassages;

  /* ---------- HARD · 4 questions · long passage (~420 words) ---------- */
  P.push({
    id: "p2_h1", diff: "hard", title: "Oral tradition and the historian",
    text: `<p>For much of the twentieth century, professional historians treated oral traditions — genealogies, epics, and dynastic lists transmitted by speech across generations — as raw material for folklorists rather than evidence for historians. The dismissal rested on an apparently commonsense premise: memory unaided by writing degrades quickly, and each retelling introduces errors that compound like interest, so that after a century a tradition preserves attitude, perhaps, but not fact. Historians of societies without early written records were thus urged to wait for archaeology, or for the accounts of literate outsiders, however partial those accounts might be.</p>
    <p>Beginning in the 1960s, a revisionist school subjected this premise to empirical test rather than armchair assertion. Its researchers found that transmission is not uniformly corrosive: societies that rely on oral tradition often develop specialized institutions — hereditary reciters, public performances at which errors are corrected by rival lineages, mnemonic pairing of narrative with landscape — that constrain drift far more effectively than the skeptics had assumed. Where such institutions operate, traditions checked against independent evidence, such as dated eclipses or archaeological strata, have proved accurate over spans the skeptics thought impossible. The revisionists did not, however, claim that oral tradition is transparent. They catalogued systematic distortions with predictable shapes: genealogies telescope, silently dropping generations that carry no political weight while preserving founders and recent ancestors; narratives migrate toward cultural cliché; and traditions are routinely revised to legitimate present arrangements, so that a king list is often better evidence of who holds power now than of who held it then.</p>
    <p>The revisionist program, in other words, replaced a rule of exclusion with a discipline of source criticism — the same discipline historians had long applied to written documents, which are themselves neither innocent of motive nor immune to corruption in copying. That parity is the school's real legacy, and it cuts both ways. A historian who accepts a royal chronicle while dismissing an oral epic out of hand is applying a double standard; but so is one who, moved by the wish to recover voices excluded from the archive, exempts oral sources from the skepticism that recovering them demands. The tradition's content cannot be read off its surface; it must be inferred from the tradition's function, its institutional setting, and its characteristic ways of deforming the past. What the revisionists won for oral tradition was not trust, but the right to be distrusted in the productive, methodical way that all historical evidence is distrusted.</p>`,
    questions: [
      { id: "p2_h1q1", type: "mcq", diff: "hard",
        text: "The primary purpose of the passage is to",
        choices: [
          "describe how a scholarly reassessment changed the evidentiary standing of oral tradition and characterize what that change did and did not establish",
          "argue that oral traditions are generally more reliable than written chronicles",
          "explain the mnemonic techniques by which oral societies preserve genealogies",
          "recount how dated eclipses were used to settle a chronological dispute",
          "urge historians to abandon written sources compromised by political motive"
        ],
        answer: 0,
        expl: "The passage narrates the shift from exclusion to source criticism and then carefully bounds it (\"not trust, but the right to be distrusted\"). The claim that oral sources beat written ones overshoots — the passage argues for parity of skepticism, not superiority; the mnemonic institutions and eclipses are supporting details, not the purpose.",
        tip: "Purpose answers must cover the last paragraph's qualification, not just the middle paragraph's story." },
      { id: "p2_h1q2", type: "mcq", diff: "hard",
        text: "It can be inferred that the early-twentieth-century historians described in the first paragraph would most likely have regarded the accounts of literate outsiders as",
        choices: [
          "imperfect evidence that was nonetheless preferable to oral tradition",
          "the only form of evidence free from systematic distortion",
          "less trustworthy than archaeology but more trustworthy than eclipse records",
          "valuable chiefly for what they revealed about the outsiders themselves",
          "useful only when confirmed by local oral traditions"
        ],
        answer: 0,
        expl: "The skeptics urged waiting for \"the accounts of literate outsiders, however partial those accounts might be\" — they conceded the flaw (\"partial\") while still preferring such accounts to oral tradition. Calling them free of distortion is too strong, and ranking them against eclipse records is a comparison the passage never makes.",
        tip: "'However partial' concedes imperfection — the inference is a preference ranking, not an endorsement." },
      { id: "p2_h1q3", type: "mcq", diff: "hard",
        text: "The author mentions the telescoping of genealogies primarily in order to",
        choices: [
          "illustrate that the revisionists identified regular, predictable forms of distortion rather than claiming oral tradition was transparent",
          "prove that genealogies are the least reliable form of oral tradition",
          "show that oral traditions cannot be checked against archaeological strata",
          "demonstrate that hereditary reciters deliberately falsify king lists",
          "concede a point that ultimately undermines the revisionist program"
        ],
        answer: 0,
        expl: "Telescoping is the first item in the catalogue of \"systematic distortions with predictable shapes,\" introduced right after the sentence denying that revisionists \"claim that oral tradition is transparent.\" It supports the revisionist program by showing its distortions are analyzable — the opposite of undermining it.",
        tip: "Function questions: look at the sentence BEFORE the detail — the detail exists to serve it." },
      { id: "p2_h1q4", type: "mcma", diff: "hard",
        text: "According to the passage, the revisionist researchers found which of the following? Consider each choice separately and select all that apply.",
        choices: [
          "Some institutional practices in oral societies restrain the corruption of traditions during transmission",
          "Traditions are sometimes revised in ways that serve present-day political arrangements",
          "Oral traditions, once verified against independent evidence, can be accepted without further source criticism"
        ],
        answer: [0, 1],
        expl: "The reciters, corrective performances, and mnemonic pairings \"constrain drift\"; and king lists are \"routinely revised to legitimate present arrangements\" — both are stated findings. The third choice contradicts the passage's whole conclusion: oral tradition earned methodical distrust, not exemption from it.",
        tip: "Select-all: verify each against a specific sentence; the passage's final turn usually kills one option." }
    ]
  });

  /* ---------- HARD · 2 questions · dense science ---------- */
  P.push({
    id: "p2_h2", diff: "hard", title: "Plant volatile signaling",
    text: `<p>Early reports that plants damaged by herbivores release airborne chemicals that induce defensive responses in undamaged neighbors were greeted with a skepticism verging on ridicule, and not without cause: the initial studies drew their controls and treatments from single enclosures, confounding any airborne signal with shared microclimate. Yet subsequent experiments that isolated air streams — piping the headspace above wounded plants onto distant receivers — reproduced the effect under conditions the original critics themselves specified. What remains genuinely contested is not whether receivers respond but why emitters emit. Selection cannot favor costly alarm calls that benefit only competitors; hence many researchers now interpret the phenomenon not as signaling at all but as eavesdropping, in which receivers exploit cues emitted for the plant's own purposes — internal wound signaling among its own branches, or the summoning of predators that attack the herbivore. On this view, the \"warned\" neighbor is less a confidant than a spy.</p>`,
    questions: [
      { id: "p2_h2q1", type: "mcq", diff: "hard",
        text: "The author's attitude toward the early skepticism described in the passage is best characterized as",
        choices: [
          "sympathetic to its methodological basis while noting that later evidence answered it",
          "dismissive of it as motivated by professional rivalry",
          "convinced that it was fully vindicated by subsequent experiments",
          "regretful that it prevented any further research on the phenomenon",
          "neutral, since the passage takes no position on the early studies"
        ],
        answer: 0,
        expl: "The skepticism was \"not without cause,\" and the author specifies the real flaw (confounded enclosures) — sympathy with its basis. But air-stream experiments then \"reproduced the effect under conditions the original critics themselves specified,\" so the skepticism was answered, not vindicated.",
        tip: "'Not without cause… yet' is the signature of respectful disagreement — both halves matter." },
      { id: "p2_h2q2", type: "mcq", diff: "hard",
        text: "The eavesdropping interpretation described in the passage is offered as a solution to which problem?",
        choices: [
          "explaining how a trait that seems to aid only competitors could persist under natural selection",
          "explaining why undamaged plants fail to respond to airborne chemicals",
          "identifying which chemical compounds carry the alarm signal",
          "determining whether wounded plants can summon predators of herbivores",
          "showing that the original single-enclosure studies were correct after all"
        ],
        answer: 0,
        expl: "The stated puzzle is evolutionary: \"selection cannot favor costly alarm calls that benefit only competitors.\" Eavesdropping dissolves it — the emission serves the emitter (internal signaling, predator summoning), and neighbors merely exploit it. Receivers demonstrably DO respond, so the second choice reverses the facts.",
        tip: "When a passage says 'hence many researchers now interpret…', the interpretation answers the sentence right before it." }
    ]
  });

  /* ---------- HARD · 3 questions ---------- */
  P.push({
    id: "p2_h3", diff: "hard", title: "Rethinking the resource curse",
    text: `<p>The correlation is by now familiar: countries richly endowed with oil or minerals have often grown more slowly, and governed themselves worse, than resource-poor neighbors. The label this earned — the \"resource curse\" — implies that the endowment itself does the damage, through mechanisms such as currency appreciation that smothers manufacturing, or the volatility of commodity prices. But the cross-national record is awkward for any version of the thesis that treats the curse as automatic. Norway and Botswana built durable prosperity on petroleum and diamonds respectively, while some resource-poor states have stagnated under governments as extractive as any petro-state's.</p>
    <p>A second generation of scholarship therefore relocated the curse from geology to institutions. Where the rule of law and constraints on executive power predate the discovery of resources, windfalls are, on this account, largely invested; where they do not, windfalls finance patronage, entrench incumbents, and make taxation — with the accountability it forces on rulers — unnecessary. The endowment, in short, amplifies the political order it finds. Critics of the institutional turn note that its central variable is hard to measure independently: the institutional quality said to explain good outcomes is often inferred from the very outcomes it is meant to explain, a circularity that the literature has only begun to confront with historical instruments such as colonial-era administrative records.</p>`,
    questions: [
      { id: "p2_h3q1", type: "mcq", diff: "hard",
        text: "The passage is primarily concerned with",
        choices: [
          "tracing how an explanation of a familiar correlation was revised, and noting a methodological objection the revision still faces",
          "demonstrating that resource wealth reliably improves economic outcomes",
          "arguing that the resource curse operates chiefly through currency appreciation",
          "showing that Norway and Botswana share identical political institutions",
          "defending commodity-price volatility as the best explanation of slow growth"
        ],
        answer: 0,
        expl: "The structure is: correlation → automatic-curse reading → counterexamples → institutional relocation → circularity critique. The right answer captures both the revision and its unresolved objection. Currency appreciation and volatility belong to the FIRST-generation view the passage moves past.",
        tip: "Two-paragraph passages that end on a criticism need that criticism inside the main-idea answer." },
      { id: "p2_h3q2", type: "mcq", diff: "hard",
        text: "Which of the following findings, if genuine, would most strengthen the institutional account described in the second paragraph?",
        choices: [
          "Among countries discovering oil in the same decade, those with prior independent judiciaries subsequently grew faster than those without, as measured by data collected before the discoveries",
          "Commodity prices were unusually stable during the years Norway developed its petroleum sector",
          "Several resource-poor countries adopted strong institutions after achieving prosperity",
          "Executives in petro-states frequently praise the rule of law in public statements",
          "Resource windfalls are typically larger, per capita, in sparsely populated countries"
        ],
        answer: 0,
        expl: "The institutional account predicts exactly this divergence — same shock, different pre-existing institutions, different outcomes — and measuring institutions BEFORE discovery answers the circularity objection, since the variable isn't inferred from the outcomes. Institutions arriving after prosperity would if anything reverse the causal arrow.",
        tip: "The best strengthener often repairs the stated weakness (here, circular measurement), not just the headline claim." },
      { id: "p2_h3q3", type: "mcq", diff: "hard",
        text: "The author mentions Norway and Botswana primarily in order to",
        choices: [
          "present cases that resist any account on which resource wealth harms development automatically",
          "prove that petroleum is economically preferable to diamonds",
          "illustrate the damage done by commodity-price volatility",
          "show that the resource curse afflicts only former colonies",
          "argue that resource windfalls should be saved rather than invested"
        ],
        answer: 0,
        expl: "They appear immediately after \"the cross-national record is awkward for any version of the thesis that treats the curse as automatic\" — they are the awkward record: resource-rich success stories that an automatic curse cannot accommodate.",
        tip: "Named examples serve the sentence that introduces them; re-read that sentence before the choices." }
    ]
  });

  /* ---------- MEDIUM · 3 questions ---------- */
  P.push({
    id: "p2_m1", diff: "medium", title: "Birdsong in the city",
    text: `<p>Songbirds in noisy cities tend to sing at higher pitch than members of the same species in quiet habitats, a shift that lifts their songs above the low-frequency rumble of traffic. The finding is robust; its interpretation is not. One camp reads the shift as an evolved or learned adjustment for communication: songs that escape the traffic band travel farther in cities, so singers who shift are better heard, defend territories more effectively, and attract more mates. A rival camp suspects a humbler mechanism. Birds, like humans, involuntarily raise vocal effort in noise — the so-called Lombard effect — and raising effort mechanically raises pitch in many songbirds. On this view the shift requires no history of selection in cities at all; it is physiology, not adaptation.</p>
    <p>Distinguishing the accounts requires more than snapshots. If the shift is a real-time response, it should vanish when the noise does; several studies now report that birds in the same territories sing lower on quiet mornings than during rush hour, which the physiological account predicts directly. Yet the adjustment is larger in urban populations with long histories of city living than in recent arrivals — a residue that real-time flexibility alone seems unable to explain.</p>`,
    questions: [
      { id: "p2_m1q1", type: "mcq", diff: "medium",
        text: "The main point of the passage is that",
        choices: [
          "the elevated pitch of urban birdsong is well documented, but evidence suggests both real-time physiology and longer-term adjustment contribute to it",
          "urban birds sing at higher pitch solely because of the Lombard effect",
          "songbirds cannot communicate effectively in cities",
          "the finding that urban birds sing at higher pitch has been discredited",
          "birds with long histories of city living sing more quietly than recent arrivals"
        ],
        answer: 0,
        expl: "The passage endorses the finding (\"robust\"), lays out two accounts, and ends with evidence pointing partly to each — rush-hour flexibility (physiology) plus a history-dependent residue (adaptation). The Lombard-only reading ignores that final residue.",
        tip: "When a passage ends 'yet…', the main point must accommodate both sides of that yet." },
      { id: "p2_m1q2", type: "mcq", diff: "medium",
        text: "According to the passage, the studies comparing quiet mornings with rush hour showed that",
        choices: [
          "individual birds sing lower when the noise is absent",
          "urban birds abandon their territories during rush hour",
          "the Lombard effect does not occur in songbirds",
          "recently arrived urban birds sing higher than long-established ones",
          "traffic noise has been decreasing in most cities"
        ],
        answer: 0,
        expl: "\"Birds in the same territories sing lower on quiet mornings than during rush hour\" — a within-individual, real-time effect. The comparison between long-established and recent populations runs the other way (long-established shift MORE), making that choice a reversal trap.",
        tip: "Detail questions reward the answer closest to the passage's own sentence — beware reversed comparisons." },
      { id: "p2_m1q3", type: "mcq", diff: "medium",
        text: "The author mentions that the pitch adjustment is larger in populations with long histories of city living in order to",
        choices: [
          "identify evidence that the physiological account by itself does not seem to explain",
          "prove that the Lombard effect is not involuntary",
          "show that recent arrivals to cities cannot raise their pitch at all",
          "argue that snapshots are sufficient to distinguish the two accounts",
          "demonstrate that urban noise levels have risen over time"
        ],
        answer: 0,
        expl: "The sentence is introduced with \"Yet\" and closes by calling the pattern \"a residue that real-time flexibility alone seems unable to explain\" — it limits the physiological account rather than refuting the Lombard effect itself.",
        tip: "'Yet' + 'alone seems unable to explain' marks evidence deployed against sufficiency, not against existence." }
    ]
  });

  /* ---------- EASY · 4 questions ---------- */
  P.push({
    id: "p2_e1", diff: "easy", title: "The waggle dance",
    text: `<p>When a honeybee locates a rich patch of flowers, she returns to the hive and performs what beekeepers call a waggle dance: a repeated figure-eight in which she vibrates her body while walking a short straight line. In the 1940s, Karl von Frisch proposed that the dance is a code. The direction of the straight-line run, he argued, indicates the direction of the food relative to the sun, and the duration of the waggling indicates the distance. The claim met resistance for decades. Skeptics allowed that the dance conveyed excitement but insisted that recruited bees actually found the food by smell, following floral odors carried on the dancer's body.</p>
    <p>The dispute was largely settled by an inventive experiment: a robotic bee, built to dance inside a real hive, could be programmed to indicate a site it had never visited and that carried no odor cues. Recruits flew to the indicated site anyway. Most researchers now accept that the dance communicates both direction and distance, though odor still helps recruits pinpoint flowers once they arrive in the right area.</p>`,
    questions: [
      { id: "p2_e1q1", type: "mcq", diff: "easy",
        text: "The passage is primarily concerned with",
        choices: [
          "describing a scientific claim about bee communication, the objection to it, and the experiment that largely resolved the dispute",
          "explaining how honeybees produce floral odors",
          "arguing that robotic bees are superior to living bees for pollination",
          "showing that Karl von Frisch's hypothesis was ultimately rejected",
          "comparing the dances of several different insect species"
        ],
        answer: 0,
        expl: "The passage moves claim → objection → deciding experiment → current consensus. Von Frisch's view was accepted, not rejected, so the rejection choice reverses the outcome.",
        tip: "Match the passage's story arc; wrong answers often flip its ending." },
      { id: "p2_e1q2", type: "mcq", diff: "easy",
        text: "According to the passage, von Frisch proposed that the duration of the waggling portion of the dance indicates",
        choices: [
          "the distance to the food source",
          "the direction of the food relative to the sun",
          "the sweetness of the nectar",
          "the number of bees needed",
          "the time of day the food was found"
        ],
        answer: 0,
        expl: "Direction is carried by the angle of the straight-line run; DURATION \"indicates the distance.\" The direction choice swaps the two halves of the code — the standard detail trap.",
        tip: "When a passage pairs two codes, expect a choice that swaps them." },
      { id: "p2_e1q3", type: "mcq", diff: "easy",
        text: "The skeptics mentioned in the first paragraph believed that recruited bees located food primarily by",
        choices: [
          "following floral odors carried on the dancer's body",
          "reading the angle of the dancer's straight-line run",
          "memorizing landmarks near the hive",
          "flying in expanding circles until food was found",
          "sensing the sun's position directly"
        ],
        answer: 0,
        expl: "The skeptics \"insisted that recruited bees actually found the food by smell, following floral odors carried on the dancer's body.\" Reading the run's angle is von Frisch's view — the position they were resisting.",
        tip: "Keep each camp's claim attached to the right camp; attribution swaps are the easy-passage trap." },
      { id: "p2_e1q4", type: "mcma", diff: "easy",
        text: "The passage indicates which of the following about the robotic-bee experiment? Consider each choice separately and select all that apply.",
        choices: [
          "The robot could indicate a location it had never visited",
          "The indicated site carried no odor cues",
          "Recruited bees ignored the robot's dance"
        ],
        answer: [0, 1],
        expl: "Both design features are stated — a never-visited site with no odor cues — and they are what made the result decisive. The third choice contradicts the outcome: \"recruits flew to the indicated site anyway.\"",
        tip: "In select-all questions, the last option often states the opposite of the result — check the outcome sentence." }
    ]
  });

  /* ================= Select-in-passage passages =================
     These passages carry a "sip" question (click the sentence), so their
     paragraphs are authored plain: no inline tags, no mid-sentence periods.
     A sip answer is the 0-based sentence index counted across paragraphs. */

  P.push({
    id: "p2_s1", diff: "easy", title: "Canals and railroads",
    text: `<p>In the early nineteenth century, canals were the dominant means of moving heavy freight across the interior of many industrializing countries. Canal boats were slow, but they were cheap, and for bulk goods such as coal and grain, cost mattered far more than speed. Within a few decades, however, railroads had captured most of this traffic. The usual explanation points to speed, yet speed alone cannot account for the shift, since bulk shippers had always tolerated slow delivery. The decisive advantage of railroads was reliability: canals froze in winter, flooded in spring, and ran dry in summer, while trains ran on schedule in nearly any weather. Shippers, it turned out, would pay a premium not to arrive quickly but to know when they would arrive.</p>`,
    questions: [
      { id: "p2_s1q1", type: "sip", diff: "easy",
        text: "Select the sentence that identifies what the author considers the decisive advantage of railroads over canals.",
        answer: 4,
        expl: "The fifth sentence names it outright — \"The decisive advantage of railroads was reliability\" — and backs it with the seasonal failures of canals. The sentence about speed is the popular explanation the author rejects, not the author's own answer.",
        tip: "Match the question's key phrase (\"decisive advantage\") to the sentence that asserts it, not to sentences that merely discuss the topic." },
      { id: "p2_s1q2", type: "mcq", diff: "easy",
        text: "The primary purpose of the passage is to",
        choices: [
          "correct an incomplete explanation for why railroads displaced canal freight",
          "argue that canals were superior to railroads for bulk goods",
          "describe how canal boats were constructed and operated",
          "show that railroad freight was cheaper than canal freight",
          "explain why coal and grain no longer travel by rail"
        ],
        answer: 0,
        expl: "The passage grants the shift happened, rejects speed as the full explanation (\"speed alone cannot account for the shift\"), and substitutes reliability. It never claims rail was cheaper — the passage says shippers paid a premium.",
        tip: "\"The usual explanation… yet…\" signals a correction; the purpose answer should name it." }
    ]
  });

  P.push({
    id: "p2_s2", diff: "medium", title: "The testing effect",
    text: `<p>Students preparing for an examination overwhelmingly favor rereading their notes, a strategy that feels productive because the material grows steadily more familiar. That familiarity, however, is a poor guide to learning. In controlled comparisons, students who spent the same amount of time taking practice tests recalled substantially more material a week later than students who simply reread. Psychologists call this the testing effect, and its explanation appears to lie in retrieval itself: the act of pulling information from memory strengthens the very pathways used to retrieve it, in a way that passive review does not.</p>
    <p>The finding carries an uncomfortable corollary for learners. The strategies that feel easiest tend to produce the least durable learning, while the mild struggle of self-testing, precisely because it is effortful, is the better investment. Fluency, in short, is not mastery, and the difference between the two often remains invisible until the examination itself.</p>`,
    questions: [
      { id: "p2_s2q1", type: "sip", diff: "medium",
        text: "Select the sentence that explains the mechanism thought to underlie the testing effect.",
        answer: 3,
        expl: "The fourth sentence supplies the mechanism: retrieval \"strengthens the very pathways used to retrieve it.\" The sentence reporting the controlled comparisons gives the EVIDENCE for the effect, not its explanation — the classic near-miss.",
        tip: "\"Mechanism\" asks how it works, not that it works; evidence sentences are the trap." },
      { id: "p2_s2q2", type: "mcq", diff: "medium",
        text: "According to the passage, rereading feels productive to students because",
        choices: [
          "the material becomes increasingly familiar as they reread",
          "practice tests are stressful and effortful",
          "rereading produces the most durable learning",
          "psychologists have endorsed it as a study strategy",
          "familiarity is a reliable measure of mastery"
        ],
        answer: 0,
        expl: "The first sentence says rereading \"feels productive because the material grows steadily more familiar.\" The passage then denies that familiarity measures learning — so the last choice states the opposite of the author's view.",
        tip: "\"Feels productive because…\" is answered verbatim in the passage; don't upgrade the feeling into a fact." }
    ]
  });

  P.push({
    id: "p2_s3", diff: "hard", title: "The rhetoric of untranslatability",
    text: `<p>The claim that great poetry is untranslatable has the ring of a truism, and translators themselves have often been its most eloquent proponents. Yet the claim conceals an equivocation. If it means that no translation reproduces every effect of its original, it is true but trivial, since no paraphrase within a single language is perfectly faithful either. If it means that nothing of value survives the crossing, it is refuted by the plain fact that readers have been moved, influenced, and changed by poems they could read only in translation. What the truism actually registers, one suspects, is not a property of poems but a professional anxiety: the translator's sense that fidelity to sound must be purchased with infidelity to sense, and that every choice will be legible to critics as a loss. The interesting question is therefore not whether translation is possible, for it demonstrably occurs, but why the rhetoric of impossibility remains so durable among those who practice it.</p>`,
    questions: [
      { id: "p2_s3q1", type: "sip", diff: "hard",
        text: "Select the sentence in which the author proposes what the claim of untranslatability actually reflects.",
        answer: 4,
        expl: "The fifth sentence delivers the author's own diagnosis: the truism registers \"not a property of poems but a professional anxiety.\" The two conditional sentences before it dismantle other readings of the claim; they analyze it without saying what it actually reflects.",
        tip: "\"What the truism actually registers\" is the author stepping forward — hedged verbs like \"one suspects\" often mark the thesis sentence." },
      { id: "p2_s3q2", type: "mcq", diff: "hard",
        text: "The primary purpose of the passage is to",
        choices: [
          "distinguish two readings of a familiar claim and propose what the claim really expresses",
          "demonstrate that poetry cannot be translated without loss",
          "praise translators for their eloquence in defending their craft",
          "argue that paraphrase within a single language is impossible",
          "recount the history of a famous dispute between translators and critics"
        ],
        answer: 0,
        expl: "The structure is: truism → equivocation exposed (two readings, one trivial, one false) → what the claim actually registers → the question worth asking. The untranslatability claim is the passage's target, not its conclusion.",
        tip: "When a passage calls a claim an \"equivocation,\" its purpose is analysis of the claim, never endorsement." }
    ]
  });
})();
