
var c_n = ne(() => {
  Zm();
  Ba();
  Ym();
  ((S4s = class extends tu {
    static [Gr] = "PgTextBuilder";
    constructor(e, t) {
      super(e, t.enum?.length ? "string enum" : "string", "PgText");
      this.config.enumValues = t.enum;
    }
    build(e) {
      return new T4s(e, this.config, this.config.enumValues);
    }
  }),
    (T4s = class extends dc {
      static [Gr] = "PgText";
      enumValues;
      codec = "text";
      constructor(e, t, r) {
        super(e, t);
        this.enumValues = r;
      }
      getSQLType() {
        return "text";
      }
    }));
});