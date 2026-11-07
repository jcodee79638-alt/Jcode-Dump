
function oDr(e, t, ...r) {
  let s = typeof e == "function" ? e : e[0],
    a = typeof e == "function" ? "asc" : e[1],
    { [a]: H } = cki,
    u = t === void 0 ? void 0 : oDr(t, ...r);
  return (f, d) => {
    let _ = s(f),
      L = s(d);
    return H(_, L) ? 1 : H(L, _) ? -1 : (u?.(f, d) ?? 0);
  };
}