
async function ot(e, t = !1) {
  if (
    typeof e !== "string" ||
    !L.default.isAbsolute(e) ||
    e.includes("\x00") ||
    e.split(/[\\/]/).includes("..") ||
    e.startsWith("\\\\")
  )
    throw Error("Choose a local absolute folder without links.");
  let n = L.default.parse(e).root;
  return (
    await L.default
      .relative(n, e)
      .split(L.default.sep)
      .filter(Boolean)
      .reduce(async (i, r) => {
        let s = await i,
          o = L.default.join(s, r);
        if (t)
          await Z.mkdir(o).catch((u) => {
            if (u.code !== "EEXIST") throw u;
          });
        let l = await Z.lstat(o);
        if (!l.isDirectory() || l.isSymbolicLink()) throw Error("Choose a local folder without links.");
        return o;
      }, Promise.resolve(n)),
    Z.realpath(e)
  );
}