
function ova(e) {
  return ava(e).map((t) =>
    t.role !== "user" || typeof t.content === "string"
      ? t
      : {
          role: "user",
          content: t.content.map((r) =>
            r.type === "image" ? { type: "file", data: r.image, mediaType: r.mediaType } : r,
          ),
        },
  );
}