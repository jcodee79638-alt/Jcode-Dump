
var Zse = ne(() => {
  Zse();
  Gt();
  ude();
  I1();
  tV();
  T2();
  Hu();
  Bse();
  aw();
  exe();
  ((P$ = gf),
    ($Lt = nt({
      id: P$,
      parentID: P$.pipe(Gn),
      projectID: S2,
      agent: K1e.pipe(Gn),
      model: IG.pipe(Gn),
      cost: mo,
      tokens: nt({ input: mo, output: mo, reasoning: mo, cache: nt({ read: mo, write: mo }) }),
      time: nt({ created: Iy, updated: Iy, archived: Iy.pipe(Gn) }),
      title: re,
      location: Rv,
      subpath: du.pipe(Gn),
      revert: tht.pipe(Gn),
    }).annotate({ identifier: "SessionV2.Info" })),
    (Lor = nt({ id: P$, time: mo, direction: Jo(["previous", "next"]) }).annotate({
      identifier: "Session.ListAnchor",
    })));
});