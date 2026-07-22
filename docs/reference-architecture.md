# Reference: Architecture and Modules

The simulator is a zero-dependency static web app: no framework and no build step.
It makes no network calls while you study — question banks, fonts and course content
are all local — but it is not network-free: signing in syncs progress to an account
server, and a service worker precaches the app so it runs with no connection at all. `index.html` loads the data files (which populate a global
question bank), then the app modules (which populate a global `GRE` namespace), then boots
to the home screen.

## File layout

```
index.html            page shell + script load order (data first, then js/, app.js last)
start.bat             Windows launcher (python http.server on :8420, file:// fallback)
css/style.css         all styling, PowerPrep-inspired
js/
  scoring.js          adaptive routing thresholds, raw→scaled tables, percentiles
  calculator.js       on-screen GRE calculator (GRE.calc)
  exam.js             exam engine: assembly, rendering, timers, grading (largest module)
  results.js          score report, analytics charts, question review (GRE.results)
  tutor.js            tutor mode, strategy guides, missed-deck drilling (GRE.tutor)
  app.js              GRE namespace bootstrap, storage, router, home/history screens
data/
  verbal-{easy,medium,hard}.js   discrete verbal + reading passages
  quant-{easy,medium,hard}.js    discrete quant + DI sets
  essays.js                      Issue prompts + AWA rubric + sample essay
docs/                 this documentation
```

**Load-order rule:** `app.js` loads last but defines shared helpers (`GRE.el`,
`GRE.store`, `GRE.screens`). Every module therefore starts with
`const GRE = window.GRE = window.GRE || {}` and must guard any shared sub-object it
touches at load time (e.g. `GRE.screens = GRE.screens || {}`): module code only *calls*
helpers at runtime, after everything is loaded.

## The `GRE` namespace (public surface)

| Member | Defined in | Purpose |
|---|---|---|
| `GRE.el(tag, attrs, ...kids)` | app.js | DOM builder; `attrs.html` sets innerHTML, `on*` adds listeners |
| `GRE.esc(s)` | app.js | HTML-escape |
| `GRE.modal(title, html, buttons)` | app.js | app-styled modal (never native `alert`) |
| `GRE.shuffle(arr)` / `GRE.fmtTime(sec)` | app.js | utilities |
| `GRE.store` | app.js | localStorage wrapper: `.data`, `.load()`, `.save()` |
| `GRE.buildIndex()` / `GRE.byId` | app.js | flat `id → {q, passage?, di?}` index over the whole bank |
| `GRE.show(screenFn)` | app.js | router: clears `#app`, renders a screen |
| `GRE.screens.{home,history,missed,tutor}` | app.js / tutor.js | top-level screens |
| `GRE.routeFor(s1raw)` | scoring.js | Section-1 raw → `"easy" \| "medium" \| "hard"` |
| `GRE.rawToScaled(raw, path)` | scoring.js | total raw (0–27) + path → 130–170 |
| `GRE.percentile(measure, scaled)` | scoring.js | percentile estimate lookup |
| `GRE.calc` | calculator.js | `.show() .hide() .toggle() .reset()`, `.transferTarget` (input element that Transfer Display writes to) |
| `GRE.exam` | exam.js | `.startIntro()` (new mock), `.resume()` (from autosave) |
| `GRE.renderQBody(container, item, getAns, setAns, opts)` | exam.js | renders any question type; `opts.review` paints correct/incorrect; used by exam, tutor, and results |
| `GRE.gradeQ(q, ans)` / `GRE.isAnswered(q, ans)` | exam.js | grading and answered-state rules |
| `GRE.describeType(q, entry)` / `GRE.directionsFor(q)` | exam.js | display labels and official-style directions |
| `GRE.renderDisplay(display)` | exam.js | DI tables + grayscale SVG bar/line/pie charts |
| `GRE.results` | results.js | `.show(i)` / `.showSaved(i)` report, `.trendChart(attempts)` |
| `GRE.tutor.startDeck(ids)` | tutor.js | drill a list of question ids (missed deck) |

## Exam structure and timing

| # | Section | Questions | Minutes | Pool |
|---|---|---|---|---|
| 1 | Analytical Writing (Issue) | 1 essay | 30 | essay bank (avoids last 5 attempts' prompts) |
| 2 | Verbal 1 | 12 | 18 | medium |
| 3 | Quant 1 | 12 | 21 | medium |
| 4 | Verbal 2 | 15 | 23 | easy/medium/hard by Verbal-1 raw |
| 5 | Quant 2 | 15 | 26 | easy/medium/hard by Quant-1 raw |

Routing thresholds (`GRE.routeFor`): raw 0–6 → easy, 7–9 → medium, 10–12 → hard.

## Exam assembly

Sections are assembled at random from per-type blueprint slots
(`buildVerbal` / `buildQuant` in exam.js):

| Slot | Verbal S1 (12) | Verbal S2 (15) | Slot | Quant S1 (12) | Quant S2 (15) |
|---|---|---|---|---|---|
| Text Completion | 3 | 4 | Quantitative Comparison | 4 | 5 |
| RC passage (large) | 3-q | 4-q | Multiple Choice | 3 | 4 |
| Critical Reasoning | 1 | 1 | Multiple-Answer | 1 | 2 |
| Sentence Equivalence | 3 | 4 | DI set | 3 | 3 |
| RC passage (small) | 2-q | 2-q | Numeric Entry | 1 | 1 |

Draws prefer questions **not** in the recency list (ids from roughly the last 3 exams,
capped at 170) and not already used in the current exam; quant MCQ/QC draws spread across
topics. If a pool runs short (e.g. no 4-question passage at the routed difficulty), the
assembler falls back to adjacent difficulty, then tops up with extra SE/TC (verbal) or
MCQ (quant) to hit the exact section size.

Section 2 of each measure is built lazily, at section start, from the routed pool.

## Exam runtime behavior

- **Timers** are deadline-based (`endsAt = now + remaining`); the display ticks every
  500 ms. `Hide Time` hides the readout; at ≤ 5:00 it force-shows and flashes; at 0 the
  section auto-finalizes.
- **Autosave**: the whole exam state (question ids, answers, marks, per-question time,
  remaining seconds) is serialized to localStorage on every answer/navigation and ~every
  10 s. Closing the tab mid-exam pauses the clock; the home screen offers Resume/Discard.
- **Per-question time** is accumulated across visits (re-entering a question adds to its
  total).
- **Finalization** grades the section (`sec.raw`), and after section 5 computes scaled
  scores, writes the attempt record, appends wrong answers to the missed deck, updates
  the recency list, clears the in-progress snapshot, and shows the report.

## localStorage schema

Single key: **`gre-sim-v1`**.

```js
{
  attempts: [ {                     // one per completed mock
    date, essay: { promptId, text, words, selfScore? },
    verbal: { raw, s1, s2, path, scaled, pct },
    quant:  { raw, s1, s2, path, scaled, pct },
    sections: [ { kind, no, detail: [ { qid, ans, ok, time } ] } ]
  } ],
  missed:     [ "qid", … ],         // wrong answers; removed when re-answered correctly in deck drills
  recent:     [ "qid", … ],         // recency list for assembly (last ~170 used ids)
  inprogress: { … } | null,         // autosaved exam state
  tutorSeen:  { }                   // reserved
}
```

Used anonymously, data never leaves the browser. Signing in is opt-in and is the only
thing that writes off-device: progress syncs to the account server. The service worker
never touches that traffic — cross-origin requests pass straight through, uncached.

## Related

- Why it's built this way: [Explanation: design decisions](explanation-adaptive-scoring.md)
- Bank object shapes: [Question bank reference](reference-question-bank.md)
