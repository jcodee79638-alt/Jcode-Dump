
function sva(e, t) {
  if (t === "image/gif" && e.length > 10 && String.fromCharCode(...e.subarray(0, 6)).match(/^GIF8[79]a$/))
    return { width: e[6] + e[7] * 256, height: e[8] + e[9] * 256 };
  if (
    t === "image/webp" &&
    e.length >= 30 &&
    String.fromCharCode(...e.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...e.subarray(8, 12)) === "WEBP"
  ) {
    let s = String.fromCharCode(...e.subarray(12, 16));
    if (s === "VP8X")
      return {
        width: 1 + e[24] + e[25] * 256 + e[26] * 65536,
        height: 1 + e[27] + e[28] * 256 + e[29] * 65536,
      };
    if (s === "VP8 " && e[23] === 157 && e[24] === 1 && e[25] === 42)
      return { width: (e[26] + e[27] * 256) & 16383, height: (e[28] + e[29] * 256) & 16383 };
    if (s === "VP8L" && e[20] === 47) {
      let a = new DataView(e.buffer, e.byteOffset + 21, 4).getUint32(0, !0);
      return { width: (a & 16383) + 1, height: ((a >>> 14) & 16383) + 1 };
    }
    throw Error("Invalid image");
  }
  if (t === "image/png") {
    if (
      e.length < 45 ||
      [137, 80, 78, 71, 13, 10, 26, 10].some((a, H) => e[H] !== a) ||
      e[12] !== 73 ||
      e[13] !== 72 ||
      e[14] !== 68 ||
      e[15] !== 82
    )
      throw Error("Invalid image");
    let s = new DataView(e.buffer, e.byteOffset, e.byteLength);
    return { width: s.getUint32(16), height: s.getUint32(20) };
  }
  if (t !== "image/jpeg" || e[0] !== 255 || e[1] !== 216 || e.at(-2) !== 255 || e.at(-1) !== 217)
    throw Error("Invalid image");
  let r = 2;
  for (let s = 0; s < 512 && r + 8 < e.length; s++) {
    if (e[r++] !== 255) throw Error("Invalid image");
    while (e[r] === 255) r++;
    let a = e[r++];
    if (a === 218 || a === 217) break;
    if (a === 1 || (a !== void 0 && a >= 208 && a <= 215)) continue;
    let H = e[r] * 256 + e[r + 1];
    if (H < 2 || r + H > e.length) throw Error("Invalid image");
    if (a === 192 || a === 194)
      return { height: e[r + 3] * 256 + e[r + 4], width: e[r + 5] * 256 + e[r + 6] };
    r += H;
  }
  throw Error("Invalid image");
}