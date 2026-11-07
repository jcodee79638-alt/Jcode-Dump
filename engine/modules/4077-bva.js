
function bva(e) {
  return typeof e === "object" && e !== null && "code" in e && e.code === "ENOENT";
}