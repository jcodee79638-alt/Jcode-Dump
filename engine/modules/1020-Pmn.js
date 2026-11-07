
var Pmn = ne(() => {
  Zm();
  Ba();
  ((R7s = class extends tu {
    static [Gr] = "PgInetBuilder";
    constructor(e) {
      super(e, "string inet", "PgInet");
    }
    build(e) {
      return new W7s(e, this.config);
    }
  }),
    (W7s = class extends dc {
      static [Gr] = "PgInet";
      codec = "inet";
      getSQLType() {
        return "inet";
      }
    }));
});