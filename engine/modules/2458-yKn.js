
var yKn = Ie(function (PAc, DKn) {
  var wwo = IKn();
  function EAr(e) {
    if (Object.hasOwn(e, "license"))
      return e.license.startsWith("LicenseRef") || e.license.startsWith("DocumentRef");
    else return EAr(e.left) || EAr(e.right);
  }
  DKn.exports = function (t) {
    if (t === "UNLICENSED" || t === "UNLICENCED") return !0;
    if (/^SEE LICEN[CS]E IN ./.test(t)) return !0;
    try {
      let r = wwo(t);
      return !EAr(r);
    } catch {
      return !1;
    }
  };
});