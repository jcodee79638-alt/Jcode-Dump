
var Tmn = ne(() => {
  Zm();
  Udt();
  Ba();
  Ym();
  ((k7s = class extends _se {
    static [Gr] = "PgDateBuilder";
    constructor(e) {
      super(e, "object date", "PgDate");
    }
    build(e) {
      return new O7s(e, this.config);
    }
  }),
    (O7s = class extends dc {
      static [Gr] = "PgDate";
      codec = "date";
      getSQLType() {
        return "date";
      }
      mapToDriverValue = function (e) {
        if (typeof e === "string") return e;
        return e.toISOString();
      };
    }),
    (U7s = class extends _se {
      static [Gr] = "PgDateStringBuilder";
      constructor(e) {
        super(e, "string date", "PgDateString");
      }
      build(e) {
        return new N7s(e, this.config);
      }
    }),
    (N7s = class extends dc {
      static [Gr] = "PgDateString";
      codec = "date:string";
      getSQLType() {
        return "date";
      }
      mapToDriverValue = (e) => {
        if (typeof e === "string") return e;
        return e.toISOString();
      };
    }));
});