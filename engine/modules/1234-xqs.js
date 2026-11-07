
function xqs(e, t, r) {
  return ft(function* () {
    let s = Zt`${Zt.identifier(e)}`,
      a = yield* t.all(Zt`SELECT id, hash, created_at FROM ${s} ORDER BY id ASC`),
      H = yield* ZA({ try: () => Xhn(e, Ghn(a, r)), catch: yqs });
    yield* t.transaction((u) =>
      ft(function* () {
        for (let f of H) yield* u.run(f);
      }),
    );
  });
}