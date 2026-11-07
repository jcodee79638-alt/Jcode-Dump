
async function an(e, t, n) {
  let i = await X(e, t),
    r = await z.lstat(i.filename);
  if (!r.isFile() || r.nlink > 1 || r.size > n) throw Error("File type or size limit prevents capture.");
  let s = await z.open(i.filename, Or.constants.O_RDONLY | (Or.constants.O_NOFOLLOW ?? 0));
  return (async () => {
    let o = await s.stat();
    if (!o.isFile() || o.nlink > 1 || o.size > n || o.dev !== r.dev || o.ino !== r.ino)
      throw Error("The file changed while being read.");
    let l = new Uint8Array(Math.min(n, r.size) + 1),
      u = { size: 0 };
    while (u.size < l.length) {
      let f = await s.read(l, u.size, l.length - u.size, u.size);
      if (!f.bytesRead) break;
      u.size += f.bytesRead;
    }
    if (u.size > n) throw Error("File size limit prevents capture.");
    let p = await z.lstat((await X(e, t)).filename);
    if (p.dev !== o.dev || p.ino !== o.ino || p.size !== u.size || p.mtimeMs !== o.mtimeMs)
      throw Error("The file changed while being read.");
    let w = l.slice(0, u.size);
    return { bytes: w, hash: Le.createHash("sha256").update(w).digest("hex") };
  })().finally(() => s.close());
}