
function ho(c, t) {
  if (t === "image/gif" && c.length > 10 && String.fromCharCode(...c.subarray(0, 6)).match(/^GIF8[79]a$/))
    return { width: c[6] + c[7] * 256, height: c[8] + c[9] * 256 };
  if (
    t === "image/webp" &&
    c.length >= 30 &&
    String.fromCharCode(...c.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...c.subarray(8, 12)) === "WEBP"
  ) {
    const s = String.fromCharCode(...c.subarray(12, 16));
    if (s === "VP8X")
      return {
        width: 1 + c[24] + c[25] * 256 + c[26] * 65536,
        height: 1 + c[27] + c[28] * 256 + c[29] * 65536,
      };
    if (s === "VP8 " && c[23] === 157 && c[24] === 1 && c[25] === 42)
      return { width: (c[26] + c[27] * 256) & 16383, height: (c[28] + c[29] * 256) & 16383 };
    if (s === "VP8L" && c[20] === 47) {
      const i = new DataView(c.buffer, c.byteOffset + 21, 4).getUint32(0, !0);
      return { width: (i & 16383) + 1, height: ((i >>> 14) & 16383) + 1 };
    }
    throw new Error("Invalid image");
  }
  if (t === "image/png") {
    if (
      c.length < 45 ||
      [137, 80, 78, 71, 13, 10, 26, 10].some((i, n) => c[n] !== i) ||
      c[12] !== 73 ||
      c[13] !== 72 ||
      c[14] !== 68 ||
      c[15] !== 82
    )
      throw new Error("Invalid image");
    const s = new DataView(c.buffer, c.byteOffset, c.byteLength);
    return { width: s.getUint32(16), height: s.getUint32(20) };
  }
  if (t !== "image/jpeg" || c[0] !== 255 || c[1] !== 216 || c.at(-2) !== 255 || c.at(-1) !== 217)
    throw new Error("Invalid image");
  let e = 2;
  for (let s = 0; s < 512 && e + 8 < c.length; s++) {
    if (c[e++] !== 255) throw new Error("Invalid image");
    for (; c[e] === 255;) e++;
    const i = c[e++];
    if (i === 218 || i === 217) break;
    if (i === 1 || (i !== void 0 && i >= 208 && i <= 215)) continue;
    const n = c[e] * 256 + c[e + 1];
    if (n < 2 || e + n > c.length) throw new Error("Invalid image");
    if (i === 192 || i === 194)
      return { height: c[e + 3] * 256 + c[e + 4], width: c[e + 5] * 256 + c[e + 6] };
    e += n;
  }
  throw new Error("Invalid image");
}
de.workerSrc = ja;