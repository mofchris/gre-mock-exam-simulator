# Dark Mode (GRE + Network+) — Design

**Applies to:** `C:/Users/mofch/OneDrive/Desktop/GRE` and `C:/Users/mofch/OneDrive/Desktop/network-plus-mock-exam` (both live on GitHub Pages under `mofchris.github.io`).

**Driver:** night studying — the all-light palette is blinding in the dark.

## 1. Decisions (user-approved)

- **Auto + manual toggle:** follows the OS `prefers-color-scheme` by default; a header toggle overrides. Cycle: auto → dark → light.
- **Everything themes, exam dimmed:** exam-taking screens go dark too, but on an **elevated surface tier** (one step lighter than the app background) to keep passages, charts, PBQs, and the calculator high-contrast.
- **Approach A:** JS-resolved theme attribute + a single dark token block per stylesheet.

## 2. Architecture

### 2.1 theme.js (byte-identical in both repos — same portability rule as sync.js)

A small `js/theme.js`, loaded in `<head>` **before** `css/style.css` so the attribute is set pre-paint (no white flash at night). No dependencies, no namespace requirement (it must run before the app namespace exists). Exposes one global `StudyTheme`:

- `StudyTheme.mode()` → `"auto" | "dark" | "light"` (stored preference; absent = auto)
- `StudyTheme.resolved()` → `"dark" | "light"` (what is actually applied)
- `StudyTheme.cycle()` → advances auto → dark → light → auto, persists, re-applies, returns new mode
- `StudyTheme.onChange(fn)` → subscribe (used by the header button to update its icon/tooltip)

Behavior:
- Reads localStorage key **`study-theme`** (`"dark"` | `"light"`; absent/anything else = auto). Same-origin on Pages ⇒ the choice is shared across both apps, like `study-sync-auth`.
- Applies `data-theme="dark"` or `data-theme="light"` to `document.documentElement` (always explicit — CSS keys off `[data-theme="dark"]` only).
- In auto mode, subscribes to `matchMedia("(prefers-color-scheme: dark)")` changes and re-applies live; in an overridden mode the media listener is ignored.
- localStorage unavailable (private mode) ⇒ auto mode, no persistence, no errors.

### 2.2 CSS: tokenize, then one dark block (per repo — stylesheets differ)

1. **Tokenization pass (mechanical, no visual change):** promote every hardcoded color outside `:root` (~60 per stylesheet: `#fff`, `#f2f6fb`, semantic greens/reds, white-alpha overlays, etc.) to tokens — reusing existing tokens where the value matches, adding new ones (e.g. `--surface`, `--overlay-*`) where none exists. After this pass the stylesheet contains **zero color literals outside token blocks**. Verification: a grep for `#hex`/`rgb(a)` outside the token blocks returns nothing.
2. **Dark block:** one `[data-theme="dark"] { … }` block redefining tokens. Palette principles:
   - Page: deep desaturated blue-gray (not pure black), consistent with each app's existing hue family
   - Cards/frames: elevated a step above page; borders visible but soft
   - Ink/muted/sub: warm light grays tuned for WCAG AA against their surfaces (body text ≥ 4.5:1)
   - Accent family: lightened/desaturated variants keeping ≥ 3:1 on interactive elements; focus ring stays clearly visible
   - Semantic (good/bad/amber, verbal/quant, pick): re-tuned for dark, same meaning mapping
   - Shadows: reduced/replaced with subtle borders (drop shadows read as dirt on dark)
   - `color-scheme: dark` set so native controls (scrollbars, inputs) follow
3. **Exam tier:** exam-context tokens (`--exam-head`, exam/PBQ/calculator surfaces) map to the **elevated** tier in dark — one step lighter than the app page — implemented purely in the dark token block (no structural CSS changes). The plan identifies the exact exam-scoped selectors/tokens per app from the real stylesheets.

### 2.3 Header toggle

Sun/moon icon button in the header right group (`.topright`, next to the sync widget), rendered by each app's `chrome()`. Text glyphs, no new fonts/images: **☀** (light), **☾** (dark), **◐** (auto — half-filled circle read as "follows system"). Tooltip/aria-label states the mode: "Theme: auto (dark)" / "Theme: dark" / "Theme: light". Click calls `StudyTheme.cycle()`; the button re-renders via `StudyTheme.onChange`. Keyboard/focus styles inherit existing `.btn` treatment.

### 2.4 Mobile header (user requirement: must not be cramped)

Today at ≤720px `.tophead` merely `flex-wrap`s, so brand + nav + sync pill + the new theme button would wrap unpredictably. Replace with a **controlled two-row layout** at ≤720px, pure CSS:

- **Row 1:** brand block left; a compact chip cluster right (`.topright`): the sync pill **collapses to its status dot only** (username hidden — full detail remains one tap away in the account modal) and the theme button is its single glyph (~36px tap target, ≥40px hit area via padding).
- **Row 2:** the nav gets `order` + `flex-basis: 100%` so it drops to its own full-width row, buttons evenly spread (`flex: 1`) — same pattern the exam toolbar already uses at this breakpoint (`.tbtn { flex: 1 }`), so it reads as native to the design.
- Tap targets ≥ 40px, no horizontal scrolling, nothing truncated except the intentionally hidden pill username.

This costs ~10 lines of CSS per app inside the existing `@media (max-width: 720px)` block and degrades gracefully between 720px and desktop (pill keeps the username as long as it fits, `min-width: 0` + ellipsis already handle the squeeze).

## 3. Touches per app

1. `index.html`: `<script src="js/theme.js">` in `<head>` before the stylesheet link
2. `js/theme.js`: new (byte-identical both repos; drift check like sync.js)
3. `css/style.css`: tokenization pass + `[data-theme="dark"]` block
4. `js/app.js` `chrome()`: theme button in `.topright`

Nothing else changes. sync.js is untouched (its UI is already fully tokenized).

## 4. Out of scope

- Per-app theme divergence (one shared preference by design)
- Syncing the theme through the account (device-local like the real OS setting)
- New fonts, imagery, or non-color styling changes
- Chart/canvas recoloring beyond tokens (verified: no inline colors in either app's JS; NP's pbq.js to be re-verified during planning)

## 5. Testing

- **Visual pass per app (live browser):** every screen in dark — dashboard, course, tutor, exam (all question formats incl. split-screen RC / DI charts / NP PBQs), calculator, results/score report, history, auth modal + segmented PIN, sync states — no white flashes, no unreadable text, no light-mode remnants
- **Contrast spot-checks:** body text, muted text, accent buttons, semantic states against their actual dark surfaces (AA for text)
- **Mechanics:** auto follows OS live (emulate `prefers-color-scheme` flip); cycle persists across reloads; `study-theme` absent = auto; no-flash on cold load at night (script-before-stylesheet verified)
- **Mobile pass (375×812 and 360×640, both themes, both apps):** two-row header renders un-cramped — dot-only pill, glyph theme button, full-width evenly-spread nav; no horizontal scroll anywhere; account modal still shows full username/status; tap targets ≥ 40px
- **Drift check:** `git diff --no-index` on the two `theme.js` copies is empty
- **Regression:** light mode pixel-safe after the tokenization pass (it must be a no-op in light); merge tests still 10/10; anonymous invariant untouched

## 6. Rollout

Per-repo CSS work is independent ⇒ **two parallel lanes** (GRE lane, NP lane) sharing the plan's verbatim theme.js, with the byte-identity drift check at the end. Push both; Pages auto-deploys.
