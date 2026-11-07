
function Don(e, t, r) {
  if (Array.isArray(r)) {
    if (bv(r)) {
      if (r.length === 1) return PQt(e, r[0]);
      return new XM(
        t,
        Lo(e),
        jv(r, (s) => PQt(e, s)),
      );
    }
    return;
  }
  return Ion(e, r);
}