
var Shn = ne(() => {
  Ba();
  ((Qtr = class {
    static [Gr] = "SQLiteIndexBuilderOn";
    constructor(e, t) {
      ((this.name = e), (this.unique = t));
    }
    on(...e) {
      return new Mhn(this.name, e, this.unique);
    }
  }),
    (Mhn = class {
      static [Gr] = "SQLiteIndexBuilder";
      config;
      constructor(e, t, r) {
        this.config = { name: e, columns: t, unique: r, where: void 0 };
      }
      where(e) {
        return ((this.config.where = e), this);
      }
      build(e) {
        return new xhn(this.config, e);
      }
    }),
    (xhn = class {
      static [Gr] = "SQLiteIndex";
      config;
      isNameExplicit;
      constructor(e, t) {
        ((this.config = { ...e, table: t }), (this.isNameExplicit = !!e.name));
      }
    }));
});