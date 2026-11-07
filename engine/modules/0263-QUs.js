
function QUs() {
  if (arguments.length === 1) {
    let r = arguments[0];
    return function (s) {
      return r[s._tag](s);
    };
  }
  let e = arguments[0];
  return arguments[1][e._tag](e);
}