
async function vZr(e) {
  let t = [],
    r = new Set(),
    s,
    a = 0,
    H = 0;
  while (!0) {
    let u = await e(s),
      f = u.items.map(SZr).filter((d) => !!d);
    if (((a += Buffer.byteLength(JSON.stringify(f))), (H += f.length), a > 15000000 || H > 20000))
      throw Error("This conversation is too large to display at once. Its saved history is kept.");
    if ((t.unshift(f), !u.cursor)) return t.flat();
    if (r.has(u.cursor)) throw Error("Conversation pagination did not advance. Your saved history is kept.");
    (r.add(u.cursor), (s = u.cursor));
  }
}
jFe();