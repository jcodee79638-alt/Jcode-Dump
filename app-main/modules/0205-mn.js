
async function mn(e, t) {
  await Wt(e);
  let n = await wn(ne.default.join(e, "manifest.json"), Be.manifest),
    i = so(JSON.parse(n.toString("utf8")), t),
    r = Fe.createHmac("sha256", await Kr(ne.default.dirname(e)))
      .update(oo(i))
      .digest();
  if (!Fe.timingSafeEqual(r, Buffer.from(i.seal, "hex"))) throw ae();
  let s = new Set(i.files.map((l) => l.path));
  s.add("manifest.json");
  let o = async (l, u = "") => {
    let p = await ce.opendir(l);
    for await (let w of p) {
      let f = u + w.name,
        h = await ce.lstat(ne.default.join(l, w.name));
      if (f === "attachments" && h.isDirectory() && !h.isSymbolicLink()) {
        await o(ne.default.join(l, w.name), "attachments/");
        continue;
      }
      if (!s.delete(f) || !h.isFile() || h.isSymbolicLink() || h.nlink !== 1) throw ae();
    }
  };
  if ((await o(e), s.size)) throw ae();
  for (let l of i.files) {
    let u = await wn(ne.default.join(e, ...l.path.split("/")), io(l.path));
    if (u.length !== l.bytes || Aa(u) !== l.sha256) throw ae();
  }
  return {
    manifest: i,
    entry: {
      id: i.id,
      createdAt: i.createdAt,
      conversations: i.conversations,
      attachments: i.attachments,
      partial: i.partial,
      skipped: i.skipped,
      bytes: n.length + i.files.reduce((l, u) => l + u.bytes, 0),
    },
  };
}