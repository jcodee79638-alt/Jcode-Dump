
function wSa(e) {
  if (typeof e === "string") return e;
  if (e instanceof ArrayBuffer) return tje(new Uint8Array(e));
  return tje(e);
}