
function IX(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/"),
    r = T1a(t);
  return Uint8Array.from(r, (s) => s.codePointAt(0));
}