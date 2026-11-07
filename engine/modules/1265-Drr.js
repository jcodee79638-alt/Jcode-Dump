
var Drr = ne(() => {
  $rr();
  Ba();
  Rdt();
  Ddt();
  lY();
  ((hLn = class extends Bj {
    static [Gr] = "ExecuteResultSync";
    constructor(e) {
      super();
      this.resultCb = e;
    }
    async execute() {
      return this.resultCb();
    }
    sync() {
      return this.resultCb();
    }
  }),
    (grr = class {
      static [Gr] = "PreparedQuery";
      joinsNotNullableMap;
      constructor(e, t, r, s, a, H) {
        if (
          ((this.mode = e),
          (this.executeMethod = t),
          (this.query = r),
          (this.cache = s),
          (this.queryMetadata = a),
          (this.cacheConfig = H),
          s && s.strategy() === "all" && H === void 0)
        )
          this.cacheConfig = { enabled: !0, autoInvalidate: !0 };
        if (!this.cacheConfig?.enabled) this.cacheConfig = void 0;
      }
      async queryWithCache(e, t, r) {
        if (this.cache === void 0 || vi(this.cache, sMe) || this.queryMetadata === void 0)
          try {
            return await r();
          } catch (s) {
            throw new Lde(e, t, s);
          }
        if (this.cacheConfig && !this.cacheConfig.enabled)
          try {
            return await r();
          } catch (s) {
            throw new Lde(e, t, s);
          }
        if (
          (this.queryMetadata.type === "insert" ||
            this.queryMetadata.type === "update" ||
            this.queryMetadata.type === "delete") &&
          this.queryMetadata.tables.length > 0
        )
          try {
            let [s] = await Promise.all([r(), this.cache.onMutate({ tables: this.queryMetadata.tables })]);
            return s;
          } catch (s) {
            throw new Lde(e, t, s);
          }
        if (!this.cacheConfig)
          try {
            return await r();
          } catch (s) {
            throw new Lde(e, t, s);
          }
        if (this.queryMetadata.type === "select") {
          let s = await this.cache.get(
            this.cacheConfig.tag ?? (await Idt(e, t)),
            this.queryMetadata.tables,
            this.cacheConfig.tag !== void 0,
            this.cacheConfig.autoInvalidate,
          );
          if (s === void 0) {
            let a;
            try {
              a = await r();
            } catch (H) {
              throw new Lde(e, t, H);
            }
            return (
              await this.cache.put(
                this.cacheConfig.tag ?? (await Idt(e, t)),
                a,
                this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [],
                this.cacheConfig.tag !== void 0,
                this.cacheConfig.config,
              ),
              a
            );
          }
          return s;
        }
        try {
          return await r();
        } catch (s) {
          throw new Lde(e, t, s);
        }
      }
      getQuery() {
        return this.query;
      }
      mapRunResult(e, t) {
        return e;
      }
      mapAllResult(e, t) {
        throw Error("Not implemented");
      }
      mapGetResult(e, t) {
        throw Error("Not implemented");
      }
      execute(e) {
        if (this.mode === "async") return this[this.executeMethod](e);
        return new hLn(() => this[this.executeMethod](e));
      }
      mapResult(e, t) {
        switch (this.executeMethod) {
          case "run":
            return this.mapRunResult(e, t);
          case "all":
            return this.mapAllResult(e, t);
          case "get":
            return this.mapGetResult(e, t);
        }
      }
    }),
    (Err = class {
      static [Gr] = "SQLiteSession";
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
        let t = this.dialect.sqlToQuery(e);
        try {
          return this.prepareOneTimeQuery(t, void 0, "run").run();
        } catch (r) {
          throw new aY({ cause: r, message: `Failed to run the query '${t.sql}'` });
        }
      }
      extractRawRunValueFromBatchResult(e) {
        return e;
      }
      all(e) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(e), void 0, "run").all();
      }
      extractRawAllValueFromBatchResult(e) {
        throw Error("Not implemented");
      }
      get(e) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(e), void 0, "run").get();
      }
      extractRawGetValueFromBatchResult(e) {
        throw Error("Not implemented");
      }
      values(e) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(e), void 0, "run").values();
      }
      async count(e) {
        return (await this.values(e))[0][0];
      }
      extractRawValuesValueFromBatchResult(e) {
        throw Error("Not implemented");
      }
    }),
    (Irr = class extends pmt {
      static [Gr] = "SQLiteTransaction";
      constructor(e, t, r, s, a, H = 0, u, f) {
        super(e, t, r, s, a, u, f);
        ((this.relations = s), (this.schema = a), (this.nestedIndex = H));
      }
      rollback() {
        throw new U_n();
      }
    }));
});