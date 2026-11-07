
function Wtr(e, t, r, s) {
  if (e.through) {
    let a = e.sourceColumns.map((u, f) => {
        let d = e.through.source[f];
        return Pi(
          Zt`${t}.${Zt.identifier(u.name)}`,
          Zt`${s}.${Zt.identifier(vi(d._.column, Kl) ? d._.column.name : d._.key)}`,
        );
      }),
      H = e.targetColumns.map((u, f) => {
        let d = e.through.target[f];
        return Pi(
          Zt`${s}.${Zt.identifier(vi(d._.column, Kl) ? d._.column.name : d._.key)}`,
          Zt`${r}.${Zt.identifier(u.name)}`,
        );
      });
    return {
      filter: Gc(e.where ? HY(e.isReversed ? t : r, e.where) : void 0, ...a),
      joinCondition: Gc(...H),
    };
  }
  return {
    filter: Gc(
      ...e.sourceColumns.map((a, H) => {
        let u = e.targetColumns[H];
        return Pi(Zt`${t}.${Zt.identifier(a.name)}`, Zt`${r}.${Zt.identifier(u.name)}`);
      }),
      e.where ? HY(e.isReversed ? t : r, e.where) : void 0,
    ),
  };
}