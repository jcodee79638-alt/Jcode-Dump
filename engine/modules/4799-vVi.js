
function vVi(e) {
  for (let s = 0; s < e.length - 1; s++) {
    if (e[s] === 10 && e[s + 1] === 10) return s + 2;
    if (e[s] === 13 && e[s + 1] === 13) return s + 2;
    if (e[s] === 13 && e[s + 1] === 10 && s + 3 < e.length && e[s + 2] === 13 && e[s + 3] === 10)
      return s + 4;
  }
  return -1;
}