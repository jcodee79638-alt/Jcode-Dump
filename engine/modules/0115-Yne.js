
async function Yne(e, t) {
  if (!(await UM(e))) return null;
  if (t !== "attachments")
    return CC(await dI(e, t === "database" || t === "wal" || t === "rollback" ? 268435456 : Ch.settings));
  let r = await XJt(e, Ch.files);
  if (r.truncated || r.files.some((H) => !YDe(H))) throw Ap();
  let s = 0,
    a = [];
  for (let H of r.files.sort()) {
    let u = await dI(Pu.join(e, H), H.endsWith(".json") ? 1048576 : Ch.attachment);
    if (((s += u.length), s > Ch.attachments)) throw Ap();
    a.push(H + ":" + u.length + ":" + CC(u));
  }
  return CC(
    a.join(`
`),
  );
}