
function eTi(e) {
  let t = new WeakMap();
  return (r) => {
    let s = t.get(r.ast);
    if (s !== void 0) return s;
    let a = IEa.pipe(v$(r, OEa(e, r)));
    return (t.set(a.ast, a), a);
  };
}