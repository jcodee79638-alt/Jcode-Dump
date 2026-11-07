
var Gtr = ne(() => {
  hse();
  Ba();
  ((chn = class extends RS {
    static [Gr] = "SQLiteRealBuilder";
    constructor(e) {
      super(e, "number double", "SQLiteReal");
    }
    build(e) {
      return new Ahn(e, this.config);
    }
  }),
    (Ahn = class extends gD {
      static [Gr] = "SQLiteReal";
      getSQLType() {
        return "real";
      }
    }));
});