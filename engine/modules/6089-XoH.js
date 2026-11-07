
function XoH(e) {
  if (e.length <= Owr) return e;
  return e.slice(0, Owr) + `... (${e.length - Owr} more chars)`;
}