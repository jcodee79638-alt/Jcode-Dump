
function VPt(e) {
  if (e.cfg.compaction?.auto === !1) return !1;
  if (e.model.limit.context === 0) return !1;
  return (
    (e.tokens.total || e.tokens.input + e.tokens.output + e.tokens.cache.read + e.tokens.cache.write) >=
    Sbr(e)
  );
}