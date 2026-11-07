
function Lga(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t];
    for (var s in r) if (r.hasOwnProperty(s)) e[s] = r[s];
  }
  return e;
}