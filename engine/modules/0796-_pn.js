
var _pn = "~effect/ScopedCache",
  NWs = (e) =>
    Aie((t) => {
      let r = Pp(t, $f),
        s = Object.create(BWs);
      s.lookup = (H) => IQ(e.lookup(H), (u) => _I(t, u));
      let a = Ope();
      return (
        (s.state = { _tag: "Open", map: a }),
        (s.capacity = e.capacity),
        (s.timeToLive = e.timeToLive ? (H, u) => Ag(e.timeToLive(H, u)) : hpn),
        WM(
          UL(
            r,
            Hl((H) => ((s.state = { _tag: "Closed" }), XWs(H, a))),
          ),
          s,
        )
      );
    }),
  FWs = (e) => NWs({ ...e, timeToLive: e.timeToLive ? () => e.timeToLive : hpn }),
  BWs,
  hpn = (e, t) => SU,
  RWs,
  Lpn = (e, t) => {
    if (e.expiresAt === void 0) return !1;
    return t.getRef(Cv).currentTimeMillisUnsafe() >= e.expiresAt;
  },
  WWs = (e, t, r) => {
    if (!Number.isFinite(r)) return Lp;
    let s = Upe(t) - r;
    if (s <= 0) return Lp;
    let a = ZF();
    for (let [H, u] of t) if ((L1(t, H), a.push(Gq(e, cl(u.scope, p1), !0)), s--, s === 0)) break;
    return Ape(a);
  },
  VWs = (e, t, r, s = !0) => {
    if (e.state._tag === "Closed") return Sye;
    let a = e.state,
      H = tw(a.map, t);
    if (vl(H)) return Rut;
    else if (Lpn(H.value, r)) return (L1(a.map, t), WM(cl(H.value.scope, p1), void 0));
    else if (s) (L1(a.map, t), P6(a.map, t, H.value));
    return Mu(H.value);
  },
  qWs,
  GWs,
  XWs = (e, t) => {
    let r = ZF();
    for (let [, s] of t) r.push(Gq(e, cl(s.scope, p1), !0, !0));
    return (VBe(t), Ape(r));
  };