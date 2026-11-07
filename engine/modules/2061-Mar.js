
var Mar = Ie(function (eZH, Gjn) {
  var Klo = $Ve(),
    zlo = yar(),
    Qlo = xVe();
  Gjn.exports = function (e, t, r) {
    if (t == null && r == null)
      switch (Klo(e)) {
        case "object":
          ((t = e.data), (r = {}));
          break;
        case "string":
          return e;
        default:
          throw TypeError("expected file to be a string or object");
      }
    let s = e.content,
      a = Qlo(r);
    if (t == null) {
      if (!a.data) return e;
      t = a.data;
    }
    let H = e.language || a.language,
      u = zlo(H, a);
    if (typeof u.stringify !== "function") throw TypeError('expected "' + H + '.stringify" to be a function');
    t = Object.assign({}, e.data, t);
    let f = a.delimiters[0],
      d = a.delimiters[1],
      _ = u.stringify(t, r).trim(),
      L = "";
    if (_ !== "{}") L = Uxe(f) + Uxe(_) + Uxe(d);
    if (typeof e.excerpt === "string" && e.excerpt !== "") {
      if (s.indexOf(e.excerpt.trim()) === -1) L += Uxe(e.excerpt) + Uxe(d);
    }
    return L + Uxe(s);
  };
  function Uxe(e) {
    return e.slice(-1) !==
      `
`
      ? e +
          `
`
      : e;
  }
});