
function B_n(e, t) {
  let r = e[$2][t];
  return r
    ? vi(r, Kl)
      ? r
      : vi(r, pH.Aliased)
        ? Zt`${e}.${Zt.identifier(r.fieldAlias)}`
        : Zt`${e}.${Zt.identifier(t)}`
    : Zt`${e}.${Zt.identifier(t)}`;
}