
async function NJt(e, t = !1) {
  await p6(e);
  let r = EU.join(e, ".integrity-v6.key");
  if (t)
    await b8s(r, M8s(32), { flag: "wx", mode: 384 }).catch((a) => {
      if (a.code !== "EEXIST") throw a;
    });
  let s = await dI(r, 32);
  if (s.length !== 32) throw xj();
  return s;
}