
function Yer(e, t) {
  if (t.size === 0) return e;
  let r = new Map(),
    s = new Set(),
    a = [],
    H = (u, f = !1) => {
      let d = f ? u : (t.get(u.name) ?? u),
        _ = r.get(d);
      if (_ !== void 0 || r.has(d)) return _;
      if (s.has(d)) {
        let L = a.indexOf(d);
        throw Error(`Cycle detected in layer tree: ${[...a.slice(L), d].map((I) => I.name).join(" -> ")}`);
      }
      (s.add(d), a.push(d));
      try {
        let L = d.dependencies.map((D) => H(D)),
          I = L.every((D, S) => D === d.dependencies[S]) ? d : { ...d, dependencies: L };
        return (r.set(d, I), I);
      } finally {
        (a.pop(), s.delete(d));
      }
    };
  return H(e, !0);
}