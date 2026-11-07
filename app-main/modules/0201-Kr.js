
async function Kr(e, t = !1) {
  await Wt(e);
  let n = ne.default.join(e, ".integrity-v6.key");
  if (t)
    await ce.writeFile(n, Fe.randomBytes(32), { flag: "wx", mode: 384 }).catch((r) => {
      if (r.code !== "EEXIST") throw r;
    });
  let i = await wn(n, 32);
  if (i.length !== 32) throw ae();
  return i;
}