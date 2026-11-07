
function b7s(e) {
  let t = [];
  for (let r = 0; r < e.length; r += 2) t.push(Number.parseInt(e.slice(r, r + 2), 16));
  return new Uint8Array(t);
}