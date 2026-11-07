
function hto(e) {
  if (e === null) return zv("FFI returned null pointer");
  let t = YG(e);
  if (!("success" in t)) return t;
  if (t.handlePtr === 0) return zv("fff_search_directories returned null search result");
  let r = G6(t.handlePtr),
    s = ha.u32(r, uto),
    a = ha.u32(r, lto),
    H = ha.u32(r, fto),
    u = pg(),
    f = [],
    d = [];
  for (let _ = 0; _ < s; _++) {
    let L = u.symbols.fff_dir_search_result_get_item(r, _);
    if (L !== null && L !== 0) f.push(_to(L));
    let I = u.symbols.fff_dir_search_result_get_score(r, _);
    if (I !== null && I !== 0) d.push(Fsr(I));
  }
  return (
    u.symbols.fff_free_dir_search_result(r),
    { ok: !0, value: { items: f, scores: d, totalMatched: a, totalDirs: H } }
  );
}