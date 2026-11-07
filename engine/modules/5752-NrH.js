
function NrH(e) {
  let t = e instanceof Request ? e.headers.get("sec-websocket-protocol") : e["sec-websocket-protocol"];
  if (!t) return [];
  return t
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);
}