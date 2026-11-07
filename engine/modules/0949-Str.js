
var Str = ne(() => {
  Jq();
  YA();
  BH();
  lD();
  Hf();
  fD();
  aL();
  gQ();
  Etr();
  Mtr();
  ((Edt = _i("effect/sql/SqlClient")),
    (Ydn = ni(function* (e) {
      let t = e.transactionService ?? c7s(a7s++),
        r = Hi(x6(t), xv({ onNone: () => e.acquirer, onSome: ([D]) => Jt(D) })),
        s = e.beginTransaction ?? "BEGIN",
        a = e.commit ?? "COMMIT",
        H = e.savepoint ?? ((D) => `SAVEPOINT ${D}`),
        u = e.rollback ?? "ROLLBACK",
        f = e.rollbackSavepoint ?? ((D) => `ROLLBACK TO SAVEPOINT ${D}`),
        d = e.transactionAcquirer ?? e.acquirer,
        _ = H7s({
          transactionService: t,
          spanAttributes: e.spanAttributes,
          acquireConnection: Hi(V2e(), (D) => Vn($I(d, D), (S) => [D, S])),
          begin: (D) => D.executeUnprepared(s, [], void 0),
          savepoint: (D, S) => D.executeUnprepared(H(`effect_sql_${S}`), [], void 0),
          commit: (D) => D.executeUnprepared(a, [], void 0),
          rollback: (D) => D.executeUnprepared(u, [], void 0),
          rollbackSavepoint: (D, S) => D.executeUnprepared(f(`effect_sql_${S}`), [], void 0),
        }),
        L = yield* p3e,
        I = Object.assign($dt(r, e.compiler, e.spanAttributes, e.transformRows), {
          [Qdn]: Qdn,
          safe: void 0,
          withTransaction: _,
          transactionService: t,
          reserve: d,
          withoutTransforms() {
            if (e.transformRows === void 0) return this;
            let D = $dt(r, e.compiler.withoutTransform, e.spanAttributes, void 0),
              S = Object.assign(D, { ...this, ...D });
            return ((S.safe = S), (S.withoutTransforms = () => S), S);
          },
          reactive: e.reactiveQueue ? (D, S) => e.reactiveQueue(D, S).pipe(Vn(Bie), hh) : L.stream,
          reactiveMailbox: e.reactiveQueue ?? L.query,
        });
      return ((I.safe = I), I);
    })),
    (xtr = bA("effect/sql/SqlClient/SafeIntegers", { defaultValue: () => !1 })));
});