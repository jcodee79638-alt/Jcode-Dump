
var mLn = ne(() => {
  _de();
  $se();
  Ba();
  Hw();
  sY();
  Fj();
  Ym();
  AY();
  lY();
  cY();
  ((fmt = class {
    static [Gr] = "SQLiteUpdateBuilder";
    constructor(e, t, r, s) {
      ((this.table = e), (this.session = t), (this.dialect = r), (this.withList = s));
    }
    set(e) {
      return new dLn(this.table, Mdt(this.table, e), this.session, this.dialect, this.withList);
    }
  }),
    (dLn = class extends Bj {
      static [Gr] = "SQLiteUpdate";
      config;
      constructor(e, t, r, s, a) {
        super();
        ((this.session = r),
          (this.dialect = s),
          (this.config = { set: t, table: e, withList: a, joins: [] }));
      }
      from(e) {
        return ((this.config.from = e), this);
      }
      createJoin(e) {
        return (t, r) => {
          let s = _3e(t);
          if (typeof s === "string" && this.config.joins.some((a) => a.alias === s))
            throw Error(`Alias "${s}" is already used in this query`);
          if (typeof r === "function") {
            let a = this.config.from
              ? vi(t, ED)
                ? t[TH.Symbol.Columns]
                : vi(t, X_)
                  ? t._.selectedFields
                  : vi(t, E2)
                    ? t[Am].selectedFields
                    : void 0
              : void 0;
            r = r(
              new Proxy(
                this.config.table[TH.Symbol.Columns],
                new r0({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
              ),
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
      returning(e = this.config.table[ED.Symbol.Columns]) {
        return ((this.config.returning = I2(e)), this);
      }
      getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
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
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
      $dynamic() {
        return this;
      }
    }));
});