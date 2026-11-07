
function kN(...e) {
  let t = {};
  for (let r of e) {
    let s = Object.getOwnPropertyDescriptors(r);
    Object.assign(t, s);
  }
  return Object.defineProperties({}, t);
}