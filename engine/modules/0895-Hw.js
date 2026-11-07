
var Hw = ne(() => {
  Ba();
  ((X_ = class {
    static [Gr] = "Subquery";
    constructor(e, t, r, s = !1, a = []) {
      this._ = { brand: "Subquery", sql: e, selectedFields: t, alias: r, isWith: s, usedTables: a };
    }
  }),
    (Q1e = class extends X_ {
      static [Gr] = "WithSubquery";
    }));
});