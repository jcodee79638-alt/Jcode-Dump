
function qrH(e) {
  let t = new Headers(e);
  return (t.delete("content-encoding"), t.delete("content-length"), t.delete("transfer-encoding"), t);
}