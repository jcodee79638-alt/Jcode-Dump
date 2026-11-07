
function Tr({ src: c, srcPos: t = 0, dest: e, destPos: s = 0, width: i, height: n }) {
  let r = 0;
  const a = i * n * 3,
    o = a >> 2,
    l = new Uint32Array(c.buffer, t, o),
    h = j.isLittleEndian ? 4278190080 : 255;
  if (j.isLittleEndian) {
    for (; r < o - 2; r += 3, s += 4) {
      const d = l[r],
        u = l[r + 1],
        f = l[r + 2];
      ((e[s] = d | h),
        (e[s + 1] = (d >>> 24) | (u << 8) | h),
        (e[s + 2] = (u >>> 16) | (f << 16) | h),
        (e[s + 3] = (f >>> 8) | h));
    }
    for (let d = t + r * 4, u = t + a; d < u; d += 3) e[s++] = c[d] | (c[d + 1] << 8) | (c[d + 2] << 16) | h;
  } else {
    for (; r < o - 2; r += 3, s += 4) {
      const d = l[r],
        u = l[r + 1],
        f = l[r + 2];
      ((e[s] = d | h),
        (e[s + 1] = (d << 24) | (u >>> 8) | h),
        (e[s + 2] = (u << 16) | (f >>> 16) | h),
        (e[s + 3] = (f << 8) | h));
    }
    for (let d = t + r * 4, u = t + a; d < u; d += 3)
      e[s++] = (c[d] << 24) | (c[d + 1] << 16) | (c[d + 2] << 8) | h;
  }
  return { srcPos: t + a, destPos: s };
}