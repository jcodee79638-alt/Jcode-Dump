
function F8s(e, t, r) {
  if (!r) return Ltn(KJt[e], t);
  if (!r.startsWith(KJt[e])) throw Error(`ID ${r} does not start with ${KJt[e]}`);
  return r;
}