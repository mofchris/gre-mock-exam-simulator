/* Analytical Writing bank: "Analyze an Issue" prompts (official-pool style),
   the 0–6 rubric, and a sample high-scoring response. */
(function () {
  const B = window.GREBANK = window.GREBANK || {};
  B.essays = B.essays || [];

  const T1 = "Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.";
  const T2 = "Write a response in which you discuss the extent to which you agree or disagree with the recommendation and explain your reasoning for the position you take. In developing and supporting your position, describe specific circumstances in which adopting the recommendation would or would not be advantageous and explain how these examples shape your position.";
  const T3 = "Write a response in which you discuss the extent to which you agree or disagree with the claim. In developing and supporting your position, be sure to address the most compelling reasons and/or examples that could be used to challenge your position.";
  const T4 = "Write a response in which you discuss which view more closely aligns with your own position and explain your reasoning for the position you take. In developing and supporting your position, you should address both of the views presented.";
  const T5 = "Write a response in which you discuss the extent to which you agree or disagree with the claim and the reason on which that claim is based.";
  const T6 = "Write a response in which you discuss your views on the policy and explain your reasoning for the position you take. In developing and supporting your position, you should consider the possible consequences of implementing the policy and explain how these consequences shape your position.";

  B.essays.push(
    { id: "AW01", task: T1, prompt: "As people rely more and more on technology to solve problems, the ability of humans to think for themselves will surely deteriorate." },
    { id: "AW02", task: T1, prompt: "To understand the most important characteristics of a society, one must study its major cities." },
    { id: "AW03", task: T2, prompt: "Governments should place few, if any, restrictions on scientific research and development." },
    { id: "AW04", task: T1, prompt: "Every individual in a society has a responsibility to obey just laws and to disobey and resist unjust laws." },
    { id: "AW05", task: T3, prompt: "The best ideas arise from a passionate interest in commonplace things." },
    { id: "AW06", task: T2, prompt: "Universities should require every student to take a variety of courses outside the student's field of study." },
    { id: "AW07", task: T1, prompt: "True success can be measured primarily in terms of the goals one sets for oneself." },
    { id: "AW08", task: T6, prompt: "In any field of endeavor, it is impossible to make a significant contribution without first being strongly influenced by past achievements within that field." },
    { id: "AW09", task: T1, prompt: "The luxuries and conveniences of contemporary life prevent people from developing into truly strong and independent individuals." },
    { id: "AW10", task: T2, prompt: "Educational institutions should actively encourage their students to choose fields of study that will prepare them for lucrative careers." },
    { id: "AW11", task: T5, prompt: "Claim: Governments must ensure that their major cities receive the financial support they need in order to thrive. Reason: It is primarily in cities that a nation's cultural traditions are preserved and generated." },
    { id: "AW12", task: T1, prompt: "The greatness of individuals can be decided only by those who live after them, not by their contemporaries." },
    { id: "AW13", task: T4, prompt: "Some people believe that in order to be effective, political leaders must yield to public opinion and abandon principle for the sake of compromise. Others believe that the most essential quality of an effective leader is the ability to remain consistently committed to particular principles and objectives." },
    { id: "AW14", task: T1, prompt: "People's behavior is largely determined by forces not of their own making." },
    { id: "AW15", task: T3, prompt: "The surest indicator of a great nation is represented not by the achievements of its rulers, artists, or scientists, but by the general welfare of its people." },
    { id: "AW16", task: T2, prompt: "Nations should pass laws to preserve any remaining wilderness areas in their natural state, even if these areas could be developed for economic gain." },
    { id: "AW17", task: T1, prompt: "Formal education tends to restrain our minds and spirits rather than set them free." },
    { id: "AW18", task: T6, prompt: "Governments should offer a free university education to any student who has been admitted to a university but who cannot afford the tuition." },
    { id: "AW19", task: T1, prompt: "It is no longer possible for a society to regard any living man or woman as a hero." },
    { id: "AW20", task: T5, prompt: "Claim: In any field (business, politics, education, government) those in power should step down after five years. Reason: The surest path to success for any enterprise is revitalization through new leadership." },
    { id: "AW21", task: T1, prompt: "Any leader who is quickly and easily influenced by shifts in popular opinion will accomplish little." },
    { id: "AW22", task: T2, prompt: "Teachers' salaries should be based on their students' academic performance." },
    { id: "AW23", task: T4, prompt: "Some people believe that scientific discoveries have given us a much better understanding of the world around us. Others believe that science has revealed to us that the world is infinitely more complex than we ever realized." },
    { id: "AW24", task: T1, prompt: "The increasingly rapid pace of life today causes more problems than it solves." },
    { id: "AW25", task: T3, prompt: "Critical judgment of work in any given field has little value unless it comes from someone who is an expert in that field." },
    { id: "AW26", task: T6, prompt: "In order to become well-rounded individuals, all college students should be required to live on campus with roommates during their first year." },
    { id: "AW27", task: T1, prompt: "The best way to teach is to praise positive actions and ignore negative ones." },
    { id: "AW28", task: T2, prompt: "Colleges and universities should require their students to spend at least one semester studying in a foreign country." },
    { id: "AW29", task: T1, prompt: "In this age of intensive media coverage, it is no longer possible for a society to regard privacy as a right." },
    { id: "AW30", task: T5, prompt: "Claim: Knowing about the past cannot help people to make important decisions today. Reason: The world today is significantly different from what it was in the past." },
    { id: "AW31", task: T1, prompt: "Learning is primarily a matter of personal discipline; students cannot be motivated by school or college alone." },
    { id: "AW32", task: T4, prompt: "Some people believe that society should try to save every plant and animal species, regardless of the expense to humans. Others believe that society need not make extraordinary efforts, especially at a great cost in money and jobs, to save endangered species." },
    { id: "AW33", task: T1, prompt: "A nation should require all of its students to study the same national curriculum until they enter college." },
    { id: "AW34", task: T2, prompt: "People should undertake risky action only after they have carefully considered its consequences." },
    { id: "AW35", task: T1, prompt: "Competition for high grades seriously limits the quality of learning at all levels of education." },
    { id: "AW36", task: T3, prompt: "Imagination is a more valuable asset than experience." },
    { id: "AW37", task: T6, prompt: "Governments should not fund any scientific research whose consequences are unclear." },
    { id: "AW38", task: T1, prompt: "The main benefit of the study of history is to dispel the illusion that people living now are significantly different from people who lived in earlier times." },
    { id: "AW39", task: T2, prompt: "In any profession (including government, engineering, or education) a person's first duty is to serve the interests of the organization that employs them, even when those interests conflict with the person's own judgment." },
    { id: "AW40", task: T1, prompt: "The most effective way to understand contemporary culture is to analyze the trends of its youth." }
  );

  B.awaRubric = `
    <h4 style="margin:6px 0">Issue task scoring rubric (summary of the official 0–6 scale)</h4>
    <ul style="font-size:14px;line-height:1.55">
      <li><strong>6: Outstanding.</strong> Insightful, in-depth position on the issue; develops it with compelling, well-chosen reasons and examples; well organized and focused; sentence variety and precise vocabulary; virtually no errors.</li>
      <li><strong>5: Strong.</strong> Thoughtful position; logically sound development with well-chosen examples; generally well organized; good control of language with minor errors.</li>
      <li><strong>4: Adequate.</strong> Clear position developed with relevant reasons and examples; adequately organized; sufficient control of language, though with some errors or imprecision.</li>
      <li><strong>3: Limited.</strong> Vague or limited position; weak or partly irrelevant development; problems in organization; imprecise language or errors that occasionally obscure meaning.</li>
      <li><strong>2: Seriously flawed.</strong> Unclear position; few or no relevant reasons; serious organization problems; frequent errors that obscure meaning.</li>
      <li><strong>1: Fundamentally deficient.</strong> Little or no evidence of the ability to understand or address the issue; severe, pervasive errors.</li>
      <li><strong>0.</strong> Off topic, not in English, or a copy of the prompt.</li>
    </ul>
    <p style="font-size:13.5px;color:#5a6470">Self-check questions: Did you take a clear, nuanced position responsive to the <em>specific instructions</em>? Do 2–3 body paragraphs each develop one reason with a concrete example? Did you engage the strongest counterargument? Is it 450+ words with few mechanical errors?</p>`;

  B.awaSample = {
    prompt: "As people rely more and more on technology to solve problems, the ability of humans to think for themselves will surely deteriorate.",
    text: `The claim that reliance on technology will inevitably erode independent thought rests on a seductive but flawed premise: that thinking is a fixed reservoir that machines drain rather than a capacity that changes its object as tools evolve. History suggests the opposite. Each time a technology has absorbed some routine cognitive labor, human thought has migrated to higher ground. I therefore largely disagree with the statement, though it holds a genuine warning in one narrow circumstance: when people surrender not the labor of thinking but the judgment about whether the machine's answer is right.

Consider what happened when written language, the calculator, and the search engine each arrived. Socrates worried that writing would atrophy memory, and in a sense he was correct. Few moderns can recite epic poetry. Yet writing enabled forms of reasoning that oral cultures could not sustain: the extended argument, the audited ledger, the scientific paper that can be checked line by line. Similarly, the pocket calculator did not produce a generation incapable of mathematics; it produced one that spends its effort on modeling and interpretation rather than long division. The cognitive skill did not deteriorate; it relocated. What looks like decline from the vantage of the old skill is often specialization viewed from the vantage of the new one.

The statement is strongest, however, where technology replaces judgment rather than labor. A GPS user who follows turn-by-turn directions into a lake has not offloaded computation; he has offloaded the responsibility to notice. Studies of automation in aviation echo this: pilots who over-trust autopilot can lose manual flying proficiency precisely when emergencies demand it. The deterioration in these cases is real, but note its cause, not the existence of the tool, but the user's abdication of oversight. Airlines responded not by removing autopilot but by training pilots to hand-fly regularly and to treat automation as a fallible colleague. The remedy for the risk the statement identifies is a practice, not a prohibition.

Moreover, the claim ignores the ways technology actively provokes thought. The amateur astronomer with a smartphone spectrometer, the high-school student running statistical analyses that once required a mainframe, the historian searching digitized archives. All are asking questions their predecessors could not afford to ask. Tools lower the cost of curiosity. Whether people spend the dividend on reality television or on protein-folding puzzles is a cultural question, not a technological destiny; the same internet hosts both.

Ultimately, "thinking for oneself" has never meant thinking without aids: spectacles, books, and slide rules are all prosthetics for the mind. It means retaining the disposition to ask whether an answer makes sense, wherever the answer came from. That disposition can certainly wither, but it withers from disuse, not from the presence of capable tools. A society that teaches its members to interrogate their instruments (to estimate before calculating, to sanity-check the route against the sun) will find that technology multiplies independent thought rather than replacing it. The statement, then, mistakes a danger that attends lazy use of technology for a fate that attends all use of it, and in doing so it underestimates the very capacity for self-directed thought it claims to defend.`
  };
})();
