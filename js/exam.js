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

  const GRAYS = ["var(--chart-fill-1)", "var(--chart-fill-3)", "var(--chart-fill-5)"]; // lightness-separated series fills

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
      sw.style.cssText = `display:inline-block;width:14px;height:14px;border:1px solid var(--chart-axis);background:${GRAYS[i % GRAYS.length]};margin-right:5px;vertical-align:-2px`;
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
      svg.appendChild(sv("line", { x1: L, y1: y, x2: W - R, y2: y, "stroke-width": 1, style: `stroke:${i === 0 ? "var(--chart-axis)" : "var(--chart-grid)"}` }));
      svg.appendChild(sv("text", { x: L - 7, y: y + 4, "text-anchor": "end", "font-size": 11, style: "fill:var(--chart-label)" },
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
          "stroke-width": 1, style: `fill:${GRAYS[si % GRAYS.length]};stroke:var(--chart-axis)`
        }));
      });
      svg.appendChild(sv("text", { x: L + slot * ci + slot / 2, y: H - B + 16, "text-anchor": "middle", "font-size": 11.5, style: "fill:var(--chart-label)" }, cat));
    });
    svg.appendChild(sv("line", { x1: L, y1: T, x2: L, y2: T + ph, "stroke-width": 1, style: "stroke:var(--chart-axis)" }));
    if (spec.unit) svg.appendChild(sv("text", { x: 4, y: 9, "font-size": 10.5, style: "fill:var(--chart-label-muted)" }, "(" + spec.unit + ")"));
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
      svg.appendChild(sv("line", { x1: L, y1: y, x2: W - R, y2: y, "stroke-width": 1, style: `stroke:${i === 0 ? "var(--chart-axis)" : "var(--chart-grid)"}` }));
      svg.appendChild(sv("text", { x: L - 7, y: y + 4, "text-anchor": "end", "font-size": 11, style: "fill:var(--chart-label)" },
        String(+((ymax * i / ticks).toFixed(2)))));
    }
    const nx = spec.cats.length;
    const xAt = i => L + (nx === 1 ? pw / 2 : pw * i / (nx - 1));
    spec.cats.forEach((c, i) => {
      svg.appendChild(sv("text", { x: xAt(i), y: H - B + 16, "text-anchor": "middle", "font-size": 11.5, style: "fill:var(--chart-label)" }, c));
    });
    const dashes = ["", "6,4", "2,3"];
    spec.series.forEach((s, si) => {
      const pts = s.values.map((v, i) => `${xAt(i)},${T + ph - ph * v / ymax}`).join(" ");
      svg.appendChild(sv("polyline", { points: pts, fill: "none", "stroke-width": 2, "stroke-dasharray": dashes[si % dashes.length], style: "stroke:var(--chart-stroke)" }));
      s.values.forEach((v, i) => {
        svg.appendChild(sv("circle", { cx: xAt(i), cy: T + ph - ph * v / ymax, r: 3.5, "stroke-width": 1.5, style: `fill:${si === 0 ? "var(--chart-stroke)" : "var(--paper)"};stroke:var(--chart-stroke)` }));
      });
    });
    svg.appendChild(sv("line", { x1: L, y1: T, x2: L, y2: T + ph, "stroke-width": 1, style: "stroke:var(--chart-axis)" }));
    if (spec.unit) svg.appendChild(sv("text", { x: 4, y: 9, "font-size": 10.5, style: "fill:var(--chart-label-muted)" }, "(" + spec.unit + ")"));
    return svg;
  }

  function pieChart(spec) {
    const W = 560, H = 280, cx = 190, cy = 140, r = 100;
    const svg = svgEl(W, H);
    const total = spec.slices.reduce((s, x) => s + x.value, 0);
    let ang = -Math.PI / 2;
    const fills = ["var(--chart-fill-1)", "var(--chart-fill-2)", "var(--chart-fill-3)", "var(--chart-fill-4)", "var(--chart-fill-5)", "var(--chart-fill-6)"];
    spec.slices.forEach((sl, i) => {
      const frac = sl.value / total, a2 = ang + frac * 2 * Math.PI;
      const x1 = cx + r * Math.cos(ang), y1 = cy + r * Math.sin(ang);
      const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      const large = frac > 0.5 ? 1 : 0;
      svg.appendChild(sv("path", {
        d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`,
        "stroke-width": 1, style: `fill:${fills[i % fills.length]};stroke:var(--chart-axis)`
      }));
      ang = a2;
    });
    let ly = 40;
    spec.slices.forEach((sl, i) => {
      svg.appendChild(sv("rect", { x: 330, y: ly - 11, width: 13, height: 13, "stroke-width": 1, style: `fill:${fills[i % fills.length]};stroke:var(--chart-axis)` }));
      const pct = Math.round(1000 * sl.value / total) / 10;
      svg.appendChild(sv("text", { x: 350, y: ly, "font-size": 12.5, style: "fill:var(--chart-label-strong)" },
        `${sl.label}: ${sl.value}${spec.unit ? " " + spec.unit : ""} (${pct}%)`));
      ly += 24;
    });
    if (spec.totalNote) svg.appendChild(sv("text", { x: 330, y: ly + 4, "font-size": 12, style: "fill:var(--chart-label-muted)" }, spec.totalNote));
    return svg;
  }

  GRE.renderDisplay = function (display) {
    const wrap = document.createElement("div");
    if (display.note) {
      const n = document.createElement("p");
      n.style.cssText = "text-align:center;font-size:13px;color:var(--chart-label-muted);margin:2px 0 8px";
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
     item: {q, passage?, di?}   getAns/setAns close over answer storage
     opts: {review, disabled, hideDirections} */

  // Review state pairs color with an icon + tag, never color alone.
  function reviewPaint(btn, q, i, ans, opts) {
    if (!opts.review) return;
    const el = GRE.el;
    const corrArr = Array.isArray(q.answer) ? q.answer : [q.answer];
    const ansArr = ans == null ? [] : (Array.isArray(ans) ? ans : [ans]);
    if (corrArr.includes(i)) {
      btn.classList.add("correct");
      btn.appendChild(el("span", { class: "tag" }, GRE.icon("check", 13, 3), "Correct answer"));
    }
    if (ansArr.includes(i) && !corrArr.includes(i)) {
      btn.classList.add("wrongpick");
      btn.appendChild(el("span", { class: "tag" }, GRE.icon("x", 12, 2.8), "Your answer"));
    }
  }

  GRE.renderQBody = function (container, item, getAns, setAns, opts) {
    opts = opts || {};
    const q = item.q, el = GRE.el;
    const ro = opts.review || opts.disabled;

    /* Reading Comprehension and Data Interpretation read as a split screen:
       source material on the left, question on the right. */
    let qcol = container;
    if (item.passage) {
      const split = el("div", { class: "split" });
      const pside = el("div", { class: "passage" });
      if (item.di) {
        pside.appendChild(el("div", { class: "passage-label" }, "Questions are based on the following data"));
        const body = el("div", { class: "ptext" });
        if (item.passage.intro) body.appendChild(el("div", { html: item.passage.intro }));
        body.appendChild(GRE.renderDisplay(item.passage.display || {}));
        pside.appendChild(body);
      } else {
        pside.appendChild(el("div", { class: "passage-label" }, "Questions are based on this passage"));
        pside.appendChild(el("div", { class: "ptext", html: item.passage.text }));
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

    /* ----- Text Completion ----- */
    if (q.type === "tc") {
      const blanks = q.blanks || 1;

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
        const btns = [];
        const repaint = () => btns.forEach((b, j) => b.classList.toggle("selected", getAns() === j));
        q.choices.forEach((c, i) => {
          const btn = el("button", {
            class: "choice" + (ro ? " ro" : ""), type: "button",
            onclick: () => {
              if (ro) return;
              setAns(getAns() === i ? null : i);
              repaint();
              renderSentence();
            }
          }, el("span", { class: "oval" }), el("span", { class: "ctext", html: c }));
          reviewPaint(btn, q, i, getAns(), opts);
          btns.push(btn);
          box.appendChild(btn);
        });
        qcol.appendChild(box);
        repaint();
      } else {
        const cols = el("div", { class: "blank-cols" });
        for (let b = 0; b < blanks; b++) {
          const col = el("div", { class: "blank-col" });
          col.appendChild(el("h4", null, "Blank (" + ["i", "ii", "iii"][b] + ")"));
          const box = el("div", { class: "choices" });
          const btns = [];
          const repaint = () => btns.forEach((bt, j) =>
            bt.classList.toggle("selected", Array.isArray(getAns()) && getAns()[b] === j));
          q.choices[b].forEach((c, i) => {
            const btn = el("button", {
              class: "choice" + (ro ? " ro" : ""), type: "button",
              onclick: () => {
                if (ro) return;
                let a = getAns();
                if (!Array.isArray(a)) a = new Array(blanks).fill(null);
                a = a.slice();
                a[b] = (a[b] === i ? null : i);
                setAns(a);
                repaint();
                renderSentence();
              }
            }, el("span", { class: "oval" }), el("span", { class: "ctext", html: c }));
            if (opts.review) {
              const cur = Array.isArray(getAns()) ? getAns()[b] : null;
              if (q.answer[b] === i) {
                btn.classList.add("correct");
                btn.appendChild(el("span", { class: "tag" }, GRE.icon("check", 13, 3), "Correct"));
              }
              if (cur === i && q.answer[b] !== i) {
                btn.classList.add("wrongpick");
                btn.appendChild(el("span", { class: "tag" }, GRE.icon("x", 12, 2.8), "Yours"));
              }
            }
            btns.push(btn);
            box.appendChild(btn);
          });
          col.appendChild(box);
          repaint();
          cols.appendChild(col);
        }
        qcol.appendChild(cols);
        if (!opts.review) {
          qcol.appendChild(el("div", { class: "selcount" },
            "Every blank must be right for credit."));
        }
      }
      return;
    }

    /* ----- Quantitative Comparison ----- */
    if (q.type === "qc") {
      if (q.info) qcol.appendChild(el("div", { class: "qc-info", html: q.info }));
      if (q.figure) qcol.appendChild(el("div", { class: "figure", html: q.figure }));
      const tb = el("table", { class: "qc-table" });
      tb.innerHTML = `<tr><th>Quantity A</th><th>Quantity B</th></tr>
        <tr><td>${q.qa}</td><td>${q.qb}</td></tr>`;
      qcol.appendChild(tb);
      qcol.appendChild(el("hr", { class: "qc-line" }));

      const box = el("div", { class: "choices qc" });
      const btns = [];
      const repaint = () => btns.forEach((b, j) => b.classList.toggle("selected", getAns() === j));
      QC_CHOICES.forEach((c, i) => {
        const btn = el("button", {
          class: "choice" + (ro ? " ro" : ""), type: "button",
          onclick: () => { if (ro) return; setAns(getAns() === i ? null : i); repaint(); }
        }, el("span", { class: "oval" }), el("span", { class: "ctext" }, c));
        reviewPaint(btn, q, i, getAns(), opts);
        btns.push(btn);
        box.appendChild(btn);
      });
      qcol.appendChild(box);
      repaint();
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
        const top = el("input", {
          type: "text", value: a[0] || "", "aria-label": "Numerator",
          oninput: e => {
            const cur = Array.isArray(getAns()) ? getAns().slice() : ["", ""];
            cur[0] = e.target.value; setAns(cur);
          }
        });
        const bot = el("input", {
          type: "text", value: a[1] || "", "aria-label": "Denominator",
          oninput: e => {
            const cur = Array.isArray(getAns()) ? getAns().slice() : ["", ""];
            cur[1] = e.target.value; setAns(cur);
          }
        });
        if (ro) { top.disabled = true; bot.disabled = true; }
        focusTransfer(top); focusTransfer(bot);
        fb.appendChild(top); fb.appendChild(el("hr")); fb.appendChild(bot);
        wrap.appendChild(fb);
      } else {
        const inp = el("input", {
          type: "text", value: getAns() || "", "aria-label": "Answer",
          oninput: e => setAns(e.target.value)
        });
        if (ro) inp.disabled = true;
        focusTransfer(inp);
        wrap.appendChild(inp);
        if (q.unitAfter) wrap.appendChild(el("span", { class: "unit", html: q.unitAfter }));
      }
      qcol.appendChild(wrap);
      if (q.frac && !opts.review) {
        qcol.appendChild(el("div", { class: "fracnote" }, "Equivalent fractions are accepted."));
      }
      if (opts.review) {
        const corr = q.frac ? (q.ansFrac[0] + "/" + q.ansFrac[1]) : String(q.answer);
        qcol.appendChild(el("p", { class: "correct-answer" },
          "Correct answer: ", el("strong", { class: "mono" }, corr)));
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
    const btns = [];
    const count = el("div", { class: "selcount" });

    const repaint = () => {
      const a = getAns();
      const sel = i => multi ? (Array.isArray(a) && a.includes(i)) : a === i;
      const n = Array.isArray(a) ? a.length : (a != null ? 1 : 0);
      const atMax = multi && isFinite(maxSel) && n >= maxSel;
      btns.forEach((b, i) => {
        const on = sel(i);
        b.classList.toggle("selected", on);
        b.classList.toggle("dim", !opts.review && atMax && !on);
        const hint = b.querySelector(".maxhint");
        if (hint) hint.classList.toggle("hidden", !(atMax && !on));
      });
      if (q.type === "se" && !opts.review) {
        count.textContent = `${n} of 2 selected · both must be right for credit`;
      } else if (q.type === "mcma" && !opts.review) {
        count.textContent = `${n} selected · credit requires every correct choice`;
      }
    };

    q.choices.forEach((c, i) => {
      const btn = el("button", {
        class: "choice" + (ro ? " ro" : ""), type: "button",
        onclick: () => {
          if (ro) return;
          if (multi) {
            let a = Array.isArray(getAns()) ? getAns().slice() : [];
            if (a.includes(i)) a = a.filter(x => x !== i);
            else { if (a.length >= maxSel) return; a.push(i); }
            setAns(a.length ? a : null);
          } else {
            setAns(getAns() === i ? null : i);
          }
          repaint();
        }
      },
        el("span", { class: multi ? "sqr" : "oval" }, multi ? GRE.icon("check", 13, 3.4) : null),
        el("span", { class: "ctext", html: c }));

      if (q.type === "se" && !opts.review) {
        btn.appendChild(el("span", { class: "maxhint hidden" }, "max 2 reached"));
      }
      reviewPaint(btn, q, i, getAns(), opts);
      btns.push(btn);
      box.appendChild(btn);
    });
    qcol.appendChild(box);
    if (multi && !opts.review) qcol.appendChild(count);
    repaint();
  };

  /* ================= exam assembly ================= */

  const SECTIONS = [
    { kind: "awa", label: "Analytical Writing", durSec: 30 * 60 },
    { kind: "verbal", no: 1, n: 12, durSec: 18 * 60, label: "Verbal Reasoning · Section 1" },
    { kind: "quant", no: 1, n: 12, durSec: 21 * 60, label: "Quantitative Reasoning · Section 1" },
    { kind: "verbal", no: 2, n: 15, durSec: 23 * 60, label: "Verbal Reasoning · Section 2" },
    { kind: "quant", no: 2, n: 15, durSec: 26 * 60, label: "Quantitative Reasoning · Section 2" }
  ];

  function draw(pool, n, avoid) {
    const fresh = [], stale = [];
    GRE.shuffle(pool).forEach(x => (avoid.has(x.id) ? stale : fresh).push(x));
    return fresh.concat(stale).slice(0, n);
  }

  function drawSpread(pool, n, avoid, keyFn) {
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
    if (i === 3) { // Verbal 2: route on Verbal 1 raw
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

  /* -------- intro -------- */

  E.startIntro = function (skipGate) {
    if (GRE.store.data.inprogress) {
      GRE.modal("Exam in progress",
        "<p>You already have an unfinished mock. Resume or discard it from the dashboard first.</p>",
        [{ label: "Go to dashboard", action: () => GRE.show(GRE.screens.home) }],
        { intent: "warning" });
      return;
    }
    // The mock is the finish line of the course. Gate it, but let a determined
    // user through - a cold diagnostic first is a legitimate choice.
    if (!skipGate && GRE.course && !GRE.course.courseComplete()) {
      const pct = GRE.course.percentComplete();
      GRE.modal("The mock exam is the finish line",
        `<p>The study course is <strong>${pct}% complete</strong>. It's built to take you from the
         basics to the hardest material, and the mock is designed as the test you sit
         <em>after</em> finishing it.</p>
         <p>You can still take the mock now as a cold diagnostic, just expect a lower score if you
         haven't worked through the material yet.</p>`,
        [
          { label: "Go to the course", action: () => GRE.show(GRE.screens.course) },
          { label: "Take the mock anyway", secondary: true, action: () => E.startIntro(true) }
        ],
        { intent: "info" });
      return;
    }

    GRE.show(root => {
      const el = GRE.el;
      root.appendChild(el("div", { class: "examhead" },
        el("div", { class: "etitle" }, "GRE® General Test, Mock"),
        el("span", { class: "note-right" }, "not started")));
      const { stage, inner } = GRE.stage("exam");
      root.appendChild(stage);

      inner.appendChild(el("h1", { class: "screen-title" }, "Before you begin"));
      inner.appendChild(el("p", { class: "screen-sub" },
        "Total time about 1 hour 58 minutes. The second Verbal and Quant sections are adaptive."));

      const rules = el("div", { class: "rules" });
      const rule = (key, cls, html) => rules.appendChild(el("div", { class: "rule" },
        el("span", { class: "key" + (cls ? " " + cls : "") }, key),
        el("span", { class: "txt", html })));
      rule("30m", "", "<strong>Analytical Writing</strong> — Analyze an Issue · 1 task");
      rule("18m", "v", "<strong>Verbal</strong> · Section 1 — 12 questions");
      rule("21m", "q", "<strong>Quant</strong> · Section 1 — 12 questions");
      rule("23m", "v", "<strong>Verbal</strong> · Section 2 — 15 questions <span class='adaptive'>· adaptive</span>");
      rule("26m", "q", "<strong>Quant</strong> · Section 2 — 15 questions <span class='adaptive'>· adaptive</span>");
      inner.appendChild(rules);

      inner.appendChild(el("p", { style: "font-size:13px;color:var(--muted);margin:16px 0 0;line-height:1.55" },
        "Move freely within a section (Back / Next / Mark / Review). Once you Exit a section you " +
        "can't return. The calculator is Quant-only. There is no penalty for guessing. The clock " +
        "pauses if you close this app mid-exam and resume later."));

      const row = el("div", { class: "btnrow" });
      row.appendChild(el("button", {
        class: "btn exam", style: "flex:1",
        onclick: () => { newExam(); enterSection(0); }
      }, "Begin test"));
      row.appendChild(el("button", {
        class: "btn secondary", onclick: () => GRE.show(GRE.screens.home)
      }, "Not yet"));
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

  function sectionTitle(i) {
    const sec = X.sections[i];
    const names = { awa: "Analytical Writing, Analyze an Issue", verbal: "Verbal Reasoning", quant: "Quantitative Reasoning" };
    const base = names[sec.kind] + (sec.no ? ` · Section ${sec.no === 1 ? 1 : 2}` : "");
    return `Section ${i + 1} of 5: ${base}`;
  }

  function shortTitle(i) {
    const sec = X.sections[i];
    if (sec.kind === "awa") return "Analytical Writing · Analyze an Issue";
    return (sec.kind === "verbal" ? "Verbal Reasoning" : "Quantitative Reasoning") + " · Section " + sec.no;
  }

  function examBarSimple(note) {
    const el = GRE.el;
    return el("div", { class: "examhead" },
      el("div", { class: "etitle" }, "GRE® General Test, Mock"),
      el("span", { class: "note-right" }, note || ""));
  }

  function showDirections(i) {
    const sec = X.sections[i];
    GRE.show(root => {
      const el = GRE.el;
      root.appendChild(examBarSimple(shortTitle(i)));
      const { stage, inner } = GRE.stage("exam");
      root.appendChild(stage);

      inner.appendChild(el("h1", { class: "screen-title" }, sectionTitle(i)));
      const card = GRE.el("div", { class: "card" });
      if (sec.kind === "awa") {
        card.innerHTML = `
          <h3>Analyze an Issue: 30 minutes</h3>
          <p>You will be given a brief statement on an issue of general interest and instructions on how to
          respond. You are free to accept, reject, or qualify the claim, as long as what you write is in
          concert with the instructions.</p>
          <p>Trained readers score responses on a 0–6 scale for how well you articulate and support a
          position, organize your ideas, and control the elements of standard written English. A response
          that addresses a different topic scores 0.</p>
          <p>The editor provides Cut, Copy, Paste, Undo, and Redo. There is <em>no spell-check or
          grammar-check</em>, just like the real test.</p>`;
      } else if (sec.kind === "verbal") {
        card.innerHTML = `
          <h3>${sec.n} questions: ${Math.round(sec.durSec / 60)} minutes</h3>
          <p>For each question, indicate the best answer using the directions given with the question.</p>
          <ul>
            <li><strong>Text Completion:</strong> fill each blank from its column of choices; credit only for getting <em>all</em> blanks right.</li>
            <li><strong>Sentence Equivalence:</strong> pick the <em>two</em> choices that both complete the sentence and produce sentences alike in meaning; no credit for one right choice.</li>
            <li><strong>Reading Comprehension:</strong> answer based on what the passage states or implies, not outside knowledge.</li>
          </ul>`;
      } else {
        card.innerHTML = `
          <h3>${sec.n} questions: ${Math.round(sec.durSec / 60)} minutes</h3>
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
      const row = el("div", { class: "btnrow" });
      row.appendChild(el("button", {
        class: "btn exam", onclick: () => { sec.started = true; save(); runSection(i); }
      }, sec.kind === "awa" ? "Start writing" : "Start section", GRE.icon("arrow", 17)));
      inner.appendChild(row);
      if (i > 0) {
        inner.appendChild(el("p", { class: "footnote" },
          "The section clock starts when you click the button. Pausing here is possible but the real " +
          "test moves you along automatically: don't linger."));
      }
    });
  }

  /* -------- running a timed section -------- */

  function runSection(i) {
    const sec = X.sections[i];
    const endsAt = Date.now() + sec.remaining * 1000;
    let timerHidden = false;
    let onReview = false;

    stopTicker();

    GRE.show(root => {
      const el = GRE.el;
      const isAwa = sec.kind === "awa";

      /* ---- exam header: title + PowerPrep-style toolbar ---- */
      const toolbar = el("div", { class: "toolbar" });
      const head = el("div", { class: "examhead" },
        el("div", { class: "brand" },
          el("div", { class: "etitle" }, "GRE® Mock"),
          el("div", { class: "enote" }, shortTitle(i))),
        toolbar);

      const tbtn = (icon, label, fn, cls) => {
        const b = el("button", {
          class: "tbtn" + (cls ? " " + cls : ""), onclick: fn,
          type: "button", "aria-label": label
        }, GRE.icon(icon, 16), el("span", { class: "lb" }, label));
        toolbar.appendChild(b);
        return b;
      };

      let markBtn, backBtn, nextBtn, calcBtn;

      tbtn("exit", "Exit", () => confirmExit());
      if (!isAwa) {
        tbtn("list", "Review", () => { commitTime(); onReview = true; paint(); });
        markBtn = tbtn("flag", "Mark", () => {
          sec.marked[cur] = !sec.marked[cur];
          save(); paint();
        });
      }
      tbtn("help", "Help", () => showHelp(sec));
      if (sec.kind === "quant") {
        calcBtn = tbtn("calc", "Calc", () => {
          GRE.calc.toggle();
          calcBtn.classList.toggle("on", !GRE.calc.isHidden());
        });
      }
      toolbar.appendChild(el("div", { class: "toolsep" }));
      if (!isAwa) {
        backBtn = tbtn("chevL", "Back", () => { if (cur > 0) moveTo(cur - 1); }, "wide");
        nextBtn = tbtn("chevR", "Next", () => {
          if (cur < sec.items.length - 1) moveTo(cur + 1);
          else endOfSectionPrompt();
        }, "wide next");
      } else {
        tbtn("chevR", "Next", () => confirmExit(true), "wide next");
      }
      root.appendChild(head);

      /* ---- sub-strip: counter + hideable timer ---- */
      const counter = el("span", { class: "qcount" });
      const timerEl = el("span", { class: "timer" });
      const hideBtn = el("button", {
        class: "hidebtn", type: "button",
        onclick: () => {
          timerHidden = !timerHidden;
          hideBtn.textContent = timerHidden ? "Show Time" : "Hide Time";
          tick();
        }
      }, "Hide Time");
      root.appendChild(el("div", { class: "substrip" },
        counter,
        el("span", { class: "right" }, hideBtn, timerEl)));

      /* Live region for the 5-minute warning: announced, not just colored. */
      const low = el("div", { class: "lowtime hidden", role: "status", "aria-live": "polite" });
      const lowText = el("span", null, "");
      low.appendChild(GRE.icon("clock", 17));
      low.appendChild(lowText);
      root.appendChild(low);
      let lowShown = false;

      const { stage, inner } = GRE.stage("exam");
      root.appendChild(stage);

      let cur = 0;
      if (!isAwa) {
        const firstUnseen = sec.seen.findIndex(s => !s);
        cur = firstUnseen === -1 ? 0 : firstUnseen;
      }

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
        counter.innerHTML = "";
        counter.appendChild(document.createTextNode(`Question ${cur + 1} of ${sec.items.length}`));
        if (sec.marked[cur]) counter.appendChild(el("span", { class: "fl" }, GRE.icon("flag", 13)));

        markBtn.classList.toggle("marked", !!sec.marked[cur]);
        markBtn.querySelector(".lb").textContent = sec.marked[cur] ? "Marked" : "Mark";
        backBtn.disabled = cur === 0;

        const id = sec.items[cur];
        const item = GRE.byId[id];
        if (!item) { inner.textContent = "Question unavailable."; return; }

        // reading/data questions get a wider stage for the split layout
        inner.classList.toggle("splitwide", !!item.passage);

        GRE.renderQBody(inner, item,
          () => sec.answers[cur],
          v => { sec.answers[cur] = v; save(); },
          {});
        stamp = Date.now();
        stage.scrollTop = 0;
      }

      function paintReview() {
        counter.textContent = "Review · " + shortTitle(i);
        inner.classList.remove("splitwide");

        inner.appendChild(el("h1", { class: "screen-title" }, "Review your answers"));
        inner.appendChild(el("p", { class: "screen-sub" },
          "Click a row to go to that question. You can change answers until you exit the section."));

        const wrap = el("div", { class: "review-wrap" });
        const tb = el("table", { class: "review-table" });
        const thead = el("thead");
        thead.innerHTML = "<tr><th>QUESTION</th><th>STATUS</th><th>MARK</th></tr>";
        tb.appendChild(thead);
        const tbody = el("tbody");

        sec.items.forEach((id, j) => {
          const item = GRE.byId[id];
          const answered = item && GRE.isAnswered(item.q, sec.answers[j]);
          const tr = el("tr", { class: j === cur ? "cur" : "", onclick: () => moveTo(j) });
          tr.appendChild(el("td", null, `Question ${j + 1}`));

          const std = el("td");
          const st = el("span", { class: "st " + (answered ? "ans" : sec.seen[j] ? "not" : "unseen") });
          if (answered) { st.appendChild(GRE.icon("check", 12, 3)); st.appendChild(document.createTextNode("Answered")); }
          else if (sec.seen[j]) { st.appendChild(GRE.icon("x", 12, 2.6)); st.appendChild(document.createTextNode("Not Answered")); }
          else { st.appendChild(document.createTextNode("Not Seen")); }
          std.appendChild(st);
          tr.appendChild(std);

          const mkd = el("td");
          if (sec.marked[j]) mkd.appendChild(el("span", { class: "mk" }, GRE.icon("flag", 13)));
          tr.appendChild(mkd);
          tbody.appendChild(tr);
        });
        tb.appendChild(tbody);
        wrap.appendChild(tb);
        inner.appendChild(wrap);

        const row = el("div", { class: "btnrow" });
        row.appendChild(el("button", {
          class: "btn exam", style: "flex:1", onclick: () => { onReview = false; paint(); }
        }, "Return to question"));
        row.appendChild(el("button", {
          class: "btn secondary", onclick: () => confirmExit()
        }, "Exit section"));
        inner.appendChild(row);
        stage.scrollTop = 0;
      }

      /* ---- essay ---- */
      let undoStack = [], redoStack = [], undoTimer = null, clipboard = "";
      function paintEssay() {
        counter.textContent = "Analyze an Issue";
        const prompt = window.GREBANK.essays.find(e => e.id === X.essay.promptId);
        const wrap = el("div", { class: "essay-wrap" });
        wrap.appendChild(el("div", { class: "essay-prompt", html:
          "<p>" + GRE.esc(prompt.prompt) + "</p><p>" + GRE.esc(prompt.task) + "</p>" }));

        const toolbar2 = el("div", { class: "essay-toolbar" });
        const box = el("textarea", {
          class: "essay-box", spellcheck: "false", autocomplete: "off",
          "aria-label": "Essay response"
        });
        box.value = X.essay.text || "";
        const wc = el("span", { class: "wc" });
        const updWC = () => {
          const words = box.value.trim() ? box.value.trim().split(/\s+/).length : 0;
          wc.textContent = words + " word" + (words === 1 ? "" : "s") + " · no spell-check";
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
        // block external clipboard, allow internal (like the real editor)
        box.addEventListener("paste", e => { e.preventDefault(); insertAtCursor(clipboard); });
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

        const tbBtn = (label, fn) => toolbar2.appendChild(
          el("button", { type: "button", onclick: () => { fn(); box.focus(); } }, label));
        tbBtn("Cut", () => { clipboard = selText(); pushUndo(); replaceSel(""); sync(); });
        tbBtn("Copy", () => { clipboard = selText(); });
        tbBtn("Paste", () => insertAtCursor(clipboard));
        tbBtn("Undo", () => {
          if (undoStack.length) { redoStack.push(box.value); box.value = undoStack.pop(); sync(); }
        });
        tbBtn("Redo", () => {
          if (redoStack.length) { undoStack.push(box.value); box.value = redoStack.pop(); sync(); }
        });
        toolbar2.appendChild(wc);

        wrap.appendChild(toolbar2);
        wrap.appendChild(box);
        inner.appendChild(wrap);
        box.focus();
      }

      /* ---- timer ---- */
      function tick() {
        const remain = Math.max(0, (endsAt - Date.now()) / 1000);
        sec.remaining = remain;
        const low5 = remain <= 300 && remain > 0;

        // at 5:00 the timer comes back and can no longer be hidden
        if (low5 && timerHidden) { timerHidden = false; hideBtn.textContent = "Hide Time"; }
        hideBtn.disabled = low5;

        timerEl.textContent = timerHidden ? "" : GRE.fmtTime(remain);
        timerEl.classList.toggle("low", low5);

        if (low5) {
          const inc = isAwa ? 0 :
            sec.items.filter((id, j) => !GRE.isAnswered(GRE.byId[id].q, sec.answers[j])).length;
          const msg = isAwa
            ? "5 minutes left in this section. The timer is back and can't be hidden."
            : `5 minutes left in this section. ${inc} ${inc === 1 ? "question is" : "questions are"} ` +
              "unanswered. The timer is back and can't be hidden.";
          if (!lowShown) { low.classList.remove("hidden"); lowShown = true; }
          if (lowText.textContent !== msg) lowText.textContent = msg;
        }

        if (remain <= 0) {
          stopTicker();
          commitTime();
          GRE.modal("Time expired",
            "<p>Time has expired for this section. Your answers have been recorded.</p>",
            [{ label: "Continue", action: () => finalizeSection(i) }],
            { intent: "warning" });
        }
      }
      ticker = setInterval(() => { tick(); if (Math.floor(sec.remaining) % 10 === 0) save(); }, 500);
      tick();

      function confirmExit(fromNext) {
        const unanswered = isAwa ? 0 :
          sec.items.filter((id, j) => !GRE.isAnswered(GRE.byId[id].q, sec.answers[j])).length;
        const msg = isAwa
          ? "<p>Finish the Analytical Writing section? You cannot return to your essay afterwards.</p>"
          : "<p>You cannot return to this section once you leave.</p>" +
            (unanswered
              ? `<p><strong>${unanswered}</strong> question${unanswered === 1 ? " is" : "s are"} ` +
                "unanswered and will be scored as incorrect.</p>"
              : "");
        GRE.modal(fromNext && isAwa ? "Finish the essay?" : "Exit this section?", msg, [
          {
            label: isAwa ? "Finish essay" : "Exit section", danger: true,
            action: () => { stopTicker(); commitTime(); finalizeSection(i); }
          },
          { label: "Keep working", secondary: true }
        ], { intent: "danger" });
      }

      function endOfSectionPrompt() {
        GRE.modal("End of section",
          "<p>You are at the last question. Use <strong>Review</strong> to check your answers, " +
          "or exit the section to continue the test.</p>",
          [
            { label: "Review answers", action: () => { commitTime(); onReview = true; paint(); } },
            { label: "Exit section", action: () => confirmExit() },
            { label: "Return", secondary: true }
          ],
          { intent: "info" });
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
        <li><strong>Exit</strong> ends the section permanently.</li>
        <li><strong>Hide Time</strong> hides the clock; it reappears automatically at 5:00 remaining.</li>
      </ul>`;
    const per = sec.kind === "quant"
      ? "<h4>Quantitative</h4><p>The Calc button opens the on-screen calculator. In Numeric Entry questions, click a box then use <em>Transfer Display</em> to copy the calculator value into it.</p>"
      : sec.kind === "verbal"
        ? "<h4>Verbal</h4><p>Text Completion gives credit only when every blank is correct. Sentence Equivalence requires both correct choices.</p>"
        : "<h4>Analytical Writing</h4><p>Use the toolbar for Cut / Copy / Paste / Undo / Redo. There is no spell-check.</p>";
    GRE.modal("Help", nav + per, [{ label: "Return" }], { intent: "info", large: true });
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
      const el = GRE.el;
      root.appendChild(examBarSimple("Section complete"));
      const { stage, inner } = GRE.stage("exam");
      root.appendChild(stage);
      inner.appendChild(el("h1", { class: "screen-title" }, "Section complete"));
      inner.appendChild(el("p", { class: "screen-sub" },
        `Up next: ${shortTitle(next)}. ` +
        "On the real test the next section begins almost immediately: click through when you're ready."));
      const row = el("div", { class: "btnrow" });
      row.appendChild(el("button", {
        class: "btn exam", onclick: () => enterSection(next)
      }, "Continue", GRE.icon("arrow", 17)));
      inner.appendChild(row);
    });
  }

  function finishExam() {
    stopTicker();
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
    attempt.sections.forEach(s => s.detail.forEach(d => {
      if (!d.ok && !D.missed.includes(d.qid)) D.missed.push(d.qid);
    }));
    const ids = [];
    X.sections.slice(1).forEach(s => (s.items || []).forEach(id => ids.push(id)));
    D.recent = (D.recent || []).concat(ids).slice(-170);
    D.inprogress = null;
    GRE.store.save();
    X = null;
    GRE.results.show(D.attempts.length - 1);
  }
})();
