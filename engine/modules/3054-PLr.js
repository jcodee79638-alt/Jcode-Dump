
var PLr = ne(() => {
  PLr();
  Gt();
  rV();
  AP();
  OH();
  Vqe = class Vqe extends _i()("@opencode/ApplicationTools") {};
  ((Zua = Es(
    Vqe,
    ft(function* () {
      let e = lde({
        initial: () => ({ entries: new Map() }),
        draft: (t) => ({
          set: (r, s) => {
            t.entries.set(r, s);
          },
        }),
      });
      return Vqe.of({
        register: Ge("ApplicationTools.register")(function* (t) {
          let r = Object.entries(t);
          if (r.length === 0) return;
          yield* ja(r, ([a]) => bLr(a), { discard: !0 });
          let s = r.map(([a, H]) => [a, { identity: {}, tool: H }]);
          yield* e.transform((a) => {
            for (let [H, u] of s) a.set(H, u);
          });
        }),
        entries: () => e.get().entries,
      });
    }),
  )),
    (_Ii = iA({ service: Vqe, layer: Zua, deps: [] })));
});