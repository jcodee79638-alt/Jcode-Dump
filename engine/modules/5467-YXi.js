
function YXi(e, t, r) {
  if (r === void 0) r = e.length;
  for (var s = t; s < r; s++) {
    var a = e.charCodeAt(s);
    if (swe(a)) return s < r - 1 && a === 13 && e.charCodeAt(s + 1) === 10 ? s + 2 : s + 1;
  }
  return -1;
}