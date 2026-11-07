
function gMa(e, t) {
  let r = { type: "object", properties: {} },
    s = [],
    a = e.shape();
  for (let u in a) {
    let f = a[u];
    if (f === void 0 || f._def === void 0) continue;
    let d = IMa(f),
      _ = YL(f._def, {
        ...t,
        currentPath: [...t.currentPath, "properties", u],
        propertyPath: [...t.currentPath, "properties", u],
      });
    if (_ === void 0) continue;
    if (((r.properties[u] = _), !d)) s.push(u);
  }
  if (s.length) r.required = s;
  let H = EMa(e, t);
  if (H !== void 0) r.additionalProperties = H;
  return r;
}