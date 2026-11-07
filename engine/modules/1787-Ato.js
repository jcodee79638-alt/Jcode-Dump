
function Ato(e) {
  let t = G6(e);
  return {
    relativePath: by(ha.ptr(t, Veo)) ?? "",
    fileName: by(ha.ptr(t, qeo)) ?? "",
    gitStatus: by(ha.ptr(t, Geo)) ?? "",
    size: Number(ha.u64(t, Xeo)),
    modified: Number(ha.u64(t, Jeo)),
    accessFrecencyScore: Number(ha.i64(t, Keo)),
    modificationFrecencyScore: Number(ha.i64(t, zeo)),
    totalFrecencyScore: Number(ha.i64(t, Qeo)),
  };
}