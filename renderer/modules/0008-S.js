
function S(e, n) {
  n = n ? Object.assign({}, Nn, n) : Nn;
  const i = { value: e, observers: null, observerSlots: null, comparator: n.equals || void 0 },
    s = (l) => (typeof l == "function" && (l = l(i.value)), vi(i, l));
  return [fi.bind(i), s];
}