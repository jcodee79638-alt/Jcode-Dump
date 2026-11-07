
function vNs(e) {
  let t = e.message;
  if (e.path && e.path.length > 0) {
    let r = GAt(e.path);
    t += `
  at ${r}`;
  }
  return t;
}