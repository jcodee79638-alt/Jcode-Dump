
function _c(e, n) {
  if (n === "image/gif" && e.length > 10 && String.fromCharCode(...e.subarray(0, 6)).match(/^GIF8[79]a$/))
    return { width: e[6] + e[7] * 256, height: e[8] + e[9] * 256 };
  if (
    n === "image/webp" &&
    e.length >= 30 &&
    String.fromCharCode(...e.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...e.subarray(8, 12)) === "WEBP"
  ) {
    const s = String.fromCharCode(...e.subarray(12, 16));
    if (s === "VP8X")
      return {
        width: 1 + e[24] + e[25] * 256 + e[26] * 65536,
        height: 1 + e[27] + e[28] * 256 + e[29] * 65536,
      };
    if (s === "VP8 " && e[23] === 157 && e[24] === 1 && e[25] === 42)
      return { width: (e[26] + e[27] * 256) & 16383, height: (e[28] + e[29] * 256) & 16383 };
    if (s === "VP8L" && e[20] === 47) {
      const l = new DataView(e.buffer, e.byteOffset + 21, 4).getUint32(0, !0);
      return { width: (l & 16383) + 1, height: ((l >>> 14) & 16383) + 1 };
    }
    throw new Error("Invalid image");
  }
  if (n === "image/png") {
    if (
      e.length < 45 ||
      [137, 80, 78, 71, 13, 10, 26, 10].some((l, a) => e[a] !== l) ||
      e[12] !== 73 ||
      e[13] !== 72 ||
      e[14] !== 68 ||
      e[15] !== 82
    )
      throw new Error("Invalid image");
    const s = new DataView(e.buffer, e.byteOffset, e.byteLength);
    return { width: s.getUint32(16), height: s.getUint32(20) };
  }
  if (n !== "image/jpeg" || e[0] !== 255 || e[1] !== 216 || e.at(-2) !== 255 || e.at(-1) !== 217)
    throw new Error("Invalid image");
  let i = 2;
  for (let s = 0; s < 512 && i + 8 < e.length; s++) {
    if (e[i++] !== 255) throw new Error("Invalid image");
    for (; e[i] === 255;) i++;
    const l = e[i++];
    if (l === 218 || l === 217) break;
    if (l === 1 || (l !== void 0 && l >= 208 && l <= 215)) continue;
    const a = e[i] * 256 + e[i + 1];
    if (a < 2 || i + a > e.length) throw new Error("Invalid image");
    if (l === 192 || l === 194)
      return { height: e[i + 3] * 256 + e[i + 4], width: e[i + 5] * 256 + e[i + 6] };
    i += a;
  }
  throw new Error("Invalid image");
}