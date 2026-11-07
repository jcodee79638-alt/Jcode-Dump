
function fYe(e, t, r) {
  if (Array.isArray(e)) {
    for (let a of e) fYe(a, t, r);
    return;
  }
  if (!e || typeof e !== "object") return;
  let s = e;
  if (s.$ref === `#/components/schemas/${t}`) s.$ref = `#/components/schemas/${r}`;
  for (let a of Object.values(e)) fYe(a, t, r);
}