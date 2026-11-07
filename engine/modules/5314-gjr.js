
async function gjr(e, t = {}) {
  let r = await lR(e, t);
  return { ...r, text: r.stdout.toString() };
}