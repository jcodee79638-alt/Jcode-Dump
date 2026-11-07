
function Zr(e, n) {
  if (
    (yi(e),
    n.some(
      (i) =>
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
        ].includes(i),
    ))
  )
    throw new Error("This attachment type is not supported. Your attachments are saved.");
}