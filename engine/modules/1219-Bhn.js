
var Bhn = ne(() => {
  gse();
  Ba();
  amt = class amt {
    execute;
    getSQL;
    action;
    dialect;
    mapBatchResult;
    static [Gr] = "SQLiteEffectRaw";
    constructor(e, t, r, s, a) {
      this.execute = e;
      this.getSQL = t;
      this.action = r;
      this.dialect = s;
      this.mapBatchResult = a;
    }
    getQuery() {
      return { ...this.dialect.sqlToQuery(this.getSQL()), method: this.action };
    }
    mapResult(e, t) {
      return t ? this.mapBatchResult(e) : e;
    }
    _prepare() {
      return this;
    }
  };
  W6(amt);
});