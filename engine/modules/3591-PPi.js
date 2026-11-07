
function PPi(e, t) {
  return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...yA(t) });
}