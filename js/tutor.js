/* Tutor mode: filtered untimed practice with instant feedback, strategy guides,
   and missed-deck drilling. */
(function () {
  "use strict";
  const GRE = window.GRE = window.GRE || {};
  GRE.screens = GRE.screens || {};
  const T = {};
  GRE.tutor = T;

  const SIZES = [5, 10, 20];

  const GUIDES = {
    tc: ["Text Completion",
      `<p><strong>Read for the logic first, vocabulary second.</strong> Cover the choices, read the sentence, and predict a simple word for each blank based on the sentence's internal clues: pivot words (<em>although, yet, despite</em>) signal contrast; colons, semicolons, and "indeed" signal continuation.</p>
       <p>On 2- and 3-blank questions, start with whichever blank has the strongest clue, not blank (i). Wrong single choices kill the whole question (there's no partial credit) so verify the completed text reads as one coherent argument before moving on.</p>`],
    se: ["Sentence Equivalence",
      `<p>You need the <strong>two</strong> choices that both fit the blank <em>and</em> give the sentence the same meaning. The right pair are rarely perfect synonyms of each other. They just have to produce equivalent sentences.</p>
       <p>Beware the trap pair: two choices that are synonyms of each other but don't fit the sentence. Predict your own word first, then find the two choices closest to the prediction. If only one choice fits perfectly, you've misread the sentence: re-check the pivot words.</p>`],
    rc: ["Reading Comprehension",
      `<p>Read the passage once for structure, not detail: what is the author's point, and what does each paragraph <em>do</em> (introduce a view, criticize it, give evidence…)? Most wrong answers are (a) true but not asked, (b) too extreme (<em>always, never, prove</em>), or (c) outside the passage.</p>
       <p>For "select all that apply," judge each choice independently against the text. The answer can be one, two, or all three. For inference questions, the right answer must be <em>necessarily</em> true from the passage, not merely plausible.</p>`],
    cr: ["Critical Reasoning",
      `<p>Break the argument into conclusion + evidence, then find the gap between them: the unstated assumption. Strengthen/weaken answers work on that gap, not on the conclusion directly.</p>
       <p>Answers that attack the evidence's truth are usually wrong; the evidence is granted. Look instead for alternative explanations, broken causal links, or samples that don't represent the population.</p>`],
    qc: ["Quantitative Comparison",
      `<p>Your job is the <em>relationship</em>, not the values. Simplify both quantities first (add/subtract/divide-by-positives on both sides is safe). Then, if variables remain, <strong>test numbers strategically</strong>: 0, 1, a fraction between 0 and 1, a negative, and a large number.</p>
       <p>If two different test cases give different orderings, the answer is (D), immediately. If a quantity is a specific computable number on both sides, (D) is impossible. Never compute more precisely than the comparison requires.</p>`],
    ps: ["Problem Solving (MC, Multiple-answer, Numeric Entry)",
      `<p>Before computing, ask: can I <strong>backsolve</strong> from the answer choices or <strong>plug in</strong> easy numbers for the variables? On multiple-answer questions, check every choice: credit requires the complete set, and the count of correct choices is unknown.</p>
       <p>For Numeric Entry, re-read what form the answer takes (units? rounded how? per what?) before typing. The calculator is for arithmetic you can't do faster mentally: order-of-operations errors on it are a classic point-loser.</p>`],
    di: ["Data Interpretation",
      `<p>Spend 20–30 seconds reading the graphs before question 1: units, axis scales, footnotes, and what each series is. Most DI errors are reading errors, not math errors: e.g., using the wrong year or confusing percent with absolute counts.</p>
       <p>Estimate before calculating; DI answer choices are usually spread far enough apart that a rough calculation identifies the answer.</p>`],
    awa: ["Analyze an Issue essay",
      `<p>Spend 3–4 minutes planning: pick a position you can support with two or three concrete examples (history, science, current events, personal experience). A strong response usually <em>qualifies</em> the claim ("true in X circumstances, but not in Y") and addresses the specific task instructions.</p>
       <p>Aim for 5–6 paragraphs and 500+ words: intro with a clear thesis, one paragraph per reason with a developed example, one paragraph engaging the strongest counterargument, brief conclusion. Leave 2–3 minutes to proofread.</p>`]
  };

  /* ---------------- tutor home ---------------- */

  GRE.screens.tutor = function (root) {
    const el = GRE.el;
    root.appendChild(GRE.crumb([["Dashboard", () => GRE.show(GRE.screens.home)], "Tutor Mode"]));
    const { stage, inner } = GRE.stage();
    root.appendChild(stage);

    inner.appendChild(el("h1", { class: "screen-title" }, "Build a practice set"));
    inner.appendChild(el("p", { class: "screen-sub" },
      "Untimed, with instant feedback, full explanations, and a strategy guide for every format."));

    const card = el("div", { class: "card" });
    const grid = el("div", { class: "ctlgrid" });

    const mkSelect = (label, opts) => {
      const wrap = el("div", { class: "ctl" });
      wrap.appendChild(el("div", { class: "lbl" }, label));
      const sel = el("select", { "aria-label": label });
      opts.forEach(([v, t]) => sel.appendChild(el("option", { value: v }, t)));
      const sw = el("div", { class: "selwrap" }, sel);
      sw.appendChild(el("span", { class: "chev" }, GRE.icon("chevD", 15)));
      wrap.appendChild(sw);
      grid.appendChild(wrap);
      return sel;
    };

    const selMeasure = mkSelect("Measure", [["any", "Both"], ["verbal", "Verbal"], ["quant", "Quant"]]);
    const selType = mkSelect("Type", [["any", "All types"],
      ["tc", "Text Completion"], ["se", "Sentence Equivalence"], ["rc", "Reading Comprehension"],
      ["cr", "Critical Reasoning"], ["qc", "Quantitative Comparison"], ["mcq", "Multiple Choice"],
      ["mcma", "Multiple-answer"], ["num", "Numeric Entry"], ["di", "Data Interpretation"]]);
    const selTopic = mkSelect("Quant topic", [["any", "All topics"],
      ["arithmetic", "Arithmetic"], ["algebra", "Algebra"], ["geometry", "Geometry"], ["data", "Data Analysis"]]);
    const selDiff = mkSelect("Difficulty", [["any", "Mixed"], ["easy", "Easy"], ["medium", "Medium"], ["hard", "Hard"]]);

    // Question count is a segmented control, not a dropdown.
    let count = 10;
    const nWrap = el("div", { class: "ctl" });
    nWrap.appendChild(el("div", { class: "lbl" }, "Questions"));
    const seg = el("div", { class: "seg", role: "group", "aria-label": "Questions" });
    SIZES.forEach(n => {
      seg.appendChild(el("button", {
        class: n === count ? "on" : "",
        type: "button",
        "aria-pressed": n === count ? "true" : "false",
        onclick: e => {
          count = n;
          seg.querySelectorAll("button").forEach(b => {
            b.classList.remove("on"); b.setAttribute("aria-pressed", "false");
          });
          e.currentTarget.classList.add("on");
          e.currentTarget.setAttribute("aria-pressed", "true");
          relabel();
        }
      }, String(n)));
    });
    nWrap.appendChild(seg);
    grid.appendChild(nWrap);
    card.appendChild(grid);

    const startBtn = el("button", {
      class: "btn big wide", style: "margin-top:20px",
      onclick: () => {
        const ids = pickSet(selMeasure.value, selType.value, selTopic.value, selDiff.value, count);
        if (!ids.length) {
          GRE.modal("No questions",
            "<p>No questions match those filters. Loosen them and try again.</p>",
            [{ label: "OK" }], { intent: "info" });
          return;
        }
        startSession(ids, { deck: false });
      }
    });
    const relabel = () => {
      startBtn.innerHTML = "";
      startBtn.appendChild(document.createTextNode(`Start practice — ${count} questions`));
      startBtn.appendChild(GRE.icon("arrow", 17));
    };
    relabel();
    card.appendChild(startBtn);
    inner.appendChild(card);

    /* strategy guides */
    const g = el("div", { class: "card" });
    g.appendChild(el("h3", null, "Strategy guides"));
    const grow = el("div", { class: "guides" });
    Object.keys(GUIDES).forEach(k => {
      grow.appendChild(el("button", {
        type: "button",
        onclick: () => GRE.modal(GUIDES[k][0], GUIDES[k][1],
          [{ label: "Got it" }], { intent: "info", large: true })
      }, GUIDES[k][0]));
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
    let i = 0, correct = 0, graduated = 0;
    let ans = null, submitted = false;

    GRE.show(root => {
      const el = GRE.el;
      const title = opts.deck ? "Missed Questions Drill" : "Tutor Mode · Practice";

      const crumb = GRE.crumb([["Tutor", () => GRE.show(GRE.screens.tutor)], title], "untimed");
      root.appendChild(crumb);

      const hair = GRE.hairline(0);
      root.appendChild(hair);
      const fill = hair.firstChild;

      const { stage, inner } = GRE.stage();
      root.appendChild(stage);

      function summary() {
        GRE.calc.hide();
        inner.innerHTML = "";
        const answered = i + (submitted ? 1 : 0);
        fill.style.width = "100%";

        inner.appendChild(el("h1", { class: "screen-title" }, "Session complete"));
        const card = el("div", { class: "card" });
        const s = el("div", { class: "summary" });
        s.appendChild(el("div", { class: "big", html:
          `${correct}<span>/${answered || ids.length}</span>` }));
        s.appendChild(el("div", { class: "cap" }, "correct this session"));

        const tiles = el("div", { class: "tiles" });
        if (opts.deck) {
          tiles.appendChild(el("div", { class: "stat good" },
            el("div", { class: "v" }, String(graduated)),
            el("div", { class: "l" }, "left the deck")));
        }
        tiles.appendChild(el("div", { class: "stat" },
          el("div", { class: "v" }, String(ids.length)),
          el("div", { class: "l" }, "in the set")));
        s.appendChild(tiles);

        const row = el("div", { style: "display:flex;gap:10px" });
        row.appendChild(el("button", {
          class: "btn", style: "flex:1", onclick: () => GRE.show(GRE.screens.tutor)
        }, "Practice more"));
        row.appendChild(el("button", {
          class: "btn secondary", onclick: () => GRE.show(GRE.screens.home)
        }, "Dashboard"));
        s.appendChild(row);
        card.appendChild(s);
        inner.appendChild(card);
      }

      function paint() {
        if (i >= ids.length) { summary(); return; }
        ans = null; submitted = false;
        inner.innerHTML = "";
        fill.style.width = (100 * (i + 1) / ids.length) + "%";

        const entry = GRE.byId[ids[i]];
        if (!entry) { i++; paint(); return; }
        const q = entry.q;

        inner.classList.toggle("splitwide", !!entry.passage);

        inner.appendChild(el("div", { class: "pillrow" },
          el("span", { class: "pill" }, `Question ${i + 1} of ${ids.length}`),
          el("span", { class: "pill" }, GRE.describeType(q, entry)),
          q.topic ? el("span", { class: "pill" }, GRE.TOPICS[q.topic] || q.topic) : null,
          el("span", { class: "pill" }, q.diff || (entry.passage && entry.passage.diff) || "medium")));

        const qbox = el("div");
        inner.appendChild(qbox);

        const isQuant = (q.type === "qc" || q.type === "mcq" || q.type === "mcma" ||
                         q.type === "num" || entry.di);
        if (isQuant) GRE.calc.transferTarget = null;

        const paintBody = () => {
          qbox.innerHTML = "";
          GRE.renderQBody(qbox, entry, () => ans, v => { ans = v; },
            submitted ? { review: true, disabled: true } : {});
        };
        paintBody();

        const fb = el("div");
        const ctl = el("div", { class: "btnrow" });

        const submitBtn = el("button", {
          class: "btn", onclick: () => {
            if (submitted) return;
            if (!GRE.isAnswered(q, ans)) {
              GRE.modal("No answer",
                "<p>Choose or enter an answer first, on the real test you'd never leave a blank.</p>",
                [{ label: "OK" }], { intent: "info" });
              return;
            }
            submitted = true;
            const ok = GRE.gradeQ(q, ans);
            if (ok) correct++;

            const D = GRE.store.data;
            if (ok) {
              if (opts.deck && D.missed.includes(q.id)) {
                D.missed = D.missed.filter(x => x !== q.id);
                graduated++;
                GRE.store.save();
              }
            } else if (!D.missed.includes(q.id)) {
              D.missed.push(q.id);
              GRE.store.save();
            }

            paintBody();
            fb.innerHTML = "";

            const banner = el("div", { class: "fb-banner " + (ok ? "good" : "bad") });
            banner.appendChild(GRE.icon(ok ? "check" : "x", 18, 2.6));
            banner.appendChild(document.createTextNode(ok ? "Correct" : "Incorrect"));
            fb.appendChild(banner);

            if (!ok) {
              fb.appendChild(el("p", { class: "fb-note" },
                "Added to your missed-questions deck for re-drilling."));
            } else if (opts.deck) {
              fb.appendChild(el("p", { class: "fb-note" },
                "Graduated out of the missed deck."));
            }

            const ex = el("div", { class: "expl" });
            ex.innerHTML = "<strong>Explanation.</strong> " + q.expl +
              (q.tip ? `<div class="tip"><strong>Strategy:</strong> ${q.tip}</div>` : "");
            fb.appendChild(ex);

            submitBtn.classList.add("hidden");
            nextBtn.classList.remove("hidden");
            nextBtn.focus();
          }
        }, "Submit answer");

        const nextBtn = el("button", {
          class: "btn hidden",
          onclick: () => { i++; GRE.calc.hide(); paint(); window.scrollTo(0, 0); stage.scrollTop = 0; }
        }, i + 1 >= ids.length ? "Finish" : "Next question");

        ctl.appendChild(submitBtn);
        ctl.appendChild(nextBtn);
        if (isQuant) {
          ctl.appendChild(el("button", {
            class: "btn secondary", onclick: () => GRE.calc.toggle()
          }, "Calculator"));
        }
        ctl.appendChild(el("button", {
          class: "btn secondary", onclick: () => summary()
        }, "End session"));

        inner.appendChild(fb);
        inner.appendChild(ctl);
      }

      paint();
    });
  }
})();
