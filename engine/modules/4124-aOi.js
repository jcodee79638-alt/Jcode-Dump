
function aOi(e, t, r) {
  var s,
    a,
    H = new e(t[0]),
    u = 0;
  for (; ++u < t.length;) {
    if (((a = new e(t[u])), !a.s)) {
      H = a;
      break;
    }
    if (((s = H.cmp(a)), s === r || (s === 0 && H.s === r))) H = a;
  }
  return H;
}