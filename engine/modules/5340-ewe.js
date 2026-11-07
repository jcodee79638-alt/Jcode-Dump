
var ewe = async (e) =>
    Y_.stat(e)
      .then(() => !0)
      .catch(() => !1),
  QLe = (e, t = {}) => lR(e, { ...t, nothrow: !0 }),
  CGa = (e, t = {}) => gjr(e, { ...t, nothrow: !0 }),
  em = (e, t) => async (r, s) => {
    if (t) {
      let u = _je({ targets: t, start: hc.dirname(r), stop: s.directory }),
        f = await u.next();
      if ((await u.return(), f.value)) return;
    }
    let a = _je({ targets: e, start: hc.dirname(r), stop: s.directory }),
      H = await a.next();
    if ((await a.return(), !H.value)) return s.directory;
    return hc.dirname(H.value);
  },
  gCt = (e, t) => async (r, s) => {
    if (t) {
      let u = _je({ targets: t, start: hc.dirname(r), stop: s.directory }),
        f = await u.next();
      if ((await u.return(), f.value)) return;
    }
    let a = _je({ targets: e, start: hc.dirname(r), stop: s.directory }),
      H = await a.next();
    if ((await a.return(), !H.value)) return;
    return hc.dirname(H.value);
  },
  wGa,
  kGa,
  OGa,
  UGa,
  NGa,
  FGa,
  BGa,
  RGa,
  WGa,
  VGa,
  qGa,
  GGa,
  XGa,
  JGa,
  Sjr,
  QGa,
  YGa,
  ZGa,
  e5a,
  t5a,
  r5a,
  i5a,
  s5a,
  o5a,
  a5a,
  H5a,
  c5a,
  A5a,
  u5a,
  l5a,
  f5a,
  p5a,
  d5a,
  m5a,
  _5a,
  h5a,
  L5a,
  $5a,
  g5a;