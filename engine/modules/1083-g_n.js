
var g_n = ne(() => {
  Zm();
  Ba();
  Ym();
  ((R4s = class extends tu {
    static [Gr] = "PgHalfVectorBuilder";
    constructor(e, t) {
      super(e, "array halfvector", "PgHalfVector");
      ((this.config.length = t.dimensions), (this.config.isLengthExact = !0));
    }
    build(e) {
      return new W4s(e, this.config);
    }
  }),
    (W4s = class extends dc {
      static [Gr] = "PgHalfVector";
      codec = "halfvec";
      getSQLType() {
        return `halfvec(${this.length})`;
      }
      mapToDriverValue = (e) => JSON.stringify(e);
    }));
});