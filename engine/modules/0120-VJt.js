
async function VJt(e) {
  let t = await atn(e),
    r = [],
    s = 0;
  for await (let a of t) {
    if (++s > 128) throw Ap();
    if (/^\.pending-[a-f0-9-]{36}$/.test(a.name)) {
      (await p6(Pu.join(e, a.name)), await JF(Pu.join(e, a.name), { recursive: !0 }));
      continue;
    }
    if (!uQ(a.name)) continue;
    let H = await Xfe(Pu.join(e, a.name), a.name);
    r.push({ id: a.name, createdAt: H.entry.createdAt });
  }
  for (let a of r.sort((H, u) => u.createdAt - H.createdAt || u.id.localeCompare(H.id)).slice(1))
    await JF(Pu.join(e, a.id), { recursive: !0 });
}