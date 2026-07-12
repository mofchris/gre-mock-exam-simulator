# Phase 2: Client Sync + Auth UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Goal

Add account signup/login and background cross-device progress sync to the GRE simulator, then replicate it byte-identically into the Network+ simulator, without changing anonymous/offline behaviour.

## Architecture

Each app gains one portable `js/sync.js` (a `"use strict"` IIFE exposing a single `StudySync` global) that owns all auth and sync logic; everything app-specific enters through `StudySync.initSync(ns, { app, load, save })`. `localStorage` stays the working store — sync is an additive, fire-and-forget layer that pulls the server blob, runs a pure `merge()`, writes the result back through the app's own `Store`, and pushes with optimistic concurrency. Signed-out users make zero network requests.

## Tech Stack

- Vanilla ES5-style browser JS (no build step, no framework, no bundler), matching the existing apps.
- `fetch` against a Cloudflare Worker (`study-sync`) backed by D1. Cloudflare Turnstile for CAPTCHA, `api.js` lazy-loaded only when a flow needs it.
- `node --test` with `.mjs` test files for the pure `merge()` logic. No new dependencies in either app repo.
- Worker local dev via `wrangler dev` (repo `study-sync`, already has `vitest` + `wrangler`).

## Source specs

- Phase 2 spec (binding): `C:/Users/mofch/OneDrive/Desktop/GRE/docs/superpowers/specs/2026-07-12-phase2-client-sync-design.md`
- Parent spec (API §6, merge §7, integration §8, errors §10): `C:/Users/mofch/OneDrive/Desktop/GRE/docs/superpowers/specs/2026-07-12-progress-sync-design.md`

## Global Constraints (verbatim, non-negotiable)

- `sync.js` must be **byte-identical** between the two repos; all app-specifics enter via `initSync(ns, { app, load, save })`.
- Worker URL prod: `https://study-sync.mofchris.workers.dev` ; local: `http://localhost:8787`.
- Turnstile site key prod: `0x4AAAAAAD0g5yt6l-g7L7_h` ; localhost test key: `1x00000000000000000000AA` (env auto-detected via `location.hostname === "mofchris.github.io"`).
- localStorage keys: `study-sync-auth` `{token, username}` (shared across both apps), `study-sync-meta-gre` / `study-sync-meta-netplus` `{baseUpdatedAt}`; progress blobs `gre-sim-v1`/`netplus-sim-v1` unchanged except additive `_savedAt`.
- Signed out ⇒ **ZERO** network requests to the worker; Turnstile `api.js` lazy-loaded only when a flow needs it.
- `sync.js` never calls `localStorage` for progress blobs — only `cfg.load()` / `cfg.save(data, fromSync=true)`.
- Anonymous/offline app behaviour unchanged; a failed sync never loses local data.
- All UI reuses existing design tokens and `ns.modal()`; no new fonts, no new dependencies.
- Error copy table and merge rules exactly as spec'd (quoted in the relevant tasks).
- TDD for pure logic (merge, migration decision); `node --test`, no new deps.
- Commits: no `Co-Authored-By`/attribution trailers, plain messages.

## Parallelism map

- **Task 1** (study-sync local dev env) is **independent** of Tasks 2–7 (GRE repo) — different repo, no shared files. May run concurrently with the GRE work, but must be finished before Task 7's local E2E.
- **Tasks 2 → 3 → 4 → 5 → 6** all live in the **GRE repo and edit the same files** (`js/sync.js`, `js/app.js`, `css/style.css`). They are **strictly sequential** — do not parallelise them.
- **Task 7** (GRE E2E) depends on Tasks 1–6 being complete.
- **Task 8** (Network+ port) depends on **ALL** GRE tasks (2–7) being final, because it copies `js/sync.js` verbatim and drift would fail the diff check.
- The controller runs every `git push` / deploy / production-smoke step itself; those are marked **[CONTROLLER]** below. Implementer agents stop at the commit.

---

## Task 1 — Local dev environment (repo: `study-sync`)

**Repo:** `C:/Users/mofch/OneDrive/Desktop/study-sync`
**Goal:** a running local worker at `:8787` with a seeded local D1 and dev CORS, so GRE E2E (Task 7) can run against it without touching production.

### Interfaces
- **Produces:** a reachable `http://localhost:8787` with `/health`, `/signup`, `/login`, `/reset-pin`, `/progress` and dev CORS for `http://localhost:8420`.
- **Consumes:** nothing from the GRE tasks.

### Steps

- [ ] Create `C:/Users/mofch/OneDrive/Desktop/study-sync/.dev.vars` with exactly:
  ```
  ENVIRONMENT=dev
  TURNSTILE_SECRET=1x0000000000000000000000000000000AA
  ```
  `1x0000000000000000000000000000000AA` is Cloudflare's **public, documented always-pass Turnstile test secret** — it is safe to write in this plan and in `.dev.vars`. `.dev.vars` is already gitignored (`study-sync/.gitignore` line 3: `.dev.vars`), so **nothing here is committed**.
- [ ] Apply the schema to local D1 (idempotent-enough for a fresh local DB):
  ```
  cd C:/Users/mofch/OneDrive/Desktop/study-sync
  npx wrangler d1 execute study-sync --local --file=./schema.sql
  ```
  Expected: `wrangler` prints an executed-commands summary and no errors (the four `CREATE TABLE` statements run against the `.wrangler/` local SQLite).
- [ ] Start the worker in a background terminal:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/study-sync
  npx wrangler dev
  ```
  Expected: `Ready on http://localhost:8787`. `wrangler dev` loads `.dev.vars`, so `env.ENVIRONMENT === "dev"` at runtime (overrides `wrangler.toml`'s `ENVIRONMENT = "production"`).
- [ ] Verify health:
  ```
  curl -s http://localhost:8787/health
  ```
  Expected exactly: `{"ok":true}`
- [ ] Verify dev CORS allows the GRE origin on an OPTIONS preflight:
  ```
  curl -s -i -X OPTIONS http://localhost:8787/progress \
    -H "Origin: http://localhost:8420" \
    -H "Access-Control-Request-Method: GET"
  ```
  Expected: `HTTP/1.1 204 No Content` and header `access-control-allow-origin: http://localhost:8420` (present only because `.dev.vars` set `ENVIRONMENT=dev`, which makes `worker.js corsHeaders()` push `http://localhost:8420` into the allow-list).
- [ ] **No commit.** The only new file is `.dev.vars`, which is gitignored. Leave `wrangler dev` running for Task 7.

---

## Task 2 — `sync.js` core (repo: GRE)

**Repo:** `C:/Users/mofch/OneDrive/Desktop/GRE`
**Goal:** create `js/sync.js` with the namespace/`StudySync` global, environment constants, session + meta storage helpers, and the API client wrappers. Wire the `<script>` tag into `index.html`. No behaviour change yet (nothing calls `initSync` until Task 5's boot line, added later).

### Interfaces
- **Produces (global):** `window.StudySync = { initSync, merge }` (Node: `module.exports = { merge, initSync }`).
- **Produces (module-internal functions, used by Tasks 3–6):**
  - `ENV` constants: `WORKER_URL`, `TURNSTILE_KEY`, `IS_PROD`.
  - Storage: `readAuth() → {token,username}|null`, `writeAuth(obj)`, `clearAuth()`, `metaKey(app) → string`, `readMeta(app) → {baseUpdatedAt}`, `writeMeta(app, obj)`, `clearMeta(app)`.
  - API client (all return `Promise<{status:number, body:object}>`, all fire-and-forget safe — a network throw resolves to `{status:0, body:{}}`):
    - `apiSignup({username, pin, turnstile})`
    - `apiLogin({username, pin, turnstile})`
    - `apiResetPin({username, recoveryCode, newPin, turnstile})`
    - `apiGetProgress(app, token) → {status, body:{blob, updatedAt}}`
    - `apiPutProgress(app, token, blobString, baseUpdatedAt) → {status, body:{updatedAt}|{error,blob,updatedAt}}`
- **Consumes:** nothing yet.

### Steps

- [ ] Create `C:/Users/mofch/OneDrive/Desktop/GRE/js/sync.js` with exactly this content. (Sections for merge/engine/UI are stubbed with clear markers; later tasks fill them. Functions are `function` declarations so cross-section references hoist regardless of order.)
  ```js
  /* study-sync client: auth + cross-device progress sync.
     BYTE-IDENTICAL between the GRE and Network+ repos. All app-specifics
     enter through StudySync.initSync(ns, { app, load, save }).
     Single global (StudySync), "use strict" IIFE, same style as app.js. */
  (function () {
    "use strict";

    /* ---------------- environment (no config files) ---------------- */

    var IS_PROD = typeof location !== "undefined" &&
      location.hostname === "mofchris.github.io";
    var WORKER_URL = IS_PROD
      ? "https://study-sync.mofchris.workers.dev"
      : "http://localhost:8787";
    var TURNSTILE_KEY = IS_PROD
      ? "0x4AAAAAAD0g5yt6l-g7L7_h"
      : "1x00000000000000000000AA"; // Cloudflare always-pass test key

    var AUTH_KEY = "study-sync-auth"; // shared across both apps (same origin)

    /* ---------------- session + meta storage ----------------
       These are the ONLY localStorage keys sync.js ever touches. It never
       reads or writes the progress blob itself — that goes through cfg.load /
       cfg.save so the app keeps its single write path. */

    function readAuth() {
      try {
        var raw = localStorage.getItem(AUTH_KEY);
        if (!raw) return null;
        var o = JSON.parse(raw);
        return (o && o.token) ? o : null;
      } catch (e) { return null; }
    }
    function writeAuth(obj) {
      try { localStorage.setItem(AUTH_KEY, JSON.stringify(obj)); } catch (e) {}
    }
    function clearAuth() {
      try { localStorage.removeItem(AUTH_KEY); } catch (e) {}
    }
    function metaKey(app) { return "study-sync-meta-" + app; }
    function readMeta(app) {
      try {
        var o = JSON.parse(localStorage.getItem(metaKey(app)));
        return (o && typeof o.baseUpdatedAt === "number") ? o : { baseUpdatedAt: 0 };
      } catch (e) { return { baseUpdatedAt: 0 }; }
    }
    function writeMeta(app, obj) {
      try { localStorage.setItem(metaKey(app), JSON.stringify(obj)); } catch (e) {}
    }
    function clearMeta(app) {
      try { localStorage.removeItem(metaKey(app)); } catch (e) {}
    }

    /* ---------------- API client ----------------
       Every wrapper resolves to { status, body }. A network/parse failure
       resolves to { status: 0, body: {} } (never rejects) so callers can
       treat "offline" as just another status without try/catch at each site. */

    function request(method, path, opts) {
      opts = opts || {};
      var init = { method: method, headers: {} };
      if (opts.token) init.headers["authorization"] = "Bearer " + opts.token;
      if (opts.body != null) {
        init.headers["content-type"] = "application/json";
        init.body = JSON.stringify(opts.body);
      }
      return fetch(WORKER_URL + path, init).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (body) {
          return { status: res.status, body: body };
        });
      }).catch(function () {
        return { status: 0, body: {} };
      });
    }

    function apiSignup(p)   { return request("POST", "/signup", { body: p }); }
    function apiLogin(p)    { return request("POST", "/login", { body: p }); }
    function apiResetPin(p) { return request("POST", "/reset-pin", { body: p }); }
    function apiGetProgress(app, token) {
      return request("GET", "/progress?app=" + app, { token: token });
    }
    function apiPutProgress(app, token, blobString, baseUpdatedAt) {
      return request("PUT", "/progress?app=" + app, {
        token: token,
        body: { blob: blobString, baseUpdatedAt: baseUpdatedAt }
      });
    }

    /* ============ MERGE (Task 3 fills this) ============ */

    /* ============ SYNC ENGINE (Task 4 fills this) ============ */

    /* ============ HEADER WIDGET + ACCOUNT MODAL (Task 5 fills this) ============ */

    /* ============ AUTH MODAL (Task 6 fills this) ============ */

    /* ---------------- initSync (grows across tasks) ---------------- */

    function initSync(ns, cfg) {
      // cfg: { app: "gre"|"netplus", load: ()=>data, save: (data,fromSync)=>void }
      // Full engine + UI wired in Tasks 4–6. Placeholder returns the api object.
      var api = {};
      return api;
    }

    /* ---------------- exports ---------------- */

    var StudySync = { initSync: initSync, merge: null /* set in Task 3 */ };
    if (typeof window !== "undefined") { window.StudySync = StudySync; }
    if (typeof module !== "undefined" && module.exports) {
      module.exports = { merge: null, initSync: initSync };
    }
  })();
  ```
  > Note: `merge` is `null` here only so the file is loadable before Task 3. Task 3 replaces both the `MERGE` section and the two `merge:` references. Do not ship Phase 2 with `merge` null — Task 3 is mandatory and immediately follows.
- [ ] Add the `<script>` tag to `index.html`. The current app script block (lines 28–35) is exactly:
  ```html
  <!-- App -->
  <script src="js/scoring.js"></script>
  <script src="js/calculator.js"></script>
  <script src="js/exam.js"></script>
  <script src="js/results.js"></script>
  <script src="js/tutor.js"></script>
  <script src="js/course.js"></script>
  <script src="js/app.js"></script>
  ```
  Insert `sync.js` immediately **before** `app.js` (so `StudySync` exists when `app.js`'s boot calls `initSync`), producing:
  ```html
  <!-- App -->
  <script src="js/scoring.js"></script>
  <script src="js/calculator.js"></script>
  <script src="js/exam.js"></script>
  <script src="js/results.js"></script>
  <script src="js/tutor.js"></script>
  <script src="js/course.js"></script>
  <script src="js/sync.js"></script>
  <script src="js/app.js"></script>
  ```
- [ ] Sanity-check the file parses under Node (no DOM at module scope):
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  node -e "require('./js/sync.js'); console.log('loads ok')"
  ```
  Expected: `loads ok` (proves the `typeof window`/`typeof module` guards work and nothing touches the DOM on load).
- [ ] Commit:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  git add js/sync.js index.html
  git commit -m "Add sync.js scaffold: env, storage helpers, API client; wire script tag"
  ```

---

## Task 3 — `merge()` + tests (repo: GRE, extends `js/sync.js`)

**Goal:** implement the pure merge function exactly per parent spec §7 and the first-sign-in migration matrix per §8, with `node --test` TDD (RED first).

### The binding rules — parent spec §7 (transcribed verbatim)

| Field | Rule | Why |
|---|---|---|
| `course.modules[id].best` | `max(local, server)` | Best score is kept by design already. |
| `course.modules[id].passed` | `local OR server` | Passing is permanent; a stale device must not un-pass a module. |
| `course.checkpoints[id]` | same as modules | |
| `course.read[id]` | union | Monotonic. |
| `attempts[]` | union, deduped by `date`, sorted ascending | Completed exams are immutable facts. |
| `tutorSeen` (GRE) | union | Monotonic. |
| `missed[]` | **most-recent-device-wins** | Non-monotonic: questions *graduate out* when answered correctly. A union would resurrect questions the user has already fixed. |
| `recent[]` | most-recent-device-wins, then cap to the existing limit | Only a repeat-avoidance hint; losing it is harmless. |
| `inprogress` | most-recent-device-wins | Only one live exam is coherent. |

> "Most-recent-device-wins" compares recency by `_savedAt`. Per §5/§7: a blob with no `_savedAt` counts as **oldest (0)**, so the server wins — the safe default. **Resolution (see ambiguities):** `merge(local, server)` compares `local._savedAt` against `server._savedAt` (both blobs carry it), keeping the function pure/two-arg for the idempotence test. Ties → server wins.

First-sign-in migration (parent spec §8), encoded inside `merge`: **local-only** (server null) → return local (caller pushes); **server-only** (local null/empty) → return server (caller writes local); **both** → field-merge above (nothing is ever deleted; merge only unions/maxes/most-recent).

### Interfaces
- **Produces:** `merge(local, server) → mergedBlob` (pure; also assigned to `StudySync.merge` and the CJS export). `mergedBlob._savedAt = max(local._savedAt||0, server._savedAt||0)`.
- **Consumes (Task 4):** the sync engine calls `merge(localObj, serverObj)`.

### Steps

- [ ] Write the failing test first: `C:/Users/mofch/OneDrive/Desktop/GRE/test/sync-merge.test.mjs`:
  ```js
  import { test } from "node:test";
  import assert from "node:assert/strict";
  import pkg from "../js/sync.js";
  const { merge } = pkg;

  const base = () => ({
    attempts: [], missed: [], recent: [], inprogress: null,
    tutorSeen: {}, course: { modules: {}, checkpoints: {}, read: {} }, _savedAt: 0
  });

  test("server-only: local null returns server clone", () => {
    const s = { ...base(), missed: ["q1"], _savedAt: 5 };
    const m = merge(null, s);
    assert.deepEqual(m.missed, ["q1"]);
    assert.notEqual(m, s); // clone, not same ref
  });

  test("local-only: server null returns local clone", () => {
    const l = { ...base(), missed: ["q2"], _savedAt: 5 };
    const m = merge(l, null);
    assert.deepEqual(m.missed, ["q2"]);
    assert.notEqual(m, l);
  });

  test("attempts union dedupe by date, ascending", () => {
    const l = { ...base(), attempts: [{ date: 30 }, { date: 10 }], _savedAt: 2 };
    const s = { ...base(), attempts: [{ date: 20 }, { date: 10 }], _savedAt: 1 };
    assert.deepEqual(merge(l, s).attempts.map(a => a.date), [10, 20, 30]);
  });

  test("course best = max, passed = OR", () => {
    const l = { ...base(), course: { modules: { m1: { best: 80, passed: false } }, checkpoints: {}, read: {} }, _savedAt: 2 };
    const s = { ...base(), course: { modules: { m1: { best: 60, passed: true } }, checkpoints: {}, read: {} }, _savedAt: 1 };
    const m = merge(l, s).course.modules.m1;
    assert.equal(m.best, 80);
    assert.equal(m.passed, true);
  });

  test("course.read + tutorSeen union", () => {
    const l = { ...base(), tutorSeen: { a: true }, course: { modules: {}, checkpoints: {}, read: { r1: true } }, _savedAt: 2 };
    const s = { ...base(), tutorSeen: { b: true }, course: { modules: {}, checkpoints: {}, read: { r2: true } }, _savedAt: 1 };
    const m = merge(l, s);
    assert.deepEqual(m.tutorSeen, { a: true, b: true });
    assert.deepEqual(m.course.read, { r1: true, r2: true });
  });

  test("missed = most-recent-device-wins (local newer)", () => {
    const l = { ...base(), missed: ["keep"], _savedAt: 9 };
    const s = { ...base(), missed: ["old1", "old2"], _savedAt: 1 };
    assert.deepEqual(merge(l, s).missed, ["keep"]);
  });

  test("missed recency: server wins on tie / missing local _savedAt", () => {
    const l = { ...base(), missed: ["local"] }; delete l._savedAt;
    const s = { ...base(), missed: ["server"], _savedAt: 0 };
    assert.deepEqual(merge(l, s).missed, ["server"]);
  });

  test("inprogress most-recent-device-wins", () => {
    const l = { ...base(), inprogress: { id: "L" }, _savedAt: 1 };
    const s = { ...base(), inprogress: { id: "S" }, _savedAt: 9 };
    assert.deepEqual(merge(l, s).inprogress, { id: "S" });
  });

  test("absent-field tolerance: sparse blobs never throw", () => {
    assert.doesNotThrow(() => merge({ missed: ["x"], _savedAt: 3 }, { attempts: [{ date: 1 }], _savedAt: 1 }));
    const m = merge({ missed: ["x"], _savedAt: 3 }, { attempts: [{ date: 1 }], _savedAt: 1 });
    assert.deepEqual(m.missed, ["x"]);
    assert.deepEqual(m.attempts.map(a => a.date), [1]);
  });

  test("idempotence: merge(a, merge(a,b)) deep-equals merge(a,b)", () => {
    const a = { ...base(), missed: ["a"], attempts: [{ date: 2 }], tutorSeen: { x: true }, _savedAt: 5 };
    const b = { ...base(), missed: ["b"], attempts: [{ date: 1 }], tutorSeen: { y: true }, _savedAt: 3 };
    const ab = merge(a, b);
    assert.deepEqual(merge(a, ab), ab);
  });
  ```
- [ ] Run it — expect **FAIL** (merge is `null`, so `pkg.merge` is `null` → `TypeError: merge is not a function` on the first call):
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  node --test test/sync-merge.test.mjs
  ```
  Expected: tests fail. This proves the harness runs and the assertions exercise real behaviour.
- [ ] Replace the `/* ============ MERGE (Task 3 fills this) ============ */` marker in `js/sync.js` with:
  ```js
    /* ---------------- merge (pure; parent spec §7) ---------------- */

    function isObj(x) { return x && typeof x === "object" && !Array.isArray(x); }
    function objOf(x) { return isObj(x) ? x : {}; }
    function clone(x) { return x == null ? x : JSON.parse(JSON.stringify(x)); }

    function mergeAttempts(a, b) {
      var map = {};
      var order = [];
      function add(arr) {
        (Array.isArray(arr) ? arr : []).forEach(function (x) {
          if (!x || x.date == null) return;
          var k = String(x.date);
          if (!(k in map)) { map[k] = x; order.push(x.date); }
        });
      }
      add(a); add(b);
      return order.sort(function (p, q) { return p < q ? -1 : p > q ? 1 : 0; })
        .map(function (d) { return map[String(d)]; });
    }

    function mergeCourse(a, b) {
      a = objOf(a); b = objOf(b);
      var out = { modules: {}, checkpoints: {}, read: {} };
      ["modules", "checkpoints"].forEach(function (bucket) {
        var la = objOf(a[bucket]), lb = objOf(b[bucket]);
        var ids = {};
        Object.keys(la).forEach(function (k) { ids[k] = 1; });
        Object.keys(lb).forEach(function (k) { ids[k] = 1; });
        Object.keys(ids).forEach(function (id) {
          var ra = objOf(la[id]), rb = objOf(lb[id]);
          out[bucket][id] = {
            best: Math.max(Number(ra.best) || 0, Number(rb.best) || 0),
            passed: !!(ra.passed || rb.passed)
          };
        });
      });
      // read: union of {id:true}
      var ra = objOf(a.read), rb = objOf(b.read);
      Object.keys(ra).forEach(function (k) { out.read[k] = ra[k]; });
      Object.keys(rb).forEach(function (k) { out.read[k] = rb[k]; });
      return out;
    }

    function merge(local, server) {
      // migration matrix (parent spec §8)
      if (!isObj(local) && !isObj(server)) return {};
      if (!isObj(server)) return clone(local);
      if (!isObj(local)) return clone(server);

      var ls = Number(local._savedAt) || 0;
      var ss = Number(server._savedAt) || 0;
      var localWins = ls > ss; // tie => server wins (safe default, §7)

      var out = {};
      var keys = {};
      Object.keys(local).forEach(function (k) { keys[k] = 1; });
      Object.keys(server).forEach(function (k) { keys[k] = 1; });

      Object.keys(keys).forEach(function (k) {
        if (k === "_savedAt") return;
        switch (k) {
          case "attempts":
            out.attempts = mergeAttempts(local.attempts, server.attempts); break;
          case "tutorSeen":
            out.tutorSeen = {};
            [objOf(local.tutorSeen), objOf(server.tutorSeen)].forEach(function (o) {
              Object.keys(o).forEach(function (id) { out.tutorSeen[id] = o[id]; });
            });
            break;
          case "course":
            out.course = mergeCourse(local.course, server.course); break;
          case "missed":
            out.missed = clone((localWins ? local.missed : server.missed) || []); break;
          case "recent":
            // recency winner; already app-capped when written, so no extra cap needed
            out.recent = clone((localWins ? local.recent : server.recent) || []); break;
          case "inprogress":
            out.inprogress = clone(localWins
              ? (local.inprogress != null ? local.inprogress : null)
              : (server.inprogress != null ? server.inprogress : null));
            break;
          default:
            // generic tolerance for any unknown field: most-recent-device-wins
            var inL = k in local, inS = k in server;
            out[k] = clone(localWins ? (inL ? local[k] : server[k]) : (inS ? server[k] : local[k]));
        }
      });

      out._savedAt = Math.max(ls, ss);
      return out;
    }
  ```
- [ ] Wire the export: change the two export lines. Current:
  ```js
    var StudySync = { initSync: initSync, merge: null /* set in Task 3 */ };
    if (typeof window !== "undefined") { window.StudySync = StudySync; }
    if (typeof module !== "undefined" && module.exports) {
      module.exports = { merge: null, initSync: initSync };
    }
  ```
  Replace with:
  ```js
    var StudySync = { initSync: initSync, merge: merge };
    if (typeof window !== "undefined") { window.StudySync = StudySync; }
    if (typeof module !== "undefined" && module.exports) {
      module.exports = { merge: merge, initSync: initSync };
    }
  ```
- [ ] Run — expect **PASS** (all 10 tests green):
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  node --test test/sync-merge.test.mjs
  ```
  Expected: `# pass 10`, `# fail 0`.
- [ ] Commit:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  git add js/sync.js test/sync-merge.test.mjs
  git commit -m "Implement pure merge() per spec section 7 with node --test coverage"
  ```

---

## Task 4 — sync engine (repo: GRE, extends `js/sync.js`)

**Goal:** the status state machine, `syncNow()` pull-merge-push cycle (parent spec §5/§8 exactly), 3s-debounced `onLocalSave()`, `online` listener, boot trigger, and a subscribe/notify so the header re-renders on status change.

### State machine (spec §5)
`idle → syncing → (idle | offline | error)`. Plus a `sessionExpired` flag (set on 401; shown once). Dot mapping (spec §4.1): `idle` → green *Synced* / `syncing` → pulsing amber *Syncing…* / `offline` → grey *Offline* / `error` → red *Error*.

### Cycle (spec §5, encoded exactly)
1. `GET /progress?app=X`.
2. Server empty (`blob:null`) → `PUT` local blob with `baseUpdatedAt:0`.
3. Server has data → `merged = merge(local, server)`.
4. If `merged ≠ local` (content, ignoring `_savedAt`) → write locally via `cfg.save(merged, true)`.
5. If `merged ≠ server` → `PUT {blob: merged, baseUpdatedAt}` → on 200 store new `updatedAt` as base.
6. **409** → response carries current server state → re-merge, retry; max 3 attempts per cycle, then status *Error*.
7. **401** → clear token + meta keys, flip header to signed-out with session-expired note.
8. Fetch/network error (`status:0`) → status *Offline*, dirty flag stays set, retried on next trigger.

### Interfaces
- **Produces (on the `api` returned by `initSync`, consumed by Tasks 5–6):**
  - `api.onLocalSave()` — 3s-debounced push trigger.
  - `api.syncNow()` — runs one full cycle; returns a Promise.
  - `api.signOut()` — clears auth+meta, notifies, no server call.
  - `api.subscribe(fn) → unsubscribe` ; `api.getState() → {signedIn, username, status, lastSyncedAt, sessionExpired}`.
  - `api.setSession({token, username})` — used by auth flows (Task 6) after login/signup/reset; writes auth, clears `sessionExpired`, notifies, kicks `syncNow()`.
- **Consumes:** `merge` (Task 3); `cfg.load`/`cfg.save` (from `initSync`); the storage helpers (Task 2).

### Steps

- [ ] Replace the `/* ============ SYNC ENGINE (Task 4 fills this) ============ */` marker with:
  ```js
    /* ---------------- content equality (ignores _savedAt) ---------------- */

    function stripMeta(o) {
      if (!isObj(o)) return o;
      var c = {};
      Object.keys(o).forEach(function (k) { if (k !== "_savedAt") c[k] = o[k]; });
      return c;
    }
    function stableStr(o) {
      // deterministic stringify so key order never causes a false "changed"
      if (Array.isArray(o)) return "[" + o.map(stableStr).join(",") + "]";
      if (isObj(o)) {
        return "{" + Object.keys(o).sort().map(function (k) {
          return JSON.stringify(k) + ":" + stableStr(o[k]);
        }).join(",") + "}";
      }
      return JSON.stringify(o);
    }
    function sameContent(a, b) { return stableStr(stripMeta(a)) === stableStr(stripMeta(b)); }
  ```
- [ ] Replace the `initSync` placeholder body with the full engine (keep the `function initSync(ns, cfg) {` signature and the `return api;` shape):
  ```js
    function initSync(ns, cfg) {
      var app = cfg.app;                 // "gre" | "netplus"
      var subs = [];
      var state = {
        signedIn: !!readAuth(),
        username: readAuth() ? readAuth().username : null,
        status: "idle",                  // idle | syncing | offline | error
        lastSyncedAt: 0,
        sessionExpired: false
      };
      var saveTimer = null;
      var running = false;
      var pending = false;               // a save landed while a cycle ran

      function notify() { subs.forEach(function (fn) { fn(state); }); }
      function setStatus(s) { state.status = s; notify(); }

      function subscribe(fn) {
        subs.push(fn);
        return function () { subs = subs.filter(function (f) { return f !== fn; }); };
      }
      function getState() { return state; }

      function setSession(auth) {
        writeAuth(auth);
        state.signedIn = true;
        state.username = auth.username;
        state.sessionExpired = false;
        state.status = "idle";
        notify();
        syncNow();
      }

      function signOut() {
        clearAuth();
        clearMeta(app);
        state.signedIn = false;
        state.username = null;
        state.sessionExpired = false;
        state.status = "idle";
        notify();
      }

      function onExpired() {
        clearAuth();
        clearMeta(app);
        state.signedIn = false;
        state.username = null;
        state.sessionExpired = true; // shown once in the account/header note
        state.status = "idle";
        notify();
      }

      // One PUT with bounded 409 re-merge retries. Returns a Promise<boolean pushed-ok>.
      function pushMerged(token, mergedObj, baseUpdatedAt, attempt) {
        var blobStr = JSON.stringify(cfg.load()); // push exactly what is now local
        return apiPutProgress(app, token, blobStr, baseUpdatedAt).then(function (r) {
          if (r.status === 200) {
            writeMeta(app, { baseUpdatedAt: r.body.updatedAt });
            state.lastSyncedAt = Date.now();
            return true;
          }
          if (r.status === 401) { onExpired(); return false; }
          if (r.status === 409 && attempt < 3) {
            var server2 = r.body.blob ? safeParse(r.body.blob) : null;
            var merged2 = merge(cfg.load(), server2);
            if (!sameContent(merged2, cfg.load())) cfg.save(merged2, true);
            return pushMerged(token, merged2, r.body.updatedAt || 0, attempt + 1);
          }
          if (r.status === 0) { setStatus("offline"); return false; }
          setStatus("error"); return false;
        });
      }

      function safeParse(s) { try { return JSON.parse(s); } catch (e) { return null; } }

      function syncNow() {
        var auth = readAuth();
        if (!auth) return Promise.resolve();      // ANONYMOUS INVARIANT: no token => no request
        if (running) { pending = true; return Promise.resolve(); }
        running = true;
        setStatus("syncing");

        return apiGetProgress(app, auth.token).then(function (g) {
          if (g.status === 401) { onExpired(); return false; }
          if (g.status === 0) { setStatus("offline"); return false; }
          if (g.status !== 200) { setStatus("error"); return false; }

          // Corrupt server blob => keep local, treat as server-empty (spec §10).
          var server = g.body.blob ? safeParse(g.body.blob) : null;
          var base = Number(g.body.updatedAt) || 0;
          var local = cfg.load();
          var merged = merge(local, server);

          if (!sameContent(merged, local)) cfg.save(merged, true);
          if (server && sameContent(merged, server)) {
            // nothing to push; we are already in sync with the server
            writeMeta(app, { baseUpdatedAt: base });
            state.lastSyncedAt = Date.now();
            return true;
          }
          return pushMerged(auth.token, merged, base, 1);
        }).then(function (ok) {
          if (state.status === "syncing") setStatus(ok ? "idle" : "error");
          running = false;
          if (pending) { pending = false; syncNow(); }
        }).catch(function () {
          setStatus("offline");
          running = false;
        });
      }

      function onLocalSave() {
        if (!readAuth()) return;                  // anonymous: never schedules a request
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(function () { saveTimer = null; syncNow(); }, 3000);
      }

      if (typeof window !== "undefined") {
        window.addEventListener("online", function () { if (readAuth()) syncNow(); });
      }

      var api = {
        onLocalSave: onLocalSave,
        syncNow: syncNow,
        signOut: signOut,
        setSession: setSession,
        subscribe: subscribe,
        getState: getState,
        mountHeader: function () {},              // Task 5 replaces
        openAuthModal: function () {},            // Task 6 replaces
        _ns: ns, _cfg: cfg
      };

      // Boot trigger (spec §8): if already signed in, run one cycle. Anonymous => nothing.
      if (readAuth()) { syncNow(); }
      return api;
    }
  ```
  > `mountHeader` and `openAuthModal` are assigned as no-ops here and **overwritten** by Tasks 5 and 6 (which define real functions in the closure and reassign `api.mountHeader` / `api.openAuthModal` at the end of `initSync`). This keeps each task's diff self-contained.
- [ ] Extend the merge test file with a tiny engine-adjacent unit for `sameContent` is **not** required (engine is I/O-bound; it is covered by Task 7 E2E). Re-run the existing suite to confirm no regression:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  node --test test/sync-merge.test.mjs
  ```
  Expected: `# pass 10`, `# fail 0` (the file still loads and merge still passes; the new engine code is inert under Node because `initSync` is not called).
- [ ] Commit:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  git add js/sync.js
  git commit -m "Add sync engine: pull-merge-push cycle, debounce, 409/401 handling, status"
  ```

---

## Task 5 — header widget + `app.js`/CSS touches (repo: GRE)

**Goal:** render the header sync widget, wire `Store.save` to stamp `_savedAt` + call `onLocalSave`, add the boot `initSync` line, add the `/* ---- sync ---- */` CSS, and the signed-in account modal (with Sign out).

### Interfaces
- **Produces:** `api.mountHeader(node)` (renders + subscribes), the account modal, and the boot wiring. `GRE.sync` is now live.
- **Consumes:** `api.subscribe/getState/openAuthModal/signOut/getState().lastSyncedAt` (Task 4/6); `ns.modal` (real signature: `GRE.modal(title, bodyHTML, buttons, opts)` → `{close}`; buttons `[{label, secondary?, danger?, action?}]`).

### Steps

- [ ] Add the header render + account modal to `js/sync.js`, replacing the `/* ============ HEADER WIDGET + ACCOUNT MODAL (Task 5 fills this) ============ */` marker. Because this code needs `ns` and the `api` closure, define it **inside** `initSync` — insert the following just **before** the `var api = {` line, and then add the two reassignments noted after:
  ```js
      /* ---------------- header widget ---------------- */

      var headerNode = null;   // the <div> chrome() hands us; re-rendered on notify

      function fmtAgo(ts) {
        if (!ts) return "just now";
        var s = Math.round((Date.now() - ts) / 1000);
        if (s < 60) return "just now";
        var m = Math.round(s / 60);
        if (m < 60) return m + " min ago";
        var h = Math.round(m / 60);
        return h + " h ago";
      }

      function renderHeader() {
        if (!headerNode) return;
        var el = ns.el;
        headerNode.innerHTML = "";

        if (!state.signedIn) {
          headerNode.appendChild(el("button", {
            class: "btn soft syncbtn",
            onclick: function () { openAuthModal("signin"); }
          }, "Sign in to sync"));
          if (state.sessionExpired) {
            headerNode.appendChild(el("span", { class: "syncnote" }, "Session expired — sign in again"));
          }
          return;
        }

        var label = state.status === "syncing" ? "Syncing…"
          : state.status === "offline" ? "Offline"
          : state.status === "error" ? "Error" : "Synced";
        var pill = el("button", {
          class: "syncpill",
          title: label,
          onclick: function () { openAccountModal(); }
        },
          el("span", { class: "dot " + state.status }),
          el("span", { class: "u" }, state.username));
        headerNode.appendChild(pill);
      }

      function openAccountModal() {
        var el = ns.el;
        var body = el("div", {},
          el("p", {}, "Signed in as ", el("strong", {}, state.username), "."),
          el("p", { class: "syncmeta" },
            state.status === "offline" ? "Offline — will retry when reconnected."
            : "Last synced " + fmtAgo(state.lastSyncedAt) + "."));
        var m = ns.modal("Account", "", [
          { label: "Sign out", danger: true, action: function () { signOut(); } },
          { label: "Close", secondary: true }
        ], { intent: "info" });
        // inject the live body above the button row
        var veil = document.body.lastElementChild;
        var mbody = veil.querySelector(".mbody");
        if (mbody) mbody.appendChild(body);
        return m;
      }

      function mountHeader(node) {
        headerNode = node;
        renderHeader();
      }

      // keep the header in sync with engine state
      subscribe(function () { renderHeader(); });
  ```
  Then update the `api` object literal so `mountHeader` points at the real function (replace the `mountHeader: function () {},` line inside the `var api = {` block with):
  ```js
        mountHeader: mountHeader,
  ```
  (`openAuthModal` stays a no-op until Task 6 replaces it. `openAccountModal`/`signOut`/`openAuthModal` are all in-closure `function`/`var` references, so hoisting/closure resolves them.)
- [ ] Modify `chrome()` in `js/app.js` to mount the widget. The current `GRE.chrome` (lines 233–252) is exactly:
  ```js
    GRE.chrome = function (active) {
      const el = GRE.el;
      const head = el("div", { class: "tophead" },
        el("div", { class: "brandwrap" },
          el("span", { class: "logo" }, GRE.icon("logo", 19)),
          el("div", { class: "names" },
            el("div", { class: "pname" }, "GRE Mock Simulator"),
            el("div", { class: "psub" }, "shorter format · independent study tool"))),
        el("nav", { class: "topnav", "aria-label": "Main" },
          ...NAV.map(([label, go]) => el("button", {
            class: active === label ? "on" : "",
            "aria-current": active === label ? "page" : null,
            onclick: go
          }, label))));

      const stage = el("div", { class: "stage" });
      const inner = el("div", { class: "stage-inner screen-in" });
      stage.appendChild(inner);
      return { head, bar: head, stage, inner };
    };
  ```
  Replace it with (wrap nav + a sync mount in a right-side group so `.tophead`'s `space-between` keeps brand left / group right, and mount the widget):
  ```js
    GRE.chrome = function (active) {
      const el = GRE.el;
      const syncMount = el("div", { class: "syncwrap" });
      const head = el("div", { class: "tophead" },
        el("div", { class: "brandwrap" },
          el("span", { class: "logo" }, GRE.icon("logo", 19)),
          el("div", { class: "names" },
            el("div", { class: "pname" }, "GRE Mock Simulator"),
            el("div", { class: "psub" }, "shorter format · independent study tool"))),
        el("div", { class: "topright" },
          el("nav", { class: "topnav", "aria-label": "Main" },
            ...NAV.map(([label, go]) => el("button", {
              class: active === label ? "on" : "",
              "aria-current": active === label ? "page" : null,
              onclick: go
            }, label))),
          syncMount));

      if (GRE.sync) GRE.sync.mountHeader(syncMount);

      const stage = el("div", { class: "stage" });
      const inner = el("div", { class: "stage-inner screen-in" });
      stage.appendChild(inner);
      return { head, bar: head, stage, inner };
    };
  ```
- [ ] Modify `Store.save` in `js/app.js` to stamp `_savedAt` and trigger the debounced push. Current (lines 25–28):
  ```js
      save() {
        try { localStorage.setItem(this.key, JSON.stringify(this.data)); }
        catch (e) { /* storage full or blocked: keep running in-memory */ }
      }
  ```
  Replace with:
  ```js
      save(data, fromSync) {
        if (data) this.data = data;                 // sync engine writes the merged blob here
        this.data._savedAt = Date.now();            // additive recency stamp (spec section 5)
        try { localStorage.setItem(this.key, JSON.stringify(this.data)); }
        catch (e) { /* storage full or blocked: keep running in-memory */ }
        if (!fromSync && GRE.sync) GRE.sync.onLocalSave();
      }
  ```
  > Every existing `Store.save()` call passes no args: `data` is `undefined` (in-place mutation preserved) and `fromSync` is falsy (push scheduled). The engine calls `cfg.save(merged, true)` to write without re-triggering a push.
- [ ] Add the boot `initSync` line in `js/app.js`. Current boot (lines 719–723):
  ```js
    /* ---------------- boot ---------------- */

    GRE.buildIndex();
    GRE.show(GRE.screens.home);
  })();
  ```
  Replace with (init **before** `show`, so `chrome()` can mount the widget on the first render; arrow wrappers preserve `Store`'s `this` binding — see ambiguities):
  ```js
    /* ---------------- boot ---------------- */

    GRE.buildIndex();
    GRE.sync = StudySync.initSync(GRE, {
      app: "gre",
      load: () => Store.load(),
      save: (data, fromSync) => Store.save(data, fromSync)
    });
    GRE.show(GRE.screens.home);
  })();
  ```
- [ ] Add the `/* ---- sync ---- */` CSS block to `css/style.css`, immediately after the study-chrome block (after line 133, the `.topnav button.on` rule). Uses existing tokens only:
  ```css
  /* ---- sync ---- */
  .topright { display: flex; align-items: center; gap: 16px; min-width: 0; }
  .syncwrap { display: flex; align-items: center; gap: 10px; }
  .syncwrap .syncbtn { min-height: 34px; padding: 7px 14px; font-size: 13px; }
  .syncwrap .syncnote {
    font-family: var(--font-mono); font-size: 11px; color: var(--amber);
    white-space: nowrap;
  }
  .syncpill {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255, 255, 255, .08); border: 1px solid rgba(255, 255, 255, .14);
    color: #fff; border-radius: var(--r-pill); padding: 6px 13px 6px 11px;
    font-size: 13px; font-weight: 600; max-width: 190px;
    transition: background var(--mo-micro) var(--ease-out);
  }
  .syncpill:hover { background: rgba(255, 255, 255, .14); }
  .syncpill .u { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .syncpill .dot { width: 8px; height: 8px; border-radius: 50%; flex: 0 0 auto; background: var(--muted); }
  .syncpill .dot.idle { background: var(--good); }
  .syncpill .dot.offline { background: var(--muted); }
  .syncpill .dot.error { background: var(--bad); }
  .syncpill .dot.syncing { background: var(--amber); animation: syncpulse 1s var(--ease-out) infinite; }
  @keyframes syncpulse { 50% { opacity: .3; } }

  /* auth modal (Task 6) */
  .authtabs { display: flex; gap: 6px; margin-bottom: 16px; }
  .authtabs button {
    flex: 1; padding: 9px; border-radius: var(--r-input); border: 1px solid var(--line);
    background: var(--sub); color: var(--muted); font-size: 13.5px; font-weight: 600;
  }
  .authtabs button.on { background: var(--accentsoft); border-color: var(--accent-border); color: var(--accent2); }
  .authfield { margin-bottom: 12px; }
  .authfield label { display: block; font-size: 12.5px; font-weight: 600; color: var(--ink); margin-bottom: 5px; }
  .authfield input {
    width: 100%; padding: 10px 12px; border: 1px solid var(--line);
    border-radius: var(--r-input); font-size: 14px; background: var(--paper); color: var(--ink);
  }
  .authfield input.pin { font-family: var(--font-mono); letter-spacing: .2em; }
  .autherr { color: var(--bad); font-size: 12.5px; margin: 4px 0 0; min-height: 1em; }
  .authlink { margin-top: 4px; }
  .ts-container { margin: 10px 0; min-height: 0; }
  .recovery-code {
    font-family: var(--font-mono); font-size: 22px; font-weight: 600; letter-spacing: .12em;
    text-align: center; padding: 16px; margin: 14px 0;
    background: var(--sub); border: 1px solid var(--line); border-radius: var(--r-input);
    word-break: break-all;
  }
  .recovery-warn { color: var(--amber); font-size: 13px; }
  .syncmeta { color: var(--muted); font-size: 13px; }
  ```
- [ ] Manual smoke (still no auth flow — Task 6 adds it): launch the app and confirm the signed-out button renders and the app still boots normally.
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE && cmd //c start.bat
  ```
  Open `http://localhost:8420`. Expected: header shows a "Sign in to sync" button on the right; Dashboard renders; DevTools Network tab shows **zero** requests to `localhost:8787` (anonymous invariant holds — nothing calls `syncNow` without a token). Clicking the button currently does nothing (no-op `openAuthModal`), which is fine until Task 6.
- [ ] Commit:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  git add js/sync.js js/app.js css/style.css
  git commit -m "Wire sync header widget, Store.save hook, boot init, and sync styles"
  ```

---

## Task 6 — auth modal flows (repo: GRE, extends `js/sync.js`)

**Goal:** the full auth modal — Sign in / Create account tabs, Forgot PIN, client validation mirroring the server, lazy Turnstile, signup + reset recovery-code handoff (with Escape/veil disabled during handoff), and the exact error-copy mapping.

### Error copy (spec §4.3, transcribed verbatim)

| Server response | Modal message |
|---|---|
| 401 | "Wrong username or PIN." (never distinguishes which) |
| 400 banned PIN | Server's message verbatim ("That PIN is too easy to guess…") |
| 403 needsCaptcha | Render Turnstile inline: "Quick check — please verify below and try again." |
| 409 username_taken | "That username is taken." |
| 429 | "Too many attempts. Try again in ~N minutes." (from `retryAfter`) |
| Network failure | "Can't reach the sync server. Check your connection." |

Worker ground truth this maps against (`study-sync/src`): `401 {error:"invalid_credentials"}`; `400 {error:<message>}` (banned-PIN message is `"That PIN is too easy to guess. Avoid repeats, runs and patterns."`, username/pin-shape messages also 400); `403 {error:"captcha_required", needsCaptcha:true}`; `409 {error:"username_taken"}` (signup) and `409 {error:"conflict",...}` (progress PUT only); `429 {error:"rate_limited", retryAfter:<seconds>}`. `retryAfter` is **seconds** (`limits.js: Math.ceil(msLeftInHour/1000)`), so minutes = `Math.ceil(retryAfter/60)`. Signup success → `{token, username, recoveryCode}`; login success → `{token, username}`; reset success → `{token, username, recoveryCode}` (new code; all old sessions invalidated server-side).

### Validation (mirror server, spec §4.2)
- username: `/^[a-zA-Z0-9_-]{3,20}$/`
- PIN / newPin: `/^[0-9]{6}$/`
- confirm PIN must equal PIN.
- Server remains authoritative; client checks are for instant feedback only.

### Interfaces
- **Produces:** `api.openAuthModal(tab)` (`tab` = `"signin"` default; also entered as `"signup"`). Calls `api.setSession(...)` on success (Task 4).
- **Consumes:** `ns.modal(title, bodyHTML, buttons, opts) → {close}`; `ns.el`; the API client (Task 2); `TURNSTILE_KEY`; `setSession` (Task 4).

### Steps

- [ ] Add the auth modal code to `js/sync.js`, replacing the `/* ============ AUTH MODAL (Task 6 fills this) ============ */` marker. This block is **module-level** (needs `TURNSTILE_KEY`, the API client, and error mapping — none of which need the per-app closure). Insert:
  ```js
    /* ---------------- Turnstile lazy loader (spec §9.5) ---------------- */

    var tsLoading = null;
    function loadTurnstile() {
      if (typeof window !== "undefined" && window.turnstile) return Promise.resolve();
      if (tsLoading) return tsLoading;
      tsLoading = new Promise(function (resolve, reject) {
        var s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true; s.defer = true;
        s.onload = function () { resolve(); };
        s.onerror = function () { tsLoading = null; reject(new Error("turnstile_load_failed")); };
        document.head.appendChild(s);
      });
      return tsLoading;
    }
    // Render a widget into `container`; report the solved token (or null) via onToken.
    function mountTurnstile(container, onToken) {
      loadTurnstile().then(function () {
        window.turnstile.render(container, {
          sitekey: TURNSTILE_KEY,
          callback: function (tok) { onToken(tok); },
          "error-callback": function () { onToken(null); },
          "expired-callback": function () { onToken(null); }
        });
      }).catch(function () { onToken(null); }); // fail closed: no token => submit refused
    }

    /* ---------------- error copy (spec §4.3) ---------------- */

    function authErrorMessage(status, body) {
      if (status === 0) return "Can't reach the sync server. Check your connection.";
      if (status === 401) return "Wrong username or PIN.";
      if (status === 409 && body && body.error === "username_taken") return "That username is taken.";
      if (status === 429) {
        var mins = Math.max(1, Math.ceil((Number(body && body.retryAfter) || 60) / 60));
        return "Too many attempts. Try again in ~" + mins + " minutes.";
      }
      if (status === 400) return (body && body.error) || "Please check your entries.";
      // 403 needsCaptcha is handled inline by the caller (renders Turnstile), not here.
      return "Something went wrong. Please try again.";
    }
  ```
- [ ] Add the modal builder inside `initSync` (it uses `ns` and `setSession`). Insert just **before** the `var api = {` line (alongside the Task 5 header functions):
  ```js
      /* ---------------- auth modal ---------------- */

      var UNAME_RE = /^[a-zA-Z0-9_-]{3,20}$/;
      var PIN_RE = /^[0-9]{6}$/;

      function openAuthModal(startTab) {
        var el = ns.el;
        var tab = startTab === "signup" ? "signup" : "signin";
        var mode = tab;                 // "signin" | "signup" | "reset"
        var tsToken = null;             // solved Turnstile token, when required/present
        var showCaptcha = false;        // signin: only after a 403

        var modalRef = ns.modal("Sync your progress", "", [], {});
        var veil = document.body.lastElementChild;
        var mbody = veil.querySelector(".mbody");

        // ---- Escape/veil guard used ONLY for the recovery handoff ----
        // window-capture fires before ns.modal's document-capture Escape handler,
        // so we can swallow Escape during the one un-dismissable state.
        var guardOn = false;
        function escGuard(e) {
          if (guardOn && e.key === "Escape") { e.stopImmediatePropagation(); e.preventDefault(); }
        }
        if (typeof window !== "undefined") window.addEventListener("keydown", escGuard, true);
        function removeGuard() {
          if (typeof window !== "undefined") window.removeEventListener("keydown", escGuard, true);
        }
        var origClose = modalRef.close;
        modalRef.close = function () { removeGuard(); origClose(); };

        function field(id, labelText, opts) {
          opts = opts || {};
          var input = el("input", Object.assign({
            id: id, type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false"
          }, opts.attrs || {}));
          if (opts.pin) {
            input.className = "pin";
            input.setAttribute("inputmode", "numeric");
            input.setAttribute("maxlength", "6");
          }
          return el("div", { class: "authfield" }, el("label", { for: id }, labelText), input);
        }

        function render() {
          mbody.innerHTML = "";
          tsToken = null;

          if (mode === "reset") return renderReset();

          var tabs = el("div", { class: "authtabs" },
            el("button", { class: mode === "signin" ? "on" : "", onclick: function () { mode = "signin"; showCaptcha = false; render(); } }, "Sign in"),
            el("button", { class: mode === "signup" ? "on" : "", onclick: function () { mode = "signup"; render(); } }, "Create account"));
          mbody.appendChild(tabs);

          mbody.appendChild(field("au-user", "Username"));
          mbody.appendChild(field("au-pin", "6-digit PIN", { pin: true }));
          if (mode === "signup") mbody.appendChild(field("au-pin2", "Confirm PIN", { pin: true }));

          var err = el("p", { class: "autherr" }, "");
          var tsBox = el("div", { class: "ts-container" });
          // signup always shows Turnstile; signin only after a 403
          if (mode === "signup" || showCaptcha) {
            if (mode === "signin") err.textContent = "Quick check — please verify below and try again.";
            mountTurnstile(tsBox, function (tok) { tsToken = tok; });
          }

          var submit = el("button", { class: "btn wide", onclick: function () { onSubmit(err); } },
            mode === "signup" ? "Create account" : "Sign in");

          mbody.appendChild(err);
          mbody.appendChild(tsBox);
          mbody.appendChild(submit);

          if (mode === "signin") {
            mbody.appendChild(el("button", {
              class: "linkish authlink", onclick: function () { mode = "reset"; render(); }
            }, "Forgot PIN?"));
          }
          focusFirst();
        }

        function renderReset() {
          mbody.appendChild(el("h4", { style: "margin-top:0" }, "Reset your PIN"));
          mbody.appendChild(field("au-user", "Username"));
          var rc = field("au-rc", "Recovery code");
          rc.querySelector("input").style.fontFamily = "var(--font-mono)";
          rc.querySelector("input").addEventListener("input", function (e) {
            e.target.value = e.target.value.toUpperCase();
          });
          mbody.appendChild(rc);
          mbody.appendChild(field("au-pin", "New 6-digit PIN", { pin: true }));
          mbody.appendChild(field("au-pin2", "Confirm PIN", { pin: true }));
          var err = el("p", { class: "autherr" }, "");
          var tsBox = el("div", { class: "ts-container" });
          mountTurnstile(tsBox, function (tok) { tsToken = tok; }); // reset always needs Turnstile
          mbody.appendChild(err);
          mbody.appendChild(tsBox);
          mbody.appendChild(el("button", { class: "btn wide", onclick: function () { onReset(err); } }, "Reset PIN"));
          mbody.appendChild(el("button", { class: "linkish authlink", onclick: function () { mode = "signin"; render(); } }, "Back to sign in"));
          focusFirst();
        }

        function val(id) { var n = document.getElementById(id); return n ? n.value.trim() : ""; }
        function focusFirst() { var f = mbody.querySelector("input"); if (f) f.focus(); }

        function onSubmit(err) {
          var u = val("au-user"), pin = val("au-pin");
          if (!UNAME_RE.test(u)) { err.textContent = "Username must be 3-20 letters, numbers, _ or -."; return; }
          if (!PIN_RE.test(pin)) { err.textContent = "PIN must be exactly 6 digits."; return; }
          if (mode === "signup") {
            if (pin !== val("au-pin2")) { err.textContent = "PINs don't match."; return; }
            if (!tsToken) { err.textContent = "Please complete the verification."; return; }
            err.textContent = "";
            apiSignup({ username: u, pin: pin, turnstile: tsToken }).then(function (r) {
              if (r.status === 200) { showRecovery(r.body.token, r.body.username, r.body.recoveryCode); return; }
              handleAuthFail(r, err, "signup");
            });
          } else {
            if (showCaptcha && !tsToken) { err.textContent = "Please complete the verification."; return; }
            err.textContent = "";
            var payload = { username: u, pin: pin };
            if (tsToken) payload.turnstile = tsToken;
            apiLogin(payload).then(function (r) {
              if (r.status === 200) { modalRef.close(); setSession({ token: r.body.token, username: r.body.username }); return; }
              handleAuthFail(r, err, "signin");
            });
          }
        }

        function onReset(err) {
          var u = val("au-user"), rc = val("au-rc"), pin = val("au-pin");
          if (!UNAME_RE.test(u)) { err.textContent = "Enter your username."; return; }
          if (!rc) { err.textContent = "Enter your recovery code."; return; }
          if (!PIN_RE.test(pin)) { err.textContent = "New PIN must be exactly 6 digits."; return; }
          if (pin !== val("au-pin2")) { err.textContent = "PINs don't match."; return; }
          if (!tsToken) { err.textContent = "Please complete the verification."; return; }
          err.textContent = "";
          apiResetPin({ username: u, recoveryCode: rc, newPin: pin, turnstile: tsToken }).then(function (r) {
            if (r.status === 200) { showRecovery(r.body.token, r.body.username, r.body.recoveryCode); return; }
            handleAuthFail(r, err, "reset");
          });
        }

        function handleAuthFail(r, err, ctx) {
          if (r.status === 403 && r.body && r.body.needsCaptcha) {
            // signin: turn the captcha on and re-render so the user can verify + retry
            if (mode === "signin") { showCaptcha = true; render(); return; }
            err.textContent = "Quick check — please verify below and try again.";
            return;
          }
          err.textContent = authErrorMessage(r.status, r.body);
        }

        // ---- recovery-code handoff (signup + reset success) ----
        function showRecovery(token, username, code) {
          guardOn = true;                     // Escape/veil disabled for this state
          mbody.innerHTML = "";
          mbody.appendChild(el("p", {}, "Your account is ready. Save this recovery code:"));
          mbody.appendChild(el("div", { class: "recovery-code" }, code));
          mbody.appendChild(el("p", { class: "recovery-warn" },
            "This is the only way to recover your account if you forget your PIN. It will never be shown again."));

          var copyBtn = el("button", { class: "btn secondary wide", onclick: function () {
            if (navigator.clipboard) navigator.clipboard.writeText(code).then(function () { copyBtn.textContent = "Copied"; }, function () {});
            else copyBtn.textContent = code;
          } }, "Copy code");
          mbody.appendChild(copyBtn);

          mbody.appendChild(el("button", { class: "btn wide", style: "margin-top:10px", onclick: function () {
            guardOn = false;
            modalRef.close();
            setSession({ token: token, username: username });
          } }, "I've saved my code"));
        }

        render();
      }
  ```
  Then reassign the `api.openAuthModal` no-op from Task 4 to the real function — replace the `openAuthModal: function () {},` line inside the `var api = {` block with:
  ```js
        openAuthModal: openAuthModal,
  ```
- [ ] Re-run merge tests to confirm the file still loads/parses (auth code is inert under Node — `initSync` isn't called, `window`/`document` untouched at module load):
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  node -e "require('./js/sync.js'); console.log('loads ok')" && node --test test/sync-merge.test.mjs
  ```
  Expected: `loads ok` then `# pass 10`, `# fail 0`.
- [ ] Commit:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  git add js/sync.js
  git commit -m "Add auth modal: sign in/up, reset, lazy Turnstile, recovery handoff, error copy"
  ```

---

## Task 7 — GRE E2E + deploy (controller-assisted)

**Goal:** prove the whole thing against the local worker (Task 1 must be running), then the controller deploys and smoke-tests production.

### Interfaces
- **Consumes:** everything from Tasks 1–6. GRE app served on `http://localhost:8420` (`start.bat`); local worker on `http://localhost:8787`.

### Steps (implementer runs the manual E2E; do NOT push)

- [ ] Ensure Task 1's `wrangler dev` is running and `start.bat` serves the GRE app:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE && cmd //c start.bat
  ```
  Open `http://localhost:8420` (Chrome, DevTools → Network tab open).
- [ ] **Anonymous zero-requests:** with no account, navigate Dashboard → Course → Tutor → History. Confirm the Network tab shows **zero** requests to `localhost:8787`. (PASS criterion for the anonymous invariant.)
- [ ] **Signup + recovery handoff:** click "Sign in to sync" → Create account tab. Enter username `gretest1`, PIN `481902`, confirm `481902`. Turnstile auto-solves (test key). Submit. Expect: modal body replaced with a large mono recovery code, Copy button, and "I've saved my code" as the only button. Press **Escape** and click the veil — confirm the modal does **not** close. Click **Copy** (button reads "Copied"). Click "I've saved my code" → modal closes, header pill shows green dot + `gretest1`.
- [ ] **Partial exam sync:** start the course / answer a couple of module-quiz questions (creates `course`/`missed` data), or start and pause a mock. Within ~3s of a save, the pill flips amber (*Syncing…*) then green (*Synced*). In the Network tab confirm a `GET /progress?app=gre` then a `PUT /progress?app=gre` returning 200.
- [ ] **Second-profile sign-in (cross-device):** open a second Chrome profile (or incognito) at `http://localhost:8420`. Sign in as `gretest1` / `481902`. Expect the progress from the first profile to appear (missed deck / course progress present). This exercises the server-only→pull path.
- [ ] **Wrong PIN ×5 → captcha:** sign out (or use a fresh profile). Attempt sign-in as `gretest1` with wrong PIN `999998` repeatedly. On the attempt after the IP crosses 4 failures, the server returns `403 needsCaptcha`; confirm the Turnstile widget appears inline with "Quick check — please verify below and try again." Solve (auto) and retry with the correct PIN → signs in.
- [ ] **Offline → grey dot → reconnect:** with the account signed in, in DevTools set Network to **Offline**. Trigger a save (answer a question). Confirm the pill goes grey (*Offline*) and no data is lost. Set Network back to **Online** (or toggle, firing the `online` event) → pill returns to green after a successful cycle.
- [ ] **Reset PIN kills other session (optional but recommended):** in profile A, Forgot PIN → reset `gretest1` with the recovery code and new PIN `240813`. Confirm a **new** recovery code is shown with the same handoff. Then in profile B (old session), trigger a sync → expect a `401`, header drops to signed-out with "Session expired — sign in again".
- [ ] Record the checklist result (pass/fail per item) in the task's completion note. **Do not push.**

### Controller steps (marked **[CONTROLLER]**)

- [ ] **[CONTROLLER]** Push GRE to deploy via Pages:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/GRE
  git push
  ```
- [ ] **[CONTROLLER]** Production smoke: open `https://mofchris.github.io/gre-mock-exam-simulator/`, sign up a real throwaway account (real Turnstile widget must render and pass on hostname `mofchris.github.io`), confirm the recovery handoff, make a little progress, confirm `GET`/`PUT` to `https://study-sync.mofchris.workers.dev` succeed (200), and confirm anonymous browsing (signed out) makes zero worker requests.

---

## Task 8 — Network+ port (repo: `network-plus-mock-exam`)

**Repo:** `C:/Users/mofch/OneDrive/Desktop/network-plus-mock-exam`
**Goal:** copy `js/sync.js` **verbatim** from GRE (drift check must pass), apply the five touches with NP's real code, copy the test, run it, run an E2E subset. Controller pushes.

### Interfaces
- **Consumes:** the final GRE `js/sync.js` and `test/sync-merge.test.mjs` (Tasks 2–6 must be final). NP internals: `NP` namespace, `NP.modal(title, bodyHTML, buttons, opts)` (note: NP's modal has **no** `opts.large`, sets `aria-label` to the raw `title`, and its focus-trap query omits `summary`; the auth code uses none of those differences, so byte-identical `sync.js` works unchanged), `NP.chrome` (lines 218–237), `Store` (lines 9–26), boot (lines 813–814).

### Steps

- [ ] Copy `sync.js` verbatim:
  ```
  cp "C:/Users/mofch/OneDrive/Desktop/GRE/js/sync.js" "C:/Users/mofch/OneDrive/Desktop/network-plus-mock-exam/js/sync.js"
  ```
- [ ] **Drift check — must report identical:**
  ```
  git -C "C:/Users/mofch/OneDrive/Desktop/GRE" --no-pager diff --no-index -- \
    "C:/Users/mofch/OneDrive/Desktop/GRE/js/sync.js" \
    "C:/Users/mofch/OneDrive/Desktop/network-plus-mock-exam/js/sync.js"
  ```
  Expected: **no output** (exit 0 = files identical). (Windows alternative: `fc /b` between the two paths → "no differences encountered".)
- [ ] Add the `<script>` tag to NP `index.html`. Current app block (lines 27–34):
  ```html
  <!-- App -->
  <script src="js/scoring.js"></script>
  <script src="js/pbq.js"></script>
  <script src="js/exam.js"></script>
  <script src="js/results.js"></script>
  <script src="js/tutor.js"></script>
  <script src="js/course.js"></script>
  <script src="js/app.js"></script>
  ```
  Replace with (`sync.js` before `app.js`):
  ```html
  <!-- App -->
  <script src="js/scoring.js"></script>
  <script src="js/pbq.js"></script>
  <script src="js/exam.js"></script>
  <script src="js/results.js"></script>
  <script src="js/tutor.js"></script>
  <script src="js/course.js"></script>
  <script src="js/sync.js"></script>
  <script src="js/app.js"></script>
  ```
- [ ] Modify NP `Store.save`. Current (lines 22–25):
  ```js
      save() {
        try { localStorage.setItem(this.key, JSON.stringify(this.data)); }
        catch (e) { /* keep running in-memory */ }
      }
  ```
  Replace with:
  ```js
      save(data, fromSync) {
        if (data) this.data = data;
        this.data._savedAt = Date.now();
        try { localStorage.setItem(this.key, JSON.stringify(this.data)); }
        catch (e) { /* keep running in-memory */ }
        if (!fromSync && NP.sync) NP.sync.onLocalSave();
      }
  ```
- [ ] Modify NP `chrome()`. Current (lines 218–237):
  ```js
    NP.chrome = function (active) {
      const el = NP.el;
      const head = el("div", { class: "tophead" },
        el("div", { class: "brandwrap" },
          el("span", { class: "logo" }, NP.icon("logo", 20)),
          el("div", { class: "names" },
            el("div", { class: "pname" }, "Network+ Simulator"),
            el("div", { class: "psub" }, "N10-009 · independent study tool"))),
        el("nav", { class: "topnav", "aria-label": "Main" },
          ...NAV.map(([label, go]) => el("button", {
            class: active === label ? "on" : "",
            "aria-current": active === label ? "page" : null,
            onclick: go
          }, label))));

      const stage = el("div", { class: "stage" });
      const inner = el("div", { class: "stage-inner screen-in" });
      stage.appendChild(inner);
      return { head, bar: head, stage, inner };
    };
  ```
  Replace with:
  ```js
    NP.chrome = function (active) {
      const el = NP.el;
      const syncMount = el("div", { class: "syncwrap" });
      const head = el("div", { class: "tophead" },
        el("div", { class: "brandwrap" },
          el("span", { class: "logo" }, NP.icon("logo", 20)),
          el("div", { class: "names" },
            el("div", { class: "pname" }, "Network+ Simulator"),
            el("div", { class: "psub" }, "N10-009 · independent study tool"))),
        el("div", { class: "topright" },
          el("nav", { class: "topnav", "aria-label": "Main" },
            ...NAV.map(([label, go]) => el("button", {
              class: active === label ? "on" : "",
              "aria-current": active === label ? "page" : null,
              onclick: go
            }, label))),
          syncMount));

      if (NP.sync) NP.sync.mountHeader(syncMount);

      const stage = el("div", { class: "stage" });
      const inner = el("div", { class: "stage-inner screen-in" });
      stage.appendChild(inner);
      return { head, bar: head, stage, inner };
    };
  ```
- [ ] Add the boot `initSync` line in NP `app.js`. Current boot (lines 811–815):
  ```js
    /* ---------------- boot ---------------- */

    NP.buildIndex();
    NP.show(NP.screens.home);
  })();
  ```
  Replace with (note `app: "netplus"`):
  ```js
    /* ---------------- boot ---------------- */

    NP.buildIndex();
    NP.sync = StudySync.initSync(NP, {
      app: "netplus",
      load: () => Store.load(),
      save: (data, fromSync) => Store.save(data, fromSync)
    });
    NP.show(NP.screens.home);
  })();
  ```
- [ ] Add the identical `/* ---- sync ---- */` CSS block to NP `css/style.css`. Paste the **exact same block** from Task 5 (it references only shared tokens — `--good`, `--amber`, `--muted`, `--bad`, `--accentsoft`, `--accent2`, `--accent-border`, `--line`, `--sub`, `--paper`, `--r-pill`, `--r-input`, `--font-mono`, `--mo-micro`, `--ease-out` — which exist in both design systems). Place it after the study-chrome / `.topnav` rules. If any referenced token is absent in NP's `:root`, add it with the same value from GRE `css/style.css` rather than inventing one.
- [ ] Copy the merge test verbatim and run it:
  ```
  cp "C:/Users/mofch/OneDrive/Desktop/GRE/test/sync-merge.test.mjs" "C:/Users/mofch/OneDrive/Desktop/network-plus-mock-exam/test/sync-merge.test.mjs"
  cd C:/Users/mofch/OneDrive/Desktop/network-plus-mock-exam
  node --test test/sync-merge.test.mjs
  ```
  Expected: `# pass 10`, `# fail 0` (the test imports `../js/sync.js`; NP's blob lacking `tutorSeen` is fine — merge tolerates absent fields).
- [ ] **E2E subset** against local worker (NP served on its own port, e.g. `http://localhost:8421`, which is in the worker's dev CORS allow-list): anonymous zero-requests; signup with recovery handoff; make progress → GET+PUT 200; **sign in with the SAME account created in GRE** (`gretest1`) in a browser profile → confirm one account covers both apps (shared `study-sync-auth` key, per-app `study-sync-meta-netplus`); offline → grey → reconnect.
- [ ] Commit:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/network-plus-mock-exam
  git add js/sync.js js/app.js css/style.css index.html test/sync-merge.test.mjs
  git commit -m "Port study-sync client to Network+: verbatim sync.js plus five app touches"
  ```
- [ ] **[CONTROLLER]** Push and smoke-test production:
  ```
  cd C:/Users/mofch/OneDrive/Desktop/network-plus-mock-exam
  git push
  ```
  Then open `https://mofchris.github.io/network-plus-mock-exam/`, sign in with the account made on the GRE production smoke test, and confirm cross-app single-account sync works on the live hostname.

---

## Appendix — spec ambiguities and resolutions

1. **Recency comparison basis.** Parent spec §7 says most-recent-device-wins compares `local._savedAt` against `server.updatedAt` (the D1 row timestamp). But `merge(local, server)` must be a **pure two-arg function** for the TDD/idempotence requirement, and threading the row timestamp in would break that. **Resolution:** compare `local._savedAt` against `server._savedAt` — both blobs carry `_savedAt` (the device write-time the §5 recency rule is actually about), so the comparison is self-contained. Missing `_savedAt` = 0 (oldest) → server wins; ties → server wins. This preserves the spec's stated safe default. If the executor prefers the literal row-timestamp reading, the engine can set `server._savedAt = server._savedAt || serverUpdatedAt` before calling `merge` — a one-line change that does not touch the pure function.

2. **`initSync` `load`/`save` binding.** Spec §3.1 illustrates the init as `{ load: Store.load, save: Store.save }`. Those are unbound methods that use `this` (`this.data`, `this.key`); passing them as bare references makes `this` resolve to the `cfg` object, silently breaking storage. **Resolution:** the boot line wraps them in arrows — `load: () => Store.load(), save: (data, fromSync) => Store.save(data, fromSync)` — preserving `Store` as the receiver. The `initSync(ns, { app, load, save })` contract is unchanged.

3. **`ns.modal` cannot disable Escape.** Spec §4.2 requires Escape/veil-click disabled during the recovery-code handoff, but the real `GRE.modal`/`NP.modal` signature has no such option and always closes on Escape (veil-click already does nothing — neither modal binds a veil click handler, so "veil-click disabled" is already true). **Resolution:** without modifying `ns.modal`, the auth code registers a **capture-phase `keydown` listener on `window`**, which fires *before* `ns.modal`'s document-capture Escape handler, and swallows Escape (`stopImmediatePropagation`) only while `guardOn` is true (the handoff state). No change to `app.js`'s modal is needed, honoring the "reuse `ns.modal`, no extra file touches" constraint.

4. **GRE blob `course` field.** The task brief lists the GRE blob as `{attempts, missed, recent, inprogress, tutorSeen, _savedAt}`, but `js/course.js` lazily adds a `course: {modules, checkpoints, read}` sub-object (line 24) that the §7 merge table explicitly governs. **Resolution:** `merge` handles `course` per §7 **and** tolerates its absence generically (the field is only merged when present in either blob), which is what the "absent-field tolerance" test asserts. Network+ (no `tutorSeen`, possibly different `course` usage) is covered by the same generic tolerance with no code difference — keeping `sync.js` byte-identical.

5. **`recent[]` cap.** §7 says "most-recent-device-wins, then cap to the existing limit," but neither blob shape documents the numeric cap. **Resolution:** take the recency winner's `recent` array as-is. Each app already caps `recent` when it writes it, so the winning array is already at the app's limit; no separate constant is introduced (which also keeps `sync.js` app-agnostic). Losing `recent` is explicitly "harmless" per the spec.
