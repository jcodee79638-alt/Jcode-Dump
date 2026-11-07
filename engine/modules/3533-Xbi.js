
function Xbi(e, t, r) {
  let s = new Map(),
    a,
    H = new Map(),
    u = (_, L) => {
      let I;
      if (_.code === "unrecognized_keys" && !_.path?.length) (a ?? (a = _), (I = _.keys));
      else if (_.code === "invalid_key" && _.origin === "record" && _.path?.length === 1) {
        let D = String(_.path[0]);
        if (!H.has(D)) H.set(D, _);
        I = [D];
      } else return !1;
      for (let D of I) {
        if (!s.has(D)) s.set(D, {});
        s.get(D)[L] = !0;
      }
      return !0;
    };
  for (let _ of t.issues) if (!u(_, "l")) e.issues.push(_);
  for (let _ of r.issues) if (!u(_, "r")) e.issues.push(_);
  let f = [...s].filter(([, _]) => _.l && _.r).map(([_]) => _);
  if (f.length) {
    let _ = a ? f.filter((L) => a.keys.includes(L)) : [];
    if (_.length) e.issues.push({ ...a, keys: _ });
    for (let L of f) if (!_.includes(L) && H.has(L)) e.issues.push(H.get(L));
  }
  let d = mEr(t.value, r.value);
  if (!d.valid) {
    if (_X(e)) return e;
    throw Error(`Unmergable intersection. Error path: ${JSON.stringify(d.mergeErrorPath)}`);
  }
  return ((e.value = d.data), e);
}