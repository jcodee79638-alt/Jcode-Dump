
function dnH(e) {
  if (e.method === "GET" || e.method === "HEAD") return Qpe;
  if (e.source instanceof Request && e.source.body === null) return Qpe;
  let t = e.headers["content-length"];
  return Zpe(e.stream, e.headers["content-type"], t ? Number(t) : void 0);
}