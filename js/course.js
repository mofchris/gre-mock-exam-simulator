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
  C.isDone = isDone;

  function unlockedIndex() {
    const s = steps();
    for (let i = 0; i < s.length; i++) if (!isDone(s[i])) return i;
    return s.length;
  }
  C.unlockedIndex = unlockedIndex;
  C.courseComplete = () => unlockedIndex() >= steps().length;

  C.percentComplete = function () {
    const s = steps();
    if (!s.length) return 0;
    return Math.round(100 * s.filter(isDone).length / s.length);
  };

  function stepIndexOf(id) {
    return steps().findIndex(s => s.item.id === id);
  }

  /* ---------------- syllabus ---------------- */

  GRE.screens.course = function (root) {
    const el = GRE.el;
    const { head, stage, inner } = GRE.chrome("Course");
    root.appendChild(head); root.appendChild(stage);

    const pct = C.percentComplete();
    const s = steps();
    const uIdx = unlockedIndex();
    const done = s.filter(isDone).length;

    inner.appendChild(el("h1", { class: "screen-title" }, "GRE Study Course"));
    inner.appendChild(el("p", { class: "screen-sub" },
      "Read each module, pass its quiz at 75% to unlock the next, and clear the cumulative " +
      "checkpoint at the end of every unit. Finish the course to unlock the full adaptive mock."));

    const pc = el("div", { class: "progcard" });
    pc.appendChild(el("div", { class: "top" },
      el("span", { class: "lbl" }, "Course progress"),
      el("span", { class: "num", html: `${done} / ${s.length} steps · <b>${pct}%</b>` })));
    const track = el("div", { class: "track" });
    track.appendChild(el("i", { style: `width:${pct}%` }));
    pc.appendChild(track);
    inner.appendChild(pc);

    if (C.courseComplete()) {
      inner.appendChild(el("button", {
        class: "btn good big wide", style: "margin-bottom:22px",
        onclick: () => GRE.exam.startIntro()
      }, "Course complete, take the mock exam", GRE.icon("arrow", 18)));
    }

    let idx = 0;
    (window.GRECOURSE.units || []).forEach((u, ui) => {
      const group = el("div", { class: "unitgroup" });
      const n = u.modules.length + (u.checkpoint ? 1 : 0);
      const start = idx;
      const unitDone = uIdx >= start + n;
      const unitCur = !unitDone && uIdx >= start && uIdx < start + n;

      const hd = el("div", { class: "unithead" });
      hd.appendChild(unitDone
        ? el("span", { class: "pill good" }, `UNIT ${ui + 1}`, GRE.icon("check", 12, 3.4))
        : unitCur
          ? el("span", { class: "pill accent" }, `UNIT ${ui + 1} · IN PROGRESS`)
          : el("span", { class: "pill" }, `UNIT ${ui + 1}`, GRE.icon("lock", 12)));
      hd.appendChild(el("span", { class: "nm" }, u.title));
      group.appendChild(hd);
      if (u.blurb) group.appendChild(el("p", { class: "unitblurb" }, u.blurb));

      const list = el("div", { class: "mod-list" });
      const addRow = (step, i) => {
        const isCp = step.kind === "checkpoint";
        const d = isDone(step);
        const locked = i > uIdx;
        const isNext = i === uIdx;
        const p = prog();
        const rec = isCp ? p.checkpoints[step.item.id] : p.modules[step.item.id];

        const row = el("button", {
          class: "mod-row" + (d ? " done" : "") + (locked ? " locked" : "") +
                 (isNext ? " next" : "") + (isCp ? " cp" : ""),
          disabled: locked ? "disabled" : null,
          onclick: () => { if (!locked) open(step); }
        });

        row.appendChild(el("span", { class: "mod-ic" },
          d ? GRE.icon("check", 14, 3.2)
            : locked ? GRE.icon("lock", 13)
            : isCp ? GRE.icon("flag", 13)
            : GRE.icon("play", 12)));

        const meta = [];
        if (isCp) { meta.push("cumulative"); meta.push(step.item.n + " questions"); }
        else {
          meta.push(step.item.level);
          meta.push(step.item.minutes + " min");
          meta.push(step.item.quiz.length + "-question quiz");
        }
        if (rec && rec.best != null) meta.push("best " + rec.best + "%");
        else if (locked) meta.push("locked");

        row.appendChild(el("span", { class: "mod-mid" },
          el("span", { class: "mod-title" }, (isCp ? "Checkpoint: " : "") + step.item.title),
          el("span", { class: "mod-meta" }, meta.join(" · "))));

        const st = el("span", { class: "mod-st" });
        if (d) st.appendChild(document.createTextNode("PASSED"));
        else if (locked) st.appendChild(document.createTextNode("LOCKED"));
        else if (isNext) {
          st.appendChild(document.createTextNode(rec && rec.best != null ? "RESUME" : "START"));
          st.appendChild(GRE.icon("chevR", 15, 2.4));
        }
        row.appendChild(st);
        list.appendChild(row);
      };

      u.modules.forEach(m => addRow({ kind: "module", unit: u, item: m }, idx++));
      if (u.checkpoint) addRow({ kind: "checkpoint", unit: u, item: u.checkpoint }, idx++);
      group.appendChild(list);
      inner.appendChild(group);
    });

    inner.appendChild(el("p", { class: "footnote" },
      "Passing mark is 75%. Retake any quiz as often as you like: your best score is kept, and " +
      "completed modules stay open for review."));
  };

  function open(step) {
    if (step.kind === "module") readModule(step.item);
    else runQuiz(step.item, GRE.shuffle(step.item.questions.slice()).slice(0, step.item.n), true);
  }

  /* ---------------- module reader ---------------- */

  function readModule(m) {
    GRE.show(root => {
      const el = GRE.el;
      const all = steps();
      const i = stepIndexOf(m.id);
      const unit = i >= 0 ? all[i].unit : null;
      const mods = all.filter(s => s.kind === "module");
      const modNo = mods.findIndex(s => s.item.id === m.id) + 1;

      root.appendChild(GRE.crumb(
        [["Course", () => GRE.show(GRE.screens.course)], unit ? unit.title : "Unit", m.title],
        modNo ? `module ${modNo} of ${mods.length}` : null));

      const hair = GRE.hairline(0);
      root.appendChild(hair);
      const fill = hair.firstChild;

      const { stage, inner } = GRE.stage("reader");
      root.appendChild(stage);

      // Reading progress tracks how far through the lesson you've scrolled.
      stage.addEventListener("scroll", () => {
        const max = stage.scrollHeight - stage.clientHeight;
        fill.style.width = (max > 0 ? Math.min(100, 100 * stage.scrollTop / max) : 100) + "%";
      });

      inner.appendChild(el("div", { class: "pillrow" },
        el("span", { class: "pill accent" }, m.level),
        el("span", { class: "pill" }, m.minutes + " min read")));
      inner.appendChild(el("h1", { class: "lesson-h1" }, m.title));

      const body = el("div", { class: "lesson" });
      body.innerHTML = m.content;
      inner.appendChild(body);

      prog().read[m.id] = true;
      GRE.store.save();

      const prevStep = i > 0 ? all[i - 1] : null;
      const canPrev = !!(prevStep && prevStep.kind === "module");
      const foot = el("div", { class: "lessonfoot" });
      foot.appendChild(el("button", {
        class: "btn secondary",
        disabled: canPrev ? null : "disabled",
        onclick: () => { if (canPrev) readModule(prevStep.item); }
      }, GRE.icon("chevL", 16), "Previous"));
      foot.appendChild(el("button", {
        class: "btn grow", onclick: () => runQuiz(m, GRE.shuffle(m.quiz.slice()), false)
      }, `Take the module quiz (${m.quiz.length} questions)`, GRE.icon("arrow", 17)));
      inner.appendChild(foot);
    });
  }

  /* ---------------- quiz runner ---------------- */

  function runQuiz(owner, qs, isCheckpoint) {
    const el = GRE.el;
    const answers = new Array(qs.length).fill(null);
    let i = 0, submitted = false;

    GRE.show(root => {
      const label = (isCheckpoint ? "Checkpoint" : "Quiz") + " · " + owner.title;
      const crumb = GRE.crumb([["Course", () => GRE.show(GRE.screens.course)], label], "");
      const counter = crumb.querySelector(".right");
      root.appendChild(crumb);

      const hair = GRE.hairline(0);
      root.appendChild(hair);
      const fill = hair.firstChild;

      const { stage, inner } = GRE.stage();
      root.appendChild(stage);
      paint();

      function paint() {
        inner.innerHTML = "";
        if (submitted) { results(); return; }

        const q = qs[i];
        counter.textContent = `Question ${i + 1} of ${qs.length}`;
        fill.style.width = (100 * (i + 1) / qs.length) + "%";

        if (Array.isArray(q.answer)) {
          inner.appendChild(el("div", { class: "directions" },
            `Select ${q.answer.length} answers. Every one must be right for credit.`));
        }
        GRE.renderQBody(inner, { q: asQ(q) }, () => answers[i], v => { answers[i] = v; },
          { hideDirections: true });

        const row = el("div", { class: "btnrow", style: "justify-content:space-between" });
        const left = el("div", { style: "display:flex;gap:12px" });
        if (i > 0) left.appendChild(el("button", {
          class: "btn secondary", onclick: () => { i--; paint(); }
        }, GRE.icon("chevL", 16), "Back"));
        left.appendChild(el("button", {
          class: "btn secondary", onclick: () => GRE.show(GRE.screens.course)
        }, "Exit"));
        row.appendChild(left);

        row.appendChild(el("button", {
          class: "btn", onclick: () => {
            const need = Array.isArray(q.answer) ? q.answer.length : 1;
            const got = answers[i] == null ? 0 : (Array.isArray(answers[i]) ? answers[i].length : 1);
            if (got !== need) {
              GRE.modal("Answer required",
                `<p>Select ${need === 1 ? "an answer" : need + " answers"} before continuing.</p>`,
                [{ label: "OK" }], { intent: "info" });
              return;
            }
            if (i < qs.length - 1) { i++; paint(); } else { submitted = true; paint(); }
          }
        }, i < qs.length - 1 ? "Next" : "Submit quiz",
           i < qs.length - 1 ? GRE.icon("chevR", 16) : null));
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

        counter.textContent = "Result";
        fill.style.width = "100%";

        inner.appendChild(el("h1", { class: "screen-title", style: "margin-bottom:16px" },
          (isCheckpoint ? "Checkpoint result: " : "Quiz result: ") + owner.title));

        const banner = el("div", { class: "banner " + (passed ? "pass" : "fail") });
        banner.appendChild(el("div", { class: "left" },
          el("span", { class: "tile" }, GRE.icon(passed ? "check" : "x", 24, 2.6)),
          el("div", null,
            el("div", { class: "word" }, passed ? "Passed" : "Not yet"),
            el("div", { class: "ctx" }, passed
              ? (isCheckpoint ? "Unit cleared. The next unit is unlocked."
                              : "Module complete, the next step is unlocked.")
              : "You need 75% to pass, retake it: there's no limit."))));
        banner.appendChild(el("div", { class: "right" },
          el("div", { class: "score" }, pct + "%"),
          el("div", { class: "scale" }, `${correct} of ${qs.length} correct`)));
        inner.appendChild(banner);

        qs.forEach((q, j) => {
          const ok = GRE.gradeQ(asQ(q), answers[j]);
          const box = el("div", { class: "rev-item", style: "margin-top:16px" });
          const vd = el("span", { class: "vd " + (ok ? "ok" : "no") });
          vd.appendChild(GRE.icon(ok ? "check" : "x", 13, ok ? 3 : 2.6));
          vd.appendChild(document.createTextNode(ok ? "Correct" : "Incorrect"));
          box.appendChild(el("div", { class: "rhead" },
            el("span", { class: "qn" }, `Question ${j + 1}`), vd));
          GRE.renderQBody(box, { q: asQ(q) }, () => answers[j], () => {},
            { review: true, disabled: true, hideDirections: true });
          const ex = el("div", { class: "expl" });
          ex.innerHTML = "<strong>Explanation.</strong> " + q.expl;
          box.appendChild(ex);
          inner.appendChild(box);
        });

        const row = el("div", { class: "btnrow" });
        if (passed) {
          row.appendChild(el("button", {
            class: "btn", style: "flex:1", onclick: () => GRE.show(GRE.screens.course)
          }, "Continue the course", GRE.icon("arrow", 17)));
        } else {
          row.appendChild(el("button", {
            class: "btn", onclick: () => {
              const fresh = isCheckpoint
                ? GRE.shuffle(owner.questions.slice()).slice(0, owner.n)
                : GRE.shuffle(owner.quiz.slice());
              runQuiz(owner, fresh, isCheckpoint);
            }
          }, "Retake quiz"));
          if (!isCheckpoint) {
            row.appendChild(el("button", {
              class: "btn secondary", onclick: () => readModule(owner)
            }, "Re-read module"));
          }
          row.appendChild(el("button", {
            class: "btn secondary", onclick: () => GRE.show(GRE.screens.course)
          }, "Back to syllabus"));
        }
        inner.appendChild(row);
        stage.scrollTop = 0;
        window.scrollTo(0, 0);
      }
    });
  }
})();
