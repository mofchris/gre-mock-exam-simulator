/* GRE Study Course — Unit 2: Reading and Argument */
(function () {
  const C = window.GRECOURSE = window.GRECOURSE || { units: [] };

  C.units.push({
    id: "u2",
    title: "Unit 2 — Reading and Argument",
    blurb: "Reading Comprehension is roughly half of Verbal. Learn to read for structure, kill the trap answers, and dismantle arguments.",
    modules: [

/* ================= MODULE 5 ================= */
{
  id: "gm2_1", title: "Reading Comprehension — Reading for Structure", minutes: 15, level: "core",
  content: `
<p>Reading Comprehension is about half of the Verbal section. Most people read GRE passages the way they'd
read a textbook — absorbing details. That's the wrong mode, and it's why they run out of time.</p>

<h2>Read for structure, not content</h2>
<div class="keybox"><p>You are not being tested on whether you learned the material. You're being tested on
whether you can <em>find and interpret</em> what the passage says. The passage stays on screen — you can
always go back for details.</p>
<p>So on the first read, don't memorize. Instead, answer two questions:</p>
<ul>
  <li><strong>What is the author's main point, and what's their attitude toward it?</strong></li>
  <li><strong>What does each paragraph DO?</strong> (Introduce a theory? Criticize it? Give evidence? Concede a point?)</li>
</ul></div>
<p>A paragraph's <em>function</em> matters more than its content. "Paragraph 2 presents an objection" is
more useful than remembering the objection's details — because when a question asks about the objection,
you know exactly where to look.</p>

<h2>The structural signals</h2>
<table>
  <tr><th>Signal</th><th>What's happening</th></tr>
  <tr><td>However, but, yet, nevertheless, on the other hand</td><td>A turn. The author is about to pivot. <strong>These sentences matter enormously.</strong></td></tr>
  <tr><td>Some argue… / It has been claimed… / Traditionally…</td><td>A view the author is likely about to <em>challenge</em>. Don't mistake it for the author's own view.</td></tr>
  <tr><td>Indeed, moreover, furthermore</td><td>More support for the same point. Skim faster here.</td></tr>
  <tr><td>Thus, therefore, in conclusion</td><td>The author's conclusion. Slow down.</td></tr>
  <tr><td>Admittedly, granted, to be sure</td><td>A concession — the author grants a point before rejecting it.</td></tr>
</table>
<div class="warnbox"><strong>The most common comprehension error:</strong> attributing to the author a view
the author is describing in order to attack it. When you see "Some scholars maintain that…", flag it as
<em>someone else's</em> position until proven otherwise.</div>

<h2>The question types</h2>
<table>
  <tr><th>Type</th><th>What it asks</th><th>Approach</th></tr>
  <tr><td><strong>Main idea / primary purpose</strong></td><td>What is the whole passage doing?</td><td>The answer must cover the <em>entire</em> passage, not one paragraph. Watch verbs: "argue," "describe," "refute," "qualify."</td></tr>
  <tr><td><strong>Detail</strong></td><td>What does the passage state?</td><td>Go back and find the line. Never answer from memory.</td></tr>
  <tr><td><strong>Inference</strong></td><td>What must be true, given the passage?</td><td>The answer must be <em>necessarily</em> true — not merely plausible.</td></tr>
  <tr><td><strong>Function / purpose of a detail</strong></td><td>Why did the author mention X?</td><td>Read the sentence <em>before and after</em> it. The function is almost always in the surrounding context.</td></tr>
  <tr><td><strong>Tone / attitude</strong></td><td>How does the author feel?</td><td>GRE authors are rarely extreme. "Cautious skepticism" beats "outraged condemnation."</td></tr>
  <tr><td><strong>Select-all-that-apply</strong></td><td>Which of these three are supported?</td><td>Evaluate each independently. The answer can be one, two, or all three.</td></tr>
</table>

<h2>How wrong answers are built (learn these and you'll gain points immediately)</h2>
<ol>
  <li><strong>Too extreme.</strong> Contains <em>always, never, all, none, must, proves, impossible</em>. GRE passages hedge; extreme answers are almost always wrong.</li>
  <li><strong>True but not asked.</strong> A perfectly accurate statement from the passage — that simply doesn't answer this question.</li>
  <li><strong>Half right.</strong> The first half is perfect; the second half adds something the passage never said. <em>Read the entire choice.</em></li>
  <li><strong>Out of scope.</strong> Requires outside knowledge or information the passage never provides.</li>
  <li><strong>Reversal.</strong> Says the opposite of the passage, often using the passage's own vocabulary.</li>
  <li><strong>Right answer, wrong part of the passage.</strong> Accurately describes paragraph 3 when the question was about paragraph 1.</li>
</ol>
<div class="exambox"><strong>The elimination habit:</strong> on hard RC questions, don't hunt for the right
answer — hunt for reasons each answer is <em>wrong</em>. Four of the five have a specific, findable flaw.
The one you can't eliminate is the answer.</div>

<h2>Pacing</h2>
<ul>
  <li><strong>Short passage (1 paragraph, 1–2 questions):</strong> ~1 min to read, ~1 min per question.</li>
  <li><strong>Long passage (3–5 paragraphs, 3–4 questions):</strong> 2.5–3 min to read for structure, ~1 min per question.</li>
  <li>Don't skip the passage to read questions first — you'll end up reading the passage three times.</li>
</ul>

<h2>What you must remember</h2>
<ul>
  <li>Read for the author's point and each paragraph's <em>function</em>. Details are lookups.</li>
  <li>"Some argue…" flags a view the author will probably attack. Don't misattribute it.</li>
  <li>Trap answers: too extreme, true-but-not-asked, half right, out of scope, reversal.</li>
  <li>Inference answers must be <em>necessarily</em> true, not just plausible.</li>
</ul>`,
  quiz: [
    { text: "On your first read of a GRE passage, what should you focus on?",
      choices: [
        "Memorizing every detail",
        "The author's main point and what each paragraph does",
        "The vocabulary words you don't know",
        "Reading as fast as possible without comprehension"],
      answer: 1,
      expl: "The passage stays on screen, so details are lookups. What you need from the first read is the author's argument and the structural role of each paragraph." },
    { text: "A passage says: \"Some scholars maintain that the treaty was a failure.\" What should you assume?",
      choices: [
        "This is the author's own view",
        "This is likely a view the author will challenge or qualify",
        "The treaty definitely failed",
        "The passage is about scholars"],
      answer: 1,
      expl: "'Some scholars maintain' introduces someone else's position, often precisely so the author can push back on it. Misattributing it to the author is the most common comprehension error." },
    { text: "An answer choice states that the passage 'proves that all early theories were wrong.' Why is this suspicious?",
      choices: [
        "It is too extreme — GRE passages rarely support absolutes like 'proves' and 'all'",
        "It is too long",
        "It uses vocabulary from the passage",
        "It mentions theories"],
      answer: 0,
      expl: "Extreme language (always, never, all, proves) rarely survives contact with a hedged academic passage. Such answers are usually eliminable on sight." },
    { text: "For an inference question, the correct answer must be:",
      choices: [
        "Plausible given the passage",
        "Necessarily true based on the passage",
        "Mentioned explicitly in the passage",
        "Consistent with outside knowledge"],
      answer: 1,
      expl: "Inference answers must follow necessarily from what the passage states. Merely plausible or reasonable-sounding statements are the trap." },
    { text: "An answer choice is entirely accurate according to the passage, but doesn't address what the question asked. This is which trap?",
      choices: ["Too extreme", "True but not asked", "Reversal", "Out of scope"],
      answer: 1,
      expl: "'True but not asked' is a favorite trap: a statement lifted accurately from the passage that simply doesn't answer the question posed." },
    { text: "Which two are effective Reading Comprehension strategies? (Select TWO.)",
      choices: [
        "Note what each paragraph does, not just what it says",
        "Answer detail questions from memory to save time",
        "Eliminate answers by finding the specific flaw in each",
        "Choose the answer with the most impressive vocabulary",
        "Read the questions before the passage every time"],
      answer: [0, 2],
      expl: "Structural reading tells you where to look, and systematic elimination exploits the fact that every wrong answer has a specific, findable flaw. Answering from memory is how careless errors happen." },
    { text: "In a select-all-that-apply question with three choices, how many can be correct?",
      choices: ["Exactly one", "Exactly two", "One, two, or all three", "At least two"],
      answer: 2,
      expl: "Each choice must be evaluated independently against the passage. Any number from one to three may be correct, and all must be selected to earn credit." }
  ]
},

/* ================= MODULE 6 ================= */
{
  id: "gm2_2", title: "Hard Reading Comprehension", minutes: 13, level: "advanced",
  content: `
<p>Hard RC questions are not harder to <em>read</em> — they're harder to <em>choose</em>. The passage is
comprehensible; it's the answer choices that are engineered to be nearly indistinguishable.</p>

<h2>Why hard questions feel impossible</h2>
<p>On an easy question, one answer is right and four are obviously wrong. On a hard question, <strong>two
answers look right</strong>. The difference between them is usually a single word — a quantifier, a
qualifier, or a shift in scope.</p>
<div class="keybox"><strong>When two answers survive, compare them word by word and find where they
diverge.</strong> The divergence is the question. One of them will overstate, understate, or subtly shift
what the passage claims.</div>

<h2>The words that decide hard questions</h2>
<table>
  <tr><th>Weak / defensible</th><th>Strong / usually wrong</th></tr>
  <tr><td>may, might, can, suggests, indicates, tends to</td><td>must, will, proves, demonstrates conclusively</td></tr>
  <tr><td>some, many, often, frequently</td><td>all, every, none, always, never</td></tr>
  <tr><td>contributed to, is associated with</td><td>caused, is solely responsible for</td></tr>
  <tr><td>qualifies, complicates, refines</td><td>refutes, overturns, disproves</td></tr>
</table>
<p>Match the answer's strength to the passage's strength. If the passage says a finding "suggests" a link,
an answer that says it "proves" a link is wrong — even though everything else about it is right.</p>

<h2>The "author's attitude" trap</h2>
<p>GRE authors are scholars. Their attitudes are almost always <strong>moderate and qualified</strong>:</p>
<ul>
  <li>Likely correct: "cautious skepticism," "qualified approval," "measured criticism," "scholarly detachment."</li>
  <li>Likely wrong: "unbridled enthusiasm," "outright contempt," "bitter denunciation," "total indifference."</li>
</ul>

<h2>Function questions: read around the detail, not the detail</h2>
<p>"The author mentions the 1892 census primarily in order to…" — the answer is almost never <em>about</em>
the census. It's about what the census <em>does for the argument</em>: support a claim, undercut a rival
theory, illustrate an exception.</p>
<p><strong>Method:</strong> find the detail, then read the sentence <em>before</em> it and the sentence
<em>after</em> it. The function is in the surrounding logic.</p>

<h2>Worked example</h2>
<div class="worked">
<p><em>"Dissent is epistemically valuable in proportion to its engagement with the evidence that grounds the
consensus; a dissenter who must explain away an ever-growing body of independent lines of evidence occupies
a progressively weaker position, however rhetorically effective the dissent may be."</em></p>
<p><strong>Question:</strong> The author suggests that the value of dissent depends on which of the
following?</p>
<p><strong>The key move:</strong> "however rhetorically effective the dissent may be" is a
<em>concede-and-dismiss</em>. The author grants that dissent can be persuasive — and explicitly says that
doesn't make it valuable. So any answer citing "rhetorical effectiveness" is wrong <em>because the passage
specifically excluded it</em>. The answer is engagement with the evidence.</p>
<p><strong>The lesson:</strong> phrases like "however," "regardless of," and "whatever its X" are the
author telling you what does <em>not</em> matter. That's a gift — it eliminates an answer choice.</p></div>

<h2>Strengthen / weaken inside RC</h2>
<p>Some RC questions ask what would <em>undermine</em> or <em>support</em> the author's claim. Treat these
like Critical Reasoning (next module): find the logical gap in the argument and look for an answer that
attacks or reinforces that gap — not one that merely disagrees with the conclusion.</p>

<h2>What you must remember</h2>
<ul>
  <li>When two answers survive, find the single word where they diverge. That word is the question.</li>
  <li>Match the answer's certainty to the passage's certainty. "Suggests" ≠ "proves."</li>
  <li>GRE author attitudes are moderate. Extreme tone answers are traps.</li>
  <li>"However X may be" tells you what does <em>not</em> matter — use it to eliminate.</li>
</ul>`,
  quiz: [
    { text: "On a hard RC question, two answer choices both seem correct. What should you do?",
      choices: [
        "Pick the longer one",
        "Compare them word by word to find where they diverge, then check that difference against the passage",
        "Pick the one with vocabulary from the passage",
        "Guess randomly between them"],
      answer: 1,
      expl: "Hard questions are decided by a single differing word — a quantifier or qualifier. Locating that divergence turns an impossible choice into a specific, checkable question." },
    { text: "The passage says a study 'suggests a link' between two variables. Which answer choice is MOST likely correct?",
      choices: [
        "The study proves the variables are causally related",
        "The study indicates a possible relationship between the variables",
        "The variables are always found together",
        "The study demonstrates that one variable causes the other"],
      answer: 1,
      expl: "The answer's certainty must match the passage's. 'Suggests' supports 'indicates a possible relationship,' not 'proves' or 'always.'" },
    { text: "Which author attitude is MOST likely to be correct on a GRE Reading Comprehension question?",
      choices: ["Unbridled enthusiasm", "Qualified approval", "Bitter contempt", "Total indifference"],
      answer: 1,
      expl: "GRE passages are academic and hedged. Moderate, qualified attitudes fit; extreme emotional stances are almost always traps." },
    { text: "A passage states: \"...however rhetorically effective the dissent may be.\" What does this construction tell you?",
      choices: [
        "Rhetorical effectiveness is the author's main criterion",
        "The author is explicitly saying rhetorical effectiveness does NOT determine the dissent's value",
        "The author admires effective rhetoric",
        "The passage is about public speaking"],
      answer: 1,
      expl: "'However X may be' is a concede-and-dismiss: the author grants X and then declares it irrelevant. Any answer relying on X is thereby eliminated." },
    { text: "A question asks why the author mentions a specific historical detail. Where is the answer usually found?",
      choices: [
        "In the detail itself",
        "In the sentences immediately before and after the detail",
        "In the final paragraph",
        "In the passage title"],
      answer: 1,
      expl: "Function questions ask what a detail DOES for the argument. That role is established by the surrounding logic, not by the detail's own content." },
    { text: "Which two words in an answer choice should make you suspicious? (Select TWO.)",
      choices: ["Proves", "Suggests", "Always", "Often", "May"],
      answer: [0, 2],
      expl: "Absolute language like 'proves' and 'always' rarely survives contact with a hedged academic passage. Softer words like suggests, often, and may are far more defensible." }
  ]
},

/* ================= MODULE 7 ================= */
{
  id: "gm2_3", title: "Critical Reasoning — Dismantling Arguments", minutes: 14, level: "core",
  content: `
<p>Critical Reasoning questions give you a short argument and ask you to strengthen it, weaken it, find its
assumption, or identify its flaw. The whole game is finding <strong>the gap</strong>.</p>

<h2>Anatomy of an argument</h2>
<p>Every argument has two parts:</p>
<ul>
  <li><strong>Evidence (premises)</strong> — the facts offered. <em>You must accept these as true.</em></li>
  <li><strong>Conclusion</strong> — what the author claims follows from the evidence.</li>
</ul>
<p>Between them sits <strong>the gap</strong>: the unstated assumption that must be true for the evidence
to actually support the conclusion. <strong>Every CR question is about that gap.</strong></p>
<div class="keybox"><strong>Find the conclusion first.</strong> It's often signaled by <em>therefore, thus,
clearly, so, it follows that</em> — but sometimes it's the first sentence. Ask: "what is this person trying
to convince me of?" Everything else is evidence.</div>

<h2>The three gaps that appear over and over</h2>

<h3>1. Correlation treated as causation</h3>
<p><em>"People who nap have less heart disease. Therefore napping protects the heart."</em></p>
<p><strong>The gap:</strong> maybe something else causes both. To <strong>weaken</strong>: supply an
alternative cause. <em>"People with stressful jobs both nap less and have more heart disease."</em> Now
stress explains everything, and napping does nothing.</p>
<p>To <strong>strengthen</strong>: rule out alternatives, or show the effect tracks the cause.</p>

<h3>2. Unrepresentative sample / selection bias</h3>
<p><em>"Employees who attended the optional training wrote fewer bugs. So we'll make it mandatory for everyone."</em></p>
<p><strong>The gap:</strong> the people who <em>chose</em> to attend were already the most motivated. The
training may have done nothing; the motivation did. Forcing everyone to attend transfers the training, not
the motivation.</p>
<p>Watch for: volunteers, self-selected groups, surveys with low response rates, hospitals that receive the
sickest patients.</p>

<h3>3. Missing information / something changed</h3>
<p><em>"Pollen shows the region was dry grassland when the settlement was founded, and their crops needed
rain — so they must have irrigated."</em></p>
<p><strong>The gap:</strong> the pollen describes conditions <em>at founding</em>; the farming happened
later. If rainfall increased in between, no irrigation was needed. The argument assumes nothing changed.</p>

<h2>Question types and what they want</h2>
<table>
  <tr><th>Question</th><th>What the answer does</th></tr>
  <tr><td><strong>Weaken</strong></td><td>Attacks the gap. Supplies an alternative explanation, or shows the assumption fails.</td></tr>
  <tr><td><strong>Strengthen</strong></td><td>Closes the gap. Rules out alternatives, or confirms the assumption.</td></tr>
  <tr><td><strong>Assumption</strong></td><td>States the gap itself — something that <em>must</em> be true for the argument to work.</td></tr>
  <tr><td><strong>Flaw</strong></td><td>Names the gap as an error in reasoning.</td></tr>
  <tr><td><strong>Inference / must be true</strong></td><td>Follows necessarily from the premises. (Note: here you're <em>not</em> looking for a gap — just what the facts guarantee.)</td></tr>
</table>

<h2>The mistakes that cost points</h2>
<ul>
  <li><strong>Attacking the evidence.</strong> "The study was too small" is almost never the answer. You must accept the premises as true; you attack the <em>link</em> to the conclusion.</li>
  <li><strong>Choosing something merely relevant.</strong> An answer can be about the topic, be true, and still not affect the argument. Ask: "does this make the conclusion more or less likely?"</li>
  <li><strong>Answering a different question.</strong> Weaken questions have strengthen-answers among the choices, and vice versa. Read the question stem twice.</li>
</ul>
<div class="exambox"><strong>The negation test for assumption questions:</strong> negate the answer choice.
If the argument <em>collapses</em>, that was the assumption. If the argument survives, it wasn't.</div>

<h2>Worked example</h2>
<div class="worked">
<p><em>"Hospitals that perform the most heart surgeries have the highest mortality rates for that surgery.
Therefore patients should avoid high-volume hospitals."</em></p>
<p><strong>Conclusion:</strong> avoid high-volume hospitals. <strong>Evidence:</strong> they have higher
mortality.</p>
<p><strong>The gap:</strong> it assumes the patients at those hospitals are comparable. But
<em>the sickest, highest-risk cases are referred to high-volume hospitals precisely because they have the
most expertise.</em> Their mortality is higher because their patients are sicker — and they may in fact be
the best place to go.</p>
<p>Whenever two groups produce different outcomes, ask: <strong>are the groups actually comparable, or do
they differ in composition?</strong></p></div>

<h2>What you must remember</h2>
<ul>
  <li>Find the conclusion, find the evidence, and the gap between them is the question.</li>
  <li>The three classic gaps: correlation ≠ causation, unrepresentative sample, something changed.</li>
  <li>Never attack the evidence — attack the link.</li>
  <li>Assumption questions: use the negation test.</li>
</ul>`,
  quiz: [
    { text: "In a Critical Reasoning argument, what must you treat as true?",
      choices: [
        "The conclusion",
        "The evidence (premises)",
        "Both the evidence and the conclusion",
        "Neither"],
      answer: 1,
      expl: "Premises are granted as true. The argument's vulnerability lies in the leap from those premises to the conclusion — that gap is what you attack or defend." },
    { text: "\"People who nap have lower rates of heart disease, so napping protects the heart.\" Which answer MOST weakens this?",
      choices: [
        "Some nappers still develop heart disease",
        "People with high-stress jobs both nap less and independently have more heart disease",
        "The study lasted ten years",
        "Naps are typically 30 minutes long"],
      answer: 1,
      expl: "This supplies a confounding variable — stress — that explains both the napping and the heart disease, undermining the claim that napping is doing the work." },
    { text: "A company found that employees who chose to attend an optional training wrote fewer bugs, and plans to make it mandatory. What is the flaw?",
      choices: [
        "The employees who volunteered were likely already the most motivated, so the training may not be what caused the improvement",
        "The training was too expensive",
        "Bugs are hard to count",
        "Not all employees write code"],
      answer: 0,
      expl: "This is selection bias. Voluntary participation means the group self-selected for motivation, so the results cannot be assumed to transfer when attendance is forced." },
    { text: "Which is almost NEVER the correct way to weaken an argument?",
      choices: [
        "Providing an alternative explanation",
        "Attacking the truth of the evidence",
        "Showing the assumption fails",
        "Demonstrating that the groups compared are not comparable"],
      answer: 1,
      expl: "The premises are granted. Answers that dispute the facts themselves miss the point — the flaw always lies in the reasoning from those facts to the conclusion." },
    { text: "What is the negation test used for?",
      choices: [
        "Weaken questions",
        "Assumption questions — negate the choice and see whether the argument collapses",
        "Inference questions",
        "Main idea questions"],
      answer: 1,
      expl: "If negating a choice destroys the argument, that choice was a necessary assumption. If the argument survives the negation, it wasn't." },
    { text: "Hospitals performing the most heart surgeries have the highest mortality rates for that surgery. Which fact most undermines the conclusion that patients should avoid them?",
      choices: [
        "The highest-risk cases are systematically referred to those hospitals because of their expertise",
        "Those hospitals are more expensive",
        "Heart surgery is dangerous everywhere",
        "Some low-volume hospitals are rural"],
      answer: 0,
      expl: "If the sickest patients are funneled to high-volume hospitals, their higher mortality reflects case mix rather than worse care — the groups being compared are not comparable." },
    { text: "Which two are classic argument gaps the GRE tests? (Select TWO.)",
      choices: [
        "Treating a correlation as if it were causation",
        "Using numbers in the evidence",
        "Drawing a conclusion from an unrepresentative or self-selected sample",
        "Quoting an expert",
        "Using more than one premise"],
      answer: [0, 2],
      expl: "Correlation-as-causation and unrepresentative samples are the two most frequently tested reasoning gaps, alongside arguments that assume nothing changed between the evidence and the conclusion." }
  ]
}
    ],

/* ================= CHECKPOINT 2 (cumulative) ================= */
    checkpoint: {
      id: "gcp2", title: "Verbal Reasoning", n: 16,
      questions: [
        { text: "An RC answer choice says the passage 'proves' a claim, but the passage says the evidence 'suggests' it. What is wrong with the choice?",
          choices: ["Nothing — they mean the same", "It overstates the passage's certainty", "It is too short", "It uses the wrong tense"],
          answer: 1,
          expl: "Answer certainty must match passage certainty. 'Suggests' cannot support 'proves.'" },
        { text: "In Critical Reasoning, what is 'the gap'?",
          choices: [
            "The unstated assumption connecting the evidence to the conclusion",
            "A missing premise the author forgot to write",
            "The space between paragraphs",
            "A factual error in the evidence"],
          answer: 0,
          expl: "The gap is what must be true for the evidence to support the conclusion. Strengthen, weaken, assumption, and flaw questions all target it." },
        { text: "\"Some historians contend that the reforms were superficial.\" What should you assume about this sentence?",
          choices: [
            "It is the author's view",
            "It is likely a view the author will complicate or challenge",
            "The reforms were definitely superficial",
            "The passage is about historians"],
          answer: 1,
          expl: "Attributing views introduced as someone else's to the author is the most common RC error. Such statements are usually set up to be challenged." },
        { text: "How many of three choices can be correct on a select-all-that-apply RC question?",
          choices: ["Exactly one", "Exactly two", "One, two, or all three", "None"],
          answer: 2,
          expl: "Each choice is judged independently, so any number can be correct — and all correct ones must be selected for credit." },
        { text: "Which two words mean 'to belittle or criticize'? (Select TWO.)",
          choices: ["Disparage", "Venerate", "Denigrate", "Laud", "Ameliorate"],
          answer: [0, 2],
          expl: "Disparage and denigrate both mean to belittle. Venerate and laud mean to praise, and ameliorate means to improve." },
        { text: "On Sentence Equivalence, you must select:",
          choices: ["One answer", "Exactly two answers that produce sentences alike in meaning", "Any two answers that fit", "Three answers"],
          answer: 1,
          expl: "Two answers that both fit the sentence AND produce equivalent sentences. No partial credit." },
        { text: "\"Although the evidence was ______, the jury convicted on inference rather than direct proof.\" Which word fits?",
          choices: ["Overwhelming", "Circumstantial", "Fabricated", "Direct"],
          answer: 1,
          expl: "Conviction by inference rather than direct proof describes circumstantial evidence — evidence that supports inference rather than establishing a fact directly." },
        { text: "Which is the BEST way to attack a causal argument?",
          choices: [
            "Show the evidence is false",
            "Provide an alternative explanation for the same outcome",
            "Point out the argument is short",
            "Note that the author is not an expert"],
          answer: 1,
          expl: "Causal claims are vulnerable to alternative explanations. Attacking the truth of the premises is off-limits — they're granted." },
        { text: "A GRE author's attitude is MOST likely to be described as:",
          choices: ["Vehement outrage", "Measured skepticism", "Complete indifference", "Unqualified enthusiasm"],
          answer: 1,
          expl: "Academic passages hedge. Moderate, qualified attitudes are the norm; extreme emotional stances are traps." },
        { text: "\"For all his reputation as a radical, the politician governed quite ______.\" The blank means:",
          choices: ["Radically", "Conservatively", "Loudly", "Briefly"],
          answer: 1,
          expl: "'For all his reputation as X' signals the reality is the opposite of X. His reputation was radical, so his governance was conservative." },
        { text: "Which two are traps in RC answer choices? (Select TWO.)",
          choices: [
            "Statements that are true but do not answer the question asked",
            "Statements that hedge with 'may' or 'suggests'",
            "Statements whose first half is right and second half adds something never stated",
            "Statements that paraphrase the passage",
            "Statements that use moderate language"],
          answer: [0, 2],
          expl: "'True but not asked' and 'half right' are two of the most common wrong-answer constructions. Hedged, moderate paraphrases are usually the correct answers." },
        { text: "'Intransigent' most nearly means:",
          choices: ["Flexible", "Refusing to compromise", "Temporary", "Talkative"],
          answer: 1,
          expl: "Intransigent describes an unyielding refusal to compromise, like obdurate and obstinate." },
        { text: "Which question type asks what MUST be true given the premises, rather than looking for a gap?",
          choices: ["Weaken", "Strengthen", "Inference / must be true", "Flaw"],
          answer: 2,
          expl: "Inference questions ask what the premises guarantee. Unlike strengthen/weaken/assumption questions, you're not hunting for a logical gap — you're finding what necessarily follows." },
        { text: "A passage says results 'may indicate' a trend. Which answer is safest?",
          choices: [
            "The results definitively establish the trend",
            "The results are consistent with a possible trend",
            "The trend always occurs",
            "The trend never occurs"],
          answer: 1,
          expl: "Match the hedge. 'May indicate' supports 'consistent with a possible trend,' not definitive or absolute claims." },
        { text: "Which two words mean 'short-lived'? (Select TWO.)",
          choices: ["Ephemeral", "Ubiquitous", "Transient", "Prosaic", "Candid"],
          answer: [0, 2],
          expl: "Ephemeral and transient both describe things that last only briefly, forming a valid equivalence pair." },
        { text: "Why should you predict an answer before reading the choices?",
          choices: [
            "It saves time on easy questions only",
            "Wrong answers are engineered to be persuasive; a prediction means you match rather than get persuaded",
            "The GRE requires it",
            "It helps you memorize vocabulary"],
          answer: 1,
          expl: "Trap answers are designed to seduce. Arriving with your own answer converts the task from being convinced into simple matching." },
        { text: "\"The committee's report was notable for its ______; rather than assigning blame, it catalogued every party's failures, including its own.\" The blank means:",
          choices: ["Partiality", "Impartiality", "Brevity", "Vindictiveness"],
          answer: 1,
          expl: "Cataloguing every party's failures, including one's own, without assigning blame is the definition of impartiality." }
      ]
    }
  });
})();
