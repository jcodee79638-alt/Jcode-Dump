
var Hpn = ne(() => {
  Jg();
  e2();
  BH();
  lD();
  ew();
  D2e();
  KH();
  q_();
  h2e();
  qBe();
  Hf();
  Yu();
  ((LWs = {
    [Jer]: Jer,
    [Symbol.iterator]() {
      if (this.state._tag === "Closed") return nut();
      return this.state.backing[Symbol.iterator]();
    },
    ...wh,
    toJSON() {
      return { _id: "FiberMap", state: this.state };
    },
  }),
    (EWs = uut(fut(Xut, lut(qRe)))),
    (IWs = Wr(
      (e) => hWs(e[0]),
      (e, t, r, s) => {
        if (e.state._tag === "Closed") {
          r.interruptUnsafe(qRe);
          return;
        }
        let a = tw(e.state.backing, t);
        if (a._tag === "Some") {
          if (s?.onlyIfMissing === !0) {
            r.interruptUnsafe(qRe);
            return;
          } else if (a.value === r) return;
          a.value.interruptUnsafe(qRe);
        }
        (P6(e.state.backing, t, r),
          r.addObserver((H) => {
            if (e.state._tag === "Closed") return;
            let u = tw(e.state.backing, t);
            if (Nu(u) && r === u.value) L1(e.state.backing, t);
            if (LI(H) && (s?.propagateInterruption === !0 ? !EWs(H.cause) : !d1(H.cause))) EE(e.deferred, H);
          }));
      },
    )),
    (spn = Wr(2, (e, t) => (e.state._tag === "Closed" ? !1 : WBe(e.state.backing, t)))),
    (opn = Wr(2, (e, t) => jn(() => spn(e, t)))),
    (DWs = Wr(2, (e, t) =>
      yH(() => {
        if (e.state._tag === "Closed") return ti;
        let r = tw(e.state.backing, t);
        if (r._tag === "None") return ti;
        return Kan(r.value, qRe);
      }),
    )),
    (yWs = (function () {
      let e = void 0;
      return () => {
        if (e === void 0) e = KC(PS);
        return e;
      };
    })()));
});