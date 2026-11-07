
function VMn(e) {
  let t = YG(e);
  if (!("success" in t)) return t;
  if (t.handlePtr === 0) return { ok: !0, value: null };
  let r = pg(),
    s = by(t.handlePtr);
  return (r.symbols.fff_free_string(G6(t.handlePtr)), { ok: !0, value: s });
}