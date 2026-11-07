
function nl() {
  let e,
    n = 0;
  const i = new Set(),
    s = new Map();
  return {
    get epoch() {
      return n;
    },
    setOwner(l) {
      return e === l ? !1 : ((e = l), n++, i.clear(), s.clear(), !0);
    },
    acknowledge(l) {
      (i.add(l), s.delete(l));
    },
    receive(l, a = Date.now()) {
      return (
        l.filter((c) => !i.has(c.id) && c.expiresAt > a).forEach((c) => s.set(c.id, c)),
        Array.from(s)
          .filter(([, c]) => c.expiresAt <= a)
          .forEach(([c]) => s.delete(c)),
        Array.from(s.values())
      );
    },
  };
}