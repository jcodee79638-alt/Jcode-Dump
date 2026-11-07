
function Qon(e) {
  let t = globalThis.String(e.literal);
  return x$(e, [
    new S$(
      new eG(t),
      new Zg(
        Sm(() => e.literal),
        Sm(() => t),
      ),
    ),
  ]);
}