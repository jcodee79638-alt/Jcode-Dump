
var y3e = ne(() => {
  emt();
  Ba();
  Hw();
  Qdt();
  AY();
  fY = class {
    static [Gr] = "SQLiteQueryBuilder";
    dialect;
    dialectConfig;
    constructor(e) {
      ((this.dialect = vi(e, D3e) ? e : void 0), (this.dialectConfig = vi(e, D3e) ? void 0 : e));
    }
    $with = (e, t) => {
      let r = this;
      return {
        as: (a) => {
          if (typeof a === "function") a = a(r);
          return new Proxy(
            new Q1e(a.getSQL(), t ?? ("getSelectedFields" in a ? (a.getSelectedFields() ?? {}) : {}), e, !0),
            new r0({ alias: e, sqlAliasedBehavior: "alias", sqlBehavior: "error" }),
          );
        },
      };
    };
    with(...e) {
      let t = this;
      function r(a) {
        return new HV({ fields: a ?? void 0, session: void 0, dialect: t.getDialect(), withList: e });
      }
      function s(a) {
        return new HV({
          fields: a ?? void 0,
          session: void 0,
          dialect: t.getDialect(),
          withList: e,
          distinct: !0,
        });
      }
      return { select: r, selectDistinct: s };
    }
    select(e) {
      return new HV({ fields: e ?? void 0, session: void 0, dialect: this.getDialect() });
    }
    selectDistinct(e) {
      return new HV({ fields: e ?? void 0, session: void 0, dialect: this.getDialect(), distinct: !0 });
    }
    getDialect() {
      if (!this.dialect) this.dialect = new zdt(this.dialectConfig);
      return this.dialect;
    }
  };
});