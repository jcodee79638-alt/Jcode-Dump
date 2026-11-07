
var lLn = ne(() => {
  Ba();
  lY();
  T3e = class extends Bj {
    static [Gr] = "SQLiteRaw";
    config;
    constructor(e, t, r, s, a) {
      super();
      ((this.execute = e),
        (this.getSQL = t),
        (this.dialect = s),
        (this.mapBatchResult = a),
        (this.config = { action: r }));
    }
    getQuery() {
      return { ...this.dialect.sqlToQuery(this.getSQL()), method: this.config.action };
    }
    mapResult(e, t) {
      return t ? this.mapBatchResult(e) : e;
    }
    _prepare() {
      return this;
    }
  };
});