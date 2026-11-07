
var zde = ne(() => {
  zde();
  OH();
  Gt();
  $ht();
  rV();
  $4H = u1n;
  Vse = class Vse extends _i()("@opencode/v2/Command") {};
  ((l1n = Es(
    Vse,
    jn(() => {
      let e = lde({
        initial: () => ({ commands: new Map() }),
        draft: (t) => ({
          list: () => Array.from(t.commands.values()),
          get: (r) => t.commands.get(r),
          update: (r, s) => {
            let a = t.commands.get(r) ?? { name: r, template: "" };
            if (!t.commands.has(r)) t.commands.set(r, a);
            (s(a), (a.name = r));
          },
          remove: (r) => {
            t.commands.delete(r);
          },
        }),
      });
      return Vse.of({
        reload: e.reload,
        transform: e.transform,
        get: Ge("CommandV2.get")(function* (t) {
          return e.get().commands.get(t);
        }),
        list: Ge("CommandV2.list")(function* () {
          return Array.from(e.get().commands.values());
        }),
      });
    }),
  )),
    (kYs = l1n),
    (Xir = Ua({ service: Vse, layer: l1n, deps: [] })));
});