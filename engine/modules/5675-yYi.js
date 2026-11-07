
var yYi = Ie(function (sbA, DYi) {
  var neH = aAe(),
    IYi = xwe(),
    ieH = Mb(),
    seH = (e, t, r) => {
      if (!IYi.RELEASE_TYPES.includes(t)) return null;
      let s = oeH(e, r);
      return s && aeH(s, t);
    },
    oeH = (e, t) => {
      let r = e instanceof ieH ? e.version : e;
      return neH(r, t);
    },
    aeH = (e, t) => {
      if (HeH(t)) return e.version;
      switch (((e.prerelease = []), t)) {
        case "major":
          ((e.minor = 0), (e.patch = 0));
          break;
        case "minor":
          e.patch = 0;
          break;
      }
      return e.format();
    },
    HeH = (e) => e.startsWith("pre");
  DYi.exports = seH;
});