
var iYe = ne(() => {
  Gt();
  au();
  ise();
  iYe();
  Fwe = class Fwe extends _i()("@opencode/HttpApiWebSocketTracker") {};
  ((fnH = sQt(Fwe)(() => {
    let e = new Set(),
      t = !1;
    return Fwe.of({
      add: (r) =>
        ft(function* () {
          if (t) return !1;
          return (e.add(r), !0);
        }),
      remove: (r) =>
        jn(() => {
          e.delete(r);
        }),
      closeAll: ft(function* () {
        t = !0;
        let r = Array.from(e);
        (e.clear(),
          yield* Km(
            r.map((s) =>
              s.pipe(
                vW("1 second"),
                $s(() => ti),
              ),
            ),
            { concurrency: "unbounded", discard: !0 },
          ));
      }),
    });
  })),
    (pnH = Ll({ service: Fwe, layer: fnH, deps: [] })));
});