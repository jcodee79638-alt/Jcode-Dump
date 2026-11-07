
function X0a(e, t) {
  if (e === void 0) return new Set();
  let r = Rq(e);
  for (let s of r) if (vN(s)) throw Error("Streaming schemas are not supported in error responses");
  return new Set(t ? r : r.map(PSi));
}