
function X1a(e) {
  if (e == null) return {};
  let t = {};
  if (e instanceof Headers)
    e.forEach((r, s) => {
      t[s.toLowerCase()] = r;
    });
  else {
    if (!Array.isArray(e)) e = Object.entries(e);
    for (let [r, s] of e) if (s != null) t[r.toLowerCase()] = s;
  }
  return t;
}