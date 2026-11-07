
var G1 = (e) => Jft(e).pipe(XQ(!1)),
  R8i = (e) =>
    vBs(e).pipe(
      GQ((t) => (Number.isInteger(t) && t > 0 ? t : void 0)),
      XAn(() => KAn(void 0)),
    ),
  W8i,
  oee = (e) =>
    Xpe({ experimental: W8i, enabled: Jft(e).pipe(dRe) }).pipe(
      GQ((t) => uD(t.enabled, () => t.experimental)),
    ),
  NE,
  TVc,
  WN;