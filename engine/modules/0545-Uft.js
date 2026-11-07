
function Uft(e, t) {
  let r = t;
  for (let s = e.length - 1; s >= 0; s--) {
    let { container: a, token: H } = e[s];
    if (Array.isArray(a)) {
      let u = a.slice();
      ((u[H] = r), (r = u));
    } else {
      let u = { ...a };
      ((u[H] = r), (r = u));
    }
  }
  return r;
}