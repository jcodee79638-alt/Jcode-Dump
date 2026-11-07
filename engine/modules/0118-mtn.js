
async function mtn(e, t) {
  if (t.phase === "staging") {
    for (let s of ZDe) {
      let a = XF(e, s, t.token);
      if (await UM(a.before)) throw Ap();
      if (await UM(a.after)) (await Yne(a.after, s), await JF(a.after, { recursive: s === "attachments" }));
    }
    let r = Pu.join(e.data, "restore-v6", ".pending-" + t.token);
    if (await UM(r)) (await p6(r), await JF(r, { recursive: !0 }));
    await JF(Pu.join(e.data, "restore-v6", "journal.json"));
    return;
  }
  for (let r of t.entries) {
    let s = XF(e, r.role, t.token),
      a = await Yne(s.target, r.role),
      H = await Yne(s.before, r.role),
      u = await Yne(s.after, r.role);
    if ((H !== null && H !== r.old) || (u !== null && u !== r.next)) throw Ap();
    if (
      t.phase === "committed"
        ? a !== r.next
        : (a !== null && a !== r.old && a !== r.next) || (r.old !== null && H === null && a !== r.old)
    )
      throw Ap();
  }
  for (let r of [...t.entries].reverse()) {
    let s = XF(e, r.role, t.token);
    if (t.phase === "prepared") {
      if (await UM(s.before)) {
        if (await UM(s.target)) await JF(s.target, { recursive: r.role === "attachments" });
        await CAt(s.before, s.target);
      } else if (r.old === null && (await UM(s.target)))
        await JF(s.target, { recursive: r.role === "attachments" });
    }
    if (await UM(s.after)) await JF(s.after, { recursive: r.role === "attachments" });
    if (t.phase === "committed" && (await UM(s.before)))
      await JF(s.before, { recursive: r.role === "attachments" });
  }
  await JF(Pu.join(e.data, "restore-v6", "journal.json"));
}