
function Tan(e, t) {
  let r = new Zg(Slt(t), QC()),
    s = [new S$(MBe, r)],
    a = e.context
      ? new OQ(e.context.isOptional, e.context.isMutable, s, e.context.annotations)
      : new OQ(!1, !1, s);
  return Rlt(e, a);
}