
function yPo(e) {
  let t = new Map();
  for (let r of e) {
    let s = t.get(r.resource);
    if (!s) ((s = new Map()), t.set(r.resource, s));
    let a = `${r.instrumentationScope.name}@${r.instrumentationScope.version || ""}:${r.instrumentationScope.schemaUrl || ""}`,
      H = s.get(a);
    if (!H) ((H = []), s.set(a, H));
    H.push(r);
  }
  return t;
}