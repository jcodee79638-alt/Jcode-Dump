
var J_n = ne(() => {
  Ba();
  A3e();
  ((X_n = class {
    static [Gr] = "SQLiteForeignKeyBuilder";
    reference;
    _onUpdate;
    _onDelete;
    constructor(e, t) {
      if (
        ((this.reference = () => {
          let { name: r, columns: s, foreignColumns: a } = e();
          return { name: r, columns: s, foreignTable: a[0].table, foreignColumns: a };
        }),
        t)
      )
        ((this._onUpdate = t.onUpdate), (this._onDelete = t.onDelete));
    }
    onUpdate(e) {
      return ((this._onUpdate = e), this);
    }
    onDelete(e) {
      return ((this._onDelete = e), this);
    }
    build(e) {
      return new oqs(e, this);
    }
  }),
    (oqs = class {
      static [Gr] = "SQLiteForeignKey";
      reference;
      onUpdate;
      onDelete;
      constructor(e, t) {
        ((this.table = e),
          (this.reference = t.reference),
          (this.onUpdate = t._onUpdate),
          (this.onDelete = t._onDelete));
      }
      getName() {
        let { name: e, columns: t, foreignColumns: r } = this.reference(),
          s = t.map((u) => u.name),
          a = r.map((u) => u.name),
          H = [this.table[R6], ...s, r[0].table[R6], ...a];
        return e ?? `${H.join("_")}_fk`;
      }
      isNameExplicit() {
        return !!this.reference().name;
      }
    }));
});