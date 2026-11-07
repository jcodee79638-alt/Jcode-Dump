
var tzt = (e) => {
    if (e?.captureStackTrace === !1) return e;
    else if (e?.captureStackTrace !== void 0 && typeof e.captureStackTrace !== "boolean") return e;
    let t = Error.stackTraceLimit;
    Error.stackTraceLimit = 3;
    let r = Error();
    return ((Error.stackTraceLimit = t), { ...e, captureStackTrace: iUs(() => r.stack) });
  },
  rzt = (e) => (t) => {
    let r;
    return () => {
      if (r !== void 0) return r;
      let s = t();
      if (!s) return;
      let a = s.split(`
`);
      if (a[e] !== void 0) return ((r = a[e].trim()), r);
    };
  },
  iUs;