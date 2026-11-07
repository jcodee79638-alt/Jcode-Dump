
var fFs = "~effect/Stream",
  lg = (e) => Ma(e, fFs),
  Hd,
  lcn = (e) => Hd(IYt(Vn(e, vS))),
  XBe = (e) =>
    BYt(
      jn(() => {
        let t = !0,
          r = Jt(vS(void 0)),
          s = nBe(r, e);
        return yH(() => {
          if (t) return ((t = !1), r);
          return s;
        });
      }),
    ),
  BYt = (e) => Hd(UU(e)),
  RYt = (e, t) => Hd(T$((r, s) => Hi(jYt(e.channel, s), (a) => t(a, s)))),
  GBe = (e) => e.channel,
  l1e = (e, t) => Hd(DHn(e, t)),
  $1,
  c2 = (...e) => WYt(e),
  JBe = (e) => Hd(yHn(() => e().channel)),
  NW = (e) => Hd(sft(e)),
  fcn = (e) => Hd(EYt(e)),
  KBe = (e, t) => (Array.isArray(e) && t?.chunkSize === void 0 ? WYt(e) : Hd(xHn(e, t?.chunkSize))),
  WYt = (e) => (bv(e) ? Hd(SHn(e)) : $1),
  Bie = (e) => Hd(vHn(e)),
  pcn = (e) => Hd(bHn(e)),
  Npe = (e) =>
    Hd(
      T$(
        ni(function* (t, r) {
          let s = e.evaluate().getReader();
          return (
            yield* UL(r, e.releaseLockOnEnd ? jn(() => s.releaseLock()) : nA(() => s.cancel().catch(m6))),
            Hi(bl({ try: () => s.read(), catch: (a) => e.onError(a) }), ({ done: a, value: H }) =>
              a ? Xp() : Jt(vS(H)),
            )
          );
        }),
      ),
    ),
  dcn = (e, t) => Hd(jHn(e, t)),
  pFs = (e) => Hd(DYt(e)),
  hh = (e) => Hd(FBe(Vn(e, GBe))),
  mcn = (e) => Hd(WHn(e.channel)),
  xE,
  f1e,
  _cn,
  VYt,
  lft,
  dFs,
  mFs = (e) => lft(e, KBe),
  Fpe,
  oG,
  aG,
  zBe,
  _Fs,
  hcn,
  hFs,
  fft,
  qYt = (e) => Hd(FHn(e.channel)),
  LFs,
  p1e,
  pft,
  $Fs,
  FYt,
  gFs,
  Rie,
  Wie,
  C6,
  HG = (e) =>
    JBe(() => {
      let t = new TextEncoder();
      return xE(e, (r) => t.encode(r));
    }),
  d1e = (e) => e.channel.pipe(aft(RHn()), Hd),
  EFs,
  Lcn,
  m1e,
  QBe,
  Vie,
  GYt = (e) =>
    A1e(
      e.channel,
      () => [],
      (t, r) => {
        for (let s = 0; s < r.length; s++) t.push(r[s]);
        return t;
      },
    ),
  $cn,
  FW,
  dft,
  gcn = (e) => XHn(e.channel),
  cG = (e) =>
    A1e(
      e.channel,
      () => "",
      (t, r) => t + r.join(""),
    ),
  mft,
  Ecn;