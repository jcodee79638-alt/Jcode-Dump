
var Hwr = ne(() => {
  SY();
  BLt();
  owr();
  Zse();
  T2();
  Hu();
  gLt();
  Gt();
  $H();
  Xy();
  ude();
  tV();
  I1();
  exe();
  Bse();
  ((pkt = {
    workspace: ETn.pipe(be),
    limit: O6.pipe(v$(qc), be).annotate({
      description: "Maximum number of sessions to return. Defaults to the newest 50 sessions.",
    }),
    order: be(Io([ri("asc"), ri("desc")])).annotate({
      description: "Session order for the first page. Use desc for newest first or asc for oldest first.",
    }),
    search: be(re),
  }),
    (isH = nt({ ...pkt, directory: bo })),
    (ssH = nt({ ...pkt, project: S2, subpath: du.pipe(be) })),
    (osH = nt(pkt)),
    (asH = Io([awr(isH), awr(ssH), awr(osH)])),
    (Pts = Cj(asH)),
    (HsH = Kie(Pts)),
    (csH = G_(Pts)),
    (D$e = re.pipe(
      Jl("SessionsCursor"),
      Bl((e) => {
        let t = e.make.bind(e);
        return {
          make: (r) => t(pon(HsH(r))),
          parse: (r) =>
            yH(() => {
              let s = mon(r);
              return xm(s) ? bn(jts) : csH(s.success).pipe(Zo(() => jts));
            }),
        };
      }),
    )),
    (AsH = nt({ type: ri("running") }).annotate({ identifier: "SessionActive" })),
    (usH = qc.check(zie(100))),
    (lsH = nt({ limit: O6.pipe(v$(usH), be), after: O6.pipe(v$(Ko), be) })),
    (fsH = D$e.annotate({
      description:
        "Opaque pagination cursor returned as cursor.previous or cursor.next in the previous response.",
    })),
    (psH = nt({
      ...pkt,
      directory: bo.pipe(be),
      project: S2.pipe(be),
      subpath: du.pipe(be),
      cursor: fsH.pipe(be),
    }).annotate({ identifier: "SessionsQuery" })));
});