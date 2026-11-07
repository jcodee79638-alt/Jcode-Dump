
var Cii = Ie(function (lpc, Gfr) {
  Gfr.exports = Pii;
  Gfr.exports.preferredLanguages = Pii;
  var z3o = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
  function Q3o(e) {
    var t = e.split(",");
    for (var r = 0, s = 0; r < t.length; r++) {
      var a = jii(t[r].trim(), r);
      if (a) t[s++] = a;
    }
    return ((t.length = s), t);
  }
  function jii(e, t) {
    var r = z3o.exec(e);
    if (!r) return null;
    var s = r[1],
      a = r[2],
      H = s;
    if (a) H += "-" + a;
    var u = 1;
    if (r[3]) {
      var f = r[3].split(";");
      for (var d = 0; d < f.length; d++) {
        var _ = f[d].split("=");
        if (_[0] === "q") u = parseFloat(_[1]);
      }
    }
    return { prefix: s, suffix: a, q: u, i: t, full: H };
  }
  function Y3o(e, t, r) {
    var s = { o: -1, q: 0, s: 0 };
    for (var a = 0; a < t.length; a++) {
      var H = Z3o(e, t[a], r);
      if (H && (s.s - H.s || s.q - H.q || s.o - H.o) < 0) s = H;
    }
    return s;
  }
  function Z3o(e, t, r) {
    var s = jii(e);
    if (!s) return null;
    var a = 0;
    if (t.full.toLowerCase() === s.full.toLowerCase()) a |= 4;
    else if (t.prefix.toLowerCase() === s.full.toLowerCase()) a |= 2;
    else if (t.full.toLowerCase() === s.prefix.toLowerCase()) a |= 1;
    else if (t.full !== "*") return null;
    return { i: r, o: t.i, q: t.q, s: a };
  }
  function Pii(e, t) {
    var r = Q3o(e === void 0 ? "*" : e || "");
    if (!t) return r.filter(bii).sort(vii).map(eWo);
    var s = t.map(function (H, u) {
      return Y3o(H, r, u);
    });
    return s
      .filter(bii)
      .sort(vii)
      .map(function (H) {
        return t[s.indexOf(H)];
      });
  }
  function vii(e, t) {
    return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
  }
  function eWo(e) {
    return e.full;
  }
  function bii(e) {
    return e.q > 0;
  }
});