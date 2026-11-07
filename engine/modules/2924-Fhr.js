
var Fhr = ne(async () => {
  Gt();
  jA();
  Uhr();
  await Jn([Fhr(), Kv(), qd(), Rae(), e8()]);
  ((xAa = nt({
    default: Io([
      nt({ id: re, effect: qW((e) => typeof e === "function") }),
      nt({ id: re, setup: qW((e) => typeof e === "function") }),
    ]),
  })),
    (SAa = TD({
      id: "config-plugin",
      effect: Ge(function* (e) {
        let t = yield* ZM,
          r = yield* ui.Service,
          s = yield* bm,
          a = yield* Bae;
        yield* ft(function* () {
          let H = [];
          for (let u of yield* t.entries()) {
            if (u.type === "document") {
              let f = u.path ? Nhr.dirname(u.path) : s.directory;
              for (let d of u.info.plugins ?? []) {
                let _ = typeof d === "string" ? { package: d } : d,
                  L = (() => {
                    if (_.package.startsWith("file://")) return yAa(_.package);
                    if (_.package.startsWith("./") || _.package.startsWith("../"))
                      return Nhr.resolve(f, _.package);
                    return _.package;
                  })();
                H.push({ package: L, options: _.options });
              }
            }
            if (u.type === "directory") {
              let f = yield* r
                .glob("{plugin,plugins}/*.{ts,js}", {
                  cwd: u.path,
                  absolute: !0,
                  include: "file",
                  dot: !0,
                  symlink: !0,
                })
                .pipe(PU(() => []));
              f.sort();
              for (let d of f) H.push({ package: d });
            }
          }
          for (let u of H)
            yield* ft(function* () {
              let f = Nhr.isAbsolute(u.package) ? MAa(u.package).href : (yield* a.add(u.package)).entrypoint;
              if (!f) return;
              let d = yield* nA(() => import(f)),
                _ = (yield* G_(xAa)(d)).default,
                L = "effect" in _ ? _ : D0i(_);
              yield* e.plugin.add({ id: L.id, effect: (I) => L.effect({ ...I, options: u.options ?? {} }) });
            }).pipe(Bsn);
        }).pipe(EI({ startImmediately: !0 }));
      }),
    })));
});