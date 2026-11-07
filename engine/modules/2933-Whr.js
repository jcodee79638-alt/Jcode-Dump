
var Whr = ne(async () => {
  Gt();
  BA();
  await Jn([Whr(), e8(), Kv(), R2(), um(), qd()]);
  CAa = TD({
    id: "config-skill",
    effect: Ge(function* (e) {
      let t = yield* ZM,
        r = yield* M1,
        s = yield* bm;
      yield* e.skill.transform(
        Ge(function* (a) {
          let H = yield* t.entries(),
            u = H.flatMap((d) => (d.type === "directory" ? [d.path] : [])),
            f = H.flatMap((d) => (d.type === "document" ? (d.info.skills ?? []) : []));
          for (let d of u)
            (a.source(jar.make({ type: "directory", path: bo.make(jqe.join(d, "skill")) })),
              a.source(jar.make({ type: "directory", path: bo.make(jqe.join(d, "skills")) })));
          for (let d of f) {
            if (URL.canParse(d) && /^(https?:)$/.test(new URL(d).protocol)) {
              a.source(ffo.make({ type: "url", url: d }));
              continue;
            }
            let _ = d.startsWith("~/") ? jqe.join(r.home, d.slice(2)) : d;
            a.source(
              jar.make({
                type: "directory",
                path: bo.make(jqe.isAbsolute(_) ? _ : jqe.join(s.directory, _)),
              }),
            );
          }
        }),
      );
    }),
  });
});