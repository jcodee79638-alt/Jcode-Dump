
function ATr(e) {
  if (MKe(e.response_format)) return !0;
  return e.tools?.some((t) => yLe(t) || (t.type === "function" && t.function.strict === !0)) ?? !1;
}