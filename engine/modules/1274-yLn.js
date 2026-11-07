
var yLn = "~effect/sql/SqlError",
  ID = "~effect/sql/SqlError/Reason",
  AV,
  mmt,
  _mt,
  hmt,
  xLn,
  Cqs,
  yrr,
  Lmt,
  SLn,
  TLn,
  $mt,
  vLn,
  gmt,
  wqs,
  dMe,
  Mrr = (e) => {
    if (!Ma(e, "code")) return;
    let t = e.code;
    return typeof t === "string" || typeof t === "number" ? t : void 0;
  },
  kqs = (e) => {
    let t = Mrr(e);
    if (typeof t === "number") return t;
    if (!Ma(e, "errno")) return;
    let r = e.errno;
    return typeof r === "number" ? r : void 0;
  },
  Oqs = (e, t) => {
    if (Mrr(e) === t) return !0;
    if (!Ma(e, "errno")) return !1;
    return e.errno === t;
  },
  pMe = (e, t) => e === t || e.startsWith(t + "_"),
  j3e = "unknown",
  Uqs = "SQLITE_CONSTRAINT_UNIQUE",
  Nqs = 2067,
  MLn = (e) => {
    if (typeof e !== "string") return j3e;
    let t = e.trim();
    return t.length === 0 ? j3e : t;
  },
  Fqs = (e) => {
    if (Ma(e, "constraint")) return MLn(e.constraint);
    if (!Ma(e, "message")) return j3e;
    let t = e.message;
    if (typeof t !== "string") return j3e;
    let r = "UNIQUE constraint failed:",
      s = t.indexOf(r);
    return s === -1 ? j3e : MLn(t.slice(s + r.length));
  },
  P3e = (e, { message: t, operation: r } = {}) => {
    let s = { cause: e, message: t, operation: r },
      a = Mrr(e),
      H = kqs(e);
    if (a === Uqs || Oqs(e, Nqs)) return new yrr({ ...s, constraint: Fqs(e) });
    if (typeof a === "string") {
      if (pMe(a, "SQLITE_AUTH")) return new _mt(s);
      if (pMe(a, "SQLITE_PERM")) return new hmt(s);
      if (pMe(a, "SQLITE_CONSTRAINT")) return new Lmt(s);
      if (pMe(a, "SQLITE_BUSY") || pMe(a, "SQLITE_LOCKED")) return new $mt(s);
      if (pMe(a, "SQLITE_CANTOPEN")) return new mmt(s);
    }
    if (typeof H === "number")
      switch (H & 255) {
        case 23:
          return new _mt(s);
        case 3:
          return new hmt(s);
        case 19:
          return new Lmt(s);
        case 5:
        case 6:
          return new $mt(s);
        case 14:
          return new mmt(s);
        default:
          return new gmt(s);
      }
    return new gmt(s);
  };