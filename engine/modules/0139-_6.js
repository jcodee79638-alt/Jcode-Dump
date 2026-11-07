
function _6(e) {
  let t = new WeakMap();
  return (r) => {
    if (t.has(r)) return t.get(r);
    let s = e(r);
    return (t.set(r, s), s);
  };
}