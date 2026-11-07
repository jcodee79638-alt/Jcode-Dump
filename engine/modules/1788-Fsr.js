
function Fsr(e) {
  let t = G6(e);
  return {
    total: ha.i32(t, Zeo),
    baseScore: ha.i32(t, eto),
    filenameBonus: ha.i32(t, tto),
    specialFilenameBonus: ha.i32(t, rto),
    frecencyBoost: ha.i32(t, nto),
    distancePenalty: ha.i32(t, ito),
    currentFilePenalty: ha.i32(t, sto),
    comboMatchBoost: ha.i32(t, oto),
    exactMatch: ha.u8(t, ato) !== 0,
    matchType: by(ha.ptr(t, Hto)) ?? "",
  };
}