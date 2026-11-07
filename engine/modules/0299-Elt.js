
function Elt(e) {
  if (e >= lon.length) throw TypeError(`Invalid character ${String.fromCharCode(e)}`);
  let t = lon[e];
  if (t === 255) throw TypeError(`Invalid character ${String.fromCharCode(e)}`);
  return t;
}