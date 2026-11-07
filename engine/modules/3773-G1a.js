
function G1a(e) {
  let t = new Set(),
    r = e;
  while (r instanceof Error && !t.has(r)) {
    t.add(r);
    let s = r;
    if (typeof s.code === "string" && q1a.has(s.code)) return s;
    r = r.cause;
  }
  return;
}