
function qDa(e, t) {
  let r = e.buckets.get(t);
  if (!r) ((r = new WeakMap()), e.buckets.set(t, r));
  return r;
}