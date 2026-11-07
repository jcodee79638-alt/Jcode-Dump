
function i4i(e) {
  for (let t of e) {
    if (!Array.isArray(t.content)) continue;
    for (let r of t.content) if (r.type === "tool-call" || r.type === "tool-result") return !0;
  }
  return !1;
}