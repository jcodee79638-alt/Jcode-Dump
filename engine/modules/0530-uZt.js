
function uZt(e, t) {
  let {
      definitions: r,
      dialect: s,
      schemas: a,
    } = lZt({ representations: [e.representation], references: e.references }, t),
    H = a[0];
  return { dialect: s, schema: H, definitions: r };
}