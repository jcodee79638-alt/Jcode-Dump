
function hs(c) {
  if (c instanceof Uint8Array) return c.buffer;
  if (c instanceof ArrayBuffer) return c;
  throw new Error(`getArrayBuffer - unexpected data: ${c}`);
}