
function O_o() {
  let e = process.env.OPENCODE_LOG_LEVEL?.toUpperCase(),
    t = { DEBUG: "Debug", INFO: "Info", WARN: "Warn", ERROR: "Error" };
  return e && e in t ? t[e] : t.INFO;
}