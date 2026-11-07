
var prr = ne(() => {
  YA();
  BH();
  lD();
  fD();
  Ba();
  lrr();
  frr = class frr extends Arr {
    client;
    relations;
    options;
    static [Gr] = "EffectSQLiteSession";
    constructor(e, t, r, s) {
      super(t);
      this.client = e;
      this.relations = r;
      this.options = s;
    }
    prepareQuery(e, t, r, s, a, H) {
      return new Amt(
        (u, f) => this.execute(e, u, f),
        e,
        this.options.logger,
        this.options.cache,
        a,
        H,
        t,
        r,
        this.options.useJitMappers,
        s,
        void 0,
        void 0,
        this.isInTransaction(),
      );
    }
    prepareRelationalQuery(e, t, r, s, a) {
      return new Amt(
        (H, u) => this.execute(e, H, u),
        e,
        this.options.logger,
        this.options.cache,
        void 0,
        void 0,
        t,
        r,
        this.options.useJitMappers,
        s,
        !0,
        a,
        this.isInTransaction(),
      );
    }
    execute(e, t, r) {
      let s = this.client.unsafe(e.sql, t);
      if (r === "values") return s.values;
      if (r === "get") return s.withoutTransform.pipe(Vn((a) => a[0]));
      return s.withoutTransform;
    }
    isInTransaction() {
      return x6(this.client.transactionService).pipe(Vn((e) => e._tag === "Some"));
    }
    executeTransactionStatement(e, t) {
      return e.executeUnprepared(t, [], void 0).pipe(Qf);
    }
    withTransaction(e, t) {
      return q0((r) =>
        hl((s) => {
          let a = s.context,
            H = LQ(a, this.client.transactionService),
            u =
              H._tag === "Some"
                ? Jt([void 0, H.value[0]])
                : V2e().pipe(
                    Hi((d) =>
                      $I(this.client.reserve, d).pipe(
                        Vn((_) => [d, _]),
                        $s((_) => cl(d, WC(_)).pipe(Zu(bn(_)))),
                      ),
                    ),
                  ),
            f = H._tag === "Some" ? H.value[1] + 1 : 0;
          return u.pipe(
            Hi(([d, _]) => {
              let L = this.executeTransactionStatement(
                _,
                f === 0 ? `begin ${t?.behavior ?? "deferred"}` : `savepoint effect_sql_${f}`,
              ).pipe(
                Hi(() =>
                  m1(r(e), Oh(a, this.client.transactionService, [_, f])).pipe(
                    _h,
                    Hi((I) =>
                      (mh(I)
                        ? f === 0
                          ? this.executeTransactionStatement(_, "commit").pipe(
                              $s((S) =>
                                this.executeTransactionStatement(_, "rollback").pipe(
                                  $s(() => ti),
                                  Zu(bn(S)),
                                ),
                              ),
                            )
                          : this.executeTransactionStatement(_, `release savepoint effect_sql_${f}`)
                        : f === 0
                          ? this.executeTransactionStatement(_, "rollback")
                          : this.executeTransactionStatement(_, `rollback to savepoint effect_sql_${f}`).pipe(
                              Zu(this.executeTransactionStatement(_, `release savepoint effect_sql_${f}`)),
                            )
                      ).pipe(Hi(() => I)),
                    ),
                  ),
                ),
              );
              return d === void 0 ? L : L.pipe(JC((I) => cl(d, I)));
            }),
          );
        }),
      );
    }
    transaction(e, t) {
      let { dialect: r, relations: s } = this;
      return this.withTransaction(
        ft({ self: this }, function* () {
          let a = new Qhn(r, this, s);
          return yield* e(a);
        }),
        t,
      );
    }
  };
  Qhn = class Qhn extends urr {
    static [Gr] = "EffectSQLiteTransaction";
    transaction = (e) => this.session.transaction(e);
  };
});