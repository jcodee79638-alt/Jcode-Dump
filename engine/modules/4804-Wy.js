
function Wy(e) {
  let t = e.logger,
    r = e.logLevel ?? "off";
  if (!t) return KRa;
  let s = jVi.get(t);
  if (s && s[0] === r) return s[1];
  let a = {
    error: uPt("error", t, r),
    warn: uPt("warn", t, r),
    info: uPt("info", t, r),
    debug: uPt("debug", t, r),
  };
  return (jVi.set(t, [r, a]), a);
}