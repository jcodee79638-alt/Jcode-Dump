
function YIr(e = globalThis) {
  var t, r, s;
  if (e.window) return "runtime/browser";
  if ((t = e.navigator) == null ? void 0 : t.userAgent)
    return `runtime/${e.navigator.userAgent.toLowerCase()}`;
  if ((s = (r = e.process) == null ? void 0 : r.versions) == null ? void 0 : s.node)
    return `runtime/node.js/${e.process.version.substring(0)}`;
  if (e.EdgeRuntime) return "runtime/vercel-edge";
  return "runtime/unknown";
}