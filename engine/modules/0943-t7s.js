
function t7s(e) {
  let t = new RegExp(e, "g"),
    r = e + e,
    s = e + "." + e;
  return function (a) {
    return e + a.replace(t, r).replace(/\./g, s) + e;
  };
}