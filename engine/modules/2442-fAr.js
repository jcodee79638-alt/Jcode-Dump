
var fAr = Ie(function (Wcc, TJn) {
  var XCo = /(?<!\\)(\\*)\$\{([^${}?]+)(\?)?\}/g;
  TJn.exports = (e, t) =>
    e.replace(XCo, (r, s, a, H) => {
      let u = H === "?" ? "" : `\${${a}}`,
        f = t[a] !== void 0 ? t[a] : u;
      if (s.length % 2) return r.slice((s.length + 1) / 2);
      return s.slice(s.length / 2) + f;
    });
});