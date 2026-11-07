
var WFa = 30000,
  TRi = 1000,
  VFa,
  mPe = (e) => e.replace(/[^a-zA-Z0-9_-]/g, "_"),
  vRi = (e, t) => mPe(e) + "_" + mPe(t);