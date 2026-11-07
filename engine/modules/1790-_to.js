
function _to(e) {
  let t = G6(e);
  return {
    relativePath: by(ha.ptr(t, pto)) ?? "",
    dirName: by(ha.ptr(t, dto)) ?? "",
    maxAccessFrecency: ha.i32(t, mto),
  };
}