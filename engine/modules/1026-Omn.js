
var Omn = ne(() => {
  Zm();
  Ba();
  Ym();
  ((G7s = class extends tu {
    static [Gr] = "PgIntervalBuilder";
    constructor(e, t) {
      super(e, "string interval", "PgInterval");
      this.config.intervalConfig = t;
    }
    build(e) {
      return new X7s(e, this.config);
    }
  }),
    (X7s = class extends dc {
      static [Gr] = "PgInterval";
      codec = "interval";
      fields;
      precision;
      constructor(e, t) {
        super(e, t);
        ((this.fields = t.intervalConfig.fields), (this.precision = t.intervalConfig.precision));
      }
      getSQLType() {
        return `interval${this.fields ? ` ${this.fields}` : ""}${this.precision ? `(${this.precision})` : ""}`;
      }
    }));
});