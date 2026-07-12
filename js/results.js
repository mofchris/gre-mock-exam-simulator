/* Results: score report, analytics, question-by-question review, AWA self-scoring. */
(function () {
  "use strict";
  const GRE = window.GRE = window.GRE || {};
  const R = {};
  GRE.results = R;

  const V_COLOR = "#2f63c6", Q_COLOR = "#c47b2a";
  const LAG = 75; // an area below this is called out as the weak one

  function sv(tag, attrs, text) {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  // 1st / 2nd / 3rd / 4th, with the 11-13 exceptions.
  function ordinal(n) {
    const rem100 = n % 100;
    if (rem100 >= 11 && rem100 <= 13) return n + "th";
    return n + (["th", "st", "nd", "rd"][n % 10] || "th");
  }

  /* ---------- V/Q score trend across attempts ---------- */

  R.trendChart = function (attempts) {
    const el = GRE.el;
    const box = el("div", { class: "card trend" });
    const hd = el("div", { class: "cardhead" }, el("h3", null, "Score trend"));
    hd.appendChild(el("div", { class: "vqlegend" },
      el("span", null, el("i", { class: "v" }), "Verbal"),
      el("span", null, el("i", { class: "q" }), "Quant")));
    box.appendChild(hd);

    if (attempts.length < 2) {
      box.appendChild(el("p", { style: "color:var(--muted);font-size:14px;margin:0" },
        attempts.length === 1
          ? `First attempt: Verbal ${attempts[0].verbal.scaled}, Quant ${attempts[0].quant.scaled}. ` +
            "Take another mock to see a trend."
          : "Take at least two mocks to see a trend."));
      return box;
    }

    const W = 640, H = 220, L = 46, Rm = 76, T = 16, B = 30;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Verbal and Quant scaled scores by attempt, 130 to 170");

    const lo = 130, hi = 170;
    const pw = W - L - Rm, ph = H - T - B;
    const n = attempts.length;
    const xAt = i => L + (n === 1 ? pw / 2 : pw * i / (n - 1));
    const yAt = v => T + ph - ph * (v - lo) / (hi - lo);

    for (let v = lo; v <= hi; v += 10) {
      svg.appendChild(sv("line", {
        x1: L, y1: yAt(v), x2: W - Rm, y2: yAt(v),
        stroke: v === lo ? "#8a94a2" : "#e3e7ec", "stroke-width": 1
      }));
      svg.appendChild(sv("text", {
        x: L - 8, y: yAt(v) + 4, "text-anchor": "end", "font-size": 11,
        "font-family": "IBM Plex Mono, monospace", fill: "#5c6674"
      }, String(v)));
    }
    attempts.forEach((a, i) => {
      svg.appendChild(sv("text", {
        x: xAt(i), y: H - 8, "text-anchor": "middle", "font-size": 11,
        "font-family": "IBM Plex Mono, monospace", fill: "#5c6674"
      }, String(i + 1)));
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
      // direct label at the line end, so no legend lookup is needed
      svg.appendChild(sv("text", {
        x: xAt(s.vals.length - 1) + 10, y: yAt(s.vals[s.vals.length - 1]) + 4,
        "font-size": 12, "font-family": "IBM Plex Mono, monospace",
        fill: s.color, "font-weight": "700"
      }, `${s.name[0]} ${s.vals[s.vals.length - 1]}`));
    });

    box.appendChild(svg);
    box.appendChild(el("p", { style: "font-size:12px;color:var(--muted);margin:4px 0 0" },
      "Attempt to scaled score (130–170)."));
    return box;
  };

  /* ---------- full report ---------- */

  R.show = function (idx) { GRE.show(root => paintReport(root, idx, true)); };
  R.showSaved = function (idx) { GRE.show(root => paintReport(root, idx, false)); };

  function paintReport(root, idx, justFinished) {
    const el = GRE.el;
    const a = GRE.store.data.attempts[idx];

    root.appendChild(GRE.crumb(
      [["Dashboard", () => GRE.show(GRE.screens.home)], "Score Report"],
      `attempt ${idx + 1} · ${new Date(a.date).toLocaleString()}`));
    const { stage, inner } = GRE.stage();
    root.appendChild(stage);

    inner.appendChild(el("h1", { class: "screen-title" },
      justFinished ? "Test complete, your scores" : `Score report, attempt ${idx + 1}`));
    inner.appendChild(el("p", { class: "screen-sub" },
      "Scores are estimates from an approximate raw-to-scale concordance."));

    /* ---- score cards ---- */
    const cards = el("div", { class: "score-cards" });
    const card = (cls, lbl, val, pct) => cards.appendChild(el("div", { class: "score-card " + cls },
      el("div", { class: "lbl" }, lbl),
      el("div", { class: "val" }, String(val)),
      el("div", { class: "pct" }, pct)));
    card("v", "Verbal Reasoning", a.verbal.scaled,
      `${ordinal(a.verbal.pct)} percentile · raw ${a.verbal.raw}/27`);
    card("q", "Quantitative", a.quant.scaled,
      `${ordinal(a.quant.pct)} percentile · raw ${a.quant.raw}/27`);
    card("", "Total (V+Q)", a.verbal.scaled + a.quant.scaled, "260–340 scale");
    inner.appendChild(cards);

    /* ---- adaptive routing ---- */
    const pathName = p => ({ easy: "easier", medium: "medium", hard: "harder" }[p] || p);
    const pathCls = p => ({ easy: "easier", medium: "medium", hard: "harder" }[p] || "medium");
    const pathCard = el("div", { class: "card" });
    pathCard.appendChild(el("h3", null, "Adaptive routing"));
    const routing = el("div", { class: "routing" });
    const routeRow = (cls, name, m) => {
      const r = el("div", { class: "r" });
      r.appendChild(el("i", { class: cls }));
      r.appendChild(el("span", { html:
        `${name}: <b>${m.s1}/12</b> in S1 → <span class="${pathCls(m.path)}">${pathName(m.path)}</span> ` +
        `S2, then <b>${m.s2}/15</b>` }));
      routing.appendChild(r);
    };
    routeRow("v", "Verbal", a.verbal);
    routeRow("q", "Quant", a.quant);
    pathCard.appendChild(routing);
    pathCard.appendChild(el("p", { style: "font-size:12.5px;color:var(--muted);margin:12px 0 0" },
      "Reaching the harder second section raises your score ceiling; the easier one caps it, " +
      "same as the real test."));
    inner.appendChild(pathCard);

    /* ---- accuracy by area ---- */
    const topicCard = el("div", { class: "card" });
    topicCard.appendChild(el("h3", null, "Accuracy by area"));
    topicCard.appendChild(topicBars(a));
    inner.appendChild(topicCard);

    /* ---- pacing ---- */
    const timeCard = el("div", { class: "card" });
    timeCard.appendChild(el("h3", null, "Pacing"));
    a.sections.forEach(s => {
      const total = s.detail.reduce((x, d) => x + d.time, 0);
      const avg = total / s.detail.length;
      const slow = s.detail.filter(d => d.time > 150).length;
      timeCard.appendChild(el("p", { style: "margin:4px 0" },
        `${s.kind === "verbal" ? "Verbal" : "Quant"} S${s.no}: ` +
        `${GRE.fmtTime(total)} used · ${Math.round(avg)}s per question` +
        (slow ? ` · ${slow} question${slow > 1 ? "s" : ""} over 2:30 (marked "slow" below)` : "")));
    });
    inner.appendChild(timeCard);

    /* ---- AWA self-score ---- */
    inner.appendChild(awaCard(a));

    /* ---- question-by-question review ---- */
    inner.appendChild(el("h2", { class: "screen-title", style: "margin-top:30px;font-size:20px" },
      "Question-by-question review"));
    a.sections.forEach(s => {
      const hd = el("div", { class: "sechead" },
        el("i", { class: s.kind === "verbal" ? "v" : "q" }),
        `${s.kind === "verbal" ? "Verbal" : "Quantitative"}, Section ${s.no}`);
      inner.appendChild(hd);
      s.detail.forEach((d, j) => inner.appendChild(reviewItem(d, j)));
    });

    const row = el("div", { class: "btnrow" });
    row.appendChild(el("button", {
      class: "btn", style: "flex:1", onclick: () => GRE.show(GRE.screens.home)
    }, "Dashboard"));
    row.appendChild(el("button", {
      class: "btn secondary", onclick: () => GRE.show(GRE.screens.missed)
    }, "Drill missed questions"));
    inner.appendChild(row);
  }

  function awaCard(a) {
    const el = GRE.el;
    const awa = el("div", { class: "card" });
    awa.appendChild(el("h3", null, "Analytical Writing · self-score"));
    const prompt = window.GREBANK.essays.find(e => e.id === a.essay.promptId);
    awa.appendChild(el("p", {
      class: "serif",
      style: "font-style:italic;color:var(--muted);font-size:13.5px;margin:0 0 10px"
    }, (prompt ? `"${prompt.prompt}"` : "") + ` · your response: ${a.essay.words} words`));

    if (a.essay.text) {
      const det = el("details");
      det.appendChild(el("summary", null, "Show my essay"));
      det.appendChild(el("div", { class: "essay-readback" }, a.essay.text));
      awa.appendChild(det);
    } else {
      awa.appendChild(el("p", { style: "color:var(--bad);font-size:13.5px" },
        "No essay text was entered."));
    }

    const rub = el("details", { style: "margin-top:10px" });
    rub.appendChild(el("summary", null, "Scoring rubric (0–6) and a sample high-scoring response"));
    const rubBody = el("div", { style: "margin-top:8px;font-size:14px;line-height:1.6" });
    rubBody.innerHTML = window.GREBANK.awaRubric +
      "<h4 style='margin:14px 0 6px'>Sample high-scoring response (score 6)</h4>" +
      "<p style='font-size:13px;color:var(--muted)'>Prompt: " + GRE.esc(window.GREBANK.awaSample.prompt) + "</p>" +
      "<div class='essay-readback'>" + GRE.esc(window.GREBANK.awaSample.text) + "</div>";
    rub.appendChild(rubBody);
    awa.appendChild(rub);

    const row = el("div", { class: "awa-row" });
    row.appendChild(el("span", { style: "font-size:13.5px" },
      "Compared against the 0–6 rubric, my essay is about a:"));
    const sw = el("div", { class: "selwrap" });
    const sel = el("select", {
      "aria-label": "Self-scored essay grade",
      onchange: e => {
        a.essay.selfScore = e.target.value === "" ? undefined : parseFloat(e.target.value);
        GRE.store.save();
      }
    });
    sel.appendChild(el("option", { value: "" }, "pick"));
    for (let s = 6; s >= 0; s -= 0.5) {
      const o = el("option", { value: String(s) }, s.toFixed(1));
      if (a.essay.selfScore === s) o.selected = true;
      sel.appendChild(o);
    }
    sw.appendChild(sel);
    sw.appendChild(el("span", { class: "chev" }, GRE.icon("chevD", 15)));
    row.appendChild(sw);
    awa.appendChild(row);
    return awa;
  }

  function topicBars(a) {
    const el = GRE.el;
    const agg = {};
    a.sections.forEach(s => s.detail.forEach(d => {
      const entry = GRE.byId[d.qid];
      if (!entry) return;
      const q = entry.q;
      let key, measure;
      if (s.kind === "quant") {
        measure = "q";
        key = GRE.TOPICS[q.topic] || (entry.di ? "Data Interpretation" : "Quant: other");
      } else {
        measure = "v";
        key = entry.passage ? "Reading Comprehension"
          : q.type === "tc" ? "Text Completion"
          : q.type === "se" ? "Sentence Equivalence" : "Critical Reasoning";
      }
      agg[key] = agg[key] || { n: 0, ok: 0, measure };
      agg[key].n++;
      if (d.ok) agg[key].ok++;
    }));

    const wrap = el("div", { class: "topic-bars" });
    Object.keys(agg).forEach(k => {
      const { n, ok, measure } = agg[k];
      const pct = Math.round(100 * ok / n);
      const lag = pct < LAG;
      const row = el("div", { class: "tbar-row " + measure + (lag ? " lag" : "") });
      row.appendChild(el("span", { class: "nm" }, k));
      const track = el("div", { class: "tbar-track" });
      track.appendChild(el("div", { class: "tbar-fill", style: `width:${pct}%` }));
      row.appendChild(track);
      row.appendChild(el("span", { class: "dv" }, `${ok}/${n}`));
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

    const vd = el("span", { class: "vd " + (d.ok ? "ok" : "no") });
    vd.appendChild(GRE.icon(d.ok ? "check" : "x", 13, d.ok ? 3 : 2.6));
    vd.appendChild(document.createTextNode(d.ok ? "Correct" : "Incorrect"));

    const head = el("div", { class: "rhead" },
      el("span", { class: "qn" }, `Question ${j + 1}`),
      el("span", { class: "pill" }, GRE.describeType(q, entry)),
      q.topic ? el("span", { class: "pill" }, GRE.TOPICS[q.topic] || q.topic) : null,
      el("span", { class: "pill" }, q.diff || "medium"),
      vd,
      el("span", { class: "tm" + (d.time > 150 ? " slow" : "") },
        GRE.fmtTime(d.time) + (d.time > 150 ? " — slow" : "")));
    box.appendChild(head);

    GRE.renderQBody(box, entry, () => d.ans, () => {}, { review: true, disabled: true });

    const ex = el("div", { class: "expl" });
    ex.innerHTML = "<strong>Explanation.</strong> " + q.expl +
      (q.tip ? `<div class="tip"><strong>Strategy:</strong> ${q.tip}</div>` : "");
    box.appendChild(ex);
    return box;
  }
})();
