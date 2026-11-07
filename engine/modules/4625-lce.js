
class lce {
  constructor() {
    (JN.set(this, void 0),
      KN.set(this, void 0),
      Ic(this, JN, new Uint8Array(), "f"),
      Ic(this, KN, null, "f"));
  }
  decode(e) {
    if (e == null) return [];
    let t = e instanceof ArrayBuffer ? new Uint8Array(e) : typeof e === "string" ? dJe(e) : e;
    Ic(this, JN, dWi([Ps(this, JN, "f"), t]), "f");
    let r = [],
      s;
    while ((s = FBa(Ps(this, JN, "f"), Ps(this, KN, "f"))) != null) {
      if (s.carriage && Ps(this, KN, "f") == null) {
        Ic(this, KN, s.index, "f");
        continue;
      }
      if (Ps(this, KN, "f") != null && (s.index !== Ps(this, KN, "f") + 1 || s.carriage)) {
        (r.push(Oxr(Ps(this, JN, "f").subarray(0, Ps(this, KN, "f") - 1))),
          Ic(this, JN, Ps(this, JN, "f").subarray(Ps(this, KN, "f")), "f"),
          Ic(this, KN, null, "f"));
        continue;
      }
      let a = Ps(this, KN, "f") !== null ? s.preceding - 1 : s.preceding,
        H = Oxr(Ps(this, JN, "f").subarray(0, a));
      (r.push(H), Ic(this, JN, Ps(this, JN, "f").subarray(s.index), "f"), Ic(this, KN, null, "f"));
    }
    return r;
  }
  flush() {
    if (!Ps(this, JN, "f").length) return [];
    return this.decode(`
`);
  }
}