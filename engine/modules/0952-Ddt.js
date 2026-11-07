
var Ddt = ne(() => {
  Ba();
  ((u7s = class {
    static [Gr] = "Cache";
  }),
    (sMe = class extends u7s {
      static [Gr] = "NoopCache";
      strategy() {
        return "all";
      }
      async get(e) {}
      async put(e, t, r, s) {}
      async onMutate(e) {}
    }));
});