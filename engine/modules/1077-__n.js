
var __n = ne(() => {
  Zm();
  Ba();
  Ym();
  ((U4s = class extends tu {
    static [Gr] = "PgVarcharBuilder";
    constructor(e, t) {
      super(e, t.enum?.length ? "string enum" : "string", "PgVarchar");
      ((this.config.length = t.length), (this.config.enumValues = t.enum));
    }
    build(e) {
      return new N4s(e, this.config);
    }
  }),
    (N4s = class extends dc {
      static [Gr] = "PgVarchar";
      codec = "varchar";
      enumValues;
      constructor(e, t) {
        super(e, t);
        this.enumValues = t.enumValues;
      }
      getSQLType() {
        return this.length === void 0 ? "varchar" : `varchar(${this.length})`;
      }
    }));
});