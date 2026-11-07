
function e2s(e) {
  let t = new URL("file://"),
    r = Ccn(e);
  if (e.charCodeAt(e.length - 1) === ZFs && r[r.length - 1] !== "/") r += "/";
  return ((t.pathname = o2s(r)), Jt(t));
}