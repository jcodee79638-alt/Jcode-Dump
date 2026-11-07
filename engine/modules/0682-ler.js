
var ler = ne(() => {
  Jg();
  e2();
  BH();
  lD();
  ew();
  D2e();
  KH();
  q_();
  h2e();
  Yu();
  ((DRs = {
    [Her]: Her,
    [Symbol.iterator]() {
      if (this.state._tag === "Closed") return nut();
      return this.state.backing[Symbol.iterator]();
    },
    ...wh,
    toJSON() {
      return { _id: "FiberMap", state: this.state };
    },
  }),
    (xRs = uut(fut(Xut, lut(cer)))),
    (Fun = Wr(
      (e) => IRs(e[0]),
      (e, t, r) => {
        if (e.state._tag === "Closed") {
          t.interruptUnsafe(cer);
          return;
        } else if (e.state.backing.has(t)) return;
        (e.state.backing.add(t),
          t.addObserver((s) => {
            if (e.state._tag === "Closed") return;
            if (
              (e.state.backing.delete(t),
              LI(s) && (r?.propagateInterruption === !0 ? !xRs(s.cause) : !d1(s.cause)))
            )
              EE(e.deferred, s);
          }));
      },
    )),
    (Run = (function () {
      let e = void 0;
      return () => {
        if (e === void 0) e = KC(PS);
        return e;
      };
    })()));
});