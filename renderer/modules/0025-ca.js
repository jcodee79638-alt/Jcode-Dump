
function ca(e) {
  let n,
    i = 0;
  for (n = 0; n < e.length; n++) {
    const s = e[n];
    s.user ? (e[i++] = s) : On(s);
  }
  for (n = 0; n < i; n++) On(e[n]);
}