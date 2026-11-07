
var $rr = ne(() => {
  oLn();
  HLn();
  uLn();
  lLn();
  Ba();
  Hw();
  J_();
  AY();
  _Ln();
  pmt = class {
    static [Gr] = "BaseSQLiteDatabase";
    _query;
    query;
    constructor(e, t, r, s, a, H, u) {
      ((this.resultKind = e),
        (this.dialect = t),
        (this.session = r),
        (this.rowModeRQB = H),
        (this.forbidJsonb = u),
        (this._ = a
          ? { schema: a.schema, fullSchema: a.fullSchema, tableNamesMap: a.tableNamesMap, relations: s }
          : { schema: void 0, fullSchema: {}, tableNamesMap: {}, relations: s }),
        (this._query = {}));
      let f = this._query;
      if (this._.schema)
        for (let [d, _] of Object.entries(this._.schema))
          f[d] = new sLn(e, a.fullSchema, this._.schema, this._.tableNamesMap, a.fullSchema[d], _, t, r);
      this.query = {};
      for (let [d, _] of Object.entries(s)) this.query[d] = new ALn(e, s, s[_.name].table, _, t, r, H, u);
      this.$cache = { invalidate: async (d) => {} };
    }
    $with = (e, t) => {
      let r = this;
      return {
        as: (a) => {
          if (typeof a === "function") a = a(new fY(r.dialect));
          return new Proxy(
            new Q1e(a.getSQL(), t ?? ("getSelectedFields" in a ? (a.getSelectedFields() ?? {}) : {}), e, !0),
            new r0({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" }),
          );
        },
      };
    };
    $count(e, t) {
      return new aLn({ source: e, filters: t, session: this.session });
    }
    with(...e) {
      let t = this;
      function r(f) {
        return new HV({ fields: f ?? void 0, session: t.session, dialect: t.dialect, withList: e });
      }
      function s(f) {
        return new HV({
          fields: f ?? void 0,
          session: t.session,
          dialect: t.dialect,
          withList: e,
          distinct: !0,
        });
      }
      function a(f) {
        return new fmt(f, t.session, t.dialect, e);
      }
      function H(f) {
        return new lmt(f, t.session, t.dialect, e);
      }
      function u(f) {
        return new umt(f, t.session, t.dialect, e);
      }
      return { select: r, selectDistinct: s, update: a, insert: H, delete: u };
    }
    select(e) {
      return new HV({ fields: e ?? void 0, session: this.session, dialect: this.dialect });
    }
    selectDistinct(e) {
      return new HV({ fields: e ?? void 0, session: this.session, dialect: this.dialect, distinct: !0 });
    }
    update(e) {
      return new fmt(e, this.session, this.dialect);
    }
    $cache;
    insert(e) {
      return new lmt(e, this.session, this.dialect);
    }
    delete(e) {
      return new umt(e, this.session, this.dialect);
    }
    run(e) {
      let t = typeof e === "string" ? Zt.raw(e) : e.getSQL();
      if (this.resultKind === "async")
        return new T3e(
          async () => this.session.run(t),
          () => t,
          "run",
          this.dialect,
          this.session.extractRawRunValueFromBatchResult.bind(this.session),
        );
      return this.session.run(t);
    }
    all(e) {
      let t = typeof e === "string" ? Zt.raw(e) : e.getSQL();
      if (this.resultKind === "async")
        return new T3e(
          async () => this.session.all(t),
          () => t,
          "all",
          this.dialect,
          this.session.extractRawAllValueFromBatchResult.bind(this.session),
        );
      return this.session.all(t);
    }
    get(e) {
      let t = typeof e === "string" ? Zt.raw(e) : e.getSQL();
      if (this.resultKind === "async")
        return new T3e(
          async () => this.session.get(t),
          () => t,
          "get",
          this.dialect,
          this.session.extractRawGetValueFromBatchResult.bind(this.session),
        );
      return this.session.get(t);
    }
    values(e) {
      let t = typeof e === "string" ? Zt.raw(e) : e.getSQL();
      if (this.resultKind === "async")
        return new T3e(
          async () => this.session.values(t),
          () => t,
          "values",
          this.dialect,
          this.session.extractRawValuesValueFromBatchResult.bind(this.session),
        );
      return this.session.values(t);
    }
    transaction(e, t) {
      return this.session.transaction(e, t);
    }
  };
});