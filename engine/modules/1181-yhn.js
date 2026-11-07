
var yhn = ne(() => {
  cY();
  Ba();
  ((ztr = class {
    static [Gr] = "SQLitePrimaryKeyBuilder";
    columns;
    name;
    constructor(e, t) {
      ((this.columns = e), (this.name = t));
    }
    build(e) {
      return new Dhn(e, this.columns, this.name);
    }
  }),
    (Dhn = class {
      static [Gr] = "SQLitePrimaryKey";
      columns;
      name;
      isNameExplicit;
      constructor(e, t, r) {
        ((this.table = e), (this.columns = t), (this.name = r), (this.isNameExplicit = !!r));
      }
      getName() {
        return this.name ?? `${this.table[ED.Symbol.Name]}_${this.columns.map((e) => e.name).join("_")}_pk`;
      }
    }));
});