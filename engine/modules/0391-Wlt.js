
function Wlt(e, t) {
  let r = e.context
    ? new OQ(e.context.isOptional, e.context.isMutable, e.context.defaultValue, {
        ...e.context.annotations,
        ...t,
      })
    : new OQ(!1, !1, void 0, t);
  return Rlt(e, r);
}