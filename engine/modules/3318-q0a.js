
function q0a(e, t, r) {
  let s = new Map();
  if (e === void 0) return s;
  let a = Array.isArray(e) ? e : GW(e) ? [e] : [nt(e).pipe(ySi())],
    H = r ? Za : Q0a;
  for (let u of a) {
    let f = o0r(u.ast, t),
      d = s.get(f.contentType);
    if (d) {
      if (d.encoding._tag !== f._tag)
        throw Error(`Multiple payload encodings for content-type: ${f.contentType}`);
      if (d.encoding._tag === "Multipart")
        throw Error(`Multiple multipart payloads for content-type: ${f.contentType}`);
      d.schemas.push(H(u, t));
    } else s.set(f.contentType, { encoding: f, schemas: [H(u, t)] });
  }
  return s;
}