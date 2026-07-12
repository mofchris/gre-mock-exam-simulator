# Progress Sync Worker — Implementation Plan (Phase 1 of 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the Cloudflare Worker + D1 backend that stores per-account progress for the GRE and Network+ simulators, with username/6-digit-PIN auth and layered brute-force defenses — proven end-to-end with `curl` before any app touches it.

**Architecture:** One Worker (ES module) routes 5 endpoints against a D1 (SQLite) database with 5 tables. Auth is username + 6-digit PIN, hashed with PBKDF2-SHA256. Brute-force defense is layered: banned-PIN list → Turnstile at 4 failures → hard lock at 20 → per-IP hourly budget. The per-IP check **reads before writing** so an attacker cannot exhaust D1's free write quota and take sync down for everyone.

**Tech Stack:** Cloudflare Workers (ES modules), D1, Web Crypto (PBKDF2), Cloudflare Turnstile, Vitest + `@cloudflare/vitest-pool-workers` (real D1 bindings in tests), wrangler 4.

**Source spec:** `GRE/docs/superpowers/specs/2026-07-12-progress-sync-design.md`

## Global Constraints

- The Worker is a **separate repo** (`study-sync/`), not inside either app repo — both apps depend on it.
- **Secrets never enter the repo or the chat transcript.** `TURNSTILE_SECRET` is set only via `wrangler secret put`.
- **Generic auth errors.** "No such user" and "wrong PIN" must return byte-identical bodies. Always hash, even when the user does not exist, so timing does not leak account existence.
- **Read before write on every auth request.** If an IP is over its failure budget, return `429` having performed **zero D1 writes** (spec §9.3).
- **CORS:** `Access-Control-Allow-Origin` is exactly `https://mofchris.github.io` in production; `http://localhost:8420` and `http://localhost:8421` allowed only when `ENVIRONMENT = "dev"`.
- **PIN:** exactly `[0-9]{6}`. **Username:** 3–20 chars `[a-zA-Z0-9_-]`, stored lowercase, compared case-insensitively.
- **Thresholds (exact):** Turnstile at **4** consecutive failures; hard lock at **20** (15m, doubling, capped 24h); per-IP **30** failed auth/hour; per-IP **3** signups/hour; constant **400 ms** delay on every auth response.
- Epoch times are **milliseconds** (integers) throughout.
- TDD: write the failing test, watch it fail, implement, watch it pass, commit.

---

## File Structure

```
study-sync/
├── wrangler.toml          # Worker + D1 binding + vars
├── package.json           # devDeps only: vitest, pool-workers, wrangler
├── vitest.config.js       # wires tests to real D1 via miniflare
├── schema.sql             # single source of truth for the D1 schema
├── src/
│   ├── worker.js          # entry: router + CORS + 400ms delay. No business logic.
│   ├── validate.js        # pure: username/PIN/blob validation + banned-PIN rules
│   ├── crypto.js          # pure-ish: PBKDF2 hash/verify, token + recovery-code generation
│   ├── limits.js          # rate limiting: IP budget, lockout, Turnstile verify
│   ├── auth.js            # /signup /login /reset-pin handlers
│   └── progress.js        # /progress GET+PUT handlers, optimistic concurrency
└── test/
    ├── helpers.js         # applySchema(env), makeReq(), seedUser()
    ├── validate.test.js
    ├── crypto.test.js
    ├── limits.test.js
    ├── auth.test.js
    └── progress.test.js
```

**Responsibility boundaries:** `validate.js` and `crypto.js` are pure and have no D1 dependency, so they test fast and in isolation. `limits.js` owns *every* rate-limiting decision — no threshold logic leaks into `auth.js`. `worker.js` is routing and CORS only; if business logic appears there, it is in the wrong file.

---

### Task 1: Scaffold the repo, create D1, deploy a health endpoint

**Prerequisite:** `npx wrangler login` has been run by the user and `npx wrangler whoami` succeeds.

**Files:**
- Create: `study-sync/package.json`
- Create: `study-sync/wrangler.toml`
- Create: `study-sync/schema.sql`
- Create: `study-sync/src/worker.js`
- Create: `study-sync/.gitignore`

- [ ] **Step 1: Create the project directory and package.json**

```bash
mkdir -p "C:/Users/mofch/OneDrive/Desktop/study-sync/src" "C:/Users/mofch/OneDrive/Desktop/study-sync/test"
cd "C:/Users/mofch/OneDrive/Desktop/study-sync"
```

`package.json`:

```json
{
  "name": "study-sync",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  },
  "devDependencies": {
    "@cloudflare/vitest-pool-workers": "^0.5.0",
    "vitest": "^2.1.0",
    "wrangler": "^4.0.0"
  }
}
```

`.gitignore`:

```
node_modules/
.wrangler/
.dev.vars
```

- [ ] **Step 2: Write the schema**

`schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT    NOT NULL UNIQUE,
  pin_hash      TEXT    NOT NULL,
  pin_salt      TEXT    NOT NULL,
  recovery_hash TEXT    NOT NULL,
  recovery_salt TEXT    NOT NULL,
  failed_count  INTEGER NOT NULL DEFAULT 0,
  lock_level    INTEGER NOT NULL DEFAULT 0,
  locked_until  INTEGER NOT NULL DEFAULT 0,
  created_at    INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT    PRIMARY KEY,
  user_id    INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS progress (
  user_id    INTEGER NOT NULL,
  app        TEXT    NOT NULL CHECK (app IN ('gre','netplus')),
  blob       TEXT    NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, app)
);

CREATE TABLE IF NOT EXISTS ip_failures (
  ip    TEXT    NOT NULL,
  hour  INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, hour)
);

CREATE TABLE IF NOT EXISTS ip_signups (
  ip    TEXT    NOT NULL,
  hour  INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, hour)
);
```

`lock_level` tracks how many times the account has been hard-locked, so the lock duration can escalate (15m → 30m → 1h … capped 24h).

- [ ] **Step 3: Create the D1 database**

```bash
cd "C:/Users/mofch/OneDrive/Desktop/study-sync"
npx wrangler d1 create study-sync
```

Expected: prints a `database_id`. **Copy it into `wrangler.toml` below.**

- [ ] **Step 4: Write wrangler.toml**

`wrangler.toml` (paste the real `database_id` from Step 3):

```toml
name = "study-sync"
main = "src/worker.js"
compatibility_date = "2025-01-01"

[vars]
ALLOWED_ORIGIN = "https://mofchris.github.io"
ENVIRONMENT = "production"

[[d1_databases]]
binding = "DB"
database_name = "study-sync"
database_id = "PASTE_DATABASE_ID_FROM_STEP_3"
```

`TURNSTILE_SECRET` is deliberately **not** here. It is set in Task 7 via `wrangler secret put`.

- [ ] **Step 5: Apply the schema to the remote database**

```bash
npx wrangler d1 execute study-sync --remote --file=./schema.sql
```

Expected: reports the statements executed. Verify:

```bash
npx wrangler d1 execute study-sync --remote --command="SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
```

Expected: `ip_failures`, `ip_signups`, `progress`, `sessions`, `users`.

- [ ] **Step 6: Write a minimal worker with a health endpoint**

`src/worker.js`:

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "content-type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "not_found" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
};
```

- [ ] **Step 7: Deploy and verify with curl**

```bash
npx wrangler deploy
```

Expected: prints a URL like `https://study-sync.<subdomain>.workers.dev`. Then:

```bash
curl -s https://study-sync.<subdomain>.workers.dev/health
```

Expected: `{"ok":true}`

**Record the deployed URL** — every later curl step and both apps use it.

- [ ] **Step 8: Commit**

```bash
cd "C:/Users/mofch/OneDrive/Desktop/study-sync"
git init -b main
git add -A
git commit -m "Scaffold sync worker: D1 schema, wrangler config, health endpoint"
gh repo create study-sync --private --source=. --remote=origin --push
```

---

### Task 2: Validation and banned-PIN rules (pure)

**Files:**
- Create: `study-sync/src/validate.js`
- Test: `study-sync/test/validate.test.js`
- Create: `study-sync/vitest.config.js`

**Interfaces:**
- Produces: `validateUsername(s) -> {ok:true, value:string} | {ok:false, error:string}`; `validatePin(s) -> {ok, error?}`; `isBannedPin(s) -> boolean`; `validateBlob(s) -> {ok, error?}`

- [ ] **Step 1: Write vitest config**

`vitest.config.js`:

```js
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: "./wrangler.toml" },
        miniflare: { d1Databases: ["DB"] }
      }
    }
  }
});
```

```bash
npm install
```

- [ ] **Step 2: Write the failing test**

`test/validate.test.js`:

```js
import { describe, it, expect } from "vitest";
import { validateUsername, validatePin, isBannedPin, validateBlob } from "../src/validate.js";

describe("validateUsername", () => {
  it("accepts and lowercases a valid name", () => {
    expect(validateUsername("MofChris_1")).toEqual({ ok: true, value: "mofchris_1" });
  });
  it("rejects too short, too long, and bad characters", () => {
    expect(validateUsername("ab").ok).toBe(false);
    expect(validateUsername("a".repeat(21)).ok).toBe(false);
    expect(validateUsername("has space").ok).toBe(false);
    expect(validateUsername("bad!char").ok).toBe(false);
  });
  it("rejects non-strings", () => {
    expect(validateUsername(null).ok).toBe(false);
    expect(validateUsername(123456).ok).toBe(false);
  });
});

describe("validatePin", () => {
  it("accepts exactly 6 digits", () => {
    expect(validatePin("482913").ok).toBe(true);
  });
  it("rejects wrong length or non-digits", () => {
    expect(validatePin("12345").ok).toBe(false);
    expect(validatePin("1234567").ok).toBe(false);
    expect(validatePin("12a456").ok).toBe(false);
    expect(validatePin("").ok).toBe(false);
    expect(validatePin(482913).ok).toBe(false);
  });
});

describe("isBannedPin", () => {
  it("bans all-same digits", () => {
    expect(isBannedPin("000000")).toBe(true);
    expect(isBannedPin("111111")).toBe(true);
  });
  it("bans ascending and descending runs", () => {
    expect(isBannedPin("123456")).toBe(true);
    expect(isBannedPin("654321")).toBe(true);
    expect(isBannedPin("456789")).toBe(true);
  });
  it("bans repeated 2- and 3-digit patterns", () => {
    expect(isBannedPin("121212")).toBe(true); // ababab
    expect(isBannedPin("123123")).toBe(true); // abcabc
  });
  it("bans known-common leaked pins", () => {
    expect(isBannedPin("696969")).toBe(true);
    expect(isBannedPin("112233")).toBe(true);
  });
  it("allows a normal pin", () => {
    expect(isBannedPin("482913")).toBe(false);
    expect(isBannedPin("930517")).toBe(false);
  });
});

describe("validateBlob", () => {
  it("accepts valid JSON", () => {
    expect(validateBlob('{"a":1}').ok).toBe(true);
  });
  it("rejects invalid JSON", () => {
    expect(validateBlob("{not json").ok).toBe(false);
  });
  it("rejects blobs over 256KB", () => {
    expect(validateBlob('{"x":"' + "a".repeat(300 * 1024) + '"}').ok).toBe(false);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run test/validate.test.js`
Expected: FAIL — cannot resolve `../src/validate.js`.

- [ ] **Step 4: Implement**

`src/validate.js`:

```js
const USERNAME_RE = /^[a-zA-Z0-9_-]{3,20}$/;
const PIN_RE = /^[0-9]{6}$/;
const MAX_BLOB_BYTES = 256 * 1024;

// Known-common 6-digit PINs that the structural rules below do not already catch.
const BANNED_LIST = new Set([
  "696969", "112233", "123321", "159753", "147258", "789456", "252525",
  "010203", "131313", "142536", "212121", "999999", "121314", "102030",
  "777777", "123654", "654123", "135790", "246810", "888888"
]);

export function isBannedPin(pin) {
  if (!PIN_RE.test(pin)) return false; // shape is validatePin's job
  if (BANNED_LIST.has(pin)) return true;

  const d = pin.split("").map(Number);

  // all the same digit: 000000, 111111, ...
  if (d.every(x => x === d[0])) return true;

  // strictly ascending or descending run (mod 10 so 567890 counts)
  const asc = d.every((x, i) => i === 0 || x === (d[i - 1] + 1) % 10);
  const desc = d.every((x, i) => i === 0 || x === (d[i - 1] + 9) % 10);
  if (asc || desc) return true;

  // repeated 2-digit pattern: ababab
  if (pin.slice(0, 2) === pin.slice(2, 4) && pin.slice(2, 4) === pin.slice(4, 6)) return true;

  // repeated 3-digit pattern: abcabc
  if (pin.slice(0, 3) === pin.slice(3, 6)) return true;

  return false;
}

export function validateUsername(s) {
  if (typeof s !== "string" || !USERNAME_RE.test(s)) {
    return { ok: false, error: "username must be 3-20 characters: letters, numbers, _ or -" };
  }
  return { ok: true, value: s.toLowerCase() };
}

export function validatePin(s) {
  if (typeof s !== "string" || !PIN_RE.test(s)) {
    return { ok: false, error: "PIN must be exactly 6 digits" };
  }
  if (isBannedPin(s)) {
    return { ok: false, error: "That PIN is too easy to guess. Avoid repeats, runs and patterns." };
  }
  return { ok: true };
}

export function validateBlob(s) {
  if (typeof s !== "string") return { ok: false, error: "blob must be a JSON string" };
  if (new TextEncoder().encode(s).length > MAX_BLOB_BYTES) {
    return { ok: false, error: "blob too large" };
  }
  try { JSON.parse(s); } catch { return { ok: false, error: "blob is not valid JSON" }; }
  return { ok: true };
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run test/validate.test.js`
Expected: PASS, all assertions green.

- [ ] **Step 6: Commit**

```bash
git add package.json vitest.config.js src/validate.js test/validate.test.js
git commit -m "Add username/PIN/blob validation and banned-PIN rules"
```

---

### Task 3: PBKDF2 hashing, tokens, recovery codes

**Files:**
- Create: `study-sync/src/crypto.js`
- Test: `study-sync/test/crypto.test.js`

**Interfaces:**
- Produces: `hashSecret(secret) -> Promise<{hash:string, salt:string}>` (hex); `verifySecret(secret, hash, salt) -> Promise<boolean>` (constant-time); `newToken() -> string` (64 hex chars); `newRecoveryCode() -> string` (`XXXX-XXXX-XXXX`, Crockford base32)

- [ ] **Step 1: Write the failing test**

`test/crypto.test.js`:

```js
import { describe, it, expect } from "vitest";
import { hashSecret, verifySecret, newToken, newRecoveryCode } from "../src/crypto.js";

describe("hashSecret / verifySecret", () => {
  it("verifies the correct secret", async () => {
    const { hash, salt } = await hashSecret("482913");
    expect(await verifySecret("482913", hash, salt)).toBe(true);
  });

  it("rejects the wrong secret", async () => {
    const { hash, salt } = await hashSecret("482913");
    expect(await verifySecret("482914", hash, salt)).toBe(false);
  });

  it("uses a fresh salt each time, so identical PINs hash differently", async () => {
    const a = await hashSecret("482913");
    const b = await hashSecret("482913");
    expect(a.salt).not.toBe(b.salt);
    expect(a.hash).not.toBe(b.hash);
  });

  it("returns false rather than throwing on a malformed hash", async () => {
    expect(await verifySecret("482913", "nothex", "nothex")).toBe(false);
  });
});

describe("newToken", () => {
  it("is 64 hex chars and unique", () => {
    const a = newToken(), b = newToken();
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    expect(a).not.toBe(b);
  });
});

describe("newRecoveryCode", () => {
  it("is XXXX-XXXX-XXXX from the unambiguous alphabet", () => {
    const c = newRecoveryCode();
    expect(c).toMatch(/^[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/);
    expect(c).not.toMatch(/[ILOU]/); // ambiguous characters must never appear
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run test/crypto.test.js`
Expected: FAIL — cannot resolve `../src/crypto.js`.

- [ ] **Step 3: Implement**

`src/crypto.js`:

```js
const ITERATIONS = 100000;
const KEY_BITS = 256;
// Crockford base32: no I, L, O or U, so codes cannot be misread when written down.
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function toHex(buf) {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex) {
  if (typeof hex !== "string" || hex.length % 2 !== 0 || /[^0-9a-f]/i.test(hex)) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
}

async function derive(secret, saltBytes) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveBits"]
  );
  return crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: saltBytes, iterations: ITERATIONS },
    key, KEY_BITS
  );
}

export async function hashSecret(secret) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const bits = await derive(secret, salt);
  return { hash: toHex(bits), salt: toHex(salt) };
}

/* Constant-time: compares every byte regardless of where the first difference is,
   so response timing cannot reveal how much of the secret was correct. */
export async function verifySecret(secret, hashHex, saltHex) {
  const salt = fromHex(saltHex);
  const expected = fromHex(hashHex);
  if (!salt || !expected) return false;
  const actual = new Uint8Array(await derive(secret, salt));
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
  return diff === 0;
}

export function newToken() {
  return toHex(crypto.getRandomValues(new Uint8Array(32)));
}

export function newRecoveryCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const chars = [...bytes].map(b => ALPHABET[b % ALPHABET.length]);
  return `${chars.slice(0, 4).join("")}-${chars.slice(4, 8).join("")}-${chars.slice(8, 12).join("")}`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run test/crypto.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/crypto.js test/crypto.test.js
git commit -m "Add PBKDF2 hashing, constant-time verify, token and recovery-code generation"
```

---

### Task 4: Rate-limiting module

This task owns **every** threshold decision. No other file may hard-code a limit.

**Files:**
- Create: `study-sync/src/limits.js`
- Create: `study-sync/test/helpers.js`
- Test: `study-sync/test/limits.test.js`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `checkIpBudget(env, ip, now) -> Promise<{allowed:boolean, retryAfter?:number}>` — **read-only, performs no writes**
  - `recordIpFailure(env, ip, now) -> Promise<void>`
  - `checkSignupThrottle(env, ip, now) -> Promise<{allowed:boolean, retryAfter?:number}>` — read-only
  - `recordSignup(env, ip, now) -> Promise<void>`
  - `accountState(user, now) -> {locked:boolean, retryAfter?:number, needsCaptcha:boolean}`
  - `recordAuthFailure(env, user, now) -> Promise<void>` — bumps `failed_count`, hard-locks at 20 with escalation
  - `clearAuthFailures(env, userId) -> Promise<void>`
  - Constants: `TURNSTILE_AT = 4`, `HARD_LOCK_AT = 20`, `IP_FAIL_BUDGET = 30`, `IP_SIGNUP_BUDGET = 3`

- [ ] **Step 1: Write the test helper**

`test/helpers.js`:

```js
import { env } from "cloudflare:test";
import schema from "../schema.sql?raw";

export async function applySchema() {
  const statements = schema.split(";").map(s => s.trim()).filter(Boolean);
  for (const s of statements) await env.DB.prepare(s).run();
}

export async function resetDb() {
  for (const t of ["users", "sessions", "progress", "ip_failures", "ip_signups"]) {
    await env.DB.prepare(`DELETE FROM ${t}`).run();
  }
}

/** Counts D1 writes by wrapping the binding. Used to prove the write-quota guard. */
export function countingDb(db) {
  let writes = 0;
  return {
    writes: () => writes,
    binding: {
      prepare(sql) {
        const stmt = db.prepare(sql);
        const isWrite = /^\s*(insert|update|delete)/i.test(sql);
        return {
          bind: (...a) => {
            const b = stmt.bind(...a);
            return {
              run: async () => { if (isWrite) writes++; return b.run(); },
              first: (...x) => b.first(...x),
              all: (...x) => b.all(...x)
            };
          },
          run: async () => { if (isWrite) writes++; return stmt.run(); },
          first: (...x) => stmt.first(...x),
          all: (...x) => stmt.all(...x)
        };
      }
    }
  };
}

export async function seedUser(username = "tester", failed = 0, lockedUntil = 0) {
  const r = await env.DB.prepare(
    `INSERT INTO users (username, pin_hash, pin_salt, recovery_hash, recovery_salt,
                        failed_count, lock_level, locked_until, created_at)
     VALUES (?, 'h', 's', 'rh', 'rs', ?, 0, ?, ?) RETURNING id`
  ).bind(username, failed, lockedUntil, Date.now()).first();
  return r.id;
}
```

- [ ] **Step 2: Write the failing test**

`test/limits.test.js`:

```js
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { env } from "cloudflare:test";
import { applySchema, resetDb, countingDb, seedUser } from "./helpers.js";
import {
  checkIpBudget, recordIpFailure, checkSignupThrottle, recordSignup,
  accountState, recordAuthFailure, clearAuthFailures,
  TURNSTILE_AT, HARD_LOCK_AT, IP_FAIL_BUDGET, IP_SIGNUP_BUDGET
} from "../src/limits.js";

const NOW = 1_760_000_000_000;

beforeAll(applySchema);
beforeEach(resetDb);

describe("per-IP failure budget", () => {
  it("allows up to the budget then blocks", async () => {
    for (let i = 0; i < IP_FAIL_BUDGET; i++) {
      expect((await checkIpBudget(env, "1.2.3.4", NOW)).allowed).toBe(true);
      await recordIpFailure(env, "1.2.3.4", NOW);
    }
    const blocked = await checkIpBudget(env, "1.2.3.4", NOW);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("PIN SPRAYING: one IP hitting many usernames is cut off before the 40th", async () => {
    let allowedCount = 0;
    for (let i = 0; i < 40; i++) {
      const r = await checkIpBudget(env, "9.9.9.9", NOW);
      if (!r.allowed) break;
      allowedCount++;
      await recordIpFailure(env, "9.9.9.9", NOW); // a different username each time
    }
    expect(allowedCount).toBe(IP_FAIL_BUDGET);
  });

  it("WRITE-QUOTA GUARD: an over-budget IP performs ZERO writes", async () => {
    for (let i = 0; i < IP_FAIL_BUDGET; i++) await recordIpFailure(env, "5.5.5.5", NOW);
    const c = countingDb(env.DB);
    const r = await checkIpBudget({ DB: c.binding }, "5.5.5.5", NOW);
    expect(r.allowed).toBe(false);
    expect(c.writes()).toBe(0); // the whole point of read-before-write
  });

  it("buckets are hourly, so the next hour is a clean slate", async () => {
    for (let i = 0; i < IP_FAIL_BUDGET; i++) await recordIpFailure(env, "7.7.7.7", NOW);
    expect((await checkIpBudget(env, "7.7.7.7", NOW)).allowed).toBe(false);
    const nextHour = NOW + 3_600_000;
    expect((await checkIpBudget(env, "7.7.7.7", nextHour)).allowed).toBe(true);
  });
});

describe("signup throttle", () => {
  it("allows the budget then blocks", async () => {
    for (let i = 0; i < IP_SIGNUP_BUDGET; i++) {
      expect((await checkSignupThrottle(env, "2.2.2.2", NOW)).allowed).toBe(true);
      await recordSignup(env, "2.2.2.2", NOW);
    }
    expect((await checkSignupThrottle(env, "2.2.2.2", NOW)).allowed).toBe(false);
  });
});

describe("accountState", () => {
  it("is clean below the Turnstile threshold", () => {
    const s = accountState({ failed_count: TURNSTILE_AT - 1, locked_until: 0 }, NOW);
    expect(s).toEqual({ locked: false, needsCaptcha: false });
  });

  it("demands a captcha at the threshold", () => {
    const s = accountState({ failed_count: TURNSTILE_AT, locked_until: 0 }, NOW);
    expect(s.needsCaptcha).toBe(true);
    expect(s.locked).toBe(false);
  });

  it("reports a live lock with retryAfter", () => {
    const s = accountState({ failed_count: HARD_LOCK_AT, locked_until: NOW + 60_000 }, NOW);
    expect(s.locked).toBe(true);
    expect(s.retryAfter).toBe(60);
  });

  it("treats an expired lock as unlocked", () => {
    const s = accountState({ failed_count: HARD_LOCK_AT, locked_until: NOW - 1 }, NOW);
    expect(s.locked).toBe(false);
  });
});

describe("recordAuthFailure", () => {
  it("hard-locks at the threshold with an escalating duration", async () => {
    const id = await seedUser("victim", HARD_LOCK_AT - 1);
    await recordAuthFailure(env, { id, failed_count: HARD_LOCK_AT - 1, lock_level: 0 }, NOW);
    const u = await env.DB.prepare("SELECT * FROM users WHERE id=?").bind(id).first();
    expect(u.failed_count).toBe(HARD_LOCK_AT);
    expect(u.locked_until).toBe(NOW + 15 * 60 * 1000); // first lock: 15 minutes
    expect(u.lock_level).toBe(1);

    await recordAuthFailure(env, { id, failed_count: u.failed_count, lock_level: 1 }, NOW);
    const u2 = await env.DB.prepare("SELECT * FROM users WHERE id=?").bind(id).first();
    expect(u2.locked_until).toBe(NOW + 30 * 60 * 1000); // second lock: doubled
  });

  it("caps escalation at 24 hours", async () => {
    const id = await seedUser("capped", HARD_LOCK_AT);
    await recordAuthFailure(env, { id, failed_count: HARD_LOCK_AT, lock_level: 20 }, NOW);
    const u = await env.DB.prepare("SELECT * FROM users WHERE id=?").bind(id).first();
    expect(u.locked_until).toBe(NOW + 24 * 60 * 60 * 1000);
  });
});

describe("clearAuthFailures", () => {
  it("resets the counter after a successful login", async () => {
    const id = await seedUser("ok", 7);
    await clearAuthFailures(env, id);
    const u = await env.DB.prepare("SELECT * FROM users WHERE id=?").bind(id).first();
    expect(u.failed_count).toBe(0);
    expect(u.locked_until).toBe(0);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run test/limits.test.js`
Expected: FAIL — cannot resolve `../src/limits.js`.

- [ ] **Step 4: Implement**

`src/limits.js`:

```js
export const TURNSTILE_AT = 4;       // failures before a captcha is demanded
export const HARD_LOCK_AT = 20;      // failures before the account is locked
export const IP_FAIL_BUDGET = 30;    // failed auth attempts per IP per hour
export const IP_SIGNUP_BUDGET = 3;   // new accounts per IP per hour

const HOUR_MS = 3_600_000;
const BASE_LOCK_MS = 15 * 60 * 1000;
const MAX_LOCK_MS = 24 * 60 * 60 * 1000;

const hourOf = now => Math.floor(now / HOUR_MS);
const msLeftInHour = now => (hourOf(now) + 1) * HOUR_MS - now;

async function readCount(env, table, ip, now) {
  const row = await env.DB
    .prepare(`SELECT count FROM ${table} WHERE ip = ? AND hour = ?`)
    .bind(ip, hourOf(now))
    .first();
  return row ? row.count : 0;
}

/* READ ONLY. Must never write: an attacker who is already over budget must not be
   able to burn D1's write quota and take sync down for everyone (spec 9.3). */
export async function checkIpBudget(env, ip, now) {
  const count = await readCount(env, "ip_failures", ip, now);
  if (count >= IP_FAIL_BUDGET) {
    return { allowed: false, retryAfter: Math.ceil(msLeftInHour(now) / 1000) };
  }
  return { allowed: true };
}

export async function recordIpFailure(env, ip, now) {
  await env.DB.prepare(
    `INSERT INTO ip_failures (ip, hour, count) VALUES (?, ?, 1)
     ON CONFLICT(ip, hour) DO UPDATE SET count = count + 1`
  ).bind(ip, hourOf(now)).run();
  // opportunistic cleanup keeps the table bounded
  await env.DB.prepare("DELETE FROM ip_failures WHERE hour < ?").bind(hourOf(now) - 24).run();
}

export async function checkSignupThrottle(env, ip, now) {
  const count = await readCount(env, "ip_signups", ip, now);
  if (count >= IP_SIGNUP_BUDGET) {
    return { allowed: false, retryAfter: Math.ceil(msLeftInHour(now) / 1000) };
  }
  return { allowed: true };
}

export async function recordSignup(env, ip, now) {
  await env.DB.prepare(
    `INSERT INTO ip_signups (ip, hour, count) VALUES (?, ?, 1)
     ON CONFLICT(ip, hour) DO UPDATE SET count = count + 1`
  ).bind(ip, hourOf(now)).run();
  await env.DB.prepare("DELETE FROM ip_signups WHERE hour < ?").bind(hourOf(now) - 24).run();
}

export function accountState(user, now) {
  if (user.locked_until > now) {
    return { locked: true, retryAfter: Math.ceil((user.locked_until - now) / 1000), needsCaptcha: true };
  }
  return { locked: false, needsCaptcha: user.failed_count >= TURNSTILE_AT };
}

export async function recordAuthFailure(env, user, now) {
  const failed = (user.failed_count || 0) + 1;
  if (failed >= HARD_LOCK_AT) {
    const level = (user.lock_level || 0) + 1;
    const dur = Math.min(BASE_LOCK_MS * Math.pow(2, level - 1), MAX_LOCK_MS);
    await env.DB.prepare(
      "UPDATE users SET failed_count = ?, lock_level = ?, locked_until = ? WHERE id = ?"
    ).bind(failed, level, now + dur, user.id).run();
  } else {
    await env.DB.prepare("UPDATE users SET failed_count = ? WHERE id = ?")
      .bind(failed, user.id).run();
  }
}

export async function clearAuthFailures(env, userId) {
  await env.DB.prepare(
    "UPDATE users SET failed_count = 0, lock_level = 0, locked_until = 0 WHERE id = ?"
  ).bind(userId).run();
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run test/limits.test.js`
Expected: PASS. The write-quota test must show `writes() === 0`.

- [ ] **Step 6: Commit**

```bash
git add src/limits.js test/limits.test.js test/helpers.js
git commit -m "Add layered rate limiting: IP budget with write-quota guard, captcha gate, escalating lock"
```

---

### Task 5: Turnstile verification

**Files:**
- Modify: `study-sync/src/limits.js` (append)
- Test: `study-sync/test/limits.test.js` (append)

**Interfaces:**
- Produces: `verifyTurnstile(env, token, ip) -> Promise<boolean>` — **fails closed**: returns `false` if the token is missing, the secret is unset, or the network call throws.

- [ ] **Step 1: Write the failing test (append to `test/limits.test.js`)**

```js
import { verifyTurnstile } from "../src/limits.js";
import { vi, afterEach } from "vitest";

describe("verifyTurnstile", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("fails closed when no token is supplied", async () => {
    expect(await verifyTurnstile({ TURNSTILE_SECRET: "s" }, "", "1.1.1.1")).toBe(false);
    expect(await verifyTurnstile({ TURNSTILE_SECRET: "s" }, undefined, "1.1.1.1")).toBe(false);
  });

  it("fails closed when the secret is not configured", async () => {
    expect(await verifyTurnstile({}, "tok", "1.1.1.1")).toBe(false);
  });

  it("fails closed when the verify call throws", async () => {
    vi.stubGlobal("fetch", () => { throw new Error("network down"); });
    expect(await verifyTurnstile({ TURNSTILE_SECRET: "s" }, "tok", "1.1.1.1")).toBe(false);
  });

  it("returns true only when Cloudflare says success", async () => {
    vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ success: true })));
    expect(await verifyTurnstile({ TURNSTILE_SECRET: "s" }, "tok", "1.1.1.1")).toBe(true);

    vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ success: false })));
    expect(await verifyTurnstile({ TURNSTILE_SECRET: "s" }, "tok", "1.1.1.1")).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run test/limits.test.js`
Expected: FAIL — `verifyTurnstile` is not exported.

- [ ] **Step 3: Implement (append to `src/limits.js`)**

```js
const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/* Fails closed. If we cannot prove the challenge was solved, we refuse the request
   rather than let it through - an open failure mode would defeat the whole layer. */
export async function verifyTurnstile(env, token, ip) {
  if (!token || typeof token !== "string") return false;
  if (!env.TURNSTILE_SECRET) return false;
  try {
    const body = new FormData();
    body.append("secret", env.TURNSTILE_SECRET);
    body.append("response", token);
    if (ip) body.append("remoteip", ip);
    const res = await fetch(TURNSTILE_URL, { method: "POST", body });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run test/limits.test.js`
Expected: PASS.

- [ ] **Step 5: Set the secret (user action — keeps it out of the repo and the transcript)**

The user creates a Turnstile widget at **Cloudflare dashboard → Turnstile → Add site**, domain `mofchris.github.io`, then runs:

```bash
npx wrangler secret put TURNSTILE_SECRET
```

and pastes the **secret key** at the prompt. The **site key** is public and is recorded for the client phase.

- [ ] **Step 6: Commit**

```bash
git add src/limits.js test/limits.test.js
git commit -m "Add fail-closed Turnstile verification"
```

---

### Task 6: /signup, /login, /reset-pin

**Files:**
- Create: `study-sync/src/auth.js`
- Test: `study-sync/test/auth.test.js`

**Interfaces:**
- Consumes: `validate.js`, `crypto.js`, `limits.js` (all above).
- Produces: `handleSignup(request, env, ip, now)`, `handleLogin(request, env, ip, now)`, `handleResetPin(request, env, ip, now)`, `authenticate(request, env, now) -> Promise<{userId} | null>` — each returns a `Response`.

Status codes (spec §6): `401` invalid credentials (generic), `403 {needsCaptcha:true}`, `423` locked (`retryAfter`), `429` IP over budget (`retryAfter`), `409` username taken.

- [ ] **Step 1: Write the failing test**

`test/auth.test.js`:

```js
import { describe, it, expect, beforeAll, beforeEach, vi, afterEach } from "vitest";
import { env } from "cloudflare:test";
import { applySchema, resetDb } from "./helpers.js";
import { handleSignup, handleLogin, authenticate } from "../src/auth.js";
import { TURNSTILE_AT } from "../src/limits.js";

const NOW = 1_760_000_000_000;
const IP = "1.2.3.4";

function req(body) {
  return new Request("https://x/", { method: "POST", body: JSON.stringify(body) });
}
function passTurnstile() {
  vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ success: true })));
}

beforeAll(applySchema);
beforeEach(async () => { await resetDb(); passTurnstile(); env.TURNSTILE_SECRET = "test-secret"; });
afterEach(() => vi.unstubAllGlobals());

async function signup(username = "alice", pin = "482913") {
  return handleSignup(req({ username, pin, turnstile: "tok" }), env, IP, NOW);
}

describe("/signup", () => {
  it("creates an account and returns a token plus a one-time recovery code", async () => {
    const res = await signup();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.token).toMatch(/^[0-9a-f]{64}$/);
    expect(body.username).toBe("alice");
    expect(body.recoveryCode).toMatch(/^[0-9A-HJKMNP-TV-Z]{4}-/);
  });

  it("rejects a banned PIN", async () => {
    const res = await handleSignup(req({ username: "bob", pin: "123456", turnstile: "tok" }), env, IP, NOW);
    expect(res.status).toBe(400);
  });

  it("rejects a duplicate username case-insensitively", async () => {
    await signup("alice");
    const res = await handleSignup(req({ username: "ALICE", pin: "482913", turnstile: "tok" }), env, IP, NOW);
    expect(res.status).toBe(409);
  });

  it("requires a valid Turnstile token", async () => {
    vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ success: false })));
    const res = await handleSignup(req({ username: "carol", pin: "482913", turnstile: "bad" }), env, IP, NOW);
    expect(res.status).toBe(403);
  });
});

describe("/login", () => {
  it("succeeds with the right PIN", async () => {
    await signup();
    const res = await handleLogin(req({ username: "alice", pin: "482913" }), env, IP, NOW);
    expect(res.status).toBe(200);
    expect((await res.json()).token).toMatch(/^[0-9a-f]{64}$/);
  });

  it("ENUMERATION: unknown user and wrong PIN return identical bodies and status", async () => {
    await signup();
    const wrong = await handleLogin(req({ username: "alice", pin: "482914" }), env, IP, NOW);
    const absent = await handleLogin(req({ username: "nobody", pin: "482914" }), env, IP, NOW);
    expect(wrong.status).toBe(401);
    expect(absent.status).toBe(401);
    expect(await wrong.text()).toBe(await absent.text());
  });

  it("VERTICAL BRUTE FORCE: demands a captcha after 4 failures", async () => {
    await signup();
    for (let i = 0; i < TURNSTILE_AT; i++) {
      await handleLogin(req({ username: "alice", pin: "000001" }), env, IP, NOW);
    }
    const res = await handleLogin(req({ username: "alice", pin: "000001" }), env, IP, NOW);
    expect(res.status).toBe(403);
    expect((await res.json()).needsCaptcha).toBe(true);
  });

  it("accepts a captcha-bearing attempt once challenged, and the right PIN still works", async () => {
    await signup();
    for (let i = 0; i < TURNSTILE_AT; i++) {
      await handleLogin(req({ username: "alice", pin: "000001" }), env, IP, NOW);
    }
    const res = await handleLogin(req({ username: "alice", pin: "482913", turnstile: "tok" }), env, IP, NOW);
    expect(res.status).toBe(200);
  });

  it("resets the failure counter after a successful login", async () => {
    await signup();
    await handleLogin(req({ username: "alice", pin: "000001" }), env, IP, NOW);
    await handleLogin(req({ username: "alice", pin: "482913" }), env, IP, NOW);
    const u = await env.DB.prepare("SELECT failed_count FROM users WHERE username='alice'").first();
    expect(u.failed_count).toBe(0);
  });
});

describe("authenticate", () => {
  it("accepts a live token and rejects a bogus one", async () => {
    const { token } = await (await signup()).json();
    const good = new Request("https://x/", { headers: { authorization: `Bearer ${token}` } });
    expect(await authenticate(good, env, NOW)).toBeTruthy();

    const bad = new Request("https://x/", { headers: { authorization: "Bearer deadbeef" } });
    expect(await authenticate(bad, env, NOW)).toBeNull();
  });

  it("rejects an expired token", async () => {
    const { token } = await (await signup()).json();
    const later = NOW + 91 * 24 * 60 * 60 * 1000;
    const r = new Request("https://x/", { headers: { authorization: `Bearer ${token}` } });
    expect(await authenticate(r, env, later)).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run test/auth.test.js`
Expected: FAIL — cannot resolve `../src/auth.js`.

- [ ] **Step 3: Implement**

`src/auth.js`:

```js
import { validateUsername, validatePin } from "./validate.js";
import { hashSecret, verifySecret, newToken, newRecoveryCode } from "./crypto.js";
import {
  checkIpBudget, recordIpFailure, checkSignupThrottle, recordSignup,
  accountState, recordAuthFailure, clearAuthFailures, verifyTurnstile
} from "./limits.js";

const SESSION_MS = 90 * 24 * 60 * 60 * 1000;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

// One frozen body for every credential failure, so nothing distinguishes
// "no such user" from "wrong PIN".
const INVALID = () => json({ error: "invalid_credentials" }, 401);

async function body(request) {
  try { return await request.json(); } catch { return {}; }
}

async function issueSession(env, userId, now) {
  const token = newToken();
  await env.DB.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(token, userId, now + SESSION_MS).run();
  return token;
}

export async function handleSignup(request, env, ip, now) {
  const throttle = await checkSignupThrottle(env, ip, now);
  if (!throttle.allowed) return json({ error: "rate_limited", retryAfter: throttle.retryAfter }, 429);

  const b = await body(request);

  if (!(await verifyTurnstile(env, b.turnstile, ip))) {
    return json({ error: "captcha_required", needsCaptcha: true }, 403);
  }

  const u = validateUsername(b.username);
  if (!u.ok) return json({ error: u.error }, 400);
  const p = validatePin(b.pin);
  if (!p.ok) return json({ error: p.error }, 400);

  const exists = await env.DB.prepare("SELECT id FROM users WHERE username = ?").bind(u.value).first();
  if (exists) return json({ error: "username_taken" }, 409);

  const pin = await hashSecret(b.pin);
  const recoveryCode = newRecoveryCode();
  const rec = await hashSecret(recoveryCode);

  const row = await env.DB.prepare(
    `INSERT INTO users (username, pin_hash, pin_salt, recovery_hash, recovery_salt,
                        failed_count, lock_level, locked_until, created_at)
     VALUES (?, ?, ?, ?, ?, 0, 0, 0, ?) RETURNING id`
  ).bind(u.value, pin.hash, pin.salt, rec.hash, rec.salt, now).first();

  await recordSignup(env, ip, now);
  const token = await issueSession(env, row.id, now);

  // recoveryCode is returned exactly once and never stored in the clear.
  return json({ token, username: u.value, recoveryCode });
}

export async function handleLogin(request, env, ip, now) {
  // Read-only budget check FIRST: an over-budget IP must cost us zero writes.
  const budget = await checkIpBudget(env, ip, now);
  if (!budget.allowed) return json({ error: "rate_limited", retryAfter: budget.retryAfter }, 429);

  const b = await body(request);
  const u = validateUsername(b.username);
  if (!u.ok || typeof b.pin !== "string") return INVALID();

  const user = await env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(u.value).first();

  // Hash even when the user does not exist, so timing cannot reveal account existence.
  const DUMMY = { pin_hash: "00".repeat(32), pin_salt: "00".repeat(16) };
  const target = user || DUMMY;

  const state = user ? accountState(user, now) : { locked: false, needsCaptcha: false };
  if (state.locked) return json({ error: "locked", retryAfter: state.retryAfter }, 423);
  if (state.needsCaptcha && !(await verifyTurnstile(env, b.turnstile, ip))) {
    return json({ error: "captcha_required", needsCaptcha: true }, 403);
  }

  const ok = await verifySecret(b.pin, target.pin_hash, target.pin_salt);

  if (!ok || !user) {
    await recordIpFailure(env, ip, now);
    if (user) await recordAuthFailure(env, user, now);
    return INVALID();
  }

  await clearAuthFailures(env, user.id);
  const token = await issueSession(env, user.id, now);
  return json({ token, username: user.username });
}

export async function handleResetPin(request, env, ip, now) {
  const budget = await checkIpBudget(env, ip, now);
  if (!budget.allowed) return json({ error: "rate_limited", retryAfter: budget.retryAfter }, 429);

  const b = await body(request);
  if (!(await verifyTurnstile(env, b.turnstile, ip))) {
    return json({ error: "captcha_required", needsCaptcha: true }, 403);
  }

  const u = validateUsername(b.username);
  if (!u.ok || typeof b.recoveryCode !== "string") return INVALID();
  const p = validatePin(b.newPin);
  if (!p.ok) return json({ error: p.error }, 400);

  const user = await env.DB.prepare("SELECT * FROM users WHERE username = ?").bind(u.value).first();
  const DUMMY = { recovery_hash: "00".repeat(32), recovery_salt: "00".repeat(16) };
  const target = user || DUMMY;

  const ok = await verifySecret(b.recoveryCode.trim().toUpperCase(), target.recovery_hash, target.recovery_salt);
  if (!ok || !user) {
    await recordIpFailure(env, ip, now);
    return INVALID();
  }

  const pin = await hashSecret(b.newPin);
  await env.DB.prepare(
    `UPDATE users SET pin_hash = ?, pin_salt = ?, failed_count = 0, lock_level = 0, locked_until = 0
     WHERE id = ?`
  ).bind(pin.hash, pin.salt, user.id).run();

  const token = await issueSession(env, user.id, now);
  return json({ token, username: user.username });
}

export async function authenticate(request, env, now) {
  const h = request.headers.get("authorization") || "";
  const m = h.match(/^Bearer ([0-9a-f]{64})$/);
  if (!m) return null;
  const row = await env.DB.prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?")
    .bind(m[1]).first();
  if (!row || row.expires_at <= now) return null;
  return { userId: row.user_id };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run test/auth.test.js`
Expected: PASS — in particular the enumeration test (identical bodies) and the captcha-at-4 test.

- [ ] **Step 5: Commit**

```bash
git add src/auth.js test/auth.test.js
git commit -m "Add signup, login and PIN reset with generic errors and captcha gating"
```

---

### Task 7: /progress GET and PUT with optimistic concurrency

**Files:**
- Create: `study-sync/src/progress.js`
- Test: `study-sync/test/progress.test.js`

**Interfaces:**
- Consumes: `authenticate` (Task 6), `validateBlob` (Task 2).
- Produces: `handleGetProgress(request, env, userId, app)`, `handlePutProgress(request, env, userId, app, now)`.

- [ ] **Step 1: Write the failing test**

`test/progress.test.js`:

```js
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { env } from "cloudflare:test";
import { applySchema, resetDb, seedUser } from "./helpers.js";
import { handleGetProgress, handlePutProgress } from "../src/progress.js";

const NOW = 1_760_000_000_000;
let uid;

beforeAll(applySchema);
beforeEach(async () => { await resetDb(); uid = await seedUser("alice"); });

const put = (blob, baseUpdatedAt, now = NOW) =>
  handlePutProgress(
    new Request("https://x/", { method: "PUT", body: JSON.stringify({ blob, baseUpdatedAt }) }),
    env, uid, "gre", now
  );

describe("/progress", () => {
  it("returns null for an account with no saved progress", async () => {
    const res = await handleGetProgress(new Request("https://x/"), env, uid, "gre");
    expect(res.status).toBe(200);
    expect((await res.json()).blob).toBeNull();
  });

  it("stores and reads back a blob", async () => {
    const put1 = await put('{"missed":["q1"]}', 0);
    expect(put1.status).toBe(200);
    const { updatedAt } = await put1.json();
    expect(updatedAt).toBe(NOW);

    const res = await handleGetProgress(new Request("https://x/"), env, uid, "gre");
    const body = await res.json();
    expect(JSON.parse(body.blob).missed).toEqual(["q1"]);
    expect(body.updatedAt).toBe(NOW);
  });

  it("CONFLICT: a stale baseUpdatedAt is rejected with 409 and the current state", async () => {
    await put('{"v":1}', 0);                       // device A writes, updatedAt = NOW
    const stale = await put('{"v":2}', 0, NOW + 5); // device B still thinks the row is absent
    expect(stale.status).toBe(409);
    const body = await stale.json();
    expect(JSON.parse(body.blob).v).toBe(1);        // server hands back what it actually has
    expect(body.updatedAt).toBe(NOW);
  });

  it("a PUT that carries the correct baseUpdatedAt succeeds", async () => {
    await put('{"v":1}', 0);
    const ok = await put('{"v":2}', NOW, NOW + 5);
    expect(ok.status).toBe(200);
    const res = await handleGetProgress(new Request("https://x/"), env, uid, "gre");
    expect(JSON.parse((await res.json()).blob).v).toBe(2);
  });

  it("keeps the two apps' blobs separate", async () => {
    await put('{"app":"gre"}', 0);
    await handlePutProgress(
      new Request("https://x/", { method: "PUT", body: JSON.stringify({ blob: '{"app":"netplus"}', baseUpdatedAt: 0 }) }),
      env, uid, "netplus", NOW
    );
    const g = await (await handleGetProgress(new Request("https://x/"), env, uid, "gre")).json();
    const n = await (await handleGetProgress(new Request("https://x/"), env, uid, "netplus")).json();
    expect(JSON.parse(g.blob).app).toBe("gre");
    expect(JSON.parse(n.blob).app).toBe("netplus");
  });

  it("rejects an invalid or oversized blob", async () => {
    expect((await put("{not json", 0)).status).toBe(400);
    expect((await put('{"x":"' + "a".repeat(300 * 1024) + '"}', 0)).status).toBe(400);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run test/progress.test.js`
Expected: FAIL — cannot resolve `../src/progress.js`.

- [ ] **Step 3: Implement**

`src/progress.js`:

```js
import { validateBlob } from "./validate.js";

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

export async function handleGetProgress(request, env, userId, app) {
  const row = await env.DB
    .prepare("SELECT blob, updated_at FROM progress WHERE user_id = ? AND app = ?")
    .bind(userId, app).first();
  if (!row) return json({ blob: null, updatedAt: 0 });
  return json({ blob: row.blob, updatedAt: row.updated_at });
}

export async function handlePutProgress(request, env, userId, app, now) {
  let b;
  try { b = await request.json(); } catch { return json({ error: "bad_json" }, 400); }

  const v = validateBlob(b.blob);
  if (!v.ok) return json({ error: v.error }, 400);

  const base = Number.isInteger(b.baseUpdatedAt) ? b.baseUpdatedAt : -1;
  if (base < 0) return json({ error: "baseUpdatedAt required" }, 400);

  const row = await env.DB
    .prepare("SELECT blob, updated_at FROM progress WHERE user_id = ? AND app = ?")
    .bind(userId, app).first();

  const current = row ? row.updated_at : 0;

  /* Optimistic concurrency: the client must have merged from exactly the version
     the server still holds. Otherwise another device wrote in between and this PUT
     would silently discard their work - so we hand back the current state and let
     the client re-merge. */
  if (current !== base) {
    return json({ error: "conflict", blob: row ? row.blob : null, updatedAt: current }, 409);
  }

  await env.DB.prepare(
    `INSERT INTO progress (user_id, app, blob, updated_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, app) DO UPDATE SET blob = excluded.blob, updated_at = excluded.updated_at`
  ).bind(userId, app, b.blob, now).run();

  return json({ updatedAt: now });
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run test/progress.test.js`
Expected: PASS, including the 409 conflict test.

- [ ] **Step 5: Commit**

```bash
git add src/progress.js test/progress.test.js
git commit -m "Add progress GET/PUT with optimistic concurrency"
```

---

### Task 8: Router, CORS, constant delay — then deploy and prove with curl

**Files:**
- Modify: `study-sync/src/worker.js` (replace entirely)

**Interfaces:**
- Consumes: all handlers above.

- [ ] **Step 1: Implement the router**

`src/worker.js`:

```js
import { handleSignup, handleLogin, handleResetPin, authenticate } from "./auth.js";
import { handleGetProgress, handlePutProgress } from "./progress.js";

const AUTH_DELAY_MS = 400; // constant cost per auth attempt; humans never notice, bots do

function corsHeaders(env, request) {
  const origin = request.headers.get("origin") || "";
  const allowed = [env.ALLOWED_ORIGIN];
  if (env.ENVIRONMENT === "dev") {
    allowed.push("http://localhost:8420", "http://localhost:8421");
  }
  return {
    "access-control-allow-origin": allowed.includes(origin) ? origin : env.ALLOWED_ORIGIN,
    "access-control-allow-methods": "GET,PUT,POST,OPTIONS",
    "access-control-allow-headers": "authorization,content-type",
    "access-control-max-age": "86400"
  };
}

const withCors = (res, headers) => {
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(headers)) out.headers.set(k, v);
  return out;
};

const json = (obj, status) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default {
  async fetch(request, env) {
    const cors = corsHeaders(env, request);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    const path = url.pathname;
    const ip = request.headers.get("cf-connecting-ip") || "0.0.0.0";
    const now = Date.now();

    try {
      if (path === "/health") return withCors(json({ ok: true }, 200), cors);

      // Every auth attempt costs a constant 400ms whether it succeeds or fails.
      if (path === "/signup" && request.method === "POST") {
        const [res] = await Promise.all([handleSignup(request, env, ip, now), sleep(AUTH_DELAY_MS)]);
        return withCors(res, cors);
      }
      if (path === "/login" && request.method === "POST") {
        const [res] = await Promise.all([handleLogin(request, env, ip, now), sleep(AUTH_DELAY_MS)]);
        return withCors(res, cors);
      }
      if (path === "/reset-pin" && request.method === "POST") {
        const [res] = await Promise.all([handleResetPin(request, env, ip, now), sleep(AUTH_DELAY_MS)]);
        return withCors(res, cors);
      }

      if (path === "/progress") {
        const session = await authenticate(request, env, now);
        if (!session) return withCors(json({ error: "unauthorized" }, 401), cors);

        const app = url.searchParams.get("app");
        if (app !== "gre" && app !== "netplus") {
          return withCors(json({ error: "app must be gre or netplus" }, 400), cors);
        }
        if (request.method === "GET") {
          return withCors(await handleGetProgress(request, env, session.userId, app), cors);
        }
        if (request.method === "PUT") {
          return withCors(await handlePutProgress(request, env, session.userId, app, now), cors);
        }
      }

      return withCors(json({ error: "not_found" }, 404), cors);
    } catch (err) {
      // Never leak internals to the client.
      console.error(err);
      return withCors(json({ error: "server_error" }, 500), cors);
    }
  }
};
```

- [ ] **Step 2: Run the whole suite**

Run: `npx vitest run`
Expected: PASS — all five test files.

- [ ] **Step 3: Deploy**

```bash
npx wrangler deploy
```

Expected: prints the worker URL. Export it for the curl steps:

```bash
export W="https://study-sync.<subdomain>.workers.dev"
```

- [ ] **Step 4: Prove it with curl — the happy path**

```bash
curl -s "$W/health"
```
Expected: `{"ok":true}`

Signup requires a real Turnstile token, which curl cannot mint. So verify signup **through the browser** in the client phase, and use `wrangler d1 execute` to confirm the row landed:

```bash
npx wrangler d1 execute study-sync --remote --command="SELECT username, failed_count FROM users"
```

- [ ] **Step 5: Prove the adversarial paths with curl**

```bash
# Unknown user and wrong PIN must be byte-identical (no enumeration).
curl -s -o /tmp/a -w "%{http_code}\n" -X POST "$W/login" \
  -H 'content-type: application/json' -d '{"username":"nobody","pin":"482913"}'
curl -s -o /tmp/b -w "%{http_code}\n" -X POST "$W/login" \
  -H 'content-type: application/json' -d '{"username":"alice","pin":"000001"}'
diff /tmp/a /tmp/b && echo "IDENTICAL - no enumeration"
```
Expected: both `401`, and `diff` reports no difference.

```bash
# Per-IP budget: 35 failures from one IP must start returning 429 before the 35th.
for i in $(seq 1 35); do
  printf "%s " "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$W/login" \
    -H 'content-type: application/json' -d '{"username":"alice","pin":"000001"}')"
done; echo
```
Expected: a run of `401` (and `403` once the account crosses 4 failures), turning into `429` at attempt 31 and staying there.

```bash
# Unauthenticated progress access is refused.
curl -s -o /dev/null -w "%{http_code}\n" "$W/progress?app=gre"
```
Expected: `401`

- [ ] **Step 6: Commit and push**

```bash
git add src/worker.js
git commit -m "Add router, CORS, constant auth delay; deploy"
git push -u origin main
```

---

## Definition of done (Phase 1)

- `npx vitest run` is green, including:
  - the write-quota guard asserting **zero writes** when over budget,
  - PIN spraying cut off at 30/hour,
  - captcha at 4 failures, hard lock at 20 with escalation,
  - byte-identical responses for unknown-user vs wrong-PIN.
- The Worker is deployed and `/health` answers.
- `curl` reproduces the adversarial results above against the live deployment.
- `TURNSTILE_SECRET` is set via `wrangler secret put` and **appears nowhere** in the repo or the transcript.
- The deployed URL and the Turnstile **site key** are recorded for Phase 2.

**Phase 2 (client sync + UI in Network+, then GRE) gets its own plan, written once this API is real.**
