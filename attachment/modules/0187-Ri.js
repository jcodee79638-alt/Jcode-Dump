
function Ri(c) {
  return c instanceof Uint8Array && c.byteLength === c.buffer.byteLength
    ? c.buffer
    : new Uint8Array(c).buffer;
}