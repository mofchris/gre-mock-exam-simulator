/* Scoring: section-adaptive raw → scaled (130–170) and percentile estimates.
   Tables approximate published ETS concordances for the shorter GRE. */
(function () {
  "use strict";
  const GRE = window.GRE = window.GRE || {};

  // Section 1 raw (out of 12) decides the Section 2 pool.
  GRE.routeFor = function (s1raw) {
    if (s1raw <= 6) return "easy";
    if (s1raw <= 9) return "medium";
    return "hard";
  };

  // raw = S1 raw (0–12) + S2 raw (0–15), total 0–27.
  // Path caps/floors approximate the real algorithm's behavior: the hard path
  // unlocks 165–170; the easy path tops out in the low 150s.
  GRE.rawToScaled = function (raw, path) {
    raw = Math.max(0, Math.min(27, raw));
    let scaled;
    if (path === "hard")       scaled = 145 + Math.round(raw * 25 / 27);
    else if (path === "medium") scaled = 137 + Math.round(raw * 26 / 27);
    else                        scaled = 130 + Math.round(raw * 22 / 27);
    return Math.max(130, Math.min(170, scaled));
  };

  // Approximate ETS percentile tables (2023–2025 test-taker pool).
  const PCT_V = {
    170: 99, 169: 99, 168: 98, 167: 98, 166: 97, 165: 96, 164: 94, 163: 93,
    162: 90, 161: 88, 160: 86, 159: 82, 158: 80, 157: 75, 156: 73, 155: 68,
    154: 64, 153: 60, 152: 55, 151: 51, 150: 47, 149: 41, 148: 38, 147: 33,
    146: 30, 145: 26, 144: 23, 143: 19, 142: 17, 141: 14, 140: 12, 139: 9,
    138: 8, 137: 6, 136: 5, 135: 4, 134: 3, 133: 2, 132: 1, 131: 1, 130: 1
  };
  const PCT_Q = {
    170: 92, 169: 89, 168: 86, 167: 83, 166: 80, 165: 76, 164: 72, 163: 69,
    162: 65, 161: 62, 160: 58, 159: 54, 158: 51, 157: 47, 156: 44, 155: 40,
    154: 37, 153: 33, 152: 30, 151: 27, 150: 24, 149: 21, 148: 18, 147: 16,
    146: 14, 145: 12, 144: 10, 143: 8, 142: 7, 141: 6, 140: 5, 139: 4,
    138: 3, 137: 2, 136: 2, 135: 1, 134: 1, 133: 1, 132: 1, 131: 1, 130: 1
  };

  GRE.percentile = function (measure, scaled) {
    const t = measure === "verbal" ? PCT_V : PCT_Q;
    return t[scaled] != null ? t[scaled] : 1;
  };
})();
