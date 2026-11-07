
function k4i(e) {
  if (!e || e.length > 4096 || e.includes("\x00")) throw Error("Choose the MCP resource or prompt to read.");
  return e;
}