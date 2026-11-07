
function eDr(e) {
  if (e.type === "object" || (Array.isArray(e.type) && e.type.includes("object"))) {
    let { additionalProperties: r } = e;
    e.additionalProperties = r != null && typeof r !== "boolean" ? LHe(r) : !1;
    let { properties: s } = e;
    if (s != null) for (let a of Object.keys(s)) s[a] = LHe(s[a]);
  }
  if (e.items != null) e.items = Array.isArray(e.items) ? e.items.map(LHe) : LHe(e.items);
  if (e.anyOf != null) e.anyOf = e.anyOf.map(LHe);
  if (e.allOf != null) e.allOf = e.allOf.map(LHe);
  if (e.oneOf != null) e.oneOf = e.oneOf.map(LHe);
  let { definitions: t } = e;
  if (t != null) for (let r of Object.keys(t)) t[r] = LHe(t[r]);
  return e;
}