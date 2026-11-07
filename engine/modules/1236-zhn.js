
var zhn = ne(() => {
  BH();
  cmt();
  J_();
  Jhn();
  crr();
  ((Khn = Ge("upgradeIfNeeded")(function* (e, t, r) {
    if ((yield* t.all(Zt`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ${e}`)).length === 0)
      return { newDb: !0 };
    let a = yield* t.all(Zt`SELECT name as column_name FROM pragma_table_info(${e})`),
      H = Hrr.sqlite(a.map((u) => u.column_name));
    for (let u = H; u < arr.sqlite; u++) {
      let f = Mqs[u];
      if (!f)
        return yield* new srr({
          message: `No upgrade path from migration table version ${u} to ${u + 1}`,
          cause: { version: u },
        });
      yield* f(e, t, r);
    }
    return { newDb: !1 };
  })),
    (Mqs = { 0: xqs }));
});