# Installable PWA (GRE + Network+) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the GRE and Network+ simulators installable to an iPhone home screen, launching chrome-less and working with no network — mirroring BARE METAL's setup.

**Architecture:** A `manifest.webmanifest` plus four iOS `<head>` tags make each app installable. A generated, committed `sw.js` precaches every static asset on install and serves cache-first, ported from Metal's `tools/sw/generate.ts`. Because these repos have no build step, a freshness test stands in for the guarantee Metal gets free from `npm run build`. All paths are relative so forks and `file://` keep working.

**Tech Stack:** Plain ES5-flavoured browser JS (no modules, no framework), Node 24 ESM for tooling, `node:test` for tests, headless Chrome for icon rendering. No new runtime dependencies, no package.json, no build step.

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-21-pwa-install-design.md`. Read it before starting.
- **Test command is bare `node --test`** run from the repo root. `node --test test/` fails on Node 24 — it tries to load `test/` as a module. Baseline before any change: **10 passing**.
- **No package.json, no npm dependencies, no build step** in either repo. Deploy stays "GitHub Pages serves `main` at root".
- **Every path is relative.** `start_url`/`scope` are `"./"`, `href="manifest.webmanifest"`, `register("sw.js")`, `new URL("./", self.location)`. Never hardcode `/gre-mock-exam-simulator/` or `/network-plus-mock-exam/`.
- **These three files are shared across both repos, differing by exactly one line each.** Same portability rule as `sync.js` and `theme.js` — these are two separate git repositories with no shared module system, so cross-repo copying is the established convention here, not accidental duplication.

  | File | The only permitted difference |
  | --- | --- |
  | `tools/build-sw.mjs` | `CACHE_PREFIX` — `"gre"` vs `"netplus"` |
  | `js/pwa.js` | the `console.error` prefix — `"GRE:"` vs `"NP:"` |
  | `test/sw-fresh.test.mjs` | the bundled-font count — `9` (GRE) vs `7` (Network+) |

  `tools/make-icons.mjs` is also near-duplicated across the two repos for the same reason; GRE's copy additionally inlines a webfont, which Network+ does not need.
- **Colours come from existing tokens only.** Navy `#101827` (`--headink`), GRE blue `#2f63c6` (`--accent`), Network+ amber `#c47b2a` (`--quant`). Invent nothing.
- **Icons are square, full-bleed, opaque, with no rounded corners baked in.** iOS applies its own squircle; transparency in an `apple-touch-icon` composites to black.
- **`purpose: "any"`** in the manifest — not `"any maskable"`.
- Commit after every task. Never use `--no-verify`.

**Repo paths:**
- GRE: `C:/Users/mofch/OneDrive/Desktop/Projects/GRE`
- Network+: `C:/Users/mofch/OneDrive/Desktop/Projects/network-plus-mock-exam`

---

### Task 1: GRE brand mark and icon PNGs

Renders the three icon files from a single HTML source. The mark is a Newsreader `G` on a navy block on the GRE blue. Drawn directly rather than knocked out through a `<mask>` — a navy block with a blue `G` on top is pixel-identical to a blue tile with the `G` masked out of a navy block, and avoids element IDs entirely.

**Files:**
- Create: `tools/icon.html`
- Create: `tools/make-icons.mjs`
- Create: `icons/icon-512.png`, `icons/icon-192.png`, `icons/apple-touch-icon.png`

**Interfaces:**
- Consumes: nothing.
- Produces: `icons/icon-512.png`, `icons/icon-192.png`, `icons/apple-touch-icon.png`. Task 3 precaches them, Task 4 links the apple-touch-icon, Task 5 uses `icons/icon-192.png` as the header mark.

- [ ] **Step 1: Create the mark source**

Create `tools/icon.html`. `%FONT%` is replaced with a base64 data URI at render time by `make-icons.mjs` — Chrome blocks `file://` webfont loads, so the face must be inlined.

```html
<!doctype html>
<meta charset="utf-8">
<title>GRE icon source</title>
<style>
  @font-face {
    font-family: "Newsreader"; font-style: normal; font-weight: 500;
    font-display: block; src: url(%FONT%) format("woff2");
  }
  html, body { margin: 0; padding: 0; background: #2f63c6; }
  svg { display: block; width: 100vw; height: 100vw; }
</style>
<!--
  GRE brand mark. Single source of truth for both the home-screen icon and the
  in-app header logo (js/app.js renders icons/icon-192.png rather than repeating
  this geometry).

  x/y centre the G on its MEASURED INK box, not its em box. Rendered at size 384
  anchored (0,384) the ink runs l=17 t=112 r=283 b=389, so the anchor is
  (106, 389.5). Anything else leaves the G visibly off-centre.
-->
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#2f63c6"/>
  <rect x="64" y="64" width="384" height="384" rx="84" fill="#101827"/>
  <text x="106" y="389.5" font-family="Newsreader" font-weight="500"
        font-size="384" fill="#2f63c6">G</text>
</svg>
```

- [ ] **Step 2: Write the renderer**

Create `tools/make-icons.mjs`:

```js
// Renders icons/ from tools/icon.html with headless Chrome.
// Run only when the brand mark changes:  node tools/make-icons.mjs
//
// Deliberately NOT wired into `node --test`: PNG bytes depend on the installed
// Chrome's rasteriser and would churn across browser updates. The icons are
// committed build products, regenerated on purpose.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Chrome renders each size natively rather than downsampling one big raster:
// these are vector marks, so native rasterisation is crisp at every size and
// keeps the tool dependency-free.
const TARGETS = [
  ["icons/icon-512.png", 512],
  ["icons/icon-192.png", 192],
  ["icons/apple-touch-icon.png", 180],
];

const CHROMES = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const chrome = CHROMES.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome not found. Set CHROME=/path/to/chrome and re-run.");
  process.exit(1);
}

// Inline the woff2: Chrome refuses to load a file:// webfont from a file://
// page, which would silently fall back to a system serif and change the mark.
const font = readFileSync(join(ROOT, "fonts/newsreader-500.woff2")).toString("base64");
const tmp = join(ROOT, "tools/.icon.build.html");
writeFileSync(
  tmp,
  readFileSync(join(ROOT, "tools/icon.html"), "utf8")
    .replace("%FONT%", `data:font/woff2;base64,${font}`),
);

try {
  for (const [out, size] of TARGETS) {
    execFileSync(
      chrome,
      [
        "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
        "--force-device-scale-factor=1", "--virtual-time-budget=5000",
        `--screenshot=${join(ROOT, out)}`,
        `--window-size=${size},${size}`,
        pathToFileURL(tmp).href,
      ],
      { stdio: "ignore" },
    );
    console.log(`${out}  ${size}x${size}`);
  }
} finally {
  unlinkSync(tmp);
}
```

- [ ] **Step 3: Render the icons**

```bash
cd "C:/Users/mofch/OneDrive/Desktop/Projects/GRE"
mkdir -p icons
node tools/make-icons.mjs
```

Expected output:

```
icons/icon-512.png  512x512
icons/icon-192.png  192x192
icons/apple-touch-icon.png  180x180
```

- [ ] **Step 4: Verify the output**

```bash
node -e "const b=require('fs').readFileSync('icons/icon-512.png');console.log('PNG',b.readUInt32BE(16)+'x'+b.readUInt32BE(20),'colorType',b[25])"
```

Expected: `PNG 512x512 colorType 2`. Color type 2 is RGB with **no alpha** — required for `apple-touch-icon`.

Then open `icons/icon-512.png` and confirm by eye: a blue tile, a navy rounded block inset from the edges, and a serif `G` in blue sitting visually centred in the block. If the `G` renders in a generic serif (flat, low contrast strokes) the font inlining failed — do not proceed.

- [ ] **Step 5: Commit**

```bash
git add tools/icon.html tools/make-icons.mjs icons/
git commit -m "GRE: brand mark and icon PNGs"
```

---

### Task 2: GRE manifest and iOS head tags

Makes the app installable and chrome-less. No offline yet — that lands in Task 4.

**Files:**
- Create: `manifest.webmanifest`
- Modify: `index.html` (head)

**Interfaces:**
- Consumes: `icons/icon-192.png`, `icons/icon-512.png`, `icons/apple-touch-icon.png` from Task 1.
- Produces: `manifest.webmanifest` at repo root — Task 3's allowlist precaches it by name.

- [ ] **Step 1: Create the manifest**

Create `manifest.webmanifest`. `start_url` and `scope` are `"./"` so they resolve against the manifest's own URL — the app works under any repo name and any fork.

```json
{
  "name": "GRE Mock Exam Simulator",
  "short_name": "GRE",
  "description": "A GRE mock exam simulator with an adaptive scoring model and a five-unit study course.",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#101827",
  "theme_color": "#101827",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" }
  ]
}
```

- [ ] **Step 2: Add the head tags**

In `index.html`, replace the existing viewport line and add the PWA block. The head becomes exactly:

```html
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>GRE Mock Exam Simulator</title>
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="GRE">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#101827">
<script src="js/theme.js"></script>
<link rel="stylesheet" href="css/style.css">
</head>
```

`viewport-fit=cover` is what lets Task 5's `env(safe-area-inset-*)` return non-zero. `black-translucent` puts the page under the status bar.

- [ ] **Step 3: Verify the manifest parses and points at real files**

```bash
node -e "const m=require('./manifest.webmanifest');const fs=require('fs');for(const i of m.icons){if(!fs.existsSync(i.src))throw new Error('missing '+i.src)};if(!fs.existsSync('icons/apple-touch-icon.png'))throw new Error('missing apple-touch-icon');console.log('manifest ok:',m.short_name,m.display,m.icons.length+' icons')"
```

Expected: `manifest ok: GRE standalone 2 icons`

- [ ] **Step 4: Confirm the app still runs**

```bash
node --test
```

Expected: `pass 10`, `fail 0`. Then open `index.html` directly in a browser and confirm the dashboard renders with no console errors.

- [ ] **Step 5: Commit**

```bash
git add manifest.webmanifest index.html
git commit -m "GRE: web app manifest and iOS install meta tags"
```

---

### Task 3: GRE service-worker generator and freshness test

The riskiest piece, so it gets tests first. A stale `sw.js` pins installed users to an old version forever — this test is what makes that impossible to ship silently.

**Files:**
- Create: `tools/build-sw.mjs`
- Create: `test/sw-fresh.test.mjs`
- Create: `sw.js` (generated, committed)

**Interfaces:**
- Consumes: `manifest.webmanifest` (Task 2), `icons/` (Task 1).
- Produces: `tools/build-sw.mjs`, exporting `build(root) → { version: string, urls: string[], source: string }` and `collect(root) → string[]`. `test/sw-fresh.test.mjs` imports **`build` only**; `collect` is exported for reuse and for debugging the allowlist from `node -e`. Task 4 registers the emitted `sw.js`.

- [ ] **Step 1: Write the failing test**

Create `test/sw-fresh.test.mjs`:

```js
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
```

- [ ] **Step 2: Run to verify it fails**

```bash
node --test
```

Expected: FAIL — `Cannot find module '../tools/build-sw.mjs'`.

- [ ] **Step 3: Write the generator**

Create `tools/build-sw.mjs`:

```js
// Generates sw.js — the precache service worker. Port of BARE METAL's
// tools/sw/generate.ts, adapted for a repo with no build step.
//
// Run after changing ANY app file:  node tools/build-sw.mjs
// test/sw-fresh.test.mjs fails if the committed sw.js is out of date, which is
// what stands in for the freshness Metal gets free from `npm run build`.

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// An allowlist, not a blocklist: docs/, test/, tools/, .claude/ and anything
// added later can never leak into the precache by accident. sw.js itself sits
// at root and is structurally incapable of precaching itself.
const DIRS = ["css", "js", "data", "fonts", "icons"];
const ROOT_FILES = ["index.html", "manifest.webmanifest"];
const CACHE_PREFIX = "gre";

export function collect(root = ROOT) {
  const out = [...ROOT_FILES];
  for (const dir of DIRS) out.push(...walk(root, dir));
  return out.sort();
}

function walk(root, rel) {
  const out = [];
  for (const name of readdirSync(join(root, rel))) {
    const child = `${rel}/${name}`;
    if (statSync(join(root, child)).isDirectory()) out.push(...walk(root, child));
    else out.push(child);
  }
  return out;
}

export function build(root = ROOT) {
  const files = collect(root);
  const hash = createHash("sha256");
  for (const f of files) {
    hash.update(f).update("\0").update(readFileSync(join(root, f)));
  }
  const version = hash.digest("hex").slice(0, 16);
  // "./" is the app shell: that is what a navigation to the directory actually
  // requests, and index.html is never fetched by that name.
  const urls = ["./", ...files.filter((f) => f !== "index.html")];
  return { version, urls, source: render(version, urls) };
}

function render(version, urls) {
  return `// Generated by tools/build-sw.mjs — do not edit by hand.
// Precache-on-install, cache-first. Ported from BARE METAL's tools/sw.
const CACHE = "${CACHE_PREFIX}-${version}";
const SHELL = "./";
const PRECACHE = ${JSON.stringify(urls, null, 2)};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      // skipWaiting: a freshly installed version takes over without waiting for
      // every old tab to close — the simplest update model for a one-person app.
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
      ))
      .then(() => self.clients.claim()),
  );
});

// ignoreVary matters: crossorigin-attributed loads send an Origin header whose
// Vary would otherwise fail to match the precached response. Everything cached
// here is a same-origin static asset keyed by URL alone.
const MATCH = { ignoreSearch: true, ignoreVary: true };

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  // Cross-origin is never intercepted. The sync API and Turnstile must always
  // reach the network so sync.js can report its own offline state.
  if (new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(req, MATCH).then((hit) => {
      if (hit) return hit;
      // Any navigation is the app shell; serve it so offline launch works.
      if (req.mode === "navigate") {
        return caches.match(SHELL, MATCH).then((shell) => shell || fetch(req));
      }
      return fetch(req);
    }),
  );
});
`;
}

// Only write when run directly, so importing this from a test has no side effect.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { version, urls, source } = build();
  writeFileSync(join(ROOT, "sw.js"), source);
  console.log(`sw.js: ${urls.length} URLs precached, cache ${CACHE_PREFIX}-${version}`);
}
```

- [ ] **Step 4: Generate sw.js and run the tests**

```bash
node tools/build-sw.mjs
node --test
```

Expected from the generator: `sw.js: 36 URLs precached, cache gre-<16 hex chars>` (exact count may differ; it must be over 30).
Expected from the tests: `pass 15`, `fail 0` — the original 10 plus 5 new.

- [ ] **Step 5: Prove the staleness guard actually fires**

This is the whole point of the task, so verify it rather than assume it.

```bash
printf '\n/* freshness probe */\n' >> css/style.css
node --test
```

Expected: FAIL with `sw.js is stale — run: node tools/build-sw.mjs`.

Now undo and confirm green again:

```bash
git checkout css/style.css
node --test
```

Expected: `pass 15`, `fail 0`.

- [ ] **Step 6: Commit**

```bash
git add tools/build-sw.mjs test/sw-fresh.test.mjs sw.js
git commit -m "GRE: precache service worker, generator and freshness test"
```

---

### Task 4: GRE service-worker registration

**Files:**
- Create: `js/pwa.js`
- Modify: `index.html` (end of body)
- Modify: `sw.js` (regenerated — `js/pwa.js` is a new precached file)

**Interfaces:**
- Consumes: `sw.js` from Task 3.
- Produces: `js/pwa.js` — byte-identical file reused verbatim in Task 7.

- [ ] **Step 1: Write the registration**

Create `js/pwa.js`. This is a direct port of Metal's `src/main.tsx:19-30`.

```js
/* Service-worker registration. Byte-identical in both repos — same portability
   rule as sync.js and theme.js.

   Ported from BARE METAL src/main.tsx: register inside a load listener, and
   log-only on failure. There is deliberately no UI for a failed registration —
   the app works identically without the worker, it just won't be available
   offline, and a console entry keeps it loud enough to notice while debugging.

   Metal guards registration behind import.meta.env.PROD so its dev server runs
   uncached. The equivalent here is the file: guard: service workers are
   unsupported over file://, and both READMEs document opening index.html
   directly as a supported way to run the app. */
(function () {
  "use strict";

  if (location.protocol === "file:") return;
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", function () {
    // Relative on purpose: resolves against the document, so the worker's scope
    // is whatever directory the app is deployed under.
    navigator.serviceWorker.register("sw.js").catch(function (e) {
      console.error("GRE: service worker registration failed", e);
    });
  });
})();
```

- [ ] **Step 2: Load it**

In `index.html`, add this as the **last** script before `</body>`, after `js/app.js`:

```html
<script src="js/pwa.js"></script>
```

- [ ] **Step 3: Regenerate and test**

`js/pwa.js` is a new file inside the allowlist, so the precache list and hash both change.

```bash
node tools/build-sw.mjs
node --test
```

Expected: `pass 15`, `fail 0`. If `sw.js is stale` appears, the regeneration in this step was skipped.

- [ ] **Step 4: Verify offline in a real browser**

Service workers need HTTPS or localhost, so `file://` will not exercise this.

```bash
python -m http.server 8420
```

Open `http://localhost:8420`, then in DevTools:
1. **Application → Manifest** — no errors, icons listed, `display: standalone`.
2. **Application → Service Workers** — one worker, status **activated and running**.
3. **Application → Cache Storage** — a `gre-<hash>` cache with 30+ entries.
4. Tick **Network → Offline**, then hard-reload. The dashboard must render completely: fonts, questions, everything.
5. With Offline still ticked, confirm the sync pill reads **"Offline — will retry when reconnected."** rather than throwing.

- [ ] **Step 5: Verify `file://` still works**

Open `index.html` by double-clicking it. The app must run with **no console errors** from `pwa.js` — the `file:` guard should make it a silent no-op.

- [ ] **Step 6: Commit**

```bash
git add js/pwa.js index.html sw.js
git commit -m "GRE: register the service worker"
```

---

### Task 5: GRE header mark and safe-area CSS

Two independent visual changes. The header mark renders `icons/icon-192.png` rather than repeating the SVG geometry, so the mark has exactly one source of truth.

**Files:**
- Modify: `js/app.js:81` (remove `logo` from `ICONS`), `js/app.js:281` (call site)
- Modify: `css/style.css:173` (`#app`), `css/style.css:194` (`.tophead .logo`), `css/style.css:389` (`.stage-inner`)
- Modify: `sw.js` (regenerated)

**Interfaces:**
- Consumes: `icons/icon-192.png` from Task 1.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Drop the old logo glyph**

In `js/app.js`, delete this line from the `ICONS` table (line 81):

```js
    logo:    { d: "M5 6h14M5 11h9M5 16h11" },
```

The `GRE.icon()` helper itself is untouched — the other ~20 icons still use it.

- [ ] **Step 2: Render the mark from the icon file**

In `js/app.js`, in `chrome()` (line 281), replace:

```js
        el("span", { class: "logo" }, GRE.icon("logo", 19)),
```

with:

```js
        // The header mark is the app icon itself — one source of truth for the
        // geometry, and it is precached, so it is available offline.
        el("span", { class: "logo", html: '<img src="icons/icon-192.png" alt="">' }),
```

- [ ] **Step 3: Restyle the logo box**

In `css/style.css`, replace the `.tophead .logo` rule (line 194):

```css
.tophead .logo {
  width: 34px; height: 34px; flex: 0 0 auto; border-radius: 9px;
  background: linear-gradient(150deg, var(--accent), var(--accent-lite));
  display: flex; align-items: center; justify-content: center; color: var(--on-dark);
}
```

with:

```css
/* The mark supplies its own field and rounding, so the box is just a clip. */
.tophead .logo {
  width: 34px; height: 34px; flex: 0 0 auto; border-radius: 9px;
  overflow: hidden; display: block;
}
.tophead .logo img { display: block; width: 100%; height: 100%; }
```

- [ ] **Step 4: Add the safe-area rules**

In `css/style.css`, replace the `#app` rule (line 173):

```css
#app { height: 100%; display: flex; flex-direction: column; }
```

with:

```css
#app {
  height: 100%; display: flex; flex-direction: column;
  /* Standalone on iOS the navy header runs under the status bar. Because
     box-sizing is border-box and height is 100%, this padding is drawn inside
     the height, so the column shrinks by exactly the inset and --headink shows
     through the strip. All three possible top headers (.tophead, .examhead,
     .crumb) are already --headink, so the seam is invisible in both themes.
     env() is 0px off-iOS, making this a no-op in a browser tab. */
  padding-top: env(safe-area-inset-top);
  background: var(--headink);
}
```

Then replace `.stage-inner` (line 389):

```css
.stage-inner { max-width: 980px; margin: 0 auto; padding: 26px 30px 40px; }
```

with:

```css
/* Bottom inset keeps scrolled content clear of the iPhone home indicator. */
.stage-inner {
  max-width: 980px; margin: 0 auto;
  padding: 26px 30px calc(40px + env(safe-area-inset-bottom));
}
```

- [ ] **Step 5: Regenerate and test**

```bash
node tools/build-sw.mjs
node --test
```

Expected: `pass 15`, `fail 0`.

- [ ] **Step 6: Verify visually**

Serve with `python -m http.server 8420` and check at 1280px and at 375×812 (DevTools device toolbar), in **both** light and dark:

1. The header shows the blue-and-navy `G` tile, crisp, correctly rounded, not stretched.
2. No stray navy strip above the header in a normal browser tab — the safe-area rule must be a no-op there.
3. The two-row mobile header still lays out correctly: brand on row 1 with the sync pill and theme button, nav on row 2.
4. Start an exam and confirm `.examhead` still sits flush at the top.

- [ ] **Step 7: Commit**

```bash
git add js/app.js css/style.css sw.js
git commit -m "GRE: new header mark, safe-area insets for standalone iOS"
```

---

### Task 6: Network+ brand mark and icon PNGs

The Signal fan-out: one run splitting into two, terminating at two navy nodes. Pure geometry — no text, so no font inlining is needed here.

> **Gate before starting.** The spec's rollout is sequential on purpose: Network+ copies three files from a *proven* GRE lane, so a service-worker bug found here would be a bug already duplicated. Do not start Task 6 until Task 4 Step 4 has passed on `localhost` — worker activated, cache populated, offline hard-reload rendering the full app. That localhost pass is the gate; full iPhone verification is Task 10 and covers both apps in one pass, since a second deploy cycle buys nothing the localhost check hasn't already caught.

**Files:**
- Create: `tools/icon.html`, `tools/make-icons.mjs` (in the Network+ repo)
- Create: `icons/icon-512.png`, `icons/icon-192.png`, `icons/apple-touch-icon.png`

**Interfaces:**
- Consumes: nothing.
- Produces: the three Network+ icon PNGs, consumed by Tasks 7 and 8.

- [ ] **Step 1: Create the mark source**

Create `tools/icon.html` in the **Network+** repo:

```html
<!doctype html>
<meta charset="utf-8">
<title>Network+ icon source</title>
<style>
  html, body { margin: 0; padding: 0; background: #c47b2a; }
  svg { display: block; width: 100vw; height: 100vw; }
</style>
<!--
  Network+ brand mark: one run fanning out to two, ending at two nodes —
  routing, rather than a generic dot-mesh or a menu stack.

  Single source of truth for both the home-screen icon and the in-app header
  logo (js/app.js renders icons/icon-192.png rather than repeating this).

  The translate(4.5 0) centres the mark's MEASURED ink box (l=87 t=138 r=416
  b=374) on the tile. Vertically it already sits true.
-->
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#c47b2a"/>
  <g transform="translate(4.5 0)">
    <g fill="none" stroke="#ffffff" stroke-width="50" stroke-linecap="round">
      <path d="M112 256h84c40 0 40-86 80-86h108"/>
      <path d="M112 256h84c40 0 40 86 80 86h108"/>
    </g>
    <g fill="#101827">
      <circle cx="384" cy="170" r="32"/>
      <circle cx="384" cy="342" r="32"/>
    </g>
  </g>
</svg>
```

- [ ] **Step 2: Write the renderer**

This is the GRE renderer minus the font inlining — the fan-out is pure geometry, so there is no webfont to smuggle past Chrome's `file://` restriction. Create `tools/make-icons.mjs` in the **Network+** repo with this complete content:

```js
// Renders icons/ from tools/icon.html with headless Chrome.
// Run only when the brand mark changes:  node tools/make-icons.mjs
//
// Deliberately NOT wired into `node --test`: PNG bytes depend on the installed
// Chrome's rasteriser and would churn across browser updates. The icons are
// committed build products, regenerated on purpose.
//
// Unlike the GRE copy this needs no font inlining — the mark is pure geometry.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Chrome renders each size natively rather than downsampling one big raster:
// these are vector marks, so native rasterisation is crisp at every size and
// keeps the tool dependency-free.
const TARGETS = [
  ["icons/icon-512.png", 512],
  ["icons/icon-192.png", 192],
  ["icons/apple-touch-icon.png", 180],
];

const CHROMES = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const chrome = CHROMES.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome not found. Set CHROME=/path/to/chrome and re-run.");
  process.exit(1);
}

const src = pathToFileURL(join(ROOT, "tools/icon.html")).href;

for (const [out, size] of TARGETS) {
  execFileSync(
    chrome,
    [
      "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
      "--force-device-scale-factor=1", "--virtual-time-budget=5000",
      `--screenshot=${join(ROOT, out)}`,
      `--window-size=${size},${size}`,
      src,
    ],
    { stdio: "ignore" },
  );
  console.log(`${out}  ${size}x${size}`);
}
```

- [ ] **Step 3: Render and verify**

```bash
cd "C:/Users/mofch/OneDrive/Desktop/Projects/network-plus-mock-exam"
mkdir -p icons
node tools/make-icons.mjs
node -e "const b=require('fs').readFileSync('icons/icon-512.png');console.log('PNG',b.readUInt32BE(16)+'x'+b.readUInt32BE(20),'colorType',b[25])"
```

Expected: three render lines, then `PNG 512x512 colorType 2`.

Open `icons/icon-512.png` and confirm: an amber tile, a white run entering from the left and splitting into two, each arm ending in a navy dot.

- [ ] **Step 4: Commit**

```bash
git add tools/icon.html tools/make-icons.mjs icons/
git commit -m "NP: brand mark and icon PNGs"
```

---

### Task 7: Network+ PWA machinery

Ports Tasks 2–4 in one pass. Three files are byte-identical copies; the rest differ only in per-app strings.

**Files:**
- Create: `manifest.webmanifest`, `js/pwa.js`, `tools/build-sw.mjs`, `test/sw-fresh.test.mjs`, `sw.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: Network+ icons from Task 6; the three shared files verbatim from Tasks 3–4.
- Produces: an installable, offline-capable Network+ app.

- [ ] **Step 1: Copy the three shared files verbatim**

```bash
cd "C:/Users/mofch/OneDrive/Desktop/Projects/network-plus-mock-exam"
GRE="C:/Users/mofch/OneDrive/Desktop/Projects/GRE"
cp "$GRE/js/pwa.js" js/pwa.js
cp "$GRE/tools/build-sw.mjs" tools/build-sw.mjs
cp "$GRE/test/sw-fresh.test.mjs" test/sw-fresh.test.mjs
```

- [ ] **Step 2: Apply the two per-app edits**

In `js/pwa.js`, change the log prefix only:

```js
      console.error("NP: service worker registration failed", e);
```

In `tools/build-sw.mjs`, change the cache prefix only:

```js
const CACHE_PREFIX = "netplus";
```

Everything else in both files stays byte-identical to GRE.

- [ ] **Step 3: Create the manifest**

Create `manifest.webmanifest`:

```json
{
  "name": "CompTIA Network+ Exam Simulator",
  "short_name": "Network+",
  "description": "A CompTIA Network+ N10-009 exam simulator with performance-based questions and a five-unit study course.",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#101827",
  "theme_color": "#101827",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" }
  ]
}
```

- [ ] **Step 4: Update index.html**

The head becomes exactly:

```html
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Network+ Exam Simulator</title>
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Network+">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#101827">
<script src="js/theme.js"></script>
<link rel="stylesheet" href="css/style.css">
</head>
```

And add as the last script before `</body>`, after `js/app.js`:

```html
<script src="js/pwa.js"></script>
```

- [ ] **Step 5: Generate and test**

```bash
node tools/build-sw.mjs
node --test
```

Before running, apply the one legitimate difference in the shared test. GRE bundles nine `.woff2` files (seven IBM Plex plus two Newsreader); **Network+ bundles seven** — it has no Newsreader, because its marks and UI use no serif. In the Network+ copy of `test/sw-fresh.test.mjs`, change:

```js
  assert.equal(fonts.length, 9, "all nine bundled woff2 files must be precached");
```

to:

```js
  assert.equal(fonts.length, 7, "all seven bundled woff2 files must be precached");
```

This is the **only** permitted divergence in that file. Then:

```bash
node tools/build-sw.mjs
node --test
```

Expected: `sw.js: <count> URLs precached, cache netplus-<hash>`, then `pass 15`, `fail 0`.

- [ ] **Step 6: Verify the drift check**

```bash
GRE="C:/Users/mofch/OneDrive/Desktop/Projects/GRE"
git diff --no-index "$GRE/tools/build-sw.mjs" tools/build-sw.mjs
git diff --no-index "$GRE/js/pwa.js" js/pwa.js
git diff --no-index "$GRE/test/sw-fresh.test.mjs" test/sw-fresh.test.mjs
```

Expected: exactly **one** changed line in each, and no more:

| File | The only permitted difference |
| --- | --- |
| `tools/build-sw.mjs` | `CACHE_PREFIX` — `"gre"` vs `"netplus"` |
| `js/pwa.js` | the `console.error` prefix — `"GRE:"` vs `"NP:"` |
| `test/sw-fresh.test.mjs` | the font count — `9` vs `7` |

Any other difference is drift and must be reconciled before committing.

- [ ] **Step 7: Verify offline**

Serve with `python -m http.server 8420` and repeat the Task 4 Step 4 checks against Network+: manifest valid, worker activated, `netplus-<hash>` cache populated, offline hard-reload renders fully, sync pill reads "Offline — will retry when reconnected."

- [ ] **Step 8: Commit**

```bash
git add manifest.webmanifest index.html js/pwa.js tools/build-sw.mjs test/sw-fresh.test.mjs sw.js
git commit -m "NP: manifest, iOS install meta, precache service worker"
```

---

### Task 8: Network+ header mark and safe-area CSS

**Files:**
- Modify: `js/app.js:76-77` (remove `logo` from `ICONS`), `js/app.js:266` (call site)
- Modify: `css/style.css:145` (`#app`), `css/style.css:165` (`.tophead .logo`), `css/style.css:329` (`.stage-inner`)
- Modify: `sw.js` (regenerated)

**Interfaces:**
- Consumes: `icons/icon-192.png` from Task 6.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Drop the old logo glyph**

In `js/app.js`, delete these two lines from the `ICONS` table (lines 76-77):

```js
    logo:     { d: "M6 8.4v3.2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8.4M12 13.6v2",
                circle3: [[6, 6, 2.4], [18, 6, 2.4], [12, 18, 2.4]] }
```

Note the preceding entry now needs its trailing comma removed so the object literal stays valid.

- [ ] **Step 2: Render the mark from the icon file**

In `chrome()` (line 266), replace:

```js
        el("span", { class: "logo" }, NP.icon("logo", 20)),
```

with:

```js
        // The header mark is the app icon itself — one source of truth for the
        // geometry, and it is precached, so it is available offline.
        el("span", { class: "logo", html: '<img src="icons/icon-192.png" alt="">' }),
```

- [ ] **Step 3: Restyle the logo box**

In `css/style.css`, replace the `.tophead .logo` rule (line 165) with:

```css
/* The mark supplies its own field and rounding, so the box is just a clip. */
.tophead .logo {
  width: 34px; height: 34px; flex: 0 0 auto; border-radius: 9px;
  overflow: hidden; display: block;
}
.tophead .logo img { display: block; width: 100%; height: 100%; }
```

- [ ] **Step 4: Add the safe-area rules**

Replace `#app` (line 145):

```css
#app {
  height: 100%; display: flex; flex-direction: column;
  /* Standalone on iOS the navy header runs under the status bar. Because
     box-sizing is border-box and height is 100%, this padding is drawn inside
     the height, so the column shrinks by exactly the inset and --headink shows
     through the strip. env() is 0px off-iOS, making this a no-op in a tab. */
  padding-top: env(safe-area-inset-top);
  background: var(--headink);
}
```

Replace `.stage-inner` (line 329):

```css
/* Bottom inset keeps scrolled content clear of the iPhone home indicator. */
.stage-inner {
  max-width: 980px; margin: 0 auto;
  padding: 26px 30px calc(40px + env(safe-area-inset-bottom));
}
```

- [ ] **Step 5: Regenerate, test, verify**

```bash
node tools/build-sw.mjs
node --test
```

Expected: `pass 15`, `fail 0`.

Then serve and check at 1280px and 375×812, both themes: the amber fan-out tile renders crisply in the header, no stray navy strip in a browser tab, the two-row mobile header still lays out correctly, and a PBQ screen still sits flush at the top.

- [ ] **Step 6: Commit**

```bash
git add js/app.js css/style.css sw.js
git commit -m "NP: new header mark, safe-area insets for standalone iOS"
```

---

### Task 9: Documentation

**Files:**
- Modify: `docs/howto-run-and-deploy.md` (GRE)
- Modify: `README.md` (both repos)

**Interfaces:**
- Consumes: everything above.
- Produces: nothing.

- [ ] **Step 1: Correct the false claim in the GRE deploy doc**

`docs/howto-run-and-deploy.md` currently says the app has *"no `fetch()` calls, so it works over `file://`"*. That stopped being true when `sync.js` landed. Replace that sentence with:

```markdown
1. **Zero setup**: double-click `index.html`. The app runs straight from the file
   system. Account sync and offline caching both need a real server, so over
   `file://` you get the anonymous, online-only experience.
```

- [ ] **Step 2: Add the install section**

Add to `docs/howto-run-and-deploy.md`, after the "Deploy your own copy" section:

```markdown
## Install it on your phone

1. **Sign in first, in Safari.** iOS gives a home-screen web app its own storage,
   separate from Safari's — an installed app does not inherit your browser
   history or progress. Signing in before you install means your progress syncs
   across instead of being stranded.
2. Open the Pages URL in Safari, tap **Share → Add to Home Screen**.
3. Launch it from the home screen. It opens without Safari's chrome, and the
   header runs under the status bar.
4. Sign in again inside the installed app to pull your progress across.

The first launch must be online — that is when the service worker installs and
precaches the app. After that it opens and runs with no network at all.

## When you change app files

`sw.js` pins installed users to a fixed list of files. Regenerate it after
editing anything under `css/`, `js/`, `data/`, `fonts/` or `icons/`, or
`index.html`:

    node tools/build-sw.mjs

Forgetting leaves installed users on the old version. `node --test` fails with
"sw.js is stale" if you do, so run the tests before pushing.

Regenerate the icons only when the brand mark changes:

    node tools/make-icons.mjs
```

- [ ] **Step 3: Add a README line to both repos**

Add under the "Take it here" line in each README:

```markdown
**Install it:** on iOS, open the hosted version in Safari and tap **Share → Add
to Home Screen**. It then launches like a native app and works fully offline.
Sign in before installing so your progress comes with you.
```

- [ ] **Step 4: Verify no stale test command survives**

```bash
grep -rn "node --test test/" . --include=*.md
```

Expected: no output. `node --test test/` fails on Node 24; the correct command is bare `node --test`.

- [ ] **Step 5: Commit both repos**

```bash
git add README.md docs/howto-run-and-deploy.md
git commit -m "Docs: home-screen install, offline behaviour, sw regeneration"
```

---

### Task 10: Device verification

The only test that actually matters. Nothing before this proves the feature works.

**Files:** none.

- [ ] **Step 1: Deploy both**

```bash
git push
```

Wait ~1 minute, then confirm both are live:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://mofchris.github.io/gre-mock-exam-simulator/
curl -s -o /dev/null -w "%{http_code}\n" https://mofchris.github.io/network-plus-mock-exam/
```

Expected: `200` for both.

- [ ] **Step 2: Sign in before installing**

On the iPhone, open both apps in Safari and sign in with your username and PIN. Confirm the sync pill shows your username. Do this **first** — an installed app starts with empty storage.

- [ ] **Step 3: Install both**

Share → Add to Home Screen for each. On the home screen confirm:
- GRE shows the blue-and-navy `G`; Network+ shows the amber fan-out. They are distinguishable at a glance.
- The labels read **GRE** and **Network+**.

- [ ] **Step 4: Check the standalone chrome**

Launch each from the home screen:
- No Safari address bar, no bottom toolbar.
- The navy header runs edge-to-edge under the clock and battery, with no black or white band between the status bar and the header.
- Rotate to landscape and back; the header stays correct.

- [ ] **Step 5: Sign in inside the installed apps**

Sign in again in each installed app and confirm your progress appears — the study unit and readiness percentage should match what Safari showed.

- [ ] **Step 6: The offline test**

Enable **airplane mode**, then fully close and cold-launch both apps:
- Each opens to a fully rendered dashboard: correct fonts, question counts, history.
- Take at least five questions of a mock exam in GRE and complete a PBQ in Network+.
- The sync pill reads **"Offline — will retry when reconnected."** — not an error.

- [ ] **Step 7: The update test**

Turn networking back on. On the desktop, make a visible change, regenerate, and push:

```bash
node tools/build-sw.mjs
git commit -am "Verify update propagation"
git push
```

Wait for Pages, then launch the installed app twice. The change must appear by the second launch — that is `skipWaiting()` plus `clients.claim()` working.

- [ ] **Step 8: Record the result**

If every check passes, the feature is done. If any fails, capture what you saw and stop rather than patching blind — a broken service worker is much harder to diagnose once installed on a device.

---

## Rollback

A bad `sw.js` is the one change here that is genuinely hard to undo, because installed clients keep serving from their cache. To retract it, deploy a worker that unregisters itself and clears its caches rather than simply deleting `sw.js` — a 404 leaves the old worker installed and in control:

```js
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim()),
  );
});
```

Everything else — manifest, meta tags, icons, CSS, the header mark — is a plain `git revert`.
