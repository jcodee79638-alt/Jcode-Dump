
var gKs,
  REn = (e) => ({ type: "text", text: e }),
  nWe,
  EKs,
  IKs,
  WEn = (e) =>
    K_(e) &&
    (e.type === "text" || e.type === "json" || e.type === "error" || e.type === "content") &&
    "value" in e,
  kde,
  _V,
  DKs = (e) => {
    if (typeof e === "string") return e;
    try {
      return JSON.stringify(e) ?? String(e);
    } catch {
      return String(e);
    }
  },
  iWe,
  Ode,
  yKs,
  MKs,
  fg,
  Wj,
  dV,
  xKs,
  mV;