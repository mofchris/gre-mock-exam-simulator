# Design: account login and cross-device progress sync

**Date:** 2026-07-12
**Status:** Approved, ready for implementation planning
**Applies to:** `GRE/` (gre-mock-exam-simulator) and `network-plus-mock-exam/`, plus a new backend service.

---

## 1. Problem

Both simulators store all progress in `localStorage`. That means:

- Progress is trapped in one browser on one device. The same person on a laptop and a phone has two unrelated states.
- Clearing "Cookies and other site data" destroys it. Because both apps are served from the same origin (`mofchris.github.io`), one such action wipes **both** apps at once.
- There is no way to recover progress once it is gone.

We want progress to follow a person across devices, without giving up the things that make these apps good: no build step, no framework, and full offline operation.

## 2. Goals

- A person can sign in on any device and see the same progress.
- One account covers **both** simulators.
- Anonymous use keeps working exactly as it does today, with no network calls.
- Merging two devices never silently destroys work the user actually did.

## 3. Non-goals

- Email, password reset by email, or any PII collection.
- Social login, teams, sharing, or leaderboards.
- Server-side scoring or answer validation. The client remains the source of truth for grading; the server only stores an opaque progress blob.
- Real-time/live sync between two simultaneously open devices.

## 4. Architecture

The static apps remain the system of record for the *working session*. Sync is a layer on top.

```
  Browser (GitHub Pages, static)                 Cloudflare
  ┌───────────────────────────────┐              ┌──────────────────────┐
  │  GRE app  /  Network+ app     │              │  Worker (1 JS file)  │
  │                               │   HTTPS      │   /signup /login     │
  │  localStorage  ◄── working ──►│ ───────────► │   /progress GET|PUT  │
  │  (gre-sim-v1, netplus-sim-v1) │              │          │           │
  │  sync-token (shared origin)   │              │       D1 (SQLite)    │
  └───────────────────────────────┘              └──────────────────────┘
```

**`localStorage` stays the working store.** The app never blocks on the network, and a failed request never loses local data. If the Worker is unreachable, both apps behave exactly as they do today.

**Shared-origin bonus.** Both apps are served from `https://mofchris.github.io`, and `localStorage` is scoped per-origin, not per-path. The auth token is therefore visible to both apps automatically: signing in on one signs you in on the other. This is why one account can cover both simulators with no extra work.

### Backend host

Cloudflare Workers + D1, chosen because:

- One small JS file, no build step, matching the apps' zero-dependency ethos.
- The free tier (100k requests/day) far exceeds our needs; payloads are a few KB of JSON.
- **It does not sleep.** Free Supabase projects pause after ~7 days of inactivity, which for a study app used in bursts would mean sync silently failing until someone woke it.

The Worker lives in its own repo/directory (`study-sync/`), not inside either app repo, because both apps depend on it.

## 5. Data model (D1)

```sql
CREATE TABLE users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT NOT NULL UNIQUE,  -- stored lowercase
  pin_hash      TEXT NOT NULL,         -- PBKDF2-SHA256, hex
  pin_salt      TEXT NOT NULL,         -- 16 random bytes, hex
  recovery_hash TEXT NOT NULL,         -- same scheme, for PIN reset
  recovery_salt TEXT NOT NULL,         -- its own salt; never reuse the PIN's
  failed_count  INTEGER NOT NULL DEFAULT 0,
  lock_level    INTEGER NOT NULL DEFAULT 0,  -- how many times hard-locked; drives escalation
  locked_until  INTEGER NOT NULL DEFAULT 0,  -- epoch ms
  created_at    INTEGER NOT NULL
);

CREATE TABLE sessions (
  token      TEXT PRIMARY KEY,   -- 32 random bytes, hex
  user_id    INTEGER NOT NULL REFERENCES users(id),
  expires_at INTEGER NOT NULL    -- epoch ms; 90 days
);

CREATE TABLE progress (
  user_id    INTEGER NOT NULL REFERENCES users(id),
  app        TEXT NOT NULL CHECK (app IN ('gre','netplus')),
  blob       TEXT NOT NULL,      -- the JSON already stored in localStorage
  updated_at INTEGER NOT NULL,   -- epoch ms; used for optimistic concurrency
  PRIMARY KEY (user_id, app)
);

-- Per-IP failure budget (§9.3). Bucketed hourly so the row count stays bounded
-- and one attacker cannot exhaust the D1 write quota.
CREATE TABLE ip_failures (
  ip    TEXT NOT NULL,
  hour  INTEGER NOT NULL,        -- floor(epoch_ms / 3600000)
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, hour)
);

-- Per-IP signup throttle (§9.2).
CREATE TABLE ip_signups (
  ip    TEXT NOT NULL,
  hour  INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, hour)
);
```

The Turnstile threshold (4) is driven by the requesting IP's hourly failure count in `ip_failures`, not by the account; `users.failed_count` drives the hard lock (20), and `users.locked_until` holds the escalating lock. `failed_count` resets on a successful login. Rows in `ip_failures` / `ip_signups` older than 24 hours are deleted opportunistically on write.

`blob` is the object the app already writes to `localStorage`, plus **one additive field**:

- `_savedAt` (epoch ms) — written by `Store.save()` on every local write.

This field is required by the recency rules in §7: without it there is no way to tell which of two diverging devices wrote last. It is **additive and backward-compatible** — an existing save that lacks `_savedAt` is treated as `0` (oldest), so the server's copy wins for the recency-based fields on first sync, which is the safe default.

No other key changes. The `localStorage` keys (`gre-sim-v1`, `netplus-sim-v1`) and every existing field keep their meaning, so **existing saves remain valid** and no destructive migration is required.

## 6. API

All responses are JSON. Auth is `Authorization: Bearer <token>`.

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/signup` | `{username, pin, turnstile}` | `{token, username, recoveryCode}` |
| POST | `/login` | `{username, pin, turnstile?}` | `{token, username}` or `{needsCaptcha:true}` |
| POST | `/reset-pin` | `{username, recoveryCode, newPin, turnstile}` | `{token, username}` |
| GET | `/progress?app=gre` | — | `{blob, updatedAt}` or `{blob:null}` |
| PUT | `/progress?app=gre` | `{blob, baseUpdatedAt}` | `{updatedAt}` or `409` |

`turnstile` is a Turnstile token. It is **always** required on `/signup` and `/reset-pin`. On `/login` it is required only once the **requesting IP** has 4+ failed attempts in the current hour (regardless of which username those failures were against) — the server answers `403 {needsCaptcha:true}`, and the client then re-submits with a token. This keeps the happy path free of any CAPTCHA.

**Auth error codes:** `401` invalid credentials — generic, and used both for wrong credentials and for a hard-locked account (a locked account is a **silent lock**: it returns the same 401 as a wrong PIN, never a distinct status, so the lock state cannot be probed from outside; see §9). `403 {needsCaptcha:true}` challenge required. `429` IP over its failure or signup budget (with `retryAfter`). There is no `423` — `/login` never reports lock state.

### Optimistic concurrency

`PUT` carries `baseUpdatedAt`: the `updated_at` value the client merged from. If the stored row has moved on, the server returns **409 Conflict** with the current `{blob, updatedAt}`. The client re-merges against that and retries (bounded: 3 attempts). This prevents two devices from clobbering each other's writes.

`baseUpdatedAt: 0` means "I believe no server row exists" and only succeeds if that is true.

### Validation

- `username`: 3–20 chars, `[a-zA-Z0-9_-]`, compared case-insensitively, stored lowercase.
- `pin`: exactly 6 digits, `[0-9]{6}`.
- `recoveryCode`: 12 chars from an unambiguous alphabet (Crockford base32: no `I`, `L`, `O`, `U`), formatted for reading as `XXXX-XXXX-XXXX`. Generated with `crypto.getRandomValues`, hashed like the PIN, shown exactly once at signup.
- `blob`: must parse as JSON; rejected above 256 KB.

## 7. Merge algorithm (client-side)

Runs before every `PUT`. Input: `local` and `server` blobs. Output: merged blob.

Most of this data only moves forward, which is what makes merging safe.

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

"Most-recent-device-wins" compares the local blob's `_savedAt` (§5) against `server.updatedAt`. A blob with no `_savedAt` (a save made before this feature existed) counts as oldest, so the server wins — the safe default.

**Accepted trade-off:** the missed deck can lose a little data. Concretely: if you graduate a question on your phone and separately add a miss on your laptop, whichever synced last wins for the *whole deck*. This is the one place the merge is lossy, and it is deliberate — the alternative (resurrecting already-mastered questions) is worse and more confusing.

## 8. Client integration

### Sync triggers

- **On load, if signed in:** `GET` → merge → write local → `PUT` if the merge changed anything.
- **On save:** debounce ~3s, then `PUT` in the background.
- **On `online` event:** if a previous push failed, retry.

All of it is fire-and-forget. Nothing blocks the UI. A failed request sets a dirty flag and is retried later; it never discards local state.

### UI

A single control in the study header (`.tophead`), present in both apps:

- **Signed out:** a "Sign in to sync" button → modal with Sign in / Create account tabs, reusing the existing `GRE.modal` / `NP.modal` (which already have a focus trap, Escape, and `aria-modal`).
- **Signed in:** shows the username and a sync status: `Synced` / `Syncing…` / `Offline`.
- **Sign out** clears the token and local sync state but **leaves local progress intact**.

Signup shows the recovery code once, with an explicit "write this down — it's the only way to reset a forgotten PIN" and a copy button. It is never shown again.

### First sign-in migration

Existing anonymous progress is not lost. On first sign-in:

- Server has no row → local progress is uploaded as-is.
- Server has a row → the two are merged by the rules in §7.

## 9. Security and rate limiting

### 9.1 The two attacks that matter

A per-username lockout alone is **not sufficient**, for two reasons that drove this design:

1. **PIN spraying walks past lockout.** The realistic attack is not "one username, many PINs" — it is **one common PIN against thousands of usernames** (`123456`, `000000`, `010203`). Each account records a single failure and never locks. With public signup, usernames are enumerable by attempting to register them.
2. **A hard lockout is itself a DoS weapon.** If N failures locks an account, anyone who knows your username can lock you out of your own account on demand.

The defense is therefore layered, and it deliberately puts a **CAPTCHA in front of the lockout** so that the lockout cannot be weaponised.

### 9.2 Layers

| Layer | Threshold | Stops |
|---|---|---|
| **Banned-PIN list** | reject the ~200 commonest 6-digit PINs at signup/reset | Spraying **at the root**: if nobody *has* `123456`, spraying it finds nothing |
| **Turnstile (per IP)** | after **4** failed attempts in the current hour, across all usernames from that IP (same counter as the per-IP budget below) | Automated guessing. Real users pass (usually invisibly); bots stop |
| **Hard lock (per username)** | after **20** consecutive failures → 15 min, escalating (30m, 1h, … capped 24h) | A determined attacker who is somehow solving CAPTCHAs |
| **Per-IP failure budget** | **30** failed auth attempts/hour across *all* usernames → `429` for that IP for 1 hour | Spraying from a single host |
| **Signup throttle** | **3** accounts per IP per hour; Turnstile **always** required on signup | Account flooding / username enumeration at scale |
| **Constant delay** | ~400 ms on every auth request | Makes 1M guesses take months; humans never notice |
| **Generic errors** | same response for "no such user" and "wrong PIN" | Username enumeration by response |

Because Turnstile engages at 4 failures and the hard lock only at 20, an attacker must solve **16 CAPTCHAs** to lock a victim out. The lockout-as-DoS vector is priced out of existence rather than removed.

`failed_count` resets to 0 on any successful login.

### 9.3 Protecting the write budget (important)

D1's free tier allows roughly **100k writes/day**. If every failed login wrote a counter row, an attacker could exhaust the quota and **take sync down for everyone** — a self-inflicted DoS via our own rate limiter.

Therefore the order of operations on every auth request is:

1. **Read** the IP's hourly failure count (reads are cheap: ~5M/day).
2. If already over budget → return `429` **and write nothing**.
3. Only if under budget, proceed to verify and (on failure) **write** the counters.

This caps one IP at ~30 failure-writes/hour (~720/day). Rows older than 24h are deleted opportunistically on write.

### 9.4 Credentials and transport

- **PIN:** 6 digits, PBKDF2-SHA256, 100k iterations, per-user 16-byte salt. Web Crypto is available in Workers; bcrypt is not, and PBKDF2 is the correct primitive here.
- **Comparison:** constant-time. Always hash even when the user does not exist, so response timing does not leak account existence.
- **CORS:** `Access-Control-Allow-Origin` restricted to `https://mofchris.github.io` (plus `localhost` during development only).
- **Token:** 32 random bytes, 90-day expiry, stored opaque in D1 so it can be revoked.
- **No PII.** No email, no name field. Signup copy states plainly: do not use a real name, and do not reuse a PIN from anything that matters.

### 9.5 Turnstile: the one CDN exception

Turnstile requires loading `challenges.cloudflare.com/turnstile/v0/api.js`. This is a **deliberate, scoped exception** to the apps' no-CDN rule:

- It is loaded **lazily**, only when a challenge is actually required (i.e. inside the login modal after 4 failures, or on signup).
- **Anonymous users never load it**, and never make any network request at all. The offline guarantee for non-account users is unchanged.
- If the script fails to load, the request is refused rather than allowed through. Failing closed is correct here.

The site key is public (client); the secret key lives in the Worker's environment, never in the repo.

### 9.6 Accepted limitations

- **A database dump defeats the PIN.** 1,000,000 combinations is small enough to crack offline regardless of hashing. The data at stake is study progress, and the "don't reuse a PIN" warning is what prevents this becoming someone else's problem. This is the honest cost of choosing a numeric PIN over a password.
- **A distributed (botnet) attack** spreads failures across many IPs and dilutes the per-IP budget. For an app of this size this is not a credible threat, but the mitigation if it ever happened is Cloudflare's edge rate limiting — which requires putting the Worker behind a **custom domain** on Cloudflare, since WAF rules do not apply to `*.workers.dev`. Noted as a known ceiling, not built now.

## 10. Error handling

| Case | Behavior |
|---|---|
| Worker unreachable / offline | App works normally on `localStorage`. Status shows `Offline`. Retry on next load or `online` event. |
| 409 on PUT | Re-fetch, re-merge, retry (max 3). Then give up and mark dirty. |
| 401 (expired token) | Clear token, drop to signed-out. Local progress untouched. |
| Locked account | Login returns the same generic `401` as a wrong PIN (silent lock, §9) — the client shows the normal "invalid credentials" message, not a lockout timer. The user recovers via `/reset-pin` or by waiting out the window. |
| Corrupt server blob | Ignore it, keep local, log. Never let a bad server response destroy local progress. |

The invariant across all of these: **a network or server failure must never lose local progress.**

## 11. Testing

- **Merge function is pure** — `merge(local, server) → blob` — and unit-testable with no network. This is the highest-risk logic, so it gets direct tests: passed-stays-passed, best-score-wins, attempts-union-dedupe, missed-deck-recency, empty/missing/corrupt inputs.
- **Worker auth:** signup → login → wrong PIN → reset via recovery code; PUT conflict returns 409 and the retry converges.
- **Rate limiting** gets explicit adversarial tests, because a limiter that silently does nothing looks identical to one that works:
  - **Vertical brute force:** 4 failed attempts from one IP → `403 needsCaptcha` on the next attempt from that IP (any username); 20 failures on one username → the account hard-locks, but `/login` keeps returning the same generic `401` (silent lock, no `423`, no distinct `retryAfter`) even for the correct PIN.
  - **PIN spraying:** one PIN against 40 different usernames from one IP → the IP is cut off at 30 with `429`, *before* the 40th.
  - **Write-budget guard (§9.3):** once an IP is over budget, further attempts must perform **zero D1 writes**. Assert on write count, not just on the status code — this is the whole point of the read-first ordering.
  - **Banned PINs:** signup with `123456` / `000000` / `111111` is rejected.
  - **Lockout is not a DoS:** reaching the hard lock requires passing Turnstile 16 times; assert that failures without a valid token never advance `failed_count` past the Turnstile threshold.
  - **Enumeration:** login for a nonexistent user and for a real user with a wrong PIN return byte-identical bodies and comparable timing.
  - **Reset:** `failed_count` returns to 0 after a successful login.
- **End-to-end:** sign up on browser A, make progress, sign in on browser B, confirm it appears; diverge both, confirm the merge preserves the union.
- **Regression:** anonymous use makes zero network requests (verify an empty Network tab).

## 12. Rollout

1. Build and deploy the Worker + D1. Verify with `curl` before touching either app.
2. Add the sync client + UI to **one** app (Network+) and use it.
3. Port to the GRE app once proven.
4. Anonymous users are unaffected at every step.

## 13. Open risks

- **Free tier limits.** Well within them, but if either app became popular, D1 write limits are the first thing to hit.
- **Backend becomes a dependency.** The apps degrade gracefully to offline, but "sync is broken" becomes a possible user complaint where previously there was no such surface.
- **A forgotten PIN plus a lost recovery code is an unrecoverable account.** With no email, this is unavoidable; the recovery code reduces it from "certain" to "careless".
