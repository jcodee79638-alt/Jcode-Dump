
var W_ = "~effect/interfaces/Hash",
  ad = (e) => {
    switch (typeof e) {
      case "number":
        return Kfe(e);
      case "bigint":
        return N0(e.toString(10));
      case "boolean":
        return N0(String(e));
      case "symbol":
        return N0(String(e));
      case "string":
        return N0(e);
      case "undefined":
        return N0("undefined");
      case "function":
      case "object":
        if (e === null) return N0("null");
        else if (e instanceof Date) return N0(e.toISOString());
        else if (e instanceof RegExp) return N0(e.toString());
        else {
          if (KFe.has(e)) return WAt(e);
          if (sKt.has(e)) return sKt.get(e);
          let t = X8s(e, () => {
            if (V8s(e)) return e[W_]();
            else if (typeof e === "function") return WAt(e);
            else if (Array.isArray(e) || ArrayBuffer.isView(e)) return YFe(e);
            else if (e instanceof Map) return q8s(e);
            else if (e instanceof Set) return G8s(e);
            return QFe(e);
          });
          return (sKt.set(e, t), t);
        }
      default:
        throw Error(
          `BUG: unhandled typeof ${typeof e} - please report an issue at https://github.com/Effect-TS/effect/issues`,
        );
    }
  },
  WAt = (e) => {
    if (!iKt.has(e)) iKt.set(e, Kfe(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
    return iKt.get(e);
  },
  yv,
  VAt = (e) => (e & 3221225471) | ((e >>> 1) & 1073741824),
  V8s = (e) => Ma(e, W_),
  Kfe = (e) => {
    if (e !== e) return N0("NaN");
    if (e === 1 / 0) return N0("Infinity");
    if (e === -1 / 0) return N0("-Infinity");
    let t = e | 0;
    if (t !== e) t ^= e * 4294967295;
    while (e > 4294967295) t ^= e /= 4294967295;
    return VAt(t);
  },
  N0 = (e) => {
    let t = 5381,
      r = e.length;
    while (r) t = (t * 33) ^ e.charCodeAt(--r);
    return VAt(t);
  },
  aKt = (e, t) => {
    let r = 12289;
    for (let s of t) r ^= yv(ad(s), ad(e[s]));
    return VAt(r);
  },
  QFe = (e) => aKt(e, JFe(e)),
  HKt = (e, t) => (r) => {
    let s = e;
    for (let a of r) s ^= t(a);
    return VAt(s);
  },
  YFe,
  q8s,
  G8s,
  iKt,
  sKt,
  oKt;