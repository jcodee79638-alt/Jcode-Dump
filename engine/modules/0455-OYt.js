
var OYt = ne(() => {
  Jg();
  Jq();
  YA();
  e2();
  $6();
  BH();
  lD();
  ew();
  KH();
  qBe();
  R_();
  fD();
  ((uft = Wr(2, (e, t) =>
    q0((r) => {
      if (e.state._tag === "Closed") return PS;
      let s = e.state,
        a = ZC(),
        H = tw(s.map, t),
        u;
      if (H._tag === "Some") ((u = H.value), u.refCount++);
      else if (Number.isFinite(e.capacity) && Upe(e.state.map) >= e.capacity)
        return bn(new Bin(`RcMap attempted to exceed capacity of ${e.capacity}`));
      else {
        ((u = {
          deferred: Kg(),
          scope: VM(),
          idleTimeToLive: e.idleTimeToLive(t),
          finalizer: void 0,
          fiber: void 0,
          expiresAt: 0,
          refCount: 1,
        }),
          (u.finalizer = oFs(e, t, u)),
          P6(s.map, t, u));
        let d = new Map(e.context.mapUnsafe);
        (a.context.mapUnsafe.forEach((_, L) => {
          d.set(L, _);
        }),
          d.set($f.key, u.scope),
          e
            .lookup(t)
            .pipe(G0(B0(d)), Pj(u.scope))
            .addObserver((_) => EE(u.deferred, _)));
      }
      let f = cg(a.context, $f);
      return UL(f, u.finalizer).pipe(Zu(r(Fl(u.deferred))));
    }),
  )),
    (scn = Wr(
      2,
      ni(function* (e, t) {
        if (e.state._tag === "Closed") return;
        let r = tw(e.state.map, t);
        if (r._tag === "None") return;
        let s = r.value;
        if ((L1(e.state.map, t), s.refCount > 0)) return;
        if (s.fiber) yield* s2(s.fiber);
        yield* cl(s.scope, M$);
      }, BL),
    )));
});