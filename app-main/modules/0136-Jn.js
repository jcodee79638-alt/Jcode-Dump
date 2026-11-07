
async function Jn(e, t) {
  let n = await $e.lstat(e);
  if (!n.isFile() || n.isSymbolicLink() || n.nlink !== 1 || n.size > t) throw new T("document");
  let i = await $e.open(e, "r");
  try {
    let r = await i.stat();
    if (!r.isFile() || r.size > t || r.ino !== n.ino || r.dev !== n.dev) throw new T("size");
    let s = Buffer.alloc(Math.min(r.size + 1, t + 1)),
      o = await i.read(s, 0, s.length, 0),
      l = await $e.lstat(e);
    if (
      o.bytesRead !== r.size ||
      o.bytesRead > t ||
      l.isSymbolicLink() ||
      l.ino !== r.ino ||
      l.dev !== r.dev ||
      l.size !== r.size ||
      l.mtimeMs !== r.mtimeMs
    )
      throw new T("size");
    return s.subarray(0, o.bytesRead);
  } finally {
    await i.close();
  }
}