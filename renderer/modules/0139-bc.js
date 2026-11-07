
function bc(e) {
  const n = Ei(e);
  if (
    !Array.isArray(n) ||
    !n.length ||
    n.length > 64 ||
    !n.every((i) => typeof i == "string" && i.length > 0 && i.length <= 4096)
  )
    throw new Error('Enter a JSON array of command arguments, such as ["npx", "-y", "server-name"].');
  return n;
}