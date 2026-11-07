
function Pto(e) {
  if (e === null) return zv("FFI returned null pointer");
  let t = YG(e);
  if (!("success" in t)) return t;
  if (t.handlePtr === 0) return zv("fff_search_mixed returned null search result");
  let r = G6(t.handlePtr),
    s = ha.u32(r, Lto),
    a = ha.u32(r, $to),
    H = ha.u32(r, gto),
    u = ha.u32(r, Eto),
    f = ha.u8(r, Ito),
    d;
  if (f === 1) d = { type: "line", line: ha.i32(r, Usr) };
  else if (f === 2) d = { type: "position", line: ha.i32(r, Usr), col: ha.i32(r, wMn) };
  else if (f === 3)
    d = {
      type: "range",
      start: { line: ha.i32(r, Usr), col: ha.i32(r, wMn) },
      end: { line: ha.i32(r, Dto), col: ha.i32(r, yto) },
    };
  let _ = pg(),
    L = [],
    I = [];
  for (let S = 0; S < s; S++) {
    let T = _.symbols.fff_mixed_search_result_get_item(r, S);
    if (T !== null && T !== 0) L.push(jto(T));
    let C = _.symbols.fff_mixed_search_result_get_score(r, S);
    if (C !== null && C !== 0) I.push(Fsr(C));
  }
  _.symbols.fff_free_mixed_search_result(r);
  let D = { items: L, scores: I, totalMatched: a, totalFiles: H, totalDirs: u };
  if (d) D.location = d;
  return { ok: !0, value: D };
}