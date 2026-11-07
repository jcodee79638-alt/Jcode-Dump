
function* ZBa(e) {
  if (!e) return;
  if (IWi in e) {
    let { values: s, nulls: a } = e;
    yield* s.entries();
    for (let H of a) yield [H, null];
    return;
  }
  let t = !1,
    r;
  if (e instanceof Headers) r = e.entries();
  else if (Cxr(e)) r = e;
  else ((t = !0), (r = Object.entries(e ?? {})));
  for (let s of r) {
    let a = s[0];
    if (typeof a !== "string") throw TypeError("expected header name to be a string");
    let H = Cxr(s[1]) ? s[1] : [s[1]],
      u = !1;
    for (let f of H) {
      if (f === void 0) continue;
      if (t && !u) ((u = !0), yield [a, null]);
      yield [a, f];
    }
  }
}