
function Bn(e, n = Date.now()) {
  const i = Math.ceil((e - n) / 6e4);
  if (i <= 0) return $.resetSoon;
  if (i < 60) return `${i}m`;
  const s = Math.floor(i / 60);
  return s < 24 ? `${s}h ${i % 60}m` : `${Math.floor(s / 24)}d ${s % 24}h`;
}