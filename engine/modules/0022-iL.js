
function iL(e, t = 4096) {
  if (typeof e !== "string" || e.length > t || e.includes("\x00")) throw Error("Invalid request.");
  return e;
}