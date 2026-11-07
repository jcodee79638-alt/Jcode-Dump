
function z_n(e) {
  let t = "";
  for (let r = 0; r < e.length; r += 2) {
    let s = e.slice(r, r + 2),
      a = Number.parseInt(s, 16);
    t += String.fromCodePoint(a);
  }
  return t;
}