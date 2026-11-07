
function _mn(e, t, r) {
  for (let s = t; s < e.length; s++) {
    let a = e[s];
    if (a === "\\") {
      s++;
      continue;
    }
    if (a === '"') return [e.slice(t, s).replace(/\\/g, ""), s + 1];
    if (r) continue;
    if (a === "," || a === "}") return [e.slice(t, s).replace(/\\/g, ""), s];
  }
  return [e.slice(t).replace(/\\/g, ""), e.length];
}