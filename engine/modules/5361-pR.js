
function pR(e) {
  if (e.charCodeAt(0) !== U5i) return { bom: !1, text: e };
  return { bom: !0, text: e.slice(1) };
}