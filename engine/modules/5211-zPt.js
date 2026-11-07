
function zPt(e) {
  let t = iL(e, 64);
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(t) || ["constructor", "prototype", "__proto__"].includes(t))
    throw Error("Choose a short MCP server name using letters, numbers, underscores, or hyphens.");
  return t;
}