
var uLn = ne(() => {
  Ba();
  J_();
  lMe();
  lY();
  ((ALn = class {
    static [Gr] = "SQLiteAsyncRelationalQueryBuilderV2";
    constructor(e, t, r, s, a, H, u, f) {
      ((this.mode = e),
        (this.schema = t),
        (this.table = r),
        (this.tableConfig = s),
        (this.dialect = a),
        (this.session = H),
        (this.rowMode = u),
        (this.forbidJsonb = f));
    }
    findMany(e) {
      return this.mode === "sync"
        ? new cLn(
            this.schema,
            this.table,
            this.tableConfig,
            this.dialect,
            this.session,
            e ?? !0,
            "many",
            this.rowMode,
            this.forbidJsonb,
          )
        : new hrr(
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
      return this.mode === "sync"
        ? new cLn(
            this.schema,
            this.table,
            this.tableConfig,
            this.dialect,
            this.session,
            e ?? !0,
            "first",
            this.rowMode,
            this.forbidJsonb,
          )
        : new hrr(
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
  }),
    (hrr = class extends Bj {
      static [Gr] = "SQLiteAsyncRelationalQueryV2";
      mode;
      table;
      constructor(e, t, r, s, a, H, u, f, d) {
        super();
        ((this.schema = e),
          (this.tableConfig = r),
          (this.dialect = s),
          (this.session = a),
          (this.config = H),
          (this.rowMode = f),
          (this.forbidJsonb = d),
          (this.mode = u),
          (this.table = t));
      }
      getSQL() {
        return this.dialect.buildRelationalQuery({
          schema: this.schema,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          mode: this.mode,
          jsonb: this.forbidJsonb ? Zt`json` : Zt`jsonb`,
        }).sql;
      }
      _prepare(e = !0) {
        let { query: t, builtQuery: r } = this._toSQL();
        return this.session[e ? "prepareOneTimeRelationalQuery" : "prepareRelationalQuery"](
          r,
          void 0,
          this.mode === "first" ? "get" : "all",
          Gdt({
            isFirst: this.mode === "first",
            parseJson: !this.rowMode,
            parseJsonIfString: !1,
            rootJsonMappers: !0,
            selection: t.selection,
          }),
          {
            isFirst: this.mode === "first",
            parseJson: !this.rowMode,
            parseJsonIfString: !1,
            rootJsonMappers: !0,
            selection: t.selection,
          },
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
        if (this.rowMode)
          t.sql = Zt`select json_object(${Zt.join(
            t.selection.map(
              (r) =>
                Zt`${Zt.raw(this.dialect.escapeString(r.key))}, ${r.selection ? Zt`${e}(${Zt.identifier(r.key)})` : Zt.identifier(r.key)}`,
            ),
            Zt`, `,
          )}) as ${Zt.identifier("r")} from (${t.sql}) as ${Zt.identifier("t")}`;
        return t;
      }
      _toSQL() {
        let e = this._getQuery();
        return { query: e, builtQuery: this.dialect.sqlToQuery(e.sql) };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      executeRaw() {
        if (this.mode === "first") return this._prepare().get();
        return this._prepare().all();
      }
      async execute() {
        return this.executeRaw();
      }
    }),
    (cLn = class extends hrr {
      static [Gr] = "SQLiteSyncRelationalQueryV2";
      sync() {
        return this.executeRaw();
      }
    }));
});