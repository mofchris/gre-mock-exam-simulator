/* Results: score report, analytics, question-by-question review, AWA self-scoring. */
(function () {
  "use strict";
  const GRE = window.GRE = window.GRE || {};
  const R = {};
  GRE.results = R;

  const V_COLOR = "#2f6fd0", Q_COLOR = "#c47b2a"; // validated categorical pair

  function sv(tag, attrs, text) {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- score trend across attempts (history screen) ---------- */

  R.trendChart = function (attempts) {
    const el = GRE.el;
    const box = el("div", { class: "card trend" });
    box.appendChild(el("h3", null, "Score trend"));
    if (attempts.length < 2) {
      box.appendChild(el("p", { style: "color:#5a6470;font-size:14px" },
        "Take at least two mocks to see a trend."));
      if (attempts.length === 1) box.appendChild(el("p", { style: "font-size:14.5px" },
        `First attempt: Verbal ${attempts[0].verbal.scaled}, Quant ${attempts[0].quant.scaled}.`));
      return box;
    }
    const W = 640, H = 240, L = 46, Rm = 76, T = 16, B = 30;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    const lo = 130, hi = 170;
    const pw = W - L - Rm, ph = H - T - B;
    const xAt = i => L + (attempts.length === 1 ? pw / 2 : pw * i / (attempts.length - 1));
    const yAt = v => T + ph - ph * (v - lo) / (hi - lo);
    for (let v = lo; v <= hi; v += 10) {
      svg.appendChild(sv("line", { x1: L, y1: yAt(v), x2: W - Rm, y2: yAt(v), stroke: v === lo ? "#8a94a2" : "#e3e7ec", "stroke-width": 1 }));
      svg.appendChild(sv("text", { x: L - 8, y: yAt(v) + 4, "text-anchor": "end", "font-size": 11, fill: "#5a6470" }, String(v)));
    }
    attempts.forEach((a, i) => {
      svg.appendChild(sv("text", { x: xAt(i), y: H - 8, "text-anchor": "middle", "font-size": 11, fill: "#5a6470" }, String(i + 1)));
    });
    const series = [
      { name: "Verbal", color: V_COLOR, vals: attempts.map(a => a.verbal.scaled) },
      { name: "Quant", color: Q_COLOR, vals: attempts.map(a => a.quant.scaled) }
    ];
    series.forEach(s => {
      svg.appendChild(sv("polyline", {
        points: s.vals.map((v, i) => `${xAt(i)},${yAt(v)}`).join(" "),
        fill: "none", stroke: s.color, "stroke-width": 2
      }));
      s.vals.forEach((v, i) => svg.appendChild(sv("circle", {
        cx: xAt(i), cy: yAt(v), r: 4, fill: s.color, stroke: "#fff", "stroke-width": 2
      })));
      // direct label at line end
      svg.appendChild(sv("text", {
        x: xAt(s.vals.length - 1) + 10, y: yAt(s.vals[s.vals.length - 1]) + 4,
        "font-size": 12, fill: "#1a1a1a", "font-weight": "bold"
      }, `${s.name} ${s.vals[s.vals.length - 1]}`));
    });
    box.appendChild(svg);
    box.appendChild(GRE.el("p", { style: "font-size:12px;color:#5a6470;margin:4px 0 0" },
      "Attempt number → scaled score (130–170)."));
    return box;
  };

  /* ---------- full report ---------- */

  R.show = function (idx) { GRE.show(root => paintReport(root, idx, true)); };
  R.showSaved = function (idx) { GRE.show(root => paintReport(root, idx, false)); };

  function paintReport(root, idx, justFinished) {
    const el = GRE.el;
    const a = GRE.store.data.attempts[idx];
    const { bar, stage, inner } = GRE.chrome("Score Report");
    root.appendChild(bar); root.appendChild(stage);

    inner.appendChild(el("h1", { class: "screen-title" },
      justFinished ? "Test complete: your scores" : `Score report, attempt ${idx + 1}`));
    inner.appendChild(el("p", { class: "screen-sub" }, new Date(a.date).toLocaleString() +
      " · Scores are estimates from an approximate raw-to-scale concordance."));

    /* score cards */
    const cards = el("div", { class: "score-cards" });
    const card = (lbl, val, pct) => cards.appendChild(el("div", { class: "score-card" },
      el("div", { class: "lbl" }, lbl),
      el("div", { class: "val" }, String(val)),
      el("div", { class: "pct" }, pct)));
    card("Verbal Reasoning", a.verbal.scaled, `${a.verbal.pct}th percentile · raw ${a.verbal.raw}/27`);
    card("Quantitative Reasoning", a.quant.scaled, `${a.quant.pct}th percentile · raw ${a.quant.raw}/27`);
    card("Total (V+Q)", a.verbal.scaled + a.quant.scaled, "260–340 scale");
    inner.appendChild(cards);

    /* adaptive path summary */
    const pathCard = el("div", { class: "card" });
    pathCard.appendChild(el("h3", null, "Adaptive routing"));
    const pathName = p => ({ easy: "easier", medium: "medium", hard: "harder" }[p] || p);
    pathCard.appendChild(el("p", null,
      `Verbal: ${a.verbal.s1}/12 in Section 1 → you got the ${pathName(a.verbal.path)} second section, then ${a.verbal.s2}/15. ` +
      `Quant: ${a.quant.s1}/12 in Section 1 → ${pathName(a.quant.path)} second section, then ${a.quant.s2}/15. ` +
      "Reaching the harder second section raises your score ceiling; the easier one caps it: same as the real test."));
    inner.appendChild(pathCard);

    /* per-topic accuracy */
    const topicCard = el("div", { class: "card" });
    topicCard.appendChild(el("h3", null, "Accuracy by area"));
    topicCard.appendChild(topicBars(a));
    inner.appendChild(topicCard);

    /* timing */
    const timeCard = el("div", { class: "card" });
    timeCard.appendChild(el("h3", null, "Pacing"));
    a.sections.forEach(s => {
      const total = s.detail.reduce((x, d) => x + d.time, 0);
      const avg = total / s.detail.length;
      const slow = s.detail.filter(d => d.time > 150).length;
      timeCard.appendChild(el("p", { style: "margin:4px 0" },
        `${s.kind === "verbal" ? "Verbal" : "Quant"} S${s.no}: ` +
        `${GRE.fmtTime(total)} used · ${Math.round(avg)}s per question` +
        (slow ? ` · ${slow} question${slow > 1 ? "s" : ""} over 2:30 (marked “slow” below)` : "")));
    });
    inner.appendChild(timeCard);

    /* AWA */
    const awa = el("div", { class: "card" });
    awa.appendChild(el("h3", null, "Analytical Writing: self-score"));
    const prompt = window.GREBANK.essays.find(e => e.id === a.essay.promptId);
    awa.appendChild(el("p", null, el("em", null, prompt ? prompt.prompt : "")));
    awa.appendChild(el("p", null, `Your response: ${a.essay.words} words.`));
    if (a.essay.text) {
      const det = el("details");
      det.appendChild(el("summary", { style: "cursor:pointer;color:#2b6cb0" }, "Show my essay"));
      det.appendChild(el("div", { style: "white-space:pre-wrap;font-size:14.5px;background:#fafbfc;border:1px solid #e0e4ea;border-radius:6px;padding:12px;margin-top:8px" }, a.essay.text));
      awa.appendChild(det);
    } else {
      awa.appendChild(el("p", { style: "color:#b02a2a" }, "No essay text was entered."));
    }
    const rub = el("details", { style: "margin-top:10px" });
    rub.appendChild(el("summary", { style: "cursor:pointer;color:#2b6cb0" }, "Scoring rubric (0–6) and a sample high-scoring response"));
    const rubBody = el("div", { style: "margin-top:8px" });
    rubBody.innerHTML = window.GREBANK.awaRubric +
      "<h4 style='margin:14px 0 6px'>Sample high-scoring response (score 6)</h4>" +
      "<p style='font-size:13px;color:#5a6470'>Prompt: " + GRE.esc(window.GREBANK.awaSample.prompt) + "</p>" +
      "<div style='white-space:pre-wrap;font-size:14px;background:#fafbfc;border:1px solid #e0e4ea;border-radius:6px;padding:12px'>" +
      GRE.esc(window.GREBANK.awaSample.text) + "</div>";
    rub.appendChild(rubBody);
    awa.appendChild(rub);

    const selRow = el("p", { style: "margin-top:12px" }, "After comparing against the rubric, my essay is about a: ");
    const sel = el("select", { style: "font-size:15px;padding:5px 8px", onchange: e => {
      a.essay.selfScore = parseFloat(e.target.value);
      GRE.store.save();
    } });
    sel.appendChild(el("option", { value: "" }, ", pick, "));
    for (let s = 6; s >= 0; s -= 0.5) {
      const o = el("option", { value: String(s) }, s.toFixed(1));
      if (a.essay.selfScore === s) o.selected = true;
      sel.appendChild(o);
    }
    selRow.appendChild(sel);
    awa.appendChild(selRow);
    inner.appendChild(awa);

    /* question review */
    inner.appendChild(el("h2", { class: "screen-title", style: "margin-top:30px;font-size:20px" }, "Question-by-question review"));
    a.sections.forEach(s => {
      inner.appendChild(el("h3", { style: "color:#1f3864;margin:22px 0 10px" },
        `${s.kind === "verbal" ? "Verbal" : "Quantitative"}, Section ${s.no}`));
      s.detail.forEach((d, j) => inner.appendChild(reviewItem(d, j)));
    });

    const row = el("div", { class: "btnrow" });
    row.appendChild(el("button", { class: "bigbtn", onclick: () => GRE.show(GRE.screens.home) }, "Home"));
    row.appendChild(el("button", { class: "bigbtn secondary", onclick: () => GRE.show(GRE.screens.missed) },
      "Drill missed questions"));
    inner.appendChild(row);
  }

  function topicBars(a) {
    const el = GRE.el;
    const agg = {};
    a.sections.forEach(s => s.detail.forEach(d => {
      const entry = GRE.byId[d.qid];
      if (!entry) return;
      const q = entry.q;
      let key;
      if (s.kind === "quant") {
        key = { arithmetic: "Arithmetic", algebra: "Algebra", geometry: "Geometry", data: "Data Analysis" }[q.topic] || "Quant: other";
      } else {
        key = entry.passage ? "Reading Comprehension"
          : q.type === "tc" ? "Text Completion"
          : q.type === "se" ? "Sentence Equivalence" : "Critical Reasoning";
      }
      agg[key] = agg[key] || { n: 0, ok: 0 };
      agg[key].n++;
      if (d.ok) agg[key].ok++;
    }));
    const wrap = el("div", { class: "topic-bars" });
    Object.keys(agg).forEach(k => {
      const { n, ok } = agg[k];
      const pct = Math.round(100 * ok / n);
      const row = el("div", { class: "tbar-row" },
        el("div", null, k),
        el("div", { class: "tbar-track" }, el("div", { class: "tbar-fill", style: `width:${pct}%` })),
        el("div", null, `${ok}/${n} (${pct}%)`));
      wrap.appendChild(row);
    });
    return wrap;
  }

  function reviewItem(d, j) {
    const el = GRE.el;
    const entry = GRE.byId[d.qid];
    const box = el("div", { class: "rev-item" });
    if (!entry) { box.textContent = "Question no longer in bank."; return box; }
    const q = entry.q;
    const head = el("div", { class: "rhead" },
      el("strong", null, `Question ${j + 1}`),
      el("span", { class: "pill" }, GRE.describeType(q, entry)),
      q.topic ? el("span", { class: "pill" }, { arithmetic: "Arithmetic", algebra: "Algebra", geometry: "Geometry", data: "Data Analysis" }[q.topic] || q.topic) : null,
      el("span", { class: "pill" }, q.diff || "medium"),
      el("span", { class: d.ok ? "ok" : "no" }, d.ok ? "✔ Correct" : "✘ Incorrect"),
      el("span", null, `⏱ ${GRE.fmtTime(d.time)}${d.time > 150 ? ": slow" : ""}`));
    box.appendChild(head);
    GRE.renderQBody(box, entry, () => d.ans, () => {}, { review: true, disabled: true });
    const ex = el("div", { class: "expl" });
    ex.innerHTML = "<strong>Explanation.</strong> " + q.expl +
      (q.tip ? `<div class="tip"><strong>Strategy:</strong> ${q.tip}</div>` : "");
    box.appendChild(ex);
    return box;
  }
})();
