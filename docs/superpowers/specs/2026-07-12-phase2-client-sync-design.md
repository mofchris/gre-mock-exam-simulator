# Phase 2: Client Sync + Auth UI — Design

**Parent spec:** `2026-07-12-progress-sync-design.md` (the API contract §6, merge rules §7, integration triggers §8, error table §10 are defined there and are binding). This document specifies only what Phase 2 adds: the client implementation in the two apps.

**Backend status:** Phase 1 is complete and live at `https://study-sync.mofchris.workers.dev` (repo `C:/Users/mofch/OneDrive/Desktop/study-sync`, 66/66 tests). One contract delta from the parent spec's original text, already folded into it (commit `d5b5fd0`): captcha is demanded when the requesting **IP** has 4+ failed attempts (403 `{needsCaptcha:true}`); locked accounts return the same generic **401** as any bad credential — there is no 423 from `/login`.

## 1. Goal

Add signup/login and background progress sync to the GRE simulator, then replicate in Network+. Same design language as the existing apps. Local-first: the apps must remain fully usable offline and anonymous; sync is an additive layer.

## 2. Scope

**In:** one new `js/sync.js` per app (byte-identical between repos); header sync widget; auth modal (sign in / create account / reset PIN); recovery-code handoff UX; pull-merge-push engine; local dev environment for the worker; merge unit tests; manual E2E checklist.

**Out:** any worker changes; email/password auth; multi-account switching; sync history UI; dark mode; changes to existing question-bank or exam logic.

## 3. Architecture

### 3.1 One portable file

`js/sync.js` is written once and copied into both repos **byte-identical**. Everything app-specific enters through the init call at the bottom of each app's `app.js`:

```js
GRE.sync = initSync(GRE, { app: "gre",     load: Store.load, save: Store.save });
NP.sync  = initSync(NP,  { app: "netplus", load: Store.load, save: Store.save });
```

`initSync(ns, cfg)` receives the app namespace (`GRE`/`NP`) so it can reuse `ns.modal(...)`, plus the app's own `Store.load`/`Store.save` as accessors — `Store` is closure-private inside each `app.js`, and passing its two functions keeps it that way while preserving the single-write-path invariant (`sync.js` never calls `localStorage` for progress blobs itself; `cfg.app` alone derives the meta key). `cfg.save` must not re-trigger a sync push when the write originates from the sync engine — `Store.save` gains an optional `fromSync` flag for that. `sync.js` defines a single global `StudySync` (IIFE, `"use strict"`, same style as the other modules) and, when `module.exports` exists (Node), exports its pure helpers for testing.

Replicating to Network+ is mechanical: copy `sync.js`, add one script tag, one init line, the chrome/store hooks, and the style block.

### 3.2 Environment detection (no config files)

Constants at the top of `sync.js`:

| | Production (`location.hostname === "mofchris.github.io"`) | Local dev (anything else) |
|---|---|---|
| Worker URL | `https://study-sync.mofchris.workers.dev` | `http://localhost:8787` (`wrangler dev`) |
| Turnstile site key | `0x4AAAAAAD0g5yt6l-g7L7_h` | `1x00000000000000000000AA` (Cloudflare's official always-pass test key) |

The site key is public by design; committing it is correct.

### 3.3 Storage keys (all localStorage)

| Key | Scope | Shape |
|---|---|---|
| `gre-sim-v1` / `netplus-sim-v1` | existing, unchanged shape | progress blob; gains one additive field `_savedAt` (epoch ms), stamped by `Store.save()` |
| `study-sync-auth` | **shared across both apps** (same origin on Pages) | `{ token, username }` — sign in once, signed into both apps |
| `study-sync-meta-gre` / `study-sync-meta-netplus` | per app | `{ baseUpdatedAt }` from the last successful server exchange — carries optimistic concurrency across reloads |

Sign-out deletes `study-sync-auth` and both meta keys; progress blobs are never touched.

### 3.4 Touches to existing files (per app)

1. `index.html`: one `<script src="js/sync.js">` tag (before `app.js`; `sync.js` guards the namespace like every other module — `window.GRE = window.GRE || {}`)
2. `app.js` `Store.save(data, fromSync)`: stamp `data._savedAt = Date.now()` and, unless `fromSync`, call `GRE.sync && GRE.sync.onLocalSave()` (debounced push)
3. `app.js` `chrome()`: render the sync widget into `.tophead`
4. `app.js` boot: the init call (§3.1)
5. `css/style.css`: one `/* ---- sync ---- */` block using existing tokens only

No other file changes. `sync.js` owns all auth/sync logic; no thresholds, URLs, or merge rules may appear in `app.js`.

## 4. UI

### 4.1 Header widget (right side of `.tophead`)

- **Signed out:** `.btn .soft` button — "Sign in to sync"
- **Signed in:** compact pill: status dot + username. Dot states: green *Synced* / pulsing amber *Syncing…* / grey *Offline* / red *Error* (tooltip carries detail). Clicking opens a small account modal: username, last-synced time, **Sign out** button
- **Session expired:** signed-out button plus a one-line note in the account modal area ("Session expired — sign in again"); shown once, cleared on next sign-in

### 4.2 Auth modal (reuses `ns.modal` — focus trap, Escape, `aria-modal` come free)

Tabs: **Sign in** | **Create account**, plus a "Forgot PIN?" link on the sign-in tab.

- **Sign in:** username; 6-digit PIN (`inputmode="numeric"`, `maxlength="6"`, `--font-mono`, autocomplete off). Turnstile container is empty until the server answers 403 `{needsCaptcha:true}` — then the widget renders and the user retries. The Turnstile `api.js` script is **lazy-loaded the first time any flow needs it, never for anonymous browsing** (parent spec §9.5)
- **Create account:** username, PIN, confirm PIN, Turnstile (always — signup requires it). Client-side pre-validation mirrors the server (username `[a-zA-Z0-9_-]{3,20}`, PIN `[0-9]{6}`) for instant feedback; the server remains authoritative
- **Recovery code handoff (signup success):** the modal body is replaced with the one-time code — large, `--font-mono`, letter-spaced — with a **Copy** button and the sentence "This is the only way to recover your account if you forget your PIN. It will never be shown again." The only close affordance is a button labeled **"I've saved my code"**; Escape/veil-click are disabled for this one state
- **Reset PIN:** username, recovery code (mono input, auto-uppercase), new PIN, confirm, Turnstile. Success shows the **new** recovery code with the same handoff treatment (the worker rotates it and invalidates all old sessions)

### 4.3 Error copy (client-side mapping)

| Server response | Modal message |
|---|---|
| 401 | "Wrong username or PIN." (never distinguishes which) |
| 400 banned PIN | Server's message verbatim ("That PIN is too easy to guess…") |
| 403 needsCaptcha | Render Turnstile inline: "Quick check — please verify below and try again." |
| 409 username_taken | "That username is taken." |
| 429 | "Too many attempts. Try again in ~N minutes." (from `retryAfter`) |
| Network failure | "Can't reach the sync server. Check your connection." |

## 5. Sync engine

State machine per app: `idle → syncing → (idle | offline | error)`, driving the header dot.

**Triggers** (parent spec §8): app boot when signed in; 3s-debounced after `Store.save()`; the `online` window event.

**Cycle:**
1. `GET /progress?app=X`
2. Server empty (`blob:null`) → `PUT` local blob with `baseUpdatedAt:0`
3. Server has data → `merged = merge(local, server)` per parent spec §7 (pure function, per-field union/max/most-recent rules)
4. If `merged ≠ local` → write locally via `Store` (single write path preserved)
5. If `merged ≠ server` → `PUT {blob: merged, baseUpdatedAt}` → on 200 store the new `updatedAt` as base
6. **409** → response carries current server state → re-merge, retry; max 3 attempts per cycle, then status *Error* (next trigger starts a fresh cycle)
7. **401** → clear token + meta keys, flip header to signed-out with session-expired note
8. Fetch/network error → status *Offline*, dirty flag stays set, retried on next trigger

**First sign-in migration** (parent spec §8): local-only → push; server-only → pull and replace local; both → merge (nothing is ever deleted; merge only unions/maxes).

**Anonymous invariant:** signed out ⇒ zero requests to the worker. Enforced structurally: every network call sits behind a token check.

## 6. Local dev environment

- `study-sync/.dev.vars` (git-ignored, already in `.gitignore`): `ENVIRONMENT=dev` and `TURNSTILE_SECRET=1x0000000000000000000000000000000AA` (Cloudflare's official always-pass test secret)
- Apply schema to local D1 once: `npx wrangler d1 execute study-sync --local --file=./schema.sql`
- `npx wrangler dev` → :8787 with localhost:8420/:8421 CORS allowed (dev mode is already implemented in the worker)
- Full E2E — signup, captcha, lockouts, sync — works locally against the local worker without touching production data

## 7. Testing

- **Unit (new):** `test/sync-merge.test.mjs` in each app repo, run with `node --test` — covers `merge()` per-field rules, first-sign-in migration matrix (local-only / server-only / both), and idempotence (`merge(a, merge(a,b)) === merge(a,b)` field-wise). No new dependencies
- **Manual E2E checklist** (will be enumerated in the plan): signup on browser A → recovery-code handoff → partial exam → browser B sign-in → progress present; wrong PIN ×5 → captcha appears; reset PIN → old session dead on other browser; offline mode → grey dot → reconnect syncs; **anonymous → DevTools network tab shows zero worker requests**
- Worker untouched; its 66-test suite is the API's regression net

## 8. Rollout

1. GRE first: build, prove E2E locally, deploy to Pages, prove on production
2. Network+: copy `sync.js` verbatim + the five touches (§3.4), same E2E pass
3. A `diff` of the two `sync.js` copies must be empty — that is the drift check, and the plan will encode it as a verification step

(The parent spec's §12 suggested Network+ first; the user chose GRE first — user decision governs.)

## 9. Risks

- **Turnstile on GitHub Pages subpaths:** the widget is registered for hostname `mofchris.github.io`, which covers both `/gre-mock-exam-simulator/` and `/network-plus-mock-exam/` paths — hostnames, not paths, are what Turnstile validates
- **`localhost` not registered with Turnstile** (dashboard rejects it): irrelevant — local dev uses the test key pair, which passes on any hostname
- **Shared token, per-app base:** signing out in one app signs out both (shared key). Accepted: it matches the "one account, both apps" mental model
- **Clock skew:** `_savedAt` is client-stamped and used only for most-recent-wins on scalar fields; a skewed clock degrades to "other device wins", never data loss (union/max fields are unaffected)
