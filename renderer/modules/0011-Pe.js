
function Pe(e, n, i) {
  i = i ? Object.assign({}, Nn, i) : Nn;
  const s = Er(e, n, !0, 0);
  return (
    (s.observers = null),
    (s.observerSlots = null),
    (s.comparator = i.equals || void 0),
    mn(s),
    fi.bind(s)
  );
}