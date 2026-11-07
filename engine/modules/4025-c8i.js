
function c8i(e, t) {
  let r = JTt(Object.keys(e), t);
  return Object.fromEntries(Object.entries(e).filter(([s]) => !r.has(s)));
}