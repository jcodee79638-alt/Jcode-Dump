
function Gye(e, t) {
  let r = !1,
    s = Array(e.length);
  for (let a = 0; a < e.length; a++) {
    let H = e[a],
      u = t(H);
    if (u !== H) r = !0;
    s[a] = u;
  }
  return r ? s : e;
}