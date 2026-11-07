
function $3e(e, t) {
  return Zt.join(
    e.queryChunks.map((r) => {
      if (vi(r, Kl)) return bG(r, t);
      if (vi(r, pH)) return $3e(r, t);
      if (vi(r, pH.Aliased)) return Btr(r, t);
      return r;
    }),
  );
}