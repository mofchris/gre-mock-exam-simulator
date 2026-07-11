/* GRE Study Course — Unit 5: Writing and Test-Day Readiness */
(function () {
  const C = window.GRECOURSE = window.GRECOURSE || { units: [] };

  C.units.push({
    id: "u5",
    title: "Unit 5 — Writing and Test-Day Readiness",
    blurb: "The Issue essay, pacing, guessing, and the final checklist. This is where preparation becomes a score.",
    modules: [

/* ================= MODULE 16 ================= */
{
  id: "gm5_1", title: "The Issue Essay", minutes: 15, level: "core",
  content: `
<p>You get one essay, 30 minutes, scored 0–6. A prompt makes a claim; you must take a position and defend
it. Graders spend a few minutes on your essay — so structure and clarity beat cleverness every time.</p>

<h2>What the graders actually reward</h2>
<ul>
  <li>A <strong>clear, defensible position</strong> that responds to the <em>specific instructions</em> given with the prompt.</li>
  <li><strong>Developed reasons with concrete examples</strong> — not a list of assertions.</li>
  <li>Engagement with the <strong>strongest counterargument</strong>.</li>
  <li>Organization the grader can follow at a glance.</li>
  <li>Competent, varied sentences. (A few typos won't sink you. Incoherence will.)</li>
</ul>
<div class="warnbox"><strong>Read the task instructions, not just the statement.</strong> The prompt is
followed by directions that vary — "discuss the extent to which you agree or disagree," "describe specific
circumstances in which adopting the recommendation would or would not be advantageous," "address the most
compelling reasons that could challenge your position." An essay that ignores those instructions is capped
low no matter how well written it is.</div>

<h2>The winning move: qualify, don't crusade</h2>
<p>The strongest essays rarely take an absolute position. They say: <em>"This is true under conditions X,
but fails under conditions Y — and here's what determines which."</em> That demonstrates exactly the
nuanced reasoning being scored.</p>
<p>An unqualified "I completely agree" essay is hard to develop and easy to attack. A qualified position
gives you natural material for every paragraph.</p>

<h2>The 30-minute plan</h2>
<table>
  <tr><th>Minutes</th><th>Do this</th></tr>
  <tr><td><strong>0–4</strong></td><td><strong>Plan.</strong> Decide your position. Jot 2–3 reasons and one concrete example for each. Identify the strongest objection.</td></tr>
  <tr><td>4–26</td><td>Write.</td></tr>
  <tr><td>26–30</td><td>Proofread. Fix the errors that obscure meaning.</td></tr>
</table>
<p>Those first four minutes feel like waste. They aren't. An essay written from a plan is dramatically
better organized than one discovered while typing.</p>

<h2>The structure that works</h2>
<ol>
  <li><strong>Introduction</strong> (3–5 sentences). Acknowledge the claim's appeal, then state your qualified thesis clearly. The grader should know your position by the end of this paragraph.</li>
  <li><strong>Body 1</strong> — your strongest reason + a developed example.</li>
  <li><strong>Body 2</strong> — a second reason + a different kind of example.</li>
  <li><strong>Body 3</strong> — the <em>counterargument</em>. State the best case against you honestly, then explain why your position survives it (or where you concede ground).</li>
  <li><strong>Conclusion</strong> (3–4 sentences). Don't merely repeat — state what follows from your argument.</li>
</ol>
<p><strong>Length:</strong> aim for 500–600 words. Length correlates with score, not because graders count
words, but because development takes words. A 250-word essay cannot have developed examples.</p>

<h2>Examples: where to get them</h2>
<p>You don't need to be an expert. Draw on:</p>
<ul>
  <li><strong>History</strong> — the printing press, the Manhattan Project, the New Deal.</li>
  <li><strong>Science and technology</strong> — vaccines, the internet, automation, the replication crisis.</li>
  <li><strong>Business</strong> — companies that innovated or failed to.</li>
  <li><strong>Literature and the arts.</strong></li>
  <li><strong>Personal or observed experience</strong> — legitimate, if developed specifically.</li>
</ul>
<div class="keybox"><strong>One developed example beats three name-drops.</strong> Don't write "consider
Einstein, Curie, and Newton." Write one paragraph that actually <em>shows</em> how a specific case supports
your reasoning. Specificity is the difference between a 4 and a 5.</div>

<h2>The mechanics of the editor</h2>
<p>It's a plain text box. No spell-check, no grammar-check, and <strong>no access to your system
clipboard</strong> — only the internal Cut/Copy/Paste buttons. Don't fight it; just write.</p>

<h2>The scoring scale, briefly</h2>
<table>
  <tr><th>Score</th><th>What it looks like</th></tr>
  <tr><td><strong>6</strong></td><td>Insightful position, compelling and well-chosen examples, fluent and precise prose</td></tr>
  <tr><td><strong>5</strong></td><td>Thoughtful position, logically sound development, good control of language</td></tr>
  <tr><td><strong>4</strong></td><td>Clear position, relevant but less developed support, adequate control</td></tr>
  <tr><td><strong>3</strong></td><td>Vague or limited position, weak development, organizational problems</td></tr>
  <tr><td><strong>2 or below</strong></td><td>Unclear position, serious errors that obscure meaning</td></tr>
</table>
<p>Most first-time essays land at 3.5–4.0: a position is stated, but examples are thin and no
counterargument appears. Adding <em>one developed example</em> and <em>one honest counterargument
paragraph</em> is typically the difference between a 4 and a 5.</p>

<h2>What you must remember</h2>
<ul>
  <li>Follow the <em>specific task instructions</em>, not just the statement.</li>
  <li>Plan for 4 minutes. Qualify your position. Write 500+ words.</li>
  <li>Intro → 2 reasons with developed examples → counterargument → conclusion.</li>
  <li>One deep example beats three shallow ones.</li>
</ul>`,
  quiz: [
    { text: "How long is the Analytical Writing section on the current GRE?",
      choices: ["20 minutes", "30 minutes", "45 minutes", "60 minutes"],
      answer: 1,
      expl: "One Issue essay in 30 minutes. The older format's second essay (Argument task) has been removed." },
    { text: "What is the strongest approach to an Issue essay position?",
      choices: [
        "Agree completely with the statement",
        "Take a qualified position: true under certain conditions, not under others",
        "Refuse to take a position and discuss both sides neutrally",
        "Disagree completely to seem original"],
      answer: 1,
      expl: "A qualified position demonstrates the nuanced reasoning being scored, and it gives you natural material for every paragraph. Refusing to take a position at all is penalized." },
    { text: "How should you spend the first four minutes of the essay section?",
      choices: [
        "Writing the introduction immediately",
        "Planning: choosing a position, listing reasons and examples, identifying the counterargument",
        "Reading the prompt repeatedly",
        "Proofreading"],
      answer: 1,
      expl: "An essay written from a plan is dramatically better organized than one discovered while typing. Those four minutes pay for themselves." },
    { text: "Which is more valuable in an Issue essay?",
      choices: [
        "Three brief mentions of famous examples",
        "One example developed specifically and thoroughly",
        "As many examples as possible",
        "No examples, just reasoning"],
      answer: 1,
      expl: "Specificity is what separates a 4 from a 5. Name-dropping several examples without developing any of them reads as padding." },
    { text: "What must you pay attention to besides the prompt statement itself?",
      choices: [
        "The word count minimum",
        "The specific task instructions, which vary from prompt to prompt",
        "The font size",
        "The number of paragraphs required"],
      answer: 1,
      expl: "Task instructions vary — some ask you to address opposing views, others to describe circumstances where a recommendation would fail. Ignoring them caps your score regardless of writing quality." },
    { text: "Which two features characterize a high-scoring Issue essay? (Select TWO.)",
      choices: [
        "Engagement with the strongest counterargument",
        "Use of as many vocabulary words as possible",
        "Concrete, developed examples supporting each reason",
        "A neutral position that avoids committing",
        "Length under 300 words"],
      answer: [0, 2],
      expl: "Taking the opposing view seriously and supporting reasons with developed examples are what graders reward. Vocabulary showmanship and neutrality are not." },
    { text: "What tools does the GRE essay editor provide?",
      choices: [
        "Spell-check and grammar-check",
        "Basic cut, copy, paste, undo, and redo — with no spell-check",
        "A full word processor",
        "Nothing but typing"],
      answer: 1,
      expl: "The editor offers internal cut/copy/paste and undo/redo but deliberately excludes spell-check and grammar-check, and it cannot access your system clipboard." }
  ]
},

/* ================= MODULE 17 ================= */
{
  id: "gm5_2", title: "Pacing, Guessing, and Section Strategy", minutes: 12, level: "advanced",
  content: `
<p>Content knowledge gets you to a plateau. Test management is what breaks through it. Two people with
identical knowledge can score 8 points apart purely on how they spend their minutes.</p>

<h2>The two-pass method (use it in every section)</h2>
<ol>
  <li><strong>Pass 1:</strong> move through the section answering everything you can do <em>confidently and quickly</em>. The moment a question resists — you don't see the path within ~20 seconds — <strong>guess, mark it, move on.</strong></li>
  <li><strong>Pass 2:</strong> return to the marked questions with your remaining time, now with no unanswered questions hanging over you.</li>
</ol>
<div class="keybox"><strong>Why this works:</strong> every question is worth the same. Spending 4 minutes on
one brutal question while two easy questions sit unread at the end of the section is a straight trade of
2 points for 1. The two-pass method makes that trade impossible.</div>

<h2>Time budgets</h2>
<table>
  <tr><th>Verbal question type</th><th>Target</th></tr>
  <tr><td>Text Completion (1 blank)</td><td>~45 sec</td></tr>
  <tr><td>Text Completion (2–3 blanks)</td><td>~75–90 sec</td></tr>
  <tr><td>Sentence Equivalence</td><td>~60 sec</td></tr>
  <tr><td>Reading Comp — reading a long passage</td><td>~3 min (once)</td></tr>
  <tr><td>Reading Comp — each question</td><td>~60 sec</td></tr>
</table>
<table>
  <tr><th>Quant question type</th><th>Target</th></tr>
  <tr><td>Quantitative Comparison</td><td>~60 sec (many are 30 sec)</td></tr>
  <tr><td>Problem solving</td><td>~90 sec</td></tr>
  <tr><td>Data Interpretation — reading the chart</td><td>~30 sec (once)</td></tr>
  <tr><td>Data Interpretation — each question</td><td>~75 sec</td></tr>
</table>
<p>Sentence-level Verbal questions are your <em>time bank</em>: finish them fast to fund the reading
passages. In Quant, QC is the bank that funds Data Interpretation.</p>

<h2>Guessing intelligently</h2>
<p>There is no penalty. So the only question is: <em>can I do better than 20%?</em> Usually, yes.</p>
<ul>
  <li><strong>QC:</strong> if both quantities are specific numbers, eliminate (D) → 33%.</li>
  <li><strong>Verbal:</strong> use charge (+/−) to eliminate. Even two eliminations take you to 33%.</li>
  <li><strong>Extreme answers</strong> in Reading Comp (always, never, proves) are usually wrong → eliminate.</li>
  <li><strong>Quant:</strong> estimate. If the answer must be "a bit less than 50," eliminate everything far away.</li>
</ul>
<div class="exambox"><strong>With 60 seconds left</strong>, stop solving. Click through and ensure
<em>every single question has an answer.</em> A blank and a wrong answer score the same — so a blank is
pure waste.</div>

<h2>Remember what Section 1 is worth</h2>
<p>Because the GRE is section-adaptive, Section 1 of each measure determines the difficulty — and therefore
the score ceiling — of Section 2. Practical consequences:</p>
<ul>
  <li><strong>Do not use Section 1 as a warm-up.</strong> Arrive alert. Do a few practice questions before you leave home if that helps.</li>
  <li>Accuracy in Section 1 is worth more than speed. If you must choose, be right.</li>
  <li>If Section 2 feels easy, <em>don't panic</em> — it may mean you were routed down. Just execute. Panic costs points; the routing is already fixed.</li>
</ul>

<h2>Managing your head</h2>
<ul>
  <li><strong>The GRE is designed so you will see questions you can't do.</strong> That's not a sign you're failing — it's the test working as intended. Perfect scores are not the goal.</li>
  <li><strong>Never carry a question with you.</strong> Once you've answered and moved on, it's gone. Ruminating on question 4 while reading question 5 costs you both.</li>
  <li><strong>Breathe before each new section.</strong> Ten seconds of reset beats ten seconds of extra work.</li>
</ul>

<h2>The final two weeks</h2>
<ul>
  <li>Take <strong>full-length, timed mocks</strong> under real conditions — no pausing, no phone. Stamina is a skill.</li>
  <li><strong>Review every miss</strong> and categorize it: <em>content gap</em>, <em>careless error</em>, or <em>timing</em>. Those three failures have three completely different fixes. Most people's biggest bucket is "careless" — and they respond by studying more content, which fixes nothing.</li>
  <li>Drill your weakest question <em>type</em>, not your weakest <em>subject</em>.</li>
  <li>The day before: light review only. Sleep matters more than one more practice set.</li>
</ul>

<h2>What you must remember</h2>
<ul>
  <li>Two passes. Never get stuck. Guess, mark, move on.</li>
  <li>Section 1 sets your ceiling — arrive warm and prioritize accuracy.</li>
  <li>No blanks, ever. Eliminate to beat 20%.</li>
  <li>Categorize your misses: content, careless, or timing. Fix the right thing.</li>
</ul>`,
  quiz: [
    { text: "You're 25 seconds into a question and don't see a path to the answer. What should you do?",
      choices: [
        "Keep working until you solve it",
        "Guess, mark it for review, and move on",
        "Leave it blank and move on",
        "Skip the rest of the section"],
      answer: 1,
      expl: "Every question is worth the same. Guessing and marking preserves your time for questions you can actually answer, and you can return to it in the second pass." },
    { text: "Why is Section 1 of each measure more important than Section 2?",
      choices: [
        "It has more questions",
        "It determines the difficulty of Section 2, which sets your score ceiling",
        "It is graded more strictly",
        "It counts twice"],
      answer: 1,
      expl: "The GRE is section-adaptive. Poor Section 1 performance routes you to an easier Section 2 whose scoring is capped, no matter how well you perform there." },
    { text: "With 60 seconds left in a section and several unanswered questions, what is the correct action?",
      choices: [
        "Try to solve one more carefully",
        "Click through and put an answer on every remaining question",
        "Leave them blank",
        "Review your marked questions"],
      answer: 1,
      expl: "There is no guessing penalty, so a blank scores identically to a wrong answer — making blanks pure waste. Fill in everything." },
    { text: "In Quantitative Comparison, when both quantities are specific numbers, which answer can you eliminate before doing anything?",
      choices: ["(A)", "(B)", "(C)", "(D)"],
      answer: 3,
      expl: "Two known numbers always have a determinable relationship, so 'cannot be determined' is impossible — improving a blind guess from 25% to 33%." },
    { text: "After reviewing a practice test, you find most of your errors were on questions you actually knew how to do. What should you change?",
      choices: [
        "Study more content",
        "Address carelessness: re-read what's asked, verify your answer answers the question",
        "Take more practice tests without reviewing",
        "Focus only on the hardest questions"],
      answer: 1,
      expl: "Content gaps, careless errors, and timing failures require completely different fixes. Studying more content does nothing for a carelessness problem — which is most people's largest bucket." },
    { text: "Which two are effective pacing strategies? (Select TWO.)",
      choices: [
        "Answer Text Completions quickly to bank time for Reading Comprehension",
        "Spend equal time on every question regardless of type",
        "Use a two-pass approach: easy questions first, marked questions second",
        "Always work questions strictly in order",
        "Skip all Reading Comprehension"],
      answer: [0, 2],
      expl: "Sentence-level questions are fast and fund the time-expensive passages. The two-pass method ensures you never trade two easy points for one hard one." },
    { text: "Section 2 of Quant feels noticeably easier than Section 1. What should you do?",
      choices: [
        "Panic, since it means you did badly",
        "Simply execute carefully — the routing is already fixed and panic only costs points",
        "Deliberately answer some questions wrong",
        "Rush through it since it doesn't matter"],
      answer: 1,
      expl: "The routing has already happened and cannot be changed. Every correct answer still counts, so the only rational response is calm, accurate execution." }
  ]
},

/* ================= MODULE 18 ================= */
{
  id: "gm5_3", title: "Final Review — Everything That Matters", minutes: 13, level: "advanced",
  content: `
<p>This module is your last-week reference. Reread it the morning of the test.</p>

<h2>Verbal: the rules</h2>
<ul>
  <li><strong>Predict before you look</strong> at the choices. Always.</li>
  <li><strong>Signal words control the sentence:</strong> although/but/yet/despite = contrast (flip direction). Colon/semicolon/moreover = continuation (same direction).</li>
  <li><strong>Sentence Equivalence needs a PAIR.</strong> If only one word fits, you misread the sentence. Beware the synonym pair that doesn't fit, and the perfect word with no partner.</li>
  <li><strong>Text Completion: all blanks or nothing.</strong> Verify by reading the sentence back.</li>
  <li><strong>Reading Comp: read for structure</strong> — the author's point, and what each paragraph <em>does</em>.</li>
  <li><strong>Trap answers:</strong> too extreme (always/never/proves), true-but-not-asked, half-right, out of scope, reversal.</li>
  <li><strong>Match certainty:</strong> if the passage "suggests," the answer cannot "prove."</li>
  <li><strong>Critical Reasoning:</strong> find the conclusion, find the evidence, attack the <em>gap</em>. Never attack the evidence.</li>
</ul>

<h2>Quant: the formulas and facts</h2>
<table>
  <tr><th>Topic</th><th>Must know</th></tr>
  <tr><td>Percent change</td><td>(new − old) / old. "Percent of" ≠ "percent greater than."</td></tr>
  <tr><td>Successive percents</td><td>Multiply. +20% then −20% = 0.96.</td></tr>
  <tr><td>Averages</td><td>sum = average × count</td></tr>
  <tr><td>Work</td><td>Add <em>rates</em>. Never average speeds — use total distance ÷ total time.</td></tr>
  <tr><td>Ratios</td><td>Sum the parts, find one part.</td></tr>
  <tr><td>Factors</td><td>Prime factorize; add 1 to each exponent and multiply.</td></tr>
  <tr><td>x² = k</td><td><strong>Two roots</strong>, positive and negative.</td></tr>
  <tr><td>0 < x < 1</td><td>Squaring shrinks; rooting grows.</td></tr>
  <tr><td>Triangles</td><td>Angles = 180°. |a−b| < c < a+b. Bigger angle → bigger side. Triples: 3-4-5, 5-12-13.</td></tr>
  <tr><td>Special triangles</td><td>45-45-90 → x : x : x√2. 30-60-90 → x : x√3 : 2x.</td></tr>
  <tr><td>Square</td><td>Area = d²/2</td></tr>
  <tr><td>Polygon angles</td><td>(n − 2) × 180°</td></tr>
  <tr><td>Circle</td><td>C = 2πr, A = πr². Inscribed in a semicircle → 90°.</td></tr>
  <tr><td>Slopes</td><td>Perpendicular = negative reciprocals.</td></tr>
  <tr><td>Combination</td><td>Order doesn't matter (committees). Permutation: order matters.</td></tr>
  <tr><td>Probability</td><td>"At least one" → 1 − P(none). Without replacement → update both numbers.</td></tr>
  <tr><td>Std deviation</td><td>Identical values → 0. Adding a constant → unchanged.</td></tr>
  <tr><td>Sum 1…n</td><td>n(n + 1)/2</td></tr>
  <tr><td>Sequences</td><td>aₙ = a₁ + <strong>(n − 1)</strong>d</td></tr>
</table>

<h2>Quantitative Comparison: the four commandments</h2>
<ol>
  <li>Two specific numbers → <strong>(D) is impossible.</strong></li>
  <li>Two test cases, two different relationships → <strong>(D), immediately.</strong></li>
  <li>Test <strong>ZONE F</strong>: Zero, One, Negative, Extreme, Fraction.</li>
  <li><strong>Always test for equality.</strong> "Can be greater AND can be equal" = (D), not (A).</li>
</ol>

<h2>The traps that catch strong students</h2>
<ul>
  <li><strong>Answering the wrong question.</strong> They ask for xy; you solve for x; x is in the choices. <em>Underline what's asked.</em></li>
  <li><strong>Forgetting the negative root.</strong></li>
  <li><strong>Averaging averages</strong> when the groups differ in size.</li>
  <li><strong>Averaging speeds.</strong></li>
  <li><strong>Percent of vs. percent greater than.</strong></li>
  <li><strong>Figures not to scale.</strong> Never measure with your eyes.</li>
  <li><strong>Sentence Equivalence: picking one right word and one wrong one.</strong></li>
</ul>

<h2>The night before and the morning of</h2>
<ul>
  <li>No new material. Light review of <em>this</em> module and your error log.</li>
  <li>Sleep. It outperforms every additional practice set you could do.</li>
  <li>Eat something. It's a two-hour cognitive endurance test.</li>
  <li>Arrive early. Rushing raises your baseline stress before question 1.</li>
</ul>

<h2>During the test</h2>
<ol>
  <li><strong>Read what's asked.</strong> Then answer <em>that</em>.</li>
  <li><strong>Predict, then match.</strong></li>
  <li><strong>Never get stuck.</strong> Guess, mark, move.</li>
  <li><strong>No blanks.</strong> Ever.</li>
  <li><strong>Don't carry a question with you.</strong> It's gone. Next.</li>
</ol>

<h2>You're ready</h2>
<p>You've worked through test structure, vocabulary logic, sentence completion, reading, argument analysis,
arithmetic, number properties, algebra, word problems, geometry, statistics, data interpretation,
quantitative comparison, the essay, and test management.</p>
<p>Now take the mock exam. Whatever it surfaces, you'll know exactly which module to reread — and there's a
tutor mode and a missed-questions deck waiting for the gaps.</p>`,
  quiz: [
    { text: "If x² = 64, what are the possible values of x?",
      choices: ["8 only", "8 and −8", "−8 only", "0 and 8"],
      answer: 1,
      expl: "Even powers destroy sign information. Both 8 and −8 square to 64, and forgetting the negative root is one of the most costly recurring errors." },
    { text: "A GRE figure shows what appears to be a right angle, but it is not marked. What may you assume?",
      choices: [
        "That it is a right angle",
        "Nothing — figures are not drawn to scale unless stated",
        "That the figure is symmetric",
        "That the angle is 45°"],
      answer: 1,
      expl: "Unless a problem states otherwise, figures may be deliberately misleading. Only coordinate systems and number lines are guaranteed accurate." },
    { text: "In Quantitative Comparison, you find Quantity A can be greater than B, and in another case they are equal. What is the answer?",
      choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
      answer: 3,
      expl: "If more than one relationship is possible, the relationship is not fixed — the answer is (D). This is exactly why you must test for equality." },
    { text: "Which is the correct formula for the nth term of an arithmetic sequence?",
      choices: ["a₁ + nd", "a₁ + (n − 1)d", "a₁ × rⁿ", "n(n + 1)/2"],
      answer: 1,
      expl: "aₙ = a₁ + (n − 1)d. The off-by-one is the trap: from term 1 to term 10 there are only nine steps." },
    { text: "A question asks for the value of xy. You correctly find x = 4 and y = 3. What is the answer?",
      choices: ["4", "3", "12", "7"],
      answer: 2,
      expl: "xy = 12. Both 4 and 3 will appear among the choices — solving correctly and then answering the wrong question is the most common way strong students lose points." },
    { text: "Which two are true about Sentence Equivalence? (Select TWO.)",
      choices: [
        "The answer is always a pair of words producing equivalent sentences",
        "One correct word earns partial credit",
        "A synonym pair that doesn't fit the sentence is a deliberate trap",
        "You may select three answers if they all fit",
        "Only one answer is correct"],
      answer: [0, 2],
      expl: "Exactly two answers, both fitting the sentence and producing equivalent meaning — with no partial credit. The decoy synonym pair exists to catch people hunting for synonyms rather than reading the sentence." },
    { text: "P(at least one head) in three coin flips is best computed how?",
      choices: [
        "Add the probabilities of one, two, and three heads",
        "1 − P(no heads) = 1 − (1/2)³ = 7/8",
        "3 × (1/2) = 1.5",
        "(1/2)³ = 1/8"],
      answer: 1,
      expl: "'At least one' almost always means using the complement, which turns a messy enumeration into a single subtraction." },
    { text: "Which two errors most commonly cost prepared students points? (Select TWO.)",
      choices: [
        "Answering a different question than the one asked",
        "Not knowing enough advanced mathematics",
        "Forgetting the negative root of an even power",
        "Reading the passage too carefully",
        "Using the calculator too little"],
      answer: [0, 2],
      expl: "The GRE's math content is elementary; the losses come from carelessness — answering for x when xy was asked, and dropping the negative root." }
  ]
}
    ],

/* ================= CHECKPOINT 5 — FINAL READINESS ================= */
    checkpoint: {
      id: "gcp5", title: "Final Readiness Exam", n: 25,
      questions: [
        { text: "\"Although the evidence seemed ______, the researcher refused to draw a conclusion until further trials were run.\" The blank means:",
          choices: ["Inconclusive", "Compelling", "Fabricated", "Irrelevant"],
          answer: 1,
          expl: "'Although' signals contrast with the refusal to conclude. The evidence must have looked persuasive, yet she still held back." },
        { text: "A price rises 20% then falls 20%. It is now what percent of the original?",
          choices: ["100%", "96%", "104%", "80%"],
          answer: 1,
          expl: "1.20 × 0.80 = 0.96. Successive percent changes multiply; up-then-down by the same rate always lands below the start." },
        { text: "In QC, both quantities are specific numbers. Which choice is impossible?",
          choices: ["A is greater", "B is greater", "They are equal", "Cannot be determined"],
          answer: 3,
          expl: "Two known numbers always have a determinable relationship, so (D) is eliminable on sight." },
        { text: "Two sides of a triangle are 7 and 10. Which could be the third side?",
          choices: ["3", "5", "17", "18"],
          answer: 1,
          expl: "The third side satisfies 3 < s < 17 strictly. Only 5 qualifies; 3 and 17 are excluded boundaries." },
        { text: "Which two words mean 'to make worse'? (Select TWO.)",
          choices: ["Exacerbate", "Ameliorate", "Aggravate", "Venerate", "Elucidate"],
          answer: [0, 2],
          expl: "Exacerbate and aggravate both mean to worsen. Ameliorate improves, venerate honors, and elucidate clarifies." },
        { text: "The average of 6 numbers is 15. Five of them sum to 74. What is the sixth?",
          choices: ["16", "15", "14", "12"],
          answer: 0,
          expl: "The total must be 6 × 15 = 90, so the sixth is 90 − 74 = 16." },
        { text: "A committee of 3 is selected from 8 people. How many committees are possible?",
          choices: ["24", "56", "336", "512"],
          answer: 1,
          expl: "Order doesn't matter: C(8,3) = (8×7×6)/(3×2×1) = 56. The permutation 336 counts each committee six times." },
        { text: "An RC answer choice says the passage 'proves' something the passage merely 'suggests.' What is wrong?",
          choices: ["Nothing", "It overstates the passage's level of certainty", "It is too brief", "It is off topic"],
          answer: 1,
          expl: "Answer certainty must match passage certainty. Absolute language like 'proves' rarely survives a hedged academic passage." },
        { text: "Solve: 7 − 2x ≥ 15",
          choices: ["x ≥ −4", "x ≤ −4", "x ≥ 4", "x ≤ 4"],
          answer: 1,
          expl: "−2x ≥ 8; dividing by −2 flips the sign: x ≤ −4." },
        { text: "If 0 < x < 1, which is TRUE?",
          choices: ["x² > x", "x³ > x²", "x² < x", "x = x²"],
          answer: 2,
          expl: "Squaring a proper fraction shrinks it: 0.5² = 0.25 < 0.5." },
        { text: "How should you weaken the argument \"Nappers have less heart disease, so napping protects the heart\"?",
          choices: [
            "Point out that the study was small",
            "Show that a third factor, such as job stress, causes both",
            "Argue that heart disease is common",
            "Note that some nappers get heart disease"],
          answer: 1,
          expl: "A confounding variable explains the correlation without napping doing anything. Attacking the evidence itself is off-limits — premises are granted." },
        { text: "A square has area 50. What is its diagonal?",
          choices: ["10", "5√2", "25", "50"],
          answer: 0,
          expl: "Area = d²/2, so 50 = d²/2 gives d² = 100 and d = 10." },
        { text: "'Ubiquitous' most nearly means:",
          choices: ["Rare", "Present everywhere", "Ancient", "Ambiguous"],
          answer: 1,
          expl: "Ubiquitous means found everywhere at once — its pair for Sentence Equivalence is omnipresent." },
        { text: "Which two are true about the GRE's structure? (Select TWO.)",
          choices: [
            "Section 1 of each measure determines the difficulty of Section 2",
            "There is a penalty for wrong answers",
            "You may skip and return to questions within a section",
            "You may return to a previous section",
            "The essay is scored 0 to 10"],
          answer: [0, 2],
          expl: "The test is section-adaptive with full navigation inside a section. There is no wrong-answer penalty, sections can't be revisited, and the essay is scored 0–6." },
        { text: "What is the probability of drawing two blue marbles in a row without replacement from 3 red and 3 blue?",
          choices: ["1/4", "1/5", "1/3", "9/36"],
          answer: 1,
          expl: "(3/6) × (2/5) = 6/30 = 1/5. Update both numerator and denominator after the first draw." },
        { text: "The angles of a triangle are 45°, 60°, and 75°. Which side is longest?",
          choices: ["Opposite 45°", "Opposite 60°", "Opposite 75°", "All equal"],
          answer: 2,
          expl: "The largest angle faces the longest side — no computation required." },
        { text: "45 is what percent of 180?",
          choices: ["4%", "25%", "40%", "400%"],
          answer: 1,
          expl: "45/180 = 0.25 = 25%. 'A is what percent of B' means A ÷ B." },
        { text: "In an Issue essay, the strongest position is usually:",
          choices: [
            "Total agreement",
            "A qualified position that specifies when the claim holds and when it fails",
            "Total disagreement",
            "Refusing to take a position"],
          answer: 1,
          expl: "Qualified positions demonstrate the nuanced reasoning being scored and generate natural material for every paragraph." },
        { text: "What is the units digit of 2¹⁰⁰?",
          choices: ["2", "4", "6", "8"],
          answer: 2,
          expl: "Powers of 2 cycle 2, 4, 8, 6 (length 4). 100 ÷ 4 leaves remainder 0, meaning the last item in the cycle: 6." },
        { text: "Which two are Quantitative Comparison best practices? (Select TWO.)",
          choices: [
            "Test zero, one, a negative, a fraction, and a large value",
            "Always compute both quantities exactly",
            "Test whether the quantities can be equal",
            "Assume variables are positive integers",
            "Multiply both sides by a variable of unknown sign"],
          answer: [0, 2],
          expl: "ZONE F testing and checking for equality are what expose (D) answers. Assuming positivity or multiplying by an unknown-sign variable are both errors." },
        { text: "Machine A takes 3 hours, machine B takes 6 hours. Together?",
          choices: ["2 hours", "4.5 hours", "1.5 hours", "9 hours"],
          answer: 0,
          expl: "1/3 + 1/6 = 1/2 job per hour → 2 hours. Sanity check: it must beat the faster machine's 3 hours, and it does." },
        { text: "A class of 20 averages 90 and a class of 30 averages 70. The combined average is:",
          choices: ["80", "78", "76", "82"],
          answer: 1,
          expl: "(20×90 + 30×70)/50 = (1800 + 2100)/50 = 78. It is pulled toward the larger group. The naive 80 is the trap." },
        { text: "\"For all her reputation as a firebrand, the senator governed quite ______.\" The blank means:",
          choices: ["Radically", "Cautiously", "Loudly", "Briefly"],
          answer: 1,
          expl: "'For all her reputation as X' signals the reality is the opposite of X — her reputation was fiery, so her governance was cautious." },
        { text: "With 45 seconds left and four questions unanswered, what should you do?",
          choices: [
            "Solve one carefully and leave three blank",
            "Guess on all four",
            "Leave them all blank",
            "Review your marked questions"],
          answer: 1,
          expl: "There is no guessing penalty, so a blank is strictly worse than a guess. Fill in every question." },
        { text: "Which two errors most commonly cost prepared test-takers points? (Select TWO.)",
          choices: [
            "Solving for x when the question asked for xy",
            "Not knowing calculus",
            "Forgetting that x² = k has two roots",
            "Reading the passage",
            "Using the calculator"],
          answer: [0, 2],
          expl: "The GRE tests elementary content; the points are lost to carelessness — answering the wrong question and dropping the negative root." },
        { text: "In a normal distribution, roughly what percent of values lie within 2 standard deviations of the mean?",
          choices: ["68%", "95%", "99.7%", "50%"],
          answer: 1,
          expl: "About 68% fall within 1 SD, 95% within 2 SD, and 99.7% within 3 SD." },
        { text: "Which approach should you take on every Verbal question before reading the answer choices?",
          choices: [
            "Predict your own answer",
            "Count the choices",
            "Eliminate the longest choice",
            "Read the question twice"],
          answer: 0,
          expl: "Wrong answers are engineered to persuade. Arriving with your own prediction converts the task from being convinced into simple matching." }
      ]
    }
  });
})();
