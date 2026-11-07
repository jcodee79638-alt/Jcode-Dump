
function YL(e, t, r = !1) {
  var s;
  let a = t.seen.get(e);
  if (t.override) {
    let d = (s = t.override) == null ? void 0 : s.call(t, e, t, a, r);
    if (d !== Y1a) return d;
  }
  if (a && !r) {
    let d = CMa(a, t);
    if (d !== void 0) return d;
  }
  let H = { def: e, path: t.currentPath, jsonSchema: void 0 };
  t.seen.set(e, H);
  let u = jMa(e, e.typeName, t),
    f = typeof u === "function" ? YL(u(), t) : u;
  if (f) wMa(e, t, f);
  if (t.postProcess) {
    let d = t.postProcess(f, e, t);
    return ((H.jsonSchema = f), d);
  }
  return ((H.jsonSchema = f), f);
}