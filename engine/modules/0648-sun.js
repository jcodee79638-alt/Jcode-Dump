
var sun,
  LRe,
  rpt = (e) => Object.assign(Object.create(LRe), e),
  kBs,
  FU,
  SE = (e) => {
    if (e === void 0) return FU;
    else if (Symbol.iterator in e) {
      let r = Object.create(LRe);
      for (let [s, a] of e) r[s.toLowerCase()] = a;
      return r;
    }
    let t = Object.create(LRe);
    for (let [r, s] of Object.entries(e))
      if (Array.isArray(s)) t[r.toLowerCase()] = s.join(", ");
      else if (s !== void 0) t[r.toLowerCase()] = s;
    return t;
  },
  BU = (e) => Object.setPrototypeOf(e, LRe),
  mG,
  $Re,
  KQ,
  M1e,
  Yie,
  x1e;