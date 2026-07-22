# How to Run Locally and Deploy Your Own Copy

Run the simulator on your machine, or host your own public copy on GitHub Pages.
End result: the app running at a URL you control.

## Prerequisites

- Any modern browser.
- For local serving: Python 3 (optional. The app also runs straight from the file system).
- For deploying: a GitHub account and either the `gh` CLI or the GitHub web UI.

## Run locally

Three options, pick one:

1. **Zero setup**: double-click `index.html`. The app runs straight from the file
   system. Account sync and offline caching both need a real server, so over
   `file://` you get the anonymous, online-only experience.

2. **Windows launcher**: double-click `start.bat`. It starts a local server on
   port 8420 and opens your browser at `http://localhost:8420` (falls back to opening
   `index.html` directly if Python isn't installed).

3. **Any OS, manual**: 

   ```bash
   cd gre-mock-exam-simulator
   python -m http.server 8420
   ```

   Then open http://localhost:8420.

### Verification

The home screen's footer shows the loaded bank, e.g. *"Question bank: 86 verbal ·
111 quant · 40 essay prompts."* If a count reads 0, a `data/*.js` file failed to load: 
open the browser console (F12) to see which.

## Deploy your own copy on GitHub Pages

1. Fork or clone-and-push the repo:

   ```bash
   gh repo fork mofchris/gre-mock-exam-simulator --clone
   ```

   (Or click **Fork** on GitHub.)

2. Enable Pages on your fork, serving the `main` branch root:

   ```bash
   gh api -X POST repos/<your-username>/gre-mock-exam-simulator/pages \
     -f "source[branch]=main" -f "source[path]=/"
   ```

   Or in the web UI: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.

3. Wait ~1 minute for the first build, then visit:

   ```
   https://<your-username>.github.io/gre-mock-exam-simulator/
   ```

Every later push to `main` redeploys automatically. There is no build step to configure
because there is no build.

### Verification

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://<your-username>.github.io/gre-mock-exam-simulator/
```

`200` means live. Load the page and confirm the bank counts in the footer.

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

## Troubleshooting

- **Page is a 404 right after enabling Pages**. The first build takes a minute; check
  status with `gh api repos/<you>/<repo>/pages --jq .status` and wait for `built`.
- **App loads but a section won't assemble / questions missing**. A data file has a
  syntax error. Run `node --check data/yourfile.js` locally; the browser console names
  the failing file.
- **Scores/history vanished**: state lives in the browser's localStorage per-origin.
  Switching from `localhost` to the Pages URL (or clearing site data) starts fresh;
  nothing is synced between origins.

## Related

- Adding your own questions before deploying: [How to add questions](howto-add-questions.md)
- What the app stores locally: [Architecture reference](reference-architecture.md#localstorage-schema)
