
function JEr(e) {
  let t = [];
  for (let H of e) {
    if (typeof H !== "object" || H.type !== "object") return null;
    for (let u in H) if (!JPi.has(u)) return null;
    t.push(H);
  }
  let r = {},
    s = new Set();
  for (let H of t) {
    for (let u in H.properties) {
      if (Object.prototype.hasOwnProperty.call(r, u)) continue;
      let f = [];
      for (let _ of t) {
        let L = _.properties?.[u] ?? GPi(_);
        if (L === null || L === void 0) continue;
        if (!f.some((I) => JSON.stringify(I) === JSON.stringify(L))) f.push(L);
      }
      let d = f.length === 1 ? f[0] : (JEr(f) ?? { allOf: f });
      wN(r, u, d);
    }
    for (let u of H.required ?? []) s.add(u);
  }
  let a = { type: "object", properties: r };
  if (s.size) a.required = [...s];
  if (t.every((H) => H.additionalProperties === !1)) a.additionalProperties = !1;
  else {
    let H = [];
    for (let u of t) {
      let f = GPi(u);
      if (f && !H.some((d) => JSON.stringify(d) === JSON.stringify(f))) H.push(f);
    }
    if (H.length === 1) a.additionalProperties = H[0];
    else if (H.length > 1) a.additionalProperties = { allOf: H };
  }
  return a;
}