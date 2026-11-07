
function Ct(e, t = !1) {
  let n = ee.default.resolve(e);
  return (
    n
      .slice(ee.default.parse(n).root.length)
      .split(ee.default.sep)
      .filter(Boolean)
      .reduce((r, s) => {
        let o = ee.default.join(r, s),
          l = (() => {
            try {
              return te.lstatSync(o);
            } catch (u) {
              if (!t || !u || typeof u !== "object" || !("code" in u) || u.code !== "ENOENT") throw u;
              return (te.mkdirSync(o), te.lstatSync(o));
            }
          })();
        if (!l.isDirectory() || l.isSymbolicLink()) throw new T("document");
        return o;
      }, ee.default.parse(n).root),
    te.realpathSync(n)
  );
}