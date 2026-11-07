
var SCn = Ie(function (Yec, xCn) {
  var ldo = coe(),
    MCn = Rxe(),
    fdo = Zv(),
    pdo = (e, t, r) => {
      if (!MCn.RELEASE_TYPES.includes(t)) return null;
      let s = ddo(e, r);
      return s && mdo(s, t);
    },
    ddo = (e, t) => {
      let r = e instanceof fdo ? e.version : e;
      return ldo(r, t);
    },
    mdo = (e, t) => {
      if (_do(t)) return e.version;
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
    _do = (e) => e.startsWith("pre");
  xCn.exports = pdo;
});