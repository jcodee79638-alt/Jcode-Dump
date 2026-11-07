
function ITa({ originalMessages: e, responseMessageId: t }) {
  if (e == null) return;
  let r = e[e.length - 1];
  return (r == null ? void 0 : r.role) === "assistant" ? r.id : typeof t === "function" ? t() : t;
}