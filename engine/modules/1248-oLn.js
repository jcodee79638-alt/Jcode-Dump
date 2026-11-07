
var oLn = ne(() => {
  Ba();
  Bdt();
  lY();
  ((sLn = class {
    static [Gr] = "SQLiteAsyncRelationalQueryBuilder";
    constructor(e, t, r, s, a, H, u, f) {
      ((this.mode = e),
        (this.fullSchema = t),
        (this.schema = r),
        (this.tableNamesMap = s),
        (this.table = a),
        (this.tableConfig = H),
        (this.dialect = u),
        (this.session = f));
    }
    findMany(e) {
      return this.mode === "sync"
        ? new iLn(
            this.fullSchema,
            this.schema,
            this.tableNamesMap,
            this.table,
            this.tableConfig,
            this.dialect,
            this.session,
            e ? e : {},
            "many",
          )
        : new _rr(
            this.fullSchema,
            this.schema,
            this.tableNamesMap,
            this.table,
            this.tableConfig,
            this.dialect,
            this.session,
            e ? e : {},
            "many",
          );
    }
    findFirst(e) {
      return this.mode === "sync"
        ? new iLn(
            this.fullSchema,
            this.schema,
            this.tableNamesMap,
            this.table,
            this.tableConfig,
            this.dialect,
            this.session,
            e ? { ...e, limit: 1 } : { limit: 1 },
            "first",
          )
        : new _rr(
            this.fullSchema,
            this.schema,
            this.tableNamesMap,
            this.table,
            this.tableConfig,
            this.dialect,
            this.session,
            e ? { ...e, limit: 1 } : { limit: 1 },
            "first",
          );
    }
  }),
    (_rr = class extends Bj {
      static [Gr] = "SQLiteAsyncRelationalQuery";
      mode;
      constructor(e, t, r, s, a, H, u, f, d) {
        super();
        ((this.fullSchema = e),
          (this.schema = t),
          (this.tableNamesMap = r),
          (this.table = s),
          (this.tableConfig = a),
          (this.dialect = H),
          (this.session = u),
          (this.config = f),
          (this.mode = d));
      }
      getSQL() {
        return this.dialect._buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName,
        }).sql;
      }
      _prepare(e = !1) {
        let { query: t, builtQuery: r } = this._toSQL();
        return this.session[e ? "prepareOneTimeQuery" : "prepareQuery"](
          r,
          void 0,
          this.mode === "first" ? "get" : "all",
          (s, a) => {
            let H = s.map((u) => Fdt(this.schema, this.tableConfig, u, t.selection, a));
            if (this.mode === "first") return H[0];
            return H;
          },
        );
      }
      prepare() {
        return this._prepare(!1);
      }
      _toSQL() {
        let e = this.dialect._buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName,
        });
        return { query: e, builtQuery: this.dialect.sqlToQuery(e.sql) };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      executeRaw() {
        if (this.mode === "first") return this._prepare(!1).get();
        return this._prepare(!1).all();
      }
      async execute() {
        return this.executeRaw();
      }
    }),
    (iLn = class extends _rr {
      static [Gr] = "SQLiteSyncRelationalQuery";
      sync() {
        return this.executeRaw();
      }
    }));
});