
function z0r(e) {
  if (Ihe(e)) return { ...e };
  if (Array.isArray(e)) return [...e];
  if (e instanceof Map) return new Map(e);
  if (e instanceof Set) return new Set(e);
  return e;
}