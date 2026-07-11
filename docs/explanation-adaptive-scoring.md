# Explanation: Adaptive Routing, Scoring, and Design Decisions

Why the simulator works the way it does: the reasoning a curious user or contributor
needs before trusting the scores or changing the code.

## The problem

A GRE practice tool that ignores section-adaptivity produces misleading scores. On the
real (post-2023) GRE, your performance on the first Verbal/Quant section decides whether
the second section is easier or harder, and the final 130–170 score depends on **both**
your raw count and the path you took. A flat mock that scores 20/27 as "about 160"
regardless of path can be off by 8+ points: enough to misinform application decisions.

## The approach: route, then convert by path

After each measure's Section 1, the raw score routes Section 2
(`GRE.routeFor` in `js/scoring.js`):

```
Section 1 raw:  0–6 → easier pool   7–9 → medium pool   10–12 → harder pool
```

The total raw score (0–27) then converts through a path-specific table
(`GRE.rawToScaled`):

```
hard path:    scaled = 145 + round(raw × 25/27)   → range ~145–170
medium path:  scaled = 137 + round(raw × 26/27)   → range ~137–163
easy path:    scaled = 130 + round(raw × 22/27)   → range  130–152
```

This mirrors the real algorithm's essential behavior: the harder second section unlocks
the top of the scale; the easier one caps it. A test-taker who bombs Section 1 cannot
score 165 by acing an easy Section 2: here or on the real thing.

The paths overlap on purpose. A raw 20 scores ≈ 164 on the hard path and ≈ 156 on the
medium path; identical raw totals earning different scores *is the point* of adaptive
testing.

## Trade-offs

- **These are approximations.** ETS's true conversion uses item response theory over
  calibrated items; ours is a linear fit to published concordance behavior. Scores here
  are estimates good for trend-tracking and typically within a few points, not official
  predictions. The report says so on its face.
- **Three discrete pools, not per-item adaptivity.** The shorter GRE is
  section-adaptive, not question-adaptive, so three difficulty pools reproduce the real
  structure faithfully; the compromise is that "hard-path" difficulty is only as honest
  as the bank's difficulty tagging.
- **Percentiles are a static table** (approximate 2023–2025 pools, `PCT_V`/`PCT_Q` in
  scoring.js). Real percentiles drift a point or two per year.

## Why questions repeat eventually (and why exams don't)

Each mock draws 54 questions from per-type slots. Even with modest pools the number of
distinct exams is astronomical (pools of 60 per slot drawing 12–15 exceed 10⁴⁰
combinations), so no one ever sees the same *exam* twice. Individual *questions* recur
sooner. That's governed by bank size, which is why the bank is designed to grow
(see [How to add questions](howto-add-questions.md)). A recency list (last ~170 used
question ids) deprioritizes recently seen questions so consecutive mocks stay fresh.

## Design decisions

**No build step, no framework, no server.** The entire app is static files with script
tags. This is what lets it run from a double-clicked `index.html`, deploy to GitHub Pages
with zero configuration, and survive years of dependency rot untouched. The cost: no
modules/imports, so shared code lives on a `window.GRE` namespace with load-order
discipline (helpers defined in `app.js`, loaded last, only ever *called* at runtime).

**Question data as JS files, not JSON.** `<script src>` works over `file://`;
`fetch("bank.json")` does not (CORS blocks it). Data-as-code also allows comments and
trailing HTML in strings. The cost: a syntax error drops the whole file silently, which
is why the docs insist on `node --check`.

**All state in localStorage, nothing on a server.** Scores, essays, and mistakes are
private study data; keeping them client-side means zero privacy surface, zero hosting
cost, and offline operation. The cost: history is per-browser-per-origin and vanishes if
site data is cleared: a fair trade for a study tool.

**Realism over convenience, deliberately.** The essay editor blocks the system clipboard
and offers no spell-check; Exit Section is irreversible; the timer hides but forces
itself back at 5:00; unanswered questions score as wrong. Where a convenience would
train a habit the real test punishes, the simulator sides with the real test.

**DI charts as generated grayscale SVG.** Real GRE data displays are austere black-and-
white graphics. Chart specs live in the question data (`display: { bar: … }`) and render
through one generator (`GRE.renderDisplay`), so authors describe data instead of drawing
pictures, and every chart automatically matches ETS style.

## Alternatives considered

- **A scoring model fit per-question (IRT-lite)**: rejected: needs response data from
  many users to calibrate, which conflicts with the no-server privacy design.
- **Bundling questions into JSON with a build step**: rejected: kills the
  double-click-to-run property for a marginal authoring gain.
- **True per-question adaptivity**: rejected: the shorter GRE doesn't do it either;
  matching the real structure is the goal.

## Related

- The conversion tables in code: `js/scoring.js`
- What the report shows: [How to interpret your scores](howto-interpret-scores.md)
- Assembly mechanics: [Architecture reference](reference-architecture.md#exam-assembly)
