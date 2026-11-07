
var pmn = ne(() => {
  Zm();
  Ba();
  Ym();
  ((x7s = class extends tu {
    static [Gr] = "PgCharBuilder";
    constructor(e, t) {
      super(e, t.enum?.length ? "string enum" : "string", "PgChar");
      ((this.config.length = t.length ?? 1),
        (this.config.setLength = t.length !== void 0),
        (this.config.enumValues = t.enum));
    }
    build(e) {
      return new S7s(e, this.config);
    }
  }),
    (S7s = class extends dc {
      static [Gr] = "PgChar";
      codec = "char";
      enumValues;
      setLength;
      constructor(e, t) {
        super(e, t);
        ((this.enumValues = t.enumValues), (this.setLength = t.setLength));
      }
      getSQLType() {
        return this.setLength ? `char(${this.length})` : "char";
      }
    }));
});