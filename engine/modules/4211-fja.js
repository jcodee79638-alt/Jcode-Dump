
function fja(e) {
  let t = [],
    r = new Set(),
    s;
  for (let _ of e) {
    if ((t.push(_), s)) {
      if (_.info.id === s) break;
      continue;
    }
    if (_.info.role === "user" && r.has(_.info.id)) {
      let L = _.parts.find((I) => I.type === "compaction");
      if (!L) continue;
      if (!L.tail_start_id) break;
      if (((s = L.tail_start_id), _.info.id === s)) break;
      continue;
    }
    if (_.info.role === "user" && r.has(_.info.id) && _.parts.some((L) => L.type === "compaction")) break;
    if (_.info.role === "assistant" && _.info.summary && _.info.finish && !_.info.error)
      r.add(_.info.parentID);
  }
  t.reverse();
  let a = t.findLastIndex(
      (_) =>
        _.info.role === "user" && _.parts.some((L) => L.type === "compaction" && L.tail_start_id !== void 0),
    ),
    H = t[a],
    u = H?.parts.find((_) => _.type === "compaction" && _.tail_start_id !== void 0),
    f = H
      ? t.findIndex(
          (_, L) => L > a && _.info.role === "assistant" && _.info.summary && _.info.parentID === H.info.id,
        )
      : -1,
    d = u?.tail_start_id ? t.findIndex((_) => _.info.id === u.tail_start_id) : -1;
  if (d >= 0 && d < a && f > a) return [...t.slice(a, f + 1), ...t.slice(d, a), ...t.slice(f + 1)];
  return t;
}