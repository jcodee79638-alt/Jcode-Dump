
var tTi = ne(() => {
  YA();
  BH();
  pBe();
  ew();
  KH();
  Dd();
  Hf();
  R_();
  ylt();
  Tv();
  Ov();
  jW();
  bie();
  Vye();
  fD();
  aL();
  nZt();
  PMe();
  DRe();
  a_t();
  eV();
  eV();
  p2();
  bpt();
  ese();
  SGe();
  tSt();
  nSt();
  fhe();
  $0r();
  ((AEa = Symbol.for("@effect/platform/HttpApiBuilder/Handlers")),
    (fEa = {
      [AEa]: { _Endpoints: Za },
      pipe() {
        return vA(this, arguments);
      },
      handle(e, t, r) {
        let s = this.group.endpoints[e];
        return (
          this.handlers.set(e, {
            endpoint: s,
            handler: t,
            isRaw: !1,
            uninterruptible: r?.uninterruptible ?? !1,
          }),
          this
        );
      },
      handleRaw(e, t, r) {
        let s = this.group.endpoints[e];
        return (
          this.handlers.set(e, {
            endpoint: s,
            handler: t,
            isRaw: !0,
            uninterruptible: r?.uninterruptible ?? !1,
          }),
          this
        );
      },
    }));
  ((YSi = new WeakMap()), (IEa = qW(F6)));
  ((PEa = eTi(PZ)), (CEa = eTi(bbe)));
});