
function V5e(e, t) {
  let r = new Headers(e != null ? e : {});
  for (let [s, a] of Object.entries(t)) if (!r.has(s)) r.set(s, a);
  return r;
}