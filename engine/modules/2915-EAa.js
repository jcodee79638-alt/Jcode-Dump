
function EAa(e) {
  if (!g0i) return e;
  return Array.from(e, (t) => (g0i.has(t) || t.charCodeAt(0) < 32 ? "_" : t)).join("");
}