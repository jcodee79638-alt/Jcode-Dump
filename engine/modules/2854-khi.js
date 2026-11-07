
var khi = Ie(function (whi) {
  Object.defineProperty(whi, "__esModule", { value: !0 });
  whi.default = wna;
  function wna(e) {
    var t = "",
      r = e.indexOf("/*"),
      s = 0;
    while (r >= 0) {
      t = t + e.slice(s, r);
      var a = e.indexOf("*/", r + 2);
      if (a < 0) return t;
      ((s = a + 2), (r = e.indexOf("/*", s)));
    }
    return ((t = t + e.slice(s)), t);
  }
});