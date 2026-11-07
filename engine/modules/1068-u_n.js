
var u_n = ne(() => {
  Zm();
  Udt();
  Ba();
  Ym();
  ((v4s = class extends _se {
    static [Gr] = "PgTimeBuilder";
    constructor(e, t, r) {
      super(e, "string time", "PgTime");
      ((this.withTimezone = t),
        (this.precision = r),
        (this.config.withTimezone = t),
        (this.config.precision = r));
    }
    build(e) {
      return new b4s(e, this.config);
    }
  }),
    (b4s = class extends dc {
      static [Gr] = "PgTime";
      codec = "time";
      withTimezone;
      precision;
      constructor(e, t) {
        super(e, t);
        ((this.withTimezone = t.withTimezone), (this.precision = t.precision));
      }
      getSQLType() {
        return `time${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
      }
    }));
});