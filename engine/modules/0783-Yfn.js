
var Yfn = "~effect/Cache",
  lWs = (e, t) =>
    Aie((r) => {
      let s = Object.create(fWs);
      return (
        (s.lookup = (a) => IQ(e(a), (H) => _I(r, H))),
        (s.map = rcn()),
        (s.capacity = t.capacity),
        (s.timeToLive = t.timeToLive ? (a, H) => Ag(t.timeToLive(a, H)) : epn),
        Mu(s)
      );
    }),
  Zfn = (e) => lWs(e.lookup, { ...e, timeToLive: e.timeToLive ? () => e.timeToLive : epn }),
  fWs,
  epn = (e, t) => SU,
  pWs,
  tpn = (e, t) => {
    if (e.expiresAt === void 0) return !1;
    return t.getRef(Cv).currentTimeMillisUnsafe() >= e.expiresAt;
  },
  rpn = (e) => {
    let t = Upe(e.map) - e.capacity;
    if (t <= 0) return;
    for (let [r] of e.map) if ((L1(e.map, r), t--, t === 0)) return;
  },
  dWs = (e, t, r, s = !0) => {
    let a = tw(e.map, t);
    if (vl(a)) return;
    else if (tpn(a.value, r)) {
      L1(e.map, t);
      return;
    } else if (s) (L1(e.map, t), P6(e.map, t, a.value));
    return a.value;
  },
  mWs,
  _Ws;