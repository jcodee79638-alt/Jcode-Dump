
function FWe(e) {
  if (!e) return null;
  return Buffer.from(e + "\x00", "utf-8");
}