
var yii = Ie(function (Apc, Vfr) {
  Vfr.exports = Dii;
  Vfr.exports.preferredCharsets = Dii;
  var U3o = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
  function N3o(e) {
    var t = e.split(",");
    for (var r = 0, s = 0; r < t.length; r++) {
      var a = F3o(t[r].trim(), r);
      if (a) t[s++] = a;
    }
    return ((t.length = s), t);
  }
  function F3o(e, t) {
    var r = U3o.exec(e);
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
    return { charset: s, q: a, i: t };
  }
  function B3o(e, t, r) {
    var s = { o: -1, q: 0, s: 0 };
    for (var a = 0; a < t.length; a++) {
      var H = R3o(e, t[a], r);
      if (H && (s.s - H.s || s.q - H.q || s.o - H.o) < 0) s = H;
    }
    return s;
  }
  function R3o(e, t, r) {
    var s = 0;
    if (t.charset.toLowerCase() === e.toLowerCase()) s |= 1;
    else if (t.charset !== "*") return null;
    return { i: r, o: t.i, q: t.q, s };
  }
  function Dii(e, t) {
    var r = N3o(e === void 0 ? "*" : e || "");
    if (!t) return r.filter(Iii).sort(Eii).map(W3o);
    var s = t.map(function (H, u) {
      return B3o(H, r, u);
    });
    return s
      .filter(Iii)
      .sort(Eii)
      .map(function (H) {
        return t[s.indexOf(H)];
      });
  }
  function Eii(e, t) {
    return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
  }
  function W3o(e) {
    return e.charset;
  }
  function Iii(e) {
    return e.q > 0;
  }
});