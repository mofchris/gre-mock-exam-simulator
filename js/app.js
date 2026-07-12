/* GRE Mock Exam Simulator - app shell, router, storage, icons, chrome */
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
    save(data, fromSync) {
      if (data) this.data = data;                 // sync engine writes the merged blob here
      this.data._savedAt = Date.now();            // additive recency stamp (spec section 5)
      try { localStorage.setItem(this.key, JSON.stringify(this.data)); }
      catch (e) { /* storage full or blocked: keep running in-memory */ }
      if (!fromSync && GRE.sync) GRE.sync.onLocalSave();
    }
  };
  GRE.store = Store;
  Store.load();

  /* ---------------- DOM helpers ---------------- */

  GRE.el = function (tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), attrs[k]);
      // null/undefined means "omit". Passing them through would set boolean
      // attributes like disabled to the string "null", which still disables.
      else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    }
    for (const kid of kids) {
      if (kid == null) continue;
      n.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    }
    return n;
  };

  GRE.esc = function (s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  };

  /* ---------------- icon system (replaces all emoji) ---------------- */

  const SVGNS = "http://www.w3.org/2000/svg";
  const ICONS = {
    check:   { d: "M5 12l4 4 10-11", w: 2.6 },
    x:       { d: "M6 6l12 12M18 6L6 18", w: 2.6 },
    lock:    { d: "M8 10.5V8a4 4 0 0 1 8 0v2.5", rect: [5, 10.5, 14, 9.5, 2] },
    flag:    { d: "M5 21V4h11l-2 4 2 4H5" },
    clock:   { d: "M12 7v5l3 2", circle: [12, 12, 9] },
    play:    { d: "M8 5v14l11-7z", fill: true },
    arrow:   { d: "M4 12h14M12 6l6 6-6 6", w: 2.2 },
    arrowsm: { d: "M5 12h14M13 6l6 6-6 6", w: 2 },
    chevR:   { d: "M9 6l6 6-6 6", w: 2.2 },
    chevL:   { d: "M15 6l-6 6 6 6", w: 2.2 },
    chevD:   { d: "M6 9l6 6 6-6", w: 2.2 },
    target:  { d: "", circle2: [[12, 12, 8], [12, 12, 3]] },
    chart:   { d: "M5 20V10M12 20V4M19 20v-7" },
    book:    { d: "M4 5v14M8 5h12v14H8M8 9h12M8 13h12" },
    quiz:    { d: "M9 11l3 3 8-8M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" },
    alert:   { d: "M12 3l9 16H3zM12 9v4M12 17h.01" },
    tutor:   { d: "M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z" },
    logo:    { d: "M5 6h14M5 11h9M5 16h11" },
    /* exam toolbar */
    exit:    { d: "M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M9 16l4-4-4-4M13 12H4", w: 1.9 },
    list:    { d: "M4 6h16M4 12h16M4 18h16", w: 1.9 },
    help:    { d: "M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3M12 17h.01", circle: [12, 12, 9], w: 1.9 },
    calc:    { d: "M8 7h8M8 11h2M12 11h2M16 11h.01M8 15h2M12 15h2M16 15h.01", rect: [5, 3, 14, 18, 2], w: 1.9 }
  };

  GRE.icon = function (name, size, strokeWidth) {
    const spec = ICONS[name] || ICONS.check;
    const s = size || 16;
    const svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("width", s);
    svg.setAttribute("height", s);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", spec.fill ? "currentColor" : "none");
    svg.setAttribute("stroke", spec.fill ? "none" : "currentColor");
    svg.setAttribute("stroke-width", strokeWidth || spec.w || 2);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");

    const add = (tag, at) => {
      const n = document.createElementNS(SVGNS, tag);
      for (const k in at) n.setAttribute(k, at[k]);
      svg.appendChild(n);
    };
    if (spec.rect) add("rect", { x: spec.rect[0], y: spec.rect[1], width: spec.rect[2], height: spec.rect[3], rx: spec.rect[4] });
    if (spec.circle) add("circle", { cx: spec.circle[0], cy: spec.circle[1], r: spec.circle[2] });
    (spec.circle2 || []).forEach(c => add("circle", { cx: c[0], cy: c[1], r: c[2] }));
    if (spec.d) add("path", { d: spec.d });
    return svg;
  };

  /* ---------------- modal (focus trap, Escape, focus return) ---------------- */

  GRE.modal = function (title, bodyHTML, buttons, opts) {
    opts = opts || {};
    const el = GRE.el;
    const opener = document.activeElement;

    const veil = el("div", { class: "modal-veil" });
    const box = el("div", {
      class: "modal" + (opts.large ? " lg" : ""),
      role: "dialog", "aria-modal": "true", "aria-label": String(title).replace(/<[^>]+>/g, "")
    });

    const intent = opts.intent;
    if (intent) {
      const ic = intent === "danger" ? "alert" : intent === "warning" ? "clock" : "book";
      box.appendChild(el("div", { class: "tile " + intent }, GRE.icon(ic, 24)));
    }
    box.appendChild(el("h3", { html: title }));
    box.appendChild(el("div", { class: "mbody", html: bodyHTML || "" }));

    const close = () => {
      document.removeEventListener("keydown", onKey, true);
      if (veil.parentNode) document.body.removeChild(veil);
      if (opener && opener.focus) opener.focus();
    };

    const row = el("div", { class: "btnrow" });
    (buttons || [{ label: "OK" }]).forEach(b => {
      const cls = b.secondary ? "btn secondary" : b.danger ? "btn danger" : "btn";
      row.appendChild(el("button", {
        class: cls,
        onclick: () => { close(); if (b.action) b.action(); }
      }, b.label));
    });
    box.appendChild(row);
    veil.appendChild(box);
    document.body.appendChild(veil);

    const focusable = () => box.querySelectorAll("button, [href], input, select, textarea, summary");

    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      const f = focusable();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey, true);

    const f = focusable();
    if (f.length) f[0].focus();
    return { close };
  };

  /* ---------------- utils ---------------- */

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

  GRE.TOPICS = { arithmetic: "Arithmetic", algebra: "Algebra", geometry: "Geometry", data: "Data Analysis" };

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
    const st = app.querySelector(".stage");
    if (st) st.scrollTop = 0;
    window.scrollTo(0, 0);
    // Move focus to the new screen's heading so keyboard/SR users land in the right place.
    const h = app.querySelector(".screen-title, .lesson-h1");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  };

  /* ---------------- chrome builders ---------------- */

  const NAV = [
    ["Dashboard", () => GRE.show(GRE.screens.home)],
    ["Course", () => GRE.show(GRE.screens.course)],
    ["Tutor", () => GRE.show(GRE.screens.tutor)],
    ["History", () => GRE.show(GRE.screens.history)]
  ];

  GRE.chrome = function (active) {
    const el = GRE.el;
    const syncMount = el("div", { class: "syncwrap" });
    const head = el("div", { class: "tophead" },
      el("div", { class: "brandwrap" },
        el("span", { class: "logo" }, GRE.icon("logo", 19)),
        el("div", { class: "names" },
          el("div", { class: "pname" }, "GRE Mock Simulator"),
          el("div", { class: "psub" }, "shorter format · independent study tool"))),
      el("div", { class: "topright" },
        el("nav", { class: "topnav", "aria-label": "Main" },
          ...NAV.map(([label, go]) => el("button", {
            class: active === label ? "on" : "",
            "aria-current": active === label ? "page" : null,
            onclick: go
          }, label))),
        syncMount));

    if (GRE.sync) GRE.sync.mountHeader(syncMount);

    const stage = el("div", { class: "stage" });
    const inner = el("div", { class: "stage-inner screen-in" });
    stage.appendChild(inner);
    return { head, bar: head, stage, inner };
  };

  /* Breadcrumb: GRE.crumb([["Dashboard", fn], "Tutor Mode"], "right text") */
  GRE.crumb = function (parts, right) {
    const el = GRE.el;
    const bar = el("div", { class: "crumb" });
    parts.forEach((p, i) => {
      if (i) bar.appendChild(el("span", { class: "sep" }, "/"));
      if (Array.isArray(p)) {
        bar.appendChild(el("button", { onclick: p[1] }, GRE.icon("chevL", 16), p[0]));
      } else {
        bar.appendChild(el("span", { class: "cur" }, p));
      }
    });
    // Always present so callers can fill it in later (quiz counters do this).
    bar.appendChild(el("span", { class: "right" }, right || ""));
    return bar;
  };

  GRE.hairline = function (pct) {
    const bar = GRE.el("div", { class: "hairline" });
    bar.appendChild(GRE.el("i", { style: `width:${Math.max(0, Math.min(100, pct))}%` }));
    return bar;
  };

  GRE.stage = function (extra) {
    const stage = GRE.el("div", { class: "stage" });
    const inner = GRE.el("div", { class: "stage-inner screen-in" + (extra ? " " + extra : "") });
    stage.appendChild(inner);
    return { stage, inner };
  };

  /* ---------------- screens ---------------- */

  GRE.screens = GRE.screens || {};

  const DISCLAIMER =
    "GRE® is a registered trademark of ETS. This simulator is an independent study tool, " +
    "not affiliated with or endorsed by ETS. Scores are estimates.";

  /* ============ dashboard ============ */

  GRE.screens.home = function (root) {
    const el = GRE.el;
    const { head, stage, inner } = GRE.chrome("Dashboard");
    inner.classList.add("wide");
    root.appendChild(head); root.appendChild(stage);

    const C = GRE.course;
    const steps = C ? C.steps() : [];
    const uIdx = C ? C.unlockedIndex() : 0;
    const pct = C ? C.percentComplete() : 0;
    const complete = C ? C.courseComplete() : false;
    const ip = Store.data.inprogress;

    inner.appendChild(el("h1", { class: "screen-title" }, "Dashboard"));
    inner.appendChild(el("p", { class: "screen-sub" },
      "Everything runs in your browser. Your history stays on this computer."));

    if (!ip && pct === 0 && !Store.data.attempts.length) {
      inner.appendChild(firstUse());
      inner.appendChild(el("p", { class: "footnote" }, DISCLAIMER));
      return;
    }

    const dash = el("div", { class: "dash" });
    const main = el("div", { class: "dash-main" });
    const rail = el("div", { class: "dash-rail" });

    if (ip) main.appendChild(examPaused(ip));
    else if (complete) main.appendChild(courseDone());
    else main.appendChild(heroContinue(steps, uIdx));

    main.appendChild(readiness(steps, uIdx, pct, complete));
    const chart = diagnosticChart();
    if (chart) main.appendChild(chart);

    rail.appendChild(struggling());
    rail.appendChild(courseMap(steps, uIdx));
    rail.appendChild(quickTools());

    dash.appendChild(main); dash.appendChild(rail);
    inner.appendChild(dash);
    inner.appendChild(el("p", { class: "footnote" }, bankLine() + " " + DISCLAIMER));

    /* ---- pieces ---- */

    function bankLine() {
      const B = window.GREBANK;
      const nQ = (B.quant || []).length + (B.disets || []).reduce((s, p) => s + p.questions.length, 0);
      const nV = (B.verbal || []).length + (B.vpassages || []).reduce((s, p) => s + p.questions.length, 0);
      return `Question bank: ${nV} verbal · ${nQ} quant · ${(B.essays || []).length} essay prompts. ` +
        "Each mock is assembled at random from blueprint slots, and recently used questions are avoided.";
    }

    function firstUse() {
      const card = el("div", { class: "card", style: "max-width:620px" });
      card.appendChild(el("div", { class: "eyebrow" }, "Welcome"));
      card.appendChild(el("h2", {
        class: "serif",
        style: "font-size:24px;font-weight:500;margin:8px 0;letter-spacing:-.01em"
      }, "Start with the course."));
      card.appendChild(el("p", { style: "color:var(--muted);margin:0 0 22px;font-size:14.5px;line-height:1.6" },
        `${steps.filter(s => s.kind === "module").length} modules from the basics to the hardest material. ` +
        "Pass each quiz at 75% to unlock the next; finish to unlock the full adaptive mock."));
      const first = steps[0];
      card.appendChild(el("button", {
        class: "btn big wide",
        onclick: () => GRE.show(GRE.screens.course)
      }, first ? "Begin " + first.unit.title : "Begin the course", GRE.icon("arrow", 18)));

      const stats = el("div", { class: "statgrid" });
      const stat = (v, l) => stats.appendChild(el("div", { class: "stat" },
        el("div", { class: "v" }, v), el("div", { class: "l" }, l)));
      stat("2", "measures");
      stat("130–170", "per section");
      stat("~1h58m", "full test");
      card.appendChild(stats);
      return card;
    }

    function heroContinue(steps, uIdx) {
      const next = steps[uIdx];
      const hero = el("div", { class: "hero" });
      const box = el("div", { class: "inner" });
      box.appendChild(el("div", { class: "eyebrow" }, "Pick up where you left off"));

      const modules = steps.filter(s => s.kind === "module");
      const modNo = next.kind === "module" ? modules.indexOf(next) + 1 : 0;
      const meta = el("div", { class: "meta" });
      if (next.kind === "module") {
        meta.appendChild(el("span", null, GRE.icon("clock", 15), next.item.minutes + " min read"));
        meta.appendChild(el("span", null, GRE.icon("quiz", 15),
          `${next.item.quiz.length}-question quiz · 75% to pass`));
      } else {
        meta.appendChild(el("span", null, GRE.icon("flag", 15), "cumulative checkpoint"));
        meta.appendChild(el("span", null, GRE.icon("quiz", 15), `${next.item.n} questions · 75% to pass`));
      }

      const left = el("div", { style: "min-width:0" },
        el("div", { class: "unit" },
          next.unit.title + (modNo ? ` · Module ${modNo} of ${modules.length}` : "")),
        el("h2", null, (next.kind === "checkpoint" ? "Checkpoint: " : "") + next.item.title),
        meta);

      box.appendChild(el("div", { class: "splitrow" }, left,
        el("button", {
          class: "btn white", onclick: () => GRE.show(GRE.screens.course)
        }, next.kind === "checkpoint" ? "Take the checkpoint" : "Continue module", GRE.icon("arrow", 18))));
      hero.appendChild(box);
      return hero;
    }

    function examPaused(ip) {
      const p = el("div", { class: "panel amber" });
      p.appendChild(el("div", { class: "flag" }, GRE.icon("clock", 16), "Exam paused"));
      p.appendChild(el("h3", null, "You have an unfinished mock"));
      const sec = ip.sections ? ip.sections[ip.currentSection] : null;
      const label = sec ? (sec.label || "Analytical Writing") : "";
      p.appendChild(el("p", { html:
        `Started ${GRE.esc(new Date(ip.startedAt).toLocaleString())} · on ` +
        `<span class="mono" style="font-weight:600">Section ${ip.currentSection + 1} of 5</span>` +
        (label ? ` (${GRE.esc(label)})` : "") +
        ". The section clock runs only while the exam is open." }));

      // one pip per section: done / current / not reached
      const pips = el("div", { class: "pips" });
      (ip.sections || []).forEach((s, i) => {
        pips.appendChild(el("i", {
          class: s.done ? "done" : i === ip.currentSection ? "cur" : ""
        }));
      });
      p.appendChild(pips);

      p.appendChild(el("div", { style: "display:flex;gap:12px" },
        el("button", { class: "btn", style: "flex:1", onclick: () => GRE.exam.resume() }, "Resume exam"),
        el("button", {
          class: "btn danger-outline",
          onclick: () => GRE.modal("Discard exam?",
            "<p>The in-progress attempt will be deleted and not scored.</p>",
            [{ label: "Discard", danger: true, action: () => { Store.data.inprogress = null; Store.save(); GRE.show(GRE.screens.home); } },
             { label: "Keep it", secondary: true }],
            { intent: "danger" })
        }, "Discard")));
      return p;
    }

    function courseDone() {
      const p = el("div", { class: "panel good" });
      p.appendChild(el("span", { class: "bigtile" }, GRE.icon("check", 28, 2.6)));
      p.appendChild(el("div", { class: "ctitle" }, "Course complete"));
      p.appendChild(el("p", null,
        "Every module and checkpoint passed. The full adaptive mock is unlocked."));
      p.appendChild(el("button", {
        class: "btn good big wide", onclick: () => GRE.exam.startIntro()
      }, "Take the full mock exam", GRE.icon("arrow", 18)));
      p.appendChild(el("div", { class: "cmeta" }, "Essay + 4 adaptive sections · ~1h 58m"));
      return p;
    }

    function readiness(steps, uIdx, pct, complete) {
      const card = el("div", { class: "card", style: "margin:0" });
      const hd = el("div", { class: "cardhead" }, el("h3", null, "Mock-exam readiness"));
      hd.appendChild(complete
        ? el("span", { class: "lockpill good" }, GRE.icon("check", 13, 3), "Unlocked")
        : el("span", { class: "lockpill" }, GRE.icon("lock", 13), "Locked · unlocks at 100%"));
      card.appendChild(hd);

      const units = window.GRECOURSE.units || [];
      const rail = el("div", { class: "units" });
      let idx = 0;
      units.forEach((u, i) => {
        const n = u.modules.length + (u.checkpoint ? 1 : 0);
        const start = idx; idx += n;
        const doneN = Math.max(0, Math.min(n, uIdx - start));
        const isDone = doneN === n;
        const isCur = !isDone && uIdx >= start && uIdx < start + n;
        const upct = n ? Math.round(100 * doneN / n) : 0;

        const cell = el("div", { class: "u" + (isDone ? " done" : isCur ? " cur" : "") });
        const seg = el("div", { class: "useg" });
        if (isCur && upct > 0) {
          seg.style.background = `linear-gradient(90deg, var(--accent) ${upct}%, var(--sub2) ${upct}%)`;
        }
        cell.appendChild(seg);
        cell.appendChild(el("span", { class: "ulbl" },
          "U" + (i + 1) + (isDone ? " ✓" : isCur ? " ···" : "")));
        rail.appendChild(cell);
      });
      card.appendChild(rail);

      const doneSteps = Math.min(uIdx, steps.length);
      const foot = el("div", { class: "readyfoot" });
      foot.appendChild(el("div", { class: "msg" }, complete
        ? "The mock is unlocked: essay + 4 adaptive sections."
        : "Finish the course to unlock the essay + 4 adaptive sections (~1h 58m)."));
      foot.appendChild(el("div", { class: "num" },
        el("b", null, pct + "%"),
        el("span", null, ` · ${doneSteps} / ${steps.length} steps`)));
      card.appendChild(foot);
      return card;
    }

    /* Paired Verbal/Quant bars, one group per completed mock. Real data only. */
    function diagnosticChart() {
      const at = Store.data.attempts;
      if (!at.length) return null;
      const recent = at.slice(-6);

      const card = el("div", { class: "card", style: "margin:0" });
      const hd = el("div", { class: "cardhead" }, el("h3", null, "Recent diagnostic scores"));
      hd.appendChild(el("div", { class: "vqlegend" },
        el("span", null, el("i", { class: "v" }), "Verbal"),
        el("span", null, el("i", { class: "q" }), "Quant")));
      card.appendChild(hd);

      // 130-170 maps to 0-100% of the bar height
      const h = s => Math.max(3, Math.round(100 * (s - 130) / 40));
      const chart = el("div", { class: "vqchart" });
      recent.forEach(a => {
        const v = a.verbal.scaled, q = a.quant.scaled;
        chart.appendChild(el("div", { class: "grp", title: `Verbal ${v} · Quant ${q}` },
          el("div", { class: "bars" },
            el("i", { class: "v", style: `height:${h(v)}%` }),
            el("i", { class: "q", style: `height:${h(q)}%` })),
          el("span", { class: "lbl" }, `V${v} Q${q}`)));
      });
      card.appendChild(chart);

      const last = recent[recent.length - 1];
      const weaker = last.verbal.scaled <= last.quant.scaled ? "Verbal" : "Quant";
      let msg = `Latest: Verbal ${last.verbal.scaled}, Quant ${last.quant.scaled}. ` +
        `${weaker} is your growth area.`;
      if (recent.length >= 2) {
        const first = recent[0];
        const dv = last.verbal.scaled - first.verbal.scaled;
        const dq = last.quant.scaled - first.quant.scaled;
        const dir = (dv + dq) > 0 ? "Trending up" : (dv + dq) < 0 ? "Trending down" : "Holding steady";
        msg = `${dir} across ${recent.length} mocks (V ${dv >= 0 ? "+" : ""}${dv}, Q ${dq >= 0 ? "+" : ""}${dq}). ` +
          `${weaker} is your growth area.`;
      }
      card.appendChild(el("p", { class: "takeaway" }, msg));
      return card;
    }

    function struggling() {
      const ids = Store.data.missed.filter(id => GRE.byId[id]);
      const card = el("div", { class: "card", style: "margin:0" });
      if (!ids.length) {
        card.appendChild(el("div", { class: "railhead" },
          el("span", { class: "tile good" }, GRE.icon("check", 19, 2.6)),
          el("div", null,
            el("div", { class: "lbl" }, "What you're struggling with"),
            el("div", { class: "val" }, "Nothing to re-drill"))));
        card.appendChild(el("p", { style: "font-size:13px;color:var(--muted);margin:14px 0 0" },
          "Questions you miss in mocks or tutor mode land here automatically."));
        return card;
      }
      card.appendChild(el("div", { class: "railhead" },
        el("span", { class: "tile bad" }, GRE.icon("x", 19, 2.4)),
        el("div", null,
          el("div", { class: "lbl" }, "What you're struggling with"),
          el("div", { class: "val" }, `${ids.length} missed question${ids.length === 1 ? "" : "s"}`))));

      const byType = {};
      ids.forEach(id => {
        const e = GRE.byId[id];
        const t = GRE.describeType(e.q, e).replace(/ \(.*\)$/, "");
        byType[t] = (byType[t] || 0) + 1;
      });
      const tags = el("div", { style: "display:flex;gap:6px;margin:15px 0;flex-wrap:wrap" });
      Object.keys(byType).sort((a, b) => byType[b] - byType[a]).slice(0, 4).forEach(t => {
        tags.appendChild(el("span", { class: "pill" }, `${t} · ${byType[t]}`));
      });
      card.appendChild(tags);
      card.appendChild(el("button", {
        class: "btn soft wide", onclick: () => GRE.tutor.startDeck(ids)
      }, "Drill the deck"));
      card.appendChild(el("button", {
        class: "linkish", style: "margin-top:8px", onclick: () => GRE.show(GRE.screens.missed)
      }, "View the deck"));
      return card;
    }

    function courseMap(steps, uIdx) {
      const card = el("div", { class: "card", style: "margin:0" });
      card.appendChild(el("h3", null, "Course map"));
      const list = el("div", { class: "cmap" });
      let idx = 0;
      (window.GRECOURSE.units || []).forEach(u => {
        const n = u.modules.length + (u.checkpoint ? 1 : 0);
        const start = idx, end = idx + n;
        idx = end;
        const doneN = Math.max(0, Math.min(n, uIdx - start));
        const isDone = doneN === n;
        const isCur = !isDone && uIdx >= start && uIdx < end;
        const row = el("div", { class: "row " + (isDone ? "done" : isCur ? "cur" : "locked") });
        row.appendChild(el("span", { class: "dot" },
          isDone ? GRE.icon("check", 13, 3.4) : isCur ? GRE.icon("play", 11) : GRE.icon("lock", 12)));
        row.appendChild(el("span", { class: "nm" }, u.title));
        if (isDone) row.appendChild(el("span", { class: "st" }, "done"));
        else if (isCur) row.appendChild(el("span", { class: "st" }, `${doneN}/${n}`));
        list.appendChild(row);
      });
      card.appendChild(list);
      return card;
    }

    function quickTools() {
      const tools = el("div", { class: "tools" });
      const tool = (icon, t1, t2, fn) => tools.appendChild(el("button", { class: "tool", onclick: fn },
        el("span", { class: "tile" }, GRE.icon(icon, 18)),
        el("span", { class: "txt" },
          el("span", { class: "t1" }, t1),
          el("span", { class: "t2" }, t2)),
        el("span", { class: "chev" }, GRE.icon("chevR", 17))));
      tool("tutor", "Tutor mode", "By type, topic & difficulty", () => GRE.show(GRE.screens.tutor));
      tool("chart", "Score history", "Past attempts and V/Q trend", () => GRE.show(GRE.screens.history));
      return tools;
    }
  };

  /* ============ score history ============ */

  GRE.screens.history = function (root) {
    const el = GRE.el;
    const { head, stage, inner } = GRE.chrome("History");
    root.appendChild(head); root.appendChild(stage);

    inner.appendChild(el("h1", { class: "screen-title" }, "Score History"));
    const at = Store.data.attempts;

    if (!at.length) {
      inner.appendChild(el("p", { class: "screen-sub" }, "Every completed mock lands here."));
      const card = el("div", { class: "card" });
      const e = el("div", { class: "empty" });
      e.appendChild(el("div", { class: "tile muted" }, GRE.icon("chart", 24)));
      e.appendChild(el("h3", null, "No completed mocks yet"));
      e.appendChild(el("p", null,
        "Finish the course to unlock the mock, then your score trend appears here."));
      e.appendChild(el("button", {
        class: "btn", onclick: () => GRE.show(GRE.screens.course)
      }, "Go to the course"));
      card.appendChild(e);
      inner.appendChild(card);
      return;
    }

    inner.appendChild(el("p", { class: "screen-sub" },
      `${at.length} completed ${at.length === 1 ? "attempt" : "attempts"}. ` +
      "Scores are estimates from an approximate raw-to-scale concordance."));
    inner.appendChild(GRE.results.trendChart(at));

    at.slice().reverse().forEach((a, ri) => {
      const i = at.length - 1 - ri;
      const row = el("div", { class: "attempt-row" });
      row.appendChild(el("div", null,
        el("strong", null, `Attempt ${i + 1}`),
        el("span", { class: "date" }, " · " + new Date(a.date).toLocaleString())));
      row.appendChild(el("div", { class: "right" },
        el("span", { class: "sc" },
          el("span", { class: "v" }, "V " + a.verbal.scaled), "  ",
          el("span", { class: "q" }, "Q " + a.quant.scaled), "  ",
          el("span", null, "Total " + (a.verbal.scaled + a.quant.scaled))),
        el("button", { class: "linkish", onclick: () => GRE.results.showSaved(i) }, "View report")));
      inner.appendChild(row);
    });
  };

  /* ============ missed deck ============ */

  GRE.screens.missed = function (root) {
    const el = GRE.el;
    const { head, stage, inner } = GRE.chrome();
    root.appendChild(head); root.appendChild(stage);

    inner.appendChild(el("h1", { class: "screen-title" }, "Missed Questions Deck"));
    const ids = Store.data.missed.filter(id => GRE.byId[id]);

    if (!ids.length) {
      inner.appendChild(el("p", { class: "screen-sub" },
        "Everything you get wrong lands here for re-drilling."));
      const card = el("div", { class: "card" });
      const e = el("div", { class: "empty" });
      e.appendChild(el("div", { class: "tile good" }, GRE.icon("check", 26, 2.2)));
      e.appendChild(el("h3", null, "Nothing to re-drill"));
      e.appendChild(el("p", null,
        "Questions you miss in mocks or tutor mode land here automatically. A clean deck is a good sign."));
      card.appendChild(e);
      inner.appendChild(card);
      return;
    }

    const card = el("div", { class: "card" });
    const hd = el("div", { class: "misshead" });
    hd.appendChild(el("div", null,
      el("div", { class: "n" }, String(ids.length)),
      el("div", { class: "l" },
        `question${ids.length === 1 ? "" : "s"} to re-drill · answer one correctly and it graduates out`)));
    hd.appendChild(el("button", {
      class: "btn accent", onclick: () => GRE.tutor.startDeck(ids)
    }, "Drill the deck"));
    card.appendChild(hd);

    ids.forEach(id => {
      const entry = GRE.byId[id];
      const q = entry.q;
      const row = el("div", { class: "missrow" });
      row.appendChild(el("span", { class: "pill" }, GRE.describeType(q, entry)));
      if (q.topic) row.appendChild(el("span", { class: "pill" }, GRE.TOPICS[q.topic] || q.topic));
      const t = (q.text || q.info ||
        (entry.passage ? (entry.passage.title || "Passage question") : "")).replace(/<[^>]+>/g, "").trim();
      row.appendChild(el("span", { class: "stem" }, t));
      card.appendChild(row);
    });

    card.appendChild(el("button", {
      class: "btn secondary", style: "margin-top:14px",
      onclick: () => GRE.modal("Clear deck?",
        `<p>All ${ids.length} missed questions will be removed from the deck.</p>`,
        [{ label: "Clear", danger: true, action: () => { Store.data.missed = []; Store.save(); GRE.show(GRE.screens.missed); } },
         { label: "Cancel", secondary: true }],
        { intent: "danger" })
    }, "Clear deck"));
    inner.appendChild(card);
  };

  /* ---------------- boot ---------------- */

  GRE.buildIndex();
  GRE.sync = StudySync.initSync(GRE, {
    app: "gre",
    load: () => Store.load(),
    save: (data, fromSync) => Store.save(data, fromSync)
  });
  GRE.show(GRE.screens.home);
})();
