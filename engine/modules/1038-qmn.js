
var qmn = ne(() => {
  Zm();
  Ba();
  ((r4s = class extends tu {
    static [Gr] = "PgMacaddrBuilder";
    constructor(e) {
      super(e, "string macaddr", "PgMacaddr");
    }
    build(e) {
      return new n4s(e, this.config);
    }
  }),
    (n4s = class extends dc {
      static [Gr] = "PgMacaddr";
      codec = "macaddr";
      getSQLType() {
        return "macaddr";
      }
    }));
});