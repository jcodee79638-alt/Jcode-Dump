
function _Ea(e, t, r, s, a) {
  let H = Vpe(wEa(t)),
    u = Vpe(kEa(t)),
    f = qQ(t.params, G_),
    d = qQ(t.headers, G_),
    _ = qQ(t.query, G_),
    L = DEa(t),
    D = t.payload.size > 0 && !a ? dEa(t.payload) : void 0;
  return gEa(
    e,
    t,
    r,
    ft(function* () {
      let T = ZC().context,
        C = cg(T, Md),
        O = cg(T, eWe),
        B = cg(T, ose),
        V = { request: C, endpoint: t, group: e };
      if (f) V.params = yield* kB.wrap("Params", f(O.params));
      if (d) V.headers = yield* kB.wrap("Headers", d(C.headers));
      if (_) V.query = yield* kB.wrap("Query", _(B));
      if (D) {
        let se = mEa(D, C, B);
        if (F6(se)) return se;
        if (se !== void 0) V.payload = yield* kB.wrap("Payload", se);
      }
      let q = yield* s(V);
      if (F6(q)) return q;
      let Z = L?.(q, T);
      if (Z !== void 0) return yield* kB.wrap("Body", Z);
      return yield* kB.wrap("Body", H(q));
    }),
  ).pipe(
    Rsn,
    $s((S) => {
      if (kB.is(S)) return No(S);
      return on(u(S));
    }),
    m1(r),
  );
}