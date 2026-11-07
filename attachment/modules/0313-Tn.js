
function Tn(c) {
  let t = "";
  for (let e = 0; e < c.length; e += 8192) t += String.fromCharCode(...c.subarray(e, e + 8192));
  return btoa(t);
}