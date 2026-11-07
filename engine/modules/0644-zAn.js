
var zAn = "~effect/http/Cookies",
  QAn = "~effect/http/Cookies/Cookie",
  bBs,
  jBs = (e) => {
    let t = Object.create(bBs);
    return ((t.cookies = e), t);
  },
  ZAn = (e) => {
    let t = {};
    for (let r of e) t[r.name] = r;
    return jBs(t);
  },
  MZt = (e) => {
    let t = typeof e === "string" ? [e] : e,
      r = [];
    for (let s of t) {
      let a = PBs(s.trim());
      if (a) r.push(a);
    }
    return ZAn(r);
  },
  zft,
  Qft = (e) => L2e(e.cookies),
  CBs,
  YAn,
  Yft = (e) => Object.values(e.cookies).map(wBs),
  eun = (e) => {
    try {
      return decodeURIComponent(e);
    } catch (t) {
      return e;
    }
  };