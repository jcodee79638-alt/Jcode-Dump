
var FRa,
  sVi = (e) => FRa.test(e),
  vP = (e) => ((vP = Array.isArray), vP(e)),
  NSr,
  aVi = (e, t) => {
    if (typeof t !== "number" || !Number.isInteger(t)) throw new bc(`${e} must be an integer`);
    if (t < 0) throw new bc(`${e} must be a positive integer`);
    return t;
  },
  HVi = (e) => {
    try {
      return JSON.parse(e);
    } catch (t) {
      return;
    }
  };