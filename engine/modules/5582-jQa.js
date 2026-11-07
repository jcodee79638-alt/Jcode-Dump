
function jQa(e, t) {
  let r = [],
    s = 0,
    a = 0,
    H = (u) => {
      if (((s += 1), u.mime.startsWith("image/"))) a += 1;
      t(u);
    };
  for (let u of e.content)
    switch (u.type) {
      case "text":
        r.push(u.text);
        break;
      case "image":
      case "audio":
        H({ type: "file", mime: u.mimeType, url: kzi(u.mimeType, u.data) });
        break;
      case "resource": {
        if ("text" in u.resource) {
          r.push(u.resource.text);
          break;
        }
        let f = u.resource.mimeType ?? "application/octet-stream";
        H({ type: "file", mime: f, url: kzi(f, u.resource.blob), filename: bQa(u.resource.uri) });
        break;
      }
      case "resource_link":
        r.push(`${u.name}: ${u.uri}`);
        break;
    }
  if (e.structuredContent !== void 0 && e.structuredContent !== null) return e.structuredContent;
  if (r.length > 0)
    return r.join(`
`);
  if (s > 0) return `[${s} ${s === a ? "image" : "file"}${s === 1 ? "" : "s"} attached to the result]`;
  return null;
}