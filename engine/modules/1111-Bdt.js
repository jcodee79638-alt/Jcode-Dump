
var Bdt = ne(() => {
  Ba();
  L2();
  J_();
  f3e();
  hdt();
  b_n();
  Fj();
  ((j_n = class {
    static [Gr] = "Relation";
    referencedTableName;
    fieldName;
    constructor(e, t, r) {
      ((this.sourceTable = e),
        (this.referencedTable = t),
        (this.relationName = r),
        (this.referencedTableName = t[TH.Symbol.Name]));
    }
  }),
    (Y4s = class {
      static [Gr] = "Relations";
      constructor(e, t) {
        ((this.table = e), (this.config = t));
      }
    }),
    (aMe = class e extends j_n {
      static [Gr] = "One";
      constructor(t, r, s, a) {
        super(t, r, s?.relationName);
        ((this.config = s), (this.isNullable = a));
      }
      withFieldName(t) {
        let r = new e(this.sourceTable, this.referencedTable, this.config, this.isNullable);
        return ((r.fieldName = t), r);
      }
    }),
    (Ntr = class e extends j_n {
      static [Gr] = "Many";
      constructor(t, r, s) {
        super(t, r, s?.relationName);
        this.config = s;
      }
      withFieldName(t) {
        let r = new e(this.sourceTable, this.referencedTable, this.config);
        return ((r.fieldName = t), r);
      }
    }));
});