
var Nhn = ne(() => {
  gse();
  Ba();
  J_();
  $se();
  Ym();
  y3e();
  gde();
  smt = class smt {
    table;
    session;
    dialect;
    withList;
    static [Gr] = "SQLiteEffectInsertBuilder";
    constructor(e, t, r, s) {
      this.table = e;
      this.session = t;
      this.dialect = r;
      this.withList = s;
    }
    values(e) {
      if (((e = Array.isArray(e) ? e : [e]), e.length === 0))
        throw Error("values() must be called with at least one value");
      let t = e.map((r) => {
        let s = {},
          a = VU(this.table);
        for (let H of Object.keys(r)) {
          let u = r[H];
          s[H] = vi(u, pH) ? u : new My(u, a[H]);
        }
        return s;
      });
      return new imt(this.table, t, this.session, this.dialect, this.withList);
    }
    select(e) {
      let t = typeof e === "function" ? e(new fY()) : e;
      if (!vi(t, pH) && !hde(VU(this.table), t._.selectedFields))
        throw Error(
          "Insert select error: selected fields are not the same or are in a different order compared to the table definition",
        );
      return new imt(this.table, t, this.session, this.dialect, this.withList, !0);
    }
  };
  imt = class imt {
    table;
    effectSession;
    effectDialect;
    static [Gr] = "SQLiteEffectInsert";
    config;
    constructor(e, t, r, s, a, H) {
      this.table = e;
      this.effectSession = r;
      this.effectDialect = s;
      this.config = { table: e, values: t, withList: a, select: H };
    }
    returning(e = VU(this.config.table)) {
      return ((this.config.returning = jG(e)), this);
    }
    onConflictDoNothing(e = {}) {
      if (!this.config.onConflict) this.config.onConflict = [];
      if (e.target === void 0) return (this.config.onConflict.push(Zt` on conflict do nothing`), this);
      let t = Array.isArray(e.target) ? Zt`${e.target}` : Zt`${[e.target]}`,
        r = e.where ? Zt` where ${e.where}` : Zt``;
      return (this.config.onConflict.push(Zt` on conflict ${t} do nothing${r}`), this);
    }
    onConflictDoUpdate(e) {
      if (e.where && (e.targetWhere || e.setWhere))
        throw Error(
          'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.',
        );
      if (!this.config.onConflict) this.config.onConflict = [];
      let t = e.where ? Zt` where ${e.where}` : void 0,
        r = e.targetWhere ? Zt` where ${e.targetWhere}` : void 0,
        s = e.setWhere ? Zt` where ${e.setWhere}` : void 0,
        a = Array.isArray(e.target) ? Zt`${e.target}` : Zt`${[e.target]}`,
        H = this.effectDialect.buildUpdateSet(this.config.table, nmt(this.config.table, e.set));
      return (this.config.onConflict.push(Zt` on conflict ${a}${r} do update set ${H}${t}${s}`), this);
    }
    getSQL() {
      return this.effectDialect.buildInsertQuery(this.config);
    }
    toSQL() {
      return this.effectDialect.sqlToQuery(this.getSQL());
    }
    _prepare(e = !0) {
      return this.effectSession[e ? "prepareOneTimeQuery" : "prepareQuery"](
        this.effectDialect.sqlToQuery(this.getSQL()),
        this.config.returning,
        this.config.returning ? "all" : "run",
        void 0,
        { type: "insert", tables: Vv(this.config.table) },
      );
    }
    prepare() {
      return this._prepare(!1);
    }
    run = (e) => this._prepare().run(e);
    all = (e) => this._prepare().all(e);
    get = (e) => this._prepare().get(e);
    values = (e) => this._prepare().values(e);
    execute = (e) => this._prepare().execute(e);
    $dynamic() {
      return this;
    }
  };
  W6(imt);
});