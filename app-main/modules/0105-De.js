
async function De(e, t = "", n = !1) {
  let i = await oe.realpath(et(e)),
    r = Pe(t),
    s = it.default.resolve(i, r),
    o = it.default.relative(i, s);
  if (o.startsWith("..") || it.default.isAbsolute(o)) throw Error("Choose a file inside the project.");
  let l = o.split(it.default.sep).filter(Boolean);
  return (
    await l.reduce(async (u, p, w) => {
      let f = await u,
        h = it.default.join(f, p);
      if (
        (
          await oe.lstat(h).catch((b) => {
            if (n && w === l.length - 1 && b.code === "ENOENT") return;
            throw b;
          })
        )?.isSymbolicLink()
      )
        throw Error("Choose a file inside the project.");
      return h;
    }, Promise.resolve(i)),
    { root: i, target: s, relative: r }
  );
}