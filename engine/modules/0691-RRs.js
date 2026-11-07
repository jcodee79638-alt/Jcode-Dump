
function RRs(e) {
  let t = new TextEncoder().encode(e),
    r = t.length,
    s = {};
  for (let a = 0; a < r; a++) {
    let H = t[a];
    if (s[H] === void 0) s[H] = [];
    s[H].push(a);
  }
  return {
    needle: t,
    needleLength: r,
    indexes: s,
    firstByte: t[0],
    previousChunk: void 0,
    previousChunkLength: 0,
    matchIndex: 0,
  };
}