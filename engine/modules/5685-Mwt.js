
var Mwt = Ie(function (dbA, eZi) {
  var XeH = Mb(),
    ZYi = wQe(),
    { ANY: JeH } = ZYi,
    KeH = ER(),
    zeH = OQe(),
    QYi = PQe(),
    YYi = Lwt(),
    QeH = gwt(),
    YeH = $wt(),
    ZeH = (e, t, r, s) => {
      ((e = new XeH(e, s)), (t = new KeH(t, s)));
      let a, H, u, f, d;
      switch (r) {
        case ">":
          ((a = QYi), (H = QeH), (u = YYi), (f = ">"), (d = ">="));
          break;
        case "<":
          ((a = YYi), (H = YeH), (u = QYi), (f = "<"), (d = "<="));
          break;
        default:
          throw TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (zeH(e, t, s)) return !1;
      for (let _ = 0; _ < t.set.length; ++_) {
        let L = t.set[_],
          I = null,
          D = null;
        if (
          (L.forEach((S) => {
            if (S.semver === JeH) S = new ZYi(">=0.0.0");
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
  eZi.exports = ZeH;
});