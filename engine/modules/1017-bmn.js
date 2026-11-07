
var bmn = ne(() => {
  Zm();
  Ba();
  ((F7s = class extends tu {
    static [Gr] = "PgDoublePrecisionBuilder";
    constructor(e) {
      super(e, "number double", "PgDoublePrecision");
    }
    build(e) {
      return new B7s(e, this.config);
    }
  }),
    (B7s = class extends dc {
      static [Gr] = "PgDoublePrecision";
      codec = "float8";
      getSQLType() {
        return "double precision";
      }
    }));
});