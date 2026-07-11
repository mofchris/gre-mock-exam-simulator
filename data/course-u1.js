/* GRE Study Course - Unit 1: Orientation and Verbal Foundations */
(function () {
  const C = window.GRECOURSE = window.GRECOURSE || { units: [] };

  C.units.push({
    id: "u1",
    title: "Unit 1: Orientation and Verbal Foundations",
    blurb: "How the test actually works and how it scores you, then the two question types that reward vocabulary and sentence logic.",
    modules: [

/* ================= MODULE 1 ================= */
{
  id: "gm1_1", title: "How the GRE Actually Works", minutes: 12, level: "foundation",
  content: `
<p>Before you study a single vocabulary word, understand the machine you're being fed into. The GRE is
not a knowledge test. It's a <em>reasoning</em> test with a clock, and its structure creates specific
opportunities that most test-takers never exploit.</p>

<h2>The format (post-September 2023, ~1 hour 58 minutes)</h2>
<table>
  <tr><th>#</th><th>Section</th><th>Questions</th><th>Time</th></tr>
  <tr><td>1</td><td>Analytical Writing: "Analyze an Issue"</td><td>1 essay</td><td>30 min</td></tr>
  <tr><td>2</td><td>Verbal Reasoning, Section 1</td><td>12</td><td>18 min</td></tr>
  <tr><td>3</td><td>Quantitative Reasoning, Section 1</td><td>12</td><td>21 min</td></tr>
  <tr><td>4</td><td>Verbal Reasoning, Section 2</td><td>15</td><td>23 min</td></tr>
  <tr><td>5</td><td>Quantitative Reasoning, Section 2</td><td>15</td><td>26 min</td></tr>
</table>
<p>Scoring: Verbal 130–170, Quant 130–170, Writing 0–6. There are no scheduled breaks.</p>

<h2>The thing that changes your entire strategy: section-level adaptivity</h2>
<div class="keybox"><p>The GRE is <strong>section-adaptive</strong>, not question-adaptive. Your performance
on <strong>Section 1</strong> of each measure determines whether Section 2 is <em>easier, medium, or
harder</em>, and the difficulty of the section you receive is baked into your final scaled score.</p>
<p><strong>The consequence:</strong> if you do poorly on Section 1, you get routed to an easier Section 2,
and <em>your score is capped no matter how well you do there</em>. You could get every question right in
an easy Section 2 and still land in the low 150s.</p></div>
<p>So: <strong>Section 1 of each measure is worth more than Section 2.</strong> Every point of accuracy
there buys you access to a higher scoring band. Don't "warm up" during Section 1: arrive warm.</p>

<h2>Within a section, you have total freedom</h2>
<p>You can move forward and back, skip, mark questions for review, and change answers: right up until you
leave the section. Once you exit, you can't return. That means:</p>
<ul>
  <li><strong>Never sit stuck on a hard question.</strong> Mark it, guess, move on. Come back with the leftover time.</li>
  <li><strong>Do the easy questions first.</strong> Every question is worth the same. A question you can answer in 30 seconds is worth exactly as much as one that would take you four minutes.</li>
  <li><strong>Use the Review screen.</strong> It shows what's answered, unanswered, and marked.</li>
</ul>

<h2>There is no penalty for guessing</h2>
<p>An unanswered question and a wrong answer score identically: zero. So a blank is a strictly worse
version of a guess. <strong>Never leave anything blank</strong>, with 90 seconds left, click through and
fill every remaining bubble.</p>

<h2>Pacing budgets</h2>
<table>
  <tr><th>Section</th><th>Time per question (average)</th></tr>
  <tr><td>Verbal S1 (12 in 18 min)</td><td>~90 seconds</td></tr>
  <tr><td>Verbal S2 (15 in 23 min)</td><td>~92 seconds</td></tr>
  <tr><td>Quant S1 (12 in 21 min)</td><td>~105 seconds</td></tr>
  <tr><td>Quant S2 (15 in 26 min)</td><td>~104 seconds</td></tr>
</table>
<p>But averages lie. In Verbal, a Text Completion should take 45–60 seconds so that a long Reading
Comprehension passage can take four minutes. In Quant, a Quantitative Comparison should take 60 seconds
so a Data Interpretation set can breathe.</p>

<h2>What the GRE actually rewards</h2>
<ul>
  <li><strong>Precision under time pressure</strong>, not depth of knowledge. The quant content stops at roughly high-school level. There's no calculus, no trigonometry.</li>
  <li><strong>Reading carefully.</strong> A huge share of missed questions are questions the test-taker answered correctly, just not the question that was asked.</li>
  <li><strong>Recognizing traps.</strong> Wrong answers are engineered. The one that "feels obvious" in a hard question is usually the trap.</li>
</ul>
<div class="exambox"><strong>The single highest-leverage habit:</strong> before you look at the answer
choices, predict your own answer. The choices are designed to seduce you. If you walk in with your own
answer already formed, you're matching, not being persuaded.</div>

<h2>What you must remember</h2>
<ul>
  <li>Section 1 of each measure determines your score ceiling. Treat it as the real test.</li>
  <li>Free navigation within a section: skip, mark, return. Never get stuck.</li>
  <li>No guessing penalty. A blank is strictly worse than a guess.</li>
  <li>Predict before you look at the choices.</li>
</ul>`,
  quiz: [
    { text: "How does the GRE's adaptivity work?",
      choices: [
        "Each question adapts based on the previous question",
        "Your performance on Section 1 of a measure determines the difficulty of Section 2, which affects your score ceiling",
        "The test never adapts; all sections are identical",
        "Adaptivity applies only to the essay"],
      answer: 1,
      expl: "The GRE is section-adaptive. Section 1 performance routes you to an easier, medium, or harder Section 2, and that routing is factored into your scaled score, which is why Section 1 effectively sets your ceiling." },
    { text: "You have 40 seconds left in a Verbal section and three unanswered questions. What should you do?",
      choices: [
        "Leave them blank to avoid losing points",
        "Fill in a guess for every one of them",
        "Answer only the one you understand best and leave the rest blank",
        "Ask for extra time"],
      answer: 1,
      expl: "There is no penalty for wrong answers, so a blank scores exactly the same as a wrong guess, zero. Guessing costs nothing and can only help." },
    { text: "Which statement about navigation within a GRE section is TRUE?",
      choices: [
        "Once you answer a question you cannot change it",
        "You can move freely, skip, mark, and change answers until you exit the section",
        "You must answer questions in order with no skipping",
        "You can return to a previous section at any time"],
      answer: 1,
      expl: "Within a section you have full freedom to navigate and revise. Once you exit a section, however, it is closed permanently." },
    { text: "Why is it a mistake to spend four minutes on a single difficult Verbal question?",
      choices: [
        "Hard questions are worth fewer points",
        "Every question is worth the same, so the time is better spent on questions you can actually answer",
        "The test penalizes slow answers",
        "The question will automatically be marked wrong"],
      answer: 1,
      expl: "All questions carry equal weight. Four minutes on one hard question is four minutes stolen from three easier ones you would have gotten right." },
    { text: "What is the single most useful habit when approaching a Verbal question?",
      choices: [
        "Read the answer choices first",
        "Predict your own answer before looking at the choices",
        "Always pick the longest answer",
        "Eliminate the first and last choices automatically"],
      answer: 1,
      expl: "Wrong answers are engineered to be seductive. Forming your own answer first means you are matching against a prediction rather than being persuaded by a well-crafted trap." },
    { text: "Which two are true about the current GRE format? (Select TWO.)",
      choices: [
        "It lasts roughly 1 hour 58 minutes",
        "It includes two scored essays",
        "Verbal and Quant are each scored from 130 to 170",
        "There is a scheduled 10-minute break in the middle",
        "The Quantitative section tests calculus"],
      answer: [0, 2],
      expl: "The shorter GRE runs about 1 hour 58 minutes, with one Issue essay and 130–170 scoring per measure. There are no scheduled breaks, and the math stops around high-school level." }
  ]
},

/* ================= MODULE 2 ================= */
{
  id: "gm1_2", title: "How GRE Vocabulary Really Works", minutes: 13, level: "foundation",
  content: `
<p>Most people prepare for GRE vocabulary by memorizing word lists. Most people are disappointed. The
problem isn't effort. It's that the GRE doesn't test whether you know definitions. It tests whether you
can <strong>use sentence logic to determine what a word must mean in context</strong>.</p>

<h2>The insight: the sentence tells you the answer</h2>
<p>Every Text Completion sentence contains its own solution. The blank is not a mystery: the rest of the
sentence <em>constrains</em> it, often to a single meaning. Your job is to find the constraint.</p>
<div class="worked"><h4>Try it</h4>
<p><em>"Although the committee had been assembled to promote reform, its members proved so ______ that
two years passed without a single proposal."</em></p>
<p>What must the blank mean? "Although" flags a contrast with "promote reform." And the evidence is that
nothing happened for two years. So the blank means something like <strong>inactive / resistant to
change</strong>. You knew that before seeing any choices, and now words like <em>indolent</em>,
<em>inert</em>, or <em>hidebound</em> are recognizable as right, and <em>industrious</em> as a trap.</p></div>

<h2>The signal words that do all the work</h2>
<table>
  <tr><th>Type</th><th>Words</th><th>What it tells you</th></tr>
  <tr><td><strong>Contrast</strong></td><td>although, though, yet, but, however, despite, in spite of, nevertheless, whereas, rather than, far from, paradoxically, ironically, surprisingly</td><td>The blank <em>opposes</em> what's on the other side</td></tr>
  <tr><td><strong>Continuation</strong></td><td>and, moreover, indeed, in fact, furthermore, similarly, likewise; also a <strong>colon</strong> or <strong>semicolon</strong></td><td>The blank <em>agrees with</em> or explains what's on the other side</td></tr>
  <tr><td><strong>Cause / effect</strong></td><td>because, since, therefore, thus, consequently, as a result, so… that</td><td>The blank causes, or is caused by, the other half</td></tr>
</table>
<div class="keybox"><strong>The colon and semicolon are gifts.</strong> They almost always mean "what follows
explains or restates what came before." When you see one, the answer is on the other side of it.</div>

<h2>Charge: the shortcut that saves you when you don't know the word</h2>
<p>Even if you can't define a word, you can often sense whether it's <strong>positive</strong> or
<strong>negative</strong>. That alone frequently eliminates three choices.</p>
<p>If the sentence needs a negative word ("the critic <em>excoriated</em> the film"), you can eliminate
every positive-charged answer without knowing exactly what any of them mean. <em>Excoriate, censure,
denigrate, disparage</em>: all negative. <em>Laud, extol, tout</em>: all positive.</p>

<h2>Learn roots, not just words</h2>
<table>
  <tr><th>Root / prefix</th><th>Means</th><th>Examples</th></tr>
  <tr><td>bene-, bon-</td><td>good</td><td>benevolent, benign, bonhomie</td></tr>
  <tr><td>mal-, mis-</td><td>bad</td><td>malevolent, malign, misanthrope</td></tr>
  <tr><td>-loqu-, -log-</td><td>speech</td><td>loquacious, eloquent, grandiloquent, colloquy</td></tr>
  <tr><td>-cred-</td><td>belief</td><td>credible, credulous, incredulous</td></tr>
  <tr><td>-taci-, -tic-</td><td>silent</td><td>taciturn, reticent</td></tr>
  <tr><td>ob-, contra-, anti-</td><td>against</td><td>obstinate, contravene, antipathy</td></tr>
  <tr><td>-vor-</td><td>eat</td><td>voracious, carnivore, devour</td></tr>
  <tr><td>eu-</td><td>well / pleasant</td><td>euphemism, eulogy, euphony</td></tr>
</table>

<h2>The GRE's favorite words (a starter set worth knowing cold)</h2>
<table>
  <tr><th>Word</th><th>Meaning</th></tr>
  <tr><td><strong>equivocal</strong></td><td>ambiguous, open to multiple readings (opposite: unequivocal)</td></tr>
  <tr><td><strong>ubiquitous</strong></td><td>everywhere at once</td></tr>
  <tr><td><strong>laconic / taciturn / reticent</strong></td><td>using few words; silent by nature</td></tr>
  <tr><td><strong>garrulous / loquacious / voluble</strong></td><td>talkative</td></tr>
  <tr><td><strong>intransigent / obdurate / obstinate</strong></td><td>refusing to compromise</td></tr>
  <tr><td><strong>ephemeral / transient / evanescent</strong></td><td>short-lived</td></tr>
  <tr><td><strong>prosaic / banal / pedestrian</strong></td><td>dull, unoriginal</td></tr>
  <tr><td><strong>venerate / revere / laud</strong></td><td>to honor or praise highly</td></tr>
  <tr><td><strong>disparage / denigrate / deprecate</strong></td><td>to belittle</td></tr>
  <tr><td><strong>ameliorate</strong></td><td>to make better</td></tr>
  <tr><td><strong>exacerbate</strong></td><td>to make worse</td></tr>
  <tr><td><strong>anomalous / aberrant</strong></td><td>deviating from the norm</td></tr>
  <tr><td><strong>tenuous</strong></td><td>weak, flimsy (an argument, a connection)</td></tr>
  <tr><td><strong>candor</strong></td><td>frankness, honesty</td></tr>
  <tr><td><strong>circumspect / prudent</strong></td><td>cautious, careful</td></tr>
</table>
<div class="warnbox"><strong>Watch out for the words that don't mean what they sound like.</strong>
<em>Enervate</em> means to <em>drain</em> energy, not to energize. <em>Fulsome</em> means excessive and
insincere, not abundant in a good way. <em>Ingenuous</em> means naive (not clever: that's
<em>ingenious</em>). <em>Noisome</em> means foul-smelling, not noisy. These traps appear constantly.</div>

<h2>How to study words efficiently</h2>
<ul>
  <li>Learn words in <strong>groups of synonyms</strong>, since Sentence Equivalence requires pairs.</li>
  <li>Record the word's <strong>charge</strong> (+/−) and one example sentence, not just a definition.</li>
  <li>Use spaced repetition. Twenty words a day, reviewed, beats a hundred crammed and forgotten.</li>
</ul>

<h2>What you must remember</h2>
<ul>
  <li>The sentence's logic determines the blank. Find the signal word first.</li>
  <li>Contrast (although, yet, despite) flips the direction. Colons and semicolons mean "the same thing again."</li>
  <li>Charge (+/−) eliminates choices even when you don't know the definitions.</li>
  <li>Watch the false friends: enervate, fulsome, ingenuous, noisome.</li>
</ul>`,
  quiz: [
    { text: "In the sentence \"Although the plan was ______, its execution was flawless,\" what must the blank mean?",
      choices: [
        "Something positive, matching 'flawless'",
        "Something negative, contrasting with 'flawless'",
        "Something neutral",
        "It cannot be determined"],
      answer: 1,
      expl: "'Although' signals contrast. Since the execution was flawless, the plan itself must have been flawed: a negative word." },
    { text: "What does a colon or semicolon most often signal in a Text Completion sentence?",
      choices: [
        "That the second half contrasts with the first",
        "That the second half explains or restates the first",
        "That a list is beginning",
        "That the sentence is a question"],
      answer: 1,
      expl: "Colons and semicolons signal continuation: what follows elaborates on or restates what came before. This makes the other half of the sentence a direct clue to the blank." },
    { text: "The word 'enervate' means:",
      choices: [
        "To energize or invigorate",
        "To drain of energy; to weaken",
        "To make nervous",
        "To criticize harshly"],
      answer: 1,
      expl: "Enervate means to weaken or drain of vitality, the opposite of what it sounds like. It is one of the GRE's favorite false friends." },
    { text: "A sentence requires a negative word in the blank, but you don't know the definitions of any choices. What technique is MOST useful?",
      choices: [
        "Pick the longest word",
        "Determine each word's charge (positive or negative) and eliminate the positives",
        "Pick the first choice alphabetically",
        "Skip the question entirely"],
      answer: 1,
      expl: "Sensing a word's positive or negative charge often eliminates several choices even without precise definitions, dramatically improving your odds." },
    { text: "Which group are all synonyms meaning 'using few words / silent'?",
      choices: [
        "Garrulous, loquacious, voluble",
        "Laconic, taciturn, reticent",
        "Venerate, revere, laud",
        "Ephemeral, transient, evanescent"],
      answer: 1,
      expl: "Laconic, taciturn, and reticent all describe someone sparing with words. Garrulous, loquacious, and voluble are their opposites." },
    { text: "Which two words mean 'refusing to compromise'? (Select TWO.)",
      choices: ["Intransigent", "Ephemeral", "Obdurate", "Prosaic", "Candid"],
      answer: [0, 2],
      expl: "Intransigent and obdurate both describe stubborn refusal to yield. Ephemeral means short-lived, prosaic means dull, and candid means frank." },
    { text: "'Ingenuous' means:",
      choices: ["Clever and inventive", "Naive and innocent", "Dishonest", "Extremely talented"],
      answer: 1,
      expl: "Ingenuous means artless or naive. The word meaning clever and inventive is 'ingenious': a single letter apart, and a favorite GRE trap." }
  ]
},

/* ================= MODULE 3 ================= */
{
  id: "gm1_3", title: "Text Completion, Single and Multi-Blank", minutes: 14, level: "core",
  content: `
<p>Text Completion gives you a sentence (or short paragraph) with one, two, or three blanks. One blank
means five choices; two or three blanks mean three choices <em>each</em>.</p>
<div class="warnbox"><strong>There is no partial credit.</strong> On a three-blank question, getting two
right and one wrong scores exactly the same as getting all three wrong: zero. This has a strategic
consequence. A three-blank question is <em>not</em> three times harder, but it <em>is</em> three times
more fragile. Verify every blank.</div>

<h2>The method</h2>
<ol>
  <li><strong>Cover the answer choices.</strong> Physically or mentally. Do not read them yet.</li>
  <li><strong>Read the whole sentence</strong> for its logic. What's the relationship between its parts?</li>
  <li><strong>Find the signal word</strong> (although / because / moreover / a semicolon).</li>
  <li><strong>Predict a simple word</strong> for the blank. Plain English is fine: "bad," "praise," "not caring." You're not trying to guess their word; you're establishing the <em>direction</em>.</li>
  <li><strong>Now look at the choices</strong> and find the one closest to your prediction.</li>
  <li><strong>Read the completed sentence back.</strong> Does it actually make sense? If it doesn't, you've misread the logic.</li>
</ol>

<h2>Multi-blank: start with the easiest blank, not the first</h2>
<p>Blanks are not equally constrained. One of them usually has an overwhelming clue. Find that one, lock
it in, and use it to constrain the others.</p>
<div class="worked"><h4>Worked example</h4>
<p><em>"The scientist's conclusions, though (i) ______ when first published, have since become so widely
accepted that they now seem almost (ii) ______."</em></p>
<p><strong>Blank (ii)</strong> is the easier one: "so widely accepted that they now seem almost ___."
Something like <em>obvious</em> or <em>self-evident</em>.</p>
<p><strong>Now blank (i):</strong> "though" flags contrast with that acceptance. So originally they were
<em>not</em> accepted: <em>controversial</em>, <em>heretical</em>.</p>
<p>The arc is: once shocking → now obvious. Any answer pair that doesn't produce that arc is wrong.</p></div>

<h2>What the traps look like</h2>
<ul>
  <li><strong>The right word for the wrong blank.</strong> Multi-blank choices are often correct-sounding words that belong in a <em>different</em> blank.</li>
  <li><strong>The word that fits the topic but not the logic.</strong> If the sentence is about a scientist, "empirical" feels right, but feeling topical is not the same as being logically required.</li>
  <li><strong>The reversal.</strong> The trap is very often the exact opposite of the answer. If you misread one signal word, the trap is waiting for you.</li>
</ul>
<div class="exambox"><strong>Diagnostic:</strong> if two answer choices are opposites of each other, one of
them is almost certainly correct, and the sentence's signal words tell you which.</div>

<h2>Practice reading the logic</h2>
<p><em>"Far from being the ______ figure his memoirs suggest, the general was, by most contemporary
accounts, cautious to the point of timidity."</em></p>
<p>"Far from being" = negation. The reality is "cautious to the point of timidity." So the blank is the
<em>opposite</em> of timid: <strong>bold, intrepid, audacious</strong>. Notice you never needed to know
anything about generals.</p>

<p><em>"The essayist is celebrated less for the novelty of her ideas than for the ______ with which she
expresses them, turning familiar observations into memorable prose."</em></p>
<p>"Less for X than for Y" sets up a contrast: her ideas <em>aren't</em> novel, yet she's celebrated: 
so it must be the <em>expression</em>. And "turning familiar observations into memorable prose" defines
it: skill, grace, aptness. <strong>Felicity</strong> (apt, pleasing expression) is the GRE's word for this.</p>

<h2>What you must remember</h2>
<ul>
  <li>Predict before you look. Cover the choices.</li>
  <li>All blanks must be right, no partial credit. Verify by reading the sentence back.</li>
  <li>Start with the most-constrained blank, not blank (i).</li>
  <li>The trap is usually the opposite of the answer. Trust the signal word.</li>
</ul>`,
  quiz: [
    { text: "On a three-blank Text Completion, you are confident about two blanks but guessing on the third. How is this scored?",
      choices: [
        "You earn two-thirds credit",
        "You earn partial credit based on the blanks you got right",
        "The entire question is wrong unless all three blanks are correct",
        "The question is thrown out"],
      answer: 2,
      expl: "Text Completion awards no partial credit. Every blank must be correct, which is why verifying by reading the completed sentence back is essential." },
    { text: "Which blank should you attempt FIRST on a multi-blank question?",
      choices: [
        "Always blank (i), reading left to right",
        "Whichever blank has the strongest contextual clue",
        "Always the last blank",
        "It doesn't matter"],
      answer: 1,
      expl: "Blanks are not equally constrained. Solving the most heavily clued blank first gives you leverage to constrain the others." },
    { text: "\"Far from being the ______ figure his memoirs suggest, the general was cautious to the point of timidity.\" What must the blank mean?",
      choices: ["Timid", "Bold", "Honest", "Elderly"],
      answer: 1,
      expl: "'Far from being' negates the blank. Since the reality is timidity, the blank must be its opposite: bold, intrepid, audacious." },
    { text: "In \"The essayist is celebrated less for the novelty of her ideas than for the ______ with which she expresses them,\" the blank refers to:",
      choices: [
        "The originality of her thinking",
        "The skill and aptness of her expression",
        "The length of her essays",
        "The obscurity of her subjects"],
      answer: 1,
      expl: "'Less for X than for Y' means her ideas are not what earns praise. Her expression is. The blank names a quality of expression, such as felicity or grace." },
    { text: "You notice that two answer choices for a blank are direct opposites of each other. What does this suggest?",
      choices: [
        "Both are wrong",
        "One of them is very likely correct, and the signal words determine which",
        "The question is defective",
        "You should pick neither"],
      answer: 1,
      expl: "Test writers include the opposite of the answer as a trap for anyone who misreads the sentence's direction. The signal word tells you which of the pair is correct." },
    { text: "Which two are sound Text Completion strategies? (Select TWO.)",
      choices: [
        "Read the answer choices before reading the sentence",
        "Predict your own word for the blank before looking at the choices",
        "Read the completed sentence back to verify it makes sense",
        "Always pick the most difficult-sounding word",
        "Choose a word that relates to the sentence's topic"],
      answer: [1, 2],
      expl: "Predicting protects you from seductive wrong answers, and reading back catches misreadings. Topic-related words that don't fit the logic are a classic trap." }
  ]
},

/* ================= MODULE 4 ================= */
{
  id: "gm1_4", title: "Sentence Equivalence", minutes: 11, level: "core",
  content: `
<p>Sentence Equivalence gives you one sentence with one blank and <strong>six</strong> choices. You must
select <strong>exactly two</strong>, and those two must both fit the sentence <em>and</em> produce
sentences that are alike in meaning.</p>
<div class="warnbox"><strong>No partial credit.</strong> One right and one wrong scores zero. This is the
question type most people lose points on carelessly.</div>

<h2>The method is the same as Text Completion: plus one step</h2>
<ol>
  <li>Cover the choices. Read for logic. Find the signal word.</li>
  <li><strong>Predict a word.</strong></li>
  <li>Find the <strong>two</strong> choices closest to your prediction.</li>
  <li><strong>Check that they're actually equivalent</strong>: that both produce sentences with the same meaning.</li>
</ol>

<h2>The two traps, and they catch everyone</h2>
<div class="keybox">
<p><strong>Trap 1: the synonym pair that doesn't fit the sentence.</strong> The test gives you two words
that are clearly synonyms of each other, but neither actually works in the sentence. They're there
precisely because you're hunting for a pair, and it's tempting to grab the obvious one.</p>
<p><strong>Trap 2: the single perfect word with no partner.</strong> A word fits the blank beautifully: 
but no other choice means the same thing. It <em>cannot</em> be the answer, because the answer requires
two. If you find only one word that fits, you have misread the sentence.</p>
</div>
<p>These two traps are why <strong>you must find a pair</strong>, not just good words. The right answer is
always a pair.</p>

<h2>Critical nuance: the pair need not be perfect synonyms</h2>
<p>The requirement is that the completed <em>sentences</em> mean the same thing, not that the two words
are dictionary synonyms in every context. Two words can produce equivalent sentences here while differing
elsewhere.</p>

<h2>Worked examples</h2>
<div class="worked"><h4>Example 1</h4>
<p><em>"The professor's lectures, though rich in content, were so ______ that even devoted students
struggled to stay awake."</em></p>
<p>Choices: soporific · riveting · erudite · dull · concise · controversial</p>
<p><strong>Prediction:</strong> boring / sleep-inducing.<br>
<strong>Pair:</strong> <em>soporific</em> and <em>dull</em>. ✓</p>
<p><strong>The trap:</strong> <em>erudite</em> (learned) is genuinely true of the lectures ("rich in
content"), but it doesn't explain why students struggled to stay awake, and it has no partner among the
choices. It's Trap 2 exactly.</p></div>
<div class="worked"><h4>Example 2</h4>
<p><em>"For all his reputation as an innovator, the composer was in practice quite ______, rarely straying
from the forms he had mastered as a student."</em></p>
<p>Choices: daring · conservative · traditional · prolific · reclusive · experimental</p>
<p><strong>"For all his reputation as X"</strong> means the reality is the <em>opposite</em> of X. The
reality: he rarely strayed from established forms.<br>
<strong>Pair:</strong> <em>conservative</em> and <em>traditional</em>. ✓</p>
<p><strong>The trap:</strong> <em>daring</em> and <em>experimental</em> form a beautiful synonym pair: 
they're Trap 1. They match his <em>reputation</em>, not his practice.</p></div>

<h2>When you don't know the words</h2>
<ul>
  <li>Determine the <strong>charge</strong> the blank needs (+/−) and eliminate everything on the wrong side.</li>
  <li>Look for the <strong>pairs</strong> among the six. Six choices usually contain two or three natural pairs; then ask which pair the sentence demands.</li>
  <li>If you know four words and two are a fitting pair, take it and move on. Don't agonize over the two you don't know.</li>
</ul>

<h2>What you must remember</h2>
<ul>
  <li>Exactly two answers. No partial credit. The answer is always a <strong>pair</strong>.</li>
  <li>Trap 1: a synonym pair that doesn't fit. Trap 2: a perfect word with no partner.</li>
  <li>If only one word seems to fit, you've misread the sentence: re-check the signal word.</li>
  <li>Equivalent <em>sentences</em>, not necessarily dictionary-identical words.</li>
</ul>`,
  quiz: [
    { text: "How many answers must you select on a Sentence Equivalence question?",
      choices: ["One", "Exactly two", "Two or three", "As many as fit"],
      answer: 1,
      expl: "Sentence Equivalence requires exactly two choices that both fit the sentence and produce sentences alike in meaning. There is no partial credit." },
    { text: "You find one choice that fits the sentence perfectly, but no other choice means anything similar. What does this indicate?",
      choices: [
        "That choice is definitely correct",
        "You have likely misread the sentence. The answer must be a pair",
        "The question has only one answer",
        "You should pick that word plus your best guess"],
      answer: 1,
      expl: "The answer is always a pair. A single perfect-seeming word with no partner is a deliberate trap, and its presence means you should re-examine the sentence's logic." },
    { text: "In \"For all his reputation as an innovator, the composer was quite ______, rarely straying from established forms,\" why are 'daring' and 'experimental' wrong despite being a clean synonym pair?",
      choices: [
        "They are too difficult",
        "They describe his reputation, not the reality the sentence contrasts it with",
        "They are not real synonyms",
        "They are positive words"],
      answer: 1,
      expl: "'For all his reputation as X' signals that the reality is the opposite of X. Daring and experimental match the reputation. They are the classic decoy synonym pair." },
    { text: "Must the two correct answers be exact dictionary synonyms?",
      choices: [
        "Yes, always",
        "No. They must produce sentences that are alike in meaning",
        "Yes, and they must be the same part of speech",
        "No, they can have opposite meanings"],
      answer: 1,
      expl: "The requirement is equivalence of the completed sentences. Two words can create equivalent sentences here while differing in other contexts." },
    { text: "\"The critic found the novel utterly ______, unable to put it down until the final page.\" Which two choices are correct?",
      choices: ["Tedious", "Gripping", "Predictable", "Engrossing", "Confusing", "Brief"],
      answer: [1, 3],
      expl: "'Unable to put it down' means the book held his attention, so gripping and engrossing form the correct pair. Tedious and predictable are opposites." },
    { text: "Which two techniques help when you don't know several of the six words? (Select TWO.)",
      choices: [
        "Determine whether the blank needs a positive or negative word and eliminate accordingly",
        "Always choose the two longest words",
        "Look for natural synonym pairs among the choices, then ask which pair the sentence demands",
        "Pick the two words that relate to the sentence's topic",
        "Choose the first two choices"],
      answer: [0, 2],
      expl: "Charge analysis eliminates half the field even without definitions, and since the answer must be a pair, identifying candidate pairs narrows the decision to which pair the logic requires." }
  ]
}
    ],

/* ================= CHECKPOINT 1 ================= */
    checkpoint: {
      id: "gcp1", title: "Test Structure and Sentence Logic", n: 15,
      questions: [
        { text: "Which section of each measure has the greatest influence on your score ceiling?",
          choices: ["Section 1, because it determines the difficulty of Section 2", "Section 2, because it has more questions", "The essay", "They are equally weighted"],
          answer: 0,
          expl: "The GRE is section-adaptive. Section 1 performance routes you to an easier, medium, or harder Section 2, and an easier Section 2 caps your possible score." },
        { text: "What is the penalty for a wrong answer on the GRE?",
          choices: ["One quarter of a point", "Half a point", "There is no penalty", "The question is doubled in weight"],
          answer: 2,
          expl: "There is no wrong-answer penalty, which means a blank is strictly worse than a guess. Never leave a question unanswered." },
        { text: "\"Although the film received ______ reviews, audiences flocked to it and it became a hit.\" The blank must be:",
          choices: ["Glowing", "Poor", "Lengthy", "Early"],
          answer: 1,
          expl: "'Although' signals contrast with the audience's enthusiasm, so the critics must have disliked it." },
        { text: "A semicolon in a Text Completion sentence usually signals:",
          choices: ["Contrast", "Continuation or restatement", "A question", "A list"],
          answer: 1,
          expl: "Semicolons and colons signal that what follows explains or restates what came before, making the other half a direct clue." },
        { text: "'Ephemeral' most nearly means:",
          choices: ["Permanent", "Short-lived", "Beautiful", "Confusing"],
          answer: 1,
          expl: "Ephemeral means fleeting or short-lived, like transient and evanescent." },
        { text: "How many answer choices does a two-blank Text Completion offer for EACH blank?",
          choices: ["Three", "Five", "Six", "Four"],
          answer: 0,
          expl: "Two- and three-blank Text Completions give three choices per blank. Single-blank questions give five." },
        { text: "Which two words mean 'to make worse' and 'to make better', respectively? (Select TWO.)",
          choices: ["Exacerbate means to make worse", "Ameliorate means to make worse", "Ameliorate means to make better", "Exacerbate means to make better", "Both mean the same thing"],
          answer: [0, 2],
          expl: "Exacerbate worsens a situation; ameliorate improves it. They are frequently tested as an opposing pair." },
        { text: "On Sentence Equivalence, you select two words that are perfect synonyms of each other but don't quite fit the sentence's logic. What have you done?",
          choices: [
            "Answered correctly, since the words are synonyms",
            "Fallen for the decoy synonym pair",
            "Earned partial credit",
            "Selected too many answers"],
          answer: 1,
          expl: "The decoy pair is a deliberate trap for test-takers hunting for synonyms rather than reading the sentence. Both words must fit the sentence's logic." },
        { text: "'Equivocal' means:",
          choices: ["Ambiguous, open to multiple interpretations", "Clear and definite", "Equal in value", "Loudly spoken"],
          answer: 0,
          expl: "Equivocal means deliberately ambiguous. Its opposite, unequivocal, means completely clear and unambiguous." },
        { text: "You have 90 seconds left and three questions unanswered. What is the correct action?",
          choices: [
            "Leave them blank",
            "Guess on all three",
            "Carefully solve one and leave two blank",
            "Report the issue"],
          answer: 1,
          expl: "With no guessing penalty, a guess strictly dominates a blank. Fill in every remaining answer." },
        { text: "'Laconic' most nearly means:",
          choices: ["Talkative", "Using very few words", "Lazy", "Angry"],
          answer: 1,
          expl: "Laconic describes terse, sparing speech, like taciturn and reticent. Its opposites include garrulous and loquacious." },
        { text: "Which two are true about Text Completion scoring? (Select TWO.)",
          choices: [
            "All blanks must be correct to earn credit",
            "Partial credit is awarded per blank",
            "There is no penalty for a wrong answer",
            "Three-blank questions are worth more points",
            "You may leave one blank empty"],
          answer: [0, 2],
          expl: "Text Completion requires every blank to be correct, but wrong answers carry no penalty, so always fill every blank, even by guessing." },
        { text: "\"Rather than acting on impulse, the committee chose a more ______ approach, weighing each option carefully.\" The blank means:",
          choices: ["Hasty", "Deliberate", "Reckless", "Secretive"],
          answer: 1,
          expl: "'Rather than acting on impulse' plus 'weighing each option carefully' defines a slow, careful approach, deliberate." },
        { text: "'Fulsome' actually means:",
          choices: ["Abundant and generous", "Excessive to the point of insincerity", "Complete", "Full of energy"],
          answer: 1,
          expl: "Fulsome praise is offensively excessive and insincere, not simply plentiful. It is a classic GRE false friend." },
        { text: "Which approach should you take BEFORE looking at the answer choices?",
          choices: [
            "Predict your own word for the blank",
            "Count the number of choices",
            "Look for the longest word",
            "Read the passage twice"],
          answer: 0,
          expl: "Predicting first means you match your own answer against the choices instead of being persuaded by carefully engineered traps." },
        { text: "Which two words form a valid Sentence Equivalence pair meaning 'everywhere at once'? (Select TWO.)",
          choices: ["Ubiquitous", "Ephemeral", "Omnipresent", "Reticent", "Prosaic"],
          answer: [0, 2],
          expl: "Ubiquitous and omnipresent both mean present everywhere, forming a valid equivalence pair." },
        { text: "Within a GRE section, which of the following is TRUE?",
          choices: [
            "You may skip, mark, and revisit questions until you exit the section",
            "You must answer each question before advancing",
            "You may return to previous sections",
            "Marked questions are automatically scored as wrong"],
          answer: 0,
          expl: "You have full navigational freedom inside a section, which is exactly why you should skip hard questions and return to them rather than getting stuck." }
      ]
    }
  });
})();
