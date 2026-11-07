
function kki(e) {
  if (e.type !== "content") return e;
  return {
    type: "content",
    value: e.value.map((t) => {
      if (t.type !== "media") return t;
      if (t.mediaType.startsWith("image/"))
        return { type: "image-data", data: t.data, mediaType: t.mediaType };
      return { type: "file-data", data: t.data, mediaType: t.mediaType };
    }),
  };
}