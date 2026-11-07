
async function Ki(e, t, n = !1) {
  let i = wt(t),
    r = await je(e, { create: !1 }),
    s = i.split("/"),
    o = { parent: r };
  for (let l of s.keys()) {
    let u = W.default.join(e, ...s.slice(0, l + 1)),
      p = await z.lstat(u, { bigint: !0 }).catch((m) => {
        if (n && m.code === "ENOENT") return;
        throw m;
      });
    if (!p) return { filename: W.default.join(o.parent, ...s.slice(l)), exists: !1 };
    if (p.isSymbolicLink() || (!p.isDirectory() && (l !== s.length - 1 || !p.isFile() || p.nlink !== 1n)))
      throw Error("The checkpoint store contains an unsafe file or folder.");
    if (p.isDirectory()) {
      o.parent = await je(u, { create: !1 });
      let m = await z.lstat(o.parent, { bigint: !0 });
      if (m.dev !== p.dev || m.ino !== p.ino)
        throw Error("The checkpoint folder changed while being checked.");
      continue;
    }
    let w = await z.realpath(u);
    await je(W.default.dirname(w), { create: !1 });
    let f = await z.lstat(w, { bigint: !0 }),
      h = await z.lstat(u, { bigint: !0 });
    if (
      !f.isFile() ||
      f.isSymbolicLink() ||
      f.nlink !== 1n ||
      h.isSymbolicLink() ||
      h.nlink !== 1n ||
      f.dev !== p.dev ||
      f.ino !== p.ino ||
      h.dev !== p.dev ||
      h.ino !== p.ino ||
      (await z.realpath(u)) !== w ||
      (await je(W.default.dirname(u), { create: !1 })) !== o.parent
    )
      throw Error("The checkpoint file changed while being checked.");
    return { filename: w, exists: !0 };
  }
  return { filename: o.parent, exists: !0 };
}