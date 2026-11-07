
function Vlt(e) {
  let t = e.context
    ? e.context.isOptional === !1
      ? new OQ(!0, e.context.isMutable, e.context.defaultValue, e.context.annotations)
      : e.context
    : new OQ(!0, !1);
  return jBe(Rlt(e, t));
}