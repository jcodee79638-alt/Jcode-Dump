
var Fii = Ie(function (fpc, Xfr) {
  Xfr.exports = Uii;
  Xfr.exports.preferredMediaTypes = Uii;
  var tWo = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
  function rWo(e) {
    var t = aWo(e);
    for (var r = 0, s = 0; r < t.length; r++) {
      var a = Oii(t[r].trim(), r);
      if (a) t[s++] = a;
    }
    return ((t.length = s), t);
  }
  function Oii(e, t) {
    var r = tWo.exec(e);
    if (!r) return null;
    var s = Object.create(null),
      a = 1,
      H = r[2],
      u = r[1];
    if (r[3]) {
      var f = HWo(r[3]).map(oWo);
      for (var d = 0; d < f.length; d++) {
        var _ = f[d],
          L = _[0].toLowerCase(),
          I = _[1],
          D = I && I[0] === '"' && I[I.length - 1] === '"' ? I.slice(1, -1) : I;
        if (L === "q") {
          a = parseFloat(D);
          break;
        }
        s[L] = D;
      }
    }
    return { type: u, subtype: H, params: s, q: a, i: t };
  }
  function nWo(e, t, r) {
    var s = { o: -1, q: 0, s: 0 };
    for (var a = 0; a < t.length; a++) {
      var H = iWo(e, t[a], r);
      if (H && (s.s - H.s || s.q - H.q || s.o - H.o) < 0) s = H;
    }
    return s;
  }
  function iWo(e, t, r) {
    var s = Oii(e),
      a = 0;
    if (!s) return null;
    if (t.type.toLowerCase() == s.type.toLowerCase()) a |= 4;
    else if (t.type != "*") return null;
    if (t.subtype.toLowerCase() == s.subtype.toLowerCase()) a |= 2;
    else if (t.subtype != "*") return null;
    var H = Object.keys(t.params);
    if (H.length > 0)
      if (
        H.every(function (u) {
          return t.params[u] == "*" || (t.params[u] || "").toLowerCase() == (s.params[u] || "").toLowerCase();
        })
      )
        a |= 1;
      else return null;
    return { i: r, o: t.i, q: t.q, s: a };
  }
  function Uii(e, t) {
    var r = rWo(e === void 0 ? "*/*" : e || "");
    if (!t) return r.filter(kii).sort(wii).map(sWo);
    var s = t.map(function (H, u) {
      return nWo(H, r, u);
    });
    return s
      .filter(kii)
      .sort(wii)
      .map(function (H) {
        return t[s.indexOf(H)];
      });
  }
  function wii(e, t) {
    return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
  }
  function sWo(e) {
    return e.type + "/" + e.subtype;
  }
  function kii(e) {
    return e.q > 0;
  }
  function Nii(e) {
    var t = 0,
      r = 0;
    while ((r = e.indexOf('"', r)) !== -1) (t++, r++);
    return t;
  }
  function oWo(e) {
    var t = e.indexOf("="),
      r,
      s;
    if (t === -1) r = e;
    else ((r = e.slice(0, t)), (s = e.slice(t + 1)));
    return [r, s];
  }
  function aWo(e) {
    var t = e.split(",");
    for (var r = 1, s = 0; r < t.length; r++)
      if (Nii(t[s]) % 2 == 0) t[++s] = t[r];
      else t[s] += "," + t[r];
    return ((t.length = s + 1), t);
  }
  function HWo(e) {
    var t = e.split(";");
    for (var r = 1, s = 0; r < t.length; r++)
      if (Nii(t[s]) % 2 == 0) t[++s] = t[r];
      else t[s] += ";" + t[r];
    t.length = s + 1;
    for (var r = 0; r < t.length; r++) t[r] = t[r].trim();
    return t;
  }
});