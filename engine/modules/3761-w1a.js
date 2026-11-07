
function w1a() {
  var e, t, r;
  let s = globalThis.process;
  return (
    ((e = s == null ? void 0 : s.release) == null ? void 0 : e.name) === "node" &&
    ((t = s.versions) == null ? void 0 : t.bun) == null &&
    ((r = s.versions) == null ? void 0 : r.deno) == null &&
    s.title !== "workerd" &&
    globalThis.EdgeRuntime == null
  );
}