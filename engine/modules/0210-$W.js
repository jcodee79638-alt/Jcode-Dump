
var $W,
  MKt,
  Ytn,
  ZAt = (e) => Wr(2, (t, r) => e(t, r) === -1),
  tpe = (e) => Wr(2, (t, r) => e(t, r) === 1),
  A2e = (e) => Wr(2, (t, r) => e(t, r) !== 1),
  u2e = (e) => Wr(2, (t, r) => e(t, r) !== -1),
  xKt = (e) => Wr(2, (t, r) => (t === r || e(t, r) < 1 ? t : r)),
  SKt = (e) => Wr(2, (t, r) => (t === r || e(t, r) > -1 ? t : r));