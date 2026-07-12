/* GRE on-screen calculator - 8-digit display, order of operations, parentheses,
   memory keys, sqrt, +/-, Transfer Display. Modeled on the real GRE calculator. */
(function () {
  "use strict";
  const GRE = window.GRE = window.GRE || {};

  const C = {
    node: null,
    entry: "0",          // current entry being typed
    fresh: true,         // next digit replaces entry
    tokens: [],          // committed tokens: numbers, ops, parens
    memory: 0,
    hasMemory: false,
    error: false,
    transferTarget: null // set by numeric-entry questions
  };

  const MAXDIGITS = 8;

  function fits(n) {
    if (!isFinite(n)) return false;
    return Math.abs(n) < 1e8 && String(roundDisp(n)).replace(/[-.]/g, "").length <= MAXDIGITS + 1;
  }
  function roundDisp(n) {
    // round to 8 significant-ish digits like the real calc
    const r = parseFloat(n.toPrecision(8));
    return Math.abs(r) < 1e-12 ? 0 : r;
  }

  function display() {
    const d = C.node.querySelector(".calc-display");
    d.textContent = C.error ? "Error" : C.entry;
    const m = C.node.querySelector(".calc-mem");
    m.textContent = C.hasMemory ? "M = " + roundDisp(C.memory) : "";
  }

  function clearAll() {
    C.entry = "0"; C.fresh = true; C.tokens = []; C.error = false;
  }

  function digit(d) {
    if (C.error) return;
    if (C.fresh) { C.entry = (d === "." ? "0." : d); C.fresh = false; return; }
    if (d === "." && C.entry.includes(".")) return;
    if (C.entry.replace(/[-.]/g, "").length >= MAXDIGITS && d !== ".") return;
    C.entry = (C.entry === "0" && d !== ".") ? d : C.entry + d;
  }

  function op(o) {
    if (C.error) return;
    // committing current entry then operator; allow operator replacement
    const last = C.tokens[C.tokens.length - 1];
    if (C.fresh && typeof last === "string" && "+-*/".includes(last)) {
      C.tokens[C.tokens.length - 1] = o;
      return;
    }
    // after a closing paren the operand is already in the token stream
    if (!(C.fresh && last === ")")) {
      C.tokens.push(parseFloat(C.entry));
    }
    C.tokens.push(o);
    C.fresh = true;
  }

  function paren(p) {
    if (C.error) return;
    if (p === "(") {
      const last = C.tokens[C.tokens.length - 1];
      if (!C.fresh && last !== undefined && typeof last !== "string") return;
      C.tokens.push("(");
    } else {
      if (!C.fresh) { C.tokens.push(parseFloat(C.entry)); C.fresh = true; }
      const open = C.tokens.filter(t => t === "(").length;
      const close = C.tokens.filter(t => t === ")").length;
      if (open > close) C.tokens.push(")");
      // show the value of the just-closed group
      const val = tryEval(C.tokens);
      if (val !== null) { C.entry = String(roundDisp(val)); }
    }
  }

  function tryEval(tokens) {
    try {
      const v = evalTokens(tokens.slice());
      return (v === null || !isFinite(v)) ? null : v;
    } catch (e) { return null; }
  }

  // shunting-yard evaluation with * / precedence
  function evalTokens(tokens) {
    if (!tokens.length) return null;
    const out = [], ops = [];
    const prec = { "+": 1, "-": 1, "*": 2, "/": 2 };
    const apply = () => {
      const o = ops.pop(), b = out.pop(), a = out.pop();
      if (a === undefined || b === undefined) throw new Error("bad");
      let r;
      if (o === "+") r = a + b; else if (o === "-") r = a - b;
      else if (o === "*") r = a * b;
      else { if (b === 0) throw new Error("div0"); r = a / b; }
      out.push(r);
    };
    for (const t of tokens) {
      if (typeof t === "number") out.push(t);
      else if (t === "(") ops.push(t);
      else if (t === ")") {
        while (ops.length && ops[ops.length - 1] !== "(") apply();
        ops.pop();
      } else {
        while (ops.length && ops[ops.length - 1] !== "(" && prec[ops[ops.length - 1]] >= prec[t]) apply();
        ops.push(t);
      }
    }
    while (ops.length) { if (ops[ops.length - 1] === "(") { ops.pop(); continue; } apply(); }
    if (out.length !== 1) throw new Error("bad");
    return out[0];
  }

  function equals() {
    if (C.error) return;
    const toks = C.tokens.slice();
    const lastTok = toks[toks.length - 1];
    if (!toks.length || (typeof lastTok === "string" && lastTok !== ")") ||
        (!C.fresh && lastTok !== ")")) {
      toks.push(parseFloat(C.entry));
    }
    let v;
    try { v = evalTokens(toks); } catch (e) { v = NaN; }
    if (v === null || !isFinite(v) || !fits(v)) { C.error = true; C.tokens = []; }
    else { C.entry = String(roundDisp(v)); C.tokens = []; C.fresh = true; }
  }

  function sqrt() {
    if (C.error) return;
    const v = parseFloat(C.entry);
    if (v < 0) { C.error = true; return; }
    const r = Math.sqrt(v);
    if (!fits(r)) { C.error = true; return; }
    C.entry = String(roundDisp(r)); C.fresh = true;
  }

  function plusminus() {
    if (C.error) return;
    if (C.entry === "0") return;
    C.entry = C.entry.startsWith("-") ? C.entry.slice(1) : "-" + C.entry;
  }

  function key(k) {
    switch (k) {
      case "MR": if (C.hasMemory) { C.entry = String(roundDisp(C.memory)); C.fresh = true; C.error = false; } break;
      case "MC": C.memory = 0; C.hasMemory = false; break;
      case "M+": if (!C.error) { C.memory += parseFloat(C.entry); C.hasMemory = true; C.fresh = true; } break;
      case "CE": C.entry = "0"; C.fresh = true; C.error = false; break;
      case "C": clearAll(); break;
      case "=": equals(); break;
      case "√": sqrt(); break;
      case "±": plusminus(); break;
      case "(": case ")": paren(k); break;
      case "+": op("+"); break;
      case "−": op("-"); break;
      case "×": op("*"); break;
      case "÷": op("/"); break;
      default: digit(k);
    }
    display();
  }

  function build() {
    const el = GRE.el;
    const node = el("div", {
      class: "calc hidden", role: "dialog", "aria-label": "On-screen calculator"
    });
    node.style.left = "60px"; node.style.top = "150px";

    const head = el("div", { class: "calc-head" },
      el("span", null, "Calculator"),
      el("button", { onclick: () => C.hide(), title: "Close", "aria-label": "Close calculator" },
        GRE.icon("x", 14, 2.4)));
    node.appendChild(head);
    node.appendChild(el("div", {
      class: "calc-display", role: "status", "aria-live": "polite", "aria-label": "Display"
    }, "0"));
    node.appendChild(el("div", { class: "calc-mem" }));

    // Key set is unchanged: parentheses and CE are kept because the evaluator
    // supports them, and removing them would take capability away.
    const keys = [
      "MR", "MC", "M+", "(", ")",
      "7", "8", "9", "÷", "CE",
      "4", "5", "6", "×", "C",
      "1", "2", "3", "−", "√",
      "±", "0", ".", "+", "="
    ];
    const grid = el("div", { class: "calc-grid" });
    keys.forEach(k => {
      const isOp = ["÷", "×", "−", "+", "√", "(", ")", "CE", "C", "MR", "MC", "M+", "±"].includes(k);
      const cls = k === "=" ? "eq" : isOp ? "op" : "";
      grid.appendChild(el("button", { class: cls, type: "button", onclick: () => key(k) }, k));
    });
    node.appendChild(grid);

    const tr = el("button", { class: "calc-transfer", onclick: () => {
      if (C.error) return;
      const t = C.transferTarget;
      if (t && document.body.contains(t)) {
        t.value = C.entry;
        t.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } }, "Transfer Display");
    node.appendChild(tr);

    // dragging
    let drag = null;
    head.addEventListener("mousedown", e => {
      if (e.target.tagName === "BUTTON") return;
      drag = { x: e.clientX - node.offsetLeft, y: e.clientY - node.offsetTop };
      e.preventDefault();
    });
    document.addEventListener("mousemove", e => {
      if (!drag) return;
      node.style.left = Math.max(0, e.clientX - drag.x) + "px";
      node.style.top = Math.max(0, e.clientY - drag.y) + "px";
    });
    document.addEventListener("mouseup", () => { drag = null; });

    document.body.appendChild(node);
    return node;
  }

  C.show = function () {
    if (!C.node) C.node = build();
    C.node.classList.remove("hidden");
    display();
  };
  C.hide = function () { if (C.node) C.node.classList.add("hidden"); };
  C.isHidden = function () { return !C.node || C.node.classList.contains("hidden"); };
  C.toggle = function () { if (C.isHidden()) C.show(); else C.hide(); };
  C.reset = function () { clearAll(); C.memory = 0; C.hasMemory = false; if (C.node) display(); };

  GRE.calc = C;
})();
