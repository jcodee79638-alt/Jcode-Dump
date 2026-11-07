
function $2s(e, t) {
  let r = {};
  for (let s of Reflect.ownKeys(e)) {
    if (!Object.prototype.propertyIsEnumerable.call(e, s)) continue;
    let a = t(s, e[s]);
    if (a) {
      let [H, u] = a;
      r[H] = u;
    }
  }
  return r;
}