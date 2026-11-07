
function N1a(e) {
  let t = new Headers(e);
  for (let r of U1a) t.delete(r);
  return t;
}