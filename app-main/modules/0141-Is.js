
function Is(e, t) {
  let n = e.mime === "application/pdf";
  if (
    n &&
    (t[0]?.mime !== "text/plain" ||
      t[0].filename !== e.filename + " (extracted text).txt" ||
      t.length < 2 ||
      t.length > le.pages + 1)
  )
    throw new T("document");
  if (!n && t.length !== 1) throw new T("document");
  return t.map((i, r) => {
    let s = n && r > 0 ? r : void 0,
      o = s
        ? `${e.filename} - page ${s}.jpg`
        : e.mime === "text/plain" || e.mime.startsWith("image/")
          ? e.filename
          : e.filename + " (extracted text).txt";
    if (
      i.filename !== o ||
      ((s || e.mime.startsWith("image/")) && i.mime !== "image/jpeg") ||
      (!s && !e.mime.startsWith("image/") && i.mime !== "text/plain")
    )
      throw new T("document");
    return {
      id: `${e.id}_ref_${r}`,
      attachmentId: e.id,
      kind: s ? "page" : i.mime === "image/jpeg" ? "image" : "text",
      label: s
        ? `Page ${s}`
        : i.mime === "image/jpeg"
          ? "Image"
          : e.mime === "text/plain"
            ? "Text"
            : "Extracted text",
      ...(s ? { page: s } : {}),
    };
  });
}