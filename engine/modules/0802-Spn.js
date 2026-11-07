
var Spn = "~effect/transactions/TxReentrantLock",
  eVs,
  tVs,
  rVs = () =>
    ft(function* () {
      let e = yield* ypn(eVs),
        t = Object.create(tVs);
      return ((t[Spn] = Spn), (t.stateRef = e), t);
    }).pipe(Tie),
  Tpn = (e) =>
    hl((t) =>
      ft(function* () {
        let r = yield* zRe(e.stateRef),
          s = t.id;
        if (Nu(r.writer) && r.writer.value[0] !== s) return yield* dlt;
        let H = uD(xft(r.readers, s), () => 0) + 1;
        return (yield* q1e(e.stateRef, { ...r, readers: tZt(r.readers, s, H) }), H);
      }).pipe(Tie),
    ),
  vpn = (e) =>
    hl((t) =>
      ft(function* () {
        let r = yield* zRe(e.stateRef),
          s = t.id;
        if (Nu(r.writer) && r.writer.value[0] !== s) return yield* dlt;
        for (let [a] of r.readers) if (a !== s && uD(xft(r.readers, a), () => 0) > 0) return yield* dlt;
        if (Nu(r.writer)) {
          let a = r.writer.value[1] + 1;
          return (yield* q1e(e.stateRef, { ...r, writer: Lo([s, a]) }), a);
        }
        return (yield* q1e(e.stateRef, { ...r, writer: Lo([s, 1]) }), 1);
      }).pipe(Tie),
    ),
  bpn = (e) =>
    hl((t) =>
      ft(function* () {
        let r = yield* zRe(e.stateRef),
          s = t.id,
          a = uD(xft(r.readers, s), () => 0);
        if (a <= 0) return 0;
        let H = a - 1,
          u = H === 0 ? zcn(r.readers, s) : tZt(r.readers, s, H);
        return (yield* q1e(e.stateRef, { ...r, readers: u }), H);
      }).pipe(Tie),
    ),
  jpn = (e) =>
    hl((t) =>
      ft(function* () {
        let r = yield* zRe(e.stateRef),
          s = t.id;
        if (vl(r.writer) || r.writer.value[0] !== s) return 0;
        let a = r.writer.value[1] - 1,
          H = a <= 0 ? eH() : Lo([s, a]);
        return (yield* q1e(e.stateRef, { ...r, writer: H }), a);
      }).pipe(Tie),
    ),
  nVs = (...e) => {
    if (e.length === 1) {
      let [s] = e;
      return (a) =>
        Ipe(
          Tpn(a),
          () => s,
          () => bpn(a),
        );
    }
    let [t, r] = e;
    return Ipe(
      Tpn(t),
      () => r,
      () => bpn(t),
    );
  },
  Qer = (...e) => {
    if (e.length === 1) {
      let [s] = e;
      return (a) =>
        Ipe(
          vpn(a),
          () => s,
          () => jpn(a),
        );
    }
    let [t, r] = e;
    return Ipe(
      vpn(t),
      () => r,
      () => jpn(t),
    );
  };