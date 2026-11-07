
var d_n = ne(() => {
  Zm();
  Ba();
  J_();
  ((k4s = class extends tu {
    static [Gr] = "PgUUIDBuilder";
    constructor(e) {
      super(e, "string uuid", "PgUUID");
    }
    defaultRandom() {
      return this.default(Zt`gen_random_uuid()`);
    }
    build(e) {
      return new O4s(e, this.config);
    }
  }),
    (O4s = class extends dc {
      static [Gr] = "PgUUID";
      codec = "uuid";
      getSQLType() {
        return "uuid";
      }
    }));
});