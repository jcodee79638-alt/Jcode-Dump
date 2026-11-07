
var R$t = Ie(function (Htc, rwn) {
  var tmo = Zv(),
    twn = kVe(),
    { ANY: rmo } = twn,
    nmo = V2(),
    imo = Vxe(),
    ZCn = CVe(),
    ewn = w$t(),
    smo = O$t(),
    omo = k$t(),
    amo = (e, t, r, s) => {
      ((e = new tmo(e, s)), (t = new nmo(t, s)));
      let a, H, u, f, d;
      switch (r) {
        case ">":
          ((a = ZCn), (H = smo), (u = ewn), (f = ">"), (d = ">="));
          break;
        case "<":
          ((a = ewn), (H = omo), (u = ZCn), (f = "<"), (d = "<="));
          break;
        default:
          throw TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (imo(e, t, s)) return !1;
      for (let _ = 0; _ < t.set.length; ++_) {
        let L = t.set[_],
          I = null,
          D = null;
        if (
          (L.forEach((S) => {
            if (S.semver === rmo) S = new twn(">=0.0.0");
            if (((I = I || S), (D = D || S), a(S.semver, I.semver, s))) I = S;
            else if (u(S.semver, D.semver, s)) D = S;
          }),
          I.operator === f || I.operator === d)
        )
          return !1;
        if ((!D.operator || D.operator === f) && H(e, D.semver)) return !1;
        else if (D.operator === d && u(e, D.semver)) return !1;
      }
      return !0;
    };
  rwn.exports = amo;
});