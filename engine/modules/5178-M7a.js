
function M7a(e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let s = e[r];
    if (s.info.role !== "user") continue;
    if (s.parts.some((a) => a.type === "compaction")) continue;
    t.push({ start: r, end: e.length, id: s.info.id });
  }
  for (let r = 0; r < t.length - 1; r++) t[r].end = t[r + 1].start;
  return t;
}