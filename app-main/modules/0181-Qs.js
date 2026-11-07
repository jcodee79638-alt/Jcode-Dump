
function Qs(e) {
  return Number.isFinite(e) && e >= 0 && e <= 8640000000000000 ? Math.floor(e) : 0;
}