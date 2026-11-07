
function Uzi(e, t) {
  let r = [...t].sort((a, H) => H.length - a.length),
    s = new Map();
  for (let a of Object.keys(e).sort((H, u) => H.localeCompare(u))) {
    let H = r.find((d) => a.startsWith(d + "_")) ?? (a.includes("_") ? a.slice(0, a.indexOf("_")) : a),
      u = H && a.startsWith(H + "_") ? a.slice(H.length + 1) : a,
      f = { path: `${H}.${u}`, key: a, server: H, local: u, tool: e[a] };
    s.set(H, [...(s.get(H) ?? []), f]);
  }
  return s;
}