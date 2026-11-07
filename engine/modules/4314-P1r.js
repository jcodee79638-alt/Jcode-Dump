
var P1r = Ie(function (CKc, RNi) {
  RNi.exports = function e(t, r) {
    if (t === r) return !0;
    if (t && r && typeof t == "object" && typeof r == "object") {
      if (t.constructor !== r.constructor) return !1;
      var s, a, H;
      if (Array.isArray(t)) {
        if (((s = t.length), s != r.length)) return !1;
        for (a = s; a-- !== 0;) if (!e(t[a], r[a])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
      if (((H = Object.keys(t)), (s = H.length), s !== Object.keys(r).length)) return !1;
      for (a = s; a-- !== 0;) if (!Object.prototype.hasOwnProperty.call(r, H[a])) return !1;
      for (a = s; a-- !== 0;) {
        var u = H[a];
        if (!e(t[u], r[u])) return !1;
      }
      return !0;
    }
    return t !== t && r !== r;
  };
});