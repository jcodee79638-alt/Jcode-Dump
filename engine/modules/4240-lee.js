
function lee() {
  return ft(function* () {
    let e = yield* Qg(),
      t = Yja(),
      r = (yield* Fh) ?? t.instance,
      s = (yield* bI) ?? t.workspace,
      a = (H) => pyr(H.pipe(vj(e)), { instance: r, workspace: s });
    return {
      promise: (H) => _Xe(s, () => oL(a(H))),
      fork: (H) => _Xe(s, () => KC(a(H))),
      run: (H) =>
        Fd((u) => {
          _Xe(s, () => flt(a(H)).then((f) => u(mh(f) ? Jt(f.value) : NL(f.cause))));
        }),
      bind:
        (H) =>
        (...u) =>
          _Xe(s, () => Yg(a(jn(() => H(...u))))),
    };
  });
}