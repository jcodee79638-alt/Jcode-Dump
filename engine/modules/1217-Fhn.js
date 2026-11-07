
var Fhn = ne(() => {
  gse();
  Ba();
  lMe();
  J_();
  trr = class trr {
    schema;
    table;
    tableConfig;
    dialect;
    session;
    rowMode;
    forbidJsonb;
    static [Gr] = "SQLiteEffectRelationalQueryBuilderV2";
    constructor(e, t, r, s, a, H, u) {
      this.schema = e;
      this.table = t;
      this.tableConfig = r;
      this.dialect = s;
      this.session = a;
      this.rowMode = H;
      this.forbidJsonb = u;
    }
    findMany(e) {
      return new omt(
        this.schema,
        this.table,
        this.tableConfig,
        this.dialect,
        this.session,
        e ?? !0,
        "many",
        this.rowMode,
        this.forbidJsonb,
      );
    }
    findFirst(e) {
      return new omt(
        this.schema,
        this.table,
        this.tableConfig,
        this.dialect,
        this.session,
        e ?? !0,
        "first",
        this.rowMode,
        this.forbidJsonb,
      );
    }
  };
  omt = class omt {
    schema;
    tableConfig;
    dialect;
    session;
    config;
    rowMode;
    forbidJsonb;
    static [Gr] = "SQLiteEffectRelationalQueryV2";
    mode;
    table;
    constructor(e, t, r, s, a, H, u, f, d) {
      this.schema = e;
      this.tableConfig = r;
      this.dialect = s;
      this.session = a;
      this.config = H;
      this.rowMode = f;
      this.forbidJsonb = d;
      ((this.mode = u), (this.table = t));
    }
    getSQL() {
      return this._getQuery().sql;
    }
    _prepare(e = !0) {
      let { query: t, builtQuery: r } = this._toSQL(),
        s = {
          isFirst: this.mode === "first",
          parseJson: !this.rowMode,
          parseJsonIfString: !1,
          rootJsonMappers: !0,
          selection: t.selection,
        };
      return this.session[e ? "prepareOneTimeRelationalQuery" : "prepareRelationalQuery"](
        r,
        void 0,
        this.mode === "first" ? "get" : "all",
        Gdt(s),
        s,
      );
    }
    prepare() {
      return this._prepare(!1);
    }
    _getQuery() {
      let e = this.forbidJsonb ? Zt`json` : Zt`jsonb`,
        t = this.dialect.buildRelationalQuery({
          schema: this.schema,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          mode: this.mode,
          isNested: this.rowMode,
          jsonb: e,
        });
      if (this.rowMode) {
        let r = Zt.join(
          t.selection.map(
            (s) =>
              Zt`${Zt.raw(this.dialect.escapeString(s.key))}, ${s.selection ? Zt`${e}(${Zt.identifier(s.key)})` : Zt.identifier(s.key)}`,
          ),
          Zt`, `,
        );
        t.sql = Zt`select json_object(${r}) as ${Zt.identifier("r")} from (${t.sql}) as ${Zt.identifier("t")}`;
      }
      return t;
    }
    _toSQL() {
      let e = this._getQuery(),
        t = this.dialect.sqlToQuery(e.sql);
      return { query: e, builtQuery: t };
    }
    toSQL() {
      return this._toSQL().builtQuery;
    }
    execute(e) {
      return this.mode === "first" ? this._prepare().get(e) : this._prepare().all(e);
    }
  };
  W6(omt);
});