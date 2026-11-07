
function Wd(e, t) {
  let { name: r, config: s } = Pf(e, t);
  if (s?.mode === "timestamp" || s?.mode === "timestamp_ms") return new nhn(r, s.mode);
  if (s?.mode === "boolean") return new shn(r, s.mode);
  return new thn(r);
}