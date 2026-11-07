
var WTi = Ie(function (RTi) {
  Object.defineProperty(RTi, "__esModule", { value: !0 });
  RTi.default = NIa;
  function NIa(e, t) {
    if (e === void 0 || t === void 0) return !1;
    let r = Object.keys(e),
      s = Object.keys(t);
    if (r.length != s.length) return !1;
    for (let a of r) if (e[a] != t[a]) return !1;
    return !0;
  }
});