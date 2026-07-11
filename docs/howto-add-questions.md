# How to Add Questions to the Bank

Add your own questions (from a single item to hundreds) and have them drawn into mock
exams and tutor sessions. End result: your questions live in the rotation.

Field-by-field schemas for every type are in the
[question bank reference](reference-question-bank.md); this guide is the workflow.

## Prerequisites

- A text editor and Node.js (only for the syntax check: optional but recommended).
- A local copy of the repo ([run it locally](howto-run-and-deploy.md) first).

## Steps

1. **Create a new data file**. Don't edit the shipped ones; separate files make your
   additions easy to track. For example `data/my-questions.js`:

   ```js
   /* My additional questions. */
   (function () {
     const B = window.GREBANK = window.GREBANK || {};
     B.verbal = B.verbal || [];
     B.vpassages = B.vpassages || [];
     B.quant = B.quant || [];
     B.disets = B.disets || [];
     B.essays = B.essays || [];

     B.quant.push(
       { id: "my_q1", type: "mcq", topic: "algebra", diff: "medium",
         text: "If 4x − 9 = 19, what is the value of x?",
         choices: ["5", "6", "7", "8", "9"],
         answer: 2,
         expl: "4x = 28, so x = 7.",
         tip: "Isolate x in one step, then substitute back to confirm." }
     );
   })();
   ```

2. **Make every `id` globally unique.** Prefix with something personal (`my_`, your
   initials). A duplicate id silently overwrites the other question in the lookup index: 
   there is no error.

3. **Give every question the required fields**: `id`, `type`, `diff`
   (`"easy"` / `"medium"` / `"hard"`), `expl` (the explanation shown in reviews), `tip`
   (one-line strategy note), and for quant a `topic`
   (`"arithmetic"` / `"algebra"` / `"geometry"` / `"data"`). Difficulty matters: Section 1
   draws from the **medium** pool, adaptive second sections draw from easy/medium/hard: 
   a mistagged question surfaces in the wrong section.

4. **Register the file** in `index.html`, after the shipped data files and before the
   `js/` scripts:

   ```html
   <script src="data/quant-hard.js"></script>
   <script src="data/my-questions.js"></script>   <!-- add this line -->
   <script src="js/scoring.js"></script>
   ```

5. **Syntax-check it** (a stray comma otherwise silently drops the whole file):

   ```bash
   node --check data/my-questions.js
   ```

## Verification

1. Reload the app (hard-reload, Ctrl+Shift+R, to bypass cache). The home footer's bank
   counts should have grown by the number of questions you added.
2. Open **Tutor Mode**, filter to your question's type and difficulty, and practice until
   it appears (sessions draw randomly). Confirm the correct answer grades as correct and
   the explanation reads properly.
3. If you added HTML to `text`/`expl` (like `<b>` or `&radic;`), check it renders rather
   than showing raw tags.

## Troubleshooting

- **Bank counts didn't change**. The script tag is missing/mistyped, or the file has a
  syntax error (run `node --check`; check the browser console for the failing line).
- **Question never appears in mocks**: mocks draw by type + difficulty slot with
  anti-repeat weighting, so any single question appears probabilistically. Verify it
  exists at all via Tutor Mode filters, which search the whole bank.
- **Correct answer marked wrong**. Check the answer encoding for your type: index vs.
  array of indices vs. number vs. `[numerator, denominator]`. The
  [reference](reference-question-bank.md) lists the exact shape per type; multi-answer
  types require the complete set, order-independent.
- **A passage/DI set shows but its questions look truncated**: exam blueprints slice
  passage question lists to the slot size (2–4 questions). Author passages with exactly
  2, 3, or 4 questions.

## Related

- Exact schemas: [Question bank data format](reference-question-bank.md)
- How exams are assembled from the bank: [Architecture reference](reference-architecture.md#exam-assembly)
