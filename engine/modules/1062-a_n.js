
var a_n = ne(() => {
  Zm();
  Ba();
  ((M4s = class extends tu {
    static [Gr] = "PgSmallSerialBuilder";
    constructor(e) {
      super(e, "number int16", "PgSmallSerial");
      ((this.config.hasDefault = !0), (this.config.notNull = !0));
    }
    build(e) {
      return new x4s(e, this.config);
    }
  }),
    (x4s = class extends dc {
      static [Gr] = "PgSmallSerial";
      codec = "smallserial";
      getSQLType() {
        return "smallserial";
      }
    }));
});