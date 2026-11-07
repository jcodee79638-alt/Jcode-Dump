
async function Os(e, t, n, i, r) {
  let s = await i().catch(async () => {
    await r();
    return;
  });
  if (e.get(t) !== n) return { released: !1, report: s };
  return (e.delete(t), { released: !0, report: s });
}