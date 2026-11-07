
var Qdn = "~effect/sql/SqlClient",
  Edt,
  a7s = 0,
  Ydn,
  H7s = (e) => (t) =>
    q0((r) =>
      Uye("sql.transaction", { kind: "client" }, (s) =>
        hl((a) => {
          for (let [L, I] of e.spanAttributes) s.attribute(L, I);
          let H = a.context,
            u = a.getRef(y6),
            f = LQ(H, e.transactionService),
            d = f._tag === "Some" ? Jt([void 0, f.value[0]]) : e.acquireConnection,
            _ = f._tag === "Some" ? f.value[1] + 1 : 0;
          return Hi(d, ([L, I]) =>
            (_ === 0 ? e.begin(I) : e.savepoint(I, _)).pipe(
              Hi(() =>
                m1(
                  r(t),
                  jKt(H, (D) => D.pipe(Oh(e.transactionService, [I, _]), Oh(IW, s))),
                ),
              ),
              _h,
              Hi((D) => {
                let S;
                if (mh(D))
                  if (_ === 0)
                    (s.event("db.transaction.commit", u.currentTimeNanosUnsafe()), (S = on(e.commit(I))));
                  else (s.event("db.transaction.savepoint", u.currentTimeNanosUnsafe()), (S = ti));
                else
                  (s.event("db.transaction.rollback", u.currentTimeNanosUnsafe()),
                    (S = on(_ > 0 ? e.rollbackSavepoint(I, _) : e.rollback(I))));
                let T = L !== void 0 ? up(S, cl(L, D)) : S;
                return Hi(T, () => D);
              }),
            ),
          );
        }),
      ),
    ),
  c7s = (e) => _i(`effect/sql/SqlClient/TransactionConnection/${e}`),
  xtr;