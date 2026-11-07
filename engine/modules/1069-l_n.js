
function l_n(e, t = {}) {
  let { name: r, config: s } = Pf(e, t);
  if (s?.mode === "string") return new C4s(r, s.withTimezone ?? !1, s.precision);
  return new j4s(r, s?.withTimezone ?? !1, s?.precision);
}