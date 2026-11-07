
function yT(e) {
  let t = e.logger,
    r = e.logLevel ?? "off";
  if (!t) return BBa;
  let s = _Wi.get(t);
  if (s && s[0] === r) return s[1];
  let a = {
    error: Djt("error", t, r),
    warn: Djt("warn", t, r),
    info: Djt("info", t, r),
    debug: Djt("debug", t, r),
  };
  return (_Wi.set(t, [r, a]), a);
}