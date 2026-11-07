
function VDr(e, t = z5e) {
  let r = Number.isFinite(t) ? Math.floor(t) : z5e,
    s = Number.isFinite(e.limit.output) ? Math.floor(e.limit.output) : z5e;
  return Math.max(1, Math.min(z5e, r, s));
}