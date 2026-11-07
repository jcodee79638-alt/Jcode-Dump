
var Amn = ne(() => {
  Zm();
  Ba();
  Ym();
  ((g7s = class extends tu {
    static [Gr] = "PgBigSerial53Builder";
    constructor(e) {
      super(e, "number int53", "PgBigSerial53");
      ((this.config.hasDefault = !0), (this.config.notNull = !0));
    }
    build(e) {
      return new E7s(e, this.config);
    }
  }),
    (E7s = class extends dc {
      static [Gr] = "PgBigSerial53";
      codec = "bigserial:number";
      getSQLType() {
        return "bigserial";
      }
    }),
    (I7s = class extends tu {
      static [Gr] = "PgBigSerial64Builder";
      constructor(e) {
        super(e, "bigint int64", "PgBigSerial64");
        ((this.config.hasDefault = !0), (this.config.notNull = !0));
      }
      build(e) {
        return new D7s(e, this.config);
      }
    }),
    (D7s = class extends dc {
      static [Gr] = "PgBigSerial64";
      codec = "bigserial";
      getSQLType() {
        return "bigserial";
      }
    }));
});