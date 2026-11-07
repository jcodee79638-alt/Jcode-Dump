
function nKs(e, t) {
  let r = 1;
  while (t < e.length) {
    if ((t++, e[t] === "\\")) {
      t++;
      continue;
    }
    if (e[t] === ")") r--;
    else if (e[t] === "(") r++;
    if (!r) return t;
  }
  throw TypeError('Invalid regexp expression in "' + e + '"');
}