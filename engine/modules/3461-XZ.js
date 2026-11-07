
function XZ(e, t) {
  return t.map((r) => {
    var s;
    return ((s = r).path ?? (s.path = []), r.path.unshift(e), r);
  });
}