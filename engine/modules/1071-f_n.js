
var f_n = ne(() => {
  Zm();
  Udt();
  Ba();
  Ym();
  ((j4s = class extends _se {
    static [Gr] = "PgTimestampBuilder";
    constructor(e, t, r) {
      super(e, "object date", "PgTimestamp");
      ((this.config.withTimezone = t), (this.config.precision = r));
    }
    build(e) {
      return new P4s(e, this.config);
    }
  }),
    (P4s = class extends dc {
      static [Gr] = "PgTimestamp";
      codec;
      withTimezone;
      precision;
      constructor(e, t) {
        super(e, t);
        ((this.withTimezone = t.withTimezone),
          (this.precision = t.precision),
          (this.codec = this.withTimezone ? "timestamptz" : "timestamp"));
      }
      getSQLType() {
        return `timestamp${this.precision === void 0 ? "" : ` (${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
      }
      mapToDriverValue = (e) => {
        if (typeof e === "string") return e;
        return e.toISOString();
      };
    }),
    (C4s = class extends _se {
      static [Gr] = "PgTimestampStringBuilder";
      constructor(e, t, r) {
        super(e, "string timestamp", "PgTimestampString");
        ((this.config.withTimezone = t), (this.config.precision = r));
      }
      build(e) {
        return new w4s(e, this.config);
      }
    }),
    (w4s = class extends dc {
      static [Gr] = "PgTimestampString";
      codec;
      withTimezone;
      precision;
      constructor(e, t) {
        super(e, t);
        ((this.withTimezone = t.withTimezone),
          (this.precision = t.precision),
          (this.codec = this.withTimezone ? "timestamptz:string" : "timestamp:string"));
      }
      getSQLType() {
        return `timestamp${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
      }
      mapToDriverValue = (e) => {
        if (typeof e === "string") return e;
        return e.toISOString();
      };
    }));
});