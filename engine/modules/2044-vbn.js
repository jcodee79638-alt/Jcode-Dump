
var vbn = Ie(function (FYH, Tbn) {
  var jAo = ix(),
    Sbn = Object.prototype.hasOwnProperty,
    PAo = Object.prototype.toString;
  function CAo(e) {
    if (e === null) return !0;
    var t = {},
      r,
      s,
      a,
      H,
      u,
      f = e;
    for (r = 0, s = f.length; r < s; r += 1) {
      if (((a = f[r]), (u = !1), PAo.call(a) !== "[object Object]")) return !1;
      for (H in a)
        if (Sbn.call(a, H))
          if (!u) u = !0;
          else return !1;
      if (!u) return !1;
      if (Sbn.call(t, H)) return !1;
      Object.defineProperty(t, H, { value: !0 });
    }
    return !0;
  }
  function wAo(e) {
    return e !== null ? e : [];
  }
  Tbn.exports = new jAo("tag:yaml.org,2002:omap", { kind: "sequence", resolve: CAo, construct: wAo });
});