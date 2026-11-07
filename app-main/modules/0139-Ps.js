
function Ps(e, t) {
  let n = te.lstatSync(e);
  if (!n.isFile() || n.isSymbolicLink() || n.nlink !== 1 || n.size > t) throw new T("document");
  let i = te.openSync(e, "r");
  try {
    let r = te.fstatSync(i);
    if (r.ino !== n.ino || r.dev !== n.dev || r.size !== n.size) throw new T("document");
    let s = Buffer.alloc(Math.min(r.size + 1, t + 1)),
      o = te.readSync(i, s, 0, s.length, 0),
      l = te.lstatSync(e);
    if (
      o !== r.size ||
      o > t ||
      l.isSymbolicLink() ||
      l.ino !== r.ino ||
      l.dev !== r.dev ||
      l.size !== r.size ||
      l.mtimeMs !== r.mtimeMs
    )
      throw new T("document");
    return s.subarray(0, o);
  } finally {
    te.closeSync(i);
  }
}