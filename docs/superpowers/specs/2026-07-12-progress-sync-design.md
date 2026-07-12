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
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  username     TEXT NOT NULL UNIQUE,   -- stored lowercase
  pin_hash     TEXT NOT NULL,          -- PBKDF2-SHA256, hex
  pin_salt     TEXT NOT NULL,          -- 16 random bytes, hex
  recovery_hash TEXT NOT NULL,         -- same scheme, for PIN reset
  failed_count INTEGER NOT NULL DEFAULT 0,
  locked_until INTEGER NOT NULL DEFAULT 0,  -- epoch ms
  created_at   INTEGER NOT NULL
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
```

`blob` is the object the app already writes to `localStorage`, plus **one additive field**:

- `_savedAt` (epoch ms) — written by `Store.save()` on every local write.

This field is required by the recency rules in §7: without it there is no way to tell which of two diverging devices wrote last. It is **additive and backward-compatible** — an existing save that lacks `_savedAt` is treated as `0` (oldest), so the server's copy wins for the recency-based fields on first sync, which is the safe default.

No other key changes. The `localStorage` keys (`gre-sim-v1`, `netplus-sim-v1`) and every existing field keep their meaning, so **existing saves remain valid** and no destructive migration is required.

## 6. API

All responses are JSON. Auth is `Authorization: Bearer <token>`.

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/signup` | `{username, pin}` | `{token, username, recoveryCode}` |
| POST | `/login` | `{username, pin}` | `{token, username}` |
| POST | `/reset-pin` | `{username, recoveryCode, newPin}` | `{token, username}` |
| GET | `/progress?app=gre` | — | `{blob, updatedAt}` or `{blob:null}` |
| PUT | `/progress?app=gre` | `{blob, baseUpdatedAt}` | `{updatedAt}` or `409` |

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

## 9. Security

- **PIN:** 6 digits (1,000,000 combinations), PBKDF2-SHA256, 100k iterations, per-user 16-byte salt. Web Crypto is available in Workers; bcrypt is not, and PBKDF2 is the right primitive here.
- **Lockout is the real defense, not PIN length.** 5 consecutive failures locks the account for 15 minutes, escalating on repeat. Without this, 1M combinations is still brute-forceable; with it, it is not.
- **Timing:** login compares hashes in constant time and returns the same generic error for "no such user" and "wrong PIN", so usernames cannot be enumerated by response.
- **CORS:** `Access-Control-Allow-Origin` restricted to `https://mofchris.github.io`. (Localhost added only during development.)
- **Token:** 32 random bytes, 90-day expiry, stored opaque in D1 so it can be revoked.
- **No PII.** No email, no name field. The signup copy tells users plainly: do not use a real name, and do not reuse a PIN from anything that matters.

**Known limitation, accepted:** if the D1 database is ever dumped, a 6-digit PIN space is small enough to crack offline regardless of hashing. The mitigation is that the data at stake is study progress, and no reused-password risk is introduced *provided* users heed the "don't reuse a PIN" warning. This is the honest cost of a numeric PIN, and it is why the copy matters.

## 10. Error handling

| Case | Behavior |
|---|---|
| Worker unreachable / offline | App works normally on `localStorage`. Status shows `Offline`. Retry on next load or `online` event. |
| 409 on PUT | Re-fetch, re-merge, retry (max 3). Then give up and mark dirty. |
| 401 (expired token) | Clear token, drop to signed-out. Local progress untouched. |
| Locked account | Show remaining lockout time. |
| Corrupt server blob | Ignore it, keep local, log. Never let a bad server response destroy local progress. |

The invariant across all of these: **a network or server failure must never lose local progress.**

## 11. Testing

- **Merge function is pure** — `merge(local, server) → blob` — and unit-testable with no network. This is the highest-risk logic, so it gets direct tests: passed-stays-passed, best-score-wins, attempts-union-dedupe, missed-deck-recency, empty/missing/corrupt inputs.
- **Worker:** signup → login → wrong PIN → lockout → reset via recovery code; PUT conflict returns 409 and the retry converges.
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
