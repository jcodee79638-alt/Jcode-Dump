
function pro(e) {
  let t = G6(e),
    r = ha.ptr(t, Uto),
    s = ha.u32(t, Kto),
    a = [];
  for (let _ = 0; _ < s; _++) {
    let L = r + _ * fro,
      I = G6(L);
    a.push([ha.u32(I, uro), ha.u32(I, lro)]);
  }
  let H = ha.u8(t, Zto) !== 0,
    u = ha.u32(t, zto),
    f = ha.u32(t, Qto),
    d = {
      relativePath: by(ha.ptr(t, Cto)) ?? "",
      fileName: by(ha.ptr(t, wto)) ?? "",
      gitStatus: by(ha.ptr(t, kto)) ?? "",
      lineContent: by(ha.ptr(t, Oto)) ?? "",
      size: Number(ha.u64(t, Bto)),
      modified: Number(ha.u64(t, Rto)),
      totalFrecencyScore: Number(ha.i64(t, Wto)),
      accessFrecencyScore: Number(ha.i64(t, Vto)),
      modificationFrecencyScore: Number(ha.i64(t, qto)),
      isBinary: ha.u8(t, ero) !== 0,
      lineNumber: Number(ha.u64(t, Gto)),
      col: ha.u32(t, Jto),
      byteOffset: Number(ha.u64(t, Xto)),
      matchRanges: a,
    };
  if (H) d.fuzzyScore = ha.u16(t, Yto);
  if (u > 0) d.contextBefore = NMn(ha.ptr(t, Nto), u);
  if (f > 0) d.contextAfter = NMn(ha.ptr(t, Fto), f);
  if (ha.u8(t, tro) !== 0) d.isDefinition = !0;
  return d;
}