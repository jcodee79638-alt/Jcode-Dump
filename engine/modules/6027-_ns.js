
function _ns(e) {
  let t = koH.encode(JSON.stringify({ cursor: e })),
    r = new Uint8Array(t.length + 1);
  return ((r[0] = 0), r.set(t, 1), r);
}