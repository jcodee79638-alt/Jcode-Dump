
function Xi(c, t, e) {
  for (const s of e) t.addEventListener(s, c[s].bind(c));
}