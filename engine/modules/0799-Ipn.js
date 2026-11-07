
var Ipn = ne(() => {
  BH();
  KH();
  q_();
  jZt();
  o1e();
  ((JWs = {
    ...wh,
    [Epn]: Epn,
    toJSON() {
      return { _id: "SynchronizedRef", value: this.backing.ref.current };
    },
  }),
    ($G = Wr(2, (e, t) => e.semaphore.withPermit(TZt(e.backing, t)))),
    (KRe = Wr(2, (e, t) =>
      e.semaphore.withPermit(
        yH(() => {
          let r = zer(e);
          return Vn(t(r), ([s, a]) => ((e.backing.ref.current = a), s));
        }),
      ),
    )),
    (zWs = Wr(2, (e, t) => e.semaphore.withPermit(vZt(e.backing, t)))));
});