/* Exam engine: assembly, timers, navigation, rendering, grading, autosave. */
(function () {
  "use strict";
  const GRE = window.GRE = window.GRE || {};

  /* ================= question utilities (shared with tutor/results) ================ */

  GRE.describeType = function (q, entry) {
    if (entry && entry.di) return "Data Interpretation";
    if (entry && entry.passage && !entry.di) return "Reading Comprehension";
    switch (q.type) {
      case "tc": return "Text Completion (" + (q.blanks || 1) + "-blank)";
      case "se": return "Sentence Equivalence";
      case "cr": return "Critical Reasoning";
      case "qc": return "Quantitative Comparison";
      case "mcq": return "Multiple Choice";
      case "mcma": return "Multiple Choice (multiple answers)";
      case "num": return "Numeric Entry";
      default: return q.type || "Question";
    }
  };

  const QC_CHOICES = [
    "Quantity A is greater.",
    "Quantity B is greater.",
    "The two quantities are equal.",
    "The relationship cannot be determined from the information given."
  ];
  GRE.QC_CHOICES = QC_CHOICES;

  GRE.directionsFor = function (q) {
    switch (q.type) {
      case "tc":
        return (q.blanks || 1) === 1
          ? "For the following question, select one entry for the blank from the list of choices. Fill the blank in the way that best completes the text."
          : "For the following question, select one entry for each blank from the corresponding column of choices. Fill all blanks in the way that best completes the text.";
      case "se":
        return "Select the two answer choices that, when used to complete the sentence, fit the meaning of the sentence as a whole and produce completed sentences that are alike in meaning.";
      case "cr": return "Select one answer choice.";
      case "qc": return "Compare Quantity A and Quantity B, using additional information centered above the two quantities if such information is given. Select one of the four answer choices.";
      case "mcma": return "Select one or more answer choices according to the specific question directions. Indicate all such choices.";
      case "num": return q.frac ? "Enter your answer as a fraction in the boxes." : "Enter your answer in the box.";
      default: return "Select one answer choice.";
    }
  };

  GRE.gradeQ = function (q, ans) {
    if (ans == null) return false;
    const eqSet = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
      a.slice().sort().join(",") === b.slice().sort().join(",");
    switch (q.type) {
      case "tc":
        if ((q.blanks || 1) === 1) return ans === q.answer;
        if (!Array.isArray(ans)) return false;
        return q.answer.every((v, i) => ans[i] === v);
      case "se": return eqSet(ans, q.answer);
      case "mcma": return eqSet(ans, q.answer);
      case "num": {
        if (q.frac) {
          if (!Array.isArray(ans)) return false;
          const n = parseFloat(ans[0]), d = parseFloat(ans[1]);
          if (!isFinite(n) || !isFinite(d) || d === 0) return false;
          return Math.abs(n * q.ansFrac[1] - d * q.ansFrac[0]) < 1e-9;
        }
        const v = parseFloat(String(ans).replace(/,/g, ""));
        return isFinite(v) && Math.abs(v - q.answer) < 1e-6;
      }
      default: return ans === q.answer; // qc, mcq, cr, tc1, rc single
    }
  };

  GRE.isAnswered = function (q, ans) {
    if (ans == null) return false;
    if (q.type === "tc" && (q.blanks || 1) > 1)
      return Array.isArray(ans) && ans.length === q.blanks && ans.every(v => v != null);
    if (q.type === "se") return Array.isArray(ans) && ans.length === 2;
    if (q.type === "mcma") return Array.isArray(ans) && ans.length > 0;
    if (q.type === "num") {
      if (q.frac) return Array.isArray(ans) && String(ans[0] || "").trim() !== "" && String(ans[1] || "").trim() !== "";
      return String(ans).trim() !== "";
    }
    return true;
  };

  /* ================= DI / figure display rendering (ETS-style grayscale) ============ */

  const GRAYS = ["#ffffff", "#9aa4b0", "#3d4854"]; // lightness-separated series fills

  function niceMax(v) {
    if (v <= 0) return 1;
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    for (const m of [1, 2, 2.5, 4, 5, 8, 10]) if (v <= m * p) return m * p;
    return 10 * p;
  }

  function svgEl(w, h) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", `0 0 ${w} ${h}`);
    s.setAttribute("role", "img");
    return s;
  }
  function sv(tag, attrs, text) {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  function legendRow(series) {
    const d = document.createElement("div");
    d.style.cssText = "display:flex;gap:18px;justify-content:center;font-size:12.5px;margin-top:4px;flex-wrap:wrap";
    series.forEach((s, i) => {
      const item = document.createElement("span");
      const sw = document.createElement("span");
      sw.style.cssText = `display:inline-block;width:14px;height:14px;border:1px solid #333;background:${GRAYS[i % GRAYS.length]};margin-right:5px;vertical-align:-2px`;
      item.appendChild(sw);
      item.appendChild(document.createTextNode(s.name));
      d.appendChild(item);
    });
    return d;
  }

  function barChart(spec) {
    const W = 560, H = 300, L = 56, R = 14, T = 14, B = 46;
    const svg = svgEl(W, H);
    const allVals = spec.series.flatMap(s => s.values);
    const ymax = spec.ymax || niceMax(Math.max(...allVals));
    const pw = W - L - R, ph = H - T - B;
    const ticks = 5;
    for (let i = 0; i <= ticks; i++) {
      const val = ymax * i / ticks, y = T + ph - ph * i / ticks;
      svg.appendChild(sv("line", { x1: L, y1: y, x2: W - R, y2: y, stroke: i === 0 ? "#333" : "#ddd", "stroke-width": 1 }));
      svg.appendChild(sv("text", { x: L - 7, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "#333" },
        String(+(val.toFixed(2)))));
    }
    const nc = spec.cats.length, ns = spec.series.length;
    const slot = pw / nc, barW = Math.min(34, (slot - 14) / ns);
    spec.cats.forEach((cat, ci) => {
      spec.series.forEach((s, si) => {
        const v = s.values[ci];
        const bh = ph * v / ymax;
        const x = L + slot * ci + slot / 2 - (barW * ns + 2 * (ns - 1)) / 2 + si * (barW + 2);
        svg.appendChild(sv("rect", {
          x, y: T + ph - bh, width: barW, height: Math.max(0.5, bh),
          fill: GRAYS[si % GRAYS.length], stroke: "#333", "stroke-width": 1
        }));
      });
      svg.appendChild(sv("text", { x: L + slot * ci + slot / 2, y: H - B + 16, "text-anchor": "middle", "font-size": 11.5, fill: "#333" }, cat));
    });
    svg.appendChild(sv("line", { x1: L, y1: T, x2: L, y2: T + ph, stroke: "#333", "stroke-width": 1 }));
    if (spec.unit) svg.appendChild(sv("text", { x: 4, y: 9, "font-size": 10.5, fill: "#555" }, "(" + spec.unit + ")"));
    return svg;
  }

  function lineChart(spec) {
    const W = 560, H = 300, L = 56, R = 18, T = 14, B = 46;
    const svg = svgEl(W, H);
    const allVals = spec.series.flatMap(s => s.values);
    const ymax = spec.ymax || niceMax(Math.max(...allVals));
    const pw = W - L - R, ph = H - T - B, ticks = 5;
    for (let i = 0; i <= ticks; i++) {
      const y = T + ph - ph * i / ticks;
      svg.appendChild(sv("line", { x1: L, y1: y, x2: W - R, y2: y, stroke: i === 0 ? "#333" : "#ddd", "stroke-width": 1 }));
      svg.appendChild(sv("text", { x: L - 7, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "#333" },
        String(+((ymax * i / ticks).toFixed(2)))));
    }
    const nx = spec.cats.length;
    const xAt = i => L + (nx === 1 ? pw / 2 : pw * i / (nx - 1));
    spec.cats.forEach((c, i) => {
      svg.appendChild(sv("text", { x: xAt(i), y: H - B + 16, "text-anchor": "middle", "font-size": 11.5, fill: "#333" }, c));
    });
    const dashes = ["", "6,4", "2,3"];
    spec.series.forEach((s, si) => {
      const pts = s.values.map((v, i) => `${xAt(i)},${T + ph - ph * v / ymax}`).join(" ");
      svg.appendChild(sv("polyline", { points: pts, fill: "none", stroke: "#222", "stroke-width": 2, "stroke-dasharray": dashes[si % dashes.length] }));
      s.values.forEach((v, i) => {
        svg.appendChild(sv("circle", { cx: xAt(i), cy: T + ph - ph * v / ymax, r: 3.5, fill: si === 0 ? "#222" : "#fff", stroke: "#222", "stroke-width": 1.5 }));
      });
    });
    svg.appendChild(sv("line", { x1: L, y1: T, x2: L, y2: T + ph, stroke: "#333", "stroke-width": 1 }));
    if (spec.unit) svg.appendChild(sv("text", { x: 4, y: 9, "font-size": 10.5, fill: "#555" }, "(" + spec.unit + ")"));
    return svg;
  }

  function pieChart(spec) {
    const W = 560, H = 280, cx = 190, cy = 140, r = 100;
    const svg = svgEl(W, H);
    const total = spec.slices.reduce((s, x) => s + x.value, 0);
    let ang = -Math.PI / 2;
    const fills = ["#ffffff", "#c8ced6", "#9aa4b0", "#6b7684", "#3d4854", "#e8ebef"];
    spec.slices.forEach((sl, i) => {
      const frac = sl.value / total, a2 = ang + frac * 2 * Math.PI;
      const x1 = cx + r * Math.cos(ang), y1 = cy + r * Math.sin(ang);
      const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      const large = frac > 0.5 ? 1 : 0;
      svg.appendChild(sv("path", {
        d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`,
        fill: fills[i % fills.length], stroke: "#333", "stroke-width": 1
      }));
      ang = a2;
    });
    // side labels with values
    let ly = 40;
    spec.slices.forEach((sl, i) => {
      svg.appendChild(sv("rect", { x: 330, y: ly - 11, width: 13, height: 13, fill: fills[i % fills.length], stroke: "#333", "stroke-width": 1 }));
      const pct = Math.round(1000 * sl.value / total) / 10;
      svg.appendChild(sv("text", { x: 350, y: ly, "font-size": 12.5, fill: "#222" },
        `${sl.label} — ${sl.value}${spec.unit ? " " + spec.unit : ""} (${pct}%)`));
      ly += 24;
    });
    if (spec.totalNote) svg.appendChild(sv("text", { x: 330, y: ly + 4, "font-size": 12, fill: "#555" }, spec.totalNote));
    return svg;
  }

  GRE.renderDisplay = function (display) {
    const wrap = document.createElement("div");
    if (display.note) {
      const n = document.createElement("p");
      n.style.cssText = "text-align:center;font-size:13px;color:#555;margin:2px 0 8px";
      n.textContent = display.note;
      wrap.appendChild(n);
    }
    (display.tables || []).forEach(t => {
      const tb = document.createElement("table");
      tb.className = "di-table";
      if (t.caption) {
        const cap = document.createElement("caption");
        cap.textContent = t.caption;
        tb.appendChild(cap);
      }
      const tr = document.createElement("tr");
      t.cols.forEach(c => { const th = document.createElement("th"); th.innerHTML = c; tr.appendChild(th); });
      tb.appendChild(tr);
      t.rows.forEach(r => {
        const row = document.createElement("tr");
        r.forEach(c => { const td = document.createElement("td"); td.innerHTML = c; row.appendChild(td); });
        tb.appendChild(row);
      });
      wrap.appendChild(tb);
    });
    const addChart = (spec, fn, withLegend) => {
      if (!spec) return;
      const box = document.createElement("div");
      box.className = "chartbox";
      if (spec.title) {
        const t = document.createElement("div");
        t.className = "ctitle"; t.textContent = spec.title;
        box.appendChild(t);
      }
      box.appendChild(fn(spec));
      if (withLegend && spec.series && spec.series.length > 1) box.appendChild(legendRow(spec.series));
      wrap.appendChild(box);
    };
    addChart(display.bar, barChart, true);
    addChart(display.line, lineChart, true);
    addChart(display.pie, pieChart, false);
    return wrap;
  };

  /* ================= question body rendering =================
     item: {q, passage?, di?}   ansGet/ansSet close over answer storage
     opts: {review, disabled, hideDirections} — review shows correct/incorrect */

  GRE.renderQBody = function (container, item, getAns, setAns, opts) {
    opts = opts || {};
    const q = item.q, el = GRE.el;
    const ro = opts.review || opts.disabled;

    let qcol = container;
    if (item.passage) {
      const split = el("div", { class: "split" });
      const pside = el("div", { class: "passage" });
      if (item.di) {
        pside.appendChild(el("div", { class: "passage-label" }, "Questions are based on the following data"));
        if (item.passage.intro) pside.appendChild(el("div", { class: "qtext", html: item.passage.intro }));
        pside.appendChild(GRE.renderDisplay(item.passage.display || {}));
      } else {
        pside.appendChild(el("div", { class: "passage-label" }, "Questions are based on this passage"));
        pside.appendChild(el("div", { html: item.passage.text }));
      }
      split.appendChild(pside);
      split.appendChild(el("div", { class: "divider" }));
      qcol = el("div");
      split.appendChild(qcol);
      container.appendChild(split);
    }

    if (!opts.hideDirections) {
      qcol.appendChild(el("div", { class: "directions" }, GRE.directionsFor(q)));
    }

    const markChoice = (btn, state) => {
      btn.classList.toggle("selected", !!state);
    };

    /* ----- Text Completion ----- */
    if (q.type === "tc") {
      const blanks = q.blanks || 1;
      let ans = getAns();
      if (blanks > 1 && !Array.isArray(ans)) { ans = new Array(blanks).fill(null); }

      const sentence = el("div", { class: "qtext" });
      const renderSentence = () => {
        let html = q.text;
        for (let b = 1; b <= blanks; b++) {
          const sel = blanks === 1 ? getAns() : (getAns() || [])[b - 1];
          const choicesForBlank = blanks === 1 ? q.choices : q.choices[b - 1];
          const word = (sel != null) ? GRE.esc(choicesForBlank[sel]) :
            (blanks === 1 ? "&nbsp;" : ["(i)", "(ii)", "(iii)"][b - 1]);
          html = html.replace("{" + b + "}", `<span class="tcblank">${word}</span>`);
        }
        sentence.innerHTML = html;
      };
      renderSentence();
      qcol.appendChild(sentence);

      if (blanks === 1) {
        const box = el("div", { class: "choices" });
        q.choices.forEach((c, i) => {
          const btn = el("button", { class: "choice", onclick: () => {
            if (ro) return;
            setAns(getAns() === i ? null : i);
            box.querySelectorAll(".choice").forEach((b, j) => markChoice(b, getAns() === j));
            renderSentence();
          } }, el("span", { class: "oval" }), el("span", { html: c }));
          markChoice(btn, getAns() === i);
          reviewPaint(btn, q, i, getAns(), opts);
          box.appendChild(btn);
        });
        qcol.appendChild(box);
      } else {
        const cols = el("div", { class: "blank-cols" });
        for (let b = 0; b < blanks; b++) {
          const col = el("div", { class: "blank-col" });
          col.appendChild(el("h4", null, "Blank (" + ["i", "ii", "iii"][b] + ")"));
          q.choices[b].forEach((c, i) => {
            const btn = el("button", { class: "choice", onclick: () => {
              if (ro) return;
              let a = getAns();
              if (!Array.isArray(a)) a = new Array(blanks).fill(null);
              a = a.slice();
              a[b] = (a[b] === i ? null : i);
              setAns(a);
              col.querySelectorAll(".choice").forEach((bt, j) => markChoice(bt, (getAns() || [])[b] === j));
              renderSentence();
            } }, el("span", { class: "oval" }), el("span", { html: c }));
            markChoice(btn, Array.isArray(getAns()) && getAns()[b] === i);
            if (opts.review) {
              if (q.answer[b] === i) btn.classList.add("correct");
              if (Array.isArray(getAns()) && getAns()[b] === i && q.answer[b] !== i) btn.classList.add("wrongpick");
            }
            col.appendChild(btn);
          });
          cols.appendChild(col);
        }
        qcol.appendChild(cols);
      }
      return;
    }

    /* ----- QC ----- */
    if (q.type === "qc") {
      if (q.info) qcol.appendChild(el("div", { class: "qc-info", html: q.info }));
      if (q.figure) {
        const f = el("div", { class: "figure", html: q.figure });
        qcol.appendChild(f);
      }
      const tb = el("table", { class: "qc-table" });
      tb.innerHTML = `<tr><th>Quantity A</th><th>Quantity B</th></tr>
        <tr><td>${q.qa}</td><td>${q.qb}</td></tr>`;
      qcol.appendChild(tb);
      qcol.appendChild(el("hr", { class: "qc-line" }));
      const box = el("div", { class: "choices" });
      QC_CHOICES.forEach((c, i) => {
        const btn = el("button", { class: "choice", onclick: () => {
          if (ro) return;
          setAns(getAns() === i ? null : i);
          box.querySelectorAll(".choice").forEach((b, j) => markChoice(b, getAns() === j));
        } }, el("span", { class: "oval" }), el("span", null, c));
        markChoice(btn, getAns() === i);
        reviewPaint(btn, q, i, getAns(), opts);
        box.appendChild(btn);
      });
      qcol.appendChild(box);
      return;
    }

    /* ----- Numeric entry ----- */
    if (q.type === "num") {
      if (q.figure) qcol.appendChild(el("div", { class: "figure", html: q.figure }));
      qcol.appendChild(el("div", { class: "qtext", html: q.text }));
      const wrap = el("div", { class: "numentry" });
      const focusTransfer = inp => {
        inp.addEventListener("focus", () => { GRE.calc.transferTarget = inp; });
      };
      if (q.frac) {
        let a = getAns();
        if (!Array.isArray(a)) a = ["", ""];
        const fb = el("div", { class: "fracbar" });
        const top = el("input", { type: "text", value: a[0] || "", oninput: e => {
          const cur = Array.isArray(getAns()) ? getAns().slice() : ["", ""];
          cur[0] = e.target.value; setAns(cur);
        } });
        const bot = el("input", { type: "text", value: a[1] || "", oninput: e => {
          const cur = Array.isArray(getAns()) ? getAns().slice() : ["", ""];
          cur[1] = e.target.value; setAns(cur);
        } });
        if (ro) { top.disabled = true; bot.disabled = true; }
        focusTransfer(top); focusTransfer(bot);
        fb.appendChild(top); fb.appendChild(el("hr")); fb.appendChild(bot);
        wrap.appendChild(fb);
      } else {
        const inp = el("input", { type: "text", value: getAns() || "", oninput: e => setAns(e.target.value) });
        if (ro) inp.disabled = true;
        focusTransfer(inp);
        wrap.appendChild(inp);
        if (q.unitAfter) wrap.appendChild(el("span", { html: q.unitAfter }));
      }
      qcol.appendChild(wrap);
      if (opts.review) {
        const corr = q.frac ? (q.ansFrac[0] + "/" + q.ansFrac[1]) : String(q.answer);
        qcol.appendChild(el("p", { style: "margin-top:12px;font-size:15px" },
          "Correct answer: ", el("strong", null, corr)));
      }
      return;
    }

    /* ----- SE / MCQ / MCMA / CR / RC ----- */
    if (q.figure) qcol.appendChild(el("div", { class: "figure", html: q.figure }));
    if (q.type === "cr" && q.passage) {
      qcol.appendChild(el("div", { class: "qtext", html: "<p>" + q.passage + "</p>" }));
    }
    qcol.appendChild(el("div", { class: "qtext", html: q.text }));

    const multi = (q.type === "se" || q.type === "mcma");
    const maxSel = q.type === "se" ? 2 : Infinity;
    const box = el("div", { class: "choices" });
    q.choices.forEach((c, i) => {
      const btn = el("button", { class: "choice", onclick: () => {
        if (ro) return;
        if (multi) {
          let a = Array.isArray(getAns()) ? getAns().slice() : [];
          if (a.includes(i)) a = a.filter(x => x !== i);
          else { if (a.length >= maxSel) return; a.push(i); }
          setAns(a.length ? a : null);
          box.querySelectorAll(".choice").forEach((b, j) =>
            markChoice(b, Array.isArray(getAns()) && getAns().includes(j)));
        } else {
          setAns(getAns() === i ? null : i);
          box.querySelectorAll(".choice").forEach((b, j) => markChoice(b, getAns() === j));
        }
      } },
        el("span", { class: multi ? "sqr" : "oval" }),
        el("span", { html: c }));
      const sel = multi ? (Array.isArray(getAns()) && getAns().includes(i)) : getAns() === i;
      markChoice(btn, sel);
      reviewPaint(btn, q, i, getAns(), opts);
      box.appendChild(btn);
    });
    qcol.appendChild(box);
  };

  function reviewPaint(btn, q, i, ans, opts) {
    if (!opts.review) return;
    const corrArr = Array.isArray(q.answer) ? q.answer : [q.answer];
    const ansArr = ans == null ? [] : (Array.isArray(ans) ? ans : [ans]);
    if (corrArr.includes(i)) btn.classList.add("correct");
    if (ansArr.includes(i) && !corrArr.includes(i)) btn.classList.add("wrongpick");
  }

  /* ================= exam assembly ================= */

  const SECTIONS = [
    { kind: "awa", label: "Analytical Writing", durSec: 30 * 60 },
    { kind: "verbal", no: 1, n: 12, durSec: 18 * 60, label: "Verbal Reasoning · Section 1" },
    { kind: "quant", no: 1, n: 12, durSec: 21 * 60, label: "Quantitative Reasoning · Section 1" },
    { kind: "verbal", no: 2, n: 15, durSec: 23 * 60, label: "Verbal Reasoning · Section 2" },
    { kind: "quant", no: 2, n: 15, durSec: 26 * 60, label: "Quantitative Reasoning · Section 2" }
  ];

  function draw(pool, n, avoid) {
    // prefer questions not in `avoid` (recent/current-exam ids); random within groups
    const fresh = [], stale = [];
    GRE.shuffle(pool).forEach(x => (avoid.has(x.id) ? stale : fresh).push(x));
    return fresh.concat(stale).slice(0, n);
  }

  function drawSpread(pool, n, avoid, keyFn) {
    // like draw() but spreads across keyFn values (topics)
    const fresh = [], stale = [];
    GRE.shuffle(pool).forEach(x => (avoid.has(x.id) ? stale : fresh).push(x));
    const ordered = fresh.concat(stale);
    const picked = [], seen = {};
    for (const x of ordered) {
      if (picked.length >= n) break;
      const k = keyFn(x);
      if (!seen[k]) { seen[k] = 1; picked.push(x); }
    }
    for (const x of ordered) {
      if (picked.length >= n) break;
      if (!picked.includes(x)) picked.push(x);
    }
    return picked.slice(0, n);
  }

  function pickPassage(pools, diff, nq, avoid) {
    let cand = pools.filter(p => p.diff === diff && p.questions.length >= nq);
    if (!cand.length) cand = pools.filter(p => p.questions.length >= nq);
    if (!cand.length) return null;
    const fresh = cand.filter(p => !p.questions.some(q => avoid.has(q.id)));
    const pick = GRE.shuffle(fresh.length ? fresh : cand)[0];
    // prefer exact question count
    const exact = (fresh.length ? fresh : cand).filter(p => p.questions.length === nq);
    return exact.length ? GRE.shuffle(exact)[0] : pick;
  }

  function buildVerbal(diff, isS2, avoid) {
    const B = window.GREBANK;
    const byType = t => B.verbal.filter(q => q.type === t && q.diff === diff);
    const byTypeAny = t => B.verbal.filter(q => q.type === t);
    const take = (t, n) => {
      let pool = byType(t);
      if (pool.length < n) pool = byTypeAny(t);
      return draw(pool, n, avoid);
    };
    const nTC = isS2 ? 4 : 3, nSE = isS2 ? 4 : 3, bigRC = isS2 ? 4 : 3;

    const tc = take("tc", nTC), se = take("se", nSE), cr = take("cr", 1);
    const p1 = pickPassage(B.vpassages, diff, bigRC, avoid);
    const p2 = pickPassage(B.vpassages, diff, 2, new Set([...avoid, ...(p1 ? p1.questions.map(q => q.id) : [])]));

    const ids = [];
    tc.forEach(q => ids.push(q.id));
    if (p1) p1.questions.slice(0, bigRC).forEach(q => ids.push(q.id));
    cr.forEach(q => ids.push(q.id));
    se.forEach(q => ids.push(q.id));
    if (p2) p2.questions.slice(0, 2).forEach(q => ids.push(q.id));

    // top up / trim to exact target with extra SE/TC if pools ran short
    const target = isS2 ? 15 : 12;
    if (ids.length < target) {
      const extra = draw(byTypeAny("se").concat(byTypeAny("tc")), target - ids.length,
        new Set([...avoid, ...ids]));
      extra.forEach(q => ids.push(q.id));
    }
    return ids.slice(0, target);
  }

  function buildQuant(diff, isS2, avoid) {
    const B = window.GREBANK;
    const byType = (t) => B.quant.filter(q => q.type === t && q.diff === diff);
    const byTypeAny = (t) => B.quant.filter(q => q.type === t);
    const take = (t, n, spread) => {
      let pool = byType(t);
      if (pool.length < n) pool = byTypeAny(t);
      return spread ? drawSpread(pool, n, avoid, q => q.topic) : draw(pool, n, avoid);
    };
    const nQC = isS2 ? 5 : 4;
    const nMCQ = isS2 ? 4 : 3;
    const nMCMA = isS2 ? 2 : 1;
    const nNUM = 1;

    const qc = take("qc", nQC, true);
    const mcq = take("mcq", nMCQ, true);
    const mcma = take("mcma", nMCMA);
    const num = take("num", nNUM);
    let di = window.GREBANK.disets.filter(p => p.diff === diff);
    if (!di.length) di = window.GREBANK.disets;
    const fresh = di.filter(p => !p.questions.some(q => avoid.has(q.id)));
    const diset = GRE.shuffle(fresh.length ? fresh : di)[0];

    const ids = [];
    qc.forEach(q => ids.push(q.id));
    mcq.forEach(q => ids.push(q.id));
    mcma.forEach(q => ids.push(q.id));
    if (diset) diset.questions.slice(0, 3).forEach(q => ids.push(q.id));
    num.forEach(q => ids.push(q.id));

    const target = isS2 ? 15 : 12;
    if (ids.length < target) {
      const extra = drawSpread(byTypeAny("mcq"), target - ids.length,
        new Set([...avoid, ...ids]), q => q.topic);
      extra.forEach(q => ids.push(q.id));
    }
    return ids.slice(0, target);
  }

  /* ================= exam runtime ================= */

  const E = {};
  GRE.exam = E;

  let X = null;      // exam data (serializable)
  let ticker = null; // interval id
  let stamp = 0;     // per-question time stamp

  function usedIds() {
    const s = new Set(GRE.store.data.recent || []);
    if (X) X.sections.forEach(sec => (sec.items || []).forEach(id => s.add(id)));
    return s;
  }

  function newExam() {
    const B = window.GREBANK;
    const essayPool = GRE.shuffle(B.essays);
    const recentEssays = new Set((GRE.store.data.attempts || []).slice(-5).map(a => a.essay && a.essay.promptId));
    const prompt = essayPool.find(e => !recentEssays.has(e.id)) || essayPool[0];
    X = {
      startedAt: Date.now(),
      essay: { promptId: prompt.id, text: "" },
      currentSection: 0,
      vPath: null, qPath: null,
      sections: SECTIONS.map(s => ({
        kind: s.kind, no: s.no || 0, n: s.n || 1, durSec: s.durSec,
        label: s.label, items: null, answers: [], marked: [], seen: [],
        time: [], remaining: s.durSec, done: false, raw: null, started: false
      }))
    };
    // Section 1s draw from the medium pool (average difficulty, like the real S1)
    X.sections[1].items = buildVerbal("medium", false, usedIds());
    X.sections[2].items = buildQuant("medium", false, usedIds());
    save();
  }

  function ensureSectionBuilt(i) {
    const sec = X.sections[i];
    if (sec.items || sec.kind === "awa") return;
    if (i === 3) { // Verbal 2 — route on Verbal 1 raw
      X.vPath = GRE.routeFor(X.sections[1].raw || 0);
      sec.items = buildVerbal(X.vPath, true, usedIds());
    }
    if (i === 4) { // Quant 2
      X.qPath = GRE.routeFor(X.sections[2].raw || 0);
      sec.items = buildQuant(X.qPath, true, usedIds());
    }
    sec.answers = new Array(sec.items.length).fill(null);
    sec.marked = new Array(sec.items.length).fill(false);
    sec.seen = new Array(sec.items.length).fill(false);
    sec.time = new Array(sec.items.length).fill(0);
  }

  function save() {
    GRE.store.data.inprogress = X;
    GRE.store.save();
  }

  E.startIntro = function () {
    if (GRE.store.data.inprogress) {
      GRE.modal("Exam in progress", "<p>You already have an unfinished mock. Resume it from the home screen, or discard it first.</p>");
      return;
    }
    GRE.show(root => {
      const { bar, stage, inner } = GRE.chrome("GRE® General Test", "Full mock exam");
      root.appendChild(bar); root.appendChild(stage);
      inner.appendChild(GRE.el("h1", { class: "screen-title" }, "Before you begin"));
      const card = GRE.el("div", { class: "card" });
      card.innerHTML = `
        <h3>Test overview — total time about 1 hour 58 minutes</h3>
        <ol>
          <li><strong>Analytical Writing</strong> — "Analyze an Issue" — 1 task, 30 minutes</li>
          <li><strong>Verbal Reasoning, Section 1</strong> — 12 questions, 18 minutes</li>
          <li><strong>Quantitative Reasoning, Section 1</strong> — 12 questions, 21 minutes</li>
          <li><strong>Verbal Reasoning, Section 2</strong> — 15 questions, 23 minutes</li>
          <li><strong>Quantitative Reasoning, Section 2</strong> — 15 questions, 26 minutes</li>
        </ol>
        <p>The second section of each measure is <strong>adaptive</strong>: its difficulty depends on your
        performance in the first section, and the 130–170 scaled score reflects both how many questions
        you answered correctly and which second section you received.</p>
        <h3>Rules of engagement (like test day)</h3>
        <ul>
          <li>There are <strong>no scheduled breaks</strong> on the shorter GRE. Section clocks run whether or not you're looking at the screen — but the clock pauses if you close this app mid-exam and resume later.</li>
          <li>Within a section you can move freely: <strong>Back</strong>, <strong>Next</strong>, <strong>Mark</strong> for review, and the <strong>Review</strong> screen.</li>
          <li>Once you <strong>Exit</strong> a section you cannot return to it.</li>
          <li>An on-screen <strong>calculator</strong> is available in Quantitative sections only.</li>
          <li>There is no penalty for guessing — never leave a question blank.</li>
        </ul>
        <p>Use scratch paper and work somewhere quiet. Treat it like the real thing.</p>`;
      inner.appendChild(card);
      const row = GRE.el("div", { class: "btnrow" });
      row.appendChild(GRE.el("button", { class: "bigbtn", onclick: () => { newExam(); enterSection(0); } }, "Begin test"));
      row.appendChild(GRE.el("button", { class: "bigbtn secondary", onclick: () => GRE.show(GRE.screens.home) }, "Not yet"));
      inner.appendChild(row);
    });
  };

  E.resume = function () {
    X = GRE.store.data.inprogress;
    if (!X) { GRE.show(GRE.screens.home); return; }
    enterSection(X.currentSection, true);
  };

  /* -------- section flow -------- */

  function enterSection(i, resuming) {
    X.currentSection = i;
    if (i >= X.sections.length) { finishExam(); return; }
    ensureSectionBuilt(i);
    save();
    const sec = X.sections[i];
    if (resuming && sec.started && !sec.done) { runSection(i); return; }
    showDirections(i);
  }

  function showDirections(i) {
    const sec = X.sections[i];
    GRE.show(root => {
      const { bar, stage, inner } = GRE.chrome("GRE® General Test", sectionTitle(i));
      // no Home button during the exam — replace bar
      root.appendChild(examBarSimple(sectionTitle(i)));
      root.appendChild(stage);
      inner.appendChild(GRE.el("h1", { class: "screen-title" }, sectionTitle(i)));
      const card = GRE.el("div", { class: "card" });
      if (sec.kind === "awa") {
        card.innerHTML = `
          <h3>Analyze an Issue — 30 minutes</h3>
          <p>You will be given a brief statement on an issue of general interest and instructions on how to
          respond. You are free to accept, reject, or qualify the claim, as long as what you write is in
          concert with the instructions.</p>
          <p>Trained readers score responses on a 0–6 scale for how well you articulate and support a
          position, organize your ideas, and control the elements of standard written English. A response
          that addresses a different topic scores 0.</p>
          <p>The editor provides Cut, Copy, Paste, Undo, and Redo — there is <em>no spell-check or
          grammar-check</em>, just like the real test.</p>`;
      } else if (sec.kind === "verbal") {
        card.innerHTML = `
          <h3>${sec.n} questions — ${Math.round(sec.durSec / 60)} minutes</h3>
          <p>For each question, indicate the best answer using the directions given with the question.</p>
          <ul>
            <li><strong>Text Completion:</strong> fill each blank from its column of choices; credit only for getting <em>all</em> blanks right.</li>
            <li><strong>Sentence Equivalence:</strong> pick the <em>two</em> choices that both complete the sentence and produce sentences alike in meaning; no credit for one right choice.</li>
            <li><strong>Reading Comprehension:</strong> answer based on what the passage states or implies — not outside knowledge.</li>
          </ul>`;
      } else {
        card.innerHTML = `
          <h3>${sec.n} questions — ${Math.round(sec.durSec / 60)} minutes</h3>
          <ul>
            <li>All numbers used are real numbers. Figures are <em>not necessarily drawn to scale</em> unless stated; coordinate systems and number lines <em>are</em> to scale.</li>
            <li><strong>Quantitative Comparison:</strong> compare Quantity A and Quantity B using any centered information, then pick one of the four fixed choices.</li>
            <li><strong>Multiple-answer questions</strong> require <em>all</em> correct choices for credit.</li>
            <li><strong>Numeric Entry:</strong> enter a number; equivalent forms of a fraction are correct.</li>
            <li>The on-screen <strong>Calculator</strong> is available from the toolbar.</li>
          </ul>`;
      }
      inner.appendChild(card);
      if (sec.remaining < sec.durSec && !sec.started) sec.remaining = sec.durSec;
      const row = GRE.el("div", { class: "btnrow" });
      row.appendChild(GRE.el("button", { class: "bigbtn", onclick: () => {
        sec.started = true;
        save();
        runSection(i);
      } }, sec.kind === "awa" ? "Start writing" : "Start section"));
      inner.appendChild(row);
      if (i > 0) {
        inner.appendChild(GRE.el("p", { class: "footnote" },
          "The section clock starts when you click the button. Pausing here is possible but the real test moves you along automatically — don't linger."));
      }
    });
  }

  function sectionTitle(i) {
    const sec = X.sections[i];
    const names = { awa: "Analytical Writing — Analyze an Issue", verbal: "Verbal Reasoning", quant: "Quantitative Reasoning" };
    const base = names[sec.kind] + (sec.no ? ` · Section ${sec.no === 1 ? 1 : 2}` : "");
    return `Section ${i + 1} of 5 — ${base}`;
  }

  function examBarSimple(title) {
    return GRE.el("div", { class: "topbar" },
      GRE.el("div", { class: "brand" }, "GRE® General Test — Mock",
        GRE.el("small", null, title)));
  }

  /* -------- running a timed section -------- */

  function runSection(i) {
    const sec = X.sections[i];
    const endsAt = Date.now() + sec.remaining * 1000;
    let timerHidden = false;
    let onReview = false;

    stopTicker();

    GRE.show(root => {
      /* ---- top bar ---- */
      const btns = GRE.el("div", { class: "btns" });
      const bar = GRE.el("div", { class: "topbar" },
        GRE.el("div", { class: "brand" }, "GRE® General Test — Mock",
          GRE.el("small", null, sectionTitle(i))),
        btns);

      const tbtn = (ic, label, fn, cls) => {
        const b = GRE.el("button", { class: "tbtn" + (cls ? " " + cls : ""), onclick: fn },
          GRE.el("span", { class: "ic" }, ic), label);
        btns.appendChild(b);
        return b;
      };

      let markBtn, backBtn, nextBtn;
      const isAwa = sec.kind === "awa";

      tbtn("🚪", "Exit Section", () => confirmExit());
      if (!isAwa) {
        tbtn("☰", "Review", () => { onReview = true; paint(); });
        markBtn = tbtn("🚩", "Mark", () => {
          sec.marked[qIdxOf()] = !sec.marked[qIdxOf()];
          save(); paint();
        });
      }
      tbtn("❓", "Help", () => showHelp(sec));
      if (sec.kind === "quant") tbtn("🖩", "Calc", () => GRE.calc.toggle());
      if (!isAwa) {
        backBtn = tbtn("◀", "Back", () => { if (cur > 0) { moveTo(cur - 1); } });
        nextBtn = tbtn("▶", "Next", () => {
          if (cur < sec.items.length - 1) moveTo(cur + 1);
          else endOfSectionPrompt();
        });
      } else {
        tbtn("▶", "Next", () => confirmExit(true));
      }
      root.appendChild(bar);

      /* ---- substrip with counter + timer ---- */
      const counter = GRE.el("span", { class: "qcount" });
      const timerEl = GRE.el("span", { class: "timer" });
      const hideBtn = GRE.el("button", { class: "linkish", onclick: () => {
        timerHidden = !timerHidden;
        hideBtn.textContent = timerHidden ? "Show Time" : "Hide Time";
        tick();
      } }, "Hide Time");
      root.appendChild(GRE.el("div", { class: "substrip" },
        counter,
        GRE.el("span", { class: "right" }, hideBtn, timerEl)));

      const stage = GRE.el("div", { class: "stage" });
      const inner = GRE.el("div", { class: "stage-inner" });
      stage.appendChild(inner);
      root.appendChild(stage);

      let cur = 0;
      // resume at first unseen question
      if (!isAwa) {
        const firstUnseen = sec.seen.findIndex(s => !s);
        cur = firstUnseen === -1 ? 0 : firstUnseen;
      }
      const qIdxOf = () => cur;

      function commitTime() {
        if (isAwa) return;
        const now = Date.now();
        if (stamp) sec.time[cur] += Math.round((now - stamp) / 1000);
        stamp = now;
      }

      function moveTo(j) {
        commitTime();
        cur = j;
        onReview = false;
        paint();
        save();
      }

      function paint() {
        inner.innerHTML = "";
        if (isAwa) { paintEssay(); return; }
        if (onReview) { paintReview(); return; }
        sec.seen[cur] = true;
        counter.textContent = `Question ${cur + 1} of ${sec.items.length}`;
        markBtn.classList.toggle("marked", !!sec.marked[cur]);
        backBtn.disabled = cur === 0;
        const id = sec.items[cur];
        const item = GRE.byId[id];
        if (!item) { inner.textContent = "Question unavailable."; return; }
        GRE.renderQBody(inner, item,
          () => sec.answers[cur],
          v => { sec.answers[cur] = v; save(); },
          {});
        stamp = Date.now();
      }

      function paintReview() {
        counter.textContent = "Review — " + sectionTitle(i);
        const box = GRE.el("div");
        box.appendChild(GRE.el("h2", { class: "screen-title" }, "Review your answers"));
        box.appendChild(GRE.el("p", { class: "screen-sub" },
          "Click a row to go to that question. You can change answers until you exit the section."));
        const tb = GRE.el("table", { class: "review-table" });
        tb.innerHTML = "<tr><th>Question</th><th>Status</th><th>Marked</th></tr>";
        sec.items.forEach((id, j) => {
          const item = GRE.byId[id];
          const answered = item && GRE.isAnswered(item.q, sec.answers[j]);
          const st = answered ? '<span class="st-ans">Answered</span>'
            : (sec.seen[j] ? '<span class="st-not">Not Answered</span>' : '<span class="st-seen">Not Seen</span>');
          const tr = GRE.el("tr", { class: j === cur ? "cur" : "", onclick: () => moveTo(j) });
          tr.innerHTML = `<td>Question ${j + 1}</td><td>${st}</td><td>${sec.marked[j] ? "🚩" : ""}</td>`;
          tb.appendChild(tr);
        });
        box.appendChild(tb);
        const row = GRE.el("div", { class: "btnrow" });
        row.appendChild(GRE.el("button", { class: "bigbtn", onclick: () => { onReview = false; paint(); } }, "Return to question"));
        row.appendChild(GRE.el("button", { class: "bigbtn secondary", onclick: () => confirmExit() }, "Exit section"));
        box.appendChild(row);
        inner.appendChild(box);
      }

      /* ---- essay ---- */
      let undoStack = [], redoStack = [], undoTimer = null, clipboard = "";
      function paintEssay() {
        counter.textContent = "Analyze an Issue";
        const prompt = window.GREBANK.essays.find(e => e.id === X.essay.promptId);
        const wrap = GRE.el("div", { class: "essay-wrap" });
        wrap.appendChild(GRE.el("div", { class: "essay-prompt", html:
          "<p><strong>" + GRE.esc(prompt.prompt) + "</strong></p><p style='font-size:14px'>" + GRE.esc(prompt.task) + "</p>" }));

        const toolbar = GRE.el("div", { class: "essay-toolbar" });
        const box = GRE.el("textarea", { class: "essay-box", spellcheck: "false", autocomplete: "off" });
        box.value = X.essay.text || "";
        const wc = GRE.el("span", { class: "wc" });
        const updWC = () => {
          const words = box.value.trim() ? box.value.trim().split(/\s+/).length : 0;
          wc.textContent = words + " word" + (words === 1 ? "" : "s");
        };
        updWC();

        const pushUndo = () => {
          undoStack.push(box.value);
          if (undoStack.length > 100) undoStack.shift();
          redoStack = [];
        };
        box.addEventListener("input", () => {
          X.essay.text = box.value;
          updWC();
          clearTimeout(undoTimer);
          undoTimer = setTimeout(() => { save(); }, 600);
        });
        box.addEventListener("beforeinput", e => {
          if (!undoStack.length || undoStack[undoStack.length - 1] !== box.value) {
            if (e.inputType && !e.inputType.startsWith("history")) pushUndo();
          }
        });
        // block external clipboard, allow internal
        box.addEventListener("paste", e => {
          e.preventDefault();
          insertAtCursor(clipboard);
        });
        box.addEventListener("copy", e => { e.preventDefault(); clipboard = selText(); });
        box.addEventListener("cut", e => {
          e.preventDefault(); clipboard = selText(); pushUndo(); replaceSel(""); sync();
        });
        function selText() { return box.value.slice(box.selectionStart, box.selectionEnd); }
        function replaceSel(t) {
          const s = box.selectionStart, epos = box.selectionEnd;
          box.value = box.value.slice(0, s) + t + box.value.slice(epos);
          box.selectionStart = box.selectionEnd = s + t.length;
        }
        function insertAtCursor(t) { if (t) { pushUndo(); replaceSel(t); sync(); } }
        function sync() { X.essay.text = box.value; updWC(); save(); }

        const tbBtn = (label, fn) => toolbar.appendChild(GRE.el("button", { onclick: () => { fn(); box.focus(); } }, label));
        tbBtn("Cut", () => { clipboard = selText(); pushUndo(); replaceSel(""); sync(); });
        tbBtn("Copy", () => { clipboard = selText(); });
        tbBtn("Paste", () => insertAtCursor(clipboard));
        tbBtn("Undo", () => {
          if (undoStack.length) { redoStack.push(box.value); box.value = undoStack.pop(); sync(); }
        });
        tbBtn("Redo", () => {
          if (redoStack.length) { undoStack.push(box.value); box.value = redoStack.pop(); sync(); }
        });
        toolbar.appendChild(wc);

        wrap.appendChild(toolbar);
        wrap.appendChild(box);
        inner.appendChild(wrap);
        box.focus();
      }

      /* ---- timer ---- */
      function tick() {
        const remain = Math.max(0, (endsAt - Date.now()) / 1000);
        sec.remaining = remain;
        const low = remain <= 300;
        if (low && timerHidden) { timerHidden = false; hideBtn.textContent = "Hide Time"; }
        timerEl.textContent = timerHidden ? "" : GRE.fmtTime(remain);
        timerEl.classList.toggle("low", low && remain > 0);
        if (remain <= 0) {
          stopTicker();
          commitTime();
          GRE.modal("Time expired", "<p>Time has expired for this section. Your answers have been recorded.</p>",
            [{ label: "Continue", action: () => finalizeSection(i) }]);
        }
      }
      ticker = setInterval(() => { tick(); if (Math.floor(sec.remaining) % 10 === 0) save(); }, 500);
      tick();

      function confirmExit(fromNext) {
        const unanswered = isAwa ? 0 :
          sec.items.filter((id, j) => !GRE.isAnswered(GRE.byId[id].q, sec.answers[j])).length;
        const msg = isAwa
          ? "<p>Finish the Analytical Writing section? You cannot return to your essay afterwards.</p>"
          : `<p>Exit this section? You cannot return to it.</p>` +
            (unanswered ? `<p><strong>${unanswered}</strong> question${unanswered === 1 ? " is" : "s are"} unanswered — unanswered questions score as incorrect.</p>` : "");
        GRE.modal(fromNext ? "Continue?" : "Exit section?", msg, [
          { label: isAwa ? "Finish essay" : "Exit section", action: () => { stopTicker(); commitTime(); finalizeSection(i); } },
          { label: "Return", secondary: true }
        ]);
      }

      function endOfSectionPrompt() {
        GRE.modal("End of section",
          "<p>You are at the last question. Use <strong>Review</strong> to check your answers, or exit the section to continue the test.</p>",
          [
            { label: "Review answers", action: () => { onReview = true; paint(); } },
            { label: "Exit section", action: () => confirmExit() },
            { label: "Return", secondary: true }
          ]);
      }

      paint();
      stamp = Date.now();
    });
  }

  function stopTicker() { if (ticker) { clearInterval(ticker); ticker = null; } }

  function showHelp(sec) {
    const nav = `
      <h4>Navigation</h4>
      <ul>
        <li><strong>Next / Back</strong> move within the section.</li>
        <li><strong>Mark</strong> flags a question so you can find it on the Review screen.</li>
        <li><strong>Review</strong> shows every question's status; click a row to jump to it.</li>
        <li><strong>Exit Section</strong> ends the section permanently.</li>
        <li><strong>Hide Time</strong> hides the clock; it reappears automatically at 5:00 remaining.</li>
      </ul>`;
    const per = sec.kind === "quant"
      ? "<h4>Quantitative</h4><p>The Calculator button opens the on-screen calculator. In Numeric Entry questions, click a box then use <em>Transfer Display</em> to copy the calculator value into it.</p>"
      : sec.kind === "verbal"
        ? "<h4>Verbal</h4><p>Text Completion gives credit only when every blank is correct. Sentence Equivalence requires both correct choices.</p>"
        : "<h4>Analytical Writing</h4><p>Use the toolbar for Cut / Copy / Paste / Undo / Redo. There is no spell-check.</p>";
    GRE.modal("Help", nav + per, [{ label: "Return" }]);
  }

  /* -------- finalize / score -------- */

  function finalizeSection(i) {
    const sec = X.sections[i];
    sec.done = true;
    if (sec.kind !== "awa") {
      sec.raw = sec.items.reduce((s, id, j) =>
        s + (GRE.gradeQ(GRE.byId[id].q, sec.answers[j]) ? 1 : 0), 0);
    }
    GRE.calc.hide();
    GRE.calc.reset();
    save();
    if (i + 1 < X.sections.length) {
      transition(i + 1);
    } else {
      finishExam();
    }
  }

  function transition(next) {
    GRE.show(root => {
      root.appendChild(examBarSimple("Section complete"));
      const stage = GRE.el("div", { class: "stage" });
      const inner = GRE.el("div", { class: "stage-inner" });
      stage.appendChild(inner); root.appendChild(stage);
      inner.appendChild(GRE.el("h1", { class: "screen-title" }, "Section complete"));
      inner.appendChild(GRE.el("p", { class: "screen-sub" },
        `Up next: ${sectionTitle(next).replace(/^Section \d of 5 — /, "")}. ` +
        "On the real test the next section begins almost immediately — click through when you're ready."));
      const row = GRE.el("div", { class: "btnrow" });
      row.appendChild(GRE.el("button", { class: "bigbtn", onclick: () => enterSection(next) }, "Continue"));
      inner.appendChild(row);
    });
  }

  function finishExam() {
    stopTicker();
    // score both measures
    const v1 = X.sections[1], q1 = X.sections[2], v2 = X.sections[3], q2 = X.sections[4];
    const vPath = X.vPath || GRE.routeFor(v1.raw || 0);
    const qPath = X.qPath || GRE.routeFor(q1.raw || 0);
    const vRaw = (v1.raw || 0) + (v2.raw || 0);
    const qRaw = (q1.raw || 0) + (q2.raw || 0);
    const vScaled = GRE.rawToScaled(vRaw, vPath);
    const qScaled = GRE.rawToScaled(qRaw, qPath);

    const detail = sec => sec.items.map((id, j) => {
      const entry = GRE.byId[id];
      return {
        qid: id,
        ans: sec.answers[j],
        ok: GRE.gradeQ(entry.q, sec.answers[j]),
        time: sec.time[j] || 0
      };
    });

    const attempt = {
      date: Date.now(),
      essay: {
        promptId: X.essay.promptId,
        text: X.essay.text,
        words: X.essay.text.trim() ? X.essay.text.trim().split(/\s+/).length : 0
      },
      verbal: { raw: vRaw, s1: v1.raw, s2: v2.raw, path: vPath, scaled: vScaled, pct: GRE.percentile("verbal", vScaled) },
      quant: { raw: qRaw, s1: q1.raw, s2: q2.raw, path: qPath, scaled: qScaled, pct: GRE.percentile("quant", qScaled) },
      sections: [
        { kind: "verbal", no: 1, detail: detail(v1) },
        { kind: "quant", no: 1, detail: detail(q1) },
        { kind: "verbal", no: 2, detail: detail(v2) },
        { kind: "quant", no: 2, detail: detail(q2) }
      ]
    };

    const D = GRE.store.data;
    D.attempts.push(attempt);
    // missed deck
    attempt.sections.forEach(s => s.detail.forEach(d => {
      if (!d.ok && !D.missed.includes(d.qid)) D.missed.push(d.qid);
    }));
    // recency list — last ~3 exams of ids
    const ids = [];
    X.sections.slice(1).forEach(s => (s.items || []).forEach(id => ids.push(id)));
    D.recent = (D.recent || []).concat(ids).slice(-170);
    D.inprogress = null;
    GRE.store.save();
    X = null;
    GRE.results.show(D.attempts.length - 1);
  }
})();
