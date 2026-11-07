
function fb(e) {
  var t,
    r,
    s,
    a = e.length - 1,
    H = "",
    u = e[0];
  if (a > 0) {
    H += u;
    for (t = 1; t < a; t++) {
      if (((s = e[t] + ""), (r = Cl - s.length), r)) H += yHe(r);
      H += s;
    }
    if (((u = e[t]), (s = u + ""), (r = Cl - s.length), r)) H += yHe(r);
  } else if (u === 0) return "0";
  for (; u % 10 === 0;) u /= 10;
  return H + u;
}