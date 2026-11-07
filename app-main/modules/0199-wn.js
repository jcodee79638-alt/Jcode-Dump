
async function wn(e, t) {
  await Wt(ne.default.dirname(e));
  let n = await ce.lstat(e);
  if (!n.isFile() || n.isSymbolicLink() || n.nlink !== 1 || n.size > t) throw ae();
  let i = await ce.open(e, Zr.constants.O_RDONLY | (Zr.constants.O_NOFOLLOW ?? 0));
  try {
    let r = await i.stat();
    if (!r.isFile() || r.nlink !== 1 || r.size > t || r.dev !== n.dev || r.ino !== n.ino) throw ae();
    let s = Buffer.alloc(r.size + 1),
      o = 0;
    while (o < s.length) {
      let p = await i.read(s, o, s.length - o, o);
      if (!p.bytesRead) break;
      o += p.bytesRead;
    }
    let l = await i.stat(),
      u = await ce.lstat(e);
    if (
      o !== r.size ||
      r.size !== l.size ||
      r.mtimeMs !== l.mtimeMs ||
      l.nlink !== 1 ||
      u.isSymbolicLink() ||
      u.nlink !== 1 ||
      u.size !== r.size ||
      u.mtimeMs !== r.mtimeMs ||
      u.dev !== r.dev ||
      u.ino !== r.ino
    )
      throw ae();
    return (await Wt(ne.default.dirname(e)), s.subarray(0, o));
  } finally {
    await i.close();
  }
}