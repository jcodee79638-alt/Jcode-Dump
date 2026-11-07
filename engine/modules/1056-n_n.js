
var n_n = ne(() => {
  Zm();
  Ba();
  ((E4s = class extends tu {
    static [Gr] = "PgSerialBuilder";
    constructor(e) {
      super(e, "number int32", "PgSerial");
      ((this.config.hasDefault = !0), (this.config.notNull = !0));
    }
    build(e) {
      return new I4s(e, this.config);
    }
  }),
    (I4s = class extends dc {
      static [Gr] = "PgSerial";
      codec = "serial";
      getSQLType() {
        return "serial";
      }
    }));
});