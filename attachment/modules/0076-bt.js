
class bt {
  static ALT = 1;
  static CTRL = 2;
  static META = 4;
  static SHIFT = 8;
  constructor(t) {
    this.callbacks = new Map();
    const { isMac: e } = j.platform;
    for (const [s, i, n = {}] of t) {
      const r = s.some((a) => a.startsWith("mac+"));
      for (const a of s) {
        let o = a;
        if (r) {
          const d = a.startsWith("mac+");
          if (e !== d) continue;
          d && (o = a.slice(4));
        }
        const [l, h] = bt.#t(o);
        l !== null &&
          this.callbacks.getOrInsertComputed(l, pe).push({ callback: i, options: n, modifiers: h });
      }
    }
  }
  static #t(t) {
    let e = null,
      s = 0;
    for (let i of t.split("+")) {
      if (((i = i.trim()), !i)) continue;
      const n = i.toUpperCase(),
        r = bt[n];
      if (r) {
        s |= r;
        continue;
      }
      if (e !== null) {
        H(`KeyboardManager: multiple keys in shortcut "${t}"`);
        break;
      }
      e = n === "SPACE" ? " " : i;
    }
    return (e === null && H(`KeyboardManager: no key found in shortcut "${t}"`), [e, s]);
  }
  static #e(t) {
    const e = /^(?:Key([A-Z])|(?:Digit|Numpad)(\d))$/.exec(t);
    return e ? (e[1]?.toLowerCase() ?? e[2]) : null;
  }
  exec(t, e) {
    let s = this.callbacks.get(e.key);
    if (!s) {
      if (/^[a-z]$/i.test(e.key)) return;
      const h = bt.#e(e.code);
      if (h === null || h === e.key || ((s = this.callbacks.get(h)), !s)) return;
    }
    const i =
        (e.altKey ? bt.ALT : 0) |
        (e.ctrlKey ? bt.CTRL : 0) |
        (e.metaKey ? bt.META : 0) |
        (e.shiftKey ? bt.SHIFT : 0),
      n = s.find((h) => h.modifiers === i);
    if (!n) return;
    const {
      callback: r,
      options: { bubbles: a = !1, args: o = [], checker: l = null },
    } = n;
    (l && !l(t, e)) || (r.bind(t, ...o, e)(), a || rt(e));
  }
}