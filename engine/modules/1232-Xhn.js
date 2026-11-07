
function Xhn(e, t) {
  let r = Zt`${Zt.identifier(e)}`,
    s = [
      Zt`ALTER TABLE ${r} ADD COLUMN ${Zt.identifier("name")} text`,
      Zt`ALTER TABLE ${r} ADD COLUMN ${Zt.identifier("applied_at")} TEXT`,
    ];
  for (let a of t) {
    let H = Zt`UPDATE ${r} SET ${Zt.identifier("name")} = ${a.name}, ${Zt.identifier("applied_at")} = NULL WHERE`;
    (H.append(Zt` ${Zt.identifier(a.selector.column)} = ${a.selector.value}`), s.push(H));
  }
  return s;
}