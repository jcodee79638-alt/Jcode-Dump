
async function ao(e, t) {
  await Wt(ne.default.dirname(e));
  let n = `${e}.${Fe.randomUUID()}.tmp`,
    i = await ce.open(n, "wx", 384);
  try {
    (await i.writeFile(JSON.stringify(t)), await i.sync());
  } finally {
    await i.close();
  }
  await ce.rename(n, e);
}