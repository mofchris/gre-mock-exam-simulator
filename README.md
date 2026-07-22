# GRE Mock Exam Simulator

A free, fully offline simulator of the **shorter (post-September-2023) GRE® General Test**,
modeled on the ETS PowerPrep interface. Anonymous by default — no account required, no
build step: pure HTML/CSS/JS. Used anonymously, your data never leaves your browser.

Optionally, you can sign in with a username and a 6-digit PIN to sync your progress across
devices (the GRE and Network+ apps share one account); when signed in, your progress is also
stored on the sync server. At signup you're shown a recovery code **once** — it is the only
way to reset a forgotten PIN (there is no email recovery), so save it somewhere safe.

**Take it here:** open `index.html`, or use the hosted version on GitHub Pages.

**Install it:** on iOS, open the hosted version in Safari and tap **Share → Add
to Home Screen**. It then launches like a native app and works fully offline.
Sign in before installing so your progress comes with you.

## What it does

- **Full-length mock exam** (~1h 58m), exactly like test day:
  - Analytical Writing "Analyze an Issue": 30 min, plain editor (Cut/Copy/Paste/Undo/Redo only, no spell-check)
  - Verbal Section 1: 12 questions / 18 min
  - Quant Section 1: 12 questions / 21 min
  - Verbal Section 2: 15 questions / 23 min
  - Quant Section 2: 15 questions / 26 min
- **Section-adaptive**, like the real algorithm: your Section 1 performance routes Section 2
  to an easier/medium/harder pool, and the 130–170 scaled score accounts for the path.
- **PowerPrep-style interface**: Exit Section / Review / Mark / Help / Back / Next toolbar,
  hideable timer that returns flashing at 5:00, question-status review screen, and the
  on-screen GRE calculator (order of operations, parentheses, memory keys, √, 8-digit
  display, Transfer Display into Numeric Entry).
- **All real question formats**: 1/2/3-blank Text Completion, Sentence Equivalence (exactly
  two answers), Reading Comprehension (split-screen passages, select-all-that-apply),
  Critical Reasoning, Quantitative Comparison, multiple-answer MC, Numeric Entry (including
  fractions), and Data Interpretation sets with charts.
- **Score report**: scaled scores + percentile estimates, adaptive-path breakdown, accuracy
  by topic, pacing analysis, and question-by-question review with full explanations.
- **Tutor mode**: untimed practice by type/topic/difficulty with instant feedback,
  strategy guides for every question format, and a missed-questions deck for re-drilling.
- **Progress tracking**: attempt history and score trend, stored in your browser
  (localStorage), and synced to the sync server as well when you're signed in.
- **Dark mode**: follows your device setting automatically, with a header toggle
  (☀/☾/◐) to override it.

## Documentation

Full docs live in [`docs/`](docs/README.md):

| Doc | For |
|---|---|
| [Take your first mock exam](docs/tutorial-first-mock-exam.md) | New users. Start to score report, step by step |
| [Interpret your score report](docs/howto-interpret-scores.md) | Understanding scaled scores, percentiles, and the adaptive path |
| [Run locally & deploy your own copy](docs/howto-run-and-deploy.md) | Self-hosting on GitHub Pages in ~2 minutes |
| [Add questions to the bank](docs/howto-add-questions.md) | Contributors: grow the question pool |
| [Question bank data format](docs/reference-question-bank.md) | Exact schemas for every question type |
| [Architecture & modules](docs/reference-architecture.md) | How the engine, assembly, and storage work |
| [Adaptive routing, scoring & design decisions](docs/explanation-adaptive-scoring.md) | Why it works the way it does |


## The study course

The app includes an **18-module course** that takes you from the basics to the hardest material:

| Unit | Covers |
|---|---|
| 1. Orientation & Verbal Foundations | How the adaptive test really works, GRE vocabulary logic, Text Completion, Sentence Equivalence |
| 2. Reading & Argument | Reading for structure, hard RC and trap answers, Critical Reasoning |
| 3. Quant Foundations | Arithmetic and percents, number properties, algebra, word problems |
| 4. Advanced Quant | Geometry, statistics/counting/probability, Data Interpretation, **Quantitative Comparison strategy** |
| 5. Writing & Readiness | The Issue essay, pacing and guessing, final review |

Each module ends with a quiz you must pass at **75%** to unlock the next one, and each unit ends
with a **cumulative checkpoint** that also re-tests earlier units. The full mock exam unlocks when
the course is complete. Every quiz question has a full explanation; retakes are unlimited and your
best score is kept.

## Running locally

- Easiest: double-click `index.html`. Everything works from the file system.
- Or serve it: `start.bat` (Windows, uses Python) or `python -m http.server 8420`,
  then open http://localhost:8420.

## Extending the question bank

Questions live in `data/*.js` as plain JS objects pushed into a global bank
(`GREBANK`). Every question carries its answer, a full explanation, and a strategy tip.
To add questions, follow the shapes in any existing data file and include your new file
with a `<script>` tag in `index.html`. IDs must be unique across the whole bank.

## Disclaimer

GRE® is a registered trademark of ETS. This project is an independent study tool and is
not affiliated with, endorsed by, or connected to ETS. Scores produced here are estimates
from an approximate concordance and carry no official meaning.
