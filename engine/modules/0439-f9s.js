
var f9s = "~effect/PubSub",
  p9s = "~effect/PubSub/Subscription",
  rHn = (e) => jn(() => E9s(e.atomicPubSub(), new Map(), VM(), CW(!1), wpe(!1), e.strategy())),
  nHn = (e) => rHn({ atomicPubSub: () => d9s(e), strategy: () => new mHn() }),
  cYt = (e) => rHn({ atomicPubSub: () => m9s(e), strategy: () => new dHn() }),
  d9s = (e) => {
    let t = typeof e === "number" ? { capacity: e } : e;
    I9s(t.capacity);
    let r = t.replay && t.replay > 0 ? new uYt(Math.ceil(t.replay)) : void 0;
    if (t.capacity === 1) return new cHn(r);
    else if (Lsn(t.capacity) === t.capacity) return new aHn(t.capacity, r);
    else return new sHn(t.capacity, r);
  },
  m9s = (e) => new uHn(e?.replay ? new uYt(e.replay) : void 0),
  OBe = (e) =>
    BL(
      hl(
        (t) => (
          Ylt(e.shutdownFlag, !0),
          cl(e.scope, Win(t.id)).pipe(Zu(e.strategy.shutdown), gQt(e.shutdownHook.open), Qf)
        ),
      ),
    ),
  eft,
  AYt = (e) =>
    BL(
      M6((t) => {
        let r = Pp(t, $f),
          s = qM(e.scope),
          a = g9s(e.pubsub, e.subscribers, e.strategy);
        return UL(s, _9s(a)).pipe(Zu(TW(r, (H) => cl(s, H))), eu(a));
      }),
    ),
  _9s = (e) =>
    BL(
      hl(
        (t) => (
          Ylt(e.shutdownFlag, !0),
          ja(oYt(e.pollers), (r) => qin(r, t.id), { discard: !0, concurrency: "unbounded" }).pipe(
            DE(() =>
              jn(() => {
                (e.subscribers.delete(e.subscription),
                  e.subscription.unsubscribe(),
                  e.strategy.onPubSubEmptySpaceUnsafe(e.pubsub, e.subscribers));
              }),
            ),
            gQt(e.shutdownHook.open),
            Qf,
          )
        ),
      ),
    ),
  iHn = (e) =>
    yH(function t(r) {
      if (e.shutdownFlag.current) return PS;
      let s = e.pollers.length === 0 ? e.subscription.pollUpTo(Number.POSITIVE_INFINITY) : [];
      if (r) s = r.concat(s);
      if ((e.strategy.onPubSubEmptySpaceUnsafe(e.pubsub, e.subscribers), e.replayWindow.remaining > 0))
        return Jt(e.replayWindow.takeAll().concat(s));
      else if (!TS(s)) return Hi(h9s(e), (a) => t([a]));
      return Jt(s);
    }),
  h9s = (e) => {
    let t = Kg(),
      r = e.subscribers.get(e.subscription);
    if (!r) ((r = new Set()), e.subscribers.set(e.subscription, r));
    return (
      r.add(e.pollers),
      wW(e.pollers, t),
      e.strategy.completePollersUnsafe(e.pubsub, e.subscribers, e.subscription, e.pollers),
      CU(Fl(t), () => (Zan(e.pollers, t), ti))
    );
  },
  dD,
  L9s = (e, t, r) => {
    if (!e.has(t)) e.set(t, new Set());
    e.get(t).add(r);
  },
  $9s = (e, t, r) => {
    if (!e.has(t)) return;
    let s = e.get(t);
    if ((s.delete(r), s.size === 0)) e.delete(t);
  },
  g9s = (e, t, r) => new fHn(e, t, e.subscribe(), Qlt(), CW(!1), wpe(!1), r, e.replayWindow()),
  fHn,
  pHn,
  E9s = (e, t, r, s, a, H) => new pHn(e, t, r, s, a, H),
  I9s = (e) => {
    if (e <= 0) throw Error(`Cannot construct PubSub with capacity of ${e}`);
  },
  _Hn = (e, t, r, s, a) => {
    let H = !0;
    while (H && !s.isEmpty()) {
      let u = Uie(a);
      if (u === o2)
        if (($9s(r, s, a), a.length === 0)) H = !1;
        else L9s(r, s, a);
      else {
        let f = s.poll();
        if (f === o2) Qan(a, u);
        else (EE(u, RC(f)), e.onPubSubEmptySpaceUnsafe(t, r));
      }
    }
  },
  hHn = (e, t, r) => {
    for (let [s, a] of r) for (let H of a) e.completePollersUnsafe(t, r, s, H);
  },
  tft;