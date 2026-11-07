
function PQt(e, t) {
  if (xNs(t)) return t;
  if (typeof t === "string") return new hy(Lo(e), { message: t });
  let r = typeof t.issue === "string" ? new hy(Lo(e), { message: t.issue }) : t.issue;
  return new v6(t.path, r);
}