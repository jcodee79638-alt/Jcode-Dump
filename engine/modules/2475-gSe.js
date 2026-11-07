
var gSe = Ie(function (zAc, Ezn) {
  var { join: $zn, basename: gzn } = cr("path"),
    Uko = (e) =>
      !e.bin
        ? jAr(e)
        : typeof e.bin === "string"
          ? Nko(e)
          : Array.isArray(e.bin)
            ? Fko(e)
            : typeof e.bin === "object"
              ? PAr(e)
              : jAr(e),
    Nko = (e) => {
      if (!e.name) return jAr(e);
      return ((e.bin = { [e.name]: e.bin }), PAr(e));
    },
    Fko = (e) => ((e.bin = e.bin.reduce((t, r) => ((t[gzn(r)] = r), t), {})), PAr(e)),
    jAr = (e) => (delete e.bin, e),
    PAr = (e) => {
      let t = e.bin,
        r = {},
        s = !1;
      if (
        (Object.keys(t).forEach((a) => {
          let H = $zn("/", gzn(a.replace(/\\|:/g, "/"))).slice(1);
          if (typeof t[a] !== "string" || !H) return;
          let u = $zn("/", t[a].replace(/\\/g, "/")).replace(/\\/g, "/").slice(1);
          if (!u) return;
          ((r[H] = u), (s = !0));
        }),
        s)
      )
        e.bin = r;
      else delete e.bin;
      return e;
    };
  Ezn.exports = Uko;
});