
function _e(e) {
  const n = "fallback" in e && { fallback: () => e.fallback };
  return Pe(ua(() => e.each, e.children, n || void 0));
}