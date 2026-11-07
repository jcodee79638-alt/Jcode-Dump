
var Uhn = ne(() => {
  gse();
  Ba();
  AY();
  $se();
  gde();
  x3e = class x3e {
    table;
    effectSession;
    effectDialect;
    static [Gr] = "SQLiteEffectDelete";
    config;
    constructor(e, t, r, s) {
      this.table = e;
      this.effectSession = t;
      this.effectDialect = r;
      this.config = { table: e, withList: s };
    }
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
    returning(e = VU(this.table)) {
      return ((this.config.returning = jG(e)), this);
    }
    getSQL() {
      return this.effectDialect.buildDeleteQuery(this.config);
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
        { type: "delete", tables: Vv(this.config.table) },
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
  W6(x3e);
});