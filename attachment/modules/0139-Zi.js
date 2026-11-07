
function Zi({
  src: c,
  srcPos: t = 0,
  dest: e,
  width: s,
  height: i,
  nonBlackColor: n = 4294967295,
  inverseDecode: r = !1,
}) {
  const a = j.isLittleEndian ? 4278190080 : 255,
    [o, l] = r ? [n, a] : [a, n],
    h = s >> 3,
    d = s & 7,
    u = o ^ l,
    f = c.length;
  e = new Uint32Array(e.buffer);
  let p = 0;
  for (let g = 0; g < i; ++g) {
    for (const b = t + h; t < b; ++t, p += 8) {
      const y = c[t];
      ((e[p] = o ^ (-((y >> 7) & 1) & u)),
        (e[p + 1] = o ^ (-((y >> 6) & 1) & u)),
        (e[p + 2] = o ^ (-((y >> 5) & 1) & u)),
        (e[p + 3] = o ^ (-((y >> 4) & 1) & u)),
        (e[p + 4] = o ^ (-((y >> 3) & 1) & u)),
        (e[p + 5] = o ^ (-((y >> 2) & 1) & u)),
        (e[p + 6] = o ^ (-((y >> 1) & 1) & u)),
        (e[p + 7] = o ^ (-(y & 1) & u)));
    }
    if (d === 0) continue;
    const m = t < f ? c[t++] : 255;
    for (let b = 0; b < d; ++b, ++p) e[p] = o ^ (-((m >> (7 - b)) & 1) & u);
  }
  return { srcPos: t, destPos: p };
}