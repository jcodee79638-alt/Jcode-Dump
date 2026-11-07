
var tmn = ne(() => {
  Ddt();
  Ba();
  BH();
  Dd();
  YA();
  Ov();
  vtr = class e extends _i()("drizzle-orm/EffectCache", { make: jn(() => emn(new sMe())) }) {
    static [Gr] = "drizzle-orm/EffectCache";
    static Default = Es(e, e.make);
    static fromDrizzle(t) {
      return emn(t);
    }
    static layerFromDrizzle(t) {
      return bf(e, e.fromDrizzle(t));
    }
  };
  Ttr = class extends ki()("EffectCacheError", { cause: PH }) {
    static [Gr] = "EffectCacheError";
  };
});