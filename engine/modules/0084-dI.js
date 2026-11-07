
async function dI(e, t) {
  await p6(EU.dirname(e));
  let r = await kJt(e);
  if (!r.isFile() || r.isSymbolicLink() || r.nlink !== 1 || r.size > t) throw xj();
  let s = await UJt(e, etn.O_RDONLY | (etn.O_NOFOLLOW ?? 0));
  try {
    let a = await s.stat();
    if (!a.isFile() || a.nlink !== 1 || a.size > t || a.dev !== r.dev || a.ino !== r.ino) throw xj();
    let H = Buffer.alloc(a.size + 1),
      u = 0;
    while (u < H.length) {
      let _ = await s.read(H, u, H.length - u, u);
      if (!_.bytesRead) break;
      u += _.bytesRead;
    }
    let f = await s.stat(),
      d = await kJt(e);
    if (
      u !== a.size ||
      a.size !== f.size ||
      a.mtimeMs !== f.mtimeMs ||
      f.nlink !== 1 ||
      d.isSymbolicLink() ||
      d.nlink !== 1 ||
      d.size !== a.size ||
      d.mtimeMs !== a.mtimeMs ||
      d.dev !== a.dev ||
      d.ino !== a.ino
    )
      throw xj();
    return (await p6(EU.dirname(e)), H.subarray(0, u));
  } finally {
    await s.close();
  }
}