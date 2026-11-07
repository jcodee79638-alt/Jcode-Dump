
var mmn = ne(() => {
  Zm();
  Ba();
  ((T7s = class extends tu {
    static [Gr] = "PgCidrBuilder";
    constructor(e) {
      super(e, "string cidr", "PgCidr");
    }
    build(e) {
      return new v7s(e, this.config);
    }
  }),
    (v7s = class extends dc {
      static [Gr] = "PgCidr";
      codec = "cidr";
      getSQLType() {
        return "cidr";
      }
    }));
});