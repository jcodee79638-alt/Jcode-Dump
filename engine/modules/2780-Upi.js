
var Upi = Ie(function (Opi) {
  Object.defineProperty(Opi, "__esModule", { value: !0 });
  Opi.filterCertAuthorities = uYo;
  Opi.filterTLogAuthorities = lYo;
  function uYo(e, t) {
    return e.filter((r) => r.validFor.start <= t && r.validFor.end >= t);
  }
  function lYo(e, t) {
    return e.filter((r) => {
      if (t.logID && !r.logID.equals(t.logID)) return !1;
      return r.validFor.start <= t.targetDate && t.targetDate <= r.validFor.end;
    });
  }
});