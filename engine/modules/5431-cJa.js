
function cJa(e, t = { exa: !1, parallel: !1 }) {
  let r = process.env.OPENCODE_WEBSEARCH_PROVIDER;
  if (r === "exa" || r === "parallel") return r;
  if (t.parallel) return "parallel";
  if (t.exa) return "exa";
  return Number.parseInt(Jxt(e) ?? "0", 36) % 2 === 0 ? "exa" : "parallel";
}