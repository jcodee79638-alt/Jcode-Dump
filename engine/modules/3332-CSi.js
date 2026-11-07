
var CSi = "~effect/httpapi/HttpApi",
  Y0a,
  phe = (e) => {
    function t() {}
    return (Object.setPrototypeOf(t, Y0a), (t.groups = e.groups), (t.annotations = e.annotations), t);
  },
  kE = (e) => phe({ identifier: e, groups: new Map(), annotations: Hg() }),
  kSi = (e, t) => {
    let r = Object.values(e.groups);
    for (let s of r) {
      let a = _I(e.annotations, s.annotations);
      t.onGroup({ group: s, mergedAnnotations: a });
      let H = Object.values(s.endpoints);
      for (let u of H) {
        if (t.predicate && !t.predicate({ endpoint: u, group: s })) continue;
        t.onEndpoint({
          group: s,
          endpoint: u,
          middleware: u.middlewares,
          mergedAnnotations: _I(a, u.annotations),
          successes: wSi(jbe(u), PZ),
          errors: wSi(Pbe(u), bbe),
        });
      }
    }
  },
  wSi = (e, t) => {
    let r = new Map();
    return (e.forEach(s), r);
    function s(a) {
      if (vN(a)) return;
      let H = a.ast,
        u = t(H),
        f = r.get(u);
      if (f === void 0) r.set(u, [a]);
      else f.push(a);
    }
  },
  Zxt;