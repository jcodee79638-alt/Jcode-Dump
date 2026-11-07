
function xaH(e, t, r) {
  return ft(function* () {
    let s = yield* pD(SaH(e).pipe(FA)),
      a = yield* pD(
        cl(e.scope, M$).pipe(
          FA,
          up(
            jn(() => {
              if (Rwr === r) Rwr = void 0;
            }),
          ),
        ),
      );
    return (H) =>
      ft(function* () {
        if ((yield* t, H)) yield* s;
        yield* a;
      });
  });
}