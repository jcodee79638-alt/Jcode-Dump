
var Hmn = ne(() => {
  Zm();
  Sdt();
  Ba();
  Ym();
  ((d7s = class extends dse {
    static [Gr] = "PgBigInt53Builder";
    constructor(e) {
      super(e, "number int53", "PgBigInt53");
    }
    build(e) {
      return new m7s(e, this.config);
    }
  }),
    (m7s = class extends dc {
      static [Gr] = "PgBigInt53";
      codec = "bigint:number";
      getSQLType() {
        return "bigint";
      }
    }),
    (_7s = class extends dse {
      static [Gr] = "PgBigInt64Builder";
      constructor(e) {
        super(e, "bigint int64", "PgBigInt64");
      }
      build(e) {
        return new h7s(e, this.config);
      }
    }),
    (h7s = class extends dc {
      static [Gr] = "PgBigInt64";
      codec = "bigint";
      getSQLType() {
        return "bigint";
      }
    }),
    (L7s = class extends dse {
      static [Gr] = "PgBigIntStringBuilder";
      constructor(e) {
        super(e, "string int64", "PgBigIntString");
      }
      build(e) {
        return new $7s(e, this.config);
      }
    }),
    ($7s = class extends dc {
      static [Gr] = "PgBigIntString";
      codec = "bigint:string";
      getSQLType() {
        return "bigint";
      }
    }));
});