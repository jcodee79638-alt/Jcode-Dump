
async function Qne(e, t) {
  await p6(EU.dirname(e));
  let r = await UJt(e, "wx", 384);
  try {
    (await r.writeFile(t), await r.sync());
  } finally {
    await r.close();
  }
}