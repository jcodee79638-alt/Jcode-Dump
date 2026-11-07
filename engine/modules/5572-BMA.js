
var BMA,
  EQa,
  IQa,
  Tzi,
  DQa,
  yQa,
  RMA,
  UPr = (e, t, r) => {
    if (t !== void 0 && (!Number.isSafeInteger(t) || t < r))
      throw RangeError(`${e} must be a safe integer greater than or equal to ${r}.`);
    return t;
  },
  MQa = (e) => ({
    timeoutMs: UPr("timeoutMs", e?.timeoutMs, 1),
    maxToolCalls: UPr("maxToolCalls", e?.maxToolCalls, 0),
    maxOutputBytes: UPr("maxOutputBytes", e?.maxOutputBytes, 0),
  }),
  vzi = (e = {}) => {
    let t = e.tools ?? {};
    oQa(t);
    let r = MQa(e.limits),
      s = aQa(t, e.discovery?.catalogBudget);
    return {
      catalog: () => s.catalog,
      instructions: () => s.instructions,
      execute: (a) => xzi({ ...e, code: a }, r, s.searchIndex),
    };
  };