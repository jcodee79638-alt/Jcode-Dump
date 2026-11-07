
function Ks(e) {
  return Number.isFinite(e) ? Math.min(100, Math.max(0, Math.round(e))) : 0;
}