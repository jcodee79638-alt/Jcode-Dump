
function f2s(e, t, r) {
  let s = r.map(String).join("_"),
    a = t[s],
    H = p2s(e, r),
    u = H?.children ? Object.keys(H.children) : [];
  if (u.length === 0) return a === void 0 ? void 0 : gft(a);
  if (u.every((d) => l2s.test(d))) {
    let d = Math.max(...u.map((_) => parseInt(_, 10))) + 1;
    return Ocn(d, a);
  }
  return kcn(new Set(u), a);
}