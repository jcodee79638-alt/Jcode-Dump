
function YG(e) {
  if (e === null) return zv("FFI returned null pointer");
  let t = ha.u8(e, FMn) !== 0,
    r = pg();
  if (!t) {
    let H = ha.ptr(e, BMn),
      u = by(H) || "Unknown error";
    return (r.symbols.fff_free_result(e), zv(u));
  }
  let s = ha.ptr(e, RMn),
    a = Number(ha.i64(e, meo));
  return (r.symbols.fff_free_result(e), { success: !0, handlePtr: s, intValue: a });
}