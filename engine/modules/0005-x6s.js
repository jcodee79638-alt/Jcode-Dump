
var x6s,
  S6s,
  Tl = (e, t, r) => {
    var s = e != null && typeof e === "object";
    if (s) {
      var a = t ? (x6s ??= new WeakMap()) : (S6s ??= new WeakMap()),
        H = a.get(e);
      if (H) return H;
    }
    r = e != null ? I6s(D6s(e)) : {};
    let u =
      t || !e || !e.__esModule || !sZr.call(e, "default")
        ? $Jt(r, "default", { value: e, enumerable: !0 })
        : r;
    if ((e && typeof e === "object") || typeof e === "function") {
      for (let f of y6s(e)) if (!sZr.call(u, f)) $Jt(u, f, { get: M6s.bind(e, f), enumerable: !0 });
    }
    if (s) a.set(e, u);
    return u;
  };