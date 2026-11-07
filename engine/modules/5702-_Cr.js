
var _Cr = ne(async () => {
  OH();
  lb();
  Ql();
  Gt();
  o0();
  qze();
  qze();
  await Jn([P7(), ek(), kX(), fJ(), tte(), _Cr()]);
  ((srH = Es(
    wce,
    ft(function* () {
      let e = yield* Eg,
        t = yield* _J,
        r = yield* fR,
        s = yield* IT,
        a = yield* aR,
        H = yield* jHe,
        u = yield* iAe,
        f = ft(function* () {
          let d = yield* Jc;
          (yield* fH("bootstrapping", { directory: d.directory }),
            yield* e.get(),
            yield* s.init(),
            yield* ja([r, t, u, H, a], (_) => _.init().pipe(jf((L) => lp("init failed", { cause: L }))), {
              concurrency: "unbounded",
              discard: !0,
            }).pipe(gI("InstanceBootstrap.init")));
        }).pipe(gI("InstanceBootstrap"));
      return wce.of({ run: f });
    }),
  )),
    (orH = iA({ service: wce, layer: srH, deps: [Ab, DCt, iQe, bX, GLe, Eje, vQe] })));
});