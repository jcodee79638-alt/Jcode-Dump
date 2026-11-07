
var JYi = Ie(function (fbA, XYi) {
  var ACr = Mb(),
    WeH = ER(),
    GYi = PQe(),
    VeH = (e, t) => {
      e = new WeH(e, t);
      let r = new ACr("0.0.0");
      if (e.test(r)) return r;
      if (((r = new ACr("0.0.0-0")), e.test(r))) return r;
      r = null;
      for (let s = 0; s < e.set.length; ++s) {
        let a = e.set[s],
          H = null;
        if (
          (a.forEach((u) => {
            let f = new ACr(u.semver.version);
            switch (u.operator) {
              case ">":
                if (f.prerelease.length === 0) f.patch++;
                else f.prerelease.push(0);
                f.raw = f.format();
              case "":
              case ">=":
                if (!H || GYi(f, H)) H = f;
                break;
              case "<":
              case "<=":
                break;
              default:
                throw Error(`Unexpected operation: ${u.operator}`);
            }
          }),
          H && (!r || GYi(r, H)))
        )
          r = H;
      }
      if (r && e.test(r)) return r;
      return null;
    };
  XYi.exports = VeH;
});