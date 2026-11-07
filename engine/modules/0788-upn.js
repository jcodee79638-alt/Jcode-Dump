
var upn = ne(() => {
  YA();
  BH();
  KH();
  Dd();
  OYt();
  fD();
  xWs = ni(function* (e, t) {
    let r = yield* Qg(),
      s = hie.getOrCreate(r),
      a = yield* wYt({ lookup: (H) => M6((u) => t2(e(H), s, Pp(u, $f))), idleTimeToLive: t?.idleTimeToLive });
    return Za({
      [cpn]: cpn,
      rcMap: a,
      get: (H) => Xq(uft(a, H)),
      contextEffect: (H) => uft(a, H),
      invalidate: (H) => scn(a, H),
    });
  });
});