
function mxa(e) {
  return typeof e == "string" || (typeof e == "object" && e !== null && Symbol.iterator in e);
}