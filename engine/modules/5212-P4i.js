
function P4i(e) {
  let t = new URL(iL(e, 4096));
  if (
    t.username ||
    t.password ||
    t.hash ||
    !(
      t.protocol === "https:" ||
      (t.protocol === "http:" && ["127.0.0.1", "localhost", "[::1]"].includes(t.hostname))
    )
  )
    throw Error("Use an HTTPS MCP address, or HTTP on this computer.");
  if (
    [...t.searchParams.keys()].some((r) =>
      ["accesstoken", "refreshtoken", "apikey", "token", "password", "secret", "authorization"].includes(
        r.replaceAll(/[-_]/g, "").toLowerCase(),
      ),
    )
  )
    throw Error("Keep MCP credentials in protected headers, rather than the server address.");
  return t.href;
}