
function Kjr(e, t) {
  var r = 65536;
  for (var s = 0; s < t.length; s += 2) {
    if (((r += t[s]), r > e)) return !1;
    if (((r += t[s + 1]), r >= e)) return !0;
  }
  return !1;
}