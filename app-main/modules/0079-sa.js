
async function sa(e) {
  let t = cn(e),
    n = W.default.parse(t).root;
  return (
    await W.default
      .relative(n, t)
      .split(W.default.sep)
      .filter(Boolean)
      .reduce(async (i, r) => {
        let s = await i,
          o = W.default.join(s, r);
        await z.mkdir(o).catch((u) => {
          if (u.code !== "EEXIST") throw u;
        });
        let l = await z.lstat(o);
        if (!l.isDirectory() || l.isSymbolicLink() || se(await z.realpath(o)) !== se(o))
          throw Error("Local folders cannot contain links or redirected paths.");
        return o;
      }, Promise.resolve(n)),
    t
  );
}