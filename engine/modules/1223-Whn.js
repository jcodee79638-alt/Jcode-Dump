
var Whn = ne(() => {
  gse();
  Ba();
  AY();
  cY();
  $se();
  _de();
  Hw();
  gde();
  Hmt = class Hmt {
    table;
    session;
    dialect;
    withList;
    static [Gr] = "SQLiteEffectUpdateBuilder";
    constructor(e, t, r, s) {
      this.table = e;
      this.session = t;
      this.dialect = r;
      this.withList = s;
    }
    set(e) {
      return new nrr(this.table, nmt(this.table, e), this.session, this.dialect, this.withList);
    }
  };
  nrr = class nrr {
    effectSession;
    effectDialect;
    static [Gr] = "SQLiteEffectUpdate";
    config;
    constructor(e, t, r, s, a) {
      this.effectSession = r;
      this.effectDialect = s;
      this.config = { set: t, table: e, withList: a, joins: [] };
    }
    from(e) {
      return ((this.config.from = e), this);
    }
    createJoin(e) {
      return (t, r) => {
        let s = Ohn(t);
        if (typeof s === "string" && this.config.joins.some((a) => a.alias === s))
          throw Error(`Alias "${s}" is already used in this query`);
        if (typeof r === "function") {
          let a = this.config.from
            ? vi(t, ED)
              ? VU(t)
              : vi(t, X_)
                ? t._.selectedFields
                : vi(t, E2)
                  ? M3e(t).selectedFields
                  : void 0
            : void 0;
          r = r(
            new Proxy(this.config.table._.columns, new r0({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })),
            a && new Proxy(a, new r0({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })),
          );
        }
        return (this.config.joins.push({ on: r, table: t, joinType: e, alias: s }), this);
      };
    }
    leftJoin = this.createJoin("left");
    rightJoin = this.createJoin("right");
    innerJoin = this.createJoin("inner");
    fullJoin = this.createJoin("full");
    where(e) {
      return ((this.config.where = e), this);
    }
    orderBy(...e) {
      if (typeof e[0] === "function") {
        let t = e[0](
          new Proxy(VU(this.config.table), new r0({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })),
        );
        return ((this.config.orderBy = Array.isArray(t) ? t : [t]), this);
      }
      return ((this.config.orderBy = e), this);
    }
    limit(e) {
      return ((this.config.limit = e), this);
    }
    returning(e = VU(this.config.table)) {
      return ((this.config.returning = jG(e)), this);
    }
    getSQL() {
      return this.effectDialect.buildUpdateQuery(this.config);
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
        { type: "update", tables: Vv(this.config.table) },
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
  W6(nrr);
});