
function V4i(e) {
  let t = $n.getValue(e, "i32"),
    r = $n.getValue((e += lu), "i32"),
    s = $n.getValue((e += lu), "i32");
  return { major_version: t, minor_version: r, patch_version: s };
}