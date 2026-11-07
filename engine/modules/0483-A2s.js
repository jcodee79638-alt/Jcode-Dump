
function A2s(e) {
  if (e === void 0 || e === null) return;
  if (typeof e === "string") return gft(e);
  if (typeof e === "number" || typeof e === "boolean" || typeof e === "bigint") return gft(String(e));
  if (Array.isArray(e)) return Ocn(e.length);
  if (Dv(e)) return kcn(new Set(Object.keys(e)));
  return gft(af(e));
}