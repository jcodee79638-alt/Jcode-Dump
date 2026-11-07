
function xe(c, t, e, s = 0) {
  const { decoder: i } = cr;
  for (let r = 0; r < e; r++) s += t.getUint32(s) + 4;
  const n = t.getUint32(s);
  return i.decode(new Uint8Array(c, s + 4, n));
}