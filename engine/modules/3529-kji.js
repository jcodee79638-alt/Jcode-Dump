
function kji(e, t, r, s, a, H, u) {
  let f = [],
    d = a.keySet,
    _ = a.catchall._zod,
    L = _.def.type,
    { optin: I, optout: D } = _,
    S = 0;
  for (let T in t) {
    if (u && r.issues.length !== S) {
      if (_X(r, S)) break;
      S = r.issues.length;
    }
    if (d.has(T)) continue;
    if (T === "__proto__") {
      if (L === "never") f.push(T);
      continue;
    }
    if (L === "never") {
      f.push(T);
      continue;
    }
    let C = _.run({ value: t[T], issues: [] }, s);
    if (C instanceof Promise) e.push(C.then((O) => BSt(O, r, T, t, I, D)));
    else BSt(C, r, T, t, I, D);
  }
  if (f.length) r.issues.push({ code: "unrecognized_keys", keys: f, input: t, inst: H, continue: !0 });
  if (!e.length) return r;
  return Promise.all(e).then(() => r);
}