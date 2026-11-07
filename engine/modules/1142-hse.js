
var hse = ne(() => {
  Ba();
  L2();
  G_n();
  J_n();
  ((RS = class extends q_n {
    static [Gr] = "SQLiteColumnBuilder";
    foreignKeyConfigs = [];
    references(e, t = {}) {
      return (this.foreignKeyConfigs.push({ ref: e, actions: t }), this);
    }
    unique(e) {
      return ((this.config.isUnique = !0), (this.config.uniqueName = e), this);
    }
    generatedAlwaysAs(e, t) {
      return ((this.config.generated = { as: e, type: "always", mode: t?.mode ?? "virtual" }), this);
    }
    buildForeignKeys(e, t) {
      return this.foreignKeyConfigs.map(({ ref: r, actions: s }) =>
        ((a, H) => {
          let u = new X_n(() => {
            let f = a();
            return { columns: [e], foreignColumns: [f] };
          });
          if (H.onUpdate) u.onUpdate(H.onUpdate);
          if (H.onDelete) u.onDelete(H.onDelete);
          return u.build(t);
        })(r, s),
      );
    }
  }),
    (gD = class extends Kl {
      static [Gr] = "SQLiteColumn";
      table;
      constructor(e, t) {
        super(e, t);
        this.table = e;
      }
    }));
});