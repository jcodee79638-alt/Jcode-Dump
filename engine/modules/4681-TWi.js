
function TWi(e) {
  return e.type === "tool_use" || e.type === "server_tool_use" || e.type === "mcp_tool_use";
}