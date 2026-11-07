
function UAn(e, t, r, s) {
  let a = { ...r };
  if ((delete a.valid, r?.valid || e?.valid)) a.noInvalidDate = !0;
  if (t?.minimum !== void 0) {
    let H = s === void 0 ? t.minimum : s(t.minimum),
      u = t.exclusiveMinimum ? new globalThis.Date(H.getTime() + 1) : H;
    if (a.min === void 0 || u.getTime() > a.min.getTime()) a.min = u;
  }
  if (t?.maximum !== void 0) {
    let H = s === void 0 ? t.maximum : s(t.maximum),
      u = t.exclusiveMaximum ? new globalThis.Date(H.getTime() - 1) : H;
    if (a.max === void 0 || u.getTime() < a.max.getTime()) a.max = u;
  }
  return a;
}