
var nPn = Ie(function (iZH, rPn) {
  var tPn = cr("fs"),
    rfo = Gvn(),
    xar = xVe(),
    nfo = Mar(),
    ePn = Jjn(),
    ifo = Dar(),
    sfo = Qjn(),
    ofo = Zjn(),
    D$t = I$t();
  function Dw(e, t) {
    if (e === "") return { data: {}, content: e, excerpt: "", orig: e };
    let r = sfo(e),
      s = Dw.cache[r.content];
    if (!t) {
      if (s) return ((r = Object.assign({}, s)), (r.orig = s.orig), r);
      Dw.cache[r.content] = r;
    }
    return afo(r, t);
  }
  function afo(e, t) {
    let r = xar(t),
      s = r.delimiters[0],
      a =
        `
` + r.delimiters[1],
      H = e.content;
    if (r.language) e.language = r.language;
    let u = s.length;
    if (!D$t.startsWith(H, s, u)) return (ePn(e, r), e);
    if (H.charAt(u) === s.slice(-1)) return e;
    H = H.slice(u);
    let f = H.length,
      d = Dw.language(H, r);
    if (d.name) ((e.language = d.name), (H = H.slice(d.raw.length)));
    let _ = H.indexOf(a);
    if (_ === -1) _ = f;
    if (((e.matter = H.slice(0, _)), e.matter.replace(/^\s*#[^\n]+/gm, "").trim() === ""))
      ((e.isEmpty = !0), (e.empty = e.content), (e.data = {}));
    else e.data = ofo(e.language, e.matter, r);
    if (_ === f) e.content = "";
    else {
      if (((e.content = H.slice(_ + a.length)), e.content[0] === "\r")) e.content = e.content.slice(1);
      if (
        e.content[0] ===
        `
`
      )
        e.content = e.content.slice(1);
    }
    if ((ePn(e, r), r.sections === !0 || typeof r.section === "function")) rfo(e, r.section);
    return e;
  }
  Dw.engines = ifo;
  Dw.stringify = function (e, t, r) {
    if (typeof e === "string") e = Dw(e, r);
    return nfo(e, t, r);
  };
  Dw.read = function (e, t) {
    let r = tPn.readFileSync(e, "utf8"),
      s = Dw(r, t);
    return ((s.path = e), s);
  };
  Dw.test = function (e, t) {
    return D$t.startsWith(e, xar(t).delimiters[0]);
  };
  Dw.language = function (e, t) {
    let s = xar(t).delimiters[0];
    if (Dw.test(e)) e = e.slice(s.length);
    let a = e.slice(0, e.search(/\r?\n/));
    return { raw: a, name: a ? a.trim() : "" };
  };
  Dw.cache = {};
  Dw.clearCache = function () {
    Dw.cache = {};
  };
  rPn.exports = Dw;
});