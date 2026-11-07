
var hlr = Ie(function (Hlc, Ati) {
  var GFo = ati(),
    { readFile: XFo, readdir: JFo, stat: KFo } = cr("fs/promises"),
    { resolve: XEt, basename: zFo, dirname: Hti } = cr("path"),
    QFo = gSe(),
    YFo = ({ path: e, packageJsonCache: t }) =>
      t.has(e)
        ? Promise.resolve(t.get(e))
        : XFo(e)
            .then((r) => {
              let s = QFo(JSON.parse(r));
              return (t.set(e, s), s);
            })
            .catch(() => null),
    cti = Symbol("package data has been normalized"),
    ZFo = ({ path: e, packageJsonCache: t }) =>
      YFo({ path: e, packageJsonCache: t }).then((r) => {
        if (!r || r[cti]) return r;
        if (r.bundledDependencies && !r.bundleDependencies)
          ((r.bundleDependencies = r.bundledDependencies), delete r.bundledDependencies);
        let s = r.bundleDependencies;
        if (s === !0)
          r.bundleDependencies = [
            ...Object.keys(r.dependencies || {}),
            ...Object.keys(r.optionalDependencies || {}),
          ];
        if (typeof s === "object" && !Array.isArray(s)) r.bundleDependencies = Object.keys(s);
        return ((r[cti] = !0), r);
      }),
    JEt = async ({
      path: e,
      depth: t = 1,
      currentDepth: r = 0,
      pkg: s = null,
      result: a = null,
      packageJsonCache: H = null,
    }) => {
      if (!a) a = new Set();
      if (!H) H = new Map();
      if (s === !0)
        return ZFo({ path: e + "/package.json", packageJsonCache: H }).then((_) =>
          JEt({ path: e, depth: t, currentDepth: r, pkg: _, result: a, packageJsonCache: H }),
        );
      if (s) {
        if (s.bin) {
          let _ = Hti(e),
            L = zFo(_),
            I = /^@.+/.test(L) ? Hti(_) : _,
            D = [];
          (Object.keys(s.bin).forEach((T) => {
            let C = XEt(I, ".bin", T);
            D.push(C, C + ".cmd", C + ".ps1");
          }),
            (
              await Promise.all(
                D.map((T) =>
                  KFo(T)
                    .then(() => T)
                    .catch(() => null),
                ),
              )
            )
              .filter((T) => T)
              .forEach((T) => a.add(T)));
        }
      }
      if (r >= t) return (a.add(e), a);
      let [u, f] = await Promise.all([
        JFo(e, { withFileTypes: !0 }),
        r === 0 && s && s.bundleDependencies ? GFo({ path: e, packageJsonCache: H }) : null,
      ]).catch(() => []);
      if (!u) return a;
      if (!u.length && !f && r !== 0) return (a.add(e), a);
      let d = [];
      for (let _ of u) {
        let L = XEt(e, _.name);
        if (_.isDirectory() === !1) {
          a.add(L);
          continue;
        }
        if (r !== 0 || _.name !== "node_modules") {
          if (r < t - 1)
            d.push(JEt({ path: L, packageJsonCache: H, depth: t, currentDepth: r + 1, result: a }));
          else a.add(L);
          continue;
        }
      }
      if (f)
        d.push(
          ...f.map((_) => {
            let L = XEt(e, "node_modules", _);
            return JEt({ path: L, packageJsonCache: H, pkg: !0, depth: t, currentDepth: r + 1, result: a });
          }),
        );
      if (d.length) await Promise.all(d);
      return a;
    };
  Ati.exports = ({ path: e, ...t }) => JEt({ path: XEt(e), ...t, pkg: !0 }).then((r) => [...r]);
});