
var Wmn = ne(() => {
  Zm();
  Ba();
  Ym();
  ((Y7s = class extends tu {
    static [Gr] = "PgLineBuilder";
    constructor(e) {
      super(e, "array line", "PgLine");
    }
    build(e) {
      return new Z7s(e, this.config);
    }
  }),
    (Z7s = class extends dc {
      static [Gr] = "PgLine";
      codec = "line:tuple";
      mode = "tuple";
      getSQLType() {
        return "line";
      }
      mapToDriverValue = (e) => `{${e[0]},${e[1]},${e[2]}}`;
    }),
    (e4s = class extends tu {
      static [Gr] = "PgLineABCBuilder";
      constructor(e) {
        super(e, "object line", "PgLineABC");
      }
      build(e) {
        return new t4s(e, this.config);
      }
    }),
    (t4s = class extends dc {
      static [Gr] = "PgLineABC";
      codec = "line";
      mode = "abc";
      getSQLType() {
        return "line";
      }
      mapToDriverValue = (e) => `{${e.a},${e.b},${e.c}}`;
    }));
});