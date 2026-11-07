
var Xmn = ne(() => {
  Zm();
  Ba();
  ((i4s = class extends tu {
    static [Gr] = "PgMacaddr8Builder";
    constructor(e) {
      super(e, "string macaddr8", "PgMacaddr8");
    }
    build(e) {
      return new s4s(e, this.config);
    }
  }),
    (s4s = class extends dc {
      static [Gr] = "PgMacaddr8";
      codec = "macaddr8";
      getSQLType() {
        return "macaddr8";
      }
    }));
});