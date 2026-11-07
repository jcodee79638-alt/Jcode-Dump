
var CBa,
  eWi = (e) => CBa.test(e),
  Pxr = (e) => ((Pxr = Array.isArray), Pxr(e)),
  Cxr,
  nWi = (e, t) => {
    if (typeof t !== "number" || !Number.isInteger(t)) throw new Cu(`${e} must be an integer`);
    if (t < 0) throw new Cu(`${e} must be a positive integer`);
    return t;
  },
  Ejt = (e) => {
    try {
      return JSON.parse(e);
    } catch (t) {
      return;
    }
  };