
function m9(e) {
  if (e.allOf?.length === 1) {
    let [r] = e.allOf;
    return (delete e.allOf, m9({ ...e, ...r }));
  }
  if (ioH(e)) return { type: "object", properties: {} };
  let t = $wr(e.anyOf ?? e.oneOf);
  if (t) {
    let r = t.filter((s) => s.type !== "null");
    if (r.length === 1) return m9(r[0]);
    if (e.anyOf) e.anyOf = r.map(m9);
    if (e.oneOf) e.oneOf = r.map(m9);
  }
  if (e.allOf) {
    let r = e.allOf.map(m9);
    if (e.type) {
      delete e.allOf;
      for (let s of r) Object.assign(e, s);
    } else e.allOf = r;
  }
  if (e.prefixItems && e.items) delete e.prefixItems;
  if (e.items) e.items = m9(e.items);
  if (e.properties) for (let [r, s] of Object.entries(e.properties)) e.properties[r] = m9(s);
  if (e.additionalProperties && typeof e.additionalProperties === "object")
    e.additionalProperties = m9(e.additionalProperties);
  return e;
}