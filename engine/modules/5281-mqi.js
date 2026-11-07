
function mqi(e) {
  if (e.length < 2) return e;
  let t = e[0],
    r = e[e.length - 1];
  if ((t === '"' || t === "'") && t === r) return e.slice(1, -1);
  return e;
}