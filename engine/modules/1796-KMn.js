
function KMn(e) {
  let t = YG(e);
  if (!("success" in t)) return t;
  if (t.handlePtr === 0) return zv("grep returned null result");
  let r = G6(t.handlePtr),
    s = ha.u32(r, iro),
    a = ha.u32(r, sro),
    H = ha.u32(r, oro),
    u = ha.u32(r, aro),
    f = ha.u32(r, Hro),
    d = ha.u32(r, cro),
    _ = ha.ptr(r, Aro),
    L = by(_) ?? void 0,
    I = ha.ptr(r, nro),
    D = [];
  for (let T = 0; T < s; T++) D.push(pro(I + T * rro));
  pg().symbols.fff_free_grep_result(r);
  let S = {
    items: D,
    totalMatched: a,
    totalFilesSearched: H,
    totalFiles: u,
    filteredFileCount: f,
    nextCursor: d > 0 ? PMn(d) : null,
  };
  if (L) S.regexFallbackError = L;
  return { ok: !0, value: S };
}