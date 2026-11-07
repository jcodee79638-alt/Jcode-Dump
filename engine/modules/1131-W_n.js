
function W_n(e, t) {
  let r = [],
    s = [];
  for (let [a, H] of Object.entries(t)) {
    if (!H) continue;
    let u = typeof H === "function" ? H(e, { sql: cMe.sql }) : H,
      f = Zt`(${u.getSQL()}) as ${Zt.identifier(a)}`;
    ((f.decoder = u.getSQL().decoder), r.push(f), s.push({ key: a, field: f }));
  }
  return { sql: r.length ? Zt.join(r, Zt`, `) : void 0, selection: s };
}