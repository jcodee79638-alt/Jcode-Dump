
var Nmn = ne(() => {
  Zm();
  Ba();
  ((J7s = class extends tu {
    static [Gr] = "PgJsonBuilder";
    constructor(e) {
      super(e, "object json", "PgJson");
    }
    build(e) {
      return new K7s(e, this.config);
    }
  }),
    (K7s = class extends dc {
      static [Gr] = "PgJson";
      codec = "json";
      constructor(e, t) {
        super(e, t);
      }
      getSQLType() {
        return "json";
      }
    }));
});