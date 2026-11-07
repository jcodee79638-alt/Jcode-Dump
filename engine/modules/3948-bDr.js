
function bDr(e, t) {
  if (e === void 0 && t === void 0) return;
  if (e === void 0) return t;
  if (t === void 0) return e;
  let r = { ...e };
  for (let s in t)
    if (Object.prototype.hasOwnProperty.call(t, s)) {
      let a = t[s];
      if (a === void 0) continue;
      let H = s in e ? e[s] : void 0,
        u =
          a !== null &&
          typeof a === "object" &&
          !Array.isArray(a) &&
          !(a instanceof Date) &&
          !(a instanceof RegExp),
        f =
          H !== null &&
          H !== void 0 &&
          typeof H === "object" &&
          !Array.isArray(H) &&
          !(H instanceof Date) &&
          !(H instanceof RegExp);
      if (u && f) r[s] = bDr(H, a);
      else r[s] = a;
    }
  return r;
}