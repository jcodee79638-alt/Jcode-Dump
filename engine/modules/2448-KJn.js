
var KJn = Ie(function (Kcc, JJn) {
  var hAr = new Set(["dependencies", "optionalDependencies", "devDependencies", "peerDependencies"]),
    awo = (e) => {
      for (let t of hAr)
        if (e && e[t])
          e[t] = Object.keys(e[t])
            .sort((r, s) => r.localeCompare(s, "en"))
            .reduce((r, s) => ((r[s] = e[t][s]), r), {});
      return e;
    },
    XJn = ({ content: e, originalContent: t }) => {
      let r = awo({ ...e });
      if (r.dependencies) {
        if (r.optionalDependencies)
          for (let f of Object.keys(r.optionalDependencies)) delete r.dependencies[f];
      }
      let s = { ...t };
      for (let f of hAr) {
        if (r[f]) s[f] = r[f];
        if (r[f] && typeof r === "object" && Object.keys(r[f]).length === 0) delete s[f];
      }
      let { dependencies: a, peerDependencies: H } = t || {},
        { peerDependencies: u } = s;
      if (a && H && u) {
        for (let f of Object.keys(H))
          if (a[f] !== void 0 && u[f] !== void 0)
            ((s.dependencies = s.dependencies || {}), (s.dependencies[f] = u[f]));
      }
      return s;
    };
  XJn.knownKeys = hAr;
  JJn.exports = XJn;
});