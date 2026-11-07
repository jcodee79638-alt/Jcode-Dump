
function hde(e, t) {
  let r = Object.keys(e),
    s = Object.keys(t);
  if (r.length !== s.length) return !1;
  for (let [a, H] of r.entries()) if (H !== s[a]) return !1;
  return !0;
}