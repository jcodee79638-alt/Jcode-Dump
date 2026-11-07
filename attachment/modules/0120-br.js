
function br(c) {
  if (mt && typeof Buffer < "u" && c instanceof Buffer)
    throw new Error("Please provide binary data as `Uint8Array`, rather than `Buffer`.");
  if (c instanceof Uint8Array && c.byteLength === c.buffer.byteLength) return c;
  if (typeof c == "string") return es(c);
  if (c instanceof ArrayBuffer || ArrayBuffer.isView(c) || (typeof c == "object" && !isNaN(c?.length)))
    return new Uint8Array(c);
  throw new Error(
    "Invalid PDF binary data: either TypedArray, string, or array-like object is expected in the data property.",
  );
}