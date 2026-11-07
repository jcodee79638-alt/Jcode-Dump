
async function OSa(e, t, r) {
  let s = e
      .filter((H) => H.role === "user")
      .map((H) => H.content)
      .filter((H) => Array.isArray(H))
      .flat()
      .filter((H) => H.type === "image" || H.type === "file")
      .map((H) => {
        var u;
        let f = (u = H.mediaType) != null ? u : H.type === "image" ? "image/*" : void 0,
          d = H.type === "image" ? H.image : H.data;
        if (typeof d === "string")
          try {
            d = new URL(d);
          } catch (_) {}
        return { mediaType: f, data: d };
      })
      .filter((H) => H.data instanceof URL)
      .map((H) => ({
        url: H.data,
        isUrlSupportedByModel:
          H.mediaType != null && wwi({ url: H.data.toString(), mediaType: H.mediaType, supportedUrls: r }),
      })),
    a = await t(s);
  return Object.fromEntries(
    a
      .map((H, u) => (H == null ? null : [s[u].url.toString(), { data: H.data, mediaType: H.mediaType }]))
      .filter((H) => H != null),
  );
}