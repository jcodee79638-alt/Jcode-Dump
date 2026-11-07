
var Zmn = ne(() => {
  Zm();
  Ba();
  Ym();
  ((m4s = class extends tu {
    static [Gr] = "PgGeometryBuilder";
    constructor(e, t) {
      super(e, "array geometry", "PgGeometry");
      this.config.srid = t;
    }
    build(e) {
      return new _4s(e, this.config);
    }
  }),
    (_4s = class extends dc {
      static [Gr] = "PgGeometry";
      codec = "geometry(point):tuple";
      srid = this.config.srid;
      mode = "tuple";
      getSQLType() {
        return `geometry(point${this.srid === void 0 ? "" : `,${this.srid}`})`;
      }
      mapToDriverValue = (e) => `point(${e[0]} ${e[1]})`;
    }),
    (h4s = class extends tu {
      static [Gr] = "PgGeometryObjectBuilder";
      constructor(e, t) {
        super(e, "object geometry", "PgGeometryObject");
        this.config.srid = t;
      }
      build(e) {
        return new L4s(e, this.config);
      }
    }),
    (L4s = class extends dc {
      static [Gr] = "PgGeometryObject";
      codec = "geometry(point)";
      srid = this.config.srid;
      mode = "object";
      getSQLType() {
        return `geometry(point${this.srid === void 0 ? "" : `,${this.srid}`})`;
      }
      mapToDriverValue = (e) => `point(${e.x} ${e.y})`;
    }));
});