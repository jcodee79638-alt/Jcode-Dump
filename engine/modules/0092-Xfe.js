
async function Xfe(e, t) {
  await p6(e);
  let r = await dI(EU.join(e, "manifest.json"), Ch.manifest),
    s = ntn(JSON.parse(r.toString("utf8")), t),
    a = OJt("sha256", await NJt(EU.dirname(e)))
      .update(itn(s))
      .digest();
  if (!S8s(a, Buffer.from(s.seal, "hex"))) throw xj();
  let H = new Set(s.files.map((f) => f.path));
  H.add("manifest.json");
  let u = async (f, d = "") => {
    let _ = await T8s(f);
    for await (let L of _) {
      let I = d + L.name,
        D = await kJt(EU.join(f, L.name));
      if (I === "attachments" && D.isDirectory() && !D.isSymbolicLink()) {
        await u(EU.join(f, L.name), "attachments/");
        continue;
      }
      if (!H.delete(I) || !D.isFile() || D.isSymbolicLink() || D.nlink !== 1) throw xj();
    }
  };
  if ((await u(e), H.size)) throw xj();
  for (let f of s.files) {
    let d = await dI(EU.join(e, ...f.path.split("/")), ttn(f.path));
    if (d.length !== f.bytes || CC(d) !== f.sha256) throw xj();
  }
  return {
    manifest: s,
    entry: {
      id: s.id,
      createdAt: s.createdAt,
      conversations: s.conversations,
      attachments: s.attachments,
      partial: s.partial,
      skipped: s.skipped,
      bytes: r.length + s.files.reduce((f, d) => f + d.bytes, 0),
    },
  };
}