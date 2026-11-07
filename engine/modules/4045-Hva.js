
function Hva(e) {
  let t = e.type === "image" ? e.image : e.data,
    r = e.mediaType;
  if (e.type === "file" && r !== "image/jpeg" && r !== "image/png") return;
  let s =
    t instanceof URL
      ? t.href
      : typeof t === "string"
        ? t.startsWith("data:")
          ? t
          : /^[A-Za-z0-9+/]+={0,2}$/.test(t) && t.length <= 180000
            ? `data:${r};base64,${t}`
            : ""
        : t.byteLength <= DHe.imageBytes
          ? `data:${r};base64,${I8i.from(t instanceof ArrayBuffer ? new Uint8Array(t) : t).toString("base64")}`
          : "";
  try {
    return KTt(s);
  } catch {
    return;
  }
}