
var FQt = "~effect/SchemaTransformation/Transformation",
  Zg,
  BQt = (e) => {
    if (ONs(e)) return e;
    return new Zg(e.decode, e.encode);
  },
  UNs,
  gBe,
  RQt,
  Von,
  NNs = (e) => Dv(e) && typeof e.message === "string",
  FNs = (e) => {
    let r = Object.hasOwn(e, "cause") ? Error(e.message, { cause: qon(e.cause) }) : Error(e.message);
    if (typeof e.name === "string" && e.name !== "Error") r.name = e.name;
    if (typeof e.stack === "string") r.stack = e.stack;
    return r;
  },
  BNs = (e) => {
    try {
      let t = Qfe(e);
      return t === void 0 ? af(e) : JSON.parse(t);
    } catch {
      return af(e);
    }
  },
  RNs = (e, t, r) => {
    let s = { name: e.name, message: typeof e.message === "string" ? e.message : "" };
    if (t?.includeStack && typeof e.stack === "string") s.stack = e.stack;
    if (!t?.excludeCause && e.cause !== void 0) s.cause = r(e.cause);
    return s;
  },
  WNs = (e) => {
    let t = new WeakSet(),
      r = (s) => {
        if (Ttn(s)) {
          if (t.has(s)) return "[Circular]";
          t.add(s);
          let a = RNs(s, e, r);
          return (t.delete(s), a);
        }
        return BNs(s);
      };
    return r;
  },
  qon = (e) => (NNs(e) ? FNs(e) : e),
  Gon = (e) => Zq({ decode: qon, encode: WNs(e) }),
  Xon,
  Jon,
  Kon,
  zon;