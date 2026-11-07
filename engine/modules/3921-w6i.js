
function w6i(e) {
  if (e instanceof Uint8Array) return { data: e, mediaType: void 0 };
  if (e instanceof ArrayBuffer) return { data: new Uint8Array(e), mediaType: void 0 };
  if (typeof e === "string")
    try {
      e = new URL(e);
    } catch (t) {}
  if (e instanceof URL && e.protocol === "data:") {
    let { mediaType: t, base64Content: r } = CSa(e.toString());
    if (t == null || r == null)
      throw new pc({
        name: "InvalidDataContentError",
        message: `Invalid data URL format in content ${e.toString()}`,
      });
    return { data: r, mediaType: t };
  }
  return { data: e, mediaType: void 0 };
}