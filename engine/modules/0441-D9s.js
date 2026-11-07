
var D9s = "~effect/Queue",
  y9s = "~effect/Queue/Enqueue",
  M9s = "~effect/Queue/Dequeue",
  pYt,
  x9s,
  BQ = (e) =>
    Hl((t) => {
      let r = Object.create(x9s);
      return (
        (r.dispatcher = t.currentDispatcher),
        (r.capacity = e?.capacity ?? Number.POSITIVE_INFINITY),
        (r.strategy = e?.strategy ?? "suspend"),
        (r.messages = Qlt()),
        (r.scheduleRunning = !1),
        (r.state = { _tag: "Open", takers: new Set(), offers: new Set(), awaiters: new Set() }),
        Mu(r)
      );
    }),
  n1e = (e) => BQ({ capacity: e }),
  S9s = (e) => BQ({ capacity: e, strategy: "dropping" }),
  dYt = () => BQ(),
  kW = (e, t) =>
    Gm(() => {
      if (e.state._tag !== "Open") return nft;
      else if (e.messages.length >= e.capacity)
        switch (e.strategy) {
          case "dropping":
            return nft;
          case "suspend":
            if (e.capacity <= 0 && e.state.takers.size > 0) return (wW(e.messages, t), _Yt(e), rft);
            return w9s(e, t);
          case "sliding":
            return (Uie(e.messages), wW(e.messages, t), rft);
        }
      return (wW(e.messages, t), $Hn(e), rft);
    }),
  JM = (e, t) => {
    if (e.state._tag !== "Open") return !1;
    else if (e.messages.length >= e.capacity) {
      if (e.strategy === "sliding") return (Uie(e.messages), wW(e.messages, t), !0);
      else if (e.capacity <= 0 && e.state.takers.size > 0) return (wW(e.messages, t), _Yt(e), !0);
      return !1;
    }
    return (wW(e.messages, t), $Hn(e), !0);
  },
  T9s = (e, t) => a2(e, oye(t)),
  a2,
  OW = (e, t) => {
    if (e.state._tag !== "Open") return !1;
    let r = Mv(t),
      s = Inn(r, j9s);
    if (e.state.offers.size === 0 && e.messages.length === 0) return (hYt(e, s), !0);
    return ((e.state = { ...e.state, _tag: "Closing", exit: s }), !0);
  },
  i1e = (e) => OW(e, oye(Aye())),
  Nie = (e) =>
    $p(() => {
      if (e.state._tag === "Done") return !0;
      t1e(e.messages);
      let t = e.state.offers;
      if ((hYt(e, e.state._tag === "Open" ? P9s : e.state.exit), t.size > 0)) {
        for (let r of t)
          if (r._tag === "Single") r.resume(nft);
          else r.resume(kh(r.remaining.slice(r.offset)));
        t.clear();
      }
      return !0;
    }),
  mYt = (e) => LHn(e, 1, Number.POSITIVE_INFINITY),
  LHn = (e, t, r) => Gm(() => C9s(e, t, r) ?? g6(gHn(e), LHn(e, 1, r))),
  Fie = (e) => Gm(() => v9s(e) ?? g6(gHn(e), Fie(e))),
  v9s = (e) => {
    if (e.state._tag === "Done") return e.state.exit;
    if (e.messages.length > 0) {
      let t = Uie(e.messages);
      return (r1e(e), kh(t));
    } else if (e.capacity <= 0 && e.state.offers.size > 0) {
      ((e.capacity = 1), r1e(e), (e.capacity = 0));
      let t = Uie(e.messages);
      return (r1e(e), kh(t));
    }
    return;
  },
  b9s = (e) => (e.state._tag === "Done" ? 0 : e.messages.length),
  nft,
  rft,
  j9s,
  P9s,
  _Yt = (e) => {
    if (((e.scheduleRunning = !1), e.state._tag === "Done" || e.state.takers.size === 0)) return;
    for (let t of e.state.takers) if ((e.state.takers.delete(t), t(p1), e.messages.length === 0)) break;
  },
  $Hn = (e) => {
    if (e.scheduleRunning || e.state._tag === "Done" || e.state.takers.size === 0) return;
    ((e.scheduleRunning = !0), e.dispatcher.scheduleTask(() => _Yt(e), 0));
  },
  C9s = (e, t, r) => {
    if (e.state._tag === "Done") return e.state.exit;
    else if (r <= 0 || t <= 0) return kh([]);
    else if (e.capacity <= 0 && e.state.offers.size > 0) {
      ((e.capacity = 1), r1e(e), (e.capacity = 0));
      let s = [Uie(e.messages)];
      return (r1e(e), kh(s));
    }
    if (((t = Math.min(t, e.capacity || 1)), t <= e.messages.length)) {
      let s = sYt(e.messages, r);
      return (r1e(e), kh(s));
    }
  },
  w9s = (e, t) =>
    bS((r) => {
      if (e.state._tag !== "Open") return r(nft);
      let s = { _tag: "Single", message: t, resume: r };
      return (
        e.state.offers.add(s),
        $p(() => {
          if (e.state._tag === "Open") e.state.offers.delete(s);
        })
      );
    }),
  r1e = (e) => {
    if (e.state._tag === "Done") return Eie(e.state.exit.cause);
    else if (e.state.offers.size === 0) {
      if (e.state._tag === "Closing" && e.messages.length === 0)
        return (hYt(e, e.state.exit), Eie(e.state.exit.cause));
      return !1;
    }
    let t = e.capacity - e.messages.length;
    for (let r of e.state.offers)
      if (t === 0) break;
      else if (r._tag === "Single") (wW(e.messages, r.message), t--, r.resume(rft), e.state.offers.delete(r));
      else {
        for (; r.offset < r.remaining.length; r.offset++) {
          if (t === 0) return !1;
          (wW(e.messages, r.remaining[r.offset]), t--);
        }
        (r.resume(kh([])), e.state.offers.delete(r));
      }
    return !1;
  },
  gHn = (e) =>
    bS((t) => {
      if (e.state._tag === "Done") return t(e.state.exit);
      return (
        e.state.takers.add(t),
        $p(() => {
          if (e.state._tag !== "Done") e.state.takers.delete(t);
        })
      );
    }),
  hYt = (e, t) => {
    if (e.state._tag === "Done") return;
    let r = e.state;
    e.state = { _tag: "Done", exit: t };
    for (let s of r.takers) s(t);
    r.takers.clear();
    for (let s of r.awaiters) s(t);
    r.awaiters.clear();
  };