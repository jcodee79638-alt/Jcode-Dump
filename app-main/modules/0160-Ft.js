
async function Ft(e, t, n) {
  if (
    !t ||
    t.includes("\x00") ||
    L.default.isAbsolute(t) ||
    t.split(/[\\/]/).some((u) => !u || u === "." || u === ".." || u.includes(":"))
  )
    throw Error("Choose a file inside the project.");
  let i = L.default.dirname(L.default.join(e, t));
  if ((await ot(i), !Kn(e, i))) throw Error("Choose a file inside the project.");
  let r = await Promise.all([e, i].map(async (u) => ({ directory: u, info: await Z.lstat(u) }))),
    s = L.default.join(e, t),
    o = await Z.lstat(s);
  if (!o.isFile() || o.isSymbolicLink() || o.nlink !== 1 || o.size > n)
    throw Error("This file is linked or exceeds the inspection limit.");
  let l = await Z.open(s, Yn.constants.O_RDONLY | (Yn.constants.O_NOFOLLOW ?? 0));
  try {
    let u = await l.stat();
    if (!u.isFile() || u.nlink !== 1 || u.dev !== o.dev || u.ino !== o.ino || u.size > n)
      throw Error("The file changed during inspection.");
    let p = Buffer.alloc(u.size + 1),
      w = await l.read(p, 0, p.length, 0),
      f = await l.stat(),
      h = await Z.lstat(s);
    if (
      (await ot(i),
      w.bytesRead !== u.size ||
        f.size !== u.size ||
        f.mtimeMs !== u.mtimeMs ||
        h.dev !== u.dev ||
        h.ino !== u.ino ||
        h.isSymbolicLink() ||
        h.nlink !== 1 ||
        he(await Z.realpath(s)) !== he(s))
    )
      throw Error("The file changed during inspection.");
    for (let m of r) {
      let b = await Z.lstat(m.directory);
      if (b.dev !== m.info.dev || b.ino !== m.info.ino) throw Error("The folder changed during inspection.");
    }
    return p.subarray(0, w.bytesRead);
  } finally {
    await l.close();
  }
}