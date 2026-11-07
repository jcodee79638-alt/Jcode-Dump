
function JMn(e) {
  if (e === null) return zv("FFI returned null pointer");
  let t = YG(e);
  if (!("success" in t)) return t;
  if (t.handlePtr === 0) return zv("fff_search returned null search result");
  let r = G6(t.handlePtr),
    s = ha.u32(r, Ueo),
    a = ha.u32(r, Neo),
    H = ha.u32(r, Feo),
    u = ha.ptr(r, keo),
    f = ha.ptr(r, Oeo),
    d = ha.u8(r, Beo),
    _;
  if (d === 1) _ = { type: "line", line: ha.i32(r, Osr) };
  else if (d === 2) _ = { type: "position", line: ha.i32(r, Osr), col: ha.i32(r, CMn) };
  else if (d === 3)
    _ = {
      type: "range",
      start: { line: ha.i32(r, Osr), col: ha.i32(r, CMn) },
      end: { line: ha.i32(r, Reo), col: ha.i32(r, Weo) },
    };
  let L = [],
    I = [];
  for (let S = 0; S < s; S++) (L.push(Ato(u + S * Yeo)), I.push(Fsr(f + S * cto)));
  pg().symbols.fff_free_search_result(r);
  let D = { items: L, scores: I, totalMatched: a, totalFiles: H };
  if (_) D.location = _;
  return { ok: !0, value: D };
}