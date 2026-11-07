
var Kmn = ne(() => {
  Zm();
  Ba();
  Ym();
  ((o4s = class extends tu {
    static [Gr] = "PgNumericBuilder";
    constructor(e, t, r) {
      super(e, "string numeric", "PgNumeric");
      ((this.config.precision = t), (this.config.scale = r));
    }
    build(e) {
      return new a4s(e, this.config);
    }
  }),
    (a4s = class extends dc {
      static [Gr] = "PgNumeric";
      codec = "numeric";
      precision;
      scale;
      constructor(e, t) {
        super(e, t);
        ((this.precision = t.precision), (this.scale = t.scale));
      }
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0)
          return `numeric(${this.precision}, ${this.scale})`;
        else if (this.precision === void 0) return "numeric";
        else return `numeric(${this.precision})`;
      }
    }),
    (H4s = class extends tu {
      static [Gr] = "PgNumericNumberBuilder";
      constructor(e, t, r) {
        super(e, "number", "PgNumericNumber");
        ((this.config.precision = t), (this.config.scale = r));
      }
      build(e) {
        return new c4s(e, this.config);
      }
    }),
    (c4s = class extends dc {
      static [Gr] = "PgNumericNumber";
      codec = "numeric:number";
      precision;
      scale;
      constructor(e, t) {
        super(e, t);
        ((this.precision = t.precision), (this.scale = t.scale));
      }
      mapToDriverValue = String;
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0)
          return `numeric(${this.precision}, ${this.scale})`;
        else if (this.precision === void 0) return "numeric";
        else return `numeric(${this.precision})`;
      }
    }),
    (A4s = class extends tu {
      static [Gr] = "PgNumericBigIntBuilder";
      constructor(e, t, r) {
        super(e, "bigint int64", "PgNumericBigInt");
        ((this.config.precision = t), (this.config.scale = r));
      }
      build(e) {
        return new u4s(e, this.config);
      }
    }),
    (u4s = class extends dc {
      static [Gr] = "PgNumericBigInt";
      codec = "numeric:bigint";
      precision;
      scale;
      constructor(e, t) {
        super(e, t);
        ((this.precision = t.precision), (this.scale = t.scale));
      }
      mapToDriverValue = String;
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0)
          return `numeric(${this.precision}, ${this.scale})`;
        else if (this.precision === void 0) return "numeric";
        else return `numeric(${this.precision})`;
      }
    }));
});