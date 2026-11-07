
function IPi(e, t) {
  return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...yA(t) });
}