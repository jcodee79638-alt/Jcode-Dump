
var Jy = ne(async () => {
  Gt();
  $H();
  Xwt();
  ZQe();
  lwr();
  xx();
  mwr();
  await Jn([
    fL(),
    vWe(),
    yV(),
    R2(),
    XN(),
    Ves(),
    Xes(),
    zCr(),
    ikt(),
    QCr(),
    Yes(),
    AYe(),
    ZCr(),
    nts(),
    sts(),
    ats(),
    ewr(),
    akt(),
    lts(),
    nwr(),
    _ts(),
    Its(),
    swr(),
    ak(),
    dkt(),
    Ers(),
  ]);
  ((FsH = Io([
    ...YQe.values()
      .map((e) =>
        nt({ id: b2, type: ri(e.type), properties: e.data }).annotate({ identifier: `Event.${e.type}` }),
      )
      .toArray(),
    Jwt,
  ]).annotate({ identifier: "Event" })),
    (BsH = Hrs({
      definitions: YQe.values().toArray(),
      locationMiddleware: y$e,
      sessionLocationMiddleware: M$e,
    })),
    (ste = kE("opencode-root")
      .addHttpApi(Ges)
      .addHttpApi(Jes)
      .addHttpApi(grs)
      .middleware(lYe)
      .middleware(tm)),
    (eh = kE("opencode-instance")
      .addHttpApi(Wes)
      .addHttpApi(Kes)
      .addHttpApi(Qes)
      .addHttpApi(Zes)
      .addHttpApi(ets)
      .addHttpApi(its)
      .addHttpApi(ots)
      .addHttpApi(Ats)
      .addHttpApi(uts)
      .addHttpApi(rts)
      .addHttpApi(Hts)
      .addHttpApi(pts)
      .addHttpApi(mts)
      .addHttpApi(Ets)
      .addHttpApi(Dts)
      .middleware(lYe)),
    (_wr = kE("opencode")
      .addHttpApi(ste)
      .addHttpApi(Wwe)
      .addHttpApi(eh)
      .addHttpApi(BsH)
      .addHttpApi(Gwe)
      .annotate(Zxt, [FsH, $Ba, gBa, Wir, xYs, a1n, TYs, y$t])));
});