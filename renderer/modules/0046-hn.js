
function hn(e) {
  const n = "fallback" in e && { fallback: () => e.fallback };
  return Pe(ha(() => e.each, e.children, n || void 0));
}