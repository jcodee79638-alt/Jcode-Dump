
function khn(e) {
  if (!e) return !1;
  try {
    return Function("input", '"use strict"; return input;')(!0) === !0;
  } catch {
    return !1;
  }
}