
function rKs(e) {
  let t = e.length;
  return function (r) {
    let s = {};
    for (let a = 0; a < t; a++) s[e[a]] = r[a];
    return s;
  };
}