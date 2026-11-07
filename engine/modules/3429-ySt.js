
function ySt(e) {
  let t = e.startsWith("^") ? 1 : 0,
    r = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, r);
}