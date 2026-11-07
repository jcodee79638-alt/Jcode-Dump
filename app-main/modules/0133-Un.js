
function Un(e) {
  if (!Array.isArray(e) || !e.length || e.length > 5) throw new T("document");
  let t = 0,
    n = 0,
    i = 0;
  return e.map((r) => {
    if (
      !r ||
      typeof r !== "object" ||
      typeof r.filename !== "string" ||
      r.filename.length > 320 ||
      /[\u0000-\u001f]/.test(r.filename) ||
      typeof r.url !== "string"
    )
      throw new T("document");
    if (r.mime === "text/plain") {
      let o = /^data:text\/plain;base64,([A-Za-z0-9+/]*={0,2})$/.exec(r.url);
      if (!o || r.url.length > 300000) throw new T("text");
      let l = Buffer.from(o[1], "base64");
      if (!Ur.isUtf8(l) || l.includes(0) || (t += l.length) > le.textBytes) throw new T("text");
      return { filename: r.filename, mime: "text/plain", url: r.url };
    }
    if (r.mime !== "image/jpeg") throw new T("document");
    let s = (() => {
      try {
        return qt(r.url);
      } catch {
        throw new T("image");
      }
    })();
    if (++i > ze.images || (n += s.bytes) > ze.totalImageBytes) throw new T("total");
    return { filename: r.filename, mime: "image/jpeg", url: s.url };
  });
}