
function gga(e) {
  var t = e.length;
  while (
    t > 0 &&
    e[t - 1] ===
      `
`
  )
    t--;
  return e.substring(0, t);
}