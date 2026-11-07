
var xmn = ne(() => {
  Zm();
  Ctr();
  ymn();
  Ba();
  Ym();
  ((C7s = class extends tu {
    static [Gr] = "PgCustomColumnBuilder";
    constructor(e, t, r) {
      super(e, "custom", "PgCustomColumn");
      ((this.config.fieldConfig = t), (this.config.customTypeParams = r));
    }
    build(e) {
      return new w7s(e, this.config);
    }
  }),
    (w7s = class extends dc {
      static [Gr] = "PgCustomColumn";
      codec;
      sqlName;
      mapFromJsonValue;
      jsonSelectIdentifier;
      constructor(e, t) {
        super(e, t);
        ((this.sqlName = t.customTypeParams.dataType(t.fieldConfig)),
          (this.mapToDriverValue = t.customTypeParams.toDriver ?? this.mapToDriverValue),
          (this.mapFromDriverValue = t.customTypeParams.fromDriver ?? this.mapFromDriverValue),
          (this.mapFromJsonValue = t.customTypeParams.fromJson),
          (this.jsonSelectIdentifier = t.customTypeParams.forJsonSelect));
        let r =
          typeof t.customTypeParams.codec === "string" || typeof t.customTypeParams.codec > "u"
            ? t.customTypeParams.codec
            : t.customTypeParams.codec(t.fieldConfig);
        if (
          ((this.codec = typeof r === "string" ? Dmn(r) : void 0),
          this.dimensions && t.customTypeParams.fromJson)
        )
          this.mapFromJsonValue = (s) => {
            if (s === null) return s;
            let a = typeof s === "string" ? Tdt(s) : s;
            return this.mapJsonArrayElements(a, t.customTypeParams.fromJson, this.dimensions);
          };
      }
      mapJsonArrayElements(e, t, r) {
        if (r > 0 && Array.isArray(e))
          return e.map((s) => (s === null ? null : this.mapJsonArrayElements(s, t, r - 1)));
        return t(e);
      }
      getSQLType() {
        return this.sqlName;
      }
    }));
});