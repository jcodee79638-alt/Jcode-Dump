
function TSt(e) {
  let t = e.length;
  if (!lDa.test(e)) return t;
  let r = t;
  for (let s = 0; s < t - 1; s++)
    if ((e.charCodeAt(s) & 64512) === 55296 && (e.charCodeAt(s + 1) & 64512) === 56320) (r--, s++);
  return r;
}