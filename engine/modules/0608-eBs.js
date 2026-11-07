
function eBs(e, t) {
  let r = kAn(e, t);
  return (s) => `Cause([${s.reasons.map(r).join(", ")}])`;
}