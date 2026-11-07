
var lrr = ne(() => {
  Jg();
  BH();
  Ddt();
  cmt();
  cmt();
  Ba();
  Ptr();
  lMe();
  J_();
  zhn();
  Ym();
  gde();
  irr();
  Amt = class Amt {
    executor;
    query;
    logger;
    cache;
    queryMetadata;
    fields;
    useJitMappers;
    customResultMapper;
    isRqbV2Query;
    rqbConfig;
    isInTransaction;
    static [Gr] = "SQLiteEffectPreparedQuery";
    joinsNotNullableMap;
    jitMapper;
    cacheConfig;
    effectExecuteMethod;
    constructor(e, t, r, s, a, H, u, f, d, _, L, I, D = Jt(!1)) {
      this.executor = e;
      this.query = t;
      this.logger = r;
      this.cache = s;
      this.queryMetadata = a;
      this.fields = u;
      this.useJitMappers = d;
      this.customResultMapper = _;
      this.isRqbV2Query = L;
      this.rqbConfig = I;
      this.isInTransaction = D;
      if (
        ((this.effectExecuteMethod = f),
        (this.cacheConfig = s.strategy() === "all" && H === void 0 ? { enabled: !0, autoInvalidate: !0 } : H),
        !this.cacheConfig?.enabled)
      )
        this.cacheConfig = void 0;
    }
    run(e) {
      return this.executeWithCache(e, "run");
    }
    all(e) {
      if (this.isRqbV2Query) return this.allRqbV2(e);
      if (!this.fields && !this.customResultMapper) return this.executeWithCache(e, "all");
      return this.executeWithCache(e, "values", (t) => this.mapAllResult(t));
    }
    get(e) {
      if (this.isRqbV2Query) return this.getRqbV2(e);
      if (!this.fields && !this.customResultMapper) return this.executeWithCache(e, "get");
      return this.executeWithCache(e, "values", (t) => this.mapGetResult(t));
    }
    values(e) {
      return this.executeWithCache(e, "values");
    }
    execute(e) {
      return this[this.effectExecuteMethod](e);
    }
    mapRunResult(e, t) {
      return e;
    }
    mapAllResult(e, t) {
      if (t) e = Array.isArray(e) ? e : [];
      if (!this.fields && !this.customResultMapper) return e;
      if (this.isRqbV2Query)
        return this.useJitMappers
          ? (this.jitMapper = this.jitMapper ?? uMe(this.rqbConfig))(e)
          : this.customResultMapper(e);
      if (this.customResultMapper) return this.customResultMapper(e);
      return this.useJitMappers
        ? (this.jitMapper = this.jitMapper ?? oMe(this.fields, this.joinsNotNullableMap))(e)
        : e.map((r) => Ztr(this.fields, r, this.joinsNotNullableMap));
    }
    mapGetResult(e, t) {
      if (t) e = Array.isArray(e) ? e : [];
      if (!this.fields && !this.customResultMapper) return Array.isArray(e) ? e[0] : e;
      let r = Array.isArray(e) ? e[0] : e;
      if (!r) return;
      if (this.isRqbV2Query)
        return this.useJitMappers
          ? (this.jitMapper = this.jitMapper ?? uMe(this.rqbConfig))([r])
          : this.customResultMapper([r]);
      if (this.customResultMapper) return this.customResultMapper([r]);
      return this.useJitMappers
        ? (this.jitMapper = this.jitMapper ?? oMe(this.fields, this.joinsNotNullableMap))([r])[0]
        : Ztr(this.fields, r, this.joinsNotNullableMap);
    }
    allRqbV2(e) {
      return this.executeWithCache(e, "all", (t) => this.mapAllResult(t));
    }
    getRqbV2(e) {
      return this.executeWithCache(e, "get", (t) => (t === void 0 ? void 0 : this.mapGetResult(t)));
    }
    executeWithCache(e, t, r) {
      return ft({ self: this }, function* () {
        let s = oV(this.query.params, e ?? {});
        return (
          yield* this.logger.logQuery(this.query.sql, s),
          yield* this.queryWithCache(
            this.query.sql,
            s,
            yH(() => this.executor(s, t)),
            r,
          )
        );
      });
    }
    mapCachedResult(e, t) {
      if (!t) return Jt(e);
      return ZA({ try: () => t(e), catch: (r) => r });
    }
    queryWithCache(e, t, r, s) {
      return ft({ self: this }, function* () {
        if (
          this.queryMetadata?.type === "select" &&
          this.cacheConfig?.enabled &&
          (yield* this.isInTransaction)
        )
          return yield* this.mapCachedResult(yield* r, s);
        let a = !vi(this.cache.cache, sMe)
          ? yield* bl(() => Zdn(e, t, this.queryMetadata, this.cacheConfig))
          : { type: "skip" };
        if (a.type === "skip") return yield* this.mapCachedResult(yield* r, s);
        if (a.type === "invalidate") {
          let H = yield* r;
          return (yield* this.cache.onMutate({ tables: a.tables }), yield* this.mapCachedResult(H, s));
        }
        if (a.type === "try") {
          if (yield* this.isInTransaction) return yield* this.mapCachedResult(yield* r, s);
          let { tables: H, key: u, isTag: f, autoInvalidate: d, config: _ } = a,
            L = yield* this.cache.get(u, H, f, d);
          if (typeof L < "u") return yield* this.mapCachedResult(L, s);
          let I = yield* r;
          return (yield* this.cache.put(u, I, d ? H : [], f, _), yield* this.mapCachedResult(I, s));
        }
        imn(a);
      }).pipe($s((a) => bn(new Vhn({ query: e, params: t, cause: fie(a) }))));
    }
    getQuery() {
      return this.query;
    }
    mapResult(e, t) {
      switch (this.effectExecuteMethod) {
        case "run":
          return this.mapRunResult(e, t);
        case "all":
          return this.mapAllResult(e, t);
        case "get":
          return this.mapGetResult(e, t);
      }
    }
  };
  Arr = class Arr {
    dialect;
    static [Gr] = "SQLiteEffectSession";
    constructor(e) {
      this.dialect = e;
    }
    prepareOneTimeQuery(e, t, r, s, a, H) {
      return this.prepareQuery(e, t, r, s, a, H);
    }
    prepareOneTimeRelationalQuery(e, t, r, s, a) {
      return this.prepareRelationalQuery(e, t, r, s, a);
    }
    run(e) {
      return this.prepareQuery(this.dialect.sqlToQuery(e), void 0, "run").run();
    }
    all(e) {
      return this.prepareQuery(this.dialect.sqlToQuery(e), void 0, "all").all();
    }
    get(e) {
      return this.prepareQuery(this.dialect.sqlToQuery(e), void 0, "get").get();
    }
    values(e) {
      return this.prepareQuery(this.dialect.sqlToQuery(e), void 0, "all").values();
    }
    count(e) {
      return this.values(e).pipe(Vn((t) => t[0]?.[0] ?? 0));
    }
  };
  urr = class urr extends S3e {
    relations;
    static [Gr] = "SQLiteEffectTransaction";
    constructor(e, t, r) {
      super(e, t, r);
      this.relations = r;
    }
    rollback() {
      return new qhn();
    }
  };
  Sqs = Ge("migrate")(function* (e, t, r) {
    let s = typeof r === "string" ? "__drizzle_migrations" : (r.migrationsTable ?? "__drizzle_migrations"),
      { newDb: a } = yield* Khn(s, t, e);
    if (a)
      yield* t.run(Zt`
		CREATE TABLE IF NOT EXISTS ${Zt.identifier(s)} (
			id INTEGER PRIMARY KEY,
			hash text NOT NULL,
			created_at numeric,
			name text,
			applied_at TEXT
		)
	`);
    let H = yield* t.all(Zt`SELECT id, hash, created_at, name FROM ${Zt.identifier(s)}`);
    if (typeof r === "object" && r.init) {
      if (H.length) return yield* new orr({ exitCode: "databaseMigrations" });
      if (e.length > 1) return yield* new orr({ exitCode: "localMigrations" });
      let [f] = e;
      if (!f) return;
      yield* t.run(
        Zt`insert into ${Zt.identifier(s)} ("hash", "created_at", "name", "applied_at") values(${f.hash}, ${f.folderMillis}, ${f.name}, ${new Date().toISOString()})`,
      );
      return;
    }
    let u = h3e({ localMigrations: e, dbMigrations: H });
    if (u.length === 0) return;
    yield* t.transaction((f) =>
      ft(function* () {
        for (let d of u) {
          for (let _ of d.sql) yield* f.run(Zt.raw(_));
          yield* f.run(
            Zt`insert into ${Zt.identifier(s)} ("hash", "created_at", "name", "applied_at") values(${d.hash}, ${d.folderMillis}, ${d.name}, ${new Date().toISOString()})`,
          );
        }
      }),
    );
  });
});