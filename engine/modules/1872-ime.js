
var ime = ne(async () => {
  tTn();
  OH();
  Gt();
  uLt();
  uw();
  jA();
  DY();
  Aor();
  uor();
  await Jn([ime(), Kv(), fL(), qd()]);
  ((Qse = nTn),
    (bio = lLt(() => {
      try {
        let t = oTn();
        return Hor(t);
      } catch {
        return;
      }
    })));
  zse = class zse extends _i()("@opencode/v2/FileWatcher") {};
  ((Cio = Es(
    zse,
    ft(function* () {
      if (yield* Ad.OPENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER) return zse.of({});
      let e = jio(),
        t = yield* bm;
      if (!e)
        return (
          yield* cf("watcher backend not supported", { directory: t.directory, platform: "win32" }),
          zse.of({})
        );
      let r = bio();
      if (!r) return zse.of({});
      yield* fH("watcher backend", { directory: t.directory, platform: "win32", backend: e });
      let s = yield* lL,
        a = yield* ui.Service,
        H = yield* qG,
        u = yield* Qg(),
        f = G0(u),
        d = [];
      yield* sL(() => nA(() => Promise.allSettled(d.map((D) => D.unsubscribe()))));
      let _ = (D, S) => {
          for (let T of S) {
            if (T.type === "create") f(s.publish(Qse.Updated, { file: T.path, event: "add" }));
            if (T.type === "update") f(s.publish(Qse.Updated, { file: T.path, event: "change" }));
            if (T.type === "delete") f(s.publish(Qse.Updated, { file: T.path, event: "unlink" }));
          }
        },
        L = (D, S) => {
          let T = r.subscribe(D, _, { ignore: S, backend: e });
          return nA(() => T).pipe(
            DE((C) => jn(() => d.push(C))),
            vW(vio),
            jf(
              (C) => (
                T.then((O) => O.unsubscribe()).catch(() => {}),
                cf("failed to subscribe", { directory: D, cause: BC(C) })
              ),
            ),
          );
        },
        I = (yield* (yield* ZM).entries())
          .filter((D) => D.type === "document")
          .flatMap((D) => D.info.watcher?.ignore ?? []);
      if (t.vcs && (yield* Ad.OPENCODE_EXPERIMENTAL_FILEWATCHER))
        yield* EI(L(t.directory, [...Iio, ...I, ...Pio(t.directory)]));
      if (t.vcs?.type === "git") {
        let D = (yield* H.repo.discover(t.directory))?.gitDirectory,
          S = D ? yield* a.realPath(D).pipe($s(() => Jt(D))) : void 0;
        if (S && !I.includes(".git") && !I.includes(S) && (!D || !I.includes(D))) {
          let T = (yield* a.readDirectoryEntries(S).pipe($s(() => Jt([])))).flatMap((C) =>
            C.name === "HEAD" ? [] : [C.name],
          );
          yield* EI(L(S, T));
        }
      }
      return zse.of({});
    }).pipe(jf((e) => cf("failed to init watcher service", { cause: BC(e) }).pipe(eu(zse.of({}))))),
  )),
    (wio = Ua({ service: zse, layer: Cio, deps: [ui.node, KS, PY, zMe, zS] })));
});