
var t_n = ne(() => {
  Zm();
  Ba();
  (($4s = class extends tu {
    static [Gr] = "PgRealBuilder";
    constructor(e, t) {
      super(e, "number float", "PgReal");
      this.config.length = t;
    }
    build(e) {
      return new g4s(e, this.config);
    }
  }),
    (g4s = class extends dc {
      static [Gr] = "PgReal";
      codec = "float4";
      constructor(e, t) {
        super(e, t);
      }
      getSQLType() {
        return "real";
      }
    }));
});