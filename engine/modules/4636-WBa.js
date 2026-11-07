
async function* WBa(e) {
  let t = new Uint8Array();
  for await (let r of e) {
    if (r == null) continue;
    let s = r instanceof ArrayBuffer ? new Uint8Array(r) : typeof r === "string" ? dJe(r) : r,
      a = new Uint8Array(t.length + s.length);
    (a.set(t), a.set(s, t.length), (t = a));
    let H;
    while ((H = mWi(t)) !== -1) (yield t.slice(0, H), (t = t.slice(H)));
  }
  if (t.length > 0) yield t;
}