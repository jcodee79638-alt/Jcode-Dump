
var tkn = Ie(function (Zwn) {
  Object.defineProperty(Zwn, "__esModule", { value: !0 });
  Zwn.isCompatible = Zwn._makeCompatibilityCheck = void 0;
  var Qwn = AHr(),
    zwn = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
  function Ywn(e) {
    let t = new Set([e]),
      r = new Set(),
      s = e.match(zwn);
    if (!s) return () => !1;
    let a = { major: +s[1], minor: +s[2], patch: +s[3], prerelease: s[4] };
    if (a.prerelease != null)
      return function (d) {
        return d === e;
      };
    function H(f) {
      return (r.add(f), !1);
    }
    function u(f) {
      return (t.add(f), !0);
    }
    return function (d) {
      if (t.has(d)) return !0;
      if (r.has(d)) return !1;
      let _ = d.match(zwn);
      if (!_) return H(d);
      let L = { major: +_[1], minor: +_[2], patch: +_[3], prerelease: _[4] };
      if (L.prerelease != null) return H(d);
      if (a.major !== L.major) return H(d);
      if (a.major === 0) {
        if (a.minor === L.minor && a.patch <= L.patch) return u(d);
        return H(d);
      }
      if (a.minor <= L.minor) return u(d);
      return H(d);
    };
  }
  Zwn._makeCompatibilityCheck = Ywn;
  Zwn.isCompatible = Ywn(Qwn.VERSION);
});