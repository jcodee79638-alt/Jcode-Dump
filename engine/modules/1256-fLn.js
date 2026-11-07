
var fLn = ne(() => {
  $se();
  Ba();
  Fj();
  Ym();
  AY();
  lY();
  cY();
  umt = class extends Bj {
    static [Gr] = "SQLiteDelete";
    config;
    constructor(e, t, r, s) {
      super();
      ((this.table = e), (this.session = t), (this.dialect = r), (this.config = { table: e, withList: s }));
    }
    where(e) {
      return ((this.config.where = e), this);
    }
    orderBy(...e) {
      if (typeof e[0] === "function") {
        let t = e[0](
            new Proxy(
              this.config.table[TH.Symbol.Columns],
              new r0({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }),
            ),
          ),
          r = Array.isArray(t) ? t : [t];
        this.config.orderBy = r;
      } else {
        let t = e;
        this.config.orderBy = t;
      }
      return this;
    }
    limit(e) {
      return ((this.config.limit = e), this);
    }
    returning(e = this.table[ED.Symbol.Columns]) {
      return ((this.config.returning = I2(e)), this);
    }
    getSQL() {
      return this.dialect.buildDeleteQuery(this.config);
    }
    toSQL() {
      return this.dialect.sqlToQuery(this.getSQL());
    }
    _prepare(e = !0) {
      return this.session[e ? "prepareOneTimeQuery" : "prepareQuery"](
        this.dialect.sqlToQuery(this.getSQL()),
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
    async execute(e) {
      return this._prepare().execute(e);
    }
    $dynamic() {
      return this;
    }
  };
});