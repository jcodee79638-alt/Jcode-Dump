
class GPe {
  constructor() {
    (e9.set(this, void 0),
      t9.set(this, void 0),
      wu(this, e9, new Uint8Array(), "f"),
      wu(this, t9, null, "f"));
  }
  decode(e) {
    if (e == null) return [];
    let t = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e === "string" ? qPe(e) : e;
    wu(this, e9, TVi([us(this, e9, "f"), t]), "f");
    let r = [],
      s;
    while ((s = JRa(us(this, e9, "f"), us(this, t9, "f"))) != null) {
      if (s.carriage && us(this, t9, "f") == null) {
        wu(this, t9, s.index, "f");
        continue;
      }
      if (us(this, t9, "f") != null && (s.index !== us(this, t9, "f") + 1 || s.carriage)) {
        (r.push(ZSr(us(this, e9, "f").subarray(0, us(this, t9, "f") - 1))),
          wu(this, e9, us(this, e9, "f").subarray(us(this, t9, "f")), "f"),
          wu(this, t9, null, "f"));
        continue;
      }
      let a = us(this, t9, "f") !== null ? s.preceding - 1 : s.preceding,
        H = ZSr(us(this, e9, "f").subarray(0, a));
      (r.push(H), wu(this, e9, us(this, e9, "f").subarray(s.index), "f"), wu(this, t9, null, "f"));
    }
    return r;
  }
  flush() {
    if (!us(this, e9, "f").length) return [];
    return this.decode(`
`);
  }
}