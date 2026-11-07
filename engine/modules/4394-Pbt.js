
function Pbt(e, t, r, s, a = 0) {
  let H = WBi(s, t),
    u = s.status === 307 || s.status === 308 || (r?.method ?? "GET").toUpperCase() === "GET";
  if (!H || a === j9a || !u) return;
  let f = new URL(t);
  if (((H.username || H.password) && (H.username !== f.username || H.password !== f.password)) || !C9a(f, H))
    return;
  return Promise.resolve(s.body?.cancel())
    .then(() => e(H, { ...r, redirect: "manual" }))
    .then((_) => Pbt(e, H, r, _, a + 1) ?? _);
}