
function VrH(e) {
  if (e.method === "GET" || e.method === "HEAD") return Qpe;
  let t = e.headers["content-length"];
  return Zpe(e.stream, e.headers["content-type"], t === void 0 ? void 0 : Number(t));
}