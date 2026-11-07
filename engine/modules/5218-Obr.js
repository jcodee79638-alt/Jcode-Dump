
function Obr(e, t, r) {
  return ft(function* () {
    let s = yield* r.status(),
      a = b4i.get(e);
    (yield* ja(
      Object.entries(a ?? {}).filter(([H]) => !Object.hasOwn(t, H)),
      ([H, u]) => r.add(H, { ...u, enabled: !1 }),
      { concurrency: "unbounded" },
    ),
      yield* ja(
        Object.entries(t).filter(([H, u]) => (a ? JSON.stringify(a[H]) !== JSON.stringify(u) : !s[H])),
        ([H, u]) => r.add(H, u),
        { concurrency: "unbounded" },
      ),
      b4i.set(e, structuredClone(t)));
  });
}