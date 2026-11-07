
var b_n = ne(() => {
  T_n();
  Ba();
  ((v_n = class {
    static [Gr] = "PgPrimaryKeyBuilder";
    columns;
    name;
    constructor(e, t) {
      ((this.columns = e), (this.name = t));
    }
    build(e) {
      return new Q4s(e, this.columns, this.name);
    }
  }),
    (Q4s = class {
      static [Gr] = "PgPrimaryKey";
      columns;
      name;
      isNameExplicit;
      constructor(e, t, r) {
        ((this.table = e), (this.columns = t), (this.name = r), (this.isNameExplicit = !!r));
      }
      getName() {
        return this.name ?? `${this.table[L3e.Symbol.Name]}_${this.columns.map((e) => e.name).join("_")}_pk`;
      }
    }));
});