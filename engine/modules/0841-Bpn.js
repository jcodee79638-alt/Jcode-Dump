
function Bpn(e) {
  let t = Object.freeze({
    get size() {
      return e.size;
    },
    entries: () => e.entries(),
    forEach: (r, s) => e.forEach((a, H) => r.call(s, a, H, t)),
    get: (r) => e.get(r),
    has: (r) => e.has(r),
    keys: () => e.keys(),
    values: () => e.values(),
    [Symbol.iterator]: () => e[Symbol.iterator](),
  });
  return t;
}