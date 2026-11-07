
function c2s(e, t) {
  let r = e;
  for (let s of t) {
    if (r === null || r === void 0) return;
    if (Array.isArray(r)) {
      if (typeof s !== "number" || !Number.isInteger(s) || s < 0 || s >= r.length) return;
      r = r[s];
      continue;
    }
    if (Dv(r)) {
      if (typeof s !== "string") return;
      if (!Object.hasOwn(r, s)) return;
      r = r[s];
      continue;
    }
    return;
  }
  return A2s(r);
}