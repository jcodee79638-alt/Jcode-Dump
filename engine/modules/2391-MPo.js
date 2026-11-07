
function MPo(e, t) {
  let r = yPo(e),
    s = [],
    a = r.entries(),
    H = a.next();
  while (!H.done) {
    let [u, f] = H.value,
      d = [],
      _ = f.values(),
      L = _.next();
    while (!L.done) {
      let S = L.value;
      if (S.length > 0) {
        let T = S.map((C) => EPo(C, t));
        d.push({
          scope: I5n(S[0].instrumentationScope),
          spans: T,
          schemaUrl: S[0].instrumentationScope.schemaUrl,
        });
      }
      L = _.next();
    }
    let I = E5n(u, t),
      D = { resource: I, scopeSpans: d, schemaUrl: I.schemaUrl };
    (s.push(D), (H = a.next()));
  }
  return s;
}