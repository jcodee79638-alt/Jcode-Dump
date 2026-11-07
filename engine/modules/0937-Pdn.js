
var Pdn = ne(() => {
  Ba();
  BH();
  Dd();
  YA();
  Ldt = class e extends _i()("drizzle-orm/EffectLogger", { make: jn(() => ({ logQuery: (t, r) => ti })) }) {
    static [Gr] = "drizzle-orm/EffectLogger";
    static Default = Es(e, e.make);
    static fromDrizzle(t) {
      return { logQuery: (r, s) => jn(() => t.logQuery(r, s)) };
    }
    static layerFromDrizzle(t) {
      return bf(e, e.fromDrizzle(t));
    }
    static layer = bf(e, {
      logQuery: Ge("EffectLogger.logQuery")(function* (t, r) {
        let s = r.map((a) => {
          try {
            return JSON.stringify(a);
          } catch {
            return String(a);
          }
        });
        yield* Dpe().pipe(wU({ query: t, params: s }));
      }),
    });
  };
});