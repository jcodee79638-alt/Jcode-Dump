
function p0a(e, t = { enableExa: !1, enableParallel: !1 }, r) {
  if (r) return r;
  if (t.enableParallel) return "parallel";
  if (t.enableExa) return "exa";
  return Number.parseInt(Jxt(e) ?? "0", 36) % 2 === 0 ? "exa" : "parallel";
}