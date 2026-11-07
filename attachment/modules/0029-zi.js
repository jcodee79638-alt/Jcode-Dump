
function zi() {
  if (typeof crypto.randomUUID == "function") return crypto.randomUUID();
  const c = new Uint8Array(32);
  return (crypto.getRandomValues(c), Ln(c));
}