/* GRE Study Course engine: syllabus with gated progression, module reader,
   module quizzes (75% to pass), cumulative unit checkpoints, mock-exam unlock gate.

   Course data (window.GRECOURSE):
   { units: [ { id, title, blurb,
                modules: [ { id, title, minutes, level, content: HTML,
                             quiz: [ {text, choices, answer(index|array), expl} ] } ],
                checkpoint: { id, title, n, questions: [ same shape ] } } ] }

   Quiz questions are rendered through GRE.renderQBody by wrapping them as
   {type: "mcq"|"mcma", ...} so they get the same choice UI as the real exam.
*/
(function () {
  "use strict";
  const GRE = window.GRE = window.GRE || {};
  GRE.screens = GRE.screens || {};
  const C = {};
  GRE.course = C;

  const PASS = 75;

  function prog() {
    const d = GRE.store.data;
    d.course = d.course || { modules: {}, checkpoints: {}, read: {} };
    d.course.modules = d.course.modules || {};
    d.course.checkpoints = d.course.checkpoints || {};
    d.course.read = d.course.read || {};
    return d.course;
  }
  C.progress = prog;

  // Wrap a course quiz question in the shape GRE.renderQBody/gradeQ expect.
  function asQ(q) {
    return {
      id: "course-q",
      type: Array.isArray(q.answer) ? "mcma" : "mcq",
      text: q.text,
      choices: q.choices,
      answer: q.answer
    };
  }

  function steps() {
    const out = [];
    (window.GRECOURSE.units || []).forEach(u => {
      u.modules.forEach(m => out.push({ kind: "module", unit: u, item: m }));
      if (u.checkpoint) out.push({ kind: "checkpoint", unit: u, item: u.checkpoint });
    });
    return out;
  }
  C.steps = steps;

  function isDone(step) {
    const p = prog();
    return step.kind === "module"
      ? !!(p.modules[step.item.id] && p.modules[step.item.id].passed)
      : !!(p.checkpoints[step.item.id] && p.checkpoints[step.item.id].passed);
  }

  function unlockedIndex() {
    const s = steps();
    for (let i = 0; i < s.length; i++) if (!isDone(s[i])) return i;
    return s.length;
  }
  C.courseComplete = () => unlockedIndex() >= steps().length;

  C.percentComplete = function () {
    const s = steps();
    if (!s.length) return 0;
    return Math.round(100 * s.filter(isDone).length / s.length);
  };

  /* ---------------- syllabus ---------------- */

  GRE.screens.course = function (root) {
    const el = GRE.el;
    const { bar, stage, inner } = GRE.chrome("GRE Study Course", "From basics to test-ready");
    root.appendChild(bar); root.appendChild(stage);

    const pct = C.percentComplete();
    const s = steps();
    const uIdx = unlockedIndex();

    inner.appendChild(el("h1", { class: "screen-title" }, "GRE Study Course"));
    inner.appendChild(el("p", { class: "screen-sub" },
      "Everything the test rewards, in order. Read each module, pass its quiz (75% or better) to unlock the next, " +
      "and clear the cumulative checkpoint at the end of every unit. Finish the course to unlock the full mock exam."));

    const pcard = el("div", { class: "card" });
    pcard.appendChild(el("h3", null, `Course progress: ${pct}%`));
    const track = el("div", { class: "tbar-track", style: "height:22px" });
    track.appendChild(el("div", { class: "tbar-fill", style: `width:${pct}%` }));
    pcard.appendChild(track);
    pcard.appendChild(el("p", { style: "margin:10px 0 0;font-size:14px;color:#5a6470" },
      `${s.filter(isDone).length} of ${s.length} steps complete ` +
      `(${s.filter(x => x.kind === "module").length} modules + ${s.filter(x => x.kind === "checkpoint").length} checkpoints).`));

    const row = el("div", { class: "btnrow" });
    if (C.courseComplete()) {
      row.appendChild(el("button", { class: "bigbtn", onclick: () => GRE.exam.startIntro() },
        "🎓 Course complete: take the mock exam"));
    } else {
      const next = s[uIdx];
      row.appendChild(el("button", { class: "bigbtn", onclick: () => open(next) },
        (pct === 0 ? "Start the course" : "Continue") + ", " + next.item.title));
    }
    pcard.appendChild(row);
    inner.appendChild(pcard);

    let idx = 0;
    (window.GRECOURSE.units || []).forEach(u => {
      const card = el("div", { class: "card" });
      card.appendChild(el("h3", null, u.title));
      card.appendChild(el("p", { style: "color:#5a6470;margin-top:-4px" }, u.blurb));
      const list = el("div", { class: "mod-list" });

      const addRow = (step, i) => {
        const done = isDone(step), locked = i > uIdx, isNext = i === uIdx;
        const p = prog();
        const rec = step.kind === "module" ? p.modules[step.item.id] : p.checkpoints[step.item.id];
        const r = el("button", {
          class: "mod-row" + (done ? " done" : "") + (locked ? " locked" : "") + (isNext ? " next" : ""),
          onclick: () => { if (!locked) open(step); }
        });
        r.appendChild(el("span", { class: "mod-ic" },
          done ? "✓" : locked ? "🔒" : step.kind === "checkpoint" ? "🏁" : "▶"));
        const mid = el("span", { class: "mod-mid" });
        mid.appendChild(el("span", { class: "mod-title" },
          (step.kind === "checkpoint" ? "Checkpoint: " : "") + step.item.title));
        const meta = [];
        if (step.kind === "module") {
          meta.push(step.item.level, step.item.minutes + " min read", step.item.quiz.length + "-question quiz");
        } else {
          meta.push("cumulative", step.item.n + " questions");
        }
        if (rec && rec.best != null) meta.push("best " + rec.best + "%");
        mid.appendChild(el("span", { class: "mod-meta" }, meta.join(" · ")));
        r.appendChild(mid);
        r.appendChild(el("span", { class: "mod-st" },
          done ? "Passed" : locked ? "Locked" : isNext ? "Start" : ""));
        list.appendChild(r);
      };

      u.modules.forEach(m => addRow({ kind: "module", unit: u, item: m }, idx++));
      if (u.checkpoint) addRow({ kind: "checkpoint", unit: u, item: u.checkpoint }, idx++);
      card.appendChild(list);
      inner.appendChild(card);
    });

    inner.appendChild(el("p", { class: "footnote" },
      "Passing mark is 75%. Retake any quiz as often as you like: your best score is kept, and completed modules stay open for review."));
  };

  function open(step) {
    if (step.kind === "module") readModule(step.item);
    else runQuiz(step.item, GRE.shuffle(step.item.questions.slice()).slice(0, step.item.n), true);
  }

  /* ---------------- module reader ---------------- */

  function readModule(m) {
    GRE.show(root => {
      const el = GRE.el;
      const { bar, stage, inner } = GRE.chrome("GRE Study Course", m.title);
      root.appendChild(bar); root.appendChild(stage);

      inner.appendChild(el("div", { style: "margin-bottom:8px" },
        el("span", { class: "pill" }, m.level),
        el("span", { class: "pill" }, m.minutes + " min read")));
      inner.appendChild(el("h1", { class: "screen-title" }, m.title));

      const body = el("div", { class: "lesson" });
      body.innerHTML = m.content;
      inner.appendChild(body);

      prog().read[m.id] = true;
      GRE.store.save();

      const row = el("div", { class: "btnrow" });
      row.appendChild(el("button", { class: "bigbtn", onclick: () => runQuiz(m, GRE.shuffle(m.quiz.slice()), false) },
        `Take the module quiz (${m.quiz.length} questions)`));
      row.appendChild(el("button", { class: "bigbtn secondary", onclick: () => GRE.show(GRE.screens.course) },
        "Back to syllabus"));
      inner.appendChild(row);
    });
  }

  /* ---------------- quiz runner ---------------- */

  function runQuiz(owner, qs, isCheckpoint) {
    const el = GRE.el;
    const answers = new Array(qs.length).fill(null);
    let i = 0, submitted = false;

    GRE.show(root => {
      const { bar, stage, inner } = GRE.chrome("GRE Study Course",
        (isCheckpoint ? "Checkpoint: " : "Quiz: ") + owner.title);
      root.appendChild(bar); root.appendChild(stage);
      paint();

      function paint() {
        inner.innerHTML = "";
        if (submitted) { results(); return; }
        const q = qs[i];
        inner.appendChild(el("div", { style: "margin-bottom:10px" },
          el("span", { class: "pill" }, (isCheckpoint ? "Checkpoint: " : "Quiz: ") + owner.title),
          el("span", { class: "pill" }, `Question ${i + 1} of ${qs.length}`)));

        if (Array.isArray(q.answer)) {
          inner.appendChild(el("div", { class: "directions" }, `Select ${q.answer.length} answers.`));
        }
        GRE.renderQBody(inner, { q: asQ(q) }, () => answers[i], v => { answers[i] = v; },
          { hideDirections: true });

        const row = el("div", { class: "btnrow" });
        if (i > 0) row.appendChild(el("button", { class: "bigbtn secondary", onclick: () => { i--; paint(); } }, "◀ Back"));
        row.appendChild(el("button", { class: "bigbtn", onclick: () => {
          const need = Array.isArray(q.answer) ? q.answer.length : 1;
          const got = answers[i] == null ? 0 : (Array.isArray(answers[i]) ? answers[i].length : 1);
          if (got !== need) {
            GRE.modal("Answer required",
              `<p>Select ${need === 1 ? "an answer" : need + " answers"} before continuing.</p>`);
            return;
          }
          if (i < qs.length - 1) { i++; paint(); } else { submitted = true; paint(); }
        } }, i < qs.length - 1 ? "Next ▶" : "Submit quiz"));
        row.appendChild(el("button", { class: "bigbtn secondary", onclick: () => GRE.show(GRE.screens.course) }, "Exit"));
        inner.appendChild(row);
        stage.scrollTop = 0;
      }

      function results() {
        const correct = qs.reduce((s, q, j) => s + (GRE.gradeQ(asQ(q), answers[j]) ? 1 : 0), 0);
        const pct = Math.round(100 * correct / qs.length);
        const passed = pct >= PASS;

        const p = prog();
        const bucket = isCheckpoint ? p.checkpoints : p.modules;
        const rec = bucket[owner.id] || { best: 0, passed: false };
        rec.best = Math.max(rec.best || 0, pct);
        rec.passed = rec.passed || passed;
        bucket[owner.id] = rec;
        GRE.store.save();

        inner.appendChild(el("h1", { class: "screen-title" },
          (isCheckpoint ? "Checkpoint result: " : "Quiz result, ") + owner.title));
        inner.appendChild(el("div", { class: "passbanner " + (passed ? "pass" : "fail") },
          el("div", null,
            el("div", { class: "big" }, passed ? "PASSED" : "NOT YET"),
            el("div", { class: "sub" }, passed
              ? (isCheckpoint ? "Unit cleared. The next unit is unlocked." : "Module complete. The next step is unlocked.")
              : `You need ${PASS}% to pass. Read the explanations below, then retake it: there's no limit.`)),
          el("div", { style: "text-align:right" },
            el("div", { class: "big" }, pct + "%"),
            el("div", { class: "sub" }, `${correct} of ${qs.length} correct`))));

        qs.forEach((q, j) => {
          const ok = GRE.gradeQ(asQ(q), answers[j]);
          const box = el("div", { class: "rev-item" });
          box.appendChild(el("div", { class: "rhead" },
            el("strong", null, `Question ${j + 1}`),
            el("span", { class: ok ? "ok" : "no" }, ok ? "✔ Correct" : "✘ Incorrect")));
          GRE.renderQBody(box, { q: asQ(q) }, () => answers[j], () => {},
            { review: true, disabled: true, hideDirections: true });
          const ex = el("div", { class: "expl" });
          ex.innerHTML = "<strong>Explanation.</strong> " + q.expl;
          box.appendChild(ex);
          inner.appendChild(box);
        });

        const row = el("div", { class: "btnrow" });
        if (passed) {
          row.appendChild(el("button", { class: "bigbtn", onclick: () => GRE.show(GRE.screens.course) }, "Continue the course"));
        } else {
          row.appendChild(el("button", { class: "bigbtn", onclick: () => {
            const fresh = isCheckpoint
              ? GRE.shuffle(owner.questions.slice()).slice(0, owner.n)
              : GRE.shuffle(owner.quiz.slice());
            runQuiz(owner, fresh, isCheckpoint);
          } }, "Retake"));
          if (!isCheckpoint) {
            row.appendChild(el("button", { class: "bigbtn secondary", onclick: () => readModule(owner) }, "Re-read the module"));
          }
          row.appendChild(el("button", { class: "bigbtn secondary", onclick: () => GRE.show(GRE.screens.course) }, "Back to syllabus"));
        }
        inner.appendChild(row);
        stage.scrollTop = 0;
        window.scrollTo(0, 0);
      }
    });
  }
})();
