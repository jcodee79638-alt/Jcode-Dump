
var Vtr = ne(() => {
  hse();
  Ba();
  Ym();
  ((Z_n = class extends RS {
    static [Gr] = "SQLiteCustomColumnBuilder";
    constructor(e, t, r) {
      super(e, "custom", "SQLiteCustomColumn");
      ((this.config.fieldConfig = t), (this.config.customTypeParams = r));
    }
    build(e) {
      return new ehn(e, this.config);
    }
  }),
    (ehn = class extends gD {
      static [Gr] = "SQLiteCustomColumn";
      sqlName;
      mapTo;
      mapFrom;
      mapJson;
      forJsonSelect;
      constructor(e, t) {
        super(e, t);
        ((this.sqlName = t.customTypeParams.dataType(t.fieldConfig)),
          (this.mapTo = t.customTypeParams.toDriver),
          (this.mapFrom = t.customTypeParams.fromDriver),
          (this.mapJson = t.customTypeParams.fromJson),
          (this.forJsonSelect = t.customTypeParams.forJsonSelect));
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue = (e) => (typeof this.mapFrom === "function" ? this.mapFrom(e) : e);
      mapFromJsonValue(e) {
        return typeof this.mapJson === "function" ? this.mapJson(e) : this.mapFromDriverValue(e);
      }
      jsonSelectIdentifier(e, t) {
        if (typeof this.forJsonSelect === "function") return this.forJsonSelect(e, t);
        let r = this.getSQLType().toLowerCase(),
          s = r.indexOf("(");
        switch (s + 1 ? r.slice(0, s) : r) {
          case "numeric":
          case "decimal":
          case "bigint":
            return t`cast(${e} as text)`;
          case "blob":
            return t`hex(${e})`;
          default:
            return e;
        }
      }
      mapToDriverValue = (e) => (typeof this.mapTo === "function" ? this.mapTo(e) : e);
    }));
});