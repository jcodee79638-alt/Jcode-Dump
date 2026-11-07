
function sHe(e) {
  let t = W0a(e);
  if (t._tag === "Multipart") throw Error("Multipart is not supported in response");
  return t;
}