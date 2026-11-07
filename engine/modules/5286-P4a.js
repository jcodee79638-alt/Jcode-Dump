
function P4a(e) {
  let t = e.match(/^([A-Za-z]+)::(.*)$/);
  if (t) {
    if (t[1].toLowerCase() !== "filesystem") return;
    return t[2];
  }
  let r = e.match(/^([A-Za-z]+):(.*)$/);
  if (!r) return e;
  if (r[1].length === 1) return e;
  return;
}