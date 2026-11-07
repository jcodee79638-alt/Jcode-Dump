
function JTt(e, t) {
  let r = ["edit", "write", "apply_patch"],
    s = ["list_mcp_resources", "list_mcp_resource_templates", "read_mcp_resource"];
  return new Set(
    e.filter((a) => {
      let H = r.includes(a) ? "edit" : s.includes(a) ? "read" : a,
        u = t.findLast((f) => XG(H, f.permission));
      return u?.pattern === "*" && u.action === "deny";
    }),
  );
}