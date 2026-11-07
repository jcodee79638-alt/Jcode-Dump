
function etr(e, t, r = {}) {
  let s = r.cache ?? new Map(),
    a = new Set(),
    H = [],
    u = (f) => {
      let d = r.resolve?.(f) ?? f,
        _ = s.get(d);
      if (_ !== void 0 || s.has(d)) return _;
      if (r.detectCycles !== !1 && a.has(d)) {
        let L = H.indexOf(d);
        throw Error(`Cycle detected in layer tree: ${[...H.slice(L), d].map((I) => I.name).join(" -> ")}`);
      }
      (a.add(d), H.push(d));
      try {
        let L = t(d, { cache: s, visit: u });
        if (!s.has(d)) s.set(d, L);
        return L;
      } finally {
        (H.pop(), a.delete(d));
      }
    };
  return u(e);
}