
function WVi(e, t) {
  if (!e || !("tools" in e) || !e.tools) return !1;
  let r = e.tools?.find((s) => yKe(s) && s.function?.name === t.function.name);
  return yKe(r) && (yLe(r) || r?.function.strict || !1);
}