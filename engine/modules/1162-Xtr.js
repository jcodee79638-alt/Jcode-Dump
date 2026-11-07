
var Xtr = ne(() => {
  hse();
  Ba();
  Ym();
  ((uhn = class extends RS {
    static [Gr] = "SQLiteTextBuilder";
    constructor(e, t) {
      super(e, t.enum?.length ? "string enum" : "string", "SQLiteText");
      ((this.config.enumValues = t.enum), (this.config.length = t.length));
    }
    build(e) {
      return new lhn(e, this.config);
    }
  }),
    (lhn = class extends gD {
      static [Gr] = "SQLiteText";
      enumValues = this.config.enumValues;
      constructor(e, t) {
        super(e, t);
      }
      getSQLType() {
        return `text${this.config.length ? `(${this.config.length})` : ""}`;
      }
    }),
    (fhn = class extends RS {
      static [Gr] = "SQLiteTextJsonBuilder";
      constructor(e) {
        super(e, "object json", "SQLiteTextJson");
      }
      build(e) {
        return new phn(e, this.config);
      }
    }),
    (phn = class extends gD {
      static [Gr] = "SQLiteTextJson";
      getSQLType() {
        return "text";
      }
      mapFromDriverValue = (e) => JSON.parse(e);
      mapToDriverValue = (e) => JSON.stringify(e);
    }));
});