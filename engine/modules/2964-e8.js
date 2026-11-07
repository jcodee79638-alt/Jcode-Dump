
var e8 = ne(async () => {
  OH();
  vy();
  Gt();
  h2();
  zde();
  jA();
  rV();
  Cf();
  G0i();
  await Jn([
    e8(),
    KG(),
    Kv(),
    Car(),
    war(),
    Fhr(),
    Bhr(),
    Rhr(),
    Whr(),
    fL(),
    eN(),
    um(),
    yV(),
    qd(),
    Vae(),
    Rae(),
    Fxe(),
    PV(),
    R2(),
    Ghr(),
    Xhr(),
    V0i(),
    iMt(),
    zhr(),
  ]);
  ((Q0i = zg(
    ft(function* () {
      let e = yield* MV,
        t = yield* Vse,
        r = yield* Bxe,
        s = yield* QS,
        a = yield* MG,
        H = yield* ZM,
        u = yield* bm,
        f = yield* Wae,
        d = yield* Bae,
        _ = yield* lL,
        L = yield* ui.Service,
        I = yield* w2,
        D = yield* M1,
        S = yield* gy,
        T = yield* o5,
        C = yield* jV,
        O = (B) => {
          let V = {
            id: B.id,
            effect: (q) =>
              B.effect(q).pipe(
                IA(MV, e),
                IA(Vse, t),
                IA(QS, s),
                IA(MG, a),
                IA(ZM, H),
                IA(bm, u),
                IA(Wae, f),
                IA(Bae, d),
                IA(lL, _),
                IA(ui.Service, L),
                IA(w2, I),
                IA(M1, D),
                IA(gy, S),
                IA(o5, T),
                IA(jV, C),
              ),
          };
          return r.add(M$t.make(V.id), V.effect);
        };
      yield* Adt(
        ft(function* () {
          (yield* O(vAa),
            yield* O(XAa),
            yield* O(zAa),
            yield* O(tua),
            yield* O(W0i),
            yield* O(Tfo),
            yield* O(kfo),
            yield* O(CAa));
          for (let B of q0i) yield* O(B);
          (yield* O(SAa), yield* O(TAa), yield* O(rua));
        }),
      ).pipe(gI("PluginInternal.boot"), EI({ startImmediately: !0 }));
    }),
  )),
    (fEc = Q0i.pipe(Jm(Nht), Jm(Apt))),
    (iua = Ua({
      name: "plugin-internal",
      layer: Q0i,
      deps: [Lht, Xir, fPn, bWe, s3e, PY, KS, qhr, tMt, zS, ui.node, Rxn, lw, Q0, vVe, u$t],
    })));
});