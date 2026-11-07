
function taH(e) {
  if (!e) return;
  let t = e.toLowerCase();
  if (t.includes("gzip")) return "gzip";
  if (t.includes("deflate")) return "deflate";
  return;
}