
var zHn = "~effect/Sink",
  QHn,
  z9s,
  Q9s,
  iG = (e) => Ma(e, zHn),
  PYt = (e) => Hft((t, r) => II(e)(t, r).pipe(Hi(CS({ disableYield: !0 })), jS(Jt))),
  Hft = (e) => {
    let t = Object.create(Q9s);
    return ((t.transform = e), t);
  },
  Y9s = (e) => T$((t, r) => Jt(Hi(e.transform(t, r), Xp))),
  Z9s = (e) => Hft(() => e),
  YHn = (e) => Z9s(bn(e)),
  sG,
  ZHn = (e) => eFs(ja((t) => e(t), { discard: !0 })),
  eFs = (e) =>
    Hft((t) =>
      t.pipe(
        Hi(e),
        CS({ disableYield: !0 }),
        jS(() => QHn),
      ),
    ),
  ecn = (e) => PYt(FBe(Vn(e, Y9s)));