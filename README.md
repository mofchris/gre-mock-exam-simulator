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
to Home Screen**. It then launches like a native app, with no browser chrome, and
works with no connection at all. Two things worth knowing: open it once while
online, since that first launch is when it caches itself; and sign in *before*
installing, because iOS gives an installed app its own storage separate from
Safari's, so signing in is what carries your progress across.

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
  two answers), Reading Comprehension (split-screen passages, select-all-that-apply, and
  **select-in-passage** — click a sentence in the passage), Critical Reasoning,
  Quantitative Comparison, multiple-answer MC, Numeric Entry (including fractions), and
  Data Interpretation sets with charts.
- **Score report**: scaled scores + percentile estimates, adaptive-path breakdown, accuracy
  by topic, pacing analysis, and question-by-question review with full explanations.
- **AI essay scoring (optional)**: score your Issue essay against the official 0–6 rubric
  with strengths, weaknesses, and targeted advice — using your own Claude, OpenAI, or
  Gemini API key. Save one or several; scoring switches providers automatically if one
  fails. Online-only; keys stay on the device and are never synced.
- **Shuffled answer choices**: every time a question is drawn — in a mock, a course quiz,
  or tutor practice — its choices appear in a fresh random order (Quantitative Comparison's
  four fixed choices excepted), so answer positions can never be memorized. Review screens
  re-show the order you actually saw.
- **Anti-repeat drawing**: once a question's answer has been revealed to you (you missed it,
  or reviewed it after a mock), it goes to the back of the line — practice sets and quiz
  retakes draw never-seen questions first.
- **Tutor mode**: untimed practice by type/topic/difficulty with instant feedback,
  strategy guides for every question format, and a missed-questions deck for re-drilling.
  Misses from mocks, tutor practice, **and course quizzes** all land in the deck.
- **Progress tracking**: mock attempt history and score trend, plus a practice history of
  every module quiz, checkpoint, tutor session, and re-drill — stored in your browser
  (localStorage), and synced to the sync server as well when you're signed in.
- **Dark & night modes**: follows your device setting automatically, with a header toggle
  cycling auto → dark → night → light. Night is a true-black (OLED-friendly) variant of
  dark for low-light studying.

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
with a **cumulative checkpoint** that also re-tests earlier units. Quizzes are **sampled from a
larger question pool** (roughly half again as many questions as a quiz shows), drawing questions
you haven't seen before first — so a retake is a genuinely fresh test, not a memory check. The
full mock exam unlocks when the course is complete. Every quiz question has a full explanation;
retakes are unlimited and your best score is kept.

## Running locally

- Easiest: double-click `index.html`. Everything works from the file system.
- Or serve it: `start.bat` (Windows, uses Python) or `python -m http.server 8420`,
  then open http://localhost:8420.

## The question bank

Roughly **300 exam-bank questions** (plus 40 essay prompts) across every real format and
difficulty tier, including full-length reading passages, three-blank Text Completion,
Critical Reasoning variants (weaken, strengthen, assumption, paradox, evaluate, inference,
complete-the-passage), and quant coverage of arithmetic, algebra, geometry, coordinate
geometry, statistics (standard deviation, normal distribution, quartiles), sequences,
overlapping sets, rates, mixtures, counting, probability, and Data Interpretation sets —
and a separate **330+-question course-quiz pool**. The hard tier is calibrated to real
163–170 material.

### Extending it

Questions live in `data/*.js` as plain JS objects pushed into a global bank
(`GREBANK`). Every question carries its answer, a full explanation, and a strategy tip.
To add questions, follow the shapes in any existing data file and include your new file
with a `<script>` tag in `index.html`. IDs must be unique across the whole bank. After any
asset change, regenerate the service worker: `node tools/build-sw.mjs`.

## Disclaimer

GRE® is a registered trademark of ETS. This project is an independent study tool and is
not affiliated with, endorsed by, or connected to ETS. Scores produced here are estimates
from an approximate concordance and carry no official meaning.
