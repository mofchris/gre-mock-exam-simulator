/* GRE Mock Exam Simulator — app shell, router, storage */
(function () {
  "use strict";

  const GRE = window.GRE = window.GRE || {};

  /* ---------------- storage ---------------- */

  const Store = {
    key: "gre-sim-v1",
    data: null,
    load() {
      try {
        this.data = JSON.parse(localStorage.getItem(this.key)) || null;
      } catch (e) { this.data = null; }
      if (!this.data) {
        this.data = { attempts: [], missed: [], recent: [], inprogress: null, tutorSeen: {} };
      }
      this.data.attempts = this.data.attempts || [];
      this.data.missed = this.data.missed || [];
      this.data.recent = this.data.recent || [];
      this.data.tutorSeen = this.data.tutorSeen || {};
      return this.data;
    },
    save() {
      try { localStorage.setItem(this.key, JSON.stringify(this.data)); }
      catch (e) { /* storage full or blocked — keep running in-memory */ }
    }
  };
  GRE.store = Store;
  Store.load();

  /* ---------------- tiny DOM helpers ---------------- */

  GRE.el = function (tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    }
    for (const kid of kids) {
      if (kid == null) continue;
      n.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    }
    return n;
  };

  GRE.esc = function (s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  };

  GRE.modal = function (title, bodyHTML, buttons) {
    const veil = GRE.el("div", { class: "modal-veil" });
    const box = GRE.el("div", { class: "modal" });
    box.appendChild(GRE.el("h3", { html: title }));
    box.appendChild(GRE.el("div", { html: bodyHTML }));
    const row = GRE.el("div", { class: "btnrow" });
    (buttons || [{ label: "OK" }]).forEach(b => {
      row.appendChild(GRE.el("button", {
        class: "bigbtn" + (b.secondary ? " secondary" : ""),
        onclick: () => { document.body.removeChild(veil); if (b.action) b.action(); }
      }, b.label));
    });
    box.appendChild(row);
    veil.appendChild(box);
    document.body.appendChild(veil);
    return veil;
  };

  GRE.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  GRE.fmtTime = function (sec) {
    sec = Math.max(0, Math.round(sec));
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    const mm = String(m).padStart(2, "0"), ss = String(s).padStart(2, "0");
    return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
  };

  /* ---------------- question index ---------------- */

  // Builds a flat id → {q, passage} index across all bank shapes.
  GRE.buildIndex = function () {
    const B = window.GREBANK;
    const ix = {};
    (B.verbal || []).forEach(q => { ix[q.id] = { q }; });
    (B.quant || []).forEach(q => { ix[q.id] = { q }; });
    (B.vpassages || []).forEach(p => {
      p.questions.forEach(q => { ix[q.id] = { q, passage: p }; });
    });
    (B.disets || []).forEach(p => {
      p.questions.forEach(q => { ix[q.id] = { q, passage: p, di: true }; });
    });
    GRE.byId = ix;
  };

  /* ---------------- router ---------------- */

  const app = document.getElementById("app");
  GRE.root = app;

  GRE.show = function (fn) {
    GRE.calc && GRE.calc.hide && GRE.calc.hide();
    app.innerHTML = "";
    fn(app);
    app.querySelector(".stage") && (app.querySelector(".stage").scrollTop = 0);
    window.scrollTo(0, 0);
  };

  /* ---------------- chrome (top bar for non-exam screens) ---------------- */

  GRE.chrome = function (title, sub) {
    const bar = GRE.el("div", { class: "topbar" },
      GRE.el("div", { class: "brand" }, title || "GRE Mock Exam Simulator",
        GRE.el("small", null, sub || "Practice simulator — not affiliated with ETS")),
      GRE.el("div", { class: "btns" },
        GRE.el("button", { class: "tbtn", onclick: () => GRE.show(GRE.screens.home) },
          GRE.el("span", { class: "ic" }, "🏠"), "Home"))
    );
    const stage = GRE.el("div", { class: "stage" });
    const inner = GRE.el("div", { class: "stage-inner" });
    stage.appendChild(inner);
    return { bar, stage, inner };
  };

  /* ---------------- screens ---------------- */

  GRE.screens = GRE.screens || {};

  GRE.screens.home = function (root) {
    const { bar, stage, inner } = GRE.chrome();
    root.appendChild(bar); root.appendChild(stage);

    inner.appendChild(GRE.el("h1", { class: "screen-title" }, "GRE® General Test — Mock Exam Simulator"));
    inner.appendChild(GRE.el("p", { class: "screen-sub" },
      "Full-length section-adaptive mocks in the shorter (post-2023) format, plus a tutor mode for learning. Everything runs locally; your history stays on this computer."));

    const ip = Store.data.inprogress;
    if (ip) {
      const card = GRE.el("div", { class: "card" });
      card.appendChild(GRE.el("h3", null, "Exam in progress"));
      card.appendChild(GRE.el("p", null,
        `You have an unfinished mock (started ${new Date(ip.startedAt).toLocaleString()}, ` +
        `on section ${ip.currentSection + 1} of 5). The section clock keeps running only while the exam is open.`));
      const row = GRE.el("div", { class: "btnrow" });
      row.appendChild(GRE.el("button", { class: "bigbtn", onclick: () => GRE.exam.resume() }, "Resume exam"));
      row.appendChild(GRE.el("button", {
        class: "bigbtn secondary", onclick: () => {
          GRE.modal("Discard exam?", "<p>The in-progress attempt will be deleted and not scored.</p>", [
            { label: "Discard", action: () => { Store.data.inprogress = null; Store.save(); GRE.show(GRE.screens.home); } },
            { label: "Keep it", secondary: true }
          ]);
        }
      }, "Discard"));
      card.appendChild(row);
      inner.appendChild(card);
    }

    const grid = GRE.el("div", { class: "home-grid" });
    const tile = (em, h, p, fn) => {
      const t = GRE.el("button", { class: "home-tile", onclick: fn },
        GRE.el("div", { class: "em" }, em), GRE.el("h3", null, h), GRE.el("p", null, p));
      grid.appendChild(t);
    };
    tile("📝", "Take a Full Mock Exam",
      "The real thing: Issue essay + 4 adaptive Verbal/Quant sections, ~1h58m, with the PowerPrep-style interface, on-screen calculator, and 130–170 scoring.",
      () => GRE.exam.startIntro());
    tile("🎓", "Tutor Mode",
      "Learn before you test: untimed practice by question type, topic, and difficulty, with instant feedback, full explanations, and strategy guides.",
      () => GRE.show(GRE.screens.tutor));
    tile("📈", "Score History & Review",
      "Past attempts with scaled scores, percentiles, per-topic breakdowns, timing analytics, and question-by-question review.",
      () => GRE.show(GRE.screens.history));
    tile("❌", "Missed Questions Deck",
      "Every question you've gotten wrong — in mocks or tutor mode — collected for re-drilling until they stick.",
      () => GRE.show(GRE.screens.missed));
    inner.appendChild(grid);

    const B = window.GREBANK;
    const nQ = (B.quant || []).length + (B.disets || []).reduce((s, p) => s + p.questions.length, 0);
    const nV = (B.verbal || []).length + (B.vpassages || []).reduce((s, p) => s + p.questions.length, 0);
    inner.appendChild(GRE.el("p", { class: "footnote" },
      `Question bank: ${nV} verbal · ${nQ} quant · ${(B.essays || []).length} essay prompts. ` +
      "Each mock is assembled at random from blueprint slots — the number of distinct exams exceeds 10⁴⁰, and recently used questions are avoided. " +
      "GRE® is a registered trademark of ETS. This simulator is an independent study tool, not affiliated with or endorsed by ETS."));
  };

  GRE.screens.history = function (root) {
    const { bar, stage, inner } = GRE.chrome("Score History");
    root.appendChild(bar); root.appendChild(stage);
    inner.appendChild(GRE.el("h1", { class: "screen-title" }, "Score History"));

    const at = Store.data.attempts;
    if (!at.length) {
      inner.appendChild(GRE.el("p", { class: "screen-sub" }, "No completed mocks yet. Your scores and full reviews will appear here."));
      return;
    }
    inner.appendChild(GRE.results.trendChart(at));
    at.slice().reverse().forEach((a, revIdx) => {
      const i = at.length - 1 - revIdx;
      const row = GRE.el("div", { class: "attempt-row" });
      row.appendChild(GRE.el("div", null,
        GRE.el("strong", null, `Attempt ${i + 1}`), ` — ${new Date(a.date).toLocaleString()}`));
      row.appendChild(GRE.el("div", null,
        `V ${a.verbal.scaled} · Q ${a.quant.scaled} · Total ${a.verbal.scaled + a.quant.scaled}`));
      row.appendChild(GRE.el("button", { class: "linkish", onclick: () => GRE.results.showSaved(i) }, "View report"));
      inner.appendChild(row);
    });
  };

  GRE.screens.missed = function (root) {
    const { bar, stage, inner } = GRE.chrome("Missed Questions");
    root.appendChild(bar); root.appendChild(stage);
    inner.appendChild(GRE.el("h1", { class: "screen-title" }, "Missed Questions Deck"));
    const ids = Store.data.missed.filter(id => GRE.byId[id]);
    if (!ids.length) {
      inner.appendChild(GRE.el("p", { class: "screen-sub" }, "Nothing here yet — questions you miss in mocks or tutor mode land in this deck automatically."));
      return;
    }
    inner.appendChild(GRE.el("p", { class: "screen-sub" },
      `${ids.length} question${ids.length === 1 ? "" : "s"} to re-drill. Answer one correctly in this deck and it graduates out.`));
    const row = GRE.el("div", { class: "btnrow" });
    row.appendChild(GRE.el("button", { class: "bigbtn", onclick: () => GRE.tutor.startDeck(ids) }, "Drill the deck"));
    row.appendChild(GRE.el("button", {
      class: "bigbtn secondary", onclick: () => {
        GRE.modal("Clear deck?", "<p>All missed questions will be removed from the deck.</p>", [
          { label: "Clear", action: () => { Store.data.missed = []; Store.save(); GRE.show(GRE.screens.missed); } },
          { label: "Cancel", secondary: true }]);
      }
    }, "Clear deck"));
    inner.appendChild(row);
    const list = GRE.el("div", { style: "margin-top:18px" });
    ids.forEach(id => {
      const entry = GRE.byId[id];
      const q = entry.q;
      const d = GRE.el("div", { class: "attempt-row" });
      d.appendChild(GRE.el("div", null,
        GRE.el("span", { class: "pill" }, GRE.describeType(q, entry)),
        GRE.el("span", { class: "pill" }, q.diff || "medium")));
      const t = (q.text || q.info || (entry.passage ? entry.passage.title || "Passage question" : "")).replace(/<[^>]+>/g, "");
      d.appendChild(GRE.el("div", { style: "flex:1;margin:0 14px;color:#5a6470;font-size:13.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" },
        t.slice(0, 90) + (t.length > 90 ? "…" : "")));
      list.appendChild(d);
    });
    inner.appendChild(list);
  };

  /* ---------------- boot ---------------- */

  GRE.buildIndex();
  GRE.show(GRE.screens.home);
})();
