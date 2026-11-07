
function NsH(e) {
  if (e.length <= pwr) return e;
  return e.slice(0, pwr) + `\u2026 (${e.length - pwr} more chars)`;
}