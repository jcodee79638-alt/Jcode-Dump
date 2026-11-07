
var vBi = Ie(function (RXe, TBi) {
  Object.defineProperty(RXe, "__esModule", { value: !0 });
  var QB = IBi(),
    E9a = MBi(),
    Kje = fd(),
    xBi = new Kje.Name("fullFormats"),
    I9a = new Kje.Name("fastFormats"),
    cMr = (e, t = { keywords: !0 }) => {
      if (Array.isArray(t)) return (SBi(e, t, QB.fullFormats, xBi), e);
      let [r, s] = t.mode === "fast" ? [QB.fastFormats, I9a] : [QB.fullFormats, xBi],
        a = t.formats || QB.formatNames;
      if ((SBi(e, a, r, s), t.keywords)) (0, E9a.default)(e);
      return e;
    };
  cMr.get = (e, t = "full") => {
    let s = (t === "fast" ? QB.fastFormats : QB.fullFormats)[e];
    if (!s) throw Error(`Unknown format "${e}"`);
    return s;
  };
  function SBi(e, t, r, s) {
    var a, H;
    ((a = (H = e.opts.code).formats) !== null && a !== void 0) ||
      (H.formats = Kje._`require("ajv-formats/dist/formats").${s}`);
    for (let u of t) e.addFormat(u, r[u]);
  }
  TBi.exports = RXe = cMr;
  Object.defineProperty(RXe, "__esModule", { value: !0 });
  RXe.default = cMr;
});