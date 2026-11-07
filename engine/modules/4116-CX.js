
function CX(e, t, r) {
  if (!e.isFinite()) return HOi(e);
  var s,
    a = e.e,
    H = fb(e.d),
    u = H.length;
  if (t) {
    if (r && (s = r - u) > 0) H = H.charAt(0) + "." + H.slice(1) + yHe(s);
    else if (u > 1) H = H.charAt(0) + "." + H.slice(1);
    H = H + (e.e < 0 ? "e" : "e+") + e.e;
  } else if (a < 0) {
    if (((H = "0." + yHe(-a - 1) + H), r && (s = r - u) > 0)) H += yHe(s);
  } else if (a >= u) {
    if (((H += yHe(a + 1 - u)), r && (s = r - a - 1) > 0)) H = H + "." + yHe(s);
  } else {
    if ((s = a + 1) < u) H = H.slice(0, s) + "." + H.slice(s);
    if (r && (s = r - u) > 0) {
      if (a + 1 === u) H += ".";
      H += yHe(s);
    }
  }
  return H;
}