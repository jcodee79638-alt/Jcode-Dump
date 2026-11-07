
function RaH(e) {
  return new Bun.CryptoHasher("sha256").update(e).digest("hex");
}