
var kJn = Ie(function (qcc, wJn) {
  var zCo = (e, t) =>
      !/^[/@_]/.test(e) && typeof dAr(t) === "string" && `npm_config_${e.replace(/-/g, "_").toLowerCase()}`,
    dAr = (e) =>
      Array.isArray(e)
        ? e.map((t) => dAr(t)).join(`

`)
        : e === null || e === void 0 || e === !1
          ? ""
          : typeof e === "object"
            ? null
            : String(e),
    PJn = (e, t) => (!Array.isArray(t) || !Array.isArray(e) ? e === t : QCo(e, t)),
    QCo = (e, t) => {
      if (e.length !== t.length) return !1;
      for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
      return !0;
    },
    CJn = (e, t, r) => {
      let s = dAr(r),
        a = zCo(t, s);
      if (a && s !== null) e[a] = s;
    },
    YCo = (e) => {
      let {
        env: t,
        defaults: r,
        definitions: s,
        list: [a, H],
      } = e;
      t.INIT_CWD = process.cwd();
      let u = new Set(Object.keys(a)),
        f = new Set(Object.keys(H));
      for (let d in a) {
        let { deprecated: _, envExport: L = !0 } = s[d] || {};
        if (_ || L === !1) continue;
        if (PJn(r[d], a[d])) {
          if (!PJn(H[d], a[d])) CJn(t, d, a[d]);
        } else if (!(f.has(d) && !u.has(d))) CJn(t, d, a[d]);
      }
      if (
        ((t.HOME = e.home),
        (t.npm_config_global_prefix = e.globalPrefix),
        (t.npm_config_local_prefix = e.localPrefix),
        a.editor)
      )
        t.EDITOR = a.editor;
      if (a["node-options"]) t.NODE_OPTIONS = a["node-options"];
      ((t.npm_config_node_gyp = a["node-gyp"]),
        (t.npm_config_npm_version = a["npm-version"] || "unknown"),
        (t.npm_execpath = e.npmBin),
        (t.NODE = t.npm_node_execpath = e.execPath));
    };
  wJn.exports = YCo;
});