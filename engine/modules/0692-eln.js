
function eln(e, t, r) {
  let s = RRs(e);
  if (r !== void 0) ((s.previousChunk = r), (s.previousChunkLength = r.length));
  function a() {
    if ("Buffer" in globalThis && !("Bun" in globalThis || "Deno" in globalThis))
      return function (_, L, I) {
        return Buffer.prototype.indexOf.call(_, L, I);
      };
    let d = new Uint8Array(256).fill(s.needle.length);
    for (let _ = 0, L = s.needle.length - 1; _ < L; ++_) d[s.needle[_]] = L - _;
    return function (_, L, I) {
      let D = _.length,
        S = I + s.needleLength - 1;
      while (S < D) {
        for (let T = s.needleLength - 1, C = S; T >= 0 && _[C] === L[T]; T--, C--) if (T === 0) return C;
        S += d[_[S]];
      }
      return -1;
    };
  }
  let H = a();
  function u(d) {
    let _ = d.length;
    if (s.previousChunk !== void 0) {
      let I = new Uint8Array(s.previousChunkLength + _);
      (I.set(s.previousChunk),
        I.set(d, s.previousChunkLength),
        (d = I),
        (_ = s.previousChunkLength + _),
        (s.previousChunk = void 0));
    }
    if (_ < s.needleLength) {
      ((s.previousChunk = d), (s.previousChunkLength = _));
      return;
    }
    let L = 0;
    while (L < _) {
      let I = H(d, s.needle, L);
      if (I > -1) {
        if (I > L) t(s.matchIndex, d.subarray(L, I));
        ((s.matchIndex += 1), (L = I + s.needleLength));
        continue;
      } else if (d[_ - 1] in s.indexes) {
        let D = s.indexes[d[_ - 1]],
          S = -1;
        for (let T = 0, C = D.length; T < C; T++) {
          let O = D[T];
          if (d[_ - 1 - O] === s.firstByte && T > S) S = O;
        }
        if (S === -1)
          if (L === 0) t(s.matchIndex, d);
          else t(s.matchIndex, d.subarray(L));
        else {
          if (_ - 1 - S > L) t(s.matchIndex, d.subarray(L, _ - 1 - S));
          ((s.previousChunk = d.subarray(_ - 1 - S)), (s.previousChunkLength = S + 1));
        }
      } else if (L === 0) t(s.matchIndex, d);
      else t(s.matchIndex, d.subarray(L));
      break;
    }
  }
  function f() {
    if (s.previousChunk !== void 0 && s.previousChunk !== r) t(s.matchIndex, s.previousChunk);
    ((s.previousChunk = r), (s.previousChunkLength = r?.length ?? 0), (s.matchIndex = 0));
  }
  return { write: u, end: f };
}