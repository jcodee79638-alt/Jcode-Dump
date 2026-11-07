
function jes(e) {
  let t = e.get(qCr);
  if (!t) return;
  let r;
  try {
    r = JSON.parse(t);
  } catch {
    return;
  }
  if (!r || typeof r !== "object") return;
  return Object.fromEntries(
    Object.entries(r).filter((s) => typeof s[0] === "string" && Number.isInteger(s[1])),
  );
}