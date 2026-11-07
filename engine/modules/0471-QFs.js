
function QFs(e, t) {
  let r = t.dir || t.root,
    s = t.base || (t.name || "") + (t.ext || "");
  if (!r) return s;
  if (r === t.root) return r + s;
  return r + e + s;
}