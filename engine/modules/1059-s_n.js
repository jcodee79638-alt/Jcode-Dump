
var s_n = ne(() => {
  Zm();
  Sdt();
  Ba();
  ((D4s = class extends dse {
    static [Gr] = "PgSmallIntBuilder";
    constructor(e) {
      super(e, "number int16", "PgSmallInt");
    }
    build(e) {
      return new y4s(e, this.config);
    }
  }),
    (y4s = class extends dc {
      static [Gr] = "PgSmallInt";
      codec = "smallint";
      getSQLType() {
        return "smallint";
      }
    }));
});