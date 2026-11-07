
function BSt(e, t, r, s, a, H) {
  let u = r in s,
    f = H === "optional";
  if (!u && f && a === "optional") return;
  if (e.issues.length) {
    if (a !== void 0 && f && !u) return;
    t.issues.push(...XZ(r, e.issues));
  }
  if (!u && a === void 0) {
    if (!e.issues.length)
      t.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [r] });
    return;
  }
  if (e.value === void 0) {
    if (u || (a === "defaulted" && !f)) t.value[r] = void 0;
  } else t.value[r] = e.value;
}