
var jJn = Ie(function (Vcc, bJn) {
  var Y2 = $Se(),
    JCo = fAr(),
    { resolve: vJn } = cr("path"),
    { parse: KCo } = uAr(),
    pAr = (e, t, r, s = !1) => {
      if (typeof e !== "string" && !Array.isArray(e)) return e;
      let { platform: a, types: H, home: u, env: f } = r,
        d = new Set([].concat(H[t])),
        _ = d.has(Y2.path.type),
        L = d.has(Y2.Boolean.type),
        I = _ || d.has(Y2.String.type),
        D = d.has(Y2.Umask.type),
        S = d.has(Y2.Number.type),
        T = !s && d.has(Array),
        C = d.has(Y2.Date.type);
      if (Array.isArray(e)) return !T ? e : e.map((O) => pAr(O, t, r, !0));
      if (((e = e.trim()), T))
        return pAr(
          e.split(`

`),
          t,
          r,
        );
      if (L && !I && e === "") return !0;
      if (!I && !_ && !S)
        switch (e) {
          case "true":
            return !0;
          case "false":
            return !1;
          case "null":
            return null;
          case "undefined":
            return;
        }
      if (((e = JCo(e, f)), C)) return new Date(e);
      if (_)
        if ((a === "win32" ? /^~(\/|\\)/ : /^~\//).test(e) && u) e = vJn(u, e.slice(2));
        else e = vJn(e);
      if (D)
        try {
          return KCo(e);
        } catch (O) {
          return e;
        }
      if (S && !isNaN(e)) e = +e;
      return e;
    };
  bJn.exports = pAr;
});