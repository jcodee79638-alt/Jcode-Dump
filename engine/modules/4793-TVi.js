
function TVi(e) {
  let t = 0;
  for (let a of e) t += a.length;
  let r = new Uint8Array(t),
    s = 0;
  for (let a of e) (r.set(a, s), (s += a.length));
  return r;
}