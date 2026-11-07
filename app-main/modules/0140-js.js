
function js(e, t) {
  if (
    !e ||
    typeof e !== "object" ||
    !("id" in e) ||
    e.id !== t ||
    !("filename" in e) ||
    typeof e.filename !== "string" ||
    !e.filename ||
    e.filename.length > 260 ||
    ee.default.basename(e.filename) !== e.filename ||
    /[\u0000-\u001f]/.test(e.filename) ||
    !("size" in e) ||
    typeof e.size !== "number" ||
    !Number.isInteger(e.size) ||
    e.size < 1 ||
    e.size > le.fileBytes ||
    !("mime" in e) ||
    typeof e.mime !== "string" ||
    ![
      "text/plain",
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/gif",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ].includes(e.mime)
  )
    throw new T("document");
  if (!("version" in e)) return { id: t, filename: e.filename, size: e.size, mime: e.mime };
  if (
    e.version !== 1 ||
    !("originalHash" in e) ||
    typeof e.originalHash !== "string" ||
    !/^[a-f0-9]{64}$/.test(e.originalHash) ||
    !("preparedHash" in e) ||
    typeof e.preparedHash !== "string" ||
    !/^[a-f0-9]{64}$/.test(e.preparedHash)
  )
    throw new T("document");
  return {
    id: t,
    filename: e.filename,
    size: e.size,
    mime: e.mime,
    version: 1,
    originalHash: e.originalHash,
    preparedHash: e.preparedHash,
  };
}