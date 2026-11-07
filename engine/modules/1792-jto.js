
function jto(e) {
  let t = G6(e);
  if (ha.u8(t, Mto) === 1)
    return {
      type: "directory",
      item: {
        relativePath: by(ha.ptr(t, kMn)) ?? "",
        dirName: by(ha.ptr(t, OMn)) ?? "",
        maxAccessFrecency: Number(ha.i64(t, UMn)),
      },
    };
  return {
    type: "file",
    item: {
      relativePath: by(ha.ptr(t, kMn)) ?? "",
      fileName: by(ha.ptr(t, OMn)) ?? "",
      gitStatus: by(ha.ptr(t, xto)) ?? "",
      size: Number(ha.u64(t, Sto)),
      modified: Number(ha.u64(t, Tto)),
      accessFrecencyScore: Number(ha.i64(t, UMn)),
      modificationFrecencyScore: Number(ha.i64(t, vto)),
      totalFrecencyScore: Number(ha.i64(t, bto)),
    },
  };
}