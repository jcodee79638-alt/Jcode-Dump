
function noH(e) {
  let t = e.components?.schemas;
  if (!t) return;
  let r = new Set();
  for (let [H, u] of Object.entries(t)) if (u.$ref === `#/components/schemas/${H}`) r.add(H);
  if (r.size === 0) return;
  for (let [, H] of Object.entries(t))
    for (let u of H.anyOf ?? H.oneOf ?? []) {
      let f = u.$ref?.replace("#/components/schemas/", "");
      if (!f || !r.has(f)) continue;
    }
  let a = oSt(_wr).components?.schemas;
  if (!a) return;
  for (let H of r) if (a[H]) t[H] = a[H];
}