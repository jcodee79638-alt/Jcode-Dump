
var r$i = Ie(function (x$c, t$i) {
  var rX = ky(),
    LHa = (e, t, r) => {
      try {
        if (t.version) {
          let s = rX.resolve(e, t.version, r);
          if (t.integrity || s.type === "git") return s;
        }
        if (t.from) {
          let s = rX.resolve(e, t.from, r);
          if (s.registry && t.version) return rX.resolve(e, t.version, r);
          else if (!t.resolved) return s;
        }
        if (t.resolved) return rX.resolve(e, t.resolved, r);
      } catch {}
      try {
        return rX.resolve(e, t.version, r);
      } catch {
        return {};
      }
    };
  t$i.exports = LHa;
});