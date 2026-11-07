
async function jAt(e, t) {
  await p6(EU.dirname(e));
  let r = `${e}.${x8s()}.tmp`,
    s = await UJt(r, "wx", 384);
  try {
    (await s.writeFile(JSON.stringify(t)), await s.sync());
  } finally {
    await s.close();
  }
  await v8s(r, e);
}