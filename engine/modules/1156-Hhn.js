
var Hhn = ne(() => {
  hse();
  Ba();
  Ym();
  ((fqs = class extends RS {
    static [Gr] = "SQLiteNumericBuilder";
    constructor(e) {
      super(e, "string numeric", "SQLiteNumeric");
    }
    build(e) {
      return new pqs(e, this.config);
    }
  }),
    (pqs = class extends gD {
      static [Gr] = "SQLiteNumeric";
      mapFromDriverValue = (e) => {
        if (typeof e === "string") return e;
        return String(e);
      };
      getSQLType() {
        return "numeric";
      }
    }),
    (dqs = class extends RS {
      static [Gr] = "SQLiteNumericNumberBuilder";
      constructor(e) {
        super(e, "number", "SQLiteNumericNumber");
      }
      build(e) {
        return new mqs(e, this.config);
      }
    }),
    (mqs = class extends gD {
      static [Gr] = "SQLiteNumericNumber";
      mapFromDriverValue = (e) => {
        if (typeof e === "number") return e;
        return Number(e);
      };
      mapToDriverValue = String;
      getSQLType() {
        return "numeric";
      }
    }),
    (_qs = class extends RS {
      static [Gr] = "SQLiteNumericBigIntBuilder";
      constructor(e) {
        super(e, "bigint int64", "SQLiteNumericBigInt");
      }
      build(e) {
        return new hqs(e, this.config);
      }
    }),
    (hqs = class extends gD {
      static [Gr] = "SQLiteNumericBigInt";
      mapFromDriverValue = BigInt;
      mapToDriverValue = String;
      getSQLType() {
        return "numeric";
      }
    }));
});