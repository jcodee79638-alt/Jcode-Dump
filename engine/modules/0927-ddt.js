
function ddt(e, t) {
  if (Array.isArray(t)) {
    if (t.length === 0) throw Error("arrayContains requires at least one value");
    let r = LD(t, e);
    return Zt`${e} @> ${Zt`${Array.isArray(r) ? new My(r) : r}`}`;
  }
  return Zt`${e} @> ${LD(t, e)}`;
}