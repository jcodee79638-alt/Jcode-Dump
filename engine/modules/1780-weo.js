
function weo(e) {
  let t = YG(e);
  if (!("success" in t)) return t;
  if (t.handlePtr === 0) return { ok: !0, value: void 0 };
  let r = pg(),
    s = by(t.handlePtr);
  if ((r.symbols.fff_free_string(G6(t.handlePtr)), s === null || s === "")) return { ok: !0, value: void 0 };
  try {
    return { ok: !0, value: Nsr(JSON.parse(s)) };
  } catch {
    return { ok: !0, value: s };
  }
}