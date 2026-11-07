
function PTn(e, t) {
  if (ULt(t)) return t;
  let r = t[Iw];
  if (!r) return bLt(t, e.handledSet_, e);
  if (!NLt(r, e)) return t;
  if (!r.modified_) return r.base_;
  if (!r.finalized_) {
    let { callbacks_: s } = r;
    if (s) while (s.length > 0) s.pop()(e);
    FTn(r, e);
  }
  return r.copy_;
}