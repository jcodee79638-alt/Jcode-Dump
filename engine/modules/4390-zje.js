
function zje(e) {
  if (!e) return {};
  if (e instanceof Headers) return Object.fromEntries(e.entries());
  if (Array.isArray(e)) return Object.fromEntries(e);
  return { ...e };
}