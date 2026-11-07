
function Ihe(e) {
  if (Vbe(e) === !1) return !1;
  let t = e.constructor;
  if (t === void 0) return !0;
  if (typeof t !== "function") return !0;
  let r = t.prototype;
  if (Vbe(r) === !1) return !1;
  if (Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1) return !1;
  return !0;
}