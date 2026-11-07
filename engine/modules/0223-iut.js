
var iut = () => ({}),
  L2e = (e) => Object.keys(e).length === 0,
  POs,
  COs,
  vv,
  arn,
  wOs,
  kKt,
  $2e = (e) => Object.keys(e),
  kOs = (e) =>
    Wr(2, (t, r) => {
      for (let s of $2e(t)) if (!COs(r, s) || !e(t[s], r[s])) return !1;
      return !0;
    }),
  Hrn = (e) => {
    let t = kOs(e);
    return (r, s) => t(r, s) && t(s, r);
  };