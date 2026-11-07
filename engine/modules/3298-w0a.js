
function w0a(e) {
  let t = typeof e === "string" ? C0a[e] : e;
  return (r) => r.annotate({ httpApiStatus: t });
}