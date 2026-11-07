
function Sbr(e) {
  let t = e.model.limit.context;
  if (t === 0) return 0;
  let r = e.cfg.compaction?.reserved ?? Math.min(XVa, VDr(e.model, e.outputTokenMax)),
    s = e.model.limit.input
      ? Math.max(0, e.model.limit.input - r)
      : Math.max(0, t - VDr(e.model, e.outputTokenMax));
  return e.model.providerID === "jaccode" && e.model.id === "jcoder-5.6" ? Math.min(s, 32768) : s;
}