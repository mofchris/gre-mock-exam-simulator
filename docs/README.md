# Documentation

Everything about the GRE Mock Exam Simulator, organized by what you're trying to do
([Diataxis](https://diataxis.fr/) structure).

## I want to use the app

- **[Tutorial: take your first mock exam](tutorial-first-mock-exam.md)**, from opening the
  app to reading your score report, step by step.
- **[How to interpret your score report](howto-interpret-scores.md)**: what the scaled
  scores, percentiles, and adaptive path mean, and how to self-grade the essay.

## I want to run or host it

- **[How to run locally and deploy your own copy](howto-run-and-deploy.md)**, three ways to
  run it, plus fork-and-host on GitHub Pages in about two minutes.

## I want to add questions

- **[How to add questions to the bank](howto-add-questions.md)**: the contributor path:
  write a question file, wire it in, verify it draws into exams.
- **[Reference: question bank data format](reference-question-bank.md)**: every question
  type's exact schema, field by field.

## I want to understand how it works

- **[Reference: architecture and modules](reference-architecture.md)**: files, the `GRE`
  namespace, exam blueprints, timing, and the localStorage schema.
- **[Explanation: adaptive routing, scoring, and design decisions](explanation-adaptive-scoring.md)**: 
  why the second sections change difficulty, how raw scores become 130–170, and why the
  app has no build step, no server, and no accounts.
