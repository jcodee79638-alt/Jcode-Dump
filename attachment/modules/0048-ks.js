
class ks {
  static #t;
  static toDateObject(t) {
    if (t instanceof Date) return t;
    if (!t || typeof t != "string") return null;
    this.#t ||= new RegExp(
      "^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+\\-])?(\\d{2})?'?(\\d{2})?'?",
    );
    const e = this.#t.exec(t);
    if (!e) return null;
    const s = parseInt(e[1], 10);
    let i = parseInt(e[2], 10);
    i = i >= 1 && i <= 12 ? i - 1 : 0;
    let n = parseInt(e[3], 10);
    n = n >= 1 && n <= 31 ? n : 1;
    let r = parseInt(e[4], 10);
    r = r >= 0 && r <= 23 ? r : 0;
    let a = parseInt(e[5], 10);
    a = a >= 0 && a <= 59 ? a : 0;
    let o = parseInt(e[6], 10);
    o = o >= 0 && o <= 59 ? o : 0;
    const l = e[7] || "Z";
    let h = parseInt(e[8], 10);
    h = h >= 0 && h <= 23 ? h : 0;
    let d = parseInt(e[9], 10) || 0;
    return (
      (d = d >= 0 && d <= 59 ? d : 0),
      l === "-" ? ((r += h), (a += d)) : l === "+" && ((r -= h), (a -= d)),
      new Date(Date.UTC(s, i, n, r, a, o))
    );
  }
}