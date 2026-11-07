
var QCt,
  kKi,
  OKi,
  UKi,
  yQe = (e, t) => {
    let r = Object.assign(Object.create(null), { name: e, message: t });
    return (Object.defineProperty(r, UKi, { value: e }), r);
  },
  NKi = (e) => (e !== null && typeof e === "object" ? e[UKi] : void 0),
  q$ = (e, t) => DJ(e, t, !0),
  vd = (e) => {
    if (e === null) return "null";
    if (e === void 0) return "undefined";
    if (e instanceof wI) return Number.isFinite(e.time) ? new Date(e.time).toISOString() : "Invalid Date";
    if (e instanceof qy) return `/${e.regex.source}/${e.regex.flags}`;
    if (e instanceof Gy) return "[object Map]";
    if (e instanceof ST) return "[object Set]";
    if (e instanceof Z1) return e.url.href;
    if (e instanceof Sg) return e.params.toString();
    if (typeof e === "object")
      return Array.isArray(e)
        ? e.map((t) => (t === null || t === void 0 ? "" : vd(t))).join(",")
        : "[object Object]";
    return String(e);
  },
  a$e = (e) => {
    if (e instanceof wI) return e.time;
    if (sO(e)) return Number.NaN;
    return e !== null && typeof e === "object" && !Array.isArray(e) ? Number.NaN : Number(e);
  },
  YCt = (e, t, r) => {
    let s = t[0];
    if (sO(s)) {
      if (e.name === "Boolean") return !0;
      if (e.name === "Number") return a$e(s);
      if (e.name === "String") return vd(s);
      if (e.name === "parseInt") return parseInt(vd(s));
      return parseFloat(vd(s));
    }
    let a = q$(t[0], `${e.name} input`);
    if (e.name === "Number") return a$e(a);
    if (e.name === "Boolean") return Boolean(a);
    if (e.name === "parseInt") {
      let H = t[1];
      if (H !== void 0 && typeof H !== "number") throw new is("parseInt expects a numeric radix.", r);
      return parseInt(vd(a), H);
    }
    if (e.name === "parseFloat") return parseFloat(vd(a));
    return vd(a);
  };