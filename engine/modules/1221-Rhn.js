
var Rhn = ne(() => {
  gse();
  Ba();
  J_();
  emt();
  _de();
  Hw();
  Ym();
  gde();
  fMe = class fMe {
    static [Gr] = "SQLiteEffectSelectBuilder";
    fields;
    session;
    dialect;
    withList;
    distinct;
    constructor(e) {
      ((this.fields = e.fields),
        (this.session = e.session),
        (this.dialect = e.dialect),
        (this.withList = e.withList),
        (this.distinct = e.distinct));
    }
    from(e) {
      let t = !!this.fields,
        r;
      if (this.fields) r = this.fields;
      else if (vi(e, X_)) r = Object.fromEntries(Object.keys(e._.selectedFields).map((s) => [s, e[s]]));
      else if (vi(e, E2)) r = M3e(e).selectedFields;
      else if (vi(e, pH)) r = {};
      else r = xdt(e);
      return new rrr({
        table: e,
        fields: r,
        isPartialSelect: t,
        session: this.session,
        dialect: this.dialect,
        withList: this.withList,
        distinct: this.distinct,
      });
    }
  };
  rrr = class rrr extends Ydt {
    static [Gr] = "SQLiteEffectSelect";
    get effectConfig() {
      return this.config;
    }
    getSQL() {
      return this.dialect.buildSelectQuery(this.effectConfig);
    }
    _prepare(e = !0) {
      if (!this.session)
        throw Error("Cannot execute a query on a query builder. Please use a database instance instead.");
      let r = this.session[e ? "prepareOneTimeQuery" : "prepareQuery"](
        this.dialect.sqlToQuery(this.getSQL()),
        jG(this.effectConfig.fields),
        "all",
        void 0,
        { type: "select", tables: [...this.usedTables] },
        this.cacheConfig,
      );
      return ((r.joinsNotNullableMap = this.joinsNotNullableMap), r);
    }
    $withCache(e) {
      return (
        (this.cacheConfig =
          e === void 0
            ? { config: {}, enabled: !0, autoInvalidate: !0 }
            : e === !1
              ? { enabled: !1 }
              : { enabled: !0, autoInvalidate: !0, ...e }),
        this
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
  };
  W6(rrr);
});