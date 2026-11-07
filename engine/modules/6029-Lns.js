
function Lns(e) {
  if (typeof e === "string") return e;
  try {
    return OoH.decode(e instanceof ArrayBuffer ? new Uint8Array(e) : e);
  } catch {
    return;
  }
}