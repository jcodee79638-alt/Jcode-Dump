
var qtr = ne(() => {
  hse();
  Ba();
  Ym();
  J_();
  ((Xdt = class extends RS {
    static [Gr] = "SQLiteBaseIntegerBuilder";
    constructor(e, t, r) {
      super(e, t, r);
      this.config.autoIncrement = !1;
    }
    primaryKey(e) {
      if (e?.autoIncrement) this.config.autoIncrement = !0;
      return ((this.config.hasDefault = !0), super.primaryKey());
    }
  }),
    (Jdt = class extends gD {
      static [Gr] = "SQLiteBaseInteger";
      autoIncrement = this.config.autoIncrement;
      getSQLType() {
        return "integer";
      }
    }),
    (thn = class extends Xdt {
      static [Gr] = "SQLiteIntegerBuilder";
      constructor(e) {
        super(e, "number int53", "SQLiteInteger");
      }
      build(e) {
        return new rhn(e, this.config);
      }
    }),
    (rhn = class extends Jdt {
      static [Gr] = "SQLiteInteger";
    }),
    (nhn = class extends Xdt {
      static [Gr] = "SQLiteTimestampBuilder";
      constructor(e, t) {
        super(e, "object date", "SQLiteTimestamp");
        this.config.mode = t;
      }
      defaultNow() {
        return this.default(Zt`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
      }
      build(e) {
        return new ihn(e, this.config);
      }
    }),
    (ihn = class extends Jdt {
      static [Gr] = "SQLiteTimestamp";
      mode = this.config.mode;
      mapFromDriverValue = (e) => {
        if (typeof e === "string") return new Date(e.replaceAll('"', ""));
        if (this.config.mode === "timestamp") return new Date(e * 1000);
        return new Date(e);
      };
      mapToDriverValue = (e) => {
        if (typeof e === "number") return e;
        let t = e.getTime();
        if (this.config.mode === "timestamp") return Math.floor(t / 1000);
        return t;
      };
    }),
    (shn = class extends Xdt {
      static [Gr] = "SQLiteBooleanBuilder";
      constructor(e, t) {
        super(e, "boolean", "SQLiteBoolean");
        this.config.mode = t;
      }
      build(e) {
        return new ohn(e, this.config);
      }
    }),
    (ohn = class extends Jdt {
      static [Gr] = "SQLiteBoolean";
      mode = this.config.mode;
      mapFromDriverValue = (e) => Number(e) === 1;
      mapToDriverValue = (e) => (e ? 1 : 0);
    }));
});