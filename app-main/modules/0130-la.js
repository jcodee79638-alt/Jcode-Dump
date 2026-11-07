
function la(e, t) {
  if (t === "image/gif" && e.length > 10 && String.fromCharCode(...e.subarray(0, 6)).match(/^GIF8[79]a$/))
    return { width: e[6] + e[7] * 256, height: e[8] + e[9] * 256 };
  if (
    t === "image/webp" &&
    e.length >= 30 &&
    String.fromCharCode(...e.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...e.subarray(8, 12)) === "WEBP"
  ) {
    let i = String.fromCharCode(...e.subarray(12, 16));
    if (i === "VP8X")
      return {
        width: 1 + e[24] + e[25] * 256 + e[26] * 65536,
        height: 1 + e[27] + e[28] * 256 + e[29] * 65536,
      };
    if (i === "VP8 " && e[23] === 157 && e[24] === 1 && e[25] === 42)
      return { width: (e[26] + e[27] * 256) & 16383, height: (e[28] + e[29] * 256) & 16383 };
    if (i === "VP8L" && e[20] === 47) {
      let r = new DataView(e.buffer, e.byteOffset + 21, 4).getUint32(0, !0);
      return { width: (r & 16383) + 1, height: ((r >>> 14) & 16383) + 1 };
    }
    throw Error("Invalid image");
  }
  if (t === "image/png") {
    if (
      e.length < 45 ||
      [137, 80, 78, 71, 13, 10, 26, 10].some((r, s) => e[s] !== r) ||
      e[12] !== 73 ||
      e[13] !== 72 ||
      e[14] !== 68 ||
      e[15] !== 82
    )
      throw Error("Invalid image");
    let i = new DataView(e.buffer, e.byteOffset, e.byteLength);
    return { width: i.getUint32(16), height: i.getUint32(20) };
  }
  if (t !== "image/jpeg" || e[0] !== 255 || e[1] !== 216 || e.at(-2) !== 255 || e.at(-1) !== 217)
    throw Error("Invalid image");
  let n = 2;
  for (let i = 0; i < 512 && n + 8 < e.length; i++) {
    if (e[n++] !== 255) throw Error("Invalid image");
    while (e[n] === 255) n++;
    let r = e[n++];
    if (r === 218 || r === 217) break;
    if (r === 1 || (r !== void 0 && r >= 208 && r <= 215)) continue;
    let s = e[n] * 256 + e[n + 1];
    if (s < 2 || n + s > e.length) throw Error("Invalid image");
    if (r === 192 || r === 194)
      return { height: e[n + 3] * 256 + e[n + 4], width: e[n + 5] * 256 + e[n + 6] };
    n += s;
  }
  throw Error("Invalid image");
}