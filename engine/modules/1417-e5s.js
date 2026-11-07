
function e5s() {
  if (Ad.OPENCODE_DB) {
    if (Ad.OPENCODE_DB === ":memory:" || zGs(Ad.OPENCODE_DB)) return Ad.OPENCODE_DB;
    return jrr(uH.data, Ad.OPENCODE_DB);
  }
  if (
    ["latest", "beta", "prod"].includes(uV) ||
    process.env.OPENCODE_DISABLE_CHANNEL_DB === "1" ||
    process.env.OPENCODE_DISABLE_CHANNEL_DB === "true"
  )
    return jrr(uH.data, "opencode.db");
  return jrr(uH.data, `opencode-${uV.replace(/[^a-zA-Z0-9._-]/g, "-")}.db`);
}