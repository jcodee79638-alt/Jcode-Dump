
var Vce = ne(() => {
  Gt();
  Ql();
  QPt();
  jA();
  tk = Ge("Tool.assertExternalDirectory")(function* (e, t, r) {
    if (!t) return !1;
    if (r?.bypass) return !1;
    let s = yield* Jc,
      a = ui.normalizePath(t);
    if (XLe(a, s)) return !1;
    let u = (r?.kind ?? "file") === "directory" ? a : O5i.dirname(a),
      f = ui.normalizePathPattern(O5i.join(u, "*"));
    return (
      yield* e.ask({
        permission: "external_directory",
        patterns: [f],
        always: [f],
        metadata: { filepath: a, parentDir: u },
      }),
      !0
    );
  });
});