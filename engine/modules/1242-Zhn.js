
var Zhn = ne(() => {
  BH();
  Dd();
  Str();
  tmn();
  Cdn();
  Ba();
  Qdt();
  irr();
  gde();
  prr();
  Yhn = class Yhn extends S3e {
    static [Gr] = "EffectSQLiteDatabase";
  };
  ((Tqs = gie(vtr.Default, Ldt.Default)),
    (vqs = Ge("SQLiteDrizzle.make")(function* (e = {}) {
      let t = yield* Edt,
        r = yield* vtr,
        s = yield* Ldt,
        a = new Ihn(),
        H = e.relations ?? {},
        u = new frr(t, a, H, { logger: s, cache: r, useJitMappers: khn(e.jit) }),
        f = new Yhn(a, u, H);
      return ((f.$client = t), (f.$cache.invalidate = r.onMutate), f);
    })));
});