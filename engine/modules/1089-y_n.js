
var y_n = ne(() => {
  Zm();
  Ba();
  Ym();
  ((G4s = class extends tu {
    static [Gr] = "PgVectorBuilder";
    constructor(e, t) {
      super(e, "array vector", "PgVector");
      ((this.config.length = t.dimensions), (this.config.isLengthExact = !0));
    }
    build(e) {
      return new X4s(e, this.config);
    }
  }),
    (X4s = class extends dc {
      static [Gr] = "PgVector";
      codec = "vector";
      getSQLType() {
        return `vector(${this.length})`;
      }
      mapToDriverValue = (e) => JSON.stringify(e);
    }));
});