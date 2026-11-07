
function D7a(e) {
  let t = new Map();
  for (let r = 0; r < e.length; r++) {
    let s = e[r];
    if (s.info.role !== "user") continue;
    if (!s.parts.some((a) => a.type === "compaction")) continue;
    t.set(s.info.id, r);
  }
  return e.flatMap((r, s) => {
    if (r.info.role !== "assistant") return [];
    if (!r.info.summary || !r.info.finish || r.info.error) return [];
    let a = t.get(r.info.parentID);
    if (a === void 0) return [];
    return [{ userIndex: a, assistantIndex: s, summary: I7a(r) }];
  });
}