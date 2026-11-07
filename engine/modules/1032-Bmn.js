
var Bmn = ne(() => {
  Zm();
  Ba();
  ((z7s = class extends tu {
    static [Gr] = "PgJsonbBuilder";
    constructor(e) {
      super(e, "object json", "PgJsonb");
    }
    build(e) {
      return new Q7s(e, this.config);
    }
  }),
    (Q7s = class extends dc {
      static [Gr] = "PgJsonb";
      codec = "jsonb";
      constructor(e, t) {
        super(e, t);
      }
      getSQLType() {
        return "jsonb";
      }
    }));
});