
async function Hs(e) {
  let t = Ae.default.parse(e).root;
  return (
    await Ae.default
      .relative(t, e)
      .split(Ae.default.sep)
      .filter(Boolean)
      .reduce(async (n, i) => {
        let r = Ae.default.join(await n, i);
        await me.mkdir(r).catch((o) => {
          if (o.code !== "EEXIST") throw o;
        });
        let s = await me.lstat(r);
        if (!s.isDirectory() || s.isSymbolicLink())
          throw Error("The queue directory contains a link or unsafe folder.");
        return r;
      }, Promise.resolve(t)),
    me.realpath(e)
  );
}