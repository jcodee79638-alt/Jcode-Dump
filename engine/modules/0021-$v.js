
function $v(e) {
  if (!e || typeof e !== "object" || Array.isArray(e)) throw Error("Invalid request.");
  return e;
}