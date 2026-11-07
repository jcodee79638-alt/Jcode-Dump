
var gLn = ne(() => {
  Ba();
  Ym();
  J_();
  mrr();
  lMe();
  cV();
  Drr();
  (($Ln = class extends Err {
    static [Gr] = "SQLiteBunSession";
    logger;
    constructor(e, t, r, s, a = {}) {
      super(t);
      ((this.client = e),
        (this.relations = r),
        (this.schema = s),
        (this.options = a),
        (this.logger = a.logger ?? new nLn()));
    }
    exec(e) {
      this.client.exec(e);
    }
    prepareQuery(e, t, r, s) {
      return new LLn(this.client.prepare(e.sql), e, this.logger, t, r, this.options.useJitMappers, s);
    }
    prepareRelationalQuery(e, t, r, s, a) {
      return new LLn(this.client.prepare(e.sql), e, this.logger, t, r, this.options.useJitMappers, s, !0, a);
    }
    transaction(e, t = {}) {
      let r = new Pqs("sync", this.dialect, this, this.relations, this.schema),
        s;
      return (
        this.client
          .transaction(() => {
            s = e(r);
          })
          [t.behavior ?? "deferred"](),
        s
      );
    }
  }),
    (Pqs = class e extends Irr {
      static [Gr] = "SQLiteBunTransaction";
      transaction(t) {
        let r = `sp${this.nestedIndex}`,
          s = new e("sync", this.dialect, this.session, this.relations, this.schema, this.nestedIndex + 1);
        this.session.run(Zt.raw(`savepoint ${r}`));
        try {
          let a = t(s);
          return (this.session.run(Zt.raw(`release savepoint ${r}`)), a);
        } catch (a) {
          throw (this.session.run(Zt.raw(`rollback to savepoint ${r}`)), a);
        }
      }
    }),
    (LLn = class extends grr {
      static [Gr] = "SQLiteBunPreparedQuery";
      jitMapper;
      constructor(e, t, r, s, a, H, u, f, d) {
        super("sync", a, t);
        ((this.stmt = e),
          (this.logger = r),
          (this.fields = s),
          (this.useJitMappers = H),
          (this.customResultMapper = u),
          (this.isRqbV2Query = f),
          (this.rqbConfig = d));
      }
      run(e) {
        let t = oV(this.query.params, e ?? {});
        return (this.logger.logQuery(this.query.sql, t), this.stmt.run(...t));
      }
      all(e) {
        if (this.isRqbV2Query) return this.allRqbV2(e);
        let { fields: t, query: r, logger: s, joinsNotNullableMap: a, stmt: H, customResultMapper: u } = this;
        if (!t && !u) {
          let d = oV(r.params, e ?? {});
          return (s.logQuery(r.sql, d), H.all(...d));
        }
        let f = this.values(e);
        if (u) return u(f);
        return this.useJitMappers
          ? (this.jitMapper = this.jitMapper ?? oMe(t, a))(f)
          : f.map((d) => btr(t, d, a));
      }
      get(e) {
        if (this.isRqbV2Query) return this.getRqbV2(e);
        let t = oV(this.query.params, e ?? {});
        this.logger.logQuery(this.query.sql, t);
        let { fields: r, joinsNotNullableMap: s, customResultMapper: a } = this;
        if (!r && !a) {
          let u = this.stmt.get(...t);
          if (!u) return;
          return u;
        }
        let H = this.stmt.values(...t)[0];
        if (!H) return;
        if (a) return a([H]);
        return this.useJitMappers ? (this.jitMapper = this.jitMapper ?? oMe(r, s))([H])[0] : btr(r, H, s);
      }
      allRqbV2(e) {
        let { query: t, logger: r, stmt: s, customResultMapper: a } = this,
          H = oV(t.params, e ?? {});
        r.logQuery(t.sql, H);
        let u = s.all(...H);
        return this.useJitMappers ? (this.jitMapper = this.jitMapper ?? uMe(this.rqbConfig))(u) : a(u);
      }
      getRqbV2(e) {
        let t = oV(this.query.params, e ?? {});
        this.logger.logQuery(this.query.sql, t);
        let { stmt: r, customResultMapper: s } = this,
          a = r.get(...t);
        if (!a) return;
        return this.useJitMappers ? (this.jitMapper = this.jitMapper ?? uMe(this.rqbConfig))([a]) : s([a]);
      }
      values(e) {
        let t = oV(this.query.params, e ?? {});
        return (this.logger.logQuery(this.query.sql, t), this.stmt.values(...t));
      }
    }));
});
import { Database as dmt } from "bun:sqlite";