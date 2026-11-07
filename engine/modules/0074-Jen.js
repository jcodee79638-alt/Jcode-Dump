
function Jen(e, t, r = Date.now()) {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(e) || (t !== void 0 && !g8s.test(t)))
    throw Error("Invalid task support identifier");
  if (
    (Uq.forEach((s, a) => {
      if (s.expiresAt <= r) Uq.delete(a);
    }),
    t === void 0)
  ) {
    Uq.delete(e);
    return;
  }
  if (Uq.size >= 1000 && !Uq.has(e)) throw Error("Task support limit reached");
  Uq.set(e, { id: t, expiresAt: r + 7200000 });
}