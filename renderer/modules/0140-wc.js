
function wc(e) {
  const n = new URL(e);
  if (
    (n.protocol !== "https:" &&
      !(n.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(n.hostname))) ||
    n.username ||
    n.password
  )
    throw new Error("Use an HTTPS server URL or an HTTP localhost address, without embedded credentials.");
  return n.href;
}