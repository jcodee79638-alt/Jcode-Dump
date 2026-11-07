
var I_n = ne(() => {
  Zm();
  Ba();
  Ym();
  ((V4s = class extends tu {
    static [Gr] = "PgSparseVectorBuilder";
    constructor(e, t) {
      super(e, "string sparsevec", "PgSparseVector");
      this.config.vectorDimensions = t.dimensions;
    }
    build(e) {
      return new q4s(e, this.config);
    }
  }),
    (q4s = class extends dc {
      static [Gr] = "PgSparseVector";
      codec = "sparsevec";
      vectorDimensions = this.config.vectorDimensions;
      getSQLType() {
        return `sparsevec(${this.vectorDimensions})`;
      }
    }));
});