
async function RJt(e, t) {
  let r = Pu.join(e.data, "restore-v6");
  await jAt(Pu.join(r, "journal.json"), { ...t, seal: await FJt(r, JSON.stringify(t), !0) });
}