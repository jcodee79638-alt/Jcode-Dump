
function USa(e, t) {
  var r;
  if (e.type === "text") return { type: "text", text: e.text, providerOptions: e.providerOptions };
  let s,
    a = e.type;
  switch (a) {
    case "image":
      s = e.image;
      break;
    case "file":
      s = e.data;
      break;
    default:
      throw Error(`Unsupported part type: ${a}`);
  }
  let { data: H, mediaType: u } = w6i(s),
    f = u != null ? u : e.mediaType,
    d = H;
  if (d instanceof URL) {
    let _ = t[d.toString()];
    if (_) ((d = _.data), f != null || (f = _.mediaType));
  }
  switch (a) {
    case "image": {
      if (d instanceof Uint8Array || typeof d === "string")
        f = (r = jSa({ data: d, signatures: TSa })) != null ? r : f;
      return {
        type: "file",
        mediaType: f != null ? f : "image/*",
        filename: void 0,
        data: d,
        providerOptions: e.providerOptions,
      };
    }
    case "file": {
      if (f == null) throw Error("Media type is missing for file part");
      return {
        type: "file",
        mediaType: f,
        filename: e.filename,
        data: d,
        providerOptions: e.providerOptions,
      };
    }
  }
}