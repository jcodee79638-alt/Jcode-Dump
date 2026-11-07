
function jbt(e = fetch, t) {
  if (!t) return e;
  return async (r, s) => {
    let a = { ...t, ...s, headers: s?.headers ? { ...zje(t.headers), ...zje(s.headers) } : t.headers };
    return e(r, a);
  };
}