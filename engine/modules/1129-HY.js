
function HY(e, t, r = {}, s = {}, a = 0) {
  let H = Object.entries(t);
  if (!H.length) return;
  let u = [];
  for (let [f, d] of H) {
    if (d === void 0) continue;
    switch (f) {
      case "RAW": {
        let _ = typeof d === "function" ? d(e, cMe) : d.getSQL();
        u.push(_);
        continue;
      }
      case "OR":
        if (!d?.length) continue;
        u.push(K0(...d.map((_) => HY(e, _, r, s, a))));
        continue;
      case "AND":
        if (!d?.length) continue;
        u.push(Gc(...d.map((_) => HY(e, _, r, s, a))));
        continue;
      case "NOT": {
        if (d === void 0) continue;
        let _ = HY(e, d, r, s, a);
        if (!_) continue;
        u.push(SG(_));
        continue;
      }
      default: {
        if (e[$2][f]) {
          let B = qdt(B_n(e, f), d);
          if (B) u.push(B);
          continue;
        }
        let _ = r[f];
        if (!_) throw new aY({ message: `Unknown relational filter field: "${f}"` });
        let L = vG(_.targetTable, `f${a}`),
          I = _.throughTable ? vG(_.throughTable, `ft${a}`) : void 0,
          D = s[_.targetTableName],
          { filter: S, joinCondition: T } = Wtr(_, e, L, I),
          C = Gc(S, typeof d === "boolean" ? void 0 : HY(L, d, D.relations, s, a + 1)),
          O = I
            ? Zt`(select * from ${AMe(L)} inner join ${AMe(I)} on ${T}${Zt` where ${C}`.if(C)} limit 1)`
            : Zt`(select * from ${AMe(L)}${Zt` where ${C}`.if(C)} limit 1)`;
        if (C) u.push((d ? dde : mde)(O));
      }
    }
  }
  return Gc(...u);
}