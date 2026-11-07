
async function Phe(e) {
  for (let t of Che(e.callbacks)) {
    if (t == null) continue;
    try {
      await t(e.event);
    } catch (r) {}
  }
}