
async function Ln(e, t, n, i) {
  let r = await X(e, t, !0),
    s = W.default.posix.join(W.default.posix.dirname(t), `.task-write-${Le.randomUUID()}`),
    o = await X(e, s, !0),
    l = await z.open(o.filename, "wx", 384);
  (await l
    .writeFile(n)
    .then(() => l.sync())
    .finally(() => l.close()),
    await (async () => {
      let u = await X(e, t, !0),
        p = await X(e, s);
      if (se(u.filename) !== se(r.filename) || se(p.filename) !== se(o.filename))
        throw Error("The checkpoint target changed before the write could be committed.");
      if (i && !(await i())) throw Error("The file changed before it could be restored.");
      await z.rename(o.filename, r.filename);
    })().finally(() =>
      z.unlink(o.filename).catch((u) => {
        if (u.code !== "ENOENT") throw u;
      }),
    ));
}