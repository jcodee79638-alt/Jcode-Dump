
function Lmn(e, t) {
  let s = new DataView(new ArrayBuffer(8));
  for (let a = 0; a < 8; a++) s.setUint8(a, e[t + a]);
  return s.getFloat64(0, !0);
}