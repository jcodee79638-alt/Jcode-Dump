
var HRe,
  Jie,
  _Zt,
  kv,
  xAn,
  Kie,
  cd,
  nw,
  be,
  iw,
  I1e,
  k2s,
  Wft,
  e0,
  PH,
  O2s,
  U2s,
  re,
  Aa,
  Vi,
  N2s,
  LZt,
  On,
  F2s,
  J0,
  w6,
  XW,
  KW,
  EAn = "^\\S[\\s\\S]*\\S$|^\\S$|^$",
  cRe,
  gZt,
  pG,
  zie,
  EZt,
  PAn,
  tBs = (e) => (e?.includeStack === !0 ? 1 : 0) | (e?.excludeCause === !0 ? 2 : 0),
  rBs = (e) => {
    switch (e) {
      case 0:
        return;
      case 1:
        return { includeStack: !0 };
      case 2:
        return { excludeCause: !0 };
      case 3:
        return { includeStack: !0, excludeCause: !0 };
    }
  },
  DAn,
  iLH,
  nBs,
  iBs,
  sBs,
  sLH,
  uRe,
  oBs,
  aBs,
  oLH,
  aLH,
  mo,
  DI,
  O6,
  HBs,
  cBs,
  ABs,
  NAn,
  uBs,
  lBs,
  Pa = (e) => (t, r) => {
    let s = Gft(t) ? t : nt(t);
    return IZt(oQt, e, s, r, (a) => ({
      toString() {
        return `${a}(${af({ ...this })})`;
      },
    }));
  },
  A2 = (e) => (t, r, s) => {
    let a = Gft(r) ? r.mapFields((H) => ({ _tag: Vc(t), ...H }), { unsafePreserveChecks: !0 }) : bAn(t, r);
    return Pa(e ?? t)(a, s);
  },
  $y = (e) => (t, r) => {
    let s = Gft(t) ? t : nt(t);
    return IZt(o2e, e, s, r, (H) => ({ name: H }));
  },
  ki = (e) => (t, r, s) => {
    let a = Gft(r) ? r.mapFields((H) => ({ _tag: Vc(t), ...H }), { unsafePreserveChecks: !0 }) : bAn(t, r);
    return $y(e ?? t)(a, s);
  },
  RAn,
  hBs,
  LBs,
  $Bs,
  VAn,
  gBs,
  qAn,
  yAn = "~effect/Schema/SERIALIZER_ENSURE_ARRAY",
  GAn,
  Qie,
  IBs;