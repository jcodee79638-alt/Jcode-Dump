
var Jjn = Ie(function (tZH, Xjn) {
  var Ylo = xVe();
  Xjn.exports = function (e, t) {
    let r = Ylo(t);
    if (e.data == null) e.data = {};
    if (typeof r.excerpt === "function") return r.excerpt(e, r);
    let s = e.data.excerpt_separator || r.excerpt_separator;
    if (s == null && (r.excerpt === !1 || r.excerpt == null)) return e;
    let a = typeof r.excerpt === "string" ? r.excerpt : s || r.delimiters[0],
      H = e.content.indexOf(a);
    if (H !== -1) e.excerpt = e.content.slice(0, H);
    return e;
  };
});