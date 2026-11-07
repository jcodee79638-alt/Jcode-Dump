
function wtr(e) {
  let t = b7s(e),
    r = 0,
    s = t[r];
  r += 1;
  let a = new DataView(t.buffer),
    H = a.getUint32(r, s === 1);
  r += 4;
  let u;
  if (H & 536870912) ((u = a.getUint32(r, s === 1)), (r += 4));
  if ((H & 65535) === 1) {
    let f = Lmn(t, r);
    r += 8;
    let d = Lmn(t, r);
    return ((r += 8), { srid: u, point: [f, d] });
  }
  throw Error("Unsupported geometry type");
}