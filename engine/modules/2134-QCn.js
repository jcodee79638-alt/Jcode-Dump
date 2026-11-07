
var QCn = Ie(function (otc, zCn) {
  var zar = Zv(),
    Qdo = V2(),
    KCn = CVe(),
    Ydo = (e, t) => {
      e = new Qdo(e, t);
      let r = new zar("0.0.0");
      if (e.test(r)) return r;
      if (((r = new zar("0.0.0-0")), e.test(r))) return r;
      r = null;
      for (let s = 0; s < e.set.length; ++s) {
        let a = e.set[s],
          H = null;
        if (
          (a.forEach((u) => {
            let f = new zar(u.semver.version);
            switch (u.operator) {
              case ">":
                if (f.prerelease.length === 0) f.patch++;
                else f.prerelease.push(0);
                f.raw = f.format();
              case "":
              case ">=":
                if (!H || KCn(f, H)) H = f;
                break;
              case "<":
              case "<=":
                break;
              default:
                throw Error(`Unexpected operation: ${u.operator}`);
            }
          }),
          H && (!r || KCn(r, H)))
        )
          r = H;
      }
      if (r && e.test(r)) return r;
      return null;
    };
  zCn.exports = Ydo;
});