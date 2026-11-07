
function b5s(e, t = {}) {
  if (!e) return [];
  let { max: r = D5s, maxLength: s = y5s, maxDepth: a = M5s, maxRewrites: H = x5s } = t;
  return (e.slice(0, 2) === "{}" && (e = "\\{\\}" + e.slice(2)), Krr(S5s(e), r, s, a, 0, H, !0).map(T5s));
}