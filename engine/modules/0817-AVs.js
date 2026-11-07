
function AVs(e, t) {
  if (t.kind !== "unbound") throw Error(`Cannot check non-unbound layer node: ${t.name}`);
  return etr(e, (r, s) => {
    if (r === t) return !0;
    return r.dependencies.some(s.visit);
  });
}