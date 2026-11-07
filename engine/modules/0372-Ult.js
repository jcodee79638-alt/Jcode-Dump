
function Ult(e, t) {
  let r = QNs(t),
    s = e === null ? "null" : Array.isArray(e) ? "array" : typeof e;
  if (r.bySentinel) {
    let a = r.otherwise?.[s] ?? [];
    if (s === "object" || s === "array") {
      for (let [H, u] of r.bySentinel)
        if (Object.hasOwn(e, H)) {
          let f = u.get(e[H]);
          if (f) return [...f, ...a].filter(Zon(e));
        }
    }
    return a;
  }
  return (r.byType?.[s] ?? []).filter(Zon(e));
}