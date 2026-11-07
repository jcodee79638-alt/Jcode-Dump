
var lmn = ne(() => {
  Zm();
  Ba();
  ((y7s = class extends tu {
    static [Gr] = "PgBooleanBuilder";
    constructor(e) {
      super(e, "boolean", "PgBoolean");
    }
    build(e) {
      return new M7s(e, this.config);
    }
  }),
    (M7s = class extends dc {
      static [Gr] = "PgBoolean";
      codec = "bool";
      getSQLType() {
        return "boolean";
      }
    }));
});