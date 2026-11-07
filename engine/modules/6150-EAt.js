
async function EAt(e, t) {
  await j6s(HQ.dirname(e), { recursive: !0 });
  let r = `${e}.${w6s()}.tmp`,
    s = await C6s(r, "wx", 384);
  try {
    (await s.writeFile(JSON.stringify(t)), await s.sync());
  } finally {
    await s.close();
  }
  await P6s(r, e);
}