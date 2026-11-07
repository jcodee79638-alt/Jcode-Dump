
var XQi = Ie(function (FvA, GQi) {
  var qQi = aAe(),
    mZa = (e, t) => {
      let r = qQi(e, null, !0),
        s = qQi(t, null, !0),
        a = r.compare(s);
      if (a === 0) return null;
      let H = a > 0,
        u = H ? r : s,
        f = H ? s : r,
        d = !!u.prerelease.length;
      if (!!f.prerelease.length && !d) {
        if (!f.patch && !f.minor) return "major";
        if (f.compareMain(u) === 0) {
          if (f.minor && !f.patch) return "minor";
          return "patch";
        }
      }
      let L = d ? "pre" : "";
      if (r.major !== s.major) return L + "major";
      if (r.minor !== s.minor) return L + "minor";
      if (r.patch !== s.patch) return L + "patch";
      return "prerelease";
    };
  GQi.exports = mZa;
});