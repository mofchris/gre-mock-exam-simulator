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
      expl: "Two words settle this: <em>section</em>-adaptive, not question-adaptive.<br>Section 1 of a measure is the same difficulty for everyone.<br>Your accuracy there routes Section 2 to easier, medium, or harder.<br>That routing is baked into the scaled score, so an easier Section 2 caps you.<br><strong>Section 1 sets your ceiling.</strong><br><em>The trap:</em> \"each question adapts based on the previous question\" describes question-level adaptivity, which today's GRE does not use.<br><em>Fast method:</em> The GRE adapts between sections, so treat Section 1 as the real test. Target: ~10 seconds." },
    { text: "You have 40 seconds left in a Verbal section and three unanswered questions. What should you do?",
      choices: [
        "Leave them blank to avoid losing points",
        "Fill in a guess for every one of them",
        "Answer only the one you understand best and leave the rest blank",
        "Ask for extra time"],
      answer: 1,
      expl: "Price the two outcomes against each other.<br>Blank = 0 points, guaranteed.<br>Wrong guess = 0 points, with nothing deducted: the GRE has no guessing penalty.<br>Right guess = full credit.<br>A guess is never worse and sometimes better, so <strong>fill in a guess for all three</strong>.<br><em>The trap:</em> \"leave them blank to avoid losing points\" assumes penalty scoring the GRE does not use.<br><em>Fast method:</em> In the last 90 seconds, stop solving and click something for every empty question. Target: ~10 seconds." },
    { text: "Which statement about navigation within a GRE section is TRUE?",
      choices: [
        "Once you answer a question you cannot change it",
        "You can move freely, skip, mark, and change answers until you exit the section",
        "You must answer questions in order with no skipping",
        "You can return to a previous section at any time"],
      answer: 1,
      expl: "Split the question into two halves: inside a section versus between sections.<br>Inside: move forward and back, skip, mark for review, change answers.<br>Between: once you exit a section it locks, permanently.<br>So the true statement is <strong>full freedom to move, skip, mark, and revise until you exit</strong>.<br><em>The trap:</em> \"you can return to a previous section at any time\" is the freedom you actually lose.<br><em>Fast method:</em> Free movement inside a section, one-way door on the way out. Target: ~10 seconds." },
    { text: "Why is it a mistake to spend four minutes on a single difficult Verbal question?",
      choices: [
        "Hard questions are worth fewer points",
        "Every question is worth the same, so the time is better spent on questions you can actually answer",
        "The test penalizes slow answers",
        "The question will automatically be marked wrong"],
      answer: 1,
      expl: "Think in exchange rates, not difficulty.<br>Every question is worth the same single point.<br>Verbal pacing runs about 90 seconds per question, so four minutes on one costs you roughly three other questions.<br>Spend it on three you can actually answer and you gain up to three points instead of a coin flip on one.<br><strong>Equal weight means time, not difficulty, is what you are managing.</strong><br><em>The trap:</em> \"hard questions are worth fewer points\" reverses it: difficulty changes your cost, never the payout.<br><em>Fast method:</em> Past two minutes, mark it, guess, move on. Target: ~15 seconds." },
    { text: "What is the single most useful habit when approaching a Verbal question?",
      choices: [
        "Read the answer choices first",
        "Predict your own answer before looking at the choices",
        "Always pick the longest answer",
        "Eliminate the first and last choices automatically"],
      answer: 1,
      expl: "Ask what the wrong choices are engineered to do: sound plausible the instant you read them.<br>Read them first and you are weighing their arguments.<br>Arrive with your own word already formed and you are only matching.<br>So the habit is to <strong>predict your own answer before looking at the choices</strong>.<br><em>The trap:</em> \"read the answer choices first\" feels efficient but hands the test writer the opening move.<br><em>Fast method:</em> Cover the choices, say your own plain-English answer, then look. Target: ~10 seconds." },
    { text: "Which two are true about the current GRE format? (Select TWO.)",
      choices: [
        "It lasts roughly 1 hour 58 minutes",
        "It includes two scored essays",
        "Verbal and Quant are each scored from 130 to 170",
        "There is a scheduled 10-minute break in the middle",
        "The Quantitative section tests calculus"],
      answer: [0, 2],
      expl: "Check each claim against the current shorter GRE.<br>About 1 hour 58 minutes total: <strong>true</strong>.<br>Verbal and Quant each scored 130 to 170: <strong>true</strong>.<br>Two scored essays: false, there is one \"Analyze an Issue\" essay.<br>A scheduled 10-minute break: false, there are no scheduled breaks.<br>Quant tests calculus: false, the content stops near high-school level.<br><em>The trap:</em> the two-essay and mid-test-break options describe the retired longer format.<br><em>Fast method:</em> Anything you remember about a long GRE with breaks and two essays is out of date. Target: ~15 seconds." }
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
      expl: "Find the signal word before you think about vocabulary.<br>\"Although\" means contrast, so the halves point opposite ways.<br>Known half: the execution was <em>flawless</em>, clearly positive.<br>Flip it: the plan itself must be <strong>negative, contrasting with 'flawless'</strong> – flawed, ill-conceived.<br>Read it back: bad plan, perfect execution. That makes sense.<br><em>The trap:</em> \"something positive, matching 'flawless'\" ignores the contrast word and just harmonizes the two halves.<br><em>Fast method:</em> Circle the signal word, label the visible half + or −, then flip on contrast. Target: ~15 seconds." },
    { text: "What does a colon or semicolon most often signal in a Text Completion sentence?",
      choices: [
        "That the second half contrasts with the first",
        "That the second half explains or restates the first",
        "That a list is beginning",
        "That the sentence is a question"],
      answer: 1,
      expl: "Punctuation is a signal word in disguise.<br>A colon or semicolon says \"here comes the same idea again, spelled out.\"<br>So the second half <strong>explains or restates the first</strong>.<br>The payoff: the clue for the blank is sitting on the other side of the mark.<br><em>The trap:</em> \"the second half contrasts with the first\" needs an actual contrast word – although, yet, but – and punctuation never supplies one.<br><em>Fast method:</em> Colon or semicolon → carry the meaning straight across, don't flip it. Target: ~10 seconds." },
    { text: "The word 'enervate' means:",
      choices: [
        "To energize or invigorate",
        "To drain of energy; to weaken",
        "To make nervous",
        "To criticize harshly"],
      answer: 1,
      expl: "Separate the word from the sound-alike it hides behind.<br>\"Enervate\" looks like <em>energize</em>, and that resemblance is the entire trick.<br>Its root sense is to remove nerve or sinew: <strong>to drain of energy, to weaken</strong>.<br>Test it in context: the heat enervated the hikers. They got weaker, not stronger.<br><em>The trap:</em> \"to energize or invigorate\" is the exact opposite, which is why this word keeps reappearing.<br><em>Fast method:</em> Enervate means the nerve is taken out. File it with the other false friends. Target: ~10 seconds." },
    { text: "A sentence requires a negative word in the blank, but you don't know the definitions of any choices. What technique is MOST useful?",
      choices: [
        "Pick the longest word",
        "Determine each word's charge (positive or negative) and eliminate the positives",
        "Pick the first choice alphabetically",
        "Skip the question entirely"],
      answer: 1,
      expl: "You don't need definitions here, you need direction.<br>Step one: decide what the blank must be. Here, negative.<br>Step two: sort the choices by felt charge, praise-flavored versus attack-flavored.<br>Step three: <strong>determine each word's charge and eliminate the positives</strong>, often three of five gone.<br>Now you are guessing between two, not five.<br><em>The trap:</em> \"pick the longest word\" – word difficulty has no relationship to correctness.<br><em>Fast method:</em> Mark the blank + or −, then cut everything on the wrong side of the line. Target: ~15 seconds." },
    { text: "Which group are all synonyms meaning 'using few words / silent'?",
      choices: [
        "Garrulous, loquacious, voluble",
        "Laconic, taciturn, reticent",
        "Venerate, revere, laud",
        "Ephemeral, transient, evanescent"],
      answer: 1,
      expl: "Translate each group, one at a time.<br>Garrulous, loquacious, voluble → talkative.<br>Venerate, revere, laud → to praise highly.<br>Ephemeral, transient, evanescent → short-lived.<br><strong>Laconic, taciturn, reticent → sparing with words, silent by nature.</strong> That's the match.<br><em>The trap:</em> the talkative trio is the direct opposite, waiting for anyone who half-remembers <em>loquacious</em> as quiet.<br><em>Fast method:</em> Learn GRE words in synonym clusters so questions like this become a lookup, not a puzzle. Target: ~10 seconds." },
    { text: "Which two words mean 'refusing to compromise'? (Select TWO.)",
      choices: ["Intransigent", "Ephemeral", "Obdurate", "Prosaic", "Candid"],
      answer: [0, 2],
      expl: "Translate every choice, then keep only the stubborn ones.<br><strong>Intransigent</strong>: will not budge in negotiation. Fits.<br>Ephemeral: short-lived. No.<br><strong>Obdurate</strong>: hardened, unyielding, same root as <em>durable</em>. Fits.<br>Prosaic: dull, unoriginal. No.<br>Candid: frank. No.<br><em>The trap:</em> \"candid\" sounds like a blunt-personality word, but frankness is about honesty, not inflexibility.<br><em>Fast method:</em> Define all six before selecting any; on a pair question both picks must carry the same meaning. Target: ~15 seconds." },
    { text: "'Ingenuous' means:",
      choices: ["Clever and inventive", "Naive and innocent", "Dishonest", "Extremely talented"],
      answer: 1,
      expl: "Two words one letter apart – separate them first.<br>Ingen<strong>i</strong>ous = clever, inventive.<br>Ingenuous = artless, <strong>naive and innocent</strong>, which is the meaning asked for.<br>Memory hook: <em>disingenuous</em> means insincere, so ingenuous means sincere to the point of naivety.<br><em>The trap:</em> \"clever and inventive\" defines <em>ingenious</em>, the sound-alike this question is built on.<br><em>Fast method:</em> Look for the extra i – ingen-i-ous is the smart one. Target: ~10 seconds." }
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
      expl: "Ask how the GRE scores a multi-blank item: all or nothing.<br>Two blanks right out of three earns exactly what zero right earns.<br>So <strong>the entire question is wrong unless all three blanks are correct</strong>.<br>The consequence: a three-blank question isn't three times harder, it's three times more fragile.<br><em>The trap:</em> \"two-thirds credit\" imports partial-credit scoring that Text Completion has never offered.<br><em>Fast method:</em> No partial credit, so read the completed sentence back before you submit. Target: ~10 seconds." },
    { text: "Which blank should you attempt FIRST on a multi-blank question?",
      choices: [
        "Always blank (i), reading left to right",
        "Whichever blank has the strongest contextual clue",
        "Always the last blank",
        "It doesn't matter"],
      answer: 1,
      expl: "Blanks are not equally difficult, so don't default to left-to-right.<br>Scan for the blank with the loudest clue: a definition, a restatement, a signal word right beside it.<br>Solve <strong>whichever blank has the strongest contextual clue</strong> first.<br>Then use that locked-in meaning to constrain the remaining blanks.<br><em>The trap:</em> \"always blank (i)\" – blank (i) often depends on information that only becomes clear once a later blank is settled.<br><em>Fast method:</em> Easiest blank first, then let it do the work on the others. Target: ~10 seconds." },
    { text: "\"Far from being the ______ figure his memoirs suggest, the general was cautious to the point of timidity.\" What must the blank mean?",
      choices: ["Timid", "Bold", "Honest", "Elderly"],
      answer: 1,
      expl: "\"Far from being\" is a negation, doing the same job as \"although.\"<br>What the sentence asserts as real: he was <em>cautious to the point of timidity</em>.<br>The memoirs therefore claim the opposite of reality.<br>So the blank is the opposite of timid → <strong>bold</strong> (intrepid, audacious).<br><em>The trap:</em> \"timid\" is the reversal – it's the word the sentence hands you, dropped into the blank where its opposite belongs.<br><em>Fast method:</em> \"Far from,\" \"rather than,\" \"anything but\" → the blank flips. Target: ~15 seconds." },
    { text: "In \"The essayist is celebrated less for the novelty of her ideas than for the ______ with which she expresses them,\" the blank refers to:",
      choices: [
        "The originality of her thinking",
        "The skill and aptness of her expression",
        "The length of her essays",
        "The obscurity of her subjects"],
      answer: 1,
      expl: "Decode the comparison frame first.<br>\"Celebrated less for A than for B\" means B, not A, earns the praise.<br>A is the novelty of her ideas, so novelty is explicitly not the reason.<br>B is \"the ______ with which she expresses them,\" so the blank names <strong>the skill and aptness of her expression</strong>.<br>Confirmed by \"turning familiar observations into memorable prose.\"<br><em>The trap:</em> \"the originality of her thinking\" is exactly what the sentence rules out.<br><em>Fast method:</em> In \"less for X than for Y,\" the blank always lives on the Y side. Target: ~20 seconds." },
    { text: "You notice that two answer choices for a blank are direct opposites of each other. What does this suggest?",
      choices: [
        "Both are wrong",
        "One of them is very likely correct, and the signal words determine which",
        "The question is defective",
        "You should pick neither"],
      answer: 1,
      expl: "Ask why a test writer would place a word and its opposite in the same list.<br>Because misreading direction is the commonest error, and the opposite catches everyone who does.<br>That means the pair brackets the intended meaning: <strong>one of them is very likely correct, and the signal words determine which</strong>.<br>So reread the signal word – although, because, a semicolon – and pick that side.<br><em>The trap:</em> \"pick neither\" throws away the strongest structural hint on the question.<br><em>Fast method:</em> Opposites among the choices → the answer is one of them. Target: ~15 seconds." },
    { text: "Which two are sound Text Completion strategies? (Select TWO.)",
      choices: [
        "Read the answer choices before reading the sentence",
        "Predict your own word for the blank before looking at the choices",
        "Read the completed sentence back to verify it makes sense",
        "Always pick the most difficult-sounding word",
        "Choose a word that relates to the sentence's topic"],
      answer: [1, 2],
      expl: "Test each option against one rule: does it use the sentence's own logic?<br><strong>Predict your own word before looking</strong> – yes, it blocks seductive wrong answers.<br><strong>Read the completed sentence back</strong> – yes, it catches misread signal words.<br>Reading the choices before the sentence reverses the method. Picking the most difficult-sounding word treats vocabulary size as evidence.<br><em>The trap:</em> \"choose a word that relates to the sentence's topic\" – topical is not the same as logically required.<br><em>Fast method:</em> Predict, then verify by reading back. Target: ~15 seconds." }
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
      expl: "The format is fixed, not a judgment call.<br>Six choices are offered and you select <strong>exactly two</strong>.<br>Both must fit the sentence, and both completed sentences must be alike in meaning.<br>One right plus one wrong scores zero – there is no partial credit.<br><em>The trap:</em> \"as many as fit\" – several words may fit grammatically, but the format accepts exactly two.<br><em>Fast method:</em> Sentence Equivalence is six choices, two answers, one meaning. Target: ~10 seconds." },
    { text: "You find one choice that fits the sentence perfectly, but no other choice means anything similar. What does this indicate?",
      choices: [
        "That choice is definitely correct",
        "You have likely misread the sentence. The answer must be a pair",
        "The question has only one answer",
        "You should pick that word plus your best guess"],
      answer: 1,
      expl: "Use the format as a check on your own reading.<br>The answer must be a pair whose meanings match.<br>A word with no partner therefore cannot be correct, however well it fits.<br>So the real finding is not \"one answer\" but that <strong>you have likely misread the sentence</strong>.<br>Go back to the signal word and re-derive the direction.<br><em>The trap:</em> \"that choice is definitely correct\" – the lone perfect word is planted precisely to feel that way.<br><em>Fast method:</em> No partner, no answer. Reread rather than forcing a second pick. Target: ~15 seconds." },
    { text: "In \"For all his reputation as an innovator, the composer was quite ______, rarely straying from established forms,\" why are 'daring' and 'experimental' wrong despite being a clean synonym pair?",
      choices: [
        "They are too difficult",
        "They describe his reputation, not the reality the sentence contrasts it with",
        "They are not real synonyms",
        "They are positive words"],
      answer: 1,
      expl: "\"For all his reputation as X\" is a contrast frame: the reality opposes X.<br>X here is <em>innovator</em>, so the reality is not innovative.<br>The sentence confirms it: he rarely strayed from established forms.<br>Daring and experimental are clean synonyms of innovator, so they <strong>describe his reputation, not the reality the sentence contrasts it with</strong>.<br>The correct pair is conservative and traditional.<br><em>The trap:</em> a genuine synonym pair pointed the wrong way – being a pair is necessary, not sufficient.<br><em>Fast method:</em> Fix the direction first, then find the pair on that side. Target: ~20 seconds." },
    { text: "Must the two correct answers be exact dictionary synonyms?",
      choices: [
        "Yes, always",
        "No. They must produce sentences that are alike in meaning",
        "Yes, and they must be the same part of speech",
        "No, they can have opposite meanings"],
      answer: 1,
      expl: "Read what the instructions actually require.<br>You need two choices that produce sentences <em>alike in meaning</em>.<br>So the unit of equivalence is the <strong>sentence, not the dictionary entry</strong>.<br>Two words can therefore be equivalent in this context and diverge in others.<br><em>The trap:</em> \"yes, always\" – demanding perfect synonymy makes you reject valid pairs whose overlap is context-specific.<br><em>Fast method:</em> Plug both words in and compare the two finished sentences, not the two words. Target: ~10 seconds." },
    { text: "\"The critic found the novel utterly ______, unable to put it down until the final page.\" Which two choices are correct?",
      choices: ["Tedious", "Gripping", "Predictable", "Engrossing", "Confusing", "Brief"],
      answer: [1, 3],
      expl: "The clue is the evidence clause, so no signal word is needed.<br>\"Unable to put it down until the final page\" means the book held him completely.<br>Prediction: absorbing, compelling.<br>Now find a pair that matches: <strong>gripping</strong> and <strong>engrossing</strong>, both meaning it held full attention.<br>Confusing and brief say nothing about absorption.<br><em>The trap:</em> tedious and predictable form a tidy pair of their own, but they point the opposite direction – a pair aimed the wrong way is still wrong.<br><em>Fast method:</em> Predict from the evidence clause, then take the pair that matches. Target: ~20 seconds." },
    { text: "Which two techniques help when you don't know several of the six words? (Select TWO.)",
      choices: [
        "Determine whether the blank needs a positive or negative word and eliminate accordingly",
        "Always choose the two longest words",
        "Look for natural synonym pairs among the choices, then ask which pair the sentence demands",
        "Pick the two words that relate to the sentence's topic",
        "Choose the first two choices"],
      answer: [0, 2],
      expl: "When definitions fail, work the structure instead.<br><strong>Charge:</strong> decide whether the blank needs a positive or negative word and cut the wrong side, often three of six gone.<br><strong>Pairs:</strong> the answer must be a pair, so group the six into natural pairs and ask which pair the logic demands.<br>Word length, topic resemblance, and blind position-picking track nothing.<br><em>The trap:</em> \"the two words that relate to the sentence's topic\" – topic-matching is how the decoy pair gets chosen.<br><em>Fast method:</em> Charge to eliminate, pairs to decide. Target: ~15 seconds." }
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
          expl: "The GRE adapts between sections, not between questions.<br>Section 1 arrives at the same difficulty for everyone, so your accuracy there is the routing decision.<br>Do well → harder Section 2 → access to the top of the scale.<br>Do poorly → easier Section 2 → <strong>score capped even at perfect accuracy there</strong>.<br>So <strong>Section 1 determines the difficulty of Section 2</strong>, and with it your ceiling.<br><em>The trap:</em> \"Section 2, because it has more questions\" – more questions, but its difficulty band was already decided.<br><em>Fast method:</em> Section 1 is the real test. Arrive warm. Target: ~10 seconds." },
        { text: "What is the penalty for a wrong answer on the GRE?",
          choices: ["One quarter of a point", "Half a point", "There is no penalty", "The question is doubled in weight"],
          answer: 2,
          expl: "One fact, one consequence.<br>The fact: nothing is deducted for a wrong answer, so <strong>there is no penalty</strong>.<br>The consequence: wrong scores 0 and blank scores 0, so a blank can never beat a guess and can lose to one.<br><em>The trap:</em> \"one quarter of a point\" is formula scoring from other exams; the GRE has never used it.<br><em>Fast method:</em> Never leave a blank – with time running out, put something in every question. Target: ~10 seconds." },
        { text: "\"Although the film received ______ reviews, audiences flocked to it and it became a hit.\" The blank must be:",
          choices: ["Glowing", "Poor", "Lengthy", "Early"],
          answer: 1,
          expl: "Signal word first: \"although\" means contrast.<br>Known half: audiences flocked to it and it became a hit, clearly positive.<br>Flip for the blank: the reviews must have been <strong>poor</strong>.<br>Read it back – bad reviews, big audience – which is exactly the surprise \"although\" promises.<br><em>The trap:</em> \"glowing\" makes both halves agree, which is precisely what the contrast word forbids.<br><em>Fast method:</em> Contrast word → give the blank the opposite charge from the half you can already see. Target: ~15 seconds." },
        { text: "A semicolon in a Text Completion sentence usually signals:",
          choices: ["Contrast", "Continuation or restatement", "A question", "A list"],
          answer: 1,
          expl: "Punctuation carries logic on the GRE.<br>A semicolon, like a colon, joins two halves that say the same thing twice.<br>So it signals <strong>continuation or restatement</strong>, not a turn.<br>The payoff: whatever sits on one side defines the blank on the other.<br><em>The trap:</em> \"contrast\" – a flip requires an actual contrast word, and punctuation never provides one.<br><em>Fast method:</em> Semicolon or colon → carry the meaning straight across. Target: ~10 seconds." },
        { text: "'Ephemeral' most nearly means:",
          choices: ["Permanent", "Short-lived", "Beautiful", "Confusing"],
          answer: 1,
          expl: "Break the word, then place it in its cluster.<br>Ephemeral describes a mayfly's single day: lasting only a moment.<br>Meaning: <strong>short-lived</strong>, fleeting.<br>Same cluster: transient, evanescent. Opposite: permanent, enduring.<br><em>The trap:</em> \"permanent\" is the exact opposite, the standard decoy on a definition question.<br><em>Fast method:</em> Store every word with one synonym and one opposite, and the decoy becomes obvious. Target: ~10 seconds." },
        { text: "How many answer choices does a two-blank Text Completion offer for EACH blank?",
          choices: ["Three", "Five", "Six", "Four"],
          answer: 0,
          expl: "Count by format, not by feel.<br>One blank → five choices, pick one.<br>Two or three blanks → <strong>three</strong> choices per blank, pick one each.<br>So a two-blank question shows six words total, arranged in two columns of three.<br><em>The trap:</em> \"five\" is the single-blank count and \"six\" is the Sentence Equivalence count – both borrowed from a different question type.<br><em>Fast method:</em> Five choices means one blank; three per column means multi-blank. Target: ~10 seconds." },
        { text: "Which two words mean 'to make worse' and 'to make better', respectively? (Select TWO.)",
          choices: ["Exacerbate means to make worse", "Ameliorate means to make worse", "Ameliorate means to make better", "Exacerbate means to make better", "Both mean the same thing"],
          answer: [0, 2],
          expl: "Judge each statement on its own.<br><strong>Exacerbate means to make worse</strong>: true, think of an irritation intensified.<br>Ameliorate means to make worse: false, reversed.<br><strong>Ameliorate means to make better</strong>: true, from the root <em>melior</em>, better.<br>Exacerbate means to make better: false.<br>\"Both mean the same thing\": false, they are opposites.<br><em>The trap:</em> the two reversed statements read fluently and are wrong only in direction.<br><em>Fast method:</em> Ameliorate → melior → better; exacerbate is its opposite. Target: ~15 seconds." },
        { text: "On Sentence Equivalence, you select two words that are perfect synonyms of each other but don't quite fit the sentence's logic. What have you done?",
          choices: [
            "Answered correctly, since the words are synonyms",
            "Fallen for the decoy synonym pair",
            "Earned partial credit",
            "Selected too many answers"],
          answer: 1,
          expl: "Two conditions must hold: the words match each other <em>and</em> both fit the sentence.<br>Here only the first holds.<br>So the selection scores zero – you have <strong>fallen for the decoy synonym pair</strong>.<br>That pair exists to reward synonym-hunting over sentence-reading.<br><em>The trap:</em> \"answered correctly, since the words are synonyms\" – synonymy alone was never the standard.<br><em>Fast method:</em> Fit the sentence first, find the pair second. Target: ~15 seconds." },
        { text: "'Equivocal' means:",
          choices: ["Ambiguous, open to multiple interpretations", "Clear and definite", "Equal in value", "Loudly spoken"],
          answer: 0,
          expl: "Work backwards from the negative form you already know.<br>\"Unequivocal\" means completely clear, leaving no room for doubt.<br>Strip the un- and you get the opposite: <strong>ambiguous, open to multiple interpretations</strong>.<br>Root check: <em>equi-</em> plus <em>voc-</em>, equal voices, two readings with equal claim.<br><em>The trap:</em> \"equal in value\" guesses from <em>equi-</em> alone and ignores the \"voice\" half of the word.<br><em>Fast method:</em> If you know a word's un- form, negate it. Target: ~10 seconds." },
        { text: "You have 90 seconds left and three questions unanswered. What is the correct action?",
          choices: [
            "Leave them blank",
            "Guess on all three",
            "Carefully solve one and leave two blank",
            "Report the issue"],
          answer: 1,
          expl: "Price the options.<br>Blank = 0. Wrong guess = 0, with nothing deducted.<br>A random five-choice guess lands about one time in five; a blank lands never.<br>Three guesses cost about ten seconds, so <strong>guess on all three</strong>.<br><em>The trap:</em> \"carefully solve one and leave two blank\" trades two free chances for accuracy you may not even gain.<br><em>Fast method:</em> Inside the last 90 seconds, stop solving and start filling. Target: ~10 seconds." },
        { text: "'Laconic' most nearly means:",
          choices: ["Talkative", "Using very few words", "Lazy", "Angry"],
          answer: 1,
          expl: "Place the word in its family.<br>Laconic means <strong>using very few words</strong>, terse by habit.<br>Same cluster: taciturn, reticent.<br>Opposite cluster: garrulous, loquacious, voluble.<br>History hook: Laconia was Sparta, famous for one-word replies.<br><em>The trap:</em> \"talkative\" is the opposite pole, the standard decoy whenever a word has a well-known antonym set.<br><em>Fast method:</em> Learn the quiet trio and the talkative trio together, and this becomes recognition. Target: ~10 seconds." },
        { text: "Which two are true about Text Completion scoring? (Select TWO.)",
          choices: [
            "All blanks must be correct to earn credit",
            "Partial credit is awarded per blank",
            "There is no penalty for a wrong answer",
            "Three-blank questions are worth more points",
            "You may leave one blank empty"],
          answer: [0, 2],
          expl: "Two separate rules are being tested at once.<br>Within the question: <strong>all blanks must be correct</strong> to earn credit, no partial credit.<br>Across the test: <strong>there is no penalty for a wrong answer</strong>.<br>Partial credit per blank is false. Leaving a blank empty is allowed but strictly self-harming.<br><em>The trap:</em> \"three-blank questions are worth more points\" – three times the work, identical value.<br><em>Fast method:</em> All-or-nothing per question plus no penalty overall means always fill every blank. Target: ~15 seconds." },
        { text: "\"Rather than acting on impulse, the committee chose a more ______ approach, weighing each option carefully.\" The blank means:",
          choices: ["Hasty", "Deliberate", "Reckless", "Secretive"],
          answer: 1,
          expl: "Two clues point the same direction.<br>\"Rather than acting on impulse\" negates impulsiveness.<br>\"Weighing each option carefully\" then spells out the replacement.<br>So the blank means slow and considered → <strong>deliberate</strong>.<br><em>The trap:</em> \"hasty\" and \"reckless\" are both restatements of <em>impulse</em>, the very thing the sentence rules out.<br><em>Fast method:</em> \"Rather than X\" → the blank is not-X, and the nearby clause usually defines what not-X is. Target: ~15 seconds." },
        { text: "'Fulsome' actually means:",
          choices: ["Abundant and generous", "Excessive to the point of insincerity", "Complete", "Full of energy"],
          answer: 1,
          expl: "Ignore what the word looks like and use how it is actually used.<br>\"Fulsome praise\" is not a compliment; it is flattery laid on far too thick.<br>Meaning: <strong>excessive to the point of insincerity</strong>.<br>The <em>full-</em> inside it suggests plentiful, and that resemblance is the whole trap.<br><em>The trap:</em> \"abundant and generous\" is the sound-alike reading, and it is how the word gets misused in ordinary writing.<br><em>Fast method:</em> Fulsome is negative. File it with enervate, ingenuous, and noisome. Target: ~10 seconds." },
        { text: "Which approach should you take BEFORE looking at the answer choices?",
          choices: [
            "Predict your own word for the blank",
            "Count the number of choices",
            "Look for the longest word",
            "Read the passage twice"],
          answer: 0,
          expl: "Order of operations decides who is steering the question.<br>Read the sentence, find the signal word, then <strong>predict your own word for the blank</strong>.<br>Now the choices become a matching exercise.<br>Skip that step and every engineered wrong answer gets to argue its case first.<br><em>The trap:</em> \"count the number of choices\" is real information – five versus three tells you the question type – but it does nothing to protect you from the traps.<br><em>Fast method:</em> Prediction before choices, every single time. Target: ~10 seconds." },
        { text: "Which two words form a valid Sentence Equivalence pair meaning 'everywhere at once'? (Select TWO.)",
          choices: ["Ubiquitous", "Ephemeral", "Omnipresent", "Reticent", "Prosaic"],
          answer: [0, 2],
          expl: "Name the target meaning, then collect exactly two matches.<br>Target: present everywhere at once.<br><strong>Ubiquitous</strong>: everywhere at once. Fits.<br>Ephemeral: short-lived. No.<br><strong>Omnipresent</strong>: <em>omni-</em> (all) plus present. Fits.<br>Reticent: reserved in speech. No. Prosaic: dull. No.<br>That is the pair.<br><em>The trap:</em> \"ephemeral\" is about time, not place – a hard-sounding word answering a different question.<br><em>Fast method:</em> State the meaning in plain words first, then take the two words that carry it. Target: ~15 seconds." },
        { text: "Within a GRE section, which of the following is TRUE?",
          choices: [
            "You may skip, mark, and revisit questions until you exit the section",
            "You must answer each question before advancing",
            "You may return to previous sections",
            "Marked questions are automatically scored as wrong"],
          answer: 0,
          expl: "Sort the claims into inside-a-section and between-sections.<br>Inside: <strong>skip, mark, and revisit questions until you exit</strong>. True.<br>\"Must answer each question before advancing\": false, skipping is allowed and encouraged.<br>\"May return to previous sections\": false, exiting is permanent.<br>\"Marked questions are automatically scored as wrong\": false, marking is a private bookmark.<br><em>The trap:</em> believing that marking costs you something, which is what pushes people into getting stuck.<br><em>Fast method:</em> Free movement inside a section, one-way door out. Target: ~10 seconds." }
      ]
    }
  });
})();
