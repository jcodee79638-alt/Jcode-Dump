
var WOn = Ie(function (BOn) {
  Object.defineProperty(BOn, "__esModule", { value: !0 });
  BOn.isAttributeValue = BOn.isAttributeKey = BOn.sanitizeAttributes = void 0;
  var hgt = kf();
  function WLo(e) {
    let t = {};
    if (typeof e !== "object" || e == null) return t;
    for (let r in e) {
      if (!Object.prototype.hasOwnProperty.call(e, r)) continue;
      if (!UOn(r)) {
        hgt.diag.warn(`Invalid attribute key: ${r}`);
        continue;
      }
      let s = e[r];
      if (!NOn(s)) {
        hgt.diag.warn(`Invalid attribute value set for key: ${r}`);
        continue;
      }
      if (Array.isArray(s)) t[r] = s.slice();
      else t[r] = s;
    }
    return t;
  }
  BOn.sanitizeAttributes = WLo;
  function UOn(e) {
    return typeof e === "string" && e !== "";
  }
  BOn.isAttributeKey = UOn;
  function NOn(e) {
    if (e == null) return !0;
    if (Array.isArray(e)) return VLo(e);
    return FOn(typeof e);
  }
  BOn.isAttributeValue = NOn;
  function VLo(e) {
    let t;
    for (let r of e) {
      if (r == null) continue;
      let s = typeof r;
      if (s === t) continue;
      if (!t) {
        if (FOn(s)) {
          t = s;
          continue;
        }
        return !1;
      }
      return !1;
    }
    return !0;
  }
  function FOn(e) {
    switch (e) {
      case "number":
      case "boolean":
      case "string":
        return !0;
    }
    return !1;
  }
});