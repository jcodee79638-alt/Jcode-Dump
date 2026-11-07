
var emt = ne(() => {
  _de();
  $se();
  Ba();
  Hw();
  sY();
  Fj();
  Ym();
  J_();
  AY();
  lY();
  vhn();
  ((HV = class {
    static [Gr] = "SQLiteSelectBuilder";
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
      else if (vi(e, E2)) r = e[Am].selectedFields;
      else if (vi(e, pH)) r = {};
      else r = xdt(e);
      return new Ytr({
        table: e,
        fields: r,
        isPartialSelect: t,
        session: this.session,
        dialect: this.dialect,
        withList: this.withList,
        distinct: this.distinct,
      });
    }
  }),
    (Ydt = class extends Thn {
      static [Gr] = "SQLiteSelectQueryBuilder";
      _;
      config;
      joinsNotNullableMap;
      tableName;
      isPartialSelect;
      session;
      dialect;
      cacheConfig = void 0;
      usedTables = new Set();
      constructor({
        table: e,
        fields: t,
        isPartialSelect: r,
        session: s,
        dialect: a,
        withList: H,
        distinct: u,
      }) {
        super();
        ((this.config = { withList: H, table: e, fields: { ...t }, distinct: u, setOperators: [] }),
          (this.isPartialSelect = r),
          (this.session = s),
          (this.dialect = a),
          (this._ = { selectedFields: t, config: this.config }),
          (this.tableName = _3e(e)),
          (this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: !0 } : {}));
        for (let f of Vv(e)) this.usedTables.add(f);
      }
      getUsedTables() {
        return [...this.usedTables];
      }
      createJoin(e) {
        return (t, r) => {
          let s = this.tableName,
            a = _3e(t);
          for (let H of Vv(t)) this.usedTables.add(H);
          if (typeof a === "string" && this.config.joins?.some((H) => H.alias === a))
            throw Error(`Alias "${a}" is already used in this query`);
          if (!this.isPartialSelect) {
            if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof s === "string")
              this.config.fields = { [s]: this.config.fields };
            if (typeof a === "string" && !vi(t, pH)) {
              let H = vi(t, X_)
                ? t._.selectedFields
                : vi(t, xy)
                  ? t[Am].selectedFields
                  : t[TH.Symbol.Columns];
              this.config.fields[a] = H;
            }
          }
          if (typeof r === "function")
            r = r(new Proxy(this.config.fields, new r0({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
          if (!this.config.joins) this.config.joins = [];
          if ((this.config.joins.push({ on: r, table: t, joinType: e, alias: a }), typeof a === "string"))
            switch (e) {
              case "left":
                this.joinsNotNullableMap[a] = !1;
                break;
              case "right":
                ((this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([H]) => [H, !1]),
                )),
                  (this.joinsNotNullableMap[a] = !0));
                break;
              case "cross":
              case "inner":
                this.joinsNotNullableMap[a] = !0;
                break;
              case "full":
                ((this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([H]) => [H, !1]),
                )),
                  (this.joinsNotNullableMap[a] = !1));
                break;
            }
          return this;
        };
      }
      leftJoin = this.createJoin("left");
      rightJoin = this.createJoin("right");
      innerJoin = this.createJoin("inner");
      fullJoin = this.createJoin("full");
      crossJoin = this.createJoin("cross");
      createSetOperator(e, t) {
        return (r) => {
          let s = typeof r === "function" ? r(gqs()) : r;
          if (!hde(this.getSelectedFields(), s.getSelectedFields()))
            throw Error(
              "Set operator error (union / intersect / except): selected fields are not the same or are in a different order",
            );
          return (this.config.setOperators.push({ type: e, isAll: t, rightSelect: s }), this);
        };
      }
      union = this.createSetOperator("union", !1);
      unionAll = this.createSetOperator("union", !0);
      intersect = this.createSetOperator("intersect", !1);
      except = this.createSetOperator("except", !1);
      addSetOperators(e) {
        return (this.config.setOperators.push(...e), this);
      }
      where(e) {
        if (typeof e === "function")
          e = e(new Proxy(this.config.fields, new r0({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        return ((this.config.where = e), this);
      }
      having(e) {
        if (typeof e === "function")
          e = e(new Proxy(this.config.fields, new r0({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        return ((this.config.having = e), this);
      }
      groupBy(...e) {
        if (typeof e[0] === "function") {
          let t = e[0](
            new Proxy(this.config.fields, new r0({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })),
          );
          this.config.groupBy = Array.isArray(t) ? t : [t];
        } else this.config.groupBy = e;
        return this;
      }
      orderBy(...e) {
        if (typeof e[0] === "function") {
          let t = e[0](
              new Proxy(this.config.fields, new r0({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })),
            ),
            r = Array.isArray(t) ? t : [t];
          if (this.config.setOperators.length > 0) this.config.setOperators.at(-1).orderBy = r;
          else this.config.orderBy = r;
        } else {
          let t = e;
          if (this.config.setOperators.length > 0) this.config.setOperators.at(-1).orderBy = t;
          else this.config.orderBy = t;
        }
        return this;
      }
      limit(e) {
        if (this.config.setOperators.length > 0) this.config.setOperators.at(-1).limit = e;
        else this.config.limit = e;
        return this;
      }
      offset(e) {
        if (this.config.setOperators.length > 0) this.config.setOperators.at(-1).offset = e;
        else this.config.offset = e;
        return this;
      }
      getSQL() {
        return this.dialect.buildSelectQuery(this.config);
      }
      toSQL() {
        return this.dialect.sqlToQuery(this.getSQL());
      }
      as(e) {
        let t = [];
        if ((t.push(...Vv(this.config.table)), this.config.joins))
          for (let r of this.config.joins) t.push(...Vv(r.table));
        return new Proxy(
          new X_(this.getSQL(), this.config.fields, e, !1, [...new Set(t)]),
          new r0({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" }),
        );
      }
      getSelectedFields() {
        return new Proxy(
          this.config.fields,
          new r0({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" }),
        );
      }
      withoutSelectionCastCodecs() {
        return this;
      }
      $dynamic() {
        return this;
      }
    }),
    (Ytr = class extends Ydt {
      static [Gr] = "SQLiteSelect";
      _prepare(e = !0) {
        if (!this.session)
          throw Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        let t = I2(this.config.fields),
          r = this.session[e ? "prepareOneTimeQuery" : "prepareQuery"](
            this.dialect.sqlToQuery(this.getSQL()),
            t,
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
      async execute() {
        return this.all();
      }
    }));
  nmn(Ytr, [Bj]);
  ((bhn = Zdt("union", !1)),
    (jhn = Zdt("union", !0)),
    (Phn = Zdt("intersect", !1)),
    (Chn = Zdt("except", !1)));
});