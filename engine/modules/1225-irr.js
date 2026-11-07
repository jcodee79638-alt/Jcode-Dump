
var irr = ne(() => {
  Gt();
  Ba();
  AY();
  J_();
  y3e();
  Hw();
  whn();
  Uhn();
  Nhn();
  Fhn();
  Bhn();
  Rhn();
  Whn();
  S3e = class S3e {
    dialect;
    session;
    rowModeRQB;
    forbidJsonb;
    static [Gr] = "SQLiteEffectDatabase";
    query;
    constructor(e, t, r, s, a) {
      this.dialect = e;
      this.session = t;
      this.rowModeRQB = s;
      this.forbidJsonb = a;
      ((this._ = { relations: r, session: t }), (this.query = {}));
      for (let [H, u] of Object.entries(r)) this.query[H] = new trr(r, r[u.name].table, u, e, t, s, a);
      this.$cache = { invalidate: (H) => ti };
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
    $cache;
    $count(e, t) {
      return new tmt({ source: e, filters: t, session: this.session });
    }
    with(...e) {
      let t = this;
      function r(f) {
        return new fMe({ fields: f ?? void 0, session: t.session, dialect: t.dialect, withList: e });
      }
      function s(f) {
        return new fMe({
          fields: f ?? void 0,
          session: t.session,
          dialect: t.dialect,
          withList: e,
          distinct: !0,
        });
      }
      function a(f) {
        return new Hmt(f, t.session, t.dialect, e);
      }
      function H(f) {
        return new smt(f, t.session, t.dialect, e);
      }
      function u(f) {
        return new x3e(f, t.session, t.dialect, e);
      }
      return { select: r, selectDistinct: s, update: a, insert: H, delete: u };
    }
    select(e) {
      return new fMe({ fields: e ?? void 0, session: this.session, dialect: this.dialect });
    }
    selectDistinct(e) {
      return new fMe({ fields: e ?? void 0, session: this.session, dialect: this.dialect, distinct: !0 });
    }
    update(e) {
      return new Hmt(e, this.session, this.dialect);
    }
    insert(e) {
      return new smt(e, this.session, this.dialect);
    }
    delete(e) {
      return new x3e(e, this.session, this.dialect);
    }
    raw(e, t, r) {
      let s = typeof e === "string" ? Zt.raw(e) : e.getSQL();
      return new amt(
        () => r(s),
        () => s,
        t,
        this.dialect,
        (a) => a,
      );
    }
    run(e) {
      return this.raw(e, "run", (t) => this.session.run(t));
    }
    all(e) {
      return this.raw(e, "all", (t) => this.session.all(t));
    }
    get(e) {
      return this.raw(e, "get", (t) => this.session.get(t));
    }
    values(e) {
      return this.raw(e, "values", (t) => this.session.values(t));
    }
    transaction = (e, t) => this.session.transaction(e, t);
  };
});