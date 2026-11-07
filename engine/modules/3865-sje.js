
function sje(e, t, r) {
  let s = e.length - t.length;
  if (s === 0) return e(...t);
  if (s === 1) return ski(e, t, r);
  throw Error("Wrong number of arguments");
}