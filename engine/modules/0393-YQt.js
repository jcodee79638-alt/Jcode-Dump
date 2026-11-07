
function YQt(e) {
  let t = e.context
    ? e.context.isMutable === !1
      ? new OQ(e.context.isOptional, !0, e.context.defaultValue, e.context.annotations)
      : e.context
    : new OQ(!1, !0);
  return t9s(Rlt(e, t));
}