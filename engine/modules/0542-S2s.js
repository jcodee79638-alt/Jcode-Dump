
function S2s(e, t, r) {
  if (t === "") return r;
  let s = pAn(e, t);
  if (s === null) throw Error(`Cannot add at "${t}" (parent not found or not a container).`);
  let { lastToken: a, parent: H, stack: u } = s;
  if (Array.isArray(H)) {
    let f = a === "-" ? H.length : pZt(a);
    if (f < 0 || f > H.length) throw Error(`Array index out of bounds at "${t}".`);
    let d = H.slice();
    return (d.splice(f, 0, r), Uft(u, d));
  }
  if (fAn(H)) {
    let f = { ...H };
    return ((f[a] = r), Uft(u, f));
  }
  throw Error(`Cannot add at "${t}" (parent not found or not a container).`);
}