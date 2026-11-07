
function FPi(e, t, r) {
  let s = yA(r);
  return (s.abort ?? (s.abort = !0), new e({ type: "custom", check: "custom", fn: t, ...s }));
}