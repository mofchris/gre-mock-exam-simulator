# GRE Mock Exam Simulator: Design Spec

Date: 2026-07-11
Status: Approved by user (exam format, adaptivity, essay handling, tutor mode, large pool)

## Goal

A fully offline, local web app that simulates the current (post-Sept-2023) shorter GRE as
realistically as possible (UI modeled on ETS PowerPrep) plus a Tutor mode for learning,
backed by a question bank large enough that repeated mocks essentially never repeat.

## Exam structure (one full mock)

| # | Section | Questions | Time |
|---|---------|-----------|------|
| 1 | Analytical Writing: "Analyze an Issue" | 1 essay | 30 min |
| 2 | Verbal Reasoning, Section 1 | 12 | 18 min |
| 3 | Quantitative Reasoning, Section 1 | 12 | 21 min |
| 4 | Verbal Reasoning, Section 2 | 15 | 23 min |
| 5 | Quantitative Reasoning, Section 2 | 15 | 26 min |

- Section-adaptive: raw score on Section 1 of each measure routes Section 2 to an
  easier / medium / harder pool (0–6 easy, 7–9 medium, 10–12 hard).
- No scheduled breaks (matches the shorter GRE). Instruction screens between sections;
  the transition screen allows an optional untimed pause.

## Question bank

- Target ~400+ questions at launch, each with: correct answer, full explanation
  (why right / why each wrong), and a strategy tip. Bank files are append-friendly.
- Quant types: Quantitative Comparison, single-answer MC, multiple-answer MC,
  Numeric Entry, Data Interpretation sets. Topics: arithmetic, algebra, geometry, data analysis.
- Verbal types: Text Completion (1/2/3-blank), Sentence Equivalence, Reading
  Comprehension passage sets (short/medium/long), Critical Reasoning.
- Essay: ~40 Issue prompts in the official pool style, with official-style task instructions.
- Difficulty tags: easy / medium / hard (drives adaptive S2 pools; S1 draws a medium mix).
- Exam assembly: per-section blueprints matching real type mix; random draw with a
  recency tracker (localStorage) that de-prioritizes recently seen questions.
- Combinatorics: pools of 60+ per slot drawing 12–15 questions ⇒ >10^40 distinct exams.

## Section blueprints

- Verbal 12Q: 3 TC, 3 SE, 1 CR, RC = one 3-question passage + one 2-question passage.
- Verbal 15Q: 4 TC, 4 SE, 1 CR, RC = one 4-question passage + one 2-question passage.
- Quant 12Q: 4 QC, 5 problem solving (MC/multi/numeric), 3-question DI set.
- Quant 15Q: 5 QC, 7 problem solving, 3-question DI set.

## UI realism (PowerPrep-style)

- Dark-blue header: section name, question m of n, timer (hideable; auto-shows and
  alerts at 5:00 remaining), buttons: Exit Section, Review, Mark, Help, Back, Next.
- Review screen: per-question status (Answered / Not Answered / Not Seen) + Marked flag,
  click to jump.
- On-screen GRE calculator (order of operations, 8-digit display, memory keys, sqrt, %,
  parentheses, Transfer Display into Numeric Entry).
- Essay editor: plain textarea, no spellcheck, internal-only Cut/Copy/Paste/Undo/Redo
  buttons (external clipboard blocked), word count.
- Section instruction screens with official-style directions.

## Scoring & results

- Raw→scaled lookup tables per adaptive path (easy/medium/hard S2), 130–170 per measure.
- Approximate ETS percentile tables for V and Q.
- AWA: official-style 0–6 rubric + a sample high-scoring response for self-grading.
- Results page: scores, percentiles, per-topic breakdown, time-per-question analytics,
  full question review with explanations.
- Attempt history + score trend persisted in localStorage.

## Tutor mode

- Filter by measure / type / topic / difficulty → untimed practice, instant feedback,
  full explanation after each answer.
- Strategy guides per question type.
- Missed-questions deck aggregated from tutor sessions and mocks, re-drillable.

## Tech

- Pure HTML/CSS/JS, zero dependencies, no build step, fully offline.
- Data as plain JS files (script tags: works over file:// too), registering into a
  global bank object.
- `start.bat` starts a tiny local server and opens the browser; double-clicking
  `index.html` also works.
- State in localStorage under a single namespaced key.

## File layout

```
GRE/
  index.html
  start.bat
  css/style.css
  js/app.js         (shell, router, home, storage)
  js/exam.js        (exam engine: timers, adaptive routing, navigation, review)
  js/calculator.js  (GRE on-screen calculator)
  js/scoring.js     (raw→scaled tables, percentiles)
  js/results.js     (results, analytics, question review)
  js/tutor.js       (tutor mode, strategy guides, missed deck)
  data/quant-easy.js / quant-medium.js / quant-hard.js
  data/verbal-easy.js / verbal-medium.js / verbal-hard.js
  data/essays.js    (Issue prompts + rubric + sample response)
```

## Testing

- `node --check` on all JS files.
- Browser smoke test: start server, run through exam start → answer → review →
  section submit → results; tutor mode answer flow; calculator ops.
