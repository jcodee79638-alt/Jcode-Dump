
var jxr = function () {
  let { crypto: e } = globalThis;
  if (e?.randomUUID) return ((jxr = e.randomUUID.bind(e)), e.randomUUID());
  let t = new Uint8Array(1),
    r = e ? () => e.getRandomValues(t)[0] : () => (Math.random() * 255) & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (s) =>
    (+s ^ (r() & (15 >> (+s / 4)))).toString(16),
  );
};