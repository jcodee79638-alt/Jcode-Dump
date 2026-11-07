
function iSi(e, t) {
  var r = gga(e),
    s = $ga(t),
    a = Math.max(e.length - r.length, t.length - s.length),
    H = `

`.substring(0, a);
  return r + H + s;
}