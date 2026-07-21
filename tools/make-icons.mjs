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
