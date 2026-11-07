
var wRe,
  jpt = (e, t) => {
    let r = wRe.get(e.source),
      s = r ? (a, H) => Hi(r(a, H), (u) => t(a, u)) : t;
    wRe.set(e.source, s);
  };