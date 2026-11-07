
var npn = ne(() => {
  YA();
  e2();
  $6();
  KH();
  q_();
  q_();
  gE();
  qBe();
  Hf();
  ((fWs = {
    ...wh,
    [Yfn]: Yfn,
    toJSON() {
      return { _id: "Cache", capacity: this.capacity, map: this.map };
    },
  }),
    (pWs = Wr(2, (e, t) =>
      Hl((r) => {
        let s = tw(e.map, t);
        if (Nu(s) && !tpn(s.value, r)) return (L1(e.map, t), P6(e.map, t, s.value), Fl(s.value.deferred));
        let a = Kg(),
          H = { expiresAt: void 0, deferred: a };
        if ((P6(e.map, t, H), Number.isFinite(e.capacity))) rpn(e);
        return FC(e.lookup(t), (u) => {
          EE(a, u);
          let f = e.timeToLive(u, t);
          if (Wq(f)) H.expiresAt = r.getRef(Cv).currentTimeMillisUnsafe() + $E(f);
          else if (I2e(f)) L1(e.map, t);
          return Lp;
        });
      }),
    )),
    (mWs = Wr(3, (e, t, r) =>
      Hl((s) => {
        let a = kh(r),
          H = Kg();
        EE(H, a);
        let u = e.timeToLive(a, t);
        if (I2e(u)) return (L1(e.map, t), Lp);
        return (
          P6(e.map, t, {
            deferred: H,
            expiresAt: Wq(u) ? s.getRef(Cv).currentTimeMillisUnsafe() + $E(u) : void 0,
          }),
          rpn(e),
          Lp
        );
      }),
    )),
    (_Ws = Wr(3, (e, t, r) =>
      Hl((s) => {
        let a = dWs(e, t, s, !1);
        if (a === void 0) return Mu(!1);
        return Fl(a.deferred).pipe(
          $_((H) => {
            if (r(H)) return (L1(e.map, t), !0);
            return !1;
          }),
          vU(() => Mu(!1)),
        );
      }),
    )));
});