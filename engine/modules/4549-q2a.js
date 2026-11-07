
function q2a(e) {
  let t = new URL(e);
  if (
    e.length > 4096 ||
    t.username ||
    t.password ||
    t.hash ||
    !(
      t.protocol === "https:" ||
      (t.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(t.hostname))
    )
  )
    throw Error("Invalid MCP authorization address.");
  return t.href;
}