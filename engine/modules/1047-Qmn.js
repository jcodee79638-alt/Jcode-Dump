
var Qmn = ne(() => {
  Zm();
  Ba();
  Ym();
  ((l4s = class extends tu {
    static [Gr] = "PgPointTupleBuilder";
    constructor(e) {
      super(e, "array point", "PgPointTuple");
    }
    build(e) {
      return new f4s(e, this.config);
    }
  }),
    (f4s = class extends dc {
      static [Gr] = "PgPointTuple";
      codec = "point:tuple";
      mode = "tuple";
      getSQLType() {
        return "point";
      }
      mapToDriverValue = (e) => `(${e[0]},${e[1]})`;
    }),
    (p4s = class extends tu {
      static [Gr] = "PgPointObjectBuilder";
      constructor(e) {
        super(e, "object point", "PgPointObject");
      }
      build(e) {
        return new d4s(e, this.config);
      }
    }),
    (d4s = class extends dc {
      static [Gr] = "PgPointObject";
      codec = "point";
      mode = "xy";
      getSQLType() {
        return "point";
      }
      mapToDriverValue = (e) => `(${e.x},${e.y})`;
    }));
});