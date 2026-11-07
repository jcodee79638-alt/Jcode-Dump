
function uAn(e, t, r, s) {
  if (t === "") {
    if (s === "remove" || r === void 0) throw Error("Unsupported operation at the root");
    return r;
  }
  let a = pAn(e, t);
  if (a === null) throw Error(`Cannot ${s} at "${t}" (parent not found or not a container).`);
  let { lastToken: H, parent: u, stack: f } = a;
  if (Array.isArray(u)) {
    if (H === "-") throw Error(`"-" is not valid for ${s} at "${t}".`);
    let d = pZt(H);
    if (d < 0 || d >= u.length) throw Error(`Array index out of bounds at "${t}".`);
    let _ = u.slice();
    if (s === "remove") _.splice(d, 1);
    else _[d] = r;
    return Uft(f, _);
  }
  if (fAn(u)) {
    if (!Object.hasOwn(u, H)) throw Error(`Property "${H}" does not exist at "${t}".`);
    let d = { ...u };
    if (s === "remove") delete d[H];
    else d[H] = r;
    return Uft(f, d);
  }
  throw Error(`Cannot ${s} at "${t}" (parent not found or not a container).`);
}