
var whn = ne(() => {
  gse();
  Ba();
  J_();
  tmt = class tmt extends pH {
    static [Gr] = "SQLiteEffectCountBuilder";
    sql;
    session;
    constructor(e) {
      super(Eqs(e.source, e.filters).queryChunks);
      ((this.session = e.session), (this.sql = Iqs(e.source, e.filters)));
    }
    execute(e) {
      return this.session
        .prepareQuery(this.session.dialect.sqlToQuery(this.sql), void 0, "all", (t) => {
          let r = t[0]?.[0];
          if (typeof r === "number") return r;
          return r ? Number(r) : 0;
        })
        .execute(e);
    }
  };
  W6(tmt);
});