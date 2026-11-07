
function EPi(e, t) {
  return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...yA(t) });
}