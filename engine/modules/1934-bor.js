
function bor(e) {
  if (!e.modified_) {
    if (((e.modified_ = !0), e.parent_)) bor(e.parent_);
  }
}