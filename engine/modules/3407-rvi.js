
var rvi,
  gSt,
  nvi,
  ivi,
  svi,
  q0r,
  YIa,
  ovi,
  R0r,
  W0r,
  V0r,
  B0r = "opencode-cli",
  ZIa,
  eDa,
  tvi = (e, t) => e != null && e > t + eDa,
  a7 =
    (e = "Account service operation failed") =>
    (t) =>
      t.pipe(Zo((r) => tDa(r, e))),
  tDa = (e, t) => {
    if (e instanceof uHe || e instanceof Bbe) return e;
    if (S1e(e))
      switch (e.reason._tag) {
        case "TransportError":
          return Bbe.fromHttpClientError(e.reason);
        default:
          return new uHe({ message: t, cause: e });
      }
    return new uHe({ message: t, cause: e });
  },
  Wbe,
  Awc,
  rDa,
  avi;