
function Z0r(e) {
  let t = [];
  for (let r of e ?? []) {
    let s = r._zod.def;
    if (!/_(length|size)$|_equals$/.test(s.check)) break;
    let a = s.maximum ?? s.length ?? s.size;
    if (a >= 0) t.push([a, r]);
  }
  return t;
}