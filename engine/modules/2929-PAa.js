
function PAa(e, t, r) {
  if (r.startsWith("~/")) return rMt.join(t, r.slice(2));
  return rMt.isAbsolute(r) ? r : rMt.resolve(e, r);
}