
var y4e = Ie(function (spc, aii) {
  var DIt = Nfr(),
    { redactUrlPassword: h3o } = sii(),
    Bfr = (e) => {
      if (typeof e !== "string" || !e) return e;
      return h3o(e, "***").replace(DIt.NPM_SECRET.pattern, "npm_***").replace(DIt.UUID.pattern, "***");
    },
    oii = (e) => {
      let t = /[\s=]/g,
        r = null,
        s = "",
        a = 0;
      while ((r = t.exec(e))) ((s += Bfr(e.slice(a, r.index)) + r[0]), (a = t.lastIndex));
      return s + Bfr(e.slice(a));
    },
    L3o = (e) => {
      if (typeof e === "string") return oii(e);
      else if (Array.isArray(e)) return e.map((t) => (typeof t === "string" ? oii(t) : t));
      return e;
    };
  aii.exports = { redact: Bfr, redactLog: L3o };
});