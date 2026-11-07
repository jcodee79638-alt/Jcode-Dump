
var wmn = ne(() => {
  Zm();
  Sdt();
  Ba();
  ((V7s = class extends dse {
    static [Gr] = "PgIntegerBuilder";
    constructor(e) {
      super(e, "number int32", "PgInteger");
    }
    build(e) {
      return new q7s(e, this.config);
    }
  }),
    (q7s = class extends dc {
      static [Gr] = "PgInteger";
      codec = "int";
      getSQLType() {
        return "integer";
      }
    }));
});