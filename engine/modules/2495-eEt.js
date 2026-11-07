
var eEt = Ie(function (_uc, ZQn) {
  var Z0t = cr("path"),
    b8o = y7e(),
    { minimatch: b7e } = v7e(),
    KQn = fN(),
    { glob: j8o } = T0t();
  function P8o(e) {
    let t = [],
      r = [];
    for (let s of e) {
      let a = s.match(/^!+/);
      if (a) s = s.slice(a[0].length);
      if (((s = s.replace(/^\.?\/+/, "")), a && a[0].length % 2 === 1)) r.push(s);
      else {
        for (let u = 0; u < r.length; ++u) {
          let f = r[u];
          if (b7e(s, f)) r.splice(u, 1);
        }
        t.push(s);
      }
    }
    for (let s of r) for (let a of b7e.match(t, s)) t.splice(t.indexOf(a), 1);
    return { patterns: t, negatedPatterns: r };
  }
  function zQn(e) {
    let t = Array.isArray(e.packages) ? e.packages : e;
    if (!Array.isArray(t))
      throw Y0t({ message: "workspaces config expects an Array", code: "EWORKSPACESCONFIG" });
    return P8o(t);
  }
  function QQn(e, t) {
    return e.name || b8o(t);
  }
  function C8o(e) {
    return ((e = e.replace(/\\/g, "/")), e.endsWith("/") ? e : `${e}/`);
  }
  function Y0t({ Type: e = TypeError, message: t, code: r }) {
    return Object.assign(new e(t), { code: r });
  }
  function w8o(e) {
    return new Map(Array.from(e, (t) => t.reverse()));
  }
  async function YQn(e = {}) {
    if (!e || !e.pkg) throw Y0t({ message: "mapWorkspaces missing pkg info", code: "EMAPWORKSPACESPKG" });
    if (!e.cwd) e.cwd = process.cwd();
    let { workspaces: t = [] } = e.pkg,
      { patterns: r, negatedPatterns: s } = zQn(t),
      a = new Map();
    if (!r.length && !s.length) return a;
    let H = new Map(),
      u = () => ({ ...e, ignore: [...(e.ignore || []), "**/node_modules/**", ...s] }),
      f = await j8o(
        r.map((L) => C8o(L)),
        u(),
      );
    f = f.sort((L, I) => L.localeCompare(I, "en"));
    let d = [];
    for (let L of r) d.push(...f.filter((I) => b7e(I, L, { partial: !0, windowsPathsNoEscape: !0 })));
    for (let L of d) {
      let I;
      try {
        I = await KQn.normalize(Z0t.join(e.cwd, L));
      } catch (T) {
        if (T.code === "ENOENT" || T.code === "ENOTDIR") continue;
        else throw T;
      }
      let D = QQn(I.content, I.path),
        S = H.get(D);
      if (!S) ((S = new Set()), H.set(D, S));
      S.add(I.path);
    }
    let _ = ["must not have multiple workspaces with the same name"];
    for (let [L, I] of H)
      if (I.size > 1) k8o(_, L, I);
      else a.set(L, I.values().next().value);
    if (_.length > 1)
      throw Y0t({
        Type: Error,
        message: _.join(`
`),
        code: "EDUPLICATEWORKSPACE",
      });
    return a;
  }
  function k8o(e, t, r) {
    e.push(`package '${t}' has conflicts in the following paths:`);
    for (let s of r) e.push("    " + s);
  }
  YQn.virtual = function (e = {}) {
    if (!e || !e.lockfile)
      throw Y0t({ message: "mapWorkspaces.virtual missing lockfile info", code: "EMAPWORKSPACESLOCKFILE" });
    if (!e.cwd) e.cwd = process.cwd();
    let { packages: t = {} } = e.lockfile,
      { workspaces: r = [] } = t[""] || {},
      s = new Map(),
      { patterns: a, negatedPatterns: H } = zQn(r);
    if (!a.length && !H.length) return s;
    H.push("**/node_modules/**");
    let u = Object.keys(t);
    for (let f of H) for (let d of b7e.match(u, f)) u.splice(u.indexOf(d), 1);
    for (let f of a)
      for (let d of b7e.match(u, f)) {
        let _ = Z0t.join(e.cwd, d),
          L = QQn(t[d], _);
        s.set(_, L);
      }
    return w8o(s);
  };
  ZQn.exports = YQn;
});