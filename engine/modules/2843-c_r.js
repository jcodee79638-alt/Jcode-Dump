
var c_r = Ie(function (CLc, Hhi) {
  var { dirname: lna } = cr("path"),
    fna = ky(),
    pna = (e, t) => {
      if (t && t.overrides && t.overrides.name === t.name && t.overrides.value) {
        if (e.sourceReference) return e.sourceReference.root.realpath;
        return e.root.realpath;
      }
      if (e.resolved) {
        let r = fna(e.resolved);
        if (r?.type === "file") return lna(r.fetchSpec);
      }
      return e.realpath;
    };
  Hhi.exports = pna;
});