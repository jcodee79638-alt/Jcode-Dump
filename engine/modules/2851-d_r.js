
var d_r = Ie(function (vhi) {
  Object.defineProperty(vhi, "__esModule", { value: !0 });
  vhi.default = Tna;
  function xna(e) {
    var t = e.toLowerCase(),
      r = "";
    for (var s = 0; s < 6 && t[s] !== void 0; s++) {
      var a = t.charCodeAt(s),
        H = (a >= 97 && a <= 102) || (a >= 48 && a <= 57);
      if (!H) break;
      r += t[s];
    }
    if (r.length === 0) return;
    var u = r.length,
      f = e[u];
    if (
      f === " " ||
      f === "\t" ||
      f ===
        `
` ||
      f === "\r" ||
      f === "\f"
    )
      u +=
        f === "\r" &&
        e[u + 1] ===
          `
`
          ? 2
          : 1;
    var d = parseInt(r, 16),
      _ = d >= 55296 && d <= 57343;
    if (_ || d === 0 || d > 1114111) return ["\uFFFD", u];
    return [String.fromCodePoint(d), u];
  }
  var Sna = /\\/;
  function Tna(e) {
    var t = Sna.test(e);
    if (!t) return e;
    var r = "";
    for (var s = 0; s < e.length; s++) {
      if (e[s] === "\\") {
        var a = xna(e.slice(s + 1, s + 9));
        if (a !== void 0) {
          ((r += a[0]), (s += a[1]));
          continue;
        }
        if (e[s + 1] === "\\") {
          ((r += "\\"), s++);
          continue;
        }
        if (e.length === s + 1) r += e[s];
        continue;
      }
      r += e[s];
    }
    return r;
  }
});