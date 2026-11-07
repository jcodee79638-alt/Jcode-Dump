
function qn(e, t) {
  let n = [...(e.events ?? [])],
    i = n.findIndex((r) => r.id === t.id);
  if (i >= 0 && n[i].status !== "running") return e;
  if (i >= 0 && t.status === "running") return e;
  if (i >= 0) n[i] = structuredClone(t);
  if (i < 0 && n.length < 500) n.push(structuredClone(t));
  if (i < 0 && n.length >= 500 && ["completed", "interrupted", "cancelled"].includes(t.kind))
    n[n.length - 1] = structuredClone(t);
  return { ...e, events: n, truncated: e.truncated || (i < 0 && (e.events?.length ?? 0) >= 500) };
}