import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "../tools/build-sw.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

test("committed sw.js matches generator output", () => {
  const expected = build(ROOT).source;
  const actual = readFileSync(join(ROOT, "sw.js"), "utf8");
  assert.equal(actual, expected, "sw.js is stale — run: node tools/build-sw.mjs");
});

test("precache covers every local script and stylesheet in index.html", () => {
  const html = readFileSync(join(ROOT, "index.html"), "utf8");
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((u) => !/^(https?:)?\/\//.test(u));
  const { urls } = build(ROOT);
  assert.ok(refs.length > 10, "expected index.html to reference many local files");
  for (const ref of refs) {
    assert.ok(urls.includes(ref), `${ref} is referenced by index.html but not precached`);
  }
});

test("precache includes every bundled font", () => {
  const { urls } = build(ROOT);
  const fonts = urls.filter((u) => u.endsWith(".woff2"));
  assert.equal(fonts.length, 9, "all nine bundled woff2 files must be precached");
});

test("precache excludes docs, tests and tooling", () => {
  for (const u of build(ROOT).urls) {
    assert.ok(!/^(docs|test|tools)\//.test(u), `${u} must never be precached`);
  }
});

test("precache contains no absolute or deploy-specific paths", () => {
  for (const u of build(ROOT).urls) {
    assert.ok(!u.startsWith("/"), `${u} must be relative so forks keep working`);
  }
});
