/* Tutor mode: filtered untimed practice with instant feedback, strategy guides,
   and missed-deck drilling. */
(function () {
  "use strict";
  const GRE = window.GRE = window.GRE || {};
  GRE.screens = GRE.screens || {};
  const T = {};
  GRE.tutor = T;

  const GUIDES = {
    tc: ["Text Completion",
      `<p><strong>Read for the logic first, vocabulary second.</strong> Cover the choices, read the sentence, and predict a simple word for each blank based on the sentence's internal clues — pivot words (<em>although, yet, despite</em>) signal contrast; colons, semicolons, and "indeed" signal continuation.</p>
       <p>On 2- and 3-blank questions, start with whichever blank has the strongest clue, not blank (i). Wrong single choices kill the whole question — there's no partial credit — so verify the completed text reads as one coherent argument before moving on.</p>`],
    se: ["Sentence Equivalence",
      `<p>You need the <strong>two</strong> choices that both fit the blank <em>and</em> give the sentence the same meaning. The right pair are rarely perfect synonyms of each other — they just have to produce equivalent sentences.</p>
       <p>Beware the trap pair: two choices that are synonyms of each other but don't fit the sentence. Predict your own word first, then find the two choices closest to the prediction. If only one choice fits perfectly, you've misread the sentence — re-check the pivot words.</p>`],
    rc: ["Reading Comprehension",
      `<p>Read the passage once for structure, not detail: what is the author's point, and what does each paragraph <em>do</em> (introduce a view, criticize it, give evidence…)? Most wrong answers are (a) true but not asked, (b) too extreme (<em>always, never, prove</em>), or (c) outside the passage.</p>
       <p>For "select all that apply," judge each choice independently against the text — the answer can be one, two, or all three. For inference questions, the right answer must be <em>necessarily</em> true from the passage, not merely plausible.</p>`],
    cr: ["Critical Reasoning",
      `<p>Break the argument into conclusion + evidence, then find the gap between them — the unstated assumption. Strengthen/weaken answers work on that gap, not on the conclusion directly.</p>
       <p>Answers that attack the evidence's truth are usually wrong; the evidence is granted. Look instead for alternative explanations, broken causal links, or samples that don't represent the population.</p>`],
    qc: ["Quantitative Comparison",
      `<p>Your job is the <em>relationship</em>, not the values. Simplify both quantities first (add/subtract/divide-by-positives on both sides is safe). Then, if variables remain, <strong>test numbers strategically</strong>: 0, 1, a fraction between 0 and 1, a negative, and a large number.</p>
       <p>If two different test cases give different orderings, the answer is (D) — immediately. If a quantity is a specific computable number on both sides, (D) is impossible. Never compute more precisely than the comparison requires.</p>`],
    ps: ["Problem Solving (MC, Multiple-answer, Numeric Entry)",
      `<p>Before computing, ask: can I <strong>backsolve</strong> from the answer choices or <strong>plug in</strong> easy numbers for the variables? On multiple-answer questions, check every choice — credit requires the complete set, and the count of correct choices is unknown.</p>
       <p>For Numeric Entry, re-read what form the answer takes (units? rounded how? per what?) before typing. The calculator is for arithmetic you can't do faster mentally — order-of-operations errors on it are a classic point-loser.</p>`],
    di: ["Data Interpretation",
      `<p>Spend 20–30 seconds reading the graphs before question 1: units, axis scales, footnotes, and what each series is. Most DI errors are reading errors, not math errors — e.g., using the wrong year or confusing percent with absolute counts.</p>
       <p>Estimate before calculating; DI answer choices are usually spread far enough apart that a rough calculation identifies the answer.</p>`],
    awa: ["Analyze an Issue essay",
      `<p>Spend 3–4 minutes planning: pick a position you can support with two or three concrete examples (history, science, current events, personal experience). A strong response usually <em>qualifies</em> the claim — "true in X circumstances, but not in Y" — and addresses the specific task instructions.</p>
       <p>Aim for 5–6 paragraphs and 500+ words: intro with a clear thesis, one paragraph per reason with a developed example, one paragraph engaging the strongest counterargument, brief conclusion. Leave 2–3 minutes to proofread.</p>`]
  };

  /* ---------------- tutor home ---------------- */

  GRE.screens.tutor = function (root) {
    const el = GRE.el;
    const { bar, stage, inner } = GRE.chrome("Tutor Mode");
    root.appendChild(bar); root.appendChild(stage);
    inner.appendChild(el("h1", { class: "screen-title" }, "Tutor Mode"));
    inner.appendChild(el("p", { class: "screen-sub" },
      "Untimed practice with instant feedback and full explanations. Pick your filters, or read a strategy guide first."));

    /* filters */
    const fWrap = el("div", { class: "card" });
    fWrap.appendChild(el("h3", null, "Practice a set"));
    const filters = el("div", { class: "tutor-filters" });
    const mk = (label, opts) => {
      const s = el("select");
      opts.forEach(([v, t]) => s.appendChild(el("option", { value: v }, t)));
      const wrap = el("label", { style: "font-size:13px;color:#5a6470" }, label + " ", s);
      filters.appendChild(wrap);
      return s;
    };
    const selMeasure = mk("Measure", [["any", "Both"], ["verbal", "Verbal"], ["quant", "Quant"]]);
    const selType = mk("Type", [["any", "All types"],
      ["tc", "Text Completion"], ["se", "Sentence Equivalence"], ["rc", "Reading Comp"], ["cr", "Critical Reasoning"],
      ["qc", "Quantitative Comparison"], ["mcq", "Multiple Choice"], ["mcma", "Multiple-answer"], ["num", "Numeric Entry"], ["di", "Data Interpretation"]]);
    const selTopic = mk("Quant topic", [["any", "All topics"], ["arithmetic", "Arithmetic"], ["algebra", "Algebra"], ["geometry", "Geometry"], ["data", "Data Analysis"]]);
    const selDiff = mk("Difficulty", [["any", "Mixed"], ["easy", "Easy"], ["medium", "Medium"], ["hard", "Hard"]]);
    const selN = mk("Questions", [["10", "10"], ["5", "5"], ["20", "20"]]);
    fWrap.appendChild(filters);
    const row = el("div", { class: "btnrow" });
    row.appendChild(el("button", { class: "bigbtn", onclick: () => {
      const ids = pickSet(selMeasure.value, selType.value, selTopic.value, selDiff.value, parseInt(selN.value, 10));
      if (!ids.length) { GRE.modal("No questions", "<p>No questions match those filters. Loosen them and try again.</p>"); return; }
      startSession(ids, { deck: false });
    } }, "Start practice"));
    fWrap.appendChild(row);
    inner.appendChild(fWrap);

    /* guides */
    const g = el("div", { class: "card" });
    g.appendChild(el("h3", null, "Strategy guides"));
    const grow = el("div", { style: "display:flex;flex-wrap:wrap;gap:8px" });
    Object.keys(GUIDES).forEach(k => {
      grow.appendChild(el("button", { class: "bigbtn secondary", style: "font-size:13.5px;padding:8px 14px", onclick: () =>
        GRE.modal(GUIDES[k][0], GUIDES[k][1], [{ label: "Got it" }]) }, GUIDES[k][0]));
    });
    g.appendChild(grow);
    inner.appendChild(g);
  };

  function pickSet(measure, type, topic, diff, n) {
    const B = window.GREBANK;
    let items = [];
    const wantV = measure !== "quant", wantQ = measure !== "verbal";
    if (wantV) {
      B.verbal.forEach(q => items.push(q.id));
      B.vpassages.forEach(p => p.questions.forEach(q => items.push(q.id)));
    }
    if (wantQ) {
      B.quant.forEach(q => items.push(q.id));
      B.disets.forEach(p => p.questions.forEach(q => items.push(q.id)));
    }
    items = items.filter(id => {
      const entry = GRE.byId[id];
      const q = entry.q;
      if (diff !== "any" && (q.diff || (entry.passage && entry.passage.diff)) !== diff) return false;
      if (type !== "any") {
        if (type === "rc") { if (!(entry.passage && !entry.di)) return false; }
        else if (type === "di") { if (!entry.di) return false; }
        else if (q.type !== type || (entry.passage && !entry.di && type !== "rc")) return false;
      }
      if (topic !== "any" && q.topic !== topic && !(entry.di && topic === "data")) return false;
      return true;
    });
    return GRE.shuffle(items).slice(0, n);
  }

  /* ---------------- practice session ---------------- */

  T.startDeck = function (ids) {
    startSession(GRE.shuffle(ids.slice()), { deck: true });
  };

  function startSession(ids, opts) {
    let i = 0, correct = 0;
    let ans = null, submitted = false;

    GRE.show(root => {
      const el = GRE.el;
      const bar = el("div", { class: "topbar" },
        el("div", { class: "brand" }, opts.deck ? "Missed Questions Drill" : "Tutor Mode — Practice",
          el("small", null, "Untimed · instant feedback")),
        el("div", { class: "btns" },
          el("button", { class: "tbtn", onclick: () => quit() },
            el("span", { class: "ic" }, "🚪"), "End session")));
      root.appendChild(bar);
      const counter = el("span", { class: "qcount" });
      const scoreEl = el("span", null);
      root.appendChild(el("div", { class: "substrip" }, counter, el("span", { class: "right" }, scoreEl)));
      const stage = el("div", { class: "stage" });
      const inner = el("div", { class: "stage-inner" });
      stage.appendChild(inner);
      root.appendChild(stage);

      function quit() {
        GRE.calc.hide();
        summary();
      }

      function summary() {
        inner.innerHTML = "";
        counter.textContent = "Session complete";
        const done = i + (submitted ? 1 : 0);
        inner.appendChild(el("h2", { class: "screen-title" }, "Session summary"));
        inner.appendChild(el("p", { class: "screen-sub" },
          `${correct} correct out of ${done || 0} answered${opts.deck ? " — correct answers have left the missed deck." : "."}`));
        const row = el("div", { class: "btnrow" });
        row.appendChild(el("button", { class: "bigbtn", onclick: () => GRE.show(GRE.screens.tutor) }, "Back to Tutor Mode"));
        row.appendChild(el("button", { class: "bigbtn secondary", onclick: () => GRE.show(GRE.screens.home) }, "Home"));
        inner.appendChild(row);
      }

      function paint() {
        if (i >= ids.length) { summary(); return; }
        ans = null; submitted = false;
        inner.innerHTML = "";
        counter.textContent = `Question ${i + 1} of ${ids.length}`;
        scoreEl.textContent = `${correct} correct so far`;
        const entry = GRE.byId[ids[i]];
        if (!entry) { i++; paint(); return; }
        const q = entry.q;

        const head = el("div", { style: "margin-bottom:10px" },
          el("span", { class: "pill" }, GRE.describeType(q, entry)),
          q.topic ? el("span", { class: "pill" }, { arithmetic: "Arithmetic", algebra: "Algebra", geometry: "Geometry", data: "Data Analysis" }[q.topic] || q.topic) : null,
          el("span", { class: "pill" }, q.diff || (entry.passage && entry.passage.diff) || "medium"));
        inner.appendChild(head);

        const qbox = el("div");
        inner.appendChild(qbox);
        const isQuant = (q.type === "qc" || q.type === "mcq" || q.type === "mcma" || q.type === "num" || entry.di);
        if (isQuant) GRE.calc.transferTarget = null;

        const paintBody = () => {
          qbox.innerHTML = "";
          GRE.renderQBody(qbox, entry, () => ans, v => { ans = v; }, submitted ? { review: true, disabled: true } : {});
        };
        paintBody();

        const ctl = el("div", { class: "btnrow" });
        const fb = el("div");
        const submitBtn = el("button", { class: "bigbtn", onclick: () => {
          if (submitted) return;
          if (!GRE.isAnswered(q, ans)) {
            GRE.modal("No answer", "<p>Choose or enter an answer first — on the real test you'd never leave a blank.</p>");
            return;
          }
          submitted = true;
          const ok = GRE.gradeQ(q, ans);
          if (ok) correct++;
          scoreEl.textContent = `${correct} correct so far`;
          const D = GRE.store.data;
          if (ok) {
            if (opts.deck) { D.missed = D.missed.filter(x => x !== q.id); GRE.store.save(); }
          } else if (!D.missed.includes(q.id)) {
            D.missed.push(q.id); GRE.store.save();
          }
          paintBody();
          fb.innerHTML = "";
          fb.appendChild(el("div", { class: "feedback-banner " + (ok ? "good" : "bad") },
            ok ? "✔ Correct" : "✘ Incorrect"));
          const ex = el("div", { class: "expl" });
          ex.innerHTML = "<strong>Explanation.</strong> " + q.expl +
            (q.tip ? `<div class="tip"><strong>Strategy:</strong> ${q.tip}</div>` : "");
          fb.appendChild(ex);
          submitBtn.classList.add("hidden");
          nextBtn.classList.remove("hidden");
          nextBtn.focus();
        } }, "Submit answer");
        const nextBtn = el("button", { class: "bigbtn hidden", onclick: () => { i++; GRE.calc.hide(); paint(); window.scrollTo(0, 0); stage.scrollTop = 0; } },
          i + 1 >= ids.length ? "Finish" : "Next question");
        const calcBtn = isQuant ? el("button", { class: "bigbtn secondary", onclick: () => GRE.calc.toggle() }, "Calculator") : null;
        ctl.appendChild(submitBtn); ctl.appendChild(nextBtn); if (calcBtn) ctl.appendChild(calcBtn);
        inner.appendChild(ctl);
        inner.appendChild(fb);
      }

      paint();
    });
  }
})();
