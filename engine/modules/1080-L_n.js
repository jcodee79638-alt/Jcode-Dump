
var L_n = ne(() => {
  Zm();
  Ba();
  Ym();
  ((F4s = class extends tu {
    static [Gr] = "PgBinaryVectorBuilder";
    constructor(e, t) {
      super(e, "string binary", "PgBinaryVector");
      ((this.config.length = t.dimensions), (this.config.isLengthExact = !0));
    }
    build(e) {
      return new B4s(e, this.config);
    }
  }),
    (B4s = class extends dc {
      static [Gr] = "PgBinaryVector";
      codec = "bit";
      getSQLType() {
        return `bit(${this.length})`;
      }
    }));
});