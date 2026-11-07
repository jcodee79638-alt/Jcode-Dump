
function BVi(e) {
  return e.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent);
}