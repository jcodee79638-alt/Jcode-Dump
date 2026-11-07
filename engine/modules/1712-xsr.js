
function xsr(e) {
  if (Array.isArray(e)) return e.map(xsr);
  if (!Yde(e)) return e;
  return Object.fromEntries(Object.entries(e).map(([t, r]) => [hMn(t), xsr(r)]));
}