
function QtH(e, t) {
  if (!IR.default.valid(t)) return !1;
  if (!IR.default.valid(e)) return IR.default.major(t) === 1;
  return IR.default.major(t) === IR.default.major(e) && IR.default.gt(t, e);
}