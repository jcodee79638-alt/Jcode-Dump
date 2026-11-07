
function YAa(e, t) {
  if (!t) return e;
  let r = Jhr(t),
    [s, ...a] = e,
    [H, ...u] = r,
    f = (L) => `${L.tier?.type ?? "base"}:${L.tier?.size ?? 0}`,
    d = (L, I) => ({ ...L, ...I, tier: I.tier ?? L.tier, cache: { ...L.cache, ...I.cache } }),
    _ = new Map(a.map((L) => [f(L), L]));
  for (let L of u) {
    let I = _.get(f(L));
    _.set(f(L), I ? d(I, L) : L);
  }
  return [d(s ?? { input: 0, output: 0, cache: { read: 0, write: 0 } }, H), ..._.values()];
}