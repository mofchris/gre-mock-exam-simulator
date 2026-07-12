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

  var StudySync = { initSync: initSync, merge: merge };
  if (typeof window !== "undefined") { window.StudySync = StudySync; }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { merge: merge, initSync: initSync };
  }
})();
