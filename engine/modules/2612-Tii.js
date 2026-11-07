
var Tii = Ie(function (upc, qfr) {
  qfr.exports = Sii;
  qfr.exports.preferredEncodings = Sii;
  var V3o = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
  function q3o(e) {
    var t = e.split(","),
      r = !1,
      s = 1;
    for (var a = 0, H = 0; a < t.length; a++) {
      var u = G3o(t[a].trim(), a);
      if (u) ((t[H++] = u), (r = r || xii("identity", u)), (s = Math.min(s, u.q || 1)));
    }
    if (!r) t[H++] = { encoding: "identity", q: s, i: a };
    return ((t.length = H), t);
  }
  function G3o(e, t) {
    var r = V3o.exec(e);
    if (!r) return null;
    var s = r[1],
      a = 1;
    if (r[2]) {
      var H = r[2].split(";");
      for (var u = 0; u < H.length; u++) {
        var f = H[u].trim().split("=");
        if (f[0] === "q") {
          a = parseFloat(f[1]);
          break;
        }
      }
    }
    return { encoding: s, q: a, i: t };
  }
  function X3o(e, t, r) {
    var s = { encoding: e, o: -1, q: 0, s: 0 };
    for (var a = 0; a < t.length; a++) {
      var H = xii(e, t[a], r);
      if (H && (s.s - H.s || s.q - H.q || s.o - H.o) < 0) s = H;
    }
    return s;
  }
  function xii(e, t, r) {
    var s = 0;
    if (t.encoding.toLowerCase() === e.toLowerCase()) s |= 1;
    else if (t.encoding !== "*") return null;
    return { encoding: e, i: r, o: t.i, q: t.q, s };
  }
  function Sii(e, t, r) {
    var s = q3o(e || ""),
      a = r
        ? function (f, d) {
            if (f.q !== d.q) return d.q - f.q;
            var _ = r.indexOf(f.encoding),
              L = r.indexOf(d.encoding);
            if (_ === -1 && L === -1) return d.s - f.s || f.o - d.o || f.i - d.i;
            if (_ !== -1 && L !== -1) return _ - L;
            return _ === -1 ? 1 : -1;
          }
        : J3o;
    if (!t) return s.filter(Mii).sort(a).map(K3o);
    var H = t.map(function (f, d) {
      return X3o(f, s, d);
    });
    return H.filter(Mii)
      .sort(a)
      .map(function (f) {
        return t[H.indexOf(f)];
      });
  }
  function J3o(e, t) {
    return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i;
  }
  function K3o(e) {
    return e.encoding;
  }
  function Mii(e) {
    return e.q > 0;
  }
});