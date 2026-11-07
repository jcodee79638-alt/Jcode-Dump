
function tFa(e, t) {
  return !e || (!e.ok && e.status < 500 && t !== "/");
}