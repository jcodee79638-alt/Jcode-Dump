
function Z1e(e, t) {
  if (Array.isArray(t)) {
    if (t.length === 0) return Zt`true`;
    return Zt`${e} not in ${t.map((r) => LD(r, e))}`;
  }
  return Zt`${e} not in ${LD(t, e)}`;
}