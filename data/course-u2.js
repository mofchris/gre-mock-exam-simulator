/* GRE Study Course - Unit 2: Reading and Argument */
(function () {
  const C = window.GRECOURSE = window.GRECOURSE || { units: [] };

  C.units.push({
    id: "u2",
    title: "Unit 2: Reading and Argument",
    blurb: "Reading Comprehension is roughly half of Verbal. Learn to read for structure, kill the trap answers, and dismantle arguments.",
    modules: [

/* ================= MODULE 5 ================= */
{
  id: "gm2_1", title: "Reading Comprehension, Reading for Structure", minutes: 15, level: "core",
  content: `
<p>Reading Comprehension is about half of the Verbal section. Most people read GRE passages the way they'd
read a textbook: absorbing details. That's the wrong mode, and it's why they run out of time.</p>

<h2>Read for structure, not content</h2>
<div class="keybox"><p>You are not being tested on whether you learned the material. You're being tested on
whether you can <em>find and interpret</em> what the passage says. The passage stays on screen. You can
always go back for details.</p>
<p>So on the first read, don't memorize. Instead, answer two questions:</p>
<ul>
  <li><strong>What is the author's main point, and what's their attitude toward it?</strong></li>
  <li><strong>What does each paragraph DO?</strong> (Introduce a theory? Criticize it? Give evidence? Concede a point?)</li>
</ul></div>
<p>A paragraph's <em>function</em> matters more than its content. "Paragraph 2 presents an objection" is
more useful than remembering the objection's details, because when a question asks about the objection,
you know exactly where to look.</p>

<h2>The structural signals</h2>
<table>
  <tr><th>Signal</th><th>What's happening</th></tr>
  <tr><td>However, but, yet, nevertheless, on the other hand</td><td>A turn. The author is about to pivot. <strong>These sentences matter enormously.</strong></td></tr>
  <tr><td>Some argue… / It has been claimed… / Traditionally…</td><td>A view the author is likely about to <em>challenge</em>. Don't mistake it for the author's own view.</td></tr>
  <tr><td>Indeed, moreover, furthermore</td><td>More support for the same point. Skim faster here.</td></tr>
  <tr><td>Thus, therefore, in conclusion</td><td>The author's conclusion. Slow down.</td></tr>
  <tr><td>Admittedly, granted, to be sure</td><td>A concession: the author grants a point before rejecting it.</td></tr>
</table>
<div class="warnbox"><strong>The most common comprehension error:</strong> attributing to the author a view
the author is describing in order to attack it. When you see "Some scholars maintain that…", flag it as
<em>someone else's</em> position until proven otherwise.</div>

<h2>The question types</h2>
<table>
  <tr><th>Type</th><th>What it asks</th><th>Approach</th></tr>
  <tr><td><strong>Main idea / primary purpose</strong></td><td>What is the whole passage doing?</td><td>The answer must cover the <em>entire</em> passage, not one paragraph. Watch verbs: "argue," "describe," "refute," "qualify."</td></tr>
  <tr><td><strong>Detail</strong></td><td>What does the passage state?</td><td>Go back and find the line. Never answer from memory.</td></tr>
  <tr><td><strong>Inference</strong></td><td>What must be true, given the passage?</td><td>The answer must be <em>necessarily</em> true, not merely plausible.</td></tr>
  <tr><td><strong>Function / purpose of a detail</strong></td><td>Why did the author mention X?</td><td>Read the sentence <em>before and after</em> it. The function is almost always in the surrounding context.</td></tr>
  <tr><td><strong>Tone / attitude</strong></td><td>How does the author feel?</td><td>GRE authors are rarely extreme. "Cautious skepticism" beats "outraged condemnation."</td></tr>
  <tr><td><strong>Select-all-that-apply</strong></td><td>Which of these three are supported?</td><td>Evaluate each independently. The answer can be one, two, or all three.</td></tr>
</table>

<h2>How wrong answers are built (learn these and you'll gain points immediately)</h2>
<ol>
  <li><strong>Too extreme.</strong> Contains <em>always, never, all, none, must, proves, impossible</em>. GRE passages hedge; extreme answers are almost always wrong.</li>
  <li><strong>True but not asked.</strong> A perfectly accurate statement from the passage. That simply doesn't answer this question.</li>
  <li><strong>Half right.</strong> The first half is perfect; the second half adds something the passage never said. <em>Read the entire choice.</em></li>
  <li><strong>Out of scope.</strong> Requires outside knowledge or information the passage never provides.</li>
  <li><strong>Reversal.</strong> Says the opposite of the passage, often using the passage's own vocabulary.</li>
  <li><strong>Right answer, wrong part of the passage.</strong> Accurately describes paragraph 3 when the question was about paragraph 1.</li>
</ol>
<div class="exambox"><strong>The elimination habit:</strong> on hard RC questions, don't hunt for the right
answer: hunt for reasons each answer is <em>wrong</em>. Four of the five have a specific, findable flaw.
The one you can't eliminate is the answer.</div>

<h2>Pacing</h2>
<ul>
  <li><strong>Short passage (1 paragraph, 1–2 questions):</strong> ~1 min to read, ~1 min per question.</li>
  <li><strong>Long passage (3–5 paragraphs, 3–4 questions):</strong> 2.5–3 min to read for structure, ~1 min per question.</li>
  <li>Don't skip the passage to read questions first. You'll end up reading the passage three times.</li>
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
      expl: "The passage never leaves the screen, so decide what is actually worth extracting on pass one.<br>Details are lookups: you can reread a line in five seconds.<br>What you cannot look up later is shape, the author's claim and the job each paragraph does.<br>So read for <strong>the author's main point and what each paragraph does</strong>.<br><em>The trap:</em> memorizing every detail feels responsible, but it burns the clock on information the screen is already holding for you.<br><em>Fast method:</em> The first read builds a map, not a memory: point plus paragraph function. Target: ~10 seconds." },
    { text: "A passage says: \"Some scholars maintain that the treaty was a failure.\" What should you assume?",
      choices: [
        "This is the author's own view",
        "This is likely a view the author will challenge or qualify",
        "The treaty definitely failed",
        "The passage is about scholars"],
      answer: 1,
      expl: "Attribution language is a structural signal, so ask who is talking.<br>'Some scholars maintain' hands the claim to other people, not to the author.<br>Passages introduce borrowed views precisely so the author can push back on them.<br>So assume this is <strong>likely a view the author will challenge or qualify</strong> until the passage says otherwise.<br><em>The trap:</em> hearing it as the author's own view, the single most common comprehension error.<br><em>Fast method:</em> 'Some argue / it has been claimed / traditionally' marks someone else's position, pending contradiction. Target: ~10 seconds." },
    { text: "An answer choice states that the passage 'proves that all early theories were wrong.' Why is this suspicious?",
      choices: [
        "It is too extreme: GRE passages rarely support absolutes like 'proves' and 'all'",
        "It is too long",
        "It uses vocabulary from the passage",
        "It mentions theories"],
      answer: 0,
      expl: "Test the choice's strength before you test its content.<br>'Proves' and 'all' are absolutes; academic passages hedge with suggests, many, tends to.<br>A hedged passage cannot support an unhedged claim, however reasonable the topic sounds.<br>So the choice is suspicious because <strong>it is too extreme</strong>.<br><em>The trap:</em> borrowing the passage's own vocabulary makes a choice feel verified; reused words are not evidence, and length is irrelevant.<br><em>Fast method:</em> Scan for always, never, all, none, must, proves, and demand matching force in the passage. Target: ~10 seconds." },
    { text: "For an inference question, the correct answer must be:",
      choices: [
        "Plausible given the passage",
        "Necessarily true based on the passage",
        "Mentioned explicitly in the passage",
        "Consistent with outside knowledge"],
      answer: 1,
      expl: "Inference has a narrower meaning on the GRE than in ordinary speech.<br>You are asked what the passage <em>guarantees</em>, not what it makes reasonable.<br>Explicitly stated goes too far the other way: that describes a detail question.<br>So the correct answer must be <strong>necessarily true based on the passage</strong>.<br><em>The trap:</em> the merely plausible choice, which sounds sensible and may well be true in the world, but is not forced by these lines.<br><em>Fast method:</em> Ask whether the passage could be true while the choice is false; if yes, eliminate. Target: ~10 seconds." },
    { text: "An answer choice is entirely accurate according to the passage, but doesn't address what the question asked. This is which trap?",
      choices: ["Too extreme", "True but not asked", "Reversal", "Out of scope"],
      answer: 1,
      expl: "Match the description against the taxonomy of wrong answers.<br>The choice is accurate, so it is not a reversal, and it comes from the passage, so it is not out of scope.<br>It contains no absolutes, so it is not too extreme.<br>The only defect is relevance to the stem: <strong>true but not asked</strong>.<br><em>The trap:</em> checking a choice against the passage and stopping there. A choice must also answer the question that was posed.<br><em>Fast method:</em> Every choice needs two checks, is it true and is it responsive. Target: ~10 seconds." },
    { text: "Which two are effective Reading Comprehension strategies? (Select TWO.)",
      choices: [
        "Note what each paragraph does, not just what it says",
        "Answer detail questions from memory to save time",
        "Eliminate answers by finding the specific flaw in each",
        "Choose the answer with the most impressive vocabulary",
        "Read the questions before the passage every time"],
      answer: [0, 2],
      expl: "Judge each strategy by whether it saves time without costing accuracy.<br>Noting <strong>what each paragraph does</strong> gives you a map, so later questions become quick lookups instead of rereads.<br><strong>Eliminating by finding each choice's specific flaw</strong> exploits the fact that every wrong answer contains a findable defect.<br><em>The trap:</em> answering detail questions from memory feels fast and is where careless errors come from, since the passage is still on screen.<br>Impressive vocabulary is bait, and reading questions first means reading the passage twice.<br><em>Fast method:</em> Map first, eliminate second, never answer from memory. Target: ~20 seconds." },
    { text: "In a select-all-that-apply question with three choices, how many can be correct?",
      choices: ["Exactly one", "Exactly two", "One, two, or all three", "At least two"],
      answer: 2,
      expl: "The format itself settles this.<br>Select-all-that-apply offers three statements and asks which the passage supports.<br>Each statement is judged independently against the passage; nothing links them to each other.<br>So the count can be <strong>one, two, or all three</strong>.<br><em>The trap:</em> importing the exactly-two rule from Sentence Equivalence, a different question type with a different constraint.<br>Credit is all or nothing, so a missed supported statement costs the whole question.<br><em>Fast method:</em> Treat each of the three as its own true/false question. Target: ~10 seconds." }
  ]
},

/* ================= MODULE 6 ================= */
{
  id: "gm2_2", title: "Hard Reading Comprehension", minutes: 13, level: "advanced",
  content: `
<p>Hard RC questions are not harder to <em>read</em>: they're harder to <em>choose</em>. The passage is
comprehensible; it's the answer choices that are engineered to be nearly indistinguishable.</p>

<h2>Why hard questions feel impossible</h2>
<p>On an easy question, one answer is right and four are obviously wrong. On a hard question, <strong>two
answers look right</strong>. The difference between them is usually a single word: a quantifier, a
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
an answer that says it "proves" a link is wrong, even though everything else about it is right.</p>

<h2>The "author's attitude" trap</h2>
<p>GRE authors are scholars. Their attitudes are almost always <strong>moderate and qualified</strong>:</p>
<ul>
  <li>Likely correct: "cautious skepticism," "qualified approval," "measured criticism," "scholarly detachment."</li>
  <li>Likely wrong: "unbridled enthusiasm," "outright contempt," "bitter denunciation," "total indifference."</li>
</ul>

<h2>Function questions: read around the detail, not the detail</h2>
<p>"The author mentions the 1892 census primarily in order to…". The answer is almost never <em>about</em>
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
<em>concede-and-dismiss</em>. The author grants that dissent can be persuasive, and explicitly says that
doesn't make it valuable. So any answer citing "rhetorical effectiveness" is wrong <em>because the passage
specifically excluded it</em>. The answer is engagement with the evidence.</p>
<p><strong>The lesson:</strong> phrases like "however," "regardless of," and "whatever its X" are the
author telling you what does <em>not</em> matter. That's a gift. It eliminates an answer choice.</p></div>

<h2>Strengthen / weaken inside RC</h2>
<p>Some RC questions ask what would <em>undermine</em> or <em>support</em> the author's claim. Treat these
like Critical Reasoning (next module): find the logical gap in the argument and look for an answer that
attacks or reinforces that gap, not one that merely disagrees with the conclusion.</p>

<h2>What you must remember</h2>
<ul>
  <li>When two answers survive, find the single word where they diverge. That word is the question.</li>
  <li>Match the answer's certainty to the passage's certainty. "Suggests" ≠ "proves."</li>
  <li>GRE author attitudes are moderate. Extreme tone answers are traps.</li>
  <li>"However X may be" tells you what does <em>not</em> matter: use it to eliminate.</li>
</ul>`,
  quiz: [
    { text: "On a hard RC question, two answer choices both seem correct. What should you do?",
      choices: [
        "Pick the longer one",
        "Compare them word by word to find where they diverge, then check that difference against the passage",
        "Pick the one with vocabulary from the passage",
        "Guess randomly between them"],
      answer: 1,
      expl: "When two choices both survive, the passage has already killed one; you just have not found where.<br>Hard RC answers are built as near-twins that agree on everything but one word.<br>That word is a quantifier, a qualifier, or a shift in scope.<br>So <strong>compare them word by word and check the divergence against the passage</strong>.<br><em>The trap:</em> picking the longer choice, or the one echoing passage vocabulary. Both are engineered to feel authoritative.<br><em>Fast method:</em> Two survivors means find the one differing word; that word is the real question. Target: ~15 seconds." },
    { text: "The passage says a study 'suggests a link' between two variables. Which answer choice is MOST likely correct?",
      choices: [
        "The study proves the variables are causally related",
        "The study indicates a possible relationship between the variables",
        "The variables are always found together",
        "The study demonstrates that one variable causes the other"],
      answer: 1,
      expl: "Read the passage's verb, then demand the same force from the answer.<br>'Suggests a link' is hedged and says nothing about causation.<br>So the credited choice is <strong>indicates a possible relationship</strong>, which matches both the hedge and the scope.<br><em>The trap:</em> the two causal choices, proving a causal relation and showing one variable causes the other, quietly upgrade a mere link into causation.<br>'Always found together' swaps the hedge for an absolute.<br><em>Fast method:</em> Answer certainty must equal passage certainty; suggests never licenses proves. Target: ~15 seconds." },
    { text: "Which author attitude is MOST likely to be correct on a GRE Reading Comprehension question?",
      choices: ["Unbridled enthusiasm", "Qualified approval", "Bitter contempt", "Total indifference"],
      answer: 1,
      expl: "Ask what kind of writer produces GRE passages.<br>They are scholars writing hedged academic prose, so the stance on the page is moderate and reasoned.<br>Emotional extremes do not survive that register.<br>So <strong>qualified approval</strong> is the plausible attitude.<br><em>The trap:</em> unbridled enthusiasm and bitter contempt feel decisive and therefore feel like real answers; total indifference fails too, since an indifferent author would not have written the passage.<br><em>Fast method:</em> On tone questions, keep the temperate choice and cut the loud ones. Target: ~10 seconds." },
    { text: "A passage states: \"...however rhetorically effective the dissent may be.\" What does this construction tell you?",
      choices: [
        "Rhetorical effectiveness is the author's main criterion",
        "The author is explicitly saying rhetorical effectiveness does NOT determine the dissent's value",
        "The author admires effective rhetoric",
        "The passage is about public speaking"],
      answer: 1,
      expl: "Parse the construction, not the topic.<br>'However X may be' concedes X and then sets it aside.<br>The author grants that dissent can be persuasive, then keeps its value tied to something else entirely.<br>So the phrase tells you <strong>rhetorical effectiveness does NOT determine the dissent's value</strong>.<br><em>The trap:</em> treating the conceded item as the author's criterion, a reversal that works because the phrase mentions rhetoric so prominently.<br><em>Fast method:</em> 'However / regardless of / whatever its X' marks what does not matter; use it to eliminate. Target: ~15 seconds." },
    { text: "A question asks why the author mentions a specific historical detail. Where is the answer usually found?",
      choices: [
        "In the detail itself",
        "In the sentences immediately before and after the detail",
        "In the final paragraph",
        "In the passage title"],
      answer: 1,
      expl: "A function question asks what a detail does, not what it is.<br>A date or a census figure carries no argumentative role on its own.<br>Its role comes from the claim it is attached to: supporting it, undercutting a rival, illustrating an exception.<br>That claim sits in <strong>the sentences immediately before and after the detail</strong>.<br><em>The trap:</em> rereading the detail itself, which yields content and no purpose; the final paragraph is the right-answer-wrong-location version of the same mistake.<br><em>Fast method:</em> Find the detail, then read one sentence up and one down for its job. Target: ~15 seconds." },
    { text: "Which two words in an answer choice should make you suspicious? (Select TWO.)",
      choices: ["Proves", "Suggests", "Always", "Often", "May"],
      answer: [0, 2],
      expl: "Sort the five words by how much they commit to.<br><strong>Proves</strong> claims conclusive demonstration; <strong>always</strong> claims universality with no exceptions.<br>A hedged academic passage supports neither, so both should draw suspicion.<br>Suggests, often, and may are weak claims that such a passage can actually back.<br><em>The trap:</em> assuming forceful language signals a strong answer. On the GRE, force is a liability the passage has to earn.<br><em>Fast method:</em> Flag absolutes and conclusive verbs; keep the hedges. Target: ~10 seconds." }
  ]
},

/* ================= MODULE 7 ================= */
{
  id: "gm2_3", title: "Critical Reasoning, Dismantling Arguments", minutes: 14, level: "core",
  content: `
<p>Critical Reasoning questions give you a short argument and ask you to strengthen it, weaken it, find its
assumption, or identify its flaw. The whole game is finding <strong>the gap</strong>.</p>

<h2>Anatomy of an argument</h2>
<p>Every argument has two parts:</p>
<ul>
  <li><strong>Evidence (premises)</strong>: the facts offered. <em>You must accept these as true.</em></li>
  <li><strong>Conclusion</strong>: what the author claims follows from the evidence.</li>
</ul>
<p>Between them sits <strong>the gap</strong>: the unstated assumption that must be true for the evidence
to actually support the conclusion. <strong>Every CR question is about that gap.</strong></p>
<div class="keybox"><strong>Find the conclusion first.</strong> It's often signaled by <em>therefore, thus,
clearly, so, it follows that</em>, but sometimes it's the first sentence. Ask: "what is this person trying
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
rain, so they must have irrigated."</em></p>
<p><strong>The gap:</strong> the pollen describes conditions <em>at founding</em>; the farming happened
later. If rainfall increased in between, no irrigation was needed. The argument assumes nothing changed.</p>

<h2>Question types and what they want</h2>
<table>
  <tr><th>Question</th><th>What the answer does</th></tr>
  <tr><td><strong>Weaken</strong></td><td>Attacks the gap. Supplies an alternative explanation, or shows the assumption fails.</td></tr>
  <tr><td><strong>Strengthen</strong></td><td>Closes the gap. Rules out alternatives, or confirms the assumption.</td></tr>
  <tr><td><strong>Assumption</strong></td><td>States the gap itself: something that <em>must</em> be true for the argument to work.</td></tr>
  <tr><td><strong>Flaw</strong></td><td>Names the gap as an error in reasoning.</td></tr>
  <tr><td><strong>Inference / must be true</strong></td><td>Follows necessarily from the premises. (Note: here you're <em>not</em> looking for a gap, just what the facts guarantee.)</td></tr>
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
most expertise.</em> Their mortality is higher because their patients are sicker, and they may in fact be
the best place to go.</p>
<p>Whenever two groups produce different outcomes, ask: <strong>are the groups actually comparable, or do
they differ in composition?</strong></p></div>

<h2>What you must remember</h2>
<ul>
  <li>Find the conclusion, find the evidence, and the gap between them is the question.</li>
  <li>The three classic gaps: correlation ≠ causation, unrepresentative sample, something changed.</li>
  <li>Never attack the evidence: attack the link.</li>
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
      expl: "Critical Reasoning arguments come with an instruction built into the format.<br>The premises are handed to you as facts; the test is not asking you to fact-check them.<br>The conclusion is the author's claim, and that is exactly what is up for challenge.<br>So you must treat <strong>the evidence (premises)</strong> as true.<br><em>The trap:</em> granting the conclusion as well. If the conclusion were also given, there would be nothing left to strengthen or weaken.<br><em>Fast method:</em> Premises are true, the conclusion is on trial, attack the leap between them. Target: ~10 seconds." },
    { text: "\"People who nap have lower rates of heart disease, so napping protects the heart.\" Which answer MOST weakens this?",
      choices: [
        "Some nappers still develop heart disease",
        "People with high-stress jobs both nap less and independently have more heart disease",
        "The study lasted ten years",
        "Naps are typically 30 minutes long"],
      answer: 1,
      expl: "Weakening a causal claim means offering a rival explanation for the same data.<br>Evidence: nappers have less heart disease. Conclusion: napping protects the heart.<br>The gap is that something else could produce both patterns at once.<br><strong>High-stress jobs both reduce napping and independently raise heart disease</strong> fills exactly that gap, so stress explains the correlation and napping does no work.<br><em>The trap:</em> noting that some nappers still get heart disease. A causal claim never promised zero cases, so the argument survives it; study length and nap duration are merely topical.<br><em>Fast method:</em> To weaken cause-from-correlation, supply a confounder that drives both sides. Target: ~25 seconds." },
    { text: "A company found that employees who chose to attend an optional training wrote fewer bugs, and plans to make it mandatory. What is the flaw?",
      choices: [
        "The employees who volunteered were likely already the most motivated, so the training may not be what caused the improvement",
        "The training was too expensive",
        "Bugs are hard to count",
        "Not all employees write code"],
      answer: 0,
      expl: "The evidence compares people who chose the training with people who did not.<br>Choosing is not random, so the two groups already differed before any training happened.<br>The conclusion assumes the training caused the improvement; the gap is who volunteered.<br><strong>The volunteers were likely the most motivated already, so the training may not be what caused the improvement</strong>, and mandating it transfers the training without the motivation.<br><em>The trap:</em> cost, the difficulty of counting bugs, and who writes code all attack the plan or the data instead of the causal link.<br><em>Fast method:</em> Self-selected group means selection bias; the trait that drove the choosing is your alternative cause. Target: ~25 seconds." },
    { text: "Which is almost NEVER the correct way to weaken an argument?",
      choices: [
        "Providing an alternative explanation",
        "Attacking the truth of the evidence",
        "Showing the assumption fails",
        "Demonstrating that the groups compared are not comparable"],
      answer: 1,
      expl: "Weakeners work on the reasoning, and the format forbids exactly one target.<br>Premises are granted as true.<br>So <strong>attacking the truth of the evidence</strong> is almost never the answer.<br>Alternative explanations, failed assumptions, and non-comparable groups all attack the link from evidence to conclusion, which is fair game.<br><em>The trap:</em> real-world critique habits, such as the study was too small or the data is unreliable. Excellent research criticism, wrong answer here.<br><em>Fast method:</em> Never dispute the facts; break the bridge from facts to conclusion. Target: ~15 seconds." },
    { text: "What is the negation test used for?",
      choices: [
        "Weaken questions",
        "Assumption questions: negate the choice and see whether the argument collapses",
        "Inference questions",
        "Main idea questions"],
      answer: 1,
      expl: "The test is named for what it does: it checks necessity.<br>An assumption is something the argument requires in order to work at all.<br>Flip a candidate choice to its opposite, then reread the argument.<br>So the tool belongs to <strong>assumption questions: negate the choice and see whether the argument collapses</strong>.<br>Collapse means the choice was necessary; survival means it was not.<br><em>The trap:</em> applying it to weaken or inference questions, which ask about effect and entailment rather than necessity.<br><em>Fast method:</em> Negate the candidate; if the conclusion dies, that was the assumption. Target: ~10 seconds." },
    { text: "Hospitals performing the most heart surgeries have the highest mortality rates for that surgery. Which fact most undermines the conclusion that patients should avoid them?",
      choices: [
        "The highest-risk cases are systematically referred to those hospitals because of their expertise",
        "Those hospitals are more expensive",
        "Heart surgery is dangerous everywhere",
        "Some low-volume hospitals are rural"],
      answer: 0,
      expl: "Two groups, different outcomes: ask whether the groups are comparable before blaming the treatment.<br>Evidence: high-volume hospitals show higher mortality. Conclusion: avoid them.<br>The gap assumes the patients are alike across hospital types.<br><strong>The highest-risk cases are systematically referred there for the expertise</strong>, so the mortality gap reflects case mix rather than worse care, and those hospitals may be the better choice.<br><em>The trap:</em> cost and rural location are true but irrelevant, and 'heart surgery is dangerous everywhere' applies to both groups, so it shifts no comparison.<br><em>Fast method:</em> Different outcomes across groups? Check composition first. Target: ~25 seconds." },
    { text: "Which two are classic argument gaps the GRE tests? (Select TWO.)",
      choices: [
        "Treating a correlation as if it were causation",
        "Using numbers in the evidence",
        "Drawing a conclusion from an unrepresentative or self-selected sample",
        "Quoting an expert",
        "Using more than one premise"],
      answer: [0, 2],
      expl: "A gap is a flaw in the reasoning, not a feature of how an argument is written.<br><strong>Treating a correlation as causation</strong> is a gap, because an alternative cause is never ruled out.<br><strong>Drawing a conclusion from an unrepresentative or self-selected sample</strong> is a gap, because the sample may not represent the group in the conclusion.<br><em>The trap:</em> numbers, expert quotations, and multiple premises are ordinary features of arguments, not errors. An argument can do all three and still be airtight.<br><em>Fast method:</em> The three recurring gaps are correlation-as-cause, bad sample, and assuming nothing changed. Target: ~20 seconds." }
  ]
}
    ],

/* ================= CHECKPOINT 2 (cumulative) ================= */
    checkpoint: {
      id: "gcp2", title: "Verbal Reasoning", n: 16,
      questions: [
        { text: "An RC answer choice says the passage 'proves' a claim, but the passage says the evidence 'suggests' it. What is wrong with the choice?",
          choices: ["Nothing, they mean the same", "It overstates the passage's certainty", "It is too short", "It uses the wrong tense"],
          answer: 1,
          expl: "Compare the force of the passage's verb with the force of the choice.<br>The passage says the evidence 'suggests', which is hedged and non-conclusive.<br>The choice says 'proves', which is conclusive and admits no exceptions.<br>Nothing hedged can license a conclusive claim, so the choice <strong>overstates the passage's certainty</strong>.<br><em>The trap:</em> reading suggests and proves as loose synonyms. They are in casual speech and never on the GRE.<br><em>Fast method:</em> Mark the passage's certainty word and require the answer to match it. Target: ~10 seconds." },
        { text: "In Critical Reasoning, what is 'the gap'?",
          choices: [
            "The unstated assumption connecting the evidence to the conclusion",
            "A missing premise the author forgot to write",
            "The space between paragraphs",
            "A factual error in the evidence"],
          answer: 0,
          expl: "An argument shows you two parts and hides a third.<br>The evidence is given; the conclusion is claimed.<br>For that evidence to actually support that conclusion, something unstated has to hold.<br>That is the gap: <strong>the unstated assumption connecting the evidence to the conclusion</strong>.<br><em>The trap:</em> calling it a premise the author forgot to write. The gap is a logical requirement, not an oversight; and a factual error in the evidence is off-limits, since premises are granted.<br><em>Fast method:</em> Strengthen, weaken, assumption, and flaw all aim at the same gap. Target: ~10 seconds." },
        { text: "\"Some historians contend that the reforms were superficial.\" What should you assume about this sentence?",
          choices: [
            "It is the author's view",
            "It is likely a view the author will complicate or challenge",
            "The reforms were definitely superficial",
            "The passage is about historians"],
          answer: 1,
          expl: "Check the attribution before the content.<br>'Some historians contend' assigns the claim to other people.<br>Passages introduce borrowed views in order to set up the author's response to them.<br>So assume it is <strong>likely a view the author will complicate or challenge</strong>.<br><em>The trap:</em> hearing it as the author's own position, or accepting the claim as established fact. The passage reported the view, it did not endorse it.<br><em>Fast method:</em> Attribution language marks someone else's view until the passage says otherwise. Target: ~10 seconds." },
        { text: "How many of three choices can be correct on a select-all-that-apply RC question?",
          choices: ["Exactly one", "Exactly two", "One, two, or all three", "None"],
          answer: 2,
          expl: "The scoring format decides this one.<br>Three statements are offered, and each is checked against the passage on its own.<br>No rule caps how many the passage happens to support.<br>So the answer is <strong>one, two, or all three</strong>.<br><em>The trap:</em> carrying over the exactly-two rule from Sentence Equivalence, which is a different question type with a different constraint.<br>Credit is all or nothing, so every supported statement has to be selected.<br><em>Fast method:</em> Three independent true/false checks, no quota. Target: ~10 seconds." },
        { text: "Which two words mean 'to belittle or criticize'? (Select TWO.)",
          choices: ["Disparage", "Venerate", "Denigrate", "Laud", "Ameliorate"],
          answer: [0, 2],
          expl: "Sort all five words into meaning groups, then take the group the stem asked for.<br><strong>Disparage</strong> and <strong>denigrate</strong> both mean to belittle or run down.<br>Venerate and laud both mean to praise, a real pair pointing the opposite way.<br>Ameliorate means to make better, and pairs with neither.<br><em>The trap:</em> the praise pair, which is internally consistent and tempting if you hunt for two words that match each other instead of two that match the definition given.<br><em>Fast method:</em> Group by direction first, then pick the group the clue demands. Target: ~10 seconds." },
        { text: "On Sentence Equivalence, you must select:",
          choices: ["One answer", "Exactly two answers that produce sentences alike in meaning", "Any two answers that fit", "Three answers"],
          answer: 1,
          expl: "Sentence Equivalence has two requirements, and most people remember only the first.<br>Each pick must fit the sentence logically and grammatically.<br>The two picks must also yield sentences that mean roughly the same thing.<br>So you select <strong>exactly two answers that produce sentences alike in meaning</strong>.<br><em>The trap:</em> any two answers that fit. Three or four choices often fit the blank; only one pair converges in meaning.<br>There is no partial credit for getting one of the two.<br><em>Fast method:</em> Find the synonym pair that also fits the sentence. Target: ~10 seconds." },
        { text: "\"Although the evidence was ______, the jury convicted on inference rather than direct proof.\" Which word fits?",
          choices: ["Overwhelming", "Circumstantial", "Fabricated", "Direct"],
          answer: 1,
          expl: "Mine the second clause, because it defines the blank.<br>The jury convicted 'on inference rather than direct proof'.<br>So the evidence supported an inference without establishing the fact directly.<br>That is <strong>circumstantial</strong> evidence.<br><em>The trap:</em> 'direct' is an exact reversal of what the sentence says, and 'overwhelming' ignores the contrast that 'although' sets up; 'fabricated' would mean faked, which the sentence never suggests.<br><em>Fast method:</em> Let the non-blank clause define the blank, then obey the contrast word. Target: ~15 seconds." },
        { text: "Which is the BEST way to attack a causal argument?",
          choices: [
            "Show the evidence is false",
            "Provide an alternative explanation for the same outcome",
            "Point out the argument is short",
            "Note that the author is not an expert"],
          answer: 1,
          expl: "A causal conclusion says X produced Y, so the soft spot is whether something else did.<br>Premises are granted, so the facts stay where they are.<br><strong>Providing an alternative explanation for the same outcome</strong> leaves the data untouched and strips the conclusion of its support.<br><em>The trap:</em> showing the evidence is false is off-limits, since you must accept the premises; the argument's brevity and the author's credentials attack the messenger rather than the reasoning.<br><em>Fast method:</em> Against a causal claim, name a rival cause that fits the same evidence. Target: ~15 seconds." },
        { text: "A GRE author's attitude is MOST likely to be described as:",
          choices: ["Vehement outrage", "Measured skepticism", "Complete indifference", "Unqualified enthusiasm"],
          answer: 1,
          expl: "Predict the register before you read the choices.<br>GRE passages are hedged scholarly prose, so the author's stance is measured.<br>Only one choice lives in that range: <strong>measured skepticism</strong>.<br><em>The trap:</em> vehement outrage and unqualified enthusiasm are both extreme, and complete indifference contradicts the act of writing an argued passage at all.<br><em>Fast method:</em> Cut every choice carrying an intensity word; the moderate survivor is the answer. Target: ~10 seconds." },
        { text: "\"For all his reputation as a radical, the politician governed quite ______.\" The blank means:",
          choices: ["Radically", "Conservatively", "Loudly", "Briefly"],
          answer: 1,
          expl: "'For all his reputation as X' is a contrast signal: the reality departed from the reputation.<br>The reputation here was radical.<br>So the governing ran the other way, meaning he governed <strong>conservatively</strong>.<br><em>The trap:</em> 'radically' repeats the reputation word and ignores the contrast, which is exactly why it is offered; loudly and briefly answer questions the sentence never asked.<br><em>Fast method:</em> 'For all / despite / notwithstanding his reputation as X' means the blank opposes X. Target: ~10 seconds." },
        { text: "Which two are traps in RC answer choices? (Select TWO.)",
          choices: [
            "Statements that are true but do not answer the question asked",
            "Statements that hedge with 'may' or 'suggests'",
            "Statements whose first half is right and second half adds something never stated",
            "Statements that paraphrase the passage",
            "Statements that use moderate language"],
          answer: [0, 2],
          expl: "Trap answers share a signature: they are built to feel already verified.<br><strong>True but not asked</strong> is accurate about the passage yet irrelevant to the stem.<br><strong>Half right</strong> opens correctly, then adds a clause the passage never stated, which is why you read a choice to its final word.<br><em>The trap:</em> hedges like 'may' and 'suggests', and moderate paraphrase, look too weak to be right; in fact those are usually features of correct answers.<br><em>Fast method:</em> Check every choice twice, accurate and responsive, all the way to the period. Target: ~15 seconds." },
        { text: "'Intransigent' most nearly means:",
          choices: ["Flexible", "Refusing to compromise", "Temporary", "Talkative"],
          answer: 1,
          expl: "Break the word open: in- (not) plus a root meaning to come to terms.<br>So it names a refusal to come to terms with anyone.<br>The meaning is <strong>refusing to compromise</strong>, and obdurate and obstinate are its neighbors.<br><em>The trap:</em> 'flexible' is the precise opposite, and 'temporary' rides on the trans- look-alike, borrowing the shape of transient rather than any shared meaning.<br><em>Fast method:</em> Read in-/im-/un- as a negation, then negate whatever root you recognize. Target: ~10 seconds." },
        { text: "Which question type asks what MUST be true given the premises, rather than looking for a gap?",
          choices: ["Weaken", "Strengthen", "Inference / must be true", "Flaw"],
          answer: 2,
          expl: "Split the Critical Reasoning types by whether they hunt for a gap.<br>Weaken, strengthen, and flaw all attack or defend the leap from premises to conclusion.<br>One type instead asks what the premises by themselves guarantee.<br>That is <strong>inference / must be true</strong>.<br><em>The trap:</em> flaw questions also seem to ask what is true about the argument, but they name the reasoning error rather than deriving a new fact from the premises.<br><em>Fast method:</em> Gap-hunting for strengthen, weaken, assumption, flaw; entailment only for inference. Target: ~10 seconds." },
        { text: "A passage says results 'may indicate' a trend. Which answer is safest?",
          choices: [
            "The results definitively establish the trend",
            "The results are consistent with a possible trend",
            "The trend always occurs",
            "The trend never occurs"],
          answer: 1,
          expl: "Copy the passage's hedge straight into your answer.<br>'May indicate' is doubly hedged: possibility on top of indication, nowhere near establishment.<br>So the safe choice is <strong>consistent with a possible trend</strong>.<br><em>The trap:</em> 'definitively establish' upgrades a hedge into proof, while always and never are absolutes, and the negative one is a reversal on top of that.<br><em>Fast method:</em> When the passage hedges, the weakest and most qualified choice usually wins. Target: ~10 seconds." },
        { text: "Which two words mean 'short-lived'? (Select TWO.)",
          choices: ["Ephemeral", "Ubiquitous", "Transient", "Prosaic", "Candid"],
          answer: [0, 2],
          expl: "Sort the five words, then find the two pointing the same way.<br><strong>Ephemeral</strong> and <strong>transient</strong> both describe what lasts only briefly.<br>Ubiquitous means present everywhere, prosaic means dull and ordinary, candid means frank.<br>None of those three pairs with anything, which confirms the match.<br><em>The trap:</em> ubiquitous is about extent in space, not duration in time, an easy swap when you are skimming for impressive-looking words.<br><em>Fast method:</em> Look for the two words that could trade places without changing the sentence's meaning. Target: ~10 seconds." },
        { text: "Why should you predict an answer before reading the choices?",
          choices: [
            "It saves time on easy questions only",
            "Wrong answers are engineered to be persuasive; a prediction means you match rather than get persuaded",
            "The GRE requires it",
            "It helps you memorize vocabulary"],
          answer: 1,
          expl: "Think about how wrong answers are written: to attract, not to look false.<br>Meet them with no answer of your own and you end up judging which one sounds best, the exact vulnerability they were built to exploit.<br>Arriving with a prediction turns the task into matching.<br>So the reason is that <strong>a prediction means you match rather than get persuaded</strong>.<br><em>The trap:</em> thinking it only saves time on easy questions. Prediction pays most on hard ones, where the traps are strongest.<br><em>Fast method:</em> Answer in your own words before you look, then match. Target: ~15 seconds." },
        { text: "\"The committee's report was notable for its ______; rather than assigning blame, it catalogued every party's failures, including its own.\" The blank means:",
          choices: ["Partiality", "Impartiality", "Brevity", "Vindictiveness"],
          answer: 1,
          expl: "The semicolon promises that the second clause explains the first.<br>The report catalogued every party's failures, its own included, rather than assigning blame.<br>Treating all parties alike, self included, is even-handedness.<br>So the blank means <strong>impartiality</strong>.<br><em>The trap:</em> 'partiality' is the same word minus the negating prefix, a one-syllable reversal that reads correctly if you skim; vindictiveness contradicts 'rather than assigning blame', and brevity appears nowhere in the sentence.<br><em>Fast method:</em> After a semicolon, the clause defines the blank; then check prefixes for reversals. Target: ~15 seconds." }
      ]
    }
  });
})();
