
function A_n(e, t = {}) {
  let { name: r, config: s } = Pf(e, t);
  return new v4s(r, s.withTimezone ?? !1, s.precision);
}