# Reference: Question Bank Data Format

The complete schema for every object in the question bank. Data files are plain JS,
loaded via `<script>` tags, that push objects into the global `window.GREBANK`:

```js
GREBANK = {
  verbal:    [],  // discrete verbal questions (tc, se, cr)
  vpassages: [],  // reading passages, each with 2–4 attached questions
  quant:     [],  // discrete quant questions (qc, mcq, mcma, num)
  disets:    [],  // data interpretation sets (charts/tables + 3 questions)
  essays:    [],  // Issue-task prompts
  awaRubric: "",  // HTML string: the 0–6 rubric shown in reports
  awaSample: {}   // { prompt, text }: sample high-scoring essay
}
```

Every data file must be wrapped in an IIFE that defensively initializes these arrays
(see any shipped `data/*.js` for the pattern), because load order between data files is
not guaranteed to matter but `GREBANK` must exist before pushing.

## Fields common to all questions

| Field | Type | Required | Meaning |
|---|---|---|---|
| `id` | string | yes | Globally unique across the entire bank. Duplicates silently shadow each other in the lookup index. |
| `type` | string | yes | One of `tc` `se` `cr` (verbal), `qc` `mcq` `mcma` `num` (quant), or `mcq`/`mcma` inside passages/DI sets. |
| `diff` | string | yes | `"easy"`, `"medium"`, or `"hard"`. Controls which adaptive pool draws the question. |
| `topic` | string | quant only | `"arithmetic"`, `"algebra"`, `"geometry"`, or `"data"`. Drives topic spread in assembly and the report's accuracy breakdown. |
| `expl` | string (HTML ok) | yes | Full explanation shown in tutor feedback and post-exam review. |
| `tip` | string | recommended | One-line strategy note appended to the explanation. |
| `figure` | string (HTML/SVG) | no | Rendered centered above the question (quant types). |

Text fields accept inline HTML (`<b>`, `<sup>`, `&radic;`, tables, SVG). Escape
user-visible `<` and `>` appropriately.

## Verbal: Text Completion (`type: "tc"`)

| Field | 1-blank | 2-blank | 3-blank |
|---|---|---|---|
| `blanks` | `1` (or omit) | `2` | `3` |
| `text` | contains `{1}` | contains `{1}` `{2}` | contains `{1}` `{2}` `{3}` |
| `choices` | flat array of 5 strings | `[[3 strings], [3 strings]]` | `[[3],[3],[3]]` |
| `answer` | index (0–4) | `[i, j]` per blank | `[i, j, k]` per blank |

The `{n}` tokens are replaced by styled blanks; the selected choice text renders into the
sentence live. Grading gives credit only when **all** blanks are correct.

```js
{ id: "x_tc1", type: "tc", diff: "medium", blanks: 2,
  text: "Though the plan was {1}, its execution proved {2}.",
  choices: [["bold", "timid", "vague"], ["flawless", "chaotic", "quiet"]],
  answer: [0, 1], expl: "…", tip: "…" }
```

## Verbal: Sentence Equivalence (`type: "se"`)

- `text`: sentence with the blank written as `____`.
- `choices`, exactly 6 strings.
- `answer`: array of exactly 2 indices, any order.

The UI enforces picking exactly two (a third click is ignored). Grading is
order-independent set equality.

## Verbal: Critical Reasoning (`type: "cr"`)

- `passage`: the argument (plain text or HTML, no `<p>` needed; one is added).
- `text`: the question stem.
- `choices`: 5 strings. `answer`: single index.

## Verbal: Reading passages (`GREBANK.vpassages`)

```js
{ id: "x_p1", diff: "hard", title: "Optional short title",
  text: "<p>…</p><p>…</p>",           // rendered in the left pane
  questions: [                          // 2, 3, or 4 questions
    { id: "x_p1q1", type: "mcq",  diff: "hard", text: "…", choices: [/*5*/], answer: 0, expl: "…", tip: "…" },
    { id: "x_p1q2", type: "mcma", diff: "hard", text: "… select all that apply.",
      choices: [/*3*/], answer: [0, 2], expl: "…", tip: "…" }
  ] }
```

Passage questions render split-screen (passage left, question right) and stay contiguous
in the section. Exam blueprints need passages of **exactly 2, 3, and 4 questions** per
difficulty; longer lists get sliced from the front.

## Quant: Quantitative Comparison (`type: "qc"`)

- `qa`, `qb`: Quantity A / Quantity B (HTML ok).
- `info`: optional centered given-information line.
- `answer`: index into the four fixed choices: `0` A greater, `1` B greater,
  `2` equal, `3` cannot be determined. Choices are supplied by the renderer; don't
  include a `choices` field.

## Quant: Multiple Choice (`type: "mcq"`) and Multiple-Answer (`type: "mcma"`)

- `text`: the problem. For `mcma`, include the "Indicate **all** such …" line.
- `choices`: 5 strings for `mcq`; 3–6 for `mcma`.
- `answer`: single index for `mcq`; array of indices (complete set) for `mcma`.
  Grading `mcma` requires exact set equality: partial selections score wrong.

## Quant: Numeric Entry (`type: "num"`)

| Field | Plain number | Fraction |
|---|---|---|
| `frac` | omit | `true` |
| `answer` | the number (used for grading, tolerance 1e-6; commas in user input are stripped) | decimal value (informational) |
| `ansFrac` |: | `[numerator, denominator]`; grading accepts **any equivalent fraction** via cross-multiplication |
| `unitAfter` | optional string rendered after the box (e.g. `"miles"`) |: |

## Quant: Data Interpretation sets (`GREBANK.disets`)

```js
{ id: "x_di1", diff: "medium",
  intro: "<p><b>Title of the data display</b></p>",
  display: {
    note:   "optional caption under the intro",
    tables: [{ caption: "…", cols: ["A","B"], rows: [["1","2"], …] }],
    bar:  { title: "…", unit: "units", cats: ["Q1","Q2"], series: [{ name: "S1", values: [1,2] }], ymax: 100 },
    line: { /* same shape as bar */ },
    pie:  { title: "…", unit: "$", slices: [{ label: "Rent", value: 800 }], totalNote: "Total: $2,000" }
  },
  questions: [ /* exactly 3, same shape as passage questions; type mcq | mcma | num; topic: "data" */ ] }
```

Any combination of `tables` / `bar` / `line` / `pie` may be present; charts render as
grayscale SVG in ETS style. `ymax` is optional (a "nice" max is computed otherwise).

## Essays (`GREBANK.essays`)

```js
{ id: "AW41", prompt: "The statement to analyze.", task: "The official-style task instruction paragraph." }
```

Prompt selection avoids the prompts used in the last 5 attempts.

## Grading summary

| Type | Answered means | Correct means |
|---|---|---|
| `tc` multi-blank | every blank selected | every blank matches |
| `se` | exactly 2 selected | set equals `answer` |
| `mcma` | ≥1 selected | set equals `answer` |
| `num` | box non-empty (both boxes if fraction) | numeric match ±1e-6, or cross-multiplied fraction equality |
| others | a choice selected | index equals `answer` |

## Related

- Workflow for adding questions: [How to add questions](howto-add-questions.md)
- How the bank is drawn into exams: [Architecture reference](reference-architecture.md#exam-assembly)
