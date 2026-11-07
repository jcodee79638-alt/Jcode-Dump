
function lMa(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    if (!uMa.has(e[r])) t += "\\";
    t += e[r];
  }
  return t;
}