
var jbn = Ie(function (BYH, bbn) {
  var kAo = ix(),
    OAo = Object.prototype.toString;
  function UAo(e) {
    if (e === null) return !0;
    var t,
      r,
      s,
      a,
      H,
      u = e;
    H = Array(u.length);
    for (t = 0, r = u.length; t < r; t += 1) {
      if (((s = u[t]), OAo.call(s) !== "[object Object]")) return !1;
      if (((a = Object.keys(s)), a.length !== 1)) return !1;
      H[t] = [a[0], s[a[0]]];
    }
    return !0;
  }
  function NAo(e) {
    if (e === null) return [];
    var t,
      r,
      s,
      a,
      H,
      u = e;
    H = Array(u.length);
    for (t = 0, r = u.length; t < r; t += 1) ((s = u[t]), (a = Object.keys(s)), (H[t] = [a[0], s[a[0]]]));
    return H;
  }
  bbn.exports = new kAo("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: UAo, construct: NAo });
});