
var IMr,
  lRi = (e) => {
    throw TypeError(e);
  },
  jMr = (e, t, r) => t.has(e) || lRi("Cannot " + r),
  dm = (e, t, r) => (jMr(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
  dx = (e, t, r) =>
    t.has(e)
      ? lRi("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, r),
  BE = (e, t, r, s) => (jMr(e, t, "write to private field"), t.set(e, r), r),
  hee = (e, t, r) => (jMr(e, t, "access private method"), r),
  Q8,
  eLe,
  iPe,
  Kbt,
  zbt,
  qXe,
  aPe,
  GXe,
  nce,
  sPe,
  HPe,
  oPe,
  WXe,
  I7,
  yMr,
  MMr,
  xMr,
  uRi,
  SMr,
  TMr,
  VXe,
  vMr,
  bMr,
  cPe;