
function h4a(e) {
  for (let t = e.length; t > 0; t--) {
    let r = e.slice(0, t).join(" "),
      s = L4a[r];
    if (s !== void 0) return e.slice(0, s);
  }
  if (e.length === 0) return [];
  return e.slice(0, 1);
}