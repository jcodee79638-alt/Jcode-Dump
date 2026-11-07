
var gpn = ne(() => {
  R0();
  YA();
  e2();
  $6();
  KH();
  q_();
  q_();
  gE();
  qBe();
  Hf();
  Yu();
  fD();
  ((BWs = {
    ...wh,
    [_pn]: _pn,
    toJSON() {
      return { _id: "ScopedCache", capacity: this.capacity, state: this.state };
    },
  }),
    (RWs = Wr(2, (e, t) =>
      E6((r) =>
        Hl((s) => {
          let a = e.state;
          if (a._tag === "Closed") return Sye;
          let H = tw(a.map, t);
          if (Nu(H) && !Lpn(H.value, s))
            return (L1(a.map, t), P6(a.map, t, H.value), r(Fl(H.value.deferred)));
          let u = VM(),
            f = Kg(),
            d = { expiresAt: void 0, deferred: f, scope: u };
          return (
            P6(a.map, t, d),
            WWs(s, a.map, e.capacity).pipe(
              Nu(H) ? Fu(() => cl(H.value.scope, p1)) : Za,
              Fu(() => $I(r(e.lookup(t)), u)),
              FC((_) => {
                EE(f, _);
                let L = e.timeToLive(_, t);
                if (Wq(L)) d.expiresAt = s.getRef(Cv).currentTimeMillisUnsafe() + $E(L);
                return Lp;
              }),
            )
          );
        }),
      ),
    )),
    (qWs = Wr(2, (e, t) => MQ(Hl((r) => $_(VWs(e, t, r, !1), SS))))),
    (GWs = Wr(2, (e, t) =>
      MQ(
        Gm(() => {
          if (e.state._tag === "Closed") return Sye;
          let r = tw(e.state.map, t);
          if (vl(r)) return Lp;
          return (L1(e.state.map, t), cl(r.value.scope, p1));
        }),
      ),
    )));
});