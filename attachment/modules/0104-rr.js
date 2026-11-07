
function rr(c) {
  const t = c[0];
  if (c.length < 2 || (t !== '"' && t !== "'") || c.at(-1) !== t) return !1;
  const e = c.length - 1;
  for (let s = 1; s < e; s++) {
    const i = c[s];
    if (i === t || xi.test(i) || (i === "\\" && (++s >= e || xi.test(c[s])))) return !1;
  }
  return !0;
}