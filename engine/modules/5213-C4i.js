
function C4i(e, t) {
  let r = $v(e);
  if (Buffer.byteLength(JSON.stringify(r)) > 65536) throw Error("MCP settings are too large.");
  if (r.type === "local") {
    if (
      ($$(r, ["type", "command", "environment"]),
      !Array.isArray(r.command) || r.command.length < 1 || r.command.length > 64)
    )
      throw Error("Enter an MCP command and its arguments.");
    let s = r.command.map((a) => iL(a, 8192));
    if (s.some((a) => a.includes("\x00")) || !s[0]?.trim()) throw Error("Enter a valid MCP command.");
    return {
      type: "local",
      command: s,
      ...(r.environment === void 0 ? {} : { environment: Nbr(r.environment, "environment") }),
      enabled: t,
      timeout: 20000,
    };
  }
  if (($$(r, ["type", "url", "headers"]), r.type !== "remote"))
    throw Error("Choose a local or remote MCP server.");
  return {
    type: "remote",
    url: P4i(r.url),
    ...(r.headers === void 0 ? {} : { headers: Nbr(r.headers, "headers") }),
    enabled: t,
    timeout: 20000,
  };
}