
function Wv(e, t) {
  if (Array.isArray(t)) {
    if (t.length === 0) return Zt`false`;
    return Zt`${e} in ${t.map((r) => LD(r, e))}`;
  }
  return Zt`${e} in ${LD(t, e)}`;
}