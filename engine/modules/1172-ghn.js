
async function ghn(e, t, r) {
  if (
    (await t.session.all(Zt`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ${e}`)).length === 0
  )
    return { newDb: !0 };
  let s = await t.session.all(Zt`SELECT name as column_name FROM pragma_table_info(${e})`),
    a = Ktr.sqlite(s.map((H) => H.column_name));
  for (let H = a; H < Jtr.sqlite; H++) {
    let u = $qs[H];
    if (!u) throw Error(`No upgrade path from migration table version ${H} to ${H + 1}`);
    await u(e, t, r);
  }
  return { newDb: !1 };
}